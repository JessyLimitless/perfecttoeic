import { notFound } from "next/navigation";
import { loadPatternsFlat } from "@/lib/pattern-loader";
import PatternStudy from "@/components/patterns/PatternStudy";

export const dynamic = "force-dynamic";

export default async function PatternStudyPage({
  params,
}: {
  params: { id: string };
}) {
  const patterns = await loadPatternsFlat();
  const i = patterns.findIndex((p) => p.id === params.id);
  if (i < 0) notFound();

  const pattern = patterns[i];
  const prevId = i > 0 ? patterns[i - 1].id : null;
  const nextId = i < patterns.length - 1 ? patterns[i + 1].id : null;

  return <PatternStudy pattern={pattern} prevId={prevId} nextId={nextId} />;
}
