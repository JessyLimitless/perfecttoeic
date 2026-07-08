// 정복(Conquest) 진행 — 이 서비스의 단일 진행축.
// "운동선수가 기록에 도전하듯" 6개 영역(리딩 5·6·7 + 리스닝 2·3·4)의 모든 문항을
// 하나씩 만점(100%) 정복해 실전 만점(전 파트 100%)에 도달하는 서사.
// 진행 = 전체 정복도(고유 정답 문항 비율) → 정복 등급이 오른다. RP/XP 없음.
// 빌류킹 대결은 정복도를 채우는 경쟁 엔진이자 정상의 최종 상대.

import type { Difficulty } from "@/game/types";
import { loadMastery, masteredTotalOf } from "@/game/mastery";

// ─────────────────────────── 정복 등급 사다리 ───────────────────────────

export type GradeId =
  | "ROOKIE"
  | "CHALLENGER"
  | "CONTENDER"
  | "PRO"
  | "ELITE"
  | "GRANDMASTER";

export interface GradeMeta {
  id: GradeId;
  index: number; // 0~5
  /** 등급 이름 (선수 등급) */
  label: string;
  emoji: string;
  /** tailwind 그라데이션 (from-… to-…) */
  gradient: string;
  color: string;
  /** 이 등급 진입 정복도(%) */
  minCoverage: number;
  /** 한 줄 서사 */
  tagline: string;
}

/** 정복도(%)로 오르는 6단계 등급 — 최고 = 그랜드마스터(실전 만점 정복자) */
export const GRADES: GradeMeta[] = [
  { id: "ROOKIE",      index: 0, label: "루키",       emoji: "🥾", gradient: "from-slate-400 to-slate-500",   color: "#64748b", minCoverage: 0,  tagline: "출발선에 선 도전자" },
  { id: "CHALLENGER",  index: 1, label: "챌린저",     emoji: "🎽", gradient: "from-teal-400 to-emerald-500",  color: "#10b981", minCoverage: 15, tagline: "기록을 쌓기 시작했다" },
  { id: "CONTENDER",   index: 2, label: "컨텐더",     emoji: "🏃", gradient: "from-sky-400 to-cyan-500",      color: "#06b6d4", minCoverage: 30, tagline: "본선에 오른 실력자" },
  { id: "PRO",         index: 3, label: "프로",       emoji: "⚡", gradient: "from-indigo-400 to-violet-500", color: "#6366f1", minCoverage: 50, tagline: "절반을 넘어선 프로" },
  { id: "ELITE",       index: 4, label: "엘리트",     emoji: "🔥", gradient: "from-amber-400 to-orange-500",  color: "#f59e0b", minCoverage: 75, tagline: "정상을 눈앞에 둔 엘리트" },
  { id: "GRANDMASTER", index: 5, label: "그랜드마스터", emoji: "🏆", gradient: "from-amber-300 to-yellow-500",  color: "#eab308", minCoverage: 92, tagline: "실전 만점을 정복하는 자" },
];

/** 정복도(%) → 현재 등급 */
export function gradeFromCoverage(coveragePct: number): GradeMeta {
  let g = GRADES[0];
  for (const meta of GRADES) if (coveragePct >= meta.minCoverage) g = meta;
  return g;
}

export function gradeById(id: GradeId): GradeMeta {
  return GRADES.find((g) => g.id === id) ?? GRADES[0];
}

/** 다음 등급 (최고 등급이면 null) */
export function nextGrade(g: GradeMeta): GradeMeta | null {
  return GRADES[g.index + 1] ?? null;
}

export interface GradeProgress {
  grade: GradeMeta;
  next: GradeMeta | null;
  /** 현재 등급 구간 진행률 0~1 (최고 등급은 만점까지의 비율) */
  ratio: number;
  /** 다음 등급까지 남은 정복도 %p (최고 등급이면 100 - coverage) */
  toNextPct: number;
  coverage: number;
}

/** 정복도(%) → 등급 + 다음 등급까지 진행 */
export function gradeProgress(coveragePct: number): GradeProgress {
  const grade = gradeFromCoverage(coveragePct);
  const next = nextGrade(grade);
  if (!next) {
    const span = Math.max(1, 100 - grade.minCoverage);
    return {
      grade,
      next: null,
      ratio: Math.min(1, (coveragePct - grade.minCoverage) / span),
      toNextPct: Math.max(0, 100 - coveragePct),
      coverage: coveragePct,
    };
  }
  const span = Math.max(1, next.minCoverage - grade.minCoverage);
  return {
    grade,
    next,
    ratio: Math.min(1, Math.max(0, (coveragePct - grade.minCoverage) / span)),
    toNextPct: Math.max(0, next.minCoverage - coveragePct),
    coverage: coveragePct,
  };
}

// ─────────────────────────── 빌류킹 봇 스케일링 ───────────────────────────

/**
 * 빌류킹 봇 난이도 — 정복한 문항 총수에 비례(정복할수록 강해짐).
 * totals 없이 계산 가능하도록 절대 문항수 기준(전체 ~2,500문항 스케일).
 */
export function botDifficultyFromMastered(masteredTotal: number): Difficulty {
  if (masteredTotal >= 900) return "HARD";
  if (masteredTotal >= 250) return "MEDIUM";
  return "EASY";
}

// ─────────────────────────── 대결 pending (정복도 충전·등급업 감지) ───────────────────────────

const KEY = "toeic-conquest-v1";

interface Pending {
  id: string;
  /** 대결 시작 시점의 정복 문항 총수 (등급 변화 감지용) */
  masteredBefore: number;
}

function token(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * 빌류킹 대결 개시 — pending 발급 + 정복 진척 기반 봇 난이도 반환.
 * (match/lc-match 페이지가 ?ranked=1 진입 시 호출)
 */
export function armConquest(): { id: string; difficulty: Difficulty } {
  const masteredBefore = masteredTotalOf(loadMastery());
  const id = token();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ id, masteredBefore } satisfies Pending));
    } catch {
      /* 무시 */
    }
  }
  return { id, difficulty: botDifficultyFromMastered(masteredBefore) };
}

/**
 * 대결 결과 반영 시점에 pending을 소비(1회) — 대결 시작 스냅샷을 돌려주고 지운다.
 * 없으면(캐주얼/중복) null. 정복도 자체는 mastery.recordAnswers로 따로 채운다.
 */
export function takePendingConquest(): { masteredBefore: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Pending>;
    window.localStorage.removeItem(KEY);
    if (typeof p.masteredBefore !== "number") return null;
    return { masteredBefore: p.masteredBefore };
  } catch {
    return null;
  }
}
