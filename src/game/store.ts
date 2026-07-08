import { create } from "zustand";
import { INITIAL_POOL_SIZE, REFILL_THRESHOLD } from "./config";
import type {
  ChoiceIndex,
  Difficulty,
  Part,
  PassageQuestion,
  PassageSet,
} from "./types";
import { normalizeCategory, type TypeFilter } from "./questionTypes";
import { partOf } from "./parts";
import { recordSession } from "./progress";
import { recordAnswers } from "./mastery";
import type { MasteryPart } from "./mastery";
import { getFallbackSets } from "@/lib/questions";

export type PracticeStatus = "idle" | "active" | "ended";

export interface PracticeRecord {
  part: Part;
  passageType: string;
  question: PassageQuestion;
  selected: ChoiceIndex;
  isCorrect: boolean;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 풀을 셔플·순환하며 count개로 채운다 (무한 연습) */
function cycleFill(pool: PassageSet[], count: number): PassageSet[] {
  if (pool.length === 0) return [];
  const out: PassageSet[] = [];
  while (out.length < count) out.push(...shuffle(pool));
  return out.slice(0, count);
}

/** 풀 필터 옵션 — 유형(Part 7) 또는 문법 분류(Part 5·6) */
interface PoolFilter {
  /** Part 7 빈출 유형 ("ALL" = 전체) */
  type?: TypeFilter;
  /** Part 5·6 문법 분류 원문 (category 그대로 일치) */
  rawCategory?: string;
}

/**
 * 선택한 파트와 필터에 맞춰 학습 풀을 만든다.
 * 1) 파트로 세트를 거르고
 * 2) rawCategory가 있으면 category가 정확히 일치하는 문항만,
 *    아니면 (Part 7) 유형이 일치하는 문항만 남긴다.
 * 이렇게 하면 하위 엔진(qIndex 순회)은 그대로 두고 파트·유형별 학습이 된다.
 */
function buildPool(
  sets: PassageSet[],
  part: Part,
  filter: PoolFilter,
): PassageSet[] {
  const byPart = sets.filter((s) => partOf(s) === part);
  const { type, rawCategory } = filter;

  if (rawCategory) {
    return byPart
      .map((s) => ({
        ...s,
        questions: s.questions.filter((q) => q.category === rawCategory),
      }))
      .filter((s) => s.questions.length > 0);
  }
  if (type && type !== "ALL") {
    return byPart
      .map((s) => ({
        ...s,
        questions: s.questions.filter((q) => normalizeCategory(q.category) === type),
      }))
      .filter((s) => s.questions.length > 0);
  }
  return byPart;
}

/** 학습 시작 옵션 */
export interface StartOptions {
  /** 학습할 파트 (5/6/7) */
  part: Part;
  /** 선택한 빈출 유형 ("ALL" = 전체) — Part 7에서만 사용 */
  type: TypeFilter;
  /** MD 은행에서 받은 세트 (없으면 로컬 폴백) */
  sets?: PassageSet[];
  /** 난이도 (선택) — 기본 ALL은 전체 난이도 사용 */
  difficulty?: Difficulty | "ALL";
}

/** 약점 유형 집중 연습 옵션 (결과 화면에서 호출) */
export interface FocusOptions {
  part: Part;
  /** Part 7 유형 */
  type?: TypeFilter;
  /** Part 5·6 문법 분류 */
  rawCategory?: string;
}

interface PracticeState {
  status: PracticeStatus;
  difficulty: Difficulty | "ALL";
  /** 현재 학습 중인 파트 */
  part: Part;
  /** 현재 학습 중인 빈출 유형 */
  typeFilter: TypeFilter;

  /** 이번 세션 학습 풀 (파트·유형 필터 적용 후) */
  pool: PassageSet[];
  /** 필터 전 전체 은행 — 결과 화면의 약점 집중 연습에 재사용 */
  source: PassageSet[];
  /** 다가올 세트 큐 (현재 세트 = queue[0]) */
  queue: PassageSet[];
  qIndex: number;
  cursor: number;

  answered: boolean;
  selected: ChoiceIndex | null;

  solved: number;
  correct: number;
  streak: number;
  bestStreak: number;

  history: PracticeRecord[];

  start: (opts: StartOptions) => void;
  /** 결과 화면에서 약점 유형만 다시 풀기 (보관된 source 재사용) */
  practiceFocus: (opts: FocusOptions) => void;
  answer: (choice: ChoiceIndex) => void;
  next: () => void;
  end: () => void;
  reset: () => void;
}

const FRESH = {
  pool: [] as PassageSet[],
  queue: [] as PassageSet[],
  qIndex: 0,
  cursor: 0,
  answered: false,
  selected: null as ChoiceIndex | null,
  solved: 0,
  correct: 0,
  streak: 0,
  bestStreak: 0,
  history: [] as PracticeRecord[],
};

export const usePracticeStore = create<PracticeState>((set, get) => ({
  status: "idle",
  difficulty: "ALL",
  part: 7,
  typeFilter: "ALL",
  source: [],
  ...FRESH,

  start: ({ part, type, sets: sourceSets, difficulty = "ALL" }) => {
    // MD 은행에서 받은 세트를 쓰고, 없으면 로컬 폴백
    const source =
      sourceSets && sourceSets.length > 0 ? sourceSets : getFallbackSets();
    // 선택한 파트·유형으로 문항을 필터링한 학습 풀
    const pool = buildPool(source, part, { type });
    set({
      status: "active",
      difficulty,
      source,
      part,
      typeFilter: type,
      ...FRESH,
      pool,
      queue: cycleFill(pool, INITIAL_POOL_SIZE),
    });
  },

  practiceFocus: ({ part, type, rawCategory }) => {
    // 보관해 둔 전체 은행에서 약점 유형만 다시 추려 새 세션을 연다
    const s = get();
    const source = s.source.length > 0 ? s.source : getFallbackSets();
    const pool = buildPool(source, part, { type, rawCategory });
    if (pool.length === 0) return; // 풀 게 없으면 무시
    set({
      status: "active",
      part,
      typeFilter: rawCategory ? "ALL" : (type ?? "ALL"),
      ...FRESH,
      pool,
      queue: cycleFill(pool, INITIAL_POOL_SIZE),
    });
  },

  answer: (choice) => {
    const s = get();
    if (s.status !== "active" || s.answered) return;
    const set0 = s.queue[0];
    const q = set0?.questions[s.qIndex];
    if (!q) return;

    const isCorrect = choice === q.answerIndex;
    const streak = isCorrect ? s.streak + 1 : 0;

    set({
      answered: true,
      selected: choice,
      solved: s.solved + 1,
      correct: s.correct + (isCorrect ? 1 : 0),
      streak,
      bestStreak: Math.max(s.bestStreak, streak),
      history: [
        ...s.history,
        {
          part: partOf(set0),
          passageType: set0.passageType,
          question: q,
          selected: choice,
          isCorrect,
        },
      ],
    });
  },

  next: () => {
    const s = get();
    if (s.status !== "active") return;
    const set0 = s.queue[0];
    if (!set0) return;

    if (s.qIndex + 1 < set0.questions.length) {
      set({
        qIndex: s.qIndex + 1,
        cursor: s.cursor + 1,
        answered: false,
        selected: null,
      });
      return;
    }

    let queue = s.queue.slice(1);
    if (queue.length <= REFILL_THRESHOLD) {
      queue = queue.concat(cycleFill(s.pool, INITIAL_POOL_SIZE));
    }
    set({
      queue,
      qIndex: 0,
      cursor: s.cursor + 1,
      answered: false,
      selected: null,
    });
  },

  end: () => {
    // 세션 종료 시 누적 진도에 기록 (세션당 정확히 한 번 호출됨)
    const s = get();
    recordSession(s.history, s.bestStreak);
    // 파트별 정복도(고유 정답 문항) 누적 — RC(5·6·7)
    recordAnswers(
      s.history.map((r) => ({
        part: r.part as MasteryPart,
        id: r.question.id,
        correct: r.isCorrect,
      })),
    );
    set({ status: "ended" });
  },

  reset: () => set({ status: "idle", source: [], ...FRESH }),
}));
