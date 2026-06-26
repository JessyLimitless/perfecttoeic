import { NextResponse, type NextRequest } from "next/server";
import { writeRequest } from "@/lib/bridge/server";
import { LIVE_INITIAL_COUNT } from "@/game/config";
import type { BridgeRequest } from "@/lib/bridge/types";

export const runtime = "nodejs";

const DEFAULT_THEME =
  "TOEIC RC Part 7 (reading comprehension) themed as working at a global IT company (AI & data analysis)";

/** 앱 → 라이브 문제 생성 요청. inbox 에 기록하고 요청 id 를 반환 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const id = crypto.randomUUID();
  const request: BridgeRequest = {
    id,
    type: "generate",
    createdAt: Date.now(),
    payload: {
      difficulty: body.difficulty ?? "MEDIUM",
      count: typeof body.count === "number" ? body.count : LIVE_INITIAL_COUNT,
      theme: body.theme ?? DEFAULT_THEME,
    },
  };

  await writeRequest(request);
  return NextResponse.json({ id });
}
