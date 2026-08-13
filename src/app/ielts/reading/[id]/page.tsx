import { notFound } from "next/navigation";
import { loadIeltsReadingSets } from "@/lib/ielts-reading-loader";
import IeltsReadingPlayer from "@/components/ielts/IeltsReadingPlayer";

export const dynamic = "force-dynamic";

export default async function IeltsReadingSetPage({
  params,
}: {
  params: { id: string };
}) {
  const sets = await loadIeltsReadingSets();
  const set = sets.find((s) => s.id === params.id);
  if (!set) notFound();
  return <IeltsReadingPlayer set={set} />;
}
