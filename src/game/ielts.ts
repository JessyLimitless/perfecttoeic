/**
 * 만점 아이엘츠 — IELTS Academic 도메인 단일 소스.
 *
 * TOEIC 문제은행(src/game/types.ts)·리스닝(src/game/listening.ts)과 **완전히 분리된 사일로**다.
 * 콘텐츠: content/ielts/*.md (```json 블록 1개 = 세트 1개). 로더: src/lib/ielts-loader.ts.
 *
 * ── 이 모듈의 설계 원칙 ──────────────────────────────────────
 * IELTS 리스닝에서 점수를 깎아먹는 건 "못 알아들어서"가 아니라 **덫에 걸려서**다.
 * 5일이라 했다가 7일로 정정하고, $150에서 $30을 깎아 $120을 말한다.
 * 그래서 문항마다 `trap`(무슨 덫인지)을 데이터로 들고 다니며,
 * 채점 결과를 정답/오답이 아니라 **덫 방어 성공 / 덫에 걸림**으로 말한다.
 * 학습자가 쌓아야 할 지표도 정답률이 아니라 `함정 방어율`이다.
 * ──────────────────────────────────────────────────────────
 */

export type IeltsSkill = "LISTENING" | "READING" | "WRITING" | "SPEAKING";

/** IELTS 리스닝 4개 섹션. 1·2 = 일상, 3·4 = 학술 */
export type IeltsListeningPart = 1 | 2 | 3 | 4;

/** gap = 주관식(받아쓰기) · choice = 객관식 */
export type IeltsQuestionKind = "gap" | "choice";

export interface IeltsScriptLine {
  /** voice 키 — scripts/tts-ielts.mjs 의 VOICE 맵 */
  speaker: string;
  /** 화면에 표시할 화자 이름 (예: "Agent", "Guide") */
  role?: string;
  en: string;
  ko: string;
}

export interface IeltsQuestion {
  id: string;
  kind: IeltsQuestionKind;
  /** 문항/빈칸 라벨. gap이면 `______` 를 포함한다 */
  promptEn: string;
  promptKo: string;

  /** gap 전용 — 정식 정답 */
  answer?: string;
  /** gap 전용 — 정답으로 인정할 다른 표기 (예: "7" ↔ "seven") */
  accept?: string[];
  /** gap 전용 — 실전 지시문 (예: "ONE WORD AND/OR A NUMBER") */
  wordLimit?: string;

  /** choice 전용 */
  choices?: string[];
  choicesKo?: string[];
  answerIndex?: number;

  /** 이 문항이 파놓은 덫 — 오답일 때 "무엇에 걸렸는지"를 정확히 말해준다 */
  trap?: string;
  explanation: string;
  /** §IELTS_TRAPS 의 표준 라벨 */
  category: string;
}

/** 리딩 지문 한 단락 — Heading Matching을 위해 A·B·C… 라벨을 갖는다 */
export interface IeltsReadingParagraph {
  /** 단락 라벨 (A, B, C …). 없으면 라벨 없는 산문 */
  label?: string;
  en: string;
  ko: string;
}

/**
 * 리딩 세트 — 리스닝과 같은 채점 엔진(gradeGap/gradeChoice)을 그대로 쓴다.
 * 다른 점은 음원 대신 **지문**을 읽는다는 것뿐이라, 덫·밴드 체계를 공유한다.
 */
export interface IeltsReadingSet {
  id: string;
  skill: "READING";
  /** 학술 리딩은 지문 3개(Passage 1~3)로 구성된다 */
  passageNo: 1 | 2 | 3;
  band: number;
  title: string;
  titleKo: string;
  /** 문항 형식 라벨 (True/False/Not Given, Heading Matching …) */
  taskType: string;
  paragraphs: IeltsReadingParagraph[];
  questions: IeltsQuestion[];
}

export interface IeltsListeningSet {
  id: string;
  skill: "LISTENING";
  part: IeltsListeningPart;
  /** 이 세트가 겨냥하는 밴드 */
  band: number;
  title: string;
  titleKo: string;
  /** 문항 형식 라벨 (Form Completion, Map Labelling …) */
  taskType: string;
  script: IeltsScriptLine[];
  questions: IeltsQuestion[];
}

/* ────────────────────────────────────────────────────────────
 * 덫(함정) 표준 유형 — 콘텐츠의 `category`는 반드시 이 키를 쓴다.
 * 미상 라벨은 DETAIL로 정규화된다 (TOEIC questionTypes.ts와 같은 정책).
 * ──────────────────────────────────────────────────────────── */

export type IeltsTrapType =
  | "CORRECTION"
  | "NUMBER"
  | "SPELLING"
  | "PARAPHRASE"
  | "MAP"
  | "MATCHING"
  | "DISTRACTOR"
  | "DETAIL"
  /* ── 리딩 전용 덫 ── */
  | "NOTGIVEN"
  | "QUALIFIER";

export const IELTS_TRAPS: Record<
  IeltsTrapType,
  { label: string; icon: string; hint: string }
> = {
  CORRECTION: {
    label: "자기수정",
    icon: "↩️",
    hint: "먼저 말한 값은 미끼다. 정정한 **마지막 값**을 적는다.",
  },
  NUMBER: {
    label: "숫자·계산",
    icon: "🔢",
    hint: "원가·할인액이 아니라 **최종 금액**. 들리는 숫자를 다 적지 않는다.",
  },
  SPELLING: {
    label: "스펠링",
    icon: "🔤",
    hint: "철자 하나만 틀려도 0점. 고유명사·월 이름은 **대문자**.",
  },
  PARAPHRASE: {
    label: "패러프레이즈",
    icon: "🔁",
    hint: "보기의 단어가 그대로 들리면 오히려 의심한다. 바꿔 말한 쪽이 정답.",
  },
  MAP: {
    label: "위치·방향",
    icon: "🧭",
    hint: "기준점 → 방향 → 거리 순으로 손가락을 옮긴다. 마지막 지시가 답.",
  },
  MATCHING: {
    label: "매칭·분류",
    icon: "🔗",
    hint: "보기를 미리 읽고 대기한다. 순서대로 나오지 않을 수 있다.",
  },
  DISTRACTOR: {
    label: "오답 소거",
    icon: "🚫",
    hint: "언급은 됐지만 부정·거절된 선택지. '그건 아니고'를 놓치지 않는다.",
  },
  DETAIL: {
    label: "세부정보",
    icon: "🎧",
    hint: "빈칸 앞뒤 단어를 신호로 삼아 대기한다.",
  },
  NOTGIVEN: {
    label: "진위·미언급",
    icon: "❓",
    hint: "FALSE는 지문이 **반대로 말한 것**, NOT GIVEN은 **아예 말하지 않은 것**. 상식으로 메우지 않는다.",
  },
  QUALIFIER: {
    label: "한정어",
    icon: "⚖️",
    hint: "all·only·always·never 같은 한정어 하나가 진술 전체를 뒤집는다.",
  },
};

const TRAP_ALIASES: Record<string, IeltsTrapType> = {
  자기수정: "CORRECTION",
  정정: "CORRECTION",
  "Self-Correction": "CORRECTION",
  "숫자·계산": "NUMBER",
  숫자: "NUMBER",
  계산: "NUMBER",
  스펠링: "SPELLING",
  철자: "SPELLING",
  패러프레이즈: "PARAPHRASE",
  바꿔말하기: "PARAPHRASE",
  "위치·방향": "MAP",
  위치: "MAP",
  지도: "MAP",
  "매칭·분류": "MATCHING",
  매칭: "MATCHING",
  분류: "MATCHING",
  "오답 소거": "DISTRACTOR",
  소거: "DISTRACTOR",
  함정: "DISTRACTOR",
  세부정보: "DETAIL",
  세부: "DETAIL",
  "진위·미언급": "NOTGIVEN",
  미언급: "NOTGIVEN",
  진위: "NOTGIVEN",
  한정어: "QUALIFIER",
  극단어: "QUALIFIER",
};

export function trapTypeOf(category: string | undefined): IeltsTrapType {
  if (!category) return "DETAIL";
  const key = category.trim();
  if (key in IELTS_TRAPS) return key as IeltsTrapType;
  return TRAP_ALIASES[key] ?? "DETAIL";
}

/* ────────────────────────────────────────────────────────────
 * 채점 — 주관식은 IELTS 실전 규칙(철자 정확)을 따르되,
 * "철자 하나 차이"는 따로 알려준다. 실전이면 0점이라는 걸 알아야 고친다.
 * ──────────────────────────────────────────────────────────── */

export type GapVerdict = "correct" | "typo" | "wrong";

/** 소문자·공백 정리 + 양끝 구두점 제거. 내부 구두점(이메일의 . - @)은 보존한다. */
export function normalizeGap(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^[.,;:!?'"()\[\]]+|[.,;:!?'"()\[\]]+$/g, "");
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

/**
 * 주관식 채점.
 * - correct: 정답 또는 accept 표기와 일치
 * - typo   : 철자 1개 차이 (4글자 이상일 때만) → 실전 오답이지만 다르게 말해준다
 * - wrong  : 그 외
 */
export function gradeGap(input: string, q: IeltsQuestion): GapVerdict {
  const got = normalizeGap(input);
  if (!got) return "wrong";
  const keys = [q.answer ?? "", ...(q.accept ?? [])]
    .map(normalizeGap)
    .filter(Boolean);
  if (keys.includes(got)) return "correct";
  const near = keys.some(
    (k) => k.length >= 4 && levenshtein(k, got) === 1,
  );
  return near ? "typo" : "wrong";
}

export function gradeChoice(index: number, q: IeltsQuestion): boolean {
  return index === q.answerIndex;
}

/** 문항 하나가 정답인지 (kind 무관) */
export function isCorrect(
  q: IeltsQuestion,
  response: string | number | undefined,
): boolean {
  if (response === undefined || response === "") return false;
  return q.kind === "gap"
    ? gradeGap(String(response), q) === "correct"
    : gradeChoice(Number(response), q);
}

/* ────────────────────────────────────────────────────────────
 * 밴드 환산 — IELTS Listening 원점수(/40) 공식 변환표.
 * 세트는 10문항 안팎이라 정답률을 40점 만점으로 환산해 밴드를 추정한다.
 * ──────────────────────────────────────────────────────────── */

const BAND_TABLE: [min: number, band: number][] = [
  [39, 9.0],
  [37, 8.5],
  [35, 8.0],
  [32, 7.5],
  [30, 7.0],
  [26, 6.5],
  [23, 6.0],
  [18, 5.5],
  [16, 5.0],
  [13, 4.5],
  [10, 4.0],
];

/** 원점수(/40) → 밴드 */
export function bandForRaw(raw: number): number {
  for (const [min, band] of BAND_TABLE) if (raw >= min) return band;
  return 3.5;
}

/** 세트 결과(정답 수 / 총 문항) → 추정 밴드 */
export function bandFor(correct: number, total: number): number {
  if (total <= 0) return 3.5;
  return bandForRaw(Math.round((correct / total) * 40));
}

export function bandLabel(band: number): string {
  if (band >= 8.5) return "Expert";
  if (band >= 7.5) return "Very Good";
  if (band >= 6.5) return "Competent+";
  if (band >= 5.5) return "Modest";
  return "Limited";
}

/** PRD 목표 — Overall 7.5 (영역별 6.5+) */
export const IELTS_TARGET_BAND = 7.5;

/* ────────────────────────────────────────────────────────────
 * 진도 — localStorage. TOEIC 진도(toeic-mastery-v1 등)와 키를 공유하지 않는다.
 * ──────────────────────────────────────────────────────────── */

const KEY = "toeic-ielts-v1";

export interface IeltsSetRecord {
  attempts: number;
  bestCorrect: number;
  total: number;
  /** 마주친 덫 문항 수 / 그중 막아낸 수 — 누적 */
  trapsFaced: number;
  trapsDefended: number;
  lastAt: number;
}

export interface IeltsProgress {
  sets: Record<string, IeltsSetRecord>;
}

const empty = (): IeltsProgress => ({ sets: {} });

export function loadIelts(): IeltsProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as IeltsProgress;
    return parsed?.sets ? parsed : empty();
  } catch {
    return empty();
  }
}

function save(p: IeltsProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // 저장 실패는 학습을 막지 않는다
  }
}

export interface SetOutcome {
  setId: string;
  correct: number;
  total: number;
  trapsFaced: number;
  trapsDefended: number;
}

export function recordIeltsSet(o: SetOutcome): IeltsProgress {
  const p = loadIelts();
  const prev = p.sets[o.setId];
  p.sets[o.setId] = {
    attempts: (prev?.attempts ?? 0) + 1,
    bestCorrect: Math.max(prev?.bestCorrect ?? 0, o.correct),
    total: o.total,
    trapsFaced: (prev?.trapsFaced ?? 0) + o.trapsFaced,
    trapsDefended: (prev?.trapsDefended ?? 0) + o.trapsDefended,
    lastAt: Date.now(),
  };
  save(p);
  return p;
}

export function resetIelts() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}

export interface IeltsSummary {
  /** 한 번이라도 푼 세트 수 */
  studied: number;
  totalSets: number;
  /** 최고점 합계 기준 정답 수 / 총 문항 */
  best: number;
  questions: number;
  /** 추정 밴드 (최고점 기준) */
  band: number;
  /** 함정 방어율 0~100 */
  trapRate: number;
  trapsFaced: number;
}

/** 홈·랜딩에서 쓰는 경량 세트 요약 (문항 내용 없이 개수만) */
export interface IeltsSetSummary {
  id: string;
  part: IeltsListeningPart;
  band: number;
  title: string;
  titleKo: string;
  taskType: string;
  /** 문항 수 */
  questions: number;
  /** 이 세트가 파놓은 덫 종류 */
  traps: IeltsTrapType[];
}

export function ieltsSummary(
  p: IeltsProgress,
  sets: { id: string; questions: number }[],
): IeltsSummary {
  let studied = 0;
  let best = 0;
  let questions = 0;
  let faced = 0;
  let defended = 0;

  for (const s of sets) {
    questions += s.questions;
    const rec = p.sets[s.id];
    if (!rec) continue;
    studied += 1;
    best += rec.bestCorrect;
    faced += rec.trapsFaced;
    defended += rec.trapsDefended;
  }

  return {
    studied,
    totalSets: sets.length,
    best,
    questions,
    band: studied > 0 ? bandFor(best, questions) : 0,
    trapRate: faced > 0 ? Math.round((defended / faced) * 100) : 0,
    trapsFaced: faced,
  };
}
