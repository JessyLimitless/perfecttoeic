// 주간 리그 (Weekly League) — 백엔드 없이 시뮬레이션.
// 내 티어대의 가상 랭커 ~20명과 7일간 주간 점수를 겨루고, 주가 바뀌면
// 지난주 순위에 따른 보상을 청구한다. 랭크 래더(RP)와는 별개의 "주간 점수".
// localStorage `toeic-league-v1` 에 마지막으로 정산한 주(week)만 저장한다.

import { loadRank, RANK_EVENT } from "./store";
import { rankFromRp, RANK_TIERS } from "./types";
import { addCredits } from "@/game/match/persist";
import { grantXp } from "@/game/progression/store";

const KEY = "toeic-league-v1";

/** 리그 그룹 인원 (나 + 봇 19) */
export const GROUP_SIZE = 20;
/** 승급권(상위) 인원 */
export const PROMO_ZONE = 5;
/** 강등권(하위) 인원 */
export const RELEG_ZONE = 5;

export type LeagueZone = "promo" | "safe" | "releg";

export interface LeagueRow {
  rank: number;
  name: string;
  /** 이번 주 누적 점수 (RP성 주간 스코어) */
  score: number;
  isUser: boolean;
  zone: LeagueZone;
}

export interface WeekInfo {
  /** floor(epochDays/7) — seasonId 와 동일 기준의 주 번호 */
  week: number;
  /** 0(주 시작)~6 */
  dayOfWeek: number;
  /** 이번 주 종료까지 남은 일수 1~7 */
  daysLeft: number;
}

export interface WeeklyReward {
  claimable: boolean;
  /** 지난주 최종 순위 (청구 가능할 때만) */
  placement?: number;
  credits: number;
  xp: number;
}

// ─────────────────────────── 주(week) 계산 ───────────────────────────

/** 이번 주 정보 — week = floor(epochDays/7), seasonId 와 같은 기준. */
export function weekInfo(): WeekInfo {
  const epochDays = Math.floor(Date.now() / 86400000);
  const week = Math.floor(epochDays / 7);
  const dayOfWeek = ((epochDays % 7) + 7) % 7; // 0..6
  const daysLeft = 7 - dayOfWeek; // 1..7
  return { week, dayOfWeek, daysLeft };
}

// ─────────────────────────── 영속화 ───────────────────────────

interface LeagueState {
  /** 마지막으로 정산(청구/합류)한 주 번호. null = 아직 합류 전 */
  lastClaimWeek: number | null;
}

function loadState(): LeagueState {
  if (typeof window === "undefined") return { lastClaimWeek: null };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { lastClaimWeek: null };
    const p = JSON.parse(raw) as Partial<LeagueState>;
    return {
      lastClaimWeek:
        typeof p.lastClaimWeek === "number" && Number.isFinite(p.lastClaimWeek)
          ? p.lastClaimWeek
          : null,
    };
  } catch {
    return { lastClaimWeek: null };
  }
}

function saveState(st: LeagueState, opts?: { silent?: boolean }): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(st));
    if (!opts?.silent) window.dispatchEvent(new Event(RANK_EVENT));
  } catch {
    /* 무시 */
  }
}

// ─────────────────────────── 시드 RNG ───────────────────────────

/** 결정적 유사난수 (mulberry32) — 같은 주/시드에는 같은 순위표가 나온다. */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 가상 랭커 이름 풀 (한/영 혼합) */
const LEAGUE_NAMES = [
  "GrammarWolf", "SpeedReader", "ParkJisu", "TOEIC_King", "Nova_LC",
  "빠른손민준", "InferMax", "김서연", "PassageHunter", "RC_Sniper",
  "ClozeMaster", "이도윤", "VocabViper", "최하은", "TensionAce",
  "정우진", "SkimScan", "한예린", "IdiomFox", "박건우",
  "ContextCat", "윤지호", "NativeEar", "조수아", "PartSeven",
  "리스닝여왕", "SyntaxSage",
];

/** 주별로 봇 이름을 결정적으로 뒤섞어 GROUP_SIZE-1 명 선발 */
function pickNames(week: number): string[] {
  const rand = rng(week * 0x9e3779b9);
  const pool = [...LEAGUE_NAMES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, GROUP_SIZE - 1);
}

// ─────────────────────────── 순위표 ───────────────────────────

/** rp 로 티어 서열 인덱스 (0=브론즈 … 5=마스터) */
function tierIndexFromRp(rp: number): number {
  const id = rankFromRp(rp).tier.id;
  return Math.max(0, RANK_TIERS.findIndex((t) => t.id === id));
}

/** 특정 주의 순위표를 결정적으로 구성 */
function buildStandings(week: number, rp: number): LeagueRow[] {
  const tierIdx = tierIndexFromRp(rp);
  const base = 300 + tierIdx * 260; // 티어가 높을수록 주간 점수대 상승
  const spread = base * 0.9;

  const names = pickNames(week);
  const rand = rng((week * 2654435761) ^ 0x85ebca6b);

  const rows: { name: string; score: number; isUser: boolean }[] = [];
  for (let i = 0; i < GROUP_SIZE - 1; i++) {
    rows.push({
      name: names[i] ?? `Rival${i + 1}`,
      score: Math.round(base + rand() * spread),
      isUser: false,
    });
  }

  // 내 주간 점수 — 티어 내 진행률을 반영해 안정적으로(같은 주엔 고정) 산출
  const ratio = rankFromRp(rp).ratio; // 0~1 (디비전 진행률)
  const myRand = rng(((week + 1) * 40503) ^ ((rp | 0) + 1));
  const myScore = Math.round(
    base + (0.18 + ratio * 0.62 + myRand() * 0.2) * spread,
  );
  rows.push({ name: "나", score: myScore, isUser: true });

  rows.sort((a, b) => b.score - a.score);
  return rows.map((r, i) => ({
    rank: i + 1,
    name: r.name,
    score: r.score,
    isUser: r.isUser,
    zone:
      i < PROMO_ZONE
        ? "promo"
        : i >= GROUP_SIZE - RELEG_ZONE
          ? "releg"
          : "safe",
  }));
}

/** 이번 주 리그 순위표 (표시 전용, 결정적) */
export function leagueStandings(): LeagueRow[] {
  const { week } = weekInfo();
  return buildStandings(week, loadRank().rp);
}

/** 특정 주의 내 최종 순위 */
function myPlacementForWeek(week: number, rp: number): number {
  const row = buildStandings(week, rp).find((r) => r.isUser);
  return row ? row.rank : GROUP_SIZE;
}

// ─────────────────────────── 주간 보상 ───────────────────────────

/** 지난주 순위 → 보상 테이블 */
function rewardForPlacement(placement: number): { credits: number; xp: number } {
  if (placement <= PROMO_ZONE) return { credits: 50, xp: 200 }; // 승급권
  if (placement <= GROUP_SIZE - RELEG_ZONE) return { credits: 20, xp: 80 }; // 유지권
  return { credits: 8, xp: 30 }; // 강등권 — 위로 보상
}

/**
 * 이번 주 청구 가능한 보상.
 * 저장된 마지막 정산 주가 이번 주보다 이전이면 → 지난주 성적으로 보상 청구 가능.
 * 최초 방문(null)이면 이번 주를 기준선으로 조용히 시드(보상 없음).
 */
export function weeklyReward(): WeeklyReward {
  const { week } = weekInfo();
  const st = loadState();

  if (st.lastClaimWeek === null) {
    // 첫 합류 — 이번 주를 기준선으로 삼고 지난주 보상은 없음
    saveState({ lastClaimWeek: week }, { silent: true });
    return { claimable: false, credits: 0, xp: 0 };
  }

  if (week > st.lastClaimWeek) {
    const rp = loadRank().rp;
    const placement = myPlacementForWeek(st.lastClaimWeek, rp);
    const r = rewardForPlacement(placement);
    return { claimable: true, placement, credits: r.credits, xp: r.xp };
  }

  return { claimable: false, credits: 0, xp: 0 };
}

/**
 * 주간 보상 청구 — 크레딧/XP 지급 후 이번 주로 정산 표시.
 * 청구 불가면 아무 것도 하지 않고 그대로 반환. RANK_EVENT 발신.
 */
export function claimWeekly(): WeeklyReward {
  const r = weeklyReward();
  if (!r.claimable) return r;

  addCredits(r.credits);
  grantXp(r.xp);
  saveState({ lastClaimWeek: weekInfo().week }); // RANK_EVENT 발신

  return { ...r, claimable: false };
}
