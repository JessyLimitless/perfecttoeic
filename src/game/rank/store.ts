// 랭크 대결 영속화 (localStorage `toeic-rank-v1`).
// SSR 안전(typeof window 가드), 예외는 조용히 무시. 동결 계약 match/*는 건드리지 않는다.

import type { Difficulty } from "@/game/types";
import {
  RANK_VERSION,
  botDifficultyForRp,
  rankFromRp,
  rpDelta,
  type RankChange,
  type RankOutcome,
} from "./types";
import { loadDiagnosticResult } from "@/game/diagnostic";

const KEY = "toeic-rank-v1";
export const RANK_EVENT = "toeic-rank";

export interface RankState {
  version: number;
  rp: number;
  peakRp: number;
  wins: number;
  losses: number;
  /** 현재 연승 (패배 시 0) */
  winStreak: number;
  seasonId: number;
  /** 진행 중인 랭크 매치 토큰 (없으면 캐주얼) */
  pendingId: string | null;
  /** 마지막으로 RP 반영한 매치 토큰 (중복 반영 방지) */
  lastAppliedId: string | null;
  /** 배치고사(진단) 반영 여부 */
  placed: boolean;
}

/** 현재 시즌 id — 주 단위(대략). 리셋 로직은 추후. */
function currentSeasonId(): number {
  return Math.floor(Date.now() / (7 * 86400000));
}

function fresh(): RankState {
  return {
    version: RANK_VERSION,
    rp: 0,
    peakRp: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    seasonId: currentSeasonId(),
    pendingId: null,
    lastAppliedId: null,
    placed: false,
  };
}

export function loadRank(): RankState {
  if (typeof window === "undefined") return fresh();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return fresh();
    const p = JSON.parse(raw) as Partial<RankState>;
    return {
      version: RANK_VERSION,
      rp: numOr(p.rp, 0),
      peakRp: numOr(p.peakRp, numOr(p.rp, 0)),
      wins: numOr(p.wins, 0),
      losses: numOr(p.losses, 0),
      winStreak: numOr(p.winStreak, 0),
      seasonId: numOr(p.seasonId, currentSeasonId()),
      pendingId: typeof p.pendingId === "string" ? p.pendingId : null,
      lastAppliedId: typeof p.lastAppliedId === "string" ? p.lastAppliedId : null,
      placed: p.placed === true,
    };
  } catch {
    return fresh();
  }
}

function numOr(v: unknown, d: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : d;
}

function save(st: RankState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(st));
    window.dispatchEvent(new Event(RANK_EVENT));
  } catch {
    /* 무시 */
  }
}

function token(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * 진단(레벨 테스트) 점수를 첫 배치 RP로 환산 (1회만).
 * total 10~990 → RP 0~1900 근사. 진단 없으면 0(브론즈 IV) 시작.
 */
function placeFromDiagnostic(st: RankState) {
  if (st.placed) return;
  st.placed = true;
  const diag = loadDiagnosticResult();
  if (!diag) return;
  const total = Math.max(10, Math.min(990, diag.totalScore));
  // 200→~0, 990→~1900 선형 근사, 하한 0
  const rp = Math.max(0, Math.round(((total - 200) / (990 - 200)) * 1900));
  st.rp = rp;
  st.peakRp = rp;
}

/**
 * 랭크 매치 개시 — pending 토큰 발급 + 내 랭크 기반 봇 난이도 반환.
 * (매치 페이지가 ?ranked=1 진입 시 호출)
 */
export function armRankedMatch(): { id: string; difficulty: Difficulty } {
  const st = loadRank();
  placeFromDiagnostic(st);
  const id = token();
  st.pendingId = id;
  save(st);
  return { id, difficulty: botDifficultyForRp(st.rp) };
}

/**
 * 랭크 매치 결과 반영 — pending이 있고 아직 반영 안 했으면 RP 증감.
 * 캐주얼(무장전) 매치면 null. 중복 호출은 안전(두 번째는 null).
 */
export function applyRankedOutcome(o: RankOutcome): RankChange | null {
  const st = loadRank();
  if (!st.pendingId || st.pendingId === st.lastAppliedId) return null;

  const before = rankFromRp(st.rp);
  const delta = rpDelta(o);
  st.rp = Math.max(0, st.rp + delta);
  st.peakRp = Math.max(st.peakRp, st.rp);
  if (o.won) {
    st.wins += 1;
    st.winStreak += 1;
  } else {
    st.losses += 1;
    st.winStreak = 0;
  }
  st.lastAppliedId = st.pendingId;
  st.pendingId = null;
  save(st);

  const after = rankFromRp(st.rp);
  const beforeTierIdx = tierIndex(before.tier.id);
  const afterTierIdx = tierIndex(after.tier.id);
  return {
    before,
    after,
    delta,
    promoted: rankOrdinal(after) > rankOrdinal(before),
    demoted: rankOrdinal(after) < rankOrdinal(before),
    tierPromoted: afterTierIdx > beforeTierIdx,
    tierDemoted: afterTierIdx < beforeTierIdx,
  };
}

function tierIndex(id: string): number {
  return ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER"].indexOf(id);
}

/** 승급/강등 판정을 위한 단조 증가 서열값 (티어×4 − 디비전) */
function rankOrdinal(pos: { tier: { id: string }; division: number; rp: number }): number {
  if (pos.division === 0) return 100 + pos.rp; // 마스터는 RP 자체
  return tierIndex(pos.tier.id) * 4 + (4 - pos.division);
}

// ─────────────────────────── 리더보드 시뮬 ───────────────────────────

const BOT_NAMES = [
  "GrammarWolf", "SpeedReader", "ParkJisu", "TOEIC_King", "Nova_LC",
  "빠른손민준", "InferMax", "김서연", "PassageHunter", "RC_Sniper",
  "ClozeMaster", "이도윤", "VocabViper", "최하은", "TensionAce",
  "정우진", "SkimScan", "한예린", "IdiomFox", "박건우",
  "ContextCat", "윤지호", "NativeEar", "조수아", "PartSeven",
];

export interface LeaderRow {
  rank: number;
  name: string;
  rp: number;
  isUser: boolean;
}

/**
 * 내 RP 주변의 가상 랭커 순위표 (백엔드 없이 시뮬, 표시 전용).
 * 상위 몇 명 + 내 주변으로 구성. 결정적이지 않아도 됨(매 렌더 안정 위해 seed 사용).
 */
export function simulateLeaderboard(rp: number, count = 9): LeaderRow[] {
  // 내 위/아래로 봇 RP를 퍼뜨린다
  const rows: { name: string; rp: number; isUser: boolean }[] = [
    { name: "나", rp, isUser: true },
  ];
  const half = Math.floor(count / 2);
  for (let i = 1; i <= half; i++) {
    rows.push({ name: BOT_NAMES[(i * 3) % BOT_NAMES.length], rp: rp + i * (18 + ((i * 7) % 13)), isUser: false });
    rows.push({ name: BOT_NAMES[(i * 5 + 1) % BOT_NAMES.length], rp: Math.max(0, rp - i * (16 + ((i * 5) % 11))), isUser: false });
  }
  rows.sort((a, b) => b.rp - a.rp);
  return rows.slice(0, count + 1).map((r, i) => ({ rank: i + 1, name: r.name, rp: Math.round(r.rp), isUser: r.isUser }));
}

/** 시즌/전체 초기화 (랭크만) */
export function resetRank(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(RANK_EVENT));
  } catch {
    /* 무시 */
  }
}
