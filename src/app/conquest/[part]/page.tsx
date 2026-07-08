"use client";

// 파트별 정복 상세 — 한 파트의 정복/복습 대기/미착수를 한눈에 + 복습 대기(계속 틀리는) 문항 목록 + 정복 드릴 진입.
// RC(5·6·7)는 문항 목록·드릴 제공, LC(2·3·4)는 요약 + 리스닝 복습 진입.

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "@/components/warmup/icons";
import {
  loadMastery,
  buildMasteryView,
  partDomain,
  MASTER_STREAK,
  type MasteryState,
  type MasteryPart,
  type PartTotals,
} from "@/game/mastery";
import { usePracticeStore } from "@/game/store";
import { partOf } from "@/game/parts";
import type { PassageSet, PassageQuestion } from "@/game/types";
import type { ListeningSet } from "@/game/listening";
import {
  loadListeningProgress,
  setConquestStatus,
  type ListeningProgressState,
  type SetConquestStatus,
} from "@/game/listeningProgress";

const VALID: MasteryPart[] = [2, 3, 4, 5, 6, 7];
const PART_LABEL: Record<MasteryPart, string> = {
  2: "Part 2 · 응답",
  3: "Part 3 · 대화",
  4: "Part 4 · 담화",
  5: "Part 5 · 단문 공란",
  6: "Part 6 · 장문 공란",
  7: "Part 7 · 독해",
};
const EASE = [0.22, 1, 0.36, 1] as const;

interface PendingQ {
  q: PassageQuestion;
  streak: number;
  passageType: string;
}

interface PendingLcSet {
  id: string;
  passageType: string;
  status: SetConquestStatus;
  mastered: number;
  total: number;
  bestCorrect: number | null;
}

export default function ConquestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const raw = Number(Array.isArray(params.part) ? params.part[0] : params.part);
  const part = (VALID.includes(raw as MasteryPart) ? raw : 0) as MasteryPart | 0;

  const [total, setTotal] = useState(0);
  const [sets, setSets] = useState<PassageSet[] | null>(null);
  const [lcSets, setLcSets] = useState<ListeningSet[] | null>(null);
  const [progress, setProgress] = useState<ListeningProgressState>({});
  const [state, setState] = useState<MasteryState | null>(null);
  const practiceConquest = usePracticeStore((s) => s.practiceConquest);

  useEffect(() => {
    if (!part) {
      router.replace("/rank");
      return;
    }
    setState(loadMastery());
    fetch("/api/part-totals")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const totals: PartTotals = d?.totals ?? {};
        setTotal(totals[part] ?? 0);
      })
      .catch(() => setTotal(0));
    if (part >= 5) {
      fetch("/api/sets")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => setSets(Array.isArray(d?.sets) ? d.sets : []))
        .catch(() => setSets([]));
    } else {
      setProgress(loadListeningProgress());
      fetch("/api/listening")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => setLcSets(Array.isArray(d?.sets) ? d.sets : []))
        .catch(() => setLcSets([]));
    }
  }, [part, router]);

  const pv = useMemo(() => {
    if (!state || !part) return null;
    return buildMasteryView(state, { [part]: total }).parts.find((p) => p.part === part) ?? null;
  }, [state, total, part]);

  // 복습 대기(streak 0~1) 문항 — RC만 콘텐츠 표시
  const pending = useMemo<PendingQ[]>(() => {
    if (!state || !part || part < 5 || !sets) return [];
    const streaks = state.parts[part].streaks;
    const out: PendingQ[] = [];
    for (const s of sets) {
      if (partOf(s) !== part) continue;
      for (const q of s.questions) {
        const st = streaks[q.id];
        if (st !== undefined && st < MASTER_STREAK) {
          out.push({ q, streak: st, passageType: s.passageType });
        }
      }
    }
    // 아직 안 맞힌(streak 0)부터 먼저
    return out.sort((a, b) => a.streak - b.streak);
  }, [state, sets, part]);

  // 복습 대기 세트 (LC) — 미정복(복습 대기·미착수) 세트, 복습 대기 우선
  const lcPending = useMemo<PendingLcSet[]>(() => {
    if (!state || !part || part >= 5 || !lcSets) return [];
    const out: PendingLcSet[] = [];
    for (const s of lcSets) {
      if (s.part !== part) continue;
      const ids =
        s.part === 2
          ? (s.items ?? []).map((i) => i.id)
          : (s.questions ?? []).map((q) => q.id);
      const { status, mastered, total } = setConquestStatus(ids, part, state);
      // 복습 대기 = 시도했지만 미정복(pending)만. 미착수·정복 완료는 제외(RC 문항목록과 동일 의미).
      if (status !== "pending") continue;
      const p = progress[s.id];
      out.push({
        id: s.id,
        passageType: s.passageType ?? s.id,
        status,
        mastered,
        total,
        bestCorrect: p ? p.bestCorrect : null,
      });
    }
    return out;
  }, [state, lcSets, progress, part]);

  if (!part || !pv) {
    return (
      <main className="container-narrow flex min-h-dvh items-center justify-center">
        <div className="skeleton h-40 w-full rounded-3xl" />
      </main>
    );
  }

  const domain = partDomain(part);
  const untouched = Math.max(total - pv.attempted, 0);
  const isRc = part >= 5;

  const startDrill = () => {
    if (isRc) {
      practiceConquest({ part: part as 5 | 6 | 7, sets: sets ?? undefined });
      router.push("/game");
    } else {
      // 복습 대기 세트가 있으면 복습 모드로 진입
      router.push(`/listening?part=${part}${pv.pending > 0 ? "&review=1" : ""}`);
    }
  };

  return (
    <main className="container-narrow pb-safe pt-5">
      {/* 상단 바 */}
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/rank")}
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white pl-2.5 pr-4 text-[13px] font-bold text-neutral-600 ring-1 ring-neutral-900/[0.06] transition hover:bg-neutral-50 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" /> 정복 현황
        </button>
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
            domain === "LC" ? "bg-cyan-500/15 text-cyan-600" : "bg-violet-500/15 text-violet-600"
          }`}
        >
          {domain}
        </span>
      </header>

      {/* 히어로 — 정복도 링 + 통계 */}
      <section className="mt-4 surface-dark relative overflow-hidden px-6 py-7">
        <span
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${
            domain === "LC" ? "bg-cyan-500/20" : "bg-violet-500/20"
          }`}
        />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-[24px] font-black tracking-tight text-white sm:text-[28px]">
              {PART_LABEL[part]}
              {pv.conquered && <span className="ml-1.5">👑</span>}
            </h1>
            <p className="mt-1.5 text-[13px] font-semibold text-white/50">
              {pv.conquered
                ? "이 파트를 100% 정복했어요."
                : `복습 대기 ${pv.pending}문항을 0으로 줄이면 정복 완료`}
            </p>
          </div>
          <Ring pct={pv.coverage} domain={domain} />
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Tile label="정복" value={pv.mastered} tone="win" />
          <Tile label="복습 대기" value={pv.pending} tone="warn" />
          <Tile label="미착수" value={untouched} />
          <Tile label="총 문항" value={total} />
        </div>

        <button
          type="button"
          onClick={startDrill}
          className="relative mt-6 min-h-[54px] w-full rounded-2xl bg-white text-[15px] font-black text-neutral-900 shadow-lg transition hover:shadow-xl active:scale-[0.98]"
        >
          {isRc
            ? pv.pending > 0
              ? `🎯 복습 대기 ${pv.pending}문항 정복하기`
              : "🎯 정복 복습 시작 · 미정복만 반복"
            : pv.pending > 0
              ? "🎧 복습 대기 세트 풀기"
              : "🎧 리스닝으로 새 세트 풀기"}
        </button>
      </section>

      {/* 복습 대기 세트 (LC) */}
      {!isRc && (
        <section className="mt-5">
          <div className="mb-2.5 flex items-center gap-2 px-1">
            <p className="label">복습 대기 세트</p>
            {lcSets === null ? (
              <span className="text-[12px] text-neutral-400">불러오는 중…</span>
            ) : (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold tabnum text-white">
                {lcPending.length}
              </span>
            )}
          </div>

          {lcSets !== null && lcPending.length === 0 ? (
            <div className="card px-6 py-10 text-center">
              <div className="text-3xl">🎉</div>
              <p className="mt-2 font-bold text-neutral-900">복습 대기 세트가 없어요</p>
              <p className="mt-1 text-[13px] text-neutral-500">
                {pv.attempted === 0
                  ? "아직 이 파트를 풀지 않았어요. 리스닝으로 시작해보세요."
                  : "지금까지 푼 세트는 모두 정복했습니다. 새 세트를 이어가세요."}
              </p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {lcPending.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.2), duration: 0.18, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => router.push(`/listening/${s.id}`)}
                    className="card flex w-full items-center gap-3 p-4 text-left transition hover:-translate-y-0.5"
                  >
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                        s.status === "pending"
                          ? "bg-amber-500/15 text-amber-600"
                          : "bg-cyan-500/12 text-cyan-600"
                      }`}
                    >
                      {s.status === "pending" ? "복습 대기" : "미착수"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-neutral-900">
                        {s.passageType}
                      </span>
                      <span className="block text-[12px] text-neutral-400">
                        정복 {s.mastered}/{s.total} 문항
                        {s.bestCorrect !== null && (
                          <span className="ml-1.5">· 최고 {s.bestCorrect}/{s.total}</span>
                        )}
                      </span>
                    </span>
                    <span className="shrink-0 text-cyan-400">→</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* 복습 대기 문항 (RC) */}
      {isRc && (
        <section className="mt-5">
          <div className="mb-2.5 flex items-center gap-2 px-1">
            <p className="label">복습 대기 문항</p>
            {sets === null ? (
              <span className="text-[12px] text-neutral-400">불러오는 중…</span>
            ) : (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold tabnum text-white">
                {pending.length}
              </span>
            )}
          </div>

          {sets !== null && pending.length === 0 ? (
            <div className="card px-6 py-10 text-center">
              <div className="text-3xl">🎉</div>
              <p className="mt-2 font-bold text-neutral-900">복습 대기 문항이 없어요</p>
              <p className="mt-1 text-[13px] text-neutral-500">
                {pv.attempted === 0
                  ? "아직 이 파트를 풀지 않았어요. 정복 복습으로 시작해보세요."
                  : "지금까지 푼 문항은 모두 정복했습니다. 새 문항을 이어가세요."}
              </p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {pending.slice(0, 40).map(({ q, streak, passageType }, i) => (
                <motion.li
                  key={q.id + i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.2), duration: 0.18, ease: EASE }}
                  className="card p-4"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                        streak === 0
                          ? "bg-rose-500/12 text-rose-600"
                          : "bg-amber-500/15 text-amber-600"
                      }`}
                    >
                      {streak === 0 ? "다시 풀어야 함" : `정복까지 ${MASTER_STREAK - streak}회`}
                    </span>
                    <span className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-500">
                      {part === 7 ? passageType : `Part ${part}`}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] font-semibold leading-relaxed text-neutral-900">
                    {q.prompt}
                  </p>
                  {q.promptKo && (
                    <p className="mt-0.5 text-[12.5px] text-neutral-400">{q.promptKo}</p>
                  )}
                </motion.li>
              ))}
              {pending.length > 40 && (
                <li className="py-2 text-center text-[12px] font-semibold text-neutral-400">
                  외 {pending.length - 40}문항 — 정복 복습에서 이어집니다
                </li>
              )}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}

function Ring({ pct, domain }: { pct: number; domain: "LC" | "RC" }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(pct, 100) / 100);
  const id = `cq-${domain}`;
  return (
    <div className="relative h-[104px] w-[104px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1, ease: EASE }}
        />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {domain === "LC" ? (
              <>
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#e879f9" />
              </>
            )}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[24px] font-black leading-none text-white">{pct}%</span>
        <span className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white/45">정복</span>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "win" | "warn";
}) {
  const color =
    tone === "win" ? "text-emerald-300" : tone === "warn" ? "text-amber-300" : "text-white";
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3 py-2.5 text-center ring-1 ring-white/[0.06]">
      <div className={`text-[20px] font-black tabnum ${color}`}>{value.toLocaleString()}</div>
      <div className="mt-0.5 text-[11px] font-semibold text-white/40">{label}</div>
    </div>
  );
}
