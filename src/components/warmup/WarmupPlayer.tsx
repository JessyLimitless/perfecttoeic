"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { WarmupDeck } from "@/lib/warmup-loader";
import { bookProgress, loadWarmupProgress, markWarmupSeen, resetWarmupBook } from "@/game/warmup";

interface FlatSentence {
  en: string;
  ko: string;
  sectionIdx: number;
  titleEn: string;
  titleKo: string;
}

function flatten(deck: WarmupDeck): FlatSentence[] {
  const out: FlatSentence[] = [];
  deck.sections.forEach((sec, sectionIdx) => {
    for (const s of sec.sentences) {
      out.push({
        en: s.en,
        ko: s.ko,
        sectionIdx,
        titleEn: sec.titleEn,
        titleKo: sec.titleKo,
      });
    }
  });
  return out;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md bg-neutral-900/[0.06] px-1.5 py-0.5 font-sans text-[10px] font-semibold text-neutral-500">
      {children}
    </kbd>
  );
}

export default function WarmupPlayer({ deck }: { deck: WarmupDeck }) {
  const router = useRouter();
  const sentences = useMemo(() => flatten(deck), [deck]);
  const total = sentences.length;

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bp = bookProgress(loadWarmupProgress(), deck.id);
    if (!bp.completed && bp.lastIndex > 0 && bp.lastIndex < total) {
      setIndex(bp.lastIndex);
    }
    setReady(true);
  }, [deck.id, total]);

  const cur = sentences[index];
  const isLast = index >= total - 1;

  const next = useCallback(() => {
    markWarmupSeen(deck.id, index, total);
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => Math.min(i + 1, total - 1));
    setRevealed(false);
  }, [deck.id, index, total, isLast]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "t") {
        e.preventDefault();
        setRevealed((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, next, prev]);

  const restart = useCallback(() => {
    resetWarmupBook(deck.id);
    setIndex(0);
    setRevealed(false);
    setDone(false);
  }, [deck.id]);

  const pct = total > 0 ? ((index + 1) / total) * 100 : 0;
  const ease = [0.22, 1, 0.36, 1] as const;

  // ── 완료 화면 ───────────────────────────────────────
  if (done) {
    return (
      <main className="container-narrow flex min-h-dvh flex-col items-center justify-center py-12 pb-safe text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="card-elevated relative w-full max-w-md overflow-hidden px-7 py-11"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
          <motion.div
            initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
            className="text-[56px]"
          >
            🎉
          </motion.div>
          <h1 className="mt-3 text-[23px] font-extrabold tracking-[-0.02em] text-neutral-900">
            완독했어요!
          </h1>
          <p className="mt-2.5 text-[14px] leading-relaxed text-neutral-500">
            「{deck.titleKo}」 <span className="font-semibold text-neutral-700">{total}문장</span>을
            모두 읽었습니다.
            <br />
            이야기 흐름과 문장 구조가 한결 익숙해졌을 거예요.
          </p>
          <div className="mt-8 flex flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={restart}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-h-[52px] w-full text-[15px]"
            >
              처음부터 다시
            </motion.button>
            <button
              type="button"
              onClick={() => router.push("/warmup")}
              className="btn-ghost min-h-[52px] w-full text-[15px]"
            >
              다른 책 고르기
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  if (!ready || !cur) {
    return <main className="container-narrow min-h-dvh py-12" />;
  }

  // ── 리더 화면 ───────────────────────────────────────
  return (
    <main className="container-narrow relative flex min-h-dvh flex-col overflow-hidden py-5 pb-safe sm:py-7">
      {/* 컬러 오라 — 카드 뒤 은은한 빛 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400/30 via-violet-400/25 to-fuchsia-400/20 blur-[80px]"
      />
      {/* 상단 */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/warmup")}
          className="-ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700"
        >
          ← 책 목록
        </button>
        <span className="chip ring-1 ring-neutral-900/[0.05] normal-case tracking-normal text-neutral-500">
          {deck.bookNo === 1 ? "📕" : "📗"}
          <span className="max-w-[40vw] truncate">{deck.titleKo}</span>
        </span>
        <span className="tabnum text-[13px] font-bold text-neutral-700">
          {index + 1}
          <span className="text-neutral-300"> / {total}</span>
        </span>
      </div>

      {/* 진도 바 */}
      <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-neutral-900/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* 문장 시트 */}
      <div className="flex flex-1 flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease }}
            className="sheet relative overflow-hidden bg-gradient-to-b from-white via-white to-indigo-50/70 px-6 py-9 sm:px-11 sm:py-14"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

            {/* 섹션 */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-indigo-600 ring-1 ring-indigo-500/15">
                <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-indigo-500" />
                {cur.titleKo}
              </span>
            </div>

            {/* 영문 — 번호를 문장 앞에 (1~100 순서 암기) */}
            <p className="mt-6 text-[21px] font-semibold leading-[1.55] tracking-[-0.015em] text-neutral-900 sm:text-[29px] sm:leading-[1.5]">
              <span className="text-gradient mr-2 font-extrabold tabnum">{index + 1}.</span>
              {cur.en}
            </p>

            {/* 번역 — 블러 → 탭 해제 */}
            <div className="mt-7 rounded-2xl bg-indigo-50/60 px-4 py-4 ring-1 ring-indigo-500/10">
              <p className="mb-2 text-[11px] font-semibold text-indigo-400">
                {revealed ? "한국어 뜻" : "먼저 스스로 해석해보세요"}
              </p>
              <div className="relative">
                <motion.p
                  animate={{
                    filter: revealed ? "blur(0px)" : "blur(7px)",
                    opacity: revealed ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.32, ease }}
                  className={`text-[15px] leading-relaxed text-neutral-600 sm:text-[17px] ${
                    revealed ? "" : "select-none"
                  }`}
                >
                  {cur.ko}
                </motion.p>
                {!revealed && (
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="뜻 보기"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-4 py-1.5 text-[12px] font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-500/15 backdrop-blur-sm transition hover:bg-white">
                      <span className="text-[13px]">👆</span> 탭하여 뜻 보기
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl text-[18px] text-neutral-500 ring-1 ring-neutral-200 transition hover:bg-white hover:ring-neutral-300 disabled:opacity-30"
          aria-label="이전 문장"
        >
          ←
        </button>
        <motion.button
          type="button"
          onClick={next}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 0.99 }}
          className="btn-primary min-h-[52px] flex-1 text-[15px]"
        >
          {isLast ? "완독하기 ✓" : "이해됐어요 →"}
        </motion.button>
      </div>

      <div className="mt-3 hidden items-center justify-center gap-2.5 text-[11px] text-neutral-400 sm:flex">
        <span className="inline-flex items-center gap-1">
          <Kbd>Space</Kbd> 다음
        </span>
        <span className="inline-flex items-center gap-1">
          <Kbd>←</Kbd> 이전
        </span>
        <span className="inline-flex items-center gap-1">
          <Kbd>T</Kbd> 뜻 보기
        </span>
      </div>
    </main>
  );
}
