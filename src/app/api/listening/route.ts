import { NextResponse } from "next/server";
import { loadListeningSets } from "@/lib/listening-loader";

export const runtime = "nodejs";

/** GET /api/listening — 전체 리스닝 세트(Part 2·3·4) 반환. */
export async function GET() {
  const sets = await loadListeningSets();
  return NextResponse.json({ sets });
}
