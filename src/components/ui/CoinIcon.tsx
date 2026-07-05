/**
 * 크레딧 코인 아이콘 (인라인 SVG).
 * 🪙 이모지는 일부 폰트에서 두부(□)로 렌더돼 싸구려처럼 보인다 → 자체 SVG로 대체.
 * currentColor 대신 자체 금색 그라데이션을 써서 어디에 놓아도 또렷하다.
 */
export default function CoinIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="coinFace" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" fill="url(#coinFace)" />
      <circle cx="12" cy="12" r="9.5" stroke="#d97706" strokeWidth="1.4" opacity="0.55" />
      <circle cx="12" cy="12" r="6.6" stroke="#fffbeb" strokeWidth="1.2" opacity="0.7" />
      <path
        d="M12 7.6v8.8M9.4 9.9c0-1.1 1-1.7 2.6-1.7s2.6.6 2.6 1.6c0 2.4-5 1.4-5 3.9 0 1 1 1.7 2.6 1.7s2.6-.7 2.6-1.8"
        stroke="#b45309"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
