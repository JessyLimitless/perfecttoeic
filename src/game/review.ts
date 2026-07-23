// 문제은행 간격반복(SRS) — 6파트(LC 2·3·4 + RC 5·6·7) 공통.
//
// 왜 필요한가: 정복(mastery.ts)은 "이 문항을 맞혀봤다"는 **커버리지**를 추적한다.
// 하지만 오늘 맞힌 문항은 며칠 뒤면 다시 틀린다(망각곡선). 맞힌 문항을 영구 제외하면
// 다시 만날 기회가 없어 점수로 이어지지 않는다 → 맞힌 문항에도 **복습 예정일**을 달아
// 그날이 오면 큐에 되돌린다. 몸풀기 암기(memorize.ts)의 Leitner 방식을 문제은행판으로 옮긴 것.
//
// mastery와의 관계(중요):
//   - mastery = 정복도(진도 지표). review = 복습 스케줄 + 문항별 누적 성적(실력 지표).
//   - 둘은 같은 기록 지점에서 나란히 갱신된다(store.end / ListeningPlayer / 대결).
//   - 복습으로 되돌아온 문항을 틀리면 mastery streak이 0이 되어 정복이 풀린다 →
//     정복도가 "한 번 찍고 끝"이 아니라 실제 기억을 반영하는 정직한 숫자가 된다.
//
// 문항별 category(원문 라벨)를 함께 저장해 유형별 약점 리포트(skills.ts)가
// 문제은행을 다시 불러오지 않고도 집계할 수 있게 한다.

import type { MasteryPart } from "./mastery";
import { MASTERY_PARTS } from "./mastery";

const KEY = "toeic-review-v1";
const DAY = 24 * 60 * 60 * 1000;

/** 박스(0~5) → 다음 복습까지 일수. 0 = 즉시(오답은 이번/다음 세션에 바로 재등장) */
export const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35] as const;
export const MAX_REVIEW_BOX = REVIEW_INTERVAL_DAYS.length - 1; // 5
/** 이 박스 이상이면 "장기기억" 취급 (간격 16일+) */
export const LONGTERM_BOX = 4;

export interface ReviewCard {
  /** Leitner 박스 0~5 */
  box: number;
  /** 다음 복습 예정 시각(ms epoch) */
  due: number;
  /** 누적 노출 횟수 */
  seen: number;
  /** 누적 정답 횟수 */
  correct: number;
  /** 마지막 시도 정답 여부 */
  last: boolean;
  /** 콘텐츠 원문 category 라벨 — 유형별 리포트 집계용 */
  cat?: string;
}

/** 문항 id → 카드 */
export type PartReview = Record<string, ReviewCard>;
export type ReviewState = Record<MasteryPart, PartReview>;

function emptyState(): ReviewState {
  return { 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} };
}

export function loadReview(): ReviewState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const p = JSON.parse(raw) as Partial<ReviewState>;
    const base = emptyState();
    if (!p || typeof p !== "object") return base;
    for (const part of MASTERY_PARTS) {
      const src = (p as Record<number, unknown>)[part];
      if (!src || typeof src !== "object") continue;
      const bucket: PartReview = {};
      for (const [id, v] of Object.entries(src as Record<string, unknown>)) {
        const c = v as Partial<ReviewCard>;
        if (!c || typeof c !== "object") continue;
        bucket[id] = {
          box: clampBox(c.box),
          due: typeof c.due === "number" ? c.due : 0,
          seen: typeof c.seen === "number" ? c.seen : 0,
          correct: typeof c.correct === "number" ? c.correct : 0,
          last: c.last === true,
          cat: typeof c.cat === "string" ? c.cat : undefined,
        };
      }
      base[part] = bucket;
    }
    return base;
  } catch {
    return emptyState();
  }
}

function clampBox(v: unknown): number {
  const n = typeof v === "number" ? Math.round(v) : 0;
  return Math.max(0, Math.min(MAX_REVIEW_BOX, n));
}

function save(s: ReviewState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장 공간 초과 등은 무시 (부가 기능)
  }
}

export interface ReviewEntry {
  part: MasteryPart;
  /** 문항 고유 ID */
  id: string;
  correct: boolean;
  /** 콘텐츠 원문 category 라벨 (있으면 갱신) */
  category?: string;
}

/**
 * 한 세션의 답변들을 SRS 상태에 반영하고 저장한다 (기록 지점에서 배치 호출).
 * - 정답 → 박스 +1, 다음 복습 = now + 간격일 (간격이 점점 벌어짐)
 * - 오답 → 박스 0, due = now (다음 세션에 바로 재등장)
 * - `coverageOnly`(대결 등 속도전): 노출·정답 수만 누적하고 **스케줄은 건드리지 않는다**.
 *   시간압박 실수로 복습 간격이 초기화되면 억울하고, 반대로 찍어서 맞힌 걸
 *   장기기억으로 승격시켜도 안 되기 때문.
 */
export function recordReviews(
  entries: ReviewEntry[],
  opts: { coverageOnly?: boolean } = {},
): ReviewState {
  const s = loadReview();
  if (entries.length === 0) return s;
  const now = Date.now();
  const schedule = !opts.coverageOnly;

  for (const e of entries) {
    const bucket = s[e.part];
    if (!bucket) continue;
    const prev = bucket[e.id];
    const card: ReviewCard = prev
      ? { ...prev }
      : { box: 0, due: now, seen: 0, correct: 0, last: false };

    card.seen += 1;
    if (e.correct) card.correct += 1;
    card.last = e.correct;
    if (e.category) card.cat = e.category;

    if (schedule) {
      card.box = e.correct ? Math.min(card.box + 1, MAX_REVIEW_BOX) : 0;
      card.due = now + REVIEW_INTERVAL_DAYS[card.box] * DAY;
    }
    bucket[e.id] = card;
  }

  save(s);
  return s;
}

/** 이 카드가 지금 복습 대상인가 — 한 번이라도 맞혀 간격이 잡힌 뒤 예정일이 지난 것 */
function cardDue(card: ReviewCard, now: number): boolean {
  return card.box > 0 && card.due <= now;
}

/**
 * 특정 파트에서 **지금 복습해야 할** 문항 ID 집합.
 * 박스 0(=아직 못 맞힌 문항)은 여기 들어가지 않는다 — 그건 정복 대기(mastery)가 관리하고
 * 어차피 계속 출제되기 때문. 여기는 "맞혔지만 이제 다시 확인할 때가 된" 문항만.
 */
export function dueIdSet(
  part: MasteryPart,
  state: ReviewState = loadReview(),
  now: number = Date.now(),
): Set<string> {
  const out = new Set<string>();
  const bucket = state[part];
  if (!bucket) return out;
  for (const [id, card] of Object.entries(bucket)) {
    if (cardDue(card, now)) out.add(id);
  }
  return out;
}

/** 파트별 복습 예정 문항 수 */
export function dueCountByPart(
  state: ReviewState = loadReview(),
  now: number = Date.now(),
): Record<MasteryPart, number> {
  const out = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 } as Record<MasteryPart, number>;
  for (const part of MASTERY_PARTS) {
    let n = 0;
    for (const card of Object.values(state[part] ?? {})) if (cardDue(card, now)) n++;
    out[part] = n;
  }
  return out;
}

/** 전체 복습 예정 문항 수 */
export function dueTotal(
  state: ReviewState = loadReview(),
  now: number = Date.now(),
): number {
  return MASTERY_PARTS.reduce((n, p) => n + dueCountByPart(state, now)[p], 0);
}

export interface ReviewSummary {
  /** 지금 복습 예정 문항 수 */
  due: number;
  /** 스케줄에 올라온(한 번이라도 맞힌) 문항 수 */
  scheduled: number;
  /** 장기기억(박스≥LONGTERM_BOX) 문항 수 */
  longterm: number;
  /** 가장 가까운 다음 복습 시각(ms). 예정된 게 없으면 null */
  nextDueAt: number | null;
  /** 파트별 복습 예정 수 */
  byPart: Record<MasteryPart, number>;
}

/** 랜딩·리포트용 요약 */
export function buildReviewSummary(
  state: ReviewState = loadReview(),
  now: number = Date.now(),
): ReviewSummary {
  let due = 0;
  let scheduled = 0;
  let longterm = 0;
  let nextDueAt: number | null = null;
  const byPart = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 } as Record<MasteryPart, number>;

  for (const part of MASTERY_PARTS) {
    for (const card of Object.values(state[part] ?? {})) {
      if (card.box <= 0) continue;
      scheduled += 1;
      if (card.box >= LONGTERM_BOX) longterm += 1;
      if (cardDue(card, now)) {
        due += 1;
        byPart[part] += 1;
      } else if (nextDueAt == null || card.due < nextDueAt) {
        nextDueAt = card.due;
      }
    }
  }
  return { due, scheduled, longterm, nextDueAt, byPart };
}

/** "3일 뒤" 같은 사람이 읽는 표기 */
export function formatDueIn(at: number, now: number = Date.now()): string {
  const ms = at - now;
  if (ms <= 0) return "지금";
  const hours = Math.round(ms / (60 * 60 * 1000));
  if (hours < 24) return `${Math.max(1, hours)}시간 뒤`;
  return `${Math.round(ms / DAY)}일 뒤`;
}

export function resetReview(): ReviewState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // 무시
    }
  }
  return emptyState();
}
