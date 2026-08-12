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
import {
  loadService,
  saveService,
  SERVICES,
  type ServiceId,
} from "@/game/service";
import {
  loadIelts,
  ieltsSummary,
  type IeltsSummary,
  type IeltsSetSummary,
} from "@/game/ielts";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 3단계 아이덴티티 — 앱 전체를 관통하는 시각 언어.
 * 색 클래스는 **정적 문자열**로 둔다(런타임 조립은 Tailwind가 못 잡아 purge된다).
 */
const STAGES = [
  {
    key: "pattern",
    step: "STEP 1",
    icon: "📐",
    title: "패턴 연습",
    sub: "유형을 익힌다",
    href: "/patterns",
    text: "text-indigo-600",
    tint: "bg-indigo-50",
    rail: "bg-indigo-500",
    bar: "bg-gradient-to-r from-indigo-500 to-violet-500",
    ringOn: "ring-indigo-500/40",
    glow: "shadow-indigo-500/[0.12]",
  },
  {
    key: "game",
    step: "STEP 2",
    icon: "🎮",
    title: "토익 게임",
    sub: "3,000문제를 푼다",
    href: "/rank",
    text: "text-rose-600",
    tint: "bg-rose-50",
    rail: "bg-rose-500",
    bar: "bg-gradient-to-r from-rose-500 to-rose-400",
    ringOn: "ring-rose-500/40",
    glow: "shadow-rose-500/[0.12]",
  },
  {
    key: "real",
    step: "STEP 3",
    icon: "🎯",
    title: "실전 테스트",
    sub: "점수를 확인한다",
    href: "/mock",
    text: "text-amber-600",
    tint: "bg-amber-50",
    rail: "bg-amber-500",
    bar: "bg-gradient-to-r from-amber-500 to-amber-400",
    ringOn: "ring-amber-500/40",
    glow: "shadow-amber-500/[0.12]",
  },
] as const;

/**
 * 만점 아이엘츠 3박스 — 토익과 같은 시각 언어, 다른 여정.
 * 아직 열지 않은 영역을 숨기지 않는다. 무엇이 준비 중인지 보이는 편이 정직하다.
 */
const IELTS_STAGES = [
  {
    key: "ielts-listening",
    step: "STEP 1",
    icon: "🎧",
    title: "리스닝",
    sub: "덫을 막아낸다",
    href: "/ielts",
    live: true,
    text: "text-teal-600",
    tint: "bg-teal-50",
    rail: "bg-teal-500",
    bar: "bg-gradient-to-r from-teal-500 to-emerald-500",
    ringOn: "ring-teal-500/40",
    glow: "shadow-teal-500/[0.12]",
  },
  {
    key: "ielts-reading",
    step: "STEP 2",
    icon: "📖",
    title: "리딩",
    sub: "T/F/NG를 가른다",
    href: "/ielts",
    live: false,
    text: "text-neutral-400",
    tint: "bg-neutral-100",
    rail: "bg-neutral-300",
    bar: "bg-neutral-300",
    ringOn: "ring-neutral-900/10",
    glow: "shadow-neutral-900/[0.04]",
  },
  {
    key: "ielts-writing",
    step: "STEP 3",
    icon: "✍️",
    title: "라이팅·스피킹",
    sub: "템플릿으로 쓴다",
    href: "/ielts",
    live: false,
    text: "text-neutral-400",
    tint: "bg-neutral-100",
    rail: "bg-neutral-300",
    bar: "bg-neutral-300",
    ringOn: "ring-neutral-900/10",
    glow: "shadow-neutral-900/[0.04]",
  },
] as const;

/** 두 서비스가 같은 껍데기를 쓰도록 정규화한 박스 모델 */
interface LandingCard {
  key: string;
  step: string;
  icon: string;
  title: string;
  sub: string;
  href: string;
  text: string;
  tint: string;
  rail: string;
  bar: string;
  ringOn: string;
  glow: string;
  stat: string;
  pct: number;
  state: "todo" | "current" | "done";
}

export default function LandingPage() {
  const router = useRouter();
  const reduce = useReducedMotion();

  /** 어떤 서비스를 보고 있는가 — 마지막 선택을 기억한다 */
  const [service, setService] = useState<ServiceId>("toeic");
  const [ieltsSets, setIeltsSets] = useState<IeltsSetSummary[] | null>(null);
  const [ieltsSum, setIeltsSum] = useState<IeltsSummary | null>(null);

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

  // 서비스 선택 복원 + 만점 아이엘츠 진도
  useEffect(() => {
    setService(loadService());
    fetch("/api/ielts")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const raw = (d?.sets ?? []) as {
          id: string;
          questions: unknown[];
        }[];
        const light = raw.map((s) => ({
          id: s.id,
          questions: s.questions?.length ?? 0,
        }));
        setIeltsSets(light as unknown as IeltsSetSummary[]);
        setIeltsSum(ieltsSummary(loadIelts(), light));
      })
      .catch(() => setIeltsSets([]));
  }, []);

  function pickService(id: ServiceId) {
    setService(id);
    saveService(id);
  }

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

  /** 선택된 서비스의 3박스 */
  const cards: LandingCard[] = useMemo(() => {
    if (service === "ielts") {
      const studied = ieltsSum?.studied ?? 0;
      const totalSets = ieltsSum?.totalSets ?? ieltsSets?.length ?? 0;
      return IELTS_STAGES.map((s) => {
        if (!s.live) {
          return { ...s, stat: "준비 중", pct: 0, state: "todo" as const };
        }
        const pct = totalSets > 0 ? Math.round((studied / totalSets) * 100) : 0;
        return {
          ...s,
          stat: totalSets > 0 ? `${studied} / ${totalSets} 세트` : "준비 중",
          pct,
          state: (studied >= totalSets && totalSets > 0
            ? "done"
            : "current") as LandingCard["state"],
        };
      });
    }
    return STAGES.map((s) => {
      const step = journey.steps[s.key as JourneyStepKey];
      return {
        ...s,
        href: hrefFor(s.key, s.href),
        stat: step.stat,
        pct: step.pct,
        state: step.state,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, journey, pattern, ieltsSum, ieltsSets]);

  /** 지금 해야 할 일 한 줄 */
  const hint =
    service === "ielts"
      ? ieltsSum && ieltsSum.studied > 0
        ? `함정 방어율 ${ieltsSum.trapRate}% · 추정 Band ${ieltsSum.band.toFixed(1)}`
        : `덫을 막는 훈련부터 시작하세요 · ${ieltsSum?.totalSets ?? ieltsSets?.length ?? 0}세트 준비됨`
      : journeyHint(journey);

  const isIelts = service === "ielts";

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: d, ease: EASE },
        };

  return (
    <main className="relative min-h-dvh bg-neutral-50 pb-safe">
      {/* ══ 다크 히어로 — 밝은 카드가 얹힐 무대 ══════════════ */}
      <section className="relative flex min-h-[56vh] flex-col justify-center overflow-hidden rounded-b-[2.5rem] bg-neutral-950 pb-32 pt-10 sm:pb-40 sm:pt-14 lg:min-h-[60vh]">
        {/* 앰비언트 — 서비스 아이덴티티를 빛으로 */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {isIelts ? (
            <>
              <div className="absolute left-1/2 top-[-180px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-teal-500/25 blur-[110px]" />
              <div className="absolute right-[8%] top-[60px] h-[260px] w-[320px] rounded-full bg-emerald-500/[0.18] blur-[100px]" />
            </>
          ) : (
            <>
              <div className="absolute left-1/2 top-[-180px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-[110px]" />
              <div className="absolute left-[6%] top-[70px] h-[240px] w-[300px] rounded-full bg-rose-500/[0.16] blur-[100px]" />
              <div className="absolute right-[6%] top-[70px] h-[240px] w-[300px] rounded-full bg-amber-500/[0.14] blur-[100px]" />
            </>
          )}
        </div>

        {/* 미세 격자 — 평평한 검정에 깊이를 준다 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-2xl px-5 text-center lg:max-w-5xl">
          {/* 서비스 선택 — 매번 고르게 하지 않고 마지막 선택을 기억한다 */}
          <motion.div {...rise(0)} className="flex justify-center">
            <div className="inline-flex rounded-full bg-white/[0.07] p-1 ring-1 ring-white/10 backdrop-blur">
              {(Object.keys(SERVICES) as ServiceId[]).map((id) => {
                const on = service === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pickService(id)}
                    aria-pressed={on}
                    className={`relative rounded-full px-4 py-1.5 text-[12.5px] font-black transition sm:px-5 ${
                      on ? "text-neutral-950" : "text-white/55 hover:text-white/90"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="service-pill"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-lg"
                      />
                    )}
                    <span className="relative">
                      {SERVICES[id].icon} {SERVICES[id].short}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* 워드마크 — 크게, 브랜드가 먼저 눈에 들어오게 */}
          <motion.div {...rise(0.06)} className="mt-9">
            <div className="flex items-center justify-center gap-3">
              <Mark service={service} />
              <h1 className="text-[38px] font-black leading-none tracking-[-0.045em] text-white sm:text-[52px]">
                {isIelts ? "만점 아이엘츠" : "퍼펙토익"}
              </h1>
            </div>

            <p className="mx-auto mt-5 max-w-md text-balance text-[15px] font-medium leading-relaxed tracking-[-0.01em] text-white/45 sm:text-[17px]">
              {isIelts ? (
                <>
                  안 들려서 틀리는 게 아니다 ·{" "}
                  <b className="font-black text-white/80">덫에 걸려서</b> 틀린다
                </>
              ) : (
                <>
                  패턴을 익히고 ·{" "}
                  <b className="font-black text-white/80">3,000문제</b>를 풀고 · 실전으로
                </>
              )}
            </p>
          </motion.div>

          {/* 지금 해야 할 일 한 줄 — 여정의 나침반 */}
          <motion.div {...rise(0.12)} className="mt-7 flex justify-center">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[12.5px] font-bold text-white/70 ring-1 ring-white/10 backdrop-blur">
              <span
                className={`h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${
                  isIelts ? "bg-teal-400" : "bg-emerald-400"
                }`}
              />
              <span className="truncate">{hint}</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══ 3박스 — 히어로를 파고들며 떠오른다 ═══════════════ */}
      <div className="relative z-10 mx-auto -mt-24 w-full max-w-2xl px-5 sm:-mt-28 lg:max-w-5xl">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
          {cards.map((s, i) => {
            const isCurrent = s.state === "current";
            const isDone = s.state === "done";
            return (
              <motion.div key={s.key} {...rise(0.18 + i * 0.07)} className="relative">
                {/* 게임 박스만 — 파트·난이도 설정(탭하면 바로 시작, ⚙는 조건 변경) */}
                {s.key === "game" && (
                  <button
                    type="button"
                    aria-label="파트·난이도 설정"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSetupOpen(true);
                    }}
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-neutral-50 text-[15px] text-neutral-400 ring-1 ring-neutral-900/[0.06] transition hover:bg-white hover:text-neutral-900"
                  >
                    ⚙
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => router.push(s.href)}
                  className={`group relative block w-full overflow-hidden rounded-[1.75rem] bg-white px-5 py-4 text-left transition duration-300 hover:-translate-y-1 active:scale-[0.99] sm:px-6 sm:py-7 ${
                    isCurrent
                      ? `shadow-[0_2px_6px_rgba(16,24,40,0.05),0_28px_60px_-28px_rgba(16,24,40,0.4)] ring-2 ${s.ringOn}`
                      : "shadow-[0_2px_6px_rgba(16,24,40,0.04),0_20px_44px_-28px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06]"
                  } hover:shadow-[0_4px_10px_rgba(16,24,40,0.06),0_36px_70px_-30px_rgba(16,24,40,0.45)]`}
                >
                  {/* 좌측 컬러 레일 — 단계의 정체성 */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 ${s.rail} ${
                      isCurrent ? "" : "opacity-40"
                    }`}
                  />

                  <div className="flex items-center gap-4 sm:block">
                    {/* 아이콘 타일 */}
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[24px] ${s.tint} ring-1 ring-neutral-900/[0.04] sm:h-14 sm:w-14 sm:text-[27px]`}
                    >
                      {s.icon}
                    </span>

                    <div className="min-w-0 flex-1 sm:mt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10.5px] font-black tracking-[0.1em] ${s.text} sm:text-[11px]`}
                      >
                        {s.step}
                        {isCurrent && (
                          <span className="ml-0.5 rounded-full bg-neutral-900 px-2 py-0.5 text-[9.5px] font-black tracking-normal text-white">
                            지금 여기
                          </span>
                        )}
                        {isDone && (
                          <span className="ml-0.5 text-[11px] text-emerald-600">✓</span>
                        )}
                      </span>

                      <h2 className="mt-1 text-[18px] font-black tracking-[-0.025em] text-neutral-900 sm:mt-1.5 sm:text-[21px]">
                        {s.title}
                      </h2>
                      <p className="mt-0.5 text-[12.5px] text-neutral-400 sm:text-[13px]">
                        {s.sub}
                      </p>

                      {/* 단계 진행바 — 데스크탑 */}
                      <div className="mt-6 hidden sm:block">
                        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                          <motion.div
                            className={`h-full rounded-full ${s.bar}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(s.pct, 1.5)}%` }}
                            transition={{
                              duration: reduce ? 0 : 0.9,
                              ease: EASE,
                              delay: 0.35,
                            }}
                          />
                        </div>
                        <span className="mt-2.5 flex items-center justify-between text-[12.5px] font-black tabular-nums text-neutral-800">
                          {s.stat}
                          <span
                            className={`text-[15px] ${s.text} transition-transform group-hover:translate-x-1`}
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* 모바일 우측 지표 */}
                    <span
                      className={`shrink-0 text-right text-[11.5px] font-black tabular-nums ${s.text} sm:hidden`}
                    >
                      {s.stat}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 복습·약점 진입 — 토익 기록이 있을 때만 나타난다 */}
        {service === "toeic" && <ReviewNudge />}

        <div className="h-24 lg:h-16" />
      </div>

      {/* 파트·난이도 설정 시트 — 여기서 고르면 다음부터 그 조건으로 바로 시작 */}
      {setupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/60 px-4 pb-6 backdrop-blur-sm sm:items-center"
          onClick={() => setSetupOpen(false)}
        >
          <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
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

/** 워드마크 — 3단계 3색을 품은 미니멀 마크. 아이엘츠는 밴드 상승을 뜻하는 3단 계단. */
function Mark({ service = "toeic" }: { service?: ServiceId }) {
  if (service === "ielts") {
    return (
      <span
        aria-hidden
        className="relative inline-flex h-11 w-11 items-end justify-center gap-[3.5px] rounded-[14px] bg-white/[0.08] px-2 pb-2 ring-1 ring-white/15 backdrop-blur sm:h-14 sm:w-14 sm:gap-1 sm:px-2.5 sm:pb-2.5"
      >
        <span className="h-2 w-1.5 rounded-[2px] bg-teal-400/50 sm:w-2" />
        <span className="h-3.5 w-1.5 rounded-[2px] bg-teal-400/75 sm:w-2" />
        <span className="h-5 w-1.5 rounded-[2px] bg-emerald-400 sm:h-6 sm:w-2" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/[0.08] ring-1 ring-white/15 backdrop-blur sm:h-14 sm:w-14"
    >
      <span className="absolute left-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-400 sm:left-3 sm:top-3 sm:h-2.5 sm:w-2.5" />
      <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-400 sm:right-3 sm:top-3 sm:h-2.5 sm:w-2.5" />
      <span className="absolute bottom-2.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-400 sm:bottom-3 sm:h-2.5 sm:w-2.5" />
    </span>
  );
}
