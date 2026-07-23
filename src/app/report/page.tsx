"use client";

// 약점 리포트 — 유형별 정답률 진단 + 간격반복 복습 진입.
// "무엇을 더 풀지"를 사용자가 고르지 않아도 되게 만드는 화면(진단 → 처방).

import Link from "next/link";
import { ArrowLeft } from "@/components/warmup/icons";
import WeaknessReport from "@/components/report/WeaknessReport";

export default function ReportPage() {
  return (
    <main className="container-app pb-safe pt-5">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          aria-label="홈으로"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-[20px] font-black tracking-tight text-slate-900 sm:text-[24px]">
            약점 리포트
          </h1>
          <p className="text-[12.5px] text-slate-500">
            푼 기록에서 유형별 정답률을 뽑아 약한 곳부터 보여줘
          </p>
        </div>
      </div>

      <WeaknessReport />

      <p className="mt-8 text-center text-[12px] leading-relaxed text-slate-400">
        정답률은 차분히 푸는 모드(문제 풀이·리스닝)에서만 집계돼.
        <br />
        대결은 시간압박이 있어 실력 지표에서 제외돼.
      </p>
    </main>
  );
}
