import { promises as fs } from "fs";
import path from "path";
import type { BridgeRequest, BridgeResponse } from "./types";

const ROOT = path.join(process.cwd(), ".bridge");
export const INBOX = path.join(ROOT, "inbox");
export const OUTBOX = path.join(ROOT, "outbox");

async function ensureDirs(): Promise<void> {
  await fs.mkdir(INBOX, { recursive: true });
  await fs.mkdir(OUTBOX, { recursive: true });
}

/** 앱 요청을 inbox 에 기록 */
export async function writeRequest(req: BridgeRequest): Promise<void> {
  await ensureDirs();
  await fs.writeFile(
    path.join(INBOX, `${req.id}.json`),
    JSON.stringify(req, null, 2),
    "utf8",
  );
}

/** outbox 에서 응답을 읽음. 아직 처리 전이면 null */
export async function readResponse(id: string): Promise<BridgeResponse | null> {
  try {
    const raw = await fs.readFile(path.join(OUTBOX, `${id}.json`), "utf8");
    return JSON.parse(raw) as BridgeResponse;
  } catch {
    return null;
  }
}
