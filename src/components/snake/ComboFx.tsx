"use client";

// 🎇 콤보 FX 모음 — 스피드 스네이크 전용 재사용 시각 연출 컴포넌트.
// 게임 로직/점수/타이머와 무관한 "순수 시각 레이어"만 담당한다.
// 각 컴포넌트는 정수 nonce(`trigger`)가 바뀔 때마다 AnimatePresence로 재생한다.
// prefers-reduced-motion 을 존중해 과한 움직임은 줄이거나 생략한다.

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** 정답 폭발 파티클 개수 */
const BURST_PIECES = 10;

/**
 * 정답 시 스킨 색상으로 방사형 스파크가 터지는 버스트.
 * `trigger`가 0보다 크고 값이 바뀔 때마다 한 번 재생된다.
 */
export function CorrectBurst({
  trigger,
  color = "#6366f1",
}: {
  trigger: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {trigger > 0 && (
          <motion.div key={trigger} className="relative h-0 w-0">
            {/* 방사형 스파크 (감소 모드에선 생략) */}
            {Array.from({ length: reduce ? 0 : BURST_PIECES }).map((_, i) => {
              const angle = (i / BURST_PIECES) * Math.PI * 2;
              const dist = 46 + (i % 3) * 14;
              const x = Math.cos(angle) * dist;
              const y = Math.sin(angle) * dist;
              return (
                <motion.span
                  key={i}
                  className="absolute h-2 w-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x, y, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
            {/* 중앙 파동 링 (감소 모드에선 고정 페이드) */}
            <motion.span
              className="absolute rounded-full"
              style={{
                border: `2px solid ${color}`,
                marginLeft: -20,
                marginTop: -20,
                height: 40,
                width: 40,
              }}
              initial={{ scale: 0.4, opacity: 0.7 }}
              animate={{ scale: reduce ? 1 : 2.4, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * "×{combo} COMBO! ×{multiplier}" 팝업. 콤보가 클수록 크고 강렬해진다.
 * 5의 배수(마일스톤) 콤보에선 글로우/외곽선으로 한층 화려하게.
 */
export function ComboPopup({
  trigger,
  combo,
  multiplier,
  color = "#6366f1",
}: {
  trigger: number;
  combo: number;
  multiplier: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const milestone = combo > 0 && combo % 5 === 0;
  // 콤보에 비례해 커짐(상한 1.4)
  const size = Math.min(1.4, 0.9 + combo * 0.03);
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-start justify-center overflow-hidden">
      <AnimatePresence>
        {trigger > 0 && combo >= 2 && (
          <motion.div
            key={trigger}
            className="mt-6 flex flex-col items-center"
            initial={{ scale: reduce ? 1 : 0.3, opacity: 0, y: reduce ? 0 : 8 }}
            animate={{
              scale: reduce ? size : [size * 1.18, size],
              opacity: [1, 1, 0],
              y: reduce ? 0 : [-2, -28],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, times: [0, 0.3, 1], ease: "easeOut" }}
          >
            <span
              className="tabnum font-black tracking-tight"
              style={{
                fontSize: `${1.5 * size}rem`,
                color,
                textShadow: milestone
                  ? `0 0 20px ${color}`
                  : "0 2px 8px rgba(0,0,0,0.18)",
                WebkitTextStroke: milestone
                  ? "1px rgba(255,255,255,0.75)"
                  : undefined,
              }}
            >
              ×{combo} COMBO!
            </span>
            <span
              className="mt-0.5 text-[13px] font-black"
              style={{ color }}
            >
              ×{multiplier.toFixed(1)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 패널 전체를 잠깐 물들이는 색 플래시. 정답=emerald, 오답/하트감소=rose.
 * `trigger` 변화마다 짧게 번쩍인다.
 */
export function ScreenFlash({
  trigger,
  tone,
}: {
  trigger: number;
  tone: "good" | "bad";
}) {
  const bg =
    tone === "good"
      ? "radial-gradient(circle at 50% 42%, rgba(16,185,129,0.26), transparent 70%)"
      : "radial-gradient(circle at 50% 42%, rgba(244,63,94,0.30), transparent 70%)";
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <AnimatePresence>
        {trigger > 0 && (
          <motion.div
            key={trigger}
            className="absolute inset-0"
            style={{ background: bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 콤보가 높을 때(예: >=8) 스쳐 지나가는 속도선 — 속도감 연출.
 * 감소 모드에선 렌더하지 않는다.
 */
export function SpeedLines({
  active,
  color = "#6366f1",
}: {
  active: boolean;
  color?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const lines = [12, 28, 44, 60, 76, 90];
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {lines.map((top, i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-24 rounded-full"
              style={{
                top: `${top}%`,
                left: "-30%",
                background: `linear-gradient(to right, transparent, ${color}55, transparent)`,
              }}
              animate={{ x: ["0vw", "140vw"] }}
              transition={{
                duration: 1.1 + (i % 3) * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.18,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
