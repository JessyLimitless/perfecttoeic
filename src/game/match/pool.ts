// AI 대결 모드 문항 추출 — 파트로 세트를 거르고, 문항을 MatchItem(지문 동반)으로
// 풀어 셔플해 정확히 MATCH_LENGTH개를 만든다(부족하면 순환 반복). 자급자족(self-contained).

import { partOf } from "@/game/parts";
import type { Difficulty, Part, PassageSet } from "@/game/types";
import { type MatchItem } from "./types";

/** Part 5 대결 문항 수(단문). 리딩 대결은 짧고 굵게 — 10 → 5. */
const PART5_MATCH_LENGTH = 5;

/** 작은 Fisher–Yates 셔플 (store.ts의 private 셔플을 끌어쓰지 않고 자체 구현) */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** PassageSet의 한 문항을 지문 정보와 묶어 MatchItem으로 */
function toItem(s: PassageSet, question: PassageSet["questions"][number]): MatchItem {
  return {
    part: partOf(s),
    passageType: s.passageType,
    passageLines: s.passageLines,
    question,
  };
}

/**
 * 이번 판의 문항을 만든다. 길이는 파트별로 다르다(가변):
 * - **Part 5(단문)**: 서로 독립 → 개별 셔플로 **정확히 5문항**(PART5_MATCH_LENGTH).
 * - **Part 6·7(지문형)**: 실제 토익처럼 **"지문 1개 = 한 판"**. 셔플한 지문 중 하나를
 *   골라 그 지문에 딸린 문항들(1→n)을 **원래 순서 그대로** 낸다(보통 3~5문항).
 *   문항을 개별 셔플하면 같은 지문이 뒤죽박죽 되므로 절대 flat 셔플하지 않는다.
 *
 * **맞힌 문제 제외(`mastered`)**: 정복한 문항은 다시 안 나오게 거른다.
 * - **Part 5(문항 단위)**: 정복한 문항을 개별 제외.
 * - **Part 6·7(세트 단위)**: 지문 안 문제를 **전부 정복해야** 그 지문을 제외.
 *   (아직 한 문제라도 안 맞힌 지문은 통째로 다시 — 세트 전체를 풀어야 한다는 규칙.)
 * - 남은 게 없으면(전부 정복) 전체 풀로 폴백해 절대 비지 않게 한다.
 *
 * 반환 배열 길이가 곧 이번 판 문항 수 → 엔진(matchStore)·HUD·결과 그리드는
 * MATCH_LENGTH 상수 대신 items.length를 총수로 쓴다.
 *
 * difficulty는 현재 풀 구성에 직접 쓰지 않지만(은행이 이미 난이도별로 들어옴)
 * 계약 시그니처를 맞추기 위해 받는다. 추후 난이도 필터 확장 지점.
 */
export function buildMatchItems(
  sets: PassageSet[],
  part: Part,
  difficulty: Difficulty,
  mastered: ReadonlySet<string> = new Set(),
): MatchItem[] {
  void difficulty; // 향후 난이도별 가중 추출 확장 지점

  const byPart = sets.filter((s) => partOf(s) === part);
  if (byPart.length === 0) return [];

  // ── Part 5: 개별 문항 셔플 후 정확히 5문항(단문은 독립적이라 섞어야 다양함) ──
  if (part === 5) {
    // 맞힌 문항 제외 → 안 푼·틀린 문항만. 전부 정복이면 전체로 폴백.
    const remaining = byPart.flatMap((s) =>
      s.questions.filter((q) => !mastered.has(q.id)).map((q) => toItem(s, q)),
    );
    const source =
      remaining.length > 0
        ? remaining
        : byPart.flatMap((s) => s.questions.map((q) => toItem(s, q)));
    const flat = shuffle(source);
    if (flat.length === 0) return [];
    const out: MatchItem[] = [];
    while (out.length < PART5_MATCH_LENGTH) out.push(flat[out.length % flat.length]);
    return out;
  }

  // ── Part 6·7: 지문 하나 = 한 판. 세트 전체를 정복하기 전엔 그 지문이 계속 나온다. ──
  const hasUnmastered = (s: PassageSet) =>
    s.questions.length > 0 && s.questions.some((q) => !mastered.has(q.id));
  let passages = shuffle(byPart).filter(hasUnmastered);
  if (passages.length === 0) passages = shuffle(byPart).filter((s) => s.questions.length > 0);
  if (passages.length === 0) return [];
  const chosen = passages[0];
  return chosen.questions.map((q) => toItem(chosen, q));
}
