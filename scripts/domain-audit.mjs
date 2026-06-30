#!/usr/bin/env node
/**
 * domain-audit.mjs — 신규 토익 세트(p5/p6/p7/g*)의 "산업 도메인" 분포 감사.
 *
 * 배경: 실제 ETS 토익은 특정 산업에 치우치지 않고 12개 안팎의 범용 비즈니스
 * 도메인을 고르게 다룬다. 우리 콘텐츠는 사용자 관심(AI·데이터) 탓에 IT/TECH에
 * 크게 쏠려 있었다(레거시 제외 후에도 신규 세트 ~7:1). 이 스크립트는 각 세트를
 * 도메인 하나로 분류해 현재 분포를 측정하고, 다양화 목표 대비 결손을 보여준다.
 *
 * 분류는 휴리스틱(키워드 가중 점수)이다. 정답키를 바꾸지 않으며 읽기 전용.
 *   node scripts/domain-audit.mjs
 */
import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content", "sets");

// ETS 토익 빈출 도메인 ↔ 시그널 키워드(소문자, 단어경계 매칭). TECH는 한 조각일 뿐.
const DOMAINS = {
  HR: ["recruit", "hiring", "candidate", "interview", "employee", "staff", "payroll", "promotion", "résumé", "resume", "onboarding", "personnel", "benefits", "vacation", "leave"],
  FACILITIES: ["maintenance", "renovation", "repair", "facility", "building", "office space", "elevator", "parking", "cleaning", "utility", "premises", "construction"],
  TRAVEL: ["flight", "airline", "hotel", "reservation", "itinerary", "boarding", "luggage", "trip", "airport", "shuttle", "booking", "passport", "departure"],
  DINING: ["restaurant", "menu", "catering", "reservation", "chef", "dining", "cuisine", "café", "cafe", "banquet"],
  RETAIL: ["store", "retail", "customer", "purchase", "discount", "sale", "refund", "warranty", "checkout", "merchandise", "shopping", "coupon"],
  LOGISTICS: ["shipment", "warehouse", "inventory", "delivery", "supplier", "vendor", "invoice", "freight", "logistics", "distribution", "stock", "courier"],
  MANUFACTURING: ["factory", "manufactur", "production", "assembly", "plant", "machinery", "quality control", "equipment", "industrial"],
  FINANCE: ["budget", "invoice", "accounting", "audit", "investment", "bank", "tax", "expense", "revenue", "payment", "finance", "loan"],
  MARKETING: ["marketing", "advertis", "campaign", "brand", "promotion", "press release", "launch", "social media", "publicity", "survey"],
  REALESTATE: ["lease", "rent", "property", "apartment", "tenant", "landlord", "real estate", "mortgage", "housing", "office lease"],
  HEALTH: ["clinic", "hospital", "patient", "doctor", "medical", "insurance", "pharmacy", "appointment", "dental", "wellness"],
  EVENTS: ["conference", "seminar", "workshop", "convention", "exhibit", "trade show", "keynote", "venue", "registration", "ceremony"],
  TECH: ["software", "data", "analytics", "algorithm", "api", "dataset", "machine learning", "cloud", "server", "dashboard", "deploy", "saas", "platform", "developer", "engineer", "startup", "database", "automation", "cybersecurity", "app "],
};

// 다양화 목표 분포(%) — TECH는 ~12%로 한 조각만. 합 100 근사.
const TARGET = {
  HR: 10, FACILITIES: 8, TRAVEL: 9, DINING: 6, RETAIL: 9, LOGISTICS: 9,
  MANUFACTURING: 7, FINANCE: 9, MARKETING: 9, REALESTATE: 5, HEALTH: 5,
  EVENTS: 7, TECH: 12,
};

function classify(text) {
  const lower = text.toLowerCase();
  let best = "UNCLASSIFIED", bestScore = 0;
  for (const [dom, kws] of Object.entries(DOMAINS)) {
    let score = 0;
    for (const kw of kws) {
      const re = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
      const m = lower.match(re);
      if (m) score += m.length;
    }
    if (score > bestScore) { bestScore = score; best = dom; }
  }
  return bestScore === 0 ? "UNCLASSIFIED" : best;
}

async function main() {
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".md") && !/^\d/.test(f));
  const counts = {};
  const byPart = { 5: {}, 6: {}, 7: {} };
  const rows = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(DIR, f), "utf8");
    const m = raw.match(/```json\s*([\s\S]*?)```/);
    if (!m) continue;
    let d;
    try { d = JSON.parse(m[1]); } catch { continue; }
    if (!d?.id || !Array.isArray(d.questions)) continue;
    // 분류용 텍스트: 지문 + 문두 + 보기(영문만)
    const text = [
      ...(d.passageLines || []).map((l) => l.en || ""),
      ...d.questions.flatMap((q) => [q.prompt || "", ...(q.choices || [])]),
    ].join(" ");
    const dom = classify(text);
    const part = d.part || 7;
    counts[dom] = (counts[dom] || 0) + 1;
    byPart[part][dom] = (byPart[part][dom] || 0) + 1;
    rows.push({ id: d.id, part, dom });
  }

  const total = rows.length;
  console.log(`\n신규 토익 세트 도메인 분포 (총 ${total}세트)\n`);
  console.log("DOMAIN          세트   현재%   목표%   결손");
  console.log("─".repeat(48));
  const allDoms = [...new Set([...Object.keys(TARGET), ...Object.keys(counts)])];
  for (const dom of allDoms.sort((a, b) => (counts[b] || 0) - (counts[a] || 0))) {
    const n = counts[dom] || 0;
    const cur = total ? (n / total) * 100 : 0;
    const tgt = TARGET[dom] ?? 0;
    const gap = tgt - cur;
    const flag = gap > 5 ? " ⬅ 보강" : gap < -5 ? " ⬅ 과다" : "";
    console.log(
      `${dom.padEnd(14)} ${String(n).padStart(4)}   ${cur.toFixed(1).padStart(5)}   ${String(tgt).padStart(5)}   ${gap >= 0 ? "+" : ""}${gap.toFixed(1)}${flag}`,
    );
  }
  console.log("\n파트별 분포:");
  for (const p of [5, 6, 7]) {
    const entries = Object.entries(byPart[p]).sort((a, b) => b[1] - a[1]);
    console.log(`  Part ${p}: ${entries.map(([k, v]) => `${k}:${v}`).join("  ")}`);
  }
}
main();
