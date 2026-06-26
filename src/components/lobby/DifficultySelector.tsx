"use client";

import { DIFFICULTY_DESC, DIFFICULTY_LABEL } from "@/game/config";
import type { Difficulty } from "@/game/types";

const ORDER: Difficulty[] = ["EASY", "MEDIUM", "HARD"];

export default function DifficultySelector({
  value,
  onChange,
}: {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {ORDER.map((d) => {
        const selected = d === value;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onChange(d)}
            className={`group flex min-h-[60px] items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition sm:px-5 ${
              selected
                ? "bg-gradient-to-br from-indigo-50/80 to-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_14px_32px_-18px_rgba(79,70,229,0.55)] ring-2 ring-indigo-500"
                : "bg-white/70 ring-1 ring-neutral-200/80 backdrop-blur-sm hover:bg-white hover:ring-neutral-300"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-[15px] font-bold ${
                    selected ? "text-indigo-600" : "text-neutral-900"
                  }`}
                >
                  {DIFFICULTY_LABEL[d]}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-neutral-400">
                  {d}
                </span>
              </div>
              <div className="mt-0.5 text-[13px] text-neutral-500">
                {DIFFICULTY_DESC[d]}
              </div>
            </div>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full transition ${
                selected ? "bg-indigo-600" : "ring-1 ring-neutral-300"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
