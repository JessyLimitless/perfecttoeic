"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "./icons";

/**
 * 파괴적 초기화를 보호하는 확인 버튼.
 * 클릭 → 중앙 확인 모달(포털) → "초기화" 눌러야 실제 실행.
 * variant: "icon"(정사각 ↺ 버튼, 카드 푸터용) | "pill"(텍스트 필, 인게임용)
 */
export default function ResetButton({
  onReset,
  title = "진도를 초기화할까요?",
  description = "지금까지의 진행이 모두 지워지며 되돌릴 수 없어요.",
  confirmLabel = "초기화",
  triggerLabel = "진도 초기화",
  variant = "icon",
}: {
  onReset: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  triggerLabel?: string;
  variant?: "icon" | "pill";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={triggerLabel}
          title={triggerLabel}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-neutral-400 ring-1 ring-neutral-200 transition hover:bg-white hover:text-rose-500 hover:ring-rose-200 active:scale-95"
        >
          <RotateCcw size={18} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium text-neutral-400 ring-1 ring-neutral-200 transition hover:text-rose-500 hover:ring-rose-200 active:scale-95"
        >
          <RotateCcw size={14} /> {triggerLabel}
        </button>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {/* 백드롭 */}
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]"
                />
                {/* 모달 */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="card-elevated relative w-full max-w-[20rem] overflow-hidden px-6 py-6 text-center"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 to-orange-400" />
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                    <RotateCcw size={22} />
                  </div>
                  <h3 className="mt-3 text-[16px] font-bold tracking-[-0.01em] text-neutral-900">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                    {description}
                  </p>
                  <div className="mt-5 flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="min-h-[46px] flex-1 rounded-2xl text-[14px] font-semibold text-neutral-600 ring-1 ring-neutral-200 transition hover:bg-neutral-50 active:scale-[0.98]"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onReset();
                        setOpen(false);
                      }}
                      className="min-h-[46px] flex-1 rounded-2xl bg-rose-500 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(244,63,94,0.7)] transition hover:bg-rose-600 active:scale-[0.98]"
                    >
                      {confirmLabel}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
