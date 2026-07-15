"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  loadPatternStats,
  patternProgress,
  type PatternChapter,
  type PatternPart,
  type PatternStat,
} from "@/game/patterns";

const PART_LABEL: Record<PatternPart, string> = {
  5: "Part 5 · 단문 공란",
  6: "Part 6 · 장문 공란",
  7: "Part 7 · 독해",
};

const PART_INTRO: Record<PatternPart, string> = {
  5: "Part 5는 자리(품사)·연어·특수구문 25가지 패턴이 반복됩니다. 공식 → 3초컷 팁 → 실전 예제로 유형을 통째로 정복하세요.",
  6: "Part 6는 지문 유형별 상황 예측 맵 25가지로 빈칸을 공략합니다. 흐름을 먼저 읽으면 정답 구역이 보입니다.",
  7: "Part 7은 지문 유형별 정답 매칭 공식 25가지. 단일·이중·삼중 지문의 정답 구역을 패턴으로 잡으세요.",
};

export default function PatternHome({ chapters }: { chapters: PatternChapter[] }) {
  const router = useRouter();
  const [stats, setStats] = useState<Record<string, PatternStat> | null>(null);

  const parts = Array.from(new Set(chapters.map((c) => c.part))).sort(
    (a, b) => a - b,
  ) as PatternPart[];
  const [activePart, setActivePart] = useState<PatternPart>(parts[0] ?? 5);

  useEffect(() => {
    setStats(loadPatternStats());
  }, []);

  const total = chapters.reduce((n, c) => n + c.patterns.length, 0);
  const prog = stats ? patternProgress(stats) : { studied: 0, mastered: 0 };
  const visibleChapters = chapters.filter((c) => c.part === activePart);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-24 text-neutral-900">
      {/* 배경 오라 */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-300/50 via-blue-300/40 to-sky-300/50 blur-[90px]" />

      <div className="container-app relative z-10 pt-6 sm:pt-10">
        <button
          onClick={() => router.push("/")}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-800"
        >
          <span aria-hidden>←</span> 홈
        </button>

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
            PATTERN STUDY · PART {activePart}
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight sm:text-[34px]">
            만점 패턴{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
              25
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {PART_INTRO[activePart]}
          </p>
        </motion.div>

        {/* 진도 요약 */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <ProgressChip label="학습한 패턴" value={`${prog.studied} / ${total}`} tone="indigo" />
          <ProgressChip label="완전정복(만점)" value={`${prog.mastered} / ${total}`} tone="amber" />
        </div>
        <div className="mt-3 h-2 w-full max-w-md overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-[width] duration-500"
            style={{ width: `${total ? (prog.studied / total) * 100 : 0}%` }}
          />
        </div>

        {/* 파트 탭 */}
        {parts.length > 1 && (
          <div className="mt-7 flex gap-2 rounded-xl bg-neutral-100 p-1">
            {parts.map((p) => (
              <button
                key={p}
                onClick={() => setActivePart(p)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  activePart === p
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {PART_LABEL[p]}
              </button>
            ))}
          </div>
        )}

        {/* 챕터별 패턴 목록 */}
        <div className="mt-8 space-y-8">
          {visibleChapters.map((ch) => (
            <section key={ch.chapter}>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-sm font-extrabold text-indigo-600">
                  CHAPTER {ch.chapter}
                </span>
                <span className="text-sm font-semibold text-neutral-500">
                  {ch.chapterTitle}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ch.patterns.map((p) => {
                  const st = stats?.[p.id];
                  const done = !!st;
                  const perfect = st && st.correct === st.total;
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push(`/patterns/${p.id}`)}
                      className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 px-2 text-xs font-extrabold text-white">
                          {String(p.no).padStart(2, "0")}
                        </span>
                        {done && (
                          <span
                            className={`text-xs font-bold ${
                              perfect ? "text-amber-500" : "text-emerald-500"
                            }`}
                          >
                            {perfect ? "👑 정복" : `✓ ${st!.correct}/${st!.total}`}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-neutral-900">
                        {p.title}
                      </h3>
                      <span className="mt-2 inline-block w-fit rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
                        {p.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProgressChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "indigo" | "amber";
}) {
  const cls =
    tone === "indigo"
      ? "bg-indigo-50 text-indigo-700 ring-indigo-200"
      : "bg-amber-50 text-amber-700 ring-amber-200";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${cls}`}>
      {label}
      <b className="font-extrabold">{value}</b>
    </span>
  );
}
