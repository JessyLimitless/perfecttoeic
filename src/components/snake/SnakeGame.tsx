"use client";

// ⚡ 스피드 스네이크 — 엔드리스 Part 5 아케이드 XP 엔진.
// Part 5 단문 빈칸을 빠르게 맞힐수록 뱀이 자라고(콤보) 타이머가 짧아진다. 하트 3개.
// 진행(레벨/XP/엔드리스 기록/힌트)은 progression 스토어 계약에만 의존한다.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import {
  grantXp,
  recordEndlessRun,
  spendHint,
  loadProgress,
  activeSnakeSkin,
} from "@/game/progression/store";
import {
  comboMultiplier,
  XP_BY_PART,
  SNAKE_SKINS,
  type LevelUpResult,
} from "@/game/progression/types";
import LevelUpOverlay from "@/components/progression/LevelUpOverlay";
import LevelHud from "@/components/progression/LevelHud";
import {
  CorrectBurst,
  ComboPopup,
  ScreenFlash,
  SpeedLines,
} from "@/components/snake/ComboFx";
import QuestionPanel from "@/components/game/QuestionPanel";
import type { ChoiceIndex, PassageQuestion } from "@/game/types";

const LETTERS = ["A", "B", "C", "D"] as const;

/** 정답 플래시 시간(ms) — 짧게 보여주고 자동 진행 */
const FLASH_CORRECT_MS = 600;
/** 오답/시간초과 — 정답 위치를 잠깐 더 길게 보여준 뒤 진행 */
const FLASH_WRONG_MS = 1200;

/** 뱀 몸통 표시 상한 (초과분은 +N) */
const SNAKE_CAP = 16;

/** 콤보에 따라 줄어드는 문항 제한시간(초) */
function limitForCombo(combo: number): number {
  return Math.max(7, 15 - Math.floor(combo / 3));
}

/** Fisher–Yates 셔플 (원본 불변) */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "intro" | "playing" | "over";

export default function SnakeGame({
  questions,
  onExit,
}: {
  questions: PassageQuestion[];
  onExit: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");

  // 라운드 스트림 — 시작할 때 한 번 셔플 후 무한 순환
  const [stream, setStream] = useState<PassageQuestion[]>([]);

  // ── 런(run) 상태 ──
  const [hearts, setHearts] = useState(3);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [runXp, setRunXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [bestComboThisRun, setBestComboThisRun] = useState(0);
  const [qi, setQi] = useState(0);

  // ── 문항 상태 ──
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<ChoiceIndex | null>(null);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [hintUsedThisQ, setHintUsedThisQ] = useState(false);
  const [remaining, setRemaining] = useState(limitForCombo(0));
  const [limit, setLimit] = useState(limitForCombo(0));
  const [noHintFlash, setNoHintFlash] = useState(false);

  // ── 종료 화면 데이터 ──
  const [levelUp, setLevelUp] = useState<LevelUpResult | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [finalRunXp, setFinalRunXp] = useState(0);

  // ── 정적 표시값 (인트로/새로고침에서 갱신) ──
  const [best, setBest] = useState({ chain: 0, score: 0 });
  const [hintCount, setHintCount] = useState(0);
  const [skinKey, setSkinKey] = useState("classic");

  // ── 콤보 FX 트리거 (순수 시각 레이어 — 게임 로직/점수/타이머 불변) ──
  // 각 nonce 는 정답/오답 순간에 증가시켜 해당 연출을 1회 재생시킨다.
  const [correctTick, setCorrectTick] = useState(0);
  const [comboTick, setComboTick] = useState(0);
  const [flash, setFlash] = useState<{ tick: number; tone: "good" | "bad" }>({
    tick: 0,
    tone: "good",
  });
  const shakeControls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  // 런 시작 시점의 최고 콤보(신기록 판정 기준) — 렌더에 영향 없어 ref로 보관
  const bestChainAtStart = useRef(0);

  const skin = SNAKE_SKINS[skinKey] ?? SNAKE_SKINS.classic;

  /** localStorage 기반 표시값 갱신 (마운트/런 전환 시) */
  const refreshMeta = useCallback(() => {
    const p = loadProgress();
    setBest({ chain: p.endless.bestChain, score: p.endless.bestScore });
    setHintCount(p.inventory.hints);
    setSkinKey(activeSnakeSkin());
  }, []);

  useEffect(() => {
    refreshMeta();
  }, [refreshMeta]);

  const current: PassageQuestion | null = useMemo(() => {
    if (stream.length === 0) return null;
    return stream[qi % stream.length];
  }, [stream, qi]);

  // ───────────────────────── 런 제어 ─────────────────────────

  const beginRun = useCallback(() => {
    const p = loadProgress();
    bestChainAtStart.current = p.endless.bestChain;
    setHintCount(p.inventory.hints);
    setSkinKey(activeSnakeSkin());

    setStream(shuffle(questions));
    const l = limitForCombo(0);
    setHearts(3);
    setCombo(0);
    setScore(0);
    setRunXp(0);
    setCorrectCount(0);
    setBestComboThisRun(0);
    setQi(0);
    setAnswered(false);
    setSelected(null);
    setEliminated([]);
    setHintUsedThisQ(false);
    setLimit(l);
    setRemaining(l);
    setLevelUp(null);
    setIsNewRecord(false);
    setPhase("playing");
  }, [questions]);

  /** 다음 문항으로 (문항 상태 리셋 + 새 제한시간) */
  const advance = useCallback((nextCombo: number) => {
    const l = limitForCombo(nextCombo);
    setQi((q) => q + 1);
    setAnswered(false);
    setSelected(null);
    setEliminated([]);
    setHintUsedThisQ(false);
    setLimit(l);
    setRemaining(l);
  }, []);

  /** 런 종료 — XP 1회 지급 + 엔드리스 기록 + 종료 화면 */
  const endRun = useCallback(
    (finalScore: number, finalBestCombo: number, xp: number, correct: number) => {
      const res = grantXp(xp, { correct });
      recordEndlessRun(finalBestCombo, finalScore);
      setLevelUp(res.levelUp);
      setFinalRunXp(xp);
      setIsNewRecord(finalBestCombo > bestChainAtStart.current);
      refreshMeta();
      setPhase("over");
    },
    [refreshMeta],
  );

  // ───────────────────────── 답안 처리 ─────────────────────────

  const handleAnswer = useCallback(
    (choice: ChoiceIndex | null) => {
      if (phase !== "playing" || answered || !current) return;
      const isCorrect = choice !== null && choice === current.answerIndex;
      setAnswered(true);
      setSelected(choice);

      if (isCorrect) {
        const speedBonus = Math.round(remaining * 5);
        const gained = 100 + speedBonus;
        const newCombo = combo + 1;
        const addXp = Math.round(XP_BY_PART[5] * comboMultiplier(newCombo));

        setScore((s) => s + gained);
        setCombo(newCombo);
        setBestComboThisRun((b) => Math.max(b, newCombo));
        setRunXp((x) => x + addXp);
        setCorrectCount((c) => c + 1);

        // 🎇 정답 FX — 버스트 + 콤보 팝업 + 초록 플래시
        setCorrectTick((t) => t + 1);
        setComboTick((t) => t + 1);
        setFlash((f) => ({ tick: f.tick + 1, tone: "good" }));
      } else {
        // 오답/시간초과 → 하트 소모, 콤보 리셋 + 빨강 플래시 + 카드 흔들림
        setHearts((h) => h - 1);
        setCombo(0);
        setFlash((f) => ({ tick: f.tick + 1, tone: "bad" }));
        if (!reduceMotion) {
          shakeControls.start({
            x: [0, -9, 9, -6, 6, 0],
            transition: { duration: 0.4 },
          });
        }
      }
    },
    [phase, answered, current, remaining, combo, reduceMotion, shakeControls],
  );

  // 답한 뒤 플래시 후 자동 진행(또는 종료). 최신 상태를 스냅샷해 처리.
  useEffect(() => {
    if (phase !== "playing" || !answered || !current) return;
    const isCorrect = selected !== null && selected === current.answerIndex;
    const delay = isCorrect ? FLASH_CORRECT_MS : FLASH_WRONG_MS;
    const t = setTimeout(() => {
      if (isCorrect) {
        advance(combo); // combo는 이미 정답 반영된 최신값
      } else if (hearts <= 0) {
        endRun(score, bestComboThisRun, runXp, correctCount);
      } else {
        advance(0);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [
    phase,
    answered,
    current,
    selected,
    combo,
    hearts,
    score,
    bestComboThisRun,
    runXp,
    correctCount,
    advance,
    endRun,
  ]);

  // ───────────────────────── 타이머 ─────────────────────────

  useEffect(() => {
    if (phase !== "playing" || answered) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        const next = Math.max(0, +(r - 0.1).toFixed(2));
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [phase, answered, qi]);

  // 시간초과 → 오답 처리 (렌더 중 setState 방지 위해 effect에서)
  useEffect(() => {
    if (phase === "playing" && !answered && remaining <= 0) {
      handleAnswer(null);
    }
  }, [phase, answered, remaining, handleAnswer]);

  // ───────────────────────── 힌트 ─────────────────────────

  const useHint = useCallback(() => {
    if (phase !== "playing" || answered || hintUsedThisQ || !current) return;
    if (!spendHint()) {
      setNoHintFlash(true);
      window.setTimeout(() => setNoHintFlash(false), 1200);
      return;
    }
    // 오답 보기 중 2개를 제거
    const wrong: number[] = [];
    for (let i = 0; i < current.choices.length; i++) {
      if (i !== current.answerIndex) wrong.push(i);
    }
    const picked = shuffle(wrong).slice(0, 2);
    setEliminated(picked);
    setHintUsedThisQ(true);
    setHintCount(loadProgress().inventory.hints);
  }, [phase, answered, hintUsedThisQ, current]);

  // ───────────────────────── 키보드 ─────────────────────────

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") {
        const idx = (Number(e.key) - 1) as ChoiceIndex;
        if (!answered && !eliminated.includes(idx)) handleAnswer(idx);
      } else if (e.key === "h" || e.key === "H") {
        useHint();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answered, eliminated, handleAnswer, useHint]);

  // ───────────────────────── 렌더 ─────────────────────────

  // 문항 없음 — graceful
  if (questions.length === 0) {
    return (
      <div className="min-h-dvh container-narrow flex flex-col items-center justify-center gap-5 py-16 pb-safe text-center">
        <p className="text-[42px]">🐍</p>
        <p className="text-[16px] font-semibold text-neutral-700">
          문항을 불러올 수 없어요
        </p>
        <button type="button" onClick={onExit} className="btn-primary min-h-[48px] px-8">
          나가기
        </button>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="min-h-dvh container-narrow flex flex-col py-6 pb-safe">
        <div className="mb-5 flex items-center justify-between gap-3">
          <LevelHud variant="pill" />
          <button
            type="button"
            onClick={onExit}
            className="chip text-neutral-500 hover:text-neutral-800"
          >
            나가기
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="sheet relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-6 py-12 text-center"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-400" />

          <motion.p
            className="text-[64px] leading-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚡🐍
          </motion.p>
          <div>
            <h1 className="text-[26px] font-black tracking-tight text-gradient">
              스피드 스네이크
            </h1>
            <p className="mx-auto mt-3 max-w-[19rem] text-[14px] leading-6 text-neutral-500">
              Part 5 단문을 빠르게! 맞히면 뱀이 자라고 타이머가 빨라져요. 하트 3개.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-neutral-50 px-5 py-3 ring-1 ring-neutral-900/[0.05]">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                최고 콤보
              </p>
              <p className="tabnum text-[22px] font-black text-neutral-900">
                🔥 {best.chain}
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 px-5 py-3 ring-1 ring-neutral-900/[0.05]">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                최고 점수
              </p>
              <p className="tabnum text-[22px] font-black text-neutral-900">
                {best.score.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-[12px] font-semibold text-neutral-400">
            💡 보유 힌트 {hintCount}개 · 키보드 1~4 / H
          </p>

          <motion.button
            type="button"
            onClick={beginRun}
            whileTap={{ scale: 0.97 }}
            className="btn-primary min-h-[56px] w-full max-w-[18rem] text-[17px]"
          >
            시작
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (phase === "over") {
    return (
      <div className="min-h-dvh container-narrow flex flex-col justify-center py-6 pb-safe">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="sheet relative overflow-hidden px-6 py-10 text-center"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400" />

          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Game Over
          </p>

          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            className="tabnum mt-2 text-[56px] font-black leading-none text-neutral-900"
          >
            {score.toLocaleString()}
          </motion.p>
          <p className="mt-1 text-[13px] font-semibold text-neutral-400">점수</p>

          <AnimatePresence>
            {isNewRecord && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 15, delay: 0.24 }}
                className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-[13px] font-black text-white shadow-lg"
              >
                🏆 신기록!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-neutral-50 px-5 py-3 ring-1 ring-neutral-900/[0.05]">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                최고 콤보
              </p>
              <p className="tabnum text-[22px] font-black text-neutral-900">
                🔥 {bestComboThisRun}
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-5 py-3 ring-1 ring-indigo-500/10">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
                획득 XP
              </p>
              <p className="tabnum text-[22px] font-black text-indigo-600">
                +{finalRunXp}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <motion.button
              type="button"
              onClick={beginRun}
              whileTap={{ scale: 0.97 }}
              className="btn-primary min-h-[54px] w-full text-[16px]"
            >
              다시하기
            </motion.button>
            <button
              type="button"
              onClick={onExit}
              className="min-h-[48px] w-full rounded-2xl bg-neutral-100 text-[15px] font-bold text-neutral-600 transition hover:bg-neutral-200 active:scale-[0.98]"
            >
              나가기
            </button>
          </div>
        </motion.div>

        {levelUp && (
          <LevelUpOverlay result={levelUp} onClose={() => setLevelUp(null)} />
        )}
      </div>
    );
  }

  // ── phase === "playing" ──
  const timerRatio = limit > 0 ? Math.max(0, remaining / limit) : 0;
  const timerLow = timerRatio <= 0.35;
  const isCorrectPick = answered && selected !== null && current !== null && selected === current.answerIndex;
  const timedOut = answered && selected === null;

  return (
    <div className="min-h-dvh container-narrow flex flex-col gap-3 py-4 pb-safe">
      {/* 상단 HUD */}
      <div className="flex items-center justify-between gap-2">
        <LevelHud variant="pill" />
        <button
          type="button"
          onClick={onExit}
          className="chip shrink-0 text-neutral-500 hover:text-neutral-800"
        >
          나가기
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/85 px-4 py-2.5 ring-1 ring-neutral-900/[0.06]">
        <div className="flex items-center gap-1 text-[16px]" aria-label={`하트 ${hearts}개`}>
          {[0, 1, 2].map((i) => (
            <span key={i}>{i < hearts ? "❤️" : "🖤"}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[13px] font-bold">
          <span className="flex items-center gap-1 text-orange-500">
            🔥 {combo}
            <span className="text-[11px] text-orange-400">
              ×{comboMultiplier(combo).toFixed(1)}
            </span>
          </span>
          <span className="tabnum text-neutral-800">{score.toLocaleString()}점</span>
          <span className="tabnum text-indigo-500">+{runXp}xp</span>
        </div>
      </div>

      {/* 뱀 (콤보 체인) */}
      <div className="flex min-h-[40px] items-center gap-1.5 overflow-hidden px-1">
        <motion.span
          className="text-[26px] leading-none"
          animate={{ rotate: answered && isCorrectPick ? [0, -12, 12, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          🐍
        </motion.span>
        <div className="flex flex-1 items-center gap-1 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: Math.min(combo, SNAKE_CAP) }).map((_, i) => (
              <motion.span
                key={i}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 24 }}
                className={`h-4 w-4 shrink-0 rounded-[5px] bg-gradient-to-br ${skin.body} shadow-sm`}
              />
            ))}
          </AnimatePresence>
          {combo > SNAKE_CAP && (
            <span
              className="ml-0.5 text-[12px] font-black"
              style={{ color: skin.color }}
            >
              +{combo - SNAKE_CAP}
            </span>
          )}
        </div>
      </div>

      {/* 타이머 바 */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/80">
        <motion.span
          className={`block h-full rounded-full ${
            timerLow
              ? "bg-gradient-to-r from-rose-500 to-red-600"
              : "bg-gradient-to-r from-amber-400 to-orange-500"
          }`}
          animate={{ width: `${timerRatio * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* 문항 */}
      <motion.div
        animate={shakeControls}
        className="sheet relative flex-1 overflow-hidden px-5 py-5 sm:px-6"
      >
        {/* 🎇 콤보 FX 레이어 (게임 로직 무관 · 순수 시각) */}
        <SpeedLines active={combo >= 8} color={skin.color} />
        <ScreenFlash trigger={flash.tick} tone={flash.tone} />
        <CorrectBurst trigger={correctTick} color={skin.color} />
        <ComboPopup
          trigger={comboTick}
          combo={combo}
          multiplier={comboMultiplier(combo)}
          color={skin.color}
        />

        <div className="relative z-[15]">
        {current && (
          <QuestionPanel
            question={current}
            index={0}
            total={1}
            part={5}
            hideKo
            hideTypeBadge
            flat
          />
        )}

        {/* 보기 A/B/C/D */}
        {current && (
          <motion.div
            key={qi}
            className="mt-5 flex flex-col gap-2.5"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
            }}
            initial="hidden"
            animate="show"
          >
            {current.choices.map((choice, i) => {
              const idx = i as ChoiceIndex;
              const isCorrect = idx === current.answerIndex;
              const isPicked = idx === selected;
              const isElim = eliminated.includes(i);

              let row = "ring-1 ring-neutral-200 bg-white hover:ring-indigo-300 hover:bg-indigo-50/30";
              let chip = "bg-neutral-100 text-neutral-500";

              if (answered) {
                if (isCorrect) {
                  row = "ring-1 ring-emerald-400 bg-emerald-50";
                  chip = "bg-emerald-500 text-white";
                } else if (isPicked) {
                  row = "ring-1 ring-rose-300 bg-rose-50";
                  chip = "bg-rose-500 text-white";
                } else {
                  row = "ring-1 ring-neutral-100 bg-white opacity-50";
                }
              } else if (isElim) {
                row = "ring-1 ring-neutral-100 bg-neutral-50 opacity-40";
                chip = "bg-neutral-200 text-neutral-400";
              }

              const glyph = answered && isCorrect ? "✓" : answered && isPicked ? "✗" : LETTERS[i];

              const revealAnim = !answered
                ? undefined
                : isCorrect
                  ? { scale: [1, 1.03, 1] }
                  : isPicked
                    ? { x: [0, -5, 5, -3, 3, 0] }
                    : undefined;

              return (
                <motion.button
                  key={i}
                  type="button"
                  disabled={answered || isElim}
                  onClick={() => handleAnswer(idx)}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
                  }}
                  animate={revealAnim}
                  transition={{ duration: 0.28 }}
                  whileHover={answered || isElim ? undefined : { scale: 1.01 }}
                  whileTap={answered || isElim ? undefined : { scale: 0.985 }}
                  className={`min-h-[3.5rem] rounded-2xl px-4 py-4 text-left transition disabled:cursor-default sm:px-5 ${row}`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold ${chip}`}
                    >
                      {glyph}
                    </span>
                    <span
                      className={`text-[15px] leading-snug text-neutral-800 sm:text-[15.5px] ${
                        isElim && !answered ? "line-through" : ""
                      }`}
                    >
                      {choice}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* 정/오 플래시 */}
        <div className="mt-3 h-5 text-center">
          {answered && (
            <motion.p
              key="flash"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-[14px] font-bold ${
                isCorrectPick ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {isCorrectPick ? "정답!" : timedOut ? "시간 초과" : "오답"}
            </motion.p>
          )}
        </div>
        </div>
      </motion.div>

      {/* 힌트 */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={useHint}
          disabled={answered || hintUsedThisQ}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white px-5 text-[14px] font-bold text-neutral-700 ring-1 ring-neutral-900/[0.08] transition hover:bg-amber-50 disabled:opacity-40 active:scale-[0.98]"
        >
          💡 50:50
          <span className="text-[12px] font-semibold text-neutral-400">
            {hintCount}개
          </span>
        </button>
        <AnimatePresence>
          {noHintFlash && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[13px] font-bold text-rose-500"
            >
              힌트 없음
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
