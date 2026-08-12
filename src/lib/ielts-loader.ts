import { promises as fs } from "fs";
import path from "path";
import type { IeltsListeningSet } from "@/game/ielts";

const DIR = path.join(process.cwd(), "content", "ielts");

/**
 * content/ielts/*.md 를 읽어 IeltsListeningSet[] 으로 파싱한다.
 * 각 .md 는 ```json ... ``` 코드블록 안에 세트 1개를 담는다.
 * 형식이 깨진 파일은 조용히 건너뛴다(TOEIC 문제은행과 동일 정책 — 생성 후 반드시 검증할 것).
 */
export async function loadIeltsSets(): Promise<IeltsListeningSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const sets: IeltsListeningSet[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      if (!match) continue;
      const data = JSON.parse(match[1]) as IeltsListeningSet;
      if (!data?.id || !data.part) continue;
      if (!Array.isArray(data.script) || data.script.length === 0) continue;
      if (!Array.isArray(data.questions) || data.questions.length === 0) continue;
      sets.push(data);
    } catch {
      // 형식이 잘못된 파일은 건너뛴다
    }
  }

  // 파트(1→4) → id 순
  sets.sort((a, b) => a.part - b.part || a.id.localeCompare(b.id));
  return sets;
}
