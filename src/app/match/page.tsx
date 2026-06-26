"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MatchHud from "@/components/match/MatchHud";
import CountdownIntro from "@/components/match/CountdownIntro";
import MatchChoiceButtons from "@/components/match/MatchChoiceButtons";
import QuestionPanel from "@/components/game/QuestionPanel";
import PassagePanel from "@/components/game/PassagePanel";
import IdentitySettings from "@/components/match/IdentitySettings";
import Matchmaking from "@/components/match/Matchmaking";
import { useMatchStore } from "@/game/match/matchStore";
import { PART_META, PART_ORDER } from "@/game/parts";
import type { Difficulty, Part, PassageSet } from "@/game/types";

const DIFFICULTIES: { value: Difficulty; label: string; desc: string }[] = [
  { value: "EASY", label: "초급", desc: "봇 정답률 50% · 느긋한 속도" },
  { value: "MEDIUM", label: "중급", desc: "봇 정답률 70% · 팽팽한 승부" },
  { value: "HARD", label: "고급", desc: "봇 정답률 85% · 극한 속도전" },
];

/** 기출 은행 로드 (실패 시 null → 스토어 로컬 폴백) */
async function fetchBank(): Promise<PassageSet[] | null> {
  try {
    const r = await fetch("/api/sets");
    if (!r.ok) return null;
    const { sets } = (await r.json()) as { sets: PassageSet[] };
    return Array.isArray(sets) && sets.length > 0 ? sets : null;
  } catch {
    return null;
  }
}

export default function MatchPage() {
  const router = useRouter();
  const status = useMatchStore((s) => s.status);

  return (
    <main className="min-h-dvh pb-safe pt-6">
      {status === "lobby" && <Lobby />}

      {status === "countdown" && <Countdown />}

      {status === "playing" && <Playing />}

      {status === "result" && <ResultRedirect router={router} />}
    </main>
  );
}

/* ───────────────────────────── 로비 / 방개설 ───────────────────────────── */

function Lobby() {
  const startMatch = useMatchStore((s) => s.startMatch);
  const setIdentity = useMatchStore((s) => s.setIdentity);
  const [part, setPart] = useState<Part>(7);
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [loading, setLoading] = useState(false);
  // 매치메이킹 단계(로컬) — 동결 계약을 건드리지 않기 위해 status가 아닌 로컬 state로 끼운다.
  const [phase, setPhase] = useState<"idle" | "matchmaking">("idle");
  // 매치메이킹 도중 보여주기 위해 미리 받아둔 은행 (onReady에서 startMatch로 전달)
  const [bank, setBank] = useState<PassageSet[] | undefined>(undefined);

  const handleStart = async () => {
    setLoading(true);
    const sets = await fetchBank();
    setBank(sets ?? undefined);
    setLoading(false);
    // 즉시 startMatch 하지 않고 매치메이킹 연출을 먼저 띄운다.
    setPhase("matchmaking");
  };

  // 매치메이킹 공개 직후 호출 → 그제서야 startMatch(→ countdown → playing)
  const handleReady = () => {
    startMatch({ part, difficulty, sets: bank });
  };

  if (phase === "matchmaking") {
    return (
      <Matchmaking part={part} difficulty={difficulty} onReady={handleReady} />
    );
  }

  return (
    <div className="container-narrow flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-fuchsia-500 ring-1 ring-fuchsia-500/15 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
          AI 대결 모드
        </span>
        <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-neutral-900">
          <span className="text-gradient">AI 챌린저</span>와 1:1 속도전
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-neutral-500">
          파트·난이도를 고르고 방을 개설하면 AI 봇과 10문항 대결이 시작돼요.
          빠르고 정확하게 풀어 점수를 앞서세요.
        </p>
      </motion.div>

      {/* 닉네임·아바타 설정 */}
      <IdentitySettings
        onSaved={(id) => setIdentity({ name: id.name, avatarId: id.avatarId })}
      />

      {/* 파트 선택 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.06 }}
        className="card px-5 py-5"
      >
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
          파트
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {PART_ORDER.map((p) => {
            const active = p === part;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPart(p)}
                className={`rounded-2xl px-3 py-3 text-left transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-[0_10px_24px_-12px_rgba(99,102,241,0.8)]"
                    : "bg-white ring-1 ring-neutral-200 hover:ring-indigo-300"
                }`}
              >
                <span className="block text-[14px] font-bold">
                  {PART_META[p].label}
                </span>
                <span
                  className={`block text-[11.5px] ${
                    active ? "text-indigo-100" : "text-neutral-400"
                  }`}
                >
                  {PART_META[p].name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 난이도 선택 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="card px-5 py-5"
      >
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
          난이도
        </p>
        <div className="flex flex-col gap-2.5">
          {DIFFICULTIES.map((d) => {
            const active = d.value === difficulty;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => setDifficulty(d.value)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                  active
                    ? "bg-fuchsia-600 text-white shadow-[0_10px_24px_-12px_rgba(192,38,211,0.8)]"
                    : "bg-white ring-1 ring-neutral-200 hover:ring-fuchsia-300"
                }`}
              >
                <span>
                  <span className="block text-[14px] font-bold">
                    {d.label}{" "}
                    <span
                      className={
                        active ? "text-fuchsia-100" : "text-neutral-400"
                      }
                    >
                      {d.value}
                    </span>
                  </span>
                  <span
                    className={`block text-[11.5px] ${
                      active ? "text-fuchsia-100" : "text-neutral-400"
                    }`}
                  >
                    {d.desc}
                  </span>
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    active
                      ? "bg-white text-fuchsia-600"
                      : "ring-1 ring-neutral-200 text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleStart}
        disabled={loading}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.14 }}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="btn-primary w-full disabled:opacity-60"
      >
        {loading ? "방 개설 중…" : "방개설 · 대결 시작"}
      </motion.button>
    </div>
  );
}

/* ───────────────────────────── 카운트다운 ───────────────────────────── */

function Countdown() {
  const beginPlay = useMatchStore((s) => s.beginPlay);
  return <CountdownIntro onDone={beginPlay} />;
}

/* ───────────────────────────── 인게임 (playing) ───────────────────────────── */

function Playing() {
  const items = useMatchStore((s) => s.items);
  const qIndex = useMatchStore((s) => s.qIndex);
  const answered = useMatchStore((s) => s.answered);
  const difficulty = useMatchStore((s) => s.difficulty);

  // 타이머 구동: status==="playing" 동안 ~100ms 마다 틱.
  // - 봇(tickAi)은 풀이 완료 전까지 항상 진행
  // - 유저 타이머(tickTimer)는 아직 답하지 않은 동안에만 진행
  useEffect(() => {
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000; // 초 단위
      last = now;
      const s = useMatchStore.getState();
      if (s.status !== "playing") return;
      s.tickAi(dt);
      if (!s.answered) s.tickTimer(dt);
    }, 100);
    return () => clearInterval(id);
  }, []);

  const item = items[qIndex];
  if (!item) return null;

  const question = item.question;
  const showPassage = item.passageLines.length > 0;
  // PassagePanel은 passageType·passageLines만 사용하므로 최소 세트를 구성해 넘긴다.
  const passageSet: PassageSet = {
    id: `match-${qIndex}`,
    difficulty,
    part: item.part,
    passageType: item.passageType,
    passageLines: item.passageLines,
    questions: [],
  };

  return (
    <div className="container-exam flex flex-col gap-4 pb-2">
      <MatchHud />

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="sheet overflow-hidden"
        >
          <div
            className={
              showPassage
                ? "grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
                : "grid grid-cols-1"
            }
          >
            {showPassage && (
              <div className="border-b border-neutral-100 lg:border-b-0 lg:border-r">
                <PassagePanel set={passageSet} hideKo flat />
              </div>
            )}
            <div className="flex flex-col gap-4 px-6 py-6 sm:px-8 lg:px-9">
              <QuestionPanel
                question={question}
                index={qIndex}
                total={items.length}
                part={item.part}
                hideKo
                hideTypeBadge
                flat
              />
              <MatchChoiceButtons question={question} />
              {!answered && (
                <p className="pt-0.5 text-[12px] text-neutral-400">
                  빠르고 정확하게! 빨리 맞힐수록 속도 보너스가 커집니다.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────── 결과 이동 ───────────────────────────── */

function ResultRedirect({ router }: { router: ReturnType<typeof useRouter> }) {
  useEffect(() => {
    router.replace("/match/result");
  }, [router]);
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span className="flex items-center gap-2 text-sm text-neutral-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />
        결과 집계 중…
      </span>
    </div>
  );
}
