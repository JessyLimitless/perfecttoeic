"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  loadCim,
  buildCimView,
  modeCounts,
  noteCounts,
  resetCim,
  buildStageViews,
  nextStageNo,
  CIM_SUBJECTS,
  CIM_SUBJECT_META,
  CIM_PASS_RATE,
  CIM_FAIL_FLOOR,
  CIM_EXAM_TOTAL,
  CIM_MODE_LABEL,
  CIM_STAGE_SIZE,
  type CimMode,
  type CimQuestionRef,
  type CimSetSummary,
  type CimState,
  type CimStageShell,
  type CimStageView,
  type CimSubject,
  type CimView,
} from "@/game/cim";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 스테이지가 기본 경로 — 여기는 스테이지 밖에서 따로 도는 빠른 연습 */
const MODES: CimMode[] = ["review", "wrong"];

export default function CimHome({
  index,
  sets,
  stages,
}: {
  index: CimQuestionRef[];
  sets: CimSetSummary[];
  stages: CimStageShell[];
}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<CimState | null>(null);
  const [subject, setSubject] = useState<CimSubject | null>(null);
  const [openSets, setOpenSets] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setState(loadCim());
  }, []);

  const view: CimView | null = useMemo(
    () => (state ? buildCimView(state, index) : null),
    [state, index]
  );
  const counts = useMemo(
    () => (state ? modeCounts(state, index, subject) : null),
    [state, index, subject]
  );
  const notes = useMemo(() => (state ? noteCounts(state, index) : null), [state, index]);
  const stageViews: CimStageView[] | null = useMemo(
    () => (state ? buildStageViews(state, stages) : null),
    [state, stages]
  );
  const nextStage = stageViews ? nextStageNo(stageViews) : null;
  const clearedCount = stageViews?.filter((v) => v.cleared).length ?? 0;

  const rise = (d: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: d, ease: EASE },
        };

  const studyHref = (mode: CimMode) =>
    `/cim/study?mode=${mode}${subject ? `&subject=${subject}` : ""}`;

  return (
    <main className="relative min-h-dvh overflow-hidden pb-28 pt-6 sm:pt-10">
      {/* 서비스 정체성 — 파랑 오라 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2
          rounded-full bg-blue-400/25 blur-[90px]"
      />

      <div className="container-app">
        <motion.header {...rise(0)} className="flex items-center justify-between gap-3">
          <div>
            <p className="label">만점 투자자산운용사</p>
            <h1 className="mt-1 text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              <span className="text-gradient-blue">
                기출 {index.length.toLocaleString()}제
              </span>{" "}
              <span className="text-neutral-900">반복 훈련</span>
            </h1>
          </div>
          <Link href="/" className="btn-ghost shrink-0 text-[13px]">
            홈
          </Link>
        </motion.header>

        {/* ── 히어로: 지금 시험 보면 붙는가 ───────────────────────── */}
        <motion.section {...rise(0.06)} className="mt-6">
          <PassPanel view={view} total={index.length} />
        </motion.section>

        {/* ── 스테이지 맵 — 5문항 한 판 ─────────────────────────── */}
        <motion.section {...rise(0.1)} className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[15px] font-bold text-neutral-800">
              스테이지
              <span className="ml-2 text-[12px] font-semibold text-neutral-400">
                한 판 {CIM_STAGE_SIZE}문항 · 총 {stages.length}판
              </span>
            </h2>
            <p className="text-[12px] font-semibold text-emerald-600">
              클리어 {clearedCount} / {stages.length}
            </p>
          </div>

          {/* 이어하기 — 아직 만점을 못 낸 첫 판 */}
          {nextStage !== null && (
            <Link
              href={`/cim/study?stage=${nextStage}`}
              className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r
                from-blue-600 to-sky-500 p-4 text-white shadow-[0_12px_30px_-12px_rgba(37,99,235,0.7)]
                transition hover:-translate-y-0.5"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-blue-100/80">
                  이어서 하기
                </span>
                <span className="mt-0.5 block text-[16px] font-extrabold">
                  스테이지 {nextStage} 시작
                </span>
              </span>
              <span className="shrink-0 text-[20px]">▶</span>
            </Link>
          )}
          {nextStage === null && stageViews && stageViews.length > 0 && (
            <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-200">
              <p className="text-[14px] font-extrabold text-emerald-700">
                🏆 모든 스테이지 클리어
              </p>
              <p className="mt-1 text-[12px] text-emerald-600">
                이제 복습이 실력을 지킵니다. 오늘의 복습을 눌러 주세요.
              </p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {stages.map((st) => {
              const v = stageViews?.find((x) => x.no === st.no) ?? null;
              const isNext = nextStage === st.no;
              const cleared = v?.cleared ?? false;
              const touched = v?.touched ?? false;
              return (
                <Link
                  key={st.no}
                  href={`/cim/study?stage=${st.no}`}
                  title={`스테이지 ${st.no} · Q${st.from}–${st.to}`}
                  className={`relative grid aspect-square place-items-center rounded-2xl text-[13px]
                    font-extrabold tabular-nums ring-1 transition hover:-translate-y-0.5 ${
                      cleared
                        ? "bg-emerald-500 text-white ring-emerald-500"
                        : touched
                          ? "bg-amber-50 text-amber-700 ring-amber-300"
                          : "bg-white text-neutral-400 ring-neutral-200 hover:text-neutral-700"
                    } ${isNext ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                >
                  {st.no}
                  {/* 도전했지만 만점은 아직 — 최고 점수를 작게 */}
                  {touched && !cleared && (
                    <span className="absolute bottom-1 text-[9px] font-bold text-amber-500">
                      {v?.best}/{st.total}
                    </span>
                  )}
                  {/* 복습 예정 문항이 있는 판 */}
                  {(v?.due ?? 0) > 0 && (
                    <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                  )}
                </Link>
              );
            })}
          </div>

          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-emerald-500" /> 만점 클리어
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-amber-300" /> 도전 중
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> 복습 예정 있음
            </span>
          </p>
        </motion.section>

        {/* ── 과목 선택 ─────────────────────────────────────────── */}
        <motion.section {...rise(0.12)} className="mt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[15px] font-bold text-neutral-800">과목별 현황</h2>
            <p className="text-[12px] text-neutral-500">
              과목을 고르면 그 과목만 출제돼요
            </p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {CIM_SUBJECTS.map((no) => {
              const s = view?.subjects.find((v) => v.no === no) ?? null;
              const on = subject === no;
              return (
                <button
                  key={no}
                  onClick={() => setSubject(on ? null : no)}
                  className={`card p-4 text-left transition ${
                    on ? "ring-2 ring-blue-500/60" : "hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="chip bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                      제{no}과목
                    </span>
                    {s?.atRisk && (
                      <span className="chip bg-rose-50 text-rose-600 ring-1 ring-rose-200">
                        과락 위험
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[14px] font-bold text-neutral-900">
                    {CIM_SUBJECT_META[no].short}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    시험 {CIM_SUBJECT_META[no].examCount}문항 배점
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
                      style={{ width: `${Math.round((s?.coverage ?? 0) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500">
                      학습 {s?.studied ?? 0}/{s?.total ?? 0}
                    </span>
                    <span
                      className={
                        s?.accuracy == null
                          ? "text-neutral-400"
                          : s.accuracy < CIM_FAIL_FLOOR
                            ? "font-bold text-rose-600"
                            : "font-bold text-emerald-600"
                      }
                    >
                      {s?.accuracy == null ? "미응시" : `정답률 ${Math.round(s.accuracy * 100)}%`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* ── 학습 시작 ─────────────────────────────────────────── */}
        <motion.section {...rise(0.18)} className="mt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[15px] font-bold text-neutral-800">
              빠른 연습
              {subject && (
                <span className="ml-2 text-[12px] font-semibold text-blue-600">
                  제{subject}과목만
                </span>
              )}
            </h2>
            {subject && (
              <button
                onClick={() => setSubject(null)}
                className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-700"
              >
                전 과목으로 ✕
              </button>
            )}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {MODES.map((mode) => {
              const n = counts?.[mode] ?? 0;
              const primary = mode === "review";
              const disabled = state !== null && n === 0;
              return (
                <Link
                  key={mode}
                  href={disabled ? "#" : studyHref(mode)}
                  aria-disabled={disabled}
                  onClick={(e) => disabled && e.preventDefault()}
                  className={`card flex items-center justify-between gap-3 p-4 transition ${
                    disabled
                      ? "cursor-not-allowed opacity-45"
                      : "hover:-translate-y-0.5 hover:shadow-lg"
                  } ${primary && !disabled ? "ring-1 ring-blue-300" : ""}`}
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-neutral-900">
                      {CIM_MODE_LABEL[mode].label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-neutral-500">
                      {CIM_MODE_LABEL[mode].hint}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-xl px-3 py-1.5 text-[13px] font-extrabold tabular-nums ${
                      primary ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {state === null ? "—" : n}
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
            스테이지와 별개로, 파트를 가리지 않고 <b className="text-neutral-700">복습 예정</b>·
            <b className="text-neutral-700">틀린 문제</b>만 모아 풉니다. 맞힌 문제는 1 · 3 · 7 · 16 ·
            35일 뒤 복습으로 돌아와요.
          </p>

          {/* 오답노트 — 푸는 것 말고 읽는 것 */}
          <Link
            href="/cim/notes"
            className="card mt-3 flex items-center justify-between gap-3 p-4 ring-1 ring-rose-200
              transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-neutral-900">📕 오답노트</p>
              <p className="mt-0.5 text-[12px] text-neutral-500">
                {notes && notes.total > 0
                  ? `아직 못 잡은 ${notes.open}문항 · 잡은 오답 ${notes.settled}문항`
                  : "틀린 문항을 문제·내 답·해설로 복기"}
              </p>
            </div>
            <span className="shrink-0 rounded-xl bg-rose-50 px-3 py-1.5 text-[13px] font-extrabold tabular-nums text-rose-600 ring-1 ring-rose-200">
              {state === null ? "—" : notes?.total ?? 0}
            </span>
          </Link>
        </motion.section>

        {/* ── 문제집 목록 ───────────────────────────────────────── */}
        <motion.section {...rise(0.24)} className="mt-8">
          <button
            onClick={() => setOpenSets((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-white/70 px-4 py-3
              text-left ring-1 ring-neutral-200 transition hover:bg-white"
          >
            <span className="text-[14px] font-bold text-neutral-800">
              문제집 {sets.length}권 · 총 {index.length}문항
            </span>
            <span className="text-[12px] text-neutral-500">{openSets ? "접기" : "펼치기"}</span>
          </button>

          {openSets && (
            <div className="mt-3 space-y-2">
              {sets.map((s) => (
                <div key={s.id} className="card flex items-center justify-between gap-3 p-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-neutral-800">{s.title}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      Q{s.from}–Q{s.to} · 1과목 {s.bySubject[1]} · 2과목 {s.bySubject[2]} · 3과목{" "}
                      {s.bySubject[3]}
                    </p>
                  </div>
                  <span className="shrink-0 text-[12px] font-bold tabular-nums text-neutral-600">
                    {s.questions}문항
                  </span>
                </div>
              ))}
              <p className="px-1 pt-1 text-[11px] leading-relaxed text-neutral-500">
                새 문제집은 <code className="rounded bg-neutral-100 px-1">content/cim/</code> 폴더에
                같은 형식의 .md 파일을 넣으면 자동으로 추가돼요.
                넣은 뒤 <code className="rounded bg-neutral-100 px-1">node scripts/validate-cim.mjs</code>{" "}
                로 확인하세요.
              </p>
            </div>
          )}
        </motion.section>

        {/* ── 기록 초기화 ───────────────────────────────────────── */}
        {view && view.studied > 0 && (
          <motion.section {...rise(0.3)} className="mt-8">
            {confirmReset ? (
              <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
                <p className="text-[13px] text-neutral-700">
                  학습 기록(복습 일정·정답률)을 모두 지울까요? 되돌릴 수 없어요.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmReset(false)} className="btn-ghost text-[13px]">
                    취소
                  </button>
                  <button
                    onClick={() => {
                      resetCim();
                      setState(loadCim());
                      setConfirmReset(false);
                    }}
                    className="rounded-2xl bg-rose-600 px-5 py-3 text-[13px] font-semibold text-white
                      transition hover:bg-rose-700 active:scale-[0.99]"
                  >
                    초기화
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="text-[12px] font-semibold text-neutral-400 hover:text-neutral-600"
              >
                학습 기록 초기화
              </button>
            )}
          </motion.section>
        )}
      </div>
    </main>
  );
}

/* ────────────────────────────────────────────────────────────
 * 히어로 — 예상 점수와 합격 판정
 * ──────────────────────────────────────────────────────────── */

function PassPanel({ view, total }: { view: CimView | null; total: number }) {
  const score = view?.predictedScore ?? null;
  const pass = view?.predictedPass ?? false;
  const failing = view?.failing ?? [];
  const passLine = CIM_PASS_RATE * CIM_EXAM_TOTAL;

  return (
    <div className="surface-dark overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200/70">
            지금 시험 보면
          </p>

          {score === null ? (
            <>
              <p className="mt-2 text-[28px] font-extrabold text-white sm:text-[34px]">
                아직 판정할 수 없어요
              </p>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-blue-100/70">
                한 문제도 풀지 않았어요. 20문항만 풀어도 과목별 정답률이 잡히고, 그때부터
                합격 여부를 예측해 드려요.
              </p>
            </>
          ) : (
            <>
              <div className="mt-1 flex items-end gap-3">
                <span className="text-[52px] font-extrabold leading-none tabular-nums text-white sm:text-[64px]">
                  {Math.round(score)}
                </span>
                <span className="pb-2 text-[15px] font-semibold text-blue-200/80">/ 100점</span>
              </div>
              <p
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold ${
                  pass
                    ? "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30"
                    : "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/30"
                }`}
              >
                {pass ? "합격권" : failing.length > 0 ? "과락 위험" : "합격선 미달"}
              </p>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-blue-100/70">
                {failing.length > 0 ? (
                  <>
                    <b className="text-rose-200">
                      제{failing.join(" · 제")}과목
                    </b>
                    이 40% 미만이에요. 총점이 높아도 <b className="text-white">한 과목만 과락이면
                    불합격</b>이라 이 과목부터 메워야 해요.
                  </>
                ) : pass ? (
                  <>합격선 70점을 넘겼어요. 이 정답률을 복습으로 유지하는 게 남은 과제예요.</>
                ) : (
                  <>합격선까지 {Math.max(1, Math.ceil(passLine - score))}점 남았어요.</>
                )}
              </p>
            </>
          )}
        </div>

        {/* 우측 지표 */}
        <div className="grid w-full max-w-[15rem] shrink-0 grid-cols-2 gap-2 sm:w-auto">
          <Stat label="오늘 복습" value={view ? `${view.due}` : "—"} accent />
          <Stat label="학습한 문항" value={view ? `${view.studied}` : "—"} sub={`/ ${total}`} />
          <Stat label="숙달" value={view ? `${view.mastered}` : "—"} />
          <Stat
            label="예측 신뢰도"
            value={view ? `${Math.round(view.confidence * 100)}%` : "—"}
          />
        </div>
      </div>

      {/* 합격선 게이지 */}
      {score !== null && (
        <div className="mt-6">
          <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full ${
                pass ? "bg-gradient-to-r from-emerald-400 to-teal-300" : "bg-gradient-to-r from-blue-500 to-sky-400"
              }`}
              style={{ width: `${Math.min(100, Math.max(2, score))}%` }}
            />
            <div
              className="absolute inset-y-0 w-px bg-white/60"
              style={{ left: `${passLine}%` }}
              aria-hidden
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-blue-200/60">
            <span>0</span>
            <span>합격선 70</span>
            <span>100</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-3 py-2.5 ring-1 ${
        accent ? "bg-blue-400/15 ring-blue-300/30" : "bg-white/[0.06] ring-white/10"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-100/60">
        {label}
      </p>
      <p className="mt-0.5 text-[18px] font-extrabold tabular-nums text-white">
        {value}
        {sub && <span className="ml-1 text-[11px] font-semibold text-blue-200/60">{sub}</span>}
      </p>
    </div>
  );
}
