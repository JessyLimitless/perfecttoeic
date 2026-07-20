"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { recordPattern, type PatternType } from "@/game/patterns";

const LETTERS = ["A", "B", "C", "D"];
const EASE = [0.22, 1, 0.36, 1] as const;
/** 클리어 후 다음 패턴으로 자동 진행까지의 시간(초) */
const AUTO_NEXT_SEC = 5;

type Phase = "brief" | "play" | "clear";

export default function PatternStudy({
  pattern,
  prevId,
  nextId,
}: {
  pattern: PatternType;
  prevId: string | null;
  nextId: string | null;
}) {
  const router = useRouter();
  const qs = pattern.questions;
  const hasPassage = !!pattern.passage;
  const hasBrief = !!(pattern.formula || pattern.tip || pattern.contextMap);

  const [phase, setPhase] = useState<Phase>(hasBrief ? "brief" : "play");
  /** 현재 문항 위치 — 한 번씩 쭉 풀고 끝난다(중간 해설 없음) */
  const [cur, setCur] = useState(0);
  const [picked, setPicked] = useState<number | undefined>(undefined);
  /** 문항별 선택 기록 — 리뷰(정답·해설)는 전부 푼 뒤에 */
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    qs.map(() => null),
  );
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);

  const shake = useAnimationControls();
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idx = cur;
  const q = qs[idx];
  const answered = picked !== undefined;
  const isCorrect = answered && picked === q?.answerIndex;

  const correctCount = useMemo(
    () => answers.filter((a, i) => a !== null && a === qs[i].answerIndex).length,
    [answers, qs],
  );
  const wrongCount = useMemo(
    () => answers.filter((a, i) => a !== null && a !== qs[i].answerIndex).length,
    [answers, qs],
  );
  const solvedCount = cur;

  useEffect(
    () => () => {
      if (advanceRef.current) clearTimeout(advanceRef.current);
    },
    [],
  );

  /** 정/오 플래시 후 다음 문항으로 — 마지막이면 결과로 */
  const advance = useCallback(() => {
    setPicked(undefined);
    setCur((prev) => {
      const next = prev + 1;
      if (next >= qs.length) {
        setPhase("clear");
        return prev;
      }
      return next;
    });
  }, [qs.length]);

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);

    const correct = i === q.answerIndex;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = i;
      return next;
    });

    if (correct) {
      setCombo((c) => {
        const n = c + 1;
        setMaxCombo((m) => (n > m ? n : m));
        return n;
      });
    } else {
      setCombo(0);
      void shake.start({
        x: [0, -9, 9, -6, 6, 0],
        transition: { duration: 0.42 },
      });
    }

    // 정오만 알려주고 자동 진행 — 해설은 마지막 리뷰에서 한 번에
    advanceRef.current = setTimeout(advance, correct ? 600 : 900);
  };

  // 클리어 시 진도 기록
  useEffect(() => {
    if (phase === "clear") recordPattern(pattern.id, correctCount, qs.length);
  }, [phase, pattern.id, correctCount, qs.length]);

  const restart = () => {
    setCur(0);
    setPicked(undefined);
    setAnswers(qs.map(() => null));
    setCombo(0);
    setMaxCombo(0);
    setPhase("play");
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-24 text-neutral-900">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-300/40 via-blue-300/30 to-sky-300/40 blur-[90px]" />

      <div
        className={`relative z-10 mx-auto px-4 pt-6 sm:pt-10 ${
          hasPassage && phase === "play"
            ? "container-exam"
            : "container-narrow max-w-2xl"
        }`}
      >
        {/* ═══════ 브리핑 — 공식·팁을 먼저 3초에 훑고 도전 ═══════ */}
        {phase === "brief" && (
          <Brief
            pattern={pattern}
            onStart={() => setPhase("play")}
            onList={() => router.push("/patterns")}
          />
        )}

        {/* ═══════ 도전 ═══════ */}
        {phase === "play" && q && (
          <>
            <Hud
              no={pattern.no}
              title={pattern.title}
              solved={solvedCount}
              total={qs.length}
              combo={combo}
              onQuit={() => router.push("/patterns")}
              onHint={hasBrief ? () => setHintOpen((v) => !v) : null}
              hintOpen={hintOpen}
            />

            {hintOpen && hasBrief && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 overflow-hidden"
              >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  {pattern.formula && (
                    <div className="text-[14px] leading-relaxed text-neutral-800">
                      <Markdown text={pattern.formula} />
                    </div>
                  )}
                  {pattern.tip && (
                    <p className="mt-2 text-[14px] leading-relaxed text-amber-900">
                      <Inline text={pattern.tip} />
                    </p>
                  )}
                  {pattern.contextMap && (
                    <div className="mt-2 text-[14px] leading-relaxed text-neutral-800">
                      <Markdown text={pattern.contextMap} />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div
              className={
                hasPassage
                  ? "mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] lg:items-start"
                  : "mt-4"
              }
            >
              {hasPassage && (
                <section className="rounded-2xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-6">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                    지문
                  </p>
                  <Passage text={pattern.passage!} tall />
                </section>
              )}

              <AnimatePresence mode="wait">
                <motion.section
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <motion.div
                    animate={shake}
                    className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-colors ${
                      answered
                        ? isCorrect
                          ? "border-emerald-300"
                          : "border-rose-300"
                        : "border-neutral-200"
                    }`}
                  >
                    {/* 정답 플래시 */}
                    <AnimatePresence>
                      {answered && isCorrect && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.5, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.7 }}
                          className="pointer-events-none absolute inset-0 bg-emerald-400"
                        />
                      )}
                    </AnimatePresence>

                    <p className="relative text-[16px] font-medium leading-relaxed text-neutral-900">
                      {q.prompt}
                    </p>

                    <div className="relative mt-4 space-y-2">
                      {q.choices.map((c, i) => {
                        const isPicked = picked === i;
                        // 정오만 표시 — 정답이 뭔지는 끝나고 리뷰에서
                        let cls =
                          "border-neutral-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50";
                        if (answered) {
                          if (isPicked)
                            cls = isCorrect
                              ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                              : "border-rose-400 bg-rose-50 text-rose-900";
                          else cls = "border-neutral-200 bg-white opacity-40";
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => choose(i)}
                            disabled={answered}
                            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition active:scale-[0.99] ${cls}`}
                          >
                            <span
                              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-extrabold ${
                                answered && isPicked
                                  ? isCorrect
                                    ? "bg-emerald-500 text-white"
                                    : "bg-rose-500 text-white"
                                  : "bg-neutral-100 text-neutral-500"
                              }`}
                            >
                              {LETTERS[i]}
                            </span>
                            <span className="text-[15px] font-medium">{c}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* 정오만 — 정답·해설은 끝나고 리뷰에서 한 번에 */}
                    <AnimatePresence>
                      {answered && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`relative mt-3 text-center text-[13px] font-bold ${
                            isCorrect ? "text-emerald-600" : "text-rose-500"
                          }`}
                        >
                          {isCorrect ? "⭕ 정답" : "❌ 오답 · 해설은 끝나고"}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.section>
              </AnimatePresence>
            </div>
          </>
        )}

        {/* ═══════ 클리어 ═══════ */}
        {phase === "clear" && (
          <Clear
            no={pattern.no}
            title={pattern.title}
            correct={correctCount}
            wrong={wrongCount}
            total={qs.length}
            maxCombo={maxCombo}
            questions={qs}
            answers={answers}
            onRetry={restart}
            onNext={nextId ? () => router.push(`/patterns/${nextId}`) : null}
            onList={() => router.push("/patterns")}
          />
        )}

        {/* 하단 패턴 네비 — 브리핑·클리어에서만 (도전 중엔 방해) */}
        {phase !== "play" && (
          <div className="mt-8 flex items-center justify-between text-sm font-semibold">
            {prevId ? (
              <button
                onClick={() => router.push(`/patterns/${prevId}`)}
                className="text-neutral-500 transition hover:text-indigo-600"
              >
                ← 이전 패턴
              </button>
            ) : (
              <span />
            )}
            {nextId ? (
              <button
                onClick={() => router.push(`/patterns/${nextId}`)}
                className="text-neutral-500 transition hover:text-indigo-600"
              >
                다음 패턴 →
              </button>
            ) : (
              <span />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

/* ══════════ 브리핑 ══════════ */
function Brief({
  pattern,
  onStart,
  onList,
}: {
  pattern: PatternType;
  onStart: () => void;
  onList: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <button
        onClick={onList}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-800"
      >
        <span aria-hidden>←</span> 패턴 목록
      </button>

      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 px-2.5 text-[15px] font-extrabold text-white shadow-sm">
          {String(pattern.no).padStart(2, "0")}
        </span>
        <div>
          <h1 className="text-xl font-extrabold leading-tight sm:text-2xl">
            {pattern.title}
          </h1>
          <span className="text-xs font-semibold text-indigo-500">
            CHAPTER {pattern.chapter} · {pattern.category}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-indigo-500">
          ⚡ 30초 브리핑
        </p>

        {pattern.formula && (
          <div className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-neutral-800">
            <Markdown text={pattern.formula} />
          </div>
        )}

        {pattern.contextMap && (
          <div className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed text-neutral-800">
            <Markdown text={pattern.contextMap} />
          </div>
        )}

        {pattern.tip && (
          <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-[14.5px] leading-relaxed text-amber-900 ring-1 ring-amber-200">
            💡 <Inline text={pattern.tip} />
          </p>
        )}
      </div>

      <button
        onClick={onStart}
        className="mt-5 flex min-h-[60px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-6 text-[17px] font-black text-white shadow-lg transition hover:opacity-95 active:scale-[0.99]"
      >
        ⚡ 도전 시작 · {pattern.questions.length}문제
      </button>
      <p className="mt-2.5 text-center text-[12.5px] text-neutral-400">
        정오만 체크하며 쭉 풀어요 · 정답과 해설은 끝나고 한 번에
      </p>
    </motion.div>
  );
}

/* ══════════ 인게임 HUD ══════════ */
function Hud({
  no,
  title,
  solved,
  total,
  combo,
  onQuit,
  onHint,
  hintOpen,
}: {
  no: number;
  title: string;
  solved: number;
  total: number;
  combo: number;
  onQuit: () => void;
  onHint: (() => void) | null;
  hintOpen: boolean;
}) {
  const pct = Math.round((solved / total) * 100);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-900/[0.06]">
      <div className="flex items-center gap-3">
        <button
          onClick={onQuit}
          aria-label="나가기"
          className="text-[13px] font-bold text-neutral-400 transition hover:text-neutral-700"
        >
          ✕
        </button>
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold text-neutral-800">
          <span className="text-indigo-500">
            {String(no).padStart(2, "0")}
          </span>{" "}
          {title}
        </span>

        <AnimatePresence>
          {combo >= 2 && (
            <motion.span
              key={combo}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-[11px] font-black text-white shadow"
            >
              🔥 {combo} 연속
            </motion.span>
          )}
        </AnimatePresence>

        {onHint && (
          <button
            onClick={onHint}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 transition ${
              hintOpen
                ? "bg-amber-100 text-amber-700 ring-amber-300"
                : "bg-white text-neutral-500 ring-neutral-200 hover:text-neutral-800"
            }`}
          >
            💡 공식
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
        <span className="shrink-0 text-[11.5px] font-bold tabular-nums text-neutral-500">
          {solved} / {total}
        </span>
      </div>
    </div>
  );
}

/* ══════════ 클리어 ══════════ */
function Clear({
  no,
  title,
  correct,
  wrong,
  total,
  maxCombo,
  questions,
  answers,
  onRetry,
  onNext,
  onList,
}: {
  no: number;
  title: string;
  correct: number;
  wrong: number;
  total: number;
  maxCombo: number;
  questions: PatternType["questions"];
  answers: (number | null)[];
  onRetry: () => void;
  onNext: (() => void) | null;
  onList: () => void;
}) {
  const perfect = correct === total;
  const [left, setLeft] = useState(AUTO_NEXT_SEC);
  // 오답이 있으면 자동 진행하지 않는다 — 해설을 볼 시간을 준다
  const [auto, setAuto] = useState(!!onNext && wrong === 0);
  const [onlyWrong, setOnlyWrong] = useState(wrong > 0);

  // 다음 패턴으로 자동 진행 — 흐름이 끊기지 않게 (취소 가능)
  useEffect(() => {
    if (!auto || !onNext) return;
    if (left <= 0) {
      onNext();
      return;
    }
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [auto, left, onNext]);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="mt-6 rounded-3xl border border-indigo-100 bg-white p-7 text-center shadow-sm"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
        className="text-5xl"
      >
        {perfect ? "👑" : "✅"}
      </motion.div>

      <h2 className="mt-3 text-2xl font-black tracking-tight">
        {perfect ? "퍼펙트 클리어!" : "패턴 클리어"}
      </h2>
      <p className="mt-1 text-[13px] font-semibold text-neutral-400">
        {String(no).padStart(2, "0")} · {title}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <Score label="정답" value={`${correct}/${total}`} tone="indigo" />
        <Score label="최고 연속" value={`🔥 ${maxCombo}`} tone="amber" />
        <Score label="오답" value={`${wrong}`} tone="neutral" />
      </div>

      {/* ── 리뷰 — 정답·해설을 여기서 한 번에 ── */}
      <div className="mt-7 text-left">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-extrabold text-neutral-800">
            📝 정답 · 해설
          </h3>
          {wrong > 0 && (
            <button
              onClick={() => setOnlyWrong((v) => !v)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 transition ${
                onlyWrong
                  ? "bg-rose-50 text-rose-600 ring-rose-200"
                  : "bg-white text-neutral-500 ring-neutral-200 hover:text-neutral-800"
              }`}
            >
              {onlyWrong ? `오답만 (${wrong})` : "전체 보기"}
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {questions.map((rq, i) => {
            const pick = answers[i];
            const ok = pick !== null && pick === rq.answerIndex;
            if (onlyWrong && ok) return null;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-4 ${
                  ok
                    ? "border-neutral-200 bg-white"
                    : "border-rose-200 bg-rose-50/40"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-black text-white ${
                      ok ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  >
                    {ok ? "○" : "✕"}
                  </span>
                  <p className="text-[14.5px] font-medium leading-relaxed text-neutral-900">
                    <span className="mr-1.5 text-[12px] font-bold text-neutral-400">
                      Q{i + 1}
                    </span>
                    {rq.prompt}
                  </p>
                </div>

                <p className="mt-2.5 pl-8 text-[13px] font-bold">
                  <span className="text-emerald-600">
                    정답 {LETTERS[rq.answerIndex]} · {rq.choices[rq.answerIndex]}
                  </span>
                  {!ok && pick !== null && (
                    <span className="ml-2 text-rose-500">
                      (내 답 {LETTERS[pick]})
                    </span>
                  )}
                </p>

                <p className="mt-1.5 whitespace-pre-line pl-8 text-[13px] leading-relaxed text-neutral-600">
                  {rq.explanation}
                </p>
                {rq.translation && (
                  <p className="mt-2 pl-8 text-[12.5px] leading-relaxed text-neutral-400">
                    {rq.translation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {onNext && (
          <button
            onClick={onNext}
            className="min-h-[54px] rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-5 text-[16px] font-black text-white shadow-lg transition hover:opacity-95 active:scale-[0.99]"
          >
            다음 패턴 →{auto ? ` (${left})` : ""}
          </button>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAuto(false);
              onRetry();
            }}
            className="min-h-[46px] flex-1 rounded-2xl border border-neutral-300 text-[14px] font-bold text-neutral-700 transition hover:bg-neutral-50"
          >
            다시 도전
          </button>
          <button
            onClick={() => {
              setAuto(false);
              onList();
            }}
            className="min-h-[46px] flex-1 rounded-2xl text-[14px] font-bold text-neutral-500 transition hover:text-neutral-800"
          >
            목록으로
          </button>
        </div>
        {auto && onNext && (
          <button
            onClick={() => setAuto(false)}
            className="text-[12px] font-semibold text-neutral-400 transition hover:text-neutral-600"
          >
            자동 진행 멈추기
          </button>
        )}
      </div>
    </motion.section>
  );
}

function Score({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "indigo" | "amber" | "neutral";
}) {
  const color =
    tone === "indigo"
      ? "text-indigo-600"
      : tone === "amber"
        ? "text-amber-600"
        : "text-neutral-700";
  return (
    <div className="rounded-2xl bg-neutral-50 px-2 py-3 ring-1 ring-neutral-900/[0.05]">
      <div className={`text-[17px] font-black tabular-nums ${color}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold text-neutral-400">
        {label}
      </div>
    </div>
  );
}

// ── markdown-lite 렌더러 (**bold** · `code` · 줄바꿈 · · 불릿) ──────────
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <b key={i} className="font-bold text-neutral-900">
              {p.slice(2, -2)}
            </b>
          );
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code
              key={i}
              className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[13px] text-indigo-700"
            >
              {p.slice(1, -1)}
            </code>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

// 지문 렌더러 — 빈칸 (1) 표식과 밑줄 공란을 강조.
function Passage({ text, tall = false }: { text: string; tall?: boolean }) {
  const parts = text.split(/(\(\d\)|_{3,})/g).filter((s) => s !== "");
  return (
    <div
      className={`overflow-y-auto whitespace-pre-wrap rounded-lg bg-white/70 p-3 font-serif text-[14px] leading-7 text-neutral-800 ring-1 ring-neutral-200 ${
        tall ? "max-h-[46vh] lg:max-h-[calc(100dvh-9rem)]" : "max-h-[46vh]"
      }`}
    >
      {parts.map((p, i) => {
        if (/^\(\d\)$/.test(p))
          return (
            <span
              key={i}
              className="mx-0.5 inline-flex items-center rounded bg-indigo-100 px-1.5 font-sans text-[12px] font-extrabold text-indigo-700"
            >
              {p}
            </span>
          );
        if (/^_{3,}$/.test(p))
          return (
            <span key={i} className="font-sans text-indigo-400">
              ______
            </span>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </div>
  );
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const t = line.trim();
        if (t === "") return <div key={i} className="h-1.5" />;
        const isBullet = t.startsWith("· ");
        return (
          <p key={i} className={isBullet ? "flex gap-2 pl-1 text-[14.5px]" : ""}>
            {isBullet && <span className="text-indigo-400">·</span>}
            <span>
              <Inline text={isBullet ? t.slice(2) : t} />
            </span>
          </p>
        );
      })}
    </>
  );
}
