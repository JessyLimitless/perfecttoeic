// 몸풀기(치즈 스토리) 영문 문장을 Microsoft Edge 신경망 TTS로 음성(mp3) 생성.
// 웹 기능(/api/tts)과 동일한 엔진·목소리(en-US-AriaNeural, 원어민 여성)를 사용한다.
//
// 입력 : content/sets/cheese_books_summary.md  (English Summary 블록)
// 출력 : public/audio/warmup/<deck>/<NNN>.mp3   (NNN = flat 1-base index, zero-pad 3)
// 매니페스트: public/audio/warmup/<deck>/manifest.json
//
// 파싱은 src/lib/warmup-loader.ts 와 동일하게 (섹션 순서, 문장 순서) 위치 기준 flatten.
//
// 사용법:
//   node scripts/tts-warmup.mjs                 # 전체 덱
//   node scripts/tts-warmup.mjs --deck wmc      # Book1(누가 내 치즈를 옮겼을까?)만
//   node scripts/tts-warmup.mjs --deck wmc --force   # 기존 파일 덮어쓰기
//   node scripts/tts-warmup.mjs --voice en-US-JennyNeural  # 다른 여성 목소리

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MD_FILE = path.join(ROOT, "content", "sets", "cheese_books_summary.md");
// 기초편(쉬운 문장) — 슬러그에 `-basic` 접미. 파일 없으면 조용히 건너뜀.
const BASIC_MD_FILE = path.join(ROOT, "content", "sets", "cheese_books_basic.md");
const OUT_ROOT = path.join(ROOT, "public", "audio", "warmup");

// warmup-loader.ts BOOK_META 와 동일한 bookNo -> 슬러그 매핑
const BOOK_SLUG = { 1: "wmc", 2: "ootm", 3: "present" };

function parseArgs() {
  const a = process.argv.slice(2);
  const get = (k) => {
    const i = a.indexOf(k);
    return i >= 0 ? a[i + 1] : undefined;
  };
  return {
    deck: get("--deck"),
    voice: get("--voice") || "en-US-AriaNeural",
    force: a.includes("--force"),
    single: a.includes("--single"),
  };
}

/** 문장 배열을 글자수 상한 이하의 청크(여러 문장 묶음)로 나눈다. */
function chunkSentences(sentences, maxChars = 1500) {
  const chunks = [];
  let buf = [];
  let len = 0;
  for (const s of sentences) {
    if (len + s.length + 1 > maxChars && buf.length) {
      chunks.push(buf.join(" "));
      buf = [];
      len = 0;
    }
    buf.push(s);
    len += s.length + 1;
  }
  if (buf.length) chunks.push(buf.join(" "));
  return chunks;
}

/** {deck_slug: [sentence, ...]} — 섹션·문장 순서 기준 flatten (영문만). slugSuffix 로 기초편 구분. */
function parseEnglishSentences(md, slugSuffix = "") {
  const lines = md.split(/\r?\n/);

  // `## ` (단, `### ` 제외) 로 책 블록 분할
  const books = [];
  let cur = null;
  for (const line of lines) {
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      cur = { header: line, lines: [] };
      books.push(cur);
    } else if (cur) cur.lines.push(line);
  }

  const result = {};
  for (const block of books) {
    const m = block.header.match(/Book\s+(\d+)/i);
    if (!m) continue;
    const bookNo = Number(m[1]);
    const slug = (BOOK_SLUG[bookNo] || `book-${bookNo}`) + slugSuffix;

    // 책 안에서 `### ` 언어 블록 분할, English Summary 찾기
    const langs = [];
    let cl = null;
    for (const line of block.lines) {
      if (line.startsWith("### ")) {
        cl = { header: line, lines: [] };
        langs.push(cl);
      } else if (cl) cl.lines.push(line);
    }
    const en = langs.find((b) => /english/i.test(b.header));
    if (!en) continue;

    // `#### 섹션` / `N. 문장` 순서대로 수집
    const sentences = [];
    let inSection = false;
    for (const raw of en.lines) {
      const line = raw.trim();
      if (line.startsWith("#### ")) {
        inSection = true;
        continue;
      }
      const sm = line.match(/^\d+\.\s+(.*)$/);
      if (sm && inSection) sentences.push(sm[1].trim());
    }
    if (sentences.length) result[slug] = sentences;
  }
  return result;
}

async function synth(voice, text) {
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

async function synthWithRetry(voice, text, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const buf = await synth(voice, text);
      if (buf.length > 0) return buf;
      lastErr = new Error("empty audio");
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  throw lastErr;
}

async function main() {
  const { deck, voice, force, single } = parseArgs();
  let decks = parseEnglishSentences(fs.readFileSync(MD_FILE, "utf8"));
  // 기초편 파일이 있으면 `<slug>-basic` 으로 합친다.
  if (fs.existsSync(BASIC_MD_FILE)) {
    decks = { ...decks, ...parseEnglishSentences(fs.readFileSync(BASIC_MD_FILE, "utf8"), "-basic") };
  }
  if (deck) {
    if (!decks[deck]) {
      console.error(`덱 '${deck}' 없음. 가능: ${Object.keys(decks).join(", ")}`);
      process.exit(1);
    }
    decks = { [deck]: decks[deck] };
  }

  for (const [slug, sentences] of Object.entries(decks)) {
    const outDir = path.join(OUT_ROOT, slug);
    fs.mkdirSync(outDir, { recursive: true });

    // ── --single: 책 전체를 이어 붙인 단일 mp3 하나 (오디오북) ──
    if (single) {
      const dest = path.join(outDir, `${slug}-full.mp3`);
      if (fs.existsSync(dest) && !force) {
        console.log(`\n▶ ${slug}-full.mp3 이미 존재 → 건너뜀 (--force 로 재생성)`);
        continue;
      }
      const chunks = chunkSentences(sentences);
      console.log(`\n▶ ${slug} 통합본 · ${sentences.length}문장 → ${chunks.length}청크 · voice=${voice}`);
      const bufs = [];
      for (let c = 0; c < chunks.length; c++) {
        const buf = await synthWithRetry(voice, chunks[c]);
        bufs.push(buf);
        process.stdout.write(`  청크 ${c + 1}/${chunks.length} ✓ (${buf.length}B)\n`);
        await new Promise((r) => setTimeout(r, 250));
      }
      const full = Buffer.concat(bufs);
      fs.writeFileSync(dest, full);
      console.log(`  → ${slug}-full.mp3 저장 (${(full.length / 1024 / 1024).toFixed(2)}MB)`);
      continue;
    }

    console.log(`\n▶ ${slug} · ${sentences.length}문장 · voice=${voice}`);
    const files = [];
    let made = 0,
      skip = 0;
    for (let i = 0; i < sentences.length; i++) {
      const name = String(i + 1).padStart(3, "0") + ".mp3";
      const dest = path.join(outDir, name);
      files.push(name);
      if (fs.existsSync(dest) && !force) {
        skip++;
        continue;
      }
      try {
        const buf = await synthWithRetry(voice, sentences[i]);
        fs.writeFileSync(dest, buf);
        made++;
        process.stdout.write(`  ${name} ✓ (${buf.length}B)\n`);
      } catch (e) {
        process.stdout.write(`  ${name} ✗ ${e.message}\n`);
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    fs.writeFileSync(
      path.join(outDir, "manifest.json"),
      JSON.stringify(
        { deck: slug, voice, total: sentences.length, files, generatedAt: new Date().toISOString() },
        null,
        2,
      ),
    );
    console.log(`  → 생성 ${made} · 건너뜀 ${skip}`);
  }
  console.log("\n완료.");
}

main()
  .then(() => process.exit(0)) // msedge-tts 소켓이 열린 채 남아 프로세스가 안 끝나는 문제 방지
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
