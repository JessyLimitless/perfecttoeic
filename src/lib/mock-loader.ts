import { promises as fs } from "fs";
import path from "path";
import { loadListeningSets } from "@/lib/listening-loader";
import { loadAllSets } from "@/lib/sets-loader";
import type { PassageSet } from "@/game/types";
import { composeMock, type MockBank, type MockExam } from "@/game/mock";

const MOCK_DIR = path.join(process.cwd(), "content", "mock");

/**
 * content/mock/*.md 의 **전용 실전 모의고사 RC 세트**를 파싱한다(있을 때만).
 * 은행(content/sets)과 별개로, 실전 길이·패러프레이즈 밀도를 갖춘 프리미엄 1회분.
 * id 정렬로 Part 5 → 6 → 7(단일→이중→삼중) 순서가 되도록 파일명을 짓는다
 * (m1-p5-*, m1-p6-*, m1-p7-1-single-*, m1-p7-2-double-*, m1-p7-3-triple-*).
 * 형식이 깨진 파일은 조용히 건너뛴다. 디렉터리가 없으면 빈 배열.
 */
export async function loadMockRcSets(): Promise<PassageSet[]> {
  let files: string[];
  try {
    files = await fs.readdir(MOCK_DIR);
  } catch {
    return []; // content/mock 없음 → 은행 폴백
  }
  const sets: PassageSet[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(MOCK_DIR, file), "utf8");
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

/**
 * 풀렝스 실전 모의고사를 조립한다.
 * - LC(Part 2·3·4): 기존 오디오 은행(content/listening) 재사용.
 * - RC(Part 5·6·7): **content/mock 전용 세트가 있으면 그걸 사용**(실전 길이·난도),
 *   없으면 기존 은행(content/sets)에서 조립(폴백).
 * composeMock 이 결정론적 조립을 하므로 세션이 끊겨도 동일하게 이어진다.
 */
export async function loadMock(): Promise<MockExam> {
  const [listening, rc, dedicatedRc] = await Promise.all([
    loadListeningSets(),
    loadAllSets(),
    loadMockRcSets(),
  ]);
  const bank: MockBank = { listening, rc };
  return composeMock(bank, dedicatedRc);
}
