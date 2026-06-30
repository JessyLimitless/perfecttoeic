import { promises as fs } from "fs";
import path from "path";
import type { PassageSet } from "@/game/types";

const DIR = path.join(process.cwd(), "content", "sets");

/**
 * 레거시 콘텐츠 제외 필터.
 * `01-*`~`100-*` 처럼 숫자로 시작하는 파일은 구버전 AI/데이터 게임 세트로,
 * 토익 실전 도메인과 동떨어져 은행을 오염시킨다(테마 IT 쏠림의 주원인).
 * 신규 토익 세트는 전부 `p5/p6/p7/g` 접두 → 숫자 시작 파일만 걸러낸다.
 * 파일은 디스크에 보존하되 로딩 시점에만 제외한다.
 */
const LEGACY_FILE = /^\d/;

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
    if (LEGACY_FILE.test(file)) continue; // 레거시(구버전 게임) 세트 제외
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
