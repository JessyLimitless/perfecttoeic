// 이번 세션 신규 RC 세트(p6-56~68, p7-g-65~75)만 정답 위치를 균등 재배치한다.
// 안전 스왑: choices/choicesKo 위치 교환 + answerIndex 갱신 + 해설 끝 단일 마커
// ((가~라)=N / (A~D)=N) 동기화. 정답 '내용'은 그대로 보존(위치만 이동).
// 전역 결손 우선 그리디로 A/B/C/D를 고르게 만든다.
import fs from "fs";
const dir = "content/sets";
const APPLY = process.argv.includes("--apply");
const KO = ["가", "나", "다", "라"];
const EN = ["A", "B", "C", "D"];

const files = fs
  .readdirSync(dir)
  .filter((f) => /^p6-(5[6-9]|6[0-8])\.md$/.test(f) || /^p7-g-(6[5-9]|7[0-5])\.md$/.test(f))
  .sort();

const running = [0, 0, 0, 0];
function pickTarget() {
  let best = 0;
  for (let c = 1; c < 4; c++) if (running[c] < running[best]) best = c;
  return best;
}

let swaps = 0;
const out = [];
for (const f of files) {
  const raw = fs.readFileSync(dir + "/" + f, "utf8");
  const m = raw.match(/```json([\s\S]*?)```/);
  const o = JSON.parse(m[1]);
  for (const q of o.questions) {
    const cur = q.answerIndex;
    const tgt = pickTarget();
    if (tgt !== cur) {
      [q.choices[cur], q.choices[tgt]] = [q.choices[tgt], q.choices[cur]];
      [q.choicesKo[cur], q.choicesKo[tgt]] = [q.choicesKo[tgt], q.choicesKo[cur]];
      q.answerIndex = tgt;
      let e = q.explanation || "";
      e = e.replace(new RegExp("\\(" + KO[cur] + "\\)=\\d"), "(" + KO[tgt] + ")=" + tgt);
      e = e.replace(new RegExp("\\(" + EN[cur] + "\\)=\\d"), "(" + EN[tgt] + ")=" + tgt);
      q.explanation = e;
      swaps++;
    }
    running[q.answerIndex]++;
  }
  const newJson = JSON.stringify(o, null, 2);
  const newRaw = raw.replace(/```json[\s\S]*?```/, "```json\n" + newJson + "\n```");
  out.push([f, newRaw]);
}
console.log("files", files.length, "| swaps", swaps, "| new dist A/B/C/D =", running.join("/"));
if (APPLY) {
  for (const [f, r] of out) fs.writeFileSync(dir + "/" + f, r);
  console.log("APPLIED");
} else {
  console.log("(dry run — pass --apply to write)");
}
