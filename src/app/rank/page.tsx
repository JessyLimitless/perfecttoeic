"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "@/components/warmup/icons";
import RankHome from "@/components/rank/RankHome";

/**
 * 랭크 대결 허브 — 정복(Conquest) 진행축의 경쟁형 코어.
 * 맞힌 문항을 정복해 정복도가 오르고 정복 등급(루키→그랜드마스터)이 상승한다.
 */
export default function RankPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-dvh overflow-hidden pb-safe">
      {/* 은은한 앰비언트 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl"
      />

      {/* 상단 바 */}
      <header className="container-app relative flex items-center gap-3 pt-5">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-10 items-center gap-1.5 rounded-full bg-white/80 pl-2.5 pr-3.5 text-[13px] font-semibold text-neutral-600 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm transition hover:text-neutral-900 active:scale-95"
        >
          <ArrowLeft size={16} /> 홈
        </button>
        <h1 className="flex items-center gap-1.5 text-[16px] font-black tracking-[-0.01em] text-neutral-900">
          ⚔️ <span className="text-gradient">랭크 대결</span>
        </h1>
      </header>

      {/* 본문 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="container-narrow relative pt-5"
      >
        <RankHome />
      </motion.div>
    </main>
  );
}
