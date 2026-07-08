// 파트별 "정복(Mastery)" 추적 — 6파트(LC 2·3·4 + RC 5·6·7) 통합.
// 정복도 = 그 파트 전체 문항 중 "한 번이라도 맞힌" 고유 문항 비율(100% = 만점 정복).
// 정답률 = 푼 시도 중 맞은 비율(실력 지표). 둘 다 저장한다.
// 기록 지점: RC 연습(store.end) · LC 리스닝(ListeningPlayer). localStorage에 영속.

/** 정복 추적 대상 파트 — 리스닝 2·3·4 + 리딩 5·6·7 */
export type MasteryPart = 2 | 3 | 4 | 5 | 6 | 7;

export const MASTERY_PARTS: MasteryPart[] = [2, 3, 4, 5, 6, 7];

/** 파트 도메인 — 리스닝(LC) / 리딩(RC) */
export function partDomain(part: MasteryPart): "LC" | "RC" {
  return part <= 4 ? "LC" : "RC";
}

export interface PartMastery {
  /** 한 번이라도 맞힌 고유 문항 ID들 */
  masteredIds: string[];
  /** 누적 시도 수 */
  solved: number;
  /** 누적 정답 수 */
  correct: number;
}

export interface MasteryState {
  parts: Record<MasteryPart, PartMastery>;
  updatedAt: string;
}

const KEY = "toeic-mastery-v1";

function emptyPart(): PartMastery {
  return { masteredIds: [], solved: 0, correct: 0 };
}

function emptyState(): MasteryState {
  return {
    parts: {
      2: emptyPart(),
      3: emptyPart(),
      4: emptyPart(),
      5: emptyPart(),
      6: emptyPart(),
      7: emptyPart(),
    },
    updatedAt: "",
  };
}

export function loadMastery(): MasteryState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const p = JSON.parse(raw) as Partial<MasteryState>;
    const base = emptyState();
    if (!p || typeof p !== "object" || !p.parts) return base;
    for (const part of MASTERY_PARTS) {
      const src = (p.parts as Record<number, Partial<PartMastery>>)[part];
      if (src) {
        base.parts[part] = {
          masteredIds: Array.isArray(src.masteredIds) ? src.masteredIds : [],
          solved: typeof src.solved === "number" ? src.solved : 0,
          correct: typeof src.correct === "number" ? src.correct : 0,
        };
      }
    }
    base.updatedAt = typeof p.updatedAt === "string" ? p.updatedAt : "";
    return base;
  } catch {
    return emptyState();
  }
}

function save(s: MasteryState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장 공간 초과 등은 무시 (부가 기능)
  }
}

export interface AnswerEntry {
  part: MasteryPart;
  /** 문항 고유 ID */
  id: string;
  correct: boolean;
}

/** 한 세션의 답변들을 누적 정복도에 합치고 저장한다 (기록 지점에서 배치 호출) */
export function recordAnswers(entries: AnswerEntry[]): MasteryState {
  const s = loadMastery();
  if (entries.length === 0) return s;
  for (const e of entries) {
    const bucket = s.parts[e.part];
    if (!bucket) continue;
    bucket.solved += 1;
    if (e.correct) {
      bucket.correct += 1;
      if (!bucket.masteredIds.includes(e.id)) bucket.masteredIds.push(e.id);
    }
  }
  s.updatedAt = new Date().toISOString();
  save(s);
  return s;
}

export function resetMastery(): MasteryState {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // 무시
    }
  }
  return emptyState();
}

/** 파트별 총 문항 수(정복도 분모) — /api/part-totals 응답 형태 */
export type PartTotals = Partial<Record<MasteryPart, number>>;

export interface PartMasteryView {
  part: MasteryPart;
  domain: "LC" | "RC";
  /** 정복(고유 정답) 문항 수 */
  mastered: number;
  /** 파트 전체 문항 수 */
  total: number;
  /** 정복도 0~100 (total 0이면 0) */
  coverage: number;
  /** 누적 정답률 0~100 (solved 0이면 null) */
  accuracy: number | null;
  solved: number;
  /** 이 파트를 100% 정복했는가 */
  conquered: boolean;
}

export interface MasteryView {
  parts: PartMasteryView[];
  /** 전체 정복 문항 수 */
  masteredTotal: number;
  /** 전체 문항 수 */
  grandTotal: number;
  /** 전체 정복도 0~100 */
  overallCoverage: number;
  /** 정복 완료한 파트 수 */
  conqueredParts: number;
  /** 만점(전 파트 100%)까지 남은 문항 수 */
  remaining: number;
}

/** 정복 상태 + 파트별 총계 → 대시보드 뷰 */
export function buildMasteryView(state: MasteryState, totals: PartTotals): MasteryView {
  const parts: PartMasteryView[] = MASTERY_PARTS.map((part) => {
    const b = state.parts[part];
    const total = totals[part] ?? 0;
    const mastered = Math.min(b.masteredIds.length, total || b.masteredIds.length);
    const coverage = total > 0 ? Math.round((mastered / total) * 100) : 0;
    const accuracy = b.solved > 0 ? Math.round((b.correct / b.solved) * 100) : null;
    return {
      part,
      domain: partDomain(part),
      mastered,
      total,
      coverage,
      accuracy,
      solved: b.solved,
      conquered: total > 0 && mastered >= total,
    };
  });

  const masteredTotal = parts.reduce((n, p) => n + p.mastered, 0);
  const grandTotal = parts.reduce((n, p) => n + p.total, 0);
  return {
    parts,
    masteredTotal,
    grandTotal,
    overallCoverage: grandTotal > 0 ? Math.round((masteredTotal / grandTotal) * 100) : 0,
    conqueredParts: parts.filter((p) => p.conquered).length,
    remaining: Math.max(grandTotal - masteredTotal, 0),
  };
}
