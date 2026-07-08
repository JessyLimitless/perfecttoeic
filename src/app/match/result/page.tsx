"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameResultTable from "@/components/match/GameResultTable";
import ProgressGrid from "@/components/match/ProgressGrid";
import ProfileCard from "@/components/match/ProfileCard";
import ResultBanner from "@/components/match/ResultBanner";
import RematchTimer, {
  isRematchExpired,
} from "@/components/match/RematchTimer";
import JennyAvatar from "@/components/match/JennyAvatar";
import { Confetti, JennyCutin } from "@/components/match/JennyFx";
import PassageTranslation from "@/components/result/PassageTranslation";
import { useBgm } from "@/components/ui/BgmProvider";
import { useMatchStore } from "@/game/match/matchStore";
import { CREDIT_WIN } from "@/game/match/types";
import { JENNY, jennyReactionForGrade, jennyCutsceneForGrade } from "@/game/match/jenny";
import {
  recordAnswers,
  masteredTotalOf,
  loadMastery,
  type MasteryPart,
} from "@/game/mastery";
import { takePendingConquest, gradeFromCoverage, type GradeMeta } from "@/game/conquest";
import type { PassageSet } from "@/game/types";

/** /api/sets 기출 은행 로드 (실패 시 null → 스토어 로컬 폴백) */
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

/** 전 파트 총 문항 수(정복도 분모) */
async function fetchGrandTotal(): Promise<number> {
  try {
    const r = await fetch("/api/part-totals");
    if (!r.ok) return 0;
    const { totals } = (await r.json()) as { totals: Record<string, number> };
    return Object.values(totals ?? {}).reduce((n, v) => n + (typeof v === "number" ? v : 0), 0);
  } catch {
    return 0;
  }
}

export default function MatchResultPage() {
  const router = useRouter();
  const bgm = useBgm();

  const status = useMatchStore((s) => s.status);
  const part = useMatchStore((s) => s.part);
  const user = useMatchStore((s) => s.user);
  const ai = useMatchStore((s) => s.ai);
  const earnedCredits = useMatchStore((s) => s.earnedCredits);
  const missions = useMatchStore((s) => s.missions);
  const rematchDeadline = useMatchStore((s) => s.rematchDeadline);
  const userHistory = useMatchStore((s) => s.userHistory);
  const rematch = useMatchStore((s) => s.rematch);
  const exit = useMatchStore((s) => s.exit);

  const [reviewing, setReviewing] = useState(false);
  const [expired, setExpired] = useState(() => isRematchExpired(rematchDeadline));
  const [busy, setBusy] = useState(false);

  // 정복도 충전 + 등급 상승 감지 — 결과 진입 시 1회만(중복 반영 방지).
  const appliedRef = useRef(false);
  const [gradeUp, setGradeUp] = useState<{ before: GradeMeta; after: GradeMeta } | null>(null);
  const [masteredGain, setMasteredGain] = useState(0);
  const [jennyLine, setJennyLine] = useState<string | null>(null);
  const [cutinClosed, setCutinClosed] = useState(false);

  useEffect(() => {
    if (status !== "result" || appliedRef.current) return;
    appliedRef.current = true;
    const won = user.rank === 1;
    // 승리 시 배경음악을 승리 테마(rocky)로 연출 (음악이 켜져 있을 때만)
    if (won) bgm?.celebrate?.();
    // 대결에서 맞힌 문항을 정복도에 충전(정복도만 — 정답률 통계는 연습·리스닝 전용)
    const entries = userHistory
      .filter((r) => r.question?.id)
      .map((r) => ({ part: part as MasteryPart, id: r.question.id, correct: r.isCorrect }));
    const pending = takePendingConquest();
    const beforeCount = pending ? pending.masteredBefore : masteredTotalOf(loadMastery());
    recordAnswers(entries, { coverageOnly: true });
    const afterCount = masteredTotalOf(loadMastery());
    (async () => {
      const grand = await fetchGrandTotal();
      const covBefore = grand > 0 ? (beforeCount / grand) * 100 : 0;
      const covAfter = grand > 0 ? (afterCount / grand) * 100 : 0;
      const gBefore = gradeFromCoverage(covBefore);
      const gAfter = gradeFromCoverage(covAfter);
      setJennyLine(jennyReactionForGrade(gAfter.id, won));
      setMasteredGain(Math.max(0, afterCount - beforeCount));
      if (pending && gAfter.index > gBefore.index) setGradeUp({ before: gBefore, after: gAfter });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // 결과 상태가 아니면(직접 진입/새로고침) 대결 로비로
  useEffect(() => {
    if (status !== "result") router.replace("/match");
  }, [status, router]);

  // REMATCH: 같은 조건 재대결 (기한 내). /api/sets 재로딩 후 인게임으로.
  // ⚠️ 훅은 조기 리턴 위에서 무조건 호출되어야 함 (rules-of-hooks).
  const handleRematch = useCallback(async () => {
    if (expired || isRematchExpired(rematchDeadline) || busy) return;
    setBusy(true);
    const sets = await fetchBank();
    rematch(sets);
    router.push("/match");
  }, [expired, rematchDeadline, busy, rematch, router]);

  if (status !== "result") return null;

  const wrongItems = userHistory.filter((r) => !r.isCorrect);

  // 틀린문제 REVIEW: 진입 = 자동 퇴실(개념). 결과 액션을 숨기고 인라인 복습 노출.
  const handleReview = () => setReviewing(true);

  // 방개설: 방 나가고 로비로
  const handleNewRoom = () => {
    exit();
    router.push("/match");
  };

  const aiCredit = ai.rank === 1 ? CREDIT_WIN : 0;

  return (
    <main className="container-app pb-safe flex min-h-dvh flex-col gap-4 py-6 sm:py-8">
      {/* 브랜드 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <p className="text-[15px] font-extrabold tracking-tight text-teal-800">
          <span className="text-gradient">TOEIC.net</span>{" "}
          <span className="text-neutral-300">·</span>{" "}
          <span className="text-neutral-500">Network Toeic Match</span>
        </p>
      </motion.header>

      {/* 결과 보드 (다크 틸 무드) */}
      <div className="rounded-[1.75rem] bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-3 ring-1 ring-teal-900/10 shadow-[0_24px_56px_-28px_rgba(13,80,80,0.45)] sm:p-5">
        {/* 상단: GAME RESULT 표 + 프로필 카드 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
          <GameResultTable
            user={user}
            ai={ai}
            userCredit={earnedCredits}
            aiCredit={aiCredit}
          />
          <ProfileCard user={user} />
        </div>

        {/* 하단: 배너+버튼 / 진행현황 */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
          <div className="flex flex-col gap-3">
            <ResultBanner
              name={user.name}
              rank={user.rank}
              earnedCredits={earnedCredits}
              missions={missions}
            />

            {/* 정복도 충전 배지 */}
            {masteredGain > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-white shadow-[0_10px_24px_-12px_rgba(13,148,136,0.8)]"
              >
                <span className="text-[13px] font-bold">🎯 정복 진행</span>
                <span className="text-[15px] font-black">+{masteredGain}문항 정복</span>
              </motion.div>
            )}

            {/* 라이벌 빌류킹의 한마디 — 빌류킹 관점 표정(내가 지면 빌류킹은 승리 표정) */}
            {jennyLine && (
              <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 ring-1 ring-fuchsia-900/10 shadow-sm">
                <JennyAvatar
                  size={44}
                  variant={user.rank === 1 ? "lose" : "win"}
                  motionPreset={user.rank === 1 ? "lose" : "win"}
                  glow
                />
                <p className="text-[13px] font-semibold leading-snug text-neutral-800">
                  <span className="text-fuchsia-600">{JENNY.name}</span>: “{jennyLine}”
                </p>
              </div>
            )}

            {/* 등급 상승 시 빌류킹 스토리 컷신 (순차 노출) */}
            {gradeUp && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-fuchsia-50 p-4 ring-1 ring-fuchsia-900/10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <JennyAvatar size={30} variant="idle" />
                  <span className="text-[12px] font-black text-fuchsia-600">
                    빌류킹 · {gradeUp.after.label} 등급 달성
                  </span>
                </div>
                <div className="space-y-1">
                  {jennyCutsceneForGrade(gradeUp.after.id).map((l, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.5 }}
                      className="text-[13px] font-semibold leading-snug text-neutral-700"
                    >
                      “{l}”
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 중앙 버튼 3종 */}
            {!reviewing && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={handleReview}
                  className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-teal-700 ring-1 ring-teal-900/10 shadow-sm transition hover:-translate-y-px hover:bg-teal-50 hover:shadow active:translate-y-0 active:scale-[0.98]"
                >
                  틀린문제 REVIEW <span aria-hidden>📝</span>
                </button>
                <button
                  type="button"
                  onClick={handleRematch}
                  disabled={expired || busy}
                  className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 px-4 py-3 text-[13px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(13,148,136,0.9)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_-10px_rgba(13,148,136,0.95)] active:translate-y-0 active:scale-[0.98] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:from-neutral-300 disabled:to-neutral-300 disabled:text-neutral-500 disabled:shadow-none"
                >
                  {busy ? (
                    "준비 중…"
                  ) : (
                    <>
                      <span aria-hidden>🔁</span> REMATCH
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNewRoom}
                  className="flex min-h-[48px] items-center justify-center rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-neutral-700 ring-1 ring-neutral-900/10 shadow-sm transition hover:-translate-y-px hover:bg-neutral-50 hover:shadow active:translate-y-0 active:scale-[0.98]"
                >
                  방개설
                </button>
              </div>
            )}
          </div>

          <ProgressGrid user={user} ai={ai} />
        </div>

        {/* 인라인 오답 복습 */}
        {reviewing && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 rounded-2xl bg-white/95 p-4 ring-1 ring-teal-900/10 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-extrabold text-neutral-900">
                틀린문제 REVIEW{" "}
                <span className="text-teal-600">({wrongItems.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleNewRoom}
                className="rounded-xl bg-teal-600 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-teal-700"
              >
                나가기
              </button>
            </div>

            <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[12px] text-amber-700 ring-1 ring-amber-200">
              Review를 시작하면 자동으로 퇴실됩니다 — REMATCH 권한이 사라집니다.
            </p>

            {wrongItems.length === 0 ? (
              <p className="py-6 text-center text-[14px] font-semibold text-emerald-600">
                틀린 문제가 없습니다. 완벽한 한 판이었어요! 🎉
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {wrongItems.map((rec, i) => {
                  const q = rec.question;
                  const correct = q.choices[q.answerIndex];
                  const picked =
                    rec.selected == null ? null : q.choices[rec.selected];
                  return (
                    <li
                      key={q.id ?? i}
                      className="overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-900/[0.06]"
                    >
                      <div className="flex items-start gap-2 p-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500 text-[11px] font-extrabold text-white">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold leading-snug text-neutral-900">
                            {q.prompt}
                          </p>
                          {q.promptKo && (
                            <p className="mt-0.5 text-[12px] text-neutral-500">
                              {q.promptKo}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1.5 px-3 pb-1 text-[12px]">
                        <p className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 ring-1 ring-emerald-200/60">
                          <span className="font-extrabold text-emerald-700">
                            정답
                          </span>
                          <span className="text-emerald-700">{correct}</span>
                        </p>
                        <p className="flex items-start gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 ring-1 ring-rose-200/60">
                          <span className="font-extrabold text-rose-600">
                            내 선택
                          </span>
                          <span className="text-rose-600">
                            {picked ?? "(시간초과 · 미응답)"}
                          </span>
                        </p>
                      </div>
                      <div className="px-3">
                        <PassageTranslation lines={rec.passageLines} tone="teal" />
                      </div>
                      {q.explanation && (
                        <p className="m-3 mt-2 rounded-lg bg-white px-2.5 py-2 text-[12px] leading-relaxed text-neutral-600 ring-1 ring-neutral-900/[0.05]">
                          <span className="mr-1 font-bold text-neutral-700">해설</span>
                          {q.explanation}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.section>
        )}

        {/* 하단 시스템 메시지 */}
        <div className="mt-3 rounded-2xl bg-neutral-900/[0.03] px-4 py-3 ring-1 ring-neutral-900/[0.06]">
          <RematchTimer
            deadline={rematchDeadline}
            onExpire={() => setExpired(true)}
          />
        </div>
      </div>

      {/* 승리 컨페티 */}
      <Confetti trigger={user.rank === 1} />

      {/* 빌류킹 컷인 */}
      {jennyLine && !cutinClosed && (
        <JennyCutin
          open
          expression={user.rank === 1 ? "lose" : "win"}
          line={jennyLine}
          onClose={() => setCutinClosed(true)}
        />
      )}
    </main>
  );
}
