// 새로 추가한 LC Part 3/4 세트의 정답 위치를 균등 분포로 재배치.
// choices/choicesKo를 재정렬해 정답을 목표 인덱스로 옮기고 answerIndex·해설 마커((A)=N)를 갱신.
// 해설이 다른 보기 글자를 본문에서 참조하지 않는(끝 마커 1회만) 세트에만 안전.
import fs from "node:fs";
import path from "node:path";

const dir = "content/listening";
const files = [];
for (let i = 42; i <= 54; i++) files.push(`lc-p3-${i}.md`);
for (let i = 40; i <= 51; i++) files.push(`lc-p4-${i}.md`);

// 세트(3문항)마다 서로 다른 위치 + 전체적으로 B/C/D를 채우는 목표 삼중조 순환
const triples = [
  [1, 2, 3], [3, 2, 1], [2, 3, 1], [1, 3, 2], [2, 1, 3],
  [3, 1, 2], [0, 2, 3], [3, 1, 0], [2, 0, 1], [1, 3, 0],
  [0, 3, 2], [2, 1, 0], [3, 0, 1],
];
const LET = ["A", "B", "C", "D"];
const dist = { A: 0, B: 0, C: 0, D: 0 };
let changed = 0;

files.forEach((fname, si) => {
  const fp = path.join(dir, fname);
  if (!fs.existsSync(fp)) return;
  const raw = fs.readFileSync(fp, "utf8");
  const m = raw.match(/```json\n([\s\S]*?)\n```/);
  if (!m) { console.log("SKIP(no json)", fname); return; }
  const obj = JSON.parse(m[1]);
  const qs = obj.questions || [];
  const targets = triples[si % triples.length];

  qs.forEach((q, qi) => {
    const ti = targets[qi % targets.length];
    const ci = q.answerIndex;
    // 보기 쌍 추출
    const pairs = q.choices.map((c, k) => ({ en: c, ko: q.choicesKo[k] }));
    const correct = pairs.splice(ci, 1)[0];
    pairs.splice(ti, 0, correct);
    q.choices = pairs.map((p) => p.en);
    q.choicesKo = pairs.map((p) => p.ko);
    q.answerIndex = ti;
    // 해설 끝 마커 (X)=N 갱신
    q.explanation = q.explanation.replace(/\([A-D]\)=\d/, `(${LET[ti]})=${ti}`);
    dist[LET[ti]]++;
    changed++;
  });

  const json = JSON.stringify(obj, null, 2);
  const out = raw.replace(/```json\n[\s\S]*?\n```/, "```json\n" + json + "\n```");
  fs.writeFileSync(fp, out, "utf8");
});

console.log("재배치 문항:", changed);
console.log("새 세트 정답분포:", dist);
