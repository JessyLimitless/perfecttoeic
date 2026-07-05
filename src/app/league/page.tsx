"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "@/components/warmup/icons";
import WeeklyLeague from "@/components/rank/WeeklyLeague";

/**
 * 주간 리그 페이지 — 같은 티어 가상 랭커 ~20명과의 7일 순위 경쟁.
 * 상위 승급권 / 하위 강등권 + 주간 보상 청구.
 */
export default function LeaguePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-dvh overflow-hidden pb-safe">
      {/* 앰비언트 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl"
      />

      {/* 상단 바 */}
      <header className="container-narrow relative flex items-center gap-3 pt-5">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-10 items-center gap-1.5 rounded-full bg-white/80 pl-2.5 pr-3.5 text-[13px] font-semibold text-neutral-600 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm transition hover:text-neutral-900 active:scale-95"
        >
          <ArrowLeft size={16} /> 홈
        </button>
        <h1 className="flex items-center gap-1.5 text-[16px] font-black tracking-[-0.01em] text-neutral-900">
          🏆 <span className="text-gradient">주간 리그</span>
        </h1>
      </header>

      {/* 본문 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="container-narrow relative pt-5"
      >
        <WeeklyLeague />
      </motion.div>
    </main>
  );
}
