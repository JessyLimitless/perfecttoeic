import { loadPatternChapters } from "@/lib/pattern-loader";
import PatternHome from "@/components/patterns/PatternHome";

export const dynamic = "force-dynamic";

export default async function PatternsPage() {
  const chapters = await loadPatternChapters();
  return <PatternHome chapters={chapters} />;
}
