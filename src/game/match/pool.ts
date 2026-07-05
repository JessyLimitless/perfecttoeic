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
 * 이번 판의 10문항을 만든다.
 *
 * ⚠️ 파트별 구조 차이를 반드시 존중한다:
 * - **Part 5(단문)**: 문항이 서로 독립 → 개별로 셔플해 다양하게 뽑는다.
 * - **Part 6·7(지문형)**: 실제 토익처럼 "지문 1개 + 그 지문에 딸린 문항들(1→n)"이
 *   **한 덩어리로, 원래 순서 그대로** 나와야 한다. 그래서 문항을 개별 셔플하면 안 되고,
 *   **지문(세트) 단위로만 셔플**한 뒤 각 지문 안 문항은 배열 순서(=출제 순서)대로 이어붙인다.
 *   (예전엔 모든 문항을 flat 셔플해서 같은 지문의 문항이 뒤죽박죽/역순으로 나오는 버그가 있었음.)
 *
 * MATCH_LENGTH에 맞춰 지문을 이어붙이다 마지막 지문이 잘릴 수 있으나(뒤쪽 문항 일부 생략),
 * 노출되는 문항들은 항상 지문별로 묶이고 순서가 보존된다.
 *
 * difficulty는 현재 풀 구성에 직접 쓰지 않지만(은행이 이미 난이도별로 들어옴)
 * 계약 시그니처를 맞추기 위해 받는다. 추후 난이도 필터 확장 지점.
 */
export function buildMatchItems(
  sets: PassageSet[],
  part: Part,
  difficulty: Difficulty,
): MatchItem[] {
  void difficulty; // 향후 난이도별 가중 추출 확장 지점

  const byPart = sets.filter((s) => partOf(s) === part);
  if (byPart.length === 0) return [];

  // ── Part 5: 개별 문항 셔플(단문은 독립적이라 섞어야 다양함) ──
  if (part === 5) {
    const flat = shuffle(byPart.flatMap((s) => s.questions.map((q) => toItem(s, q))));
    if (flat.length === 0) return [];
    const out: MatchItem[] = [];
    while (out.length < MATCH_LENGTH) out.push(flat[out.length % flat.length]);
    return out;
  }

  // ── Part 6·7: 지문(세트) 단위 셔플 + 지문 안 문항은 원래 순서 유지 ──
  const passages = shuffle(byPart).filter((s) => s.questions.length > 0);
  if (passages.length === 0) return [];

  const out: MatchItem[] = [];
  let gi = 0;
  // 지문을 순환하며 문항을 순서대로 이어붙여 정확히 MATCH_LENGTH개를 채운다.
  while (out.length < MATCH_LENGTH) {
    const s = passages[gi % passages.length];
    for (const q of s.questions) {
      out.push(toItem(s, q));
      if (out.length >= MATCH_LENGTH) break;
    }
    gi++;
  }
  return out.slice(0, MATCH_LENGTH);
}
