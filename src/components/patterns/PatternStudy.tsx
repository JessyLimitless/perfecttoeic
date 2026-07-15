"use client";

import { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { recordPattern, type PatternType } from "@/game/patterns";

const LETTERS = ["A", "B", "C", "D"];

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
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>(() =>
    qs.map(() => undefined),
  );
  const [done, setDone] = useState(false);

  const q = qs[idx];
  const answered = selected[idx] !== undefined;
  const correctCount = useMemo(
    () => selected.filter((s, i) => s === qs[i].answerIndex).length,
    [selected, qs],
  );

  const choose = (i: number) => {
    if (answered) return;
    setSelected((prev) => {
      const next = [...prev];
      next[idx] = i;
      return next;
    });
  };

  const goNext = () => {
    if (idx < qs.length - 1) {
      setIdx((v) => v + 1);
    } else {
      recordPattern(pattern.id, correctCount, qs.length);
      setDone(true);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-24 text-neutral-900">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-300/40 via-blue-300/30 to-sky-300/40 blur-[90px]" />

      <div className="container-narrow relative z-10 mx-auto max-w-2xl px-4 pt-6 sm:pt-10">
        <button
          onClick={() => router.push("/patterns")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-800"
        >
          <span aria-hidden>←</span> 패턴 목록
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 px-2.5 text-sm font-extrabold text-white shadow-sm">
            {String(pattern.no).padStart(2, "0")}
          </span>
          <div>
            <h1 className="text-lg font-extrabold leading-tight sm:text-xl">{pattern.title}</h1>
            <span className="text-xs font-semibold text-indigo-500">
              CHAPTER {pattern.chapter} · {pattern.category}
            </span>
          </div>
        </div>

        {/* 핵심 공식 (P5) */}
        {pattern.formula && (
          <section className="mt-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-indigo-500">
              핵심 공식
            </p>
            <div className="space-y-1.5 text-[15px] leading-relaxed text-neutral-800">
              <Markdown text={pattern.formula} />
            </div>
          </section>
        )}

        {/* 3초컷 팁 (P5) */}
        {pattern.tip && (
          <section className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-amber-600">
              💡 3초컷 저격 팁
            </p>
            <p className="text-[15px] leading-relaxed text-amber-900">
              <Inline text={pattern.tip} />
            </p>
          </section>
        )}

        {/* 상황 예측 맵 (P6·P7) */}
        {pattern.contextMap && (
          <section className="mt-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-indigo-500">
              {pattern.part === 7 ? "🧭 지문 프레임워크" : "🧭 상황 예측 맵"}
            </p>
            <div className="space-y-1.5 text-[14.5px] leading-relaxed text-neutral-800">
              <Markdown text={pattern.contextMap} />
            </div>
          </section>
        )}

        {/* 지문 (P6·P7) */}
        {pattern.passage && (
          <section className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-neutral-400">
              지문
            </p>
            <Passage text={pattern.passage} />
          </section>
        )}

        {/* 예제 */}
        {!done ? (
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-neutral-500">
                실전 예제 <span className="text-indigo-600">{idx + 1}</span> / {qs.length}
              </p>
              <div className="flex gap-1.5">
                {qs.map((_, i) => {
                  const s = selected[i];
                  const state =
                    s === undefined ? "idle" : s === qs[i].answerIndex ? "ok" : "no";
                  return (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === idx
                          ? "ring-2 ring-indigo-400 ring-offset-1"
                          : ""
                      } ${
                        state === "idle"
                          ? "bg-neutral-300"
                          : state === "ok"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <p className="text-[16px] font-medium leading-relaxed text-neutral-900">
                    {q.prompt}
                  </p>

                  <div className="mt-4 space-y-2">
                    {q.choices.map((c, i) => {
                      const isAns = i === q.answerIndex;
                      const isPicked = selected[idx] === i;
                      let cls =
                        "border-neutral-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50";
                      if (answered) {
                        if (isAns)
                          cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
                        else if (isPicked)
                          cls = "border-rose-400 bg-rose-50 text-rose-900";
                        else cls = "border-neutral-200 bg-white opacity-60";
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => choose(i)}
                          disabled={answered}
                          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${cls}`}
                        >
                          <span
                            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-extrabold ${
                              answered && isAns
                                ? "bg-emerald-500 text-white"
                                : answered && isPicked
                                  ? "bg-rose-500 text-white"
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

                  {/* 해설 */}
                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                          <p className="text-sm font-bold text-neutral-800">
                            정답: {LETTERS[q.answerIndex]} · {q.choices[q.answerIndex]}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                            {q.explanation}
                          </p>
                          {q.translation && (
                            <p className="mt-2 border-t border-neutral-200 pt-2 text-sm leading-relaxed text-neutral-500">
                              {q.translation}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={goNext}
                          className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-3 text-[15px] font-bold text-white shadow-sm transition hover:opacity-95"
                        >
                          {idx < qs.length - 1 ? "다음 문제 →" : "학습 완료 →"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        ) : (
          <PatternSummary
            correct={correctCount}
            total={qs.length}
            onRetry={() => {
              setSelected(qs.map(() => undefined));
              setIdx(0);
              setDone(false);
            }}
            onNext={nextId ? () => router.push(`/patterns/${nextId}`) : null}
            onList={() => router.push("/patterns")}
          />
        )}

        {/* 하단 패턴 네비 */}
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
      </div>
    </main>
  );
}

function PatternSummary({
  correct,
  total,
  onRetry,
  onNext,
  onList,
}: {
  correct: number;
  total: number;
  onRetry: () => void;
  onNext: (() => void) | null;
  onList: () => void;
}) {
  const perfect = correct === total;
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border border-indigo-100 bg-white p-6 text-center shadow-sm"
    >
      <div className="text-4xl">{perfect ? "👑" : "✅"}</div>
      <h2 className="mt-2 text-xl font-extrabold">
        {perfect ? "패턴 완전정복!" : "학습 완료"}
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        예제 정답 <b className="text-indigo-600">{correct}</b> / {total}
        {perfect ? " · 이 패턴을 완벽히 익혔어요" : " · 틀린 문항은 다시 풀어보세요"}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={onRetry}
          className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
        >
          다시 풀기
        </button>
        {onNext && (
          <button
            onClick={onNext}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
          >
            다음 패턴 →
          </button>
        )}
        <button
          onClick={onList}
          className="rounded-xl px-4 py-2.5 text-sm font-bold text-neutral-500 transition hover:text-neutral-800"
        >
          목록으로
        </button>
      </div>
    </motion.section>
  );
}

// ── markdown-lite 렌더러 (**bold** · `code` · 줄바꿈 · · 불릿) ──────────
function Inline({ text }: { text: string }) {
  // **bold** 와 `code` 를 파싱
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
function Passage({ text }: { text: string }) {
  const parts = text.split(/(\(\d\)|_{3,})/g).filter((s) => s !== "");
  return (
    <div className="max-h-[46vh] overflow-y-auto whitespace-pre-wrap rounded-lg bg-white/70 p-3 font-serif text-[14px] leading-7 text-neutral-800 ring-1 ring-neutral-200">
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
          <p
            key={i}
            className={isBullet ? "flex gap-2 pl-1 text-[14.5px]" : ""}
          >
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
