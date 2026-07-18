// 패턴학습 책자 — 공유 렌더 모듈. content/patterns/*.md(JSON) → 시맨틱 HTML.
// 생성기(build-pattern-html.mjs, PDF)와 라이브 프리뷰 서버(pattern-book-serve.mjs)가 동일 조판을 공유한다.
// 부수효과 없음(파일 읽기는 함수 내부에서만) → import 시 아무 것도 실행되지 않는다. cwd=프로젝트 루트 기준.
import fs from "node:fs";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const PART_META = {
  5: { kicker: "PART 5 · GRAMMAR", title: "단문 공백 채우기", sub: "문법·어휘 3초 저격 — 자리(position)가 해석보다 먼저다" },
  6: { kicker: "PART 6 · TEXT COMPLETION", title: "장문 공백 채우기", sub: "지문 흐름을 예측하고 문맥·연결어·문장삽입까지 잡는다" },
  7: { kicker: "PART 7 · READING", title: "독해", sub: "지문 유형별 정답 매칭 — 근거 문장을 먼저 찾는다" },
};

const load = (slug) => JSON.parse(fs.readFileSync(`content/patterns/${slug}.md`, "utf8").match(/```json([\s\S]*?)```/)[1]);

// ── 인라인 포매터: **bold**, `code`, (N)·빈칸 강조 ──
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
// 문단 + `·`로 시작하는 줄은 정렬된 불릿 리스트로 묶는다
const block = (s, fmt = inline) => {
  const lines = String(s).split("\n").map((ln) => ln.trim()).filter(Boolean);
  let out = "", inList = false;
  for (const ln of lines) {
    const isBullet = /^[·•]/.test(ln);
    if (isBullet) {
      if (!inList) { out += '<ul class="dot">'; inList = true; }
      out += `<li>${fmt(ln.replace(/^[·•]\s*/, ""))}</li>`;
    } else {
      if (inList) { out += "</ul>"; inList = false; }
      out += `<p>${fmt(ln)}</p>`;
    }
  }
  if (inList) out += "</ul>";
  return out;
};
// 지문/프롬프트: 빈칸(______, ----, (1)) 강조 + 인라인 서식
const highlightBlanks = (s) => inline(s).replace(/_{3,}|-{3,}|\((\d{1,2})\)/g, (m) => `<span class="blank">${m}</span>`);
const passageBlock = (s) => block(s, highlightBlanks);

// ── 지문 렌더: 표형(고정폭) / 메타헤더(From/To) / 산문(2단) 3분기 ──
const renderPassage = (text) => {
  const raw = String(text);
  const isTable = /\|/.test(raw) || /-{5,}/.test(raw);
  if (isTable) {
    return `<div class="passage table"><div class="passage-tab">지문 · PASSAGE</div><pre class="passage-pre">${inline(raw)}</pre></div>`;
  }
  const lines = raw.split("\n");
  let i = 0;
  const meta = [];
  while (i < lines.length && /^(From|To|Date|Subject|Cc|Re|Sender|Recipient)\s*:/i.test(lines[i].trim())) {
    meta.push(lines[i].trim());
    i++;
  }
  const bodyText = lines.slice(i).join("\n");
  const metaHtml = meta.length
    ? `<div class="p-meta">${meta.map((m) => {
        const [k, ...v] = m.split(":");
        return `<div class="row"><span class="k">${esc(k.trim())}</span><span class="v">${inline(v.join(":").trim())}</span></div>`;
      }).join("")}</div>`
    : "";
  return `<div class="passage"><div class="passage-tab">지문 · PASSAGE</div>${metaHtml}<div class="passage-body">${passageBlock(bodyText)}</div></div>`;
};

// ── 예제 + 정답 해설 ──
function renderExample(q, idx) {
  const letter = LETTERS[q.answerIndex];
  const lines = String(q.explanation || "").split("\n").map((s) => s.trim()).filter(Boolean);
  const rationale = [], analysis = [];
  for (const ln of lines) {
    if (/^\([A-F]\)/.test(ln)) analysis.push(ln);
    else if (analysis.length === 0) rationale.push(ln);
    else analysis.push(ln);
  }
  const choices = q.choices
    .map((c, i) => {
      const on = i === q.answerIndex;
      return `<li class="choice ${on ? "correct" : ""}"><span class="ltr">${LETTERS[i]}</span><span class="txt">${inline(c)}</span></li>`;
    })
    .join("");
  const analysisHtml = analysis
    .map((a) => {
      const on = a.startsWith(`(${letter})`);
      return `<li class="${on ? "on" : "off"}">${inline(a)}</li>`;
    })
    .join("");
  return `
  <div class="ex">
    <div class="ex-head"><span class="ex-no">${idx + 1}</span><p class="ex-prompt">${highlightBlanks(q.prompt)}</p></div>
    <ol class="choices">${choices}</ol>
    <div class="ans">
      <div class="ans-head"><span class="ans-lab">정답</span><span class="ans-ltr">${letter}</span><span class="ans-choice">${inline(q.choices[q.answerIndex])}</span></div>
      <div class="ans-body">
        ${rationale.map((r) => `<p class="rat">${inline(r)}</p>`).join("")}
        ${analysisHtml ? `<ul class="ana">${analysisHtml}</ul>` : ""}
        ${q.translation ? `<p class="trn"><span>해석</span> ${inline(q.translation)}</p>` : ""}
      </div>
    </div>
  </div>`;
}

function renderPattern(p) {
  const examples = p.questions.map((q, i) => renderExample(q, i)).join("");
  const formula = p.formula
    ? `<div class="formula"><div class="f-icon">🎯</div><div class="f-body"><div class="f-label">핵심 공식</div>${block(p.formula)}</div></div>`
    : "";
  const tip = p.tip
    ? `<div class="tip"><div class="t-icon">💡</div><div class="t-body"><div class="t-label">3초컷 팁</div>${block(p.tip)}</div></div>`
    : "";
  const ctx = p.contextMap
    ? `<div class="ctxmap"><div class="ctx-h"><span class="ic">🧭</span> 지문 흐름 예측 맵</div>${block(p.contextMap)}</div>`
    : "";
  const passage = p.passage ? renderPassage(p.passage) : "";
  return `
  <section class="pattern">
    <header class="p-head">
      <span class="p-no">${String(p.no).padStart(2, "0")}</span>
      <div class="p-title-wrap"><span class="p-cat">${inline(p.category)}</span><h3 class="p-title">${inline(p.title)}</h3></div>
    </header>
    ${formula}${tip}${ctx}${passage}
    <div class="ex-wrap">${examples}</div>
  </section>`;
}

// ── 파트 커버 + 챕터 간지 ──
function partCover(part, chapters) {
  const m = PART_META[part];
  const pc = chapters.reduce((s, c) => s + c.patterns.length, 0);
  const qc = chapters.reduce((s, c) => s + c.patterns.reduce((t, p) => t + p.questions.length, 0), 0);
  return `<section class="part-cover">
    <div class="kicker">${m.kicker}</div>
    <h1>${m.title}</h1>
    <div class="sub">${m.sub}</div>
    <div class="meta"><span>패턴 ${pc}</span><span>예제 ${qc}</span><span>챕터 ${chapters.length}</span></div>
    <ol class="cover-toc">${chapters.map((c) => `<li><span class="ct-ch">CH ${c.chapter}</span><span class="ct-t">${esc(c.chapterTitle)}</span></li>`).join("")}</ol>
  </section>`;
}
function chapterHeader(part, c) {
  const nos = c.patterns.map((p) => p.no);
  return `<div class="ch-head"><span class="ch-tag">Part ${part} · Chapter ${c.chapter}</span><h2>${esc(c.chapterTitle)}</h2><span class="ch-range">패턴 ${Math.min(...nos)}–${Math.max(...nos)}</span></div>`;
}

// ── 문서 표지 ──
const docCover = () => `<section class="doc-cover">
  <div class="dc-badge">TOEIC 만점 프로젝트</div>
  <h1 class="dc-title">패턴 마스터</h1>
  <p class="dc-sub">Part 5 · 6 · 7 빈출 패턴 <b>75</b> · 실전 예제 <b>260</b></p>
  <div class="dc-parts">
    <div class="dc-p"><span class="n">P5</span><span class="l">단문 공백</span></div>
    <div class="dc-p"><span class="n">P6</span><span class="l">장문 공백</span></div>
    <div class="dc-p"><span class="n">P7</span><span class="l">독해</span></div>
  </div>
  <div class="dc-tag">공식 → 3초컷 팁 → 실전 예제 → 정답 해설</div>
</section>`;

export const CSS = `
:root{--indigo:#4f46e5;--indigo-d:#3730a3;--sky:#0ea5e9;--ink:#0f172a;--slate:#475569;--line:#e2e8f0;
  --green:#059669;--green-bg:#ecfdf5;--amber:#b45309;--amber-bg:#fffbeb;--indigo-bg:#eef2ff;}
*{box-sizing:border-box}
@page{size:A4;margin:18mm 15mm 16mm;}
html,body{margin:0;padding:0;background:#fff;color:var(--ink);
  font-family:'Pretendard','Malgun Gothic','Segoe UI',system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-size:10.5pt;line-height:1.65}
code{font-family:'Consolas',ui-monospace,monospace;background:#f1f5f9;padding:1px 6px;border-radius:5px;font-size:.92em;color:var(--indigo-d)}
strong{font-weight:700;color:var(--ink)}
p{margin:.35em 0}
ul.dot{margin:.3em 0;padding-left:1.1em;list-style:none}
ul.dot li{position:relative;padding-left:12px;margin:.18em 0}
ul.dot li::before{content:"·";position:absolute;left:0;color:var(--indigo);font-weight:800}

/* 문서 표지 */
.doc-cover{height:252mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  background:linear-gradient(160deg,#eef2ff 0%,#f8fafc 45%,#e0f2fe 100%);border-radius:0;break-after:page}
.dc-badge{letter-spacing:.3em;color:var(--indigo-d);font-weight:700;font-size:11pt;background:#fff;
  padding:8px 20px;border-radius:999px;box-shadow:0 6px 20px rgba(79,70,229,.15)}
.dc-title{font-size:52pt;margin:18px 0 6px;color:var(--indigo);letter-spacing:-.03em;font-weight:900}
.dc-sub{font-size:14pt;color:var(--slate);margin:0 0 34px}.dc-sub b{color:var(--indigo-d)}
.dc-parts{display:flex;gap:16px;margin-bottom:30px}
.dc-p{background:#fff;border-radius:16px;padding:16px 22px;box-shadow:0 8px 24px rgba(15,23,42,.08);min-width:96px}
.dc-p .n{display:block;font-size:22pt;font-weight:900;color:var(--indigo);letter-spacing:-.02em}
.dc-p .l{display:block;font-size:9.5pt;color:var(--slate);margin-top:2px}
.dc-tag{color:var(--indigo-d);font-weight:600;font-size:11pt;background:#fff;padding:9px 22px;border-radius:999px;
  box-shadow:0 4px 14px rgba(15,23,42,.06)}

/* 파트 간지 */
.part-cover{text-align:center;padding:30mm 0 20mm;break-before:page;break-after:page}
.part-cover .kicker{letter-spacing:.35em;color:var(--sky);font-weight:700;font-size:11pt}
.part-cover h1{font-size:38pt;margin:.12em 0;color:var(--indigo);letter-spacing:-.02em;font-weight:900}
.part-cover .sub{color:var(--slate);font-size:12.5pt;max-width:400px;margin:0 auto}
.part-cover .meta{margin-top:16px;display:inline-flex;gap:8px}
.part-cover .meta span{background:var(--indigo-bg);color:var(--indigo-d);padding:5px 15px;border-radius:999px;font-size:9.5pt;font-weight:700}
.cover-toc{list-style:none;max-width:440px;margin:26px auto 0;padding:0;text-align:left}
.cover-toc li{display:flex;align-items:center;gap:12px;padding:11px 16px;border:1px solid var(--line);
  border-radius:11px;margin-bottom:8px;background:#fff}
.cover-toc .ct-ch{flex:0 0 auto;font-weight:800;font-size:9pt;color:#fff;background:linear-gradient(135deg,var(--indigo),var(--sky));
  padding:3px 10px;border-radius:7px}
.cover-toc .ct-t{font-weight:600;color:var(--ink);font-size:10.5pt}

/* 챕터 간지 */
.ch-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 18px;padding:14px 20px;
  background:linear-gradient(135deg,var(--indigo),var(--sky));border-radius:14px;color:#fff;
  box-shadow:0 8px 22px rgba(79,70,229,.25);break-before:page;break-after:avoid}
.ch-head .ch-tag{font-size:8.5pt;font-weight:700;letter-spacing:.08em;background:rgba(255,255,255,.22);padding:3px 11px;border-radius:999px}
.ch-head h2{flex:1 1 auto;margin:0;font-size:16pt;font-weight:800;letter-spacing:-.01em;color:#fff}
.ch-head .ch-range{font-size:9pt;font-weight:600;opacity:.9}

/* 패턴 카드 */
.pattern{break-inside:avoid-page;margin:0 0 11mm;padding:0 0 7mm;border-bottom:1px dashed var(--line)}
.p-head{display:flex;align-items:center;gap:14px;margin:0 0 14px;break-after:avoid}
.p-no{flex:0 0 auto;width:46px;height:46px;border-radius:13px;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--indigo),var(--sky));color:#fff;font-weight:800;font-size:16pt;
  box-shadow:0 6px 16px rgba(79,70,229,.28)}
.p-cat{display:inline-block;font-size:8.5pt;font-weight:700;color:var(--indigo-d);background:var(--indigo-bg);
  padding:2px 9px;border-radius:6px;letter-spacing:.02em}
.p-title{margin:4px 0 0;font-size:14.5pt;font-weight:800;letter-spacing:-.01em;color:var(--ink)}

/* 공식 / 팁 콜아웃 */
.formula,.tip{display:flex;gap:12px;border-radius:14px;padding:14px 16px;margin:0 0 10px;break-inside:avoid}
.formula{background:linear-gradient(180deg,#f5f3ff,#eef2ff);border:1px solid #ddd6fe}
.tip{background:var(--amber-bg);border:1px solid #fde68a}
.f-icon,.t-icon{flex:0 0 auto;font-size:16pt;line-height:1}
.f-label,.t-label{font-size:8.5pt;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px}
.f-label{color:var(--indigo-d)}.t-label{color:var(--amber)}
.formula .f-body p,.tip .t-body p{margin:.2em 0}
.formula code{background:#fff}

/* 지문 흐름 맵 */
.ctxmap{background:#f8fafc;border:1px solid var(--line);border-left:4px solid var(--sky);border-radius:12px;
  padding:12px 16px;margin:0 0 12px;break-inside:avoid}
.ctx-h{font-weight:800;color:#0369a1;font-size:10pt;margin-bottom:5px}
.ctxmap p{margin:.22em 0;font-size:9.7pt;color:var(--slate)}

/* 지문 패널 */
.passage{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fcfcfd;break-inside:avoid;margin:0 0 14px}
.passage-tab{background:var(--ink);color:#fff;font-size:8.5pt;font-weight:700;letter-spacing:.1em;padding:6px 15px}
.p-meta{padding:11px 18px;border-bottom:1px solid var(--line);background:#f8fafc;display:grid;gap:2px}
.p-meta .row{display:flex;gap:10px;font-size:9.3pt}
.p-meta .k{flex:0 0 62px;font-weight:800;color:var(--indigo-d);text-transform:uppercase;font-size:8pt;letter-spacing:.03em;padding-top:1px}
.p-meta .v{flex:1;color:#1e293b}
.passage-body{padding:15px 18px;font-size:9.7pt;line-height:1.78;color:#1e293b;
  column-count:2;column-gap:26px;column-rule:1px solid var(--line)}
.passage-body p{margin:0 0 .55em;break-inside:avoid}
.passage-body p:first-child{margin-top:0}
.passage.table .passage-pre{margin:0;padding:14px 18px;font-family:'Consolas','D2Coding',ui-monospace,monospace;
  font-size:8.2pt;line-height:1.6;color:#1e293b;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere}
.blank{display:inline-block;min-width:44px;border-bottom:2px solid var(--indigo);text-align:center;
  color:var(--indigo);font-weight:700;padding:0 3px}

/* 예제 */
.ex-wrap{display:flex;flex-direction:column;gap:14px}
.ex{break-inside:avoid}
.ex-head{display:flex;gap:9px;align-items:flex-start;margin-bottom:9px}
.ex-no{flex:0 0 auto;font-weight:800;color:#fff;font-size:9pt;background:var(--indigo);border-radius:7px;padding:3px 9px;line-height:1.3}
.ex-prompt{margin:0;font-weight:500;line-height:1.6;padding-top:1px}
.choices{list-style:none;margin:0 0 10px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:7px}
.choice{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:9px;padding:0 11px;min-height:34px;font-size:9.8pt}
.choice .ltr{flex:0 0 auto;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:#f1f5f9;color:var(--slate);font-weight:700;font-size:8.5pt}
.choice .txt{flex:1}
.choice.correct{border-color:var(--green);background:var(--green-bg)}
.choice.correct .ltr{background:var(--green);color:#fff}
.choice.correct .txt{font-weight:700;color:#065f46}

/* 정답 해설 카드 */
.ans{border:1px solid #a7f3d0;border-radius:12px;overflow:hidden;background:#fff;break-inside:avoid}
.ans-head{display:flex;align-items:center;gap:9px;background:var(--green-bg);padding:7px 14px;border-bottom:1px solid #a7f3d0}
.ans-lab{flex:0 0 auto;background:var(--green);color:#fff;font-weight:800;font-size:8pt;padding:2px 10px;border-radius:999px;letter-spacing:.04em}
.ans-ltr{flex:0 0 auto;width:19px;height:19px;border-radius:50%;background:#065f46;color:#fff;display:grid;place-items:center;font-weight:800;font-size:9pt}
.ans-choice{font-weight:700;color:#065f46;font-size:10pt}
.ans-body{padding:11px 15px}
.rat{margin:0 0 7px;font-weight:500}
.ana{list-style:none;margin:0;padding:0}
.ana li{position:relative;padding:3px 0 3px 17px;font-size:9.5pt;line-height:1.5}
.ana li::before{position:absolute;left:0;top:3px;font-weight:800}
.ana li.on{color:#065f46}.ana li.on::before{content:"✓";color:var(--green)}
.ana li.on strong{color:#065f46}
.ana li.off{color:var(--slate)}.ana li.off::before{content:"✗";color:#cbd5e1}
.trn{margin:9px 0 0;font-size:9.3pt;color:var(--slate);background:#f8fafc;border-radius:8px;padding:7px 11px;line-height:1.6}
.trn span{font-size:7.5pt;font-weight:800;color:var(--indigo-d);background:var(--indigo-bg);padding:1px 6px;border-radius:5px;margin-right:6px}
`;

// ── 본문 조립 → 완성 HTML 문서 문자열 ──
export function buildBookHtml(sample = false, extraHead = "") {
  let bodyHtml;
  if (sample) {
    const p5 = load("p5-ch1").patterns.find((p) => p.id === "p5-pat-01");
    const p7 = load("p7-ch1").patterns.find((p) => p.id === "p7-pat-01");
    bodyHtml = partCover(5, [load("p5-ch1")]) + renderPattern(p5) + renderPattern(p7);
  } else {
    const sections = [docCover()];
    for (const part of [5, 6, 7]) {
      const chapters = [1, 2, 3, 4, 5].map((ch) => load(`p${part}-ch${ch}`));
      chapters.forEach((c) => c.patterns.sort((a, b) => a.no - b.no));
      sections.push(partCover(part, chapters));
      for (const c of chapters) {
        sections.push(chapterHeader(part, c));
        for (const p of c.patterns) sections.push(renderPattern(p));
      }
    }
    bodyHtml = sections.join("\n");
  }
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${CSS}</style>${extraHead}</head><body>${bodyHtml}</body></html>`;
}
