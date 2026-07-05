"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { rankChangeHeadline, type RankChange } from "@/game/rank/types";

/**
 * 랭크 매치 결과 연출 — RP 증감 + 디비전/티어 승급·강등.
 * change가 있으면 표시, "확인"으로 닫는다(onClose).
 */
export default function RankResultOverlay({
  change,
  onClose,
}: {
  change: RankChange | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const positive = change ? change.delta >= 0 : true;
  const big = change ? change.tierPromoted || change.promoted : false;
  const bad = change ? change.tierDemoted || change.demoted : false;

  return createPortal(
    <AnimatePresence>
      {change && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm" />

          {/* 방사형 광채 (승급=금빛/강등=적색/일반=인디고) */}
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute h-[60vh] w-[60vh] rounded-full blur-3xl ${
              big
                ? "bg-gradient-to-br from-amber-400/40 via-fuchsia-500/20 to-transparent"
                : bad
                  ? "bg-gradient-to-br from-rose-500/30 to-transparent"
                  : "bg-gradient-to-br from-indigo-500/30 to-transparent"
            }`}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="surface-dark relative w-full max-w-[22rem] overflow-hidden px-7 py-8 text-center"
          >
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${change.after.tier.gradient}`}
            />

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50"
            >
              Ranked Match
            </motion.p>

            {/* 티어 엠블럼 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.14 }}
              className={`mx-auto mt-3 grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br ${change.after.tier.gradient} text-[46px] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]`}
            >
              {change.after.tier.emoji}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="mt-4 text-[22px] font-black text-white"
            >
              {change.after.label}
            </motion.p>

            {/* 승급/강등 배너 */}
            {(big || bad) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 }}
                className={`mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-black text-white shadow-lg ${
                  bad ? "bg-rose-500" : `bg-gradient-to-r ${change.after.tier.gradient}`
                }`}
              >
                {big ? "⬆" : "⬇"} {rankChangeHeadline(change)}
              </motion.div>
            )}

            {/* RP 증감 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="mt-5"
            >
              <span
                className={`text-[30px] font-black tabular-nums ${
                  positive ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {positive ? "+" : ""}
                {change.delta} RP
              </span>
              {/* 디비전 진행바 */}
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className={`block h-full rounded-full bg-gradient-to-r ${change.after.tier.gradient}`}
                  initial={{ width: `${Math.round(change.before.ratio * 100)}%` }}
                  animate={{ width: `${Math.round(change.after.ratio * 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-white/40">
                {change.after.isMaster
                  ? `${change.after.rpIntoDivision} LP`
                  : `${change.after.rpIntoDivision} / ${change.after.divisionSpan} RP`}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 min-h-[50px] w-full rounded-2xl bg-white text-[15px] font-bold text-neutral-900 shadow-lg transition hover:shadow-xl active:scale-[0.98]"
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
