"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const MAX_CHARS = 3000;
const ease = [0.22, 1, 0.36, 1] as const;

const SAMPLES = [
  "Thank you for calling TOEIC customer support. Our office hours are from nine to six, Monday through Friday.",
  "The quarterly sales report indicates a significant increase in revenue across all regional branches.",
  "Once upon a time in a land far away, there lived four little characters who ran through a maze looking for cheese.",
];

function slugForFilename(text: string): string {
  const base = text
    .trim()
    .slice(0, 40)
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return base || "tts-audio";
}

export default function TtsStudio() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [slow, setSlow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const urlRef = useRef<string | null>(null);

  // 이전 objectURL 정리 (메모리 누수 방지)
  const setUrl = useCallback((url: string | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = url;
    setAudioUrl(url);
  }, []);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const generate = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("읽을 원문을 입력하세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, slow }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "음성 생성에 실패했습니다.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setUrl(url);
      // 생성 직후 자동 재생
      requestAnimationFrame(() => {
        audioRef.current?.load();
        audioRef.current?.play().catch(() => {});
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "음성 생성에 실패했습니다.");
      setUrl(null);
    } finally {
      setLoading(false);
    }
  }, [text, slow, setUrl]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      generate();
    }
  };

  const count = text.length;
  const over = count > MAX_CHARS;

  return (
    <main className="container-narrow relative flex min-h-dvh flex-col overflow-hidden py-5 pb-safe sm:py-8">
      {/* 컬러 오라 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[36%] -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400/30 via-cyan-400/25 to-teal-400/20 blur-[80px]"
      />

      {/* 상단 */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="-ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700"
        >
          ← 홈
        </button>
        <span className="chip ring-1 ring-neutral-900/[0.05] normal-case tracking-normal text-neutral-500">
          🔊 <span>TTS 스튜디오</span>
        </span>
        <span className="w-10" />
      </div>

      {/* 헤더 */}
      <div className="mt-5 text-center">
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-neutral-900 sm:text-[28px]">
          영어 <span className="text-gradient">발음 듣기</span>
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
          원문을 넣으면 영어 화자 목소리로 읽어줍니다 · 재생하고 mp3로 저장하세요
        </p>
      </div>

      {/* 입력 시트 */}
      <div className="sheet relative mt-5 overflow-hidden bg-gradient-to-b from-white via-white to-sky-50/70 px-5 py-6 sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />

        <label className="mb-2 block text-[12px] font-semibold text-sky-600">원문 (영어)</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={5}
          placeholder="여기에 영어 문장을 붙여넣으세요…"
          className="w-full resize-y rounded-2xl border-0 bg-sky-50/60 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 ring-1 ring-sky-500/15 outline-none transition placeholder:text-neutral-300 focus:bg-white focus:ring-2 focus:ring-sky-500/40 sm:text-[16px]"
        />

        {/* 글자수 · 샘플 */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {SAMPLES.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setText(s)}
                className="rounded-full bg-neutral-900/[0.05] px-2.5 py-1 text-[11px] font-medium text-neutral-500 transition hover:bg-sky-500/10 hover:text-sky-600"
              >
                예시 {i + 1}
              </button>
            ))}
          </div>
          <span className={`tabnum text-[11px] font-medium ${over ? "text-rose-500" : "text-neutral-400"}`}>
            {count} / {MAX_CHARS}
          </span>
        </div>

        {/* 속도 토글 */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-neutral-200">
          <div>
            <p className="text-[13px] font-semibold text-neutral-700">천천히 읽기</p>
            <p className="text-[11px] text-neutral-400">받아쓰기·따라 말하기 연습에 유용</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={slow}
            onClick={() => setSlow((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${slow ? "bg-sky-500" : "bg-neutral-300"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${slow ? "left-[22px]" : "left-0.5"}`}
            />
          </button>
        </div>

        {/* 생성 버튼 */}
        <motion.button
          type="button"
          onClick={generate}
          disabled={loading || !text.trim() || over}
          whileHover={{ scale: loading ? 1 : 1.008 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="btn-primary mt-5 min-h-[52px] w-full text-[15px] disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              음성 만드는 중…
            </span>
          ) : (
            "🔊 소리 생성"
          )}
        </motion.button>

        <p className="mt-2 hidden text-center text-[11px] text-neutral-400 sm:block">
          <kbd className="rounded bg-neutral-900/[0.06] px-1.5 py-0.5 text-[10px] font-semibold">Ctrl/⌘ + Enter</kbd>{" "}
          로도 생성돼요
        </p>

        {/* 에러 */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-center text-[12px] font-medium text-rose-600 ring-1 ring-rose-500/15"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 결과 플레이어 */}
      <AnimatePresence>
        {audioUrl && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="card-elevated mt-4 overflow-hidden px-5 py-5 sm:px-7"
          >
            <div className="flex items-center gap-2 text-[12px] font-semibold text-teal-600">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-teal-500" />
              생성된 음성
            </div>
            <audio ref={audioRef} src={audioUrl} controls className="mt-3 w-full">
              브라우저가 오디오 재생을 지원하지 않습니다.
            </audio>
            <a
              href={audioUrl}
              download={`${slugForFilename(text)}.mp3`}
              className="btn-ghost mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 text-[14px]"
            >
              ⬇️ mp3 다운로드
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
