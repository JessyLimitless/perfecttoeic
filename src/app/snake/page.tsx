"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { partOf } from "@/game/parts";
import type { PassageQuestion, PassageSet } from "@/game/types";
import SnakeGame from "@/components/snake/SnakeGame";

/** Part 5 문항만 평탄화해 반환 (없으면 빈 배열) */
async function fetchPart5(): Promise<PassageQuestion[]> {
  try {
    const r = await fetch("/api/sets");
    if (!r.ok) return [];
    const { sets } = (await r.json()) as { sets: PassageSet[] };
    if (!Array.isArray(sets)) return [];
    return sets
      .filter((s) => partOf(s) === 5)
      .flatMap((s) => s.questions);
  } catch {
    return [];
  }
}

export default function SnakePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<PassageQuestion[] | null>(null);

  useEffect(() => {
    fetchPart5().then(setQuestions);
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden pb-safe">
      {/* 앰비언트 광채 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-[100px]" />
        <span className="absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-[100px]" />
      </div>

      {questions === null ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <span className="flex items-center gap-2 text-sm text-neutral-400">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />
            문항 불러오는 중…
          </span>
        </div>
      ) : (
        <SnakeGame questions={questions} onExit={() => router.push("/")} />
      )}
    </main>
  );
}
