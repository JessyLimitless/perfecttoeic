"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export default function ScoreBoard({
  solved,
  correct,
  bestStreak,
}: {
  solved: number;
  correct: number;
  bestStreak: number;
}) {
  const accuracy = solved ? Math.round((correct / solved) * 100) : 0;

  const headline =
    solved === 0
      ? "다음엔 꼭 풀어봐요"
      : accuracy >= 80
        ? "훌륭해요, 감각이 좋아요"
        : accuracy >= 50
          ? "좋아요, 꾸준함이 핵심이에요"
          : "해설을 곱씹으면 금방 늘어요";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="card-elevated relative overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-10"
    >
      {/* 상단 그라데이션 액센트 바 */}
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
      {/* 은은한 상단 색 번짐 */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-indigo-50/80 to-transparent" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500 ring-1 ring-indigo-500/15 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Session Complete
        </span>
        <h1 className="mt-3.5 text-[1.7rem] font-extrabold tracking-tight text-neutral-900 sm:text-[2rem]">
          오늘의 기출 학습 완료
        </h1>
        <p className="mt-1.5 text-[14px] text-neutral-500">{headline}</p>

        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 divide-x divide-neutral-100">
          <Stat label="푼 문제" value={solved} />
          <Stat label="정답" value={correct} />
          <Stat label="정답률" value={accuracy} suffix="%" accent />
        </div>

        <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-[13px] text-amber-700 ring-1 ring-amber-500/15">
          최고 연속 정답 <span className="font-bold tabnum">{bestStreak}</span> 🔥
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  suffix = "",
  accent = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="px-2 sm:px-4">
      <div
        className={`text-[1.85rem] font-extrabold tabnum sm:text-[2.25rem] ${
          accent ? "text-gradient" : "text-neutral-900"
        }`}
      >
        <AnimatedNumber value={value} />
        {suffix}
      </div>
      <div className="mt-1 text-[10.5px] uppercase tracking-wide text-neutral-400 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}
