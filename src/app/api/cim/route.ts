import { NextResponse } from "next/server";
import { loadCimSets, flattenCim } from "@/lib/cim-loader";

export const runtime = "nodejs";
/** content/cim 에 새 문제집을 떨어뜨리면 바로 반영되도록 — 정적 프리렌더 금지 */
export const dynamic = "force-dynamic";

/**
 * GET /api/cim        — 전체 문항 (학습 화면용. 간격반복 큐를 클라이언트가 짜므로 전량 필요)
 * GET /api/cim?index=1 — id·과목만 (랜딩 집계용. 1,000문항이어도 수십 KB)
 */
export async function GET(req: Request) {
  const sets = await loadCimSets();
  const questions = flattenCim(sets);
  const meta = sets.map((s) => ({ id: s.id, title: s.title, questions: s.questions.length }));

  if (new URL(req.url).searchParams.has("index")) {
    return NextResponse.json({
      sets: meta,
      index: questions.map((q) => ({ id: q.id, subject: q.subject, no: q.no })),
    });
  }
  return NextResponse.json({ sets: meta, questions });
}
