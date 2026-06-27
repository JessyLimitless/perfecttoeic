"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQUENCE = ["3", "2", "1", "START"] as const;

/** 대결 시작 연출 — 3·2·1·START 풀스크린 오버레이. 끝나면 onDone() 호출. */
export default function CountdownIntro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  // onDone 최신값 유지 (effect는 1회만 실행)
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // 각 단계 약 0.8초, START 후 잠깐 보여주고 종료
    timers.push(setTimeout(() => setStep(1), 800));
    timers.push(setTimeout(() => setStep(2), 1600));
    timers.push(setTimeout(() => setStep(3), 2400));
    timers.push(setTimeout(() => onDoneRef.current(), 3200));
    return () => timers.forEach(clearTimeout);
  }, []);

  const current = SEQUENCE[Math.min(step, SEQUENCE.length - 1)];
  const isStart = current === "START";

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh flex-col items-center justify-center gap-7 overflow-hidden bg-neutral-950/90 px-5 backdrop-blur-md">
      {/* 앰비언트 글로우 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-3xl" />
      </div>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200 ring-1 ring-white/15"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
        대결 시작 준비
      </motion.span>

      <div className="relative z-10 flex h-44 w-44 items-center justify-center">
        {/* 맥동 링 — 숫자 단계마다 퍼져나가는 이중 링 */}
        {!isStart && (
          <>
            <span className="absolute h-32 w-32 rounded-full ring-2 ring-fuchsia-400/25 animate-ping-slow" />
            <span className="absolute h-24 w-24 rounded-full bg-fuchsia-500/10 blur-xl" />
          </>
        )}
        {/* START 폭발 링 */}
        {isStart && (
          <motion.span
            initial={{ scale: 0.3, opacity: 0.7 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute h-28 w-28 rounded-full ring-2 ring-emerald-300/60"
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ scale: 0.4, opacity: 0, rotate: isStart ? -8 : 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-gradient-to-br bg-clip-text font-black leading-none text-transparent drop-shadow ${
              isStart
                ? "from-emerald-200 via-teal-200 to-cyan-200 text-6xl tracking-tight sm:text-7xl"
                : "from-indigo-200 via-fuchsia-200 to-fuchsia-300 text-[7rem] sm:text-[9rem]"
            }`}
          >
            {current}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="relative z-10 text-[13px] text-neutral-400">
        {isStart ? "행운을 빕니다!" : "곧 첫 문항이 시작됩니다…"}
      </p>
    </div>
  );
}
