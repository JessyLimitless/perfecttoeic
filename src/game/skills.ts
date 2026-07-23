// 유형별 약점 진단 체계 — "어느 유형이 약한가"를 한 장으로 보여주기 위한 통합 taxonomy.
//
// 배경: 콘텐츠의 category 라벨은 파트마다 성격이 다르다.
//   - Part 5·6 → 문법 라벨 40여 종(전치사·접속사·준동사·시제·어휘 …) : 세분화돼 있어 그대로는 너무 잘다.
//   - Part 7   → 독해 6유형(questionTypes.ts)
//   - Part 2·3·4 → 리스닝 8유형(listeningTypes.ts)
// 이 셋을 하나의 "스킬(skill)" 축으로 정규화해서 파트를 가로지르는 약점 리포트를 만든다.
// 원본 category는 손대지 않는다(콘텐츠 무수정) — 런타임 매핑만.
//
// 집계 소스는 review.ts의 문항별 카드(seen/correct/cat)다. 문제은행을 다시 불러올 필요 없이
// localStorage만으로 리포트가 완성된다.

import type { MasteryPart } from "./mastery";
import { MASTERY_PARTS, partDomain } from "./mastery";
import { loadReview, type ReviewState, LONGTERM_BOX } from "./review";

export type SkillDomain = "LC" | "RC";

export interface Skill {
  id: string;
  label: string;
  /** 이 유형이 무엇을 묻는지 한 줄 */
  desc: string;
  domain: SkillDomain;
  /** 이 스킬이 등장하는 파트 */
  parts: MasteryPart[];
  /** 이 스킬로 묶이는 콘텐츠 원문 category 라벨 — 집중 드릴 필터에 그대로 쓴다 */
  categories: string[];
}

/**
 * 통합 스킬 목록. 순서 = 리포트 기본 노출 순서(리스닝 → 리딩 문법 → 리딩 독해).
 * categories는 실제 콘텐츠에 존재하는 라벨만 담는다(없는 라벨을 넣어도 무해하지만 혼란 방지).
 */
export const SKILLS: Skill[] = [
  // ── 리스닝 (Part 2) ─────────────────────────────────────────────
  {
    id: "lc-wh",
    label: "의문사 의문문",
    desc: "When/Where/Who/What/How/Why — 첫 단어로 답의 종류가 결정되는 유형",
    domain: "LC",
    parts: [2],
    categories: [
      "When의문문",
      "Where의문문",
      "Who의문문",
      "What의문문",
      "How의문문",
      "Why의문문",
    ],
  },
  {
    id: "lc-yesno",
    label: "일반·부정·부가 의문문",
    desc: "Yes/No로 답할 수 있는 질문 — 간접 응답 함정이 많은 유형",
    domain: "LC",
    parts: [2],
    categories: ["조동사의문문", "부정의문문", "부가의문문"],
  },
  {
    id: "lc-choice",
    label: "선택 의문문",
    desc: "A or B — 둘 중 하나 대신 '아무거나/제3의 답'이 정답인 경우가 많은 유형",
    domain: "LC",
    parts: [2],
    categories: ["선택의문문"],
  },
  {
    id: "lc-statement",
    label: "평서문·요청·제안",
    desc: "질문이 아닌 진술에 자연스럽게 반응하는 유형",
    domain: "LC",
    parts: [2],
    categories: ["평서문", "요청·제안"],
  },
  // ── 리스닝 (Part 3·4) ───────────────────────────────────────────
  {
    id: "lc-main",
    label: "대화·담화 주제",
    desc: "대화/담화 전체의 주제·목적·장소를 묻는 유형 — 도입부에 단서",
    domain: "LC",
    parts: [3, 4],
    categories: ["주제·목적"],
  },
  {
    id: "lc-detail",
    label: "세부사항 청취",
    desc: "특정 정보(시간·금액·이유 등)를 잡아내는 유형",
    domain: "LC",
    parts: [3, 4],
    categories: ["세부사항", "세부"],
  },
  {
    id: "lc-inference",
    label: "청취 추론",
    desc: "직접 말하지 않은 내용을 정황으로 판단하는 유형",
    domain: "LC",
    parts: [3, 4],
    categories: ["추론"],
  },
  {
    id: "lc-intent",
    label: "화자 의도",
    desc: '"이 말을 왜 했는가" — 문장의 숨은 뜻을 묻는 유형',
    domain: "LC",
    parts: [3, 4],
    categories: ["의도·화법"],
  },

  // ── 리딩 문법 (Part 5·6) ────────────────────────────────────────
  {
    id: "rc-form",
    label: "어형·품사 자리",
    desc: "빈칸 자리에 명사/형용사/부사 중 무엇이 오는지 판단하는 기본기",
    domain: "RC",
    parts: [5, 6],
    categories: ["어형", "품사", "부사"],
  },
  {
    id: "rc-verb",
    label: "시제·태",
    desc: "동사의 시제와 능동/수동을 문맥 단서로 고르는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["시제", "태", "동사"],
  },
  {
    id: "rc-agreement",
    label: "수일치",
    desc: "주어와 동사의 수를 맞추는 유형 — 수식어에 가려진 진짜 주어 찾기",
    domain: "RC",
    parts: [5, 6],
    categories: ["수일치"],
  },
  {
    id: "rc-verbal",
    label: "준동사",
    desc: "to부정사·동명사·분사 중 무엇이 들어갈지 판단하는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["준동사", "분사", "부정사"],
  },
  {
    id: "rc-prep",
    label: "전치사",
    desc: "시간·장소·수단 전치사와 관용 표현을 고르는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["전치사", "전치사/접속사"],
  },
  {
    id: "rc-conj",
    label: "접속사·접속부사",
    desc: "절을 잇는 접속사와 문장을 잇는 접속부사를 구분하는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["접속사", "접속부사", "부사절"],
  },
  {
    id: "rc-clause",
    label: "관계사·명사절",
    desc: "관계대명사·관계부사·명사절 접속사를 고르는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["관계사", "명사절"],
  },
  {
    id: "rc-pronoun",
    label: "대명사",
    desc: "인칭·재귀·지시대명사의 격과 지시 대상을 판단하는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["대명사"],
  },
  {
    id: "rc-compare",
    label: "비교·수량",
    desc: "비교급·최상급과 수량 표현(many/much/few …)을 고르는 유형",
    domain: "RC",
    parts: [5, 6],
    categories: ["비교", "수량표현"],
  },
  {
    id: "rc-special",
    label: "가정법·도치·특수구문",
    desc: "가정법, 부정어 도치, 병치·강조 등 고난도 구문",
    domain: "RC",
    parts: [5, 6],
    categories: ["가정법", "도치", "병치", "강조"],
  },
  {
    id: "rc-vocab",
    label: "어휘",
    desc: "문맥에 맞는 단어를 고르는 유형 — 연어(collocation)가 관건",
    domain: "RC",
    parts: [5, 6],
    categories: ["어휘"],
  },
  {
    id: "rc-insert",
    label: "문장 삽입 (Part 6)",
    desc: "빈칸에 들어갈 문장을 고르는 유형 — 앞뒤 연결어·지시어가 단서",
    domain: "RC",
    parts: [6],
    categories: ["문장삽입"],
  },

  // ── 리딩 독해 (Part 7) ──────────────────────────────────────────
  {
    id: "rc7-main",
    label: "주제·목적 (독해)",
    desc: "글 전체의 주제나 작성 목적을 묻는 유형",
    domain: "RC",
    parts: [7],
    categories: ["주제·목적", "주제", "목적", "대의", "주제/대의", "주제/세부"],
  },
  {
    id: "rc7-detail",
    label: "세부사항 (독해)",
    desc: "지문에서 특정 정보를 찾아 확인하는 유형 — Part 7 최다 출제",
    domain: "RC",
    parts: [7],
    categories: ["세부사항", "세부"],
  },
  {
    id: "rc7-inference",
    label: "추론 (독해)",
    desc: "드러나지 않은 내용을 단서로 미루어 판단하는 유형",
    domain: "RC",
    parts: [7],
    categories: ["추론"],
  },
  {
    id: "rc7-vocab",
    label: "동의어",
    desc: "문맥상 의미가 가장 가까운 단어를 고르는 유형",
    domain: "RC",
    parts: [7],
    categories: ["동의어", "어휘"],
  },
  {
    id: "rc7-nottrue",
    label: "사실확인 (NOT/True)",
    desc: "지문과 일치/불일치하는 보기를 가려내는 유형 — 시간이 많이 드는 유형",
    domain: "RC",
    parts: [7],
    categories: ["사실확인", "부정사실"],
  },
  {
    id: "rc7-intent",
    label: "의도·화법 (독해)",
    desc: "문자/채팅 속 화자의 의도나 문장의 수사적 목적을 묻는 유형",
    domain: "RC",
    parts: [7],
    categories: ["의도·화법", "의도파악", "의도 파악", "수사적목적", "문장단순화"],
  },
];

/** (part, category) → 스킬 조회용 인덱스. 같은 라벨이 파트별로 다른 스킬에 속할 수 있다
 *  (예: "세부사항"은 Part 3·4에선 lc-detail, Part 7에선 rc7-detail). */
const INDEX = new Map<string, Skill>();
for (const skill of SKILLS) {
  for (const part of skill.parts) {
    for (const cat of skill.categories) {
      const key = `${part}::${cat}`;
      if (!INDEX.has(key)) INDEX.set(key, skill);
    }
  }
}

/** 파트별 기본 스킬 — 라벨이 없거나 미상일 때 떨어질 자리 */
const FALLBACK: Record<MasteryPart, string> = {
  2: "lc-wh",
  3: "lc-detail",
  4: "lc-detail",
  5: "rc-form",
  6: "rc-form",
  7: "rc7-detail",
};

export function skillById(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

/** (파트, 원문 category) → 스킬. 미상 라벨은 파트 기본 스킬로 떨어진다. */
export function skillOf(part: MasteryPart, category?: string): Skill {
  if (category) {
    const hit = INDEX.get(`${part}::${category.trim()}`);
    if (hit) return hit;
  }
  return skillById(FALLBACK[part]) ?? SKILLS[0];
}

/** 리포트 한 줄 */
export interface SkillStat {
  skill: Skill;
  /** 누적 시도 수 */
  seen: number;
  /** 누적 정답 수 */
  correct: number;
  /** 정답률 0~100 (seen 0이면 null) */
  accuracy: number | null;
  /** 마지막 시도에서 틀린 상태로 남아 있는 문항 수 = 지금 약한 문항 */
  wrong: number;
  /** 복습 예정 문항 수 */
  due: number;
  /** 장기기억으로 넘어간 문항 수 */
  longterm: number;
  /** 이 스킬로 시도한 고유 문항 수 */
  items: number;
  /** 진단을 신뢰할 만큼 풀었는가 */
  enough: boolean;
}

/** 이 문항 수 미만이면 "표본 부족"으로 표시 — 3문제 정답률로 약점을 단정하면 오진이 된다 */
export const MIN_SAMPLE = 5;

export interface SkillReport {
  stats: SkillStat[];
  /** 표본이 충분한 것 중 정답률이 낮은 순 */
  weakest: SkillStat[];
  /** 표본이 충분한 것 중 정답률이 높은 순 */
  strongest: SkillStat[];
  /** 전체 시도 수 */
  totalSeen: number;
  /** 전체 정답률 0~100 (없으면 null) */
  overallAccuracy: number | null;
  /** 아직 진단이 안 되는가(표본 부족) */
  empty: boolean;
}

/**
 * review 저장분 → 유형별 약점 리포트.
 * 문항 카드에 저장해 둔 원문 category로 스킬을 역추적해 집계한다.
 */
export function buildSkillReport(
  state: ReviewState = loadReview(),
  now: number = Date.now(),
): SkillReport {
  const acc = new Map<string, SkillStat>();
  for (const skill of SKILLS) {
    acc.set(skill.id, {
      skill,
      seen: 0,
      correct: 0,
      accuracy: null,
      wrong: 0,
      due: 0,
      longterm: 0,
      items: 0,
      enough: false,
    });
  }

  for (const part of MASTERY_PARTS) {
    for (const card of Object.values(state[part] ?? {})) {
      const skill = skillOf(part, card.cat);
      const row = acc.get(skill.id);
      if (!row) continue;
      row.seen += card.seen;
      row.correct += card.correct;
      row.items += 1;
      if (!card.last) row.wrong += 1;
      if (card.box > 0 && card.due <= now) row.due += 1;
      if (card.box >= LONGTERM_BOX) row.longterm += 1;
    }
  }

  const stats: SkillStat[] = [];
  for (const skill of SKILLS) {
    const row = acc.get(skill.id)!;
    row.accuracy = row.seen > 0 ? Math.round((row.correct / row.seen) * 100) : null;
    row.enough = row.seen >= MIN_SAMPLE;
    stats.push(row);
  }

  const scored = stats.filter((r) => r.enough);
  const weakest = [...scored].sort(
    (a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100) || b.seen - a.seen,
  );
  const strongest = [...weakest].reverse();

  const totalSeen = stats.reduce((n, r) => n + r.seen, 0);
  const totalCorrect = stats.reduce((n, r) => n + r.correct, 0);

  return {
    stats,
    weakest,
    strongest,
    totalSeen,
    overallAccuracy: totalSeen > 0 ? Math.round((totalCorrect / totalSeen) * 100) : null,
    empty: scored.length === 0,
  };
}

/** 스킬 드릴을 어느 파트로 열지 — 여러 파트에 걸친 스킬은 첫 파트 기준 */
export function drillPartOf(skill: Skill): MasteryPart {
  return skill.parts[0];
}

/** 도메인 라벨 */
export function domainLabel(d: SkillDomain): string {
  return d === "LC" ? "리스닝" : "리딩";
}

export { partDomain };
