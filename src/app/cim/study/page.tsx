import { loadCimSets, flattenCim } from "@/lib/cim-loader";
import { buildStages, type CimMode, type CimSubject } from "@/game/cim";
import CimStudy from "@/components/cim/CimStudy";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "문제 풀이 — 만점 투자자산운용사",
};

const MODES: CimMode[] = ["review", "fresh", "wrong", "all"];

export default async function CimStudyPage({
  searchParams,
}: {
  searchParams?: { mode?: string; subject?: string; stage?: string };
}) {
  const sets = await loadCimSets();
  const questions = flattenCim(sets);
  const stages = buildStages(questions);

  // 스테이지 진입이면 그 판의 5문항만 넘긴다 — 모드·과목 필터는 무시된다
  const stageNo = Number(searchParams?.stage);
  const stage = stages.find((st) => st.no === stageNo) ?? null;
  if (stage) {
    return (
      <CimStudy
        questions={stage.questions}
        mode="all"
        subject={null}
        stage={{ no: stage.no, count: stages.length, from: stage.from, to: stage.to }}
      />
    );
  }

  const raw = searchParams?.mode as CimMode | undefined;
  const mode: CimMode = raw && MODES.includes(raw) ? raw : "all";
  const s = Number(searchParams?.subject);
  const subject: CimSubject | null = s === 1 || s === 2 || s === 3 ? s : null;

  return <CimStudy questions={questions} mode={mode} subject={subject} />;
}
