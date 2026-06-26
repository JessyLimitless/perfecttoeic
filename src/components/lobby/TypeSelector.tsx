"use client";

import {
  QUESTION_TYPE_META,
  QUESTION_TYPE_ORDER,
  type QuestionType,
  type TypeFilter,
} from "@/game/questionTypes";

/** 빈출 유형 선택기 — 난이도 대신 기출 문항 유형으로 학습을 고른다 */
export default function TypeSelector({
  value,
  onChange,
  counts,
  total,
}: {
  value: TypeFilter;
  onChange: (t: TypeFilter) => void;
  /** 유형별 보유 문항 수 (은행에서 집계) */
  counts: Record<QuestionType, number>;
  /** 전체 기출 문항 수 */
  total: number;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Row
        active={value === "ALL"}
        onClick={() => onChange("ALL")}
        label="전체 기출"
        enLabel="All Types"
        desc="모든 빈출 유형을 섞어서 실전처럼 풀어요"
        count={total}
      />

      {QUESTION_TYPE_ORDER.map((t) => {
        const meta = QUESTION_TYPE_META[t];
        const count = counts[t] ?? 0;
        return (
          <Row
            key={t}
            active={value === t}
            onClick={() => onChange(t)}
            label={meta.label}
            enLabel={meta.enLabel}
            desc={meta.desc}
            count={count}
            disabled={count === 0}
          />
        );
      })}
    </div>
  );
}

function Row({
  active,
  onClick,
  label,
  enLabel,
  desc,
  count,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  enLabel: string;
  desc: string;
  count: number;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex min-h-[60px] items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition disabled:cursor-not-allowed disabled:opacity-45 sm:px-5 ${
        active
          ? "bg-gradient-to-br from-indigo-50/80 to-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_14px_32px_-18px_rgba(79,70,229,0.55)] ring-2 ring-indigo-500"
          : "bg-white/70 ring-1 ring-neutral-200/80 backdrop-blur-sm hover:bg-white hover:ring-neutral-300"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-[15px] font-bold ${
              active ? "text-indigo-600" : "text-neutral-900"
            }`}
          >
            {label}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-neutral-400">
            {enLabel}
          </span>
        </div>
        <div className="mt-0.5 text-[13px] text-neutral-500">{desc}</div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold tabnum ${
          active
            ? "bg-indigo-600 text-white"
            : "bg-neutral-900/[0.05] text-neutral-500"
        }`}
      >
        {count}문항
      </span>
    </button>
  );
}
