import { NextResponse } from "next/server";
import { loadDiagnosticTest } from "@/lib/diagnostic-loader";

export const runtime = "nodejs";

/** GET /api/diagnostic — 진단 테스트(LC 12 + RC 18) 반환. */
export async function GET() {
  const test = await loadDiagnosticTest();
  return NextResponse.json(test);
}
