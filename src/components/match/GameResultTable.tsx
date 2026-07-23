"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import type { MatchPlayer } from "@/game/match/types";

/** 참가자 아바타 — 유저는 별명 이니셜, 봇은 로봇 아이콘 */
function Avatar({ player }: { player: MatchPlayer }) {
  const isAi = player.kind === "ai";
  return (
    <div
      className={
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold shadow-sm ring-1 " +
        (isAi
          ? "bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-600 ring-neutral-900/10"
          : "bg-gradient-to-br from-teal-400 to-cyan-500 text-white ring-teal-900/10")
      }
      aria-hidden
    >
      {isAi ? "🤖" : (player.name.trim()[0] ?? "P").toUpperCase()}
    </div>
  );
}

/** 원형 게이지(SVG 링) — score 를 max 대비 비율로 채운다 */
function ScoreRing({
  value,
  max,
  muted = false,
}: {
  value: number | null;
  max: number;
  muted?: boolean;
}) {
  const R = 18;
  const C = 2 * Math.PI * R;
  const isPlaceholder = muted || value == null;
  const ratio = isPlaceholder || max <= 0 ? 0 : Math.max(0, Math.min(1, value! / max));

  return (
    <div className="relative h-12 w-12">
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={R}
          fill="none"
          strokeWidth="4"
          className={isPlaceholder ? "stroke-neutral-200" : "stroke-teal-100"}
        />
        {!isPlaceholder && (
          <motion.circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-teal-500"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - ratio) }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isPlaceholder ? (
          <span className="text-sm font-bold text-neutral-300">—</span>
        ) : (
          <AnimatedNumber
            value={value!}
            className="tabnum text-sm font-extrabold text-teal-700"
          />
        )}
      </div>
    </div>
  );
}

/** GAME RESULT 표: 게임참가자 | L/C | R/C | RANKING | CREDIT | REMATCH */
export default function GameResultTable({
  user,
  ai,
  userCredit,
  aiCredit,
}: {
  user: MatchPlayer;
  ai: MatchPlayer;
  userCredit: number;
  aiCredit: number;
}) {
  const maxScore = Math.max(user.score, ai.score, 1);

  const rows: {
    player: MatchPlayer;
    credit: number;
    showRematch: boolean;
  }[] = [
    { player: user, credit: userCredit, showRematch: true },
    { player: ai, credit: aiCredit, showRematch: false },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white/95 ring-1 ring-teal-900/10 shadow-sm">
      <h2 className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-50 via-teal-50/50 to-transparent py-2.5 text-center text-sm font-extrabold tracking-[0.18em] text-teal-800">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
        GAME RESULT
      </h2>

      {/* 헤더 */}
      <div className="grid grid-cols-[1.6fr_repeat(5,_minmax(0,1fr))] items-center gap-1 border-y border-teal-900/10 bg-teal-50/60 px-2 py-2 text-center text-[10px] font-bold tracking-wide text-teal-700 sm:text-[11px]">
        <span className="text-left pl-1">게임참가자</span>
        <span>L/C</span>
        <span>R/C</span>
        <span>RANKING</span>
        <span>CREDIT</span>
        <span>REMATCH</span>
      </div>

      {rows.map(({ player, credit, showRematch }, i) => {
        const isWinner = player.rank === 1;
        return (
          <motion.div
            key={player.kind}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 * i }}
            className={
              "relative grid grid-cols-[1.6fr_repeat(5,_1fr)] items-center gap-1 px-2 py-3 text-center " +
              (i === 0 ? "border-b border-neutral-100 " : "") +
              (isWinner
                ? "bg-gradient-to-r from-amber-50 to-amber-50/30"
                : "")
            }
          >
            {isWinner && (
              <span className="absolute inset-y-0 left-0 w-1 rounded-r bg-gradient-to-b from-amber-400 to-amber-500" />
            )}
            {/* 게임참가자 */}
            <div className="flex items-center gap-2 pl-1 text-left">
              <Avatar player={player} />
              <span className="truncate text-[13px] font-bold text-neutral-800">
                {player.name}
              </span>
            </div>

            {/* L/C — MVP placeholder (회색) */}
            <div className="flex justify-center">
              <ScoreRing value={player.lcScore} max={maxScore} muted />
            </div>

            {/* R/C — 핵심 점수 게이지 */}
            <div className="flex justify-center">
              <ScoreRing value={player.score} max={maxScore} />
            </div>

            {/* RANKING */}
            <div className="flex justify-center">
              <span
                className={
                  "inline-flex h-7 min-w-[2.4rem] items-center justify-center gap-0.5 rounded-full px-2 text-[12px] font-extrabold " +
                  (isWinner
                    ? "bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-[0_4px_10px_-4px_rgba(245,158,11,0.8)]"
                    : "bg-neutral-100 text-neutral-500")
                }
              >
                {isWinner && <span aria-hidden>👑</span>}
                {player.rank ?? "—"}위
              </span>
            </div>

            {/* CREDIT */}
            <div className="flex justify-center">
              <span className="tabnum text-[15px] font-extrabold text-teal-700">
                {credit}
              </span>
            </div>

            {/* REMATCH 아이콘 (유저 행만) */}
            <div className="flex justify-center text-neutral-400">
              {showRematch ? (
                <span title="리매치 가능" aria-hidden className="text-lg">
                  🔁
                </span>
              ) : (
                <span className="text-neutral-200">—</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
