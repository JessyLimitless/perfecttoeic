// 순서 맞추기(스토리 시퀀스) 진도 영속화 — localStorage. 읽기/암기와 분리된 키.
// 책을 10문장씩 청크(=섹션)로 나눠, 각 청크를 순서대로 맞추면 클리어로 기록한다.

const KEY = "toeic-warmup-order-v1";

export interface ChunkResult {
  cleared: boolean;
  /** 최소 실수 횟수(베스트) */
  bestMistakes: number;
  /** 최단 클리어 시간(ms) — 선택적, 없으면 undefined */
  bestTimeMs?: number;
}

export interface DeckOrder {
  /** chunkIdx → 결과 */
  chunks: Record<number, ChunkResult>;
}

/** deckId → DeckOrder */
export type OrderStore = Record<string, DeckOrder>;

export function loadOrder(): OrderStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const p = JSON.parse(raw) as OrderStore;
    return p && typeof p === "object" ? p : {};
  } catch {
    return {};
  }
}

function save(store: OrderStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // 무시
  }
}

export function deckOrder(store: OrderStore, deckId: string): DeckOrder {
  return store[deckId] ?? { chunks: {} };
}

/** 클리어한 청크 수 */
export function clearedCount(d: DeckOrder): number {
  return Object.values(d.chunks).filter((c) => c.cleared).length;
}

/** 특정 청크가 클리어됐는지 */
export function isChunkCleared(d: DeckOrder, chunkIdx: number): boolean {
  return !!d.chunks[chunkIdx]?.cleared;
}

/** 기록된 청크들 중 최단 클리어 시간(ms). 기록이 하나도 없으면 undefined */
export function bestChunkMs(d: DeckOrder): number | undefined {
  let best: number | undefined;
  for (const c of Object.values(d.chunks)) {
    if (c.bestTimeMs !== undefined && (best === undefined || c.bestTimeMs < best)) {
      best = c.bestTimeMs;
    }
  }
  return best;
}

/** ms → "m:ss" (분:초) */
export function formatOrderTime(ms: number): string {
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/** 아직 클리어하지 않은 첫 청크 인덱스(없으면 0) */
export function firstUnclearedChunk(d: DeckOrder, chunkCount: number): number {
  for (let i = 0; i < chunkCount; i++) {
    if (!isChunkCleared(d, i)) return i;
  }
  return 0;
}

/** 청크 클리어 기록(실수 최소치 유지, 최단 시간 갱신) */
export function recordChunk(
  deckId: string,
  chunkIdx: number,
  mistakes: number,
  timeMs?: number,
): OrderStore {
  const store = loadOrder();
  const d = store[deckId] ?? { chunks: {} };
  const prev = d.chunks[chunkIdx];
  const newBestTimeMs =
    timeMs !== undefined
      ? prev?.bestTimeMs !== undefined
        ? Math.min(prev.bestTimeMs, timeMs)
        : timeMs
      : prev?.bestTimeMs;
  d.chunks[chunkIdx] = {
    cleared: true,
    bestMistakes: prev ? Math.min(prev.bestMistakes, mistakes) : mistakes,
    bestTimeMs: newBestTimeMs,
  };
  store[deckId] = d;
  save(store);
  return store;
}

export function resetOrderDeck(deckId: string): OrderStore {
  const store = loadOrder();
  delete store[deckId];
  save(store);
  return store;
}
