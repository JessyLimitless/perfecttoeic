import { loadIeltsSets } from "@/lib/ielts-loader";
import { trapTypeOf, type IeltsSetSummary } from "@/game/ielts";
import IeltsHome from "@/components/ielts/IeltsHome";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "만점 아이엘츠 — IELTS Academic",
  description: "덫을 막아내며 밴드를 올리는 IELTS 훈련",
};

export default async function IeltsPage() {
  const sets = await loadIeltsSets();

  // 화면엔 문항 내용이 필요 없다 — 목록용 경량 요약만 넘긴다
  const summaries: IeltsSetSummary[] = sets.map((s) => ({
    id: s.id,
    part: s.part,
    band: s.band,
    title: s.title,
    titleKo: s.titleKo,
    taskType: s.taskType,
    questions: s.questions.length,
    traps: s.questions
      .map((q) => trapTypeOf(q.category))
      .filter((t, i, arr) => arr.indexOf(t) === i),
  }));

  return <IeltsHome sets={summaries} />;
}
