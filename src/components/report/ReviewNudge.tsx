"use client";

// 랜딩 하단 스트립 — "오늘 복습할 N문항" + 약점 리포트 진입.
// 랜딩의 3박스(패턴→게임→실전) 구도를 해치지 않도록 한 줄로만 붙는다.
// 아직 푼 기록이 없으면 아무것도 렌더하지 않는다(첫 방문 화면은 깨끗하게).

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildReviewSummary, formatDueIn, type ReviewSummary } from "@/game/review";
import { buildSkillReport, type SkillStat } from "@/game/skills";

export default function ReviewNudge() {
  const router = useRouter();
  const [review, setReview] = useState<ReviewSummary | null>(null);
  const [weakest, setWeakest] = useState<SkillStat | null>(null);

  useEffect(() => {
    const r = buildReviewSummary();
    setReview(r);
    const rep = buildSkillReport();
    setWeakest(rep.weakest[0] ?? null);
  }, []);

  // 기록이 전혀 없으면 노출하지 않음
  if (!review || (review.scheduled === 0 && !weakest)) return null;

  const hasDue = review.due > 0;

  return (
    <button
      type="button"
      onClick={() => router.push("/report")}
      className="group mt-4 flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-neutral-900/[0.06] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[18px] ${
          hasDue ? "bg-violet-50 text-violet-600" : "bg-neutral-100 text-neutral-400"
        }`}
        aria-hidden
      >
        🔁
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-black tracking-tight text-neutral-900">
          {hasDue ? (
            <>
              오늘 복습할 문제 <span className="text-violet-600">{review.due}문항</span>
            </>
          ) : (
            <>약점 리포트</>
          )}
        </span>
        <span className="mt-0.5 block truncate text-[12px] text-neutral-500">
          {hasDue ? (
            <>맞힌 문제도 잊을 때가 되면 다시 나와 · 탭해서 복습</>
          ) : weakest ? (
            <>
              가장 약한 유형 <strong className="text-neutral-700">{weakest.skill.label}</strong>{" "}
              {weakest.accuracy}%
            </>
          ) : (
            <>
              다음 복습 {review.nextDueAt ? formatDueIn(review.nextDueAt) : "예정 없음"}
            </>
          )}
        </span>
      </span>

      <span className="shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-neutral-500">
        →
      </span>
    </button>
  );
}
