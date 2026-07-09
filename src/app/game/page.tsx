"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import PracticeHeader from "@/components/practice/PracticeHeader";
import PassagePanel from "@/components/game/PassagePanel";
import QuestionPanel from "@/components/game/QuestionPanel";
import ChoiceButtons from "@/components/game/ChoiceButtons";
import FeedbackPanel from "@/components/practice/FeedbackPanel";
import { usePracticeStore } from "@/game/store";
import { partOf } from "@/game/parts";
import { loadMastery, streakOf, type MasteryPart } from "@/game/mastery";

export default function PracticePage() {
  const router = useRouter();
  const status = usePracticeStore((s) => s.status);
  const cursor = usePracticeStore((s) => s.cursor);
  const qIndex = usePracticeStore((s) => s.qIndex);
  const answered = usePracticeStore((s) => s.answered);
  const set = usePracticeStore((s) => s.queue[0]);
  const end = usePracticeStore((s) => s.end);

  // 정복 뱃지용 — 세션 진입 시점의 문항별 연속 정답 수(기록은 세션 종료 시 갱신되므로 세션 내 고정)
  const [masterySnap] = useState(() => loadMastery());

  useEffect(() => {
    if (status === "idle") router.replace("/");
    else if (status === "ended") router.replace("/result");
  }, [status, router]);

  if (status !== "active" || !set) return null;
  const question = set.questions[qIndex];
  if (!question) return null;

  const total = set.questions.length;
  const isLastInSet = qIndex === total - 1;
  const part = partOf(set);
  // Part 5(단문 빈칸)는 지문이 없다
  const hasPassage = part !== 5 && set.passageLines.length > 0;
  const masteryStreak = streakOf(part as MasteryPart, question.id, masterySnap);

  return (
    <>
      <PracticeHeader onEnd={end} />

      <main
        className={`pb-safe pt-4 sm:pt-6 ${
          hasPassage ? "container-exam" : "container-narrow"
        }`}
      >
        {/* 시험 용지 한 장 — 지문(좌)과 문항(우)을 하나의 면에 담는다 */}
        <div className="sheet overflow-hidden">
          <div
            className={
              hasPassage
                ? "grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
                : "grid grid-cols-1"
            }
          >
            {/* 지문은 세트 동안 유지 (Part 5는 지문 없음) */}
            {hasPassage && (
              <div className="border-b border-neutral-100 lg:border-b-0 lg:border-r">
                <PassagePanel key={set.id} set={set} flat />
              </div>
            )}

            {/* 문항 영역은 문항마다 갱신 — 전환 시 슬라이드/페이드 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={cursor}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex flex-col gap-4 px-6 py-6 sm:px-8 lg:px-9"
              >
                <QuestionPanel
                  question={question}
                  index={qIndex}
                  total={total}
                  part={part}
                  masteryStreak={masteryStreak}
                  flat
                />
                <ChoiceButtons question={question} />
                {answered && (
                  <FeedbackPanel
                    question={question}
                    isLastInSet={isLastInSet}
                    part={part}
                    masteryStreak={masteryStreak}
                  />
                )}

                {!answered && (
                  <p className="pt-0.5 text-[12px] text-neutral-400">
                    {hasPassage
                      ? "지문을 읽고 답을 골라보세요 · 시간 제한 없음"
                      : "빈칸에 알맞은 것을 골라보세요 · 시간 제한 없음"}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}
