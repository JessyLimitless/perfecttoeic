#!/usr/bin/env node
/**
 * 투자자산운용사 문제집 검증 — content/cim/*.md
 *
 * 새 세트를 폴더에 떨어뜨린 뒤 이걸 돌리면, 앱이 조용히 삼키기 전에 문제를 잡아준다.
 *   node scripts/validate-cim.mjs
 *
 * 로더(src/lib/cim-loader.ts)와 **독립적으로 다시 파싱**한다(교차검증 목적).
 * 검사: 문항 인식 · 선지 4개 · 정답표 · 해설 · 번호 중복 · 과목 배정 · 정답 분포
 */

import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content", "cim");
const CIRCLED = ["①", "②", "③", "④"];
const SUBJECT_NAME = {
  1: "금융상품 및 세제",
  2: "투자운용 및 전략 II / 투자분석",
  3: "직무윤리 및 법규 / 투자운용 및 전략 I",
};

/** LaTeX 백슬래시가 제어문자로 깨져 들어온 흔적 복원 (로더와 동일 정책) */
const ESCAPE_LETTER = { "\t": "t", "\r": "r", "\f": "f", "\b": "b", "\v": "v" };
const LATEX_COMMANDS = new Set([
  "times", "rightarrow", "leftarrow", "frac", "beta", "alpha", "sigma", "Delta",
  "delta", "theta", "rho", "lambda", "gamma", "mu", "pi", "epsilon", "omega",
  "approx", "le", "ge", "neq", "pm", "cdot", "sqrt", "sum", "infty", "text",
]);
function restoreEscapes(raw) {
  return raw.replace(/[\t\r\f\b\v]([a-zA-Z]+)/g, (m, word) => {
    const full = ESCAPE_LETTER[m[0]] + word;
    return LATEX_COMMANDS.has(full) ? `\\${full}` : m;
  });
}

function parse(raw, file) {
  const errors = [];
  const warnings = [];
  const lines = restoreEscapes(raw).split(/\r?\n/);

  const questions = [];
  const answers = new Map();
  const explained = new Set();

  let subject = null;
  let cur = null;
  let inExplanation = 0;

  const flush = () => {
    if (cur) questions.push(cur);
    cur = null;
  };

  for (const line of lines) {
    const t = line.trim();

    const subj = t.match(/^#{2,3}\s*.*\[제\s*([123])\s*과목\]/);
    if (subj) {
      flush();
      inExplanation = 0;
      subject = Number(subj[1]);
      continue;
    }

    const qh = t.match(/^#{2,4}\s*Q\s*0*(\d+)\s*[.)]\s*(.*)$/i);
    if (qh) {
      flush();
      inExplanation = 0;
      cur = { no: Number(qh[1]), subject, prompt: qh[2], choices: [] };
      if (subject === null) errors.push(`Q${qh[1]}: 과목 헤딩보다 먼저 나옴`);
      if (!qh[2].trim()) errors.push(`Q${qh[1]}: 문두가 비어 있음`);
      continue;
    }

    if (t.startsWith("|") && /\*\*Q\s*\d+\s*\*\*/i.test(t)) {
      const cells = t.split("|").map((c) => c.trim());
      for (let i = 0; i < cells.length; i++) {
        const m = cells[i].match(/^\*\*Q\s*0*(\d+)\s*\*\*$/i);
        if (!m) continue;
        const idx = CIRCLED.indexOf((cells[i + 1] ?? "").replace(/\*/g, "").trim());
        if (idx < 0) {
          errors.push(`Q${m[1]}: 정답표 값이 ①~④가 아님 ("${cells[i + 1] ?? ""}")`);
          continue;
        }
        if (answers.has(Number(m[1]))) errors.push(`Q${m[1]}: 정답표에 중복 등장`);
        answers.set(Number(m[1]), idx);
      }
      continue;
    }

    const eh = t.match(/^[*-]\s*\*\*Q\s*0*(\d+)\b[^*]*\*\*[:：]?\s*(.*)$/i);
    if (eh) {
      flush();
      // 첫 줄이 비고 하위 불릿으로 이어지는 해설도 있다 → 뒤따르는 줄까지 보고 판정
      inExplanation = Number(eh[1]);
      if (eh[2].trim()) explained.add(inExplanation);
      continue;
    }
    if (inExplanation) {
      if (/^#{1,6}\s/.test(t) || t === "---") inExplanation = false;
      else if (t) explained.add(inExplanation);
      continue;
    }

    if (!cur) continue;
    const ch = t.match(/^([①②③④])\s*(.*)$/);
    if (ch) {
      const idx = CIRCLED.indexOf(ch[1]);
      if (idx !== cur.choices.length) errors.push(`Q${cur.no}: 선지 순서 어긋남 (${ch[1]})`);
      if (!ch[2].trim()) errors.push(`Q${cur.no}: ${ch[1]} 선지 내용이 비어 있음`);
      cur.choices.push(ch[2]);
    }
  }
  flush();

  for (const q of questions) {
    if (q.choices.length !== 4) errors.push(`Q${q.no}: 선지 ${q.choices.length}개 (4개여야 함)`);
    if (!answers.has(q.no)) errors.push(`Q${q.no}: 정답표에 정답 없음`);
    if (!explained.has(q.no)) warnings.push(`Q${q.no}: 해설 없음`);
    q.answerIndex = answers.get(q.no);
  }
  for (const no of answers.keys()) {
    if (!questions.some((q) => q.no === no)) {
      warnings.push(`Q${no}: 정답표에는 있으나 문항이 없음`);
    }
  }
  if (questions.length === 0) errors.push("인식된 문항이 없음 (### Q01. 형식 확인)");

  return { file, questions, errors, warnings };
}

async function main() {
  let files;
  try {
    files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".md")).sort();
  } catch {
    console.error(`✖ 폴더가 없습니다: ${DIR}`);
    process.exit(1);
  }
  if (files.length === 0) {
    console.error(`✖ content/cim 에 .md 파일이 없습니다`);
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(DIR, file), "utf8");
    results.push(parse(raw, file));
  }

  let errorCount = 0;
  let warnCount = 0;
  const seenNo = new Map();
  const bySubject = { 1: 0, 2: 0, 3: 0 };
  const dist = [0, 0, 0, 0];
  let total = 0;

  for (const r of results) {
    console.log(`\n▸ ${r.file} — ${r.questions.length}문항`);
    for (const q of r.questions) {
      total += 1;
      if (q.subject) bySubject[q.subject] += 1;
      if (typeof q.answerIndex === "number") dist[q.answerIndex] += 1;
      const prev = seenNo.get(q.no);
      if (prev) r.errors.push(`Q${q.no}: 통산 번호가 ${prev} 와 중복`);
      else seenNo.set(q.no, r.file);
    }
    for (const e of r.errors) {
      console.log(`  ✖ ${e}`);
      errorCount += 1;
    }
    for (const w of r.warnings) {
      console.log(`  ⚠ ${w}`);
      warnCount += 1;
    }
    if (r.errors.length === 0 && r.warnings.length === 0) console.log("  ✓ 이상 없음");
  }

  console.log(`\n──────── 요약 ────────`);
  console.log(`세트 ${results.length} · 총 ${total}문항`);
  for (const no of [1, 2, 3]) {
    const n = bySubject[no];
    const pct = total ? ((n / total) * 100).toFixed(1) : "0.0";
    console.log(`  제${no}과목 ${SUBJECT_NAME[no]}: ${n}문항 (${pct}%)`);
  }
  console.log(`정답 분포  ① ${dist[0]} · ② ${dist[1]} · ③ ${dist[2]} · ④ ${dist[3]}`);
  console.log(`오류 ${errorCount} · 경고 ${warnCount}`);

  if (errorCount > 0) {
    console.log(`\n✖ 오류가 있어 일부 문항이 앱에서 빠집니다. 위 항목을 고쳐주세요.`);
    process.exit(1);
  }
  console.log(`\n✓ 전부 통과 — 앱에 그대로 반영됩니다.`);
}

main();
