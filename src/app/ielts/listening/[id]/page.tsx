import { notFound } from "next/navigation";
import { loadIeltsSets } from "@/lib/ielts-loader";
import IeltsListeningPlayer from "@/components/ielts/IeltsListeningPlayer";

export const dynamic = "force-dynamic";

export default async function IeltsListeningSetPage({
  params,
}: {
  params: { id: string };
}) {
  const sets = await loadIeltsSets();
  const set = sets.find((s) => s.id === params.id);
  if (!set) notFound();
  return <IeltsListeningPlayer set={set} />;
}
