// 선택형 라이벌 캐릭터 — "빌류킹"과 "제니" 중 하나를 골라 메인 이미지·아바타·이름에
// 전역 반영한다. 선택값은 localStorage(toeic-character-v1)에 저장하고, 바뀌면 커스텀
// 이벤트로 화면들이 즉시 갱신된다. 스토리 대사(챕터)는 공유하되 이름만 치환한다.
"use client";

import { useEffect, useState } from "react";

export interface GameCharacter {
  id: string;
  /** 표시 이름 */
  name: string;
  /** 영문 라벨 */
  en: string;
  /** 이미지 폴백 이모지 */
  emoji: string;
  /** 테마 그라데이션 (tailwind) */
  gradient: string;
  images: { idle: string; win: string; lose: string };
  /** 소개 한 줄 */
  intro: string;
  /** 스토리 시놉시스 */
  synopsis: string;
}

export const CHARACTERS: GameCharacter[] = [
  {
    id: "billyuking",
    name: "빌류킹",
    en: "BILLYUKING",
    emoji: "👑",
    gradient: "from-rose-400 to-fuchsia-500",
    images: { idle: "/jp.png", win: "/jp.png", lose: "/jp.png" },
    intro: "실전 만점을 지키는 최종 상대. 6개 영역을 모두 정복해야 넘어설 수 있다.",
    synopsis:
      "빌류킹은 리스닝·리딩 모든 영역을 완벽히 정복한 챔피언. 6개 영역을 하나씩 만점으로 정복하며 등급을 올려, 정상에서 빌류킹을 넘어 실전 만점에 도달하세요.",
  },
  {
    id: "jenny",
    name: "제니",
    en: "JENNY",
    emoji: "🖤",
    gradient: "from-fuchsia-400 to-pink-500",
    images: { idle: "/jeny.png", win: "/jeny2.png", lose: "/jeny.png" },
    intro: "실전 만점을 지키는 최종 상대. 듣기·읽기 모두 정복해야 넘어설 수 있다.",
    synopsis:
      "제니는 리스닝·리딩 모든 영역을 완벽히 정복한 챔피언. 6개 영역을 하나씩 만점으로 정복하며 등급을 올려, 정상에서 제니를 넘어 실전 만점에 도달하세요.",
  },
];

const KEY = "toeic-character-v1";
export const CHARACTER_EVENT = "toeic-character-change";
const DEFAULT_ID = "billyuking";

export function loadCharacterId(): string {
  if (typeof window === "undefined") return DEFAULT_ID;
  try {
    const v = window.localStorage.getItem(KEY);
    return v && CHARACTERS.some((c) => c.id === v) ? v : DEFAULT_ID;
  } catch {
    return DEFAULT_ID;
  }
}

/** 현재 선택된 캐릭터 (비-React용). */
export function getCharacter(): GameCharacter {
  const id = loadCharacterId();
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}

export function saveCharacterId(id: string): void {
  if (typeof window === "undefined") return;
  if (!CHARACTERS.some((c) => c.id === id)) return;
  try {
    window.localStorage.setItem(KEY, id);
    window.dispatchEvent(new Event(CHARACTER_EVENT));
  } catch {
    // 무시
  }
}

/** 현재 캐릭터를 구독하는 훅 — 선택이 바뀌면 즉시 리렌더. SSR 기본값은 첫 캐릭터. */
export function useCharacter(): GameCharacter {
  const [c, setC] = useState<GameCharacter>(CHARACTERS[0]);
  useEffect(() => {
    setC(getCharacter());
    const h = () => setC(getCharacter());
    window.addEventListener(CHARACTER_EVENT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(CHARACTER_EVENT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return c;
}

/** 공유 스토리 대사 속 기본 이름('빌류킹')을 현재 캐릭터 이름으로 치환. */
export function withCharName(text: string, name: string): string {
  if (name === "빌류킹" || !text) return text;
  return text.split("빌류킹").join(name);
}

/** 이름 마지막 글자에 받침이 있는지 (조사 선택용). */
export function hasBatchim(s: string): boolean {
  if (!s) return false;
  const c = s.charCodeAt(s.length - 1);
  if (c < 0xac00 || c > 0xd7a3) return false; // 한글 음절 아님
  return (c - 0xac00) % 28 !== 0;
}

/** 받침 유무에 맞는 조사를 붙여 반환 (예: josa("제니","을","를") → "제니를"). */
export function josa(name: string, withBatchim: string, withoutBatchim: string): string {
  return name + (hasBatchim(name) ? withBatchim : withoutBatchim);
}
