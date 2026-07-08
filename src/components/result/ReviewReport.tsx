"use client";

import { motion } from "framer-motion";
import type { PracticeRecord } from "@/game/store";
import { normalizeCategory, QUESTION_TYPE_META } from "@/game/questionTypes";
import PassageTranslation from "./PassageTranslation";

const LETTERS = ["A", "B", "C", "D"] as const;

export default function ReviewReport({
  history,
}: {
  history: PracticeRecord[];
}) {
  const wrong = history.filter((r) => !r.isCorrect);

  if (history.length === 0) return null;

  if (wrong.length === 0) {
    return (
      <div className="card relative overflow-hidden px-6 py-10 text-center">
        <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/60 to-transparent" />
        <div className="relative">
          <div className="text-3xl">🎉</div>
          <p className="mt-2 font-bold text-neutral-900">틀린 문제가 없어요</p>
          <p className="mt-1 text-[14px] text-neutral-500">완벽하게 풀었습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <p className="label">복습할 문제</p>
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold tabnum text-white">
          {wrong.length}
        </span>
      </div>

      {wrong.map((r, i) => {
        const correctIdx = r.question.answerIndex;
        return (
          <motion.div
            key={r.question.id + i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.025, 0.25), duration: 0.18 }}
            className="card p-6"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-indigo-500 px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
                {r.part === 7
                  ? QUESTION_TYPE_META[normalizeCategory(r.question.category)]
                      .label
                  : (r.question.category ?? "문항")}
              </span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-indigo-500">
                {r.part === 7 ? r.passageType : `Part ${r.part}`}
              </span>
            </div>

            <p className="mt-2.5 text-[15px] font-semibold leading-relaxed text-neutral-900">
              {r.question.prompt}
            </p>
            <p className="mt-0.5 text-[13px] text-neutral-400">
              {r.question.promptKo}
            </p>

            <div className="mt-4 space-y-2 text-[14px]">
              <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50/70 px-3 py-2.5 text-emerald-700 ring-1 ring-emerald-500/10">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-[11px] font-bold text-white">
                  {LETTERS[correctIdx]}
                </span>
                <span>
                  {r.question.choices[correctIdx]}
                  <span className="text-emerald-600/60">
                    {" "}
                    · {r.question.choicesKo[correctIdx]}
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-rose-50/60 px-3 py-2.5 text-rose-500 ring-1 ring-rose-500/10">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-400 text-[11px] font-bold text-white">
                  {LETTERS[r.selected]}
                </span>
                <span className="line-through decoration-rose-300">
                  {r.question.choices[r.selected]}
                </span>
                <span className="ml-auto shrink-0 text-[11px] font-medium text-rose-400">
                  내 답
                </span>
              </div>
            </div>

            {/* Part 6·7 지문 전체 + 번역 (접이식) */}
            <PassageTranslation lines={r.passageLines ?? []} />

            {r.question.explanation && (
              <p className="mt-4 border-t border-neutral-100 pt-4 text-[14px] leading-relaxed text-neutral-500">
                <span className="mr-1.5 font-bold text-neutral-700">해설</span>
                {r.question.explanation}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
