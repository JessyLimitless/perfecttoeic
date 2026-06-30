"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { WarmupDeck } from "@/lib/warmup-loader";
import {
  deckOrder,
  firstUnclearedChunk,
  loadOrder,
  recordChunk,
  resetOrderDeck,
} from "@/game/order";

interface PoolItem {
  /** 청크 내 정답 위치 0~9 */
  pos: number;
  no: number; // 전역 일련번호 1~100
  en: string;
  ko: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OrderingGame({ deck }: { deck: WarmupDeck }) {
  const router = useRouter();
  const chunks = deck.sections; // 각 섹션 = 10문장 청크
  const chunkCount = chunks.length;

  const [chunkIdx, setChunkIdx] = useState(0);
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [placed, setPlaced] = useState<PoolItem[]>([]);
  const [wrongPos, setWrongPos] = useState<number | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [showKo, setShowKo] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  const mistakesRef = useRef(0);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initChunk = useCallback(
    (idx: number) => {
      const sec = chunks[idx];
      const items: PoolItem[] = sec.sentences.map((s, pos) => ({
        pos,
        no: idx * 10 + pos + 1,
        en: s.en,
        ko: s.ko,
      }));
      setPool(shuffle(items));
      setPlaced([]);
      setWrongPos(null);
      setWrongCount(0);
      setCleared(false);
      mistakesRef.current = 0;
    },
    [chunks],
  );

  // 진도 복원 — 첫 미클리어 청크부터
  useEffect(() => {
    const d = deckOrder(loadOrder(), deck.id);
    const start = firstUnclearedChunk(d, chunkCount);
    setChunkIdx(start);
    initChunk(start);
    setReady(true);
  }, [deck.id, chunkCount, initChunk]);

  const expectedNext = placed.length;

  const pick = useCallback(
    (item: PoolItem) => {
      if (cleared) return;
      if (item.pos === expectedNext) {
        // 정답
        setPlaced((p) => [...p, item]);
        setPool((p) => p.filter((x) => x.pos !== item.pos));
        setWrongCount(0);
        setWrongPos(null);
        if (expectedNext + 1 >= chunks[chunkIdx].sentences.length) {
          setCleared(true);
          recordChunk(deck.id, chunkIdx, mistakesRef.current);
        }
      } else {
        // 오답 — 흔들림 + 실수 카운트
        mistakesRef.current += 1;
        setWrongCount((c) => c + 1);
        setWrongPos(item.pos);
        if (shakeTimer.current) clearTimeout(shakeTimer.current);
        shakeTimer.current = setTimeout(() => setWrongPos(null), 500);
      }
    },
    [cleared, expectedNext, chunkIdx, chunks, deck.id],
  );

  // 2회 이상 틀리면 정답 카드 힌트
  const hintPos = wrongCount >= 2 ? expectedNext : null;

  const goNext = useCallback(() => {
    const next = chunkIdx + 1;
    if (next >= chunkCount) {
      setDone(true);
      return;
    }
    setChunkIdx(next);
    initChunk(next);
  }, [chunkIdx, chunkCount, initChunk]);

  const replayChunk = useCallback(() => initChunk(chunkIdx), [chunkIdx, initChunk]);

  const restartAll = useCallback(() => {
    resetOrderDeck(deck.id);
    setChunkIdx(0);
    initChunk(0);
    setDone(false);
  }, [deck.id, initChunk]);

  useEffect(() => {
    return () => {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    };
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  const overallPct = ((chunkIdx * 10 + placed.length) / (chunkCount * 10)) * 100;

  // ── 전체 완료 ──────────────────────────────────────
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
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
            className="text-[54px]"
          >
            🏆
          </motion.div>
          <h1 className="mt-3 text-[22px] font-extrabold tracking-[-0.02em] text-neutral-900">
            스토리 전체 완성!
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
            「{deck.titleKo}」 {chunkCount}개 청크를 모두 순서대로 맞췄어요.
            <br />
            이야기 흐름이 머릿속에 자리 잡았을 거예요.
          </p>
          <div className="mt-8 flex flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={restartAll}
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
              책 목록으로
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  if (!ready) {
    return <main className="container-narrow min-h-dvh py-12" />;
  }

  return (
    <main className="container-narrow relative flex min-h-dvh flex-col overflow-hidden py-5 pb-safe sm:py-7">
      {/* 컬러 오라 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-400/28 via-pink-400/22 to-indigo-400/20 blur-[80px]"
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
          🧩 <span className="max-w-[34vw] truncate">{deck.titleKo}</span>
        </span>
        <span className="tabnum text-[13px] font-bold text-neutral-700">
          청크 {chunkIdx + 1}
          <span className="text-neutral-300"> / {chunkCount}</span>
        </span>
      </div>

      {/* 진도 바 */}
      <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-neutral-900/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
          animate={{ width: `${overallPct}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* 테마 + 뜻 토글 */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-500/10 px-2.5 py-1 text-[12px] font-bold text-fuchsia-600 ring-1 ring-fuchsia-500/15">
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-fuchsia-500" />
          {chunks[chunkIdx].titleKo}
        </span>
        <button
          type="button"
          onClick={() => setShowKo((v) => !v)}
          className={`rounded-full px-3 py-1 text-[12px] font-semibold transition ${
            showKo
              ? "bg-fuchsia-500/10 text-fuchsia-600 ring-1 ring-fuchsia-500/20"
              : "text-neutral-400 ring-1 ring-neutral-200 hover:text-neutral-600"
          }`}
        >
          뜻 {showKo ? "끄기" : "보기"}
        </button>
      </div>

      {cleared ? (
        // ── 청크 클리어 ──────────────────────────────
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 13 }}
            className="text-[46px]"
          >
            {mistakesRef.current === 0 ? "🎯" : "✅"}
          </motion.div>
          <h2 className="mt-3 text-[19px] font-extrabold text-neutral-900">
            {mistakesRef.current === 0 ? "완벽해요! 실수 0" : "청크 완성!"}
          </h2>
          <p className="mt-1.5 text-[13px] text-neutral-500">
            {chunks[chunkIdx].titleKo} · 실수 {mistakesRef.current}회
          </p>

          {/* 완성된 순서 미리보기 */}
          <div className="mt-5 w-full space-y-1.5 text-left">
            {placed.map((it) => (
              <div
                key={it.pos}
                className="flex items-start gap-2.5 rounded-xl bg-white/70 px-3.5 py-2.5 ring-1 ring-neutral-900/[0.05]"
              >
                <span className="tabnum text-gradient mt-0.5 text-[13px] font-extrabold">
                  {it.no}.
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] leading-snug text-neutral-800">{it.en}</p>
                  {showKo && <p className="mt-0.5 text-[12px] text-neutral-400">{it.ko}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex w-full flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={goNext}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-h-[52px] w-full text-[15px]"
            >
              {chunkIdx + 1 >= chunkCount ? "스토리 완성하기 🏆" : "다음 청크 →"}
            </motion.button>
            <button
              type="button"
              onClick={replayChunk}
              className="btn-ghost min-h-[48px] w-full text-[14px]"
            >
              이 청크 다시
            </button>
          </div>
        </div>
      ) : (
        // ── 진행 중 ──────────────────────────────────
        <div className="mt-4 flex flex-1 flex-col">
          {/* 배치된 순서 */}
          {placed.length > 0 && (
            <div className="mb-4 space-y-1.5">
              <AnimatePresence initial={false}>
                {placed.map((it) => (
                  <motion.div
                    key={it.pos}
                    layout
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease }}
                    className="flex items-start gap-2.5 rounded-xl bg-emerald-50/80 px-3.5 py-2.5 ring-1 ring-emerald-500/15"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                      ✓
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] leading-snug text-neutral-800">{it.en}</p>
                      {showKo && <p className="mt-0.5 text-[12px] text-neutral-400">{it.ko}</p>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* 다음 문장 선택 */}
          <p className="mb-2 text-[12px] font-semibold text-neutral-500">
            다음 문장은?{" "}
            <span className="text-neutral-300">
              ({placed.length} / {chunks[chunkIdx].sentences.length} 완성)
            </span>
          </p>
          <div className="space-y-2">
            {pool.map((it) => {
              const isWrong = wrongPos === it.pos;
              const isHint = hintPos === it.pos;
              return (
                <motion.button
                  key={it.pos}
                  type="button"
                  onClick={() => pick(it)}
                  animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex w-full items-start gap-2.5 rounded-xl border-l-[3px] px-3.5 py-3 text-left transition ${
                    isWrong
                      ? "border-rose-400 bg-rose-50 ring-1 ring-rose-400"
                      : isHint
                        ? "border-amber-400 bg-amber-50 ring-1 ring-amber-400 animate-glow-pulse"
                        : "border-fuchsia-300/70 bg-white ring-1 ring-neutral-900/[0.06] hover:border-fuchsia-400 hover:bg-fuchsia-50/40 hover:ring-fuchsia-400/40"
                  }`}
                >
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400/30 to-pink-400/30 ring-1 ring-fuchsia-400/20" />
                  <div className="min-w-0">
                    <p className="text-[14px] leading-snug text-neutral-800">{it.en}</p>
                    {showKo && <p className="mt-0.5 text-[12px] text-neutral-400">{it.ko}</p>}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {wrongCount > 0 && (
            <p className="mt-3 text-center text-[12px] text-rose-400">
              순서가 달라요. {wrongCount >= 2 ? "노란색 문장을 찾아보세요." : "다시 골라보세요."}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
