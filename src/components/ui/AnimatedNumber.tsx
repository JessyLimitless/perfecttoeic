"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

/** 값이 바뀌면 직전 값에서 새 값으로 부드럽게 카운트업/다운하는 숫자 */
export default function AnimatedNumber({
  value,
  duration = 0.6,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  // 애니메이션 시작점은 항상 "현재 화면에 보이는 값"이어야 한다 (직전 값에서 출발).
  const fromRef = useRef(value);

  useEffect(() => {
    const controls = animate(fromRef.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo — 끝맺음이 또렷한 프리미엄 카운트업
      onUpdate: (v) => {
        fromRef.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className} aria-label={String(Math.round(value))}>
      {Math.round(display)}
    </span>
  );
}
