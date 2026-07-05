"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  loadProgress,
  currentCredits,
  PROGRESS_EVENT,
} from "@/game/progression/store";
import { levelFromXp, tierForLevel } from "@/game/progression/types";

interface View {
  level: number;
  ratio: number;
  intoLevel: number;
  span: number;
  tierEmoji: string;
  tierLabel: string;
  tierGradient: string;
  credits: number;
  streak: number;
}

function read(): View {
  const st = loadProgress();
  const info = levelFromXp(st.xp);
  const tier = tierForLevel(info.level);
  return {
    level: info.level,
    ratio: info.ratio,
    intoLevel: info.intoLevel,
    span: info.span,
    tierEmoji: tier.emoji,
    tierLabel: tier.label,
    tierGradient: tier.gradient,
    credits: currentCredits(),
    streak: st.streak.count,
  };
}

/**
 * 상단 레벨 HUD — 레벨 배지 + XP 진행바 + 크레딧 + 스트릭.
 * `toeic-progress` 이벤트를 구독해 XP 지급 즉시 갱신된다.
 * variant: "bar"(넓은 카드) | "pill"(좁은 인라인)
 */
export default function LevelHud({
  variant = "bar",
  className = "",
}: {
  variant?: "bar" | "pill";
  className?: string;
}) {
  const [v, setV] = useState<View | null>(null);

  const refresh = useCallback(() => setV(read()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    // 다른 탭/포커스 복귀 반영
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  if (!v) {
    // SSR/최초 마운트 전 — 레이아웃 밀림 방지용 스켈레톤
    return (
      <div
        className={`h-[52px] rounded-2xl bg-white/60 ring-1 ring-neutral-900/[0.05] ${className}`}
      />
    );
  }

  const badge = (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${v.tierGradient} text-[13px] font-black text-white shadow-sm`}
    >
      {v.level}
    </span>
  );

  if (variant === "pill") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-1.5 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm ${className}`}
      >
        {badge}
        <div className="min-w-[80px]">
          <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
            <span>{v.tierEmoji}</span>
            <span>Lv.{v.level}</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
              initial={false}
              animate={{ width: `${Math.round(v.ratio * 100)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />
          </div>
        </div>
        <span className="ml-1 flex items-center gap-1 text-[12px] font-bold text-amber-500">
          🪙 {v.credits}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm ${className}`}
    >
      {badge}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-neutral-900">
            <span>{v.tierEmoji}</span>
            <span>{v.tierLabel}</span>
            <span className="text-neutral-400">·</span>
            <span>Lv.{v.level}</span>
          </span>
          <span className="tabnum text-[11px] font-semibold text-neutral-400">
            {v.intoLevel} / {v.span} XP
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200/80">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
            initial={false}
            animate={{ width: `${Math.round(v.ratio * 100)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          />
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="flex items-center gap-1 text-[13px] font-bold text-amber-500">
          🪙 {v.credits}
        </span>
        {v.streak > 0 && (
          <span className="flex items-center gap-0.5 text-[12px] font-bold text-orange-500">
            🔥 {v.streak}
          </span>
        )}
      </div>
    </div>
  );
}
