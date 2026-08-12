import { NextResponse } from "next/server";
import { loadIeltsSets } from "@/lib/ielts-loader";

export const runtime = "nodejs";
/** 콘텐츠 파일 변경이 바로 반영되도록 — 정적 프리렌더 금지 */
export const dynamic = "force-dynamic";

/** GET /api/ielts — 만점 아이엘츠 전체 세트 반환. */
export async function GET() {
  const sets = await loadIeltsSets();
  return NextResponse.json({ sets });
}
