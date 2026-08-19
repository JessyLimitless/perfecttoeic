"use client";

/**
 * 투운사 화면 공용 조각 — 풀이(CimStudy)와 오답노트(CimNotes)가 같은 모양으로 그린다.
 * 두 화면이 다른 모양이면 노트에서 본 문제를 시험장에서 못 알아본다.
 */

/**
 * 선지 번호는 ①②③④ 글리프 대신 **숫자 배지**로 그린다.
 * 원문 표기는 ①~④지만, 작은 크기에서 이 글리프는 폰트에 따라 안쪽 숫자가 뭉개진다
 * (같은 이유로 🪙 이모지를 SVG로 교체한 전례가 있다).
 */
export function ChoiceBadge({
  n,
  tone,
}: {
  n: number;
  tone: "idle" | "answer" | "wrong" | "dim";
}) {
  const map = {
    idle: "bg-neutral-100 text-neutral-500 ring-neutral-200",
    answer: "bg-emerald-500 text-white ring-emerald-500",
    wrong: "bg-rose-500 text-white ring-rose-500",
    dim: "bg-neutral-50 text-neutral-300 ring-neutral-200",
  } as const;
  return (
    <span
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-extrabold
        tabular-nums ring-1 ${map[tone]}`}
    >
      {n}
    </span>
  );
}

/** 원문 해설의 `**강조**` 를 실제 굵은 글씨로 — 저자가 찍어둔 핵심 포인트를 살린다 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <b key={i} className="font-bold text-neutral-900">
            {p.slice(2, -2)}
          </b>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
