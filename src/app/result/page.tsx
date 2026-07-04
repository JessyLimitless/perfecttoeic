"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScoreBoard from "@/components/result/ScoreBoard";
import TypeBreakdown from "@/components/result/TypeBreakdown";
import ReviewReport from "@/components/result/ReviewReport";
import { usePracticeStore } from "@/game/store";

export default function SummaryPage() {
  const router = useRouter();
  const solved = usePracticeStore((s) => s.solved);
  const correct = usePracticeStore((s) => s.correct);
  const bestStreak = usePracticeStore((s) => s.bestStreak);
  const history = usePracticeStore((s) => s.history);
  const status = usePracticeStore((s) => s.status);
  const reset = usePracticeStore((s) => s.reset);

  // 푼 문제 없이 직접 진입/새로고침이면 로비로.
  // (active = 약점 집중 연습 시작 → /game 으로 보내는 중이므로 가로채지 않음)
  useEffect(() => {
    if (status === "idle") router.replace("/learn");
  }, [status, router]);

  if (status !== "ended") return null;

  const handleReplay = () => {
    reset();
    router.push("/learn");
  };

  return (
    <main className="container-app pb-safe flex min-h-dvh flex-col gap-5 py-8 sm:py-10">
      <ScoreBoard solved={solved} correct={correct} bestStreak={bestStreak} />

      {/* 데스크탑: 유형별 분석(좌) + 복습 리포트(우)를 넓게 병치 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <TypeBreakdown history={history} />
        </div>
        <ReviewReport history={history} />
      </div>

      <div className="flex justify-center pt-1">
        <motion.button
          type="button"
          onClick={handleReplay}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary px-10 py-3.5 text-[15px]"
        >
          다시 연습하기
        </motion.button>
      </div>
    </main>
  );
}
