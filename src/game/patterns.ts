/**
 * Part 5 패턴학습(Pattern Study) 도메인.
 *
 * 문제은행(PassageSet)·리스닝·대결과 **완전히 분리된 별도 사일로**.
 * 콘텐츠는 content/patterns/*.md 의 ```json``` 블록(챕터 단위).
 * 로더 src/lib/pattern-loader.ts · API /api/patterns.
 *
 * "공식 → 3초컷 팁 → 예제 3문항 → 정오+해설"의 교재형 학습.
 * 정복도(mastery)·진단 통계에는 영향을 주지 않는다(학습 전용).
 */

export type PatternPart = 5 | 6 | 7;

export interface PatternQuestion {
  prompt: string; // 빈칸(______) 포함 영문 / 독해 문항 문두
  choices: string[]; // 정확히 4개(영문)
  answerIndex: number; // 0~3
  explanation: string; // 한글 해설(3초 저격 + 보기 필터링)
  translation?: string; // 한글 전체 해석(Part 5) — P6/P7은 생략 가능
}

export interface PatternType {
  id: string; // "p5-pat-01" / "p6-pat-01" / "p7-pat-01"
  no: number; // 파트 내 순번(1~25)
  part: PatternPart; // 5 | 6 | 7 (로더가 주입)
  chapter: number; // 파트 내 챕터
  title: string;
  category: string; // 라벨(명사 자리, 이메일, 관계사 …)
  formula?: string; // 핵심 공식(P5 문법 패턴)
  tip?: string; // 3초컷 팁
  contextMap?: string; // 상황 예측 맵 / 독해 프레임워크(P6·P7)
  passage?: string; // 지문(P6 빈칸형·P7 독해형) — 빈칸 (1)(2)… 포함
  questions: PatternQuestion[]; // 3~4문항
}

export interface PatternChapter {
  part: PatternPart; // 5 | 6 | 7
  chapter: number;
  chapterTitle: string;
  patterns: PatternType[];
}

// ── 학습 진도(localStorage, 별도 키) ──────────────────────────────
const KEY = "toeic-pattern-v1";

export interface PatternStat {
  correct: number; // 마지막 학습 정답 수
  total: number; // 문항 수
  at: number; // 마지막 학습 시각(ms)
}

interface PatternStore {
  stats: Record<string, PatternStat>; // patternId → 최고 기록
}

function read(): PatternStore {
  if (typeof window === "undefined") return { stats: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { stats: {} };
    const parsed = JSON.parse(raw) as Partial<PatternStore>;
    return { stats: parsed.stats ?? {} };
  } catch {
    return { stats: {} };
  }
}

export function loadPatternStats(): Record<string, PatternStat> {
  return read().stats;
}

/** 패턴 학습 완료 기록(정답 수는 최고 기록만 유지). */
export function recordPattern(patternId: string, correct: number, total: number) {
  if (typeof window === "undefined") return;
  try {
    const store = read();
    const prev = store.stats[patternId];
    const best = prev && prev.correct > correct ? prev.correct : correct;
    store.stats[patternId] = { correct: best, total, at: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

/** 진도 요약(학습 완료 패턴 수 · 완전정복(만점) 패턴 수). */
export function patternProgress(
  stats: Record<string, PatternStat>,
): { studied: number; mastered: number } {
  const entries = Object.values(stats);
  return {
    studied: entries.length,
    mastered: entries.filter((s) => s.total > 0 && s.correct === s.total).length,
  };
}
