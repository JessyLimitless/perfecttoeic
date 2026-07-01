import { NextResponse } from "next/server";
import { loadWarmupDecks } from "@/lib/warmup-loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 몸풀기 덱 요약(문장 내용 제외) — 로비 진도 대시보드용 경량 데이터 */
export async function GET() {
  const decks = await loadWarmupDecks();
  const summaries = decks.map((d) => ({
    id: d.id,
    titleKo: d.titleKo,
    bookNo: d.bookNo,
    total: d.total,
    sectionCount: d.sections.length,
  }));
  return NextResponse.json({ decks: summaries });
}
