import fs from "fs";
const dir = "content/sets";
const APPLY = process.argv.includes("--apply");
const L = ["가", "나", "다", "라"];

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function seedFromStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}

// Build balanced target multiset of length n, with remainder slots biased toward
// the globally-deficient choices (passed in `priority`) so global dist evens out.
// Greedy-assign `n` eligible answer slots so the per-set total (fixed + eligible) is as
// balanced as possible. Among equally-low choices, prefer the globally-deficient one
// (lowest runningDist) so the global distribution also evens out. Result is shuffled.
function balancedTargets(n, rng, fixedCounts, globalDist){
  const totals = fixedCounts.slice();
  const arr = [];
  for (let s = 0; s < n; s++){
    let best = 0;
    for (let c = 1; c < 4; c++){
      if (totals[c] < totals[best] ||
         (totals[c] === totals[best] && globalDist[c] < globalDist[best])) best = c;
    }
    totals[best]++; globalDist[best]++; // reflect choice into running global priority
    arr.push(best);
  }
  for (let i = arr.length - 1; i > 0; i--){const j = Math.floor(rng() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]];}
  return arr;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

// Pass 1: load all, compute global dist & per-set eligibility
const sets = [];
for (const f of files){
  const raw = fs.readFileSync(dir + "/" + f, "utf8");
  const m = raw.match(/```json([\s\S]*?)```/); if (!m) continue;
  let o; try { o = JSON.parse(m[1]); } catch (e) { continue; }
  if (!o.id || !Array.isArray(o.questions)) continue;
  sets.push({ f, raw, m, o });
}

// Global priority = which choices are most deficient overall (lowest count first)
const globalDist = [0, 0, 0, 0];
for (const s of sets) for (const q of s.o.questions) globalDist[q.answerIndex]++;
function priorityOrder(dist){return [0,1,2,3].sort((a,b)=>dist[a]-dist[b]);}

let totalSwapped = 0, totalSkipped = 0, markerMismatch = 0, textLost = 0;
const report = [];
const runningDist = globalDist.slice(); // we adjust as we go to keep global priority fresh

for (const s of sets){
  const { o } = s;
  const rng = mulberry32(seedFromStr(o.id));
  const eligibleIdx = [];
  // Position-reference patterns the (가)-marker heuristic misses → keep these questions fixed.
  const RISKY = /\([ABCD]\)|\b(option|choice)\s*[ABCD]\b|보기\s*[ABCD]|(첫|두|세|네|다섯)\s*번째\s*(보기|선택지)/i;
  o.questions.forEach((q, i) => {
    const expl = q.explanation || "";
    if (RISKY.test(expl)) return;
    const refs = expl.match(/\([가나다라]\)/g) || [];
    if (refs.length > 1) return;                 // multiple position refs → unsafe
    // Single paren ref must point at the current answer letter (marker `(X)=N` OR prose `(X)…정답`).
    // If it names a distractor instead, swapping would mis-update → keep fixed.
    if (refs.length === 1 && refs[0] !== "(" + L[q.answerIndex] + ")") return;
    eligibleIdx.push(i);
  });
  // snapshot answer texts of eligible to verify preservation later
  const before = eligibleIdx.map(i => ({ ans: o.questions[i].choices[o.questions[i].answerIndex], ko: o.questions[i].choicesKo[o.questions[i].answerIndex] }));
  // fixed = ineligible questions keep their answer; eligible slots fill around them.
  const eligSet = new Set(eligibleIdx);
  const fixedCounts = [0, 0, 0, 0];
  o.questions.forEach((q, i) => { if (!eligSet.has(i)) fixedCounts[q.answerIndex]++; });
  // withdraw eligible old answers from the running global tally, then let balancedTargets re-add.
  eligibleIdx.forEach(i => runningDist[o.questions[i].answerIndex]--);
  const targets = balancedTargets(eligibleIdx.length, rng, fixedCounts, runningDist);
  let swapped = 0;
  const skipped = o.questions.length - eligibleIdx.length;
  eligibleIdx.forEach((qi, k) => {
    const q = o.questions[qi]; const ci = q.answerIndex; const ti = targets[k];
    if (ti !== ci){
      [q.choices[ci], q.choices[ti]] = [q.choices[ti], q.choices[ci]];
      [q.choicesKo[ci], q.choicesKo[ti]] = [q.choicesKo[ti], q.choicesKo[ci]];
      q.answerIndex = ti;
      const expl = q.explanation || "";
      let replaced;
      if (/\([가나다라]\)\s*=\s*[0-3]/.test(expl)){
        // marker form: (X)=N
        replaced = expl.replace(/\([가나다라]\)\s*=\s*[0-3]/, "(" + L[ti] + ")=" + ti);
        if (replaced === expl) markerMismatch++;
      } else if (expl.includes("(" + L[ci] + ")")){
        // prose form: single (X) ref equal to old answer letter (guaranteed by eligibility)
        replaced = expl.replace("(" + L[ci] + ")", "(" + L[ti] + ")");
      } else {
        // no answer-letter reference in text → nothing to update (safe)
        replaced = expl;
      }
      q.explanation = replaced;
      swapped++;
    }
  });
  // verify answer text preserved
  eligibleIdx.forEach((i, k) => {
    if (o.questions[i].choices[o.questions[i].answerIndex] !== before[k].ans) textLost++;
  });
  // independent post-swap consistency: any single paren ref must equal the (new) answer letter,
  // and any (X)=N marker digit must equal the (new) answerIndex.
  o.questions.forEach(q => {
    const e = q.explanation || "";
    const refs = e.match(/\([가나다라]\)/g) || [];
    if (refs.length === 1 && refs[0] !== "(" + L[q.answerIndex] + ")") { markerMismatch++; }
    const mk = e.match(/\([가나다라]\)\s*=\s*([0-3])/);
    if (mk && (mk[0].slice(1, 2) !== L[q.answerIndex] || Number(mk[1]) !== q.answerIndex)) markerMismatch++;
  });
  const dist = [0, 0, 0, 0]; o.questions.forEach(q => dist[q.answerIndex]++);
  report.push(o.id + ": swapped " + swapped + ", skipped(multiref) " + skipped + " → [" + dist.join("/") + "]");
  totalSwapped += swapped; totalSkipped += skipped;
  if (APPLY){
    const newJson = "```json\n" + JSON.stringify(o, null, 2) + "\n```";
    const out = s.raw.slice(0, s.m.index) + newJson + s.raw.slice(s.m.index + s.m[0].length);
    fs.writeFileSync(dir + "/" + s.f, out);
  }
}

const finalDist = [0, 0, 0, 0];
for (const s of sets) for (const q of s.o.questions) finalDist[q.answerIndex]++;
const tot = finalDist.reduce((a, b) => a + b, 0);
console.log("before:", globalDist.join("/"), "pct", globalDist.map(v => (v / tot * 100).toFixed(1)).join("/"));
console.log("after: ", finalDist.join("/"), "pct", finalDist.map(v => (v / tot * 100).toFixed(1)).join("/"));
const pd = { 5: [0, 0, 0, 0], 6: [0, 0, 0, 0], 7: [0, 0, 0, 0] };
for (const s of sets) for (const q of s.o.questions) pd[s.o.part || 7][q.answerIndex]++;
for (const p of [5, 6, 7]){ const d = pd[p], tt = d.reduce((a, b) => a + b, 0); console.log("  Part" + p, d.join("/"), "pct", d.map(v => (v / tt * 100).toFixed(0)).join("/")); }
console.log("\n" + (APPLY ? "[APPLIED]" : "[DRY-RUN]") + " sets=" + sets.length + " swapped=" + totalSwapped + " skipped(multiref)=" + totalSkipped + " markerMismatch=" + markerMismatch + " textLost=" + textLost);
