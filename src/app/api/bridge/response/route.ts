import { NextResponse, type NextRequest } from "next/server";
import { readResponse } from "@/lib/bridge/server";

export const runtime = "nodejs";

/** 앱 → 응답 폴링. 아직 처리 전이면 202(pending) */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const res = await readResponse(id);
  if (!res) {
    return NextResponse.json({ status: "pending" }, { status: 202 });
  }
  return NextResponse.json(res);
}
