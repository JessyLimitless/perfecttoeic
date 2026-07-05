"use client";

// 일일 미션 라우트 — 상단 홈 네비 + 미션 본문.

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/warmup/icons";
import DailyMissions from "@/components/progression/DailyMissions";

export default function MissionsPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh bg-gradient-to-b from-neutral-50 to-white pb-safe">
      <div className="container-narrow py-6">
        {/* 상단 바 */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn-ghost inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={16} />
            홈
          </button>
          <h1 className="text-[17px] font-black">
            <span className="text-gradient">일일 미션</span>
          </h1>
          <span className="w-[68px]" aria-hidden />
        </div>

        <p className="mt-4 text-center text-[13px] text-neutral-500">
          매일 갱신되는 미션을 완료하고 크레딧·XP를 챙기세요.
        </p>

        <div className="mt-6">
          <DailyMissions />
        </div>
      </div>
    </main>
  );
}
