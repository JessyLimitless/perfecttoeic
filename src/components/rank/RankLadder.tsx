"use client";

import { motion } from "framer-motion";
import { RANK_TIERS, type RankPos } from "@/game/rank/types";

/**
 * 6티어 래더 — 브론즈부터 마스터까지.
 * minRp ≤ 현재 RP 인 티어는 "달성"(그라데이션 채움), 현재 티어는 링+"현재" 칩,
 * 아직 못 간 상위 티어는 회색으로 흐리게 표시.
 */
export default function RankLadder({ current }: { current: RankPos }) {
  return (
    <section className="card px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center justify-between">
        <h3 className="label">티어 래더</h3>
        <span className="text-[11px] font-semibold text-neutral-400">
          {RANK_TIERS.length}단계
        </span>
      </div>

      {/* 상위 → 하위 순으로 위에서 아래로 (사다리 느낌) */}
      <ol className="mt-3 flex flex-col gap-2">
        {[...RANK_TIERS].reverse().map((tier, i) => {
          const achieved = current.rp >= tier.minRp;
          const isCurrent = tier.id === current.tier.id;
          return (
            <motion.li
              key={tier.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.04 }}
              className={`relative flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 transition ${
                isCurrent
                  ? "bg-white ring-2 ring-indigo-400 shadow-[0_10px_28px_-16px_rgba(79,70,229,0.5)]"
                  : achieved
                    ? "bg-white ring-neutral-900/[0.06]"
                    : "bg-neutral-50 ring-neutral-900/[0.04]"
              }`}
            >
              {/* 엠블럼 타일 */}
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[20px] shadow-sm ${
                  achieved
                    ? `bg-gradient-to-br ${tier.gradient}`
                    : "bg-neutral-200"
                } ${achieved ? "" : "grayscale opacity-60"}`}
              >
                {tier.emoji}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[14px] font-extrabold tracking-[-0.01em] ${
                      achieved ? "text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {tier.label}
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-black text-white">
                      현재
                    </span>
                  )}
                </div>
                <span
                  className={`tabnum text-[11px] font-semibold ${
                    achieved ? "text-neutral-400" : "text-neutral-300"
                  }`}
                >
                  {tier.minRp} RP+
                </span>
              </div>

              {achieved && !isCurrent && (
                <span className="shrink-0 text-[13px] font-black text-emerald-500">
                  ✓
                </span>
              )}
              {!achieved && (
                <span className="shrink-0 text-[15px] text-neutral-300">🔒</span>
              )}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
