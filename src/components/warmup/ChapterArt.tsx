/**
 * 전자책 챕터 삽화 — 코드로 그린 플랫 SVG 배너.
 * 스펜서 존슨 치즈 3부작 각 챕터의 스토리에 맞는 모티프를 그린다.
 * 외부 이미지/생성 API를 쓰지 않고 인라인 SVG로만 그린다(무료·API 미사용).
 * 책별 팔레트: Book1=치즈 앰버 / Book2=미로 에메랄드 / Book3=선물 스카이.
 */

interface Palette {
  main: string;
  soft: string;
  dark: string;
  bg: string;
}

const PALETTE: Record<number, Palette> = {
  1: { main: "#f59e0b", soft: "#fde68a", dark: "#b45309", bg: "#fffbeb" },
  2: { main: "#10b981", soft: "#a7f3d0", dark: "#047857", bg: "#ecfdf5" },
  3: { main: "#0ea5e9", soft: "#bae6fd", dark: "#0369a1", bg: "#f0f9ff" },
};

/** (bookNo → 챕터 0~9)별 모티프 키. 챕터 제목 스토리에 맞춰 배정. */
const CHAPTER_MOTIF: Record<number, string[]> = {
  // Book 1 — Who Moved My Cheese?
  1: ["characters", "cheese", "empty", "sad", "steps", "maze", "thought", "wall", "cheese", "wall"],
  // Book 2 — Out of the Maze
  2: ["sad", "steps", "meeting", "break", "mind", "mind", "cosmos", "mirror", "door", "wall"],
  // Book 3 — The Present
  3: ["meeting", "gift", "clock", "past", "past", "path", "balance", "work", "sunrise", "gift"],
};

const MOTIF_LABEL: Record<string, string> = {
  characters: "등장인물",
  cheese: "치즈",
  empty: "사라진 치즈",
  sad: "낙담한 인물",
  steps: "앞으로 나아가기",
  maze: "미로",
  thought: "상상하기",
  wall: "벽에 남긴 글",
  meeting: "만남",
  break: "신념을 깨다",
  mind: "생각의 전환",
  cosmos: "무한한 우주",
  mirror: "정체성",
  door: "미로 밖으로",
  gift: "선물",
  clock: "현재에 존재하기",
  past: "과거 돌아보기",
  path: "미래로 가는 길",
  balance: "과거·현재·미래의 균형",
  work: "일에 적용하기",
  sunrise: "변화와 새 출발",
};

/** 각 모티프의 SVG 본체 (viewBox 0 0 160 90). */
function Motif({ id, p }: { id: string; p: Palette }) {
  const S = { strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (id) {
    case "characters":
      return (
        <g {...S}>
          {[0, 1, 2, 3].map((i) => {
            const x = 46 + i * 24;
            const tall = i % 2 === 0;
            const bodyH = tall ? 26 : 20;
            const bodyY = tall ? 44 : 50;
            const headY = tall ? 37 : 43;
            const primary = i < 2;
            return (
              <g key={i}>
                <rect x={x - 9} y={bodyY} width={18} height={bodyH} rx={9} fill={primary ? p.main : p.soft} stroke={p.dark} strokeWidth={2} />
                <circle cx={x} cy={headY} r={8} fill={primary ? p.soft : p.main} stroke={p.dark} strokeWidth={2} />
              </g>
            );
          })}
        </g>
      );
    case "cheese":
      return (
        <g {...S}>
          <path d="M40 62 H118 V32 Z" fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          <circle cx={66} cy={54} r={5} fill={p.dark} opacity={0.22} />
          <circle cx={90} cy={48} r={4} fill={p.dark} opacity={0.22} />
          <circle cx={100} cy={57} r={3} fill={p.dark} opacity={0.22} />
          <circle cx={80} cy={58} r={2.5} fill={p.dark} opacity={0.22} />
        </g>
      );
    case "empty":
      return (
        <g {...S}>
          <circle cx={80} cy={45} r={24} fill="none" stroke={p.main} strokeWidth={3} strokeDasharray="5 7" />
          <text x={80} y={57} textAnchor="middle" fontSize={30} fontWeight={800} fill={p.dark}>?</text>
        </g>
      );
    case "sad":
      return (
        <g {...S}>
          <rect x={69} y={45} width={22} height={28} rx={11} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <circle cx={80} cy={37} r={11} fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          <path d="M75 40 Q80 35 85 40" fill="none" stroke={p.dark} strokeWidth={2} />
          <circle cx={76} cy={35} r={1.6} fill={p.dark} />
          <circle cx={84} cy={35} r={1.6} fill={p.dark} />
        </g>
      );
    case "steps":
      return (
        <g {...S}>
          <ellipse cx={52} cy={60} rx={9} ry={5} fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <ellipse cx={76} cy={51} rx={9} ry={5} fill={p.main} stroke={p.dark} strokeWidth={2} />
          <ellipse cx={100} cy={42} rx={9} ry={5} fill={p.main} stroke={p.dark} strokeWidth={2} />
          <path d="M112 40 l9 -5 l-1 9" fill="none" stroke={p.dark} strokeWidth={2.5} />
        </g>
      );
    case "maze":
      return (
        <g {...S}>
          <rect x={44} y={24} width={72} height={46} rx={4} fill={p.soft} opacity={0.5} stroke={p.dark} strokeWidth={2.5} />
          <path d="M44 40 H82 M96 24 V52 M60 70 V46 M96 66 H116 M72 38 V70" fill="none" stroke={p.main} strokeWidth={2.5} />
          <circle cx={52} cy={62} r={4} fill={p.dark} />
          <circle cx={108} cy={32} r={4.5} fill={p.main} stroke={p.dark} strokeWidth={2} />
        </g>
      );
    case "thought":
      return (
        <g {...S}>
          <ellipse cx={84} cy={42} rx={30} ry={17} fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <circle cx={58} cy={62} r={5} fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <circle cx={50} cy={71} r={3.5} fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <path d="M84 30 l4 9 l9 3 l-9 3 l-4 9 l-4 -9 l-9 -3 l9 -3 Z" fill={p.main} stroke={p.dark} strokeWidth={1.5} />
        </g>
      );
    case "wall":
      return (
        <g {...S}>
          <rect x={46} y={28} width={68} height={42} rx={3} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <path d="M46 42 H114 M46 56 H114 M64 28 V42 M88 42 V56 M100 28 V42 M76 56 V70" fill="none" stroke={p.dark} strokeWidth={1.3} opacity={0.35} />
          <path d="M56 49 q6 -6 11 0 t11 0" fill="none" stroke={p.main} strokeWidth={2.5} />
        </g>
      );
    case "meeting":
      return (
        <g {...S}>
          <g>
            <rect x={54} y={45} width={20} height={26} rx={10} fill={p.main} stroke={p.dark} strokeWidth={2.5} />
            <circle cx={64} cy={38} r={9} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          </g>
          <g>
            <rect x={86} y={45} width={20} height={26} rx={10} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
            <circle cx={96} cy={38} r={9} fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          </g>
          <path d="M80 30 l2.5 5.5 l5.5 2.5 l-5.5 2.5 l-2.5 5.5 l-2.5 -5.5 l-5.5 -2.5 l5.5 -2.5 Z" fill={p.main} stroke={p.dark} strokeWidth={1.2} />
        </g>
      );
    case "break":
      return (
        <g {...S}>
          <rect x={46} y={26} width={68} height={44} rx={3} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <path d="M80 26 L72 44 L88 52 L78 70" fill="none" stroke={p.dark} strokeWidth={3} />
          <path d="M96 34 l3 6 l6 2 l-6 2 l-3 6 l-3 -6 l-6 -2 l6 -2 Z" fill={p.main} />
        </g>
      );
    case "mind":
      return (
        <g {...S}>
          <circle cx={80} cy={44} r={20} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <circle cx={80} cy={40} r={9} fill={p.main} stroke={p.dark} strokeWidth={2} />
          <path d="M75 50 h10 M77 54 h6" fill="none" stroke={p.dark} strokeWidth={2} />
          <g stroke={p.main} strokeWidth={2.5}>
            <line x1={80} y1={16} x2={80} y2={22} />
            <line x1={104} y1={44} x2={110} y2={44} />
            <line x1={50} y1={44} x2={56} y2={44} />
            <line x1={98} y1={26} x2={102} y2={22} />
            <line x1={62} y1={26} x2={58} y2={22} />
          </g>
        </g>
      );
    case "cosmos":
      return (
        <g {...S}>
          <path d="M94 30 a17 17 0 1 0 0 30 a13 13 0 1 1 0 -30 Z" fill={p.main} stroke={p.dark} strokeWidth={2} />
          <path d="M56 38 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z" fill={p.soft} stroke={p.dark} strokeWidth={1.2} />
          <circle cx={64} cy={62} r={2} fill={p.dark} />
          <circle cx={110} cy={58} r={2} fill={p.dark} />
          <circle cx={48} cy={54} r={1.6} fill={p.main} />
        </g>
      );
    case "mirror":
      return (
        <g {...S}>
          <line x1={80} y1={24} x2={80} y2={72} stroke={p.dark} strokeWidth={2} strokeDasharray="3 4" />
          <rect x={54} y={46} width={18} height={24} rx={9} fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          <circle cx={63} cy={39} r={8} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <rect x={88} y={46} width={18} height={24} rx={9} fill={p.soft} stroke={p.dark} strokeWidth={2.5} opacity={0.7} />
          <circle cx={97} cy={39} r={8} fill={p.main} stroke={p.dark} strokeWidth={2.5} opacity={0.7} />
        </g>
      );
    case "door":
      return (
        <g {...S}>
          <rect x={62} y={26} width={36} height={46} rx={3} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <rect x={70} y={33} width={20} height={39} fill={p.main} />
          <g stroke={p.main} strokeWidth={2}>
            <line x1={100} y1={40} x2={116} y2={34} />
            <line x1={100} y1={49} x2={118} y2={49} />
            <line x1={100} y1={58} x2={116} y2={64} />
          </g>
          <circle cx={86} cy={50} r={2.2} fill={p.dark} />
        </g>
      );
    case "gift":
      return (
        <g {...S}>
          <rect x={58} y={45} width={44} height={26} rx={3} fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          <rect x={54} y={37} width={52} height={10} rx={2} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <line x1={80} y1={37} x2={80} y2={71} stroke={p.dark} strokeWidth={2.5} />
          <path d="M80 37 Q66 24 60 33 Q58 40 80 37" fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <path d="M80 37 Q94 24 100 33 Q102 40 80 37" fill={p.soft} stroke={p.dark} strokeWidth={2} />
        </g>
      );
    case "clock":
      return (
        <g {...S}>
          <circle cx={80} cy={45} r={22} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <line x1={80} y1={45} x2={80} y2={30} stroke={p.dark} strokeWidth={3} />
          <line x1={80} y1={45} x2={92} y2={49} stroke={p.main} strokeWidth={3} />
          <circle cx={80} cy={45} r={3} fill={p.dark} />
          <circle cx={80} cy={27} r={1.6} fill={p.dark} />
          <circle cx={98} cy={45} r={1.6} fill={p.dark} />
          <circle cx={80} cy={63} r={1.6} fill={p.dark} />
          <circle cx={62} cy={45} r={1.6} fill={p.dark} />
        </g>
      );
    case "past":
      return (
        <g {...S}>
          <circle cx={80} cy={46} r={20} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <line x1={80} y1={46} x2={80} y2={33} stroke={p.dark} strokeWidth={3} />
          <line x1={80} y1={46} x2={70} y2={50} stroke={p.dark} strokeWidth={3} />
          <circle cx={80} cy={46} r={2.6} fill={p.dark} />
          <path d="M104 34 A22 22 0 0 0 96 26" fill="none" stroke={p.main} strokeWidth={3} />
          <path d="M96 26 l9 -1 l-4 8" fill="none" stroke={p.main} strokeWidth={3} />
        </g>
      );
    case "path":
      return (
        <g {...S}>
          <circle cx={112} cy={32} r={9} fill={p.main} stroke={p.dark} strokeWidth={2} />
          <path d="M56 72 Q78 58 70 46 Q64 36 90 30" fill="none" stroke={p.soft} strokeWidth={8} />
          <path d="M56 72 Q78 58 70 46 Q64 36 90 30" fill="none" stroke={p.dark} strokeWidth={2} strokeDasharray="2 7" />
        </g>
      );
    case "balance":
      return (
        <g {...S}>
          <line x1={80} y1={26} x2={80} y2={70} stroke={p.dark} strokeWidth={3} />
          <line x1={54} y1={36} x2={106} y2={36} stroke={p.dark} strokeWidth={3} />
          <path d="M54 36 l-8 14 h16 Z" fill={p.soft} stroke={p.dark} strokeWidth={2} />
          <path d="M106 36 l-8 14 h16 Z" fill={p.main} stroke={p.dark} strokeWidth={2} />
          <rect x={68} y={70} width={24} height={5} rx={2.5} fill={p.dark} />
          <circle cx={80} cy={32} r={3} fill={p.main} stroke={p.dark} strokeWidth={2} />
        </g>
      );
    case "work":
      return (
        <g {...S}>
          <rect x={60} y={40} width={40} height={26} rx={2} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
          <rect x={66} y={46} width={28} height={14} rx={1} fill={p.main} opacity={0.55} />
          <path d="M52 66 h56 l5 7 h-66 Z" fill={p.main} stroke={p.dark} strokeWidth={2.5} />
        </g>
      );
    case "sunrise":
      return (
        <g {...S}>
          <g stroke={p.main} strokeWidth={2.5}>
            <line x1={80} y1={30} x2={80} y2={38} />
            <line x1={60} y1={40} x2={65} y2={45} />
            <line x1={100} y1={40} x2={95} y2={45} />
            <line x1={52} y1={54} x2={59} y2={54} />
            <line x1={108} y1={54} x2={101} y2={54} />
          </g>
          <path d="M62 62 a18 18 0 0 1 36 0 Z" fill={p.main} stroke={p.dark} strokeWidth={2.5} />
          <path d="M40 68 Q80 50 120 68" fill="none" stroke={p.dark} strokeWidth={2.5} />
          <path d="M40 68 Q80 50 120 68 L120 74 L40 74 Z" fill={p.soft} opacity={0.6} />
        </g>
      );
    default:
      return (
        <g {...S}>
          <circle cx={80} cy={45} r={18} fill={p.soft} stroke={p.dark} strokeWidth={2.5} />
        </g>
      );
  }
}

/**
 * 챕터 삽화 배너. bookNo(1~3)와 chapterIndex(0~9)로 모티프·팔레트를 결정.
 * 기초/기본 난이도 무관하게 같은 이야기 → 같은 삽화(bookNo 기준).
 */
export default function ChapterArt({ bookNo, chapterIndex }: { bookNo: number; chapterIndex: number }) {
  const p = PALETTE[bookNo] ?? PALETTE[1];
  const motifs = CHAPTER_MOTIF[bookNo] ?? CHAPTER_MOTIF[1];
  const id = motifs[chapterIndex % motifs.length] ?? "cheese";
  return (
    <div
      className="mb-3 overflow-hidden rounded-xl ring-1 ring-black/[0.05]"
      style={{ background: `linear-gradient(135deg, ${p.bg} 0%, #ffffff 100%)` }}
    >
      <svg
        viewBox="0 0 160 90"
        className="h-[88px] w-full sm:h-24"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={MOTIF_LABEL[id] ?? "챕터 삽화"}
      >
        <Motif id={id} p={p} />
      </svg>
    </div>
  );
}
