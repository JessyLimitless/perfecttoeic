import { notFound } from "next/navigation";
import { loadWarmupDecks } from "@/lib/warmup-loader";
import MemorizePlayer from "@/components/warmup/MemorizePlayer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function WarmupMemorizePage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book } = await params;
  const decks = await loadWarmupDecks();
  const deck = decks.find((d) => d.id === book);
  if (!deck) notFound();
  return <MemorizePlayer deck={deck} />;
}
