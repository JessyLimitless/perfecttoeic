"use client";

import { useEffect, useState } from "react";
import {
  loadLastMatch,
  saveLastMatch,
  matchRouteFor,
  domainOfPart,
  type MatchDifficulty,
} from "@/game/match/lastMatch";

/**
 * 대결 조건(파트·난이도) 바 — 별도 화면 없이 대결 흐름 안에서 바로 바꾼다.
 * 고른 조건은 기억되어, 다음부터는 랜딩에서 그 조건으로 직행한다.
 *
 * tone: 대결 화면(teal/sky)에 얹을 때 색을 맞춘다.
 */
const PARTS = [
  { part: 2, label: "P2", domain: "lc" as const },
  { part: 3, label: "P3", domain: "lc" as const },
  { part: 4, label: "P4", domain: "lc" as const },
  { part: 5, label: "P5", domain: "rc" as const },
  { part: 6, label: "P6", domain: "rc" as const },
  { part: 7, label: "P7", domain: "rc" as const },
];

const DIFFS: { value: MatchDifficulty; label: string }[] = [
  { value: "AUTO", label: "자동" },
  { value: "EASY", label: "초급" },
  { value: "MEDIUM", label: "중급" },
  { value: "HARD", label: "고급" },
];

export default function MatchSetupBar({
  title = "다음 대결 조건",
  onStartLabel = "이 조건으로 대결",
  beforeStart,
}: {
  title?: string;
  onStartLabel?: string;
  /** 새 대결로 떠나기 전 정리 (예: 끝난 매치 상태 비우기) */
  beforeStart?: () => void;
}) {
  const [part, setPart] = useState<number>(7);
  const [difficulty, setDifficulty] = useState<MatchDifficulty>("AUTO");
  const [ready, setReady] = useState(false);

  // 저장된 조건 복원 (하이드레이션 후)
  useEffect(() => {
    const last = loadLastMatch();
    setPart(last.part);
    setDifficulty(last.difficulty);
    setReady(true);
  }, []);

  const pick = (p: number) => {
    setPart(p);
    saveLastMatch(domainOfPart(p), p, difficulty);
  };
  const pickDiff = (d: MatchDifficulty) => {
    setDifficulty(d);
    saveLastMatch(domainOfPart(part), part, d);
  };

  if (!ready) return null;

  return (
    <div className="rounded-2xl bg-white/95 px-4 py-3 ring-1 ring-neutral-900/10 shadow-sm">
      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.12em] text-neutral-400">
        {title}
      </p>

      {/* 파트 — 2·3·4 리스닝(하늘) / 5·6·7 리딩(보라) */}
      <div className="grid grid-cols-6 gap-1.5">
        {PARTS.map((p) => {
          const active = part === p.part;
          const lc = p.domain === "lc";
          return (
            <button
              key={p.part}
              type="button"
              onClick={() => pick(p.part)}
              className={`min-h-[40px] rounded-xl text-[13px] font-black transition active:scale-[0.97] ${
                active
                  ? lc
                    ? "bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow"
                    : "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow"
                  : "bg-neutral-50 text-neutral-400 ring-1 ring-neutral-900/[0.06] hover:text-neutral-700"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[10.5px] font-semibold text-neutral-400">
        P2·3·4 리스닝 · P5·6·7 리딩
      </p>

      {/* 난이도 */}
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {DIFFS.map((d) => {
          const active = difficulty === d.value;
          return (
            <button
              key={d.value}
              type="button"
              onClick={() => pickDiff(d.value)}
              className={`min-h-[36px] rounded-xl text-[12px] font-bold transition active:scale-[0.97] ${
                active
                  ? "bg-neutral-900 text-white shadow"
                  : "bg-neutral-50 text-neutral-400 ring-1 ring-neutral-900/[0.06] hover:text-neutral-700"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          beforeStart?.();
          // 끝난 판의 상태가 남아 결과 화면으로 되튕기지 않도록 전체 이동으로 새 판을 연다
          // (같은 라우트로의 push는 재마운트도 되지 않는다)
          window.location.assign(matchRouteFor(domainOfPart(part), part));
        }}
        className="mt-2.5 min-h-[46px] w-full rounded-xl bg-neutral-900 text-[14px] font-black text-white transition hover:bg-neutral-800 active:scale-[0.98]"
      >
        ⚔️ Part {part} · {DIFFS.find((d) => d.value === difficulty)?.label}{" "}
        {onStartLabel}
      </button>
    </div>
  );
}
