#!/usr/bin/env node
// 패턴학습 책자 — content/patterns/*.md(JSON) → 시맨틱 HTML → 인쇄용 PDF.
// 조판 로직은 pattern-book-render.mjs가 담당(라이브 프리뷰 서버와 공유). 이 스크립트는 PDF 출력만.
// 사용: node scripts/build-pattern-html.mjs            (전체 PDF)
//       node scripts/build-pattern-html.mjs --sample   (p5·p7 각 1패턴, 빠른 미리보기)
import fs from "node:fs";
import puppeteer from "puppeteer-core";
import { buildBookHtml } from "./pattern-book-render.mjs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SAMPLE = process.argv.includes("--sample");
const OUT = SAMPLE ? "패턴학습_샘플_new.pdf" : "패턴학습_책자.pdf";

const html = buildBookHtml(SAMPLE);
fs.writeFileSync("scripts/.book-preview.html", html);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, protocolTimeout: 300000, args: ["--no-sandbox", "--disable-gpu"] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load", timeout: 120000 });
await page.emulateMediaType("print");
const FOOT = `<div style="font-size:8px;width:100%;text-align:center;color:#94a3b8;font-family:sans-serif;">토익 만점 패턴 마스터 · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`;
await page.pdf({
  path: OUT, format: "A4", printBackground: true,
  displayHeaderFooter: true, headerTemplate: "<span></span>", footerTemplate: FOOT,
  margin: { top: "14mm", bottom: "14mm", left: "0", right: "0" }, timeout: 300000,
});
await browser.close();
console.log(`✓ ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`);
