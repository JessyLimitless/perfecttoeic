// 파트별 "정복(Mastery)" 추적 — 6파트(LC 2·3·4 + RC 5·6·7) 통합.
//
// 정복 판정(핵심): 한 문항을 **연속 2회 맞혀야(MASTER_STREAK) 정복 확정**.
//   - 차분히 푸는 모드(연습·리스닝)에서 틀리면 streak 0으로 **정복 해제** → 다시 쌓아야 함.
//   - 대결(속도전, coverageOnly)은 **정답만 +1, 오답은 미차감**(시간압박 실수로 정복이 날아가지 않게).
//   - 추측 1회로는 절대 정복되지 않음(2회 필요) → "틀릴 리가 없는" 실력을 담보.
// 정복도 = 그 파트 전체 문항 중 정복(streak≥2) 고유 문항 비율(100% = 만점 정복).
// 복습 대기 = 봤지만 아직 정복 못한 문항(streak 0~1) → 마라톤에서 줄여야 할 "틀린 횟수".
// 정답률 = 차분히 푼 시도 중 맞은 비율(실력 지표). 셋 다 저장한다.
// 기록 지점: RC 연습(store.end) · LC 리스닝(ListeningPlayer) · 대결(match/lc-match, coverageOnly).

/** 정복 확정에 필요한 연속 정답 수 */
export const MASTER_STREAK = 2;

/** 정복 추적 대상 파트 — 리스닝 2·3·4 + 리딩 5·6·7 */
export type MasteryPart = 2 | 3 | 4 | 5 | 6 | 7;

export const MASTERY_PARTS: MasteryPart[] = [2, 3, 4, 5, 6, 7];

/** 파트 도메인 — 리스닝(LC) / 리딩(RC) */
export function partDomain(part: MasteryPart): "LC" | "RC" {
  return part <= 4 ? "LC" : "RC";
}

export interface PartMastery {
  /** 시도한 문항별 연속 정답 수(0~MASTER_STREAK). 키 존재 = 한 번이라도 시도함. */
  streaks: Record<string, number>;
  /** 누적 시도 수(차분한 모드만) */
  solved: number;
  /** 누적 정답 수(차분한 모드만) */
  correct: number;
}

export interface MasteryState {
  parts: Record<MasteryPart, PartMastery>;
  updatedAt: string;
}

const KEY = "toeic-mastery-v1";

function emptyPart(): PartMastery {
  return { streaks: {}, solved: 0, correct: 0 };
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

/** 한 문항이 정복됐는가(연속 정답 ≥ 기준) */
function isMastered(streak: number): boolean {
  return streak >= MASTER_STREAK;
}

/**
 * 저장분을 읽어 정규화한다. 구버전(`masteredIds: string[]`)은
 * 각 id를 정복 완료(streak = MASTER_STREAK)로 마이그레이션해 진도를 보존한다.
 */
export function loadMastery(): MasteryState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const p = JSON.parse(raw) as Partial<MasteryState>;
    const base = emptyState();
    if (!p || typeof p !== "object" || !p.parts) return base;
    for (const part of MASTERY_PARTS) {
      const src = (p.parts as Record<number, any>)[part];
      if (!src) continue;
      const streaks: Record<string, number> = {};
      if (src.streaks && typeof src.streaks === "object") {
        for (const [id, v] of Object.entries(src.streaks)) {
          const n = typeof v === "number" ? v : 0;
          streaks[id] = Math.max(0, Math.min(MASTER_STREAK, Math.round(n)));
        }
      } else if (Array.isArray(src.masteredIds)) {
        // 구버전 마이그레이션: 이미 맞혔던 문항은 정복 완료로 인정
        for (const id of src.masteredIds) streaks[String(id)] = MASTER_STREAK;
      }
      base.parts[part] = {
        streaks,
        solved: typeof src.solved === "number" ? src.solved : 0,
        correct: typeof src.correct === "number" ? src.correct : 0,
      };
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

/**
 * 한 세션의 답변들을 누적 정복 상태에 합치고 저장한다 (기록 지점에서 배치 호출).
 * - 기본(연습·리스닝): 정답 → streak+1(정복까지), 오답 → streak 0(정복 해제) + 정답률(solved/correct) 기록.
 * - `coverageOnly`(빌류킹 대결 등 속도전): 정답만 streak+1, 오답은 미차감. 정답률 통계는 건드리지 않음
 *   → 시간압박 실수로 정복이 날아가지 않게 + "차분히 풀 때의 실력(정답률)" 신호를 깨끗하게 유지.
 */
export function recordAnswers(
  entries: AnswerEntry[],
  opts: { coverageOnly?: boolean } = {},
): MasteryState {
  const s = loadMastery();
  if (entries.length === 0) return s;
  const calm = !opts.coverageOnly;
  for (const e of entries) {
    const bucket = s.parts[e.part];
    if (!bucket) continue;
    if (calm) bucket.solved += 1;
    const cur = bucket.streaks[e.id] ?? 0;
    if (e.correct) {
      if (calm) bucket.correct += 1;
      bucket.streaks[e.id] = Math.min(cur + 1, MASTER_STREAK);
    } else if (calm) {
      // 차분히 풀다 틀리면 정복 해제(다시 풀어야 함). 시도한 사실은 남긴다(키 유지).
      bucket.streaks[e.id] = 0;
    }
    // coverageOnly + 오답: 아무 것도 하지 않음(정복 미차감).
  }
  s.updatedAt = new Date().toISOString();
  save(s);
  return s;
}

/** 파트 버킷에서 정복(streak≥기준) 문항 수 */
function masteredCount(bucket: PartMastery): number {
  let n = 0;
  for (const v of Object.values(bucket.streaks)) if (isMastered(v)) n++;
  return n;
}

/** 전 파트 정복 문항 총수 — totals 없이 계산 가능(등급/봇 스케일링용) */
export function masteredTotalOf(state: MasteryState = loadMastery()): number {
  return MASTERY_PARTS.reduce((n, p) => n + masteredCount(state.parts[p]), 0);
}

/** 특정 파트에서 정복 완료(streak≥기준)한 문항 ID 집합 — 정복 드릴에서 제외용 */
export function masteredIdSet(
  part: MasteryPart,
  state: MasteryState = loadMastery(),
): Set<string> {
  const out = new Set<string>();
  const bucket = state.parts[part];
  if (!bucket) return out;
  for (const [id, v] of Object.entries(bucket.streaks)) {
    if (isMastered(v)) out.add(id);
  }
  return out;
}

/** 특정 파트에서 시도했지만 아직 정복 못한(streak 0~1) 문항 ID 집합 — 복습 대기 */
export function unmasteredIdSet(
  part: MasteryPart,
  state: MasteryState = loadMastery(),
): Set<string> {
  const out = new Set<string>();
  const bucket = state.parts[part];
  if (!bucket) return out;
  for (const [id, v] of Object.entries(bucket.streaks)) {
    if (!isMastered(v)) out.add(id);
  }
  return out;
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
  /** 정복(streak≥기준) 문항 수 */
  mastered: number;
  /** 시도했지만 아직 정복 못한 문항 수(streak 0~1) = 복습 대기 */
  pending: number;
  /** 한 번이라도 시도한 문항 수 */
  attempted: number;
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
  /** 전체 복습 대기 문항 수 */
  pendingTotal: number;
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
    const attempted = Object.keys(b.streaks).length;
    const masteredRaw = masteredCount(b);
    const mastered = Math.min(masteredRaw, total || masteredRaw);
    // 복습 대기 = 시도했지만 미정복 (분모 초과 방지)
    const pendingRaw = Math.max(attempted - masteredRaw, 0);
    const pending = total > 0 ? Math.min(pendingRaw, total - mastered) : pendingRaw;
    const coverage = total > 0 ? Math.round((mastered / total) * 100) : 0;
    const accuracy = b.solved > 0 ? Math.round((b.correct / b.solved) * 100) : null;
    return {
      part,
      domain: partDomain(part),
      mastered,
      pending,
      attempted,
      total,
      coverage,
      accuracy,
      solved: b.solved,
      conquered: total > 0 && mastered >= total,
    };
  });

  const masteredTotal = parts.reduce((n, p) => n + p.mastered, 0);
  const pendingTotal = parts.reduce((n, p) => n + p.pending, 0);
  const grandTotal = parts.reduce((n, p) => n + p.total, 0);
  return {
    parts,
    masteredTotal,
    pendingTotal,
    grandTotal,
    overallCoverage: grandTotal > 0 ? Math.round((masteredTotal / grandTotal) * 100) : 0,
    conqueredParts: parts.filter((p) => p.conquered).length,
    remaining: Math.max(grandTotal - masteredTotal, 0),
  };
}
