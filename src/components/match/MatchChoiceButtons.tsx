"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMatchStore } from "@/game/match/matchStore";
import type { ChoiceIndex, PassageQuestion } from "@/game/types";

const LETTERS = ["A", "B", "C", "D"] as const;

/** 정/오 플래시 노출 시간(ms) — 끝나면 자동으로 다음 문항.
 *  정답은 짧게, 오답/시간초과는 정답 위치를 잠깐 더 보여주도록 길게. */
const FLASH_MS_CORRECT = 1100;
const FLASH_MS_WRONG = 1700;

/** 대결 전용 보기 버튼 (A·B·C·D) — 연습 스토어가 아닌 useMatchStore에 바인딩 */
export default function MatchChoiceButtons({
  question,
}: {
  question: PassageQuestion;
}) {
  const answered = useMatchStore((s) => s.answered);
  const selected = useMatchStore((s) => s.selected);
  const answer = useMatchStore((s) => s.answer);
  const next = useMatchStore((s) => s.next);

  // 답한 정/오 (시간초과 미응답이면 selected=null → 오답 처리)
  const isCorrectAnswer = answered && selected === question.answerIndex;
  const timedOut = answered && selected === null;

  // 답하면(또는 시간초과 자동 오답) 짧게 정/오만 보여준 뒤 자동으로 다음 문항.
  // 해설(explanation)은 인게임에서 절대 표시하지 않는다 — 결과 화면 REVIEW 전용.
  useEffect(() => {
    if (!answered) return;
    const delay = isCorrectAnswer ? FLASH_MS_CORRECT : FLASH_MS_WRONG;
    const t = setTimeout(() => next(), delay);
    return () => clearTimeout(t);
  }, [answered, isCorrectAnswer, next]);

  return (
    <div className="flex flex-col gap-3">
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
            "ring-1 ring-neutral-200 bg-white hover:ring-indigo-300 hover:bg-indigo-50/30";
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
          } else if (isPicked) {
            row = "ring-2 ring-indigo-500 bg-indigo-50/50";
            chip = "bg-indigo-600 text-white";
          }

          const glyph =
            answered && isCorrect ? "✓" : answered && isPicked ? "✗" : LETTERS[i];

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
              className={`min-h-[3.5rem] rounded-2xl px-4 py-4 text-left transition disabled:cursor-default sm:px-5 ${row}`}
            >
              {/* 대결 모드 — 영어 보기만 표시(한글 글로스 숨김). 한글/해설은 종료 후 REVIEW에서. */}
              <span className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold ${chip}`}
                >
                  {glyph}
                </span>
                <span className="text-[15px] leading-snug text-neutral-800 sm:text-[15.5px]">
                  {choice}
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* 정/오 순간 플래시만 표시 — 해설 없음. 약 0.6초 후 자동 진행 */}
      {answered && (
        <motion.p
          key="flash"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className={`text-center text-[14px] font-bold ${
            isCorrectAnswer ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {isCorrectAnswer ? "정답!" : timedOut ? "시간 초과" : "오답"}
        </motion.p>
      )}
    </div>
  );
}
