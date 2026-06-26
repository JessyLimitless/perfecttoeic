import fs from "fs";
const dir="content/sets";
const FLAGGED=["set-hard-contracts","p5-easy-01","p5-gE-01","p5-gE-02","p5-gE-03","p5-gE-04","p5-gE-05","p5-gE-06","p5-hard-01","p6-11","p6-13","p6-14","p6-easy-01","p6-hard-01","p7-easy-01","p7-hard-01"];
const APPLY = process.argv.includes("--apply");
const L=["가","나","다","라"];

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function seedFromStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function balancedTargets(n,rng){const base=Math.floor(n/4);let arr=[];for(let i=0;i<4;i++)for(let j=0;j<base;j++)arr.push(i);let rem=n-arr.length;const order=[0,1,2,3].sort(()=>rng()-0.5);for(let i=0;i<rem;i++)arr.push(order[i]);
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}

const files=fs.readdirSync(dir).filter(f=>f.endsWith(".md"));
let totalSwapped=0, totalSkipped=0;
const report=[];
for(const f of files){
  const raw=fs.readFileSync(dir+"/"+f,"utf8");
  const m=raw.match(/```json([\s\S]*?)```/); if(!m)continue;
  let o; try{o=JSON.parse(m[1]);}catch(e){continue;}
  if(!FLAGGED.includes(o.id))continue;
  const rng=mulberry32(seedFromStr(o.id));
  // eligible = single (X) ref in explanation (only the answer marker)
  const eligibleIdx=[]; 
  o.questions.forEach((q,i)=>{const refs=(q.explanation||"").match(/\([가나다라]\)/g)||[];if(refs.length<=1)eligibleIdx.push(i);});
  const targets=balancedTargets(eligibleIdx.length,rng);
  let swapped=0,skipped=o.questions.length-eligibleIdx.length;
  eligibleIdx.forEach((qi,k)=>{
    const q=o.questions[qi]; const ci=q.answerIndex; const ti=targets[k];
    if(ti!==ci){
      [q.choices[ci],q.choices[ti]]=[q.choices[ti],q.choices[ci]];
      [q.choicesKo[ci],q.choicesKo[ti]]=[q.choicesKo[ti],q.choicesKo[ci]];
      q.answerIndex=ti;
      // update marker (single occurrence): (letter)=digit
      q.explanation=(q.explanation||"").replace(/\([가나다라]\)\s*=\s*[0-3]/,"("+L[ti]+")="+ti);
      swapped++;
    }
  });
  const dist=[0,0,0,0]; o.questions.forEach(q=>dist[q.answerIndex]++);
  report.push(o.id+": swapped "+swapped+", skipped(multiref) "+skipped+" → dist ["+dist.join("/")+"]");
  totalSwapped+=swapped; totalSkipped+=skipped;
  if(APPLY){
    const newJson="```json\n"+JSON.stringify(o,null,2)+"\n```";
    const out=raw.slice(0,m.index)+newJson+raw.slice(m.index+m[0].length);
    fs.writeFileSync(dir+"/"+f,out);
  }
}
report.forEach(r=>console.log(r));
console.log("\n"+(APPLY?"[APPLIED]":"[DRY-RUN]")+" totalSwapped="+totalSwapped+" totalSkipped(multiref)="+totalSkipped);
