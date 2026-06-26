import type { Difficulty } from "./types";

/** 연습 시작 시 미리 채워두는 '지문 세트' 큐 크기 */
export const INITIAL_POOL_SIZE = 12;
/** 큐가 이 수 이하로 남으면 추가로 채운다 (무한 연습) */
export const REFILL_THRESHOLD = 3;
/** 라이브(브리지) 초기 요청 세트 수 */
export const LIVE_INITIAL_COUNT = 4;

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: "초급",
  MEDIUM: "중급",
  HARD: "고급",
};

export const DIFFICULTY_DESC: Record<Difficulty, string> = {
  EASY: "짧은 지문 · 직접 찾는 정보 위주",
  MEDIUM: "조금 긴 지문 · 대의/사실 확인",
  HARD: "추론 · 동의어 등 까다로운 유형",
};
