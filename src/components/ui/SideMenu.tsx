"use client";

import { useRouter } from "next/navigation";

/**
 * 단계 화면 하단의 보조 메뉴.
 *
 * 랜딩은 900점 시퀀스 3단계만 남겼기 때문에, 그 밖의 기능들은
 * "그 단계에서 쓸 법한 곳"에 붙여 둔다. (몸풀기·발음 → 패턴 / 리스닝·유형별 → 게임 / 진단 → 실전)
 */
export interface SideMenuItem {
  label: string;
  href: string;
  hint: string;
  icon: string;
}

export default function SideMenu({
  title = "함께 쓰면 좋아요",
  items,
}: {
  title?: string;
  items: readonly SideMenuItem[];
}) {
  const router = useRouter();
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <p className="mb-2.5 px-1 text-[11px] font-black uppercase tracking-[0.14em] text-neutral-400">
        {title}
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((m) => (
          <button
            key={m.href}
            type="button"
            onClick={() => router.push(m.href)}
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-neutral-900/[0.06] transition hover:ring-neutral-900/[0.16] active:scale-[0.99]"
          >
            <span className="text-[19px] leading-none">{m.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-bold text-neutral-800">
                {m.label}
              </span>
              <span className="block truncate text-[11.5px] text-neutral-400">
                {m.hint}
              </span>
            </span>
            <span className="text-[13px] text-neutral-300">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
