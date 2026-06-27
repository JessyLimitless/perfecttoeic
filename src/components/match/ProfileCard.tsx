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
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-700/70">
        PLAYER
      </p>
      <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 p-1 ring-1 ring-teal-900/[0.06]">
        <PlayerAvatar name={user.name} size={80} avatarId={avatarId} />
      </div>
      <div className="w-full space-y-2 text-center">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-neutral-50 px-3 py-1.5 ring-1 ring-neutral-900/[0.05]">
          <span className="text-[11px] font-semibold text-neutral-400">별명</span>
          <span className="truncate text-[13px] font-bold text-neutral-800">
            {user.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-xl bg-neutral-50 px-3 py-1.5 ring-1 ring-neutral-900/[0.05]">
          <span className="text-[11px] font-semibold text-neutral-400">ID</span>
          <span className="tabnum truncate text-[13px] font-bold text-neutral-800">
            {user.playerId}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
