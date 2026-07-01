# -*- coding: utf-8 -*-
"""
몸풀기(치즈 스토리) 영문 문장을 gTTS로 음성(mp3) 생성.

- 입력 : content/sets/cheese_books_summary.md  (English Summary 블록)
- 출력 : public/audio/warmup/<deck>/<NNN>.mp3   (NNN = flat 1-base index, zero-pad 3)
- 매니페스트: public/audio/warmup/manifest.json  ({deck: {total, files:[...]}, generatedAt})

파싱 규칙은 src/lib/warmup-loader.ts 와 동일하게 (섹션 순서, 문장 순서) 위치 기준으로
flatten 하므로 프론트의 문장 index 와 파일명 NNN 이 1:1로 맞는다.

사용법:
  pip install gtts
  python scripts/tts_generate.py                # 전체(이미 있으면 건너뜀)
  python scripts/tts_generate.py --deck wmc     # 특정 덱만
  python scripts/tts_generate.py --force        # 기존 파일 덮어쓰기
  python scripts/tts_generate.py --tld co.uk    # 영국식 발음 (기본 com=미국식)
"""
import argparse
import json
import os
import re
import sys
import time
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD_FILE = os.path.join(ROOT, "content", "sets", "cheese_books_summary.md")
OUT_ROOT = os.path.join(ROOT, "public", "audio", "warmup")

# warmup-loader.ts BOOK_META 와 동일한 bookNo -> 슬러그 매핑
BOOK_SLUG = {1: "wmc", 2: "ootm", 3: "present"}


def parse_english_sentences(md_text):
    """{deck_slug: [sentence, ...]} — 섹션·문장 순서 기준 flatten (영문만)."""
    lines = md_text.splitlines()

    # `## ` (단, `### ` 제외) 로 책 블록 분할
    books = []
    cur = None
    for line in lines:
        if line.startswith("## ") and not line.startswith("### "):
            cur = {"header": line, "lines": []}
            books.append(cur)
        elif cur is not None:
            cur["lines"].append(line)

    result = {}
    for block in books:
        m = re.search(r"Book\s+(\d+)", block["header"], re.IGNORECASE)
        if not m:
            continue
        book_no = int(m.group(1))
        slug = BOOK_SLUG.get(book_no, f"book-{book_no}")

        # 책 안에서 `### ` 언어 블록 분할, English Summary 찾기
        lang_blocks = []
        clang = None
        for line in block["lines"]:
            if line.startswith("### "):
                clang = {"header": line, "lines": []}
                lang_blocks.append(clang)
            elif clang is not None:
                clang["lines"].append(line)

        en_block = next((b for b in lang_blocks if re.search(r"english", b["header"], re.IGNORECASE)), None)
        if not en_block:
            continue

        # `#### 섹션` / `N. 문장` 순서대로 수집
        sentences = []
        in_section = False
        for raw in en_block["lines"]:
            line = raw.strip()
            if line.startswith("#### "):
                in_section = True
                continue
            sm = re.match(r"^\d+\.\s+(.*)$", line)
            if sm and in_section:
                sentences.append(sm.group(1).strip())

        if sentences:
            result[slug] = sentences
    return result


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--deck", help="특정 덱 슬러그만 생성 (예: wmc)")
    ap.add_argument("--force", action="store_true", help="기존 mp3 덮어쓰기")
    ap.add_argument("--tld", default="com", help="gTTS tld (com=미국, co.uk=영국, com.au=호주)")
    ap.add_argument("--sleep", type=float, default=0.4, help="요청 간 대기(초)")
    args = ap.parse_args()

    try:
        from gtts import gTTS
    except ImportError:
        print("gTTS 미설치 → 'pip install gtts' 실행 후 다시 시도하세요.", file=sys.stderr)
        sys.exit(1)

    with open(MD_FILE, encoding="utf-8") as f:
        decks = parse_english_sentences(f.read())

    if not decks:
        print("파싱된 문장이 없습니다. MD 형식을 확인하세요.", file=sys.stderr)
        sys.exit(1)

    if args.deck:
        if args.deck not in decks:
            print(f"덱 '{args.deck}' 없음. 가능: {list(decks)}", file=sys.stderr)
            sys.exit(1)
        decks = {args.deck: decks[args.deck]}

    manifest = {}
    total_made = 0
    total_skip = 0
    for slug, sentences in decks.items():
        out_dir = os.path.join(OUT_ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)
        files = []
        for i, sentence in enumerate(sentences):
            name = f"{i + 1:03d}.mp3"
            path = os.path.join(out_dir, name)
            files.append(name)
            if os.path.exists(path) and not args.force:
                total_skip += 1
                continue
            try:
                gTTS(sentence, lang="en", tld=args.tld).save(path)
                total_made += 1
                print(f"  [{slug}] {name}  ✓")
                time.sleep(args.sleep)
            except Exception as e:  # noqa: BLE001
                print(f"  [{slug}] {name}  ✗ {e}", file=sys.stderr)
        manifest[slug] = {"total": len(sentences), "files": files}

    os.makedirs(OUT_ROOT, exist_ok=True)
    with open(os.path.join(OUT_ROOT, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(
            {"generatedAt": datetime.now(timezone.utc).isoformat(), "tld": args.tld, "decks": manifest},
            f,
            ensure_ascii=False,
            indent=2,
        )

    print(f"\n완료: 생성 {total_made} · 건너뜀 {total_skip} · 덱 {list(manifest)}")


if __name__ == "__main__":
    main()
