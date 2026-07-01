"use client";

import { motion } from "framer-motion";
import { bookProgress, type WarmupProgress } from "@/game/warmup";
import {
  deckSr,
  learnedCount,
  masteredCount,
  dueCount,
  type MemorizeStore,
} from "@/game/memorize";
import {
  deckOrder,
  clearedCount,
  bestChunkMs,
  formatOrderTime,
  type OrderStore,
} from "@/game/order";

/** 대시보드 집계에 필요한 최소 덱 정보 (문장 내용 불필요 → 로비에서도 경량 재사용) */
export interface WarmupDeckSummary {
  id: string;
  total: number;
  sectionCount: number;
}

interface Props {
  decks: WarmupDeckSummary[];
  progress: WarmupProgress;
  memo: MemorizeStore;
  order: OrderStore;
  /** 바깥 여백 (기본 mt-8) — 로비 카드 스택에선 "" 로 상쇄 */
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ACCENT = {
  indigo: {
    text: "text-indigo-500",
    chip: "bg-indigo-50/80 text-indigo-600 ring-indigo-500/20",
    prog: "from-indigo-500 to-violet-500",
    track: "bg-indigo-100/50",
  },
  violet: {
    text: "text-violet-600",
    chip: "bg-violet-50/80 text-violet-600 ring-violet-500/20",
    prog: "from-violet-500 to-fuchsia-500",
    track: "bg-violet-100/50",
  },
  fuchsia: {
    text: "text-fuchsia-600",
    chip: "bg-fuchsia-50/80 text-fuchsia-600 ring-fuchsia-500/20",
    prog: "from-fuchsia-500 to-pink-500",
    track: "bg-fuchsia-100/50",
  },
} as const;

type Tone = keyof typeof ACCENT;
type BadgeVariant = "success" | "normal" | "alert" | "muted";

export default function WarmupDashboard({
  decks,
  progress,
  memo,
  order,
  className = "mt-8",
}: Props) {
  const totalSentences = decks.reduce((s, d) => s + d.total, 0);

  // 읽기 집계
  const totalSeen = decks.reduce(
    (s, d) => s + bookProgress(progress, d.id).seen,
    0
  );
  const readPct =
    totalSentences > 0 ? Math.round((totalSeen / totalSentences) * 100) : 0;

  // 암기 집계
  const totalLearned = decks.reduce(
    (s, d) => s + learnedCount(deckSr(memo, d.id)),
    0
  );
  const totalMastered = decks.reduce(
    (s, d) => s + masteredCount(deckSr(memo, d.id)),
    0
  );
  const totalDue = decks.reduce(
    (s, d) => s + dueCount(deckSr(memo, d.id)),
    0
  );
  const memoPct =
    totalSentences > 0 ? Math.round((totalMastered / totalSentences) * 100) : 0;

  // 순서 집계
  const totalChunks = decks.reduce((s, d) => s + d.sectionCount, 0);
  const totalCleared = decks.reduce(
    (s, d) => s + clearedCount(deckOrder(order, d.id)),
    0
  );
  const orderPct =
    totalChunks > 0 ? Math.round((totalCleared / totalChunks) * 100) : 0;

  // 순서 최고 기록 — 전 덱 통틀어 가장 빠른 청크 클리어 시간
  let bestOrderMs: number | undefined;
  for (const d of decks) {
    const b = bestChunkMs(deckOrder(order, d.id));
    if (b !== undefined && (bestOrderMs === undefined || b < bestOrderMs)) {
      bestOrderMs = b;
    }
  }

  // 전체 종합 (3모드 평균)
  const overallPct = Math.round((readPct + memoPct + orderPct) / 3);

  // 진도가 하나도 없으면 렌더 생략 (hydration mismatch 없음 — 서버/첫 클라이언트 모두 {} 상태)
  const hasAnyProgress = totalSeen > 0 || totalLearned > 0 || totalCleared > 0;
  if (!hasAnyProgress) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className={`${className} overflow-hidden rounded-2xl bg-white/75 ring-1 ring-neutral-900/[0.06] backdrop-blur-sm`}
    >
      {/* 전체 진도 헤더 */}
      <div className="flex items-center gap-3 border-b border-neutral-900/[0.05] px-5 py-3 sm:px-6">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-neutral-400">
          전체 진도
        </span>
        <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-900/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 0.9, ease }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
          />
        </div>
        <span className="shrink-0 rounded-full bg-neutral-900/[0.05] px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
          {overallPct}%
        </span>
      </div>

      {/* 3열 통계 */}
      <div className="grid grid-cols-3 divide-x divide-neutral-900/[0.05]">
        <ModeStatBlock
          icon="📖"
          label="읽기"
          tone="indigo"
          pct={readPct}
          primaryNum={totalSeen}
          primaryDen={totalSentences}
          primaryUnit="문장"
          badge={
            readPct === 100
              ? { text: "완독 ✓", variant: "success" }
              : totalSeen > 0
                ? { text: `${readPct}%`, variant: "normal" }
                : { text: "시작 전", variant: "muted" }
          }
        />
        <ModeStatBlock
          icon="🧠"
          label="암기"
          tone="violet"
          pct={memoPct}
          primaryNum={totalMastered}
          primaryDen={totalSentences}
          primaryUnit="마스터"
          badge={
            totalDue > 0
              ? { text: `복습 ${totalDue}`, variant: "alert" }
              : totalLearned > 0
                ? { text: "복습 없음", variant: "muted" }
                : { text: "시작 전", variant: "muted" }
          }
        />
        <ModeStatBlock
          icon="🧩"
          label="순서"
          tone="fuchsia"
          pct={orderPct}
          primaryNum={totalCleared}
          primaryDen={totalChunks}
          primaryUnit="청크"
          badge={
            orderPct === 100
              ? { text: "완성 ✓", variant: "success" }
              : totalCleared > 0
                ? { text: `${orderPct}%`, variant: "normal" }
                : { text: "시작 전", variant: "muted" }
          }
          note={
            bestOrderMs !== undefined ? `⏱ 최고 ${formatOrderTime(bestOrderMs)}` : undefined
          }
        />
      </div>
    </motion.div>
  );
}

function ModeStatBlock({
  icon,
  label,
  tone,
  pct,
  primaryNum,
  primaryDen,
  primaryUnit,
  badge,
  note,
}: {
  icon: string;
  label: string;
  tone: Tone;
  pct: number;
  primaryNum: number;
  primaryDen: number;
  primaryUnit: string;
  badge: { text: string; variant: BadgeVariant };
  note?: string;
}) {
  const c = ACCENT[tone];

  const badgeCls =
    badge.variant === "alert"
      ? "bg-rose-50/80 text-rose-500 ring-1 ring-rose-500/20"
      : badge.variant === "success" || badge.variant === "normal"
        ? `${c.chip} ring-1`
        : "bg-neutral-900/[0.04] text-neutral-400 ring-1 ring-neutral-900/[0.06]";

  return (
    <div className="flex flex-col gap-2 px-3.5 py-4 sm:px-5">
      {/* 모드 레이블 */}
      <div className="flex items-center gap-1">
        <span className="text-[13px] leading-none">{icon}</span>
        <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${c.text}`}>
          {label}
        </span>
      </div>

      {/* 주요 수치 */}
      <div className="flex items-baseline gap-0.5">
        <span className="text-[18px] font-extrabold leading-none tracking-[-0.02em] text-neutral-900 sm:text-[20px]">
          {primaryNum}
        </span>
        <span className="text-[12px] text-neutral-400">/{primaryDen}</span>
        <span className="ml-0.5 hidden text-[10px] text-neutral-400 sm:inline">{primaryUnit}</span>
      </div>

      {/* 미니 진도바 */}
      <div className={`h-1 w-full overflow-hidden rounded-full ${c.track}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease }}
          className={`h-full rounded-full bg-gradient-to-r ${c.prog}`}
        />
      </div>

      {/* 상태 뱃지 */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[10.5px] ${badgeCls}`}
        >
          {badge.text}
        </span>
        {note && (
          <span className={`text-[10px] font-semibold sm:text-[10.5px] ${c.text}`}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
