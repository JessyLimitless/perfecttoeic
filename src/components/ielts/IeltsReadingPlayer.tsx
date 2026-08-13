"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  type IeltsReadingSet,
  type IeltsQuestion,
  IELTS_TRAPS,
  trapTypeOf,
  gradeGap,
  gradeChoice,
  bandFor,
  bandLabel,
  IELTS_TARGET_BAND,
  recordIeltsSet,
  type GapVerdict,
  type IeltsTrapType,
} from "@/game/ielts";
import TrapIcon, { SnareIcon } from "./TrapIcon";
import { ReviewCard, LETTER, type Response, type Verdict } from "./IeltsReview";

type Phase = "intro" | "play" | "result";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function IeltsReadingPlayer({ set }: { set: IeltsReadingSet }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [responses, setResponses] = useState<Record<string, Response>>({});
  /** 지문 번역 — 실전엔 없지만 학습에는 필요하다. 기본은 숨김. */
  const [showKo, setShowKo] = useState(false);

  const trapKinds = useMemo(() => {
    const seen: Record<string, number> = {};
    for (const q of set.questions) {
      const t = trapTypeOf(q.category);
      seen[t] = (seen[t] ?? 0) + 1;
    }
    return Object.entries(seen).sort((a, b) => b[1] - a[1]);
  }, [set.questions]);

  const verdicts = useMemo(() => {
    const out: Record<string, Verdict> = {};
    for (const q of set.questions) {
      const r = responses[q.id];
      if (q.kind === "gap") {
        out[q.id] =
          r === undefined || r === "" ? "wrong" : (gradeGap(String(r), q) as GapVerdict);
      } else {
        out[q.id] = r !== undefined && gradeChoice(Number(r), q) ? "correct" : "wrong";
      }
    }
    return out;
  }, [responses, set.questions]);

  const score = useMemo(() => {
    const correct = set.questions.filter((q) => verdicts[q.id] === "correct").length;
    const trapQs = set.questions.filter((q) => q.trap);
    const defended = trapQs.filter((q) => verdicts[q.id] === "correct").length;
    return {
      correct,
      total: set.questions.length,
      band: bandFor(correct, set.questions.length),
      trapsFaced: trapQs.length,
      trapsDefended: defended,
      trapRate: trapQs.length ? Math.round((defended / trapQs.length) * 100) : 0,
    };
  }, [verdicts, set.questions]);

  const answered = set.questions.filter(
    (q) => responses[q.id] !== undefined && responses[q.id] !== "",
  ).length;

  function submit() {
    recordIeltsSet({
      setId: set.id,
      correct: score.correct,
      total: score.total,
      trapsFaced: score.trapsFaced,
      trapsDefended: score.trapsDefended,
    });
    setPhase("result");
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function retry() {
    setResponses({});
    setPhase("intro");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /** 지문 — 풀이 중엔 좌측 고정, 결과에선 접어둔다 */
  const passage = (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_14px_32px_-26px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-[11px] font-black tracking-[0.1em] text-teal-600">
          READING PASSAGE {set.passageNo}
        </p>
        <button
          type="button"
          onClick={() => setShowKo((v) => !v)}
          className={`rounded-full px-3 py-1 text-[11px] font-black transition ${
            showKo
              ? "bg-teal-600 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {showKo ? "번역 켜짐" : "번역 보기"}
        </button>
      </div>

      <div className="space-y-4">
        {set.paragraphs.map((p, i) => (
          <div key={i}>
            <p className="text-[14px] leading-[1.75] text-neutral-800">
              {p.label && (
                <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded bg-neutral-900 align-[2px] text-[10.5px] font-black text-white">
                  {p.label}
                </span>
              )}
              {p.en}
            </p>
            {showKo && (
              <p className="mt-1.5 border-l-2 border-teal-200 pl-3 text-[12.5px] leading-relaxed text-neutral-400">
                {p.ko}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="relative min-h-dvh bg-neutral-50 pb-safe">
      {/* ══ 다크 헤더 ══════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-b-[2rem] bg-neutral-950 pb-24 pt-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-200px] h-[400px] w-[640px] -translate-x-1/2 rounded-full bg-teal-500/25 blur-[110px]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-5xl px-5">
          <div className="flex items-center justify-between">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white/45 transition hover:text-white"
            >
              <span className="text-[15px]">←</span> 만점 아이엘츠
            </Link>
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[11.5px] font-black tabular-nums text-teal-300 ring-1 ring-white/10 backdrop-blur">
              Reading Passage {set.passageNo} · Band {set.band.toFixed(1)}
            </span>
          </div>
          <div className="mt-6">
            <p className="text-[11px] font-black tracking-[0.12em] text-teal-300/80">
              {set.taskType.toUpperCase()}
            </p>
            <h1 className="mt-2 text-balance text-[24px] font-black leading-tight tracking-[-0.035em] text-white sm:text-[30px]">
              {set.titleKo}
            </h1>
            <p className="mt-1.5 text-[13px] text-white/40">{set.title}</p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 w-full max-w-5xl px-5 pb-32">
        <AnimatePresence mode="wait">
          {/* ══ 인트로 ══════════════════════════ */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-2xl"
            >
              <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_28px_60px_-30px_rgba(16,24,40,0.4)] ring-1 ring-neutral-900/[0.06] sm:p-8">
                <div className="grid grid-cols-3 gap-2.5">
                  <Stat label="문항" value={`${set.questions.length}`} />
                  <Stat label="단락" value={`${set.paragraphs.length}`} />
                  <Stat label="목표 밴드" value={IELTS_TARGET_BAND.toFixed(1)} />
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-b from-amber-50/80 to-white p-4 ring-1 ring-amber-500/15 sm:p-5">
                  <p className="flex items-center gap-2 text-[13px] font-black text-neutral-900">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-amber-600 ring-1 ring-amber-500/20">
                      <SnareIcon className="h-4 w-4" />
                    </span>
                    이 지문이 파놓은 덫
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {trapKinds.map(([t, n]) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white py-1 pl-2 pr-2.5 text-[11.5px] font-bold text-neutral-700 ring-1 ring-neutral-900/[0.07]"
                      >
                        <TrapIcon type={t as IeltsTrapType} className="h-3.5 w-3.5 text-teal-600" />
                        {IELTS_TRAPS[t as IeltsTrapType].label}
                        <span className="rounded-full bg-neutral-100 px-1.5 text-[10.5px] font-black tabular-nums text-neutral-500">
                          {n}
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="mt-3.5 text-[12.5px] leading-relaxed text-neutral-500">
                    지문을 보며 답을 채웁니다. 번역은 언제든 켤 수 있지만,{" "}
                    <b className="text-neutral-800">먼저 영문만으로 풀어보세요</b>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPhase("play")}
                  className="mt-6 w-full rounded-2xl bg-neutral-900 py-4 text-[15px] font-black text-white shadow-[0_10px_30px_-12px_rgba(16,24,40,0.6)] transition hover:bg-neutral-800 active:scale-[0.99]"
                >
                  지문 읽고 시작
                </button>
              </div>
            </motion.section>
          )}

          {/* ══ 풀이 — 시험지처럼 지문 좌 / 문항 우 ══════ */}
          {phase === "play" && (
            <motion.section
              key="play"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            >
              <div className="lg:sticky lg:top-4 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
                {passage}
              </div>
              <div className="space-y-3">
                {set.questions.map((q, i) => (
                  <QuestionCard
                    key={q.id}
                    q={q}
                    index={i}
                    response={responses[q.id]}
                    onChange={(v) => setResponses((p) => ({ ...p, [q.id]: v }))}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* ══ 결과 ════════════════════════════ */}
          {phase === "result" && (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl"
            >
              <div className="relative overflow-hidden rounded-[1.75rem] bg-neutral-900 p-6 text-white shadow-[0_20px_50px_-24px_rgba(16,24,40,0.7)] sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-500/20 blur-[70px]"
                />
                <div className="relative">
                  <p className="text-[11px] font-black tracking-[0.12em] text-teal-300/80">
                    ESTIMATED BAND
                  </p>
                  <div className="mt-2 flex items-end gap-3">
                    <motion.span
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className="text-[58px] font-black leading-[0.85] tabular-nums"
                    >
                      {score.band.toFixed(1)}
                    </motion.span>
                    <span className="pb-1.5 text-[13.5px] font-bold text-white/45">
                      {bandLabel(score.band)} · {score.correct}/{score.total} 정답
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/[0.06]">
                      <p className="text-[11.5px] font-bold text-white/40">함정 방어율</p>
                      <p className="mt-1 text-[24px] font-black leading-none tabular-nums text-teal-300">
                        {score.trapRate}%
                      </p>
                      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${score.trapRate}%` }}
                          transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: 0.2 }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] tabular-nums text-white/35">
                        {score.trapsDefended} / {score.trapsFaced} 방어
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/[0.06]">
                      <p className="text-[11.5px] font-bold text-white/40">목표까지</p>
                      <p
                        className={`mt-1 text-[24px] font-black leading-none tabular-nums ${
                          score.band >= IELTS_TARGET_BAND ? "text-emerald-300" : "text-amber-300"
                        }`}
                      >
                        {score.band >= IELTS_TARGET_BAND
                          ? "달성"
                          : `+${(IELTS_TARGET_BAND - score.band).toFixed(1)}`}
                      </p>
                      <p className="mt-2.5 text-[11px] tabular-nums text-white/35">
                        목표 Band {IELTS_TARGET_BAND.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {set.questions.map((q, i) => (
                  <ReviewCard
                    key={q.id}
                    q={q}
                    index={i}
                    response={responses[q.id]}
                    verdict={verdicts[q.id]}
                  />
                ))}
              </div>

              {/* 지문 다시 보기 — 번역 켜고 정독하는 단계 */}
              <div className="mt-4">{passage}</div>

              <div className="mt-4 flex gap-2.5">
                <button
                  type="button"
                  onClick={retry}
                  className="flex-1 rounded-2xl bg-white py-3.5 text-[14px] font-black text-neutral-800 shadow-sm ring-1 ring-neutral-900/10 transition hover:bg-neutral-50"
                >
                  다시 풀기
                </button>
                <Link
                  href="/ielts"
                  className="flex-1 rounded-2xl bg-neutral-900 py-3.5 text-center text-[14px] font-black text-white shadow-[0_10px_26px_-12px_rgba(16,24,40,0.6)] transition hover:bg-neutral-800"
                >
                  다음 지문 →
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {phase === "play" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-900/[0.06] bg-white/90 px-5 py-3 backdrop-blur-xl pb-safe">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <span className="shrink-0 text-[12.5px] font-black tabular-nums text-neutral-500">
              {answered} / {set.questions.length}
            </span>
            <button
              type="button"
              onClick={submit}
              className="flex-1 rounded-2xl bg-teal-600 py-3.5 text-[15px] font-black text-white shadow-[0_10px_26px_-12px_rgba(13,148,136,0.8)] transition hover:bg-teal-700 active:scale-[0.99]"
            >
              제출하고 채점
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 py-3.5 text-center ring-1 ring-neutral-900/[0.04]">
      <p className="text-[11px] font-bold text-neutral-400">{label}</p>
      <p className="mt-1 text-[19px] font-black leading-none tabular-nums text-neutral-900">
        {value}
      </p>
    </div>
  );
}

function QuestionCard({
  q,
  index,
  response,
  onChange,
}: {
  q: IeltsQuestion;
  index: number;
  response: Response;
  onChange: (v: Response) => void;
}) {
  const filled = response !== undefined && response !== "";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-24px_rgba(16,24,40,0.3)] ring-1 transition sm:p-5 ${
        filled ? "ring-teal-500/25" : "ring-neutral-900/[0.06]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 transition-colors ${
          filled ? "bg-teal-500" : "bg-neutral-100"
        }`}
      />
      <div className="flex items-start gap-3 pl-1.5">
        <span
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11.5px] font-black tabular-nums transition ${
            filled ? "bg-teal-600 text-white" : "bg-neutral-900 text-white"
          }`}
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-bold leading-relaxed text-neutral-900">
            {q.promptEn}
          </p>
          <p className="mt-0.5 text-[12.5px] text-neutral-400">{q.promptKo}</p>

          {q.kind === "gap" ? (
            <div className="mt-3">
              <input
                type="text"
                value={typeof response === "string" ? response : ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="답을 입력하세요"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full rounded-xl border-0 bg-neutral-50 px-4 py-3 text-[15px] font-bold text-neutral-900 ring-1 ring-neutral-900/[0.08] transition placeholder:font-normal placeholder:text-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {q.wordLimit && (
                <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[10.5px] font-black tracking-[0.04em] text-neutral-500">
                  WRITE {q.wordLimit}
                </p>
              )}
            </div>
          ) : (
            <div className="mt-3 space-y-1.5">
              {(q.choices ?? []).map((c, ci) => {
                const on = response === ci;
                return (
                  <button
                    key={ci}
                    type="button"
                    onClick={() => onChange(ci)}
                    className={`flex w-full items-start gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition ${
                      on
                        ? "bg-teal-50 font-bold text-teal-900 ring-2 ring-teal-500"
                        : "bg-neutral-50 text-neutral-700 ring-1 ring-neutral-900/[0.06] hover:bg-neutral-100"
                    }`}
                  >
                    <span
                      className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10.5px] font-black ${
                        on
                          ? "bg-teal-600 text-white"
                          : "bg-white text-neutral-400 ring-1 ring-neutral-900/[0.08]"
                      }`}
                    >
                      {LETTER[ci]}
                    </span>
                    <span className="min-w-0">{c}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
