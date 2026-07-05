"use client";

import { motion } from "framer-motion";
import type { LeaderRow } from "@/game/rank/store";

const MEDAL = ["🥇", "🥈", "🥉"] as const;

/**
 * 가상 랭커 순위표 (백엔드 없이 시뮬 — 표시 전용).
 * isUser 행은 인디고 그라데이션으로 강조 + "YOU" 칩.
 */
export default function Leaderboard({ rows }: { rows: LeaderRow[] }) {
  return (
    <section className="card px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center justify-between">
        <h3 className="label">리더보드</h3>
        <span className="text-[11px] font-semibold text-neutral-400">
          시즌 랭킹
        </span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <ul className="min-w-[18rem] flex-col gap-1.5">
          {rows.map((r, i) => {
            const medal = r.rank <= 3 ? MEDAL[r.rank - 1] : null;
            return (
              <motion.li
                key={`${r.name}-${r.rank}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 28, delay: i * 0.03 }}
                className={`mb-1.5 flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 ${
                  r.isUser
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white ring-indigo-400 shadow-[0_12px_28px_-16px_rgba(79,70,229,0.7)]"
                    : "bg-white text-neutral-900 ring-neutral-900/[0.05]"
                }`}
              >
                {/* 순위 */}
                <span
                  className={`grid w-8 shrink-0 place-items-center text-[15px] font-black tabnum ${
                    r.isUser ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {medal ?? r.rank}
                </span>

                {/* 이름 */}
                <span className="min-w-0 flex-1 truncate text-[14px] font-bold">
                  {r.isUser ? "나" : r.name}
                  {r.isUser && (
                    <span className="ml-2 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-black align-middle">
                      YOU
                    </span>
                  )}
                </span>

                {/* RP */}
                <span
                  className={`shrink-0 text-[14px] font-black tabnum ${
                    r.isUser ? "text-white" : "text-neutral-700"
                  }`}
                >
                  {r.rp.toLocaleString()}
                  <span
                    className={`ml-1 text-[10px] font-bold ${
                      r.isUser ? "text-white/70" : "text-neutral-400"
                    }`}
                  >
                    RP
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <p className="mt-2 text-[11px] font-medium text-neutral-400">
        가상 랭커와의 시뮬레이션 순위
      </p>
    </section>
  );
}
