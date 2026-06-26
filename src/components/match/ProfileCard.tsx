"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadIdentity } from "@/game/match/persist";
import type { AvatarPresetId, MatchPlayer } from "@/game/match/types";
import PlayerAvatar from "./PlayerAvatar";

/** 우측 프로필 카드: 아바타 + 별명 + 플레이어 ID */
export default function ProfileCard({ user }: { user: MatchPlayer }) {
  const [avatarId, setAvatarId] = useState<AvatarPresetId>("default");
  // 저장된 아바타 프리셋 로드 (MatchPlayer 계약 외 — localStorage에서 직접 읽음)
  useEffect(() => {
    setAvatarId(loadIdentity().avatarId ?? "default");
  }, [user.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col items-center gap-3 rounded-2xl bg-white/95 p-4 ring-1 ring-teal-900/10 shadow-sm"
    >
      <PlayerAvatar name={user.name} size={80} avatarId={avatarId} />
      <div className="w-full space-y-1.5 text-center">
        <p className="text-[13px] text-neutral-600">
          <span className="font-semibold text-neutral-400">별명: </span>
          <span className="font-bold text-neutral-800">{user.name}</span>
        </p>
        <p className="text-[13px] text-neutral-600">
          <span className="font-semibold text-neutral-400">플레이어 ID: </span>
          <span className="font-bold text-neutral-800">{user.playerId}</span>
        </p>
      </div>
    </motion.div>
  );
}
