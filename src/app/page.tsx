"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PartSelector from "@/components/lobby/PartSelector";
import TypeSelector from "@/components/lobby/TypeSelector";
import ProgressCard from "@/components/lobby/ProgressCard";
import WarmupDashboard, {
  type WarmupDeckSummary,
} from "@/components/warmup/WarmupDashboard";
import { loadProgress, resetProgress, type Progress } from "@/game/progress";
import { loadDiagnosticResult, type DiagnosticResult } from "@/game/diagnostic";
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
import {
  LC_TYPE_META,
  LC_TYPE_ORDER,
  type LcType,
  type LcTypeFilter,
} from "@/game/listeningTypes";
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

/** 리스닝 세트 요약 (파트·유형 집계용) */
interface LcSummary {
  part: number;
  count: number;
  types: LcType[];
}

const EMPTY_TYPE_COUNTS = QUESTION_TYPE_ORDER.reduce(
  (acc, t) => ({ ...acc, [t]: 0 }),
  {} as Record<QuestionType, number>,
);

type Domain = "RC" | "LC";
type LcPart = 2 | 3 | 4 | "ALL";

export default function HomePage() {
  const router = useRouter();
  const start = usePracticeStore((s) => s.start);

  const [domain, setDomain] = useState<Domain>("RC");

  // RC(리딩) 상태
  const [part, setPart] = useState<Part>(7);
  const [type, setType] = useState<TypeFilter>("ALL");
  const [bank, setBank] = useState<PassageSet[] | null>(null);
  const [loading, setLoading] = useState(false);

  // LC(리스닝) 상태
  const [lcPart, setLcPart] = useState<LcPart>("ALL");
  const [lcType, setLcType] = useState<LcTypeFilter>("ALL");
  const [lcSets, setLcSets] = useState<LcSummary[] | null>(null);

  const [progress, setProgress] = useState<Progress | null>(null);
  const [diag, setDiag] = useState<DiagnosticResult | null>(null);

  // 몸풀기(Warm-up) 진도 대시보드용
  const [warmDecks, setWarmDecks] = useState<WarmupDeckSummary[] | null>(null);
  const [warmProgress, setWarmProgress] = useState<WarmupProgress>({});
  const [warmMemo, setWarmMemo] = useState<MemorizeStore>({});
  const [warmOrder, setWarmOrder] = useState<OrderStore>({});

  // 로비 진입 시 기출 은행 + 리스닝 세트 + 몸풀기 요약 미리 로드
  useEffect(() => {
    let alive = true;
    fetchBank().then((sets) => {
      if (alive) setBank(sets);
    });
    fetch("/api/listening")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.sets)) return;
        const summ: LcSummary[] = d.sets.map((s: any) => {
          const cats: string[] =
            s.part === 2
              ? (s.items ?? []).map((i: any) => i.category)
              : (s.questions ?? []).map((q: any) => q.category);
          const present = new Set<LcType>(cats.map(normLc));
          return {
            part: s.part,
            count: s.part === 2 ? s.items?.length ?? 0 : s.questions?.length ?? 0,
            types: LC_TYPE_ORDER.filter((t) => present.has(t)),
          };
        });
        setLcSets(summ);
      })
      .catch(() => {});
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

  useEffect(() => {
    setProgress(loadProgress());
    setDiag(loadDiagnosticResult());
    setWarmProgress(loadWarmupProgress());
    setWarmMemo(loadMemorize());
    setWarmOrder(loadOrder());
  }, []);

  // RC 파트별 문항 수
  const partCounts = useMemo(() => {
    const c: Record<Part, number> = { 5: 0, 6: 0, 7: 0 };
    for (const s of bank ?? []) c[partOf(s)] += s.questions.length;
    return c;
  }, [bank]);

  const rcTotal = useMemo(
    () => partCounts[5] + partCounts[6] + partCounts[7],
    [partCounts],
  );

  // RC Part 7 빈출 유형별 문항 수
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

  // LC 파트별 문항 수 / 유형별 세트 수
  const lcPartCounts = useMemo(() => {
    const c: Record<number, number> = { 2: 0, 3: 0, 4: 0 };
    for (const s of lcSets ?? []) c[s.part] += s.count;
    return c;
  }, [lcSets]);

  const lcTotal = useMemo(
    () => (lcSets ?? []).reduce((n, s) => n + s.count, 0),
    [lcSets],
  );

  const lcTypeCounts = useMemo(() => {
    const scoped = (lcSets ?? []).filter((s) => lcPart === "ALL" || s.part === lcPart);
    const c = {} as Record<LcType, number>;
    for (const t of LC_TYPE_ORDER) c[t] = 0;
    for (const s of scoped) for (const t of s.types) c[t] += 1;
    return c;
  }, [lcSets, lcPart]);

  const lcAvailableTypes = LC_TYPE_ORDER.filter((t) => lcTypeCounts[t] > 0);

  const handleStartRc = async () => {
    setLoading(true);
    const sets = bank ?? (await fetchBank());
    if (!bank && sets) setBank(sets);
    start({ part, type: part === 7 ? type : "ALL", sets: sets ?? undefined });
    router.push("/game");
  };

  const handleStartLc = () => {
    const params = new URLSearchParams();
    if (lcPart !== "ALL") params.set("part", String(lcPart));
    if (lcType !== "ALL") params.set("type", lcType);
    const qs = params.toString();
    router.push(qs ? `/listening?${qs}` : "/listening");
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="container-app min-h-dvh py-10 pb-safe sm:py-14 lg:py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* ── 좌: 히어로 ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="lg:sticky lg:top-20"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500 ring-1 ring-indigo-500/15 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
            TOEIC · LC Part 2·3·4 · RC Part 5·6·7
          </span>

          <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-neutral-900 sm:text-[3rem] lg:text-[3.3rem]">
            토익 점수를
            <br />
            <span className="text-gradient">파트·유형별</span>로
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-500 sm:text-base">
            리스닝(Part 2·3·4)과 리딩(Part 5·6·7)을 파트와 빈출 유형으로 골라
            집중 연습하세요. 몸풀기 스토리 리딩으로 워밍업하고, AI 챌린저와의
            속도전으로 실전 감각까지.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <Metric value={rcTotal > 0 ? `${rcTotal}` : "—"} label="RC 기출" />
            <Metric value={lcTotal > 0 ? `${lcTotal}` : "—"} label="LC 문항" />
            <Metric value="6" label="파트" />
          </div>
        </motion.section>

        {/* ── 우: 학습 카드 + 모드 ──────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease }}
          className="flex flex-col gap-5"
        >
          <DiagnosticBanner diag={diag} onStart={() => router.push("/diagnostic")} />

          {progress && progress.totalSolved > 0 && (
            <ProgressCard progress={progress} onReset={() => setProgress(resetProgress())} />
          )}

          {warmDecks && (
            <WarmupDashboard
              decks={warmDecks}
              progress={warmProgress}
              memo={warmMemo}
              order={warmOrder}
              className=""
              onOpen={() => router.push("/warmup")}
            />
          )}

          {/* 학습 카드 */}
          <div className="card-elevated overflow-hidden">
            <div className="border-b border-neutral-900/[0.05] px-4 py-4 sm:px-6">
              <p className="label">학습</p>
              <h2 className="mt-1 text-[15px] font-bold text-neutral-900 sm:text-base">
                무엇을 연습할까요
              </h2>
            </div>

            <div className="px-4 py-5 sm:px-6 sm:py-6">
              {/* 도메인 토글 (리스닝 / 리딩) */}
              <div className="relative grid grid-cols-2 gap-1 rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.05]">
                {(["LC", "RC"] as Domain[]).map((d) => {
                  const active = domain === d;
                  const isLc = d === "LC";
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDomain(d)}
                      className="relative z-10 min-h-[52px] rounded-xl px-2 py-2 text-center transition"
                    >
                      {active && (
                        <motion.span
                          layoutId="domain-pill"
                          transition={{ type: "spring", stiffness: 600, damping: 40 }}
                          className={`absolute inset-0 -z-10 rounded-xl shadow-sm ${
                            isLc
                              ? "bg-gradient-to-r from-cyan-500 to-sky-500"
                              : "bg-gradient-to-r from-indigo-500 to-violet-500"
                          }`}
                        />
                      )}
                      <span className={`block text-[14px] font-bold ${active ? "text-white" : "text-neutral-500"}`}>
                        {isLc ? "🎧 리스닝" : "📖 리딩"}
                      </span>
                      <span className={`mt-0.5 block text-[11px] ${active ? "text-white/70" : "text-neutral-400"}`}>
                        {isLc ? "Part 2·3·4" : "Part 5·6·7"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <AnimatePresence mode="wait">
                  {domain === "RC" ? (
                    <motion.div
                      key="rc"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease }}
                      className="flex flex-col gap-5"
                    >
                      <PartSelector value={part} onChange={setPart} counts={partCounts} />
                      {part === 7 ? (
                        <TypeSelector value={type} onChange={setType} counts={typeCounts} total={typeTotal} />
                      ) : (
                        <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 to-white px-5 py-4 ring-1 ring-indigo-500/10">
                          <p className="text-[14px] font-bold text-neutral-900">
                            {PART_META[part].label} · {PART_META[part].name}
                            <span className="ml-1.5 text-indigo-500">{partCounts[part]}문항</span>
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                            {PART_META[part].desc}.{" "}
                            {part === 5
                              ? "품사·시제·전치사·접속사·관계사 등 핵심 문법을 빠르게 점검해요."
                              : "문맥·연결어·문장 삽입까지 한 지문에서 함께 연습해요."}
                          </p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleStartRc}
                        disabled={loading}
                        className="btn-primary min-h-[52px] w-full text-base disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="inline-flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            기출 불러오는 중…
                          </span>
                        ) : (
                          "리딩 학습 시작"
                        )}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lc"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease }}
                      className="flex flex-col gap-4"
                    >
                      {/* LC 파트 선택 */}
                      <div className="relative grid grid-cols-4 gap-1 rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.05]">
                        {(["ALL", 2, 3, 4] as LcPart[]).map((p) => {
                          const active = lcPart === p;
                          return (
                            <button
                              key={String(p)}
                              type="button"
                              onClick={() => setLcPart(p)}
                              className="relative z-10 min-h-[52px] rounded-xl px-1 py-2 text-center transition"
                            >
                              {active && (
                                <motion.span
                                  layoutId="lc-lobby-part-pill"
                                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                                  className="absolute inset-0 -z-10 rounded-xl bg-white shadow-sm ring-1 ring-neutral-900/[0.05]"
                                />
                              )}
                              <span className={`block text-[13.5px] font-bold ${active ? "text-cyan-600" : "text-neutral-500"}`}>
                                {p === "ALL" ? "전체" : `Part ${p}`}
                              </span>
                              <span className={`mt-0.5 block text-[10.5px] ${active ? "text-neutral-400" : "text-neutral-400/70"}`}>
                                {p === "ALL" ? `${lcTotal}문항` : `${lcPartCounts[p] ?? 0}문항`}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* LC 유형 필터 */}
                      <div className="flex flex-wrap gap-1.5">
                        <LcChip active={lcType === "ALL"} onClick={() => setLcType("ALL")} label="전체 유형" />
                        {lcAvailableTypes.map((t) => (
                          <LcChip
                            key={t}
                            active={lcType === t}
                            onClick={() => setLcType(t)}
                            label={LC_TYPE_META[t].label}
                            count={lcTypeCounts[t]}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleStartLc}
                        className="min-h-[52px] w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 text-base font-bold text-white shadow-md transition active:scale-[0.98]"
                      >
                        리스닝 시작
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 모드 섹션 */}
          <div>
            <p className="label mb-2 px-1">모드</p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <ModeButton
                onClick={() => router.push("/match")}
                emoji="🤖"
                title="AI 대결"
                sub="속도전"
                tint="from-neutral-800 to-neutral-900"
                dark
              />
              <ModeButton
                onClick={() => router.push("/warmup")}
                emoji="📖"
                title="몸풀기"
                sub="스토리 리딩"
                tint="from-indigo-50 to-white"
              />
              <ModeButton
                onClick={() => router.push("/tts")}
                emoji="🔊"
                title="발음 듣기"
                sub="TTS"
                tint="from-sky-50 to-white"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

/** category → 리스닝 표준 유형 (page 로컬 경량 정규화; listeningTypes.ts와 동일 규칙) */
const LC_MAP: Record<string, LcType> = {
  Where의문문: "WH", When의문문: "WH", Who의문문: "WH", What의문문: "WH", How의문문: "WH", Why의문문: "WH",
  조동사의문문: "YESNO", 부정의문문: "YESNO", 부가의문문: "YESNO",
  선택의문문: "CHOICE",
  평서문: "STATEMENT", "요청·제안": "STATEMENT",
  "주제·목적": "MAIN", 세부사항: "DETAIL", 세부: "DETAIL", 추론: "INFERENCE", "의도·화법": "INTENT",
};
function normLc(cat?: string): LcType {
  if (!cat) return "DETAIL";
  return LC_MAP[cat.trim()] ?? "DETAIL";
}

function DiagnosticBanner({
  diag,
  onStart,
}: {
  diag: DiagnosticResult | null;
  onStart: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onStart}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className="group relative overflow-hidden rounded-3xl bg-neutral-900 px-5 py-5 text-left shadow-lg ring-1 ring-white/10"
    >
      <span className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl transition-transform group-hover:scale-125" />
      <span className="pointer-events-none absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-violet-200 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-violet-300" />
            레벨 진단
          </span>
          <p className="mt-2.5 text-[17px] font-extrabold leading-snug text-white">
            30문항으로 내 토익 점수 확인
          </p>
          <p className="mt-1 text-[12.5px] text-white/55">
            LC·RC 예상 점수 + 취약 파트 진단 · 약 15분
          </p>
        </div>
        {diag ? (
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">지난 진단</p>
            <p className="tabnum text-[28px] font-extrabold leading-none text-white">{diag.totalScore}</p>
            <p className="text-[10px] text-white/40">다시 진단 →</p>
          </div>
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[18px] text-white shadow-md transition-transform group-hover:scale-110">
            →
          </span>
        )}
      </div>
    </motion.button>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5 rounded-2xl bg-white/70 px-3.5 py-2 ring-1 ring-neutral-900/[0.05] backdrop-blur-sm">
      <span className="text-[17px] font-extrabold tabnum text-neutral-900">{value}</span>
      <span className="text-[12px] text-neutral-500">{label}</span>
    </div>
  );
}

function LcChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition active:scale-95 ${
        active
          ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-sm"
          : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:ring-cyan-300 hover:text-cyan-600"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span className={`ml-1 ${active ? "text-white/70" : "text-neutral-400"}`}>{count}</span>
      )}
    </button>
  );
}

function ModeButton({
  onClick,
  emoji,
  title,
  sub,
  tint,
  dark = false,
}: {
  onClick: () => void;
  emoji: string;
  title: string;
  sub: string;
  tint: string;
  dark?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${tint} px-4 py-3.5 text-left ring-1 transition ${
        dark ? "ring-white/10 shadow-md" : "ring-neutral-900/[0.06]"
      }`}
    >
      <span className="text-[20px] transition-transform group-hover:scale-110">{emoji}</span>
      <span className="min-w-0">
        <span className={`block text-[14px] font-bold ${dark ? "text-white" : "text-neutral-900"}`}>
          {title}
        </span>
        <span className={`block text-[11.5px] ${dark ? "text-white/60" : "text-neutral-400"}`}>{sub}</span>
      </span>
    </motion.button>
  );
}
