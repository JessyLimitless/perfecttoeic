"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { useMatchStore } from "@/game/match/matchStore";
import { loadIdentity } from "@/game/match/persist";
import { MATCH_LENGTH, secondsForPart, type AvatarPresetId } from "@/game/match/types";
import PlayerAvatar from "./PlayerAvatar";

/** 인게임 상단 얇은 바 — 좌측 점수(나 vs AI), 우측 상단 심플 타이머, 하단 AI 진행선.
 *  시험지 느낌을 살리기 위해 무거운 다크 HUD 대신 가벼운 한 줄 바로 구성. */
export default function MatchHud() {
  const userName = useMatchStore((s) => s.user.name);
  const [avatarId, setAvatarId] = useState<AvatarPresetId>("default");
  useEffect(() => {
    setAvatarId(loadIdentity().avatarId ?? "default");
  }, [userName]);

  const userScore = useMatchStore((s) => s.user.score);
  const aiScore = useMatchStore((s) => s.ai.score);
  const aiName = useMatchStore((s) => s.ai.name);
  const aiProgress = useMatchStore((s) => s.aiProgress);
  const qIndex = useMatchStore((s) => s.qIndex);
  const remaining = useMatchStore((s) => s.remaining);
  const answered = useMatchStore((s) => s.answered);
  const part = useMatchStore((s) => s.part);

  const secs = Math.max(0, remaining);
  const danger = !answered && remaining <= 5;
  const leading = userScore > aiScore ? "user" : aiScore > userScore ? "ai" : null;
  const aiRatio = Math.min(1, Math.max(0, aiProgress));
  const aiSolved = aiRatio >= 1;

  // mm:ss 심플 표기 (카운트다운 느낌으로 올림)
  const t = Math.ceil(secs);
  const clock = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  return (
    <div className="card sticky top-3 z-30 overflow-hidden px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex items-center justify-between gap-3">
        {/* ── 좌측: 점수 (나 vs AI) ── */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* 나 */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative shrink-0">
              <PlayerAvatar name={userName} size={30} avatarId={avatarId} />
              {leading === "user" && (
                <span className="absolute -right-1.5 -top-2 text-[12px]">👑</span>
              )}
            </div>
            <div className="min-w-0 leading-none">
              <p className="mb-0.5 hidden truncate text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-500 sm:block">
                {userName}
              </p>
              <AnimatedNumber
                value={userScore}
                className={`tabnum text-xl font-extrabold leading-none sm:text-2xl ${
                  leading === "user" ? "text-indigo-600" : "text-neutral-900"
                }`}
              />
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-neutral-400">
            VS
          </span>

          {/* AI */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="min-w-0 text-right leading-none">
              <p className="mb-0.5 hidden truncate text-[10px] font-bold uppercase tracking-[0.08em] text-fuchsia-500 sm:block">
                {aiName}
              </p>
              <AnimatedNumber
                value={aiScore}
                className={`tabnum text-xl font-extrabold leading-none sm:text-2xl ${
                  leading === "ai" ? "text-fuchsia-600" : "text-neutral-900"
                }`}
              />
            </div>
            <div className="relative shrink-0">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-[12px] font-bold text-white shadow-[0_5px_14px_-6px_rgba(124,58,237,0.7)]">
                🤖
              </span>
              {leading === "ai" && (
                <span className="absolute -left-1.5 -top-2 text-[12px]">👑</span>
              )}
            </div>
          </div>
        </div>

        {/* ── 우측 상단: 심플 타이머 ── */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="hidden text-[11px] font-semibold text-neutral-400 sm:inline">
            문항 {Math.min(qIndex + 1, MATCH_LENGTH)}/{MATCH_LENGTH}
          </span>
          <motion.span
            animate={danger ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, repeat: danger ? Infinity : 0 }}
            className={`tabnum inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[17px] font-extrabold tracking-tight sm:text-[19px] ${
              danger
                ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                : "bg-neutral-900 text-white"
            }`}
          >
            <span className={`text-[11px] ${danger ? "" : "text-white/60"}`}>⏱</span>
            {clock}
          </motion.span>
        </div>
      </div>

      {/* ── 하단 얇은 AI 진행선 (봇이 답을 제출하기까지) ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-neutral-100">
        <motion.div
          className={`h-full ${
            aiSolved
              ? "bg-emerald-400"
              : "bg-gradient-to-r from-indigo-400 to-fuchsia-500"
          }`}
          animate={{ width: `${aiRatio * 100}%` }}
          transition={{ ease: "linear", duration: 0.12 }}
        />
      </div>
    </div>
  );
}
