/**
 * 레벨 진단(미니 모의고사) 도메인 — LC 12 + RC 18 = 30문항 고정 테스트.
 * 콘텐츠: content/diagnostic/*.md (LC=ListeningSet, RC=PassageSet 형식).
 * 로더: src/lib/diagnostic-loader.ts · API: /api/diagnostic.
 * 실전 토익처럼 전 문항을 푼 뒤 예상 점수(LC/RC 각 5~495, 총 10~990)와 취약 파트를 진단.
 */

import type { ListeningSet } from "@/game/listening";
import type { PassageSet } from "@/game/types";

export interface DiagnosticTest {
  lc: ListeningSet[]; // part 2 → 3 → 4
  rc: PassageSet[]; // part 5 → 6 → 7
}

/** 진단 러너가 소비하는 평탄화된 한 문항 */
export interface DiagQuestion {
  key: string; // 고유 (answers 맵 키)
  part: number; // 2..7
  domain: "LC" | "RC";
  category: string;
}

/** correct/total → 토익 환산점수 추정 (5 단위, 5~495) */
export function scaledScore(correct: number, total: number): number {
  if (total <= 0) return 5;
  const acc = correct / total;
  return Math.max(5, Math.min(495, Math.round((acc * 495) / 5) * 5));
}

export interface PartStat {
  part: number;
  correct: number;
  total: number;
}

export interface DiagnosticResult {
  lcCorrect: number;
  lcTotal: number;
  rcCorrect: number;
  rcTotal: number;
  lcScore: number;
  rcScore: number;
  totalScore: number;
  parts: PartStat[];
  levelLabel: string;
  levelTone: "top" | "high" | "mid" | "low";
  takenAt: number;
}

const PART_DOMAIN: Record<number, "LC" | "RC"> = {
  2: "LC",
  3: "LC",
  4: "LC",
  5: "RC",
  6: "RC",
  7: "RC",
};

export function domainOfPart(part: number): "LC" | "RC" {
  return PART_DOMAIN[part] ?? "RC";
}

export const PART_LABEL: Record<number, string> = {
  2: "Part 2 · 응답 선택",
  3: "Part 3 · 짧은 대화",
  4: "Part 4 · 짧은 담화",
  5: "Part 5 · 단문 공란",
  6: "Part 6 · 장문 공란",
  7: "Part 7 · 독해",
};

/** 취약 파트 → 추천 학습 진입 */
export function partStudyLink(part: number): { href: string; label: string } {
  if (part <= 4) return { href: `/listening?part=${part}`, label: `Part ${part} 리스닝 연습` };
  if (part === 5) return { href: "/game?part=5", label: "Part 5 문법 드릴" };
  if (part === 6) return { href: "/game?part=6", label: "Part 6 장문 공란" };
  return { href: "/game?part=7", label: "Part 7 독해 유형별" };
}

function levelOf(total: number): { label: string; tone: DiagnosticResult["levelTone"] } {
  if (total >= 900) return { label: "최상위권 · 990 도전 구간", tone: "top" };
  if (total >= 800) return { label: "상급 · 목표 900 사정권", tone: "high" };
  if (total >= 700) return { label: "중상급 · 목표 800 사정권", tone: "high" };
  if (total >= 550) return { label: "중급 · 목표 700 구간", tone: "mid" };
  if (total >= 400) return { label: "초중급 · 기초 다지기", tone: "mid" };
  return { label: "기초 · 워밍업부터 차근차근", tone: "low" };
}

/**
 * 정답 맵(key→선택 index)과 테스트를 받아 진단 결과 계산.
 */
export function scoreDiagnostic(
  test: DiagnosticTest,
  answers: Record<string, number | null>,
): DiagnosticResult {
  const partCorrect: Record<number, number> = {};
  const partTotal: Record<number, number> = {};

  const tally = (part: number, key: string, answerIndex: number) => {
    partTotal[part] = (partTotal[part] ?? 0) + 1;
    if (answers[key] === answerIndex) partCorrect[part] = (partCorrect[part] ?? 0) + 1;
  };

  for (const set of test.lc) {
    if (set.part === 2) {
      for (const it of set.items ?? []) tally(2, it.id, it.answerIndex);
    } else {
      for (const q of set.questions ?? []) tally(set.part, q.id, q.answerIndex);
    }
  }
  for (const set of test.rc) {
    const part = set.part ?? 7;
    for (const q of set.questions) tally(part, q.id, q.answerIndex);
  }

  const parts: PartStat[] = [2, 3, 4, 5, 6, 7]
    .filter((p) => (partTotal[p] ?? 0) > 0)
    .map((p) => ({ part: p, correct: partCorrect[p] ?? 0, total: partTotal[p] ?? 0 }));

  const sum = (dom: "LC" | "RC", pick: "correct" | "total") =>
    parts.filter((s) => domainOfPart(s.part) === dom).reduce((n, s) => n + s[pick], 0);

  const lcCorrect = sum("LC", "correct");
  const lcTotal = sum("LC", "total");
  const rcCorrect = sum("RC", "correct");
  const rcTotal = sum("RC", "total");

  const lcScore = scaledScore(lcCorrect, lcTotal);
  const rcScore = scaledScore(rcCorrect, rcTotal);
  const totalScore = lcScore + rcScore;
  const lvl = levelOf(totalScore);

  return {
    lcCorrect,
    lcTotal,
    rcCorrect,
    rcTotal,
    lcScore,
    rcScore,
    totalScore,
    parts,
    levelLabel: lvl.label,
    levelTone: lvl.tone,
    takenAt: Date.now(),
  };
}

// ── 최근 결과 저장(localStorage) ─────────────────────────────
const KEY = "toeic-diagnostic-v1";

export function saveDiagnosticResult(r: DiagnosticResult) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    /* ignore */
  }
}

export function loadDiagnosticResult(): DiagnosticResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DiagnosticResult) : null;
  } catch {
    return null;
  }
}
