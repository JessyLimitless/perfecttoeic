// 라이벌 캐릭터 "제니(JENNY)" — AI 대결 상대의 페르소나 + 스토리라인.
// 랭크 티어(브론즈→마스터)를 6개 스토리 챕터에 매핑한다.
// 이미지는 /public/jenny*.png 를 우선 사용하고, 없으면 이모지로 자동 폴백(JennyAvatar).

import { rankFromRp, type RankTierId } from "@/game/rank/types";

/** 제니 기본 페르소나 */
export const JENNY = {
  name: "제니",
  en: "JENNY",
  /** 이미지 폴백용 이모지 */
  emoji: "👩‍🏫",
  /** 제니 테마 그라데이션 (로즈·푸시아) */
  gradient: "from-rose-400 to-fuchsia-500",
  images: {
    idle: "/jeny.png",
    // 제니가 이긴 표정(웃는 얼굴). 없으면 idle로 폴백.
    win: "/jeny2.png",
    // 제니가 진 표정. 전용 이미지 없으면 idle로 폴백.
    lose: "/jeny.png",
  },
  /** 소개 한 줄 (실서버 챔피언 컨셉) */
  intro: "퍼펙토익 랭크의 챔피언. 만점 실력의 라이벌.",
} as const;

export type JennyOutcomeVariant = "idle" | "win" | "lose";

export interface JennyChapter {
  /** 챕터 번호 1~6 */
  no: number;
  /** 이 챕터가 열리는 티어 */
  tier: RankTierId;
  /** 챕터 제목 */
  title: string;
  /** 챕터 부제 */
  tagline: string;
  /** 매치메이킹 인사 (제니 대사) */
  greeting: string;
  /** 플레이어가 이겼을 때 제니 반응 */
  onPlayerWin: string;
  /** 플레이어가 졌을 때 제니 반응 */
  onPlayerLose: string;
  /** 승급(이 티어 진입) 시 재생되는 서사 컷신 — 제니 관점 2~3줄 */
  cutscene: string[];
}

/**
 * 스토리 아크 — "제니와의 대결".
 * 도전자(플레이어)가 챔피언 제니를 이기며 랭크를 올려, 정상에서 진짜 실력으로 붙는다.
 */
export const JENNY_CHAPTERS: Record<RankTierId, JennyChapter> = {
  BRONZE: {
    no: 1,
    tier: "BRONZE",
    title: "첫 만남",
    tagline: "챔피언 제니가 당신을 시험합니다",
    greeting: "도전자가 왔네요? 귀엽게 봐줄게요 😌",
    onPlayerWin: "…어라, 제법인데요? 운이 좋았을 뿐이에요.",
    onPlayerLose: "후훗, 아직 멀었어요. 다시 도전해요.",
    cutscene: [
      "…브론즈에 올라왔네요. 이름은 기억해 둘게요.",
      "여기까지 온 도전자, 오랜만이거든요.",
      "재밌어질 것 같아요. 따라와 봐요.",
    ],
  },
  SILVER: {
    no: 2,
    tier: "SILVER",
    title: "제니의 관심",
    tagline: "제니가 당신을 기억하기 시작했습니다",
    greeting: "또 왔어요? 이번엔 조금 진지하게 해볼까요.",
    onPlayerWin: "실력이 늘었네요. …인정할게요, 조금은.",
    onPlayerLose: "아직이에요. 기초를 더 다져와요.",
    cutscene: [
      "실버라니… 계속 올라오네요, 당신.",
      "솔직히 조금 신경 쓰이기 시작했어요.",
      "이번엔 대충 안 봐줄 거예요.",
    ],
  },
  GOLD: {
    no: 3,
    tier: "GOLD",
    title: "본격 대결",
    tagline: "제니가 진심을 내기 시작합니다",
    greeting: "이제 슬슬 진심 좀 내볼게요. 각오됐죠?",
    onPlayerWin: "…좋아요. 이건 진짜 실력이네요.",
    onPlayerLose: "봐요, 제 진심은 이 정도예요.",
    cutscene: [
      "골드. 여기부턴 진짜 실력 없인 못 올라와요.",
      "이제 저도 전력을 숨기지 않을게요.",
      "당신을 이기고 싶어졌거든요.",
    ],
  },
  PLATINUM: {
    no: 4,
    tier: "PLATINUM",
    title: "인정",
    tagline: "제니가 당신을 맞수로 인정합니다",
    greeting: "당신… 생각보다 만만치 않네요.",
    onPlayerWin: "정말 강해졌군요. 다음엔 안 봐줘요.",
    onPlayerLose: "아쉽네요. 정상은 멀어요.",
    cutscene: [
      "플래티넘까지 왔군요. …인정할게요.",
      "이제 당신을 그냥 도전자라고 부르지 않을래요.",
      "우린 맞수예요. 그렇게 대할게요.",
    ],
  },
  DIAMOND: {
    no: 5,
    tier: "DIAMOND",
    title: "라이벌",
    tagline: "이제 둘은 진정한 라이벌입니다",
    greeting: "여기까지 온 도전자는 오랜만이에요. 기대할게요.",
    onPlayerWin: "…멋져요. 당신 같은 상대를 기다렸어요.",
    onPlayerLose: "여기서 멈추지 말아요. 기다릴게요.",
    cutscene: [
      "다이아. …드디어 여기서 다시 만나네요.",
      "이제 당신은 제 진짜 라이벌이에요.",
      "정상에서 기다릴게요. 꼭 올라와요.",
    ],
  },
  MASTER: {
    no: 6,
    tier: "MASTER",
    title: "최종장 · 정상에서",
    tagline: "챔피언의 자리를 건 마지막 승부",
    greeting: "좋아요. 이제 진짜 실력으로 붙어요. 전력으로.",
    onPlayerWin: "당신이 새로운 챔피언이에요. …잘했어요.",
    onPlayerLose: "아직은 제가 챔피언이에요. 다시 와요.",
    cutscene: [
      "마스터… 결국 여기까지 왔네요, 당신.",
      "이제 봐주는 것도, 숨기는 것도 없어요.",
      "정상에서 전력으로 붙어요. 최종장이에요.",
    ],
  },
};

/** 내 RP에 해당하는 스토리 챕터 */
export function jennyChapterForRp(rp: number): JennyChapter {
  const tier = rankFromRp(rp).tier.id;
  return JENNY_CHAPTERS[tier];
}

/** 결과에 따른 제니 대사(플레이어 관점 승/패) */
export function jennyReaction(rp: number, playerWon: boolean): string {
  const ch = jennyChapterForRp(rp);
  return playerWon ? ch.onPlayerWin : ch.onPlayerLose;
}

/** 난이도/티어 느낌의 제니 등급 라벨 */
export function jennyGrade(rp: number): string {
  const ch = jennyChapterForRp(rp);
  return `제니 · CH.${ch.no} ${ch.title}`;
}

/** 승급 컷신 대사 — 새로 진입한 티어(=승급 후 RP)에 해당하는 서사 라인 */
export function jennyCutsceneForRp(rp: number): string[] {
  return jennyChapterForRp(rp).cutscene;
}

/** 짧은 도발 한마디 (챕터별 톤 — 인게임/연출용) */
const JENNY_TAUNTS: Record<RankTierId, string> = {
  BRONZE: "긴장했어요? 귀엽네요.",
  SILVER: "이번엔 조금 진지하게 가볼까요?",
  GOLD: "제 진심, 감당할 수 있겠어요?",
  PLATINUM: "맞수답게 굴어봐요.",
  DIAMOND: "라이벌이라면 이 정도는 따라와요.",
  MASTER: "전력으로 가요. 봐주는 건 없어요.",
};

/** 짧은 도발 한마디 */
export function jennyTaunt(rp: number): string {
  const tier = rankFromRp(rp).tier.id;
  return JENNY_TAUNTS[tier];
}
