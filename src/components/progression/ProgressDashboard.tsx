"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  loadProgress,
  currentCredits,
  resetProgress,
  PROGRESS_EVENT,
  type ProgressState,
} from "@/game/progression/store";
import {
  levelFromXp,
  tierForLevel,
  nextMilestone,
  rewardsForLevel,
  TIERS,
  SNAKE_SKINS,
  type Reward,
} from "@/game/progression/types";
import ResetButton from "@/components/warmup/ResetButton";
import CoinIcon from "@/components/ui/CoinIcon";

// 대시보드가 실제로 그리는 스냅샷 (스토어 + 파생값)
interface Snap {
  st: ProgressState;
  level: number;
  intoLevel: number;
  span: number;
  ratio: number;
  credits: number;
}

function read(): Snap {
  const st = loadProgress();
  const info = levelFromXp(st.xp);
  return {
    st,
    level: info.level,
    intoLevel: info.intoLevel,
    span: info.span,
    ratio: info.ratio,
    credits: currentCredits(),
  };
}

/** 보상 종류별 아이콘/라벨 */
function rewardBadge(r: Reward): { icon: string; label: string } {
  switch (r.kind) {
    case "credits":
      return { icon: "🪙", label: `크레딧 ${r.amount}` };
    case "hint":
      return { icon: "💡", label: `힌트 ${r.amount}` };
    case "freeze":
      return { icon: "🔥", label: `스트릭 프리즈 ${r.amount}` };
    case "unlock":
      return { icon: "🔓", label: r.label };
  }
}

/**
 * 게임화 진행(레벨·티어·보상·스네이크 기록·인벤토리) 대시보드.
 * 스토어를 useEffect에서 읽고 `toeic-progress`·"focus"를 구독해 갱신한다.
 * 마운트 전엔 스켈레톤을 그려 SSR 안전.
 */
export default function ProgressDashboard() {
  const router = useRouter();
  const [snap, setSnap] = useState<Snap | null>(null);

  const refresh = useCallback(() => setSnap(read()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  // 마운트 전 스켈레톤 (레이아웃 밀림 방지)
  if (!snap) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-44 rounded-[1.75rem]" />
        <div className="skeleton h-28 rounded-3xl" />
        <div className="grid grid-cols-3 gap-3">
          <div className="skeleton h-24 rounded-3xl" />
          <div className="skeleton h-24 rounded-3xl" />
          <div className="skeleton h-24 rounded-3xl" />
        </div>
      </div>
    );
  }

  const { st, level, intoLevel, span, ratio, credits } = snap;
  const tier = tierForLevel(level);
  const ms = nextMilestone(level);
  const msRewards = rewardsForLevel(ms).rewards;
  const levelsLeft = Math.max(0, ms - level);
  const isEmpty =
    st.xp === 0 && st.endless.runs === 0 && st.endless.bestChain === 0;

  return (
    <div className="space-y-5">
      {/* ── 1. 히어로 신원 카드 ── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="surface-dark relative overflow-hidden px-6 py-7"
      >
        {/* 앰비언트 글로우 */}
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${tier.gradient} opacity-30 blur-3xl`}
        />
        <div className="relative flex items-center gap-4">
          <span
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tier.gradient} text-3xl shadow-lg`}
          >
            {tier.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
              {tier.label} 티어
            </div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-[34px] font-black leading-none tracking-tight text-white">
                Lv.{level}
              </span>
              <span className="tabnum text-[12px] font-semibold text-white/50">
                {intoLevel} / {span} XP
              </span>
            </div>
          </div>
        </div>

        {/* XP 진행바 */}
        <div className="relative mt-5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(ratio * 100)}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 26 }}
            />
          </div>
        </div>

        {/* 크레딧 · 스트릭 · 누적 정답 */}
        <div className="relative mt-5 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-amber-300 ring-1 ring-white/10">
            <CoinIcon size={14} /> {credits}
            <span className="font-medium text-white/45">크레딧</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-orange-300 ring-1 ring-white/10">
            🔥 {st.streak.count}
            <span className="font-medium text-white/45">일 연속</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-emerald-300 ring-1 ring-white/10">
            ✅ {st.stats.totalCorrect}
            <span className="font-medium text-white/45">정답</span>
          </span>
        </div>

        {isEmpty && (
          <p className="relative mt-5 text-[13px] leading-relaxed text-white/60">
            아직 진행 기록이 없어요. 첫 문제를 풀어 XP를 모으고, 스피드 스네이크로
            체인을 쌓아보세요! 🐍
          </p>
        )}
      </motion.section>

      {/* ── 2. 티어 사다리 ── */}
      <section className="card-elevated px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold tracking-tight text-neutral-900">
            티어 사다리
          </h2>
          <span className="label">Tier Ladder</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {TIERS.map((t) => {
            const achieved = level >= t.minLevel;
            const isCurrent = t.id === tier.id;
            return (
              <div
                key={t.id}
                className={`relative flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center ring-1 transition ${
                  isCurrent
                    ? "ring-2 ring-violet-400 ring-offset-1"
                    : "ring-neutral-900/[0.05]"
                } ${achieved ? "bg-white" : "bg-neutral-50"}`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl text-xl ${
                    achieved
                      ? `bg-gradient-to-br ${t.gradient} shadow-sm`
                      : "bg-neutral-200 grayscale"
                  }`}
                >
                  {t.emoji}
                </span>
                <span
                  className={`text-[12px] font-bold ${
                    achieved ? "text-neutral-800" : "text-neutral-400"
                  }`}
                >
                  {t.label}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    achieved ? "text-neutral-400" : "text-neutral-300"
                  }`}
                >
                  Lv.{t.minLevel}부터
                </span>
                {isCurrent && (
                  <span className="absolute -top-2 rounded-full bg-violet-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                    현재
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. 다음 보상 ── */}
      <section className="card-elevated overflow-hidden px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold tracking-tight text-neutral-900">
            다음 보물상자
          </h2>
          <span className="chip bg-amber-100/80 text-amber-700">🎁 Lv.{ms}</span>
        </div>
        <p className="mt-2 text-[13px] text-neutral-500">
          {levelsLeft > 0 ? (
            <>
              <span className="font-bold text-neutral-800">
                {levelsLeft}레벨
              </span>{" "}
              더 올리면 <span className="font-bold text-amber-600">Lv.{ms}</span>{" "}
              보물상자가 열려요.
            </>
          ) : (
            <>곧 보물상자가 열립니다!</>
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {msRewards.map((r, i) => {
            const b = rewardBadge(r);
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-[12px] font-semibold text-amber-800 ring-1 ring-amber-200/70"
              >
                {r.kind === "credits" ? (
                  <CoinIcon size={14} />
                ) : (
                  <span className="text-[14px]">{b.icon}</span>
                )}
                {b.label}
              </span>
            );
          })}
        </div>
      </section>

      {/* ── 4. 스네이크 기록 ── */}
      <section className="card-elevated px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold tracking-tight text-neutral-900">
            스피드 스네이크 기록
          </h2>
          <span className="label">Endless</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatTile icon="🐍" value={st.endless.bestChain} label="최고 체인" />
          <StatTile icon="🏆" value={st.endless.bestScore} label="최고 점수" />
          <StatTile icon="🎮" value={st.endless.runs} label="플레이 수" />
        </div>
        <button
          type="button"
          onClick={() => router.push("/snake")}
          className="btn-primary mt-4 w-full"
        >
          ⚡ 스피드 스네이크 플레이
        </button>
      </section>

      {/* ── 5. 보유 인벤토리 & 해금 ── */}
      <section className="card-elevated px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold tracking-tight text-neutral-900">
            인벤토리 & 해금
          </h2>
          <span className="label">Inventory</span>
        </div>

        {/* 소비 아이템 */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatTile icon="💡" value={st.inventory.hints} label="힌트" />
          <StatTile icon="🔥" value={st.inventory.freezes} label="스트릭 프리즈" />
        </div>

        {/* 스네이크 스킨 */}
        <div className="mt-5">
          <div className="label mb-2">해금한 스네이크 스킨</div>
          <div className="flex flex-wrap gap-2">
            {st.unlocks.snakeSkins.map((id) => {
              const skin = SNAKE_SKINS[id];
              if (!skin) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1.5 text-[12px] font-semibold text-neutral-700 ring-1 ring-neutral-900/[0.06]"
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-gradient-to-br ${skin.body} shadow-sm`}
                  />
                  {skin.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* 해금 모드 / 아바타 / 테마 (비어있으면 생략) */}
        {(st.unlocks.modes.length > 0 ||
          st.unlocks.avatars.length > 0 ||
          st.unlocks.themes.length > 0) && (
          <div className="mt-5 space-y-3">
            {st.unlocks.modes.length > 0 && (
              <UnlockRow label="해금 모드" icon="🎯" ids={st.unlocks.modes} />
            )}
            {st.unlocks.avatars.length > 0 && (
              <UnlockRow label="해금 아바타" icon="🧑‍🚀" ids={st.unlocks.avatars} />
            )}
            {st.unlocks.themes.length > 0 && (
              <UnlockRow label="해금 테마" icon="🎨" ids={st.unlocks.themes} />
            )}
          </div>
        )}
      </section>

      {/* ── 6. 초기화 ── */}
      <div className="flex items-center justify-between rounded-3xl bg-neutral-50 px-5 py-4 ring-1 ring-neutral-900/[0.04]">
        <div>
          <div className="text-[13px] font-bold text-neutral-700">진행 초기화</div>
          <div className="text-[12px] text-neutral-400">
            XP·레벨·기록·해금이 지워져요 (크레딧은 대결과 공유되어 유지)
          </div>
        </div>
        <ResetButton
          variant="icon"
          onReset={() => {
            resetProgress();
            refresh();
          }}
          title="진행을 초기화할까요?"
          description="XP·레벨·스네이크 기록·해금이 모두 지워지며 되돌릴 수 없어요. (크레딧은 대결 크레딧과 공유되어 유지될 수 있어요.)"
          confirmLabel="초기화"
          triggerLabel="진행 초기화"
        />
      </div>
    </div>
  );
}

/** 숫자 통계 타일 */
function StatTile({
  icon,
  value,
  label,
}: {
  icon: string;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-neutral-50 px-3 py-4 text-center ring-1 ring-neutral-900/[0.04]">
      <div className="text-[20px]">{icon}</div>
      <div className="tabnum mt-1 text-[22px] font-black leading-none text-neutral-900">
        {value}
      </div>
      <div className="mt-1 text-[11px] font-semibold text-neutral-400">{label}</div>
    </div>
  );
}

/** 해금 항목 칩 줄 */
function UnlockRow({
  label,
  icon,
  ids,
}: {
  label: string;
  icon: string;
  ids: string[];
}) {
  return (
    <div>
      <div className="label mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {ids.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-700 ring-1 ring-neutral-900/[0.06]"
          >
            <span>{icon}</span>
            {id}
          </span>
        ))}
      </div>
    </div>
  );
}
