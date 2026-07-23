/**
 * 실전 모의고사(Full Mock Exam) 도메인 — 기존 문제은행을 실전 순서로 조립한
 * 풀렝스 모의고사(LC ~100 + RC ~100)를 구성하고 990점 척도로 채점한다.
 *
 * 콘텐츠는 새로 만들지 않고 재사용:
 *  - LC: content/listening/*.md (Part 2·3·4, ListeningSet)
 *  - RC: content/sets/*.md (Part 5·6·7, PassageSet)
 * 로더: src/lib/mock-loader.ts · API: /api/mock.
 * 채점(scaledScore/domainOfPart/PART_LABEL)은 진단(diagnostic)과 동일 접근을 재사용한다.
 */

import type { ListeningSet } from "@/game/listening";
import type { PassageSet, PassageQuestion } from "@/game/types";
import { scaledScore, domainOfPart, type PartStat } from "@/game/diagnostic";

export { scaledScore, domainOfPart } from "@/game/diagnostic";
export { PART_LABEL } from "@/game/diagnostic";

/** 조립 재료(로더가 넘겨주는 전체 은행) */
export interface MockBank {
  listening: ListeningSet[]; // Part 2·3·4
  rc: PassageSet[]; // Part 5·6·7
}

/** 조립된 모의고사 한 세트 */
export interface MockExam {
  lc: ListeningSet[]; // Part 2 → 3 → 4 순서
  rc: PassageSet[]; // Part 5 → 6 → 7 순서
}

/** 파트별 목표 문항 수(실전 유사·Part 1 사진 제외) */
export const MOCK_TARGET = {
  p2Items: 25, // Part 2 응답 선택
  p3Questions: 39, // Part 3 대화 (13세트 × 3)
  p4Questions: 30, // Part 4 담화 (10세트 × 3)
  p5Questions: 30, // Part 5 단문 공란
  p6Questions: 16, // Part 6 장문 공란 (4세트 × 4)
  p7Questions: 24, // Part 7 독해
} as const;

const byId = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);

/** 문항 배열을 가진 세트들을 목표 문항 수까지 누적(마지막 세트는 필요시 잘라 정확히 맞춤). */
function accumQuestions<T extends { questions?: { id: string }[] }>(
  sets: T[],
  target: number,
  trim: (s: T, n: number) => T,
): T[] {
  const out: T[] = [];
  let n = 0;
  for (const s of sets) {
    if (n >= target) break;
    const qs = s.questions ?? [];
    if (qs.length === 0) continue;
    const remain = target - n;
    if (qs.length <= remain) {
      out.push(s);
      n += qs.length;
    } else {
      out.push(trim(s, remain));
      n += remain;
    }
  }
  return out;
}

const trimListeningQ = (s: ListeningSet, n: number): ListeningSet => ({
  ...s,
  questions: (s.questions ?? []).slice(0, n),
});

/** Part 2(응답 선택)를 item 단위로 목표 개수까지 누적(마지막 세트는 잘라 정확히 맞춤). */
function pickPart2(listen: ListeningSet[]): ListeningSet[] {
  const p2Sets = listen.filter((s) => s.part === 2);
  const out: ListeningSet[] = [];
  let n = 0;
  for (const s of p2Sets) {
    if (n >= MOCK_TARGET.p2Items) break;
    const items = s.items ?? [];
    if (items.length === 0) continue;
    const remain = MOCK_TARGET.p2Items - n;
    if (items.length <= remain) {
      out.push(s);
      n += items.length;
    } else {
      out.push({ ...s, items: items.slice(0, remain) });
      n += remain;
    }
  }
  return out;
}
const trimPassageQ = (s: PassageSet, n: number): PassageSet => ({
  ...s,
  questions: s.questions.slice(0, n) as PassageQuestion[],
});

/**
 * 전체 은행에서 균형 잡힌 풀렝스 모의고사를 조립한다.
 * id 정렬 기반으로 앞에서부터 선택 → 결정론적(같은 은행이면 항상 같은 세트)이라
 * 세션이 중간에 끊겨도 동일하게 이어진다.
 *
 * `dedicatedRc`(content/mock 전용 세트)가 주어지면 **RC는 그걸 그대로**(실전 길이·난도,
 * id 정렬로 Part 5→6→7) 사용하고 은행 조립을 건너뛴다. 없으면 은행에서 조립(폴백).
 */
export function composeMock(bank: MockBank, dedicatedRc?: PassageSet[]): MockExam {
  const listen = [...bank.listening].sort(byId);
  const rc = [...bank.rc].sort(byId);

  // 전용 실전 RC 1회분이 있으면 우선 사용(실전 밀도) — id 정렬로 파트 순서 보장.
  if (dedicatedRc && dedicatedRc.length > 0) {
    const dedicated = [...dedicatedRc].sort(byId);
    const lc2f = pickPart2(listen);
    const lc3f = accumQuestions(listen.filter((s) => s.part === 3), MOCK_TARGET.p3Questions, trimListeningQ);
    const lc4f = accumQuestions(listen.filter((s) => s.part === 4), MOCK_TARGET.p4Questions, trimListeningQ);
    return {
      lc: [...lc2f, ...lc3f, ...lc4f],
      rc: dedicated, // Part 5→6→7 순서(파일명 정렬)로 실전 그대로
    };
  }

  // ── LC ───────────────────────────────
  // Part 2: item 단위(각 item이 독립 오디오 클립)로 25개까지 누적
  const lc2 = pickPart2(listen);

  const lc3 = accumQuestions(
    listen.filter((s) => s.part === 3),
    MOCK_TARGET.p3Questions,
    trimListeningQ,
  );
  const lc4 = accumQuestions(
    listen.filter((s) => s.part === 4),
    MOCK_TARGET.p4Questions,
    trimListeningQ,
  );

  // ── RC ───────────────────────────────
  const rc5 = accumQuestions(
    rc.filter((s) => (s.part ?? 7) === 5),
    MOCK_TARGET.p5Questions,
    trimPassageQ,
  );
  const rc6 = accumQuestions(
    rc.filter((s) => (s.part ?? 7) === 6),
    MOCK_TARGET.p6Questions,
    trimPassageQ,
  );
  const rc7 = accumQuestions(
    rc.filter((s) => (s.part ?? 7) === 7),
    MOCK_TARGET.p7Questions,
    trimPassageQ,
  );

  return {
    lc: [...lc2, ...lc3, ...lc4],
    rc: [...rc5, ...rc6, ...rc7],
  };
}

/** 모의고사에 포함된 총 문항 수(파트별). */
export function mockCounts(mock: MockExam): { lc: number; rc: number; total: number } {
  let lc = 0;
  for (const set of mock.lc) {
    lc += set.part === 2 ? (set.items?.length ?? 0) : (set.questions?.length ?? 0);
  }
  const rc = mock.rc.reduce((n, s) => n + s.questions.length, 0);
  return { lc, rc, total: lc + rc };
}

export interface MockResult {
  lcCorrect: number;
  lcTotal: number;
  rcCorrect: number;
  rcTotal: number;
  lcScore: number;
  rcScore: number;
  totalScore: number;
  parts: PartStat[];
  levelLabel: string;
  levelTone: "top" | "high" | "mid" | "low";
  takenAt: number;
}

function levelOf(total: number): { label: string; tone: MockResult["levelTone"] } {
  if (total >= 900) return { label: "최상위권 · 990 도전 구간", tone: "top" };
  if (total >= 800) return { label: "상급 · 목표 900 사정권", tone: "high" };
  if (total >= 700) return { label: "중상급 · 목표 800 사정권", tone: "high" };
  if (total >= 550) return { label: "중급 · 목표 700 구간", tone: "mid" };
  if (total >= 400) return { label: "초중급 · 기초 다지기", tone: "mid" };
  return { label: "기초 · 실전 감각부터 차근차근", tone: "low" };
}

/**
 * 정답 맵(key→선택 index)과 모의고사를 받아 990점 척도로 채점.
 * 진단과 동일하게 파트별 정답률 → LC/RC 각 5~495 → 총 10~990.
 */
export function scoreMock(
  mock: MockExam,
  answers: Record<string, number | null>,
): MockResult {
  const partCorrect: Record<number, number> = {};
  const partTotal: Record<number, number> = {};

  const tally = (part: number, key: string, answerIndex: number) => {
    partTotal[part] = (partTotal[part] ?? 0) + 1;
    if (answers[key] === answerIndex) partCorrect[part] = (partCorrect[part] ?? 0) + 1;
  };

  for (const set of mock.lc) {
    if (set.part === 2) {
      for (const it of set.items ?? []) tally(2, it.id, it.answerIndex);
    } else {
      for (const q of set.questions ?? []) tally(set.part, q.id, q.answerIndex);
    }
  }
  for (const set of mock.rc) {
    const part = set.part ?? 7;
    for (const q of set.questions) tally(part, q.id, q.answerIndex);
  }

  const parts: PartStat[] = [2, 3, 4, 5, 6, 7]
    .filter((p) => (partTotal[p] ?? 0) > 0)
    .map((p) => ({ part: p, correct: partCorrect[p] ?? 0, total: partTotal[p] ?? 0 }));

  const sum = (dom: "LC" | "RC", pick: "correct" | "total") =>
    parts.filter((s) => domainOfPart(s.part) === dom).reduce((n, s) => n + s[pick], 0);

  const lcCorrect = sum("LC", "correct");
  const lcTotal = sum("LC", "total");
  const rcCorrect = sum("RC", "correct");
  const rcTotal = sum("RC", "total");

  const lcScore = scaledScore(lcCorrect, lcTotal);
  const rcScore = scaledScore(rcCorrect, rcTotal);
  const totalScore = lcScore + rcScore;
  const lvl = levelOf(totalScore);

  return {
    lcCorrect,
    lcTotal,
    rcCorrect,
    rcTotal,
    lcScore,
    rcScore,
    totalScore,
    parts,
    levelLabel: lvl.label,
    levelTone: lvl.tone,
    takenAt: Date.now(),
  };
}

// ── 최근 결과 + 히스토리 저장(localStorage) ─────────────────────────────
const KEY = "toeic-mock-v1";
const HISTORY_CAP = 20;

interface MockStore {
  last: MockResult | null;
  history: MockResult[];
}

function readStore(): MockStore {
  if (typeof window === "undefined") return { last: null, history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { last: null, history: [] };
    const parsed = JSON.parse(raw) as Partial<MockStore>;
    return {
      last: parsed.last ?? null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return { last: null, history: [] };
  }
}

export function saveMockResult(r: MockResult) {
  if (typeof window === "undefined") return;
  try {
    const store = readStore();
    const history = [r, ...store.history].slice(0, HISTORY_CAP);
    localStorage.setItem(KEY, JSON.stringify({ last: r, history } satisfies MockStore));
  } catch {
    /* ignore */
  }
}

export function loadMockResult(): MockResult | null {
  return readStore().last;
}

export function loadMockHistory(): MockResult[] {
  return readStore().history;
}
