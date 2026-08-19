import { loadCimSets, flattenCim } from "@/lib/cim-loader";
import { summarizeSet, buildStages, stageShell } from "@/game/cim";
import CimHome from "@/components/cim/CimHome";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "만점 투자자산운용사 — 기출 반복",
  description: "기출 문제를 잊기 직전에 다시 만나는 간격반복 훈련",
};

export default async function CimPage() {
  const sets = await loadCimSets();
  const questions = flattenCim(sets);

  // 홈은 문항 내용이 필요 없다 — 과목·번호만 있으면 집계가 된다(전송량 절약)
  const index = questions.map((q) => ({ id: q.id, subject: q.subject, no: q.no }));

  // 스테이지 맵도 문항 본문 없이 껍데기만
  const stages = buildStages(questions).map(stageShell);

  return <CimHome index={index} sets={sets.map(summarizeSet)} stages={stages} />;
}
