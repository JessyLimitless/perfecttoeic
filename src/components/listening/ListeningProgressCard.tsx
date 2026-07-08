"use client";

// 랜딩(로비)용 "리스닝 세트 진행" 요약 카드.
// MasteryBoard(파트별 정복도)와 겹치지 않게, 세트 단위 진행에 초점:
//  ① 학습한 세트 수 ② 완주(만점) 세트 수 ③ 누적 최고 정답 문항 합 ④ 평균 최고 정답률.
// 하이드레이션 안전(마운트 전 null) · 진행 없으면 렌더 안 함(로비 안 어지럽히기).

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  loadListeningProgress,
  type ListeningProgressState,
} from "@/game/listeningProgress";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Summary {
  studiedSets: number;
  completedSets: number;
  bestCorrectSum: number;
  avgBestRate: number; // 0~100 반올림
}

function summarize(state: ListeningProgressState): Summary {
  const entries = Object.values(state);
  let bestCorrectSum = 0;
  let totalSum = 0;
  let completedSets = 0;
  for (const p of entries) {
    bestCorrectSum += p.bestCorrect;
    totalSum += p.total;
    if (p.total > 0 && p.bestCorrect === p.total) completedSets += 1;
  }
  return {
    studiedSets: entries.length,
    completedSets,
    bestCorrectSum,
    avgBestRate: totalSum > 0 ? Math.round((bestCorrectSum / totalSum) * 100) : 0,
  };
}

export default function ListeningProgressCard() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [totalSets, setTotalSets] = useState<number | null>(null);

  useEffect(() => {
    const state = loadListeningProgress();
    if (Object.keys(state).length === 0) {
      setSummary(null);
      return;
    }
    setSummary(summarize(state));

    // 총 세트 수 분모(선택) — 실패 시 분모 없이 표기.
    let alive = true;
    fetch("/api/listening")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data?.sets)) setTotalSets(data.sets.length);
      })
      .catch(() => {
        /* 분모 없이 표기 */
      });
    return () => {
      alive = false;
    };
  }, []);

  // 마운트 전 or 진행 없음 → 렌더 안 함
  if (!summary) return null;

  const setsLabel =
    totalSets && totalSets > 0
      ? `${summary.studiedSets} / ${totalSets}`
      : `${summary.studiedSets}`;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="card-elevated relative overflow-hidden p-6 sm:p-8"
    >
      {/* 리스닝 아이덴티티 글로우 */}
      <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1.5 text-[12px] font-bold text-cyan-700 ring-1 ring-cyan-500/20">
              🎧 리스닝 진행
            </span>
            <h2 className="mt-3 text-[20px] font-black tracking-tight text-neutral-900 sm:text-[24px]">
              내 리스닝 세트 현황
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
              완주한 세트를 늘리고 평균 정답률을 끌어올려 실전 만점에 다가가세요.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/listening")}
            className="group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 px-6 text-[14px] font-bold text-white shadow-md transition hover:shadow-lg active:scale-[0.98] sm:self-auto"
          >
            리스닝 이어서
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* 지표 그리드 */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="학습한 세트" value={setsLabel} />
          <Metric
            label="완주(만점) 세트"
            value={`${summary.completedSets}`}
            highlight={summary.completedSets > 0}
          />
          <Metric label="최고 정답 합" value={`${summary.bestCorrectSum}문항`} />
          <Metric label="평균 최고 정답률" value={`${summary.avgBestRate}%`} accent />
        </div>
      </div>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  highlight = false,
  accent = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 ring-1 ${
        highlight
          ? "bg-amber-50 ring-amber-200"
          : accent
            ? "bg-cyan-50 ring-cyan-100"
            : "bg-neutral-50 ring-neutral-900/[0.05]"
      }`}
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p
        className={`mt-1 text-[19px] font-black leading-none tabnum ${
          highlight
            ? "text-amber-600"
            : accent
              ? "text-cyan-700"
              : "text-neutral-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
