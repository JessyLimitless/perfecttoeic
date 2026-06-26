import type { Difficulty, PassageSet } from "@/game/types";

/** 브리지 요청 종류 */
export type BridgeRequestType = "generate";

export interface GeneratePayload {
  difficulty: Difficulty;
  /** 생성할 지문 세트 수 */
  count: number;
  /** 출제 컨셉/주제 힌트 */
  theme: string;
}

/** 앱 → .bridge/inbox 에 기록되는 요청 */
export interface BridgeRequest {
  id: string;
  type: BridgeRequestType;
  createdAt: number;
  payload: GeneratePayload;
}

export interface GenerateResult {
  sets: PassageSet[];
}

/** Claude Code → .bridge/outbox 에 기록되는 응답 */
export interface BridgeResponse {
  id: string;
  type: BridgeRequestType;
  status: "ok" | "error";
  data?: GenerateResult;
  error?: string;
  processedAt: number;
}
