"use client";

import { motion } from "framer-motion";
import type { PassageQuestion, Part } from "@/game/types";
import { normalizeCategory, QUESTION_TYPE_META } from "@/game/questionTypes";

/** 문항/빈칸의 유형 라벨 — Part 7은 정규화 유형, Part 5·6은 문법 분류 그대로 */
function badgeLabel(question: PassageQuestion, part: Part): string {
  if (part === 7) return QUESTION_TYPE_META[normalizeCategory(question.category)].label;
  return question.category ?? "";
}

/** 현재 문항 — 진행 표시 + 질문(영/한). 대결 모드에선 hideKo로 한글 번역을 숨긴다. */
export default function QuestionPanel({
  question,
  index,
  total,
  part,
  hideKo = false,
  hideTypeBadge = false,
  flat = false,
}: {
  question: PassageQuestion;
  index: number;
  total: number;
  part: Part;
  /** true면 한글 번역(promptKo)을 숨기고 영어만 표시 (대결 모드용) */
  hideKo?: boolean;
  /** true면 우측 유형 뱃지(예: 준동사)를 숨긴다 (대결 모드 실전성) */
  hideTypeBadge?: boolean;
  /** true면 자체 카드 크롬을 제거하고 시험 용지(sheet) 안에 평면으로 배치 */
  flat?: boolean;
}) {
  const unit = part === 5 || part === 6 ? "빈칸" : "문항";
  const label = hideTypeBadge ? "" : badgeLabel(question, part);

  const inner = (
    <>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-[12px] font-bold tabnum text-indigo-600">
          {unit} {index + 1}
          <span className="font-semibold text-neutral-300"> / {total}</span>
        </span>
        <div className="flex flex-1 gap-1 overflow-hidden">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === index
                  ? "bg-indigo-600"
                  : i < index
                    ? "bg-indigo-200"
                    : "bg-neutral-200/80"
              }`}
            />
          ))}
        </div>
        {label && (
          <span className="ml-auto inline-flex shrink-0 items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-indigo-500 ring-1 ring-indigo-500/10">
            {label}
          </span>
        )}
      </div>

      <p className="text-[17px] font-semibold leading-8 text-neutral-900 md:text-[18px] md:leading-8">
        {question.prompt}
      </p>
      {!hideKo && (
        <p className="mt-2 text-[14.5px] leading-7 text-neutral-500">
          {question.promptKo}
        </p>
      )}
    </>
  );

  if (flat) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="card px-6 py-5 sm:px-8 sm:py-6"
    >
      {inner}
    </motion.div>
  );
}
