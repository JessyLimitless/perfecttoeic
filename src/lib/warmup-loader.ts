import { promises as fs } from "fs";
import path from "path";

/** 기본편(원문 요약) — 표준 난이도 */
const FILE = path.join(process.cwd(), "content", "sets", "cheese_books_summary.md");
/** 기초편(쉬운 문장 리라이트) — 같은 이야기, 초급 난이도 */
const BASIC_FILE = path.join(process.cwd(), "content", "sets", "cheese_books_basic.md");

/** "standard"=기본편 · "basic"=기초편(쉬운 버전) */
export type WarmupLevel = "standard" | "basic";

export interface WarmupSentence {
  en: string;
  ko: string;
}

export interface WarmupSection {
  titleEn: string;
  titleKo: string;
  sentences: WarmupSentence[];
}

export interface WarmupDeck {
  /** "wmc" | "wmc-basic" — URL 슬러그 (기초편은 `-basic` 접미) */
  id: string;
  /** 1 | 2 | 3 — 같은 책은 난이도가 달라도 같은 bookNo */
  bookNo: number;
  /** 난이도 */
  level: WarmupLevel;
  titleKo: string;
  titleEn: string;
  /** 총 문장 수(영/한 페어) */
  total: number;
  sections: WarmupSection[];
}

/** 책 번호 → 고정 슬러그/제목 (헤더 파싱 실패 시 폴백) */
const BOOK_META: Record<number, { id: string; titleEn: string; titleKo: string }> = {
  1: { id: "wmc", titleEn: "Who Moved My Cheese?", titleKo: "누가 내 치즈를 옮겼을까?" },
  2: { id: "ootm", titleEn: "Out of the Maze", titleKo: "내 치즈는 어디로 갔을까?" },
  3: { id: "present", titleEn: "The Present", titleKo: "선물" },
};

/** "## 📕 Book 1: Who Moved My Cheese? (누가 내 치즈를 옮겼을까?)" → {bookNo, titleEn, titleKo} */
function parseBookHeader(line: string): { bookNo: number; titleEn: string; titleKo: string } | null {
  const m = line.match(/Book\s+(\d+)\s*:\s*(.+?)(?:\s*\(([^)]*)\))?\s*$/i);
  if (!m) return null;
  const bookNo = Number(m[1]);
  return {
    bookNo,
    titleEn: m[2]?.trim() || BOOK_META[bookNo]?.titleEn || `Book ${bookNo}`,
    titleKo: m[3]?.trim() || BOOK_META[bookNo]?.titleKo || `책 ${bookNo}`,
  };
}

interface RawSection {
  title: string;
  sentences: string[];
}

/**
 * 하나의 언어 블록(English Summary 또는 한글 번역)에서
 * `#### 섹션` 과 `N. 문장` 들을 순서대로 수집한다. 번호는 신뢰하지 않고 위치 기준.
 */
function parseLanguageBlock(lines: string[]): RawSection[] {
  const sections: RawSection[] = [];
  let cur: RawSection | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("#### ")) {
      cur = { title: line.slice(5).trim(), sentences: [] };
      sections.push(cur);
      continue;
    }
    const sm = line.match(/^\d+\.\s+(.*)$/);
    if (sm && cur) {
      cur.sentences.push(sm[1].trim());
    }
  }
  return sections;
}

/**
 * 하나의 MD 파일(기본편 또는 기초편)을 WarmupDeck[] 로 파싱한다.
 * 구조: `## Book N` → `### 1. English Summary` / `### 2. 한글 번역`
 *      → `#### 섹션` (책당 10) → `N. 문장` (섹션당 10).
 * EN/KO 는 (섹션 순서, 문장 순서) 위치로 zip 한다.
 * 기초편(level="basic")은 슬러그에 `-basic` 접미를 붙여 기본편과 구분한다.
 */
function parseDecks(raw: string, level: WarmupLevel): WarmupDeck[] {
  const allLines = raw.split(/\r?\n/);

  // `## ` (단, `### ` 제외) 기준으로 책 블록 분할
  const bookBlocks: { header: string; lines: string[] }[] = [];
  let curBook: { header: string; lines: string[] } | null = null;
  for (const line of allLines) {
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      curBook = { header: line, lines: [] };
      bookBlocks.push(curBook);
      continue;
    }
    if (curBook) curBook.lines.push(line);
  }

  const decks: WarmupDeck[] = [];
  for (const block of bookBlocks) {
    const head = parseBookHeader(block.header);
    if (!head) continue;

    // 책 안에서 `### ` 언어 블록 분할 (English Summary / 한글 번역)
    const langBlocks: { header: string; lines: string[] }[] = [];
    let curLang: { header: string; lines: string[] } | null = null;
    for (const line of block.lines) {
      if (line.startsWith("### ")) {
        curLang = { header: line, lines: [] };
        langBlocks.push(curLang);
        continue;
      }
      if (curLang) curLang.lines.push(line);
    }

    const enBlock = langBlocks.find((b) => /english/i.test(b.header));
    const koBlock = langBlocks.find((b) => /한글|번역|korean/i.test(b.header));
    if (!enBlock || !koBlock) continue;

    const enSecs = parseLanguageBlock(enBlock.lines);
    const koSecs = parseLanguageBlock(koBlock.lines);

    const meta = BOOK_META[head.bookNo];
    const sections: WarmupSection[] = [];
    let total = 0;

    const secCount = Math.min(enSecs.length, koSecs.length);
    for (let i = 0; i < secCount; i++) {
      const en = enSecs[i];
      const ko = koSecs[i];
      const n = Math.min(en.sentences.length, ko.sentences.length);
      const sentences: WarmupSentence[] = [];
      for (let j = 0; j < n; j++) {
        sentences.push({ en: en.sentences[j], ko: ko.sentences[j] });
      }
      if (sentences.length === 0) continue;
      sections.push({ titleEn: en.title, titleKo: ko.title, sentences });
      total += sentences.length;
    }

    if (total === 0) continue;

    const baseId = meta?.id ?? `book-${head.bookNo}`;
    decks.push({
      id: level === "basic" ? `${baseId}-basic` : baseId,
      bookNo: head.bookNo,
      level,
      titleEn: head.titleEn,
      titleKo: head.titleKo,
      total,
      sections,
    });
  }

  return decks;
}

async function readOptional(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

/**
 * 기본편 + 기초편 두 파일을 읽어 WarmupDeck[] 로 합친다.
 * 기초편 파일이 없어도 기본편만 정상 반환(점진 도입 안전).
 * 정렬: bookNo 오름차순 → 같은 책이면 기본편(standard) 먼저.
 */
export async function loadWarmupDecks(): Promise<WarmupDeck[]> {
  const [std, basic] = await Promise.all([readOptional(FILE), readOptional(BASIC_FILE)]);
  if (std === null && basic === null) return [];

  const decks: WarmupDeck[] = [
    ...(std !== null ? parseDecks(std, "standard") : []),
    ...(basic !== null ? parseDecks(basic, "basic") : []),
  ];

  const levelRank: Record<WarmupLevel, number> = { standard: 0, basic: 1 };
  decks.sort((a, b) => a.bookNo - b.bookNo || levelRank[a.level] - levelRank[b.level]);
  return decks;
}
