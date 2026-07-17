#!/usr/bin/env node
// 패턴학습_책자.md → 인쇄용 PDF (Chrome/Puppeteer print-to-PDF).
// LinkMD와 동일하게 marked + LinkMD viewer/print CSS로 렌더한 뒤, Chrome으로 인쇄해
// 페이지 번호(하단) · 러닝헤더(상단 책 제목) · 표지 · 챕터별 새 페이지가 든 진짜 책자를 만든다.
// 사용: node scripts/build-pattern-pdf.mjs
import fs from "node:fs";
import { marked } from "file:///C:/Users/j0708/Desktop/LinkMD/node_modules/marked/lib/marked.esm.js";
import puppeteer from "puppeteer-core";

const SRC = "패턴학습_책자.md";
const OUT = "패턴학습_책자.pdf";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const LMD_CSS = "C:/Users/j0708/Desktop/LinkMD/public/css";

const md = fs.readFileSync(SRC, "utf8");
marked.setOptions({ gfm: true, breaks: false });
const body = marked.parse(md);

// LinkMD 뷰어 CSS를 인라인해 화면과 동일한 룩 확보 (+ 책자 <style> 테마는 본문에 이미 포함됨)
const linkmdCss = ["variables.css", "viewer.css", "print.css"]
  .map((f) => fs.readFileSync(`${LMD_CSS}/${f}`, "utf8"))
  .join("\n\n");

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<style>
${linkmdCss}
/* --- PDF 조판 보정 --- */
@page { size: A4; }
html, body { margin: 0; padding: 0; background: #fff; }
body.print-page { padding: 0; }
.print-page .md-render {
  max-width: none; margin: 0 auto; padding: 0;
  font-size: 10.5pt; line-height: 1.7; color: #18181B;
}
/* 표지: 첫 화면(문서 제목 블록)을 한 페이지로 */
.md-render > div[align="center"]:first-of-type { padding-top: 60mm; }
</style>
</head>
<body class="print-page"><article class="md-render">${body}</article></body></html>`;

const HEADER = `<div style="font-size:8px;width:100%;text-align:center;color:#94a3b8;font-family:'Malgun Gothic',sans-serif;padding:0 12mm;">토익 만점 패턴 마스터 · Part 5 · 6 · 7</div>`;
const FOOTER = `<div style="font-size:9px;width:100%;text-align:center;color:#475569;font-family:'Malgun Gothic',sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  timeout: 120000,
  protocolTimeout: 300000,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--no-first-run", "--no-default-browser-check"],
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load", timeout: 120000 });
await page.emulateMediaType("print");
await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: HEADER,
  footerTemplate: FOOTER,
  margin: { top: "20mm", bottom: "16mm", left: "14mm", right: "14mm" },
  timeout: 300000,
});
await browser.close();

const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`✓ ${OUT} 생성 (${kb} KB)`);
