"use client";

import { useState } from "react";
import { getAvatarPreset } from "@/game/match/avatars";
import type { AvatarPresetId } from "@/game/match/types";

/** 플레이어 아바타.
 *  - avatarId 프리셋이 "default"가 아니면 이모지+그라디언트 버블을 그린다.
 *  - "default"(또는 미지정)면 /public/avatar.png 가 있으면 그 이미지를, 없으면 이름 이니셜 버블.
 *    (사용자가 public/avatar.png 를 넣으면 자동 교체 — 별도 코드 변경 불필요.) */
export default function PlayerAvatar({
  name,
  size = 40,
  src = "/avatar.png",
  avatarId = "default",
}: {
  name: string;
  size?: number;
  src?: string;
  avatarId?: AvatarPresetId;
}) {
  const [broken, setBroken] = useState(false);
  const preset = getAvatarPreset(avatarId);
  const initial = (name?.trim()?.[0] ?? "P").toUpperCase();

  // 이모지 프리셋 (default 외)
  if (preset.emoji) {
    return (
      <span
        className={`flex shrink-0 select-none items-center justify-center rounded-2xl bg-gradient-to-br ${preset.gradient} leading-none ring-1 ring-white/25 shadow-[0_6px_16px_-6px_rgba(56,189,248,0.7)]`}
        style={{ width: size, height: size, fontSize: size * 0.52 }}
        aria-label={name}
      >
        {preset.emoji}
      </span>
    );
  }

  // default 프리셋: 이미지 시도 → 실패 시 이니셜 버블
  if (broken) {
    return (
      <span
        className={`flex shrink-0 select-none items-center justify-center rounded-2xl bg-gradient-to-br ${preset.gradient} font-extrabold leading-none text-white ring-1 ring-white/25 shadow-[0_6px_16px_-6px_rgba(56,189,248,0.7)]`}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        aria-label={name}
      >
        {initial}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setBroken(true)}
      className="shrink-0 rounded-2xl object-cover shadow-[0_6px_16px_-6px_rgba(56,189,248,0.7)] ring-1 ring-black/5"
      style={{ width: size, height: size }}
    />
  );
}
