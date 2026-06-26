// 유저 신원/재화(PlayerIdentity) 영속화 (localStorage).
// progress.ts 스타일을 그대로 따른다 — SSR 안전(typeof window 가드), 예외는 조용히 무시.

import type { PlayerIdentity } from "./types";

const KEY = "toeic-match-identity-v1";

/** 기본 닉네임 */
const DEFAULT_NAME = "PLAYER";

/** P#### (4자리) 형태의 랜덤 플레이어 ID 생성 */
function randomPlayerId(): string {
  const n = Math.floor(1000 + Math.random() * 9000); // 1000~9999
  return `P${n}`;
}

/** 새 기본 신원 (최초 접속 시 1회 발급) */
function freshIdentity(): PlayerIdentity {
  return {
    name: DEFAULT_NAME,
    playerId: randomPlayerId(),
    credits: 0,
    avatarId: "default",
  };
}

function save(id: PlayerIdentity) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(id));
  } catch {
    // 저장 공간 초과 등은 무시 (부가 기능)
  }
}

/**
 * 저장된 신원을 불러온다. 없거나 손상됐으면 기본 신원을 만들어 저장 후 반환.
 * 서버(SSR)에서는 영속 없이 임시 기본값을 반환한다.
 */
export function loadIdentity(): PlayerIdentity {
  if (typeof window === "undefined") return freshIdentity();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const fresh = freshIdentity();
      save(fresh);
      return fresh;
    }
    const p = JSON.parse(raw) as Partial<PlayerIdentity>;
    // 필드 보정 — 일부만 있어도 정상화해서 돌려준다
    const id: PlayerIdentity = {
      name: typeof p.name === "string" && p.name.length > 0 ? p.name : DEFAULT_NAME,
      playerId:
        typeof p.playerId === "string" && p.playerId.length > 0
          ? p.playerId
          : randomPlayerId(),
      credits: typeof p.credits === "number" ? p.credits : 0,
      avatarId: typeof p.avatarId === "string" ? p.avatarId : "default",
    };
    return id;
  } catch {
    const fresh = freshIdentity();
    save(fresh);
    return fresh;
  }
}

/** 신원을 통째로 저장 */
export function saveIdentity(id: PlayerIdentity): void {
  save(id);
}

/** 크레딧을 n만큼 가감하고(음수면 차감) 저장한 뒤 갱신된 신원을 반환 */
export function addCredits(n: number): PlayerIdentity {
  const cur = loadIdentity();
  const next: PlayerIdentity = { ...cur, credits: cur.credits + n };
  save(next);
  return next;
}
