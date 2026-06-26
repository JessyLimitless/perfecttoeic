"use client";

import { motion } from "framer-motion";
import type { PassageSet } from "@/game/types";

/** 지문 — 영어 원문 / 한글 번역 평행 2단 (한 세트 동안 유지).
 *  대결 모드에선 hideKo로 한글 번역을 숨기고 영어만 표시한다. */
export default function PassagePanel({
  set,
  hideKo = false,
  flat = false,
}: {
  set: PassageSet;
  /** true면 한글 번역을 숨기고 영어 지문만 표시 (대결 모드용) */
  hideKo?: boolean;
  /** true면 자체 카드 크롬을 제거하고 시험 용지(sheet) 안에 평면으로 배치 */
  flat?: boolean;
}) {
  const body = (
    <>
      <div
        className={`flex items-center justify-between border-b border-neutral-100 bg-gradient-to-r from-indigo-50/60 to-transparent px-6 py-3 sm:px-8 ${
          flat ? "lg:px-9" : ""
        }`}
      >
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          {set.passageType}
        </span>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-neutral-300">
          Passage
        </span>
      </div>

      <div
        className={`overflow-y-auto overscroll-contain px-6 py-5 sm:px-8 sm:py-6 ${
          flat
            ? "max-h-[40vh] lg:max-h-[calc(100dvh-13.5rem)] lg:px-9"
            : "max-h-[42vh] lg:max-h-[calc(100dvh-12rem)]"
        }`}
      >
        <motion.div
          className="space-y-4"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
          }}
          initial="hidden"
          animate="show"
        >
          {set.passageLines.map((line, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
              }}
            >
              <p className="text-[16.5px] leading-8 text-neutral-900 md:text-[17px]">
                {line.en}
              </p>
              {!hideKo && line.ko && (
                <p className="mt-1 text-[14px] leading-7 text-neutral-400">
                  {line.ko}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );

  if (flat) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
      >
        {body}
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="card overflow-hidden"
    >
      {body}
    </motion.article>
  );
}
