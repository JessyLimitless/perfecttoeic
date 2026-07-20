"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  loadMastery,
  buildMasteryView,
  type MasteryView,
  type PartTotals,
} from "@/game/mastery";
import { gradeFromCoverage } from "@/game/conquest";
import {
  loadPatternStats,
  patternProgress,
  type PatternChapter,
} from "@/game/patterns";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 3단계 아이덴티티 — 앱 전체를 관통하는 시각 언어 */
const STAGES = [
  {
    key: "pattern",
    step: "STEP 1",
    icon: "📐",
    title: "패턴 연습",
    sub: "유형을 배운다",
    href: "/patterns",
    ring: "ring-indigo-500/20",
    text: "text-indigo-600",
    bg: "from-indigo-50 to-white",
    dot: "bg-indigo-500",
  },
  {
    key: "game",
    step: "STEP 2",
    icon: "🎮",
    title: "토익 게임",
    sub: "겨루며 익힌다",
    href: "/rank",
    ring: "ring-rose-500/20",
    text: "text-rose-600",
    bg: "from-rose-50 to-white",
    dot: "bg-rose-500",
  },
  {
    key: "real",
    step: "STEP 3",
    icon: "🎯",
    title: "실전",
    sub: "시험처럼 푼다",
    href: "/mock",
    ring: "ring-amber-500/20",
    text: "text-amber-600",
    bg: "from-amber-50 to-white",
    dot: "bg-amber-500",
  },
] as const;

export default function LandingPage() {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [view, setView] = useState<MasteryView | null>(null);
  const [pattern, setPattern] = useState<{
    studied: number;
    total: number;
    /** 아직 안 푼 다음 패턴 — 목록을 거치지 않고 바로 진입 */
    nextId: string | null;
  } | null>(null);

  useEffect(() => {
    // 정복도
    fetch("/api/part-totals")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const totals = (d?.totals ?? {}) as PartTotals;
        setView(buildMasteryView(loadMastery(), totals));
      })
      .catch(() => setView(buildMasteryView(loadMastery(), {})));

    // 패턴 진도
    fetch("/api/patterns")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const chapters = (d?.chapters ?? []) as PatternChapter[];
        const all = chapters.flatMap((c) => c.patterns);
        const stats = loadPatternStats();
        const { studied } = patternProgress(stats);
        const next = all.find((p) => !stats[p.id]) ?? all[0];
        if (all.length > 0)
          setPattern({
            studied,
            total: all.length,
            nextId: next?.id ?? null,
          });
      })
      .catch(() => setPattern(null));
  }, []);

  const coverage = view?.overallCoverage ?? 0;
  const grade = useMemo(() => gradeFromCoverage(coverage), [coverage]);

  /** 박스별 한 줄 지표 */
  const stat = (key: string) => {
    if (key === "pattern")
      return pattern ? `${pattern.studied} / ${pattern.total} 패턴` : "75 패턴";
    if (key === "game") return `${grade.emoji} ${grade.label}`;
    return view ? `${coverage}% 정복` : "6개 파트";
  };

  /** 박스 진입 — 패턴은 목록을 건너뛰고 다음 패턴으로 직행 */
  const hrefFor = (key: string, fallback: string) =>
    key === "pattern" && pattern?.nextId
      ? `/patterns/${pattern.nextId}`
      : fallback;

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: d, ease: EASE },
        };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-safe">
      {/* 은은한 배경 — 3색 아이덴티티 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
      >
        <div className="absolute left-1/2 top-[-120px] h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-[90px]" />
        <div className="absolute left-[16%] top-[40px] h-[200px] w-[260px] rounded-full bg-rose-200/20 blur-[80px]" />
        <div className="absolute right-[16%] top-[40px] h-[200px] w-[260px] rounded-full bg-amber-200/20 blur-[80px]" />
      </div>

      <div className="container-narrow relative z-10 px-5 pt-16 sm:pt-24">
        {/* ── 브랜딩 ───────────────────────────────── */}
        <motion.div {...rise(0)} className="text-center">
          <div className="inline-flex items-center gap-2.5">
            <Mark />
            <span className="text-[26px] font-black tracking-[-0.04em] text-neutral-900 sm:text-[30px]">
              퍼펙토익
            </span>
          </div>
          <p className="mt-3 text-[15px] font-medium tracking-[-0.01em] text-neutral-400 sm:text-[16px]">
            배우고 · 익히고 · 이긴다
          </p>
        </motion.div>

        {/* ── 3박스 ────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-3.5 pb-24 sm:grid-cols-3 sm:gap-4">
          {STAGES.map((s, i) => (
            <motion.button
              key={s.key}
              {...rise(0.14 + i * 0.06)}
              type="button"
              onClick={() => router.push(hrefFor(s.key, s.href))}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${s.bg} px-5 py-4 text-left ring-1 ${s.ring} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] sm:px-7 sm:py-7`}
            >
              {/* 모바일 = 한 줄 압축 / 데스크탑 = 세로 카드 */}
              <div className="flex items-center gap-4 sm:block">
                <div className="text-[28px] leading-none sm:hidden">{s.icon}</div>

                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10.5px] font-black tracking-[0.08em] ${s.text} sm:text-[11px]`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.step}
                  </span>

                  <div className="mt-4 hidden text-[30px] leading-none sm:block">
                    {s.icon}
                  </div>

                  <h2 className="mt-0.5 text-[18px] font-black tracking-[-0.02em] text-neutral-900 sm:mt-3 sm:text-[19px]">
                    {s.title}
                  </h2>
                  <p className="mt-0.5 text-[12.5px] text-neutral-500 sm:mt-1 sm:text-[13px]">
                    {s.sub}
                  </p>

                  <span
                    className={`mt-1 hidden text-[12px] font-bold tabular-nums sm:mt-5 sm:flex sm:items-center sm:justify-between ${s.text}`}
                  >
                    {stat(s.key)}
                    <span className="text-[15px] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>

                {/* 모바일 우측 지표 */}
                <span
                  className={`shrink-0 text-right text-[11.5px] font-bold tabular-nums ${s.text} sm:hidden`}
                >
                  {stat(s.key)}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}

/** 워드마크 — 3단계 3색을 품은 미니멀 마크 */
function Mark() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-neutral-900 shadow-sm"
    >
      <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400" />
      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-400" />
      <span className="absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-400" />
    </span>
  );
}
