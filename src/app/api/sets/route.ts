import { NextResponse } from "next/server";
import { loadAllSets } from "@/lib/sets-loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** content/sets 의 MD 문제 은행을 모두 반환 */
export async function GET() {
  const sets = await loadAllSets();
  return NextResponse.json({ sets });
}
