"use client";

/**
 * 채점 결과의 문항 리뷰 — 리스닝·리딩이 공유한다.
 * 두 영역은 채점 엔진(gradeGap/gradeChoice)과 덫 체계가 같으므로 리뷰도 같아야 한다.
 */
import { IELTS_TRAPS, trapTypeOf, type IeltsQuestion } from "@/game/ielts";
import TrapIcon, { SnareIcon, ShieldIcon } from "./TrapIcon";

// Heading Matching처럼 보기가 4개를 넘는 유형이 있어 A~J까지 둔다
export const LETTER = "ABCDEFGHIJ".split("");

export type Response = string | number | undefined;
/** 정답/오답이 아니라 "덫을 막았는가"로 말한다 */
export type Verdict = "correct" | "typo" | "wrong";

/**
 * 콘텐츠의 `**강조**`를 실제 굵은 글씨로 렌더한다.
 * 해설·덫 설명은 전부 이 표기를 쓰는데, 그대로 두면 별표가 화면에 노출된다.
 */
export function Rich({ text, strong }: { text: string; strong: string }) {
  // split의 캡처 그룹 덕에 홀수 인덱스가 강조 구간이 된다
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} className={strong}>
            {p}
          </b>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function ReviewCard({
  q,
  index,
  response,
  verdict,
}: {
  q: IeltsQuestion;
  index: number;
  response: Response;
  verdict: Verdict;
}) {
  const trap = IELTS_TRAPS[trapTypeOf(q.category)];
  const correctText =
    q.kind === "gap"
      ? q.answer ?? ""
      : `${LETTER[q.answerIndex ?? 0]}. ${(q.choices ?? [])[q.answerIndex ?? 0] ?? ""}`;
  const yourText =
    response === undefined || response === ""
      ? "무응답"
      : q.kind === "gap"
        ? String(response)
        : `${LETTER[Number(response)]}. ${(q.choices ?? [])[Number(response)] ?? ""}`;

  const tone =
    verdict === "correct"
      ? {
          ring: "ring-emerald-500/25",
          rail: "bg-emerald-500",
          chip: "bg-emerald-50 text-emerald-700 ring-emerald-500/15",
          icon: <ShieldIcon className="h-3.5 w-3.5" />,
          label: q.trap ? "덫 방어 성공" : "정답",
        }
      : verdict === "typo"
        ? {
            ring: "ring-amber-500/30",
            rail: "bg-amber-500",
            chip: "bg-amber-50 text-amber-700 ring-amber-500/15",
            icon: <TrapIcon type="SPELLING" className="h-3.5 w-3.5" />,
            label: "철자 하나 차이 — 실전이면 0점",
          }
        : {
            ring: "ring-rose-500/25",
            rail: "bg-rose-500",
            chip: "bg-rose-50 text-rose-700 ring-rose-500/15",
            icon: <SnareIcon className="h-3.5 w-3.5" />,
            label: q.trap ? "덫에 걸렸어요" : "오답",
          };

  return (
    <div
      className={`card-elevated relative overflow-hidden p-4 ring-1 ${tone.ring} sm:p-5`}
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${tone.rail}`} />
      <div className="flex items-start gap-3 pl-1.5">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-[11.5px] font-black tabular-nums text-white">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-black ring-1 ${tone.chip}`}
            >
              {tone.icon}
              {tone.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-600">
              <TrapIcon type={trapTypeOf(q.category)} className="h-3.5 w-3.5" />
              {trap.label}
            </span>
          </div>

          <p className="mt-3 text-[14px] font-bold leading-relaxed text-neutral-900">
            {q.promptEn}
          </p>

          <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 px-3.5 py-2.5 ring-1 ring-neutral-900/[0.03]">
              <p className="text-[10.5px] font-black tracking-[0.06em] text-neutral-400">
                내 답
              </p>
              <p
                className={`mt-0.5 text-[13.5px] font-bold ${
                  verdict === "correct" ? "text-neutral-800" : "text-rose-600"
                }`}
              >
                {yourText}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50/70 px-3.5 py-2.5 ring-1 ring-emerald-500/10">
              <p className="text-[10.5px] font-black tracking-[0.06em] text-emerald-600/80">
                정답
              </p>
              <p className="mt-0.5 text-[13.5px] font-bold text-emerald-800">{correctText}</p>
            </div>
          </div>

          {q.trap && (
            <p className="mt-3 flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-[12.5px] font-bold leading-relaxed text-amber-800 ring-1 ring-amber-500/15">
              <SnareIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>
                <Rich text={q.trap} strong="font-black text-amber-900" />
              </span>
            </p>
          )}

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-neutral-500">
            <Rich text={q.explanation} strong="font-black text-neutral-800" />
          </p>
        </div>
      </div>
    </div>
  );
}
