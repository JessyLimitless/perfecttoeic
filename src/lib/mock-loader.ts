import { loadListeningSets } from "@/lib/listening-loader";
import { loadAllSets } from "@/lib/sets-loader";
import { composeMock, type MockBank, type MockExam } from "@/game/mock";

/**
 * 기존 문제은행(리스닝 + RC)을 그대로 재사용해 풀렝스 실전 모의고사를 조립한다.
 * - LC: content/listening/*.md (Part 2·3·4)
 * - RC: content/sets/*.md (Part 5·6·7)
 * composeMock 이 id 정렬 기반 결정론적 선택을 하므로 세션이 끊겨도 동일하게 이어진다.
 */
export async function loadMock(): Promise<MockExam> {
  const [listening, rc] = await Promise.all([loadListeningSets(), loadAllSets()]);
  const bank: MockBank = { listening, rc };
  return composeMock(bank);
}
