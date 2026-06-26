"use client";

import { motion } from "framer-motion";
import { usePracticeStore } from "@/game/store";
import type { ChoiceIndex, PassageQuestion } from "@/game/types";

const LETTERS = ["A", "B", "C", "D"] as const;

export default function ChoiceButtons({
  question,
}: {
  question: PassageQuestion;
}) {
  const answered = usePracticeStore((s) => s.answered);
  const selected = usePracticeStore((s) => s.selected);
  const answer = usePracticeStore((s) => s.answer);

  return (
    <motion.div
      className="flex flex-col gap-2.5"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.03, delayChildren: 0.03 } },
      }}
      initial="hidden"
      animate="show"
    >
      {question.choices.map((choice, i) => {
        const idx = i as ChoiceIndex;
        const isCorrect = idx === question.answerIndex;
        const isPicked = idx === selected;

        let row =
          "ring-1 ring-neutral-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)] hover:ring-indigo-300 hover:bg-indigo-50/40 hover:shadow-[0_8px_20px_-12px_rgba(99,102,241,0.5)]";
        let chip = "bg-neutral-100 text-neutral-500";

        if (answered) {
          if (isCorrect) {
            row = "ring-1 ring-emerald-400 bg-emerald-50 shadow-[0_8px_24px_-14px_rgba(16,185,129,0.6)]";
            chip = "bg-emerald-500 text-white";
          } else if (isPicked) {
            row = "ring-1 ring-rose-300 bg-rose-50";
            chip = "bg-rose-500 text-white";
          } else {
            row = "ring-1 ring-neutral-100 bg-white opacity-50";
          }
        } else if (isPicked) {
          row = "ring-2 ring-indigo-500 bg-indigo-50/60";
          chip = "bg-indigo-600 text-white";
        }

        const glyph =
          answered && isCorrect ? "✓" : answered && isPicked ? "✗" : LETTERS[i];

        // 정답 공개 시: 정답 보기는 살짝 펄스, 내가 고른 오답은 좌우로 흔들림
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
            disabled={answered}
            onClick={() => answer(idx)}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
            }}
            animate={revealAnim}
            transition={{ duration: 0.28 }}
            whileHover={answered ? undefined : { scale: 1.01 }}
            whileTap={answered ? undefined : { scale: 0.985 }}
            className={`grid min-h-[3.25rem] grid-cols-1 gap-y-1.5 rounded-2xl px-4 py-3.5 text-left transition disabled:cursor-default sm:px-5 sm:py-4 md:grid-cols-2 md:gap-x-6 md:gap-y-0 ${row}`}
          >
            <span className="flex items-start gap-3">
              <span
                className={`mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[12.5px] font-bold transition-colors ${chip}`}
              >
                {glyph}
              </span>
              <span className="self-center text-[15px] leading-snug text-neutral-800">
                {choice}
              </span>
            </span>
            <span className="self-center pl-10 text-[13.5px] leading-snug text-neutral-400 md:border-l md:border-neutral-100 md:pl-6">
              {question.choicesKo[i]}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
