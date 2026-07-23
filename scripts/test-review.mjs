#!/usr/bin/env node
// 간격반복(review.ts) + 유형별 약점 리포트(skills.ts) 순수 로직 회귀 테스트.
// 두 모듈은 localStorage만 쓰는 순수 로직이라 브라우저 없이 검증할 수 있다.
// 실행: node scripts/test-review.mjs   (tsc로 임시 컴파일 후 실행)

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const out = mkdtempSync(join(tmpdir(), "toeic-review-test-"));
try {
  execFileSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    [
      "tsc",
      "src/game/review.ts",
      "src/game/skills.ts",
      "src/game/mastery.ts",
      "--outDir",
      out,
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--skipLibCheck",
    ],
    { stdio: "inherit" },
  );

  // localStorage 셰임 — 모듈이 window.localStorage만 쓰므로 이걸로 충분
  const store = {};
  globalThis.window = {
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => {
        store[k] = String(v);
      },
      removeItem: (k) => {
        delete store[k];
      },
    },
  };
  const clear = () => {
    for (const k of Object.keys(store)) delete store[k];
  };

  // CommonJS로 컴파일해 require — 확장자 없는 상대 import가 그대로 해결된다
  const require = createRequire(import.meta.url);
  const R = require(join(out, "review.js"));
  const S = require(join(out, "skills.js"));

  const DAY = 24 * 60 * 60 * 1000;
  let pass = 0;
  let fail = 0;
  const t = (name, cond) => {
    if (cond) {
      pass++;
      console.log("  ok   " + name);
    } else {
      fail++;
      console.log("  FAIL " + name);
    }
  };

  console.log("\n[간격반복 스케줄]");
  R.recordReviews([{ part: 5, id: "q1", correct: true, category: "전치사" }]);
  let s = R.loadReview();
  t("정답 시 박스 1", s[5].q1.box === 1);
  t("다음 복습 ≈ 1일 뒤", Math.abs(s[5].q1.due - (Date.now() + DAY)) < 5000);
  t("복습일 전에는 출제 대상 아님", R.dueIdSet(5, s).size === 0);
  t("1일 경과 후 복습 대상", R.dueIdSet(5, s, Date.now() + DAY + 1000).has("q1"));

  R.recordReviews([{ part: 5, id: "q1", correct: true }]);
  s = R.loadReview();
  t("연속 정답 시 박스 2", s[5].q1.box === 2);
  t("간격 3일로 확대", Math.abs(s[5].q1.due - (Date.now() + 3 * DAY)) < 5000);

  R.recordReviews([{ part: 5, id: "q1", correct: false }]);
  s = R.loadReview();
  t("오답 시 박스 0으로 리셋", s[5].q1.box === 0);
  t("오답은 due 집합에서 빠짐(정복 대기가 관리)", !R.dueIdSet(5, s).has("q1"));
  t("누적 통계 보존(3시도/2정답)", s[5].q1.seen === 3 && s[5].q1.correct === 2);

  R.recordReviews([{ part: 5, id: "q2", correct: true, category: "어휘" }]);
  const before = R.loadReview()[5].q2.due;
  R.recordReviews([{ part: 5, id: "q2", correct: false }], { coverageOnly: true });
  s = R.loadReview();
  t("속도전 오답이 복습 간격을 깨지 않음", s[5].q2.due === before && s[5].q2.box === 1);
  t("속도전도 노출 수는 누적", s[5].q2.seen === 2);

  console.log("\n[유형별 약점 리포트]");
  clear();
  for (let i = 0; i < 5; i++) {
    R.recordReviews([{ part: 5, id: "prep" + i, correct: i === 0, category: "전치사" }]);
    R.recordReviews([{ part: 5, id: "voc" + i, correct: true, category: "어휘" }]);
  }
  const rep = S.buildSkillReport();
  const prep = rep.stats.find((r) => r.skill.id === "rc-prep");
  const voc = rep.stats.find((r) => r.skill.id === "rc-vocab");
  t("전치사 정답률 20%", prep.accuracy === 20);
  t("어휘 정답률 100%", voc.accuracy === 100);
  t("약점 1위 = 전치사", rep.weakest[0].skill.id === "rc-prep");
  t("표본 충분 판정", prep.enough === true);
  t("틀린 채로 남은 문항 4개", prep.wrong === 4);

  t("분사 → 준동사 스킬", S.skillOf(5, "분사").id === "rc-verbal");
  t("도치 → 특수구문 스킬", S.skillOf(5, "도치").id === "rc-special");
  t("Part7 세부사항 ≠ Part3 세부사항", S.skillOf(7, "세부사항").id !== S.skillOf(3, "세부사항").id);
  t("Part2 부가의문문 → lc-yesno", S.skillOf(2, "부가의문문").id === "lc-yesno");
  t("미상 라벨은 파트 기본 스킬로", S.skillOf(5, "듣도보도못한라벨").id === "rc-form");

  R.recordReviews([{ part: 7, id: "x1", correct: false, category: "동의어" }]);
  const rep2 = S.buildSkillReport();
  t("1문항은 표본 부족", rep2.stats.find((r) => r.skill.id === "rc7-vocab").enough === false);
  t(
    "표본 부족은 약점 순위에서 제외",
    !rep2.weakest.some((r) => r.skill.id === "rc7-vocab"),
  );

  console.log("\n[요약]");
  const sum = R.buildReviewSummary();
  t("복습 대기열 집계", sum.scheduled > 0);
  t("파트별 분해 존재", typeof sum.byPart[5] === "number");

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
} finally {
  rmSync(out, { recursive: true, force: true });
}
