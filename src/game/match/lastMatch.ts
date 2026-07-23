// 마지막으로 겨룬 대결 조건(도메인·파트·난이도) 기억 —
// 랜딩에서 허브를 거치지 않고 바로 대결로 들어가고, 조건은 대결 화면 안에서 바꾼다.
// persist.ts 스타일을 따른다 — SSR 안전(typeof window 가드), 예외는 조용히 무시.

import { MATCH_DOMAINS, type MatchDomain } from "./jenny";
import type { Difficulty } from "../types";

const KEY = "toeic-last-match-v1";

/** "AUTO" = 내 정복 등급에 맞춰 자동(기존 랭크전 방식) */
export type MatchDifficulty = Difficulty | "AUTO";

export type LastMatch = {
  domain: MatchDomain;
  part: number;
  difficulty: MatchDifficulty;
};

const PARTS: Record<MatchDomain, readonly number[]> = {
  rc: [5, 6, 7],
  lc: [2, 3, 4],
};
const DEFAULT_PART: Record<MatchDomain, number> = { rc: 7, lc: 3 };

/** 최초 플레이 기본값 — RC Part 7 · 난이도 자동 */
const DEFAULT: LastMatch = { domain: "rc", part: 7, difficulty: "AUTO" };

/** 파트 번호로 도메인 판별 (2·3·4 = 리스닝, 5·6·7 = 리딩) */
export function domainOfPart(part: number): MatchDomain {
  return part === 2 || part === 3 || part === 4 ? "lc" : "rc";
}

function normalize(v: Partial<LastMatch> | null | undefined): LastMatch {
  const domain: MatchDomain = v?.domain === "lc" ? "lc" : "rc";
  const part = PARTS[domain].includes(Number(v?.part))
    ? Number(v?.part)
    : DEFAULT_PART[domain];
  const d = v?.difficulty;
  const difficulty: MatchDifficulty =
    d === "EASY" || d === "MEDIUM" || d === "HARD" ? d : "AUTO";
  return { domain, part, difficulty };
}

/** 마지막 대결 조건을 불러온다. 없거나 손상됐으면 기본값. */
export function loadLastMatch(): LastMatch {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return normalize(JSON.parse(raw) as Partial<LastMatch>);
  } catch {
    return DEFAULT;
  }
}

/** 대결 조건을 기억한다. 난이도를 안 넘기면 기존 저장값을 유지. */
export function saveLastMatch(
  domain: MatchDomain,
  part: number,
  difficulty?: MatchDifficulty,
): void {
  if (typeof window === "undefined") return;
  try {
    const cur = loadLastMatch();
    const next = normalize({
      domain,
      part,
      difficulty: difficulty ?? cur.difficulty,
    });
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 저장 공간 초과 등은 무시 (부가 기능)
  }
}

/** 조건(도메인·파트)으로 랭크 대결 경로를 만든다 */
export function matchRouteFor(domain: MatchDomain, part: number): string {
  return `${MATCH_DOMAINS[domain].route}?ranked=1&part=${part}`;
}

/** 마지막 조건으로 바로 들어갈 랭크 대결 경로 */
export function lastMatchRoute(): string {
  const { domain, part } = loadLastMatch();
  return matchRouteFor(domain, part);
}
