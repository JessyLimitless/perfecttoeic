import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "content", "sets", "cheese_books_summary.md");

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
  /** "wmc" | "ootm" — URL 슬러그 */
  id: string;
  /** 1 | 2 */
  bookNo: number;
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
 * content/sets/cheese_books_summary.md 를 읽어 WarmupDeck[] 로 파싱한다.
 * 구조: `## Book N` → `### 1. English Summary` / `### 2. 한글 번역`
 *      → `#### 섹션` (책당 10) → `N. 문장` (섹션당 10).
 * EN/KO 는 (섹션 순서, 문장 순서) 위치로 zip 한다.
 */
export async function loadWarmupDecks(): Promise<WarmupDeck[]> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch {
    return [];
  }

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

    decks.push({
      id: meta?.id ?? `book-${head.bookNo}`,
      bookNo: head.bookNo,
      titleEn: head.titleEn,
      titleKo: head.titleKo,
      total,
      sections,
    });
  }

  decks.sort((a, b) => a.bookNo - b.bookNo);
  return decks;
}
