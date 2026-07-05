"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "@/components/warmup/icons";
import ProgressDashboard from "@/components/progression/ProgressDashboard";

/**
 * 내 프로필 · 진행 대시보드 라우트.
 * 레벨/티어/보상/스네이크 기록/인벤토리를 한 화면에 모아 보여준다.
 */
export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-dvh overflow-hidden pb-safe">
      {/* 앰비언트 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
      </div>

      {/* 상단 바 */}
      <header className="container-narrow flex items-center gap-3 pb-2 pt-5">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-neutral-500 ring-1 ring-neutral-200 transition hover:bg-white hover:text-neutral-800 active:scale-95"
        >
          <ArrowLeft size={16} /> 홈
        </button>
        <h1 className="text-[17px] font-extrabold tracking-tight text-neutral-900">
          내 <span className="text-gradient">프로필</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="container-narrow py-4"
      >
        <ProgressDashboard />
      </motion.div>
    </main>
  );
}
