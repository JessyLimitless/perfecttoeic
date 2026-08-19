import { loadCimSets, flattenCim } from "@/lib/cim-loader";
import CimNotes from "@/components/cim/CimNotes";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "오답노트 — 만점 투자자산운용사",
  description: "한 번이라도 틀린 기출을 문제·내 답·해설과 함께 복기",
};

export default async function CimNotesPage() {
  const sets = await loadCimSets();
  // 어떤 문항이 오답인지는 localStorage에만 있다 → 서버에서 미리 거를 수 없어 전 문항을 넘긴다
  // (풀이 화면도 같은 방식이다)
  const questions = flattenCim(sets);

  return <CimNotes questions={questions} />;
}
