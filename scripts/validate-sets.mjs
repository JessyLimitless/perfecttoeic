// RC 문제은행(content/sets) 통합 검증: 파싱·id중복·choices·answerIndex·정답마커((가)=N).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "sets");
const KO = ["가", "나", "다", "라"];

let errors = 0;
const err = (m) => { console.error("  ✗ " + m); errors++; };

const setIds = new Set();
const qIds = new Set();
let setCount = 0, qCount = 0;
const dist = [0, 0, 0, 0];
const byPart = {};

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith(".md")) continue;
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/```json\s*([\s\S]*?)```/);
  if (!m) continue; // 로더도 조용히 건너뜀
  let j;
  try { j = JSON.parse(m[1]); } catch (e) { err(`${file}: JSON 파싱 실패 — ${e.message}`); continue; }
  if (!j?.id || !Array.isArray(j.passageLines) || !Array.isArray(j.questions)) continue; // 로더 채택 조건 밖

  setCount++;
  if (setIds.has(j.id)) err(`${file}: set id 중복 ${j.id}`);
  setIds.add(j.id);
  const part = j.part ?? 7;
  byPart[part] = (byPart[part] || 0) + j.questions.length;

  for (const q of j.questions) {
    qCount++;
    if (qIds.has(q.id)) err(`${file}: q id 중복 ${q.id}`);
    qIds.add(q.id);
    if (!Array.isArray(q.choices) || q.choices.length !== 4) err(`${q.id}: choices≠4`);
    if (!Array.isArray(q.choicesKo) || q.choicesKo.length !== 4) err(`${q.id}: choicesKo≠4`);
    if (typeof q.answerIndex !== "number" || q.answerIndex < 0 || q.answerIndex > 3)
      err(`${q.id}: answerIndex 범위 ${q.answerIndex}`);
    else dist[q.answerIndex]++;
    // 정답 마커 (가)=N — 신규 세트 형식. 단일 마커일 때만 대조(레거시 산문형은 스킵).
    const marks = [...(q.explanation ?? "").matchAll(/\(([가나다라])\)=([0-3])/g)];
    if (marks.length === 1) {
      const [_, ko, n] = marks[0];
      if (KO[q.answerIndex] !== ko || String(q.answerIndex) !== n)
        err(`${q.id}: 마커 불일치 (${ko})=${n} vs answerIndex ${q.answerIndex}`);
    }
  }
}

console.log(`\n세트 ${setCount} · 문항 ${qCount}`);
console.log(`파트별 문항:`, JSON.stringify(byPart));
console.log(`set id ${setIds.size} · q id ${qIds.size}`);
console.log(`정답분포 A/B/C/D = ${dist.join("/")}`);
console.log(errors === 0 ? "\n✅ 검증 통과 (오류 0)" : `\n❌ 오류 ${errors}건`);
process.exit(errors === 0 ? 0 : 1);
