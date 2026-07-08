"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "../warmup/icons";
import {
  LC_TYPE_META,
  LC_TYPE_ORDER,
  lcTypeLabel,
  type LcType,
  type LcTypeFilter,
} from "@/game/listeningTypes";
import { loadMastery, type MasteryState, type MasteryPart } from "@/game/mastery";
import {
  loadListeningProgress,
  setConquestStatus,
  type ListeningProgressState,
  type SetConquestStatus,
} from "@/game/listeningProgress";

export interface ListeningCard {
  id: string;
  part: number;
  difficulty: string;
  passageType?: string;
  /** 문항 수 (Part2=items, Part3/4=questions) */
  count: number;
  /** 세트가 포함한 표준 유형 */
  types: LcType[];
  /** 세트 문항 ID (정복 상태 파생용) */
  questionIds: string[];
}

/** 정복 상태 정렬 우선순위: 복습 대기 → 미착수 → 정복 완료 */
const STATUS_ORDER: Record<SetConquestStatus, number> = {
  pending: 0,
  untouched: 1,
  mastered: 2,
};

const PART_META: Record<number, { label: string; desc: string; tint: string }> = {
  2: { label: "Part 2", desc: "질문-응답 · 오디오만 듣고 A/B/C", tint: "from-cyan-500 to-teal-500" },
  3: { label: "Part 3", desc: "대화 · 문항 3개", tint: "from-sky-500 to-cyan-500" },
  4: { label: "Part 4", desc: "담화 · 문항 3개", tint: "from-blue-500 to-sky-500" },
};

type PartFilter = 2 | 3 | 4 | "ALL";
type DiffFilter = "ALL" | "EASY" | "MEDIUM" | "HARD";
const DIFF_ORDER = ["EASY", "MEDIUM", "HARD"] as const;
const DIFF_LABEL: Record<"EASY" | "MEDIUM" | "HARD", string> = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

interface CardView extends ListeningCard {
  status: SetConquestStatus;
  masteredQ: number;
  bestCorrect: number | null;
  attempts: number;
}

export default function ListeningHome({
  cards,
  initialPart = null,
  initialType = "ALL",
  initialReview = false,
  initialDiff = "ALL",
}: {
  cards: ListeningCard[];
  initialPart?: 2 | 3 | 4 | null;
  initialType?: LcTypeFilter;
  initialReview?: boolean;
  initialDiff?: DiffFilter;
}) {
  const router = useRouter();
  const [part, setPart] = useState<PartFilter>(initialPart ?? "ALL");
  const [type, setType] = useState<LcTypeFilter>(initialType);
  const [review, setReview] = useState(initialReview);
  const [diff, setDiff] = useState<DiffFilter>(initialDiff);

  // 클라이언트 진행/정복 상태 (마운트 후 로드 → 하이드레이션 안전)
  const [mastery, setMastery] = useState<MasteryState | null>(null);
  const [progress, setProgress] = useState<ListeningProgressState>({});
  useEffect(() => {
    setMastery(loadMastery());
    setProgress(loadListeningProgress());
  }, []);

  // 각 카드에 정복 상태·최고점 부여
  const cardViews = useMemo<CardView[]>(() => {
    return cards.map((c) => {
      const { status, mastered } = mastery
        ? setConquestStatus(c.questionIds, c.part as MasteryPart, mastery)
        : { status: "untouched" as SetConquestStatus, mastered: 0 };
      const p = progress[c.id];
      return {
        ...c,
        status,
        masteredQ: mastered,
        bestCorrect: p ? p.bestCorrect : null,
        attempts: p?.attempts ?? 0,
      };
    });
  }, [cards, mastery, progress]);

  // 파트 필터 적용된 세트 (유형 칩 카운트 산정용)
  const partScoped = useMemo(
    () => (part === "ALL" ? cardViews : cardViews.filter((c) => c.part === part)),
    [cardViews, part],
  );

  // 현재 파트 범위에서 등장하는 유형별 세트 수
  const typeCounts = useMemo(() => {
    const c = {} as Record<LcType, number>;
    for (const t of LC_TYPE_ORDER) c[t] = 0;
    for (const card of partScoped) for (const t of card.types) c[t] += 1;
    return c;
  }, [partScoped]);

  const availableTypes = LC_TYPE_ORDER.filter((t) => typeCounts[t] > 0);

  // 현재 파트 범위에서 난이도별 세트 수
  const diffCounts = useMemo(() => {
    const c = { EASY: 0, MEDIUM: 0, HARD: 0 } as Record<"EASY" | "MEDIUM" | "HARD", number>;
    for (const card of partScoped) {
      const d = card.difficulty as "EASY" | "MEDIUM" | "HARD";
      if (d in c) c[d] += 1;
    }
    return c;
  }, [partScoped]);

  // 파트 범위 정복 요약 (유형 필터 이전 기준)
  const summary = useMemo(() => {
    let mastered = 0,
      pending = 0,
      untouched = 0;
    for (const c of partScoped) {
      if (c.status === "mastered") mastered += 1;
      else if (c.status === "pending") pending += 1;
      else untouched += 1;
    }
    return { mastered, pending, untouched };
  }, [partScoped]);

  // 최종 필터: 파트 + 유형 + 난이도 (+ 복습 모드면 미정복만)
  const filtered = useMemo(() => {
    let arr = partScoped.filter((c) => type === "ALL" || c.types.includes(type));
    if (diff !== "ALL") arr = arr.filter((c) => c.difficulty === diff);
    if (review) arr = arr.filter((c) => c.status !== "mastered");
    return arr;
  }, [partScoped, type, diff, review]);

  const totalQuestions = filtered.reduce((n, c) => n + c.count, 0);
  const byPart = [2, 3, 4]
    .map((p) => ({
      part: p,
      // 복습 대기 → 미착수 → 정복 순으로 정렬 (복습 타깃을 위로)
      sets: filtered
        .filter((c) => c.part === p)
        .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    }))
    .filter((g) => g.sets.length > 0);

  const partTabs: PartFilter[] = ["ALL", 2, 3, 4];

  return (
    <main className="container-narrow relative min-h-dvh overflow-hidden py-5 pb-safe sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-8 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/25 to-sky-400/15 blur-[80px]"
      />
      <button
        type="button"
        onClick={() => router.push("/learn")}
        className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700 active:scale-95"
      >
        <ArrowLeft size={16} /> 로비
      </button>

      <div className="mt-3">
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-neutral-900 sm:text-[28px]">🎧 리스닝</h1>
        <p className="mt-1 text-[14px] text-neutral-500">
          Part 2·3·4 — 파트와 유형을 골라 오디오로 연습하세요. 정답·해설·스크립트는 제출 후 공개됩니다.
        </p>
      </div>

      {/* ── 파트 필터 ── */}
      <div className="mt-5 grid grid-cols-4 gap-1.5 rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.05]">
        {partTabs.map((p) => {
          const active = part === p;
          const label = p === "ALL" ? "전체" : `Part ${p}`;
          return (
            <button
              key={String(p)}
              type="button"
              onClick={() => setPart(p)}
              className="relative z-10 min-h-[40px] rounded-xl px-2 py-2 text-center text-[13px] font-bold transition"
            >
              {active && (
                <motion.span
                  layoutId="lc-part-pill"
                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 shadow-sm"
                />
              )}
              <span className={active ? "text-white" : "text-neutral-500"}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 유형 필터 ── */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <TypeChip active={type === "ALL"} onClick={() => setType("ALL")} label="전체 유형" />
        {availableTypes.map((t) => (
          <TypeChip
            key={t}
            active={type === t}
            onClick={() => setType(t)}
            label={LC_TYPE_META[t].label}
            count={typeCounts[t]}
          />
        ))}
      </div>

      {/* ── 난이도 필터 ── */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <DiffChip active={diff === "ALL"} onClick={() => setDiff("ALL")} label="전체 난이도" />
        {DIFF_ORDER.map((d) => (
          <DiffChip
            key={d}
            active={diff === d}
            onClick={() => setDiff((v) => (v === d ? "ALL" : d))}
            label={DIFF_LABEL[d]}
            count={diffCounts[d]}
          />
        ))}
      </div>

      {/* ── 정복 요약 + 복습 모드 토글 ── */}
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 px-3.5 py-3 ring-1 ring-neutral-900/[0.05] backdrop-blur-sm">
        <StatPill emoji="👑" label="정복" value={summary.mastered} tone="emerald" />
        <StatPill emoji="🔁" label="복습 대기" value={summary.pending} tone="amber" />
        <StatPill emoji="○" label="미착수" value={summary.untouched} tone="neutral" />
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setReview((v) => !v)}
            aria-pressed={review}
            disabled={summary.pending === 0 && !review}
            className={`rounded-full px-3.5 py-2 text-[12.5px] font-bold transition active:scale-95 disabled:opacity-40 ${
              review
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:ring-amber-300 hover:text-amber-600"
            }`}
          >
            {review ? "🔁 복습 대기만" : "🔁 복습 대기 우선"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-[12.5px] text-neutral-400">
        {filtered.length}세트 · {totalQuestions}문항
        {type !== "ALL" && <span className="text-cyan-500"> · {lcTypeLabel(type)} 포함</span>}
        {diff !== "ALL" && <span className="text-cyan-500"> · {diff}</span>}
        {review && <span className="text-amber-500"> · 복습 대기 세트만 표시</span>}
      </p>

      {/* ── 세트 목록 ── */}
      <div className="mt-3 space-y-6">
        {byPart.length === 0 ? (
          <div className="card-elevated px-5 py-10 text-center text-[13px] text-neutral-400">
            선택한 조건에 맞는 세트가 없어요. 다른 파트·유형을 골라보세요.
          </div>
        ) : (
          byPart.map(({ part: p, sets }) => (
            <section key={p}>
              <div className="mb-2.5 flex items-center gap-2">
                <span className={`rounded-md bg-gradient-to-r ${PART_META[p].tint} px-2 py-0.5 text-[12px] font-extrabold text-white`}>
                  {PART_META[p].label}
                </span>
                <span className="text-[12.5px] text-neutral-400">{PART_META[p].desc}</span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {sets.map((c, i) => (
                  <motion.button
                    key={c.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    onClick={() => router.push(`/listening/${c.id}`)}
                    className={`card-elevated group relative flex flex-col gap-2 px-4 py-3.5 text-left transition hover:-translate-y-0.5 ${
                      c.status === "mastered" ? "ring-1 ring-emerald-500/25" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${PART_META[p].tint} text-[18px] text-white shadow-sm`}>
                        🎧
                        {c.status === "mastered" && (
                          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[10px] shadow ring-2 ring-white">
                            👑
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14.5px] font-bold text-neutral-900">{c.passageType ?? c.id}</p>
                        <p className="text-[12px] text-neutral-400">
                          {c.count}문항 · {c.difficulty}
                          {c.bestCorrect !== null && (
                            <span className="ml-1.5 font-semibold text-neutral-500">· 최고 {c.bestCorrect}/{c.count}</span>
                          )}
                        </p>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                    {c.types.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {c.types.map((t) => (
                          <span
                            key={t}
                            className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold ring-1 ${
                              type === t
                                ? "bg-cyan-500 text-white ring-cyan-500"
                                : "bg-cyan-500/8 text-cyan-600 ring-cyan-500/15"
                            }`}
                          >
                            {LC_TYPE_META[t].label}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}

function StatPill({
  emoji,
  label,
  value,
  tone,
}: {
  emoji: string;
  label: string;
  value: number;
  tone: "emerald" | "amber" | "neutral";
}) {
  const c =
    tone === "emerald"
      ? "text-emerald-600"
      : tone === "amber"
        ? "text-amber-600"
        : "text-neutral-400";
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[13px]">{emoji}</span>
      <span className={`text-[15px] font-extrabold tabnum ${c}`}>{value}</span>
      <span className="text-[11.5px] font-semibold text-neutral-400">{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: SetConquestStatus }) {
  if (status === "mastered") {
    return (
      <span className="shrink-0 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10.5px] font-bold text-emerald-600">
        정복
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10.5px] font-bold text-amber-600">
        복습 대기
      </span>
    );
  }
  return <span className="shrink-0 text-cyan-400 transition group-hover:translate-x-0.5">→</span>;
}

function TypeChip({
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

function DiffChip({
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
      className={`rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide transition active:scale-95 ${
        active
          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm"
          : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:ring-teal-300 hover:text-teal-600"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span className={`ml-1 tabnum ${active ? "text-white/70" : "text-neutral-400"}`}>{count}</span>
      )}
    </button>
  );
}
