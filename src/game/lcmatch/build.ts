// 리스닝 랭크 대결 — 배틀 문항 빌더 + 봇 시뮬레이션.
// RC 대결(match/*)의 동결 계약은 건드리지 않고, 리스닝 전용 경량 레이어를 따로 둔다.
// 정복(Conquest) 연동은 game/conquest(armConquest/takePendingConquest)를 그대로 재사용한다(도메인 무관).

import type { ListeningSet, ListeningPart } from "@/game/listening";
import { audioSrc } from "@/game/listening";
import { MATCH_LENGTH, BOT_PROFILE } from "@/game/match/types";
import type { Difficulty } from "@/game/types";

/** 대결 한 문항 단위 (오디오 + 보기 + 정답 + 복습 맥락) */
export interface LcBattleItem {
  key: string;
  part: ListeningPart;
  /** 재생할 오디오 클립 id (Part2=item id, Part3/4=set id) */
  audioId: string;
  audioSrc: string;
  promptEn: string;
  promptKo: string;
  /** 화면에 그릴 보기 (Part2=A/B/C 응답, Part3/4=4지선다) */
  choices: string[];
  choicesKo: string[];
  answerIndex: number;
  explanation: string;
  /** Part2는 실전처럼 보기 텍스트를 숨기고 A/B/C만 노출 */
  hideChoiceText: boolean;
  /** 복습용 — Part3/4 스크립트 */
  scriptLines?: { speaker: string; en: string; ko: string }[];
  /** 복습용 — Part2 응답 텍스트 */
  responses?: { en: string; ko: string }[];
  passageType?: string;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Part2 아이템 → 배틀 문항 (각 아이템이 독립 클립) */
function fromPart2(setId: string, it: NonNullable<ListeningSet["items"]>[number]): LcBattleItem {
  return {
    key: it.id,
    part: 2,
    audioId: it.id,
    audioSrc: audioSrc(it.id),
    promptEn: it.promptEn,
    promptKo: it.promptKo,
    choices: ["A", "B", "C"],
    choicesKo: ["A", "B", "C"],
    answerIndex: it.answerIndex,
    explanation: it.explanation,
    hideChoiceText: true,
    responses: it.responses,
    passageType: "Part 2",
  };
}

/** Part3/4 문항 → 배틀 문항 (세트 클립 공유) */
function fromScriptQuestion(
  set: ListeningSet,
  q: NonNullable<ListeningSet["questions"]>[number],
): LcBattleItem {
  return {
    key: q.id,
    part: set.part,
    audioId: set.id,
    audioSrc: audioSrc(set.id),
    promptEn: q.promptEn,
    promptKo: q.promptKo,
    choices: q.choices,
    choicesKo: q.choicesKo,
    answerIndex: q.answerIndex,
    explanation: q.explanation,
    hideChoiceText: false,
    scriptLines: set.script,
    passageType: set.passageType,
  };
}

/**
 * 이번 판의 리스닝 배틀 문항을 만든다.
 * - Part 2: 아이템(클립) 단위 셔플 후 채움.
 * - Part 3·4: 세트(대화/담화) 단위 셔플 + 세트 안 문항은 순서 유지(같은 오디오 공유).
 *   → 실전처럼 "한 지문에 딸린 문항이 순서대로" 나온다.
 *
 * **맞힌 문제 제외(`mastered`)**: 정복한 문항은 다시 안 나오게 거른다.
 * - **Part 2(문항 단위)**: 정복한 아이템을 개별 제외.
 * - **Part 3·4(세트 단위)**: 대화/담화 안 문제를 **전부 정복해야** 그 세트를 제외.
 *   (아직 한 문제라도 안 맞힌 세트는 통째로 다시 나온다.)
 * - 남은 게 없으면(전부 정복) 전체 풀로 폴백해 절대 비지 않게 한다.
 */
export function buildLcBattle(
  sets: ListeningSet[],
  part: ListeningPart,
  mastered: ReadonlySet<string> = new Set(),
): LcBattleItem[] {
  const byPart = sets.filter((s) => s.part === part);
  if (byPart.length === 0) return [];

  if (part === 2) {
    // 맞힌 아이템 제외 → 안 푼·틀린 문항만. 전부 정복이면 전체로 폴백.
    const all = byPart.flatMap((s) => (s.items ?? []).map((it) => fromPart2(s.id, it)));
    const remaining = all.filter((it) => !mastered.has(it.key));
    const items = shuffle(remaining.length > 0 ? remaining : all);
    if (items.length === 0) return [];
    const out: LcBattleItem[] = [];
    while (out.length < MATCH_LENGTH) out.push(items[out.length % items.length]);
    return out.slice(0, MATCH_LENGTH);
  }

  // Part 3/4 — 세트 단위 그룹 유지. 세트 전체를 정복하기 전엔 그 세트가 계속 나온다.
  const hasUnmastered = (s: ListeningSet) =>
    (s.questions?.length ?? 0) > 0 && (s.questions ?? []).some((q) => !mastered.has(q.id));
  let passages = shuffle(byPart).filter(hasUnmastered);
  if (passages.length === 0)
    passages = shuffle(byPart).filter((s) => (s.questions?.length ?? 0) > 0);
  if (passages.length === 0) return [];
  const out: LcBattleItem[] = [];
  let gi = 0;
  while (out.length < MATCH_LENGTH) {
    const s = passages[gi % passages.length];
    for (const q of s.questions ?? []) {
      out.push(fromScriptQuestion(s, q));
      if (out.length >= MATCH_LENGTH) break;
    }
    gi++;
  }
  return out.slice(0, MATCH_LENGTH);
}

// ─────────────────────────── 봇 시뮬레이션 ───────────────────────────

/** 문항당 제한시간(초) — 듣기라 재생 후 판단 여유를 준다 */
export const LC_SECONDS_BY_PART: Record<ListeningPart, number> = {
  2: 16,
  3: 22,
  4: 22,
};

export interface BotPlan {
  /** 이번 문항을 봇이 맞히는가 */
  correct: boolean;
  /** 봇 응답까지 걸리는 시간(초) */
  time: number;
}

/** 난이도 프로필로 이번 문항의 봇 계획을 뽑는다 */
export function planBot(difficulty: Difficulty): BotPlan {
  const p = BOT_PROFILE[difficulty];
  const [lo, hi] = p.speed;
  return {
    correct: Math.random() < p.accuracy,
    time: lo + Math.random() * (hi - lo),
  };
}

/** 점수: 기본 100 + 남은 시간 비례 보너스(최대 50) */
export function scoreFor(correct: boolean, remainingSec: number, limitSec: number): number {
  if (!correct) return 0;
  const ratio = Math.max(0, Math.min(1, remainingSec / limitSec));
  return 100 + Math.round(ratio * 50);
}
