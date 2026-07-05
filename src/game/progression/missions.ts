// 일일 미션 + 시즌 (localStorage `toeic-missions-v1`).
// 자기완결형(self-contained): 다른 파일에 훅을 추가하지 않고, 기존 카운터의
// "오늘 시작 시점(baseline)" 대비 증가분으로 진행도를 스스로 추론한다.
//   - 정답 수       : loadProgress().stats.totalCorrect
//   - 스네이크 판수  : loadProgress().endless.runs
//   - 스네이크 최고콤보: loadProgress().endless.bestChain  (오늘 갱신폭 = current − baseline)
//   - 랭크 승수      : loadRank().wins
// SSR 안전(typeof window 가드), 예외는 조용히 무시. progress.ts 스타일을 따른다.
// 하루 3개 미션은 "미션 풀"에서 날짜 시드로 결정적으로 뽑아 매일 로테이션(당일엔 고정).

import { loadProgress, grantXp, PROGRESS_EVENT } from "@/game/progression/store";
import { addCredits } from "@/game/match/persist";
import { loadRank } from "@/game/rank/store";

const KEY = "toeic-missions-v1";
/** 미션 갱신 이벤트명 (HUD·페이지가 구독) — 진행 이벤트도 함께 쏜다 */
export const MISSIONS_EVENT = "toeic-missions";

/** 하루 7일 시즌 블록 길이 (일) */
const SEASON_DAYS = 7;

// ─────────────────────────── 타입 ───────────────────────────

/** 미션이 추적하는 카운터 종류 (전부 기존 카운터에서 파생 — 새 훅 없음) */
type Metric = "correct" | "wins" | "endlessRuns" | "bestChain";

/** 카운터 스냅샷 묶음 */
type Counters = { correct: number; endlessRuns: number; wins: number; bestChain: number };

/** 미션 보상 (크레딧 + XP) */
export interface MissionReward {
  credits: number;
  xp: number;
}

/** 진행도가 계산된 미션 뷰모델 */
export interface Mission {
  id: string;
  title: string;
  desc: string;
  icon: string;
  /** 목표치 */
  target: number;
  /** 오늘 진행량 (현재 카운터 − baseline, 0 이상) */
  current: number;
  /** 목표 달성 여부 */
  done: boolean;
  /** 수령 완료 여부 */
  claimed: boolean;
  reward: MissionReward;
}

/** localStorage 스키마 */
interface MissionsState {
  /** 스냅샷 기준 날짜 (YYYY-MM-DD) */
  date: string;
  /** 오늘 시작 시점의 카운터 스냅샷 (bestChain은 v1 확장 — 없으면 현재값으로 안전 보정) */
  baseline: Counters;
  /** 수령한 미션 id 목록 */
  claimed: string[];
}

/** 미션 정의 (정적) */
interface MissionDef {
  id: string;
  title: string;
  desc: string;
  icon: string;
  target: number;
  metric: Metric;
  reward: MissionReward;
}

// ─────────────────────────── 정의 ───────────────────────────

/**
 * 미션 풀(족보) — 카테고리(family)별 변형 묶음.
 * 하루엔 서로 다른 3개 family에서 각 1개 변형을 뽑는다(같은 종류 중복 방지).
 * 모든 target/metric은 기존 카운터로만 추론 가능 — 새 훅을 요구하지 않는다.
 */
const POOL: MissionDef[][] = [
  // ── 정답 수 (correct delta) ──
  [
    {
      id: "correct-20",
      title: "오늘 20문제 맞히기",
      desc: "리딩·리스닝 어디서든 정답 20개",
      icon: "✅",
      target: 20,
      metric: "correct",
      reward: { credits: 20, xp: 60 },
    },
    {
      id: "correct-30",
      title: "오늘 30문제 맞히기",
      desc: "정답 30개로 오늘 실력 다지기",
      icon: "✅",
      target: 30,
      metric: "correct",
      reward: { credits: 30, xp: 80 },
    },
    {
      id: "correct-40",
      title: "오늘 40문제 맞히기",
      desc: "정답 40개 — 오늘의 집중 학습",
      icon: "🎯",
      target: 40,
      metric: "correct",
      reward: { credits: 40, xp: 100 },
    },
  ],
  // ── 랭크 승수 (wins delta) ──
  [
    {
      id: "rank-win-1",
      title: "랭크 대결 1승",
      desc: "AI 챌린저를 이겨보세요",
      icon: "🏆",
      target: 1,
      metric: "wins",
      reward: { credits: 15, xp: 50 },
    },
    {
      id: "rank-win-2",
      title: "랭크 대결 2승",
      desc: "AI 챌린저와 2연승에 도전",
      icon: "🥇",
      target: 2,
      metric: "wins",
      reward: { credits: 25, xp: 80 },
    },
  ],
  // ── 스네이크 판수 (endlessRuns delta) ──
  [
    {
      id: "snake-run-1",
      title: "스피드 스네이크 1판",
      desc: "체인을 쌓으며 워밍업",
      icon: "🐍",
      target: 1,
      metric: "endlessRuns",
      reward: { credits: 10, xp: 40 },
    },
    {
      id: "snake-run-3",
      title: "스피드 스네이크 3판",
      desc: "스네이크 3판으로 순발력 훈련",
      icon: "🐍",
      target: 3,
      metric: "endlessRuns",
      reward: { credits: 20, xp: 70 },
    },
  ],
  // ── 스네이크 최고 콤보 갱신 (bestChain delta = 오늘 최고기록 상승폭) ──
  [
    {
      id: "snake-chain-6",
      title: "스네이크 콤보 6 달성",
      desc: "한 판에서 최고 콤보 기록 갱신",
      icon: "🔥",
      target: 6,
      metric: "bestChain",
      reward: { credits: 20, xp: 70 },
    },
    {
      id: "snake-chain-10",
      title: "스네이크 콤보 10 이상",
      desc: "콤보를 크게 쌓아 최고 기록 경신",
      icon: "⚡",
      target: 10,
      metric: "bestChain",
      reward: { credits: 30, xp: 90 },
    },
  ],
];

/** 하루에 뽑을 미션 개수 (family 수 이하) */
const DAILY_COUNT = 3;

/** 3개 모두 완료 시 추가 보너스 */
const BONUS_ID = "daily-clear";
const BONUS_REWARD: MissionReward = { credits: 40, xp: 120 };

// ─────────────────────────── 유틸 ───────────────────────────

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (로컬 근사)
}

/** 현재 카운터 스냅샷 */
function currentCounters(): Counters {
  const p = loadProgress();
  const r = loadRank();
  return {
    correct: p.stats.totalCorrect,
    endlessRuns: p.endless.runs,
    wins: r.wins,
    bestChain: p.endless.bestChain,
  };
}

function metricValue(m: Metric, c: Counters): number {
  if (m === "correct") return c.correct;
  if (m === "wins") return c.wins;
  if (m === "bestChain") return c.bestChain;
  return c.endlessRuns;
}

function freshState(): MissionsState {
  const c = currentCounters();
  return {
    date: todayStr(),
    baseline: { correct: c.correct, endlessRuns: c.endlessRuns, wins: c.wins, bestChain: c.bestChain },
    claimed: [],
  };
}

/**
 * 날짜 문자열 → 안정적 32bit 시드(FNV-1a). 같은 날은 항상 같은 값,
 * 날짜가 바뀌면 값이 달라져 미션이 로테이션된다.
 */
function daySeed(dateStr: string): number {
  let h = 2166136261;
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * 해당 날짜의 일일 미션 3개를 결정적으로 선택한다.
 * POOL(4 family) 중 하나를 시드로 제외하고, 남은 3 family에서 각각 변형 1개를 뽑는다.
 * → 같은 종류 중복 없이 매일 조합이 바뀌되 당일엔 고정.
 */
function selectedDefs(dateStr: string = todayStr()): MissionDef[] {
  const seed = daySeed(dateStr);
  const drop = POOL.length > DAILY_COUNT ? seed % POOL.length : -1;
  const fams = POOL.filter((_, i) => i !== drop);
  // 변형 인덱스는 family마다 어긋나게(+i) 해서 조합 다양성 확보
  return fams.map((fam, i) => fam[(Math.floor(seed / 7) + i) % fam.length]);
}

function normalize(raw: unknown): MissionsState | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Partial<MissionsState>;
  if (typeof p.date !== "string") return null;
  const b = p.baseline;
  return {
    date: p.date,
    baseline: {
      correct: typeof b?.correct === "number" ? b.correct : 0,
      endlessRuns: typeof b?.endlessRuns === "number" ? b.endlessRuns : 0,
      wins: typeof b?.wins === "number" ? b.wins : 0,
      // bestChain은 v1 확장 필드 — 기존 저장본엔 없다. 없으면 "현재값"으로 보정해
      // (delta 0 → 오늘 진행 0) 지난 기록으로 미션이 공짜 완료되는 일을 막는다.
      bestChain: typeof b?.bestChain === "number" ? b.bestChain : currentCounters().bestChain,
    },
    claimed: Array.isArray(p.claimed) ? p.claimed.filter((x) => typeof x === "string") : [],
  };
}

function persist(st: MissionsState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(st));
  } catch {
    /* 저장 초과 등 무시 (부가 기능) */
  }
}

/** 미션 갱신 브로드캐스트 (진행 이벤트도 함께) */
function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(MISSIONS_EVENT));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

// ─────────────────────────── 로드/롤오버 ───────────────────────────

/**
 * 저장된 미션 상태를 불러온다. 날짜가 바뀌었거나 기록이 없으면
 * 현재 카운터를 새 baseline으로 스냅샷하고 claimed를 초기화한다(일일 롤오버).
 */
export function loadMissions(): MissionsState {
  if (typeof window === "undefined") return freshState();
  try {
    const raw = window.localStorage.getItem(KEY);
    const st = raw ? normalize(JSON.parse(raw)) : null;
    if (!st || st.date !== todayStr()) {
      const next = freshState();
      persist(next);
      return next;
    }
    return st;
  } catch {
    const next = freshState();
    persist(next);
    return next;
  }
}

// ─────────────────────────── 파생: 오늘의 미션 ───────────────────────────

function buildMission(def: MissionDef, st: MissionsState): Mission {
  const c = currentCounters();
  const delta = Math.max(0, metricValue(def.metric, c) - metricValue(def.metric, st.baseline));
  const current = Math.min(delta, def.target);
  return {
    id: def.id,
    title: def.title,
    desc: def.desc,
    icon: def.icon,
    target: def.target,
    current,
    done: delta >= def.target,
    claimed: st.claimed.includes(def.id),
    reward: def.reward,
  };
}

/** 오늘의 3대 일일 미션 (진행도 계산 완료, 날짜 시드로 선택) */
export function todaysMissions(): Mission[] {
  const st = loadMissions();
  return selectedDefs(st.date).map((d) => buildMission(d, st));
}

/** 3개 모두 완료 시 열리는 보너스 미션 (진행도 = 완료한 일일 미션 수) */
export function todaysBonus(): Mission {
  const st = loadMissions();
  const defs = selectedDefs(st.date);
  const doneCount = defs.map((d) => buildMission(d, st)).filter((m) => m.done).length;
  return {
    id: BONUS_ID,
    title: "일일 미션 올클리어",
    desc: "3개 미션을 모두 달성하면 보너스",
    icon: "🎁",
    target: defs.length,
    current: doneCount,
    done: doneCount >= defs.length,
    claimed: st.claimed.includes(BONUS_ID),
    reward: BONUS_REWARD,
  };
}

// ─────────────────────────── 수령 ───────────────────────────

/**
 * 미션 보상 수령. 달성 && 미수령이면 크레딧·XP를 지급하고 claimed 처리 후
 * 보상을 반환한다. 조건 불충족이면 null.
 */
export function claimMission(id: string): MissionReward | null {
  const st = loadMissions();
  if (st.claimed.includes(id)) return null;

  // 대상 미션의 달성 여부 판정
  let reward: MissionReward | null = null;
  if (id === BONUS_ID) {
    if (todaysBonus().done) reward = BONUS_REWARD;
  } else {
    const def = selectedDefs(st.date).find((d) => d.id === id);
    if (def && buildMission(def, st).done) reward = def.reward;
  }
  if (!reward) return null;

  // 지급 — 크레딧은 match persist, XP는 progression store
  if (reward.credits > 0) addCredits(reward.credits);
  if (reward.xp > 0) grantXp(reward.xp);

  st.claimed = [...st.claimed, id];
  persist(st);
  emit();
  return reward;
}

// ─────────────────────────── 시즌 ───────────────────────────

export interface SeasonInfo {
  /** 시즌 번호 (7일 블록, loadRank().seasonId 기준) */
  id: number;
  /** 이번 7일 블록에서 남은 일수 (1~7) */
  daysLeft: number;
  /** 시즌 내 며칠째 (1~7) */
  dayOfSeason: number;
}

/**
 * 현재 시즌 정보 (읽기 전용 표시용).
 * seasonId = floor(epochDays / 7) — rank store와 동일 규칙.
 */
export function seasonInfo(): SeasonInfo {
  const epochDays = Math.floor(Date.now() / 86400000);
  const within = ((epochDays % SEASON_DAYS) + SEASON_DAYS) % SEASON_DAYS; // 0~6
  return {
    id: loadRank().seasonId,
    daysLeft: SEASON_DAYS - within,
    dayOfSeason: within + 1,
  };
}
