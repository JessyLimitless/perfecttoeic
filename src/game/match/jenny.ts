// 라이벌 캐릭터 "빌류킹" — 정복 여정의 최종 상대 + 스토리라인.
// 정복 등급(루키→그랜드마스터) 6단계를 6개 스토리 챕터에 매핑한다.
// 이미지는 /public/jp.png 를 우선 사용하고, 없으면 오리지널 SVG로 자동 폴백(JennyAvatar).

import { GRADES, gradeById, type GradeId } from "@/game/conquest";

/** 빌류킹 기본 페르소나 */
export const JENNY = {
  name: "빌류킹",
  en: "BILLYUKING",
  /** 이미지 폴백용 이모지 */
  emoji: "👑",
  /** 빌류킹 테마 그라데이션 (로즈·푸시아) */
  gradient: "from-rose-400 to-fuchsia-500",
  images: {
    idle: "/jp.png",
    win: "/jp.png",
    lose: "/jp.png",
  },
  /** 소개 한 줄 (정상의 최종 상대) */
  intro: "실전 만점을 지키는 최종 상대. 6개 영역을 모두 정복해야 넘어설 수 있다.",
  /** 통합 스토리 시놉시스 — 정복 허브 배너/온보딩용 */
  synopsis:
    "빌류킹은 리스닝·리딩 모든 영역을 완벽히 정복한 챔피언. 6개 영역을 하나씩 만점으로 정복하며 등급을 올려, 정상에서 빌류킹을 넘어 실전 만점에 도달하세요.",
} as const;

export type JennyOutcomeVariant = "idle" | "win" | "lose";

/** 대결 도메인 — 리딩(RC)·리스닝(LC) */
export type MatchDomain = "rc" | "lc";

export interface JennyChapter {
  /** 챕터 번호 1~6 */
  no: number;
  /** 이 챕터가 열리는 정복 등급 */
  grade: GradeId;
  /** 등급 라벨 (표시용) */
  gradeLabel: string;
  /** 챕터 제목 */
  title: string;
  /** 챕터 부제 */
  tagline: string;
  /** 매치메이킹 인사 (빌류킹 대사) */
  greeting: string;
  /** 플레이어가 이겼을 때 빌류킹 반응 */
  onPlayerWin: string;
  /** 플레이어가 졌을 때 빌류킹 반응 */
  onPlayerLose: string;
  /** 등급 상승(이 등급 진입) 시 재생되는 서사 컷신 — 2~3줄 */
  cutscene: string[];
}

/**
 * 스토리 아크 — "빌류킹과의 정복 여정".
 * 도전자(플레이어)가 영역을 정복하며 등급을 올려, 정상에서 빌류킹을 넘어 실전 만점에 도달한다.
 */
export const JENNY_CHAPTERS: Record<GradeId, JennyChapter> = {
  ROOKIE: {
    no: 1,
    grade: "ROOKIE",
    gradeLabel: "루키",
    title: "출발선",
    tagline: "챔피언 빌류킹이 당신을 시험합니다",
    greeting: "이제 막 출발선에 섰네요? 귀엽게 봐줄게요 😌",
    onPlayerWin: "…어라, 제법인데요? 운이 좋았을 뿐이에요.",
    onPlayerLose: "후훗, 아직 멀었어요. 다시 도전해요.",
    cutscene: [
      "루키라니… 이제 막 첫 기록을 세웠네요.",
      "여기서부터가 진짜 정복의 시작이에요.",
      "따라올 수 있는지 지켜볼게요.",
    ],
  },
  CHALLENGER: {
    no: 2,
    grade: "CHALLENGER",
    gradeLabel: "챌린저",
    title: "기록의 시작",
    tagline: "빌류킹이 당신을 기억하기 시작했습니다",
    greeting: "또 왔어요? 이번엔 조금 진지하게 해볼까요.",
    onPlayerWin: "기록이 늘었네요. …인정할게요, 조금은.",
    onPlayerLose: "아직이에요. 기초 영역부터 더 다져와요.",
    cutscene: [
      "챌린저라니… 계속 기록을 갱신하네요, 당신.",
      "솔직히 조금 신경 쓰이기 시작했어요.",
      "이번엔 대충 안 봐줄 거예요.",
    ],
  },
  CONTENDER: {
    no: 3,
    grade: "CONTENDER",
    gradeLabel: "컨텐더",
    title: "본선 진출",
    tagline: "빌류킹이 진심을 내기 시작합니다",
    greeting: "이제 슬슬 진심 좀 내볼게요. 각오됐죠?",
    onPlayerWin: "…좋아요. 이건 진짜 실력이네요.",
    onPlayerLose: "봐요, 제 진심은 이 정도예요.",
    cutscene: [
      "컨텐더. 여기부턴 진짜 실력 없인 못 올라와요.",
      "이제 저도 전력을 숨기지 않을게요.",
      "당신을 이기고 싶어졌거든요.",
    ],
  },
  PRO: {
    no: 4,
    grade: "PRO",
    gradeLabel: "프로",
    title: "절반을 넘어",
    tagline: "빌류킹이 당신을 맞수로 인정합니다",
    greeting: "당신… 생각보다 만만치 않네요.",
    onPlayerWin: "정말 강해졌군요. 다음엔 안 봐줘요.",
    onPlayerLose: "아쉽네요. 정상은 아직 멀어요.",
    cutscene: [
      "프로까지 왔군요. 절반의 영역을 정복했어요.",
      "이제 당신을 그냥 도전자라고 부르지 않을래요.",
      "우린 맞수예요. 그렇게 대할게요.",
    ],
  },
  ELITE: {
    no: 5,
    grade: "ELITE",
    gradeLabel: "엘리트",
    title: "정상 직전",
    tagline: "이제 둘은 진정한 라이벌입니다",
    greeting: "여기까지 온 도전자는 오랜만이에요. 기대할게요.",
    onPlayerWin: "…멋져요. 당신 같은 상대를 기다렸어요.",
    onPlayerLose: "여기서 멈추지 말아요. 기다릴게요.",
    cutscene: [
      "엘리트. …드디어 정상이 눈앞이네요.",
      "이제 당신은 제 진짜 라이벌이에요.",
      "정상에서 기다릴게요. 꼭 올라와요.",
    ],
  },
  GRANDMASTER: {
    no: 6,
    grade: "GRANDMASTER",
    gradeLabel: "그랜드마스터",
    title: "최종장 · 실전 만점",
    tagline: "만점의 자리를 건 마지막 승부",
    greeting: "좋아요. 이제 진짜 실력으로 붙어요. 전력으로.",
    onPlayerWin: "당신이 새로운 챔피언이에요. 실전 만점, 축하해요.",
    onPlayerLose: "아직은 제가 챔피언이에요. 다시 와요.",
    cutscene: [
      "그랜드마스터… 결국 여기까지 왔네요, 당신.",
      "이제 봐주는 것도, 숨기는 것도 없어요.",
      "모든 영역을 정복하고 실전 만점으로 저를 넘어요. 최종장이에요.",
    ],
  },
};

/** 정복 등급 → 스토리 챕터 */
export function jennyChapterForGrade(gradeId: GradeId): JennyChapter {
  return JENNY_CHAPTERS[gradeId];
}

/** 결과에 따른 빌류킹 대사(플레이어 관점 승/패) */
export function jennyReactionForGrade(gradeId: GradeId, playerWon: boolean): string {
  const ch = JENNY_CHAPTERS[gradeId];
  return playerWon ? ch.onPlayerWin : ch.onPlayerLose;
}

/** 등급 라벨을 곁들인 빌류킹 챕터 라벨 */
export function jennyGrade(gradeId: GradeId): string {
  const ch = JENNY_CHAPTERS[gradeId];
  return `빌류킹 · CH.${ch.no} ${ch.title}`;
}

/** 등급 상승 컷신 대사 */
export function jennyCutsceneForGrade(gradeId: GradeId): string[] {
  return JENNY_CHAPTERS[gradeId].cutscene;
}

/** 짧은 도발 한마디 (등급별 톤 — 인게임/연출용) */
const JENNY_TAUNTS: Record<GradeId, string> = {
  ROOKIE: "긴장했어요? 귀엽네요.",
  CHALLENGER: "이번엔 조금 진지하게 가볼까요?",
  CONTENDER: "제 진심, 감당할 수 있겠어요?",
  PRO: "맞수답게 굴어봐요.",
  ELITE: "라이벌이라면 이 정도는 따라와요.",
  GRANDMASTER: "전력으로 가요. 봐주는 건 없어요.",
};

export function jennyTaunt(gradeId: GradeId): string {
  return JENNY_TAUNTS[gradeId];
}

// ─────────────────────────── 도메인(듣기/읽기) 서사 레이어 ───────────────────────────
// "빌류킹을 넘으려면 듣기·읽기 모든 영역을 정복" — 단일 라이벌 스토리를 두 무대로 확장한다.

export interface MatchDomainMeta {
  id: MatchDomain;
  /** 무대 이름 */
  label: string;
  /** 짧은 부제 */
  sub: string;
  emoji: string;
  /** 테마 그라데이션 */
  gradient: string;
  /** 대결 진입 라우트 (part 파라미터는 호출부에서 부여) */
  route: string;
  /** 빌류킹의 무대별 도발/소개 한 줄 */
  jennyLine: string;
}

export const MATCH_DOMAINS: Record<MatchDomain, MatchDomainMeta> = {
  rc: {
    id: "rc",
    label: "리딩 대결",
    sub: "Part 5·6·7 독해 속도전",
    emoji: "📖",
    gradient: "from-indigo-500 to-violet-600",
    route: "/match",
    jennyLine: "읽기 실력부터 볼까요? 눈으로 날 따라올 수 있겠어요?",
  },
  lc: {
    id: "lc",
    label: "리스닝 대결",
    sub: "Part 2·3·4 듣기 속도전",
    emoji: "🎧",
    gradient: "from-sky-500 to-cyan-600",
    route: "/lc-match",
    jennyLine: "귀는 자신 있어요? 한 번 듣고 못 맞히면 끝이에요.",
  },
};

/** 무대(도메인)별 빌류킹 인사 */
export function jennyGreetingForDomain(domain: MatchDomain): string {
  return MATCH_DOMAINS[domain].jennyLine;
}

/** 등급 목록(스토리 진행 표시용) */
export function jennyChapters(): JennyChapter[] {
  return GRADES.map((g) => JENNY_CHAPTERS[g.id]);
}

/** 등급 라벨(그레이드 메타에서) */
export function gradeLabelOf(gradeId: GradeId): string {
  return gradeById(gradeId).label;
}
