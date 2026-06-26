"use client";

import { motion } from "framer-motion";
import { MATCH_LENGTH } from "@/game/match/types";
import type { MatchPlayer } from "@/game/match/types";

function Tiles({ results }: { results: boolean[] }) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {Array.from({ length: MATCH_LENGTH }).map((_, i) => {
        const played = i < results.length;
        const correct = played && results[i];
        const wrong = played && !results[i];
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.02 * i }}
            className={
              "flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-extrabold sm:h-7 sm:w-7 " +
              (correct
                ? "bg-emerald-500 text-white shadow-sm"
                : wrong
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-300")
            }
            title={`${i + 1}번 문항`}
          >
            {correct ? "✓" : wrong ? "✗" : i + 1}
          </motion.span>
        );
      })}
    </div>
  );
}

/** 게임진행현황 — 참가자별 문항 결과 그리드 (정답=초록 / 오답=빨강 / 미진행=회색) */
export default function ProgressGrid({
  user,
  ai,
}: {
  user: MatchPlayer;
  ai: MatchPlayer;
}) {
  return (
    <div className="rounded-2xl bg-white/95 p-3 ring-1 ring-teal-900/10 shadow-sm sm:p-4">
      <h3 className="mb-3 text-center text-[13px] font-extrabold tracking-wide text-teal-800">
        게임진행현황
      </h3>
      <div className="flex flex-col gap-3">
        {[user, ai].map((p) => {
          const got = p.results.filter(Boolean).length;
          return (
            <div key={p.kind} className="flex flex-col gap-1.5">
              <span className="flex items-baseline justify-between text-[11px] font-bold text-neutral-500">
                <span className="truncate">{p.name}</span>
                <span className="shrink-0 tabnum text-teal-600">
                  {got}/{MATCH_LENGTH}
                </span>
              </span>
              <Tiles results={p.results} />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3 border-t border-neutral-100 pt-2.5 text-[10px] font-semibold text-neutral-400">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded bg-emerald-500" /> 정답
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded bg-rose-500" /> 오답
        </span>
      </div>
    </div>
  );
}
