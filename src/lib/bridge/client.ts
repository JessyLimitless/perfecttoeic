"use client";

import type { Difficulty, PassageSet } from "@/game/types";

interface PollOptions {
  timeoutMs?: number;
  intervalMs?: number;
}

/**
 * Claude Code 브리지에 라이브 지문 세트 생성을 요청하고 응답을 폴링한다.
 * - 성공: PassageSet[] 반환
 * - 실패/타임아웃/루프 미동작: null 반환 → 호출부에서 로컬 샘플로 fallback
 */
export async function requestLiveSets(
  difficulty: Difficulty,
  count: number,
  { timeoutMs = 2500, intervalMs = 400 }: PollOptions = {},
): Promise<PassageSet[] | null> {
  try {
    const r = await fetch("/api/bridge/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty, count }),
    });
    if (!r.ok) return null;
    const { id } = (await r.json()) as { id: string };

    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      await delay(intervalMs);
      const pr = await fetch(`/api/bridge/response?id=${id}`);
      if (pr.status === 202) continue;
      if (!pr.ok) return null;

      const res = await pr.json();
      if (res.status === "ok" && Array.isArray(res.data?.sets)) {
        return res.data.sets as PassageSet[];
      }
      return null;
    }
    return null;
  } catch {
    return null;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
