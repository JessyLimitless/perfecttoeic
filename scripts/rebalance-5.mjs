// 재작성한 LC P3 5세트만 정답 위치 균등 재배치.
import fs from "node:fs";
const map = {
  "content/listening/lc-p3-45.md": [1, 2, 3],
  "content/listening/lc-p3-48.md": [0, 2, 1],
  "content/listening/lc-p3-51.md": [2, 3, 0],
  "content/listening/lc-p3-53.md": [3, 0, 1],
  "content/listening/lc-p3-54.md": [2, 1, 3],
};
const LET = ["A", "B", "C", "D"];
for (const [fp, targets] of Object.entries(map)) {
  const raw = fs.readFileSync(fp, "utf8");
  const m = raw.match(/```json\n([\s\S]*?)\n```/);
  const obj = JSON.parse(m[1]);
  obj.questions.forEach((q, qi) => {
    const ti = targets[qi];
    const ci = q.answerIndex;
    if (ti === ci) return;
    const pairs = q.choices.map((c, k) => ({ en: c, ko: q.choicesKo[k] }));
    const correct = pairs.splice(ci, 1)[0];
    pairs.splice(ti, 0, correct);
    q.choices = pairs.map((p) => p.en);
    q.choicesKo = pairs.map((p) => p.ko);
    q.answerIndex = ti;
    q.explanation = q.explanation.replace(/\([A-D]\)=\d/, `(${LET[ti]})=${ti}`);
  });
  const json = JSON.stringify(obj, null, 2);
  fs.writeFileSync(fp, raw.replace(/```json\n[\s\S]*?\n```/, "```json\n" + json + "\n```"), "utf8");
  console.log("rebalanced", fp, "->", targets.join(""));
}
