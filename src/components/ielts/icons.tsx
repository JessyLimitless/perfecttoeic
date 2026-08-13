/**
 * 만점 아이엘츠 공용 UI 아이콘 — 재생 컨트롤·네비게이션.
 *
 * 덫 아이콘(TrapIcon.tsx)과 같은 이유로 SVG다. ▶ ❚❚ ▼ ← 같은 글리프는
 * 폰트에 따라 크기·정렬이 제각각이라 버튼 안에서 싸구려로 보인다.
 * 모두 currentColor 기반이라 놓인 자리의 글자색을 그대로 따른다.
 */

type IconProps = { className?: string; strokeWidth?: number };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** 재생 — 채워진 삼각형(플레이 버튼은 선보다 면이 또렷하다) */
export function PlayIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

/** 일시정지 */
export function PauseIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <rect x="6.5" y="5" width="4" height="14" rx="1.3" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.3" />
    </svg>
  );
}

/** 10초 뒤로 — 반시계 화살표 + 10 */
export function Rewind10Icon({ className = "h-4 w-4", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.9-6.4L3.5 8" />
      <path d="M3.5 3.5V8h4.5" />
      <text
        x="12"
        y="15.6"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
      >
        10
      </text>
    </svg>
  );
}

/** 처음부터 — 앞으로 건너뛰기의 반대(정지 바 + 삼각형) */
export function RestartIcon({ className = "h-4 w-4", strokeWidth = 2 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M6 5v14" />
      <path d="M19 6.2v11.6a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l8.45-5.8A1 1 0 0 1 19 6.2Z" />
    </svg>
  );
}

/** 펼침/접힘 — 아래 갈매기 */
export function ChevronDownIcon({ className = "h-4 w-4", strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** 뒤로 */
export function ArrowLeftIcon({ className = "h-4 w-4", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

/** 다음 */
export function ArrowRightIcon({ className = "h-4 w-4", strokeWidth = 2.2 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/** 헤드폰 — 리스닝 영역 표식 */
export function HeadphonesIcon({ className = "h-4 w-4", strokeWidth = 1.9 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 15.5A2.5 2.5 0 0 1 6.5 13H8v7H6.5A2.5 2.5 0 0 1 4 17.5Z" />
      <path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5H16v7h1.5a2.5 2.5 0 0 0 2.5-2.5Z" />
    </svg>
  );
}

/** 스크립트 — 문서 */
export function ScriptIcon({ className = "h-4 w-4", strokeWidth = 1.9 }: IconProps) {
  return (
    <svg {...BASE} strokeWidth={strokeWidth} className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}
