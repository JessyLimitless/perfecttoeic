"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { WarmupDeck, WarmupLevel } from "@/lib/warmup-loader";
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
  bestChunkMs,
  formatOrderTime,
  resetOrderDeck,
  type OrderStore,
} from "@/game/order";
import ResetButton from "./ResetButton";
import WarmupDashboard from "./WarmupDashboard";
import { ArrowLeft } from "./icons";

type Mode = "read" | "memorize" | "order" | "ebook";

const COVER: Record<number, { emoji: string; grad: string }> = {
  1: { emoji: "📕", grad: "from-rose-500 via-red-500 to-orange-500" },
  2: { emoji: "📗", grad: "from-emerald-500 via-teal-500 to-cyan-500" },
  3: { emoji: "📘", grad: "from-sky-500 via-blue-500 to-indigo-500" },
};

/** 같은 책(bookNo)의 기본편/기초편을 묶는다 */
interface BookGroup {
  bookNo: number;
  standard?: WarmupDeck;
  basic?: WarmupDeck;
}

export default function WarmupHome({ decks }: { decks: WarmupDeck[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("read");
  const [progress, setProgress] = useState<WarmupProgress>({});
  const [memo, setMemo] = useState<MemorizeStore>({});
  const [order, setOrder] = useState<OrderStore>({});
  // 책별 난이도 선택 (기본값: 기본편)
  const [levelByBook, setLevelByBook] = useState<Record<number, WarmupLevel>>({});

  useEffect(() => {
    setProgress(loadWarmupProgress());
    setMemo(loadMemorize());
    setOrder(loadOrder());
  }, []);

  const books = useMemo<BookGroup[]>(() => {
    const map = new Map<number, BookGroup>();
    for (const d of decks) {
      const g = map.get(d.bookNo) ?? { bookNo: d.bookNo };
      if (d.level === "basic") g.basic = d;
      else g.standard = d;
      map.set(d.bookNo, g);
    }
    return Array.from(map.values()).sort((a, b) => a.bookNo - b.bookNo);
  }, [decks]);

  const ease = [0.22, 1, 0.36, 1] as const;

  const modeAura =
    mode === "read"
      ? "from-indigo-400/25 via-violet-400/20 to-sky-400/15"
      : mode === "memorize"
        ? "from-violet-400/25 via-fuchsia-400/20 to-amber-300/15"
        : mode === "order"
          ? "from-fuchsia-400/25 via-pink-400/20 to-indigo-400/15"
          : "from-sky-400/25 via-indigo-400/20 to-violet-400/15";

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
          className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700 active:scale-95"
        >
          <ArrowLeft size={16} /> 로비
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
              : mode === "order"
                ? "10문장씩 끊어 순서를 맞추는 게임이에요. ‘다음 문장’을 차례로 골라 이야기를 완성하면, 문장 사이의 연결을 자연스럽게 익힙니다. (총 10개 청크)"
                : "책 한 권의 영문과 번역을 한 화면에 이어서 읽는 전자책이에요. 이야기 전체와 문장을 한눈에 훑고, 원어민 발음도 문장마다 들을 수 있어요."}
        </p>
      </motion.div>

      {/* 통합 진도 대시보드 — 진도 있을 때만 표시 */}
      <WarmupDashboard
        decks={decks.map((d) => ({ id: d.id, total: d.total, sectionCount: d.sections.length }))}
        progress={progress}
        memo={memo}
        order={order}
      />

      {/* 모드 토글 — 슬라이딩 세그먼트 (모바일: 꽉 찬 균등 4탭 / 데스크탑: 자동폭) */}
      <div className="mt-7 flex w-full rounded-2xl bg-neutral-900/[0.05] p-1 ring-1 ring-neutral-900/[0.04] sm:inline-flex sm:w-auto">
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
        <ModeTab
          active={mode === "ebook"}
          onClick={() => setMode("ebook")}
          icon="📚"
          label="전자책"
          grad="from-sky-500 to-indigo-500"
        />
      </div>

      {/* 책 카드 */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {decks.length === 0 && (
          <p className="text-[14px] text-neutral-500">
            불러올 스토리가 없습니다. 콘텐츠 파일을 확인해 주세요.
          </p>
        )}

        {books.map((book, i) => {
          const cover = COVER[book.bookNo] ?? { emoji: "📘", grad: "from-indigo-500 to-violet-500" };
          const lvl: WarmupLevel = levelByBook[book.bookNo] ?? "standard";
          // 선택 난이도의 덱(없으면 있는 쪽으로 폴백)
          const deck =
            (lvl === "basic" ? book.basic : book.standard) ?? book.standard ?? book.basic;
          if (!deck) return null;
          return (
            <motion.div
              key={book.bookNo}
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
                  <p className="label">Book {book.bookNo}</p>
                  <h2 className="mt-0.5 truncate text-[16px] font-bold tracking-[-0.01em] text-neutral-900">
                    {deck.titleKo}
                  </h2>
                  <p className="truncate text-[12.5px] italic text-neutral-400">{deck.titleEn}</p>
                </div>
              </div>

              {/* 난이도 토글 — 기초편이 있을 때만 노출 */}
              {book.basic && book.standard && (
                <div className="px-5 sm:px-6">
                  <LevelToggle
                    level={lvl}
                    groupKey={book.bookNo}
                    onChange={(next) =>
                      setLevelByBook((prev) => ({ ...prev, [book.bookNo]: next }))
                    }
                  />
                </div>
              )}

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
              ) : mode === "order" ? (
                <OrderCardBody
                  deck={deck}
                  order={order}
                  onStart={() => router.push(`/warmup/${deck.id}/order`)}
                  onReset={() => setOrder(resetOrderDeck(deck.id))}
                />
              ) : (
                <EbookCardBody
                  deck={deck}
                  onStart={() => router.push(`/warmup/${deck.id}/book`)}
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
      className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[13px] font-semibold transition-colors sm:flex-none sm:px-5 sm:text-[14px] ${
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

/** 책별 난이도 토글 — 기초편(쉬운 문장) / 기본편 */
function LevelToggle({
  level,
  onChange,
  groupKey,
}: {
  level: WarmupLevel;
  onChange: (next: WarmupLevel) => void;
  /** layoutId 충돌 방지용 책별 고유 키 */
  groupKey: string | number;
}) {
  const opts: { value: WarmupLevel; label: string; hint: string }[] = [
    { value: "basic", label: "기초", hint: "쉬운 문장" },
    { value: "standard", label: "기본", hint: "원문 요약" },
  ];
  return (
    <div className="flex items-center gap-2 rounded-xl bg-neutral-900/[0.04] p-1 text-[12px] ring-1 ring-neutral-900/[0.04]">
      {opts.map((o) => {
        const active = level === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors ${
              active ? "text-white" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`warmup-level-pill-${groupKey}`}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className={`absolute inset-0 rounded-lg bg-gradient-to-r ${
                  o.value === "basic"
                    ? "from-amber-500 to-orange-500 shadow-[0_6px_16px_-8px_rgba(245,158,11,0.7)]"
                    : "from-indigo-500 to-violet-500 shadow-[0_6px_16px_-8px_rgba(99,102,241,0.6)]"
                }`}
              />
            )}
            <span className="relative">{o.label}</span>
            <span className={`relative text-[10.5px] font-medium ${active ? "text-white/75" : "text-neutral-400"}`}>
              {o.hint}
            </span>
          </button>
        );
      })}
    </div>
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

  // 오디오북(책 전체 통합본) — 파일이 있을 때만 노출
  const fullSrc = `/audio/warmup/${deck.id}/${deck.id}-full.mp3`;
  const [hasFull, setHasFull] = useState(false);
  const [showBook, setShowBook] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(fullSrc, { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setHasFull(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [fullSrc]);

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

      {/* 오디오북 — 책 전체를 원어민 목소리로 이어 듣기 */}
      {hasFull && (
        <div className="border-t border-neutral-900/[0.05] px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => setShowBook((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl bg-indigo-50/60 px-3.5 py-2.5 text-[13px] font-semibold text-indigo-600 ring-1 ring-indigo-500/15 transition hover:bg-indigo-50"
            aria-expanded={showBook}
          >
            <span className="inline-flex items-center gap-1.5">
              🎧 오디오북 · 전체 듣기
            </span>
            <span className="text-[11px] text-indigo-400">{showBook ? "닫기 ▲" : "펼치기 ▼"}</span>
          </button>
          {showBook && (
            <audio
              className="mt-2.5 w-full"
              controls
              preload="none"
              src={fullSrc}
            />
          )}
        </div>
      )}
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
  const best = bestChunkMs(d); // 최단 청크 기록(ms)

  return (
    <>
      <div className="px-5 sm:px-6">
        <div className="flex items-center justify-between text-[12px] text-neutral-500">
          <span className="inline-flex items-center gap-2">
            <span>
              청크 <span className="font-semibold text-fuchsia-600">{cleared}</span>/{total}
            </span>
            {best !== undefined && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-fuchsia-500/10 px-1.5 py-0.5 text-[10.5px] font-semibold text-fuchsia-600 ring-1 ring-fuchsia-500/20">
                ⏱ 최고 {formatOrderTime(best)}
              </span>
            )}
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

/** 전자책 모드 카드 본문 — 전체 영문+번역을 한 화면에서 읽기 (진도 없음) */
function EbookCardBody({ deck, onStart }: { deck: WarmupDeck; onStart: () => void }) {
  return (
    <>
      <div className="px-5 sm:px-6">
        <div className="flex items-center justify-between text-[12px] text-neutral-500">
          <span>{deck.total}문장 · {deck.sections.length}챕터</span>
          <span className="font-semibold text-sky-600">영문 + 번역 한눈에</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-900/[0.06]">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2.5 px-5 pb-5 sm:px-6">
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="btn-primary min-h-[48px] flex-1 text-[15px]"
        >
          📚 전자책 열기
        </motion.button>
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
