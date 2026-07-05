"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { LevelUpResult, Reward } from "@/game/progression/types";
import CoinIcon from "@/components/ui/CoinIcon";

/** 보상 한 줄의 표시용 아이콘/문구 */
function rewardView(r: Reward): { icon: string; label: string } {
  switch (r.kind) {
    case "credits":
      return { icon: "🪙", label: `크레딧 +${r.amount}` };
    case "hint":
      return { icon: "💡", label: `힌트 +${r.amount}` };
    case "freeze":
      return { icon: "🔥", label: `스트릭 프리즈 +${r.amount}` };
    case "unlock":
      return { icon: "🔓", label: `${r.label} 해금` };
  }
}

/**
 * 레벨업 축하 연출 — 팡파레 + (마일스톤이면) 보물상자 개봉 리빌.
 * result가 있으면 표시, "받기"로 닫는다(onClose).
 */
export default function LevelUpOverlay({
  result,
  onClose,
}: {
  result: LevelUpResult | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  // 보물상자: "closed"(탭 대기) → "open"(리빌). 상자 없으면 바로 "open".
  const [stage, setStage] = useState<"closed" | "open">("open");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (result) setStage(result.chest ? "closed" : "open");
  }, [result]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {result && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 백드롭 */}
          <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm" />

          {/* 방사형 광채 */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-transparent blur-3xl"
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
            {/* 상단 광띠 */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-400" />

            {/* LEVEL UP 헤더 */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-300"
            >
              Level Up
            </motion.p>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.14 }}
              className="mt-2 text-[52px] font-black leading-none text-white"
            >
              Lv.{result.to}
            </motion.div>
            {result.from > 0 && (
              <p className="mt-1 text-[12px] font-semibold text-white/50">
                Lv.{result.from} → Lv.{result.to}
              </p>
            )}

            {/* 티어 승급 배너 */}
            {result.tierUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.24 }}
                className={`mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${result.tierUp.gradient} px-4 py-1.5 text-[13px] font-black text-white shadow-lg`}
              >
                {result.tierUp.emoji} {result.tierUp.label} 승급!
              </motion.div>
            )}

            {/* 보상 영역 */}
            <div className="mt-6">
              {stage === "closed" ? (
                <button
                  type="button"
                  onClick={() => setStage("open")}
                  className="group mx-auto flex flex-col items-center gap-3"
                >
                  <motion.span
                    className="text-[72px] leading-none drop-shadow-[0_8px_20px_rgba(245,158,11,0.5)]"
                    animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🎁
                  </motion.span>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-amber-200 ring-1 ring-white/15 transition group-hover:bg-white/15 group-active:scale-95">
                    탭하여 보물상자 열기
                  </span>
                </button>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                  className="flex flex-col gap-2"
                >
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                    획득 보상
                  </p>
                  {result.rewards.map((r, i) => {
                    const rv = rewardView(r);
                    return (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -12, scale: 0.96 },
                          show: { opacity: 1, x: 0, scale: 1 },
                        }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 text-left ring-1 ring-white/10"
                      >
                        {r.kind === "credits" ? (
                          <CoinIcon size={22} />
                        ) : (
                          <span className="text-[22px]">{rv.icon}</span>
                        )}
                        <span className="text-[14px] font-bold text-white">{rv.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* 받기 */}
            <button
              type="button"
              onClick={onClose}
              disabled={stage === "closed"}
              className="mt-7 min-h-[50px] w-full rounded-2xl bg-white text-[15px] font-bold text-neutral-900 shadow-lg transition hover:shadow-xl active:scale-[0.98] disabled:opacity-30"
            >
              받기
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
