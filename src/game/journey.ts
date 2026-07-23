/**
 * 900점 여정(Journey) — 이 서비스의 핵심 시퀀스 단일 소스.
 *
 *   STEP 1 패턴을 충분히 익힌다 → STEP 2 게임으로 실전 문제를 대량으로 푼다 → STEP 3 실전 테스트
 *
 * 화면(랜딩·각 단계 홈)은 전부 이 모듈이 계산한 값만 표시한다.
 * 단계는 "잠그지" 않는다 — 언제든 들어갈 수 있되, 지금 어디에 있어야 하는지를 알려준다.
 */

export type JourneyStepKey = "pattern" | "game" | "real";
export type JourneyStepState = "todo" | "current" | "done";

/** 목표치 — 900점 달성 시퀀스의 기준 */
export const JOURNEY_TARGET = {
  /** STEP 1: 익혀야 할 패턴 수 (콘텐츠 총량으로 대체됨) */
  patterns: 75,
  /** STEP 2: 게임으로 풀어낼 실전 문항 수 */
  questions: 3000,
  /** STEP 3: 실전 모의고사 응시 횟수 */
  mocks: 1,
} as const;

export interface JourneyStep {
  key: JourneyStepKey;
  /** 현재 값 / 목표 값 */
  done: number;
  total: number;
  /** 0~100 */
  pct: number;
  state: JourneyStepState;
  /** 박스에 한 줄로 띄우는 지표 */
  stat: string;
}

export interface Journey {
  steps: Record<JourneyStepKey, JourneyStep>;
  /** 지금 집중해야 할 단계 */
  current: JourneyStepKey;
  /** 세 단계 전체 진행률 0~100 */
  overall: number;
}

export interface JourneyInput {
  /** 학습한 패턴 수 */
  patternStudied: number;
  /** 패턴 총량 (로드 실패 시 기본 목표치) */
  patternTotal?: number;
  /** 풀어낸(정복한) 실전 문항 수 */
  solvedQuestions: number;
  /** 문제은행 총 문항 수 — 목표 3,000이 은행보다 크면 은행 크기로 낮춘다 */
  bankTotal?: number;
  /** 모의고사 응시 횟수 */
  mockAttempts: number;
}

/**
 * STEP 1은 "충분히" 익히면 넘어간다 — 전부 100%를 요구하면 2단계로 못 넘어간다.
 * 패턴의 70%를 익히면 게임 단계 준비 완료로 본다.
 */
export const PATTERN_READY_RATIO = 0.7;

const pctOf = (done: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

export function buildJourney(input: JourneyInput): Journey {
  const patternTotal = input.patternTotal || JOURNEY_TARGET.patterns;
  // 목표 3,000문항이 현재 은행보다 크면 은행 총량이 실질 목표다.
  const questionTotal =
    input.bankTotal && input.bankTotal > 0
      ? Math.min(JOURNEY_TARGET.questions, input.bankTotal)
      : JOURNEY_TARGET.questions;

  const patternDone = Math.min(input.patternStudied, patternTotal);
  const solvedDone = Math.min(input.solvedQuestions, questionTotal);
  const mockDone = Math.min(input.mockAttempts, JOURNEY_TARGET.mocks);

  const patternReady = patternDone >= Math.ceil(patternTotal * PATTERN_READY_RATIO);
  const gameReady = solvedDone >= questionTotal;

  const current: JourneyStepKey = !patternReady
    ? "pattern"
    : !gameReady
      ? "game"
      : "real";

  const stateOf = (key: JourneyStepKey, complete: boolean): JourneyStepState =>
    complete ? "done" : key === current ? "current" : "todo";

  const steps: Record<JourneyStepKey, JourneyStep> = {
    pattern: {
      key: "pattern",
      done: patternDone,
      total: patternTotal,
      pct: pctOf(patternDone, patternTotal),
      state: stateOf("pattern", patternReady),
      stat: `${patternDone} / ${patternTotal} 패턴`,
    },
    game: {
      key: "game",
      done: solvedDone,
      total: questionTotal,
      pct: pctOf(solvedDone, questionTotal),
      state: stateOf("game", gameReady),
      stat: `${solvedDone.toLocaleString()} / ${questionTotal.toLocaleString()}문제`,
    },
    real: {
      key: "real",
      done: mockDone,
      total: JOURNEY_TARGET.mocks,
      pct: pctOf(mockDone, JOURNEY_TARGET.mocks),
      state: stateOf("real", mockDone >= JOURNEY_TARGET.mocks),
      stat: mockDone > 0 ? "응시 완료" : "아직 응시 전",
    },
  };

  // 전체 진행률 — 패턴 25% · 게임 60% · 실전 15% 가중(실제 공부량 비중)
  const overall = Math.round(
    steps.pattern.pct * 0.25 + steps.game.pct * 0.6 + steps.real.pct * 0.15,
  );

  return { steps, current, overall };
}

/**
 * 지금 단계에서 해야 할 일 — 한 줄 안내.
 *
 * 주의: `current`는 **권장 순서**이지 사용자가 실제로 있는 곳이 아니다.
 * 이미 게임으로 수백 문제를 푼 사람에게 매번 "먼저 패턴부터"라고 하면
 * 안내가 현실을 설명하지 못하고, 그런 안내는 곧 무시당한다.
 * → 뒷 단계에 이미 진도가 있으면 **명령이 아니라 제안**으로 말한다.
 */
export function journeyHint(j: Journey): string {
  const { steps, current } = j;
  if (current === "pattern") {
    const left = steps.pattern.total - steps.pattern.done;
    // 이미 문제를 풀고 있는 사람 → 처음부터 시작하라는 투로 말하지 않는다
    if (steps.game.done > 0) {
      return `패턴을 익히면 게임이 쉬워져요 · ${left}개 남음`;
    }
    return `먼저 패턴을 익히세요 · ${left}개 남음`;
  }
  if (current === "game") {
    const left = steps.game.total - steps.game.done;
    return `게임으로 실전 문제를 푸세요 · ${left.toLocaleString()}문제 남음`;
  }
  return "실전 테스트로 점수를 확인하세요";
}
