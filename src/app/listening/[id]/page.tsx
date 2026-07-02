import { notFound } from "next/navigation";
import { loadListeningSets } from "@/lib/listening-loader";
import ListeningPlayer from "@/components/listening/ListeningPlayer";

export const dynamic = "force-dynamic";

export default async function ListeningSetPage({ params }: { params: { id: string } }) {
  const sets = await loadListeningSets();
  const set = sets.find((s) => s.id === params.id);
  if (!set) notFound();
  return <ListeningPlayer set={set} />;
}
