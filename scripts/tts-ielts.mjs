// IELTS 리스닝(Section 1~4) 오디오 생성 — Microsoft Edge 신경망 TTS(무료, API 키 없음).
// 다중 화자: script 각 줄의 speaker(voice 키)를 실제 목소리로 매핑해 합성 후 mp3 버퍼를 이어붙임.
//
// TOEIC용 scripts/tts-listening.mjs 와 같은 구조지만, IELTS는 스키마가 다르다.
//   - IELTS는 Part 2도 독백이고 **세트 전체가 하나의 연속 음원**이다.
//     → TOEIC Part 2처럼 item별로 쪼개지 않고, clipId = 세트 id 하나.
//
// 입력 : content/ielts/*.md   (```json 블록 = IeltsListeningSet 1개, 스키마는 src/game/ielts.ts)
// 출력 : public/audio/ielts/<setId>.mp3
//   매니페스트: public/audio/ielts/manifest.json  (생성된 clipId 목록 — 기존 목록과 병합 저장)
//
// 사용법:
//   node scripts/tts-ielts.mjs                    # 전체(기존 mp3는 건너뜀)
//   node scripts/tts-ielts.mjs --set ielts-lis-01 # 특정 세트만
//   node scripts/tts-ielts.mjs --force            # 기존 mp3 덮어쓰기
//   node scripts/tts-ielts.mjs --dir content/ielts-extra   # 다른 소스 디렉터리

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "audio", "ielts");

// voice 키 → 실제 msedge 목소리.
// IELTS는 영국·호주 액센트가 주력이라 그 순서로 두되, 키 이름은 TOEIC 스크립트와 동일하게 유지한다.
const VOICE = {
  Wgb: "en-GB-SoniaNeural", // 영국 여
  Mgb: "en-GB-RyanNeural", // 영국 남
  Wau: "en-AU-NatashaNeural", // 호주 여
  Mau: "en-AU-WilliamNeural", // 호주 남
  W: "en-US-AriaNeural", // 미국 여
  M: "en-US-GuyNeural", // 미국 남
  Wca: "en-CA-ClaraNeural", // 캐나다 여
  Mca: "en-CA-LiamNeural", // 캐나다 남
};

// 미상 voice 키의 기본값 — IELTS 주력 액센트(영국 여)
const DEFAULT_VOICE_KEY = "Wgb";

function parseArgs() {
  const a = process.argv.slice(2);
  const get = (k) => {
    const i = a.indexOf(k);
    return i >= 0 ? a[i + 1] : undefined;
  };
  return { set: get("--set"), force: a.includes("--force"), dir: get("--dir") };
}

function loadSets(srcDir) {
  const out = [];
  if (!fs.existsSync(srcDir)) {
    console.error(`소스 디렉터리 없음: ${srcDir}`);
    return out;
  }
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(srcDir, file), "utf8");
    const m = raw.match(/```json\s*([\s\S]*?)```/);
    if (!m) continue;
    try {
      out.push(JSON.parse(m[1]));
    } catch (e) {
      console.error(`파싱 실패: ${file} — ${e.message}`);
    }
  }
  return out;
}

async function synth(voiceKey, text) {
  const voice = VOICE[voiceKey] || VOICE[DEFAULT_VOICE_KEY];
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);
  return await new Promise((resolve, reject) => {
    const chunks = [];
    const timer = setTimeout(() => reject(new Error("timeout")), 30000);
    audioStream.on("data", (c) => chunks.push(c));
    audioStream.on("end", () => {
      clearTimeout(timer);
      resolve(Buffer.concat(chunks));
    });
    audioStream.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
  });
}

async function synthRetry(voiceKey, text, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const buf = await synth(voiceKey, text);
      if (buf.length > 0) return buf;
      last = new Error("empty");
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 700 * (i + 1)));
  }
  throw last;
}

/** [{voiceKey, text}, ...] → 각 줄 합성 후 이어붙인 단일 mp3 버퍼 */
async function synthLines(lines) {
  const bufs = [];
  for (const { voiceKey, text } of lines) {
    const buf = await synthRetry(voiceKey, text);
    bufs.push(buf);
    await new Promise((r) => setTimeout(r, 200));
  }
  return Buffer.concat(bufs);
}

async function main() {
  const { set: only, force, dir } = parseArgs();
  const srcDir = dir ? path.resolve(ROOT, dir) : path.join(ROOT, "content", "ielts");
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let sets = loadSets(srcDir);
  if (only) sets = sets.filter((s) => s.id === only);

  const made = [];
  for (const s of sets) {
    // 리스닝 세트만 처리 (리딩 등 다른 skill 세트는 건너뜀)
    if (s.skill && s.skill !== "LISTENING") continue;
    const lines = (s.script || [])
      .map((l) => ({ voiceKey: l.speaker, text: (l.en || "").trim() }))
      .filter((l) => l.text);
    if (lines.length === 0) {
      console.log(`  ${s.id} script 없음 → 건너뜀`);
      continue;
    }

    // IELTS는 세트 전체가 하나의 연속 음원 → clipId = 세트 id
    const dest = path.join(OUT_DIR, `${s.id}.mp3`);
    made.push(s.id);
    if (fs.existsSync(dest) && !force) {
      console.log(`  ${s.id}.mp3 존재 → 건너뜀`);
      continue;
    }
    try {
      const buf = await synthLines(lines);
      fs.writeFileSync(dest, buf);
      console.log(
        `  ${s.id}.mp3 ✓ (${(buf.length / 1024).toFixed(0)}KB, ${lines.length}줄)`,
      );
    } catch (e) {
      console.log(`  ${s.id}.mp3 ✗ ${e.message}`);
    }
  }

  // 기존 매니페스트와 병합(다른 소스 디렉터리 실행 시 목록 유실 방지)
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(manifestPath, "utf8")).clips ?? [];
  } catch {
    /* 없으면 새로 */
  }
  const clips = Array.from(new Set([...existing, ...made]));
  fs.writeFileSync(
    manifestPath,
    JSON.stringify({ clips, generatedAt: new Date().toISOString() }, null, 2),
  );
  console.log(`\n완료. 이번 ${made.length}개, 매니페스트 총 ${clips.length}개.`);
}

main()
  .then(() => process.exit(0)) // msedge-tts 소켓 잔류로 프로세스가 안 끝나는 문제 방지
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
