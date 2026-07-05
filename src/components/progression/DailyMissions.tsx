"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  todaysMissions,
  todaysBonus,
  claimMission,
  seasonInfo,
  MISSIONS_EVENT,
  type Mission,
  type SeasonInfo,
} from "@/game/progression/missions";
import { PROGRESS_EVENT } from "@/game/progression/store";

// 컴포넌트가 그리는 스냅샷
interface Snap {
  missions: Mission[];
  bonus: Mission;
  season: SeasonInfo;
}

function read(): Snap {
  return {
    missions: todaysMissions(),
    bonus: todaysBonus(),
    season: seasonInfo(),
  };
}

/**
 * 일일 미션 카드 (마운트형, props 없음).
 * 오늘의 3대 미션 + 올클리어 보너스 + 시즌 배지/남은 일수를 표시.
 * MISSIONS_EVENT·PROGRESS_EVENT·focus에 더해 ~2s 폴링·visibilitychange를 구독해
 * 게임을 마치고 돌아오면 진행도가 즉시 반영된다. 마운트 전엔 스켈레톤.
 */
export default function DailyMissions() {
  const [snap, setSnap] = useState<Snap | null>(null);
  // 완료(done)로 이미 관측한 미션 id 집합 — 새로 완료된 미션만 골라 강조/토스트.
  const seenDoneRef = useRef<Set<string>>(new Set());
  // 첫 refresh는 현재 완료 상태를 "이미 본 것"으로 시딩만 하고 토스트는 띄우지 않음.
  const seededRef = useRef(false);
  // 방금 완료돼 축하 토스트를 띄울 미션 (제목만 사용)
  const [toast, setToast] = useState<{ id: string; title: string } | null>(null);
  // 방금 완료돼 잠깐 펄스 강조할 카드 id
  const [pulseId, setPulseId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const next = read();
    const all = [...next.missions, next.bonus];
    const doneNow = new Set(all.filter((m) => m.done).map((m) => m.id));

    if (seededRef.current) {
      // 이전엔 완료가 아니었는데 지금 완료 && 미수령 → 새로 달성된 미션
      const flipped = all.find(
        (m) => m.done && !m.claimed && !seenDoneRef.current.has(m.id),
      );
      if (flipped) {
        setToast({ id: flipped.id, title: flipped.title });
        setPulseId(flipped.id);
      }
    }
    seenDoneRef.current = doneNow; // 롤오버/수령으로 done이 풀리면 다음날 다시 트리거 가능
    seededRef.current = true;
    setSnap(next);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(MISSIONS_EVENT, refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    // 다른 탭/게임 화면에서 돌아왔을 때 즉시 반영
    const onVis = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVis);
    // 가벼운 폴링(localStorage 읽기뿐, 네트워크 없음) — 인게임 진행이 곧바로 보이도록
    const iv = window.setInterval(refresh, 2000);
    return () => {
      window.removeEventListener(MISSIONS_EVENT, refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(iv);
    };
  }, [refresh]);

  // 토스트 자동 소멸 (~2.6s), 펄스 강조 자동 해제 (~1.4s)
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!pulseId) return;
    const t = window.setTimeout(() => setPulseId(null), 1400);
    return () => window.clearTimeout(t);
  }, [pulseId]);

  // 마운트 전 스켈레톤 (SSR 안전 + 레이아웃 밀림 방지)
  if (!snap) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-24 rounded-[1.75rem]" />
        <div className="skeleton h-28 rounded-3xl" />
        <div className="skeleton h-28 rounded-3xl" />
        <div className="skeleton h-28 rounded-3xl" />
      </div>
    );
  }

  const { missions, bonus, season } = snap;
  const claimable = missions.filter((m) => m.done && !m.claimed).length + (bonus.done && !bonus.claimed ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* ── 시즌 배지 ── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="surface-dark relative overflow-hidden px-6 py-5"
      >
        <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 opacity-30 blur-3xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
              현재 시즌
            </div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-[28px] font-black leading-none tracking-tight text-white">
                시즌 {season.id % 1000}
              </span>
              <span className="tabnum text-[12px] font-semibold text-white/50">
                {season.dayOfSeason}일차 / 7일
              </span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-fuchsia-200 ring-1 ring-white/10">
            ⏳ {season.daysLeft}일 남음
          </span>
        </div>

        {/* 시즌 진행바 */}
        <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-400"
            initial={{ width: 0 }}
            animate={{ width: `${Math.round((season.dayOfSeason / 7) * 100)}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 26 }}
          />
        </div>

        <div className="relative mt-3 text-[12px] text-white/55">
          {claimable > 0 ? (
            <span className="font-semibold text-amber-300">
              🎉 수령 가능한 보상 {claimable}개
            </span>
          ) : (
            <>매일 미션을 달성하고 크레딧·XP를 모으세요.</>
          )}
        </div>
      </motion.section>

      {/* ── 일일 미션 목록 ── */}
      <div className="space-y-3">
        {missions.map((m, i) => (
          <MissionCard key={m.id} m={m} index={i} onClaim={refresh} highlight={pulseId === m.id} />
        ))}
      </div>

      {/* ── 올클리어 보너스 ── */}
      <MissionCard
        m={bonus}
        index={missions.length}
        onClaim={refresh}
        bonus
        highlight={pulseId === bonus.id}
      />

      {/* ── 방금 달성 토스트 (미수령 → 받으라는 신호) ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit max-w-[92vw] items-center gap-2.5 rounded-2xl bg-neutral-900/95 px-4 py-3 text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur"
          >
            <span className="text-lg">🎉</span>
            <span className="min-w-0 truncate text-[13px] font-bold">
              미션 달성! <span className="text-amber-300">{toast.title}</span> — 보상을 받으세요
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** 개별 미션 카드 (진행바 + 수령 버튼) */
function MissionCard({
  m,
  index,
  onClaim,
  bonus = false,
  highlight = false,
}: {
  m: Mission;
  index: number;
  onClaim: () => void;
  bonus?: boolean;
  /** 방금 완료돼 잠깐 강조(펄스)할지 여부 */
  highlight?: boolean;
}) {
  const [flash, setFlash] = useState(false);
  const ratio = m.target > 0 ? Math.min(1, m.current / m.target) : 0;
  const claimable = m.done && !m.claimed;

  const handleClaim = () => {
    const r = claimMission(m.id);
    if (r) {
      setFlash(true);
      setTimeout(() => setFlash(false), 900);
      onClaim();
    }
  };

  const accent = bonus
    ? "from-amber-400 to-orange-500"
    : m.claimed
      ? "from-emerald-400 to-teal-500"
      : "from-indigo-400 via-violet-400 to-fuchsia-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={
        highlight
          ? { opacity: 1, y: 0, scale: [1, 1.02, 1] }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ delay: index * 0.05, type: "spring", stiffness: 220, damping: 26 }}
      className={`card-elevated relative overflow-hidden px-5 py-4 transition-shadow ${
        highlight
          ? "ring-2 ring-amber-300 shadow-[0_0_0_4px_rgba(252,211,77,0.18)]"
          : bonus
            ? "ring-1 ring-amber-200/70"
            : ""
      }`}
    >
      {bonus && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
      )}

      <div className="flex items-start gap-3.5">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl ${
            m.done
              ? `bg-gradient-to-br ${accent} shadow-sm`
              : "bg-neutral-100 ring-1 ring-neutral-900/[0.05]"
          }`}
        >
          {m.done && !bonus ? "✓" : m.icon}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[15px] font-extrabold tracking-tight text-neutral-900">
              {m.title}
            </h3>
            {m.claimed && (
              <span className="chip shrink-0 bg-emerald-100/80 text-emerald-700">완료</span>
            )}
          </div>
          <p className="mt-0.5 text-[12px] text-neutral-500">{m.desc}</p>

          {/* 진행바 */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <motion.span
                className={`block h-full rounded-full bg-gradient-to-r ${accent}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(ratio * 100)}%` }}
                transition={{ type: "spring", stiffness: 160, damping: 26 }}
              />
            </div>
            <span className="tabnum shrink-0 text-[12px] font-bold text-neutral-400">
              {m.current}/{m.target}
            </span>
          </div>

          {/* 보상 + 수령 */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {m.reward.credits > 0 && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200/70">
                  🪙 {m.reward.credits}
                </span>
              )}
              {m.reward.xp > 0 && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 ring-1 ring-violet-200/70">
                  ✨ {m.reward.xp} XP
                </span>
              )}
            </div>

            {m.claimed ? (
              <span className="shrink-0 text-[12px] font-bold text-emerald-500">수령 완료</span>
            ) : (
              <button
                type="button"
                onClick={handleClaim}
                disabled={!claimable}
                className={`shrink-0 rounded-xl px-4 py-2 text-[13px] font-bold transition active:scale-[0.97] ${
                  claimable
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_10px_24px_-12px_rgba(99,102,241,0.8)] hover:brightness-110"
                    : "cursor-not-allowed bg-neutral-100 text-neutral-400"
                }`}
              >
                {claimable ? "받기" : "진행 중"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 수령 플래시 */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-[1px]"
          >
            <span className="text-gradient text-[22px] font-black">+보상 획득! 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
