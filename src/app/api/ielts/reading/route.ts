import { NextResponse } from "next/server";
import { loadIeltsReadingSets } from "@/lib/ielts-reading-loader";

// 콘텐츠 변경이 곧바로 반영되도록 (패턴학습 API와 같은 정책)
export const dynamic = "force-dynamic";

export async function GET() {
  const sets = await loadIeltsReadingSets();
  return NextResponse.json({ sets });
}
