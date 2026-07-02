/**
 * 리스닝(Part 2·3·4) 도메인 타입.
 * RC 문제은행(src/game/types.ts)과 완전히 분리 — 오디오 기반 듣기 전용.
 * 콘텐츠: content/listening/*.md (```json 블록). 로더: src/lib/listening-loader.ts.
 */

export type ListeningPart = 2 | 3 | 4;
export type ListeningDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface LcResponse {
  en: string;
  ko: string;
}

/** Part 2 — 질문/평서문 1개 + 응답 3개(A/B/C). 각 item이 독립 오디오 클립. */
export interface LcPart2Item {
  id: string;
  promptEn: string;
  promptKo: string;
  /** 질문 화자 voice 키 (listening-loader/tts-listening의 VOICE 맵) */
  promptSpeaker: string;
  /** 응답 화자 voice 키 */
  responseSpeaker: string;
  responses: LcResponse[]; // 정확히 3개
  answerIndex: number; // 0~2
  explanation: string;
  category: string;
}

/** Part 3/4 — 대화/담화 한 줄 */
export interface LcScriptLine {
  speaker: string; // voice 키
  en: string;
  ko: string;
}

/** Part 3/4 — 문항 (보기 4개) */
export interface LcQuestion {
  id: string;
  promptEn: string;
  promptKo: string;
  choices: string[]; // 4개
  choicesKo: string[]; // 4개
  answerIndex: number; // 0~3
  explanation: string;
  category: string;
}

export interface ListeningSet {
  id: string;
  part: ListeningPart;
  difficulty: ListeningDifficulty;
  passageType?: string;
  /** Part 2 전용 */
  items?: LcPart2Item[];
  /** Part 3/4 전용 */
  script?: LcScriptLine[];
  questions?: LcQuestion[];
}

/** 파트별 오디오 클립 경로. Part2는 item별, Part3/4는 set별. (public 기준) */
export function audioSrc(id: string): string {
  return `/audio/listening/${id}.mp3`;
}
