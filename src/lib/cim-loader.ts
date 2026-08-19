import { promises as fs } from "fs";
import path from "path";
import type { CimQuestion, CimSet, CimSubject } from "@/game/cim";

const DIR = path.join(process.cwd(), "content", "cim");

/**
 * content/cim/*.md — **문제집 원문 마크다운을 그대로** 읽는다.
 *
 * 다른 콘텐츠(토익·아이엘츠)는 ```json 블록을 쓰지만 여기는 일부러 원문 포맷을 그대로 받는다.
 * 이유: 나머지 문항을 사용자가 직접 문서로 만들어 폴더에 떨어뜨리는 방식이기 때문이다.
 * JSON 변환 단계를 끼우면 업로드할 때마다 손이 가고, 그 손이 가는 순간 콘텐츠는 안 쌓인다.
 *
 * 기대하는 문서 구조 (Set01·Set02와 동일):
 *   # ... [Set 01 - 50제]                    ← 제목(세트 id 유도)
 *   ## 📋 [제1과목] 금융상품 및 세제 (10문항)   ← 과목 구분
 *   ### Q01. 문두?                            ← 문항 시작
 *   (조건·보기 줄)                             ← 선택 — 선지 앞에 오는 자료
 *   ① 선지1 / ② 선지2 / ③ 선지3 / ④ 선지4
 *   ...
 *   | **Q01** | ③ | **Q11** | ③ | ...        ← 정답표
 *   * **Q01 해설 (정답 ③):** ...               ← 문항별 해설
 *
 * 해설 불릿은 `**Q01 해설 (정답 ③):**` / `**Q51 (정답 ④):**` 두 표기를 모두 받는다.
 */

const CIRCLED = ["①", "②", "③", "④"] as const;

/**
 * 문서를 만드는 과정에서 LaTeX 명령의 백슬래시가 **제어문자로 해석돼 버린** 흔적을 되돌린다.
 *   `\times`      → TAB + "imes"
 *   `\rightarrow` → CR  + "ightarrow"   ← 줄 중간의 CR은 선지 한 줄을 통째로 못 읽게 만든다
 *   `\frac`       → FF  + "rac"
 * 제어문자를 원래 이스케이프 문자로 되돌린 뒤, 알려진 명령일 때만 복원한다.
 */
const ESCAPE_LETTER: Record<string, string> = {
  "\t": "t",
  "\r": "r",
  "\f": "f",
  "\b": "b",
  "\v": "v",
};
const LATEX_COMMANDS = new Set([
  "times", "rightarrow", "leftarrow", "frac", "beta", "alpha", "sigma", "Delta",
  "delta", "theta", "rho", "lambda", "gamma", "mu", "pi", "epsilon", "omega",
  "approx", "le", "ge", "neq", "pm", "cdot", "sqrt", "sum", "infty", "text",
]);

export function restoreEscapes(raw: string): string {
  return raw.replace(/[\t\r\f\b\v]([a-zA-Z]+)/g, (m, word: string) => {
    const full = ESCAPE_LETTER[m[0]] + word;
    return LATEX_COMMANDS.has(full) ? `\\${full}` : m;
  });
}

/** 원문에 섞인 LaTeX을 화면에 읽히는 문자로 정리한다. */
export function normalizeText(s: string): string {
  return (
    restoreEscapes(s)
      .replace(/\\times/g, "×")
      .replace(/\\approx/g, "≈")
      .replace(/\\rightarrow/g, "→")
      .replace(/\\beta/g, "β")
      .replace(/\\alpha/g, "α")
      .replace(/\\sigma/g, "σ")
      .replace(/\\Delta/g, "Δ")
      .replace(/\\le\b/g, "≤")
      .replace(/\\ge\b/g, "≥")
      // 인라인 수식 구분자는 표시에 방해만 된다
      .replace(/\$/g, "")
      .replace(/[ \t]+/g, " ")
      .trim()
  );
}

/** `③` → 2 */
function markerToIndex(mark: string): number {
  return CIRCLED.indexOf(mark.trim() as (typeof CIRCLED)[number]);
}

/** 파일 제목의 `[Set 01 - 50제]` → `set01`. 없으면 파일명을 슬러그로. */
function deriveSetId(title: string, file: string): string {
  const m = title.match(/Set\s*0*(\d+)/i);
  if (m) return `set${m[1].padStart(2, "0")}`;
  return file
    .replace(/\.md$/i, "")
    .replace(/[^0-9a-zA-Z가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

interface Draft {
  no: number;
  subject: CimSubject;
  prompt: string;
  stimulus: string[];
  choices: string[];
}

export interface ParseResult {
  set: CimSet | null;
  /** 사람이 고쳐야 할 문제 — 검증 스크립트가 이걸 그대로 출력한다 */
  errors: string[];
}

/** 마크다운 문자열 하나를 CimSet 으로 파싱한다 (fs 접근 없음 — 테스트·검증에서 재사용). */
export function parseCimMarkdown(raw: string, file: string): ParseResult {
  const errors: string[] = [];
  // 줄을 나누기 전에 깨진 이스케이프부터 되돌린다 — 줄 중간의 CR이 선지 인식을 통째로 막는다
  const lines = restoreEscapes(raw).split(/\r?\n/);

  const titleLine = lines.find((l) => /^#\s+/.test(l)) ?? file;
  const title = normalizeText(titleLine.replace(/^#\s+/, "").replace(/[🎯📋📝💡]/g, ""));
  const setId = deriveSetId(title, file);

  const drafts: Draft[] = [];
  const answers = new Map<number, number>();
  const explanations = new Map<number, string>();

  let subject: CimSubject | null = null;
  let cur: Draft | null = null;
  let expNo: number | null = null;
  let expBuf: string[] = [];

  const flushQuestion = () => {
    if (cur) drafts.push(cur);
    cur = null;
  };
  const flushExplanation = () => {
    if (expNo !== null) {
      const text = normalizeText(expBuf.join(" "));
      if (text) explanations.set(expNo, text);
    }
    expNo = null;
    expBuf = [];
  };

  for (const line of lines) {
    const t = line.trim();

    // ── 과목 구분: ## [제N과목] ...
    const subj = t.match(/^#{2,3}\s*.*\[제\s*([123])\s*과목\]/);
    if (subj) {
      flushQuestion();
      flushExplanation();
      subject = Number(subj[1]) as CimSubject;
      continue;
    }

    // ── 문항 시작: ### Q01. 문두
    const qh = t.match(/^#{2,4}\s*Q\s*0*(\d+)\s*[.)]\s*(.*)$/i);
    if (qh) {
      flushQuestion();
      flushExplanation();
      const no = Number(qh[1]);
      if (subject === null) {
        errors.push(`${file}: Q${no} — 과목 헤딩(## [제N과목])보다 먼저 나왔습니다`);
      }
      cur = {
        no,
        subject: (subject ?? 1) as CimSubject,
        prompt: normalizeText(qh[2]),
        stimulus: [],
        choices: [],
      };
      continue;
    }

    // ── 정답표: | **Q01** | ③ | **Q11** | ③ | ...
    if (t.startsWith("|") && /\*\*Q\s*\d+\s*\*\*/i.test(t)) {
      const cells = t.split("|").map((c) => c.trim());
      for (let i = 0; i < cells.length; i++) {
        const m = cells[i].match(/^\*\*Q\s*0*(\d+)\s*\*\*$/i);
        if (!m) continue;
        const idx = markerToIndex((cells[i + 1] ?? "").replace(/\*/g, ""));
        if (idx < 0) {
          errors.push(`${file}: Q${m[1]} 정답표 값이 ①~④가 아닙니다 ("${cells[i + 1] ?? ""}")`);
          continue;
        }
        answers.set(Number(m[1]), idx);
      }
      continue;
    }

    // ── 해설 불릿: * **Q01 해설 (정답 ③):** ... / * **Q51 (정답 ④):** ...
    const eh = t.match(/^[*-]\s*\*\*Q\s*0*(\d+)\b[^*]*\*\*[:：]?\s*(.*)$/i);
    if (eh) {
      flushQuestion();
      flushExplanation();
      expNo = Number(eh[1]);
      expBuf = eh[2] ? [eh[2]] : [];
      continue;
    }

    // 해설 이어지는 줄 (하위 불릿·수식 줄)
    if (expNo !== null) {
      if (!t || /^#{1,6}\s/.test(t) || t === "---") {
        if (t === "---" || /^#{1,6}\s/.test(t)) flushExplanation();
        continue;
      }
      expBuf.push(t.replace(/^[*-]\s*/, ""));
      continue;
    }

    if (!cur) continue;

    // ── 선지: ① ~ ④
    const ch = t.match(/^([①②③④])\s*(.*)$/);
    if (ch) {
      const idx = markerToIndex(ch[1]);
      if (idx !== cur.choices.length) {
        errors.push(
          `${file}: Q${cur.no} 선지 순서가 어긋납니다 (${ch[1]} 가 ${cur.choices.length + 1}번째)`
        );
      }
      cur.choices.push(normalizeText(ch[2]));
      continue;
    }

    if (!t || t === "---") continue;

    if (cur.choices.length > 0) {
      // 선지 뒤에 붙는 줄 = 직전 선지의 줄바꿈 연속
      cur.choices[cur.choices.length - 1] = normalizeText(
        `${cur.choices[cur.choices.length - 1]} ${t}`
      );
    } else {
      // 선지 앞 = 조건·보기 자료
      cur.stimulus.push(normalizeText(t.replace(/^[>*-]\s*/, "")));
    }
  }
  flushQuestion();
  flushExplanation();

  const questions: CimQuestion[] = [];
  for (const d of drafts) {
    if (d.choices.length !== 4) {
      errors.push(`${file}: Q${d.no} 선지가 ${d.choices.length}개입니다 (4개여야 함)`);
      continue;
    }
    const answerIndex = answers.get(d.no);
    if (answerIndex === undefined) {
      errors.push(`${file}: Q${d.no} 정답표에 정답이 없습니다`);
      continue;
    }
    const explanation = explanations.get(d.no);
    if (!explanation) {
      errors.push(`${file}: Q${d.no} 해설이 없습니다`);
    }
    questions.push({
      id: `cim-${deriveSetId(title, file)}-q${String(d.no).padStart(3, "0")}`,
      no: d.no,
      setId,
      subject: d.subject,
      prompt: d.prompt,
      stimulus: d.stimulus.filter(Boolean),
      choices: d.choices,
      answerIndex,
      explanation: explanation ?? "",
    });
  }

  if (questions.length === 0) {
    errors.push(`${file}: 인식된 문항이 없습니다 (### Q01. 형식인지 확인)`);
    return { set: null, errors };
  }

  questions.sort((a, b) => a.no - b.no);
  return { set: { id: setId, title, file, questions }, errors };
}

/** content/cim/*.md 전체를 읽어 세트 배열로 돌려준다. */
export async function loadCimSets(): Promise<CimSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const sets: CimSet[] = [];
  for (const file of files.sort()) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const { set } = parseCimMarkdown(raw, file);
      if (set) sets.push(set);
    } catch {
      // 읽지 못한 파일은 건너뛴다 — 검증은 scripts/validate-cim.mjs 가 한다
    }
  }

  // 같은 id가 두 번 나오면 나중 파일에 접미사를 붙여 스케줄 키 충돌을 막는다
  const seen = new Set<string>();
  for (const s of sets) {
    if (!seen.has(s.id)) {
      seen.add(s.id);
      continue;
    }
    let n = 2;
    while (seen.has(`${s.id}-${n}`)) n++;
    const next = `${s.id}-${n}`;
    for (const q of s.questions) q.id = q.id.replace(`cim-${s.id}-`, `cim-${next}-`);
    for (const q of s.questions) q.setId = next;
    s.id = next;
    seen.add(next);
  }

  sets.sort((a, b) => {
    const an = a.questions[0]?.no ?? 0;
    const bn = b.questions[0]?.no ?? 0;
    return an - bn || a.id.localeCompare(b.id);
  });
  return sets;
}

/** 모든 세트를 문항 배열 하나로 평탄화 (통산 번호 순) */
export function flattenCim(sets: CimSet[]): CimQuestion[] {
  return sets.flatMap((s) => s.questions).sort((a, b) => a.no - b.no);
}
