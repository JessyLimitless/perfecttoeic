// 랭크 대결(확장판 AI 대결) 공유 계약 — FROZEN CONTRACT.
// RP(랭크 포인트) 래더·티어/디비전·봇 스케일링·RP 증감 규칙의 단일 진실원.
// 기존 대결 엔진(match/*)의 동결 계약은 건드리지 않고 이 레이어를 바깥에 덧댄다.

import type { Difficulty } from "@/game/types";

export const RANK_VERSION = 1;

// ─────────────────────────── 티어/디비전 ───────────────────────────

export type RankTierId =
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "DIAMOND"
  | "MASTER";

/** 디비전당 RP, 티어당 디비전 수 (마스터는 무한대) */
export const RP_PER_DIVISION = 100;
export const DIVISIONS_PER_TIER = 4; // IV · III · II · I

export interface RankTierMeta {
  id: RankTierId;
  label: string;
  emoji: string;
  /** tailwind 그라데이션 (from-… to-…) */
  gradient: string;
  color: string;
  /** 이 티어 진입 RP */
  minRp: number;
}

/** 티어별 진입 RP: 각 티어 = 4디비전 × 100RP = 400RP 폭 (마스터는 상한 없음) */
export const RANK_TIERS: RankTierMeta[] = [
  { id: "BRONZE", label: "브론즈", emoji: "🥉", gradient: "from-amber-700 to-orange-800", color: "#b45309", minRp: 0 },
  { id: "SILVER", label: "실버", emoji: "🥈", gradient: "from-slate-400 to-slate-500", color: "#64748b", minRp: 400 },
  { id: "GOLD", label: "골드", emoji: "🥇", gradient: "from-amber-400 to-yellow-500", color: "#f59e0b", minRp: 800 },
  { id: "PLATINUM", label: "플래티넘", emoji: "💠", gradient: "from-cyan-400 to-teal-500", color: "#14b8a6", minRp: 1200 },
  { id: "DIAMOND", label: "다이아", emoji: "💎", gradient: "from-sky-400 to-indigo-500", color: "#6366f1", minRp: 1600 },
  { id: "MASTER", label: "마스터", emoji: "👑", gradient: "from-fuchsia-500 to-violet-600", color: "#c026d3", minRp: 2000 },
];

const ROMAN = ["IV", "III", "II", "I"] as const;

export interface RankPos {
  tier: RankTierMeta;
  /** 4(IV)~1(I), 마스터는 0 */
  division: number;
  /** "골드 II" / "마스터" */
  label: string;
  /** 현재 디비전에서 쌓인 RP (마스터는 2000 초과분) */
  rpIntoDivision: number;
  /** 디비전 폭 (마스터는 표시용 100 단위) */
  divisionSpan: number;
  /** 현재 디비전 진행률 0~1 */
  ratio: number;
  isMaster: boolean;
  /** 전체 RP */
  rp: number;
}

/** RP → 랭크 위치 */
export function rankFromRp(rpRaw: number): RankPos {
  const rp = Math.max(0, Math.floor(rpRaw));
  // 최상위부터 내려오며 티어 결정
  let tier = RANK_TIERS[0];
  for (const t of RANK_TIERS) if (rp >= t.minRp) tier = t;

  if (tier.id === "MASTER") {
    const into = rp - tier.minRp;
    return {
      tier,
      division: 0,
      label: `마스터 ${into}LP`,
      rpIntoDivision: into,
      divisionSpan: 100,
      ratio: (into % 100) / 100,
      isMaster: true,
      rp,
    };
  }

  const offset = rp - tier.minRp; // 0..399
  const divIndex = Math.min(DIVISIONS_PER_TIER - 1, Math.floor(offset / RP_PER_DIVISION)); // 0..3
  const rpIntoDivision = offset - divIndex * RP_PER_DIVISION;
  return {
    tier,
    division: DIVISIONS_PER_TIER - divIndex, // 4..1
    label: `${tier.label} ${ROMAN[divIndex]}`,
    rpIntoDivision,
    divisionSpan: RP_PER_DIVISION,
    ratio: rpIntoDivision / RP_PER_DIVISION,
    isMaster: false,
    rp,
  };
}

/** 다음 디비전/티어까지 남은 RP */
export function rpToNextDivision(rp: number): number {
  const pos = rankFromRp(rp);
  if (pos.isMaster) return 100 - (pos.rpIntoDivision % 100);
  return pos.divisionSpan - pos.rpIntoDivision;
}

// ─────────────────────────── 봇 스케일링 ───────────────────────────

/** 내 랭크에 맞춰 봇 난이도 매핑 (동결 계약의 BOT_PROFILE 3단계를 재활용) */
export function botDifficultyForRp(rp: number): Difficulty {
  if (rp >= 1600) return "HARD"; // 다이아+
  if (rp >= 800) return "MEDIUM"; // 골드·플래티넘
  return "EASY"; // 브론즈·실버
}

// ─────────────────────────── RP 증감 ───────────────────────────

export interface RankOutcome {
  won: boolean;
  perfect: boolean;
  /** 내 점수 - 상대 점수 (승리 시 양수) */
  scoreDiff: number;
  /** 맞힌 문항 수 */
  correct: number;
}

/** 이번 판 RP 증감 (승리는 +, 패배는 −. 접전 패배는 덜 깎임) */
export function rpDelta(o: RankOutcome): number {
  if (o.won) {
    let d = 25;
    if (o.perfect) d += 8;
    d += Math.min(7, Math.floor(Math.max(0, o.scoreDiff) / 150)); // 큰 점수차 보너스
    return d; // 대략 +25 ~ +40
  }
  // 패배 — 접전(점수차 적음)일수록 덜 깎인다
  const gap = Math.max(0, -o.scoreDiff);
  const soften = Math.min(8, Math.floor((250 - Math.min(250, gap)) / 50));
  return Math.min(-10, -18 + soften); // 대략 −10 ~ −18
}

export interface RankChange {
  before: RankPos;
  after: RankPos;
  delta: number;
  /** 디비전 승급 */
  promoted: boolean;
  /** 디비전 강등 */
  demoted: boolean;
  /** 티어 승급 (더 큰 연출) */
  tierPromoted: boolean;
  /** 티어 강등 */
  tierDemoted: boolean;
}

/** 랭크 이벤트 요약 라벨 */
export function rankChangeHeadline(c: RankChange): string {
  if (c.tierPromoted) return `${c.after.tier.label} 티어 승급!`;
  if (c.promoted) return "디비전 승급!";
  if (c.tierDemoted) return `${c.after.tier.label} 티어로 강등`;
  if (c.demoted) return "디비전 강등";
  return c.delta >= 0 ? "RP 상승" : "RP 하락";
}
