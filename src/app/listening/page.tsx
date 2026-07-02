import { loadListeningSets } from "@/lib/listening-loader";
import ListeningHome, { type ListeningCard } from "@/components/listening/ListeningHome";

export const dynamic = "force-dynamic";

export default async function ListeningPage() {
  const sets = await loadListeningSets();
  const cards: ListeningCard[] = sets.map((s) => ({
    id: s.id,
    part: s.part,
    difficulty: s.difficulty,
    passageType: s.passageType,
    count: s.part === 2 ? s.items?.length ?? 0 : s.questions?.length ?? 0,
  }));
  return <ListeningHome cards={cards} />;
}
