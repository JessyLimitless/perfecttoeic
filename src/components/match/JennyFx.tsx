"use client";

// 제니 연출용 재사용 FX — 승리 컨페티 + 제니 컷인(대사 말풍선).
// 결과 화면 위에 얹는 가벼운 연출. 포털(document.body)로 오버레이 z 위에 렌더.
// prefers-reduced-motion 존중(가능한 범위) — 파티클/슬라이드를 절제한다.

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import JennyAvatar from "./JennyAvatar";
import { type JennyOutcomeVariant } from "@/game/match/jenny";
import { useCharacter } from "@/game/match/characters";

/** 컨페티 조각 색 (로즈·푸시아·앰버·에메랄드·인디고) */
const CONFETTI_COLORS = [
  "#f43f5e",
  "#d946ef",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#22d3ee",
];

/**
 * 승리 컨페티 — trigger가 true가 되면 1회만 터진다(~24조각).
 * self-contained: 마운트/트리거 시 파티클을 만들고, 다 떨어지면 스스로 사라진다.
 */
export function Confetti({
  trigger,
  count = 24,
}: {
  trigger: boolean;
  count?: number;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [fired, setFired] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (trigger && !fired) setFired(true);
  }, [trigger, fired]);

  // 조각 파라미터(랜덤) — 한 번만 계산
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100, // %
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.35,
        duration: 2 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 120, // px 좌우 흔들림
        rotate: 180 + Math.random() * 540,
        size: 7 + Math.random() * 7,
        rounded: Math.random() > 0.5,
      })),
    [count],
  );

  // 접근성: 모션 최소화면 컨페티 생략
  if (!mounted || !fired || done || reduce) return null;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[130] overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-12vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "112vh",
            x: p.drift,
            opacity: [0, 1, 1, 0.9],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.2, 0.6, 0.4, 1],
          }}
          onAnimationComplete={() => {
            if (p.id === pieces.length - 1) setDone(true);
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            borderRadius: p.rounded ? "9999px" : "2px",
          }}
        />
      ))}
    </div>,
    document.body,
  );
}

/**
 * 제니 컷인 — 화면 하단/측면에서 극적으로 슬라이드-인하는 제니 + 말풍선.
 * expression: "win"(제니가 이겨 도발) / "lose"(제니가 져 억울).
 * 약 2.2초 후 자동 사라짐, 탭하면 즉시 닫힘.
 */
export function JennyCutin({
  open,
  expression,
  line,
  onClose,
  autoMs = 2200,
}: {
  open: boolean;
  expression: JennyOutcomeVariant;
  line: string;
  onClose?: () => void;
  autoMs?: number;
}) {
  const reduce = useReducedMotion();
  const character = useCharacter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 자동 사라짐 타이머
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), autoMs);
    return () => clearTimeout(t);
  }, [open, autoMs, onClose]);

  if (!mounted) return null;

  // 표정에 맞춘 강조색 — 도발(win)=푸시아/로즈, 억울(lose)=인디고/스카이
  const accent =
    expression === "win"
      ? "from-rose-500 to-fuchsia-600"
      : "from-indigo-500 to-sky-600";
  const label = expression === "win" ? "도발" : "억울";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[125] flex justify-center p-4 pb-safe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.button
            type="button"
            onClick={() => onClose?.()}
            aria-label={`${character.name} 닫기`}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 60, y: 20, scale: 0.9, rotate: 3 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: 40, y: 16, scale: 0.94 }
            }
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="relative flex max-w-md items-end gap-3 text-left"
          >
            {/* 컬러 오라 */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br ${accent} opacity-25 blur-2xl`}
            />

            {/* 제니 아바타 (표정별 프리셋) */}
            <motion.span
              initial={reduce ? false : { rotate: -10, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 340, damping: 15 }}
              className="shrink-0"
            >
              <JennyAvatar
                size={96}
                variant={expression}
                motionPreset={expression}
                glow
                rounded="rounded-3xl"
              />
            </motion.span>

            {/* 말풍선 */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 20 }}
              className="surface-dark relative mb-1 max-w-[15rem] overflow-hidden rounded-2xl px-4 py-3"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
              />
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accent}`}
                />
                {character.name} · {label}
              </p>
              <p className="mt-1.5 text-[13.5px] font-bold leading-snug text-white">
                “{line}”
              </p>
              <p className="mt-1.5 text-[10px] font-semibold text-white/35">
                탭하여 닫기
              </p>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
