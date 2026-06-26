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

  return (
    <div className="space-y-0.5 text-[12px] leading-relaxed">
      <p className="font-mono text-neutral-500">
        ## REMATCH는 게임 종료 후 1분 안에만 가능합니다. ##
      </p>
      <p className="font-mono text-neutral-500">
        ## Review를 시작하시면 자동으로 퇴실 됩니다. ##
      </p>
      {warning && (
        <p className="font-mono font-bold text-amber-600">
          ## {REMATCH_WARN_SECONDS}초 후에 REMATCH 권한이 사라집니다. (남은 시간{" "}
          {remainingSec}초) ##
        </p>
      )}
      {expired && (
        <p className="font-mono font-bold text-rose-500">
          ## 시간이 초과되어 REMATCH 권한이 소멸 되었습니다. ##
        </p>
      )}
    </div>
  );
}
