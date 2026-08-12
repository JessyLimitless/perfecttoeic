/**
 * 덫 아이콘 — 8종 함정을 선 아이콘으로 그린다.
 *
 * 왜 SVG인가: 덫 라벨에 쓰던 이모지(🪤·↩️·🔤 …) 중 상당수가 Windows에서
 * 두부(□)로 렌더된다. 화면 곳곳에 박히는 아이콘이라 폰트 사정에 맡길 수 없다.
 * (프로젝트가 🪙 → CoinIcon으로 겪은 것과 같은 문제.)
 *
 * 모두 currentColor 스트로크라 배치한 곳의 글자색을 그대로 따른다.
 */
import type { IeltsTrapType } from "@/game/ielts";

type Props = { type: IeltsTrapType; className?: string };

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function TrapIcon({ type, className = "h-4 w-4" }: Props) {
  const p = { ...BASE, className, "aria-hidden": true };

  switch (type) {
    // 자기수정 — 되돌아가는 화살표
    case "CORRECTION":
      return (
        <svg {...p}>
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h11a5 5 0 0 1 0 10H9" />
        </svg>
      );

    // 숫자·계산 — 계산기
    case "NUMBER":
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="18" rx="2.5" />
          <path d="M8 7h8" />
          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
        </svg>
      );

    // 스펠링 — 글자
    case "SPELLING":
      return (
        <svg {...p}>
          <path d="m3 18 4.5-12L12 18" />
          <path d="M4.8 14h5.4" />
          <path d="M20 11.5a3 3 0 0 0-5.2-2" />
          <path d="M20 10v8" />
          <path d="M20 15.2c0 1.8-1.3 2.8-2.8 2.8a2.1 2.1 0 0 1-.4-4.2l3.2-.5" />
        </svg>
      );

    // 패러프레이즈 — 바꿔 말하기(교차 화살표)
    case "PARAPHRASE":
      return (
        <svg {...p}>
          <path d="M4 8h13l-3-3" />
          <path d="M20 16H7l3 3" />
        </svg>
      );

    // 위치·방향 — 나침반
    case "MAP":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5.2-5.2 2 2-5.2z" />
        </svg>
      );

    // 매칭·분류 — 연결
    case "MATCHING":
      return (
        <svg {...p}>
          <path d="M10 13a4.2 4.2 0 0 0 6.2.4l2.4-2.4a4.2 4.2 0 1 0-6-6l-1.4 1.4" />
          <path d="M14 11a4.2 4.2 0 0 0-6.2-.4l-2.4 2.4a4.2 4.2 0 1 0 6 6l1.4-1.4" />
        </svg>
      );

    // 오답 소거 — 금지
    case "DISTRACTOR":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="m5.6 5.6 12.8 12.8" />
        </svg>
      );

    // 세부정보 — 돋보기
    default:
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.7-3.7" />
        </svg>
      );
  }
}

/** 덫 그 자체 — 섹션 표제용 (집게 덫) */
export function SnareIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      <path d="M3 17h18" />
      <path d="M6 17V9l6 5 6-5v8" />
      <path d="M12 14v7" />
    </svg>
  );
}

/** 방어 성공 — 방패 */
export function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...BASE} className={className} aria-hidden>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}
