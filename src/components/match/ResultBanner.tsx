"use client";

import { motion } from "framer-motion";
import { CREDIT_PERFECT_MISSION } from "@/game/match/types";

/** 좌하단 결과 배너: 승/패 문구 + 획득 크레딧 + 미션 완료 배지 */
export default function ResultBanner({
  name,
  rank,
  earnedCredits,
  missions,
}: {
  name: string;
  rank?: 1 | 2;
  earnedCredits: number;
  missions: string[];
}) {
  const isWin = rank === 1;
  const hasMission = missions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className={
        "relative flex flex-col gap-2.5 overflow-hidden rounded-2xl bg-white/95 p-4 ring-1 shadow-sm " +
        (isWin
          ? "ring-emerald-400/40 shadow-[0_18px_40px_-24px_rgba(16,185,129,0.55)]"
          : "ring-rose-300/30 shadow-[0_18px_40px_-24px_rgba(244,63,94,0.35)]")
      }
    >
      <span
        className={
          "absolute inset-x-0 top-0 h-1.5 " +
          (isWin
            ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            : "bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300")
        }
      />
      <div className="flex items-center justify-between gap-3 pt-1.5">
        <div className="min-w-0">
          <p
            className={
              "text-[11px] font-extrabold uppercase tracking-[0.16em] " +
              (isWin ? "text-emerald-600" : "text-rose-500")
            }
          >
            {isWin ? "VICTORY" : "DEFEAT"}
          </p>
          <p className="mt-0.5 text-[14px] leading-relaxed text-neutral-700">
            <span className="font-extrabold text-neutral-900">{name}</span> 님은{" "}
            <span className="font-extrabold text-teal-700">{rank ?? "—"}등</span>
            으로{" "}
            <span
              className={
                "font-extrabold " +
                (isWin ? "text-emerald-600" : "text-rose-500")
              }
            >
              &lsquo;{isWin ? "승리" : "패배"}&rsquo;
            </span>{" "}
            하셨습니다.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-400">
            CREDIT
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 px-3 py-1 text-[14px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(13,148,136,0.95)]">
            <span aria-hidden>💲</span>
            <span className="tabnum">{earnedCredits}</span>
          </span>
        </div>
      </div>

      {hasMission && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 ring-1 ring-amber-300/60"
        >
          <span className="text-lg" aria-hidden>
            🏅
          </span>
          <div className="leading-tight">
            <p className="text-[12px] font-extrabold text-amber-700">
              Mission Complete : {CREDIT_PERFECT_MISSION}크레딧 추가 획득!
            </p>
            <p className="text-[11px] text-amber-600/80">
              {missions.join(" · ")}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
