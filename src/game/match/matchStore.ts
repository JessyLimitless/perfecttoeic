// AI 대결 모드 엔진 (zustand). types.ts의 MatchState 계약을 "정확히" 구현한다.
// 봇은 순수 클라이언트 시뮬레이션 — 네트워크 없음, Math.random 굴림.

import { create } from "zustand";
import { getFallbackSets } from "@/lib/questions";
import type { ChoiceIndex, Difficulty, Part } from "@/game/types";
import { buildMatchItems } from "./pool";
import { addCredits, loadIdentity, saveIdentity } from "./persist";
import { getCharacter } from "./characters";
import {
  BASE_SCORE,
  BOT_PROFILE,
  CREDIT_LOSE,
  CREDIT_PERFECT_MISSION,
  CREDIT_WIN,
  MATCH_LENGTH,
  PER_QUESTION_SECONDS,
  REMATCH_WINDOW_SECONDS,
  secondsForPart,
  type MatchPlayer,
  type MatchState,
  type Participant,
} from "./types";

// ─────────────────────────── 헬퍼 ───────────────────────────

/** 참가자 한 명을 초기화 */
function makePlayer(
  kind: Participant,
  name: string,
  playerId: string,
): MatchPlayer {
  return { kind, name, playerId, score: 0, results: [], lcScore: null };
}

/** 한 문항 봇 굴림 결과 */
interface BotRoll {
  /** 풀이 소요시간(초) */
  solveTime: number;
  /** 정답 여부 */
  correct: boolean;
}

/** 난이도 프로필로 이번 문항 봇 굴림(정답 여부 + 소요시간) */
function rollBot(difficulty: Difficulty): BotRoll {
  const p = BOT_PROFILE[difficulty];
  const [min, max] = p.speed;
  return {
    solveTime: min + Math.random() * (max - min),
    correct: Math.random() < p.accuracy,
  };
}

/** 정답 시 점수 = 기본 + 남은시간 반올림(속도 보너스) */
function scoreFor(remaining: number): number {
  return BASE_SCORE + Math.round(Math.max(0, remaining));
}

// 로비 초기 상태(하이드레이션 안정용 — 실제 신원은 startMatch/setIdentity에서 로드)
const INITIAL_USER = makePlayer("user", "PLAYER", "P0000");
const INITIAL_AI = makePlayer("ai", getCharacter().name, "BOT");

export const useMatchStore = create<MatchState>((set, get) => {
  // ── 현재 문항 봇 시뮬레이션 상태(계약 외 임시값, 클로저 보관) ──
  // aiProgress(0~1)가 solveTime초에 걸쳐 1에 도달하면 봇을 채점한다.
  let botSolveTime = BOT_PROFILE.MEDIUM.speed[0];
  let botCorrect = false;
  let botScored = false; // 이번 문항 봇 채점 완료 여부

  /** 새 문항 진입: 타이머(파트별 제한시간)/게이지 리셋 + 봇 굴림 장전 */
  function armQuestion() {
    const { difficulty, part } = get();
    const roll = rollBot(difficulty);
    botSolveTime = Math.max(0.0001, roll.solveTime);
    botCorrect = roll.correct;
    botScored = false;
    set({
      remaining: secondsForPart(part),
      aiProgress: 0,
      answered: false,
      selected: null,
    });
  }

  /** 이번 문항 봇을 아직 채점하지 않았다면 마무리(채점) */
  function finalizeBot() {
    if (botScored) return;
    const s = get();
    botScored = true;
    const gained = botCorrect ? scoreFor(s.remaining) : 0;
    set({
      aiProgress: 1,
      ai: {
        ...s.ai,
        score: s.ai.score + gained,
        results: [...s.ai.results, botCorrect],
      },
    });
  }

  return {
    // ── 상태 초기값 ──
    status: "lobby",
    part: 7 as Part,
    difficulty: "MEDIUM",

    items: [],
    qIndex: 0,
    answered: false,
    selected: null,

    remaining: PER_QUESTION_SECONDS,
    aiProgress: 0,

    user: INITIAL_USER,
    ai: INITIAL_AI,

    userHistory: [],

    credits: 0,
    earnedCredits: 0,
    missions: [],

    rematchDeadline: null,

    // ── actions ──
    startMatch: ({ part, difficulty, sets }) => {
      const bank = sets && sets.length > 0 ? sets : getFallbackSets();
      const items = buildMatchItems(bank, part, difficulty);
      const identity = loadIdentity();

      set({
        status: "countdown",
        part,
        difficulty,
        items,
        qIndex: 0,
        answered: false,
        selected: null,
        remaining: secondsForPart(part),
        aiProgress: 0,
        user: makePlayer("user", identity.name, identity.playerId),
        ai: makePlayer("ai", getCharacter().name, "BOT"),
        userHistory: [],
        credits: identity.credits,
        earnedCredits: 0,
        missions: [],
        rematchDeadline: null,
      });
      // 봇 채점 플래그도 리셋(beginPlay 전 틱 유입 방지)
      botScored = true;
    },

    beginPlay: () => {
      if (get().status !== "countdown") return;
      set({ status: "playing" });
      armQuestion();
    },

    answer: (choice: ChoiceIndex) => {
      const s = get();
      if (s.status !== "playing" || s.answered) return;
      const item = s.items[s.qIndex];
      if (!item) return;
      const q = item.question;

      const isCorrect = choice === q.answerIndex;
      const gained = isCorrect ? scoreFor(s.remaining) : 0;

      set({
        answered: true,
        selected: choice,
        user: {
          ...s.user,
          score: s.user.score + gained,
          results: [...s.user.results, isCorrect],
        },
        userHistory: [
          ...s.userHistory,
          { question: q, selected: choice, isCorrect, passageLines: item.passageLines },
        ],
      });
      // 자동 진행 안 함 — 화면이 next()를 호출한다.
    },

    next: () => {
      const s = get();
      if (s.status !== "playing") return;
      // 유저가 봇보다 먼저 넘기면 봇 채점이 비므로 마무리해 결과 정렬 유지
      finalizeBot();

      const nextIndex = s.qIndex + 1;
      if (nextIndex >= MATCH_LENGTH || nextIndex >= s.items.length) {
        get().finish();
        return;
      }
      set({ qIndex: nextIndex });
      armQuestion();
    },

    tickTimer: (deltaSec: number) => {
      const s = get();
      if (s.status !== "playing") return;
      const remaining = Math.max(0, s.remaining - deltaSec);

      if (remaining <= 0 && !s.answered) {
        // 시간초과 미응답 → 오답(선택 null) 자동 기록
        const timedOutItem = s.items[s.qIndex];
        const q = timedOutItem?.question;
        set({
          remaining: 0,
          answered: true,
          selected: null,
          user: { ...s.user, results: [...s.user.results, false] },
          userHistory: q
            ? [
                ...s.userHistory,
                { question: q, selected: null, isCorrect: false, passageLines: timedOutItem?.passageLines },
              ]
            : s.userHistory,
        });
        return;
      }
      set({ remaining });
    },

    tickAi: (deltaSec: number) => {
      const s = get();
      if (s.status !== "playing") return;
      if (botScored || s.aiProgress >= 1) return;

      const progress = Math.min(1, s.aiProgress + deltaSec / botSolveTime);
      if (progress >= 1) {
        // 게이지 도달 → 봇 채점(현재 remaining 기준 속도 보너스)
        finalizeBot();
      } else {
        set({ aiProgress: progress });
      }
    },

    finish: () => {
      // 마지막 문항 봇 미채점 안전망
      finalizeBot();
      const s = get();

      const userWins = s.user.score >= s.ai.score; // 동점은 유저 승(친절 기본값)
      const userRank: 1 | 2 = userWins ? 1 : 2;
      const aiRank: 1 | 2 = userWins ? 2 : 1;

      const allCorrect =
        s.user.results.length === MATCH_LENGTH && s.user.results.every(Boolean);

      let earned = userRank === 1 ? CREDIT_WIN : CREDIT_LOSE;
      const missions: string[] = [];
      if (allCorrect) {
        earned += CREDIT_PERFECT_MISSION;
        missions.push("전 문항 정답");
      }

      const identity = addCredits(earned);

      set({
        status: "result",
        user: { ...s.user, rank: userRank },
        ai: { ...s.ai, rank: aiRank },
        earnedCredits: earned,
        missions,
        credits: identity.credits,
        rematchDeadline: Date.now() + REMATCH_WINDOW_SECONDS * 1000,
      });
    },

    rematch: (sets) => {
      const s = get();
      if (s.rematchDeadline === null || Date.now() >= s.rematchDeadline) return;
      get().startMatch({ part: s.part, difficulty: s.difficulty, sets });
    },

    exit: () => {
      const s = get();
      botScored = true;
      set({
        status: "lobby",
        items: [],
        qIndex: 0,
        answered: false,
        selected: null,
        remaining: PER_QUESTION_SECONDS,
        aiProgress: 0,
        // 신원(이름/ID)·크레딧 미러는 유지하되 이번 판 점수/기록은 비운다
        user: makePlayer("user", s.user.name, s.user.playerId),
        ai: makePlayer("ai", getCharacter().name, "BOT"),
        userHistory: [],
        earnedCredits: 0,
        missions: [],
        rematchDeadline: null,
      });
    },

    setIdentity: (id) => {
      const s = get();
      const merged = { ...loadIdentity(), ...id };
      saveIdentity(merged);
      set({
        user: { ...s.user, name: merged.name, playerId: merged.playerId },
        credits: merged.credits,
      });
    },
  };
});
