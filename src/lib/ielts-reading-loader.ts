import { promises as fs } from "fs";
import path from "path";
import type { IeltsReadingSet } from "@/game/ielts";

const DIR = path.join(process.cwd(), "content", "ielts-reading");

/**
 * content/ielts-reading/*.md 를 읽어 IeltsReadingSet[] 으로 파싱한다.
 * 리스닝 로더와 같은 정책: ```json 블록 1개 = 세트 1개, 깨진 파일은 조용히 건너뛴다.
 * (그래서 생성 후 scripts/validate-ielts.mjs 로 반드시 검증할 것.)
 */
export async function loadIeltsReadingSets(): Promise<IeltsReadingSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const sets: IeltsReadingSet[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      if (!match) continue;
      const data = JSON.parse(match[1]) as IeltsReadingSet;
      if (!data?.id || !data.passageNo) continue;
      if (!Array.isArray(data.paragraphs) || data.paragraphs.length === 0) continue;
      if (!Array.isArray(data.questions) || data.questions.length === 0) continue;
      sets.push(data);
    } catch {
      // 형식이 잘못된 파일은 건너뛴다
    }
  }

  sets.sort((a, b) => a.passageNo - b.passageNo || a.id.localeCompare(b.id));
  return sets;
}
