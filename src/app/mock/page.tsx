import { loadMock } from "@/lib/mock-loader";
import MockRunner from "@/components/mock/MockRunner";

export const dynamic = "force-dynamic";

export default async function MockPage() {
  const mock = await loadMock();
  return <MockRunner mock={mock} />;
}
