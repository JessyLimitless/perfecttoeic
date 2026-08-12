// 만점 아이엘츠 콘텐츠 전수 검증 — content/ielts/*.md
//
// 검사 항목:
//   · ```json 블록 파싱 / 필수 필드 / id 중복
//   · 파일명 == id
//   · gap: answer 존재 · promptEn에 빈칸(______) 포함
//   · choice: choices/choicesKo 길이 일치 · answerIndex 범위
//   · category가 표준 8종 라벨인지
//   · 해설 말미 정답 마커가 실제 정답과 일치하는지  (gap: **답** / choice: (X)=N)
//   · script 각 줄 en/ko · voice 키 유효성
//   · 음원 존재 여부 리포트
//
// 사용: node scripts/validate-ielts.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "content", "ielts");
const AUDIO = path.join(ROOT, "public", "audio", "ielts");

const CATEGORIES = new Set([
  "자기수정",
  "숫자·계산",
  "스펠링",
  "패러프레이즈",
  "위치·방향",
  "매칭·분류",
  "오답 소거",
  "세부정보",
]);
const VOICES = new Set(["Wgb", "Mgb", "Wau", "Mau", "W", "M", "Wca", "Mca"]);
const LETTER = ["A", "B", "C", "D"];

const errors = [];
const warns = [];
const ids = new Set();
const qids = new Set();

let files = [];
try {
  files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
} catch {
  console.error(`소스 디렉터리 없음: ${DIR}`);
  process.exit(1);
}

const stats = { sets: 0, questions: 0, gap: 0, choice: 0, traps: 0, byPart: {}, byCat: {} };

for (const file of files) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/```json\s*([\s\S]*?)```/);
  if (!m) {
    errors.push(`${file}: \`\`\`json 블록 없음 (로더가 조용히 건너뜀)`);
    continue;
  }
  let set;
  try {
    set = JSON.parse(m[1]);
  } catch (e) {
    errors.push(`${file}: JSON 파싱 실패 — ${e.message}`);
    continue;
  }

  const base = file.replace(/\.md$/, "");
  if (set.id !== base) errors.push(`${file}: 파일명 ≠ id (${set.id})`);
  if (ids.has(set.id)) errors.push(`${file}: id 중복 (${set.id})`);
  ids.add(set.id);

  if (set.skill !== "LISTENING") errors.push(`${set.id}: skill이 LISTENING이 아님`);
  if (![1, 2, 3, 4].includes(set.part)) errors.push(`${set.id}: part 범위 밖 (${set.part})`);
  for (const f of ["title", "titleKo", "taskType"]) {
    if (!set[f]) errors.push(`${set.id}: ${f} 누락`);
  }
  if (typeof set.band !== "number") errors.push(`${set.id}: band 누락`);

  // 스크립트
  if (!Array.isArray(set.script) || set.script.length === 0) {
    errors.push(`${set.id}: script 없음`);
  } else {
    set.script.forEach((l, i) => {
      if (!l.en) errors.push(`${set.id} script[${i}]: en 누락`);
      if (!l.ko) errors.push(`${set.id} script[${i}]: ko 누락`);
      if (!VOICES.has(l.speaker))
        errors.push(`${set.id} script[${i}]: 알 수 없는 voice 키 "${l.speaker}"`);
    });
  }

  // 문항
  if (!Array.isArray(set.questions) || set.questions.length === 0) {
    errors.push(`${set.id}: questions 없음`);
    continue;
  }

  stats.sets += 1;
  stats.byPart[set.part] = (stats.byPart[set.part] ?? 0) + set.questions.length;

  for (const q of set.questions) {
    stats.questions += 1;
    if (qids.has(q.id)) errors.push(`${set.id}: 문항 id 중복 (${q.id})`);
    qids.add(q.id);
    if (!q.id?.startsWith(set.id)) warns.push(`${q.id}: 문항 id가 세트 id로 시작하지 않음`);

    for (const f of ["promptEn", "promptKo", "explanation", "category"]) {
      if (!q[f]) errors.push(`${q.id}: ${f} 누락`);
    }
    if (!CATEGORIES.has(q.category))
      errors.push(`${q.id}: 표준 category 아님 — "${q.category}"`);
    stats.byCat[q.category] = (stats.byCat[q.category] ?? 0) + 1;
    if (q.trap) stats.traps += 1;
    else warns.push(`${q.id}: trap 없음 (덫 없는 문항)`);

    if (q.kind === "gap") {
      stats.gap += 1;
      if (!q.answer) errors.push(`${q.id}: gap인데 answer 없음`);
      if (!/_{3,}/.test(q.promptEn))
        errors.push(`${q.id}: gap인데 promptEn에 빈칸(______) 없음`);
      // 해설 마커: **정답**
      const marks = [...(q.explanation ?? "").matchAll(/\*\*(.+?)\*\*/g)].map((x) => x[1]);
      if (marks.length === 0) {
        errors.push(`${q.id}: 해설에 정답 마커(**답**) 없음`);
      } else {
        const norm = (s) => String(s).trim().toLowerCase();
        const ok = marks.some(
          (mk) => norm(mk) === norm(q.answer) || (q.accept ?? []).some((a) => norm(a) === norm(mk)),
        );
        if (!ok)
          errors.push(
            `${q.id}: 해설 마커(${marks.join(" / ")})가 정답(${q.answer})과 불일치`,
          );
      }
    } else if (q.kind === "choice") {
      stats.choice += 1;
      const n = q.choices?.length ?? 0;
      if (n < 2) errors.push(`${q.id}: choices 부족 (${n})`);
      if ((q.choicesKo?.length ?? 0) !== n)
        errors.push(`${q.id}: choicesKo 개수 불일치 (${q.choicesKo?.length} ≠ ${n})`);
      if (!Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= n)
        errors.push(`${q.id}: answerIndex 범위 밖 (${q.answerIndex})`);
      // 해설 마커: (X)=N
      const mk = (q.explanation ?? "").match(/\(([A-D])\)\s*=\s*(\d)/);
      if (!mk) {
        errors.push(`${q.id}: 해설에 정답 마커((X)=N) 없음`);
      } else {
        const [, letter, num] = mk;
        if (Number(num) !== q.answerIndex)
          errors.push(`${q.id}: 마커 번호(${num}) ≠ answerIndex(${q.answerIndex})`);
        if (letter !== LETTER[q.answerIndex])
          errors.push(`${q.id}: 마커 글자(${letter}) ≠ ${LETTER[q.answerIndex]}`);
      }
    } else {
      errors.push(`${q.id}: kind가 gap/choice가 아님 (${q.kind})`);
    }
  }

  // 음원
  const mp3 = path.join(AUDIO, `${set.id}.mp3`);
  if (!fs.existsSync(mp3)) warns.push(`${set.id}: 음원 없음 (${set.id}.mp3)`);
  else if (fs.statSync(mp3).size === 0) errors.push(`${set.id}: 음원 0바이트`);
}

console.log("─".repeat(60));
console.log(`세트 ${stats.sets} · 문항 ${stats.questions} (gap ${stats.gap} / choice ${stats.choice})`);
console.log(`덫 있는 문항 ${stats.traps} / ${stats.questions}`);
console.log(
  "파트별:",
  Object.entries(stats.byPart)
    .map(([p, n]) => `P${p} ${n}`)
    .join(" · "),
);
console.log(
  "덫 유형:",
  Object.entries(stats.byCat)
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `${c} ${n}`)
    .join(" · "),
);
console.log("─".repeat(60));

if (warns.length) {
  console.log(`\n⚠️  경고 ${warns.length}건`);
  for (const w of warns) console.log("   " + w);
}

if (errors.length) {
  console.log(`\n❌ 오류 ${errors.length}건`);
  for (const e of errors) console.log("   " + e);
  process.exit(1);
}

console.log("\n✅ 오류 0 — 전부 통과");
