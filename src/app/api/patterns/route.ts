import { NextResponse } from "next/server";
import { loadPatternChapters } from "@/lib/pattern-loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/patterns — Part 5 패턴학습 전체(챕터·패턴) 반환. */
export async function GET() {
  const chapters = await loadPatternChapters();
  return NextResponse.json({ chapters });
}
