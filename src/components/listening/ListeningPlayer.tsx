"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { ListeningSet } from "@/game/listening";
import { audioSrc } from "@/game/listening";
import { recordAnswers } from "@/game/mastery";
import type { MasteryPart } from "@/game/mastery";
import { recordSetResult } from "@/game/listeningProgress";
import { ArrowLeft } from "../warmup/icons";

const LETTERS = ["A", "B", "C", "D"];

/** 오디오 재생 카드 (재생/일시정지 + 다시듣기 + 느리게) */
function AudioCard({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  /** 브라우저 자동재생 차단 시에만 노출하는 안내 */
  const [blocked, setBlocked] = useState(false);

  // 화면이 열리거나 다음 문제로 넘어가면 곧바로 재생 — 실전 긴박감
  useEffect(() => {
    setPlaying(false);
    setBlocked(false);
    const a = ref.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.playbackRate = slow ? 0.75 : 1;
    void a.play().catch(() => setBlocked(true));
    // slow는 아래 effect가 따로 반영 — 여기선 src 변경만 트리거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = slow ? 0.75 : 1;
  }, [slow, src]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    setBlocked(false);
    if (a.paused) void a.play().catch(() => setBlocked(true));
    else a.pause();
  };
  const replay = () => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = 0;
    a.play();
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-4 text-white shadow-lg shadow-cyan-500/20 sm:p-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "일시정지" : "재생"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/95 text-[22px] text-cyan-600 shadow-md transition active:scale-90"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            {blocked ? "▶ 눌러 재생" : playing ? "재생 중" : "Audio"}
          </p>
          <p className="truncate text-[14px] font-bold">{label}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={replay}
            className="rounded-full bg-white/15 px-3 py-2 text-[12px] font-semibold ring-1 ring-white/25 transition active:scale-95 hover:bg-white/25"
          >
            🔁 다시
          </button>
          <button
            type="button"
            onClick={() => setSlow((s) => !s)}
            aria-pressed={slow}
            className={`rounded-full px-3 py-2 text-[12px] font-semibold ring-1 transition active:scale-95 ${
              slow ? "bg-white text-cyan-700 ring-white" : "bg-white/15 text-white ring-white/25 hover:bg-white/25"
            }`}
          >
            🐢 {slow ? "0.75x" : "느리게"}
          </button>
        </div>
      </div>
      <audio
        ref={ref}
        src={src}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

/** ───────── Part 2: 질문-응답 (보기 숨김, 오디오로만 A/B/C 선택) ───────── */
function Part2View({ set }: { set: ListeningSet }) {
  const router = useRouter();
  const items = set.items ?? [];
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = items[idx];
  const revealed = picked !== null;

  // 세트 완료 시 세트별 진행·최고점 1회 기록
  useEffect(() => {
    if (done) recordSetResult(set.id, score, items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) {
    return (
      <SummaryCard
        correct={score}
        total={items.length}
        onRetry={() => {
          setIdx(0);
          setPicked(null);
          setScore(0);
          setDone(false);
        }}
        onHome={() => router.push("/listening")}
      />
    );
  }

  const pick = (i: number) => {
    if (revealed) return;
    setPicked(i);
    const isCorrect = i === item.answerIndex;
    if (isCorrect) setScore((s) => s + 1);
    // 파트별 정복도 기록 (item 단위, 답한 순간 1회)
    recordAnswers([{ part: 2, id: item.id, correct: isCorrect }]);
  };
  const next = () => {
    if (idx + 1 >= items.length) setDone(true);
    else {
      setIdx((v) => v + 1);
      setPicked(null);
    }
  };

  return (
    <div>
      <ProgressDots total={items.length} idx={idx} />
      <div className="mt-3">
        <AudioCard src={audioSrc(item.id)} label={`Question ${idx + 1} — 잘 듣고 알맞은 응답을 고르세요`} />
      </div>

      {/* A/B/C 선택 (텍스트 숨김 — 실전과 동일) */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {["A", "B", "C"].map((L, i) => {
          const isAns = i === item.answerIndex;
          const isPicked = i === picked;
          let cls = "border-neutral-200 bg-white text-neutral-700 hover:border-cyan-400 hover:bg-cyan-50";
          if (revealed && isAns) cls = "border-emerald-500 bg-emerald-50 text-emerald-700";
          else if (revealed && isPicked) cls = "border-rose-400 bg-rose-50 text-rose-600";
          else if (revealed) cls = "border-neutral-200 bg-white text-neutral-300";
          return (
            <button
              key={L}
              type="button"
              onClick={() => pick(i)}
              disabled={revealed}
              className={`flex h-16 items-center justify-center rounded-2xl border-2 text-[22px] font-extrabold transition active:scale-95 ${cls}`}
            >
              {L}
              {revealed && isAns && <span className="ml-1 text-[15px]">✓</span>}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white"
          >
            <div className={`px-4 py-2.5 text-[13px] font-bold text-white ${picked === item.answerIndex ? "bg-emerald-500" : "bg-rose-500"}`}>
              {picked === item.answerIndex ? "정답입니다 🎉" : `아쉬워요 — 정답은 (${LETTERS[item.answerIndex]})`}
            </div>
            <div className="space-y-3 px-4 py-4">
              <div>
                <p className="label text-cyan-600">질문</p>
                <p className="mt-0.5 text-[15px] font-semibold text-neutral-900">{item.promptEn}</p>
                <p className="text-[13px] text-neutral-500">{item.promptKo}</p>
              </div>
              <div className="space-y-2">
                <p className="label text-cyan-600">응답</p>
                {item.responses.map((r, i) => (
                  <div
                    key={i}
                    className={`rounded-lg px-3 py-2 text-[14px] ${
                      i === item.answerIndex ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-neutral-50"
                    }`}
                  >
                    <span className="mr-1.5 font-bold text-neutral-400">({LETTERS[i]})</span>
                    <span className="font-medium text-neutral-800">{r.en}</span>
                    <span className="ml-1 text-[12.5px] text-neutral-400">— {r.ko}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[13px] leading-relaxed text-neutral-600 ring-1 ring-cyan-100">
                <span className="mr-1 font-bold text-cyan-700">해설</span>
                {item.explanation}
              </div>
              <button
                type="button"
                onClick={next}
                className="min-h-[48px] w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 text-[15px] font-bold text-white shadow-md transition active:scale-95"
              >
                {idx + 1 >= items.length ? "결과 보기 →" : "다음 문제 →"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** ───────── Part 3/4: 대화·담화 (문항·보기 표시) ───────── */
function Part34View({ set }: { set: ListeningSet }) {
  const router = useRouter();
  const questions = set.questions ?? [];
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  // 리뷰(제출 후)에선 스크립트 번역을 기본으로 보이게 — RC 지문 번역과 동일.
  const [showKo, setShowKo] = useState(true);

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = useMemo(
    () => questions.reduce((n, q, i) => (answers[i] === q.answerIndex ? n + 1 : n), 0),
    [answers, questions],
  );

  const select = (qi: number, ci: number) => {
    if (revealed) return;
    setAnswers((prev) => prev.map((v, i) => (i === qi ? ci : v)));
  };

  const answeredCount = answers.filter((a) => a !== null).length;

  const reveal = () => {
    setRevealed(true);
    // 파트별 정복도 기록 (제출 시점, 문항별 1회)
    recordAnswers(
      questions.map((q, i) => ({
        part: set.part as MasteryPart,
        id: q.id,
        correct: answers[i] === q.answerIndex,
        setId: set.id,
      })),
    );
    // 세트별 진행·최고점 기록
    recordSetResult(set.id, correctCount, questions.length);
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start lg:gap-6">
      {/* 좌: 오디오 + 진행 (데스크탑에서 sticky) */}
      <div className="space-y-3 lg:sticky lg:top-6">
        <AudioCard
          src={audioSrc(set.id)}
          label={set.part === 3 ? "대화를 듣고 문항을 푸세요" : "담화를 듣고 문항을 푸세요"}
        />
        <div className="hidden rounded-2xl bg-white/70 px-4 py-3.5 ring-1 ring-neutral-900/[0.05] backdrop-blur-sm lg:block">
          <p className="text-[12px] font-semibold text-neutral-400">진행</p>
          <p className="mt-0.5 text-[15px] font-bold text-neutral-900">
            {revealed ? "제출 완료" : `${answeredCount} / ${questions.length} 문항`}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all"
              style={{ width: `${(answeredCount / Math.max(questions.length, 1)) * 100}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-neutral-400">
            제출 후 정답·해설·스크립트가 공개됩니다.
          </p>
        </div>
      </div>

      {/* 우: 문항 + 결과 */}
      <div className="mt-4 lg:mt-0">
        <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={q.id} className="card-elevated overflow-hidden">
            <div className="px-4 py-3.5 sm:px-5">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[12px] font-extrabold text-white">
                  {qi + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-neutral-900">{q.promptEn}</p>
                  <p className="text-[12.5px] text-neutral-400">{q.promptKo}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {q.choices.map((c, ci) => {
                  const isAns = ci === q.answerIndex;
                  const isSel = answers[qi] === ci;
                  let cls = "border-neutral-200 bg-white hover:border-cyan-400 hover:bg-cyan-50/50";
                  if (revealed && isAns) cls = "border-emerald-500 bg-emerald-50";
                  else if (revealed && isSel) cls = "border-rose-400 bg-rose-50";
                  else if (!revealed && isSel) cls = "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-300";
                  return (
                    <button
                      key={ci}
                      type="button"
                      onClick={() => select(qi, ci)}
                      disabled={revealed}
                      className={`flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${cls}`}
                    >
                      <span className={`text-[13px] font-extrabold ${revealed && isAns ? "text-emerald-600" : "text-neutral-400"}`}>
                        {LETTERS[ci]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-medium text-neutral-800">{c}</span>
                        {(revealed || isSel) && (
                          <span className="block text-[12px] text-neutral-400">{q.choicesKo[ci]}</span>
                        )}
                      </span>
                      {revealed && isAns && <span className="text-emerald-500">✓</span>}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <div className="mt-3 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[13px] leading-relaxed text-neutral-600 ring-1 ring-cyan-100">
                  <span className="mr-1 font-bold text-cyan-700">해설</span>
                  {q.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={reveal}
          disabled={!allAnswered}
          className="mt-5 min-h-[52px] w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 text-[15px] font-bold text-white shadow-md transition active:scale-95 disabled:from-neutral-300 disabled:to-neutral-300 disabled:shadow-none"
        >
          {allAnswered ? "정답 확인 →" : `문항을 모두 풀어주세요 (${answers.filter((a) => a !== null).length}/${questions.length})`}
        </button>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-neutral-900 px-4 py-3.5 text-center text-white">
            <p className="text-[13px] text-white/60">이 세트 점수</p>
            <p className="text-[24px] font-extrabold">
              {correctCount} <span className="text-[15px] font-medium text-white/50">/ {questions.length}</span>
            </p>
          </div>

          {/* 스크립트 (영/한 토글) */}
          <div className="card-elevated overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <span className="text-[13px] font-bold text-neutral-800">📄 스크립트</span>
              <button
                type="button"
                onClick={() => setShowKo((v) => !v)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ring-1 transition ${
                  showKo ? "bg-cyan-500/15 text-cyan-600 ring-cyan-500/25" : "bg-white text-neutral-400 ring-neutral-200"
                }`}
              >
                🇰🇷 번역 {showKo ? "보임" : "숨김"}
              </button>
            </div>
            <div className="space-y-2.5 px-4 py-4">
              {(set.script ?? []).map((line, i) => (
                <div key={i}>
                  <p className="text-[14px] leading-relaxed text-neutral-800">
                    {set.part === 3 && (
                      <span className="mr-1.5 font-bold text-cyan-600">{line.speaker.startsWith("W") ? "여" : "남"}:</span>
                    )}
                    {line.en}
                  </p>
                  {showKo && <p className="text-[12.5px] leading-relaxed text-neutral-400">{line.ko}</p>}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/listening")}
            className="btn-ghost min-h-[48px] w-full text-[14px]"
          >
            ← 리스닝 목록으로
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

function ProgressDots({ total, idx }: { total: number; idx: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < idx ? "bg-cyan-500" : i === idx ? "bg-cyan-400" : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function SummaryCard({
  correct,
  total,
  onRetry,
  onHome,
}: {
  correct: number;
  total: number;
  onRetry: () => void;
  onHome: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card-elevated overflow-hidden text-center">
      <div className="bg-gradient-to-br from-cyan-500 to-sky-600 px-6 py-8 text-white">
        <p className="text-[13px] text-white/70">Part 2 완료</p>
        <p className="mt-1 text-[40px] font-extrabold leading-none">
          {correct}
          <span className="text-[20px] font-medium text-white/60"> / {total}</span>
        </p>
        <p className="mt-2 text-[14px] text-white/80">{correct === total ? "완벽해요! 🎯" : "잘하셨어요 👍"}</p>
      </div>
      <div className="flex gap-2 p-4">
        <button type="button" onClick={onRetry} className="min-h-[48px] flex-1 rounded-xl bg-cyan-500 text-[14px] font-bold text-white transition active:scale-95">
          다시 풀기
        </button>
        <button type="button" onClick={onHome} className="btn-ghost min-h-[48px] flex-1 text-[14px]">
          목록으로
        </button>
      </div>
    </motion.div>
  );
}

const PART_LABEL: Record<number, string> = {
  2: "Part 2 · 질문-응답",
  3: "Part 3 · 대화",
  4: "Part 4 · 담화",
};

export default function ListeningPlayer({ set }: { set: ListeningSet }) {
  const router = useRouter();
  // Part 2는 간결해 좁은 칼럼, Part 3/4는 넓은 프레임(데스크탑 2단)으로.
  const frame = set.part === 2 ? "container-narrow" : "container-app";
  return (
    <main className={`${frame} relative min-h-dvh overflow-hidden py-5 pb-safe sm:py-8`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-8 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/25 to-sky-400/15 blur-[80px]"
      />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/listening")}
          className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700 active:scale-95"
        >
          <ArrowLeft size={16} /> 목록
        </button>
        <span className="chip bg-cyan-500/10 text-cyan-600 ring-1 ring-cyan-500/20 normal-case tracking-normal">
          {PART_LABEL[set.part]} · {set.difficulty}
        </span>
      </div>

      <h1 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em] text-neutral-900 sm:text-[24px]">
        🎧 {set.passageType ?? "Listening"}
      </h1>
      <p className="mt-1 text-[13px] text-neutral-400">
        {set.part === 2 ? "오디오만 듣고 A·B·C 중 알맞은 응답을 고르세요." : "오디오를 듣고 문항을 푼 뒤 정답을 확인하세요."}
      </p>

      <div className="mt-5">
        {set.part === 2 ? <Part2View set={set} /> : <Part34View set={set} />}
      </div>
    </main>
  );
}
