// 토익 RC(Part 7) 기출 빈출 "문항 유형" 체계
// 콘텐츠(content/sets)의 question.category 라벨이 제각각이라(예: 세부/세부사항,
// 동의어/어휘) 런타임에서 표준 유형으로 정규화한다. 콘텐츠 파일은 그대로 둔다.

/** 표준화된 빈출 문항 유형 */
export type QuestionType =
  | "MAIN" // 주제·목적
  | "DETAIL" // 세부사항
  | "INFERENCE" // 추론
  | "VOCAB" // 동의어
  | "NOTTRUE" // 사실확인(NOT/True)
  | "INTENT"; // 의도·수사적 목적

/** 유형 또는 "전체 기출" */
export type TypeFilter = QuestionType | "ALL";

export interface QuestionTypeMeta {
  /** 한글 라벨 (학습자에게 보이는 유형명) */
  label: string;
  /** 영문 토익 표기 */
  enLabel: string;
  /** 이 유형이 무엇을 묻는지 한 줄 설명 */
  desc: string;
  /** 대표 질문 형태 (기출 문두) */
  stem: string;
}

/** 빈출 순서 — 화면 노출 순서로도 사용 (토익 Part 7 출제 빈도 기준) */
export const QUESTION_TYPE_ORDER: QuestionType[] = [
  "DETAIL",
  "INFERENCE",
  "MAIN",
  "VOCAB",
  "NOTTRUE",
  "INTENT",
];

export const QUESTION_TYPE_META: Record<QuestionType, QuestionTypeMeta> = {
  DETAIL: {
    label: "세부사항",
    enLabel: "Detail",
    desc: "지문에서 특정 정보를 그대로 찾아 확인하는 유형",
    stem: "What / When / Where / Who …?",
  },
  INFERENCE: {
    label: "추론",
    enLabel: "Inference",
    desc: "직접 드러나지 않은 내용을 단서로 미루어 판단하는 유형",
    stem: "What is suggested / implied …?",
  },
  MAIN: {
    label: "주제·목적",
    enLabel: "Main Idea / Purpose",
    desc: "글 전체의 주제나 작성 목적을 묻는 유형",
    stem: "What is the purpose of …?",
  },
  VOCAB: {
    label: "동의어",
    enLabel: "Vocabulary",
    desc: "문맥상 특정 단어와 의미가 가장 가까운 말을 고르는 유형",
    stem: "The word \"…\" is closest in meaning to",
  },
  NOTTRUE: {
    label: "사실확인",
    enLabel: "NOT / True",
    desc: "지문과 일치/불일치하는 보기를 가려내는 유형",
    stem: "What is NOT mentioned / indicated …?",
  },
  INTENT: {
    label: "의도·화법",
    enLabel: "Intention",
    desc: "문자/채팅 속 화자의 의도나 문장의 수사적 목적을 파악하는 유형",
    stem: "What does the writer mean by …?",
  },
};

/** content의 자유로운 category 문자열 → 표준 유형 매핑.
 *  Part 7 콘텐츠는 표준 라벨(주제·목적 / 세부사항 / 추론 / 동의어 / 의도·화법)로
 *  정리되어 있으나, 과거 표기·변형도 함께 받아 항상 같은 유형으로 정규화한다. */
const CATEGORY_TO_TYPE: Record<string, QuestionType> = {
  // 주제·목적
  "주제·목적": "MAIN",
  주제: "MAIN",
  "주제/대의": "MAIN",
  "주제/세부": "MAIN",
  대의: "MAIN",
  목적: "MAIN",
  // 세부사항
  세부사항: "DETAIL",
  세부: "DETAIL",
  // 추론
  추론: "INFERENCE",
  // 동의어
  동의어: "VOCAB",
  어휘: "VOCAB",
  // 사실확인
  사실확인: "NOTTRUE",
  부정사실: "NOTTRUE",
  // 의도·화법
  "의도·화법": "INTENT",
  "의도 파악": "INTENT",
  의도파악: "INTENT",
  수사적목적: "INTENT",
  문장단순화: "INTENT",
  문장삽입: "INTENT",
};

/** category 문자열을 표준 유형으로 정규화. 미지정/미상은 세부사항으로 본다. */
export function normalizeCategory(category?: string): QuestionType {
  if (!category) return "DETAIL";
  const key = category.trim();
  return CATEGORY_TO_TYPE[key] ?? "DETAIL";
}

/** 유형 라벨 헬퍼 ("ALL" 포함) */
export function typeLabel(t: TypeFilter): string {
  return t === "ALL" ? "전체 기출" : QUESTION_TYPE_META[t].label;
}
