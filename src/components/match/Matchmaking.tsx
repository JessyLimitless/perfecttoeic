"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadIdentity } from "@/game/match/persist";
import { BOT_PROFILE } from "@/game/match/types";
import { PART_META } from "@/game/parts";
import type { Difficulty, Part } from "@/game/types";
import PlayerAvatar from "./PlayerAvatar";
import JennyAvatar from "./JennyAvatar";
import { jennyChapterForGrade } from "@/game/match/jenny";
import { useCharacter, withCharName } from "@/game/match/characters";
import { gradeFromCoverage, type GradeId } from "@/game/conquest";
import { loadMastery, masteredTotalOf } from "@/game/mastery";

/**
 * 매치메이킹 긴박감 연출.
 * 클릭(방개설) 직후 ~2.4초간 "상대를 찾는 중" → 극적 공개 → onReady().
 * 동결 계약을 건드리지 않기 위해 status를 바꾸지 않고, 부모 로컬 state로만 구동된다.
 * 공개되는 봇 정보는 BOT_PROFILE[difficulty]를 읽어 실제 대결 봇과 일치시킨다.
 */
export default function Matchmaking({
  part,
  difficulty,
  onReady,
}: {
  part: Part;
  difficulty: Difficulty;
  onReady: () => void;
}) {
  // searching → revealed
  const [phase, setPhase] = useState<"searching" | "revealed">("searching");
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // 내 신원 로드 (클라이언트 전용 — SSR 하이드레이션 안전)
  const [identity, setIdentity] = useState(() => loadIdentity());
  useEffect(() => {
    setIdentity(loadIdentity());
  }, []);

  const profile = BOT_PROFILE[difficulty];
  const accuracyPct = Math.round(profile.accuracy * 100);

  // 내 정복 등급에 맞는 빌류킹 스토리 챕터
  const [gradeId, setGradeId] = useState<GradeId>("ROOKIE");
  useEffect(() => {
    (async () => {
      let grand = 0;
      try {
        const r = await fetch("/api/part-totals");
        if (r.ok) {
          const { totals } = (await r.json()) as { totals: Record<string, number> };
          grand = Object.values(totals ?? {}).reduce((n, v) => n + (typeof v === "number" ? v : 0), 0);
        }
      } catch {
        /* 무시 */
      }
      const mastered = masteredTotalOf(loadMastery());
      const cov = grand > 0 ? (mastered / grand) * 100 : 0;
      setGradeId(gradeFromCoverage(cov).id);
    })();
  }, []);
  const chapter = jennyChapterForGrade(gradeId);
  const character = useCharacter();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // 1.8초 탐색 빌드업 → 공개 → 0.95초 후 onReady
    timers.push(setTimeout(() => setPhase("revealed"), 1800));
    timers.push(setTimeout(() => onReadyRef.current(), 2750));
    return () => timers.forEach(clearTimeout);
  }, []);

  const revealed = phase === "revealed";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-neutral-950/95 px-5 pb-safe pt-6 backdrop-blur-md"
    >
      {/* 앰비언트 글로우 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
            {PART_META[part].label} · {difficulty}
          </span>
          <h2 className="mt-4 text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em] text-white">
            <AnimatePresence mode="wait">
              <motion.span
                key={revealed ? "found" : "searching"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {revealed ? (
                  <span className="text-gradient-light">매칭 완료!</span>
                ) : (
                  <>상대를 찾는 중…</>
                )}
              </motion.span>
            </AnimatePresence>
          </h2>
        </motion.div>

        {/* 대진표: 나 vs 상대 */}
        <div className="relative flex items-stretch justify-between gap-3">
          {/* 내 프로필 (채워짐) */}
          <PlayerSlot
            label="나"
            filled
            name={identity.name}
            sub={identity.playerId}
            avatar={
              <PlayerAvatar
                name={identity.name}
                size={72}
                avatarId={identity.avatarId ?? "default"}
              />
            }
          />

          {/* VS 뱃지 */}
          <div className="flex shrink-0 items-center justify-center">
            <motion.div
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-[15px] font-black text-white shadow-[0_8px_24px_-6px_rgba(124,58,237,0.8)] animate-glow-pulse"
            >
              VS
              {revealed && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-2xl ring-2 ring-fuchsia-300"
                />
              )}
            </motion.div>
          </div>

          {/* 상대 슬롯 (탐색 → 공개) */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="searching-slot"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10"
                >
                  {/* 레이더 / 스캔 슬롯 */}
                  <div className="relative flex h-[72px] w-[72px] items-center justify-center">
                    <span className="absolute inset-0 rounded-2xl bg-white/5 animate-ping-slow" />
                    <span className="absolute inset-0 rounded-2xl skeleton-dark" />
                    <span className="relative text-3xl font-black text-white/30">
                      ?
                    </span>
                    {/* 스캔 바 */}
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent animate-scan" />
                    </span>
                  </div>
                  <div className="w-full space-y-1.5 text-center">
                    <span className="mx-auto block h-3 w-20 rounded-full skeleton-dark" />
                    <span className="mx-auto block h-2.5 w-14 rounded-full skeleton-dark" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed-slot"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 340, damping: 17 }}
                  className="relative flex h-full flex-col items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-fuchsia-500/15 to-indigo-600/10 p-4 ring-1 ring-fuchsia-400/30 shadow-[0_18px_44px_-22px_rgba(124,58,237,0.6)]"
                >
                  {/* 제니 등장! 플러리시 (잠깐 떴다 사라짐) */}
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.6 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [-2, -14, -18, -26], scale: [0.6, 1.15, 1, 0.95] }}
                    transition={{ duration: 1.6, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
                    className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-3 py-1 text-[11px] font-black text-white shadow-[0_8px_20px_-6px_rgba(217,70,239,0.9)] ring-1 ring-white/25"
                  >
                    {character.name} 등장!
                  </motion.span>

                  <motion.span
                    initial={{ rotate: -14, scale: 0.55 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 12 }}
                    className="relative"
                  >
                    {/* 등장 링 플래시 (한 번 확장) */}
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [0.5, 1.9], opacity: [0.9, 0] }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-fuchsia-300"
                    />
                    <JennyAvatar size={78} variant="idle" motionPreset="idle" glow />
                  </motion.span>
                  <div className="space-y-0.5 text-center">
                    <p className="text-[14px] font-extrabold tracking-[-0.01em] text-white">
                      {character.name}{" "}
                      <span className="text-[11px] font-semibold text-fuchsia-200/80">
                        {character.en}
                      </span>
                    </p>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-fuchsia-200/90">
                      CH.{chapter.no} · {chapter.title}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 하단 상태 라인 */}
        <div className="mt-7 text-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="searching-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-[13px] text-neutral-400"
              >
                <span className="flex gap-1">
                  <Dot delay={0} />
                  <Dot delay={0.15} />
                  <Dot delay={0.3} />
                </span>
                네트워크에서 상대를 매칭하는 중
              </motion.div>
            ) : (
              <motion.div
                key="revealed-foot"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <p className="text-[13.5px] font-semibold leading-snug text-white/90">
                  {character.name}: “{chapter.greeting}”
                </p>
                <p className="text-[12px] font-bold text-emerald-300">
                  예상 정답률 {accuracyPct}%
                </p>
                <p className="text-[12px] text-neutral-400">곧 카운트다운이 시작됩니다</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function PlayerSlot({
  label,
  filled,
  name,
  sub,
  avatar,
}: {
  label: string;
  filled: boolean;
  name: string;
  sub: string;
  avatar: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-indigo-600/5 p-4 ring-1 ring-indigo-400/30"
    >
      {avatar}
      <div className="space-y-0.5 text-center">
        <p className="max-w-[8rem] truncate text-[13px] font-extrabold text-white">
          {filled ? name : "—"}
        </p>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-indigo-200/90">
          {label} · {sub}
        </p>
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
      className="h-1.5 w-1.5 rounded-full bg-fuchsia-400"
    />
  );
}
