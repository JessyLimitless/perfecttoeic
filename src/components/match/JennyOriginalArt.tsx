// 대결 상대(제니) 폴백 일러스트 — 100% 인라인 SVG 로 그린 오리지널 마스코트.
// 실존 인물/사진과 무관한 창작 캐릭터(플랫·기하학) → 배포·라이선스 안전.
// 로즈/푸시아 팔레트로 제니 테마와 통일. 외부 에셋 없음.

export type JennyExpression = "idle" | "win" | "lose";

interface JennyOriginalArtProps {
  /** px 크기 (기본 96) */
  size?: number;
  /** 표정: idle=중립, win=미소, lose=뾰로통 */
  expression?: JennyExpression;
  className?: string;
}

export default function JennyOriginalArt({
  size = 96,
  expression = "idle",
  className = "",
}: JennyOriginalArtProps) {
  // 표정별 파라미터 (입/눈썹/볼)
  const isWin = expression === "win";
  const isLose = expression === "lose";

  // 입 모양 path
  const mouth = isWin
    ? "M40 66 Q50 78 60 66" // 활짝 웃음
    : isLose
      ? "M41 72 Q50 64 59 72" // 뾰로통(아래로 볼록)
      : "M43 69 Q50 73 57 69"; // 중립 미소

  // 눈썹 y 오프셋 (lose 면 살짝 찌푸림)
  const browY = isLose ? 44 : 42;
  const browTilt = isLose ? 3 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="제니 캐릭터"
    >
      <defs>
        <linearGradient id="jenny-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <linearGradient id="jenny-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#9d174d" />
        </linearGradient>
        <linearGradient id="jenny-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9e0" />
          <stop offset="100%" stopColor="#ffd8cc" />
        </linearGradient>
        <linearGradient id="jenny-collar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
      </defs>

      {/* 배경 원 */}
      <circle cx="50" cy="50" r="50" fill="url(#jenny-bg)" />
      <circle cx="50" cy="50" r="49" fill="none" stroke="#fbcfe8" strokeWidth="2" />

      {/* 어깨/옷깃 */}
      <path d="M22 100 Q26 82 50 80 Q74 82 78 100 Z" fill="url(#jenny-collar)" />
      <path d="M50 80 L44 92 L50 96 L56 92 Z" fill="#fbcfe8" opacity="0.9" />

      {/* 뒷머리 */}
      <path
        d="M24 52 Q22 24 50 22 Q78 24 76 52 Q78 70 68 78 L32 78 Q22 70 24 52 Z"
        fill="url(#jenny-hair)"
      />

      {/* 얼굴 */}
      <path
        d="M32 48 Q32 30 50 30 Q68 30 68 48 Q68 66 50 70 Q32 66 32 48 Z"
        fill="url(#jenny-skin)"
      />

      {/* 앞머리 (뱅) */}
      <path
        d="M31 46 Q30 28 50 27 Q70 28 69 46 Q60 37 50 38 Q40 37 31 46 Z"
        fill="url(#jenny-hair)"
      />

      {/* 볼터치 */}
      <ellipse cx="39" cy="60" rx="4.5" ry="3" fill="#fb7185" opacity="0.5" />
      <ellipse cx="61" cy="60" rx="4.5" ry="3" fill="#fb7185" opacity="0.5" />

      {/* 눈썹 */}
      <path
        d={`M38 ${browY} q4 ${-2 - browTilt} 8 0`}
        fill="none"
        stroke="#9d174d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d={`M54 ${browY} q4 0 8 ${-2 - browTilt}`}
        fill="none"
        stroke="#9d174d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 눈 */}
      {isWin ? (
        // 웃는 눈(반달)
        <>
          <path d="M38 53 q4 4 8 0" fill="none" stroke="#3f1220" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M54 53 q4 4 8 0" fill="none" stroke="#3f1220" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="42" cy="53" r="3.1" fill="#3f1220" />
          <circle cx="58" cy="53" r="3.1" fill="#3f1220" />
          <circle cx="43.1" cy="52" r="1" fill="#fff" />
          <circle cx="59.1" cy="52" r="1" fill="#fff" />
        </>
      )}

      {/* 입 */}
      <path d={mouth} fill="none" stroke="#be123c" strokeWidth="2.4" strokeLinecap="round" />

      {/* 헤어 액세서리 (별) */}
      <path
        d="M68 34 l1.4 3 3.2 .4 -2.4 2.2 .6 3.2 -2.8 -1.6 -2.8 1.6 .6 -3.2 -2.4 -2.2 3.2 -.4 Z"
        fill="#fde047"
        stroke="#f59e0b"
        strokeWidth="0.6"
      />
    </svg>
  );
}
