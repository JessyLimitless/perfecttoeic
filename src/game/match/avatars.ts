// 아바타 프리셋 정의 — 닉네임/아바타 설정 UI와 PlayerAvatar가 공유한다.
// "default"는 /public/avatar.png(있으면) 또는 이름 이니셜 버블로 폴백한다.

import type { AvatarPresetId } from "./types";

export interface AvatarPreset {
  id: AvatarPresetId;
  /** 버블 안에 표시할 이모지 (default는 비움 → 이미지/이니셜 폴백) */
  emoji: string;
  /** Tailwind 그라디언트 클래스 (from-…/to-…) */
  gradient: string;
  /** 설정 UI 접근성 라벨 */
  label: string;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "default",
    emoji: "",
    gradient: "from-indigo-500 to-sky-500",
    label: "기본",
  },
  {
    id: "rocket",
    emoji: "🚀",
    gradient: "from-violet-500 to-fuchsia-500",
    label: "로켓",
  },
  { id: "fox", emoji: "🦊", gradient: "from-orange-500 to-amber-500", label: "여우" },
  { id: "panda", emoji: "🐼", gradient: "from-slate-600 to-slate-800", label: "팬더" },
  { id: "owl", emoji: "🦉", gradient: "from-emerald-500 to-teal-500", label: "올빼미" },
  { id: "tiger", emoji: "🐯", gradient: "from-rose-500 to-red-500", label: "호랑이" },
];

const PRESET_MAP: Record<AvatarPresetId, AvatarPreset> = AVATAR_PRESETS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<AvatarPresetId, AvatarPreset>,
);

/** id로 프리셋 조회 (미상이면 default) */
export function getAvatarPreset(id?: AvatarPresetId): AvatarPreset {
  return PRESET_MAP[id ?? "default"] ?? PRESET_MAP.default;
}
