// 암기 모드(Cloze→Recall) 간격반복 영속화 — localStorage. 읽기 진도(warmup.ts)와 분리.
// Leitner 박스 기반 SM-2 라이트: 정답이면 박스↑·복습 간격↑, 틀리면 박스 0으로 리셋.
// 문장 식별자(sentenceKey)는 "섹션순서-문장순서"로 위치 기반(덱 파싱과 동일 원칙).

const KEY = "toeic-memorize-v1";
const DAY = 24 * 60 * 60 * 1000;

/** 박스(0~5) → 다음 복습까지 일수. 0=같은 날(사실상 즉시 재등장) */
export const INTERVAL_DAYS = [0, 1, 2, 4, 8, 16] as const;
export const MAX_BOX = INTERVAL_DAYS.length - 1; // 5
/** 이 박스 이상이면 "마스터"로 간주 (간격 8일+) */
export const MASTER_BOX = 4;

export interface SrCard {
  /** Leitner 박스 0~5 */
  box: number;
  /** 다음 복습 예정 시각(ms epoch) */
  due: number;
  /** 누적 노출 횟수 */
  seen: number;
  /** 누적 정답 횟수 */
  correct: number;
}

/** sentenceKey → 카드 */
export type DeckSr = Record<string, SrCard>;
/** deckId → DeckSr */
export type MemorizeStore = Record<string, DeckSr>;

export function sentenceKey(sectionIdx: number, posInSection: number): string {
  return `${sectionIdx}-${posInSection}`;
}

export function loadMemorize(): MemorizeStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as MemorizeStore;
    return p && typeof p === "object" ? p : {};
  } catch {
    return {};
  }
}

function save(store: MemorizeStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // 무시 (부가 기능)
  }
}

export function deckSr(store: MemorizeStore, deckId: string): DeckSr {
  return store[deckId] ?? {};
}

/**
 * 카드 한 장을 채점하고 SR 상태를 갱신·저장한다.
 * ok=true → 박스+1(최대 MAX_BOX), 다음 복습 = now + 간격일.
 * ok=false → 박스 0, 즉시 복습 대상(due=now).
 */
export function rateCard(deckId: string, key: string, ok: boolean): MemorizeStore {
  const store = loadMemorize();
  const dk = store[deckId] ?? {};
  const prev = dk[key] ?? { box: 0, due: 0, seen: 0, correct: 0 };
  const box = ok ? Math.min(prev.box + 1, MAX_BOX) : 0;
  const now = Date.now();
  dk[key] = {
    box,
    due: now + INTERVAL_DAYS[box] * DAY,
    seen: prev.seen + 1,
    correct: prev.correct + (ok ? 1 : 0),
  };
  store[deckId] = dk;
  save(store);
  return store;
}

export function resetMemorizeDeck(deckId: string): MemorizeStore {
  const store = loadMemorize();
  delete store[deckId];
  save(store);
  return store;
}

/** 학습 시작한(노출된) 문장 수 */
export function learnedCount(dk: DeckSr): number {
  return Object.values(dk).filter((c) => c.seen > 0).length;
}

/** 마스터(박스 ≥ MASTER_BOX) 문장 수 */
export function masteredCount(dk: DeckSr): number {
  return Object.values(dk).filter((c) => c.box >= MASTER_BOX).length;
}

/** 지금 복습 예정(due ≤ now)인 학습된 문장 수 */
export function dueCount(dk: DeckSr, now = Date.now()): number {
  return Object.values(dk).filter((c) => c.seen > 0 && c.due <= now).length;
}

/**
 * 사용자 입력값 정규화: 소문자화 + 앞뒤 공백 제거 + 양끝 구두점 제거.
 * buildCloze 의 answers 는 core() 결과(소문자·알파벳+') 이므로 동일 형태로 맞춰 비교.
 */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/^[.,!?"';:()]+|[.,!?"';:()]+$/g, "");
}

// ── Cloze 생성 ────────────────────────────────────────────
const STOP = new Set([
  "the", "and", "for", "are", "was", "were", "been", "have", "has", "had",
  "that", "this", "these", "those", "with", "from", "into", "out", "his",
  "her", "their", "they", "them", "you", "your", "she", "him", "but", "not",
  "all", "any", "each", "very", "just", "than", "then", "would", "could",
  "will", "can", "did", "does", "who", "what", "when", "where", "why", "how",
  "about", "there", "here", "which", "while", "because", "only", "even",
]);

function core(word: string): string {
  return word.replace(/[^A-Za-z']/g, "").toLowerCase();
}

export interface Cloze {
  /** 빈칸(____)이 들어간 표시용 문장 */
  display: string;
  /** 빈칸에 들어갈 정답 단어들 */
  answers: string[];
}

/**
 * 영문에서 핵심어 1~2개를 골라 ____ 로 가린다.
 * 내용어(길이≥4·불용어 제외) 중 긴 단어 우선, 16단어 이상이면 2개.
 */
export function buildCloze(en: string): Cloze {
  const tokens = en.split(/\s+/);
  const cands: { i: number; len: number }[] = [];
  tokens.forEach((tk, i) => {
    const c = core(tk);
    if (c.length >= 4 && !STOP.has(c)) cands.push({ i, len: c.length });
  });
  if (cands.length === 0) {
    tokens.forEach((tk, i) => cands.push({ i, len: core(tk).length }));
  }
  cands.sort((a, b) => b.len - a.len);

  const blanks = new Set<number>();
  if (cands[0]) blanks.add(cands[0].i);
  if (tokens.length >= 16 && cands[1] && cands[1].i !== cands[0]?.i) {
    blanks.add(cands[1].i);
  }

  const answers: string[] = [];
  const display = tokens
    .map((tk, i) => {
      if (!blanks.has(i)) return tk;
      answers.push(core(tk));
      return tk.replace(/[A-Za-z']+/, "____");
    })
    .join(" ");

  return { display, answers };
}
