"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  loadRank,
  simulateLeaderboard,
  RANK_EVENT,
  resetRank,
} from "@/game/rank/store";
import { rankFromRp, rpToNextDivision, type RankPos } from "@/game/rank/types";
import LevelHud from "@/components/progression/LevelHud";
import ResetButton from "@/components/warmup/ResetButton";
import JennyAvatar from "@/components/match/JennyAvatar";
import { jennyChapterForRp } from "@/game/match/jenny";
import RankLadder from "./RankLadder";
import Leaderboard from "./Leaderboard";

interface View {
  rankPos: RankPos;
  rp: number;
  wins: number;
  losses: number;
  winStreak: number;
  peakRp: number;
}

function read(): View {
  const st = loadRank();
  return {
    rankPos: rankFromRp(st.rp),
    rp: st.rp,
    wins: st.wins,
    losses: st.losses,
    winStreak: st.winStreak,
    peakRp: st.peakRp,
  };
}

const PARTS = [5, 6, 7] as const;

export default function RankHome() {
  const router = useRouter();
  const [v, setV] = useState<View | null>(null);
  const [part, setPart] = useState<number>(7);

  const refresh = useCallback(() => setV(read()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(RANK_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(RANK_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  // ── SSR/최초 마운트 전: 스켈레톤 ──
  if (!v) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-11 rounded-2xl" />
        <div className="skeleton h-52 rounded-3xl" />
        <div className="skeleton h-14 rounded-2xl" />
        <div className="skeleton h-64 rounded-3xl" />
        <div className="skeleton h-64 rounded-3xl" />
      </div>
    );
  }

  const { rankPos, rp } = v;
  const tier = rankPos.tier;
  const toNext = rpToNextDivision(rp);
  const chapter = jennyChapterForRp(rp);

  return (
    <div className="flex flex-col gap-5">
      {/* 레벨 HUD (클릭 → 프로필) */}
      <button
        type="button"
        onClick={() => router.push("/profile")}
        className="text-left active:scale-[0.99]"
        aria-label="내 프로필 열기"
      >
        <LevelHud variant="bar" />
      </button>

      {/* ───────── 랭크 엠블럼 히어로 ───────── */}
      <section className="surface-dark relative overflow-hidden px-6 py-7">
        {/* 티어 컬러 앰비언트 글로우 */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${tier.gradient} opacity-25 blur-3xl`}
        />
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tier.gradient}`}
        />

        <div className="relative flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${tier.gradient} text-[42px] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]`}
          >
            {tier.emoji}
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                시즌
              </span>
              {v.winStreak > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-black text-orange-300">
                  🔥 {v.winStreak}연승
                </span>
              )}
            </div>
            <h2 className="mt-1.5 text-[26px] font-black tracking-[-0.02em] text-white">
              {rankPos.label}
            </h2>
            <p className="tabnum text-[13px] font-bold text-white/50">
              {rp.toLocaleString()} RP
              <span className="ml-2 font-medium text-white/30">
                최고 {v.peakRp.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* 디비전 진행바 */}
        <div className="relative mt-5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.span
              className={`block h-full rounded-full bg-gradient-to-r ${tier.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(rankPos.ratio * 100)}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-white/40">
            <span className="tabnum">
              {rankPos.isMaster
                ? `${rankPos.rpIntoDivision} LP`
                : `${rankPos.rpIntoDivision}/${rankPos.divisionSpan} RP`}
            </span>
            <span>다음까지 {toNext}</span>
          </div>
        </div>

        {/* 전적 */}
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <Stat label="승" value={v.wins} tone="win" />
          <Stat label="패" value={v.losses} tone="loss" />
          <Stat
            label="승률"
            value={
              v.wins + v.losses > 0
                ? `${Math.round((v.wins / (v.wins + v.losses)) * 100)}%`
                : "—"
            }
          />
        </div>
      </section>

      {/* ───────── 파트 선택 + 대결 시작 CTA ───────── */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="label">파트 선택</span>
          <span className="text-[11px] font-medium text-neutral-400">
            Part 5 · 6 · 7 중 택1
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PARTS.map((p) => {
            const active = part === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPart(p)}
                className={`relative min-h-[46px] rounded-2xl text-[14px] font-bold transition active:scale-[0.97] ${
                  active
                    ? "text-white"
                    : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:text-neutral-800"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="rank-part-pill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-[0_10px_24px_-12px_rgba(79,70,229,0.7)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">Part {p}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => router.push(`/match?ranked=1&part=${part}`)}
          className="btn-dark min-h-[58px] w-full text-[16px] font-black active:scale-[0.98]"
        >
          ⚔️ 랭크 대결 시작
        </button>
        <p className="text-center text-[12px] leading-relaxed text-neutral-500">
          문제를 풀수록 RP가 오르고 티어가 올라갑니다.
          <br className="sm:hidden" />
          봇은 내 랭크에 맞춰 강해져요.
        </p>
      </section>

      {/* ───────── 제니와의 대결 (스토리) ───────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 p-5 ring-1 ring-fuchsia-900/[0.06]">
        <div className="flex items-center gap-4">
          <JennyAvatar size={64} motionPreset="idle" glow />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-fuchsia-600/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-fuchsia-600">
                CH.{chapter.no}
              </span>
              <span className="text-[11px] font-bold text-neutral-400">
                {chapter.tier} 챕터
              </span>
            </div>
            <h3 className="mt-1 text-[17px] font-black tracking-[-0.01em] text-neutral-900">
              제니와의 대결 · {chapter.title}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-neutral-500">
              {chapter.tagline}
            </p>
          </div>
        </div>
        <p className="mt-3 rounded-2xl bg-white/80 px-4 py-3 text-[13px] font-semibold leading-snug text-neutral-700 ring-1 ring-fuchsia-900/[0.05]">
          <span className="text-fuchsia-600">제니</span>: “{chapter.greeting}”
        </p>
      </section>

      {/* ───────── 래더 ───────── */}
      <RankLadder current={rankPos} />

      {/* ───────── 리더보드 ───────── */}
      <Leaderboard rows={simulateLeaderboard(rp)} />

      {/* ───────── 미션 · 리그 · 상점 진입 ───────── */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => router.push("/missions")}
          className="flex min-h-[52px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-[13px] font-black text-white shadow-[0_10px_24px_-12px_rgba(192,38,211,0.7)] transition active:scale-[0.97]"
        >
          🎯 미션
        </button>
        <button
          type="button"
          onClick={() => router.push("/league")}
          className="flex min-h-[52px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-[13px] font-black text-white shadow-[0_10px_24px_-12px_rgba(79,70,229,0.7)] transition active:scale-[0.97]"
        >
          🏆 리그
        </button>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="flex min-h-[52px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-[13px] font-black text-white shadow-[0_10px_24px_-12px_rgba(245,158,11,0.7)] transition active:scale-[0.97]"
        >
          🛒 상점
        </button>
      </div>

      {/* ───────── 푸터 ───────── */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push("/diagnostic")}
          className="text-[12px] font-semibold text-indigo-500 underline-offset-2 hover:underline"
        >
          레벨 진단으로 배치 재산정 →
        </button>
        <ResetButton
          onReset={() => {
            resetRank();
            refresh();
          }}
          title="랭크를 초기화할까요?"
          description="RP·전적·연승이 모두 지워지며 되돌릴 수 없어요."
          confirmLabel="초기화"
          triggerLabel="랭크 초기화"
          variant="icon"
        />
      </div>
    </div>
  );
}

// ─────────────────────────── 전적 스탯 타일 ───────────────────────────

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: "win" | "loss";
}) {
  const color =
    tone === "win"
      ? "text-emerald-300"
      : tone === "loss"
        ? "text-rose-300"
        : "text-white";
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3 py-2.5 text-center ring-1 ring-white/[0.06]">
      <div className={`text-[20px] font-black tabnum ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold text-white/40">{label}</div>
    </div>
  );
}
