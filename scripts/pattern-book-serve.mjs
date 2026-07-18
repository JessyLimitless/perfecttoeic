#!/usr/bin/env node
// 패턴학습 책자 — 라이브 프리뷰 서버.  content/patterns/*.md 저장하면 브라우저가 자동 새로고침.
// 항상 "인쇄 준비된" 화면 → 원할 때만 Ctrl+P(또는 우측 상단 버튼)로 PDF 저장/인쇄.  재생성·재저장 단계 없음.
// 사용: node scripts/pattern-book-serve.mjs   → http://localhost:5177 열기 (cwd=프로젝트 루트)
import http from "node:http";
import fs from "node:fs";
import { spawn } from "node:child_process";
import { buildBookHtml } from "./pattern-book-render.mjs";

const PORT = 5177;
const WATCH_DIR = "content/patterns";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

// 편집 중 저장하면 자동 새로고침 + 인쇄 버튼(인쇄 시엔 숨김)
const LIVE = `
<style>@media screen{.pb-bar{position:fixed;top:14px;right:14px;z-index:9999;display:flex;gap:8px;align-items:center;
  font-family:'Malgun Gothic',sans-serif;font-size:12px}
.pb-bar .dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.18)}
.pb-bar button{border:0;border-radius:8px;padding:7px 13px;font-weight:700;cursor:pointer;background:#4f46e5;color:#fff;box-shadow:0 4px 12px rgba(79,70,229,.3)}
.pb-bar .lbl{background:#fff;color:#334155;padding:6px 11px;border-radius:8px;box-shadow:0 2px 8px rgba(15,23,42,.1)}}
@media print{.pb-bar{display:none!important}}</style>
<div class="pb-bar"><span class="lbl"><span class="dot"></span> 저장하면 자동 갱신</span><button onclick="window.print()">🖨 인쇄 / PDF</button></div>
<script>
(function(){var es=new EventSource('/__reload');es.onmessage=function(e){if(e.data==='reload')location.reload();};
es.onerror=function(){/* 서버 재시작 시 브라우저가 자동 재연결 */};})();
</script>`;

const clients = new Set();
function notify() { for (const res of clients) { try { res.write("data: reload\n\n"); } catch {} } }

// 디바운스 감시 (에디터가 저장 시 여러 이벤트를 쏘므로 묶는다)
let timer = null;
try {
  fs.watch(WATCH_DIR, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => { console.log("  ↻ 변경 감지 → 새로고침"); notify(); }, 160);
  });
} catch (e) {
  console.warn("⚠ 파일 감시 실패(수동 새로고침 필요):", e.message);
}

const server = http.createServer((req, res) => {
  if (req.url === "/__reload") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    res.write("retry: 1000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }
  // 매 요청마다 소스에서 새로 조판 → 최신 반영. JSON 편집 중 깨지면 에러를 화면에 표시(크래시 X).
  try {
    const html = buildBookHtml(false).replace("</body>", LIVE + "</body>");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(html);
  } catch (err) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(`<!doctype html><meta charset="utf-8"><body style="font-family:Malgun Gothic,sans-serif;padding:40px;color:#b91c1c">
      <h2>⚠ 조판 오류 — content/patterns JSON을 확인하세요</h2>
      <pre style="white-space:pre-wrap;background:#fef2f2;border:1px solid #fecaca;padding:16px;border-radius:10px;color:#991b1b">${String(err.stack || err).replace(/</g, "&lt;")}</pre>
      <p style="color:#64748b">고치고 저장하면 이 화면이 자동으로 되살아납니다.</p>
      <script>var es=new EventSource('/__reload');es.onmessage=function(e){if(e.data==='reload')location.reload();};</script></body>`);
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n📖 패턴학습 책자 라이브 프리뷰\n   ${url}\n   ${WATCH_DIR}/*.md 저장 → 자동 새로고침 · 우측 상단 🖨 버튼(또는 Ctrl+P)으로 인쇄/PDF\n   종료: Ctrl+C\n`);
  if (fs.existsSync(CHROME) && !process.argv.includes("--no-open")) {
    try { spawn(CHROME, [url], { detached: true, stdio: "ignore" }).unref(); } catch {}
  }
});
