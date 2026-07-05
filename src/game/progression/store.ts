// 게임화 진행 영속화 (localStorage `toeic-progress-v1`).
// progress.ts / match/persist.ts 스타일: SSR 안전(typeof window 가드), 예외는 조용히 무시.
// 크레딧은 단일 소스 유지를 위해 대결 모드의 persist(match/persist)를 재사용한다.

import { addCredits, loadIdentity } from "@/game/match/persist";
import {
  levelFromXp,
  rewardsForLevel,
  tierForLevel,
  PROGRESS_VERSION,
  type LevelUpResult,
  type Reward,
} from "./types";

const KEY = "toeic-progress-v1";
/** HUD 등이 구독하는 갱신 이벤트명 */
export const PROGRESS_EVENT = "toeic-progress";

export interface ProgressState {
  version: number;
  /** 누적 XP */
  xp: number;
  streak: { count: number; lastDate: string };
  inventory: { hints: number; freezes: number };
  unlocks: {
    snakeSkins: string[];
    avatars: string[];
    themes: string[];
    modes: string[];
  };
  endless: { bestChain: number; bestScore: number; runs: number };
  stats: { totalCorrect: number };
}

function fresh(): ProgressState {
  return {
    version: PROGRESS_VERSION,
    xp: 0,
    streak: { count: 0, lastDate: "" },
    inventory: { hints: 1, freezes: 0 },
    unlocks: { snakeSkins: ["classic"], avatars: [], themes: [], modes: [] },
    endless: { bestChain: 0, bestScore: 0, runs: 0 },
    stats: { totalCorrect: 0 },
  };
}

/** 저장된 값을 부분 손상에도 정상화해서 반환 */
export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return fresh();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return fresh();
    const p = JSON.parse(raw) as Partial<ProgressState>;
    const base = fresh();
    return {
      version: PROGRESS_VERSION,
      xp: typeof p.xp === "number" && p.xp >= 0 ? Math.floor(p.xp) : 0,
      streak: {
        count: typeof p.streak?.count === "number" ? p.streak.count : 0,
        lastDate: typeof p.streak?.lastDate === "string" ? p.streak.lastDate : "",
      },
      inventory: {
        hints: typeof p.inventory?.hints === "number" ? p.inventory.hints : base.inventory.hints,
        freezes: typeof p.inventory?.freezes === "number" ? p.inventory.freezes : 0,
      },
      unlocks: {
        snakeSkins: dedupe(["classic", ...(p.unlocks?.snakeSkins ?? [])]),
        avatars: p.unlocks?.avatars ?? [],
        themes: p.unlocks?.themes ?? [],
        modes: p.unlocks?.modes ?? [],
      },
      endless: {
        bestChain: p.endless?.bestChain ?? 0,
        bestScore: p.endless?.bestScore ?? 0,
        runs: p.endless?.runs ?? 0,
      },
      stats: { totalCorrect: p.stats?.totalCorrect ?? 0 },
    };
  } catch {
    return fresh();
  }
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

function save(st: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(st));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    /* 저장 초과 등 무시 (부가 기능) */
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (로컬 근사)
}

function daysBetween(a: string, b: string): number {
  const da = Date.parse(a + "T00:00:00");
  const db = Date.parse(b + "T00:00:00");
  if (Number.isNaN(da) || Number.isNaN(db)) return Infinity;
  return Math.round((db - da) / 86400000);
}

/** 오늘 활동 반영: 스트릭 갱신(연속/유지/리셋). st를 변형한다. */
function touchStreak(st: ProgressState) {
  const today = todayStr();
  if (st.streak.lastDate === today) return; // 오늘 이미 반영
  const gap = st.streak.lastDate ? daysBetween(st.streak.lastDate, today) : Infinity;
  if (gap === 1) st.streak.count += 1;
  else if (gap <= 0) {
    /* 시계 역행 등 — 유지 */
  } else if (st.streak.count === 0) st.streak.count = 1;
  else if (st.inventory.freezes > 0 && gap === 2) {
    // 하루 건너뜀 → 프리즈로 방어
    st.inventory.freezes -= 1;
    st.streak.count += 1;
  } else st.streak.count = 1; // 끊김 → 리셋(오늘부터 1)
  st.streak.lastDate = today;
}

/** 보상 적용 — 크레딧은 match persist로, 나머지는 st에 반영 */
function applyRewards(rewards: Reward[], st: ProgressState) {
  for (const r of rewards) {
    switch (r.kind) {
      case "credits":
        addCredits(r.amount);
        break;
      case "hint":
        st.inventory.hints += r.amount;
        break;
      case "freeze":
        st.inventory.freezes += r.amount;
        break;
      case "unlock":
        if (r.slot === "snakeSkin") st.unlocks.snakeSkins = dedupe([...st.unlocks.snakeSkins, r.id]);
        else if (r.slot === "avatar") st.unlocks.avatars = dedupe([...st.unlocks.avatars, r.id]);
        else if (r.slot === "theme") st.unlocks.themes = dedupe([...st.unlocks.themes, r.id]);
        else if (r.slot === "mode") st.unlocks.modes = dedupe([...st.unlocks.modes, r.id]);
        break;
    }
  }
}

/**
 * XP를 지급하고 레벨업 여부/보상을 계산·적용한다.
 * 여러 레벨을 한 번에 넘겨도 그 사이 모든 레벨의 보상을 합산한다.
 * @returns 총 XP와 레벨업 결과(없으면 null)
 */
export function grantXp(
  amount: number,
  opts?: { correct?: number },
): { total: number; levelUp: LevelUpResult | null } {
  const st = loadProgress();
  const before = levelFromXp(st.xp).level;
  st.xp += Math.max(0, Math.round(amount));
  const after = levelFromXp(st.xp).level;
  if (opts?.correct) st.stats.totalCorrect += opts.correct;

  let levelUp: LevelUpResult | null = null;
  if (after > before) {
    const rewards: Reward[] = [];
    let chest = false;
    for (let lv = before + 1; lv <= after; lv++) {
      const r = rewardsForLevel(lv);
      rewards.push(...r.rewards);
      if (r.chest) chest = true;
    }
    applyRewards(rewards, st);
    const beforeTier = tierForLevel(before).id;
    const afterTier = tierForLevel(after);
    levelUp = {
      from: before,
      to: after,
      rewards,
      chest,
      tierUp: afterTier.id !== beforeTier ? afterTier : null,
    };
  }

  touchStreak(st);
  save(st);
  return { total: st.xp, levelUp };
}

/** 엔드리스 신기록 기록 (best 갱신 시에만 저장). runs는 항상 +1. */
export function recordEndlessRun(chain: number, score: number): void {
  const st = loadProgress();
  st.endless.runs += 1;
  st.endless.bestChain = Math.max(st.endless.bestChain, chain);
  st.endless.bestScore = Math.max(st.endless.bestScore, score);
  save(st);
}

/** 힌트 1개 소모(있으면 true). */
export function spendHint(): boolean {
  const st = loadProgress();
  if (st.inventory.hints <= 0) return false;
  st.inventory.hints -= 1;
  save(st);
  return true;
}

/** 현재 보유 크레딧 (단일 소스 = match persist) */
export function currentCredits(): number {
  return loadIdentity().credits;
}

/** 크레딧 n 차감(부족하면 false). 상점 구매용. */
export function spendCredits(n: number): boolean {
  if (n <= 0) return true;
  if (loadIdentity().credits < n) return false;
  addCredits(-n);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
  return true;
}

/** 힌트 n개 지급 */
export function addHints(n: number): void {
  const st = loadProgress();
  st.inventory.hints = Math.max(0, st.inventory.hints + n);
  save(st);
}

/** 스트릭 프리즈 n개 지급 */
export function addFreezes(n: number): void {
  const st = loadProgress();
  st.inventory.freezes = Math.max(0, st.inventory.freezes + n);
  save(st);
}

/** 스네이크 스킨 해금 */
export function unlockSkin(id: string): void {
  const st = loadProgress();
  st.unlocks.snakeSkins = dedupe([...st.unlocks.snakeSkins, id]);
  save(st);
}

/** 최신 해금 스네이크 스킨 id (없으면 classic) */
export function activeSnakeSkin(): string {
  const st = loadProgress();
  return st.unlocks.snakeSkins[st.unlocks.snakeSkins.length - 1] ?? "classic";
}

/** 전체 진행 초기화 (크레딧/신원은 유지) */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    /* 무시 */
  }
}
