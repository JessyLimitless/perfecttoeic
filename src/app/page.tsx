"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PartSelector from "@/components/lobby/PartSelector";
import TypeSelector from "@/components/lobby/TypeSelector";
import ProgressCard from "@/components/lobby/ProgressCard";
import WarmupDashboard, {
  type WarmupDeckSummary,
} from "@/components/warmup/WarmupDashboard";
import { loadProgress, resetProgress, type Progress } from "@/game/progress";
import { loadWarmupProgress, type WarmupProgress } from "@/game/warmup";
import { loadMemorize, type MemorizeStore } from "@/game/memorize";
import { loadOrder, type OrderStore } from "@/game/order";
import { usePracticeStore } from "@/game/store";
import {
  normalizeCategory,
  QUESTION_TYPE_ORDER,
  type QuestionType,
  type TypeFilter,
} from "@/game/questionTypes";
import { PART_META, partOf } from "@/game/parts";
import type { Part, PassageSet } from "@/game/types";

/** MD 기출 은행 전체를 한 번 불러온다 (실패 시 null → 로컬 폴백) */
async function fetchBank(): Promise<PassageSet[] | null> {
  try {
    const r = await fetch("/api/sets");
    if (!r.ok) return null;
    const { sets } = (await r.json()) as { sets: PassageSet[] };
    return Array.isArray(sets) && sets.length > 0 ? sets : null;
  } catch {
    return null;
  }
}

const EMPTY_TYPE_COUNTS = QUESTION_TYPE_ORDER.reduce(
  (acc, t) => ({ ...acc, [t]: 0 }),
  {} as Record<QuestionType, number>,
);

export default function HomePage() {
  const router = useRouter();
  const start = usePracticeStore((s) => s.start);
  const [part, setPart] = useState<Part>(7);
  const [type, setType] = useState<TypeFilter>("ALL");
  const [bank, setBank] = useState<PassageSet[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);

  // 몸풀기(Warm-up) 진도 대시보드용 — 덱 요약 + 3모드 로컬 진도
  const [warmDecks, setWarmDecks] = useState<WarmupDeckSummary[] | null>(null);
  const [warmProgress, setWarmProgress] = useState<WarmupProgress>({});
  const [warmMemo, setWarmMemo] = useState<MemorizeStore>({});
  const [warmOrder, setWarmOrder] = useState<OrderStore>({});

  // 로비 진입 시 기출 은행을 미리 불러와 파트·유형별 문항 수를 집계한다
  useEffect(() => {
    let alive = true;
    fetchBank().then((sets) => {
      if (alive) setBank(sets);
    });
    fetch("/api/warmup")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.decks)) setWarmDecks(d.decks);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 저장된 학습 진도 불러오기 (클라이언트 전용)
  useEffect(() => {
    setProgress(loadProgress());
    setWarmProgress(loadWarmupProgress());
    setWarmMemo(loadMemorize());
    setWarmOrder(loadOrder());
  }, []);

  // 파트별 문항 수
  const partCounts = useMemo(() => {
    const c: Record<Part, number> = { 5: 0, 6: 0, 7: 0 };
    for (const s of bank ?? []) c[partOf(s)] += s.questions.length;
    return c;
  }, [bank]);

  // 전체 문항 수
  const grandTotal = useMemo(
    () => partCounts[5] + partCounts[6] + partCounts[7],
    [partCounts],
  );

  // Part 7 빈출 유형별 문항 수
  const { typeCounts, typeTotal } = useMemo(() => {
    const c: Record<QuestionType, number> = { ...EMPTY_TYPE_COUNTS };
    let t = 0;
    for (const s of bank ?? []) {
      if (partOf(s) !== 7) continue;
      for (const q of s.questions) {
        c[normalizeCategory(q.category)] += 1;
        t += 1;
      }
    }
    return { typeCounts: c, typeTotal: t };
  }, [bank]);

  const handleStart = async () => {
    setLoading(true);
    const sets = bank ?? (await fetchBank());
    if (!bank && sets) setBank(sets);
    start({
      part,
      type: part === 7 ? type : "ALL",
      sets: sets ?? undefined,
    });
    router.push("/game");
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="container-app min-h-dvh py-10 pb-safe sm:py-14 lg:py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* ── 좌: 히어로 / 카피 ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="lg:sticky lg:top-20"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500 ring-1 ring-indigo-500/15 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
            TOEIC RC · Part 5 · 6 · 7
          </span>

          <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-neutral-900 sm:text-[3rem] lg:text-[3.3rem]">
            토익 점수를
            <br />
            <span className="text-gradient">파트별 기출</span>로
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-500 sm:text-base">
            스토리 리딩으로 가볍게 몸을 풀고, Part 5·6·7 실전 유형을 골라 집중
            연습하세요. 끝나면 약한 유형을 짚어 드리고, AI 챌린저와의 속도전으로
            실전 감각까지.
          </p>

          {/* 신뢰 지표 */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <Metric value={grandTotal > 0 ? `${grandTotal}` : "—"} label="기출 문항" />
            <Metric value="3" label="파트" />
            <Metric value="6" label="빈출 유형" />
          </div>

          {/* 데스크탑 전용 CTA — 모바일에선 우측 카드 하단에 노출 */}
          <div className="mt-8 hidden flex-col gap-3 sm:max-w-sm lg:flex">
            <CtaButtons
              loading={loading}
              onStart={handleStart}
              onMatch={() => router.push("/match")}
              onWarmup={() => router.push("/warmup")}
              onTts={() => router.push("/tts")}
            />
          </div>
        </motion.section>

        {/* ── 우: 선택 카드 스택 ──────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease }}
          className="flex flex-col gap-5"
        >
          {progress && progress.totalSolved > 0 && (
            <ProgressCard
              progress={progress}
              onReset={() => setProgress(resetProgress())}
            />
          )}

          {/* 몸풀기 진도 — 진행 기록 있을 때만 대시보드가 스스로 렌더 */}
          {warmDecks && (
            <WarmupDashboard
              decks={warmDecks}
              progress={warmProgress}
              memo={warmMemo}
              order={warmOrder}
              className=""
            />
          )}

          {/* 학습 구성 카드 */}
          <div className="card-elevated overflow-hidden">
            <div className="border-b border-neutral-900/[0.05] px-5 py-4 sm:px-6">
              <p className="label">학습 구성</p>
              <h2 className="mt-1 text-[15px] font-bold text-neutral-900 sm:text-base">
                파트와 유형을 골라보세요
              </h2>
            </div>

            <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
              <PartSelector value={part} onChange={setPart} counts={partCounts} />

              {part === 7 ? (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <TypeSelector
                    value={type}
                    onChange={setType}
                    counts={typeCounts}
                    total={typeTotal}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="partinfo"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="rounded-2xl bg-gradient-to-br from-indigo-50/70 to-white px-5 py-4 ring-1 ring-indigo-500/10"
                >
                  <p className="text-[14px] font-bold text-neutral-900">
                    {PART_META[part].label} · {PART_META[part].name}
                    <span className="ml-1.5 text-indigo-500">
                      {partCounts[part]}문항
                    </span>
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                    {PART_META[part].desc}.{" "}
                    {part === 5
                      ? "품사·시제·전치사·접속사·관계사 등 핵심 문법을 빠르게 점검해요."
                      : "문맥·연결어·문장 삽입까지 한 지문에서 함께 연습해요."}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* 모바일 전용 CTA */}
          <div className="flex flex-col gap-3 lg:hidden">
            <CtaButtons
              loading={loading}
              onStart={handleStart}
              onMatch={() => router.push("/match")}
              onWarmup={() => router.push("/warmup")}
              onTts={() => router.push("/tts")}
            />
          </div>
        </motion.section>
      </div>
    </main>
  );
}

/** 히어로 신뢰 지표 칩 */
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5 rounded-2xl bg-white/70 px-3.5 py-2 ring-1 ring-neutral-900/[0.05] backdrop-blur-sm">
      <span className="text-[17px] font-extrabold tabnum text-neutral-900">
        {value}
      </span>
      <span className="text-[12px] text-neutral-500">{label}</span>
    </div>
  );
}

/** 두 진입 CTA — 학습 시작(주) / AI 대결(강렬) */
function CtaButtons({
  loading,
  onStart,
  onMatch,
  onWarmup,
  onTts,
}: {
  loading: boolean;
  onStart: () => void;
  onMatch: () => void;
  onWarmup: () => void;
  onTts: () => void;
}) {
  return (
    <>
      <motion.button
        type="button"
        onClick={onStart}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.015 }}
        whileTap={{ scale: loading ? 1 : 0.985 }}
        className="btn-primary min-h-[52px] w-full text-base disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            기출 불러오는 중…
          </span>
        ) : (
          "유형별 학습 시작"
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={onMatch}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="btn-dark group min-h-[52px] w-full"
      >
        <span className="inline-flex items-center justify-center gap-2 text-base">
          <span className="text-[17px] transition-transform group-hover:scale-110">
            🤖
          </span>
          AI 대결 시작
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold tracking-wide">
            속도전
          </span>
        </span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onWarmup}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="btn-ghost group min-h-[52px] w-full"
      >
        <span className="inline-flex items-center justify-center gap-2 text-[15px]">
          <span className="text-[17px] transition-transform group-hover:scale-110">
            📖
          </span>
          몸풀기 · 스토리 리딩
          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-indigo-500">
            워밍업
          </span>
        </span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onTts}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="btn-ghost group min-h-[52px] w-full"
      >
        <span className="inline-flex items-center justify-center gap-2 text-[15px]">
          <span className="text-[17px] transition-transform group-hover:scale-110">
            🔊
          </span>
          영어 발음 듣기 · TTS
          <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-sky-500">
            듣기
          </span>
        </span>
      </motion.button>
    </>
  );
}
