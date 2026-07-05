"use client";

// 크레딧 상점 UI — 보유 크레딧 표시 + 품목 그리드 + 구매.
// 크레딧/보유 상태는 progression store 를 단일 소스로 읽고,
// 구매 시 스토어가 PROGRESS_EVENT 를 쏘므로 그걸 구독해 즉시 갱신한다.

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { currentCredits, loadProgress, PROGRESS_EVENT } from "@/game/progression/store";
import { SHOP_ITEMS, buy, type ShopItem } from "@/game/shop";
import { SNAKE_SKINS } from "@/game/progression/types";
import { Confetti } from "@/components/match/JennyFx";
import CoinIcon from "@/components/ui/CoinIcon";

interface Toast {
  id: number;
  ok: boolean;
  msg: string;
}

/** 구매 성공 시 카드 위에서 터지는 코인·반짝임 파티클 팝.
 *  fx.key 로 리마운트되어 한 번만 재생되고 스스로 사라진다. */
function CoinBurst() {
  // 사방으로 흩어지는 코인/반짝임 조각(마운트 시 1회만 계산)
  const bits = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const ang = (Math.PI * 2 * i) / 11 + (Math.random() - 0.5) * 0.5;
        const dist = 32 + Math.random() * 40;
        return {
          id: i,
          x: Math.cos(ang) * dist,
          y: Math.sin(ang) * dist - 12, // 살짝 위로 솟구치게
          coin: i % 3 !== 0,
          size: 12 + Math.random() * 9,
          delay: Math.random() * 0.06,
          spin: (Math.random() - 0.5) * 120,
        };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 grid place-items-center overflow-visible"
    >
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute select-none"
          style={{ fontSize: b.size, lineHeight: 1 }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.3, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: b.x,
            y: b.y,
            scale: [0.3, 1, 1, 0.7],
            rotate: b.spin,
          }}
          transition={{ duration: 0.72, delay: b.delay, ease: "easeOut" }}
        >
          {b.coin ? <CoinIcon size={b.size} /> : "✨"}
        </motion.span>
      ))}
    </div>
  );
}

export default function Shop() {
  const reduce = useReducedMotion();
  // 마운트 전엔 null → 스켈레톤 (SSR/hydration 안전)
  const [credits, setCredits] = useState<number | null>(null);
  const [owned, setOwned] = useState<string[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  // 카드 단위 피드백: 성공(팝/버스트) 또는 실패(흔들림)를 한 카드에만 건다.
  const [fx, setFx] = useState<{ id: string; key: number; ok: boolean } | null>(null);
  // 전체화면 컨페티(성공 시 remount 로 1회 재생) + 크레딧 카운터 펄스
  const [confettiKey, setConfettiKey] = useState(0);
  const [creditsPulse, setCreditsPulse] = useState(false);

  const refresh = useCallback(() => {
    setCredits(currentCredits());
    setOwned(loadProgress().unlocks.snakeSkins);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  const flash = useCallback((ok: boolean, msg: string) => {
    const id = Date.now();
    setToast({ id, ok, msg });
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 1800);
  }, []);

  const onBuy = useCallback(
    (item: ShopItem) => {
      const res = buy(item.id);
      const key = Date.now();
      if (res.ok) {
        // 성공: 카드 팝+코인버스트, 컨페티, 크레딧 펄스, 가격 명시 토스트
        setFx({ id: item.id, key, ok: true });
        setConfettiKey((k) => k + 1);
        setCreditsPulse(true);
        flash(true, `구매 완료! -${item.price} 크레딧`);
        window.setTimeout(() => setFx((f) => (f && f.key === key ? null : f)), 850);
        window.setTimeout(() => setCreditsPulse(false), 650);
      } else {
        // 실패: 해당 카드만 부드럽게 흔들고 안내 문구
        setFx({ id: item.id, key, ok: false });
        const insufficient = (res.reason ?? "").includes("부족");
        flash(false, insufficient ? "크레딧이 부족해요" : res.reason ?? "구매에 실패했습니다.");
        window.setTimeout(() => setFx((f) => (f && f.key === key ? null : f)), 480);
      }
      refresh();
    },
    [flash, refresh],
  );

  const isOwned = (item: ShopItem) =>
    item.kind === "skin" && item.skinId ? owned.includes(item.skinId) : false;

  return (
    <div className="relative">
      {/* 헤더 — 보유 크레딧 */}
      <div className="card-elevated flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <div className="label">내 지갑</div>
          <div className="mt-0.5 text-[15px] font-bold text-neutral-900">보유 크레딧</div>
        </div>
        {credits === null ? (
          <div className="skeleton h-9 w-24 rounded-full" />
        ) : (
          <div className="relative">
            {/* 구매 성공 시 크레딧 칩 주변으로 번지는 앰버 글로우 링 */}
            <AnimatePresence>
              {creditsPulse && !reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-amber-300"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.85, 1.15, 1.25] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
            <motion.div
              key={credits}
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={
                creditsPulse && !reduce
                  ? { scale: [1, 1.14, 1], opacity: 1 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-[17px] font-black text-white shadow-[0_10px_24px_-10px_rgba(245,158,11,0.7)]"
            >
              <CoinIcon size={18} /> {credits}
            </motion.div>
          </div>
        )}
      </div>

      {/* 품목 그리드 */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SHOP_ITEMS.map((item, i) => {
          const ownedItem = isOwned(item);
          const canAfford = credits !== null && credits >= item.price;
          const disabled = credits === null || ownedItem || !canAfford;
          // 스킨 품목이면 실제 스킨 그라데이션을 아이콘 타일에 입혀 색을 구분한다.
          const skinBody =
            item.kind === "skin" && item.skinId
              ? SNAKE_SKINS[item.skinId]?.body
              : undefined;

          // 이 카드에 걸린 피드백 상태
          const success = fx?.ok === true && fx.id === item.id;
          const shaking = fx?.ok === false && fx.id === item.id;

          // 카드 애니메이션: 성공=살짝 팝 / 실패=좌우 흔들림 / 평상=진입
          const cardAnim = reduce
            ? { opacity: 1, y: 0, x: 0, scale: 1 }
            : success
              ? { opacity: 1, y: 0, x: 0, scale: [1, 1.03, 1] }
              : shaking
                ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 8, -6, 6, -3, 0] }
                : { opacity: 1, y: 0, x: 0, scale: 1 };
          const cardTrans = success
            ? { duration: 0.55, ease: "easeOut" as const }
            : shaking
              ? { duration: 0.45 }
              : { delay: Math.min(i * 0.04, 0.3), type: "spring" as const, stiffness: 260, damping: 24 };

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={cardAnim}
              transition={cardTrans}
              className="card relative flex flex-col gap-3 p-4"
            >
              {/* 성공: 카드를 감싸는 에메랄드 글로우 링 (1회 재생) */}
              <AnimatePresence>
                {success && !reduce && (
                  <motion.span
                    key={`glow-${fx!.key}`}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-emerald-400/70"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: [0, 0.95, 0], scale: [0.98, 1.015, 1.03] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {/* 성공: 코인·반짝임 파티클 팝 (fx.key 로 remount) */}
              {success && !reduce && <CoinBurst key={`burst-${fx!.key}`} />}

              <div className="flex items-start gap-3">
                <motion.span
                  // 성공 시 아이콘 배지가 통통 튀고 살짝 회전(scale/glow 펄스)
                  key={success && !reduce ? `pop-${fx!.key}` : `idle-${item.id}`}
                  initial={success && !reduce ? { scale: 1 } : false}
                  animate={
                    success && !reduce
                      ? { scale: [1, 1.3, 1], rotate: [0, -10, 8, 0] }
                      : {}
                  }
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ring-1 ring-neutral-900/[0.04] ${
                    skinBody
                      ? `bg-gradient-to-br ${skinBody} text-white shadow-[0_8px_18px_-8px_rgba(0,0,0,0.4)]`
                      : "bg-gradient-to-br from-fuchsia-100 to-indigo-100"
                  } ${success ? "shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" : ""}`}
                  aria-hidden
                >
                  {item.icon}
                </motion.span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-bold text-neutral-900">{item.label}</h3>
                    {ownedItem && (
                      <span className="chip bg-emerald-500/10 text-emerald-600">보유</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-neutral-500">{item.desc}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[15px] font-black text-amber-600">
                  <CoinIcon size={15} /> {item.price}
                </span>
                <button
                  type="button"
                  onClick={() => onBuy(item)}
                  disabled={disabled}
                  className={
                    ownedItem
                      ? "rounded-2xl px-5 py-2.5 text-[13px] font-bold text-emerald-600 ring-1 ring-emerald-500/20"
                      : disabled
                        ? "cursor-not-allowed rounded-2xl bg-neutral-100 px-5 py-2.5 text-[13px] font-bold text-neutral-400"
                        : "btn-primary px-5 py-2.5 text-[13px]"
                  }
                >
                  {ownedItem ? "보유 중" : !canAfford && credits !== null ? "크레딧 부족" : "구매"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[12px] text-neutral-400">
        크레딧은 대결 승리·레벨업·미션으로 모을 수 있어요.
      </p>

      {/* 구매 성공 축포 — confettiKey 변경 시 remount 되어 1회 재생 (reduced-motion 은 내부에서 생략) */}
      {confettiKey > 0 && <Confetti key={confettiKey} trigger count={18} />}

      {/* 구매 결과 토스트 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90%] rounded-full px-5 py-3 text-[14px] font-bold text-white shadow-xl ${
              toast.ok
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : "bg-gradient-to-r from-rose-500 to-red-500"
            }`}
          >
            {toast.ok ? "✅ " : "⚠️ "}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
