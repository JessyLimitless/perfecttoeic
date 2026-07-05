// 게임화 진행(레벨/XP/티어/보상) 공유 계약 — FROZEN CONTRACT
// 스토어(store.ts)·HUD·레벨업 연출·스피드 스네이크가 함께 의존하는 단일 진실원.
// 시그니처는 바꾸지 말 것. 값(상수·테이블)만 튜닝 대상.

import type { Part } from "@/game/types";

export const PROGRESS_VERSION = 1;

// ─────────────────────────── XP 획득 ───────────────────────────

/** 파트별 정답 기본 XP */
export const XP_BY_PART: Record<Part, number> = { 5: 10, 6: 12, 7: 15 };
export const XP_LISTENING = 12;
export const XP_DEFAULT = 10;

/** 콤보 배율 — 콤보 5마다 +0.1, 상한 2.0 */
export function comboMultiplier(combo: number): number {
  return Math.min(2.0, 1 + Math.floor(Math.max(0, combo) / 5) * 0.1);
}

// ─────────────────────────── 레벨 곡선 ───────────────────────────

export const XP_BASE = 100;
export const XP_GROWTH = 1.18;

/** level → level+1 로 가는 데 필요한 XP */
export function xpToNext(level: number): number {
  return Math.round(XP_BASE * Math.pow(XP_GROWTH, Math.max(0, level - 1)));
}

export interface LevelInfo {
  /** 현재 레벨 (1부터) */
  level: number;
  /** 현재 레벨 진입 후 쌓인 XP */
  intoLevel: number;
  /** 현재 레벨의 총 필요 XP */
  span: number;
  /** 다음 레벨까지 남은 XP */
  toNext: number;
  /** 현재 레벨 진행률 0~1 */
  ratio: number;
}

/** 누적 XP → 레벨 정보 */
export function levelFromXp(totalXp: number): LevelInfo {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXp));
  // 안전 상한(레벨 999)
  while (level < 999) {
    const need = xpToNext(level);
    if (remaining < need) {
      return {
        level,
        intoLevel: remaining,
        span: need,
        toNext: need - remaining,
        ratio: need > 0 ? remaining / need : 0,
      };
    }
    remaining -= need;
    level += 1;
  }
  return { level, intoLevel: 0, span: xpToNext(level), toNext: xpToNext(level), ratio: 0 };
}

// ─────────────────────────── 티어 ───────────────────────────

export type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "MASTER";

export interface TierMeta {
  id: Tier;
  label: string;
  minLevel: number;
  emoji: string;
  /** tailwind 그라데이션 (from-... to-...) */
  gradient: string;
  /** 대표색 (hex) — HUD 배지 등 */
  color: string;
}

export const TIERS: TierMeta[] = [
  { id: "BRONZE", label: "브론즈", minLevel: 1, emoji: "🥉", gradient: "from-amber-700 to-orange-800", color: "#b45309" },
  { id: "SILVER", label: "실버", minLevel: 5, emoji: "🥈", gradient: "from-slate-400 to-slate-500", color: "#64748b" },
  { id: "GOLD", label: "골드", minLevel: 10, emoji: "🥇", gradient: "from-amber-400 to-yellow-500", color: "#f59e0b" },
  { id: "PLATINUM", label: "플래티넘", minLevel: 20, emoji: "💠", gradient: "from-cyan-400 to-teal-500", color: "#14b8a6" },
  { id: "DIAMOND", label: "다이아", minLevel: 35, emoji: "💎", gradient: "from-sky-400 to-indigo-500", color: "#6366f1" },
  { id: "MASTER", label: "마스터", minLevel: 50, emoji: "👑", gradient: "from-fuchsia-500 to-violet-600", color: "#c026d3" },
];

export function tierForLevel(level: number): TierMeta {
  let cur = TIERS[0];
  for (const t of TIERS) if (level >= t.minLevel) cur = t;
  return cur;
}

// ─────────────────────────── 스네이크 스킨 ───────────────────────────

export interface SnakeSkin {
  id: string;
  label: string;
  /** 몸통 tailwind 그라데이션 */
  body: string;
  /** 대표색 (hex) */
  color: string;
}

export const SNAKE_SKINS: Record<string, SnakeSkin> = {
  classic: { id: "classic", label: "클래식", body: "from-indigo-500 to-violet-500", color: "#6366f1" },
  emerald: { id: "emerald", label: "에메랄드", body: "from-emerald-400 to-teal-500", color: "#10b981" },
  amber: { id: "amber", label: "골든", body: "from-amber-400 to-orange-500", color: "#f59e0b" },
  violet: { id: "violet", label: "네온 바이올렛", body: "from-fuchsia-500 to-purple-600", color: "#c026d3" },
  cyber: { id: "cyber", label: "사이버", body: "from-cyan-400 to-blue-600", color: "#06b6d4" },
};

/** 마일스톤 레벨에서 해금되는 스킨 */
const SKIN_AT: Record<number, string> = { 5: "emerald", 10: "amber", 15: "violet", 20: "cyber" };

// ─────────────────────────── 보상 ───────────────────────────

export type Reward =
  | { kind: "credits"; amount: number }
  | { kind: "hint"; amount: number }
  | { kind: "freeze"; amount: number }
  | { kind: "unlock"; slot: "snakeSkin" | "avatar" | "theme" | "mode"; id: string; label: string };

/** 티어 승급 레벨에서 주는 해금 보상 */
const TIER_UNLOCK_AT: Record<number, Reward> = {
  10: { kind: "unlock", slot: "mode", id: "snake-hard", label: "스네이크 HARD 모드" },
  20: { kind: "unlock", slot: "mode", id: "league", label: "주간 리그 입장권" },
  35: { kind: "unlock", slot: "theme", id: "diamond", label: "다이아 테마" },
  50: { kind: "unlock", slot: "avatar", id: "crown", label: "마스터 왕관 아바타" },
};

/** 해당 레벨 도달 시 지급 보상. 반드시 1개 이상(never-empty). */
export function rewardsForLevel(level: number): { rewards: Reward[]; chest: boolean } {
  const rewards: Reward[] = [];
  const milestone = level % 5 === 0;

  const baseCredits = 10 + level * 5;
  rewards.push({ kind: "credits", amount: milestone ? baseCredits + 60 : baseCredits });

  if (level % 2 === 0) rewards.push({ kind: "hint", amount: 1 });

  const tierUnlock = TIER_UNLOCK_AT[level];
  if (tierUnlock) rewards.push(tierUnlock);

  if (milestone) {
    const skinId = SKIN_AT[level];
    if (skinId) {
      const skin = SNAKE_SKINS[skinId];
      rewards.push({ kind: "unlock", slot: "snakeSkin", id: skinId, label: `${skin.label} 스킨` });
    }
    rewards.push({ kind: "freeze", amount: 1 });
  }

  return { rewards, chest: milestone };
}

/** 다음 마일스톤(5의 배수) 레벨 */
export function nextMilestone(level: number): number {
  return Math.floor(level / 5) * 5 + 5;
}

/** 레벨업 결과 (연출용) */
export interface LevelUpResult {
  from: number;
  to: number;
  rewards: Reward[];
  chest: boolean;
  /** 승급했으면 새 티어, 아니면 null */
  tierUp: TierMeta | null;
}
