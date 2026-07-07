import { NextResponse } from "next/server";
import { loadMock } from "@/lib/mock-loader";

export const runtime = "nodejs";

/** GET /api/mock — 조립된 풀렝스 실전 모의고사(LC + RC) 반환. */
export async function GET() {
  const mock = await loadMock();
  return NextResponse.json(mock);
}
