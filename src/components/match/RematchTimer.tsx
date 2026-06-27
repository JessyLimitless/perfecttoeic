"use client";

import { useEffect, useRef, useState } from "react";
import { REMATCH_WARN_SECONDS } from "@/game/match/types";

/** 만료 여부 — 부모도 동일 기준으로 버튼 비활성 판단에 사용 가능 */
export function isRematchExpired(deadline: number | null): boolean {
  return deadline == null || Date.now() >= deadline;
}

/**
 * 리매치 카운트다운 + 시스템 메시지(PRD §5-1)
 * - ≤ REMATCH_WARN_SECONDS: "10초 후에 REMATCH 권한이 사라집니다."
 * - 만료 후: "시간이 초과되어 REMATCH 권한이 소멸 되었습니다."
 * onExpire 는 만료 순간 1회 호출된다.
 */
export default function RematchTimer({
  deadline,
  onExpire,
}: {
  deadline: number | null;
  onExpire?: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [deadline]);

  const remainingMs = deadline == null ? 0 : deadline - now;
  const expired = deadline == null || remainingMs <= 0;
  const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
  const warning = !expired && remainingSec <= REMATCH_WARN_SECONDS;

  useEffect(() => {
    if (expired && !firedRef.current) {
      firedRef.current = true;
      onExpire?.();
    }
  }, [expired, onExpire]);

  // 남은 시간 게이지 (전체 = 1분 가정, REMATCH_WARN의 6배)
  const totalWindow = REMATCH_WARN_SECONDS * 6;
  const ratio = expired ? 0 : Math.min(1, remainingSec / totalWindow);

  return (
    <div className="space-y-1.5 text-[12px] leading-relaxed">
      {!expired && (
        <div className="flex items-center gap-2">
          <span
            className={
              "tabnum inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold " +
              (warning
                ? "bg-amber-100 text-amber-700"
                : "bg-teal-100/70 text-teal-700")
            }
          >
            <span aria-hidden>⏱</span>
            {remainingSec}s
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-900/10">
            <div
              className={
                "h-full rounded-full transition-[width] duration-300 ease-linear " +
                (warning
                  ? "bg-gradient-to-r from-amber-400 to-rose-400"
                  : "bg-gradient-to-r from-teal-400 to-emerald-400")
              }
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
        </div>
      )}
      <p className="font-mono text-[11px] text-neutral-500">
        ## REMATCH는 게임 종료 후 1분 안에만 가능합니다. ##
      </p>
      <p className="font-mono text-[11px] text-neutral-500">
        ## Review를 시작하시면 자동으로 퇴실 됩니다. ##
      </p>
      {warning && (
        <p className="font-mono text-[11px] font-bold text-amber-600">
          ## {REMATCH_WARN_SECONDS}초 후에 REMATCH 권한이 사라집니다. (남은 시간{" "}
          {remainingSec}초) ##
        </p>
      )}
      {expired && (
        <p className="font-mono text-[11px] font-bold text-rose-500">
          ## 시간이 초과되어 REMATCH 권한이 소멸 되었습니다. ##
        </p>
      )}
    </div>
  );
}
