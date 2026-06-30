import { loadWarmupDecks } from "@/lib/warmup-loader";
import WarmupHome from "@/components/warmup/WarmupHome";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function WarmupPage() {
  const decks = await loadWarmupDecks();
  return <WarmupHome decks={decks} />;
}
