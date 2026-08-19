"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  loadCim,
  buildQueue,
  answerCim,
  startCimSession,
  recordStage,
  CIM_SUBJECT_META,
  CIM_MODE_LABEL,
  CIM_INTERVAL_DAYS,
  CIM_SESSION_SIZE,
  type CimMode,
  type CimQuestion,
  type CimSubject,
} from "@/game/cim";
import { ChoiceBadge, Rich } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Attempt {
  id: string;
  ok: boolean;
}

/** 스테이지 진입 정보 — 없으면 기존 모드(복습·틀린문제 등) 세션 */
export interface StageInfo {
  no: number;
  /** 전체 스테이지 수 */
  count: number;
  from: number;
  to: number;
}

export default function CimStudy({
  questions,
  mode,
  subject,
  stage = null,
}: {
  questions: CimQuestion[];
  mode: CimMode;
  subject: CimSubject | null;
  stage?: StageInfo | null;
}) {
  const reduce = useReducedMotion();

  /** 큐는 마운트 후 한 번만 짠다 (localStorage 접근 → 하이드레이션 안전) */
  const [queue, setQueue] = useState<CimQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  /** 문항별 첫 시도 결과 — 재투입분은 통계에 다시 세지 않는다 */
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [retried, setRetried] = useState<Set<string>>(new Set());
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    // 스테이지는 받은 5문항을 **그대로** 푼다(판마다 같은 순서 = 기억의 좌표가 생긴다)
    const q = stage
      ? questions
      : buildQueue(loadCim(), questions, { mode, subject, size: CIM_SESSION_SIZE });
    setQueue(q);
    if (q.length > 0) startCimSession();
  }, [questions, mode, subject, stage]);

  const cur = queue && idx < queue.length ? queue[idx] : null;

  const choose = useCallback(
    (i: number) => {
      if (!cur || picked !== null) return;
      setPicked(i);
      const ok = i === cur.answerIndex;
      // 고른 선지까지 남긴다 — 오답노트에서 "내가 뭐라고 답했는지"가 복기의 절반이다
      answerCim(cur.id, ok, i);
      // 첫 시도만 성적에 반영 (같은 세션 재투입분은 제외)
      setAttempts((prev) => (prev.some((a) => a.id === cur.id) ? prev : [...prev, { id: cur.id, ok }]));
    },
    [cur, picked]
  );

  const next = useCallback(() => {
    if (!cur || picked === null || !queue) return;
    const ok = picked === cur.answerIndex;
    // 틀린 문항은 이번 세션 끝에 한 번 더 — 오답을 그대로 두고 넘어가면 남지 않는다
    if (!ok && !retried.has(cur.id)) {
      setQueue([...queue, cur]);
      setRetried((prev) => new Set(prev).add(cur.id));
    }
    setPicked(null);
    setIdx((n) => n + 1);
  }, [cur, picked, queue, retried]);

  // 키보드: 1~4 선택 · Enter/Space 다음
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") {
        choose(Number(e.key) - 1);
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && picked !== null) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, next, picked]);

  const correct = attempts.filter((a) => a.ok).length;
  const answered = attempts.length;
  const done = queue !== null && idx >= queue.length;

  // 판이 끝나면 성적을 1회만 기록한다 (최고 점수 갱신)
  const recorded = useRef(false);
  useEffect(() => {
    if (!done || !stage || recorded.current || answered === 0) return;
    recorded.current = true;
    recordStage(stage.no, correct);
  }, [done, stage, correct, answered]);

  /* ── 큐가 비었을 때 ─────────────────────────────────────── */
  if (queue !== null && queue.length === 0) {
    return (
      <Shell mode={mode} subject={subject} stage={stage}>
        <div className="card-elevated mt-10 p-8 text-center">
          <p className="text-[40px]">🎉</p>
          <h2 className="mt-3 text-[20px] font-extrabold text-neutral-900">
            지금 풀 문항이 없어요
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-neutral-500">
            {mode === "review"
              ? "복습 예정일이 된 문항이 아직 없어요. 새 문제를 풀거나, 예정일이 오면 다시 들러 주세요."
              : mode === "wrong"
                ? "마지막 시도에서 틀린 문항이 없어요. 잘 하고 있어요."
                : mode === "fresh"
                  ? "아직 안 푼 문항을 모두 소진했어요. 이제 복습이 남았어요."
                  : "이 조건에 해당하는 문항이 없어요."}
          </p>
          <Link href="/cim" className="btn-blue mt-6 inline-block">
            현황으로 돌아가기
          </Link>
        </div>
      </Shell>
    );
  }

  /* ── 세션 요약 ──────────────────────────────────────────── */
  if (done && queue) {
    const rate = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    // 스테이지는 "몇 %"보다 **몇 개 맞혔나**가 목표다 — 만점이면 클리어
    if (stage) {
      const perfect = correct === answered && answered > 0;
      const hasNext = stage.no < stage.count;
      return (
        <Shell mode={mode} subject={subject} stage={stage}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="card-elevated mt-8 overflow-hidden p-7 text-center sm:p-9"
          >
            <p className="label">스테이지 {stage.no}</p>
            <p className="mt-3 text-[44px] leading-none">{perfect ? "🏆" : "💪"}</p>
            <h2 className="mt-3 text-[22px] font-extrabold text-neutral-900">
              {perfect ? "클리어!" : "아직 한 판 더"}
            </h2>

            {/* 문항별 결과 도트 — 다섯 칸이 한눈에 */}
            <div className="mt-5 flex justify-center gap-2">
              {attempts.map((a, i) => (
                <motion.span
                  key={a.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 400, damping: 22 }}
                  className={`grid h-10 w-10 place-items-center rounded-2xl text-[16px] font-black ring-1 ${
                    a.ok
                      ? "bg-emerald-50 text-emerald-600 ring-emerald-300"
                      : "bg-rose-50 text-rose-500 ring-rose-300"
                  }`}
                >
                  {a.ok ? "○" : "✕"}
                </motion.span>
              ))}
            </div>

            <p className="mt-4 text-[15px] font-bold text-neutral-800">
              {correct} / {answered} 정답
            </p>
            <p className="mx-auto mt-2 max-w-xs text-[12.5px] leading-relaxed text-neutral-500">
              {perfect
                ? "이 판은 접었어요. 맞힌 문항은 1·3·7·16·35일 뒤 복습으로 돌아와요."
                : "틀린 문항은 복습 큐에 올라갔어요. 다시 도전하면 최고 점수만 남아요."}
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              {hasNext ? (
                <Link href={`/cim/study?stage=${stage.no + 1}`} className="btn-blue">
                  스테이지 {stage.no + 1} 시작 →
                </Link>
              ) : (
                <Link href="/cim" className="btn-blue">
                  마지막 판이에요 · 현황 보기
                </Link>
              )}
              <div className="flex gap-2.5">
                <Link
                  href={`/cim/study?stage=${stage.no}`}
                  className="btn-ghost flex-1 text-center"
                >
                  이 판 다시
                </Link>
                <Link href="/cim" className="btn-ghost flex-1 text-center">
                  스테이지 목록
                </Link>
              </div>
              {!perfect && (
                <Link
                  href="/cim/notes"
                  className="text-[12.5px] font-semibold text-rose-600 transition hover:text-rose-700"
                >
                  틀린 문항 오답노트에서 복기하기 →
                </Link>
              )}
            </div>
          </motion.div>
        </Shell>
      );
    }

    return (
      <Shell mode={mode} subject={subject}>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="card-elevated mt-8 p-7 sm:p-9"
        >
          <p className="label">세션 완료</p>
          <div className="mt-2 flex items-end gap-3">
            <span className="text-[48px] font-extrabold leading-none tabular-nums text-neutral-900">
              {rate}
            </span>
            <span className="pb-1.5 text-[15px] font-semibold text-neutral-500">
              % · {correct}/{answered} 정답
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Tile label="푼 문항" value={`${answered}`} />
            <Tile label="맞힌 문항" value={`${correct}`} tone="emerald" />
            <Tile label="틀린 문항" value={`${answered - correct}`} tone="rose" />
          </div>

          <p className="mt-6 rounded-2xl bg-blue-50/70 p-4 text-[13px] leading-relaxed text-blue-900 ring-1 ring-blue-100">
            맞힌 문항은 <b>{CIM_INTERVAL_DAYS.slice(1).join(" · ")}일</b> 간격으로 복습에 다시
            올라와요. 틀린 문항은 <b>다음 세션 맨 앞</b>에 나옵니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/cim/study?mode=${mode}${subject ? `&subject=${subject}` : ""}`} className="btn-blue">
              이어서 더 풀기
            </Link>
            {answered > correct && (
              <Link href="/cim/notes" className="btn-ghost">
                오답노트 ({answered - correct})
              </Link>
            )}
            <Link href="/cim" className="btn-ghost">
              현황 보기
            </Link>
          </div>
        </motion.div>
      </Shell>
    );
  }

  /* ── 로딩 ───────────────────────────────────────────────── */
  if (!cur || !queue) {
    return (
      <Shell mode={mode} subject={subject} stage={stage}>
        <div className="card mt-8 h-64 p-6">
          <div className="skeleton h-5 w-40 rounded-full" />
          <div className="skeleton mt-4 h-4 w-full rounded-full" />
          <div className="skeleton mt-2 h-4 w-3/4 rounded-full" />
        </div>
      </Shell>
    );
  }

  const revealed = picked !== null;
  const isCorrect = picked === cur.answerIndex;
  const isRetry = retried.has(cur.id);

  return (
    <Shell mode={mode} subject={subject} stage={stage}>
      {/* 진행 */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[12px] font-semibold text-neutral-500">
          <span>
            {idx + 1} / {queue.length}
          </span>
          <span className="tabular-nums">
            정답 {correct}
            <span className="text-neutral-300"> · </span>
            오답 {answered - correct}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200/70">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
            animate={{ width: `${((idx + (revealed ? 1 : 0)) / queue.length) * 100}%` }}
            transition={{ duration: 0.35, ease: EASE }}
          />
        </div>
      </div>

      {/* 문항 */}
      <AnimatePresence mode="wait">
        <motion.article
          key={`${cur.id}-${idx}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="sheet mt-4 overflow-hidden"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400" />

          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                제{cur.subject}과목 · {CIM_SUBJECT_META[cur.subject].short}
              </span>
              <span className="chip bg-neutral-100 text-neutral-600">Q{cur.no}</span>
              {isRetry && (
                <span className="chip bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                  다시 도전
                </span>
              )}
            </div>

            <h2 className="mt-4 text-[16px] font-bold leading-relaxed text-neutral-900 sm:text-[17px]">
              <Rich text={cur.prompt} />
            </h2>

            {cur.stimulus.length > 0 && (
              <div className="mt-4 space-y-1 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-200/70">
                {cur.stimulus.map((line, i) => (
                  <p key={i} className="text-[13.5px] leading-relaxed text-neutral-700">
                    <Rich text={line} />
                  </p>
                ))}
              </div>
            )}

            {/* 선지 */}
            <div className="mt-5 space-y-2.5">
              {cur.choices.map((c, i) => {
                const isAnswer = i === cur.answerIndex;
                const isPicked = i === picked;
                let tone =
                  "bg-white ring-neutral-200 hover:ring-blue-300 hover:bg-blue-50/40 text-neutral-800";
                if (revealed) {
                  if (isAnswer) tone = "bg-emerald-50 ring-emerald-400 text-emerald-900";
                  else if (isPicked) tone = "bg-rose-50 ring-rose-400 text-rose-900";
                  else tone = "bg-white ring-neutral-200 text-neutral-400";
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition
                      ${tone} ${revealed ? "cursor-default" : "active:scale-[0.995]"}`}
                  >
                    <ChoiceBadge
                      n={i + 1}
                      tone={
                        !revealed
                          ? "idle"
                          : isAnswer
                            ? "answer"
                            : isPicked
                              ? "wrong"
                              : "dim"
                      }
                    />
                    <span className="text-[14px] leading-relaxed">
                      <Rich text={c} />
                    </span>
                  </button>
                );
              })}
            </div>

            {!revealed && (
              <p className="mt-4 text-center text-[11.5px] text-neutral-400">
                키보드 <b className="text-neutral-500">1~4</b> 로 선택 · 정답 확인 후{" "}
                <b className="text-neutral-500">Enter</b> 로 다음
              </p>
            )}

            {/* 채점 + 해설 */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-5 rounded-2xl p-4 ring-1 ${
                      isCorrect
                        ? "bg-emerald-50/70 ring-emerald-200"
                        : "bg-rose-50/70 ring-rose-200"
                    }`}
                  >
                    <p
                      className={`text-[14px] font-extrabold ${
                        isCorrect ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {isCorrect ? "정답" : `오답 — 정답은 ${cur.answerIndex + 1}번`}
                    </p>
                    {cur.explanation && (
                      <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-700">
                        <Rich text={cur.explanation} />
                      </p>
                    )}
                    {!isCorrect && !isRetry && (
                      <p className="mt-3 text-[12px] font-semibold text-rose-600">
                        이 문항은 이번 세션 끝에 한 번 더 나와요.
                      </p>
                    )}
                  </div>

                  <button onClick={next} className="btn-blue mt-4 w-full">
                    {idx + 1 >= queue.length ? "결과 보기 →" : "다음 문항 →"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.article>
      </AnimatePresence>
    </Shell>
  );
}

/* ────────────────────────────────────────────────────────── */

function Shell({
  mode,
  subject,
  stage = null,
  children,
}: {
  mode: CimMode;
  subject: CimSubject | null;
  stage?: StageInfo | null;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-dvh overflow-hidden pb-16 pt-5 sm:pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-64 w-[38rem] -translate-x-1/2
          rounded-full bg-blue-400/20 blur-[90px]"
      />
      <div className="container-narrow pb-safe">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/cim"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500
              transition hover:text-neutral-800"
          >
            ← 현황
          </Link>
          {stage ? (
            <p className="text-[12px] font-bold text-neutral-500">
              <span className="text-blue-600">스테이지 {stage.no}</span>
              <span className="text-neutral-300"> / </span>
              {stage.count}
              <span className="ml-1.5 text-neutral-400">
                Q{stage.from}–{stage.to}
              </span>
            </p>
          ) : (
            <p className="text-[12px] font-semibold text-neutral-500">
              {CIM_MODE_LABEL[mode].label}
              {subject && <span className="ml-1.5 text-blue-600">· 제{subject}과목</span>}
            </p>
          )}
        </div>
        {children}
      </div>
    </main>
  );
}

function Tile({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "emerald" | "rose";
}) {
  const map = {
    neutral: "bg-neutral-50 text-neutral-800 ring-neutral-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
  } as const;
  return (
    <div className={`rounded-2xl p-4 ring-1 ${map[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] opacity-70">{label}</p>
      <p className="mt-1 text-[22px] font-extrabold tabular-nums">{value}</p>
    </div>
  );
}
