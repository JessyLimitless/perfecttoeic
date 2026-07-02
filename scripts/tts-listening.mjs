// 리스닝(Part 2·3·4) 오디오 생성 — Microsoft Edge 신경망 TTS(무료, API 키 없음).
// 다중 화자: 대사별 voice 키를 실제 목소리로 매핑해 각 줄을 합성 후 mp3 버퍼를 이어붙임.
//
// 입력 : content/listening/*.md  (```json 블록 = ListeningSet 1개)
// 출력 : public/audio/listening/<clipId>.mp3
//        - Part 2: item별  <itemId>.mp3  (질문 + 응답3개, 화자 교차)
//        - Part 3/4: set별 <setId>.mp3   (대화/담화 전체, 화자 교차)
//   매니페스트: public/audio/listening/manifest.json  (생성된 clipId 목록)
//
// 사용법:
//   node scripts/tts-listening.mjs                # 전체
//   node scripts/tts-listening.mjs --set lc-p2-01 # 특정 세트만
//   node scripts/tts-listening.mjs --force        # 기존 mp3 덮어쓰기

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "content", "listening");
const OUT_DIR = path.join(ROOT, "public", "audio", "listening");

// voice 키 → 실제 msedge 목소리 (혼합 액센트: 미/영/호/캐 — 실전 TOEIC 유사)
const VOICE = {
  M: "en-US-GuyNeural", // 미국 남
  W: "en-US-AriaNeural", // 미국 여
  Mgb: "en-GB-RyanNeural", // 영국 남
  Wgb: "en-GB-SoniaNeural", // 영국 여
  Mau: "en-AU-WilliamNeural", // 호주 남
  Wau: "en-AU-NatashaNeural", // 호주 여
  Mca: "en-CA-LiamNeural", // 캐나다 남
  Wca: "en-CA-ClaraNeural", // 캐나다 여
};

function parseArgs() {
  const a = process.argv.slice(2);
  const get = (k) => {
    const i = a.indexOf(k);
    return i >= 0 ? a[i + 1] : undefined;
  };
  return { set: get("--set"), force: a.includes("--force") };
}

function loadSets() {
  const out = [];
  for (const file of fs.readdirSync(SRC_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
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
  const voice = VOICE[voiceKey] || VOICE.M;
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
  const { set: only, force } = parseArgs();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let sets = loadSets();
  if (only) sets = sets.filter((s) => s.id === only);

  const made = [];
  for (const s of sets) {
    if (s.part === 2) {
      for (const item of s.items || []) {
        const dest = path.join(OUT_DIR, `${item.id}.mp3`);
        made.push(item.id);
        if (fs.existsSync(dest) && !force) {
          console.log(`  ${item.id}.mp3 존재 → 건너뜀`);
          continue;
        }
        const lines = [
          { voiceKey: item.promptSpeaker, text: item.promptEn },
          ...item.responses.map((r) => ({ voiceKey: item.responseSpeaker, text: r.en })),
        ];
        try {
          const buf = await synthLines(lines);
          fs.writeFileSync(dest, buf);
          console.log(`  ${item.id}.mp3 ✓ (${(buf.length / 1024).toFixed(0)}KB)`);
        } catch (e) {
          console.log(`  ${item.id}.mp3 ✗ ${e.message}`);
        }
      }
    } else {
      const dest = path.join(OUT_DIR, `${s.id}.mp3`);
      made.push(s.id);
      if (fs.existsSync(dest) && !force) {
        console.log(`  ${s.id}.mp3 존재 → 건너뜀`);
        continue;
      }
      const lines = (s.script || []).map((l) => ({ voiceKey: l.speaker, text: l.en }));
      try {
        const buf = await synthLines(lines);
        fs.writeFileSync(dest, buf);
        console.log(`  ${s.id}.mp3 ✓ (${(buf.length / 1024).toFixed(0)}KB)`);
      } catch (e) {
        console.log(`  ${s.id}.mp3 ✗ ${e.message}`);
      }
    }
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ clips: made, generatedAt: new Date().toISOString() }, null, 2),
  );
  console.log(`\n완료. 클립 ${made.length}개, manifest.json 갱신.`);
}

main()
  .then(() => process.exit(0)) // msedge-tts 소켓 잔류로 프로세스가 안 끝나는 문제 방지
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
