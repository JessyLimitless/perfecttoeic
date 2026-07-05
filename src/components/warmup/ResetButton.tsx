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
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={triggerLabel}
          title={triggerLabel}
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: -25 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-neutral-400 ring-1 ring-neutral-900/[0.06] shadow-sm backdrop-blur-sm transition-colors hover:bg-rose-50 hover:text-rose-500 hover:ring-rose-200"
        >
          <RotateCcw size={17} />
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.96 }}
          className="group inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3.5 py-2 text-[12px] font-semibold text-neutral-400 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm transition hover:text-rose-500 hover:ring-rose-200"
        >
          <span className="transition-transform duration-300 group-hover:-rotate-180">
            <RotateCcw size={13} />
          </span>
          {triggerLabel}
        </motion.button>
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
                transition={{ duration: 0.2 }}
              >
                {/* 백드롭 */}
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[3px]"
                />
                {/* 모달 */}
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="card-elevated relative w-full max-w-[20.5rem] overflow-hidden px-6 pb-6 pt-8 text-center"
                >
                  {/* 상단 그라데이션 액센트 + 은은한 위 글로우 */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-rose-400 to-orange-400" />
                  <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-rose-400/25 blur-3xl" />

                  {/* 위험 아이콘 + 펄스 링 */}
                  <div className="relative mx-auto grid h-16 w-16 place-items-center">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-rose-400/30"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-[0_12px_28px_-10px_rgba(244,63,94,0.8)]">
                      <RotateCcw size={24} />
                    </span>
                  </div>

                  <h3 className="mt-4 text-[17px] font-black tracking-[-0.01em] text-neutral-900">
                    {title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[17rem] text-[13px] leading-relaxed text-neutral-500">
                    {description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-500 ring-1 ring-rose-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    되돌릴 수 없어요
                  </div>

                  <div className="mt-6 flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="min-h-[48px] flex-1 rounded-2xl text-[14px] font-bold text-neutral-600 ring-1 ring-neutral-200 transition hover:bg-neutral-50 active:scale-[0.98]"
                    >
                      취소
                    </button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        onReset();
                        setOpen(false);
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative min-h-[48px] flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-[14px] font-black text-white shadow-[0_12px_28px_-10px_rgba(244,63,94,0.75)] transition hover:shadow-[0_16px_32px_-10px_rgba(244,63,94,0.85)]"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span className="transition-transform duration-300 group-hover:-rotate-180">
                          <RotateCcw size={15} />
                        </span>
                        {confirmLabel}
                      </span>
                    </motion.button>
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
