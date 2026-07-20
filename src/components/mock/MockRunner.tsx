"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audioSrc, type ListeningSet, type LcPart2Item } from "@/game/listening";
import type { PassageSet, PassageQuestion, Part } from "@/game/types";
import { usePracticeStore } from "@/game/store";
import { partStudyLink } from "@/game/diagnostic";
import SideMenu from "@/components/ui/SideMenu";
import {
  scoreMock,
  saveMockResult,
  loadMockHistory,
  mockCounts,
  domainOfPart,
  PART_LABEL,
  type MockExam,
  type MockResult,
} from "@/game/mock";

/** RC 기출 은행 로드 (추천 학습 시작용) */
async function fetchBank(): Promise<PassageSet[] | undefined> {
  try {
    const r = await fetch("/api/sets");
    if (!r.ok) return undefined;
    const { sets } = (await r.json()) as { sets: PassageSet[] };
    return Array.isArray(sets) && sets.length > 0 ? sets : undefined;
  } catch {
    return undefined;
  }
}

const LETTERS = ["A", "B", "C", "D"];
const ease = [0.22, 1, 0.36, 1] as const;

// ── 블록(한 화면 단위) ───────────────────────────────
type Block =
  | { kind: "p2"; clipId: string; item: LcPart2Item }
  | { kind: "lcset"; clipId: string; set: ListeningSet }
  | { kind: "p5"; q: PassageQuestion }
  | { kind: "rcset"; set: PassageSet };

function buildBlocks(mock: MockExam): Block[] {
  const blocks: Block[] = [];
  for (const set of mock.lc) {
    if (set.part === 2) {
      for (const it of set.items ?? []) blocks.push({ kind: "p2", clipId: it.id, item: it });
    } else {
      blocks.push({ kind: "lcset", clipId: set.id, set });
    }
  }
  for (const set of mock.rc) {
    if ((set.part ?? 7) === 5) {
      for (const q of set.questions) blocks.push({ kind: "p5", q });
    } else {
      blocks.push({ kind: "rcset", set });
    }
  }
  return blocks;
}

function blockQids(b: Block): string[] {
  if (b.kind === "p2") return [b.item.id];
  if (b.kind === "lcset") return (b.set.questions ?? []).map((q) => q.id);
  if (b.kind === "p5") return [b.q.id];
  return b.set.questions.map((q) => q.id);
}

function blockPart(b: Block): number {
  if (b.kind === "p2") return 2;
  if (b.kind === "lcset") return b.set.part;
  if (b.kind === "p5") return 5;
  return b.set.part ?? 7;
}

export default function MockRunner({ mock }: { mock: MockExam }) {
  const router = useRouter();
  const startPractice = usePracticeStore((s) => s.start);
  const blocks = useMemo(() => buildBlocks(mock), [mock]);
  const totalQ = useMemo(() => blocks.reduce((n, b) => n + blockQids(b).length, 0), [blocks]);
  const counts = useMemo(() => mockCounts(mock), [mock]);

  const [phase, setPhase] = useState<"intro" | "test" | "result">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [result, setResult] = useState<MockResult | null>(null);
  const [history, setHistory] = useState<MockResult[]>([]);

  useEffect(() => {
    setHistory(loadMockHistory());
  }, []);

  const bestBefore = useMemo(
    () => (history.length ? Math.max(...history.map((h) => h.totalScore)) : null),
    [history],
  );

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null && v !== undefined).length,
    [answers],
  );

  const pick = (qid: string, ci: number) => setAnswers((prev) => ({ ...prev, [qid]: ci }));

  const handleStudy = async (part: number) => {
    if (part <= 4) {
      router.push(`/listening?part=${part}`);
      return;
    }
    const sets = await fetchBank();
    startPractice({ part: part as Part, type: "ALL", sets });
    router.push("/game");
  };

  const submit = () => {
    const r = scoreMock(mock, answers);
    setResult(r);
    saveMockResult(r);
    setHistory(loadMockHistory());
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (idx < blocks.length - 1) {
      setIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submit();
    }
  };
  const goPrev = () => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!blocks.length) {
    return (
      <main className="container-narrow flex min-h-dvh items-center justify-center py-10">
        <p className="text-neutral-500">모의고사 콘텐츠를 불러오지 못했습니다.</p>
      </main>
    );
  }

  // ── 인트로 ───────────────────────────────
  if (phase === "intro") {
    return (
      <main className="container-narrow relative min-h-dvh overflow-hidden py-8 pb-safe sm:py-14">
        <Aura />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="relative"
        >
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="mb-6 text-[13px] font-semibold text-neutral-400 transition hover:text-neutral-600"
          >
            ← 홈으로
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600 ring-1 ring-emerald-500/15 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-emerald-500" />
            FULL MOCK EXAM
          </span>

          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-neutral-900 sm:text-[2.7rem]">
            실전처럼 한 번에
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              풀렝스 모의고사
            </span>
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
            리스닝(Part 2·3·4)과 리딩(Part 5·6·7)을 실전 순서로 이어 푸는 모의고사입니다. 전 문항을 푼 뒤{" "}
            <b className="text-neutral-700">LC·RC 예상 점수</b>와 파트별 정답률을 확인하세요.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <IntroStat value={`${counts.total}`} label="총 문항" />
            <IntroStat value={`LC ${counts.lc} · RC ${counts.rc}`} label="파트 구성" />
            <IntroStat value="~990" label="점수 추정" />
          </div>

          {bestBefore !== null && (
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-50 to-white px-4 py-3 ring-1 ring-emerald-500/10">
              <span className="text-[13px] font-semibold text-neutral-600">🏅 내 최고 점수</span>
              <span className="tabnum text-[18px] font-extrabold text-emerald-600">{bestBefore}</span>
            </div>
          )}

          <div className="mt-6 space-y-2.5 rounded-2xl bg-white/70 p-4 ring-1 ring-neutral-900/[0.05] backdrop-blur-sm">
            <Tip icon="🎧" text="리스닝은 오디오를 듣고 답합니다. 이어폰을 권장해요." />
            <Tip icon="📝" text="실전처럼 전 문항을 푼 뒤 한 번에 채점됩니다. 중간에 이전/다음으로 이동할 수 있어요." />
            <Tip icon="📊" text="결과에서 파트별 정답률·추천 학습·지난 응시 기록을 확인하세요." />
          </div>

          <button
            type="button"
            onClick={() => setPhase("test")}
            className="mt-7 min-h-[54px] w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-[16px] font-bold text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.98]"
          >
            모의고사 시작하기 →
          </button>

          {/* 3단계 보조 — 짧게 실력만 재보고 싶을 때 */}
          <SideMenu
            title="가볍게 재보려면"
            items={[
              {
                label: "레벨 진단",
                href: "/diagnostic",
                hint: "30문항 · LC+RC 미니 테스트",
                icon: "🩺",
              },
            ]}
          />
        </motion.div>
      </main>
    );
  }

  // ── 결과 ───────────────────────────────
  if (phase === "result" && result) {
    return (
      <ResultView
        result={result}
        history={history}
        blocks={blocks}
        answers={answers}
        onRetry={() => {
          setAnswers({});
          setIdx(0);
          setResult(null);
          setPhase("intro");
        }}
        onHome={() => router.push("/learn")}
        onStudy={handleStudy}
      />
    );
  }

  // ── 테스트 ───────────────────────────────
  const block = blocks[idx];
  const isLast = idx === blocks.length - 1;
  const part = blockPart(block);

  return (
    <main className="container-narrow relative min-h-dvh overflow-hidden py-5 pb-safe sm:py-8">
      <Aura />
      {/* 상단 진행 */}
      <div className="sticky top-0 z-20 -mx-4 mb-5 bg-gradient-to-b from-white via-white/95 to-white/70 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-[12px] font-semibold">
          <span className="text-emerald-600">
            {PART_LABEL[part]} · {domainOfPart(part) === "LC" ? "리스닝" : "리딩"}
          </span>
          <span className="text-neutral-400">
            블록 {idx + 1} / {blocks.length} · 답변 {answeredCount}/{totalQ}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            animate={{ width: `${((idx + 1) / blocks.length) * 100}%` }}
            transition={{ ease }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease }}
        >
          <BlockView block={block} answers={answers} pick={pick} />
        </motion.div>
      </AnimatePresence>

      {/* 하단 네비 */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={idx === 0}
          className="min-h-[50px] rounded-2xl px-5 text-[14px] font-semibold text-neutral-500 ring-1 ring-neutral-200 transition disabled:opacity-40 enabled:hover:bg-neutral-50"
        >
          이전
        </button>
        <button
          type="button"
          onClick={goNext}
          className={`min-h-[50px] flex-1 rounded-2xl text-[15px] font-bold text-white shadow-md transition active:scale-[0.98] ${
            isLast
              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-emerald-600 to-teal-500"
          }`}
        >
          {isLast ? "제출하고 결과 보기 →" : "다음 →"}
        </button>
      </div>
      {isLast && answeredCount < totalQ && (
        <p className="mt-2.5 text-center text-[12px] text-amber-600">
          아직 {totalQ - answeredCount}문항이 비어 있어요. 그대로 제출하면 오답 처리됩니다.
        </p>
      )}
    </main>
  );
}

// ── 블록 렌더 (테스트 중) ───────────────────────────────
function BlockView({
  block,
  answers,
  pick,
}: {
  block: Block;
  answers: Record<string, number | null>;
  pick: (qid: string, ci: number) => void;
}) {
  if (block.kind === "p2") {
    return (
      <div>
        <AudioClip clipId={block.clipId} label="질문/평서문을 듣고 가장 알맞은 응답을 고르세요" />
        <p className="mb-3 mt-5 text-[13px] font-semibold text-neutral-500">
          가장 알맞은 응답 (A · B · C)
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {["A", "B", "C"].map((L, ci) => {
            const sel = answers[block.item.id] === ci;
            return (
              <button
                key={ci}
                type="button"
                onClick={() => pick(block.item.id, ci)}
                className={`min-h-[64px] rounded-2xl text-[20px] font-extrabold transition active:scale-95 ${
                  sel
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md"
                    : "bg-white text-neutral-400 ring-1 ring-neutral-200 hover:ring-emerald-300 hover:text-emerald-600"
                }`}
              >
                {L}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (block.kind === "lcset") {
    return (
      <div>
        <AudioClip
          clipId={block.clipId}
          label={block.set.part === 3 ? "대화를 듣고 문항을 푸세요" : "담화를 듣고 문항을 푸세요"}
        />
        <div className="mt-5 space-y-4">
          {(block.set.questions ?? []).map((q, i) => (
            <ChoiceCard
              key={q.id}
              n={i + 1}
              accent="emerald"
              promptEn={q.promptEn}
              choicesEn={q.choices}
              selected={answers[q.id] ?? null}
              onPick={(ci) => pick(q.id, ci)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (block.kind === "p5") {
    return (
      <ChoiceCard
        n={1}
        accent="indigo"
        promptEn={block.q.prompt}
        choicesEn={block.q.choices}
        selected={answers[block.q.id] ?? null}
        onPick={(ci) => pick(block.q.id, ci)}
        big
      />
    );
  }

  // rcset (Part 6/7)
  return (
    <div>
      <div className="card-elevated overflow-hidden">
        <div className="border-b border-neutral-100 px-4 py-2.5 sm:px-5">
          <span className="text-[12px] font-bold text-indigo-500">📄 {block.set.passageType}</span>
        </div>
        <div className="space-y-2 px-4 py-4 sm:px-5">
          {block.set.passageLines.map((line, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-neutral-700">
              {line.en}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {block.set.questions.map((q, i) => (
          <ChoiceCard
            key={q.id}
            n={i + 1}
            accent="indigo"
            promptEn={q.prompt}
            choicesEn={q.choices}
            selected={answers[q.id] ?? null}
            onPick={(ci) => pick(q.id, ci)}
          />
        ))}
      </div>
    </div>
  );
}

// ── 선택 카드 (4지선다) ───────────────────────────────
function ChoiceCard({
  n,
  promptEn,
  choicesEn,
  selected,
  onPick,
  accent,
  big = false,
}: {
  n: number;
  promptEn: string;
  choicesEn: string[];
  selected: number | null;
  onPick: (ci: number) => void;
  accent: "emerald" | "indigo";
  big?: boolean;
}) {
  const solid =
    accent === "emerald" ? "from-emerald-500 to-teal-500" : "from-indigo-500 to-violet-500";
  const badge = accent === "emerald" ? "bg-emerald-500" : "bg-indigo-500";
  const hoverRing = accent === "emerald" ? "hover:border-emerald-300" : "hover:border-indigo-300";
  return (
    <div className="card-elevated overflow-hidden px-4 py-4 sm:px-5">
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${badge} text-[12px] font-extrabold text-white`}
        >
          {n}
        </span>
        <p className={`font-semibold text-neutral-900 ${big ? "text-[16px] leading-relaxed" : "text-[15px]"}`}>
          {promptEn}
        </p>
      </div>
      <div className="mt-3 space-y-2">
        {choicesEn.map((c, ci) => {
          const sel = selected === ci;
          return (
            <button
              key={ci}
              type="button"
              onClick={() => onPick(ci)}
              className={`flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
                sel
                  ? `border-transparent bg-gradient-to-r ${solid} text-white shadow-sm`
                  : `border-neutral-200 bg-white ${hoverRing}`
              }`}
            >
              <span className={`text-[13px] font-extrabold ${sel ? "text-white/90" : "text-neutral-400"}`}>
                {LETTERS[ci]}
              </span>
              <span className={`text-[14px] font-medium ${sel ? "text-white" : "text-neutral-800"}`}>
                {c}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── 오디오 클립 ───────────────────────────────
function AudioClip({ clipId, label }: { clipId: string; label: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [err, setErr] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setErr(true));
    else el.pause();
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white shadow-md">
      <p className="text-[12px] font-medium text-white/80">🎧 {label}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow transition active:scale-90"
          aria-label={playing ? "일시정지" : "재생"}
        >
          {playing ? <span className="text-[18px]">❚❚</span> : <span className="ml-0.5 text-[18px]">▶</span>}
        </button>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
            <div
              className={`h-full rounded-full bg-white/80 ${playing ? "animate-pulse" : ""}`}
              style={{ width: playing ? "100%" : "0%", transition: "width 0.3s" }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-white/70">
            {err ? "오디오를 재생할 수 없습니다" : playing ? "재생 중…" : "재생 버튼을 눌러 들어보세요"}
          </p>
        </div>
      </div>
      <audio
        ref={ref}
        src={audioSrc(clipId)}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setErr(true)}
      />
    </div>
  );
}

// ── 결과 화면 ───────────────────────────────
function ResultView({
  result,
  history,
  blocks,
  answers,
  onRetry,
  onHome,
  onStudy,
}: {
  result: MockResult;
  history: MockResult[];
  blocks: Block[];
  answers: Record<string, number | null>;
  onRetry: () => void;
  onHome: () => void;
  onStudy: (part: number) => void;
}) {
  const [showReview, setShowReview] = useState(false);
  const total = useAnimatedNumber(result.totalScore);

  const weakest = [...result.parts]
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 2);

  const prev = history.filter((h) => h.takenAt !== result.takenAt);
  const bestOther = prev.length ? Math.max(...prev.map((h) => h.totalScore)) : null;
  const isBest = bestOther === null || result.totalScore >= bestOther;

  return (
    <main className="container-narrow relative min-h-dvh overflow-hidden py-8 pb-safe sm:py-12">
      <Aura />

      {/* 점수 히어로 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-8 text-center text-white shadow-xl"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">예상 토익 점수</p>
        <p className="mt-2 text-[64px] font-extrabold leading-none tabnum">
          {total}
          <span className="ml-1 align-top text-[20px] font-medium text-white/40">/ 990</span>
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white ring-1 ring-white/15">
            {result.levelLabel}
          </span>
          {isBest && prev.length > 0 && (
            <span className="inline-block rounded-full bg-emerald-500/90 px-3 py-1.5 text-[12px] font-bold text-white">
              🎉 최고 기록!
            </span>
          )}
        </div>
      </motion.div>

      {/* LC / RC 카드 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <SectionScore
          tint="from-emerald-500 to-teal-600"
          title="리스닝 LC"
          score={result.lcScore}
          correct={result.lcCorrect}
          total={result.lcTotal}
        />
        <SectionScore
          tint="from-indigo-500 to-violet-600"
          title="리딩 RC"
          score={result.rcScore}
          correct={result.rcCorrect}
          total={result.rcTotal}
        />
      </div>

      {/* 파트별 정답률 */}
      <div className="card-elevated mt-4 overflow-hidden px-5 py-5">
        <p className="label mb-3">파트별 정답률</p>
        <div className="space-y-3">
          {result.parts.map((p) => {
            const pct = Math.round((p.correct / p.total) * 100);
            const lc = domainOfPart(p.part) === "LC";
            return (
              <div key={p.part}>
                <div className="mb-1 flex items-center justify-between text-[12.5px]">
                  <span className="font-semibold text-neutral-700">{PART_LABEL[p.part]}</span>
                  <span className="tabnum text-neutral-400">
                    {p.correct}/{p.total} · {pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      lc ? "from-emerald-400 to-teal-500" : "from-indigo-400 to-violet-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 지난 응시 기록 */}
      {history.length > 1 && (
        <div className="card-elevated mt-4 overflow-hidden px-5 py-5">
          <p className="label mb-3">지난 응시 기록</p>
          <div className="space-y-1.5">
            {history.slice(0, 6).map((h, i) => {
              const cur = h.takenAt === result.takenAt;
              return (
                <div
                  key={h.takenAt}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-[13px] ${
                    cur ? "bg-emerald-50 ring-1 ring-emerald-500/15" : ""
                  }`}
                >
                  <span className="text-neutral-500">
                    {i === 0 ? "이번" : formatDate(h.takenAt)}
                    {cur && <span className="ml-1.5 text-[11px] font-bold text-emerald-600">NOW</span>}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="tabnum text-[11.5px] text-neutral-400">
                      LC {h.lcScore} · RC {h.rcScore}
                    </span>
                    <span className="tabnum text-[15px] font-extrabold text-neutral-900">{h.totalScore}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 추천 학습 */}
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-5 ring-1 ring-emerald-500/10">
        <p className="text-[14px] font-bold text-neutral-900">🎯 지금 이 파트부터 공략하세요</p>
        <div className="mt-3 space-y-2">
          {weakest.map((p) => {
            const link = partStudyLink(p.part);
            const pct = Math.round((p.correct / p.total) * 100);
            return (
              <button
                key={p.part}
                type="button"
                onClick={() => onStudy(p.part)}
                className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-left ring-1 ring-neutral-900/[0.05] transition hover:ring-emerald-300 active:scale-[0.99]"
              >
                <span>
                  <span className="block text-[13.5px] font-bold text-neutral-900">{link.label}</span>
                  <span className="block text-[11.5px] text-neutral-400">
                    {PART_LABEL[p.part]} · 현재 정답률 {pct}%
                  </span>
                </span>
                <span className="text-emerald-500">→</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 리뷰 토글 */}
      <button
        type="button"
        onClick={() => setShowReview((v) => !v)}
        className="mt-4 min-h-[48px] w-full rounded-2xl bg-white text-[14px] font-semibold text-neutral-600 ring-1 ring-neutral-200 transition hover:bg-neutral-50"
      >
        {showReview ? "문항 해설 접기 ▲" : "문항별 정답·해설 보기 ▼"}
      </button>

      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {blocks.map((b, i) => (
                <ReviewBlock key={i} block={b} answers={answers} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 액션 */}
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onRetry}
          className="min-h-[52px] w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-[15px] font-bold text-white shadow-md transition active:scale-[0.98]"
        >
          다시 응시하기
        </button>
        <button
          type="button"
          onClick={onHome}
          className="min-h-[48px] w-full rounded-2xl text-[14px] font-semibold text-neutral-500 ring-1 ring-neutral-200 transition hover:bg-neutral-50"
        >
          홈으로
        </button>
      </div>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-neutral-400">
        ※ 예상 점수는 표본 문항을 990점 척도로 환산한 추정치입니다. 실제 시험 점수와 다를 수 있어요.
      </p>
    </main>
  );
}

function SectionScore({
  tint,
  title,
  score,
  correct,
  total,
}: {
  tint: string;
  title: string;
  score: number;
  correct: number;
  total: number;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${tint} px-4 py-4 text-white shadow-md`}>
      <p className="text-[12px] font-medium text-white/80">{title}</p>
      <p className="mt-1 text-[30px] font-extrabold leading-none tabnum">
        {score}
        <span className="ml-0.5 text-[13px] font-medium text-white/60">/ 495</span>
      </p>
      <p className="mt-1.5 text-[11.5px] text-white/70">
        정답 {correct}/{total}
      </p>
    </div>
  );
}

// ── 리뷰 블록(정답 공개) ───────────────────────────────
function ReviewBlock({ block, answers }: { block: Block; answers: Record<string, number | null> }) {
  if (block.kind === "p2") {
    const it = block.item;
    return (
      <ReviewCard
        part="Part 2"
        promptEn={it.promptEn}
        promptKo={it.promptKo}
        choicesEn={it.responses.map((r) => r.en)}
        choicesKo={it.responses.map((r) => r.ko)}
        answerIndex={it.answerIndex}
        userIndex={answers[it.id] ?? null}
        explanation={it.explanation}
      />
    );
  }
  if (block.kind === "p5") {
    return (
      <ReviewCard
        part="Part 5"
        promptEn={block.q.prompt}
        promptKo={block.q.promptKo}
        choicesEn={block.q.choices}
        choicesKo={block.q.choicesKo}
        answerIndex={block.q.answerIndex}
        userIndex={answers[block.q.id] ?? null}
        explanation={block.q.explanation}
      />
    );
  }
  const questions = block.kind === "lcset" ? block.set.questions ?? [] : block.set.questions;
  return (
    <>
      {questions.map((q: any) => (
        <ReviewCard
          key={q.id}
          part={block.kind === "lcset" ? `Part ${block.set.part}` : `Part ${block.set.part ?? 7}`}
          promptEn={q.promptEn ?? q.prompt}
          promptKo={q.promptKo}
          choicesEn={q.choices}
          choicesKo={q.choicesKo}
          answerIndex={q.answerIndex}
          userIndex={answers[q.id] ?? null}
          explanation={q.explanation}
        />
      ))}
    </>
  );
}

function ReviewCard({
  part,
  promptEn,
  promptKo,
  choicesEn,
  choicesKo,
  answerIndex,
  userIndex,
  explanation,
}: {
  part: string;
  promptEn: string;
  promptKo?: string;
  choicesEn: string[];
  choicesKo: string[];
  answerIndex: number;
  userIndex: number | null;
  explanation: string;
}) {
  const correct = userIndex === answerIndex;
  const missed = userIndex === null;
  return (
    <div className="card-elevated overflow-hidden px-4 py-4 sm:px-5">
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
            correct ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
          }`}
        >
          {correct ? "정답" : missed ? "미응답" : "오답"}
        </span>
        <span className="text-[11px] font-semibold text-neutral-400">{part}</span>
      </div>
      <p className="text-[14px] font-semibold text-neutral-900">{promptEn}</p>
      {promptKo && <p className="mt-0.5 text-[12.5px] text-neutral-400">{promptKo}</p>}
      <div className="mt-2.5 space-y-1.5">
        {choicesEn.map((c, ci) => {
          const isAns = ci === answerIndex;
          const isUser = ci === userIndex;
          let cls = "text-neutral-500";
          if (isAns) cls = "text-emerald-700 font-semibold";
          else if (isUser) cls = "text-rose-500 line-through";
          return (
            <p key={ci} className={`text-[13px] ${cls}`}>
              {LETTERS[ci]}. {c}
              {choicesKo?.[ci] && <span className="ml-1 text-[11.5px] text-neutral-300">— {choicesKo[ci]}</span>}
              {isAns && <span className="ml-1">✓</span>}
            </p>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg bg-neutral-50 px-3 py-2.5 text-[12.5px] leading-relaxed text-neutral-600">
        {explanation}
      </div>
    </div>
  );
}

// ── 소품 ───────────────────────────────
function Aura() {
  return (
    <>
      <div className="pointer-events-none absolute -right-16 -top-10 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-400/25 to-teal-400/15 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-10 -left-16 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-400/10 blur-[80px]" />
    </>
  );
}

function IntroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-3 py-3 text-center ring-1 ring-neutral-900/[0.05] backdrop-blur-sm">
      <p className="text-[15px] font-extrabold text-neutral-900">{value}</p>
      <p className="mt-0.5 text-[11px] text-neutral-400">{label}</p>
    </div>
  );
}

function Tip({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[15px]">{icon}</span>
      <p className="text-[13px] leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function useAnimatedNumber(target: number, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}
