"use client";

// 유형별 약점 리포트 — "나는 어느 유형이 약한가"를 한 장으로.
//
// 데이터는 review.ts의 문항별 카드(시도·정답·복습일 + 원문 category)에서 나온다.
// 문제은행을 다시 부르지 않고 localStorage만으로 집계되므로 즉시 렌더된다.
// (드릴 진입 시에만 /api/sets를 불러 해당 유형 문항을 추린다.)
//
// 화면 구성: 오늘의 복습 → 약점 TOP 3 → 유형 전체 표(그룹별) → 각 행에서 바로 집중 드릴.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  buildSkillReport,
  type SkillReport,
  type SkillStat,
  type Skill,
  MIN_SAMPLE,
} from "@/game/skills";
import {
  buildReviewSummary,
  formatDueIn,
  type ReviewSummary,
} from "@/game/review";
import type { MasteryPart } from "@/game/mastery";
import { usePracticeStore } from "@/game/store";
import type { PassageSet, Part } from "@/game/types";
import type { LcType } from "@/game/listeningTypes";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 이 정답률 미만이면 "약점"으로 본다 (토익 고득점 기준선) */
const WEAK_THRESHOLD = 85;

const PART_LABEL: Record<MasteryPart, string> = {
  2: "Part 2",
  3: "Part 3",
  4: "Part 4",
  5: "Part 5",
  6: "Part 6",
  7: "Part 7",
};

/** 리스닝 스킬 → 리스닝 홈 유형 필터(?type=) 매핑 */
const SKILL_TO_LC_TYPE: Record<string, LcType> = {
  "lc-wh": "WH",
  "lc-yesno": "YESNO",
  "lc-choice": "CHOICE",
  "lc-statement": "STATEMENT",
  "lc-main": "MAIN",
  "lc-detail": "DETAIL",
  "lc-inference": "INFERENCE",
  "lc-intent": "INTENT",
};

/** 표 그룹 — 노출 순서 */
const GROUPS: { id: string; label: string; hint: string; match: (s: Skill) => boolean }[] = [
  {
    id: "lc2",
    label: "리스닝 · 응답 (Part 2)",
    hint: "질문 첫 단어를 잡는 능력",
    match: (s) => s.domain === "LC" && s.parts.includes(2),
  },
  {
    id: "lc34",
    label: "리스닝 · 대화/담화 (Part 3·4)",
    hint: "긴 음성에서 정보를 잡아내는 능력",
    match: (s) => s.domain === "LC" && !s.parts.includes(2),
  },
  {
    id: "rc56",
    label: "리딩 · 문법 (Part 5·6)",
    hint: "빈칸 자리를 판단하는 능력",
    match: (s) => s.domain === "RC" && s.parts.includes(5 as MasteryPart),
  },
  {
    id: "rc6",
    label: "리딩 · 문맥 (Part 6)",
    hint: "앞뒤 흐름을 잇는 능력",
    match: (s) => s.domain === "RC" && s.parts.length === 1 && s.parts[0] === 6,
  },
  {
    id: "rc7",
    label: "리딩 · 독해 (Part 7)",
    hint: "지문에서 답을 찾는 능력",
    match: (s) => s.domain === "RC" && s.parts.includes(7 as MasteryPart),
  },
];

/** 정답률 → 색 (약할수록 붉게) */
function toneOf(acc: number | null): { bar: string; text: string; ring: string } {
  if (acc == null) return { bar: "bg-slate-300", text: "text-slate-400", ring: "ring-slate-200" };
  if (acc < 60) return { bar: "bg-rose-500", text: "text-rose-600", ring: "ring-rose-200" };
  if (acc < 75) return { bar: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-200" };
  if (acc < 90) return { bar: "bg-sky-500", text: "text-sky-600", ring: "ring-sky-200" };
  return { bar: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-200" };
}

export default function WeaknessReport() {
  const router = useRouter();
  const practiceFocus = usePracticeStore((s) => s.practiceFocus);
  const practiceReview = usePracticeStore((s) => s.practiceReview);

  const [report, setReport] = useState<SkillReport | null>(null);
  const [review, setReview] = useState<ReviewSummary | null>(null);
  const [sets, setSets] = useState<PassageSet[]>([]);
  const [busy, setBusy] = useState(false);

  // 하이드레이션 안전: 마운트 후 localStorage 집계
  useEffect(() => {
    setReport(buildSkillReport());
    setReview(buildReviewSummary());
  }, []);

  // 드릴에 필요한 RC 은행은 백그라운드로 미리 받아둔다
  useEffect(() => {
    let alive = true;
    fetch("/api/sets")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && Array.isArray(d?.sets)) setSets(d.sets as PassageSet[]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  /** 유형 집중 드릴 — RC는 문제 풀이로, LC는 리스닝 홈 필터로 */
  const drill = useCallback(
    (stat: SkillStat) => {
      const skill = stat.skill;
      if (skill.domain === "LC") {
        const t = SKILL_TO_LC_TYPE[skill.id];
        const part = skill.parts[0];
        router.push(`/listening?part=${part}${t ? `&type=${t}` : ""}`);
        return;
      }
      if (sets.length === 0) return;
      setBusy(true);
      practiceFocus({
        part: skill.parts[0] as Part,
        categories: skill.categories,
        sets,
      });
      router.push("/game");
    },
    [practiceFocus, router, sets],
  );

  /** 오늘의 복습 — 복습 예정이 가장 많은 RC 파트부터 */
  const startReview = useCallback(
    (part: MasteryPart) => {
      if (part <= 4) {
        router.push(`/listening?part=${part}&review=1`);
        return;
      }
      if (sets.length === 0) return;
      setBusy(true);
      const ok = practiceReview({ part: part as Part, sets });
      if (ok) router.push("/game");
      else setBusy(false);
    },
    [practiceReview, router, sets],
  );

  const groups = useMemo(() => {
    if (!report) return [];
    const used = new Set<string>();
    return GROUPS.map((g) => {
      const rows = report.stats.filter((r) => !used.has(r.skill.id) && g.match(r.skill));
      rows.forEach((r) => used.add(r.skill.id));
      return { ...g, rows };
    }).filter((g) => g.rows.length > 0);
  }, [report]);

  if (!report || !review) {
    return <div className="skeleton h-64 w-full rounded-3xl" />;
  }

  // 정답률이 높은 유형을 "약점"이라 부르면 진단을 못 믿게 된다 — 실제로 약한 것만 올린다
  const top3 = report.weakest.filter((r) => (r.accuracy ?? 100) < WEAK_THRESHOLD).slice(0, 3);
  const duePartRows = (Object.entries(review.byPart) as [string, number][])
    .map(([p, n]) => ({ part: Number(p) as MasteryPart, n }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n);

  return (
    <div className="space-y-6">
      {/* ── 오늘의 복습 ───────────────────────────────────────── */}
      <section className="surface-dark relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
        <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold text-white/90 ring-1 ring-white/15">
            🔁 간격반복 복습
          </span>

          {review.due > 0 ? (
            <>
              <h2 className="mt-4 text-[24px] font-black leading-[1.15] tracking-tight text-white sm:text-[30px]">
                오늘 다시 볼 문제{" "}
                <span className="text-gradient-rose">{review.due}문항</span>
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                예전에 맞힌 문제 중 <strong className="text-white/80">지금이 잊어버릴 때</strong>인
                것들이야. 여기서 다시 맞히면 다음 복습은 더 뒤로 밀려.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {duePartRows.map((r) => (
                  <button
                    key={r.part}
                    type="button"
                    disabled={busy}
                    onClick={() => startReview(r.part)}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-[13px] font-bold text-white ring-1 ring-white/15 transition hover:bg-white/20 disabled:opacity-50"
                  >
                    {PART_LABEL[r.part]}
                    <span className="rounded-full bg-rose-500/90 px-2 py-0.5 text-[11px] font-black text-white">
                      {r.n}
                    </span>
                    <span className="opacity-60 transition group-hover:translate-x-0.5">→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-[24px] font-black leading-[1.15] tracking-tight text-white sm:text-[30px]">
                복습할 문제가 없어 👏
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                {review.scheduled > 0 ? (
                  <>
                    {review.scheduled}문항이 복습 대기열에 있고, 가장 가까운 복습은{" "}
                    <strong className="text-white/80">
                      {review.nextDueAt ? formatDueIn(review.nextDueAt) : "예정 없음"}
                    </strong>
                    이야. 그동안은 새 문제를 풀면 돼.
                  </>
                ) : (
                  <>문제를 풀면 맞힌 문항에 복습 일정이 잡혀. 1일 → 3일 → 7일 → 16일 → 35일 간격으로 다시 나와.</>
                )}
              </p>
            </>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            <Stat label="복습 대기열" value={review.scheduled} suffix="문항" />
            <Stat label="장기기억" value={review.longterm} suffix="문항" tone="emerald" />
            <Stat
              label="누적 정답률"
              value={report.overallAccuracy ?? 0}
              suffix="%"
              tone="sky"
            />
          </div>
        </div>
      </section>

      {/* ── 약점 TOP 3 ───────────────────────────────────────── */}
      {report.empty ? (
        <section className="card-elevated px-6 py-8 text-center">
          <p className="text-[15px] font-bold text-slate-800">아직 진단할 데이터가 부족해</p>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-slate-500">
            유형별로 최소 {MIN_SAMPLE}문항은 풀어야 정답률을 신뢰할 수 있어. 지금까지{" "}
            <strong className="text-slate-700">{report.totalSeen}문항</strong> 풀었어 — 조금만 더
            풀면 약점이 드러나.
          </p>
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="btn-dark mt-5 inline-flex px-6 py-3 text-[14px]"
          >
            문제 풀러 가기 →
          </button>
        </section>
      ) : top3.length === 0 ? (
        <section className="card-elevated px-6 py-8 text-center">
          <p className="text-[15px] font-black text-slate-900">
            지금은 뚜렷한 약점이 없어 👏
          </p>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-slate-500">
            진단된 유형이 전부 정답률 {WEAK_THRESHOLD}% 이상이야. 아래 표에서 상대적으로 낮은
            유형을 골라 더 풀거나, 안 풀어본 유형을 열어봐.
          </p>
        </section>
      ) : (
        <section className="card-elevated overflow-hidden px-6 py-7 sm:px-8">
          <h3 className="text-[17px] font-black tracking-tight text-slate-900">
            지금 가장 약한 유형
          </h3>
          <p className="mt-1 text-[13px] text-slate-500">
            정답률 {WEAK_THRESHOLD}% 미만인 유형이야. 탭하면 그 유형만 모아서 풀 수 있어.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {top3.map((stat, i) => {
              const tone = toneOf(stat.accuracy);
              return (
                <motion.button
                  key={stat.skill.id}
                  type="button"
                  disabled={busy}
                  onClick={() => drill(stat)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  className={`group rounded-2xl bg-white p-4 text-left ring-1 ${tone.ring} transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      #{i + 1} 약점
                    </span>
                    <span className={`text-[22px] font-black ${tone.text}`}>
                      {stat.accuracy}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-[14px] font-black leading-snug text-slate-900">
                    {stat.skill.label}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                    {stat.skill.desc}
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${tone.bar}`}
                      style={{ width: `${stat.accuracy ?? 0}%` }}
                    />
                  </div>
                  <p className="mt-2.5 text-[12px] font-bold text-slate-600">
                    {stat.seen}문항 중 {stat.seen - stat.correct}개 오답
                    <span className="ml-1 font-semibold text-slate-400 transition group-hover:text-slate-600">
                      · 집중 드릴 →
                    </span>
                  </p>
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 유형 전체 ────────────────────────────────────────── */}
      {groups.map((g) => (
        <section key={g.id} className="card-elevated px-5 py-6 sm:px-7">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-black tracking-tight text-slate-900">{g.label}</h3>
            <span className="text-[12px] text-slate-400">{g.hint}</span>
          </div>
          <div className="mt-4 space-y-1.5">
            {g.rows.map((stat) => (
              <SkillRow key={stat.skill.id} stat={stat} busy={busy} onDrill={() => drill(stat)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  tone = "white",
}: {
  label: string;
  value: number;
  suffix: string;
  tone?: "white" | "emerald" | "sky";
}) {
  const color =
    tone === "emerald" ? "text-emerald-300" : tone === "sky" ? "text-sky-300" : "text-white";
  return (
    <div>
      <p className="text-[11px] font-semibold text-white/50">{label}</p>
      <p className={`mt-1 text-[20px] font-black ${color}`}>
        {value}
        <span className="ml-0.5 text-[12px] font-bold opacity-60">{suffix}</span>
      </p>
    </div>
  );
}

function SkillRow({
  stat,
  busy,
  onDrill,
}: {
  stat: SkillStat;
  busy: boolean;
  onDrill: () => void;
}) {
  const tone = toneOf(stat.accuracy);
  const untouched = stat.seen === 0;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={onDrill}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 disabled:opacity-50"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13.5px] font-bold text-slate-800">
            {stat.skill.label}
          </span>
          {stat.due > 0 && (
            <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-[10.5px] font-black text-violet-700">
              복습 {stat.due}
            </span>
          )}
          {!untouched && !stat.enough && (
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500">
              표본 부족
            </span>
          )}
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${untouched ? "bg-slate-200" : tone.bar}`}
            style={{ width: `${untouched ? 0 : (stat.accuracy ?? 0)}%` }}
          />
        </div>
      </div>

      <div className="w-24 shrink-0 text-right">
        {untouched ? (
          <span className="text-[12px] font-semibold text-slate-300">미응시</span>
        ) : (
          <>
            <span className={`text-[15px] font-black ${tone.text}`}>{stat.accuracy}%</span>
            <span className="ml-1 text-[11px] font-semibold text-slate-400">
              {stat.correct}/{stat.seen}
            </span>
          </>
        )}
      </div>
      <span className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500">
        →
      </span>
    </button>
  );
}
