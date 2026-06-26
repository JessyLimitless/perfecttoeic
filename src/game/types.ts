// 게임 도메인 핵심 타입 (UI 무관, 순수 데이터)

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

/** 토익 RC 파트 — 5(단문 빈칸) / 6(장문 빈칸) / 7(독해) */
export type Part = 5 | 6 | 7;

export type ChoiceIndex = 0 | 1 | 2 | 3;

/** 지문의 한 문장 — 영어 원문 + 한글 번역 (문장별 통독용) */
export interface SentencePair {
  en: string;
  ko: string;
}

/** 한 지문에 딸린 개별 문항 (실제 Part 7처럼 지문당 여러 개) */
export interface PassageQuestion {
  id: string;
  prompt: string;
  promptKo: string;
  choices: [string, string, string, string];
  choicesKo: [string, string, string, string];
  answerIndex: ChoiceIndex;
  explanation: string;
  category?: string;
}

/** 지문 + 그 지문에 대한 문항들 (Part 7 한 세트) */
export interface PassageSet {
  id: string;
  difficulty: Difficulty;
  /** 파트 (없으면 7=독해로 간주). Part 5는 지문 없는 단문 빈칸. */
  part?: Part;
  /** 지문 유형 라벨 (Email, Article, Report 등) */
  passageType: string;
  /** 지문을 문장 단위로 쪼갠 영/한 페어 (Part 5는 빈 배열) */
  passageLines: SentencePair[];
  /** 이 지문에 대한 문항들 */
  questions: PassageQuestion[];
}
