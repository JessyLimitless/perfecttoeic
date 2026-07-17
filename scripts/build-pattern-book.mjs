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
// 3-b) 예전 방식(보이지 않는 page-break-before div)은 제거 — 챕터 페이지 나눔은 아래 인쇄 CSS가 담당
let stripped = outLines.filter((ln, i) => {
  if (ln.trim() === '<div style="page-break-before: always;"></div>') return false;
  return true;
});

// 3-c) 프리미엄 인쇄 테마(<style>) 최상단 1회 주입 — LinkMD(marked, sanitize 없음)가 화면·인쇄 모두에 적용.
//   ① 지문 검은 코드박스 → 밝은 문서 패널  ② 챕터 헤딩 = 컬러 간지 배너(+인쇄 새 페이지)  ③ 요약표·대제목 정리
const THEME_MARK = "<!-- pattern-book-theme -->";
const THEME = `${THEME_MARK}
<style>
/* ===== 패턴 마스터 · 프리미엄 인쇄 테마 (LinkMD viewer/print 공통) ===== */
.md-render{--pb-indigo:#4f46e5;--pb-sky:#0ea5e9;--pb-ink:#0f172a;--pb-line:#e2e8f0}
/* 지문: 검은 코드박스 → 밝은 문서 패널 (ASCII 표 정렬 위해 monospace 유지) */
.md-render pre{background:#f8fafc!important;color:var(--pb-ink)!important;border:1px solid var(--pb-line)!important;border-left:4px solid var(--pb-indigo)!important;border-radius:12px;box-shadow:0 1px 3px rgba(15,23,42,.06);padding:22px 26px;line-height:1.8;white-space:pre-wrap!important;overflow-x:visible!important;margin:16px 0}
.md-render pre code{color:var(--pb-ink)!important;background:none!important;border:0!important;padding:0!important;font-size:1rem}
/* 산문 지문(이메일·기사·편지): 비율 글꼴로 크고 읽기 좋게 */
.md-render pre code.language-prose{font-family:'Segoe UI','Malgun Gothic',system-ui,-apple-system,sans-serif!important;font-size:1.06rem;line-height:1.9;letter-spacing:.005em}
/* 데이터 지문(송장·일정표·표): 열 정렬 위해 고정폭 유지 */
.md-render pre code.language-data{font-family:'Consolas','D2Coding',ui-monospace,monospace!important;font-size:.93rem;line-height:1.7}
.code-lang-label,.code-copy-btn{display:none!important}
/* 파트 대제목 */
.md-render h1{color:var(--pb-indigo);font-weight:800;letter-spacing:-.02em}
/* 챕터·섹션 = 시각적 간지 배너 */
.md-render h2{background:linear-gradient(135deg,var(--pb-indigo),var(--pb-sky));color:#fff!important;border:0!important;padding:13px 20px;border-radius:12px;margin:36px 0 22px;font-size:1.12rem;font-weight:700;box-shadow:0 6px 18px rgba(79,70,229,.22)}
/* 패턴 소제목 */
.md-render h3{color:#1e293b}
/* 요약 시트 표 */
.md-render table{box-shadow:0 1px 3px rgba(15,23,42,.06)}
.md-render thead th{background:linear-gradient(135deg,#eef2ff,#e0f2fe)!important;color:#3730a3!important}
/* 인쇄 최적화: 챕터마다 새 페이지 + 블록 안 잘림 */
@media print{
  .md-render h2{break-before:page;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .md-render pre,.md-render blockquote,.md-render table{break-inside:avoid}
  .md-render h1,.md-render h2,.md-render h3{break-after:avoid}
}
</style>
`;
if (stripped[0] !== THEME_MARK) {
  stripped = [...THEME.split("\n"), ...stripped];
  console.log("✓ 프리미엄 인쇄 테마 <style> 주입");
} else {
  // 기존 테마 블록(마커~</style> 다음 빈 줄까지) 제거 후 최신본 재주입 (멱등)
  let end = stripped.indexOf("</style>");
  if (end !== -1) { let e = end + 1; if (stripped[e] === "") e++; stripped = stripped.slice(e); }
  stripped = [...THEME.split("\n"), ...stripped];
  console.log("✓ 프리미엄 인쇄 테마 <style> 갱신");
}

// 3-d) 지문 코드펜스 언어 태그를 내용에 따라 분류 (멱등): 표(| 또는 ----- 포함)=data(고정폭) · 그 외=prose(비율글꼴)
let passageProse = 0, passageData = 0;
let joined = stripped.join("\n").replace(/```(?:text|prose|data)\n([\s\S]*?)```/g, (_m, inner) => {
  const isData = /\|/.test(inner) || /-{5,}/.test(inner);
  if (isData) passageData++; else passageProse++;
  return "```" + (isData ? "data" : "prose") + "\n" + inner + "```";
});
console.log(`✓ 지문 분류: 산문(prose) ${passageProse} · 표(data) ${passageData}`);

const result = joined;

console.log("--- 샘플(P7-01 Q1) ---");
console.log(render(flat.find((f) => f.pid === "p7-pat-01")).join("\n"));

if (write) {
  fs.writeFileSync(BOOK, result);
  console.log(`\n✓ ${BOOK} 재생성 완료 (${result.split("\n").length} lines)`);
} else {
  console.log("\n(dry-run — 실제 반영하려면 --write)");
}
