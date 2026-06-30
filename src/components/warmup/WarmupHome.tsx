"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { WarmupDeck } from "@/lib/warmup-loader";
import {
  loadWarmupProgress,
  bookProgress,
  resetWarmupBook,
  type WarmupProgress,
} from "@/game/warmup";
import {
  loadMemorize,
  deckSr,
  learnedCount,
  masteredCount,
  dueCount,
  resetMemorizeDeck,
  type MemorizeStore,
} from "@/game/memorize";
import {
  loadOrder,
  deckOrder,
  clearedCount,
  resetOrderDeck,
  type OrderStore,
} from "@/game/order";
import ResetButton from "./ResetButton";

type Mode = "read" | "memorize" | "order";

const COVER: Record<number, { emoji: string; grad: string }> = {
  1: { emoji: "📕", grad: "from-rose-500 via-red-500 to-orange-500" },
  2: { emoji: "📗", grad: "from-emerald-500 via-teal-500 to-cyan-500" },
};

export default function WarmupHome({ decks }: { decks: WarmupDeck[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("read");
  const [progress, setProgress] = useState<WarmupProgress>({});
  const [memo, setMemo] = useState<MemorizeStore>({});
  const [order, setOrder] = useState<OrderStore>({});

  useEffect(() => {
    setProgress(loadWarmupProgress());
    setMemo(loadMemorize());
    setOrder(loadOrder());
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  const modeAura =
    mode === "read"
      ? "from-indigo-400/25 via-violet-400/20 to-sky-400/15"
      : mode === "memorize"
        ? "from-violet-400/25 via-fuchsia-400/20 to-amber-300/15"
        : "from-fuchsia-400/25 via-pink-400/20 to-indigo-400/15";

  return (
    <main className="container-app relative min-h-dvh overflow-hidden py-10 pb-safe sm:py-14 lg:py-16">
      {/* 컬러 오라 — 모드별 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br ${modeAura} blur-[90px] transition-colors duration-700`}
      />
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="-ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700"
        >
          ← 로비
        </button>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500 ring-1 ring-indigo-500/15 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
          Warm-up · 스토리 리딩
        </span>

        <h1 className="mt-4 text-[2rem] font-extrabold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[2.5rem]">
          한 문장씩, <span className="text-gradient">스토리로</span> 몸풀기
        </h1>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-neutral-500 sm:text-base">
          {mode === "read"
            ? "영문을 한 문장씩 읽고, 막히면 탭해서 뜻을 확인하세요. 이야기 흐름을 따라가며 문장 구조가 자연스럽게 익혀집니다. 먼저 머릿속으로 해석해보는 게 핵심이에요."
            : mode === "memorize"
              ? "빈칸을 채우고 한국어를 영어로 떠올리며 통문장을 외웁니다. 맞힌 문장은 더 긴 간격으로, 틀린 문장은 곧 다시 나타나요 (간격 반복)."
              : "10문장씩 끊어 순서를 맞추는 게임이에요. ‘다음 문장’을 차례로 골라 이야기를 완성하면, 문장 사이의 연결을 자연스럽게 익힙니다. (총 10개 청크)"}
        </p>
      </motion.div>

      {/* 모드 토글 — 슬라이딩 세그먼트 */}
      <div className="mt-7 inline-flex rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.04]">
        <ModeTab
          active={mode === "read"}
          onClick={() => setMode("read")}
          icon="📖"
          label="읽기"
          grad="from-indigo-500 to-violet-500"
        />
        <ModeTab
          active={mode === "memorize"}
          onClick={() => setMode("memorize")}
          icon="🧠"
          label="암기"
          grad="from-violet-500 to-fuchsia-500"
        />
        <ModeTab
          active={mode === "order"}
          onClick={() => setMode("order")}
          icon="🧩"
          label="순서"
          grad="from-fuchsia-500 to-pink-500"
        />
      </div>

      {/* 책 카드 */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {decks.length === 0 && (
          <p className="text-[14px] text-neutral-500">
            불러올 스토리가 없습니다. 콘텐츠 파일을 확인해 주세요.
          </p>
        )}

        {decks.map((deck, i) => {
          const cover = COVER[deck.bookNo] ?? { emoji: "📘", grad: "from-indigo-500 to-violet-500" };
          return (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * i, ease }}
              whileHover={{ y: -3 }}
              className="card-elevated group flex flex-col overflow-hidden"
            >
              {/* 책 커버 헤더 */}
              <div className="relative flex items-center gap-4 px-5 py-5 sm:px-6">
                <div
                  className={`flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${cover.grad} text-[26px] shadow-md ring-1 ring-black/5`}
                >
                  <span className="drop-shadow-sm">{cover.emoji}</span>
                </div>
                <div className="min-w-0">
                  <p className="label">Book {deck.bookNo}</p>
                  <h2 className="mt-0.5 truncate text-[16px] font-bold tracking-[-0.01em] text-neutral-900">
                    {deck.titleKo}
                  </h2>
                  <p className="truncate text-[12.5px] italic text-neutral-400">{deck.titleEn}</p>
                </div>
              </div>

              {mode === "read" ? (
                <ReadCardBody
                  deck={deck}
                  progress={progress}
                  onStart={() => router.push(`/warmup/${deck.id}`)}
                  onReset={() => setProgress(resetWarmupBook(deck.id))}
                />
              ) : mode === "memorize" ? (
                <MemorizeCardBody
                  deck={deck}
                  memo={memo}
                  onStart={() => router.push(`/warmup/${deck.id}/memorize`)}
                  onReset={() => setMemo(resetMemorizeDeck(deck.id))}
                />
              ) : (
                <OrderCardBody
                  deck={deck}
                  order={order}
                  onStart={() => router.push(`/warmup/${deck.id}/order`)}
                  onReset={() => setOrder(resetOrderDeck(deck.id))}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
  grad,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  grad: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-1.5 rounded-xl px-5 py-2 text-[14px] font-semibold transition-colors ${
        active ? "text-white" : "text-neutral-400 hover:text-neutral-600"
      }`}
    >
      {active && (
        <motion.span
          layoutId="warmup-mode-pill"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${grad} shadow-[0_8px_20px_-8px_rgba(99,102,241,0.6)]`}
        />
      )}
      <span className="relative">{icon}</span>
      <span className="relative">{label}</span>
    </button>
  );
}

/** 읽기 모드 카드 본문 */
function ReadCardBody({
  deck,
  progress,
  onStart,
  onReset,
}: {
  deck: WarmupDeck;
  progress: WarmupProgress;
  onStart: () => void;
  onReset: () => void;
}) {
  const bp = bookProgress(progress, deck.id);
  const pct = deck.total > 0 ? Math.round((bp.seen / deck.total) * 100) : 0;
  const started = bp.seen > 0;

  return (
    <>
      <div className="px-5 sm:px-6">
        <div className="flex items-center justify-between text-[12px] text-neutral-500">
          <span>{deck.total}문장</span>
          {started ? (
            <span className="font-semibold text-indigo-500">
              {bp.completed ? "완독 ✓" : `${pct}% · ${bp.seen}/${deck.total}`}
            </span>
          ) : (
            <span className="text-neutral-400">시작 전</span>
          )}
        </div>
        <ProgressBar pct={pct} />
      </div>
      <div className="mt-5 flex items-center gap-2.5 px-5 pb-5 sm:px-6">
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="btn-primary min-h-[48px] flex-1 text-[15px]"
        >
          {started && !bp.completed ? `이어보기 (${bp.lastIndex + 1}번째)` : "시작하기"}
        </motion.button>
        {started && (
          <ResetButton
            onReset={onReset}
            triggerLabel="읽기 진도 초기화"
            title="읽기 진도를 초기화할까요?"
            description="이 책의 읽기 진행이 처음으로 되돌아가요."
          />
        )}
      </div>
    </>
  );
}

/** 암기 모드 카드 본문 */
function MemorizeCardBody({
  deck,
  memo,
  onStart,
  onReset,
}: {
  deck: WarmupDeck;
  memo: MemorizeStore;
  onStart: () => void;
  onReset: () => void;
}) {
  const dk = deckSr(memo, deck.id);
  const learned = learnedCount(dk);
  const mastered = masteredCount(dk);
  const due = dueCount(dk);
  const pct = deck.total > 0 ? Math.round((mastered / deck.total) * 100) : 0;
  const started = learned > 0;

  return (
    <>
      <div className="px-5 sm:px-6">
        <div className="flex items-center justify-between text-[12px] text-neutral-500">
          <span>
            마스터 <span className="font-semibold text-violet-600">{mastered}</span>/{deck.total}
          </span>
          {started ? (
            due > 0 ? (
              <span className="inline-flex items-center gap-1 font-semibold text-rose-500">
                <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-rose-500" />
                복습 예정 {due}
              </span>
            ) : (
              <span className="text-neutral-400">복습 없음</span>
            )
          ) : (
            <span className="text-neutral-400">시작 전</span>
          )}
        </div>
        <ProgressBar pct={pct} tone="violet" />
      </div>
      <div className="mt-5 flex items-center gap-2.5 px-5 pb-5 sm:px-6">
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="btn-primary min-h-[48px] flex-1 text-[15px]"
        >
          {started ? (due > 0 ? `복습하기 (${due})` : "이어서 암기") : "암기 시작"}
        </motion.button>
        {started && (
          <ResetButton
            onReset={onReset}
            triggerLabel="암기 진도 초기화"
            title="암기 진도를 초기화할까요?"
            description="이 책의 암기·복습 기록이 모두 지워져요."
          />
        )}
      </div>
    </>
  );
}

/** 순서 맞추기 모드 카드 본문 */
function OrderCardBody({
  deck,
  order,
  onStart,
  onReset,
}: {
  deck: WarmupDeck;
  order: OrderStore;
  onStart: () => void;
  onReset: () => void;
}) {
  const d = deckOrder(order, deck.id);
  const total = deck.sections.length; // 청크 수
  const cleared = clearedCount(d);
  const pct = total > 0 ? Math.round((cleared / total) * 100) : 0;
  const started = cleared > 0;
  const allDone = cleared >= total;

  return (
    <>
      <div className="px-5 sm:px-6">
        <div className="flex items-center justify-between text-[12px] text-neutral-500">
          <span>
            청크 <span className="font-semibold text-fuchsia-600">{cleared}</span>/{total}
          </span>
          {allDone ? (
            <span className="font-semibold text-fuchsia-600">전체 완성 ✓</span>
          ) : started ? (
            <span className="font-semibold text-indigo-500">{pct}%</span>
          ) : (
            <span className="text-neutral-400">시작 전</span>
          )}
        </div>
        <ProgressBar pct={pct} tone="fuchsia" />
      </div>
      <div className="mt-5 flex items-center gap-2.5 px-5 pb-5 sm:px-6">
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="btn-primary min-h-[48px] flex-1 text-[15px]"
        >
          {allDone ? "다시 도전" : started ? `이어하기 (${cleared + 1}청크)` : "순서 맞추기"}
        </motion.button>
        {started && (
          <ResetButton
            onReset={onReset}
            triggerLabel="순서 진도 초기화"
            title="순서 진도를 초기화할까요?"
            description="이 책의 청크 클리어 기록이 모두 지워져요."
          />
        )}
      </div>
    </>
  );
}

function ProgressBar({
  pct,
  tone = "indigo",
}: {
  pct: number;
  tone?: "indigo" | "violet" | "fuchsia";
}) {
  const grad =
    tone === "fuchsia"
      ? "from-fuchsia-500 to-pink-500"
      : tone === "violet"
        ? "from-violet-500 to-fuchsia-500"
        : "from-indigo-500 to-violet-500";
  return (
    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-900/[0.06]">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${grad} transition-[width] duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
