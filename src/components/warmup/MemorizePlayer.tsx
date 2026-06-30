"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { WarmupDeck } from "@/lib/warmup-loader";
import {
  buildCloze,
  deckSr,
  loadMemorize,
  normalizeAnswer,
  rateCard,
  resetMemorizeDeck,
  sentenceKey,
  type Cloze,
  type DeckSr,
} from "@/game/memorize";
import ResetButton from "./ResetButton";

const SESSION_SIZE = 20;

interface FlatItem {
  key: string;
  /** 전역 일련번호 1~100 (순서 암기용) */
  no: number;
  en: string;
  ko: string;
  titleKo: string;
}

type StepType = "cloze" | "recall";

interface QueueItem extends FlatItem {
  step: StepType;
  cloze?: Cloze;
}

function flatten(deck: WarmupDeck): FlatItem[] {
  const out: FlatItem[] = [];
  deck.sections.forEach((sec, si) => {
    sec.sentences.forEach((s, pi) => {
      out.push({
        key: sentenceKey(si, pi),
        no: out.length + 1,
        en: s.en,
        ko: s.ko,
        titleKo: sec.titleKo,
      });
    });
  });
  return out;
}

function toQueueItem(it: FlatItem, box: number): QueueItem {
  const step: StepType = box >= 2 ? "recall" : "cloze";
  return { ...it, step, cloze: step === "cloze" ? buildCloze(it.en) : undefined };
}

function buildQueue(items: FlatItem[], dk: DeckSr, reviewAll: boolean): QueueItem[] {
  if (reviewAll) {
    return items.map((it) => toQueueItem(it, dk[it.key]?.box ?? 0));
  }
  const now = Date.now();
  const due = items
    .filter((it) => dk[it.key] && dk[it.key].seen > 0 && dk[it.key].due <= now)
    .sort((a, b) => dk[a.key].due - dk[b.key].due);
  const fresh = items.filter((it) => !dk[it.key] || dk[it.key].seen === 0);
  const picked = [...due, ...fresh].slice(0, SESSION_SIZE);
  return picked.map((it) => toQueueItem(it, dk[it.key]?.box ?? 0));
}

/** 영문에서 Cloze 정답 단어를 앰버로 하이라이트 */
function highlightAnswers(en: string, answers: string[]) {
  const set = new Set(answers.map((a) => a.toLowerCase()));
  return en.split(/(\s+)/).map((tok, i) => {
    const core = tok.replace(/[^A-Za-z']/g, "").toLowerCase();
    if (core && set.has(core)) {
      return (
        <mark
          key={i}
          className="rounded-md bg-amber-200/60 px-1 font-bold text-amber-900 decoration-clone"
        >
          {tok}
        </mark>
      );
    }
    return <span key={i}>{tok}</span>;
  });
}

/**
 * display 문자열의 ____ 자리마다 <input>을 삽입해 반환한다.
 * onChange(idx, val) — 입력값 변경
 * onEnterAt(idx)    — Enter: 마지막 빈칸이면 제출, 아니면 다음 input으로 포커스
 * refs              — input DOM 참조
 */
function renderClozeWithInputs(
  display: string,
  inputs: string[],
  onChange: (idx: number, val: string) => void,
  onEnterAt: (idx: number) => void,
  refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
) {
  const parts = display.split("____");
  let blankIdx = 0;
  const nodes: React.ReactNode[] = [];
  parts.forEach((seg, i) => {
    nodes.push(<span key={`s${i}`}>{seg}</span>);
    if (i < parts.length - 1) {
      const idx = blankIdx++;
      nodes.push(
        <input
          key={`inp${idx}`}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type="text"
          value={inputs[idx] ?? ""}
          // autoFocus works because AnimatePresence remounts the card on each cur.key change
          autoFocus={idx === 0}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => onChange(idx, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnterAt(idx);
            }
          }}
          className="mx-1 inline-block w-24 rounded-lg border-0 border-b-2 border-amber-400 bg-amber-50/80 px-2 py-0.5 text-center align-baseline text-[0.85em] font-bold text-amber-900 outline-none transition focus:border-amber-500 focus:bg-amber-50 focus:ring-2 focus:ring-amber-400/40 sm:w-28"
        />,
      );
    }
  });
  return nodes;
}

export default function MemorizePlayer({ deck }: { deck: WarmupDeck }) {
  const router = useRouter();
  const items = useMemo(() => flatten(deck), [deck]);

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [sessionTotal, setSessionTotal] = useState(0);
  // recall 단계 전용
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [emptyDue, setEmptyDue] = useState(false);

  // ── Cloze 입력 상태 ──────────────────────────────────────
  const [inputs, setInputs] = useState<string[]>([]);
  /** null=입력 대기, {ok:true}=정답, {ok:false}=오답/패스 */
  const [clozePending, setClozePending] = useState<{ ok: boolean } | null>(null);
  /** 정답 자동 전진 guard (타임아웃·키보드 이중 호출 방지) */
  const clozeAdvancedRef = useRef(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const doneKeys = useRef<Set<string>>(new Set());
  const firstSeen = useRef<Set<string>>(new Set());
  const stats = useRef({ firstTryOk: 0, again: 0 });

  const startSession = useCallback(
    (reviewAll: boolean) => {
      const dk = deckSr(loadMemorize(), deck.id);
      const q = buildQueue(items, dk, reviewAll);
      doneKeys.current = new Set();
      firstSeen.current = new Set();
      stats.current = { firstTryOk: 0, again: 0 };
      setRevealed(false);
      setDone(false);
      setInputs([]);
      setClozePending(null);
      clozeAdvancedRef.current = false;
      if (q.length === 0) {
        setEmptyDue(true);
        setQueue([]);
        setSessionTotal(0);
      } else {
        setEmptyDue(false);
        setQueue(q);
        setSessionTotal(new Set(q.map((i) => i.key)).size);
      }
      setReady(true);
    },
    [deck.id, items],
  );

  useEffect(() => {
    startSession(false);
  }, [startSession]);

  const cur = queue[0];

  // 카드 전환 시 입력 상태 초기화
  useEffect(() => {
    if (!cur) return;
    const blanks = cur.step === "cloze" ? (cur.cloze?.answers.length ?? 1) : 0;
    setInputs(Array(blanks).fill(""));
    setClozePending(null);
    clozeAdvancedRef.current = false;
    inputRefs.current = [];
  }, [cur?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const rate = useCallback(
    (ok: boolean) => {
      if (!cur) return;
      rateCard(deck.id, cur.key, ok);

      const isFirst = !firstSeen.current.has(cur.key);
      if (isFirst) {
        firstSeen.current.add(cur.key);
        if (ok) stats.current.firstTryOk += 1;
      }
      if (!ok) stats.current.again += 1;

      setQueue((q) => {
        const [head, ...rest] = q;
        if (ok) {
          doneKeys.current.add(head.key);
          if (rest.length === 0) setDone(true);
          return rest;
        }
        return [...rest, head];
      });
      setRevealed(false);
    },
    [cur, deck.id],
  );

  // Cloze 제출: 입력 정규화 후 answers 와 비교
  const submitCloze = useCallback(() => {
    if (!cur?.cloze || clozePending) return;
    const ok = cur.cloze.answers.every(
      (ans, i) => normalizeAnswer(inputs[i] ?? "") === ans.toLowerCase(),
    );
    clozeAdvancedRef.current = false;
    setClozePending({ ok });
  }, [cur, inputs, clozePending]);

  // 정답 자동 전진 (800ms 후 rate(true))
  useEffect(() => {
    if (!clozePending?.ok) return;
    const t = setTimeout(() => {
      if (!clozeAdvancedRef.current) {
        clozeAdvancedRef.current = true;
        setClozePending(null);
        rate(true);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [clozePending, rate]);

  // 키보드 단축키
  useEffect(() => {
    if (done || !cur) return;
    const onKey = (e: KeyboardEvent) => {
      if (cur.step === "cloze") {
        // 피드백 상태에서만 Enter/Space 로 전진 (입력 중엔 input 의 자체 핸들러 사용)
        if (!clozePending) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!clozeAdvancedRef.current) {
            clozeAdvancedRef.current = true;
            const ok = clozePending.ok;
            setClozePending(null);
            rate(ok);
          }
        }
      } else {
        // Recall: 기존 동작 그대로
        if (!revealed && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          setRevealed(true);
        } else if (revealed) {
          if (e.key === "1") {
            e.preventDefault();
            rate(false);
          } else if (e.key === "2" || e.key === " " || e.key === "Enter") {
            e.preventDefault();
            rate(true);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, cur, revealed, rate, clozePending]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const doneCount = doneKeys.current.size;
  const pct = sessionTotal > 0 ? (doneCount / sessionTotal) * 100 : 0;

  // ── 복습할 게 없을 때 ───────────────────────────────
  if (ready && emptyDue) {
    return (
      <main className="container-narrow flex min-h-dvh flex-col items-center justify-center py-12 pb-safe text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease }}
          className="card-elevated relative w-full max-w-md overflow-hidden px-7 py-11"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="text-[50px]">✅</div>
          <h1 className="mt-3 text-[21px] font-extrabold tracking-[-0.02em] text-neutral-900">
            지금 복습할 문장이 없어요
          </h1>
          <p className="mt-2.5 text-[14px] leading-relaxed text-neutral-500">
            「{deck.titleKo}」의 예정된 복습을 모두 마쳤습니다.
            <br />
            간격 복습은 시간이 지나면 다시 떠올라요. 미리 더 보고 싶다면 전체 복습을 할 수 있어요.
          </p>
          <div className="mt-8 flex flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={() => startSession(true)}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-h-[52px] w-full text-[15px]"
            >
              전체 복습하기
            </motion.button>
            <button
              type="button"
              onClick={() => router.push("/warmup")}
              className="btn-ghost min-h-[52px] w-full text-[15px]"
            >
              책 목록으로
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── 세션 완료 ──────────────────────────────────────
  if (done) {
    const learned = firstSeen.current.size;
    const acc = learned > 0 ? Math.round((stats.current.firstTryOk / learned) * 100) : 0;
    return (
      <main className="container-narrow flex min-h-dvh flex-col items-center justify-center py-12 pb-safe text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="card-elevated relative w-full max-w-md overflow-hidden px-7 py-11"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
            className="text-[54px]"
          >
            🧠
          </motion.div>
          <h1 className="mt-3 text-[22px] font-extrabold tracking-[-0.02em] text-neutral-900">
            암기 세션 완료!
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
            「{deck.titleKo}」 {sessionTotal}문장을 떠올려봤어요.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <Stat label="학습" value={`${sessionTotal}`} tone="neutral" />
            <Stat label="첫시도 정답" value={`${acc}%`} tone="indigo" />
            <Stat label="다시" value={`${stats.current.again}`} tone="rose" />
          </div>
          <p className="mt-5 text-[12px] leading-relaxed text-neutral-400">
            맞힌 문장은 더 긴 간격으로, 틀린 문장은 곧 다시 나타나요 (간격 반복).
          </p>
          <div className="mt-7 flex flex-col gap-2.5">
            <motion.button
              type="button"
              onClick={() => startSession(false)}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-h-[52px] w-full text-[15px]"
            >
              이어서 더 하기
            </motion.button>
            <button
              type="button"
              onClick={() => router.push("/warmup")}
              className="btn-ghost min-h-[52px] w-full text-[15px]"
            >
              책 목록으로
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  if (!ready || !cur) {
    return <main className="container-narrow min-h-dvh py-12" />;
  }

  const isCloze = cur.step === "cloze";
  const totalBlanks = cur.cloze?.answers.length ?? 1;

  // ── 카드 화면 ──────────────────────────────────────
  return (
    <main className="container-narrow relative flex min-h-dvh flex-col overflow-hidden py-5 pb-safe sm:py-7">
      {/* 컬러 오라 — 단계별 색 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] ${
          isCloze
            ? "bg-gradient-to-br from-amber-300/35 via-orange-300/25 to-yellow-300/20"
            : "bg-gradient-to-br from-violet-400/30 via-fuchsia-400/25 to-purple-400/20"
        }`}
      />

      {/* 상단 */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/warmup")}
          className="-ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700"
        >
          ← 책 목록
        </button>
        <span className="chip ring-1 ring-neutral-900/[0.05] normal-case tracking-normal text-neutral-500">
          🧠 <span className="max-w-[36vw] truncate">{deck.titleKo}</span>
        </span>
        <span className="tabnum text-[13px] font-bold text-neutral-700">
          {doneCount}
          <span className="text-neutral-300"> / {sessionTotal}</span>
        </span>
      </div>

      {/* 진도 바 */}
      <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-neutral-900/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* 카드 */}
      <div className="flex flex-1 flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.key + (!isCloze && revealed ? "-r" : "")}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className={`sheet relative overflow-hidden bg-gradient-to-b from-white via-white px-6 py-9 sm:px-11 sm:py-12 ${
              isCloze ? "to-amber-50/70" : "to-violet-50/70"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 ${
                isCloze
                  ? "bg-gradient-to-r from-amber-400 to-orange-500"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              }`}
            />

            {/* 단계 배지 + No. */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  isCloze
                    ? "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20"
                    : "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20"
                }`}
              >
                {isCloze ? "✏️ 빈칸 채우기" : "💬 통문장 떠올리기"}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="hidden max-w-[24vw] truncate text-[11px] font-medium text-neutral-300 sm:inline">
                  {cur.titleKo}
                </span>
                <span className="tabnum rounded-full bg-neutral-900/[0.05] px-2 py-0.5 text-[11px] font-bold text-neutral-500">
                  No.{cur.no}
                </span>
              </span>
            </div>

            {/* ── Cloze 단계 ── */}
            {isCloze ? (
              <>
                {/* 문장 (피드백 전=입력 필드, 피드백 후=하이라이트) */}
                <div className="mt-6 text-[20px] font-semibold leading-[1.7] tracking-[-0.01em] text-neutral-900 sm:text-[24px]">
                  <span className="text-gradient mr-2 font-extrabold tabnum">{cur.no}.</span>
                  {clozePending
                    ? highlightAnswers(cur.en, cur.cloze?.answers ?? [])
                    : renderClozeWithInputs(
                        cur.cloze?.display ?? cur.en,
                        inputs,
                        (idx, val) =>
                          setInputs((prev) => {
                            const next = [...prev];
                            next[idx] = val;
                            return next;
                          }),
                        (idx) => {
                          if (idx === totalBlanks - 1) submitCloze();
                          else inputRefs.current[idx + 1]?.focus();
                        },
                        inputRefs,
                      )}
                </div>

                {/* 피드백 박스 */}
                <div
                  className={`mt-6 rounded-2xl px-4 py-4 ring-1 transition-colors ${
                    clozePending?.ok
                      ? "bg-emerald-50/80 ring-emerald-500/20"
                      : clozePending
                        ? "bg-rose-50/70 ring-rose-500/20"
                        : "bg-amber-50/60 ring-amber-500/15"
                  }`}
                >
                  {clozePending ? (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p
                        className={`mb-1.5 text-[11px] font-bold ${
                          clozePending.ok ? "text-emerald-600" : "text-rose-500"
                        }`}
                      >
                        {clozePending.ok ? "✓ 정답!" : "✗ 오답 — 정답 확인 후 다음으로"}
                      </p>
                      {!clozePending.ok && (
                        <p className="text-[12px] text-neutral-400">
                          Enter 또는 아래 버튼으로 다음 문장으로 이동하세요.
                        </p>
                      )}
                      {clozePending.ok && (
                        <p className="text-[12px] text-emerald-500">
                          잠시 후 자동으로 넘어갑니다.
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <p className="text-[13px] text-neutral-400">
                      빈칸에 단어를 입력하고{" "}
                      <strong className="font-semibold text-amber-600">Enter</strong>로 제출하세요.
                      모르면 아래 「모르겠어요」를 누르세요.
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* ── Recall 단계 (기존 자가채점 그대로) ── */
              <>
                <p className="mt-6 text-[18px] font-semibold leading-relaxed text-neutral-800 sm:text-[21px]">
                  <span className="text-gradient mr-2 font-extrabold tabnum">{cur.no}.</span>
                  {cur.ko}
                </p>

                <div className="mt-7 rounded-2xl bg-violet-50/60 px-4 py-4 ring-1 ring-violet-500/15">
                  {revealed ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p className="mb-2 text-[11px] font-semibold text-violet-500">정답</p>
                      <p className="text-[18px] font-semibold leading-[1.55] text-neutral-900 sm:text-[21px]">
                        <span className="text-gradient mr-2 font-extrabold tabnum">{cur.no}.</span>
                        {cur.en}
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-neutral-400">{cur.ko}</p>
                    </motion.div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRevealed(true)}
                      className="group flex w-full items-center justify-between rounded-xl bg-white/70 px-4 py-3.5 text-left ring-1 ring-white/60 transition-colors hover:bg-white"
                    >
                      <span className="text-[13px] text-neutral-500">
                        머릿속으로 끝까지 말한 뒤 확인하세요
                      </span>
                      <span className="text-[13px] font-semibold text-violet-600">정답 보기</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 컨트롤 */}
      <div>
        {isCloze ? (
          clozePending ? (
            /* 피드백 후: 정답이면 자동 전진 + 수동 버튼, 오답이면 다음 버튼 */
            <motion.button
              type="button"
              onClick={() => {
                if (!clozeAdvancedRef.current) {
                  clozeAdvancedRef.current = true;
                  const ok = clozePending.ok;
                  setClozePending(null);
                  rate(ok);
                }
              }}
              whileTap={{ scale: 0.98 }}
              className={`min-h-[52px] w-full rounded-2xl text-[15px] font-bold transition ${
                clozePending.ok
                  ? "btn-primary"
                  : "bg-rose-50 text-rose-600 ring-1 ring-rose-500/25 hover:bg-rose-100"
              }`}
            >
              {clozePending.ok ? "다음 ✓" : "다음 문장으로 →"}
            </motion.button>
          ) : (
            /* 입력 중: 모르겠어요 + 확인 */
            <div className="flex items-center gap-2.5">
              <motion.button
                type="button"
                onClick={() => {
                  clozeAdvancedRef.current = false;
                  setClozePending({ ok: false });
                }}
                whileTap={{ scale: 0.98 }}
                className="min-h-[52px] flex-[0_0_auto] rounded-2xl px-5 text-[14px] font-semibold text-neutral-400 ring-1 ring-neutral-900/10 transition hover:bg-neutral-50 active:scale-[0.99]"
              >
                모르겠어요
              </motion.button>
              <motion.button
                type="button"
                onClick={submitCloze}
                whileTap={{ scale: 0.98 }}
                className="btn-primary min-h-[52px] flex-1 text-[15px]"
              >
                확인 →
              </motion.button>
            </div>
          )
        ) : revealed ? (
          /* Recall 채점 */
          <div className="flex items-center gap-2.5">
            <motion.button
              type="button"
              onClick={() => rate(false)}
              whileTap={{ scale: 0.98 }}
              className="min-h-[52px] flex-1 rounded-2xl text-[15px] font-bold text-rose-500 ring-1 ring-rose-500/25 transition hover:bg-rose-50 active:scale-[0.99]"
            >
              다시 ↺
            </motion.button>
            <motion.button
              type="button"
              onClick={() => rate(true)}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-h-[52px] flex-1 text-[15px]"
            >
              알았어요 ✓
            </motion.button>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={() => setRevealed(true)}
            whileTap={{ scale: 0.99 }}
            className="btn-primary min-h-[52px] w-full text-[15px]"
          >
            정답 보기
          </motion.button>
        )}
      </div>

      {/* 키보드 힌트 (데스크탑) */}
      <div className="mt-3 hidden items-center justify-center gap-2.5 text-[11px] text-neutral-400 sm:flex">
        {isCloze ? (
          clozePending ? (
            <span className="inline-flex items-center gap-1">
              <Kbd>Enter</Kbd> 다음으로
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1">
                <Kbd>Enter</Kbd> 제출 / 다음 빈칸
              </span>
              <span className="inline-flex items-center gap-1">
                <Kbd>Tab</Kbd> 빈칸 이동
              </span>
            </>
          )
        ) : (
          <>
            <span className="inline-flex items-center gap-1">
              <Kbd>Space</Kbd> 정답 보기
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd>1</Kbd> 다시
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd>2</Kbd> 알았어요
            </span>
          </>
        )}
      </div>

      <div className="mt-3 flex justify-center">
        <ResetButton
          variant="pill"
          triggerLabel="암기 진도 초기화"
          title="암기 진도를 초기화할까요?"
          description="이 책의 암기·복습 기록이 모두 지워져요."
          onReset={() => {
            resetMemorizeDeck(deck.id);
            startSession(false);
          }}
        />
      </div>
    </main>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md bg-neutral-900/[0.06] px-1.5 py-0.5 font-sans text-[10px] font-semibold text-neutral-500">
      {children}
    </kbd>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neutral" | "indigo" | "rose";
}) {
  const color =
    tone === "indigo"
      ? "text-indigo-600"
      : tone === "rose"
        ? "text-rose-500"
        : "text-neutral-900";
  return (
    <div className="rounded-2xl bg-neutral-900/[0.03] px-3 py-3.5">
      <div className={`tabnum text-[21px] font-extrabold ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] text-neutral-400">{label}</div>
    </div>
  );
}
