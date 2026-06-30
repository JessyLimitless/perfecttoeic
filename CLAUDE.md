# CLAUDE.md — 토익넷 2.0 (TOEICNET 2.0)

> 세션이 토큰 한계로 끊겨도 다음 세션에서 바로 이어가기 위한 작업 메모.
> 상세 기획은 `토익넷2.0_서비스기획서.md` 참고.

## 1. 프로젝트 한 줄 요약

컴퓨터(AI 봇)와 1:1 속도전으로 토익 RC 문제를 푸는 캐주얼 게이미피케이션 웹 앱.
Next.js(App Router) + Tailwind. 백엔드 없이 프론트 중심 MVP. 문제는 `content/sets/*.md`의
JSON 문제 은행에서 공급. 토익 전용 점수향상 서비스 — **Part 5·6·7 기출 빈출 유형 중심**.

## 2. 콘텐츠 문제 은행 — 핵심 구조

- 위치: `content/sets/*.md`. 각 `.md`는 ` ```json … ``` ` 코드블록 안에 **PassageSet 1개**를 담는다.
- 로더: `src/lib/sets-loader.ts` → `loadAllSets()`. `id`/`passageLines`/`questions` 배열이 있어야 채택. 형식 깨진 파일은 **조용히 건너뜀**(에러 안 남) → 생성 후 반드시 검증할 것.
- API: `GET /api/sets` (`src/app/api/sets/route.ts`)가 전부 반환.

### PassageSet 스키마 (`src/game/types.ts`)

```jsonc
{
  "id": "p7-g-03",              // 고유. 파일명과 일치시키는 게 관례
  "part": 5,                    // 5 | 6 | 7  (없으면 7로 간주)
  "difficulty": "MEDIUM",       // EASY | MEDIUM | HARD
  "passageType": "Email",       // 라벨 (Email, Article, Notice, Text Message Chain ...)
  "passageLines": [             // Part 5는 [] (빈 배열). Part 6/7은 영/한 문장 페어
    { "en": "...", "ko": "..." }
  ],
  "questions": [
    {
      "id": "p7-g-03-q1",
      "prompt": "...",          // 영어 문두/문장
      "promptKo": "...",        // 한글
      "choices":   ["A","B","C","D"],   // 정확히 4개
      "choicesKo": ["가","나","다","라"],// 정확히 4개
      "answerIndex": 0,         // 0~3
      "explanation": "... 따라서 (가)=0입니다.",  // 한글 해설 (끝에 정답 명시 관례)
      "category": "세부사항"     // §3 표준 라벨 사용
    }
  ]
}
```

- **Part 5**: `passageLines: []`. `prompt`에 빈칸 `------` 포함한 단문. 보통 세트당 10문항.
- **Part 6**: 지문 안에 `------(1)` 형태 빈칸 4개, 문항 4개. `------(3)`처럼 문장삽입 빈칸도 있음.
- **Part 7**: 지문(`passageLines`) + 문항 5개 내외. 빈출 유형 골고루.

## 3. 문항 category → 표준 유형 정규화 (중요)

`src/game/questionTypes.ts`가 런타임에 `category`를 6개 표준 유형으로 매핑한다.
**새 문항의 `category`는 아래 인식되는 라벨을 써야 한다** (미상은 전부 DETAIL로 떨어짐):

- 주제·목적 → MAIN  (`주제·목적`, `주제`, `목적`, `대의` …)
- 세부사항 → DETAIL (`세부사항`, `세부`)
- 추론 → INFERENCE (`추론`)
- 동의어 → VOCAB (`동의어`, `어휘`)
- 사실확인 → NOTTRUE (`사실확인`, `부정사실`)
- 의도·화법 → INTENT (`의도·화법`, `의도파악`, `수사적목적`, `문장삽입`, `문장단순화`)

Part 5/6 문법 라벨(전치사·접속사·동사·관계사·가정법·도치·분사·준동사·수량표현·비교·대명사·어휘 등)은
표준 6유형엔 없어 DETAIL로 정규화됨 — 의도된 동작(유형 필터는 Part 7 독해 위주). 문법 라벨은 그대로 둔다.

## 4. 현재 콘텐츠 인벤토리 (2026-06-26 기준)

레거시 `01~100-*.md`는 구버전 AI/데이터 테마 게임 콘텐츠(part 필드 없음 → 7로 간주). TOEIC 신규는 `p5/p6/p7` 접두.
**통합 검증(로더 기준): md 176개 전부 채택, 총 980문항, set/문항 id 중복 0, 스키마 오류 0.**

| 파트 | 세트 | 상태 |
|---|---|---|
| Part 5 테마형 | `p5-01`~`p5-06` (어형·시제, 전치사·접속사, 대명사·비교, 준동사, 어휘, 수량·가정법) | 완료 |
| Part 5 g-시리즈 | `gA-01~08`·`gB-01~08`·`gC-01~08`·`gD-01~08`·`gE-01~06`(시제·태/전치사·접속사/관계사·명사절/준동사/어휘/문법종합) = **38세트** | 완료 |
| Part 5 난이도 | `p5-easy-01`(EASY)·`p5-hard-01`(HARD 가정법·도치·복합관계사·병치) = **2세트** | 완료 |
| Part 6 | `p6-01`~`p6-14` (…Newsletter, Itinerary 추가) + `p6-easy-01`·`p6-hard-01` = **16세트** | 완료 |
| Part 7 g-시리즈 | `01`Article·`02`Text Msg·`03`Email·`04`Notice·`05`Ad·`06`Online Chat·`07`Letter·`08`Double·`09`Triple·`10`Form·`11`Schedule·`12`Review = **12세트** | 완료 |
| Part 7 난이도 | `p7-easy-01`(EASY Notice)·`p7-hard-01`(HARD Double Passage) = **2세트** | 완료 |

> 신규 TOEIC: Part 5 = 46 · Part 6 = 16 · Part 7 = 14 (+ 레거시 100). 모든 신규 세트 part 필드 명시됨.
> 난이도 분포(신규): P5 EASY4/MED38/HARD4 · P6 EASY1/MED14/HARD1 · P7 EASY12/MED24/HARD78. (Part6 양끝단은 아직 얇음 — 추가 보강 여지)
> 정답 분포(전체 980문항, 2026-06-27 균등화 완료): A23.8/B23.6/C25.9/D26.7. 파트별 P6 완전균등 25/25/25/25 · P7 26/23/25/25 · P5 21/23/27/29. (`scripts/rebalance-all.mjs`)

### 다음 작업 후보 (정해진 것 없음 — 사용자 확인 후 진행)
- Part 6 EASY·HARD 추가 보강(현재 각 1세트로 가장 얇음).
- 대결 모드: 아바타 실제 이미지 투입(`/public/avatar.png`)·밸런스/연출 튜닝.
- 콘텐츠 추가 확장(테마·유형 다양화) / Part 5·7 난이도 세트 추가.

## 5. 콘텐츠 생성 시 체크리스트

1. 파일명 = `id` 와 일치 (예: `p7-g-03.md` ↔ `"id": "p7-g-03"`). 문항 id는 `<setid>-q1` 패턴.
2. `choices`/`choicesKo` 각 정확히 4개, `answerIndex` 0~3.
3. `category`는 §3의 인식 라벨 사용(특히 Part 7).
4. 해설은 한글, 끝에 정답을 `(가)=0` 식으로 명시(기존 관례).
5. 영/한 번역 모두 채울 것(`passageLines`, `prompt/promptKo`, `choices/choicesKo`).
6. 테마는 AI·데이터 분석 소재 선호(사용자 관심사). 단 토익 비즈니스 영어 톤 유지.
7. 생성 후 JSON 파싱 검증:
   `node -e "const fs=require('fs');const m=fs.readFileSync('content/sets/<file>.md','utf8').match(/\`\`\`json([\s\S]*?)\`\`\`/);JSON.parse(m[1]);console.log('OK')"`

## 6. 개발 서버 운영 메모

- 실행: `npm run dev` (Next.js). 화면: 로비(`/`) → 게임(`/game`) → 결과(`/result`).
- **`.next` 캐시 손상 대처** (500 / `errno -4094` 등): dev 프로세스 kill → `.next` 삭제 → 재시작.
  ```bash
  rm -rf .next && npm run dev
  ```
- 스크린샷 스크립트: `scripts/shot*.mjs` (Playwright 류).

## 7. 주요 파일 지도

- 도메인 타입: `src/game/types.ts` / 유형 체계: `src/game/questionTypes.ts` / 파트 메타: `src/game/parts.ts`
- 상태/설정/진행: `src/game/{store,config,progress}.ts`
- 콘텐츠 로딩: `src/lib/sets-loader.ts`, `src/lib/questions.ts`
- 화면: `src/app/{page,game/page,result/page}.tsx`
- 컴포넌트: `src/components/{lobby,game,practice,result,ui}/`

## 8. AI 대결 모드 (Network Toeic Match) — 구현됨 ✅

기획: `토익넷2.0_대결모드_PRD.md`. 연습 모드와 별개로 **AI 챌린저와 1판 10문항 속도전**.

- **동결 계약**: `src/game/match/types.ts` (MatchState/상수/봇 프로필) — 변경 시 화면·엔진 동기 필요.
- **엔진**: `src/game/match/{matchStore.ts(zustand), pool.ts(10문항 추출), persist.ts(별명/ID/크레딧 localStorage)}`.
- **인게임**: `src/app/match/page.tsx`(방개설→카운트다운→playing) + `components/match/{MatchHud,BotProgressBar,CountdownIntro,MatchChoiceButtons}`.
  - **대결 중 해설 없음**: 답하면 정/오만 0.6초 플래시 후 **자동 진행**(MatchChoiceButtons). 해설은 결과 REVIEW 전용.
- **결과**: `src/app/match/result/page.tsx` + `components/match/{GameResultTable,ProgressGrid,ProfileCard,ResultBanner,RematchTimer}` — 목업(`content/sets/Gemini_Generated_Image_*.png`) 1:1.
- 진입: 로비(`app/page.tsx`)의 「AI 대결 시작」 버튼 → `/match`.
- 점수: 정답 100 + 남은초 보너스. 봇은 난이도별 정답률·풀이시간 시뮬. 승리 +5 / 전문항정답 미션 +3 크레딧.
- **지문 표시**: 문항은 `MatchItem`(types.ts)으로 지문(passageLines)을 동반 → 인게임에서 Part 6/7 지문을 `PassagePanel`로 표시(`pool.ts buildMatchItems`). Part 5는 지문 없음.
- **파트별 제한시간**: `secondsForPart` — Part 5=20·6=35·7=50초(types.ts `PER_QUESTION_SECONDS_BY_PART`).
- **플레이어 아바타**: `components/match/PlayerAvatar.tsx` — `/public/avatar.png` 있으면 그 이미지, 없으면 이름 이니셜 버블(자동 폴백). HUD에 플레이어↔AI versus 레이아웃(선두에 👑).
- **대결 중 영어 전용**: 실전성 위해 인게임에선 지문·문제·보기의 **한글 번역을 숨김**. `PassagePanel`·`QuestionPanel`에 `hideKo` prop 추가(연습 모드 `/game`은 영/한 병기 그대로), `MatchChoiceButtons`는 영어 보기만 렌더. 한글/해설은 **종료 후 REVIEW에서만**.
- **대결 중 유형 뱃지 숨김 ✅**: `QuestionPanel`에 `hideTypeBadge` prop 추가, `/match` 인게임에서만 true(연습 `/game`은 노출 유지).
- **닉네임·아바타 설정 UI ✅**: `components/match/IdentitySettings.tsx`(로비 카드) — 닉네임 입력 + 아바타 프리셋 6종(`src/game/match/avatars.ts`). 저장은 `persist.ts`(localStorage). 동결계약 `types.ts`는 `PlayerIdentity.avatarId?`만 추가(제거·구조변경 없음). HUD·ProfileCard는 `loadIdentity()`로 avatarId 직접 로드해 반영. `PlayerAvatar`에 `avatarId` prop 추가(이모지 프리셋/이미지/이니셜 3단 폴백).
- **알려진 한계(추후)**: ① L/C는 회색 placeholder(RC 전용, Listening 콘텐츠 없음). ② 아바타 `/public/avatar.png` 실제 이미지 미투입(default 프리셋만 이미지 경로 사용).
- **운영 주의**: 파일 대량 수정 후 dev가 `.next` 캐시 손상(500/errno -4094) 날 수 있음 → [[toeicnet-dev-server]] 대처(kill+rm .next+재시작). 편집을 다 끝낸 뒤 클린 재시작하면 안정적.

### 세션 로그 — 2026-06-26
- 콘텐츠 대량 생성(병렬 에이전트): Part 5 gD 8세트 / Part 6 +6세트(p6-07~12) / Part 7 +6세트(p7-g-03~08). 통합검증 158세트·858문항·오류 0.
- AI 대결 모드 신규 구현(병렬 3에이전트 + 동결계약 `match/types.ts`): 엔진/인게임/결과. 로비 진입 버튼 연결.
- 대결 UX 보정: 대결 중 해설 제거+자동진행 → 지문 표시(Part 6/7)+파트별 시간차등 → 플레이어 아바타 versus → **영어 전용**(한글 숨김). 매 단계 dev 실제 플레이 캡처로 검증.
- **다음 후보**: 유형 뱃지 대결 시 숨김 / 닉네임·아바타 설정 UI / 밸런스·연출 튜닝 / `/public/avatar.png` 실제 이미지 투입 / Part 5 gE·Part 6 추가.

### 세션 로그 — 2026-06-26 (2차, 병렬 4에이전트)
- **콘텐츠 +122문항 → 통합검증 176세트·980문항·set/문항 id중복 0·오류 0, `tsc --noEmit` 통과.**
  - Part 7 확장: `p7-g-09`Triple·`10`Form·`11`Schedule·`12`Review (4세트).
  - Part 5 gE 6세트(`p5-gE-01~06`) + Part 6 `p6-13`Newsletter·`p6-14`Itinerary.
  - 난이도 보강: `p5-easy-01`/`p5-hard-01`, `p6-easy-01`/`p6-hard-01`, `p7-easy-01`/`p7-hard-01`. (분석결과 Part6 양끝단이 가장 얇었음 → 각1 보강, 추가 여지)
- **대결 모드 polish**: 유형 뱃지 대결 중 숨김(`hideTypeBadge`) + 닉네임·아바타 설정 UI(`IdentitySettings`/`avatars.ts`/persist 확장). lint·typecheck 클린.
- **품질 검증(웹검색+표본 추론)**: 유형 구조화·문항 품질은 ETS 기출 스펙에 충실(P5 3버킷·P6 빈칸4+문장삽입·P7 single/double/triple+6유형). **결함 1건: 정답 위치 쏠림**(신규 16세트가 정답 전부 A) 발견.
- **정답 재배치 교정**: `scripts/rebalance-answers.mjs`(보기 스왑+answerIndex+`(가)=N` 마커 갱신, 해설 다중참조 문항은 제외). 쏠린 16세트 84문항 교정 → 전체 분포 A36.5→28.4 / D13.2→15.7%, 마커불일치 0·정답텍스트 보존 확인. 범위는 "쏠린 16세트만"(사용자 선택). **Part 6 레거시는 여전히 A쏠림(48%) — 전체 균등화는 추후 여지.**
- **다음 후보**: Part 6 정답분포 전체 균등화 / Part 6 EASY·HARD 추가 / 아바타 실이미지 투입 / 대결 밸런스·연출 튜닝 / 콘텐츠 테마·유형 추가 확장.

### 세션 로그 — 2026-06-26 (3차: 품질 전수감사 + UI 프리미엄·모바일, 병렬 6에이전트)
- **신규 세트 전수 정답키 감사(병렬 3에이전트, 키를 보기 전 독립 재풀이→대조)**: P5 47세트 488문항 / P6 16세트 64문항 / P7 14세트 68문항 = **620문항 KEY_ERROR 0 · AMBIGUOUS 0**. 경미한 번역 메모 몇 건(수정 불필요). 신규 콘텐츠 품질 검증 완료.
- **디자인 토대 락(직접)**: `globals.css`(프리미엄 토큰: `.container-app`/`.card-elevated`/`.surface-dark`/`.skeleton(-dark)`/`.btn-dark`·`.btn-ghost`/`.text-gradient-rose`/`pb-safe`/`min-h-dvh`, shimmer keyframe), `tailwind.config.ts`(animate-shimmer/float/glow-pulse/scan/ping-slow, max-w-app), `layout.tsx`(viewport meta + dvh + 메타 최신화). **이 3파일은 공유 계약 — 화면 에이전트는 읽기만.**
- **화면 프리미엄·모바일(병렬 3에이전트, 파일 소유권 분리)**:
  - 로비(`app/page.tsx`+`components/lobby/*`): 넓은 프레임(max-w-md→`container-app`), 데스크탑 2단 레이아웃, 신뢰 칩, `btn-dark` 대결 CTA, 모바일 터치타깃·`pb-safe`.
  - 대결 인게임+**매치메이킹 긴박감 신규**(`app/match/page.tsx`+`components/match/*`, 신규 `Matchmaking.tsx`): 「대결 시작」→ 로컬 `phase` state로 **상대 프로필 빈 슬롯(? 실루엣+`skeleton-dark`+레이더/스캔)·"상대를 찾는 중…"** 긴장 연출 → 봇 공개(`BOT_PROFILE[difficulty]`) → `startMatch()`로 countdown 진입. **동결계약 `match/types.ts` 무손상**(status 추가 없이 로컬 state). MatchHud `surface-dark`+danger 강화.
  - 게임·결과(`app/game`·`app/result`·`app/match/result`+`components/{game,practice,result}/*`+결과용 match 컴포넌트): 넓은 프레임, 지문+문항 2단(데스크탑), 모바일 스크롤·터치 최적화. `QuestionPanel`/`PassagePanel`의 `hideKo`/`hideTypeBadge` 동작 보존.
- **검증**: 전체 `tsc --noEmit` 통과, `.next` 클린 재시작 후 전 라우트 200·컴파일 에러 0. 스크린샷으로 데스크탑/모바일 로비·매치메이킹 긴박감 연출 실제 확인.
- **다음 후보**: 매치메이킹 공개 후 봇 닉네임 다양화 / Part 6 정답분포 전체 균등화 / 아바타 실이미지 / L/C 콘텐츠 / 연출 사운드·햅틱.

### 세션 로그 — 2026-06-30 (몸풀기 스토리 리딩 모드 신규)
- **신규 메뉴 「몸풀기」**(읽기 모드): 스펜서 존슨 치즈 시리즈 2권 영문 요약을 한 문장씩 읽고, 막히면 탭해 번역 확인 → "이해됐어요"로 진행. 서사 기반 워밍업(이해가능입력+서사우월효과+generation effect). 사용자 확정 범위 = **읽기 모드만**(암기 모드 Cloze→Recall+SM-2는 같은 데이터로 후속 확장 여지).
- **데이터**: `content/sets/cheese_books_summary.md`(산문 MD, JSON PassageSet 아님 → `loadAllSets()`가 조용히 건너뜀, 문제은행 무영향). Book1 100문장 + Book2 100문장, EN/KO 섹션 1:1 정합 검증 완료. 페어링은 번호 무시·**(책→섹션순서→문장순서) 위치 기반**(한글 번호 오타 `91.`(should 191) 1건 있으나 무관).
- **신규 파일**: `src/lib/warmup-loader.ts`(파서, server fs), `src/game/warmup.ts`(진도 localStorage `toeic-warmup-v1`, progress.ts와 분리), `src/app/warmup/page.tsx`·`[book]/page.tsx`(서버 컴포넌트, loadWarmupDecks 직접 호출·props 전달, API 없음), `src/components/warmup/{WarmupHome,WarmupPlayer}.tsx`(client). 덱 슬러그: `wmc`/`ootm`.
- **로비 진입**(`src/app/page.tsx`): `CtaButtons`에 3번째 ghost 버튼 "📖 몸풀기·스토리 리딩" 추가(데스크탑/모바일 양쪽), 히어로 카피 1줄 보강. 기존 두 CTA 보존.
- **검증**: `tsc --noEmit` 통과, 파서 단독 확인(덱2·각 total100·섹션10×10·empty 0·EN/KO 정합), dev 라우트 `/`·`/warmup`·`/warmup/{wmc,ootm}` 200·`/warmup/bogus` 404, 렌더 콘텐츠 확인. 이어보기(lastIndex 복원) 동작.
- **다음 후보**: 암기 모드(Cloze→한영 Recall+간격반복) / 역방향 한→영 토글 / 콘텐츠 덱 추가 / `content/sets/cheese_books_summary.md:264` 표시용 번호 오타 정리.

### 세션 로그 — 2026-06-30 (2차: 암기 모드 추가)
- **몸풀기에 「암기」 모드 추가**(읽기 모드와 같은 치즈 데이터 재사용): **Cloze(빈칸 떠올리기) → Recall(한→영 통문장) + Leitner/SM-2 라이트 간격반복**. 박스 0~5, 간격 `[0,1,2,4,8,16]`일, 박스≥4=마스터(memorize.ts 상수).
- **신규 파일**: `src/game/memorize.ts`(SR 스토어 `toeic-memorize-v1`, `rateCard`/`buildCloze`(불용어 제외·긴 내용어 우선·16단어↑면 2빈칸)/`learnedCount·masteredCount·dueCount`), `src/app/warmup/[book]/memorize/page.tsx`(서버), `src/components/warmup/MemorizePlayer.tsx`(client).
- **세션 로직**(MemorizePlayer): 큐 = 복습예정(due≤now) 먼저 + 신규, 세션 20문장. 단계는 박스≥2면 Recall·아니면 Cloze. 자가채점 `다시/알았어요` → SR 갱신, 오답은 같은 세션 끝으로 즉시 재투입. 큐 비면 요약(학습수·첫시도 정답률·다시 횟수). due 없으면 "전체 복습" 폴백 화면.
- **WarmupHome 모드 토글**(읽기/암기 세그먼트): 암기 카드엔 마스터수/복습예정 표시 + `복습하기(N)`·`암기 시작`. 라우팅 `/warmup/[book]/memorize`. 읽기 진도(`warmup.ts`)와 암기 SR(`memorize.ts`)는 **별도 localStorage 키**.
- **검증**: `tsc --noEmit` 통과, `buildCloze` 표본 출력 확인(구두점/따옴표 보존·2빈칸), dev 라우트 `/warmup`·`/warmup/[book]`·`/warmup/[book]/memorize` 200·bogus 404. 중간에 `.next` 캐시 손상(errno -4094) 발생 → kill+rm .next+재시작으로 해결([[toeicnet-dev-server]]).
- **다음 후보**: 텍스트 입력형 Cloze(현재 자가채점) / Recall 음성·타이핑 검증 / 암기 통계 로비 노출 / 콘텐츠 덱 추가.

### 세션 로그 — 2026-06-30 (3차: 몸풀기 UI/UX 프리미엄 리디자인)
- 사용자 피드백("UI 구리다") → 세 화면 전부 디자인 시스템에 맞춰 재정비. **globals.css·tailwind.config는 공유계약이라 미수정**(기존 토큰만 사용: `sheet`/`card-elevated`/`chip`/`text-gradient`/gradient 버튼/`animate-glow-pulse`).
- **WarmupPlayer(읽기)**: 폭 `container-app`→`container-narrow`(독서 집중), `sheet` 표면+상단 그라데이션 액센트, **번역 블러→탭 해제**(framer-motion filter 애니메이션, "탭하여 뜻 보기" pill), 얇은 그라데이션 진도바, 섹션 칩+순번, `Kbd` 키보드 힌트, 완료화면 spring 연출.
- **MemorizePlayer(암기)**: Cloze=앰버/Recall=바이올렛 테마(상단 액센트·배지 색 분기), 빈칸을 점선 pill로, 정답 공개 시 `highlightAnswers`로 정답 단어 앰버 하이라이트, 평점 버튼(다시=rose 아웃라인/알았어요=primary), 요약 Stat 카드 톤 분리. 로직(큐·SR·채점) 무변경.
- **WarmupHome**: 책 커버형 카드(Book1 rose·Book2 emerald 그라데이션 스파인), **슬라이딩 세그먼트 토글**(framer-motion `layoutId="warmup-mode-pill"`), 진도바 톤 분기(읽기 indigo/암기 violet), hover lift.
- **검증**: `tsc --noEmit` 통과, dev 전 라우트 200·컴파일 에러 0, puppeteer-core로 6개 상태(홈 읽기/암기·리더·리더공개·암기 Cloze·정답공개) 스크린샷 육안 확인 — 프리미엄 톤 확보.
- **문장 번호 앞당김(순서 암기)**: 사용자 요청으로 각 문장 앞에 **전역 1~100 번호**를 그라데이션으로 표기 → 번호↔문장 매핑 암기 지원. WarmupPlayer는 flat index+1, MemorizePlayer는 `FlatItem.no`(flatten 시 `out.length+1`) 추가 + 카드 배지행에 `No.NN` 칩. 읽기·암기(Cloze 프롬프트/Recall 한글/정답공개) 모두 문장 앞 번호 노출.
- **운영 메모**: 한 세션에 `npm run dev`를 여러 번 띄워 **node 프로세스 3개가 .next를 동시 점유** → errno -4094 재발. `taskkill /F /IM node.exe`로 전부 정리 후 단일 dev 재기동하면 안정. (.next 삭제만으론 부족할 수 있음 — 잔존 프로세스 먼저 확인)

### 세션 로그 — 2026-06-30 (4차: 순서 맞추기 게임 추가)
- **몸풀기 3번째 서브메뉴 「순서」 추가**: 책을 10문장씩 청크(=섹션)로 나눠 **순차 고르기**(다음 문장을 1→10 차례로 탭). 정답=잠금+✓애니, 오답=흔들림+실수카운트, 2회 틀리면 정답 카드 앰버 힌트. 청크 클리어 시 완성순서 미리보기+실수표시, 10청크 완성=스토리 완성. 교육근거: 담화 응집장치(지시·연결어·시간표지) 인출 = **Part 6 문장삽입 유형 훈련**과 직결.
- **신규 파일**: `src/game/order.ts`(진도 `toeic-warmup-order-v1`: 청크별 cleared/bestMistakes, `firstUnclearedChunk`로 이어하기), `src/app/warmup/[book]/order/page.tsx`(서버), `src/components/warmup/OrderingGame.tsx`(client, 뜻 토글 포함).
- **WarmupHome 3탭 토글**(읽기/암기/🧩순서, layoutId pill 그대로 3개로): `OrderCardBody` 추가(청크 N/10·fuchsia 톤), 두 책(wmc·ootm) 자동 적용.
- **검증**: `tsc --noEmit` 통과, 두 책 `/warmup/[book]/order` 200, 스크린샷으로 홈 3탭·게임 시작(셔플)·오답 피드백·**정답 시퀀스→청크 클리어(실수0)** 전 과정 육안 확인.
- **다음 후보**: 순서게임 타임어택/베스트기록 노출 / 청크 길이 조절 / 읽기·암기·순서 통합 진도 대시보드 / 콘텐츠 덱 추가.

### 세션 로그 — 2026-06-30 (5차: 초기화/다시하기 UX 정제)
- 사용자 피드백("초기화·다시하기 UX 구려") → **파괴적 초기화에 확인 모달** 도입. 기존엔 확인 없이 즉시 localStorage 진도 삭제 + 메모라이즈 화면의 "암기 진도 초기화"가 회색 텍스트 링크라 조악.
- **신규 `src/components/warmup/ResetButton.tsx`**: `createPortal`(document.body) 기반 중앙 확인 모달(백드롭 블러+rose 액센트+↺ 아이콘+취소/초기화). variant `icon`(48px 정사각, 카드 푸터용)·`pill`(인게임용). Escape 닫기. **포털로 렌더해 카드 `overflow-hidden`/hover transform 클리핑 회피**.
- 적용: WarmupHome 3카드(읽기/암기/순서) 푸터의 ghost 초기화 버튼 → `ResetButton`(아이콘), MemorizePlayer 하단 텍스트링크 → `ResetButton`(pill). 모달 문구는 모드별 맞춤. OrderingGame "이 청크 다시"는 비파괴(리셔플)라 그대로.
- **검증**: `tsc --noEmit` 통과, dev 라우트 200, 스크린샷으로 카드 푸터 ↺ 아이콘·확인 모달 육안 확인. (편집 누적으로 .next errno -4094 또 발생 → node 전체 kill+.next 삭제+단일 재기동으로 정상화)

### 세션 로그 — 2026-06-30 (6차: 몸풀기 색감 강화) ✅ 완료·검증됨
- 사용자 피드백("색상 구림, 더 색 넣어 세련되게") → 몸풀기 4화면에 **모드별 컬러 아이덴티티**를 화면 전체로 확장. `globals.css`/`tailwind.config` 미수정(인라인 유틸만).
- **공통 패턴**: ① 포커스 카드 뒤 **컬러 오라**(blur-[80~90px] 그라데이션 블롭, `-z-10`, main에 `relative overflow-hidden`) ② 시트를 **그라데이션 틴트**(`from-white via-white to-{color}-50/70`) ③ 상단 액센트 라인 `h-[3px]`→`h-1.5` 진하게 ④ 칩/배지 채움+ring으로 화사하게.
- **모드 컬러**: 읽기=인디고→바이올렛→스카이 / 암기 Cloze=앰버·오렌지 / 암기 Recall=바이올렛·푸시아 / 순서=푸시아→핑크→인디고.
- 화면별: **WarmupPlayer**(인디고 오라+틴트, 섹션칩 인디고 채움, 번역영역 indigo-50 박스). **MemorizePlayer**(단계별 오라/틴트/정답박스 색, '정답 보기' 버튼 white/70로 톤 정리). **OrderingGame**(푸시아 오라, 풀 카드 **좌측 3px 푸시아 보더**+hover 푸시아, 테마칩 푸시아 채움). **WarmupHome**(모드별 히어로 오라 transition, **활성 모드탭을 모드별 그라데이션 채움**(layoutId pill에 `bg-gradient-to-r`)+흰 텍스트).
- **검증**: `tsc --noEmit` 통과. node 전체 kill→`.next` 삭제→단일 `npm run dev` 재기동 후 `/warmup`·`/warmup/wmc`·`/wmc/memorize`·`/wmc/order` 전부 **200**.
- **스크린샷 육안 재확인 완료(2026-06-30, puppeteer-core)**: 홈(읽기/암기/순서 3탭 그라데이션 채움)·읽기 리더(인디고→바이올렛 액센트+블러 번역)·암기 Cloze(앰버/오렌지 상단+점선 빈칸+앰버 틴트)·순서 게임(푸시아 상단+좌측 보더+테마칩) 6개 화면 모두 모드별 컬러 아이덴티티가 의도대로 렌더됨을 육안 확인. 6차 작업 최종 검증 종료.

---

## ⏯️ 이어가기 메모 (2026-06-30, 토큰한계로 일시중단)

**몸풀기(Warm-up) 기능은 기능적으로 완성 상태**. 로비 「📖 몸풀기」 → `/warmup` → 3모드 토글(읽기·암기·순서) → 두 책(wmc·ootm) 모두 동작. 데이터 `content/sets/cheese_books_summary.md`(책2×100문장).

- **핵심 파일**: 로더 `src/lib/warmup-loader.ts` / 진도 `src/game/{warmup,memorize,order}.ts`(각각 별도 localStorage 키) / 라우트 `src/app/warmup/page.tsx`·`[book]/page.tsx`·`[book]/memorize/page.tsx`·`[book]/order/page.tsx` / 컴포넌트 `src/components/warmup/{WarmupHome,WarmupPlayer,MemorizePlayer,OrderingGame,ResetButton}.tsx`.
- **dev 서버**: 현재 단일 인스턴스 실행 중(백그라운드). **편집 여러 번 하면 Windows에서 `.next` errno -4094 캐시잠금 잦음** → 반드시 `taskkill //F //IM node.exe`(잔존 프로세스 전부) → `rm -rf .next` → 단일 `npm run dev`. (이번 세션 3회 발생, 매번 이 방법으로 해결)
- **검증 루틴**: `npx tsc --noEmit`(통과 확인) + puppeteer-core 스크린샷(`.shot-*.mjs`를 프로젝트 루트에 임시 작성→`node`→삭제, Chrome 경로 `C:/Program Files/Google/Chrome/Application/chrome.exe`). localStorage 진도는 `page.evaluate(()=>localStorage.clear())`로 초기화 후 캡처.
- **남은 후보(미착수)**: ① 색감 스크린샷 육안 재확인 ② 순서게임 타임어택/베스트기록 노출 ③ 읽기·암기·순서 통합 진도 대시보드 ④ 콘텐츠 덱 추가 ⑤ 텍스트 입력형 Cloze.
- **임시파일 정리됨**: scratchpad PNG·.shot-*.mjs 모두 삭제. `git status`엔 신규 warmup 파일들 + cheese MD + CLAUDE.md 변경만 남아야 정상.

### 세션 로그 — 2026-06-27 (정답분포 전체 균등화)
- **문제**: 전역 정답 분포 A28.4/B31.6/C24.3/D**15.7** 쏠림. 특히 **Part 6 A48/B27/C13/D13**, `p5-gD-01~08` 전부 D=0, Part 7 레거시 다수 D=0.
- **신규 스크립트 `scripts/rebalance-all.mjs`**(기존 `rebalance-answers.mjs`는 쏠린 16세트 전용 → 이번엔 **전 176세트**): 세트별 균등 + 전역결손 우선 그리디로 보기 스왑(`choices`/`choicesKo`)·`answerIndex`·해설 마커 갱신.
  - **안전장치 3중**: ① 해설에 한글 마커 `(가)` 참조 >1개면 제외(multiref). ② 영문 `(A)`/`option B`/서수 "첫 번째 선택지" 등 위치참조 패턴 제외(RISKY 정규식). ③ 단일 괄호참조가 **현재 정답 글자와 불일치(오답 참조)면 제외**.
  - **마커 2형식 모두 처리**: 신규세트 `(가)=N` 형 + **레거시 산문형 "(가)가 정답이다"**(176문항!) — 후자는 기존 스크립트가 못 잡아 조용히 어긋날 뻔함. 단일 괄호글자를 새 정답글자로 치환.
  - **고정인지 균형(핵심)**: ineligible(고정) 답을 `fixedCounts`로 잡아 **세트 전체 합이 균등**해지도록 eligible에 목표 배정. → Part 6의 4번(문장삽입, multiref 고정) 때문에 안 풀리던 쏠림 해결.
- **결과**: 680문항 스왑·66문항 제외(multiref/risky). 전역 **A23.8/B23.6/C25.9/D26.7**. 파트별 **P6 25/25/25/25(완전균등)** · P7 26/23/25/25 · P5 21/23/27/29.
- **검증**: 독립 재파싱으로 176세트·980문항·parseErr0·id중복0·스키마0·**마커불일치0·정답텍스트손실0**. 스왑 산문해설 육안확인(정답글자↔명시정답 일치). 적용 전 `content/sets` 백업(scratchpad).
- **다음 후보**: Part 5 미세쏠림(D29%) 추가 평탄화 여지 / Part 6 EASY·HARD 보강 / 아바타 실이미지 / 대결 밸런스·연출.
