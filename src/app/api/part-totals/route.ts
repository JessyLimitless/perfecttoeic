import { NextResponse } from "next/server";
import { loadAllSets } from "@/lib/sets-loader";
import { loadListeningSets } from "@/lib/listening-loader";
import { partOf } from "@/game/parts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 파트별 총 문항 수 — 정복도(Mastery) 대시보드의 분모.
 * RC(5·6·7)는 문제은행, LC(2·3·4)는 리스닝 은행에서 집계.
 * 문항 내용은 제외하고 카운트만 반환(경량).
 */
export async function GET() {
  const [sets, listening] = await Promise.all([loadAllSets(), loadListeningSets()]);

  const totals: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  // RC — 세트별 문항 수 합
  for (const s of sets) {
    const p = partOf(s);
    totals[p] = (totals[p] ?? 0) + (s.questions?.length ?? 0);
  }

  // LC — Part2는 item 수, Part3/4는 question 수
  for (const s of listening) {
    if (s.part === 2) totals[2] += s.items?.length ?? 0;
    else totals[s.part] += s.questions?.length ?? 0;
  }

  return NextResponse.json({ totals });
}
