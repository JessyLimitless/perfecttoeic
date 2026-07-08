import { loadListeningSets } from "@/lib/listening-loader";
import ListeningHome, { type ListeningCard } from "@/components/listening/ListeningHome";
import { typesInSet, type LcType, type LcTypeFilter } from "@/game/listeningTypes";

export const dynamic = "force-dynamic";

const VALID_TYPES: LcType[] = [
  "WH",
  "YESNO",
  "CHOICE",
  "STATEMENT",
  "MAIN",
  "DETAIL",
  "INFERENCE",
  "INTENT",
];

export default async function ListeningPage({
  searchParams,
}: {
  searchParams: { part?: string; type?: string; review?: string; diff?: string };
}) {
  const sets = await loadListeningSets();
  const cards: ListeningCard[] = sets.map((s) => ({
    id: s.id,
    part: s.part,
    difficulty: s.difficulty,
    passageType: s.passageType,
    count: s.part === 2 ? s.items?.length ?? 0 : s.questions?.length ?? 0,
    types: typesInSet(s),
    // 세트 정복 상태 파생용 문항 ID (Part2=items, Part3/4=questions)
    questionIds:
      s.part === 2
        ? (s.items ?? []).map((i) => i.id)
        : (s.questions ?? []).map((q) => q.id),
  }));

  const rawPart = Number(searchParams.part);
  const initialPart = [2, 3, 4].includes(rawPart) ? (rawPart as 2 | 3 | 4) : null;
  const initialType: LcTypeFilter = VALID_TYPES.includes(searchParams.type as LcType)
    ? (searchParams.type as LcType)
    : "ALL";
  const initialReview = searchParams.review === "1";
  const initialDiff: "EASY" | "MEDIUM" | "HARD" | "ALL" = (
    ["EASY", "MEDIUM", "HARD"] as const
  ).includes(searchParams.diff as "EASY" | "MEDIUM" | "HARD")
    ? (searchParams.diff as "EASY" | "MEDIUM" | "HARD")
    : "ALL";

  return (
    <ListeningHome
      cards={cards}
      initialPart={initialPart}
      initialType={initialType}
      initialReview={initialReview}
      initialDiff={initialDiff}
    />
  );
}
