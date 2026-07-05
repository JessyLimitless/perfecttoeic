"use client";

// 상점 라우트 — 상단 홈 네비 + 상점 본문.

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/warmup/icons";
import Shop from "@/components/shop/Shop";

export default function ShopPage() {
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
            <span className="text-gradient">상점</span>
          </h1>
          <span className="w-[68px]" aria-hidden />
        </div>

        <p className="mt-4 text-center text-[13px] text-neutral-500">
          모은 크레딧으로 힌트·프리즈를 채우고 스네이크 스킨을 해금하세요.
        </p>

        <div className="mt-6">
          <Shop />
        </div>
      </div>
    </main>
  );
}
