"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  loadIelts,
  ieltsSummary,
  bandFor,
  IELTS_TRAPS,
  IELTS_TARGET_BAND,
  type IeltsSetSummary,
  type IeltsSummary,
  type IeltsProgress,
} from "@/game/ielts";

const EASE = [0.22, 1, 0.36, 1] as const;

/** PRD 4대 영역 — 지금 열린 것과 준비 중인 것을 숨기지 않고 그대로 보여준다 */
const SKILLS = [
  { key: "L", icon: "🎧", name: "Listening", ko: "리스닝", live: true },
  { key: "R", icon: "📖", name: "Reading", ko: "리딩", live: false },
  { key: "W", icon: "✍️", name: "Writing", ko: "라이팅", live: false },
  { key: "S", icon: "🗣", name: "Speaking", ko: "스피킹", live: false },
] as const;

export default function IeltsHome({ sets }: { sets: IeltsSetSummary[] }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState<IeltsProgress | null>(null);
  const [summary, setSummary] = useState<IeltsSummary | null>(null);
  const [openTraps, setOpenTraps] = useState(false);

  useEffect(() => {
    const p = loadIelts();
    setProgress(p);
    setSummary(
      ieltsSummary(
        p,
        sets.map((s) => ({ id: s.id, questions: s.questions })),
      ),
    );
  }, [sets]);

  const parts = sets
    .map((s) => s.part)
    .filter((p, i, arr) => arr.indexOf(p) === i)
    .sort((a, b) => a - b);

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: d, ease: EASE },
        };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-50 pb-safe">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]">
        <div className="absolute left-1/2 top-[-140px] h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-teal-200/35 blur-[90px]" />
        <div className="absolute right-[14%] top-[60px] h-[200px] w-[260px] rounded-full bg-emerald-200/20 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-neutral-500 transition hover:text-neutral-900"
        >
          <span className="text-[15px]">←</span> 홈
        </Link>

        {/* ── 히어로 ─────────────────────────── */}
        <motion.header {...rise(0)} className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-[11.5px] font-black text-teal-700 ring-1 ring-teal-500/20">
            📙 IELTS ACADEMIC
          </span>
          <h1 className="mt-3 text-[26px] font-black tracking-[-0.03em] text-neutral-900 sm:text-[30px]">
            만점 아이엘츠
          </h1>
          <p className="mt-2 text-[14px] font-medium text-neutral-400">
            안 들려서 틀리는 게 아니다 · <b className="text-neutral-600">덫에 걸려서</b> 틀린다
          </p>
        </motion.header>

        {/* ── 내 성적 ────────────────────────── */}
        <motion.section {...rise(0.08)} className="mt-6">
          <div className="rounded-3xl bg-neutral-900 p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11.5px] font-black tracking-[0.08em] text-teal-300">
                  ESTIMATED BAND
                </p>
                <p className="mt-1 text-[40px] font-black leading-none tabular-nums">
                  {summary && summary.studied > 0 ? summary.band.toFixed(1) : "—"}
                </p>
              </div>
              <p className="pb-1.5 text-right text-[12px] font-bold text-neutral-400">
                목표 Band {IELTS_TARGET_BAND.toFixed(1)}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <Mini
                label="학습 세트"
                value={summary ? `${summary.studied}/${summary.totalSets}` : "—"}
              />
              <Mini
                label="함정 방어율"
                value={summary && summary.trapsFaced > 0 ? `${summary.trapRate}%` : "—"}
                tone="teal"
              />
              <Mini
                label="맞힌 문항"
                value={summary ? `${summary.best}/${summary.questions}` : "—"}
              />
            </div>
          </div>
        </motion.section>

        {/* ── 4대 영역 ───────────────────────── */}
        <motion.section {...rise(0.14)} className="mt-4">
          <div className="grid grid-cols-4 gap-2">
            {SKILLS.map((s) => (
              <div
                key={s.key}
                className={`rounded-2xl px-2 py-3 text-center ring-1 transition ${
                  s.live
                    ? "bg-white text-neutral-900 shadow-sm ring-teal-500/25"
                    : "bg-neutral-100/70 text-neutral-400 ring-neutral-900/[0.04]"
                }`}
              >
                <div className={`text-[20px] leading-none ${s.live ? "" : "opacity-40"}`}>
                  {s.icon}
                </div>
                <p className="mt-1.5 text-[12px] font-black">{s.ko}</p>
                <p
                  className={`mt-0.5 text-[10px] font-bold ${
                    s.live ? "text-teal-600" : "text-neutral-400"
                  }`}
                >
                  {s.live ? `${sets.length}세트` : "준비 중"}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 덫 도감 ────────────────────────── */}
        <motion.section {...rise(0.18)} className="mt-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-900/[0.06]">
            <button
              type="button"
              onClick={() => setOpenTraps((v) => !v)}
              className="flex w-full items-center justify-between px-5 py-3.5 text-left"
            >
              <span className="text-[13px] font-black text-neutral-900">
                🪤 덫 도감 — 8가지 함정
              </span>
              <span className="text-[12px] font-bold text-neutral-400">
                {openTraps ? "접기 ▲" : "펼치기 ▼"}
              </span>
            </button>
            {openTraps && (
              <div className="grid gap-2 border-t border-neutral-900/[0.06] px-5 py-4 sm:grid-cols-2">
                {Object.entries(IELTS_TRAPS).map(([k, t]) => (
                  <div key={k} className="rounded-xl bg-neutral-50 px-3 py-2.5">
                    <p className="text-[12.5px] font-black text-neutral-800">
                      {t.icon} {t.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-neutral-500">
                      {t.hint.replace(/\*\*/g, "")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* ── 세트 목록 ──────────────────────── */}
        {parts.map((part, pi) => (
          <motion.section key={part} {...rise(0.22 + pi * 0.04)} className="mt-7">
            <div className="flex items-baseline justify-between px-1">
              <h2 className="text-[15px] font-black tracking-[-0.02em] text-neutral-900">
                Listening Part {part}
              </h2>
              <span className="text-[11.5px] font-bold text-neutral-400">
                {part <= 2 ? "일상 · 사교" : "학술 · 교육"}
              </span>
            </div>

            <div className="mt-2.5 space-y-2.5">
              {sets
                .filter((s) => s.part === part)
                .map((s) => {
                  const rec = progress?.sets[s.id];
                  const done = !!rec;
                  const band = rec ? bandFor(rec.bestCorrect, rec.total) : 0;
                  return (
                    <Link
                      key={s.id}
                      href={`/ielts/listening/${s.id}`}
                      className="group block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-900/[0.06] transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10.5px] font-black text-teal-700">
                              {s.taskType}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10.5px] font-bold text-neutral-500">
                              Band {s.band.toFixed(1)}
                            </span>
                            {done && (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-black text-emerald-700">
                                ✓ {rec!.bestCorrect}/{rec!.total}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-[15px] font-black tracking-[-0.01em] text-neutral-900">
                            {s.titleKo}
                          </h3>
                          <p className="mt-0.5 truncate text-[12.5px] text-neutral-400">
                            {s.title}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {s.traps.slice(0, 4).map((t) => (
                              <span key={t} className="text-[13px]" title={IELTS_TRAPS[t].label}>
                                {IELTS_TRAPS[t].icon}
                              </span>
                            ))}
                            <span className="ml-1 text-[11.5px] font-bold text-neutral-400">
                              {s.questions}문항
                            </span>
                          </div>
                        </div>
                        <span className="shrink-0 self-center text-right">
                          {done ? (
                            <span className="text-[15px] font-black tabular-nums text-teal-600">
                              {band.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-[16px] text-neutral-300 transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          )}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </motion.section>
        ))}

        {sets.length === 0 && (
          <p className="mt-10 rounded-2xl bg-white px-5 py-8 text-center text-[13.5px] font-bold text-neutral-400 ring-1 ring-neutral-900/[0.06]">
            아직 콘텐츠가 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}

function Mini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "teal";
}) {
  return (
    <div className="rounded-2xl bg-white/[0.07] px-3 py-2.5">
      <p className="text-[11px] font-bold text-neutral-400">{label}</p>
      <p
        className={`mt-0.5 text-[17px] font-black tabular-nums ${
          tone === "teal" ? "text-teal-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
