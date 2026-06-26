"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePracticeStore, type PracticeRecord } from "@/game/store";
import {
  normalizeCategory,
  QUESTION_TYPE_META,
  QUESTION_TYPE_ORDER,
  type QuestionType,
} from "@/game/questionTypes";

interface TypeStat {
  key: string;
  label: string;
  solved: number;
  correct: number;
  accuracy: number;
}

/** 한 기록의 유형 키/라벨 — Part 7은 정규화 유형, Part 5·6은 문법 분류 그대로 */
function keyAndLabel(r: PracticeRecord): { key: string; label: string } {
  if (r.part === 7) {
    const t = normalizeCategory(r.question.category);
    return { key: t, label: QUESTION_TYPE_META[t].label };
  }
  const raw = r.question.category ?? "기타";
  return { key: raw, label: raw };
}

/** 유형별 정답률 분석 — 점수를 올리려면 어떤 유형을 더 풀어야 하는지 짚어준다 */
export default function TypeBreakdown({
  history,
}: {
  history: PracticeRecord[];
}) {
  const router = useRouter();
  const practiceFocus = usePracticeStore((s) => s.practiceFocus);

  if (history.length === 0) return null;

  const part = history[0].part;

  // 유형별 집계 (등장 순서 유지)
  const order: string[] = [];
  const map = new Map<
    string,
    { label: string; solved: number; correct: number }
  >();
  for (const r of history) {
    const { key, label } = keyAndLabel(r);
    let cur = map.get(key);
    if (!cur) {
      cur = { label, solved: 0, correct: 0 };
      map.set(key, cur);
      order.push(key);
    }
    cur.solved += 1;
    if (r.isCorrect) cur.correct += 1;
  }

  // Part 7은 빈출 순서로, 그 외엔 등장 순서로 정렬
  const keys =
    part === 7
      ? (QUESTION_TYPE_ORDER as string[]).filter((k) => map.has(k))
      : order;

  const stats: TypeStat[] = keys.map((key) => {
    const { label, solved, correct } = map.get(key)!;
    return { key, label, solved, correct, accuracy: Math.round((correct / solved) * 100) };
  });

  if (stats.length === 0) return null;

  // 가장 약한 유형: 정답률 최저(동률이면 더 많이 푼 쪽) — 집중 공략 대상
  const weakest = [...stats].sort(
    (a, b) => a.accuracy - b.accuracy || b.solved - a.solved,
  )[0];
  const showFocus = stats.length > 1 && weakest.accuracy < 100;
  const heading = part === 7 ? "유형별 정답률" : "문법 유형별 정답률";

  const focusWeakest = () => {
    if (part === 7) {
      practiceFocus({ part, type: weakest.key as QuestionType });
    } else {
      practiceFocus({ part, rawCategory: weakest.key });
    }
    router.push("/game");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className="card px-6 py-6 sm:px-7"
    >
      <div className="flex items-baseline justify-between">
        <p className="text-[15px] font-extrabold text-neutral-900">{heading}</p>
        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-500">
          점수 올릴 포인트
        </span>
      </div>

      {showFocus && (
        <div className="mt-3 rounded-xl bg-rose-50/70 px-3.5 py-3 ring-1 ring-rose-500/10">
          <div className="flex items-start gap-2 text-[13px] text-rose-600">
            <span className="mt-px">🎯</span>
            <span>
              <span className="font-bold">{weakest.label}</span> 유형이 가장
              약해요 ({weakest.accuracy}%). 이 유형만 집중해서 풀면 점수가 빨리
              올라요.
            </span>
          </div>
          <motion.button
            type="button"
            onClick={focusWeakest}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="mt-3 w-full rounded-xl bg-rose-500 px-4 py-2.5 text-[13.5px] font-bold text-white shadow-[0_8px_20px_-12px_rgba(244,63,94,0.8)] transition hover:bg-rose-600"
          >
            {weakest.label} 집중 연습 →
          </motion.button>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {stats.map((s, i) => (
          <Bar key={s.key} stat={s} delay={i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

function Bar({ stat, delay }: { stat: TypeStat; delay: number }) {
  const { label, solved, correct, accuracy } = stat;
  const color =
    accuracy >= 80
      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
      : accuracy >= 50
        ? "bg-gradient-to-r from-amber-300 to-amber-400"
        : "bg-gradient-to-r from-rose-400 to-rose-500";

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
        <span className="font-semibold text-neutral-800">{label}</span>
        <span className="text-neutral-400">
          <span className="font-bold tabnum text-neutral-700">{accuracy}%</span>
          <span className="ml-1.5 tabnum">
            {correct}/{solved}
          </span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${accuracy}%` }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
