// AI 대결 모드 문항 추출 — 파트로 세트를 거르고, 문항을 MatchItem(지문 동반)으로
// 풀어 셔플해 정확히 MATCH_LENGTH개를 만든다(부족하면 순환 반복). 자급자족(self-contained).

import { partOf } from "@/game/parts";
import type { Difficulty, Part, PassageSet } from "@/game/types";
import { MATCH_LENGTH, type MatchItem } from "./types";

/** 작은 Fisher–Yates 셔플 (store.ts의 private 셔플을 끌어쓰지 않고 자체 구현) */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 이번 판의 10문항을 만든다.
 * 1) 선택한 파트의 세트만 추리고
 * 2) 각 문항을 그 세트의 지문(passageLines)·유형과 묶어 MatchItem으로 풀어내고
 * 3) 셔플해 MATCH_LENGTH개로 자른다. 모자라면 셔플 풀을 순환 반복해 채운다.
 *
 * Part 6/7은 문항이 지문을 동반하므로 인게임에서 지문을 표시할 수 있다.
 * (평탄화로 지문을 잃지 않는다.) Part 5는 passageLines가 빈 배열.
 *
 * difficulty는 현재 풀 구성에는 직접 쓰지 않지만(은행이 이미 난이도별로 들어옴)
 * 계약 시그니처를 맞추기 위해 받는다. 추후 난이도 필터 확장 지점.
 */
export function buildMatchItems(
  sets: PassageSet[],
  part: Part,
  difficulty: Difficulty,
): MatchItem[] {
  void difficulty; // 향후 난이도별 가중 추출 확장 지점

  const byPart = sets.filter((s) => partOf(s) === part);
  const flat: MatchItem[] = shuffle(
    byPart.flatMap((s) =>
      s.questions.map((question) => ({
        part: partOf(s),
        passageType: s.passageType,
        passageLines: s.passageLines,
        question,
      })),
    ),
  );

  if (flat.length === 0) return [];

  // 셔플 풀을 순환하며 정확히 MATCH_LENGTH개를 채운다(문항이 부족해도 반복).
  const out: MatchItem[] = [];
  while (out.length < MATCH_LENGTH) {
    out.push(flat[out.length % flat.length]);
  }
  return out;
}
