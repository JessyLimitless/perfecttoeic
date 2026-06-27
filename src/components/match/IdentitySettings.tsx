"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadIdentity, saveIdentity } from "@/game/match/persist";
import { AVATAR_PRESETS } from "@/game/match/avatars";
import PlayerAvatar from "./PlayerAvatar";
import type { AvatarPresetId, PlayerIdentity } from "@/game/match/types";

const MAX_NAME = 16;

/** 대결 진입 전 닉네임·아바타 설정 카드.
 *  persist.ts(localStorage)로 저장/로드한다. 저장하면 onSaved로 상위에 신원을 알린다. */
export default function IdentitySettings({
  onSaved,
}: {
  onSaved?: (id: PlayerIdentity) => void;
}) {
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState<AvatarPresetId>("default");
  const [playerId, setPlayerId] = useState("");
  const [saved, setSaved] = useState(false);

  // 최초 마운트 시 저장된 신원 로드 (SSR 안전 — 클라이언트에서만)
  useEffect(() => {
    const id = loadIdentity();
    setName(id.name);
    setAvatarId(id.avatarId ?? "default");
    setPlayerId(id.playerId);
  }, []);

  const handleSave = () => {
    const trimmed = name.trim().slice(0, MAX_NAME);
    const finalName = trimmed.length > 0 ? trimmed : "PLAYER";
    const cur = loadIdentity();
    const next: PlayerIdentity = { ...cur, name: finalName, avatarId };
    saveIdentity(next);
    setName(finalName);
    setSaved(true);
    onSaved?.(next);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.04 }}
      className="card px-5 py-5"
    >
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
        프로필
      </p>

      <div className="flex items-center gap-4">
        <PlayerAvatar name={name || "P"} size={56} avatarId={avatarId} />
        <div className="min-w-0 flex-1">
          <label
            htmlFor="match-nickname"
            className="block text-[11px] font-semibold text-neutral-400"
          >
            닉네임
          </label>
          <input
            id="match-nickname"
            type="text"
            value={name}
            maxLength={MAX_NAME}
            onChange={(e) => setName(e.target.value)}
            placeholder="PLAYER"
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[14px] font-semibold text-neutral-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          {playerId && (
            <p className="mt-1 text-[11px] text-neutral-400">ID · {playerId}</p>
          )}
        </div>
      </div>

      {/* 아바타 프리셋 선택 */}
      <p className="mb-2 mt-4 text-[11px] font-semibold text-neutral-400">
        아바타
      </p>
      <div className="flex flex-wrap gap-2">
        {AVATAR_PRESETS.map((p) => {
          const active = p.id === avatarId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setAvatarId(p.id)}
              aria-label={p.label}
              aria-pressed={active}
              className={`rounded-2xl p-0.5 transition active:scale-95 ${
                active
                  ? "ring-2 ring-indigo-500 ring-offset-1"
                  : "ring-1 ring-neutral-200 hover:ring-indigo-300"
              }`}
            >
              <PlayerAvatar name={name || "P"} size={40} avatarId={p.id} />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className={
          "mt-4 flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-2xl px-4 py-2.5 text-[13px] font-bold text-white transition active:scale-[0.98] " +
          (saved
            ? "bg-emerald-600 hover:bg-emerald-600"
            : "bg-neutral-900 hover:bg-neutral-800")
        }
      >
        {saved ? (
          <>
            저장됨 <span aria-hidden>✓</span>
          </>
        ) : (
          "프로필 저장"
        )}
      </button>
    </motion.div>
  );
}
