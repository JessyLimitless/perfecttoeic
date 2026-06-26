"use client";

import { motion } from "framer-motion";
import { PART_META, PART_ORDER } from "@/game/parts";
import type { Part } from "@/game/types";

/** 파트 선택기 — 학습의 1차 축 (Part 5 / 6 / 7) */
export default function PartSelector({
  value,
  onChange,
  counts,
}: {
  value: Part;
  onChange: (p: Part) => void;
  /** 파트별 보유 문항 수 */
  counts: Record<Part, number>;
}) {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-3 gap-1 rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.05]">
        {PART_ORDER.map((p) => {
          const selected = p === value;
          const meta = PART_META[p];
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className="relative z-10 min-h-[56px] rounded-xl px-2 py-3 text-center transition"
            >
              {selected && (
                <motion.span
                  layoutId="part-pill"
                  transition={{ type: "spring", stiffness: 650, damping: 38 }}
                  className="absolute inset-0 -z-10 rounded-xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_20px_-12px_rgba(79,70,229,0.45)] ring-1 ring-neutral-900/[0.05]"
                />
              )}
              <span
                className={`block text-[14px] font-bold transition-colors sm:text-[15px] ${
                  selected ? "text-indigo-600" : "text-neutral-500"
                }`}
              >
                {meta.label}
              </span>
              <span
                className={`mt-0.5 block text-[11px] transition-colors ${
                  selected ? "text-neutral-400" : "text-neutral-400/70"
                }`}
              >
                {meta.name} · {counts[p] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
