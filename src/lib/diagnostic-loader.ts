import { promises as fs } from "fs";
import path from "path";
import type { ListeningSet } from "@/game/listening";
import type { PassageSet } from "@/game/types";
import type { DiagnosticTest } from "@/game/diagnostic";

const DIR = path.join(process.cwd(), "content", "diagnostic");

/**
 * content/diagnostic/*.md 를 읽어 진단 테스트(LC + RC)를 구성한다.
 * LC(part 2/3/4)=ListeningSet, RC(part 5/6/7)=PassageSet.
 * 형식 깨진 파일은 조용히 건너뜀(문제은행과 동일 정책).
 */
export async function loadDiagnosticTest(): Promise<DiagnosticTest> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return { lc: [], rc: [] };
  }

  const lc: ListeningSet[] = [];
  const rc: PassageSet[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const m = raw.match(/```json\s*([\s\S]*?)```/);
      if (!m) continue;
      const data = JSON.parse(m[1]);
      if (!data?.id || !data.part) continue;
      if (data.part === 2 || data.part === 3 || data.part === 4) {
        const ok =
          data.part === 2
            ? Array.isArray(data.items) && data.items.length > 0
            : Array.isArray(data.script) && Array.isArray(data.questions);
        if (ok) lc.push(data as ListeningSet);
      } else {
        if (Array.isArray(data.questions) && data.questions.length > 0) rc.push(data as PassageSet);
      }
    } catch {
      // 깨진 파일 건너뜀
    }
  }

  lc.sort((a, b) => a.part - b.part || a.id.localeCompare(b.id));
  rc.sort((a, b) => (a.part ?? 7) - (b.part ?? 7) || a.id.localeCompare(b.id));
  return { lc, rc };
}
