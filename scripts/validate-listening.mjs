// 리스닝 콘텐츠 통합 검증: JSON 파싱, 스키마, id 중복, 정답 범위/분포, 마커 일치.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "listening");

const VOICES = new Set(["M", "W", "Mgb", "Wgb", "Mau", "Wau", "Mca", "Wca"]);
const LETTER = ["A", "B", "C", "D"];

let errors = 0;
const err = (m) => { console.error("  ✗ " + m); errors++; };

const setIds = new Set();
const qIds = new Set();
const dist = { 2: [0, 0, 0], others: [0, 0, 0, 0] };
let setCount = 0, itemQ = 0, convQ = 0;

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith(".md")) continue;
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/```json\s*([\s\S]*?)```/);
  if (!m) { err(`${file}: json 블록 없음`); continue; }
  let data;
  try { data = JSON.parse(m[1]); } catch (e) { err(`${file}: JSON 파싱 실패 — ${e.message}`); continue; }

  setCount++;
  if (`${data.id}.md` !== file) err(`${file}: 파일명≠id(${data.id})`);
  if (setIds.has(data.id)) err(`${file}: set id 중복 ${data.id}`);
  setIds.add(data.id);
  if (![2, 3, 4].includes(data.part)) err(`${file}: part 이상 ${data.part}`);

  if (data.part === 2) {
    for (const it of data.items || []) {
      itemQ++;
      if (qIds.has(it.id)) err(`${file}: item id 중복 ${it.id}`);
      qIds.add(it.id);
      if (!VOICES.has(it.promptSpeaker)) err(`${it.id}: promptSpeaker 이상 ${it.promptSpeaker}`);
      if (!VOICES.has(it.responseSpeaker)) err(`${it.id}: responseSpeaker 이상 ${it.responseSpeaker}`);
      if (!Array.isArray(it.responses) || it.responses.length !== 3) err(`${it.id}: responses≠3`);
      it.responses?.forEach((r, i) => { if (!r.en || !r.ko) err(`${it.id}: responses[${i}] en/ko 누락`); });
      if (it.answerIndex < 0 || it.answerIndex > 2) err(`${it.id}: answerIndex 범위 ${it.answerIndex}`);
      else dist[2][it.answerIndex]++;
      // 마커 검사: (가)=N 대신 (X)=N (영문 letter)
      const mk = it.explanation?.match(/\(([A-D])\)=([0-3])/);
      if (!mk) err(`${it.id}: 정답 마커 (X)=N 없음`);
      else if (LETTER[it.answerIndex] !== mk[1] || String(it.answerIndex) !== mk[2]) err(`${it.id}: 마커 불일치 ${mk[0]} vs idx ${it.answerIndex}`);
    }
  } else {
    if (!Array.isArray(data.script) || data.script.length < 2) err(`${file}: script 부족`);
    data.script?.forEach((l, i) => {
      if (!VOICES.has(l.speaker)) err(`${data.id} script[${i}]: speaker 이상 ${l.speaker}`);
      if (!l.en || !l.ko) err(`${data.id} script[${i}]: en/ko 누락`);
    });
    for (const q of data.questions || []) {
      convQ++;
      if (qIds.has(q.id)) err(`${file}: q id 중복 ${q.id}`);
      qIds.add(q.id);
      if (!Array.isArray(q.choices) || q.choices.length !== 4) err(`${q.id}: choices≠4`);
      if (!Array.isArray(q.choicesKo) || q.choicesKo.length !== 4) err(`${q.id}: choicesKo≠4`);
      if (q.answerIndex < 0 || q.answerIndex > 3) err(`${q.id}: answerIndex 범위 ${q.answerIndex}`);
      else dist.others[q.answerIndex]++;
      const mk = q.explanation?.match(/\(([A-D])\)=([0-3])/);
      if (!mk) err(`${q.id}: 정답 마커 없음`);
      else if (LETTER[q.answerIndex] !== mk[1] || String(q.answerIndex) !== mk[2]) err(`${q.id}: 마커 불일치 ${mk[0]} vs idx ${q.answerIndex}`);
    }
  }
}

console.log(`\n세트 ${setCount}개 · Part2 item문항 ${itemQ} · Part3/4 문항 ${convQ} · 총 ${itemQ + convQ}문항`);
console.log(`set id ${setIds.size} · q id ${qIds.size}`);
console.log(`Part2 정답분포 A/B/C = ${dist[2].join("/")}`);
console.log(`Part3/4 정답분포 A/B/C/D = ${dist.others.join("/")}`);
console.log(errors === 0 ? "\n✅ 검증 통과 (오류 0)" : `\n❌ 오류 ${errors}건`);
process.exit(errors === 0 ? 0 : 1);
