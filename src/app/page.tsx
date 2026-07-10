"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { loadDiagnosticResult, type DiagnosticResult } from "@/game/diagnostic";
import MasteryBoard from "@/components/progression/MasteryBoard";
import ListeningProgressCard from "@/components/listening/ListeningProgressCard";
import BackupCard from "@/components/ui/BackupCard";
import JennyOriginalArt from "@/components/match/JennyOriginalArt";
import { useCharacter, CHARACTERS, saveCharacterId, josa, hasBatchim } from "@/game/match/characters";
import { useBgm } from "@/components/ui/BgmProvider";

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
  const character = useCharacter();
  const [counts, setCounts] = useState<Counts>(FALLBACK);
  const [diag, setDiag] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    fetchCounts().then(setCounts);
    setDiag(loadDiagnosticResult());
  }, []);

  // 랜딩 대결 CTA → 곧장 리딩 랭크 대결(파트 5·6·7 중 자동). /rank 중간 화면은 별도 메뉴로만.
  const startRankMatch = () =>
    router.push(`/match?ranked=1&part=${5 + Math.floor(Math.random() * 3)}`);

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
      <section className="container-app relative z-10 pt-8 text-center sm:pt-12 lg:pt-14">
        {/* 제니 브랜드 히어로 (최상단 전면 + 음악 통합) */}
        <JennyBrandHero reduce={!!reduce} />

        <motion.span
          {...rise(0)}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[12px] font-semibold text-indigo-600 ring-1 ring-indigo-500/15 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
          나 vs {character.name} · 마스터까지 가는 토익 모험
        </motion.span>

        <motion.h1
          {...rise(0.06)}
          className="mx-auto mt-7 max-w-3xl text-[2.6rem] font-black leading-[1.05] tracking-[-0.03em] text-neutral-900 sm:text-[3.6rem] lg:text-[4.4rem]"
        >
          토익을 게임처럼,
          <br />
          <span className="text-gradient">풀수록 정복</span>이
          <br className="sm:hidden" /> 쌓인다
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mx-auto mt-6 max-w-xl px-2 text-[15px] leading-relaxed text-neutral-500 sm:px-0 sm:text-[17px]"
        >
          라이벌 <b className="font-bold text-neutral-700">{character.name}</b>{hasBatchim(character.name) ? "을" : "를"} 이기며
          루키에서 <b className="font-bold text-neutral-700">그랜드마스터</b>까지.
          6개 영역의 모든 문항을 하나씩 정복해 실전 만점에 달려가는, 나만의 토익
          모험이 시작됩니다.
        </motion.p>

        {/* 핵심 CTA */}
        <motion.div
          {...rise(0.18)}
          className="mx-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={startRankMatch}
            className="btn-dark group min-h-[54px] w-full px-8 text-[16px] sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              ⚔️ 랭크 대결 시작
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
            {diag ? `내 점수 ${diag.totalScore} · 다시 진단` : "무료 실력 테스트"}
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

      {/* ── 랭크 대결 (플래그십) ─────────────────────── */}
      <section className="container-app relative z-10 mt-16 sm:mt-24">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="surface-dark relative overflow-hidden px-6 py-9 sm:px-10 sm:py-12"
        >
          {/* 앰비언트 글로우 */}
          <span className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            {/* 좌: 카피 */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold text-white/90 ring-1 ring-white/15">
                ⚔️ 메인 모드 · CONQUEST
              </span>
              <h2 className="mt-5 text-[28px] font-black leading-[1.1] tracking-tight text-white sm:text-[38px]">
                문제를 풀수록{" "}
                <span className="text-gradient-rose">정복</span>이 쌓인다
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                토익 문제풀이를 완전히 게임화한 퍼펙토익의 시그니처 모드.
                맞힌 문항을 하나씩 정복해 정복 등급을 올리고 챔피언 {character.name}에게
                도전하세요. {josa(character.name, "은", "는")} 내 정복 진척에 맞춰 점점 강해집니다.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <RankPoint icon="📈" text="정복도·등급 상승 시스템" />
                <RankPoint icon="💗" text={`라이벌 ${josa(character.name, "과", "와")}의 스토리 대결`} />
                <RankPoint icon="🗺️" text="루키→그랜드마스터 여정" />
                <RankPoint icon="✨" text="대결마다 정복도 충전" />
              </ul>

              <button
                type="button"
                onClick={startRankMatch}
                className="group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-2xl bg-white px-8 text-[16px] font-bold text-neutral-900 shadow-lg transition hover:shadow-xl active:scale-[0.98]"
              >
                랭크 대결 시작
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* 우: 마스터로 가는 길 (제니와의 여정) */}
            <div className="relative hidden lg:block">
              <RoadToMaster reduce={!!reduce} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 정복 현황 (파트별 모니터링) ──────────────── */}
      <section className="container-app relative z-10 mt-16 sm:mt-24">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <MasteryBoard />
        </motion.div>

        {/* 리스닝 세트 진행 요약 (진행 있을 때만 렌더) */}
        <div className="mt-4 sm:mt-5">
          <ListeningProgressCard />
        </div>

        {/* 기기 내 저장 백업·복원 (서버 없이 이 기기에서만) */}
        <div className="mt-4 sm:mt-5">
          <BackupCard />
        </div>
      </section>

      {/* ── 그 외 학습 콘텐츠 ───────────────────────── */}
      <section className="container-app relative z-10 mt-16 sm:mt-24">
        <motion.div {...rise(0)} className="mb-5 flex items-end justify-between">
          <div>
            <p className="label">그 외 학습 콘텐츠</p>
            <h2 className="mt-1 text-[20px] font-extrabold tracking-tight text-neutral-900 sm:text-[24px]">
              몸풀기·실력 다지기
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
            sub="실력 테스트 · 예상 점수"
            gradient="from-violet-500 to-fuchsia-600"
          />
          <QuickCard
            index={3}
            reduce={!!reduce}
            onClick={() => router.push("/mock")}
            emoji="📝"
            title="실전 모의고사"
            sub="풀렝스 LC+RC · 예상 점수"
            gradient="from-emerald-600 via-teal-600 to-cyan-700"
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
            title="정복으로 경쟁하는 재미"
            desc={`맞힌 문항이 곧 정복도가 되는 대결로 라이벌 ${character.name}에게 도전하며, 6개 영역을 하나씩 정복해 실전 만점까지 달려갑니다.`}
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

function RankPoint({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-3.5 py-2.5 ring-1 ring-white/10">
      <span className="text-[16px]">{icon}</span>
      <span className="text-[13px] font-semibold text-white/85">{text}</span>
    </li>
  );
}

/** 라이벌 제니 브랜드 히어로 — 랜딩 최상단 전면. 대형 이미지 + 배경음악 컨트롤 통합. */
function JennyBrandHero({ reduce }: { reduce: boolean }) {
  const character = useCharacter();
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [character.id]);
  const bgm = useBgm();
  const playing = !!bgm?.playing;
  const muted = !!bgm?.muted;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 14 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto flex w-full max-w-md flex-col items-center"
    >
      <div className="relative">
        {/* 뒤 글로우 */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-br ${character.gradient} opacity-40 blur-3xl`}
        />
        {/* 회전 링 */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[2.4rem] bg-gradient-to-tr from-fuchsia-400/50 via-transparent to-sky-400/50 blur-md"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative h-44 w-44 overflow-hidden rounded-[2rem] ring-2 ring-white/40 shadow-[0_36px_80px_-28px_rgba(217,70,239,0.65)] sm:h-52 sm:w-52">
          {broken ? (
            <JennyOriginalArt size={208} expression="idle" className="h-full w-full" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={character.images.idle}
              alt={`라이벌 ${character.name}`}
              onError={() => setBroken(true)}
              className="h-full w-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-white ring-1 ring-white/25 backdrop-blur-sm">
              👑 라이벌
            </span>
          </div>
        </div>

        {/* 재생 중 이퀄라이저 뱃지 */}
        {playing && (
          <span className="absolute -right-1 -top-1 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 shadow-lg ring-2 ring-white">
            <MiniEq />
          </span>
        )}
      </div>

      <p className="mt-4 text-[15px] font-black tracking-tight text-neutral-900">
        라이벌 <span className="text-gradient-rose">{character.name}</span>
      </p>

      {/* 캐릭터 선택 — 빌류킹 / 제니 */}
      <div className="mt-3 flex items-center gap-2 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-neutral-900/[0.06] backdrop-blur-sm">
        {CHARACTERS.map((c) => {
          const active = c.id === character.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => saveCharacterId(c.id)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[12px] font-bold transition ${
                active
                  ? `bg-gradient-to-r ${c.gradient} text-white shadow-sm`
                  : "text-neutral-500 hover:bg-neutral-900/[0.04]"
              }`}
            >
              <span className="h-6 w-6 overflow-hidden rounded-full ring-1 ring-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.images.idle} alt={c.name} className="h-full w-full object-cover" />
              </span>
              {c.name}
            </button>
          );
        })}
      </div>

      {/* 배경음악 컨트롤 — 제니 테마곡 */}
      {bgm && (
        <button
          type="button"
          onClick={bgm.toggle}
          disabled={muted}
          className="group mt-3 inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 shadow-sm ring-1 ring-neutral-900/[0.06] backdrop-blur-sm transition hover:ring-neutral-900/[0.14] disabled:opacity-60"
        >
          <span
            className={`grid h-8 w-8 place-items-center rounded-full text-white ${
              playing ? `bg-gradient-to-br ${bgm.track.grad}` : "bg-neutral-800"
            }`}
          >
            {playing ? <MiniPause /> : <MiniPlay />}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[12px] font-bold text-neutral-800">
              {bgm.track.emoji} {bgm.track.label}
            </span>
            <span className="block text-[10px] font-semibold text-neutral-400">
              {muted ? "학습 중 음소거" : playing ? "재생 중 · 눌러서 정지" : "테마곡 재생"}
            </span>
          </span>
        </button>
      )}
    </motion.div>
  );
}

function MiniEq() {
  return (
    <span className="flex items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-white"
          animate={{ height: [4, 12, 6, 10, 4] }}
          transition={{ duration: 0.9 + i * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          style={{ height: 6 }}
        />
      ))}
    </span>
  );
}
function MiniPlay() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}
function MiniPause() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6.5" y="5" width="4" height="14" rx="1.4" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.4" />
    </svg>
  );
}

/** 정복의 길 — 루키에서 시작해 정상의 그랜드마스터(실전 만점)까지. 빌류킹은 정상의 최종 상대. */
function RoadToMaster({ reduce }: { reduce: boolean }) {
  const character = useCharacter();
  // 정상(그랜드마스터)부터 아래로
  const steps: {
    tier: string;
    emoji: string;
    grad: string;
    who?: string;
    boss?: boolean;
    me?: boolean;
  }[] = [
    { tier: "그랜드마스터", emoji: "🏆", who: `실전 만점 · ${character.name} 격파`, grad: "from-amber-300 to-yellow-500", boss: true },
    { tier: "엘리트", emoji: "🔥", grad: "from-amber-400 to-orange-500" },
    { tier: "프로", emoji: "⚡", grad: "from-indigo-400 to-violet-500" },
    { tier: "컨텐더", emoji: "🏃", grad: "from-sky-400 to-cyan-500" },
    { tier: "챌린저", emoji: "🎽", grad: "from-teal-400 to-emerald-500" },
    { tier: "루키", emoji: "🥾", who: "여기서 시작", grad: "from-slate-400 to-slate-500", me: true },
  ];

  return (
    <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/40">
          Road to Grandmaster
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/70">
          나 vs {character.name}
        </span>
      </div>
      <div className="mt-4 space-y-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.tier}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${
              s.boss
                ? "bg-gradient-to-r from-fuchsia-500/25 to-violet-500/15 ring-1 ring-fuchsia-400/30"
                : s.me
                  ? "bg-white/[0.1] ring-1 ring-white/20"
                  : "bg-white/[0.03]"
            }`}
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.grad} text-[18px] shadow`}>
              {s.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-black text-white">{s.tier}</span>
              {s.who && (
                <span className={`block text-[11px] font-semibold ${s.boss ? "text-fuchsia-200" : "text-white/50"}`}>
                  {s.who}
                </span>
              )}
            </span>
            {s.boss && <span className="text-[11px]">🔥</span>}
            {s.me && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-neutral-900">나</span>}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-[12px] font-semibold text-white/50">
        영역을 정복하며 한 계단씩 — 실전 만점까지
      </p>
    </div>
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
