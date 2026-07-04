"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { loadDiagnosticResult, type DiagnosticResult } from "@/game/diagnostic";

/** 실전 문항 수 라이브 집계 (실패 시 정적 폴백) */
interface Counts {
  rc: number;
  lc: number;
  warmup: number;
}
const FALLBACK: Counts = { rc: 830, lc: 330, warmup: 600 };

async function fetchCounts(): Promise<Counts> {
  const out = { ...FALLBACK };
  try {
    const [rcRes, lcRes] = await Promise.all([
      fetch("/api/sets").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/listening").then((r) => (r.ok ? r.json() : null)),
    ]);
    if (rcRes?.sets)
      out.rc = rcRes.sets.reduce(
        (n: number, s: any) => n + (s.questions?.length ?? 0),
        0,
      );
    if (lcRes?.sets)
      out.lc = lcRes.sets.reduce(
        (n: number, s: any) =>
          n + (s.part === 2 ? s.items?.length ?? 0 : s.questions?.length ?? 0),
        0,
      );
  } catch {
    /* 폴백 유지 */
  }
  return out;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LandingPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [counts, setCounts] = useState<Counts>(FALLBACK);
  const [diag, setDiag] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    fetchCounts().then(setCounts);
    setDiag(loadDiagnosticResult());
  }, []);

  const rise = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: EASE, delay },
        };

  const total = counts.rc + counts.lc;

  return (
    <main className="relative min-h-dvh overflow-hidden pb-safe">
      <AmbientBackdrop reduce={!!reduce} />

      {/* ── 상단 브랜드 바 ─────────────────────────── */}
      <header className="container-app relative z-10 flex items-center justify-between py-5">
        <Wordmark />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/diagnostic")}
            className="hidden rounded-full px-4 py-2 text-[13px] font-semibold text-neutral-500 transition hover:text-neutral-900 sm:inline-flex"
          >
            레벨 진단
          </button>
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="rounded-full bg-neutral-900 px-4 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-neutral-800 active:scale-95"
          >
            학습 시작
          </button>
        </div>
      </header>

      {/* ── 히어로 ─────────────────────────────────── */}
      <section className="container-app relative z-10 pt-10 text-center sm:pt-16 lg:pt-20">
        <motion.span
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[12px] font-semibold text-indigo-600 ring-1 ring-indigo-500/15 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
          최신 경향 · LC Part 2·3·4 · RC Part 5·6·7
        </motion.span>

        <motion.h1
          {...rise(0.06)}
          className="mx-auto mt-7 max-w-3xl text-[2.6rem] font-black leading-[1.05] tracking-[-0.03em] text-neutral-900 sm:text-[3.6rem] lg:text-[4.4rem]"
        >
          토익 만점,
          <br className="sm:hidden" />{" "}
          <span className="text-gradient">퍼펙토익</span>과
          <br />
          한 문제씩 완성하다
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-500 sm:text-[17px]"
        >
          파트·빈출 유형별 실전 문제, 원어민 리스닝, AI 대결, 레벨 진단까지.
          <br className="hidden sm:block" />
          지금 바로 한 문제 풀며 실전 감각을 끌어올리세요.
        </motion.p>

        {/* 핵심 CTA */}
        <motion.div
          {...rise(0.18)}
          className="mx-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="btn-primary group min-h-[54px] w-full px-8 text-[16px] sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              바로 문제 풀기
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/diagnostic")}
            className="min-h-[54px] w-full rounded-2xl bg-white px-8 text-[16px] font-bold text-neutral-800 ring-1 ring-neutral-900/[0.08] shadow-sm transition hover:ring-neutral-900/[0.16] active:scale-[0.99] sm:w-auto"
          >
            {diag ? `내 점수 ${diag.totalScore} · 다시 진단` : "무료 레벨 진단"}
          </button>
        </motion.div>

        {/* 신뢰 메트릭 */}
        <motion.div
          {...rise(0.24)}
          className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <Stat value={total} suffix="+" label="실전 문항" />
          <Divider />
          <Stat value={counts.lc} suffix="+" label="원어민 리스닝" />
          <Divider />
          <Stat value={6} label="파트 완전 커버" />
        </motion.div>
      </section>

      {/* ── 빠른 시작 (직관적 진입) ─────────────────── */}
      <section className="container-app relative z-10 mt-16 sm:mt-24">
        <motion.div {...rise(0)} className="mb-5 flex items-end justify-between">
          <div>
            <p className="label">빠른 시작</p>
            <h2 className="mt-1 text-[20px] font-extrabold tracking-tight text-neutral-900 sm:text-[24px]">
              한 번의 탭으로 바로 풀이
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <QuickCard
            index={0}
            reduce={!!reduce}
            onClick={() => router.push("/learn")}
            emoji="📖"
            title="리딩 유형별"
            sub={`Part 5·6·7 · ${counts.rc}문항`}
            gradient="from-indigo-500 via-violet-500 to-purple-600"
            span
          />
          <QuickCard
            index={1}
            reduce={!!reduce}
            onClick={() => router.push("/listening")}
            emoji="🎧"
            title="리스닝"
            sub={`Part 2·3·4 · ${counts.lc}문항`}
            gradient="from-cyan-500 to-sky-600"
          />
          <QuickCard
            index={2}
            reduce={!!reduce}
            onClick={() => router.push("/diagnostic")}
            emoji="🎯"
            title="레벨 진단"
            sub="30문항 · 예상 점수"
            gradient="from-violet-500 to-fuchsia-600"
          />
          <QuickCard
            index={3}
            reduce={!!reduce}
            onClick={() => router.push("/match")}
            emoji="🤖"
            title="AI 대결"
            sub="1:1 속도전"
            gradient="from-neutral-700 to-neutral-900"
          />
          <QuickCard
            index={4}
            reduce={!!reduce}
            onClick={() => router.push("/warmup")}
            emoji="🔥"
            title="몸풀기"
            sub="스토리 리딩·암기"
            gradient="from-amber-500 to-orange-600"
          />
          <QuickCard
            index={5}
            reduce={!!reduce}
            onClick={() => router.push("/tts")}
            emoji="🔊"
            title="발음 듣기"
            sub="원어민 TTS"
            gradient="from-emerald-500 to-teal-600"
          />
        </div>
      </section>

      {/* ── 왜 퍼펙토익 ────────────────────────────── */}
      <section className="container-app relative z-10 mt-20 sm:mt-28">
        <motion.div {...rise(0)} className="text-center">
          <p className="label">WHY PERFECTOEIC</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-[26px] font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-[34px]">
            점수가 오르는{" "}
            <span className="text-gradient-rose">이유</span>가 있습니다
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          <Feature
            reduce={!!reduce}
            index={0}
            icon="🎯"
            title="파트·유형별 집중"
            desc="Part 5·6·7 문법·독해, Part 2·3·4 리스닝을 빈출 유형으로 나눠 약점만 정조준합니다."
          />
          <Feature
            reduce={!!reduce}
            index={1}
            icon="🗣️"
            title="4개국 원어민 음원"
            desc="미국·영국·호주·캐나다 발음을 실전과 동일하게 섞어, 진짜 시험장 리스닝에 대비합니다."
          />
          <Feature
            reduce={!!reduce}
            index={2}
            icon="⚡"
            title="게임처럼 몰입"
            desc="AI 챌린저와의 속도전, 스토리 몸풀기, 레벨 진단으로 지루하지 않게 매일 이어갑니다."
          />
        </div>
      </section>

      {/* ── 마무리 CTA ─────────────────────────────── */}
      <section className="container-app relative z-10 mt-20 sm:mt-28">
        <motion.div
          {...rise(0)}
          className="surface-dark relative overflow-hidden px-7 py-12 text-center sm:px-12 sm:py-16"
        >
          <span className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-violet-500/30 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[32px]">
              오늘 한 문제가
              <br className="sm:hidden" /> 내일의 만점을 만듭니다
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
              가입 없이 지금 바로 시작하세요. 진도는 자동으로 저장됩니다.
            </p>
            <button
              type="button"
              onClick={() => router.push("/learn")}
              className="group mt-8 inline-flex min-h-[54px] items-center gap-2 rounded-2xl bg-white px-9 text-[16px] font-bold text-neutral-900 shadow-lg transition hover:shadow-xl active:scale-[0.98]"
            >
              무료로 시작하기
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── 푸터 ───────────────────────────────────── */}
      <footer className="container-app relative z-10 mt-16 flex flex-col items-center gap-3 border-t border-neutral-900/[0.06] py-10 text-center sm:mt-24">
        <Wordmark small />
        <p className="text-[12px] text-neutral-400">
          퍼펙토익 · TOEIC LC/RC 실전 학습 · 최신 경향 문제
        </p>
      </footer>
    </main>
  );
}

/* ────────────────────────────────────────────────── */

function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        className={`relative grid place-items-center rounded-[0.7rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-md ${
          small ? "h-7 w-7 text-[14px]" : "h-9 w-9 text-[18px]"
        }`}
      >
        <span className="font-black leading-none">P</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-fuchsia-300 ring-2 ring-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight text-neutral-900 ${
            small ? "text-[15px]" : "text-[18px]"
          }`}
        >
          퍼펙토익
        </span>
        {!small && (
          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            PerfecTOEIC
          </span>
        )}
      </span>
    </div>
  );
}

function AmbientBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.span
        className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-indigo-400/25 blur-[100px]"
        animate={reduce ? undefined : { y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -right-28 top-20 h-[26rem] w-[26rem] rounded-full bg-fuchsia-400/20 blur-[100px]"
        animate={reduce ? undefined : { y: [0, -26, 0], x: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-10 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-300/20 blur-[100px]"
        animate={reduce ? undefined : { y: [0, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="tabnum text-[26px] font-black leading-none text-neutral-900 sm:text-[30px]">
        <CountUp value={value} />
        {suffix}
      </p>
      <p className="mt-1.5 text-[12px] font-medium text-neutral-500">{label}</p>
    </div>
  );
}

function Divider() {
  return <span className="hidden h-8 w-px bg-neutral-900/10 sm:block" />;
}

/** 진입 시 0→value 카운트업 */
function CountUp({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return <>{n.toLocaleString()}</>;
}

function QuickCard({
  index,
  reduce,
  onClick,
  emoji,
  title,
  sub,
  gradient,
  span = false,
}: {
  index: number;
  reduce: boolean;
  onClick: () => void;
  emoji: string;
  title: string;
  sub: string;
  gradient: string;
  span?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.05 }}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex min-h-[128px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-5 text-left shadow-lg ring-1 ring-white/10 ${
        span ? "col-span-2 lg:col-span-1" : ""
      }`}
    >
      <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl transition-transform duration-500 group-hover:scale-150" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative text-[28px] drop-shadow-sm transition-transform group-hover:scale-110">
        {emoji}
      </span>
      <span className="relative">
        <span className="block text-[16px] font-extrabold text-white drop-shadow-sm sm:text-[17px]">
          {title}
        </span>
        <span className="mt-0.5 flex items-center gap-1 text-[12px] font-medium text-white/75">
          {sub}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </span>
    </motion.button>
  );
}

function Feature({
  reduce,
  index,
  icon,
  title,
  desc,
}: {
  reduce: boolean;
  index: number;
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.08 }}
      className="card-elevated group p-6 transition-transform hover:-translate-y-1 sm:p-7"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 text-[24px] ring-1 ring-indigo-500/10 transition-transform group-hover:scale-110">
        {icon}
      </span>
      <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-neutral-900">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{desc}</p>
    </motion.div>
  );
}
