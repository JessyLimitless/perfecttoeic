// 몸풀기(스토리 리딩) 진도 영속화 — localStorage. 연습 진도(progress.ts)와 분리된 키.
// 책별로 마지막으로 본 문장 위치(lastIndex)·누적 본 문장 수·완료 여부를 저장한다.

const KEY = "toeic-warmup-v1";

export interface WarmupBookProgress {
  /** 마지막으로 머문 문장 인덱스(0-based) — 이어보기 복원용 */
  lastIndex: number;
  /** 지금까지 "이해됐어요"로 넘긴 문장 수(중복 제외 최대 도달치) */
  seen: number;
  completed: boolean;
  updatedAt: string;
}

/** deckId → 진도 */
export type WarmupProgress = Record<string, WarmupBookProgress>;

export function loadWarmupProgress(): WarmupProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as WarmupProgress;
    return p && typeof p === "object" ? p : {};
  } catch {
    return {};
  }
}

function save(p: WarmupProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // 저장 실패는 무시 (진도는 부가 기능)
  }
}

/** 책의 특정 책 진도만 반환 (없으면 초기값) */
export function bookProgress(p: WarmupProgress, deckId: string): WarmupBookProgress {
  return p[deckId] ?? { lastIndex: 0, seen: 0, completed: false, updatedAt: "" };
}

/**
 * 문장 하나를 본 것으로 기록. index 는 방금 본(넘긴) 문장의 0-based 위치.
 * lastIndex 는 다음에 이어볼 위치(index+1, 단 total 미만으로 클램프)로 저장.
 */
export function markWarmupSeen(
  deckId: string,
  index: number,
  total: number,
): WarmupProgress {
  const p = loadWarmupProgress();
  const prev = bookProgress(p, deckId);
  const nextIndex = Math.min(index + 1, Math.max(total - 1, 0));
  const completed = prev.completed || index >= total - 1;
  p[deckId] = {
    lastIndex: completed ? prev.lastIndex : Math.max(prev.lastIndex, nextIndex),
    seen: Math.max(prev.seen, Math.min(index + 1, total)),
    completed,
    updatedAt: new Date().toISOString(),
  };
  save(p);
  return p;
}

/** 한 책 진도 초기화(처음부터) */
export function resetWarmupBook(deckId: string): WarmupProgress {
  const p = loadWarmupProgress();
  delete p[deckId];
  save(p);
  return p;
}
