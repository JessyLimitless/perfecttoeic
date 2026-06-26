import { promises as fs } from "fs";
import path from "path";
import type { PassageSet } from "@/game/types";

const DIR = path.join(process.cwd(), "content", "sets");

/**
 * content/sets/*.md 파일들을 읽어 PassageSet[] 로 파싱한다.
 * 각 .md 파일은 ```json ... ``` 코드블록 안에 PassageSet 1개를 담는다.
 */
export async function loadAllSets(): Promise<PassageSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const sets: PassageSet[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      if (!match) continue;
      const data = JSON.parse(match[1]) as PassageSet;
      if (data?.id && Array.isArray(data.passageLines) && Array.isArray(data.questions)) {
        sets.push(data);
      }
    } catch {
      // 형식이 잘못된 파일은 건너뛴다
    }
  }
  return sets;
}
