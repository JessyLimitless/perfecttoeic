"use client";

import { motion } from "framer-motion";
import {
  currentStreak,
  weakestType,
  type Progress,
} from "@/game/progress";

/** 로비 학습 현황 카드 — 누적 정답률·연속 학습일·누적 약점 유형 */
export default function ProgressCard({
  progress,
  onReset,
}: {
  progress: Progress;
  onReset: () => void;
}) {
  const accuracy = progress.totalSolved
    ? Math.round((progress.totalCorrect / progress.totalSolved) * 100)
    : 0;
  const streak = currentStreak(progress.studyDates);
  const weak = weakestType(progress.byType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card w-full px-5 py-4 sm:px-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-neutral-900">내 학습 현황</p>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] text-neutral-400 transition hover:text-rose-500"
        >
          기록 초기화
        </button>
      </div>

      <div className="mt-3 flex items-stretch justify-between gap-2">
        <Stat label="연속 학습" value={`${streak}일`} accent={streak > 0} />
        <Divider />
        <Stat label="푼 문항" value={`${progress.totalSolved}`} />
        <Divider />
        <Stat label="누적 정답률" value={`${accuracy}%`} accent />
        <Divider />
        <Stat label="최고 연속" value={`${progress.bestStreak}`} />
      </div>

      {weak && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-rose-50/70 px-3 py-2 text-[12px] text-rose-600 ring-1 ring-rose-500/10">
          <span>🎯</span>
          <span>
            누적 약점 <span className="font-bold">{weak.label}</span> ·{" "}
            {weak.accuracy}%
          </span>
        </div>
      )}
    </motion.div>
  );
}

function Divider() {
  return <div className="w-px self-stretch bg-neutral-100" />;
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex-1 text-center">
      <div
        className={`text-[17px] font-extrabold tabnum ${
          accent ? "text-indigo-600" : "text-neutral-900"
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10.5px] text-neutral-400">{label}</div>
    </div>
  );
}
