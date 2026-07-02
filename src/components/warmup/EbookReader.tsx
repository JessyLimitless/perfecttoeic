"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { WarmupDeck } from "@/lib/warmup-loader";
import { ArrowLeft } from "./icons";

/** 전역 1~100 번호가 매겨진 문장 (오디오 파일명 = no zero-pad 3) */
interface EbookSentence {
  no: number;
  en: string;
  ko: string;
}
interface EbookSection {
  idx: number;
  titleEn: string;
  titleKo: string;
  sentences: EbookSentence[];
}

function buildSections(deck: WarmupDeck): EbookSection[] {
  let no = 0;
  return deck.sections.map((sec, idx) => ({
    idx,
    titleEn: sec.titleEn,
    titleKo: sec.titleKo,
    sentences: sec.sentences.map((s) => ({ no: ++no, en: s.en, ko: s.ko })),
  }));
}

const pad3 = (n: number) => String(n).padStart(3, "0");

/**
 * 몸풀기 전자책 뷰 — 책 한 권의 영문+번역을 섹션별로 한 화면에 이어서 읽는다.
 * 기초/기본 난이도는 라우트 슬러그(deck.id)로 결정됨. 원어민 음원(문장별 🔊 + 오디오북 전체듣기) 지원.
 * 모바일 우선 반응형.
 */
export default function EbookReader({ deck }: { deck: WarmupDeck }) {
  const router = useRouter();
  const sections = useMemo(() => buildSections(deck), [deck]);

  const [showKo, setShowKo] = useState(true);
  const [slow, setSlow] = useState(false);

  // 원어민 음원 (없으면 재생 UI 숨김)
  const [hasAudio, setHasAudio] = useState(false);
  const [hasFull, setHasFull] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [playingNo, setPlayingNo] = useState<number | null>(null);
  const curAudioRef = useRef<HTMLAudioElement | null>(null);
  const slowRef = useRef(slow);
  useEffect(() => {
    slowRef.current = slow;
    if (curAudioRef.current) curAudioRef.current.playbackRate = slow ? 0.75 : 1;
  }, [slow]);

  const fullSrc = `/audio/warmup/${deck.id}/${deck.id}-full.mp3`;

  useEffect(() => {
    let alive = true;
    setHasAudio(false);
    setHasFull(false);
    fetch(`/audio/warmup/${deck.id}/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => {
        if (alive && m && typeof m.total === "number" && m.total > 0) setHasAudio(true);
      })
      .catch(() => {});
    fetch(fullSrc, { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setHasFull(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [deck.id, fullSrc]);

  const stop = () => {
    const a = curAudioRef.current;
    if (a) a.pause();
    curAudioRef.current = null;
    setPlayingNo(null);
  };
  // 언마운트 시 정지
  useEffect(() => () => stop(), []);

  const playNo = (no: number) => {
    if (playingNo === no) {
      stop();
      return;
    }
    stop();
    const a = new Audio(`/audio/warmup/${deck.id}/${pad3(no)}.mp3`);
    a.playbackRate = slowRef.current ? 0.75 : 1;
    a.onended = () => {
      if (curAudioRef.current === a) {
        curAudioRef.current = null;
        setPlayingNo(null);
      }
    };
    curAudioRef.current = a;
    setPlayingNo(no);
    a.play().catch(() => {
      if (curAudioRef.current === a) {
        curAudioRef.current = null;
        setPlayingNo(null);
      }
    });
  };

  const total = deck.total;
  const cover = deck.bookNo === 1 ? "📕" : deck.bookNo === 2 ? "📗" : "📘";
  const levelLabel = deck.level === "basic" ? "기초편" : "기본편";
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="container-narrow relative min-h-dvh overflow-hidden py-5 pb-safe sm:py-8">
      {/* 컬러 오라 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-8 -z-10 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-indigo-400/25 via-violet-400/20 to-sky-400/15 blur-[80px]"
      />

      {/* 상단 네비 */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/warmup")}
          className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700 active:scale-95"
        >
          <ArrowLeft size={16} /> 책 목록
        </button>
        <span
          className={`chip ring-1 normal-case tracking-normal ${
            deck.level === "basic"
              ? "bg-amber-500/10 text-amber-600 ring-amber-500/20"
              : "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20"
          }`}
        >
          {levelLabel}
        </span>
      </div>

      {/* 책 표지 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mt-4 flex items-center gap-4"
      >
        <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-[26px] shadow-md ring-1 ring-black/5">
          <span className="drop-shadow-sm">{cover}</span>
        </div>
        <div className="min-w-0">
          <p className="label">전자책 · Book {deck.bookNo}</p>
          <h1 className="mt-0.5 truncate text-[19px] font-extrabold tracking-[-0.02em] text-neutral-900 sm:text-[22px]">
            {deck.titleKo}
          </h1>
          <p className="truncate text-[12.5px] italic text-neutral-400">
            {deck.titleEn} · {total}문장
          </p>
        </div>
      </motion.div>

      {/* 툴바 — 한글 보기 / 느리게 / (모바일에서 wrap) */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShowKo((v) => !v)}
          aria-pressed={showKo}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold ring-1 transition active:scale-95 ${
            showKo
              ? "bg-indigo-500/15 text-indigo-600 ring-indigo-500/25"
              : "bg-white/70 text-neutral-400 ring-neutral-900/[0.06] hover:text-neutral-600"
          }`}
        >
          🇰🇷 한글 {showKo ? "보임" : "숨김"}
        </button>
        {hasAudio && (
          <button
            type="button"
            onClick={() => setSlow((s) => !s)}
            aria-pressed={slow}
            className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[12.5px] font-semibold ring-1 transition active:scale-95 ${
              slow
                ? "bg-indigo-500/15 text-indigo-600 ring-indigo-500/25"
                : "bg-white/70 text-neutral-400 ring-neutral-900/[0.06] hover:text-neutral-600"
            }`}
          >
            🐢 {slow ? "0.75x" : "느리게"}
          </button>
        )}
      </div>

      {/* 오디오북 — 책 전체 듣기 */}
      {hasFull && (
        <div className="mt-3 rounded-2xl bg-indigo-50/60 px-3.5 py-3 ring-1 ring-indigo-500/15">
          <button
            type="button"
            onClick={() => setShowBook((v) => !v)}
            className="flex w-full items-center justify-between text-[13px] font-semibold text-indigo-600"
            aria-expanded={showBook}
          >
            <span className="inline-flex items-center gap-1.5">🎧 오디오북 · 전체 듣기</span>
            <span className="text-[11px] text-indigo-400">{showBook ? "닫기 ▲" : "펼치기 ▼"}</span>
          </button>
          {showBook && <audio className="mt-2.5 w-full" controls preload="none" src={fullSrc} />}
        </div>
      )}

      {/* 본문 — 섹션별 문장 (영문 + 번역) */}
      <div className="card-elevated mt-5 overflow-hidden">
        <div className="pointer-events-none h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
        <div className="px-4 py-5 sm:px-7 sm:py-7">
          {sections.map((sec) => (
            <section key={sec.idx} className="mb-8 last:mb-0">
              {/* 챕터 헤더 */}
              <div className="mb-4 border-b border-neutral-900/[0.06] pb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-indigo-600 ring-1 ring-indigo-500/15">
                  Chapter {sec.idx + 1}
                </span>
                <h2 className="mt-2 text-[16px] font-bold tracking-[-0.01em] text-neutral-900 sm:text-[17px]">
                  {sec.titleKo}
                </h2>
                <p className="text-[12px] italic text-neutral-400">{sec.titleEn}</p>
              </div>

              {/* 문장들 */}
              <ol className="space-y-3.5">
                {sec.sentences.map((s) => {
                  const isPlaying = playingNo === s.no;
                  return (
                    <li key={s.no} className="flex gap-2.5 sm:gap-3">
                      <span className="tabnum mt-0.5 w-6 shrink-0 text-right text-[12px] font-extrabold text-indigo-400 sm:w-7 sm:text-[13px]">
                        {s.no}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <p className="min-w-0 flex-1 text-[15.5px] font-medium leading-[1.5] tracking-[-0.01em] text-neutral-900 sm:text-[17px]">
                            {s.en}
                          </p>
                          {hasAudio && (
                            <button
                              type="button"
                              onClick={() => playNo(s.no)}
                              aria-label={isPlaying ? "발음 멈춤" : "원어민 발음 듣기"}
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] ring-1 transition active:scale-90 ${
                                isPlaying
                                  ? "bg-indigo-500 text-white ring-indigo-500"
                                  : "bg-white text-indigo-500 ring-indigo-500/20 hover:bg-indigo-50"
                              }`}
                            >
                              {isPlaying ? "⏸" : "🔊"}
                            </button>
                          )}
                        </div>
                        {showKo && (
                          <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-500 sm:text-[15px]">
                            {s.ko}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>

      {/* 하단 — 목록으로 */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => router.push("/warmup")}
          className="btn-ghost min-h-[48px] w-full text-[14px]"
        >
          ← 책 목록으로
        </button>
      </div>
    </main>
  );
}
