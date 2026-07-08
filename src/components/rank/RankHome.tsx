"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ResetButton from "@/components/warmup/ResetButton";
import JennyAvatar from "@/components/match/JennyAvatar";
import { jennyChapterForGrade, MATCH_DOMAINS, type MatchDomain } from "@/game/match/jenny";
import {
  loadMastery,
  buildMasteryView,
  resetMastery,
  type MasteryView,
  type PartTotals,
  type MasteryPart,
} from "@/game/mastery";
import { gradeProgress, GRADES } from "@/game/conquest";
import { usePracticeStore } from "@/game/store";
import type { PassageSet } from "@/game/types";

/** RC 문제은행 로드 (정복 복습 드릴 시작용) */
async function fetchRcSets(): Promise<PassageSet[] | undefined> {
  try {
    const r = await fetch("/api/sets");
    if (!r.ok) return undefined;
    const { sets } = (await r.json()) as { sets: PassageSet[] };
    return Array.isArray(sets) && sets.length > 0 ? sets : undefined;
  } catch {
    return undefined;
  }
}

const PARTS_BY_DOMAIN: Record<MatchDomain, readonly number[]> = {
  rc: [5, 6, 7],
  lc: [2, 3, 4],
};
const DEFAULT_PART: Record<MatchDomain, number> = { rc: 7, lc: 3 };
const PART_LABEL: Record<MasteryPart, string> = {
  2: "Part 2 · 응답",
  3: "Part 3 · 대화",
  4: "Part 4 · 담화",
  5: "Part 5 · 단문",
  6: "Part 6 · 장문",
  7: "Part 7 · 독해",
};
const EASE = [0.22, 1, 0.36, 1] as const;

export default function RankHome() {
  const router = useRouter();
  const [view, setView] = useState<MasteryView | null>(null);
  const [domain, setDomain] = useState<MatchDomain>("rc");
  const [part, setPart] = useState<number>(7);
  const [drilling, setDrilling] = useState(false);
  const practiceConquest = usePracticeStore((s) => s.practiceConquest);

  /** RC 파트 정복 복습 드릴 시작 (미정복 문항만 반복) */
  const startRcConquest = useCallback(
    async (p: number) => {
      if (drilling) return;
      setDrilling(true);
      const sets = await fetchRcSets();
      practiceConquest({ part: p as 5 | 6 | 7, sets });
      router.push("/game");
    },
    [drilling, practiceConquest, router],
  );

  /** 파트 행 진입 — 파트별 정복 상세 페이지 */
  const openPart = useCallback(
    (p: number) => {
      router.push(`/conquest/${p}`);
    },
    [router],
  );

  const refresh = useCallback(() => {
    fetch("/api/part-totals")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const totals: PartTotals = d?.totals ?? {};
        setView(buildMasteryView(loadMastery(), totals));
      })
      .catch(() => setView(buildMasteryView(loadMastery(), {})));
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  if (!view) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-52 rounded-3xl" />
        <div className="skeleton h-14 rounded-2xl" />
        <div className="skeleton h-64 rounded-3xl" />
      </div>
    );
  }

  const gp = gradeProgress(view.overallCoverage);
  const grade = gp.grade;
  const chapter = jennyChapterForGrade(grade.id);

  return (
    <div className="flex flex-col gap-5">
      {/* ───────── 정복 등급 히어로 ───────── */}
      <section className="surface-dark relative overflow-hidden px-6 py-7">
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${grade.gradient} opacity-25 blur-3xl`}
        />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${grade.gradient}`} />

        <div className="relative flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${grade.gradient} text-[42px] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]`}
          >
            {grade.emoji}
          </motion.div>

          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
              정복 등급
            </span>
            <h2 className="mt-1.5 text-[26px] font-black tracking-[-0.02em] text-white">
              {grade.label}
            </h2>
            <p className="text-[13px] font-bold text-white/50">{grade.tagline}</p>
          </div>
        </div>

        {/* 다음 등급까지 진행 */}
        <div className="relative mt-5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.span
              className={`block h-full rounded-full bg-gradient-to-r ${grade.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(gp.ratio * 100)}%` }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-white/40">
            <span className="tabnum">전체 정복 {view.overallCoverage}%</span>
            <span>
              {gp.next ? `${gp.next.label}까지 ${gp.toNextPct}%p` : "실전 만점까지 " + gp.toNextPct + "%p"}
            </span>
          </div>
        </div>

        {/* 요약 */}
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <Stat label="정복 문항" value={view.masteredTotal.toLocaleString()} />
          <Stat label="정복 영역" value={`${view.conqueredParts}/6`} tone="win" />
          <Stat label="만점까지" value={`${view.remaining.toLocaleString()}`} tone="loss" />
        </div>
      </section>

      {/* ───────── 영역별 목표 성취도 ───────── */}
      <section className="rounded-3xl bg-white p-5 ring-1 ring-neutral-900/[0.06]">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[15px] font-black tracking-tight text-neutral-900">
            영역별 목표 성취도
          </h3>
          <span className="text-[11px] font-semibold text-neutral-400">각 영역 100% = 만점 정복 👑</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {view.parts.map((p) => (
            <button
              key={p.part}
              type="button"
              onClick={() => openPart(p.part)}
              className="rounded-2xl bg-neutral-50 px-3.5 py-3 text-left ring-1 ring-neutral-900/[0.05] transition hover:bg-neutral-100 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-neutral-800">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-black ${
                      p.domain === "LC" ? "bg-cyan-500/15 text-cyan-600" : "bg-violet-500/15 text-violet-600"
                    }`}
                  >
                    {p.domain}
                  </span>
                  {PART_LABEL[p.part]}
                  {p.conquered && <span>👑</span>}
                </span>
                <span className="tabnum text-[11px] font-bold text-neutral-400">
                  {p.mastered}/{p.total || "—"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    p.conquered
                      ? "from-amber-400 to-yellow-500"
                      : p.domain === "LC"
                        ? "from-cyan-400 to-sky-500"
                        : "from-violet-400 to-fuchsia-500"
                  }`}
                  style={{ width: `${p.coverage}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10.5px] font-semibold">
                <span className="text-neutral-500">
                  {p.coverage}% 정복
                  {p.pending > 0 && (
                    <span className="ml-1.5 text-amber-600">· 복습 {p.pending}</span>
                  )}
                </span>
                <span className="text-neutral-400">{p.accuracy === null ? "미응시" : `정답률 ${p.accuracy}%`}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ───────── 무대 + 파트 선택 + 대결 CTA ───────── */}
      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(MATCH_DOMAINS) as MatchDomain[]).map((d) => {
            const meta = MATCH_DOMAINS[d];
            const active = domain === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDomain(d);
                  setPart(DEFAULT_PART[d]);
                }}
                className={`relative overflow-hidden rounded-2xl px-4 py-3 text-left transition active:scale-[0.98] ${
                  active ? "text-white" : "bg-white text-neutral-600 ring-1 ring-neutral-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="rank-domain-pill"
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${meta.gradient}`}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative block text-[14px] font-black">
                  {meta.emoji} {meta.label}
                </span>
                <span className={`relative block text-[11px] ${active ? "text-white/75" : "text-neutral-400"}`}>
                  {meta.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PARTS_BY_DOMAIN[domain].map((p) => {
            const active = part === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPart(p)}
                className={`relative min-h-[46px] rounded-2xl text-[14px] font-bold transition active:scale-[0.97] ${
                  active ? "text-white" : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:text-neutral-800"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="rank-part-pill"
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${MATCH_DOMAINS[domain].gradient} shadow-[0_10px_24px_-12px_rgba(79,70,229,0.7)]`}
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
          onClick={() => router.push(`${MATCH_DOMAINS[domain].route}?ranked=1&part=${part}`)}
          className="btn-dark min-h-[58px] w-full text-[16px] font-black active:scale-[0.98]"
        >
          {MATCH_DOMAINS[domain].emoji} {MATCH_DOMAINS[domain].label}로 정복하기
        </button>

        {/* 정복 복습 — 미정복 문항만 차분히 반복해 정복 확정 */}
        <button
          type="button"
          disabled={drilling}
          onClick={() =>
            domain === "rc"
              ? void startRcConquest(part)
              : router.push(`/listening?part=${part}`)
          }
          className="min-h-[50px] w-full rounded-2xl bg-white text-[14px] font-bold text-emerald-700 ring-1 ring-emerald-500/25 transition hover:bg-emerald-50 active:scale-[0.98] disabled:opacity-60"
        >
          {drilling
            ? "정복 복습 준비 중…"
            : `🎯 Part ${part} 정복 복습 · 미정복만 반복`}
        </button>

        <p className="text-center text-[12px] leading-relaxed text-neutral-500">
          빌류킹과 겨루며 맞힌 문항이 그대로 정복도로 쌓입니다.
          <br className="sm:hidden" />
          듣기·읽기 모든 영역을 정복해야 정상에 오릅니다.
        </p>
      </section>

      {/* ───────── 빌류킹과의 대결 (스토리) ───────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 p-5 ring-1 ring-fuchsia-900/[0.06]">
        <div className="flex items-center gap-4">
          <JennyAvatar size={64} motionPreset="idle" glow />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-fuchsia-600/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-fuchsia-600">
                CH.{chapter.no}
              </span>
              <span className="text-[11px] font-bold text-neutral-400">{chapter.gradeLabel} 챕터</span>
            </div>
            <h3 className="mt-1 text-[17px] font-black tracking-[-0.01em] text-neutral-900">
              빌류킹과의 대결 · {chapter.title}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-neutral-500">{chapter.tagline}</p>
          </div>
        </div>
        <p className="mt-3 rounded-2xl bg-white/80 px-4 py-3 text-[13px] font-semibold leading-snug text-neutral-700 ring-1 ring-fuchsia-900/[0.05]">
          <span className="text-fuchsia-600">빌류킹</span>: “{chapter.greeting}”
        </p>
      </section>

      {/* ───────── 정복 등급 사다리 ───────── */}
      <section className="rounded-3xl bg-white p-5 ring-1 ring-neutral-900/[0.06]">
        <h3 className="mb-3 text-[15px] font-black tracking-tight text-neutral-900">정복 등급 사다리</h3>
        <div className="flex flex-col gap-1.5">
          {[...GRADES].reverse().map((g) => {
            const isCurrent = g.id === grade.id;
            const reached = view.overallCoverage >= g.minCoverage;
            return (
              <div
                key={g.id}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${
                  isCurrent
                    ? "bg-neutral-900 text-white shadow-md"
                    : reached
                      ? "bg-neutral-50 ring-1 ring-neutral-900/[0.05]"
                      : "bg-white ring-1 ring-neutral-100"
                }`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${g.gradient} text-[18px] shadow`}>
                  {g.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[14px] font-black ${isCurrent ? "text-white" : "text-neutral-800"}`}>
                    {g.label}
                  </span>
                  <span className={`block text-[11px] ${isCurrent ? "text-white/60" : "text-neutral-400"}`}>
                    정복도 {g.minCoverage}%+ · {g.tagline}
                  </span>
                </span>
                {isCurrent && (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-neutral-900">현재</span>
                )}
                {!isCurrent && reached && <span className="text-[13px]">✓</span>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── 푸터 ───────── */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push("/diagnostic")}
          className="text-[12px] font-semibold text-indigo-500 underline-offset-2 hover:underline"
        >
          레벨 진단으로 실력 점검 →
        </button>
        <ResetButton
          onReset={() => {
            resetMastery();
            refresh();
          }}
          title="정복 기록을 초기화할까요?"
          description="모든 영역의 정복도·정답률이 지워지며 되돌릴 수 없어요."
          confirmLabel="초기화"
          triggerLabel="정복 초기화"
          variant="icon"
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: "win" | "loss";
}) {
  const color = tone === "win" ? "text-emerald-300" : tone === "loss" ? "text-amber-300" : "text-white";
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3 py-2.5 text-center ring-1 ring-white/[0.06]">
      <div className={`text-[19px] font-black tabnum ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold text-white/40">{label}</div>
    </div>
  );
}
