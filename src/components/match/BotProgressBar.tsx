"use client";

import { motion } from "framer-motion";
import { useMatchStore } from "@/game/match/matchStore";

/** AI 챌린저의 현재 문항 풀이 진행 게이지 (0~1). 가득 차면 봇이 답을 제출한 것. */
export default function BotProgressBar() {
  const aiProgress = useMatchStore((s) => s.aiProgress);
  const name = useMatchStore((s) => s.ai.name);

  const ratio = Math.min(1, Math.max(0, aiProgress));
  const pct = Math.round(ratio * 100);
  const solved = ratio >= 1;

  return (
    <div className="flex items-center gap-3">
      {/* AI 아바타 */}
      <div className="relative shrink-0">
        <motion.div
          animate={solved ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-sm font-bold text-white shadow-[0_6px_16px_-6px_rgba(124,58,237,0.7)]"
        >
          AI
        </motion.div>
        {solved && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-white">
            ✓
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="truncate text-[11px] font-bold uppercase tracking-[0.1em] text-fuchsia-300">
            {name} <span className="text-white/40">풀이 중</span>
          </span>
          <span
            className={`tabnum text-[11px] font-semibold ${
              solved ? "text-emerald-300" : "text-white/50"
            }`}
          >
            {solved ? "제출 완료" : `${pct}%`}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className={`h-full rounded-full ${
              solved
                ? "bg-emerald-400"
                : "bg-gradient-to-r from-indigo-400 to-fuchsia-400"
            }`}
            animate={{ width: `${pct}%` }}
            transition={{ ease: "linear", duration: 0.12 }}
          />
          {/* 진행 중 시머 — 봇이 빠르게 풀고 있다는 긴박감 */}
          {!solved && (
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-scan" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
