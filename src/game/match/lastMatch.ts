// 마지막으로 겨룬 대결 조건(도메인·파트) 기억 — 랜딩에서 허브를 거치지 않고 바로 대결로 들어가기 위함.
// persist.ts 스타일을 따른다 — SSR 안전(typeof window 가드), 예외는 조용히 무시.

import { MATCH_DOMAINS, type MatchDomain } from "./jenny";

const KEY = "toeic-last-match-v1";

export type LastMatch = { domain: MatchDomain; part: number };

/** 최초 플레이 기본값 — RC Part 7 */
const DEFAULT: LastMatch = { domain: "rc", part: 7 };

const PARTS: Record<MatchDomain, readonly number[]> = {
  rc: [5, 6, 7],
  lc: [2, 3, 4],
};
const DEFAULT_PART: Record<MatchDomain, number> = { rc: 7, lc: 3 };

function normalize(v: Partial<LastMatch> | null | undefined): LastMatch {
  const domain: MatchDomain = v?.domain === "lc" ? "lc" : "rc";
  const part = PARTS[domain].includes(Number(v?.part))
    ? Number(v?.part)
    : DEFAULT_PART[domain];
  return { domain, part };
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

/** 대결을 시작할 때 그 조건을 기억한다. */
export function saveLastMatch(domain: MatchDomain, part: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(normalize({ domain, part })));
  } catch {
    // 저장 공간 초과 등은 무시 (부가 기능)
  }
}

/** 마지막 조건으로 바로 들어갈 랭크 대결 경로 */
export function lastMatchRoute(): string {
  const { domain, part } = loadLastMatch();
  return `${MATCH_DOMAINS[domain].route}?ranked=1&part=${part}`;
}
