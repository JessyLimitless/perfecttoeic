import { notFound } from "next/navigation";
import { loadWarmupDecks } from "@/lib/warmup-loader";
import OrderingGame from "@/components/warmup/OrderingGame";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function WarmupOrderPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book } = await params;
  const decks = await loadWarmupDecks();
  const deck = decks.find((d) => d.id === book);
  if (!deck) notFound();
  return <OrderingGame deck={deck} />;
}
