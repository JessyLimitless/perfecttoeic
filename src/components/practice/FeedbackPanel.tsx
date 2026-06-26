"use client";

import { motion } from "framer-motion";
import { usePracticeStore } from "@/game/store";
import type { PassageQuestion, Part } from "@/game/types";

const LETTERS = ["A", "B", "C", "D"] as const;

export default function FeedbackPanel({
  question,
  isLastInSet,
  part,
}: {
  question: PassageQuestion;
  isLastInSet: boolean;
  part: Part;
}) {
  const selected = usePracticeStore((s) => s.selected);
  const streak = usePracticeStore((s) => s.streak);
  const next = usePracticeStore((s) => s.next);

  if (selected === null) return null;
  const isCorrect = selected === question.answerIndex;
  const correctIdx = question.answerIndex;

  const headline = isCorrect
    ? streak >= 3
      ? `정답이에요 · ${streak}연속 🔥`
      : "정답이에요"
    : "아쉬워요";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="card relative overflow-hidden"
    >
      {/* 상단 강조 바 — 정답 초록 / 오답 로즈 */}
      <span
        className={`absolute inset-x-0 top-0 h-1 ${
          isCorrect
            ? "bg-gradient-to-r from-emerald-400 to-teal-400"
            : "bg-gradient-to-r from-rose-400 to-orange-400"
        }`}
      />
      <div
        className={`px-6 py-5 sm:px-8 sm:py-6 ${
          isCorrect
            ? "bg-gradient-to-b from-emerald-50/70 to-transparent"
            : "bg-gradient-to-b from-rose-50/60 to-transparent"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 17, delay: 0.02 }}
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-sm ${
              isCorrect ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {isCorrect ? "✓" : "✗"}
          </motion.span>
          <span
            className={`text-[15.5px] font-extrabold ${
              isCorrect ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {headline}
          </span>
        </div>

        <div className="mt-3.5 rounded-xl bg-emerald-50/70 px-3.5 py-3 ring-1 ring-emerald-500/10">
          <p className="text-[14.5px] leading-relaxed text-neutral-800">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-[11px] font-bold text-white">
              {LETTERS[correctIdx]}
            </span>{" "}
            <span className="font-semibold">{question.choices[correctIdx]}</span>
            <span className="text-neutral-400">
              {" "}
              · {question.choicesKo[correctIdx]}
            </span>
          </p>
        </div>

        <p className="mt-4 text-[14.5px] leading-relaxed text-neutral-600">
          {question.explanation}
        </p>

        <button
          type="button"
          onClick={next}
          className="btn-primary mt-6 w-full"
        >
          {part === 5
            ? "다음 문항 →"
            : isLastInSet
              ? "다음 지문 →"
              : part === 6
                ? "다음 빈칸 →"
                : "다음 문항 →"}
        </button>
      </div>
    </motion.div>
  );
}
