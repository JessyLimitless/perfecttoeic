// 학습 진도 영속화 (localStorage) — 누적 정답률·연속 학습일·유형별 누적 성적.
// 세션이 끝날 때(store.end) 기록하고, 로비에서 불러와 보여준다.

import { normalizeCategory, QUESTION_TYPE_META } from "./questionTypes";
import type { PracticeRecord } from "./store";

const KEY = "toeic-progress-v1";

export interface TypeProgress {
  label: string;
  solved: number;
  correct: number;
}

export interface Progress {
  totalSolved: number;
  totalCorrect: number;
  bestStreak: number;
  /** 학습한 날짜들 ('YYYY-MM-DD', 오름차순 유니크) */
  studyDates: string[];
  /** 유형별 누적 성적 (key = `part:type`) */
  byType: Record<string, TypeProgress>;
  updatedAt: string;
}

const EMPTY: Progress = {
  totalSolved: 0,
  totalCorrect: 0,
  bestStreak: 0,
  studyDates: [],
  byType: {},
  updatedAt: "",
};

/** 로컬 시간 기준 오늘 날짜 'YYYY-MM-DD' */
function fmtDate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** 한 기록의 유형 키/라벨 — Part 7은 정규화 유형, Part 5·6은 문법 분류 */
function typeKeyLabel(r: PracticeRecord): { key: string; label: string } {
  if (r.part === 7) {
    const t = normalizeCategory(r.question.category);
    return { key: `7:${t}`, label: QUESTION_TYPE_META[t].label };
  }
  const raw = r.question.category ?? "기타";
  return { key: `${r.part}:${raw}`, label: `Part ${r.part} · ${raw}` };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const p = JSON.parse(raw) as Partial<Progress>;
    if (typeof p.totalSolved !== "number") return { ...EMPTY };
    return {
      ...EMPTY,
      ...p,
      byType: p.byType ?? {},
      studyDates: p.studyDates ?? [],
    };
  } catch {
    return { ...EMPTY };
  }
}

function save(p: Progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // 저장 공간 초과 등은 무시 (진도는 부가 기능)
  }
}

/** 끝난 세션의 기록을 누적 진도에 합치고 저장한다 */
export function recordSession(
  history: PracticeRecord[],
  bestStreak: number,
): Progress {
  const p = loadProgress();
  if (history.length === 0) return p;

  for (const r of history) {
    p.totalSolved += 1;
    if (r.isCorrect) p.totalCorrect += 1;
    const { key, label } = typeKeyLabel(r);
    const t = p.byType[key] ?? { label, solved: 0, correct: 0 };
    t.solved += 1;
    if (r.isCorrect) t.correct += 1;
    t.label = label;
    p.byType[key] = t;
  }

  p.bestStreak = Math.max(p.bestStreak, bestStreak);
  const today = fmtDate(new Date());
  if (!p.studyDates.includes(today)) {
    p.studyDates = [...p.studyDates, today].sort();
  }
  p.updatedAt = new Date().toISOString();

  save(p);
  return p;
}

export function resetProgress(): Progress {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // 무시
    }
  }
  return { ...EMPTY };
}

/** 오늘(또는 어제)부터 거꾸로 이어지는 연속 학습일 수 */
export function currentStreak(studyDates: string[]): number {
  if (studyDates.length === 0) return 0;
  const set = new Set(studyDates);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  // 오늘 학습 전이면 어제부터 카운트 (오늘 아직 안 했어도 연속은 유지)
  if (!set.has(fmtDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(fmtDate(cursor))) return 0;
  }

  let streak = 0;
  while (set.has(fmtDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** 누적 약점 유형 (충분히 푼 유형 중 정답률 최저) */
export function weakestType(
  byType: Record<string, TypeProgress>,
): { label: string; accuracy: number; solved: number } | null {
  const entries = Object.values(byType).filter((t) => t.solved >= 4);
  if (entries.length === 0) return null;
  let best = entries[0];
  let bestAcc = best.correct / best.solved;
  for (const t of entries) {
    const acc = t.correct / t.solved;
    if (acc < bestAcc) {
      best = t;
      bestAcc = acc;
    }
  }
  return {
    label: best.label,
    accuracy: Math.round(bestAcc * 100),
    solved: best.solved,
  };
}
