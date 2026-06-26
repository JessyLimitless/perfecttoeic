import type { Part } from "./types";

export interface PartMeta {
  /** "Part 5" */
  label: string;
  /** 한글 유형명 */
  name: string;
  /** 영문 토익 표기 */
  enName: string;
  /** 한 줄 설명 */
  desc: string;
}

/** 로비 노출 순서 */
export const PART_ORDER: Part[] = [5, 6, 7];

export const PART_META: Record<Part, PartMeta> = {
  5: {
    label: "Part 5",
    name: "단문 빈칸",
    enName: "Incomplete Sentences",
    desc: "한 문장의 빈칸에 알맞은 어휘·문법 형태를 고르는 유형",
  },
  6: {
    label: "Part 6",
    name: "장문 빈칸",
    enName: "Text Completion",
    desc: "지문 속 네 개의 빈칸을 문맥에 맞게 채우는 유형",
  },
  7: {
    label: "Part 7",
    name: "독해",
    enName: "Reading Comprehension",
    desc: "이메일·기사 등 지문을 읽고 빈출 유형을 푸는 유형",
  },
};

/** 세트의 파트 (미지정은 7=독해) */
export function partOf(set: { part?: Part }): Part {
  return set.part ?? 7;
}
