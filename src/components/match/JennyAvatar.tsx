"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { JENNY, type JennyOutcomeVariant } from "@/game/match/jenny";
import JennyOriginalArt from "./JennyOriginalArt";

/** 모션 프리셋 — 살아있는 느낌(호흡)·승리(방방)·패배(흔들) */
const MOTION: Record<
  "idle" | "win" | "lose",
  { animate: Record<string, number[]>; transition: object }
> = {
  idle: {
    animate: { y: [0, -3, 0], scale: [1, 1.025, 1] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  win: {
    animate: { rotate: [0, -4, 4, -2, 0], scale: [1, 1.08, 1] },
    transition: { duration: 0.9, repeat: Infinity, repeatDelay: 1.4 },
  },
  lose: {
    animate: { x: [0, -3, 3, -2, 0], rotate: [0, -1.5, 1.5, 0] },
    transition: { duration: 0.7, repeat: Infinity, repeatDelay: 2 },
  },
};

/**
 * 라이벌 제니 아바타.
 * - /public/jeny.png (표정별 jeny2.png=승리)가 있으면 그 이미지, 없으면 이모지 폴백.
 * - motionPreset으로 등장/호흡/승패 리액션 애니메이션 부여(기본 none).
 */
export default function JennyAvatar({
  size = 40,
  variant = "idle",
  rounded = "rounded-2xl",
  className = "",
  motionPreset = "none",
  glow = false,
}: {
  size?: number;
  variant?: JennyOutcomeVariant;
  rounded?: string;
  className?: string;
  motionPreset?: "none" | "idle" | "win" | "lose";
  /** 뒤에 은은한 컬러 오라 */
  glow?: boolean;
}) {
  const candidates =
    variant === "idle"
      ? [JENNY.images.idle]
      : [JENNY.images[variant], JENNY.images.idle];
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState(false);

  const inner = broken ? (
    <JennyOriginalArt
      size={size}
      expression={variant}
      className={`h-full w-full select-none ${rounded}`}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[idx]}
      alt={JENNY.name}
      width={size}
      height={size}
      onError={() => {
        if (idx < candidates.length - 1) setIdx(idx + 1);
        else setBroken(true);
      }}
      className={`h-full w-full object-cover ${rounded}`}
    />
  );

  const anim = motionPreset !== "none" ? MOTION[motionPreset] : undefined;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <motion.span
          aria-hidden
          className={`pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-br ${JENNY.gradient} opacity-40 blur-lg`}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.span
        className={`relative inline-flex h-full w-full items-center justify-center overflow-hidden ring-1 ring-white/25 shadow-[0_6px_16px_-6px_rgba(217,70,239,0.6)] ${rounded}`}
        {...(anim ?? {})}
        style={{ transformOrigin: "center bottom" }}
      >
        {inner}
      </motion.span>
    </span>
  );
}
