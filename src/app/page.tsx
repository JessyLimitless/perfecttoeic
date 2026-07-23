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
import {
  loadPatternStats,
  patternProgress,
  type PatternChapter,
} from "@/game/patterns";
import { loadMockHistory } from "@/game/mock";
import { buildJourney, journeyHint, type JourneyStepKey } from "@/game/journey";
import { lastMatchRoute } from "@/game/match/lastMatch";
import MatchSetupBar from "@/components/match/MatchSetupBar";
import ReviewNudge from "@/components/report/ReviewNudge";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 3단계 아이덴티티 — 앱 전체를 관통하는 시각 언어 */
const STAGES = [
  {
    key: "pattern",
    step: "STEP 1",
    icon: "📐",
    title: "패턴 연습",
    sub: "유형을 익힌다",
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
    sub: "3,000문제를 푼다",
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
    title: "실전 테스트",
    sub: "점수를 확인한다",
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
  const [mockAttempts, setMockAttempts] = useState(0);
  /** 대결 조건(파트·난이도) 설정 시트 */
  const [setupOpen, setSetupOpen] = useState(false);

  useEffect(() => {
    setMockAttempts(loadMockHistory().length);

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

  /** 900점 여정 — 패턴 → 게임 3,000문제 → 실전 */
  const journey = useMemo(
    () =>
      buildJourney({
        patternStudied: pattern?.studied ?? 0,
        patternTotal: pattern?.total,
        solvedQuestions: view?.masteredTotal ?? 0,
        bankTotal: view?.grandTotal,
        mockAttempts,
      }),
    [pattern, view, mockAttempts],
  );

  const stat = (key: string) => journey.steps[key as JourneyStepKey].stat;

  /**
   * 박스 진입 — 중간 화면 없이 바로 본론으로.
   * - 패턴: 목록을 건너뛰고 다음 패턴으로 직행
   * - 게임: 마지막으로 겨룬 파트로 대결 직행 (최초엔 RC Part 7)
   */
  const hrefFor = (key: string, fallback: string) => {
    if (key === "pattern" && pattern?.nextId) return `/patterns/${pattern.nextId}`;
    if (key === "game") return lastMatchRoute();
    return fallback;
  };

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
            패턴을 익히고 · 3,000문제를 풀고 · 실전으로
          </p>

          {/* 지금 해야 할 일 한 줄 — 여정의 나침반 */}
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12.5px] font-bold text-neutral-700 shadow-sm ring-1 ring-neutral-900/[0.06]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {journeyHint(journey)}
          </p>
        </motion.div>

        {/* ── 3박스 ────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-3.5 pb-24 sm:grid-cols-3 sm:gap-4">
          {STAGES.map((s, i) => {
            const step = journey.steps[s.key as JourneyStepKey];
            const isCurrent = step.state === "current";
            const isDone = step.state === "done";
            return (
            <motion.div key={s.key} {...rise(0.14 + i * 0.06)} className="relative">
            {/* 게임 박스만 — 파트·난이도 설정(탭하면 바로 시작, ⚙는 조건 변경) */}
            {s.key === "game" && (
              <button
                type="button"
                aria-label="파트·난이도 설정"
                onClick={(e) => {
                  e.stopPropagation();
                  setSetupOpen(true);
                }}
                className="absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-[15px] text-neutral-500 shadow-sm ring-1 ring-neutral-900/[0.06] transition hover:bg-white hover:text-neutral-900"
              >
                ⚙
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push(hrefFor(s.key, s.href))}
              className={`group relative block w-full overflow-hidden rounded-3xl bg-gradient-to-b ${s.bg} px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] sm:px-7 sm:py-7 ${
                isCurrent
                  ? `ring-2 ${s.ring.replace("/20", "/50")} shadow-md`
                  : `ring-1 ${s.ring} ${isDone ? "" : "opacity-[0.92]"}`
              }`}
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
                    {isCurrent && (
                      <span className="ml-1 rounded-full bg-neutral-900 px-2 py-0.5 text-[9.5px] font-black tracking-normal text-white">
                        지금 여기
                      </span>
                    )}
                    {isDone && (
                      <span className="ml-1 text-[11px] text-emerald-600">✓</span>
                    )}
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

                  {/* 단계 진행바 — 데스크탑 */}
                  <div className="mt-5 hidden sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/70 ring-1 ring-black/[0.04]">
                      <motion.div
                        className={`h-full rounded-full ${s.dot}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(step.pct, 1.5)}%` }}
                        transition={{
                          duration: reduce ? 0 : 0.8,
                          ease: EASE,
                          delay: 0.3,
                        }}
                      />
                    </div>
                    <span
                      className={`mt-2 flex items-center justify-between text-[12px] font-bold tabular-nums ${s.text}`}
                    >
                      {stat(s.key)}
                      <span className="text-[15px] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>

                {/* 모바일 우측 지표 */}
                <span
                  className={`shrink-0 text-right text-[11.5px] font-bold tabular-nums ${s.text} sm:hidden`}
                >
                  {stat(s.key)}
                </span>
              </div>
            </button>
            </motion.div>
            );
          })}
        </div>

        {/* 복습·약점 진입 — 기록이 있을 때만 나타난다 */}
        <ReviewNudge />
      </div>

      {/* 파트·난이도 설정 시트 — 여기서 고르면 다음부터 그 조건으로 바로 시작 */}
      {setupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/50 px-4 pb-6 backdrop-blur-sm sm:items-center"
          onClick={() => setSetupOpen(false)}
        >
          <div
            className="w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <MatchSetupBar title="대결 조건" onStartLabel="대결 시작" />
            <button
              type="button"
              onClick={() => setSetupOpen(false)}
              className="mt-2 w-full rounded-xl bg-white py-2.5 text-[13px] font-bold text-neutral-700 shadow-sm ring-1 ring-neutral-900/10"
            >
              닫기
            </button>
          </div>
        </div>
      )}
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
