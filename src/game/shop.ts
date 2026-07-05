// 크레딧 상점 — 힌트/프리즈 소모품 + 스네이크 스킨 해금을 크레딧으로 구매.
// 크레딧/인벤토리/해금은 전부 progression/store 를 단일 소스로 사용한다.
// 스토어가 이미 PROGRESS_EVENT 를 발행하므로 여기서 별도 이벤트는 쏘지 않는다.

import {
  currentCredits,
  spendCredits,
  addHints,
  addFreezes,
  unlockSkin,
  loadProgress,
} from "@/game/progression/store";
import { SNAKE_SKINS } from "@/game/progression/types";

/** 상점 품목 종류 */
export type ShopItemKind = "hint" | "freeze" | "skin";

export interface ShopItem {
  id: string;
  kind: ShopItemKind;
  /** 표시 이름 */
  label: string;
  /** 짧은 설명 */
  desc: string;
  /** 아이콘 이모지 */
  icon: string;
  /** 크레딧 가격 */
  price: number;
  /** kind === "skin" 일 때 해금할 스킨 id */
  skinId?: string;
}

/** 소모품 품목 */
const CONSUMABLES: ShopItem[] = [
  {
    id: "hint-pack",
    kind: "hint",
    label: "힌트 팩",
    desc: "오답 2개를 지워주는 힌트 3개",
    icon: "💡",
    price: 60,
  },
  {
    id: "streak-freeze",
    kind: "freeze",
    label: "스트릭 프리즈",
    desc: "하루 빠져도 연속 학습 유지 (+1)",
    icon: "🧊",
    price: 40,
  },
];

/** classic(기본 보유)을 제외한 모든 스네이크 스킨을 해금 품목으로 */
const SKIN_ITEMS: ShopItem[] = Object.values(SNAKE_SKINS)
  .filter((s) => s.id !== "classic")
  .map((s) => ({
    id: `skin-${s.id}`,
    kind: "skin" as const,
    label: `${s.label} 스킨`,
    desc: "스피드 스네이크 몸통 스킨 해금",
    icon: "🐍",
    price: 200,
    skinId: s.id,
  }));

/** 상점 전체 품목 (소모품 → 스킨 순) */
export const SHOP_ITEMS: ShopItem[] = [...CONSUMABLES, ...SKIN_ITEMS];

/** id 로 품목 조회 */
export function itemById(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((i) => i.id === id);
}

/** 스킨이 이미 보유(해금)됐는지 */
export function isSkinOwned(skinId: string): boolean {
  return loadProgress().unlocks.snakeSkins.includes(skinId);
}

export interface BuyResult {
  ok: boolean;
  /** 실패 사유 (표시용) */
  reason?: string;
}

/**
 * 품목 구매 — 크레딧 확인 → 차감 → 효과 적용.
 * 스토어가 PROGRESS_EVENT 를 발행하므로 UI 는 자동 갱신된다.
 */
export function buy(itemId: string): BuyResult {
  const item = itemById(itemId);
  if (!item) return { ok: false, reason: "존재하지 않는 상품입니다." };

  // 이미 보유한 스킨은 재구매 불가
  if (item.kind === "skin" && item.skinId && isSkinOwned(item.skinId)) {
    return { ok: false, reason: "이미 보유한 스킨입니다." };
  }

  // 크레딧 확인
  if (currentCredits() < item.price) {
    return { ok: false, reason: "크레딧이 부족합니다." };
  }

  // 차감 (경합 상황 대비 재확인)
  if (!spendCredits(item.price)) {
    return { ok: false, reason: "크레딧이 부족합니다." };
  }

  // 효과 적용
  switch (item.kind) {
    case "hint":
      addHints(3);
      break;
    case "freeze":
      addFreezes(1);
      break;
    case "skin":
      if (item.skinId) unlockSkin(item.skinId);
      break;
  }

  return { ok: true };
}
