#!/usr/bin/env node
// 패턴학습_책자.md 의 예제 해설(✅ 정답 블록)을 content/patterns/*.md 최신 데이터로 재생성한다.
// 책자의 나머지(머리말·목차·파트 배너·요약 시트·공식·팁·지문·contextMap)는 수작업 큐레이션이라 손대지 않고,
// stale 해지기 쉬운 해설 블록만 1:1 순서로 교체한다.  --write 없으면 dry-run(검증만).
import fs from "node:fs";

const BOOK = "패턴학습_책자.md";
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const write = process.argv.includes("--write");

// 1) MD 문항을 책자 순서(p5-ch1..p7-ch5, no순, 문항순)로 평탄화
const order = [];
for (const part of [5, 6, 7]) for (const ch of [1, 2, 3, 4, 5]) order.push(`p${part}-ch${ch}`);
const flat = [];
for (const slug of order) {
  const raw = fs.readFileSync(`content/patterns/${slug}.md`, "utf8");
  const m = raw.match(/```json([\s\S]*?)```/);
  const j = JSON.parse(m[1]);
  j.patterns.sort((a, b) => a.no - b.no);
  for (const p of j.patterns) {
    for (const q of p.questions) {
      flat.push({
        slug, pid: p.id,
        letter: LETTERS[q.answerIndex],
        choice: q.choices[q.answerIndex],
        explanation: q.explanation || "",
        translation: q.translation ?? null,
      });
    }
  }
}

// 2) 해설 블록 렌더 (세련된 인쇄용: 정답 근거 + 🔬 보기 분석(정답 굵게) + 🔎 번역)
function render(q) {
  const lines = q.explanation.split("\n").map((s) => s.trim()).filter(Boolean);
  const rationale = [];
  const analysis = [];
  for (const ln of lines) {
    if (/^\([A-F]\)/.test(ln)) analysis.push(ln);
    else if (analysis.length === 0) rationale.push(ln);
    else analysis.push(ln); // 안전장치: 보기 뒤 추가서술도 분석에 붙임
  }
  const out = [`> ✅ **정답 · (${q.letter}) ${q.choice}**`, ">"];
  for (const r of rationale) out.push(`> ${r}`);
  if (analysis.length) {
    out.push(">", "> **🔬 보기 분석**");
    for (const a of analysis) {
      const isCorrect = a.startsWith(`(${q.letter})`);
      out.push(isCorrect ? `> - **${a}**` : `> - ${a}`);
    }
  }
  if (q.translation != null && String(q.translation).trim()) {
    out.push(">", `> 🔎 *${String(q.translation).trim()}*`);
  }
  return out;
}

// 3) 책자에서 ✅ 블록(> 로 시작하는 연속 blockquote)을 순서대로 찾아 교체
const src = fs.readFileSync(BOOK, "utf8").split("\n");
const rows = [];
for (let i = 0; i < src.length; i++) {
  const mm = src[i].match(/^> ✅ \*\*정답 · \(([A-F])\)/);
  if (!mm) continue;
  let j = i;
  while (j < src.length && src[j].startsWith(">")) j++;
  rows.push({ start: i, end: j, letter: mm[1] }); // [start,end)
}

if (rows.length !== flat.length) {
  console.error(`✗ 블록 수 불일치: 책자 ${rows.length} vs MD ${flat.length}`);
  process.exit(1);
}
const mism = [];
rows.forEach((r, k) => { if (r.letter !== flat[k].letter) mism.push(`#${k} ${flat[k].pid}: 책자(${r.letter}) vs MD(${flat[k].letter})`); });
if (mism.length) {
  console.error(`✗ 정답문자 불일치 ${mism.length}건 (순서 어긋남):`);
  console.error(mism.slice(0, 20).join("\n"));
  process.exit(1);
}
console.log(`✓ 매칭 OK: ${rows.length}블록 = MD ${flat.length}문항, 정답문자 전부 일치`);

// 뒤에서부터 교체(인덱스 안정)
const outLines = src.slice();
for (let k = rows.length - 1; k >= 0; k--) {
  outLines.splice(rows[k].start, rows[k].end - rows[k].start, ...render(flat[k]));
}
// 3-b) 각 챕터(## CHAPTER …)를 새 페이지에서 시작 — 교재형 간지. (멱등: 직전에 이미 있으면 skip)
let chapterBreaks = 0;
for (let i = 0; i < outLines.length; i++) {
  if (!/^## CHAPTER /.test(outLines[i])) continue;
  // 위쪽으로 빈 줄/앵커(<a id>)를 건너뛴 지점에 page-break div가 이미 있으면 skip
  let p = i - 1;
  while (p >= 0 && (outLines[p].trim() === "" || /^<a id=/.test(outLines[p].trim()))) p--;
  if (p >= 0 && outLines[p].includes("page-break-before")) continue;
  outLines.splice(i, 0, '<div style="page-break-before: always;"></div>', "");
  i += 2;
  chapterBreaks++;
}
console.log(`✓ 챕터 간지(page-break-before) 삽입: ${chapterBreaks}개`);

const result = outLines.join("\n");

console.log("--- 샘플(P7-01 Q1) ---");
console.log(render(flat.find((f) => f.pid === "p7-pat-01")).join("\n"));

if (write) {
  fs.writeFileSync(BOOK, result);
  console.log(`\n✓ ${BOOK} 재생성 완료 (${result.split("\n").length} lines)`);
} else {
  console.log("\n(dry-run — 실제 반영하려면 --write)");
}
