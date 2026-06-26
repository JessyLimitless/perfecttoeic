"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameResultTable from "@/components/match/GameResultTable";
import ProgressGrid from "@/components/match/ProgressGrid";
import ProfileCard from "@/components/match/ProfileCard";
import ResultBanner from "@/components/match/ResultBanner";
import RematchTimer, {
  isRematchExpired,
} from "@/components/match/RematchTimer";
import { useMatchStore } from "@/game/match/matchStore";
import { CREDIT_WIN } from "@/game/match/types";
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

export default function MatchResultPage() {
  const router = useRouter();

  const status = useMatchStore((s) => s.status);
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

  // 결과 상태가 아니면(직접 진입/새로고침) 대결 로비로
  useEffect(() => {
    if (status !== "result") router.replace("/match");
  }, [status, router]);

  if (status !== "result") return null;

  const wrongItems = userHistory.filter((r) => !r.isCorrect);

  // 틀린문제 REVIEW: 진입 = 자동 퇴실(개념). 결과 액션을 숨기고 인라인 복습 노출.
  const handleReview = () => setReviewing(true);

  // REMATCH: 같은 조건 재대결 (기한 내). /api/sets 재로딩 후 인게임으로.
  const handleRematch = useCallback(async () => {
    if (expired || isRematchExpired(rematchDeadline) || busy) return;
    setBusy(true);
    const sets = await fetchBank();
    rematch(sets);
    router.push("/match");
  }, [expired, rematchDeadline, busy, rematch, router]);

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

            {/* 중앙 버튼 3종 */}
            {!reviewing && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={handleReview}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-teal-700 ring-1 ring-teal-900/10 shadow-sm transition hover:bg-teal-50 active:scale-[0.98]"
                >
                  틀린문제 REVIEW <span aria-hidden>📝</span>
                </button>
                <button
                  type="button"
                  onClick={handleRematch}
                  disabled={expired || busy}
                  className="rounded-2xl bg-teal-600 px-4 py-3 text-[13px] font-bold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
                >
                  {busy ? "준비 중…" : "REMATCH"}
                </button>
                <button
                  type="button"
                  onClick={handleNewRoom}
                  className="rounded-2xl bg-white px-4 py-3 text-[13px] font-bold text-neutral-700 ring-1 ring-neutral-900/10 shadow-sm transition hover:bg-neutral-50 active:scale-[0.98]"
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
                      className="rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-900/[0.06]"
                    >
                      <p className="text-[13px] font-bold text-neutral-900">
                        {q.prompt}
                      </p>
                      {q.promptKo && (
                        <p className="mt-0.5 text-[12px] text-neutral-500">
                          {q.promptKo}
                        </p>
                      )}
                      <div className="mt-2 space-y-1 text-[12px]">
                        <p className="text-emerald-600">
                          <span className="font-bold">정답</span> ·{" "}
                          {correct}
                        </p>
                        <p className="text-rose-500">
                          <span className="font-bold">내 선택</span> ·{" "}
                          {picked ?? "(시간초과 · 미응답)"}
                        </p>
                      </div>
                      {q.explanation && (
                        <p className="mt-2 rounded-lg bg-white px-2.5 py-2 text-[12px] leading-relaxed text-neutral-600 ring-1 ring-neutral-900/[0.05]">
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
    </main>
  );
}
