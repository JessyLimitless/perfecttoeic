// 몸풀기 공용 라인 아이콘 (currentColor 기반 stroke SVG — 글리프 대신 선명하게)

type IconProps = {
  className?: string;
  /** px 크기 (기본 20) */
  size?: number;
  strokeWidth?: number;
};

function base(size = 20) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

/** 초기화(되돌리기) — 반시계 회전 화살표 */
export function RotateCcw({ className, size = 20, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

/** 뒤로가기 — 왼쪽 화살표 */
export function ArrowLeft({ className, size = 18, strokeWidth = 2.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

/** 이전 — 왼쪽 갈매기(<) */
export function ChevronLeft({ className, size = 20, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
