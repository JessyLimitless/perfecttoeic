import { loadDiagnosticTest } from "@/lib/diagnostic-loader";
import DiagnosticRunner from "@/components/diagnostic/DiagnosticRunner";

export const dynamic = "force-dynamic";

export default async function DiagnosticPage() {
  const test = await loadDiagnosticTest();
  return <DiagnosticRunner test={test} />;
}
