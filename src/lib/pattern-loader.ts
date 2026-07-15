import { promises as fs } from "fs";
import path from "path";
import type { PatternChapter, PatternPart, PatternType } from "@/game/patterns";

const DIR = path.join(process.cwd(), "content", "patterns");

/**
 * content/patterns/*.md 를 읽어 PatternChapter[] 로 파싱한다.
 * 각 .md 는 ```json``` 블록 안에 { chapter, chapterTitle, patterns:[...] } 를 담는다.
 * 형식이 깨진 파일은 조용히 건너뛴다. 디렉터리가 없으면 빈 배열.
 * 반환은 chapter 오름차순, 각 챕터의 patterns 는 no 오름차순.
 */
export async function loadPatternChapters(): Promise<PatternChapter[]> {
  let files: string[];
  try {
    files = await fs.readdir(DIR);
  } catch {
    return [];
  }

  const chapters: PatternChapter[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const match = raw.match(/```json\s*([\s\S]*?)```/);
      if (!match) continue;
      const data = JSON.parse(match[1]) as PatternChapter;
      if (
        typeof data?.chapter === "number" &&
        Array.isArray(data.patterns) &&
        data.patterns.every((p) => p?.id && Array.isArray(p.questions))
      ) {
        // part 미기재 파일(P5)은 5로 간주. 각 패턴에 part·chapter 주입.
        const part: PatternPart = (data.part ?? 5) as PatternPart;
        const patterns: PatternType[] = data.patterns
          .map((p) => ({ ...p, part, chapter: data.chapter }))
          .sort((a, b) => a.no - b.no);
        chapters.push({ ...data, part, patterns });
      }
    } catch {
      // 형식이 잘못된 파일은 건너뛴다
    }
  }
  return chapters.sort((a, b) => a.part - b.part || a.chapter - b.chapter);
}

/** 전체 패턴을 part → no 순서로 평탄화. */
export async function loadPatternsFlat(): Promise<PatternType[]> {
  const chapters = await loadPatternChapters();
  return chapters
    .flatMap((c) => c.patterns)
    .sort((a, b) => a.part - b.part || a.no - b.no);
}
