"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SentencePair } from "@/game/types";

/**
 * 오답 복습용 지문 전체 번역 패널 — Part 6·7 지문 맥락을 EN+한글로 복습 (접이식).
 * 연습 오답노트(ReviewReport)·대결 결과 REVIEW 공용.
 */
export default function PassageTranslation({
  lines,
  tone = "indigo",
  defaultOpen = true,
}: {
  lines?: SentencePair[];
  /** 표면 색조 — 연습(indigo) / 대결(teal) */
  tone?: "indigo" | "teal";
  /** 기본 펼침 여부 — 오답노트에선 전체 지문 독해를 바로 보이게(true) */
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  if (!lines || lines.length === 0) return null;

  const t =
    tone === "teal"
      ? {
          box: "border-teal-100 bg-teal-50/40",
          hover: "hover:bg-teal-50",
          title: "text-teal-700",
          chev: "text-teal-400",
          border: "border-teal-100",
          ko: "text-teal-600/90",
        }
      : {
          box: "border-indigo-100 bg-indigo-50/40",
          hover: "hover:bg-indigo-50",
          title: "text-indigo-700",
          chev: "text-indigo-400",
          border: "border-indigo-100",
          ko: "text-indigo-500/90",
        };

  return (
    <div className={`mt-4 overflow-hidden rounded-xl border ${t.box}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left transition ${t.hover}`}
      >
        <span className={`flex items-center gap-1.5 text-[13px] font-bold ${t.title}`}>
          <span aria-hidden>📖</span> 전체 지문 독해 · 번역
        </span>
        <span
          className={`text-[12px] font-semibold transition-transform ${t.chev} ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`space-y-2.5 border-t ${t.border} px-3.5 py-3`}>
              {lines.map((ln, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="text-[13.5px] leading-relaxed text-neutral-800">
                    {ln.en}
                  </p>
                  {ln.ko && (
                    <p className={`text-[12.5px] leading-relaxed ${t.ko}`}>{ln.ko}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
