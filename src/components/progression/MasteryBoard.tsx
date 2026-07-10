"use client";

// 파트별 정복 현황 대시보드 — "6파트 모두 다 맞혀 만점 정복" 스토리라인의 모니터링 판.
// 정복도(고유 정답 문항 %) + 정답률(실력)을 파트별로 보여주고, 전체 정복도로 만점까지의 여정을 시각화.
// mastery.ts(localStorage) + /api/part-totals(분모)를 결합. 하이드레이션 안전(마운트 후 렌더).

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  loadMastery,
  buildMasteryView,
  type MasteryView,
  type PartTotals,
  type MasteryPart,
} from "@/game/mastery";
import { useCharacter, josa } from "@/game/match/characters";

const PART_LABEL: Record<MasteryPart, string> = {
  2: "Part 2 · 응답",
  3: "Part 3 · 대화",
  4: "Part 4 · 담화",
  5: "Part 5 · 단문 공란",
  6: "Part 6 · 장문 공란",
  7: "Part 7 · 독해",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MasteryBoard() {
  const router = useRouter();
  const character = useCharacter();
  const [view, setView] = useState<MasteryView | null>(null);

  // 파트 진입 — 파트별 정복 상세 페이지
  const openPart = useCallback(
    (p: MasteryPart) => {
      router.push(`/conquest/${p}`);
    },
    [router],
  );

  useEffect(() => {
    let alive = true;
    fetch("/api/part-totals")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const totals: PartTotals = data?.totals ?? {};
        setView(buildMasteryView(loadMastery(), totals));
      })
      .catch(() => {
        if (alive) setView(buildMasteryView(loadMastery(), {}));
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!view) return null;

  const { overallCoverage, masteredTotal, grandTotal, conqueredParts, remaining } = view;
  const allConquered = conqueredParts === 6 && grandTotal > 0;

  return (
    <div className="surface-dark relative overflow-hidden px-6 py-8 sm:px-9 sm:py-10">
      <span className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative">
        {/* 헤더 — 전체 정복도 + 만점 여정 카피 */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold text-white/90 ring-1 ring-white/15">
              🎯 정복 현황 · ROAD TO 990
            </span>
            <h2 className="mt-4 text-[24px] font-black leading-[1.15] tracking-tight text-white sm:text-[30px]">
              {allConquered ? (
                <>모든 파트 정복 완료 👑</>
              ) : (
                <>
                  6개 파트, <span className="text-gradient-rose">전부 다 맞히기</span>
                </>
              )}
            </h2>
            <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-white/55">
              {allConquered
                ? `여섯 파트를 모두 100% 정복했어요. ${josa(character.name, "을", "를")} 넘어선 진짜 만점 실력입니다.`
                : `맞힌 문항은 정복되고, 틀린·안 푼 문항이 계속 나옵니다. 남은 문항을 0으로 줄여 여섯 파트를 전부 정복하면 만점에 도달합니다.`}
            </p>
          </div>

          {/* 전체 정복도 링 */}
          <CoverageRing pct={overallCoverage} />
        </div>

        {/* 전체 요약 칩 */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <SummaryChip label="정복한 문항" value={`${masteredTotal.toLocaleString()} / ${grandTotal.toLocaleString()}`} />
          <SummaryChip label="정복한 파트" value={`${conqueredParts} / 6`} />
          <SummaryChip label="남은 문항" value={`${remaining.toLocaleString()}문항`} highlight />
        </div>

        {/* 파트별 진행 바 */}
        <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {view.parts.map((p, i) => (
            <motion.button
              key={p.part}
              type="button"
              onClick={() => openPart(p.part)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              className="group rounded-2xl bg-white/[0.06] px-4 py-3.5 text-left ring-1 ring-white/10 transition hover:bg-white/[0.1] active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[13.5px] font-bold text-white">
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      p.domain === "LC"
                        ? "bg-cyan-400/20 text-cyan-200"
                        : "bg-violet-400/20 text-violet-200"
                    }`}
                  >
                    {p.domain}
                  </span>
                  {PART_LABEL[p.part]}
                  {p.conquered && <span className="text-[13px]">👑</span>}
                </span>
                <span className="shrink-0 text-[12px] font-bold text-white/50 group-hover:text-white/80">
                  {p.mastered}/{p.total || "—"}
                </span>
              </div>

              {/* 정복도 바 */}
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    p.conquered
                      ? "from-amber-300 to-yellow-400"
                      : p.domain === "LC"
                        ? "from-cyan-400 to-sky-500"
                        : "from-violet-400 to-fuchsia-500"
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.coverage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.05 }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11.5px]">
                <span className="font-bold text-white/70">
                  {p.coverage}% 정복
                  {p.total - p.mastered > 0 && (
                    <span className="ml-1.5 font-semibold text-amber-300/90">
                      · 남은 {(p.total - p.mastered).toLocaleString()}
                    </span>
                  )}
                </span>
                <span className="text-white/40">
                  {p.accuracy === null ? "미응시" : `정답률 ${p.accuracy}%`}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 전체 정복도 도넛 링 (SVG) */
function CoverageRing({ pct }: { pct: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(pct, 100) / 100);
  return (
    <div className="relative mx-auto h-[112px] w-[112px] shrink-0 sm:mx-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#mastery-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: off }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />
        <defs>
          <linearGradient id="mastery-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[26px] font-black leading-none text-white">{pct}%</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/45">정복</span>
      </div>
    </div>
  );
}

function SummaryChip({
  label,
  value,
  highlight = false,
  tone,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  tone?: "amber";
}) {
  const amber = tone === "amber";
  return (
    <div
      className={`rounded-xl px-3.5 py-2 ring-1 ${
        amber
          ? "bg-amber-400/15 ring-amber-300/25"
          : highlight
            ? "bg-emerald-400/15 ring-emerald-300/25"
            : "bg-white/[0.06] ring-white/10"
      }`}
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <p
        className={`mt-0.5 text-[15px] font-black ${
          amber ? "text-amber-200" : highlight ? "text-emerald-200" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
