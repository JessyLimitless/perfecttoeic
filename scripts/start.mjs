// 프로덕션 기동 스크립트.
//
// 빌드 산출물(.next/BUILD_ID)이 이미 있으면 next start만 한다.
// 없으면(= 이미지에 빌드가 안 담긴 경우) 예전처럼 여기서 next build를 돌린다.
//
// 이 폴백이 있어야, Cloud5 deploy-engine이 자기 Dockerfile(코드만 복사)로
// 다시 배포하더라도 서비스가 깨지지 않는다.

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = join(root, "node_modules", ".bin", "next");
const cmd = process.platform === "win32" ? `"${nextBin}"` : nextBin;

function run(args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: root, shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

if (!existsSync(join(root, ".next", "BUILD_ID"))) {
  console.log("[start] 빌드 산출물이 없어 next build를 먼저 실행합니다.");
  run(["build"]);
} else {
  console.log("[start] 빌드 산출물 재사용 — 바로 next start.");
}

run(["start"]);
