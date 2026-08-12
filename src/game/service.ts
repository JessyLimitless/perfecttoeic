/**
 * 서비스 선택 — 만점토익 / 만점 아이엘츠.
 *
 * 두 서비스는 콘텐츠·진도·엔진이 완전히 분리된 별개 앱이지만 **입구는 하나**다.
 * 첫 화면에서 매번 고르게 하면 클릭이 늘 뿐이라, 마지막 선택을 기억했다가 그대로 연다.
 */

export type ServiceId = "toeic" | "ielts";

const KEY = "toeic-service-v1";

export const SERVICES: Record<
  ServiceId,
  { label: string; short: string; icon: string }
> = {
  toeic: { label: "만점토익", short: "토익", icon: "📘" },
  ielts: { label: "만점 아이엘츠", short: "아이엘츠", icon: "📙" },
};

export function loadService(): ServiceId {
  if (typeof window === "undefined") return "toeic";
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw === "ielts" ? "ielts" : "toeic";
  } catch {
    return "toeic";
  }
}

export function saveService(id: ServiceId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, id);
  } catch {
    // 저장 실패해도 이번 세션 선택은 유지된다
  }
}
