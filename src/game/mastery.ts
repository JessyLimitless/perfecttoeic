// 파트별 "정복(Mastery)" 추적 — 6파트(LC 2·3·4 + RC 5·6·7) 통합.
//
// 정복 판정(세트 단위 · 만점 = 정복): 한 **세트(지문/묶음)를 전부 맞히면 그 세트 문항이 즉시 정복**된다.
//   - 만점 세트(그 세션에서 답한 그 세트 문항이 전부 정답) → 모든 문항 streak = MASTER_STREAK(정복 확정).
//   - 만점이 아닌 세트: 맞힌 문항 → streak 1(정복 대기, 이미 정복분은 유지) / 틀린 문항 → streak 0(복습 대기, calm만).
//   - 대결(속도전, coverageOnly): 정답률 미집계 + 만점 아니면 오답도 미차감. 대결은 세트 정보가 없어 문항을
//     각각 단독 세트로 취급(맞히면 그 문항 정복).
//   - 세트 묶음은 AnswerEntry.setId로 판정(없으면 문항을 단독 세트로). 고유 문항 기준이라 정복 수 뻥튀기 없음.
// 정복도 = 그 파트 전체 문항 중 정복(streak≥MASTER_STREAK) 고유 문항 비율(100% = 완전 정복).
// 복습 대기 = 봤지만 아직 정복 못한 문항(streak 0~1) → 마라톤에서 줄여야 할 몫.
// 정답률 = 차분히 푼 시도 중 맞은 비율(실력 지표). 셋 다 저장한다.
// 기록 지점: RC 연습(store.end) · LC 리스닝(ListeningPlayer) · 대결(match/lc-match, coverageOnly).

/** 정복 확정 sentinel(정복 시 streak를 이 값으로 세팅) */
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
  /** 이 문항이 속한 세트 ID(만점 판정 단위). 없으면 문항을 단독 세트로 취급. */
  setId?: string;
}

/**
 * 한 세션의 답변들을 누적 정복 상태에 합치고 저장한다 (기록 지점에서 배치 호출).
 * 모델 A — **세트가 만점(그 세트 문항 전부 정답)이면 그 세트 문항을 즉시 정복**한다.
 * - 만점 세트: 모든 문항 → streak = MASTER_STREAK(정복 확정).
 * - 만점이 아닌 세트: 맞힌 문항 → streak 1(정복 대기, 이미 정복분은 유지) / 틀린 문항 → streak 0(복습 대기, calm 모드만).
 * - `coverageOnly`(대결 등 속도전): 정답률(solved/correct)은 기록하지 않고, 만점이 아니면 오답도 미차감.
 *
 * 세트 묶음은 `part + (setId ?? id)`로 그룹핑한다 → 같은 세션에서 답한 같은 세트 문항이
 * 전부 정답이어야 그 세트가 만점. setId를 안 주면 문항 하나가 곧 세트(맞히면 정복).
 */
export function recordAnswers(
  entries: AnswerEntry[],
  opts: { coverageOnly?: boolean } = {},
): MasteryState {
  const s = loadMastery();
  if (entries.length === 0) return s;
  const calm = !opts.coverageOnly;

  // 1) 정답률 누적(차분한 모드만, 문항 단위)
  if (calm) {
    for (const e of entries) {
      const bucket = s.parts[e.part];
      if (!bucket) continue;
      bucket.solved += 1;
      if (e.correct) bucket.correct += 1;
    }
  }

  // 2) 세트 단위로 묶어 "만점 = 정복" 판정
  const groups = new Map<string, AnswerEntry[]>();
  for (const e of entries) {
    if (!s.parts[e.part]) continue;
    const key = `${e.part}::${e.setId ?? e.id}`;
    const arr = groups.get(key);
    if (arr) arr.push(e);
    else groups.set(key, [e]);
  }

  groups.forEach((group) => {
    const perfect = group.every((e) => e.correct);
    for (const e of group) {
      const bucket = s.parts[e.part];
      const cur = bucket.streaks[e.id] ?? 0;
      if (perfect) {
        // 만점 세트 → 정복 확정
        bucket.streaks[e.id] = MASTER_STREAK;
      } else if (e.correct) {
        // 만점 아닌 세트에서 맞힘 → 정복 대기(이미 정복분은 유지)
        bucket.streaks[e.id] = Math.max(cur, 1);
      } else if (calm) {
        // 차분히 풀다 틀림 → 정복 해제(streak 0). 시도 사실은 남긴다(키 유지).
        bucket.streaks[e.id] = 0;
      }
      // coverageOnly + 오답: 미차감(정복 유지).
    }
  });

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

/** 파트 버킷에서 틀린(streak 0) 문항 수 = 복습 대기 */
function wrongCount(bucket: PartMastery): number {
  let n = 0;
  for (const v of Object.values(bucket.streaks)) if (v === 0) n++;
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

/**
 * 특정 파트의 "복습 대기" 문항 ID 집합 = 실제로 **틀린(streak 0)** 문항만.
 * 맞혔지만 세트가 만점이 아니어서 정복 대기(streak 1)인 문항은 이미 답을 맞힌 것이므로
 * 복습(반복) 대상이 아니다 → 제외. 정복 드릴은 "틀린 문제만" 반복한다.
 */
export function unmasteredIdSet(
  part: MasteryPart,
  state: MasteryState = loadMastery(),
): Set<string> {
  const out = new Set<string>();
  const bucket = state.parts[part];
  if (!bucket) return out;
  for (const [id, v] of Object.entries(bucket.streaks)) {
    if (v === 0) out.add(id);
  }
  return out;
}

/** 특정 문항의 현재 연속 정답 수(0~MASTER_STREAK). 없으면 0. UI 완료 뱃지용. */
export function streakOf(
  part: MasteryPart,
  id: string,
  state: MasteryState = loadMastery(),
): number {
  return state.parts[part]?.streaks[id] ?? 0;
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
  /** 틀린(streak 0) 문항 수 = 복습 대기 (맞혔지만 세트 미완성인 streak 1은 제외) */
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
    // 복습 대기 = 실제로 틀린(streak 0) 문항만 (분모 초과 방지).
    // 맞혔지만 세트 미완성(streak 1)은 이미 정답이라 복습 대상이 아님 → 제외.
    const wrongRaw = wrongCount(b);
    const pending = total > 0 ? Math.min(wrongRaw, total - mastered) : wrongRaw;
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
