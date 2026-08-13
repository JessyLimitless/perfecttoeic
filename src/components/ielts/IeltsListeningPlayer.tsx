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
  type IeltsTrapType,
} from "@/game/ielts";
import TrapIcon, { SnareIcon, ShieldIcon } from "./TrapIcon";

type Response = string | number | undefined;
type Phase = "intro" | "play" | "result";

/** 문항 하나의 판정 — 정답/오답이 아니라 "덫을 막았는가"로 말한다 */
type Verdict = "correct" | "typo" | "wrong";

// Heading Matching처럼 보기가 4개를 넘는 유형이 있어 A~J까지 둔다
const LETTER = "ABCDEFGHIJ".split("");
const EASE = [0.22, 1, 0.36, 1] as const;

function mmss(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

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
  /** 재생 위치 — 놓친 구간으로 되돌아갈 수 있게 */
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

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

  /** 놓친 구간 되감기 — 실전은 한 번뿐이지만 연습은 다시 들을 수 있어야 한다 */
  function nudge(delta: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + delta));
  }

  function seek(ratio: number) {
    const a = audioRef.current;
    if (!a || !Number.isFinite(a.duration)) return;
    a.currentTime = a.duration * Math.max(0, Math.min(1, ratio));
  }

  const pct = dur > 0 ? (cur / dur) * 100 : 0;

  return (
    <main className="relative min-h-dvh bg-neutral-50 pb-safe">
      {/* ══ 다크 헤더 ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-neutral-950 pb-24 pt-6">
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

        <div className="relative mx-auto w-full max-w-3xl px-5">
          <div className="flex items-center justify-between">
            <Link
              href="/ielts"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white/45 transition hover:text-white"
            >
              <span className="text-[15px]">←</span> 만점 아이엘츠
            </Link>
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[11.5px] font-black tabular-nums text-teal-300 ring-1 ring-white/10 backdrop-blur">
              Part {set.part} · Band {set.band.toFixed(1)}
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

      <div className="relative z-10 mx-auto -mt-16 w-full max-w-3xl px-5 pb-32">
        <AnimatePresence mode="wait">
          {/* ══ 인트로 ══════════════════════════ */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_28px_60px_-30px_rgba(16,24,40,0.4)] ring-1 ring-neutral-900/[0.06] sm:p-8">
                <div className="grid grid-cols-3 gap-2.5">
                  <Stat label="문항" value={`${set.questions.length}`} />
                  <Stat label="덫" value={`${set.questions.filter((q) => q.trap).length}`} />
                  <Stat label="목표 밴드" value={IELTS_TARGET_BAND.toFixed(1)} />
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-b from-amber-50/80 to-white p-4 ring-1 ring-amber-500/15 sm:p-5">
                  <p className="flex items-center gap-2 text-[13px] font-black text-neutral-900">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-amber-600 ring-1 ring-amber-500/20">
                      <SnareIcon className="h-4 w-4" />
                    </span>
                    이 세트가 파놓은 덫
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {trapKinds.map(([t, n]) => {
                      const meta = IELTS_TRAPS[t as keyof typeof IELTS_TRAPS];
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white py-1 pl-2 pr-2.5 text-[11.5px] font-bold text-neutral-700 ring-1 ring-neutral-900/[0.07]"
                        >
                          <TrapIcon type={t as IeltsTrapType} className="h-3.5 w-3.5 text-teal-600" />
                          {meta.label}
                          <span className="rounded-full bg-neutral-100 px-1.5 text-[10.5px] font-black tabular-nums text-neutral-500">
                            {n}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-3.5 text-[12.5px] leading-relaxed text-neutral-500">
                    실전과 동일하게 <b className="text-neutral-800">음원은 한 번에 이어서</b>{" "}
                    재생되고, 듣는 동안 답을 채웁니다. 스크립트는 제출 후에 공개됩니다.
                  </p>
                </div>

                {hasAudio === false && (
                  <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-[12.5px] font-bold text-amber-700 ring-1 ring-amber-500/20">
                    이 세트의 음원이 아직 준비되지 않았습니다. 문항은 그대로 풀 수 있어요.
                  </p>
                )}

                <button
                  type="button"
                  onClick={start}
                  className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-neutral-900 py-4 text-[15px] font-black text-white shadow-[0_10px_30px_-12px_rgba(16,24,40,0.6)] transition hover:bg-neutral-800 active:scale-[0.99]"
                >
                  {hasAudio === false ? (
                    "문제 풀기"
                  ) : (
                    <>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-teal-500 text-[11px] text-neutral-950 transition group-hover:scale-110">
                        ▶
                      </span>
                      재생하고 시작
                    </>
                  )}
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
            >
              {hasAudio !== false && (
                <div className="sticky top-3 z-20 overflow-hidden rounded-2xl bg-neutral-950/95 p-3.5 shadow-[0_14px_40px_-16px_rgba(16,24,40,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-500 text-[14px] text-neutral-950 shadow-lg shadow-teal-500/25 transition hover:bg-teal-400 active:scale-95"
                      aria-label={playing ? "일시정지" : "재생"}
                    >
                      {playing ? "❚❚" : "▶"}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[12px] font-black text-white/85">
                          {playing ? "재생 중 — 듣는 동안 답을 채우세요" : "일시정지"}
                        </p>
                        <p className="shrink-0 text-[11px] font-bold tabular-nums text-white/40">
                          {mmss(cur)} / {mmss(dur)}
                        </p>
                      </div>

                      {/* 진행·탐색 바 */}
                      <div
                        role="slider"
                        aria-label="재생 위치"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(pct)}
                        tabIndex={0}
                        onClick={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          seek((e.clientX - r.left) / r.width);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowLeft") nudge(-5);
                          if (e.key === "ArrowRight") nudge(5);
                        }}
                        className="group mt-2 cursor-pointer py-1.5"
                      >
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-[width] duration-150"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] font-bold tabular-nums text-white/35">
                        {answered} / {set.questions.length} 작성됨
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-1.5">
                      <div className="flex gap-1.5">
                        <PlayerChip onClick={() => nudge(-10)} label="10초 뒤로">
                          ↺10
                        </PlayerChip>
                        <PlayerChip
                          onClick={() => setRate((r) => (r === 1 ? 0.75 : 1))}
                          active={rate === 0.75}
                          label="재생 속도"
                        >
                          {rate === 0.75 ? "0.75x" : "1.0x"}
                        </PlayerChip>
                      </div>
                      <PlayerChip onClick={replay} label="처음부터">
                        처음부터
                      </PlayerChip>
                    </div>
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
            >
              {/* 밴드 카드 */}
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
              <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_2px_6px_rgba(16,24,40,0.04),0_20px_44px_-30px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowScript((v) => !v)}
                  aria-expanded={showScript}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-neutral-50/60"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-[18px] ring-1 ring-teal-500/15">
                    📄
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-black text-neutral-900">
                      스크립트 전문
                    </span>
                    <span className="block text-[11.5px] text-neutral-400">
                      덫이 심어진 문장을 눈으로 확인하세요
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[12px] font-black text-neutral-300 transition-transform ${
                      showScript ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {showScript && (
                  <div className="border-t border-neutral-900/[0.06] px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setShowKo((v) => !v)}
                      className="mb-4 rounded-full bg-neutral-100 px-3.5 py-1.5 text-[11.5px] font-black text-neutral-600 transition hover:bg-neutral-200"
                    >
                      {showKo ? "번역 숨기기" : "번역 보기"}
                    </button>
                    <div className="space-y-3.5">
                      {set.script.map((line, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-neutral-100 pl-3.5 transition hover:border-teal-400"
                        >
                          {line.role && (
                            <p className="text-[10.5px] font-black uppercase tracking-[0.08em] text-teal-600">
                              {line.role}
                            </p>
                          )}
                          <p className="mt-0.5 text-[13.5px] leading-relaxed text-neutral-800">
                            {line.en}
                          </p>
                          {showKo && (
                            <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-400">
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
                  className="flex-1 rounded-2xl bg-neutral-900 py-3.5 text-center text-[14px] font-black text-white shadow-[0_10px_26px_-12px_rgba(16,24,40,0.6)] transition hover:bg-neutral-800"
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
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-900/[0.06] bg-white/90 px-5 py-3 backdrop-blur-xl pb-safe">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
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

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
    </main>
  );
}

/* ─────────────────────────────────────────── */

/**
 * 콘텐츠의 `**강조**`를 실제 굵은 글씨로 렌더한다.
 * 해설·덫 설명은 전부 이 표기를 쓰는데, 그대로 두면 별표가 화면에 노출된다.
 */
function Rich({ text, strong }: { text: string; strong: string }) {
  // split의 캡처 그룹 덕에 홀수 인덱스가 강조 구간이 된다
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} className={strong}>
            {p}
          </b>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function PlayerChip({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-lg px-2 py-1 text-[10.5px] font-black tabular-nums transition ${
        active
          ? "bg-teal-500 text-neutral-950"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
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
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition ${
                      on
                        ? "bg-teal-50 font-bold text-teal-900 ring-2 ring-teal-500"
                        : "bg-neutral-50 text-neutral-700 ring-1 ring-neutral-900/[0.06] hover:bg-neutral-100"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10.5px] font-black ${
                        on
                          ? "bg-teal-600 text-white"
                          : "bg-white text-neutral-400 ring-1 ring-neutral-900/[0.08]"
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
          rail: "bg-emerald-500",
          chip: "bg-emerald-50 text-emerald-700 ring-emerald-500/15",
          icon: <ShieldIcon className="h-3.5 w-3.5" />,
          label: q.trap ? "덫 방어 성공" : "정답",
        }
      : verdict === "typo"
        ? {
            ring: "ring-amber-500/30",
            rail: "bg-amber-500",
            chip: "bg-amber-50 text-amber-700 ring-amber-500/15",
            icon: <TrapIcon type="SPELLING" className="h-3.5 w-3.5" />,
            label: "철자 하나 차이 — 실전이면 0점",
          }
        : {
            ring: "ring-rose-500/25",
            rail: "bg-rose-500",
            chip: "bg-rose-50 text-rose-700 ring-rose-500/15",
            icon: <SnareIcon className="h-3.5 w-3.5" />,
            label: q.trap ? "덫에 걸렸어요" : "오답",
          };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_12px_28px_-24px_rgba(16,24,40,0.3)] ring-1 ${tone.ring} sm:p-5`}
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${tone.rail}`} />
      <div className="flex items-start gap-3 pl-1.5">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-[11.5px] font-black tabular-nums text-white">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-black ring-1 ${tone.chip}`}
            >
              {tone.icon}
              {tone.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600">
              <TrapIcon type={trapTypeOf(q.category)} className="h-3.5 w-3.5" />
              {trap.label}
            </span>
          </div>

          <p className="mt-3 text-[14px] font-bold leading-relaxed text-neutral-900">
            {q.promptEn}
          </p>

          <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 px-3.5 py-2.5 ring-1 ring-neutral-900/[0.03]">
              <p className="text-[10.5px] font-black tracking-[0.06em] text-neutral-400">
                내 답
              </p>
              <p
                className={`mt-0.5 text-[13.5px] font-bold ${
                  verdict === "correct" ? "text-neutral-800" : "text-rose-600"
                }`}
              >
                {yourText}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50/70 px-3.5 py-2.5 ring-1 ring-emerald-500/10">
              <p className="text-[10.5px] font-black tracking-[0.06em] text-emerald-600/80">
                정답
              </p>
              <p className="mt-0.5 text-[13.5px] font-bold text-emerald-800">{correctText}</p>
            </div>
          </div>

          {q.trap && (
            <p className="mt-3 flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-[12.5px] font-bold leading-relaxed text-amber-800 ring-1 ring-amber-500/15">
              <SnareIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>
                <Rich text={q.trap} strong="font-black text-amber-900" />
              </span>
            </p>
          )}

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-neutral-500">
            <Rich text={q.explanation} strong="font-black text-neutral-800" />
          </p>
        </div>
      </div>
    </div>
  );
}
