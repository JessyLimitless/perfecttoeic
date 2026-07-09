"use client";

import { useEffect } from "react";
import { requestPersistentStorage } from "@/game/backup";

/**
 * 앱 로드 시 브라우저에 "이 기기 저장(localStorage)을 함부로 지우지 말아달라"고
 * 한 번 요청한다(표준 Storage API, 서버 통신 없음). 렌더링 출력은 없다.
 */
export default function PersistStorage() {
  useEffect(() => {
    void requestPersistentStorage();
  }, []);
  return null;
}
