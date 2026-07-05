"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  leagueStandings,
  weekInfo,
  weeklyReward,
  claimWeekly,
  PROMO_ZONE,
  RELEG_ZONE,
  GROUP_SIZE,
  type LeagueRow,
  type WeekInfo,
  type WeeklyReward,
} from "@/game/rank/league";
import { RANK_EVENT } from "@/game/rank/store";

interface View {
  week: WeekInfo;
  rows: LeagueRow[];
  reward: WeeklyReward;
}

function read(): View {
  return {
    week: weekInfo(),
    rows: leagueStandings(),
    reward: weeklyReward(),
  };
}

/**
 * 주간 리그 카드 (props 없음) — 백엔드 없이 가상 랭커와 7일간 겨루는 순위표.
 * 상위 5명 승급권(초록) · 하위 5명 강등권(빨강) · 내 행 강조.
 * 주가 바뀌면 지난주 성적 기반 보상 청구 배너 노출.
 */
export default function WeeklyLeague() {
  const [v, setV] = useState<View | null>(null);
  const [justClaimed, setJustClaimed] = useState<WeeklyReward | null>(null);

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

  const onClaim = useCallback(() => {
    const claimed = claimWeekly();
    setJustClaimed(claimed);
    refresh();
    window.setTimeout(() => setJustClaimed(null), 3200);
  }, [refresh]);

  // ── SSR / 최초 마운트 전: 스켈레톤 ──
  if (!v) {
    return (
      <div className="flex flex-col gap-5">
        <div className="skeleton h-28 rounded-3xl" />
        <div className="skeleton h-16 rounded-2xl" />
        <div className="skeleton h-96 rounded-3xl" />
      </div>
    );
  }

  const { week, rows, reward } = v;
  const weekProgress = Math.round((week.dayOfWeek / 7) * 100);

  return (
    <div className="flex flex-col gap-5">
      {/* ───────── 헤더: 주간 배지 + 남은 일수 ───────── */}
      <section className="surface-dark relative overflow-hidden px-6 py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-600 opacity-25 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-600" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                주간 리그
              </span>
              <span className="tabnum rounded-full bg-indigo-500/25 px-2.5 py-0.5 text-[11px] font-black text-indigo-200">
                W{week.week % 1000}
              </span>
            </div>
            <h2 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.02em] text-white">
              티어 리그 · TOP {GROUP_SIZE}
            </h2>
            <p className="mt-0.5 text-[12.5px] font-medium text-white/45">
              같은 티어 랭커 {GROUP_SIZE}명과의 7일 승부
            </p>
          </div>

          <div className="shrink-0 text-right">
            <div className="tabnum text-[34px] font-black leading-none text-white">
              {week.daysLeft}
              <span className="ml-1 text-[13px] font-bold text-white/45">일</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-white/40">
              종료까지
            </div>
          </div>
        </div>

        {/* 주간 진행바 */}
        <div className="relative mt-5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${weekProgress}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-white/40">
            <span>{["월", "화", "수", "목", "금", "토", "일"][week.dayOfWeek]}요일차</span>
            <span className="tabnum">{week.dayOfWeek + 1} / 7일</span>
          </div>
        </div>
      </section>

      {/* ───────── 주간 보상 청구 배너 ───────── */}
      <AnimatePresence mode="popLayout">
        {reward.claimable && (
          <motion.section
            key="claim"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-5 shadow-[0_18px_40px_-18px_rgba(245,158,11,0.8)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl"
            />
            <div className="relative flex items-center gap-4">
              <motion.div
                initial={{ scale: 0.6, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/25 text-[30px]"
              >
                🎁
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-black text-white">
                  지난주 리그 보상 도착!
                </h3>
                <p className="mt-0.5 text-[12.5px] font-semibold text-white/90">
                  {reward.placement != null && (
                    <>최종 {reward.placement}위 · </>
                  )}
                  <span className="tabnum">💰 {reward.credits}</span> 크레딧 ·{" "}
                  <span className="tabnum">✨ {reward.xp}</span> XP
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClaim}
              className="mt-4 min-h-[48px] w-full rounded-2xl bg-neutral-900 text-[15px] font-black text-white transition active:scale-[0.98]"
            >
              보상 받기
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 청구 완료 토스트 */}
      <AnimatePresence>
        {justClaimed && (
          <motion.div
            key="claimed"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/12 px-4 py-3 text-[13px] font-bold text-emerald-600 ring-1 ring-emerald-500/20"
          >
            ✅ 보상 지급 완료 · 💰 {justClaimed.credits} · ✨ {justClaimed.xp} XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── 순위표 ───────── */}
      <section className="card px-3 py-4 sm:px-4 sm:py-5">
        <div className="flex items-center justify-between px-1">
          <h3 className="label">리그 순위</h3>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-black text-emerald-600">
              ▲ 승급 {PROMO_ZONE}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/12 px-2 py-0.5 text-[10px] font-black text-rose-500">
              ▼ 강등 {RELEG_ZONE}
            </span>
          </div>
        </div>

        <ul className="mt-3 flex flex-col gap-1.5">
          {rows.map((r, i) => {
            const prevZone = i > 0 ? rows[i - 1].zone : null;
            const showDivider = prevZone !== null && prevZone !== r.zone;
            const dividerLabel =
              r.zone === "safe" ? "유지권" : r.zone === "releg" ? "강등권" : "";
            return (
              <div key={`${r.name}-${r.rank}`}>
                {showDivider && (
                  <div className="my-1.5 flex items-center gap-2 px-2">
                    <span className="h-px flex-1 bg-neutral-200" />
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                        r.zone === "releg" ? "text-rose-400" : "text-neutral-400"
                      }`}
                    >
                      {dividerLabel}
                    </span>
                    <span className="h-px flex-1 bg-neutral-200" />
                  </div>
                )}
                <LeagueRowItem row={r} index={i} />
              </div>
            );
          })}
        </ul>

        <p className="mt-3 px-1 text-[11px] font-medium text-neutral-400">
          가상 랭커 시뮬레이션 · 주가 끝나면 순위에 따라 보상을 받아요.
        </p>
      </section>
    </div>
  );
}

// ─────────────────────────── 순위 행 ───────────────────────────

function LeagueRowItem({ row, index }: { row: LeagueRow; index: number }) {
  // 색 결정: 내 행(인디고) > 승급권(초록) > 강등권(빨강) > 유지(흰색)
  const cls = row.isUser
    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white ring-indigo-400 shadow-[0_12px_28px_-16px_rgba(79,70,229,0.7)]"
    : row.zone === "promo"
      ? "bg-emerald-50 text-neutral-900 ring-emerald-500/25"
      : row.zone === "releg"
        ? "bg-rose-50 text-neutral-900 ring-rose-500/25"
        : "bg-white text-neutral-900 ring-neutral-900/[0.05]";

  const rankColor = row.isUser
    ? "text-white"
    : row.zone === "promo"
      ? "text-emerald-600"
      : row.zone === "releg"
        ? "text-rose-500"
        : "text-neutral-400";

  const scoreColor = row.isUser ? "text-white" : "text-neutral-700";

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
        delay: Math.min(index, 20) * 0.02,
      }}
      className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 ${cls}`}
    >
      {/* 순위 + 존 표시 */}
      <span
        className={`grid w-9 shrink-0 place-items-center text-[15px] font-black tabnum ${rankColor}`}
      >
        {!row.isUser && row.zone === "promo" ? (
          <span className="flex items-center gap-0.5">
            <span className="text-[10px]">▲</span>
            {row.rank}
          </span>
        ) : !row.isUser && row.zone === "releg" ? (
          <span className="flex items-center gap-0.5">
            <span className="text-[10px]">▼</span>
            {row.rank}
          </span>
        ) : (
          row.rank
        )}
      </span>

      {/* 이름 */}
      <span className="min-w-0 flex-1 truncate text-[14px] font-bold">
        {row.isUser ? "나" : row.name}
        {row.isUser && (
          <span className="ml-2 rounded-full bg-white/25 px-2 py-0.5 align-middle text-[10px] font-black">
            YOU
          </span>
        )}
      </span>

      {/* 주간 점수 */}
      <span className={`shrink-0 text-[14px] font-black tabnum ${scoreColor}`}>
        {row.score.toLocaleString()}
        <span
          className={`ml-1 text-[10px] font-bold ${
            row.isUser ? "text-white/70" : "text-neutral-400"
          }`}
        >
          pt
        </span>
      </span>
    </motion.li>
  );
}
