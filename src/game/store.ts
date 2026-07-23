import { create } from "zustand";
import { INITIAL_POOL_SIZE, REFILL_THRESHOLD } from "./config";
import type {
  ChoiceIndex,
  Difficulty,
  Part,
  PassageQuestion,
  PassageSet,
  SentencePair,
} from "./types";
import { normalizeCategory, type TypeFilter } from "./questionTypes";
import { partOf } from "./parts";
import { recordSession } from "./progress";
import { recordAnswers, loadMastery } from "./mastery";
import type { MasteryPart, MasteryState } from "./mastery";
import { recordReviews, dueIdSet, loadReview } from "./review";
import { getFallbackSets } from "@/lib/questions";

/** Part 5 한 세션 문항 수 — 대결(게임)과 동일하게 짧고 굵게(5문항 뒤 종료). */
const PART5_SESSION_LEN = 5;
/** 약점 집중 드릴 한 세션 문항 수 — 끝나면 결과에서 정답률이 다시 갱신된다 */
const FOCUS_SESSION_LEN = 10;
/** 복습 드릴 한 세션 최대 문항 수 */
const REVIEW_SESSION_LEN = 10;

export type PracticeStatus = "idle" | "active" | "ended";

export interface PracticeRecord {
  part: Part;
  /** 이 문항이 속한 세트 ID — 정복 "만점 세트" 판정 단위. */
  setId: string;
  passageType: string;
  question: PassageQuestion;
  selected: ChoiceIndex;
  isCorrect: boolean;
  /** 이 문항이 딸린 지문(영/한). Part 5는 빈 배열 — 오답노트 지문 번역용. */
  passageLines: SentencePair[];
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

/**
 * 복습 예정 문항이 든 세트를 **앞에 세워** 큐를 만든다.
 * 풀에 포함시키기만 하면 Part 5처럼 문항이 1,000개 넘는 파트에서 복습 몇 개가
 * 새 문항 사이에 묻혀 영영 안 나온다 — 복습은 항상 먼저 나와야 스케줄이 지켜진다.
 */
function cycleFillDueFirst(
  pool: PassageSet[],
  count: number,
  due: Set<string>,
): PassageSet[] {
  if (pool.length === 0) return [];
  if (due.size === 0) return cycleFill(pool, count);
  const hot = pool.filter((s) => s.questions.some((q) => due.has(q.id)));
  const cold = pool.filter((s) => !s.questions.some((q) => due.has(q.id)));
  const out: PassageSet[] = shuffle(hot);
  const rest = cold.length > 0 ? cold : pool;
  while (out.length < count) out.push(...shuffle(rest));
  return out.slice(0, count);
}

/**
 * 출제 대상만 남긴다 — **안 푼 · 틀린 · 복습일이 된** 문항.
 *
 * 예전에는 한 번 맞힌 문항을 영구히 제외했는데, 그러면 망각곡선상 며칠 뒤 다시 틀릴 문항을
 * 두 번 다시 만나지 못해 점수로 이어지지 않았다. 이제 맞힌 문항에는 복습 예정일이 붙고
 * (review.ts), **그날이 지나면 다시 큐에 돌아온다**:
 *   - 미시도 문항        → 출제 (새 문항)
 *   - 틀린 문항(streak 0) → 출제 (즉시 복습)
 *   - 맞혔고 복습일 도래   → 출제 (간격반복)
 *   - 맞혔고 복습일 전     → 제외 (아직 기억하고 있음 — 시간 낭비)
 * Part 6·7도 지문(passageLines)은 그대로 두되 출제 대상 문항만 남긴다.
 * 결과가 비면(당장 풀 게 없음) 호출부에서 전체 풀로 폴백한다.
 */
function dropSettled(
  pool: PassageSet[],
  part: number,
  st: MasteryState,
  due: Set<string>,
): PassageSet[] {
  const streaks = st.parts[part as MasteryPart]?.streaks ?? {};
  return pool
    .map((x) => ({
      ...x,
      questions: x.questions.filter(
        (q) => (streaks[q.id] ?? 0) === 0 || due.has(q.id),
      ),
    }))
    .filter((x) => x.questions.length > 0);
}

/** 이 파트에서 지금 복습 예정인 문항 ID */
function dueFor(part: number): Set<string> {
  return dueIdSet(part as MasteryPart, loadReview());
}

/**
 * 세트 **안에서도** 복습 문항을 앞으로 끌어올린다 (Part 5 전용).
 * Part 5는 한 세트가 독립 단문 10개 묶음이라 순서를 바꿔도 무방하지만,
 * Part 6·7은 지문을 따라가는 순서 자체가 의미라 절대 건드리지 않는다.
 */
function hoistDue(pool: PassageSet[], part: number, due: Set<string>): PassageSet[] {
  if (part !== 5 || due.size === 0) return pool;
  return pool.map((s) => {
    if (!s.questions.some((q) => due.has(q.id))) return s;
    return {
      ...s,
      questions: [
        ...s.questions.filter((q) => due.has(q.id)),
        ...s.questions.filter((q) => !due.has(q.id)),
      ],
    };
  });
}

/** 복습 예정 문항만 남긴다 (복습 전용 드릴) */
function keepDueOnly(pool: PassageSet[], due: Set<string>): PassageSet[] {
  return pool
    .map((x) => ({ ...x, questions: x.questions.filter((q) => due.has(q.id)) }))
    .filter((x) => x.questions.length > 0);
}

/** 풀 필터 옵션 — 유형(Part 7) 또는 문법 분류(Part 5·6) */
interface PoolFilter {
  /** Part 7 빈출 유형 ("ALL" = 전체) */
  type?: TypeFilter;
  /** Part 5·6 문법 분류 원문 (category 그대로 일치) */
  rawCategory?: string;
  /** 스킬 드릴 — 한 스킬로 묶인 원문 category 여러 개 (예: 준동사 = 준동사·분사·부정사) */
  categories?: string[];
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
  const { type, rawCategory, categories } = filter;

  if (categories && categories.length > 0) {
    const wanted = new Set(categories);
    return byPart
      .map((s) => ({
        ...s,
        questions: s.questions.filter((q) => wanted.has((q.category ?? "").trim())),
      }))
      .filter((s) => s.questions.length > 0);
  }
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

/** 약점 유형 집중 연습 옵션 (결과 화면·약점 리포트에서 호출) */
export interface FocusOptions {
  part: Part;
  /** Part 7 유형 */
  type?: TypeFilter;
  /** Part 5·6 문법 분류 */
  rawCategory?: string;
  /** 스킬 드릴 — 한 스킬로 묶인 category 여러 개 */
  categories?: string[];
  /** 은행을 직접 넘길 때 (리포트 화면처럼 source가 비어 있는 진입점) */
  sets?: PassageSet[];
}

interface PracticeState {
  status: PracticeStatus;
  difficulty: Difficulty | "ALL";
  /** 현재 학습 중인 파트 */
  part: Part;
  /** 현재 학습 중인 빈출 유형 */
  typeFilter: TypeFilter;
  /** 정복 복습 드릴 세션인가(미정복 문항만 반복) */
  conquest: boolean;
  /** 지문 하나만 풀고 종료하는 세션인가 (Part 6·7 "한 지문 = 한 세션") */
  singlePassage: boolean;
  /** 이번 세션 최대 문항 수(도달 시 종료). null = 무제한. Part 5는 5문항으로 끊음. */
  sessionLimit: number | null;

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
  /** 정복 복습 드릴 — 아직 정복 못한(안 푼·틀린) 문항만 뽑아 반복 (RC 5·6·7) */
  practiceConquest: (opts: { part: Part; sets?: PassageSet[] }) => void;
  /** 간격반복 복습 드릴 — 복습일이 된 문항만 (RC 5·6·7). 풀 게 없으면 false 반환 */
  practiceReview: (opts: { part: Part; sets?: PassageSet[] }) => boolean;
  answer: (choice: ChoiceIndex) => void;
  next: () => void;
  end: () => void;
  reset: () => void;
}

const FRESH = {
  conquest: false,
  singlePassage: false,
  sessionLimit: null as number | null,
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
    const rawPool = buildPool(source, part, { type });
    // 안 푼·틀린 문항 + 복습일이 된 문항만 출제. 당장 풀 게 없으면 전체 폴백.
    const due = dueFor(part);
    const filtered = dropSettled(rawPool, part, loadMastery(), due);
    const pool = hoistDue(filtered.length > 0 ? filtered : rawPool, part, due);
    // Part 6·7은 "한 지문 = 한 세션": 지문 하나만 뽑아 풀고 종료. Part 5는 5문항 뒤 종료(게임 길이).
    const singlePassage = part === 6 || part === 7;
    set({
      status: "active",
      difficulty,
      source,
      part,
      typeFilter: type,
      ...FRESH,
      singlePassage,
      sessionLimit: part === 5 ? PART5_SESSION_LEN : null,
      pool,
      // 복습 예정 문항을 앞세워 스케줄이 실제로 지켜지게 한다
      queue: cycleFillDueFirst(pool, singlePassage ? 1 : INITIAL_POOL_SIZE, due),
    });
  },

  practiceFocus: ({ part, type, rawCategory, categories, sets: sourceSets }) => {
    // 보관해 둔 전체 은행(또는 넘겨받은 은행)에서 약점 유형만 다시 추려 새 세션을 연다
    const s = get();
    const source =
      sourceSets && sourceSets.length > 0
        ? sourceSets
        : s.source.length > 0
          ? s.source
          : getFallbackSets();
    const rawPool = buildPool(source, part, { type, rawCategory, categories });
    if (rawPool.length === 0) return; // 풀 게 없으면 무시
    // 안 푼·틀린·복습일 도래 문항만. 당장 풀 게 없으면 전체 폴백.
    const due = dueFor(part);
    const filtered = dropSettled(rawPool, part, loadMastery(), due);
    const pool = hoistDue(filtered.length > 0 ? filtered : rawPool, part, due);
    set({
      status: "active",
      source,
      part,
      typeFilter: rawCategory || categories ? "ALL" : (type ?? "ALL"),
      ...FRESH,
      // 약점 드릴은 끝이 있어야 결과(=재진단)로 이어진다 — 무한 반복은 피로만 준다
      sessionLimit: FOCUS_SESSION_LEN,
      pool,
      queue: cycleFillDueFirst(pool, INITIAL_POOL_SIZE, due),
    });
  },

  practiceConquest: ({ part, sets: sourceSets }) => {
    const s = get();
    const source =
      sourceSets && sourceSets.length > 0
        ? sourceSets
        : s.source.length > 0
          ? s.source
          : getFallbackSets();
    // 리딩 6·7은 "지문 단위" 복습: 지문 안 문제를 하나라도 못 맞히면 그 지문을 통째로 다시,
    // 그리고 지문 하나 풀면 바로 반영(singlePassage). Part 5는 문항 단위(독립 단문).
    const singlePassage = part === 6 || part === 7;
    const byPart = source.filter((x) => partOf(x) === part);
    // 안 푼·틀린·복습일 도래 문항만 반복(문항 단위). 지문은 함께 보되 정복한 문제는 안 물음.
    const due = dueFor(part);
    let pool = dropSettled(byPart, part, loadMastery(), due);
    // 남은 문항이 없으면(전부 정복) 전체 복습으로 폴백
    const conquest = pool.length > 0;
    if (!conquest) pool = byPart;
    if (pool.length === 0) return; // 그 파트 콘텐츠 자체가 없음
    pool = hoistDue(pool, part, due);
    set({
      status: "active",
      source,
      part,
      typeFilter: "ALL",
      ...FRESH,
      conquest,
      singlePassage,
      sessionLimit: part === 5 ? PART5_SESSION_LEN : null,
      pool,
      // Part 6·7은 지문 하나만(바로 반영), Part 5는 5문항 뒤 종료(게임 길이)
      queue: cycleFillDueFirst(pool, singlePassage ? 1 : INITIAL_POOL_SIZE, due),
    });
  },

  practiceReview: ({ part, sets: sourceSets }) => {
    const s = get();
    const source =
      sourceSets && sourceSets.length > 0
        ? sourceSets
        : s.source.length > 0
          ? s.source
          : getFallbackSets();
    const due = dueFor(part);
    if (due.size === 0) return false;
    const pool = keepDueOnly(
      source.filter((x) => partOf(x) === part),
      due,
    );
    if (pool.length === 0) return false;
    const dueHere = pool.reduce((n, x) => n + x.questions.length, 0);
    set({
      status: "active",
      source,
      part,
      typeFilter: "ALL",
      ...FRESH,
      conquest: true,
      // 복습은 여러 지문에서 한 문항씩 끌어오므로 단일 지문 세션이 아니다
      singlePassage: false,
      sessionLimit: Math.min(dueHere, REVIEW_SESSION_LEN),
      pool,
      queue: cycleFill(pool, INITIAL_POOL_SIZE),
    });
    return true;
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
          // 문항 단위 정복: 맞힌 문항은 즉시 정복(다시 안 나옴), 틀린·안 푼 문항만 반복.
          // Part 6·7도 지문은 함께 보되(passageLines) 정복 판정·재출제는 문항 단위(setId=q.id).
          setId: q.id,
          passageType: set0.passageType,
          question: q,
          selected: choice,
          isCorrect,
          passageLines: set0.passageLines ?? [],
        },
      ],
    });
  },

  next: () => {
    const s = get();
    if (s.status !== "active") return;
    const set0 = s.queue[0];
    if (!set0) return;

    // 세션 문항 제한(Part 5=5문항) 도달 → 종료
    if (s.sessionLimit != null && s.solved >= s.sessionLimit) {
      get().end();
      return;
    }

    if (s.qIndex + 1 < set0.questions.length) {
      set({
        qIndex: s.qIndex + 1,
        cursor: s.cursor + 1,
        answered: false,
        selected: null,
      });
      return;
    }

    // 지문 세트를 끝까지 풀었다 — 단일 지문 세션(Part 6·7)이면 여기서 종료
    if (s.singlePassage) {
      get().end();
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
        setId: r.setId,
      })),
    );
    // 간격반복 스케줄 + 유형별 성적 누적 — 맞힌 문항은 복습일을 받아 나중에 다시 나온다
    recordReviews(
      s.history.map((r) => ({
        part: r.part as MasteryPart,
        id: r.question.id,
        correct: r.isCorrect,
        category: r.question.category,
      })),
    );
    set({ status: "ended" });
  },

  reset: () => set({ status: "idle", source: [], ...FRESH }),
}));
