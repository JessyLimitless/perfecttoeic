"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  type IeltsListeningSet,
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
} from "@/game/ielts";

type Response = string | number | undefined;
type Phase = "intro" | "play" | "result";

/** 문항 하나의 판정 — 정답/오답이 아니라 "덫을 막았는가"로 말한다 */
type Verdict = "correct" | "typo" | "wrong";

const LETTER = ["A", "B", "C", "D"];

export default function IeltsListeningPlayer({ set }: { set: IeltsListeningSet }) {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [phase, setPhase] = useState<Phase>("intro");
  const [responses, setResponses] = useState<Record<string, Response>>({});
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [hasAudio, setHasAudio] = useState<boolean | null>(null);
  const [showScript, setShowScript] = useState(false);
  const [showKo, setShowKo] = useState(false);

  const src = `/audio/ielts/${set.id}.mp3`;

  // 음원 게이트 — 아직 합성되지 않은 세트는 재생 UI를 숨긴다
  useEffect(() => {
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => alive && setHasAudio(r.ok))
      .catch(() => alive && setHasAudio(false));
    return () => {
      alive = false;
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate, phase]);

  /** 이 세트가 파놓은 덫 종류 — 인트로 브리핑용 */
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
        out[q.id] = r === undefined || r === "" ? "wrong" : (gradeGap(String(r), q) as GapVerdict);
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

  function start() {
    setPhase("play");
    // 사용자 제스처 직후이므로 자동재생이 허용된다
    window.setTimeout(() => {
      const a = audioRef.current;
      if (!a) return;
      a.playbackRate = rate;
      a.play().catch(() => setPlaying(false));
    }, 60);
  }

  function submit() {
    audioRef.current?.pause();
    setPlaying(false);
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
    setShowScript(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function toggleAudio() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.playbackRate = rate;
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }

  function replay() {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.playbackRate = rate;
    a.play().catch(() => setPlaying(false));
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-safe">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px]"
      >
        <div className="absolute left-1/2 top-[-140px] h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-teal-200/35 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-32 pt-8">
        {/* ── 헤더 ─────────────────────────────── */}
        <div className="flex items-center justify-between">
          <Link
            href="/ielts"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-neutral-500 transition hover:text-neutral-900"
          >
            <span className="text-[15px]">←</span> 만점 아이엘츠
          </Link>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-[11.5px] font-black text-teal-700 ring-1 ring-teal-500/20">
            Listening Part {set.part} · Band {set.band.toFixed(1)}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* ══ 인트로 ══════════════════════════ */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/[0.06] sm:p-8">
                <p className="text-[12px] font-black tracking-[0.08em] text-teal-600">
                  {set.taskType.toUpperCase()}
                </p>
                <h1 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[26px]">
                  {set.titleKo}
                </h1>
                <p className="mt-1 text-[13.5px] text-neutral-500">{set.title}</p>

                <div className="mt-6 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-900/[0.04]">
                  <p className="text-[12.5px] font-black text-neutral-800">
                    🪤 이 세트가 파놓은 덫
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {trapKinds.map(([t, n]) => {
                      const meta = IELTS_TRAPS[t as keyof typeof IELTS_TRAPS];
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11.5px] font-bold text-neutral-700 ring-1 ring-neutral-900/[0.06]"
                        >
                          {meta.icon} {meta.label}
                          <span className="tabular-nums text-neutral-400">{n}</span>
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-neutral-500">
                    실전과 동일하게 <b className="text-neutral-700">음원은 한 번에 이어서</b>{" "}
                    재생되고, 듣는 동안 답을 채웁니다. 스크립트는 제출 후에 공개됩니다.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <Stat label="문항" value={`${set.questions.length}`} />
                  <Stat label="목표 밴드" value={IELTS_TARGET_BAND.toFixed(1)} />
                  <Stat label="덫" value={`${set.questions.filter((q) => q.trap).length}`} />
                </div>

                {hasAudio === false && (
                  <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[12.5px] font-bold text-amber-700 ring-1 ring-amber-500/20">
                    이 세트의 음원이 아직 준비되지 않았습니다. 문항은 그대로 풀 수 있어요.
                  </p>
                )}

                <button
                  type="button"
                  onClick={start}
                  className="mt-6 w-full rounded-2xl bg-neutral-900 py-4 text-[15px] font-black text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.99]"
                >
                  {hasAudio === false ? "문제 풀기" : "▶ 재생하고 시작"}
                </button>
              </div>
            </motion.section>
          )}

          {/* ══ 풀이 ════════════════════════════ */}
          {phase === "play" && (
            <motion.section
              key="play"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              {hasAudio !== false && (
                <div className="sticky top-3 z-20 rounded-2xl bg-white/90 p-3 shadow-sm ring-1 ring-neutral-900/[0.06] backdrop-blur">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-600 text-[15px] text-white shadow-sm transition hover:bg-teal-700"
                      aria-label={playing ? "일시정지" : "재생"}
                    >
                      {playing ? "❚❚" : "▶"}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-black text-neutral-800">
                        {playing ? "재생 중 — 듣는 동안 답을 채우세요" : "일시정지"}
                      </p>
                      <p className="text-[11.5px] text-neutral-400">
                        {answered} / {set.questions.length} 작성됨
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRate((r) => (r === 1 ? 0.75 : 1))}
                      className={`rounded-full px-2.5 py-1.5 text-[11.5px] font-black transition ${
                        rate === 0.75
                          ? "bg-teal-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {rate === 0.75 ? "0.75x" : "1.0x"}
                    </button>
                    <button
                      type="button"
                      onClick={replay}
                      className="rounded-full bg-neutral-100 px-2.5 py-1.5 text-[11.5px] font-black text-neutral-600 transition hover:bg-neutral-200"
                    >
                      처음부터
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-3">
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
              className="mt-6"
            >
              {/* 밴드 카드 */}
              <div className="overflow-hidden rounded-3xl bg-neutral-900 p-6 text-white shadow-sm sm:p-8">
                <p className="text-[12px] font-black tracking-[0.08em] text-teal-300">
                  ESTIMATED BAND
                </p>
                <div className="mt-2 flex items-end gap-3">
                  <motion.span
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="text-[52px] font-black leading-none tabular-nums"
                  >
                    {score.band.toFixed(1)}
                  </motion.span>
                  <span className="pb-2 text-[14px] font-bold text-neutral-400">
                    {bandLabel(score.band)} · {score.correct}/{score.total} 정답
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.07] p-3.5">
                    <p className="text-[11.5px] font-bold text-neutral-400">함정 방어율</p>
                    <p className="mt-1 text-[22px] font-black tabular-nums text-teal-300">
                      {score.trapRate}%
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {score.trapsDefended} / {score.trapsFaced} 방어
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.07] p-3.5">
                    <p className="text-[11.5px] font-bold text-neutral-400">목표까지</p>
                    <p
                      className={`mt-1 text-[22px] font-black tabular-nums ${
                        score.band >= IELTS_TARGET_BAND ? "text-emerald-300" : "text-amber-300"
                      }`}
                    >
                      {score.band >= IELTS_TARGET_BAND
                        ? "달성"
                        : `+${(IELTS_TARGET_BAND - score.band).toFixed(1)}`}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      목표 Band {IELTS_TARGET_BAND.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 문항별 리뷰 */}
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

              {/* 스크립트 */}
              <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-900/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowScript((v) => !v)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[13.5px] font-black text-neutral-900">
                    📄 스크립트 전문
                  </span>
                  <span className="text-[12px] font-bold text-neutral-400">
                    {showScript ? "접기 ▲" : "펼치기 ▼"}
                  </span>
                </button>
                {showScript && (
                  <div className="border-t border-neutral-900/[0.06] px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setShowKo((v) => !v)}
                      className="mb-3 rounded-full bg-neutral-100 px-3 py-1.5 text-[11.5px] font-black text-neutral-600 transition hover:bg-neutral-200"
                    >
                      {showKo ? "번역 숨기기" : "번역 보기"}
                    </button>
                    <div className="space-y-3">
                      {set.script.map((line, i) => (
                        <div key={i}>
                          <p className="text-[13.5px] leading-relaxed text-neutral-800">
                            {line.role && (
                              <span className="mr-1.5 font-black text-teal-700">
                                {line.role}:
                              </span>
                            )}
                            {line.en}
                          </p>
                          {showKo && (
                            <p className="mt-0.5 text-[12.5px] leading-relaxed text-neutral-400">
                              {line.ko}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
                  className="flex-1 rounded-2xl bg-neutral-900 py-3.5 text-center text-[14px] font-black text-white shadow-sm transition hover:bg-neutral-800"
                >
                  다음 세트 →
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* 제출 바 */}
      {phase === "play" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-900/[0.06] bg-white/90 px-5 py-3 backdrop-blur pb-safe">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <span className="text-[12.5px] font-bold tabular-nums text-neutral-500">
              {answered} / {set.questions.length}
            </span>
            <button
              type="button"
              onClick={submit}
              className="flex-1 rounded-2xl bg-teal-600 py-3.5 text-[15px] font-black text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.99]"
            >
              제출하고 채점
            </button>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </main>
  );
}

/* ─────────────────────────────────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 py-3 ring-1 ring-neutral-900/[0.04]">
      <p className="text-[11.5px] font-bold text-neutral-400">{label}</p>
      <p className="mt-0.5 text-[17px] font-black tabular-nums text-neutral-900">{value}</p>
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
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-900/[0.06] sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neutral-900 text-[11.5px] font-black text-white tabular-nums">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold leading-relaxed text-neutral-900">
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
                <p className="mt-1.5 text-[11px] font-bold tracking-[0.04em] text-neutral-400">
                  ✍️ WRITE {q.wordLimit}
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
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition ${
                      on
                        ? "bg-teal-50 font-bold text-teal-900 ring-2 ring-teal-500"
                        : "bg-neutral-50 text-neutral-700 ring-1 ring-neutral-900/[0.06] hover:bg-neutral-100"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10.5px] font-black ${
                        on ? "bg-teal-600 text-white" : "bg-white text-neutral-400 ring-1 ring-neutral-900/[0.08]"
                      }`}
                    >
                      {LETTER[ci]}
                    </span>
                    {c}
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

function ReviewCard({
  q,
  index,
  response,
  verdict,
}: {
  q: IeltsQuestion;
  index: number;
  response: Response;
  verdict: Verdict;
}) {
  const trap = IELTS_TRAPS[trapTypeOf(q.category)];
  const correctText =
    q.kind === "gap"
      ? q.answer ?? ""
      : `${LETTER[q.answerIndex ?? 0]}. ${(q.choices ?? [])[q.answerIndex ?? 0] ?? ""}`;
  const yourText =
    response === undefined || response === ""
      ? "무응답"
      : q.kind === "gap"
        ? String(response)
        : `${LETTER[Number(response)]}. ${(q.choices ?? [])[Number(response)] ?? ""}`;

  const tone =
    verdict === "correct"
      ? {
          ring: "ring-emerald-500/25",
          chip: "bg-emerald-50 text-emerald-700",
          label: q.trap ? "🛡 덫 방어 성공" : "✓ 정답",
        }
      : verdict === "typo"
        ? {
            ring: "ring-amber-500/30",
            chip: "bg-amber-50 text-amber-700",
            label: "🔤 철자 하나 차이 — 실전이면 0점",
          }
        : {
            ring: "ring-rose-500/25",
            chip: "bg-rose-50 text-rose-700",
            label: q.trap ? "🪤 덫에 걸렸어요" : "✕ 오답",
          };

  return (
    <div className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ${tone.ring} sm:p-5`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neutral-900 text-[11.5px] font-black text-white tabular-nums">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${tone.chip}`}>
              {tone.label}
            </span>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600">
              {trap.icon} {trap.label}
            </span>
          </div>

          <p className="mt-2.5 text-[14px] font-bold leading-relaxed text-neutral-900">
            {q.promptEn}
          </p>

          <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 px-3 py-2">
              <p className="text-[11px] font-bold text-neutral-400">내 답</p>
              <p
                className={`text-[13.5px] font-bold ${
                  verdict === "correct" ? "text-neutral-800" : "text-rose-600"
                }`}
              >
                {yourText}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50/70 px-3 py-2">
              <p className="text-[11px] font-bold text-emerald-600/80">정답</p>
              <p className="text-[13.5px] font-bold text-emerald-800">{correctText}</p>
            </div>
          </div>

          {q.trap && (
            <p className="mt-2.5 rounded-xl bg-amber-50 px-3 py-2 text-[12.5px] font-bold leading-relaxed text-amber-800 ring-1 ring-amber-500/15">
              🪤 {q.trap}
            </p>
          )}

          <p className="mt-2 text-[12.5px] leading-relaxed text-neutral-500">
            {q.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
