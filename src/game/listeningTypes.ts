// 리스닝(Part 2·3·4) "유형" 체계 — RC의 questionTypes.ts와 대칭되는 리스닝판.
// 콘텐츠(content/listening)의 category 라벨을 화면 노출용 표준 유형으로 정규화한다.
// 리스닝은 세트 단위로 풀지만(세트=파트 동질), 세트가 포함한 유형으로 필터·뱃지를 제공한다.

import type { ListeningSet } from "./listening";

/** 리스닝 표준 유형 */
export type LcType =
  | "WH" // 의문사 의문문 (Part 2)
  | "YESNO" // Yes/No·부정·부가 의문문 (Part 2)
  | "CHOICE" // 선택 의문문 (Part 2)
  | "STATEMENT" // 평서문·요청·제안 (Part 2)
  | "MAIN" // 주제·목적 (Part 3/4)
  | "DETAIL" // 세부사항 (Part 3/4)
  | "INFERENCE" // 추론 (Part 3/4)
  | "INTENT"; // 의도·화법 (Part 3/4)

export type LcTypeFilter = LcType | "ALL";

export interface LcTypeMeta {
  label: string;
  enLabel: string;
  /** 어느 파트군에 속하는 유형인지 (2 = Part2 질문유형, 34 = Part3/4 문항유형) */
  group: 2 | 34;
}

/** 노출 순서 (Part 2 질문유형 → Part 3/4 문항유형) */
export const LC_TYPE_ORDER: LcType[] = [
  "WH",
  "YESNO",
  "CHOICE",
  "STATEMENT",
  "MAIN",
  "DETAIL",
  "INFERENCE",
  "INTENT",
];

export const LC_TYPE_META: Record<LcType, LcTypeMeta> = {
  WH: { label: "의문사", enLabel: "WH-Question", group: 2 },
  YESNO: { label: "일반·부가", enLabel: "Yes/No", group: 2 },
  CHOICE: { label: "선택", enLabel: "Choice", group: 2 },
  STATEMENT: { label: "평서·요청", enLabel: "Statement", group: 2 },
  MAIN: { label: "주제·목적", enLabel: "Main / Purpose", group: 34 },
  DETAIL: { label: "세부사항", enLabel: "Detail", group: 34 },
  INFERENCE: { label: "추론", enLabel: "Inference", group: 34 },
  INTENT: { label: "의도·화법", enLabel: "Intention", group: 34 },
};

/** content의 category 문자열 → 표준 유형 매핑 */
const CATEGORY_TO_LC_TYPE: Record<string, LcType> = {
  Where의문문: "WH",
  When의문문: "WH",
  Who의문문: "WH",
  What의문문: "WH",
  How의문문: "WH",
  Why의문문: "WH",
  조동사의문문: "YESNO",
  부정의문문: "YESNO",
  부가의문문: "YESNO",
  선택의문문: "CHOICE",
  평서문: "STATEMENT",
  "요청·제안": "STATEMENT",
  "주제·목적": "MAIN",
  세부사항: "DETAIL",
  세부: "DETAIL",
  추론: "INFERENCE",
  "의도·화법": "INTENT",
};

/** category 문자열을 표준 리스닝 유형으로 정규화. 미상은 세부사항으로 본다. */
export function normalizeLcCategory(category?: string): LcType {
  if (!category) return "DETAIL";
  return CATEGORY_TO_LC_TYPE[category.trim()] ?? "DETAIL";
}

/** 세트가 포함한 유형들(중복 제거, 노출 순서 정렬) */
export function typesInSet(set: ListeningSet): LcType[] {
  const cats =
    set.part === 2
      ? (set.items ?? []).map((i) => i.category)
      : (set.questions ?? []).map((q) => q.category);
  const present = new Set(cats.map((c) => normalizeLcCategory(c)));
  return LC_TYPE_ORDER.filter((t) => present.has(t));
}

/** 유형 라벨 헬퍼 ("ALL" 포함) */
export function lcTypeLabel(t: LcTypeFilter): string {
  return t === "ALL" ? "전체" : LC_TYPE_META[t].label;
}
