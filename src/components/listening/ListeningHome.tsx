"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "../warmup/icons";

export interface ListeningCard {
  id: string;
  part: number;
  difficulty: string;
  passageType?: string;
  /** 문항 수 (Part2=items, Part3/4=questions) */
  count: number;
}

const PART_META: Record<number, { label: string; desc: string; tint: string }> = {
  2: { label: "Part 2", desc: "질문-응답 · 오디오만 듣고 A/B/C", tint: "from-cyan-500 to-teal-500" },
  3: { label: "Part 3", desc: "대화 · 문항 3개", tint: "from-sky-500 to-cyan-500" },
  4: { label: "Part 4", desc: "담화 · 문항 3개", tint: "from-blue-500 to-sky-500" },
};

export default function ListeningHome({ cards }: { cards: ListeningCard[] }) {
  const router = useRouter();
  const byPart = [2, 3, 4].map((p) => ({ part: p, sets: cards.filter((c) => c.part === p) }));

  return (
    <main className="container-narrow relative min-h-dvh overflow-hidden py-5 pb-safe sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-8 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/25 to-sky-400/15 blur-[80px]"
      />
      <button
        type="button"
        onClick={() => router.push("/")}
        className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-700 active:scale-95"
      >
        <ArrowLeft size={16} /> 로비
      </button>

      <div className="mt-3">
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-neutral-900 sm:text-[28px]">🎧 리스닝</h1>
        <p className="mt-1 text-[14px] text-neutral-500">
          Part 2·3·4 — 오디오를 듣고 객관식으로 풀어보세요. 정답과 해설·스크립트는 제출 후 공개됩니다.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {byPart.map(({ part, sets }) =>
          sets.length === 0 ? null : (
            <section key={part}>
              <div className="mb-2.5 flex items-center gap-2">
                <span className={`rounded-md bg-gradient-to-r ${PART_META[part].tint} px-2 py-0.5 text-[12px] font-extrabold text-white`}>
                  {PART_META[part].label}
                </span>
                <span className="text-[12.5px] text-neutral-400">{PART_META[part].desc}</span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {sets.map((c, i) => (
                  <motion.button
                    key={c.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => router.push(`/listening/${c.id}`)}
                    className="card-elevated group flex items-center gap-3 px-4 py-3.5 text-left transition hover:-translate-y-0.5"
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${PART_META[part].tint} text-[18px] text-white shadow-sm`}>
                      🎧
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14.5px] font-bold text-neutral-900">{c.passageType ?? c.id}</p>
                      <p className="text-[12px] text-neutral-400">
                        {c.count}문항 · {c.difficulty}
                      </p>
                    </div>
                    <span className="text-cyan-400 transition group-hover:translate-x-0.5">→</span>
                  </motion.button>
                ))}
              </div>
            </section>
          ),
        )}
      </div>
    </main>
  );
}
