"use client";

// 🎧 리스닝 랭크 대결 — RC 대결(match/*)과 별개의 경량 자체 플로우.
// 매치메이킹 → 카운트다운 → 인게임(오디오+타이머+봇) → 결과(RP·XP·제니 연출).
// 랭크/XP/오버레이/제니는 RC와 동일 플러밍을 재사용(도메인 무관).

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ListeningSet, ListeningPart } from "@/game/listening";
import {
  buildLcBattle,
  planBot,
  scoreFor,
  LC_SECONDS_BY_PART,
  type LcBattleItem,
  type BotPlan,
} from "@/game/lcmatch/build";
import { MATCH_LENGTH } from "@/game/match/types";
import { armConquest, takePendingConquest, gradeFromCoverage, type GradeMeta } from "@/game/conquest";
import {
  recordAnswers,
  masteredTotalOf,
  masteredIdSet,
  loadMastery,
  type MasteryPart,
} from "@/game/mastery";
import type { Difficulty } from "@/game/types";
import {
  jennyReactionForGrade,
  jennyCutsceneForGrade,
  jennyGreetingForDomain,
  MATCH_DOMAINS,
} from "@/game/match/jenny";
import { useCharacter } from "@/game/match/characters";
import CountdownIntro from "@/components/match/CountdownIntro";
import JennyAvatar from "@/components/match/JennyAvatar";
import PlayerAvatar from "@/components/match/PlayerAvatar";
import { Confetti, JennyCutin } from "@/components/match/JennyFx";
import { loadIdentity } from "@/game/match/persist";
import { saveLastMatch } from "@/game/match/lastMatch";
import { ArrowLeft } from "@/components/warmup/icons";

type Phase = "loading" | "matchmaking" | "countdown" | "playing" | "result";

interface Answered {
  item: LcBattleItem;
  selected: number | null;
  correct: boolean;
}

const LC = MATCH_DOMAINS.lc;

async function fetchGrandTotal(): Promise<number> {
  try {
    const r = await fetch("/api/part-totals");
    if (!r.ok) return 0;
    const { totals } = (await r.json()) as { totals: Record<string, number> };
    return Object.values(totals ?? {}).reduce((n, v) => n + (typeof v === "number" ? v : 0), 0);
  } catch {
    return 0;
  }
}

async function fetchListening(): Promise<ListeningSet[]> {
  try {
    const r = await fetch("/api/listening");
    if (!r.ok) return [];
    const { sets } = (await r.json()) as { sets: ListeningSet[] };
    return Array.isArray(sets) ? sets : [];
  } catch {
    return [];
  }
}

export default function LcMatchPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [part, setPart] = useState<ListeningPart>(3);
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [items, setItems] = useState<LcBattleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const armed = useRef(false);
  useEffect(() => {
    if (armed.current) return;
    armed.current = true;
    const sp = new URLSearchParams(window.location.search);
    const pRaw = Number(sp.get("part"));
    const p = (pRaw === 2 || pRaw === 3 || pRaw === 4 ? pRaw : 3) as ListeningPart;
    saveLastMatch("lc", p); // 랜딩에서 바로 이 조건으로 재진입
    setPart(p);
    const { difficulty: d } = armConquest();
    setDifficulty(d);
    (async () => {
      const sets = await fetchListening();
      // 맞힌 문제 제외 — Part 2는 문항 단위, Part 3·4는 세트 전체 정복 시 제외(build.ts).
      const battle = buildLcBattle(sets, p, masteredIdSet(p as MasteryPart));
      if (battle.length === 0) {
        setError("이 파트의 리스닝 문항을 불러오지 못했어요.");
        return;
      }
      setItems(battle);
      setPhase("matchmaking");
    })();
  }, []);

  if (error) {
    return (
      <main className="container-narrow flex min-h-dvh flex-col items-center justify-center gap-4 pb-safe text-center">
        <p className="text-[15px] font-semibold text-neutral-600">{error}</p>
        <button type="button" onClick={() => router.push("/rank")} className="btn-ghost">
          랭크로 돌아가기
        </button>
      </main>
    );
  }

  if (phase === "loading") {
    return (
      <main className="container-narrow flex min-h-dvh items-center justify-center pb-safe">
        <span className="flex items-center gap-2 text-sm text-neutral-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-300 border-t-sky-600" />
          리스닝 대결 준비 중…
        </span>
      </main>
    );
  }

  if (phase === "matchmaking") {
    return <LcMatchmaking part={part} difficulty={difficulty} onReady={() => setPhase("countdown")} />;
  }

  if (phase === "countdown") {
    return <CountdownIntro onDone={() => setPhase("playing")} />;
  }

  return (
    <LcPlaying
      items={items}
      part={part}
      difficulty={difficulty}
      onExit={() => router.push("/rank")}
    />
  );
}

/* ───────────────────────── 매치메이킹(제니 공개) ───────────────────────── */

function LcMatchmaking({
  part,
  difficulty,
  onReady,
}: {
  part: ListeningPart;
  difficulty: Difficulty;
  onReady: () => void;
}) {
  const character = useCharacter();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 1600);
    const t2 = setTimeout(() => onReady(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onReady]);

  return (
    <main className="container-narrow flex min-h-dvh flex-col items-center justify-center gap-6 pb-safe">
      <div className="surface-dark relative w-full overflow-hidden px-6 py-10 text-center">
        <div className={`pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-br ${LC.gradient} opacity-30 blur-3xl`} />
        <p className="relative text-[11px] font-black uppercase tracking-[0.24em] text-sky-300/80">
          {LC.emoji} 리스닝 랭크전 · Part {part}
        </p>
        <div className="relative mt-6 flex items-center justify-center gap-5">
          <div className="grid h-24 w-24 place-items-center">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="skeleton-dark grid h-24 w-24 place-items-center rounded-3xl text-4xl text-white/30"
                >
                  ?
                </motion.div>
              ) : (
                <motion.div
                  key="jenny"
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <JennyAvatar size={96} variant="idle" motionPreset="idle" glow rounded="rounded-3xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="relative mt-6 text-[15px] font-bold text-white">
          {revealed ? (
            <>
              <span className="text-fuchsia-300">{character.name}</span> 등장!
            </>
          ) : (
            "상대를 찾는 중…"
          )}
        </p>
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto mt-2 max-w-xs text-[13px] leading-snug text-white/60"
          >
            “{jennyGreetingForDomain("lc")}”
          </motion.p>
        )}
      </div>
      <p className="text-[12px] font-medium text-neutral-400">난이도 {difficulty} · 10문항 속도전</p>
    </main>
  );
}

/* ───────────────────────────── 인게임 ───────────────────────────── */

function LcPlaying({
  items,
  part,
  difficulty,
  onExit,
}: {
  items: LcBattleItem[];
  part: ListeningPart;
  difficulty: Difficulty;
  onExit: () => void;
}) {
  const character = useCharacter();
  const router = useRouter();
  const limit = LC_SECONDS_BY_PART[part];

  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(limit);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [botDone, setBotDone] = useState(false);

  // 누적값은 ref로 추적(최종 집계에서 최신값을 안전하게 읽기 위함)
  const userScoreRef = useRef(0);
  const botScoreRef = useRef(0);
  const historyRef = useRef<Answered[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const botPlanRef = useRef<BotPlan>({ correct: false, time: 999 });
  const finishedRef = useRef(false);
  const [finished, setFinished] = useState<null | {
    won: boolean;
    perfect: boolean;
    correct: number;
    userScore: number;
    botScore: number;
    history: Answered[];
  }>(null);

  const item = items[qIndex];

  // 새 문항 진입: 봇 계획 뽑기 + 오디오 재생 + 타이머 리셋
  useEffect(() => {
    if (!item) return;
    setAnswered(false);
    setSelected(null);
    setRemaining(limit);
    setBotDone(false);
    botPlanRef.current = planBot(difficulty);
    const el = audioRef.current;
    if (el) {
      el.src = item.audioSrc;
      el.currentTime = 0;
      el.play().catch(() => {
        /* 자동재생 차단 시 무시 — 수동 재생 버튼 제공 */
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex]);

  const advance = useCallback(() => {
    setQIndex((qi) => {
      const nextIdx = qi + 1;
      if (nextIdx >= items.length) return qi; // finish는 별도 처리
      return nextIdx;
    });
  }, [items.length]);

  // 채점 후 다음으로 (마지막이면 종료). 누적은 ref에 기록.
  const commit = useCallback(
    (sel: number | null) => {
      if (answered) return;
      const correct = sel !== null && sel === item.answerIndex;
      const gain = scoreFor(correct, remaining, limit);
      const bp = botPlanRef.current;
      const botGain = scoreFor(bp.correct, Math.max(0, limit - bp.time), limit);

      userScoreRef.current += gain;
      botScoreRef.current += botGain;
      historyRef.current = [...historyRef.current, { item, selected: sel, correct }];

      setAnswered(true);
      setSelected(sel);
      setUserScore(userScoreRef.current);
      setBotScore(botScoreRef.current);

      const isLast = qIndex + 1 >= items.length;
      window.setTimeout(() => {
        if (isLast) {
          if (finishedRef.current) return;
          finishedRef.current = true;
          const hist = historyRef.current;
          const correctCount = hist.filter((h) => h.correct).length;
          const us = userScoreRef.current;
          const bs = botScoreRef.current;
          setFinished({
            won: us >= bs,
            perfect: correctCount === items.length,
            correct: correctCount,
            userScore: us,
            botScore: bs,
            history: hist,
          });
        } else {
          advance();
        }
      }, correct ? 1000 : 1500);
    },
    [answered, item, remaining, limit, qIndex, items.length, advance],
  );

  // 타이머
  useEffect(() => {
    if (answered || finished) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      setRemaining((r) => {
        const nx = r - dt;
        if (nx <= 0) {
          clearInterval(id);
          commit(null); // 시간초과 = 미응답 오답
          return 0;
        }
        return nx;
      });
    }, 100);
    return () => clearInterval(id);
  }, [answered, finished, qIndex, commit]);

  // 봇 "응답 완료" 표시(연출용) — 계획 시간에 도달하면 표시
  useEffect(() => {
    if (answered) return;
    const bp = botPlanRef.current;
    const t = setTimeout(() => setBotDone(true), bp.time * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, answered]);

  if (finished) {
    return <LcResult data={finished} part={part} onExit={onExit} onRematch={() => router.refresh()} />;
  }

  if (!item) return null;

  const isCorrect = answered && selected === item.answerIndex;
  const timedOut = answered && selected === null;
  const timePct = Math.max(0, Math.min(100, (remaining / limit) * 100));
  const ident = loadIdentity();

  return (
    <main className="container-narrow flex min-h-dvh flex-col gap-4 pb-safe pt-5">
      <audio ref={audioRef} preload="auto" className="hidden" />

      {/* HUD — 나 vs 제니 + 타이머 */}
      <header className="surface-dark relative overflow-hidden rounded-[1.5rem] px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <PlayerAvatar size={38} name={ident.name} avatarId={ident.avatarId} />
            <div className="leading-tight">
              <p className="text-[12px] font-bold text-white">{ident.name}</p>
              <p className="tabnum text-[15px] font-black text-sky-300">{userScore}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">VS</p>
            <p className="tabnum text-[12px] font-bold text-white/60">
              {qIndex + 1} / {items.length}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="text-right leading-tight">
              <p className="text-[12px] font-bold text-white">{character.name}</p>
              <p className="tabnum text-[15px] font-black text-fuchsia-300">{botScore}</p>
            </div>
            <JennyAvatar size={38} variant="idle" motionPreset={botDone ? "win" : "idle"} />
          </div>
        </div>
        {/* 타이머 바 */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.span
            className={`block h-full rounded-full ${timePct < 30 ? "bg-rose-400" : "bg-gradient-to-r from-sky-400 to-cyan-400"}`}
            animate={{ width: `${timePct}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </header>

      {/* 오디오 카드 */}
      <div className="sheet flex flex-col gap-4 px-5 py-6 sm:px-7">
        <div className="flex items-center justify-between gap-2">
          <span className={`chip bg-gradient-to-r ${LC.gradient} text-white`}>
            {LC.emoji} Part {item.part}
          </span>
          {botDone && !answered && (
            <span className="text-[11px] font-bold text-fuchsia-500">{character.name} 응답 완료 — 서둘러요!</span>
          )}
        </div>

        {/* 재생 컨트롤 */}
        <button
          type="button"
          onClick={() => {
            const el = audioRef.current;
            if (el) {
              el.currentTime = 0;
              el.play().catch(() => {});
            }
          }}
          className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 px-5 py-5 text-white shadow-[0_14px_30px_-14px_rgba(2,132,199,0.8)] transition active:scale-[0.99]"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-[20px] backdrop-blur-sm">
            🔊
          </span>
          <span className="text-left">
            <span className="block text-[15px] font-black">다시 듣기</span>
            <span className="block text-[12px] font-medium text-white/70">
              오디오를 듣고 정답을 고르세요
            </span>
          </span>
        </button>

        {/* 문항 */}
        <div>
          <p className="text-[15px] font-bold leading-snug text-neutral-900">
            {item.part === 2 ? "질문에 가장 알맞은 응답을 고르세요." : item.promptEn}
          </p>
        </div>

        {/* 보기 */}
        <div className="flex flex-col gap-2.5">
          {item.choices.map((choice, i) => {
            const isAns = i === item.answerIndex;
            const isPicked = i === selected;
            let row = "ring-1 ring-neutral-200 bg-white hover:ring-sky-300 hover:bg-sky-50/40";
            let chip = "bg-neutral-100 text-neutral-500";
            if (answered) {
              if (isAns) {
                row = "ring-1 ring-emerald-400 bg-emerald-50";
                chip = "bg-emerald-500 text-white";
              } else if (isPicked) {
                row = "ring-1 ring-rose-300 bg-rose-50";
                chip = "bg-rose-500 text-white";
              } else {
                row = "ring-1 ring-neutral-100 bg-white opacity-50";
              }
            } else if (isPicked) {
              row = "ring-2 ring-sky-500 bg-sky-50/60";
              chip = "bg-sky-600 text-white";
            }
            const letter = ["A", "B", "C", "D"][i];
            const glyph = answered && isAns ? "✓" : answered && isPicked ? "✗" : letter;
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => commit(i)}
                className={`min-h-[3.25rem] rounded-2xl px-4 py-3.5 text-left transition disabled:cursor-default ${row}`}
              >
                <span className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold ${chip}`}>
                    {glyph}
                  </span>
                  {!item.hideChoiceText && (
                    <span className="text-[15px] leading-snug text-neutral-800">{choice}</span>
                  )}
                  {item.hideChoiceText && (
                    <span className="text-[14px] font-semibold text-neutral-400">응답 {letter}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {answered && (
          <p className={`text-center text-[14px] font-bold ${isCorrect ? "text-emerald-600" : "text-rose-500"}`}>
            {isCorrect ? "정답!" : timedOut ? "시간 초과" : "오답"}
          </p>
        )}
      </div>

      <button type="button" onClick={onExit} className="mx-auto flex items-center gap-1.5 text-[12px] font-semibold text-neutral-400 hover:text-neutral-600">
        <ArrowLeft className="h-3.5 w-3.5" /> 대결 포기
      </button>
    </main>
  );
}

/* ───────────────────────────── 결과 ───────────────────────────── */

function LcResult({
  data,
  part,
  onExit,
}: {
  data: {
    won: boolean;
    perfect: boolean;
    correct: number;
    userScore: number;
    botScore: number;
    history: Answered[];
  };
  part: ListeningPart;
  onExit: () => void;
  onRematch: () => void;
}) {
  const character = useCharacter();
  const router = useRouter();
  const applied = useRef(false);
  const [gradeUp, setGradeUp] = useState<{ before: GradeMeta; after: GradeMeta } | null>(null);
  const [masteredGain, setMasteredGain] = useState(0);
  const [jennyLine, setJennyLine] = useState<string | null>(null);
  const [cutinClosed, setCutinClosed] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    // 대결에서 맞힌 문항을 정복도에 충전(정복도만 — 정답률 통계는 리스닝 학습 전용)
    const entries = data.history
      .filter((h) => h.item?.key)
      .map((h) => ({
        part: h.item.part as MasteryPart,
        id: h.item.key,
        correct: h.correct,
        // Part 3·4: 대화/담화 세트 전체를 다 맞혀야 정복 → 같은 오디오(audioId=set) 문항을 한 세트로 묶음.
        // Part 2: 문항 단위 즉시 정복(setId 없음).
        setId: h.item.part === 2 ? undefined : h.item.audioId,
      }));
    const pending = takePendingConquest();
    const beforeCount = pending ? pending.masteredBefore : masteredTotalOf(loadMastery());
    recordAnswers(entries, { coverageOnly: true });
    const afterCount = masteredTotalOf(loadMastery());
    (async () => {
      const grand = await fetchGrandTotal();
      const covBefore = grand > 0 ? (beforeCount / grand) * 100 : 0;
      const covAfter = grand > 0 ? (afterCount / grand) * 100 : 0;
      const gBefore = gradeFromCoverage(covBefore);
      const gAfter = gradeFromCoverage(covAfter);
      setJennyLine(jennyReactionForGrade(gAfter.id, data.won));
      setMasteredGain(Math.max(0, afterCount - beforeCount));
      if (pending && gAfter.index > gBefore.index) setGradeUp({ before: gBefore, after: gAfter });
    })();
  }, [data]);

  const wrong = data.history.filter((h) => !h.correct);

  return (
    <main className="container-narrow flex min-h-dvh flex-col gap-4 pb-safe py-6">
      {/* 결과 배너 */}
      <div className="surface-dark relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-center">
        <div className={`pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-gradient-to-br ${data.won ? "from-emerald-400 to-teal-500" : "from-rose-500 to-fuchsia-600"} opacity-25 blur-3xl`} />
        <p className="relative text-[11px] font-black uppercase tracking-[0.24em] text-white/50">
          🎧 리스닝 랭크전 · Part {part}
        </p>
        <h1 className={`relative mt-2 text-[34px] font-black ${data.won ? "text-emerald-300" : "text-rose-300"}`}>
          {data.won ? "WIN" : "LOSE"}
        </h1>
        <div className="relative mt-4 flex items-center justify-center gap-6">
          <div>
            <p className="text-[11px] font-semibold text-white/40">나</p>
            <p className="tabnum text-[26px] font-black text-sky-300">{data.userScore}</p>
          </div>
          <span className="text-white/30">:</span>
          <div>
            <p className="text-[11px] font-semibold text-white/40">{character.name}</p>
            <p className="tabnum text-[26px] font-black text-fuchsia-300">{data.botScore}</p>
          </div>
        </div>
        <p className="relative mt-3 text-[13px] font-semibold text-white/60">
          정답 {data.correct} / {data.history.length}
          {data.perfect && <span className="ml-2 text-amber-300">퍼펙트! ✨</span>}
        </p>
      </div>

      {/* 제니 한마디 */}
      {jennyLine && (
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-rose-50 to-fuchsia-50 px-4 py-3 ring-1 ring-fuchsia-900/10">
          <JennyAvatar size={44} variant={data.won ? "lose" : "win"} motionPreset={data.won ? "lose" : "win"} glow />
          <p className="text-[13px] font-semibold leading-snug text-neutral-800">
            <span className="text-fuchsia-600">{character.name}</span>: “{jennyLine}”
          </p>
        </div>
      )}

      {/* 액션 */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setReviewing((v) => !v)}
          className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-sky-700 ring-1 ring-sky-900/10 shadow-sm transition active:scale-[0.98]"
        >
          틀린문제 REVIEW ({wrong.length})
        </button>
        <button
          type="button"
          onClick={() => router.push(`/lc-match?ranked=1&part=${part}`)}
          className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 px-4 py-3 text-[13px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(2,132,199,0.9)] transition active:scale-[0.98]"
        >
          🔁 재대결
        </button>
      </div>
      <button type="button" onClick={onExit} className="btn-ghost mx-auto">
        랭크 홈으로
      </button>

      {/* 리뷰 */}
      {reviewing && (
        <section className="rounded-2xl bg-white/95 p-4 ring-1 ring-sky-900/10 shadow-sm">
          {wrong.length === 0 ? (
            <p className="py-4 text-center text-[14px] font-semibold text-emerald-600">
              틀린 문제가 없어요. 완벽한 청취! 🎉
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {wrong.map((rec, i) => {
                const it = rec.item;
                const correctText =
                  it.part === 2
                    ? `응답 ${["A", "B", "C"][it.answerIndex]}${it.responses ? ` — ${it.responses[it.answerIndex]?.en ?? ""}` : ""}`
                    : it.choices[it.answerIndex];
                return (
                  <li key={i} className="overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-900/[0.06] p-3">
                    <p className="text-[13px] font-bold text-neutral-900">
                      {it.part === 2 ? it.promptEn : it.promptEn}
                    </p>
                    {it.promptKo && <p className="mt-0.5 text-[12px] text-neutral-500">{it.promptKo}</p>}
                    <p className="mt-2 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[12px] text-emerald-700 ring-1 ring-emerald-200/60">
                      <b>정답</b> {correctText}
                    </p>
                    {it.explanation && (
                      <p className="mt-1.5 rounded-lg bg-white px-2.5 py-2 text-[12px] leading-relaxed text-neutral-600 ring-1 ring-neutral-900/[0.05]">
                        {it.explanation}
                      </p>
                    )}
                    {it.scriptLines && it.scriptLines.length > 0 && (
                      <div className="mt-2 rounded-lg bg-sky-50/70 px-2.5 py-2 ring-1 ring-sky-100">
                        <p className="mb-1 text-[11px] font-bold text-sky-700">📄 스크립트 · 번역</p>
                        <div className="space-y-1.5">
                          {it.scriptLines.map((ln, j) => (
                            <div key={j}>
                              <p className="text-[12.5px] leading-relaxed text-neutral-800">
                                {it.part === 3 && (
                                  <span className="mr-1 font-bold text-sky-600">
                                    {ln.speaker.startsWith("W") ? "여" : "남"}:
                                  </span>
                                )}
                                {ln.en}
                              </p>
                              <p className="text-[11.5px] leading-relaxed text-neutral-400">{ln.ko}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {/* 정복도 충전 */}
      {masteredGain > 0 && (
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-white shadow-[0_10px_24px_-12px_rgba(13,148,136,0.8)]">
          <span className="text-[13px] font-bold">🎯 정복 진행</span>
          <span className="text-[15px] font-black">+{masteredGain}문항 정복</span>
        </div>
      )}

      {/* 등급 상승 컷신 */}
      {gradeUp && (
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-fuchsia-50 p-4 ring-1 ring-fuchsia-900/10">
          <div className="mb-2 flex items-center gap-2">
            <JennyAvatar size={30} variant="idle" />
            <span className="text-[12px] font-black text-fuchsia-600">{character.name} · {gradeUp.after.label} 등급 달성</span>
          </div>
          {jennyCutsceneForGrade(gradeUp.after.id).map((l, i) => (
            <p key={i} className="text-[13px] font-semibold leading-snug text-neutral-700">
              “{l}”
            </p>
          ))}
        </div>
      )}

      <Confetti trigger={data.won} />
      {jennyLine && !cutinClosed && (
        <JennyCutin
          open
          expression={data.won ? "lose" : "win"}
          line={jennyLine}
          onClose={() => setCutinClosed(true)}
        />
      )}
    </main>
  );
}
