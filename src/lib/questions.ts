import { SAMPLE_SETS } from "@/data/questions";
import type { Difficulty, PassageSet } from "@/game/types";

/**
 * 로컬 폴백용 — MD 은행(content/sets)을 못 읽었을 때만 사용한다.
 * 정상 경로에서는 /api/sets 가 MD 파일에서 세트를 로드한다.
 */
export function getSetsByDifficulty(difficulty: Difficulty): PassageSet[] {
  return SAMPLE_SETS.filter((s) => s.difficulty === difficulty);
}

/**
 * 유형 중심 학습 폴백 — 난이도 구분 없이 전체 샘플 세트를 반환한다.
 * 실제 유형 필터링은 store의 buildPool에서 수행한다.
 */
export function getFallbackSets(): PassageSet[] {
  return SAMPLE_SETS;
}
