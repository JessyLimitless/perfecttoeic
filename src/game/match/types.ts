// AI 대결 모드 공유 계약 (FROZEN CONTRACT)
// 이 파일은 대결 엔진(matchStore)·인게임 화면·결과 화면이 함께 의존하는 단일 진실원이다.
// 병렬 구현 시 이 시그니처를 변경하지 말 것. 값(상수)만 튜닝 대상.

import type {
  ChoiceIndex,
  Difficulty,
  Part,
  PassageQuestion,
  PassageSet,
  SentencePair,
} from "@/game/types";

// ─────────────────────────── 상수 (튜닝 포인트) ───────────────────────────

/** 1판 문항 수 */
export const MATCH_LENGTH = 10;
/** 문항당 제한시간(초) — 로비/기본값. 실제 인게임은 파트별 값을 쓴다. */
export const PER_QUESTION_SECONDS = 30;
/** 파트별 문항 제한시간(초) — 독해량에 비례해 차등 (Part 5 단문 < Part 6 < Part 7 독해) */
export const PER_QUESTION_SECONDS_BY_PART: Record<Part, number> = {
  5: 30,
  6: 50,
  7: 75,
};
/** 해당 파트의 문항 제한시간(초) */
export function secondsForPart(part: Part): number {
  return PER_QUESTION_SECONDS_BY_PART[part] ?? PER_QUESTION_SECONDS;
}
/** 정답 기본 점수 */
export const BASE_SCORE = 100;
/** 리매치 가능 시간(초) — 종료 후 60초 */
export const REMATCH_WINDOW_SECONDS = 60;
/** 리매치 만료 임박 경고 시점(초) */
export const REMATCH_WARN_SECONDS = 10;

/** 보상 규칙 */
export const CREDIT_WIN = 5; // 승리(1위)
export const CREDIT_LOSE = 0; // 패배
export const CREDIT_PERFECT_MISSION = 3; // 미션: 전 문항 정답

/** 난이도별 AI 봇 시뮬레이션 파라미터 */
export interface BotProfile {
  /** 문항 정답 확률 0~1 */
  accuracy: number;
  /** 풀이 소요시간 범위 [min, max] 초 */
  speed: [number, number];
}
export const BOT_PROFILE: Record<Difficulty, BotProfile> = {
  EASY: { accuracy: 0.5, speed: [8.0, 12.0] },
  MEDIUM: { accuracy: 0.7, speed: [6.0, 9.0] },
  HARD: { accuracy: 0.85, speed: [4.0, 6.5] },
};

// ─────────────────────────── 데이터 모델 ───────────────────────────

export type Participant = "user" | "ai";
export type MatchStatus = "lobby" | "countdown" | "playing" | "result";

/** 참가자 한 명의 대결 상태 */
export interface MatchPlayer {
  kind: Participant;
  name: string; // 별명 (유저=닉네임, 봇="AI CHALLENGER")
  playerId: string; // 예: "P2479" (봇은 "BOT")
  /** R/C 누적 점수 (기본+속도보너스) */
  score: number;
  /** 문항별 정/오 (게임진행현황 그리드용, 길이 = 푼 문항 수) */
  results: boolean[];
  /** Listening 점수 — MVP 미사용(null), 결과표에선 회색 placeholder */
  lcScore: number | null;
  /** 1 | 2 (결과 확정 후) */
  rank?: 1 | 2;
}

/** 이번 판의 한 문항 단위 — 문항 + 그 문항이 속한 지문(Part 6/7) 정보를 함께 들고 다닌다.
 *  Part 5는 passageLines가 빈 배열. 인게임에서 지문을 표시하기 위해 평탄화하지 않고 보존한다. */
export interface MatchItem {
  part: Part;
  passageType: string;
  /** 지문 문장 페어 (Part 5는 []). 있으면 인게임에서 PassagePanel로 표시 */
  passageLines: SentencePair[];
  question: PassageQuestion;
}

/** 한 문항 풀이 기록 (결과 화면 '틀린문제 REVIEW'용) */
export interface MatchRecord {
  question: PassageQuestion;
  selected: ChoiceIndex | null; // 시간초과 미응답이면 null
  isCorrect: boolean;
  /** 이 문항이 딸린 지문(영/한). Part 5는 [] — 오답 REVIEW 지문 번역용(옵셔널·비파괴 추가). */
  passageLines?: SentencePair[];
}

/** 아바타 프리셋 ID (이모지+색상 조합). persist에 저장되어 HUD/결과에 반영. */
export type AvatarPresetId =
  | "default"
  | "rocket"
  | "fox"
  | "panda"
  | "owl"
  | "tiger";

/** 유저 신원/재화 (localStorage 영속) */
export interface PlayerIdentity {
  name: string;
  playerId: string;
  credits: number;
  /** 선택한 아바타 프리셋 (없으면 "default" → /avatar.png 또는 이니셜) */
  avatarId?: AvatarPresetId;
}

/** 대결 시작 옵션 */
export interface StartMatchOptions {
  part: Part;
  difficulty: Difficulty;
  /** /api/sets 은행 (없으면 로컬 폴백) */
  sets?: PassageSet[];
}

// ─────────────────────────── 스토어 인터페이스 ───────────────────────────
// 엔진 에이전트는 zustand로 이 인터페이스를 "정확히" 구현한다.
// 화면 에이전트는 useMatchStore((s) => s.xxx) 형태로만 접근한다.

export interface MatchState {
  status: MatchStatus;
  part: Part;
  difficulty: Difficulty;

  /** 이번 판 10문항 (지문 정보 포함, 파트/난이도 필터 후 추출·셔플) */
  items: MatchItem[];
  /** 현재 문항 인덱스 0..MATCH_LENGTH-1 */
  qIndex: number;
  /** 현재 문항에 유저가 답했는가(피드백 표시 상태) */
  answered: boolean;
  /** 유저가 고른 보기 */
  selected: ChoiceIndex | null;

  /** 현재 문항 남은 시간(초, 소수 허용) */
  remaining: number;
  /** AI 진행 게이지 0~1 (현재 문항 기준) */
  aiProgress: number;

  user: MatchPlayer;
  ai: MatchPlayer;

  /** 유저의 문항별 풀이 기록 (틀린문제 REVIEW용, 길이 = 푼 문항 수) */
  userHistory: MatchRecord[];

  /** 누적 보유 크레딧 (영속값 미러) */
  credits: number;
  /** 이번 판 획득 크레딧 (결과 배너용) */
  earnedCredits: number;
  /** 이번 판 달성 미션 라벨들 (예: ["전 문항 정답"]) */
  missions: string[];

  /** 리매치 만료 시각(epoch ms). status==="result"에서만 유효 */
  rematchDeadline: number | null;

  // ── actions ──
  /** 방개설: 옵션으로 10문항 뽑고 countdown→playing 진입 */
  startMatch: (opts: StartMatchOptions) => void;
  /** 카운트다운(3·2·1) 끝나면 호출 → playing */
  beginPlay: () => void;
  /** 유저가 보기 선택 (정/오 채점 + 점수/보너스 가산, answered=true) */
  answer: (choice: ChoiceIndex) => void;
  /** 다음 문항으로 (마지막이면 finish 자동 호출) */
  next: () => void;
  /** 1초/프레임 타이머 틱: remaining 감소, 0이면 미응답 오답 처리 */
  tickTimer: (deltaSec: number) => void;
  /** 봇 진행 틱: aiProgress 갱신, 도달 시 봇 채점 */
  tickAi: (deltaSec: number) => void;
  /** 10문항 종료 → 랭킹/크레딧/미션 확정, status="result", rematchDeadline 설정 */
  finish: () => void;
  /** 같은 조건 재대결 (리매치 기한 내) */
  rematch: (sets?: PassageSet[]) => void;
  /** 방 나가기/초기화 → status="lobby" */
  exit: () => void;
  /** 유저 신원 설정/갱신(닉네임 등) */
  setIdentity: (id: Partial<PlayerIdentity>) => void;
}
