/**
 * 만점 투자자산운용사 (CIM — Certified Investment Manager) 도메인 단일 소스.
 *
 * 만점토익(src/game/*)·만점 아이엘츠(src/game/ielts.ts)와 **완전히 분리된 사일로**다.
 * 콘텐츠: content/cim/*.md — 문제집 원문 마크다운 그대로. 로더: src/lib/cim-loader.ts.
 *
 * ── 이 모듈의 설계 원칙 ──────────────────────────────────────
 * 이 시험은 "많이 푸는 것"이 아니라 **같은 문제를 잊기 직전에 다시 만나는 것**으로 붙는다.
 * 1,000문제를 한 바퀴 돌면 첫 200문제는 이미 기억에서 사라져 있다.
 * 그래서 이 서비스의 중심은 진도율이 아니라 **간격반복(Leitner)**이다.
 *   틀린 문제 → 즉시 다시 / 맞힌 문제 → 1·3·7·16·35일 뒤 복습
 *
 * 그리고 이 시험의 합격은 총점 하나로 결정되지 않는다.
 *   합격 = 총점 70% 이상  AND  과목별 40% 이상 (하나라도 미달이면 과락 → 불합격)
 * 총점이 아무리 높아도 한 과목이 39%면 떨어진다. 그래서 화면이 말하는 지표는
 * "몇 문제 풀었다"가 아니라 **"지금 시험 보면 붙는가"**여야 한다.
 * ──────────────────────────────────────────────────────────
 */

/** 실제 시험의 3과목 */
export type CimSubject = 1 | 2 | 3;
export const CIM_SUBJECTS: readonly CimSubject[] = [1, 2, 3];

export interface CimSubjectMeta {
  no: CimSubject;
  /** 정식 과목명 */
  name: string;
  /** 좁은 화면용 축약 */
  short: string;
  /** 실제 시험 출제 문항 수 (총 100문항) */
  examCount: number;
}

export const CIM_SUBJECT_META: Record<CimSubject, CimSubjectMeta> = {
  1: { no: 1, name: "금융상품 및 세제", short: "금융상품·세제", examCount: 20 },
  2: {
    no: 2,
    name: "투자운용 및 전략 II / 투자분석",
    short: "투자운용·분석",
    examCount: 30,
  },
  3: {
    no: 3,
    name: "직무윤리 및 법규 / 투자운용 및 전략 I",
    short: "직무윤리·법규",
    examCount: 50,
  },
};

/** 실제 시험 총 문항 수 */
export const CIM_EXAM_TOTAL = 100;
/** 합격선 — 총점의 70% 이상 */
export const CIM_PASS_RATE = 0.7;
/** 과락선 — 과목별 40% 미만이면 총점과 무관하게 불합격 */
export const CIM_FAIL_FLOOR = 0.4;

/* ────────────────────────────────────────────────────────────
 * 콘텐츠
 * ──────────────────────────────────────────────────────────── */

export interface CimQuestion {
  /** `<setId>-q<번호>` — 파일이 그대로면 영구 안정(복습 스케줄의 키) */
  id: string;
  /** 문제집 통산 번호 (Q01 → 1) */
  no: number;
  setId: string;
  subject: CimSubject;
  /** 문두 */
  prompt: string;
  /** 문두와 선지 사이의 보조 자료(ㄱㄴㄷ 보기, 조건, 수치 등). 없으면 빈 배열 */
  stimulus: string[];
  /** 정확히 4개 (①②③④) */
  choices: string[];
  /** 0~3 */
  answerIndex: number;
  explanation: string;
}

/** 집계에 필요한 최소 정보 — 홈 화면은 문항 본문 없이 이것만 받는다 */
export type CimQuestionRef = Pick<CimQuestion, "id" | "subject">;

export interface CimSet {
  /** `set01` 등 — 파일 제목/이름에서 유도 */
  id: string;
  /** 화면 표시용 제목 */
  title: string;
  /** 원본 파일명 */
  file: string;
  questions: CimQuestion[];
}

/** 목록 화면용 경량 요약 (문항 내용 제외) */
export interface CimSetSummary {
  id: string;
  title: string;
  questions: number;
  /** 과목별 문항 수 */
  bySubject: Record<CimSubject, number>;
  /** 통산 번호 범위 */
  from: number;
  to: number;
}

export function summarizeSet(set: CimSet): CimSetSummary {
  const bySubject: Record<CimSubject, number> = { 1: 0, 2: 0, 3: 0 };
  for (const q of set.questions) bySubject[q.subject] += 1;
  const nos = set.questions.map((q) => q.no);
  return {
    id: set.id,
    title: set.title,
    questions: set.questions.length,
    bySubject,
    from: nos.length ? Math.min(...nos) : 0,
    to: nos.length ? Math.max(...nos) : 0,
  };
}

/* ────────────────────────────────────────────────────────────
 * 스테이지 — 5문항 한 판
 *
 * 1,000문제를 하나의 긴 목록으로 두면 "어디까지 했더라"가 사라지고,
 * 한 번 앉을 때 어디서 끊어야 할지도 알 수 없다.
 * 5문항으로 끊으면 한 판이 2~3분이라 **틈날 때 한 판**이 가능해지고,
 * 판마다 5/5 만점이라는 또렷한 목표가 생긴다.
 * ──────────────────────────────────────────────────────────── */

/** 한 스테이지 문항 수. 100문제 = 25스테이지, 1,000문제 = 200스테이지 */
export const CIM_STAGE_SIZE = 5;

export interface CimStage {
  /** 1부터 */
  no: number;
  questions: CimQuestion[];
  /** 통산 번호 범위 */
  from: number;
  to: number;
  /** 이 판이 걸친 과목 (보통 1개, 경계에선 2개) */
  subjects: CimSubject[];
}

/** 문항을 통산 번호 순으로 5개씩 끊는다 (마지막 판은 5개 미만일 수 있다) */
export function buildStages(questions: readonly CimQuestion[]): CimStage[] {
  const sorted = questions.slice().sort((a, b) => a.no - b.no);
  const stages: CimStage[] = [];
  for (let i = 0; i < sorted.length; i += CIM_STAGE_SIZE) {
    const chunk = sorted.slice(i, i + CIM_STAGE_SIZE);
    const subjects: CimSubject[] = [];
    for (const q of chunk) if (!subjects.includes(q.subject)) subjects.push(q.subject);
    stages.push({
      no: stages.length + 1,
      questions: chunk,
      from: chunk[0].no,
      to: chunk[chunk.length - 1].no,
      subjects,
    });
  }
  return stages;
}

/* ────────────────────────────────────────────────────────────
 * 간격반복 (Leitner) — 진도 localStorage
 *
 * 키에 `toeic-` 접두사를 유지하는 이유: backup.ts가 `toeic-*` 항목만 스냅샷한다.
 * 접두사를 바꾸면 이 서비스의 학습 기록만 백업에서 빠진다.
 * ──────────────────────────────────────────────────────────── */

const KEY = "toeic-cim-v1";
const DAY = 24 * 60 * 60 * 1000;

/** 박스(0~5) → 다음 복습까지 일수. 0 = 즉시(오답은 이번 세션 안에 다시 나온다) */
export const CIM_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35] as const;
export const CIM_MAX_BOX = CIM_INTERVAL_DAYS.length - 1; // 5
/** 이 박스 이상이면 "숙달" — 간격 16일 이상 버틴 문항 */
export const CIM_MASTER_BOX = 4;

export interface CimCard {
  /** Leitner 박스 0~5 */
  box: number;
  /** 다음 복습 예정 시각(ms epoch) */
  due: number;
  /** 누적 노출 */
  seen: number;
  /** 누적 정답 */
  correct: number;
  /** 마지막 시도 정답 여부 */
  last: boolean;
  /** 마지막 시도 시각 */
  at: number;
  /**
   * 마지막에 고른 선지(0~3). 오답노트에서 "내가 뭐라고 답했는지"를 보여주기 위한 것.
   * 이 필드가 생기기 전 저장본에는 없다 → 없으면 표시를 생략한다.
   */
  pick?: number;
}

/** 스테이지 성적 — 최고 점수만 남긴다(재도전으로 점수가 깎이지 않게) */
export interface CimStageRecord {
  /** 이 판에서 받은 최고 정답 수 */
  best: number;
  /** 도전 횟수 */
  plays: number;
  /** 마지막 도전 시각 */
  at: number;
}

export interface CimState {
  /** 문항 id → 카드 */
  cards: Record<string, CimCard>;
  /** 스테이지 번호 → 성적 */
  stages: Record<string, CimStageRecord>;
  /** 누적 세션 수 */
  sessions: number;
  /** 마지막 학습 시각 */
  lastAt: number;
}

function emptyState(): CimState {
  return { cards: {}, stages: {}, sessions: 0, lastAt: 0 };
}

function clampBox(v: unknown): number {
  const n = typeof v === "number" && Number.isFinite(v) ? Math.floor(v) : 0;
  return Math.min(CIM_MAX_BOX, Math.max(0, n));
}

export function loadCim(): CimState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const p = JSON.parse(raw) as Partial<CimState>;
    if (!p || typeof p !== "object") return emptyState();
    const cards: Record<string, CimCard> = {};
    const src = (p.cards ?? {}) as Record<string, unknown>;
    for (const [id, v] of Object.entries(src)) {
      const c = v as Partial<CimCard>;
      if (!c || typeof c !== "object") continue;
      cards[id] = {
        box: clampBox(c.box),
        due: typeof c.due === "number" ? c.due : 0,
        seen: typeof c.seen === "number" ? c.seen : 0,
        correct: typeof c.correct === "number" ? c.correct : 0,
        last: c.last === true,
        at: typeof c.at === "number" ? c.at : 0,
        ...(typeof c.pick === "number" && c.pick >= 0 && c.pick <= 3 ? { pick: c.pick } : {}),
      };
    }
    // 스테이지 기록이 없던 시절의 저장본도 그대로 읽힌다(빈 객체로 시작)
    const stages: Record<string, CimStageRecord> = {};
    const srcStages = (p.stages ?? {}) as Record<string, unknown>;
    for (const [no, v] of Object.entries(srcStages)) {
      const r = v as Partial<CimStageRecord>;
      if (!r || typeof r !== "object") continue;
      stages[no] = {
        best: typeof r.best === "number" ? r.best : 0,
        plays: typeof r.plays === "number" ? r.plays : 0,
        at: typeof r.at === "number" ? r.at : 0,
      };
    }

    return {
      cards,
      stages,
      sessions: typeof p.sessions === "number" ? p.sessions : 0,
      lastAt: typeof p.lastAt === "number" ? p.lastAt : 0,
    };
  } catch {
    return emptyState();
  }
}

export function saveCim(state: CimState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // 저장 실패해도 이번 세션 진행은 유지된다
  }
}

export function resetCim() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/**
 * 한 문항 채점 결과를 스케줄에 반영한다.
 *   정답 → 박스 +1, 다음 간격만큼 뒤로
 *   오답 → 박스 0, 즉시 복습 대상 (이번 세션 안에 다시 나온다)
 */
export function gradeCard(
  prev: CimCard | undefined,
  ok: boolean,
  now = Date.now(),
  pick?: number | null
): CimCard {
  const base: CimCard = prev ?? { box: 0, due: 0, seen: 0, correct: 0, last: false, at: 0 };
  const box = ok ? Math.min(CIM_MAX_BOX, base.box + 1) : 0;
  const keptPick = typeof pick === "number" ? pick : base.pick;
  return {
    box,
    due: now + CIM_INTERVAL_DAYS[box] * DAY,
    seen: base.seen + 1,
    correct: base.correct + (ok ? 1 : 0),
    last: ok,
    at: now,
    ...(typeof keptPick === "number" ? { pick: keptPick } : {}),
  };
}

export interface CimAnswer {
  questionId: string;
  ok: boolean;
}

/**
 * 한 문항을 채점 즉시 저장한다.
 * 세션 끝에 몰아 저장하지 않는 이유: 중간에 화면을 닫아도 푼 만큼은 남아야 하기 때문이다.
 */
export function answerCim(
  questionId: string,
  ok: boolean,
  pick?: number | null,
  now = Date.now()
): CimState {
  const state = loadCim();
  state.cards[questionId] = gradeCard(state.cards[questionId], ok, now, pick);
  state.lastAt = now;
  saveCim(state);
  return state;
}

/** 세션 시작을 기록한다 (누적 세션 수). */
export function startCimSession(now = Date.now()): CimState {
  const state = loadCim();
  state.sessions += 1;
  state.lastAt = now;
  saveCim(state);
  return state;
}

/** 여러 문항을 한 번에 반영 (일괄 처리용) */
export function recordCim(answers: CimAnswer[], now = Date.now()): CimState {
  const state = loadCim();
  for (const a of answers) {
    state.cards[a.questionId] = gradeCard(state.cards[a.questionId], a.ok, now);
  }
  if (answers.length > 0) state.lastAt = now;
  saveCim(state);
  return state;
}

/** 한 판 결과를 기록한다 (최고 점수 갱신) */
export function recordStage(stageNo: number, correct: number, now = Date.now()): CimState {
  const state = loadCim();
  const key = String(stageNo);
  const prev = state.stages[key];
  state.stages[key] = {
    best: Math.max(prev?.best ?? 0, correct),
    plays: (prev?.plays ?? 0) + 1,
    at: now,
  };
  state.lastAt = now;
  saveCim(state);
  return state;
}

/** 목록 화면용 경량 스테이지 (문항 본문 제외) */
export interface CimStageShell {
  no: number;
  from: number;
  to: number;
  subjects: CimSubject[];
  total: number;
  questionIds: string[];
}

export function stageShell(st: CimStage): CimStageShell {
  return {
    no: st.no,
    from: st.from,
    to: st.to,
    subjects: st.subjects,
    total: st.questions.length,
    questionIds: st.questions.map((q) => q.id),
  };
}

export interface CimStageView {
  no: number;
  from: number;
  to: number;
  subjects: CimSubject[];
  /** 이 판의 문항 수 (보통 5) */
  total: number;
  /** 최고 정답 수 */
  best: number;
  plays: number;
  /** 만점을 낸 판 */
  cleared: boolean;
  /** 한 번이라도 도전한 판 */
  touched: boolean;
  /** 이 판에서 오늘 복습 예정인 문항 수 */
  due: number;
}

export function buildStageViews(
  state: CimState,
  stages: readonly CimStageShell[],
  now = Date.now()
): CimStageView[] {
  return stages.map((st) => {
    const r = state.stages[String(st.no)];
    let due = 0;
    for (const id of st.questionIds) {
      const c = state.cards[id];
      if (c && c.seen > 0 && c.due <= now) due += 1;
    }
    const total = st.total;
    return {
      no: st.no,
      from: st.from,
      to: st.to,
      subjects: st.subjects,
      total,
      best: r?.best ?? 0,
      plays: r?.plays ?? 0,
      cleared: (r?.best ?? 0) >= total,
      touched: (r?.plays ?? 0) > 0,
      due,
    };
  });
}

/** 다음에 할 판 — 아직 만점을 못 낸 첫 판 (전부 클리어면 null) */
export function nextStageNo(views: readonly CimStageView[]): number | null {
  return views.find((v) => !v.cleared)?.no ?? null;
}

/* ────────────────────────────────────────────────────────────
 * 집계 — "지금 시험 보면 붙는가"
 * ──────────────────────────────────────────────────────────── */

export interface CimSubjectView {
  no: CimSubject;
  meta: CimSubjectMeta;
  /** 문제은행의 이 과목 총 문항 수 */
  total: number;
  /** 한 번이라도 푼 고유 문항 수 */
  studied: number;
  /** 박스 ≥ CIM_MASTER_BOX */
  mastered: number;
  /** 오늘 복습 예정(연체 포함) */
  due: number;
  /** 누적 노출/정답 */
  seen: number;
  correct: number;
  /** 누적 정답률 0~1 (푼 적 없으면 null) */
  accuracy: number | null;
  /** 과락 위험 — 정답률이 40% 미만 */
  atRisk: boolean;
  /** 학습 커버리지 0~1 */
  coverage: number;
}

export interface CimView {
  subjects: CimSubjectView[];
  /** 문제은행 총 문항 */
  total: number;
  studied: number;
  mastered: number;
  /** 오늘 복습 예정 총합 */
  due: number;
  /** 아직 한 번도 안 푼 문항 */
  fresh: number;
  /** 과목 배점을 반영한 예상 점수 0~100 (한 과목도 안 풀었으면 null) */
  predictedScore: number | null;
  /** 예상 합격 여부 — 총점 70 이상 AND 과목별 40% 이상 */
  predictedPass: boolean;
  /** 과락 위험 과목 */
  failing: CimSubject[];
  /** 예측 신뢰도 0~1 = 전체 학습 커버리지 */
  confidence: number;
  sessions: number;
  lastAt: number;
}

/**
 * 예상 점수 = Σ(과목 누적 정답률 × 과목 배점).
 * 아직 안 푼 과목은 정답률을 알 수 없으므로 **0점으로 깔지 않고** 배점에서 제외한 뒤
 * 나머지 배점으로 100점 환산한다(표본 없는 과목을 0점 처리하면 초반에 늘 "불합격"만 뜬다).
 * 대신 그 상태의 예측은 신뢰할 수 없으므로 `confidence`(커버리지)를 함께 노출한다.
 */
export function buildCimView(
  state: CimState,
  questions: readonly CimQuestionRef[],
  now = Date.now()
): CimView {
  const subjects: CimSubjectView[] = CIM_SUBJECTS.map((no) => {
    const qs = questions.filter((q) => q.subject === no);
    let studied = 0;
    let mastered = 0;
    let due = 0;
    let seen = 0;
    let correct = 0;
    for (const q of qs) {
      const c = state.cards[q.id];
      if (!c || c.seen === 0) continue;
      studied += 1;
      seen += c.seen;
      correct += c.correct;
      if (c.box >= CIM_MASTER_BOX) mastered += 1;
      if (c.due <= now) due += 1;
    }
    const accuracy = seen > 0 ? correct / seen : null;
    return {
      no,
      meta: CIM_SUBJECT_META[no],
      total: qs.length,
      studied,
      mastered,
      due,
      seen,
      correct,
      accuracy,
      atRisk: accuracy !== null && accuracy < CIM_FAIL_FLOOR,
      coverage: qs.length > 0 ? studied / qs.length : 0,
    };
  });

  const graded = subjects.filter((s) => s.accuracy !== null);
  const weight = graded.reduce((n, s) => n + s.meta.examCount, 0);
  const predictedScore =
    weight > 0
      ? graded.reduce((n, s) => n + (s.accuracy as number) * s.meta.examCount, 0) *
        (CIM_EXAM_TOTAL / weight)
      : null;

  const failing = subjects.filter((s) => s.atRisk).map((s) => s.no);
  const total = questions.length;
  const studied = subjects.reduce((n, s) => n + s.studied, 0);

  return {
    subjects,
    total,
    studied,
    mastered: subjects.reduce((n, s) => n + s.mastered, 0),
    due: subjects.reduce((n, s) => n + s.due, 0),
    fresh: total - studied,
    predictedScore,
    predictedPass:
      predictedScore !== null &&
      predictedScore >= CIM_PASS_RATE * CIM_EXAM_TOTAL &&
      failing.length === 0 &&
      graded.length === CIM_SUBJECTS.length,
    failing,
    confidence: total > 0 ? studied / total : 0,
    sessions: state.sessions,
    lastAt: state.lastAt,
  };
}

/* ────────────────────────────────────────────────────────────
 * 출제 큐
 * ──────────────────────────────────────────────────────────── */

export type CimMode = "review" | "fresh" | "wrong" | "all";

export const CIM_MODE_LABEL: Record<CimMode, { label: string; hint: string }> = {
  review: { label: "오늘의 복습", hint: "복습 예정일이 된 문항부터" },
  fresh: { label: "새 문제", hint: "아직 안 푼 문항" },
  wrong: { label: "틀린 문제만", hint: "마지막 시도에서 틀린 문항" },
  all: { label: "전체 순환", hint: "복습 예정 → 새 문제 → 나머지" },
};

/** 한 세션 기본 문항 수 */
export const CIM_SESSION_SIZE = 20;

export interface QueueOptions {
  mode: CimMode;
  /** 특정 과목만 (미지정 = 전 과목) */
  subject?: CimSubject | null;
  size?: number;
  now?: number;
  /** 테스트용 셔플 주입 */
  shuffle?: <T>(arr: T[]) => T[];
}

function defaultShuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * 학습 큐를 만든다.
 *
 * 우선순위는 언제나 **복습 예정 → 새 문제 → 나머지(예정일이 가장 가까운 순)**다.
 * 1,000문제를 순서대로 도는 것보다, 잊기 직전의 문항을 먼저 만나는 편이 같은 시간에 더 남는다.
 */
export function buildQueue(
  state: CimState,
  questions: CimQuestion[],
  opts: QueueOptions
): CimQuestion[] {
  const now = opts.now ?? Date.now();
  const size = opts.size ?? CIM_SESSION_SIZE;
  const shuffle = opts.shuffle ?? defaultShuffle;

  const pool = opts.subject ? questions.filter((q) => q.subject === opts.subject) : questions;

  const card = (q: CimQuestion) => state.cards[q.id];
  const isFresh = (q: CimQuestion) => {
    const c = card(q);
    return !c || c.seen === 0;
  };
  const isDue = (q: CimQuestion) => {
    const c = card(q);
    return !!c && c.seen > 0 && c.due <= now;
  };
  const isWrong = (q: CimQuestion) => {
    const c = card(q);
    return !!c && c.seen > 0 && !c.last;
  };

  let picked: CimQuestion[];
  switch (opts.mode) {
    case "review":
      picked = shuffle(pool.filter(isDue));
      break;
    case "fresh":
      picked = pool.filter(isFresh);
      break;
    case "wrong":
      picked = shuffle(pool.filter(isWrong));
      break;
    default: {
      const due = shuffle(pool.filter(isDue));
      const fresh = pool.filter(isFresh);
      const rest = pool
        .filter((q) => !isDue(q) && !isFresh(q))
        .sort((a, b) => (card(a)?.due ?? 0) - (card(b)?.due ?? 0));
      picked = [...due, ...fresh, ...rest];
      break;
    }
  }

  // 요청한 모드에 문항이 없으면 빈 배열을 돌려준다 — 화면이 "왜 없는지"를 설명한다.
  return picked.slice(0, size);
}

/* ────────────────────────────────────────────────────────────
 * 오답노트
 *
 * 틀린 문제를 "다시 푸는 것"과 "복기하는 것"은 다른 일이다.
 * 다시 풀면 또 찍어서 맞힐 수 있지만, 해설을 나란히 놓고 읽으면
 * 왜 틀렸는지가 남는다. 그래서 이 화면은 채점을 하지 않는다 — 읽기 전용이다.
 *
 * 한 번이라도 틀린 문항은 **맞히기 시작한 뒤에도 노트에 남는다**.
 * 지운 오답은 다시 볼 수 없고, 이 시험에서 한 번 틀린 자리는 시험장에서 또 틀리기 때문이다.
 * 대신 `settled`(지금은 맞히는 상태)로 갈라 보여준다.
 * ──────────────────────────────────────────────────────────── */

export interface CimNote {
  q: CimQuestion;
  /** 누적 오답 횟수 (= seen - correct) */
  wrong: number;
  seen: number;
  /** 마지막 시도를 맞혔다 — 일단 잡은 오답 */
  settled: boolean;
  box: number;
  due: number;
  /** 복습 예정일이 지났다 */
  dueNow: boolean;
  /** 마지막에 고른 선지 (기록 이전 저장본이면 null) */
  pick: number | null;
  /** 마지막 시도 시각 */
  at: number;
}

export type CimNoteSort = "wrong" | "recent" | "no";

export interface NoteOptions {
  subject?: CimSubject | null;
  /** true면 아직 못 잡은 오답(마지막 시도 오답)만 */
  onlyOpen?: boolean;
  sort?: CimNoteSort;
  now?: number;
}

/** 한 번이라도 틀린 문항을 노트 항목으로 만든다 */
export function buildNotes(
  state: CimState,
  questions: readonly CimQuestion[],
  opts: NoteOptions = {}
): CimNote[] {
  const now = opts.now ?? Date.now();
  const sort = opts.sort ?? "wrong";

  const notes: CimNote[] = [];
  for (const q of questions) {
    if (opts.subject && q.subject !== opts.subject) continue;
    const c = state.cards[q.id];
    if (!c || c.seen === 0) continue;
    const wrong = c.seen - c.correct;
    if (wrong <= 0) continue; // 한 번도 안 틀린 문항은 노트에 없다
    if (opts.onlyOpen && c.last) continue;
    notes.push({
      q,
      wrong,
      seen: c.seen,
      settled: c.last,
      box: c.box,
      due: c.due,
      dueNow: c.due <= now,
      pick: typeof c.pick === "number" ? c.pick : null,
      at: c.at,
    });
  }

  switch (sort) {
    case "recent":
      notes.sort((a, b) => b.at - a.at);
      break;
    case "no":
      notes.sort((a, b) => a.q.no - b.q.no);
      break;
    default:
      // 아직 못 잡은 오답이 위 → 많이 틀린 순 → 최근 순
      notes.sort(
        (a, b) =>
          Number(a.settled) - Number(b.settled) || b.wrong - a.wrong || b.at - a.at
      );
      break;
  }
  return notes;
}

export interface CimNoteCounts {
  /** 한 번이라도 틀린 문항 수 */
  total: number;
  /** 그중 마지막 시도도 틀린 문항 */
  open: number;
  /** 틀렸다가 지금은 맞히는 문항 */
  settled: number;
  /** 과목별 총합 */
  bySubject: Record<CimSubject, number>;
}

export function noteCounts(
  state: CimState,
  questions: readonly CimQuestionRef[]
): CimNoteCounts {
  const bySubject: Record<CimSubject, number> = { 1: 0, 2: 0, 3: 0 };
  let total = 0;
  let open = 0;
  for (const q of questions) {
    const c = state.cards[q.id];
    if (!c || c.seen === 0 || c.seen - c.correct <= 0) continue;
    total += 1;
    bySubject[q.subject] += 1;
    if (!c.last) open += 1;
  }
  return { total, open, settled: total - open, bySubject };
}

/** 모드별로 지금 뽑을 수 있는 문항 수 (버튼에 개수를 띄우기 위해) */
export function modeCounts(
  state: CimState,
  questions: readonly CimQuestionRef[],
  subject?: CimSubject | null,
  now = Date.now()
): Record<CimMode, number> {
  const pool = subject ? questions.filter((q) => q.subject === subject) : questions;
  let review = 0;
  let fresh = 0;
  let wrong = 0;
  for (const q of pool) {
    const c = state.cards[q.id];
    if (!c || c.seen === 0) {
      fresh += 1;
      continue;
    }
    if (c.due <= now) review += 1;
    if (!c.last) wrong += 1;
  }
  return { review, fresh, wrong, all: pool.length };
}
