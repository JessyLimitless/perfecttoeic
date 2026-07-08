// 리스닝 "세트별 진행·점수" 저장 — 세트 단위로 몇 번 풀었는지·최고 점수를 기록한다.
// 정복(문항 정복 streak) 판정은 mastery.ts가 단일 소스이고, 여기선 세트 카드에 보여줄
// 시도 횟수/최고점 같은 부가 진행 지표만 담당한다(중복 저장 최소화). localStorage 분리 키.

import {
  loadMastery,
  MASTER_STREAK,
  type MasteryState,
  type MasteryPart,
} from "./mastery";

const KEY = "toeic-listening-progress-v1";

export interface SetProgress {
  /** 이 세트를 끝까지 푼 횟수 */
  attempts: number;
  /** 최고 정답 수 */
  bestCorrect: number;
  /** 세트 문항 수 */
  total: number;
  /** 마지막 풀이 ISO 시각 */
  lastAt: string;
}

export type ListeningProgressState = Record<string, SetProgress>;

export function loadListeningProgress(): ListeningProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object") return {};
    const out: ListeningProgressState = {};
    for (const [id, v] of Object.entries(p as Record<string, any>)) {
      if (!v || typeof v !== "object") continue;
      out[id] = {
        attempts: Number(v.attempts) || 0,
        bestCorrect: Number(v.bestCorrect) || 0,
        total: Number(v.total) || 0,
        lastAt: typeof v.lastAt === "string" ? v.lastAt : "",
      };
    }
    return out;
  } catch {
    return {};
  }
}

function save(s: ListeningProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장공간 초과 등은 무시 (부가 기능)
  }
}

/** 한 세트를 끝까지 푼 결과를 기록(최고점 갱신·시도 +1). 갱신된 상태 반환. */
export function recordSetResult(
  setId: string,
  correct: number,
  total: number,
): ListeningProgressState {
  const s = loadListeningProgress();
  const prev = s[setId];
  s[setId] = {
    attempts: (prev?.attempts ?? 0) + 1,
    bestCorrect: Math.max(prev?.bestCorrect ?? 0, correct),
    total,
    lastAt: new Date().toISOString(),
  };
  save(s);
  return s;
}

export function resetListeningProgress(): ListeningProgressState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // 무시
    }
  }
  return {};
}

/** 세트 정복 상태 — mastery streaks + 세트 문항ID로 파생(정복=모든 문항 streak≥기준). */
export type SetConquestStatus = "untouched" | "pending" | "mastered";

export function setConquestStatus(
  questionIds: string[],
  part: MasteryPart,
  mastery: MasteryState = loadMastery(),
): { status: SetConquestStatus; mastered: number; total: number } {
  const streaks = mastery.parts[part]?.streaks ?? {};
  const total = questionIds.length;
  let masteredN = 0;
  let attempted = 0;
  for (const id of questionIds) {
    const st = streaks[id];
    if (st !== undefined) attempted += 1;
    if (st !== undefined && st >= MASTER_STREAK) masteredN += 1;
  }
  let status: SetConquestStatus;
  if (attempted === 0) status = "untouched";
  else if (total > 0 && masteredN === total) status = "mastered";
  else status = "pending";
  return { status, mastered: masteredN, total };
}
