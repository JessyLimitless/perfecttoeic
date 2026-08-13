"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  loadIelts,
  ieltsSummary,
  bandFor,
  IELTS_TRAPS,
  IELTS_TARGET_BAND,
  type IeltsSetSummary,
  type IeltsSummary,
  type IeltsProgress,
  type IeltsTrapType,
} from "@/game/ielts";
import TrapIcon, { SnareIcon } from "./TrapIcon";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 리딩 세트 요약 — 리스닝의 part 대신 passageNo를 쓴다 */
export interface ReadingSummary {
  id: string;
  passageNo: 1 | 2 | 3;
  band: number;
  title: string;
  titleKo: string;
  taskType: string;
  questions: number;
  traps: IeltsTrapType[];
}

export default function IeltsHome({
  sets,
  reading = [],
}: {
  sets: IeltsSetSummary[];
  reading?: ReadingSummary[];
}) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState<IeltsProgress | null>(null);
  const [summary, setSummary] = useState<IeltsSummary | null>(null);
  const [openTraps, setOpenTraps] = useState(false);

  /** 밴드·방어율은 리스닝과 리딩을 합산한다 — 같은 채점 체계이므로 */
  useEffect(() => {
    const p = loadIelts();
    setProgress(p);
    setSummary(
      ieltsSummary(p, [
        ...sets.map((s) => ({ id: s.id, questions: s.questions })),
        ...reading.map((s) => ({ id: s.id, questions: s.questions })),
      ]),
    );
  }, [sets, reading]);

  /** 4대 영역 — 콘텐츠가 실제로 있는 영역만 열린 것으로 표시한다 */
  const SKILLS = [
    { key: "L", icon: "🎧", ko: "리스닝", count: sets.length, live: sets.length > 0 },
    { key: "R", icon: "📖", ko: "리딩", count: reading.length, live: reading.length > 0 },
    { key: "W", icon: "✍️", ko: "라이팅", count: 0, live: false },
    { key: "S", icon: "🗣", ko: "스피킹", count: 0, live: false },
  ] as const;

  const parts = sets
    .map((s) => s.part)
    .filter((p, i, arr) => arr.indexOf(p) === i)
    .sort((a, b) => a - b);

  const started = !!summary && summary.studied > 0;

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: d, ease: EASE },
        };

  return (
    <main className="relative min-h-dvh bg-neutral-50 pb-safe">
      {/* ══ 다크 히어로 — 브랜드와 성적을 한 무대에 ═══════════ */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-neutral-950 pb-32 pt-6 sm:pb-36 sm:pt-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-200px] h-[440px] w-[700px] -translate-x-1/2 rounded-full bg-teal-500/25 blur-[110px]" />
          <div className="absolute right-[6%] top-[40px] h-[260px] w-[320px] rounded-full bg-emerald-500/[0.18] blur-[100px]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white/45 transition hover:text-white"
          >
            <span className="text-[15px]">←</span> 홈
          </Link>

          <div className="mt-7 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            {/* 브랜드 */}
            <motion.div {...rise(0)}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-black tracking-[0.08em] text-teal-300 ring-1 ring-white/10 backdrop-blur">
                📙 IELTS ACADEMIC
              </span>
              <h1 className="mt-4 text-[34px] font-black leading-none tracking-[-0.045em] text-white sm:text-[42px]">
                만점 아이엘츠
              </h1>
              <p className="mt-3.5 text-[14px] font-medium leading-relaxed text-white/45 sm:text-[15px]">
                안 들려서 틀리는 게 아니다 ·{" "}
                <b className="font-black text-white/80">덫에 걸려서</b> 틀린다
              </p>
            </motion.div>

            {/* 밴드 — 무대의 주인공 */}
            <motion.div {...rise(0.08)} className="shrink-0 sm:text-right">
              <p className="text-[10.5px] font-black tracking-[0.12em] text-teal-300/80">
                ESTIMATED BAND
              </p>
              {started ? (
                <div className="mt-1 flex items-end gap-2.5 sm:justify-end">
                  <span className="text-[56px] font-black leading-[0.85] tabular-nums text-white sm:text-[64px]">
                    {summary!.band.toFixed(1)}
                  </span>
                  <span className="pb-1.5 text-[12.5px] font-bold text-white/35">
                    / 목표 {IELTS_TARGET_BAND.toFixed(1)}
                  </span>
                </div>
              ) : (
                /* 아직 한 세트도 안 푼 상태 — 큰 대시는 검열된 것처럼 보인다 */
                <div className="mt-2 sm:text-right">
                  <p className="text-[15px] font-black text-white/50">아직 측정 전</p>
                  <p className="mt-1 text-[12px] font-bold text-white/30">
                    한 세트만 풀면 목표 {IELTS_TARGET_BAND.toFixed(1)} 대비 위치가 나옵니다
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* 지표 3종 */}
          <motion.div {...rise(0.14)} className="mt-8 grid grid-cols-3 gap-2.5">
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
          </motion.div>
        </div>
      </section>

      {/* ══ 본문 — 히어로를 파고들며 떠오른다 ═══════════════ */}
      <div className="relative z-10 mx-auto -mt-24 w-full max-w-3xl px-5 pb-20">
        {/* 4대 영역 */}
        <motion.section {...rise(0.18)}>
          <div className="rounded-[1.75rem] bg-white p-3 shadow-[0_2px_6px_rgba(16,24,40,0.04),0_24px_50px_-28px_rgba(16,24,40,0.35)] ring-1 ring-neutral-900/[0.06] sm:p-4">
            {/* 영역과 파트가 헷갈리지 않도록 표제를 명시한다 */}
            <div className="mb-2.5 flex items-baseline justify-between px-1.5">
              <p className="text-[11.5px] font-black tracking-[0.06em] text-neutral-400">
                IELTS 4대 영역
              </p>
              <p className="text-[11px] font-bold text-neutral-400">
                {SKILLS.filter((s) => s.live)
                  .map((s) => s.ko)
                  .join(" · ")}{" "}
                열림
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SKILLS.map((s) => (
                <div
                  key={s.key}
                  className={`relative overflow-hidden rounded-2xl px-2 py-3.5 text-center transition ${
                    s.live
                      ? "bg-teal-50/70 ring-1 ring-teal-500/20"
                      : "bg-neutral-50 ring-1 ring-neutral-900/[0.04]"
                  }`}
                >
                  {s.live && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-teal-500 to-emerald-500"
                    />
                  )}
                  <div
                    className={`text-[21px] leading-none ${s.live ? "" : "opacity-30 grayscale"}`}
                  >
                    {s.icon}
                  </div>
                  <p
                    className={`mt-1.5 text-[12px] font-black ${
                      s.live ? "text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {s.ko}
                  </p>
                  <p
                    className={`mt-0.5 text-[10px] font-black tabular-nums ${
                      s.live ? "text-teal-600" : "text-neutral-300"
                    }`}
                  >
                    {!s.live
                      ? "준비 중"
                      : s.key === "L"
                        ? `${parts.length ? `Part 1~${Math.max(...parts)} · ` : ""}${s.count}세트`
                        : `${s.count}지문`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 덫 도감 */}
        <motion.section {...rise(0.22)} className="mt-3.5">
          <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_2px_6px_rgba(16,24,40,0.04),0_20px_44px_-30px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06]">
            <button
              type="button"
              onClick={() => setOpenTraps((v) => !v)}
              aria-expanded={openTraps}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-neutral-50/60"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/15">
                <SnareIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-black text-neutral-900">
                  덫 도감 — 8가지 함정
                </span>
                <span className="block text-[11.5px] text-neutral-400">
                  틀리는 이유는 늘 이 여덟 개 중 하나다
                </span>
              </span>
              <span
                className={`shrink-0 text-[12px] font-black text-neutral-300 transition-transform ${
                  openTraps ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openTraps && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-2 border-t border-neutral-900/[0.06] px-5 py-4 sm:grid-cols-2">
                    {Object.entries(IELTS_TRAPS).map(([k, t]) => (
                      <div
                        key={k}
                        className="flex gap-3 rounded-xl bg-neutral-50 px-3.5 py-3 ring-1 ring-neutral-900/[0.03]"
                      >
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-teal-600 ring-1 ring-neutral-900/[0.05]">
                          <TrapIcon type={k as IeltsTrapType} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[12.5px] font-black text-neutral-800">
                            {t.label}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] leading-relaxed text-neutral-500">
                            {t.hint.replace(/\*\*/g, "")}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* 세트 목록 */}
        {parts.map((part, pi) => {
          const partSets = sets.filter((s) => s.part === part);
          return (
            <motion.section key={part} {...rise(0.26 + pi * 0.04)} className="mt-9">
              <div className="flex items-baseline justify-between px-1">
                <h2 className="flex items-baseline gap-2 text-[15px] font-black tracking-[-0.02em] text-neutral-900">
                  <span className="inline-flex h-[22px] items-center rounded-md bg-neutral-900 px-2 text-[11px] font-black tabular-nums text-white">
                    PART {part}
                  </span>
                  {part <= 2 ? "일상 · 사교" : "학술 · 교육"}
                </h2>
                <span className="text-[11.5px] font-bold tabular-nums text-neutral-400">
                  {partSets.length}세트
                </span>
              </div>

              <div className="mt-3 space-y-2.5">
                {partSets.map((s) => {
                  const rec = progress?.sets[s.id];
                  const done = !!rec;
                  const band = rec ? bandFor(rec.bestCorrect, rec.total) : 0;
                  return (
                    <Link
                      key={s.id}
                      href={`/ielts/listening/${s.id}`}
                      className="group relative block overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_14px_32px_-24px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(16,24,40,0.06),0_26px_50px_-26px_rgba(16,24,40,0.4)] hover:ring-teal-500/25 sm:p-5"
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 w-1 ${
                          done
                            ? "bg-gradient-to-b from-teal-500 to-emerald-500"
                            : "bg-neutral-200 group-hover:bg-teal-400"
                        } transition-colors`}
                      />

                      <div className="flex items-start gap-3 pl-1.5">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10.5px] font-black text-teal-700 ring-1 ring-teal-500/15">
                              {s.taskType}
                            </span>
                            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10.5px] font-bold tabular-nums text-neutral-500">
                              Band {s.band.toFixed(1)}
                            </span>
                            {done && (
                              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-black tabular-nums text-emerald-700 ring-1 ring-emerald-500/15">
                                ✓ {rec!.bestCorrect}/{rec!.total}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-2 text-[15.5px] font-black tracking-[-0.02em] text-neutral-900">
                            {s.titleKo}
                          </h3>
                          <p className="mt-0.5 truncate text-[12.5px] text-neutral-400">
                            {s.title}
                          </p>

                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            {s.traps.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                title={IELTS_TRAPS[t].label}
                                className="grid h-6 w-6 place-items-center rounded-lg bg-neutral-50 text-neutral-400 ring-1 ring-neutral-900/[0.04] transition group-hover:bg-teal-50 group-hover:text-teal-600"
                              >
                                <TrapIcon type={t} className="h-3.5 w-3.5" />
                              </span>
                            ))}
                            <span className="ml-1 text-[11.5px] font-bold tabular-nums text-neutral-400">
                              {s.questions}문항
                            </span>
                          </div>
                        </div>

                        <span className="shrink-0 self-center text-right">
                          {done ? (
                            <span className="flex flex-col items-end">
                              <span className="text-[19px] font-black leading-none tabular-nums text-teal-600">
                                {band.toFixed(1)}
                              </span>
                              <span className="mt-1 text-[10px] font-black tracking-[0.06em] text-neutral-300">
                                BAND
                              </span>
                            </span>
                          ) : (
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-50 text-[15px] text-neutral-300 ring-1 ring-neutral-900/[0.04] transition group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600">
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
          );
        })}

        {/* ── 리딩 지문 ── */}
        {reading.length > 0 && (
          <motion.section {...rise(0.34)} className="mt-10">
            <div className="flex items-baseline justify-between px-1">
              <h2 className="flex items-baseline gap-2 text-[15px] font-black tracking-[-0.02em] text-neutral-900">
                <span className="inline-flex h-[22px] items-center rounded-md bg-teal-600 px-2 text-[11px] font-black text-white">
                  READING
                </span>
                학술 지문
              </h2>
              <span className="text-[11.5px] font-bold tabular-nums text-neutral-400">
                {reading.length}지문
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {reading.map((s) => {
                const rec = progress?.sets[s.id];
                const done = !!rec;
                const band = rec ? bandFor(rec.bestCorrect, rec.total) : 0;
                return (
                  <Link
                    key={s.id}
                    href={`/ielts/reading/${s.id}`}
                    className="group relative block overflow-hidden rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04),0_14px_32px_-24px_rgba(16,24,40,0.3)] ring-1 ring-neutral-900/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(16,24,40,0.06),0_26px_50px_-26px_rgba(16,24,40,0.4)] hover:ring-teal-500/25 sm:p-5"
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 ${
                        done
                          ? "bg-gradient-to-b from-teal-500 to-emerald-500"
                          : "bg-neutral-200 group-hover:bg-teal-400"
                      } transition-colors`}
                    />
                    <div className="flex items-start gap-3 pl-1.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10.5px] font-black tabular-nums text-neutral-600">
                            Passage {s.passageNo}
                          </span>
                          <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10.5px] font-black text-teal-700 ring-1 ring-teal-500/15">
                            {s.taskType}
                          </span>
                          {done && (
                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-black tabular-nums text-emerald-700 ring-1 ring-emerald-500/15">
                              ✓ {rec!.bestCorrect}/{rec!.total}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-[15.5px] font-black tracking-[-0.02em] text-neutral-900">
                          {s.titleKo}
                        </h3>
                        <p className="mt-0.5 truncate text-[12.5px] text-neutral-400">
                          {s.title}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                          {s.traps.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              title={IELTS_TRAPS[t].label}
                              className="grid h-6 w-6 place-items-center rounded-lg bg-neutral-50 text-neutral-400 ring-1 ring-neutral-900/[0.04] transition group-hover:bg-teal-50 group-hover:text-teal-600"
                            >
                              <TrapIcon type={t} className="h-3.5 w-3.5" />
                            </span>
                          ))}
                          <span className="ml-1 text-[11.5px] font-bold tabular-nums text-neutral-400">
                            {s.questions}문항
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 self-center text-right">
                        {done ? (
                          <span className="flex flex-col items-end">
                            <span className="text-[19px] font-black leading-none tabular-nums text-teal-600">
                              {band.toFixed(1)}
                            </span>
                            <span className="mt-1 text-[10px] font-black tracking-[0.06em] text-neutral-300">
                              BAND
                            </span>
                          </span>
                        ) : (
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-50 text-[15px] text-neutral-300 ring-1 ring-neutral-900/[0.04] transition group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600">
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
        )}

        {sets.length === 0 && reading.length === 0 && (
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
  /** 값이 없을 때 큰 대시는 가려진 것처럼 보인다 — 작은 글씨로 상태를 말한다 */
  const empty = value === "—";
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3.5 py-3 ring-1 ring-white/[0.08] backdrop-blur">
      <p className="text-[10.5px] font-bold text-white/40">{label}</p>
      {empty ? (
        <p className="mt-1.5 text-[12px] font-bold text-white/25">기록 없음</p>
      ) : (
        <p
          className={`mt-1 text-[18px] font-black tabular-nums ${
            tone === "teal" ? "text-teal-300" : "text-white"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
