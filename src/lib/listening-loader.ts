import { promises as fs } from "fs";
import path from "path";
import type { ListeningSet } from "@/game/listening";

const DIR = path.join(process.cwd(), "content", "listening");

/**
 * content/listening/*.md 파일들을 읽어 ListeningSet[] 로 파싱한다.
 * 각 .md 파일은 ```json ... ``` 코드블록 안에 ListeningSet 1개를 담는다.
 * 형식이 깨진 파일은 조용히 건너뛴다(문제은행과 동일 정책).
 */
export async function loadListeningSets(): Promise<ListeningSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const sets: ListeningSet[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      if (!match) continue;
      const data = JSON.parse(match[1]) as ListeningSet;
      if (!data?.id || !data.part) continue;
      const ok =
        data.part === 2
          ? Array.isArray(data.items) && data.items.length > 0
          : Array.isArray(data.script) && Array.isArray(data.questions) && data.questions.length > 0;
      if (ok) sets.push(data);
    } catch {
      // 형식이 잘못된 파일은 건너뛴다
    }
  }

  // 파트(2→3→4) → id 순 정렬
  sets.sort((a, b) => a.part - b.part || a.id.localeCompare(b.id));
  return sets;
}
