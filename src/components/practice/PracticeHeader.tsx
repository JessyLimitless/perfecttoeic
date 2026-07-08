"use client";

import { usePracticeStore } from "@/game/store";
import { typeLabel } from "@/game/questionTypes";
import { PART_META } from "@/game/parts";

export default function PracticeHeader({ onEnd }: { onEnd: () => void }) {
  const solved = usePracticeStore((s) => s.solved);
  const correct = usePracticeStore((s) => s.correct);
  const streak = usePracticeStore((s) => s.streak);
  const typeFilter = usePracticeStore((s) => s.typeFilter);
  const part = usePracticeStore((s) => s.part);
  const conquest = usePracticeStore((s) => s.conquest);
  const subtitle =
    part === 7
      ? `Part 7 · ${typeLabel(typeFilter)}`
      : `${PART_META[part].label} · ${PART_META[part].name}`;

  const accuracy = solved ? Math.round((correct / solved) * 100) : 0;

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/60 bg-[#fafafb]/80 backdrop-blur-xl">
      <div className="container-exam flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-[15px] font-extrabold tracking-tight text-neutral-900">
            토익 RC<span className="text-gradient">.</span>
          </span>
          {conquest && (
            <span className="shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-2.5 py-0.5 text-[11px] font-black text-white shadow-sm">
              🎯 정복 복습
            </span>
          )}
          <span className="hidden truncate rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-500 sm:inline">
            {subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* 통계를 하나의 알약으로 묶어 밀집도를 낮춤 */}
          <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 ring-1 ring-neutral-900/[0.06] shadow-[0_1px_2px_rgba(16,24,40,0.04)] backdrop-blur-sm sm:gap-4 sm:px-3.5">
            <Stat label="문제" value={`${solved}`} />
            <span className="h-3.5 w-px bg-neutral-200" />
            <Stat label="정답률" value={`${accuracy}%`} accent />
            <span className="h-3.5 w-px bg-neutral-200" />
            <Stat label="연속" value={streak > 0 ? `${streak}🔥` : "0"} />
          </div>
          <button
            type="button"
            onClick={onEnd}
            className="shrink-0 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition hover:bg-neutral-900/[0.04] hover:text-neutral-700"
          >
            그만하기
          </button>
        </div>
      </div>
    </header>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[10.5px] text-neutral-400">{label}</span>
      <span
        className={`text-[14px] font-bold tabnum ${
          accent ? "text-indigo-600" : "text-neutral-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
