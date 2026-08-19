"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  loadCim,
  buildNotes,
  noteCounts,
  CIM_SUBJECTS,
  CIM_SUBJECT_META,
  type CimNote,
  type CimNoteSort,
  type CimQuestion,
  type CimState,
  type CimSubject,
} from "@/game/cim";
import { ChoiceBadge, Rich } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;

const SORT_LABEL: Record<CimNoteSort, string> = {
  wrong: "많이 틀린 순",
  recent: "최근 틀린 순",
  no: "번호순",
};

/**
 * 오답노트 — 읽기 전용 복기 화면.
 *
 * 여기서는 채점하지 않는다. 문제 · 내가 고른 답 · 정답 · 해설을 한 화면에 나란히 놓는 게 전부다.
 * 다시 풀고 싶으면 상단 CTA로 「틀린 문제만」 세션에 들어간다.
 */
export default function CimNotes({ questions }: { questions: CimQuestion[] }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<CimState | null>(null);
  const [subject, setSubject] = useState<CimSubject | null>(null);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [sort, setSort] = useState<CimNoteSort>("wrong");
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    setState(loadCim());
  }, []);

  const counts = useMemo(
    () => (state ? noteCounts(state, questions) : null),
    [state, questions]
  );
  const notes: CimNote[] | null = useMemo(
    () => (state ? buildNotes(state, questions, { subject, onlyOpen, sort }) : null),
    [state, questions, subject, onlyOpen, sort]
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = notes !== null && notes.length > 0 && notes.every((n) => open.has(n.q.id));
  const toggleAll = () =>
    setOpen(allOpen || !notes ? new Set() : new Set(notes.map((n) => n.q.id)));

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: d, ease: EASE },
        };

  return (
    <main className="relative min-h-dvh overflow-hidden pb-24 pt-6 sm:pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2
          rounded-full bg-rose-400/20 blur-[90px]"
      />

      <div className="container-app">
        <motion.header {...rise(0)} className="flex items-center justify-between gap-3">
          <div>
            <p className="label">만점 투자자산운용사</p>
            <h1 className="mt-1 text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                오답노트
              </span>
            </h1>
          </div>
          <Link href="/cim" className="btn-ghost shrink-0 text-[13px]">
            현황
          </Link>
        </motion.header>

        {/* ── 요약 ───────────────────────────────────────────────── */}
        <motion.section {...rise(0.06)} className="mt-6">
          {counts === null ? (
            <div className="card p-6">
              <div className="skeleton h-5 w-40 rounded-full" />
              <div className="skeleton mt-3 h-4 w-2/3 rounded-full" />
            </div>
          ) : counts.total === 0 ? (
            <div className="card-elevated p-8 text-center">
              <p className="text-[40px]">🗒️</p>
              <h2 className="mt-3 text-[19px] font-extrabold text-neutral-900">
                아직 모인 오답이 없어요
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-neutral-500">
                문제를 풀다 틀리면 이 노트에 자동으로 쌓여요. 한 번 틀린 문항은 맞히기 시작한
                뒤에도 남아서, 시험 전날 이 페이지만 훑으면 됩니다.
              </p>
              <Link href="/cim" className="btn-blue mt-6 inline-block">
                스테이지 시작하기
              </Link>
            </div>
          ) : (
            <div className="card-elevated p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold text-neutral-500">
                    한 번이라도 틀린 문항
                  </p>
                  <p className="mt-1 flex items-end gap-2">
                    <span className="text-[40px] font-extrabold leading-none tabular-nums text-neutral-900">
                      {counts.total}
                    </span>
                    <span className="pb-1 text-[14px] font-semibold text-neutral-400">
                      / {questions.length}문항
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Pill tone="rose" label="아직 못 잡음" value={counts.open} />
                  <Pill tone="emerald" label="잡은 오답" value={counts.settled} />
                </div>
              </div>

              {/* 과목별 오답 분포 — 어느 과목에서 새는지 */}
              <div className="mt-5 space-y-2">
                {CIM_SUBJECTS.map((no) => {
                  const n = counts.bySubject[no];
                  const pct = counts.total > 0 ? (n / counts.total) * 100 : 0;
                  return (
                    <div key={no} className="flex items-center gap-3">
                      <span className="w-[92px] shrink-0 truncate text-[11.5px] font-semibold text-neutral-600">
                        제{no}과목
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-[11.5px] font-bold tabular-nums text-neutral-500">
                        {n}
                      </span>
                    </div>
                  );
                })}
              </div>

              {counts.open > 0 && (
                <Link
                  href={`/cim/study?mode=wrong${subject ? `&subject=${subject}` : ""}`}
                  className="btn-blue mt-6 block text-center"
                >
                  아직 못 잡은 {counts.open}문항 다시 풀기 →
                </Link>
              )}
            </div>
          )}
        </motion.section>

        {/* ── 필터 ───────────────────────────────────────────────── */}
        {counts !== null && counts.total > 0 && (
          <>
            <motion.section {...rise(0.1)} className="mt-7">
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip on={subject === null} onClick={() => setSubject(null)}>
                  전 과목
                </FilterChip>
                {CIM_SUBJECTS.map((no) => (
                  <FilterChip
                    key={no}
                    on={subject === no}
                    onClick={() => setSubject(subject === no ? null : no)}
                  >
                    제{no}과목
                    <span className="ml-1 tabular-nums opacity-60">
                      {counts.bySubject[no]}
                    </span>
                  </FilterChip>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[12.5px] font-semibold text-neutral-600">
                  <input
                    type="checkbox"
                    checked={onlyOpen}
                    onChange={(e) => setOnlyOpen(e.target.checked)}
                    className="h-4 w-4 accent-rose-600"
                  />
                  아직 못 잡은 오답만
                </label>

                <div className="flex items-center gap-1.5">
                  {(Object.keys(SORT_LABEL) as CimNoteSort[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSort(s)}
                      className={`rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition ${
                        sort === s
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      {SORT_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ── 목록 ─────────────────────────────────────────────── */}
            <motion.section {...rise(0.14)} className="mt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-bold text-neutral-800">
                  {notes?.length ?? 0}문항
                </h2>
                {(notes?.length ?? 0) > 0 && (
                  <button
                    onClick={toggleAll}
                    className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800"
                  >
                    {allOpen ? "전체 접기" : "전체 펼치기"}
                  </button>
                )}
              </div>

              {notes !== null && notes.length === 0 && (
                <div className="card mt-3 p-6 text-center">
                  <p className="text-[13px] text-neutral-500">
                    이 조건에 해당하는 오답이 없어요.
                    {onlyOpen && " 못 잡은 오답이 없다는 건 좋은 신호예요."}
                  </p>
                </div>
              )}

              <div className="mt-3 space-y-2.5">
                {notes?.map((n) => (
                  <NoteCard
                    key={n.q.id}
                    note={n}
                    open={open.has(n.q.id)}
                    onToggle={() => toggle(n.q.id)}
                    reduce={!!reduce}
                  />
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>
    </main>
  );
}

/* ────────────────────────────────────────────────────────── */

function NoteCard({
  note,
  open,
  onToggle,
  reduce,
}: {
  note: CimNote;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const { q } = note;
  return (
    <article
      className={`card overflow-hidden p-0 ring-1 transition ${
        note.settled ? "ring-neutral-200" : "ring-rose-200"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-neutral-50/70"
      >
        <span
          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[11px]
            font-extrabold tabular-nums ${
              note.settled
                ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                : "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
            }`}
        >
          Q{q.no}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="chip bg-blue-50 text-blue-700 ring-1 ring-blue-200">
              제{q.subject}과목 · {CIM_SUBJECT_META[q.subject].short}
            </span>
            <span
              className={`chip ring-1 ${
                note.settled
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-rose-50 text-rose-700 ring-rose-200"
              }`}
            >
              {note.settled ? "잡은 오답" : "아직 못 잡음"}
            </span>
            <span className="chip bg-neutral-100 text-neutral-600">
              {note.wrong}회 틀림 · {note.seen}회 시도
            </span>
          </span>
          <span
            className={`mt-2 block text-[14px] font-semibold leading-relaxed text-neutral-800 ${
              open ? "" : "line-clamp-2"
            }`}
          >
            <Rich text={q.prompt} />
          </span>
        </span>

        <span
          className={`mt-1 shrink-0 text-[11px] font-bold text-neutral-400 transition ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-100 p-4 pt-4 sm:p-5">
              {q.stimulus.length > 0 && (
                <div className="mb-4 space-y-1 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-200/70">
                  {q.stimulus.map((line, i) => (
                    <p key={i} className="text-[13px] leading-relaxed text-neutral-700">
                      <Rich text={line} />
                    </p>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                {q.choices.map((c, i) => {
                  const isAnswer = i === q.answerIndex;
                  const isPick = note.pick !== null && note.pick === i && !isAnswer;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 rounded-2xl p-3.5 ring-1 ${
                        isAnswer
                          ? "bg-emerald-50 text-emerald-900 ring-emerald-300"
                          : isPick
                            ? "bg-rose-50 text-rose-900 ring-rose-300"
                            : "bg-white text-neutral-500 ring-neutral-200"
                      }`}
                    >
                      <ChoiceBadge
                        n={i + 1}
                        tone={isAnswer ? "answer" : isPick ? "wrong" : "dim"}
                      />
                      <span className="text-[13.5px] leading-relaxed">
                        <Rich text={c} />
                      </span>
                      {(isAnswer || isPick) && (
                        <span
                          className={`ml-auto shrink-0 self-center text-[10.5px] font-extrabold ${
                            isAnswer ? "text-emerald-600" : "text-rose-500"
                          }`}
                        >
                          {isAnswer ? "정답" : "내 답"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {note.pick === null && (
                <p className="mt-3 text-[11.5px] text-neutral-400">
                  이 문항을 풀 때는 고른 선지를 기록하지 않던 시점이라 내 답은 표시되지 않아요.
                </p>
              )}

              {q.explanation && (
                <div className="mt-4 rounded-2xl bg-blue-50/70 p-4 ring-1 ring-blue-100">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-blue-700/70">
                    해설
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-neutral-700">
                    <Rich text={q.explanation} />
                  </p>
                </div>
              )}

              <p className="mt-3 text-[11.5px] text-neutral-400">
                {note.settled
                  ? "마지막 시도는 맞혔어요. 복습에서 한 번 더 확인하면 굳어집니다."
                  : note.dueNow
                    ? "지금 복습 대상이에요."
                    : "복습 예정일이 되면 다시 출제돼요."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function Pill({
  tone,
  label,
  value,
}: {
  tone: "rose" | "emerald";
  label: string;
  value: number;
}) {
  const map = {
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  } as const;
  return (
    <div className={`rounded-2xl px-3.5 py-2 text-center ring-1 ${map[tone]}`}>
      <p className="text-[10.5px] font-semibold opacity-80">{label}</p>
      <p className="mt-0.5 text-[18px] font-extrabold tabular-nums">{value}</p>
    </div>
  );
}

function FilterChip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition ${
        on
          ? "bg-blue-600 text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.8)]"
          : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:text-neutral-900"
      }`}
    >
      {children}
    </button>
  );
}
