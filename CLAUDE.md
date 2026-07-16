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

### 배포 = Cloud5 (⚠️ Vercel/Netlify 아님)
- **배포 트리거는 대시보드**: https://deployme.socialbrain.co.kr/ ("Cloud5 — Dashboard")에서 **「배포」 버튼을 직접 눌러야** 배포됨. **`git push`만으로는 자동 배포 안 됨**(git push는 GitHub `JessyLimitless/perfecttoeic`에 코드 올리는 것까지). 대시보드가 최신 main을 받아 **`npm start`만 실행**한다.
- 실서버: https://perfecttoeic.cloud5.socialbrain.co.kr/ . 앞단 nginx가 빌드 중엔 모든 경로에 `perfecttoeic - Starting...` 대기 페이지를 200으로 준다(빌드 진행 신호). 빌드 완료 후 라우트 정상화.
- 절차: ① 로컬 `npm run build` 통과 확인 → ② `git push origin main` → ③ **deployme 대시보드에서 「배포」 클릭** → ④ Starting… 끝나면 `/새경로`로 배포 검증.
- `package.json`의 `start` = `next build && next start` → `.next`가 gitignore라 **서버가 런타임에 직접 빌드**(nixpacks). 그래서 빌드 의존성(typescript·tailwind·postcss·@types 등)과 **런타임 서버 패키지(예: `msedge-tts`)는 반드시 `dependencies`에** 둘 것(devDependencies면 프로덕션 설치에서 빠져 빌드 깨짐).
- `next.config.mjs`: `eslint.ignoreDuringBuilds:true`(lint로 배포 브릭 방지) + `serverComponentsExternalPackages:["msedge-tts","ws"]`(웹팩 ws 번들 오류 회피).
- **push 전 반드시 `npm run build` 로컬 통과 확인** (서버가 빌드하므로 빌드 실패=배포 실패).

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

### 세션 로그 — 2026-06-30 (7차: 몸풀기 4개 확장, 병렬 4에이전트) ✅ 완료·검증됨
- 사용자 요청("미착수 후보 전부 병렬 에이전트로") → **파일 소유권 무겹침**으로 4에이전트 동시 실행. 시작 전 몸풀기 기능을 베이스라인 2커밋으로 고정.
- **A 순서 타임어택/베스트기록**(`order.ts`·`OrderingGame.tsx`): `ChunkResult.bestTimeMs?` 선택필드 추가(마이그레이션 안전), `recordChunk(...,timeMs?)` 4번째 선택인수(기존 3인수 호출 호환). 인게임 헤더 `⏱ mm:ss` 푸시아 타이머 + 클리어화면 이번/베스트 시간·신기록 spring pill.
- **B 통합 진도 대시보드**(`WarmupHome.tsx` + 신규 `WarmupDashboard.tsx`): 전 덱 순회로 읽기(인디고)/암기(바이올렛)/순서(푸시아) 3모드 집계 + 전체 진도바. 진도 모듈은 **읽기 전용 import**만(시그니처 무변경). 덱 추가 시 자동 반영. hydration-safe(빈 진도면 null).
- **C 새 덱 Book 3 "The Present(선물)"**(`cheese_books_summary.md` append·`warmup-loader.ts` BOOK_META[3]): 슬러그 `present`, 100문장·10섹션 EN/KO 1:1(파서 검증). 홈/라우트 자동 매핑(WarmupHome·라우트 미수정). 스펜서 존슨 우화 요약(현재집중/과거학습/미래계획).
- **D 텍스트 입력형 Cloze**(`memorize.ts`·`MemorizePlayer.tsx`): 자가채점 → **인라인 `<input>` 타이핑 채점**. `normalizeAnswer`(소문자·trim·양끝구두점 제거) 추가만(기존 export 보존). 정답=auto good 진행, 오답=정답공개+again 재투입, `모르겠어요`=again. Enter 제출·Tab 빈칸이동, 2빈칸 지원. Recall 단계는 기존 자가채점 유지.
- **검증**: 4에이전트 전부 자체 `tsc` 0 + 통합 `npx tsc --noEmit` 0 에러. dev 띄워 puppeteer로 **홈 대시보드(총합 300문장에 새 덱 반영)·Book3 리더·순서 타이머·메모라이즈 입력/오답공개** 전부 육안 확인. 베이스라인 2커밋 + 4기능 커밋.
- **후속(완료)**: 순서 베스트시간 연동 ✅ — `order.ts`에 `bestChunkMs`/`formatOrderTime` 추가, 홈 `OrderCardBody`에 `⏱ 최고 m:ss` 푸시아 칩, 대시보드 순서 블록에 전 덱 최단기록 노출. tsc 0 + 스크린샷 확인.
- **다음 후보**: Recall도 타이핑·음성 검증 / 콘텐츠 덱 더 추가 / 통계 로비 노출 / 순서 청크별 베스트시간 상세 표시.

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

### 세션 로그 — 2026-07-02 (몸풀기 원어민 음원 전권 + 읽기 재생 연결) ✅ 완료·검증됨
- 직전 커밋(4ed8cf3)에서 `/tts` 스튜디오 + Book1(wmc) 원어민 음원 100문장만 있었고 **읽기 UI엔 미연결**(mp3가 정적 파일로만 존재)이라 이어서 마감.
- **Book 2·3 음원 생성**: `node scripts/tts-warmup.mjs --deck {ootm,present}` (MS Edge TTS `en-US-AriaNeural`). `public/audio/warmup/{ootm,present}/` 각 100 mp3 + `manifest.json`. 이제 3덱 전권 원어민 문장별 음원 완비. (통합본 `-full.mp3`는 아래 "오디오북" 후속에서 3권 다 생성)
- **읽기 화면 재생 연결**(`WarmupPlayer.tsx`): 문장별 **🔊 원어민 발음** 재생/일시정지 버튼 + **🔁 자동재생 토글**(문장 넘어가면 자동 재생) + 키보드 `P`. 음원 경로 `/audio/warmup/<deckId>/<NNN>.mp3`(NNN=index+1 zero-pad3). **매니페스트 게이트**: 마운트 시 `manifest.json` fetch해 `total>0`이면 hasAudio=true, 음원 없는 덱은 재생 UI 자체를 숨김(안전 폴백). `<audio preload="none">` onPlay/onPause/onEnded로 재생 상태 동기화.
- **검증**: `tsc --noEmit` 통과. dev `/warmup/wmc` 200, puppeteer로 재생버튼 렌더+`001.mp3` HEAD 200 확인, 스크린샷 육안(🔊 원어민 발음·🔁 자동재생 끔 인디고 톤). 3덱 mp3/manifest.total 정합(100/100/100).
- **후속(암기 모드 음원 연결) ✅**: `MemorizePlayer.tsx`에 정답 공개 시 **원어민 발음 자동재생**(Recall 정답공개 · Cloze 오답확인) + 정답박스 **🔊 발음 수동 재생 버튼**(Recall/Cloze 피드백박스, `SpeakButton` 헬퍼). 정답 Cloze는 800ms 자동전진이라 자동재생 생략(수동 버튼만). 동일 매니페스트 게이트, 카드 전환 시 음원 정지. `cur.no`(전역 1~100)로 mp3 매핑. tsc 통과 + puppeteer로 Cloze 오답공개 시 🔊 발음 렌더·001.mp3 200 확인.
- **후속(순서게임 음원 연결) ✅ → 몸풀기 3모드 전부 발음 지원 완료**: `OrderingGame.tsx`에 **🔊 발음 자동재생 토글**(헤더, 기본 꺼짐) — 정답으로 배치되는 순간 그 문장 발음 재생. 배치된 카드/클리어 미리보기에 **🔊 수동 재생 dot**(`SpeakDot`). **미배치 풀 카드엔 음원 없음**(난이도 유지). 여러 문장 임의 재생이라 `new Audio()` 기반 `playNo(no)` 헬퍼 사용(단일 `<audio>` 대신), 매니페스트 게이트, 언마운트 시 정지. `autoPlayRef`로 pick 콜백 의존성 안정화. tsc 통과 + puppeteer로 토글 켬·첫문장 정답배치 시 배치카드 🔊 렌더 확인.
- **후속(몸풀기 진도 로비 노출) ✅**: 로비 우측 상단에 몸풀기 통합 진도 대시보드(읽기/암기/순서) 노출. **신규 `GET /api/warmup`**(`src/app/api/warmup/route.ts`) — `loadWarmupDecks()`로 **경량 덱 요약**(id/titleKo/bookNo/total/sectionCount, 문장 내용 제외) 반환. **`WarmupDashboard` 리팩터**: props를 `WarmupDeck[]`→**`WarmupDeckSummary[]`**(id/total/sectionCount)로 축소(`d.sections.length`→`d.sectionCount`) + `className?`(로비 카드스택에선 `""`로 mt-8 상쇄). WarmupHome 호출부는 `decks.map(d=>({id,total,sectionCount:d.sections.length}))`로 갱신. 로비(`app/page.tsx`)는 `/api/warmup` fetch + 3개 localStorage 스토어(`loadWarmupProgress/loadMemorize/loadOrder`) 로드해 렌더(진도 없으면 대시보드가 스스로 null). tsc·프로덕션 `npm run build` 통과 + puppeteer로 읽기 진도 시드 후 로비에 "전체 진도" 카드(📖4/300·🧠0·🧩0) 렌더 육안 확인.
- **후속(리더 속도 토글 + 로비 대시보드 클릭) ✅**: ① `WarmupPlayer`에 **🐢 느리게(0.75x) 재생 속도 토글** — `playbackRate`로 적용, 재생 중에도 즉시 반영(리스닝 대비). ② `WarmupDashboard`에 옵셔널 `onOpen` prop — 있으면 카드 전체 클릭 가능(role=button·Enter/Space)·헤더 "📖 몸풀기 … 이어하기 →" 노출. 로비는 `onOpen={()=>router.push("/warmup")}` 전달, WarmupHome은 미전달(기존 유지). tsc·프로덕션 build 통과 + puppeteer로 속도토글(rate=0.75)·로비 이어하기 카드(읽기28/암기0/순서2·⏱최고0:41) 육안 확인.
- **후속(오디오북 전체 듣기) ✅**: 사용자가 "책 전체 목소리는 없네?" 지적 → 통합본이 **wmc-full.mp3만 있고(정적 파일·UI 미연결) ootm/present엔 아예 없던** 상태였음. ① `node scripts/tts-warmup.mjs --deck {ootm,present} --single`로 **ootm-full(3.09MB)·present-full(3.16MB) 생성** → 3권 전권 오디오북 파일 완비. ② **`WarmupHome` ReadCardBody에 「🎧 오디오북 · 전체 듣기」 접이식 푸터** 추가 — 펼치면 네이티브 `<audio controls>`(src=`/audio/warmup/<deck>/<deck>-full.mp3`). **HEAD 게이트**(파일 있는 덱만 노출)라 통합본 없는 신규 덱은 자동 숨김. tsc·프로덕션 build 통과 + puppeteer로 3카드 오디오북 버튼·펼침 시 플레이어(wmc-full 200) 육안 확인.
- **다음 후보**: 다른 목소리(성별/영국식) 옵션 / 암기·순서 모드에도 속도 토글 / 오디오북에도 배속 컨트롤 / L/C 콘텐츠.

### ⚠️ 배포 미완 메모 (2026-07-02)
- 위 모든 몸풀기 음원/UI 작업(커밋 `413e962`→`668c8da`)은 **로컬 완료·`git push origin main` 완료**(원격 HEAD `668c8da`… 이전 검증 시점 `e58a958`). **하지만 실서버(Cloud5)엔 아직 미반영**.
- 확인: push 후 deployme 대시보드 「배포」를 눌렀다는데 **실서버는 계속 구버전**(`/api/warmup` = 404, `/api/sets` = 200)이고 "Starting..." 재빌드 신호가 안 떴음 → **배포 트리거가 실제로 안 걸린 것으로 추정**. 대시보드에서 최신 커밋으로 빌드가 시작됐는지·에러 로그 확인 필요. 정상 시 `/api/warmup`가 JSON, `/audio/warmup/ootm/001.mp3`·`*-full.mp3` 200이면 검증 완료.

### 세션 로그 — 2026-07-02 (2차: 몸풀기 기초편(쉬운 문장) 추가 + 아이콘 정비)
- 사용자 제안: 치즈 3권이 관용표현·변칙 구문이 섞여 초급자에게 어려움 → **기존=기본편, 더 쉬운 100문장씩 "기초편" 신설**(초급 어휘·5~12단어 단문·능동태, 기본편과 섹션 1:1 대응). 화면은 **책별 기초/기본 토글**(사용자 확정).
- **콘텐츠**: `content/sets/cheese_books_basic.md` 신규 — Book1~3 각 10섹션×10문장 EN/KO(총 300). 독립 파서 검증(섹션10·EN100·KO100·EN/KO 정합) 3권 모두 통과.
- **로더**(`warmup-loader.ts`): 기본편+기초편 두 파일 병합. 기초편은 `-basic` 슬러그 + `level`("standard"|"basic") 필드 추가. `parseDecks(raw, level)`로 분리, `readOptional`로 파일 없으면 기본편만(점진 도입 안전). 정렬 bookNo→standard 먼저.
- **WarmupHome**: 덱을 bookNo로 그룹핑(`BookGroup`) + `LevelToggle`(기초=앰버/기본=인디고, `layoutId`는 `warmup-level-pill-${bookNo}`로 책별 고유 — 여러 책 기초편 생겨도 pill 안 튐). 기초·기본 둘 다 있는 책에만 토글 노출(지금은 Book1만). 라우팅·진도·`/api/warmup`·대시보드는 슬러그 기준이라 자동 연동. `COVER[3]` 추가.
- **TTS**(`tts-warmup.mjs`): 기초편 파일도 읽어 `<slug>-basic` 음원 생성 가능(`--deck wmc-basic`). **단, 이번엔 음원 미생성 — 텍스트만 배포**. 기초편 덱은 매니페스트/`-full.mp3` 없으면 재생·오디오북 UI 자동 숨김(안전 폴백)이라 안 깨짐.
- **아이콘 정비**: 몸풀기 네비 글리프(↺·←·prev `←`)를 SVG 라인아이콘으로 교체(신규 `icons.tsx`: RotateCcw/ArrowLeft/ChevronLeft, currentColor stroke). ResetButton·WarmupPlayer·WarmupHome·MemorizePlayer·OrderingGame 적용. CTA 인라인 화살표(`이해됐어요 →` 등)·`<Kbd>` 힌트는 의도적으로 유지.
- **검증**: `tsc --noEmit` + 프로덕션 `npm run build` 통과(전 라우트 정상). dev로 `/api/warmup`에 `wmc-basic` 노출·`/warmup/wmc-basic`(+/memorize·/order) 전부 200 확인. puppeteer 스크린샷 육안: 홈 Book1 기초/기본 토글(기초=앰버 pill 전환)·기초편 리더("Long ago, four little friends...") 정상.
- **서버 용량 점검**(EC2 `cloud5.pem`으로 `df -h` 읽기전용, 임시키 즉시 삭제): 루트 **29G 중 17G 사용·12G 여유(59%)**, 메모리 1.8G(가용 898M). `/home/ubuntu/apps/perfecttoeic`=51M, 최대 앱 dartai-backend 194M. 오디오 전체 20MB(덱당 6.5M) → 기초편 음원까지 +20MB=총40MB, **디스크 무영향**. 진짜 소비는 앱별 Docker 이미지·node_modules, 메모리가 더 빠듯. (Cloud5 대시보드 코드 로컬 위치: `C:/Users/j0708/Desktop/cloud5-mvp`, 모니터는 `server.js`가 EC2에서 `df -B1 /` 실행.)
- **다음 후보**: 기초편 원어민 음원 생성(`--deck wmc-basic|ootm-basic|present-basic`) 후 재배포 / 난이도 사용자 피드백 반영 / (장기) 오디오 S3+CloudFront 이관.

### 세션 로그 — 2026-07-02 (3차: 기초편 원어민 음원 생성 + 실서버 배포 완료) ✅ 완료·검증됨
- 2차에서 **텍스트만** 배포했던 기초편에 **원어민 음원 전권을 추가·배포 완료**. 이제 기초편도 기본편과 동일하게 읽기 🔊/🔁자동재생/🐢속도, 암기 정답발음, 순서 발음, **🎧 오디오북 전체듣기**까지 3권 전부 동작.
- **음원 생성**: `node scripts/tts-warmup.mjs --deck {wmc-basic,ootm-basic,present-basic}`(문장별 100×3) + 각 `--single`(오디오북 통합본 3). 목소리는 기본편과 동일 `en-US-AriaNeural`. 신규 ~14MB(전체 오디오 ~34MB). `public/audio/warmup/<deck>-basic/`.
- **버그 수정(`tts-warmup.mjs`)**: 여러 덱 연속 실행 시 `msedge-tts`가 소켓을 안 닫아 **node 프로세스가 종료 안 됨(첫 덱만 되고 hang)** → 파일은 다 만들어졌는데 루프가 다음 덱으로 못 넘어감. `main().then(()=>process.exit(0))`로 **완료 후 명시적 종료** 추가해 해결. (킬 당시 부분 생성된 mp3는 삭제 후 재생성.)
- **커밋·배포**: `a15b7cc`(음원 303 + 매니페스트 3 + 스크립트) → `git push origin main`. 실서버 검증: `/api/warmup` = **6덱**(wmc·wmc-basic·ootm·ootm-basic·present·present-basic)·`/audio/warmup/{deck}-basic/001.mp3`·`manifest.json`·`{deck}-basic-full.mp3` 전부 **200**.
- **⚠️ 배포 트리거 이슈(중요·반복)**: deployme 대시보드 「배포」를 눌러도 **서버에서 실제 재빌드가 안 걸림**(`build.log` 갱신 없음, `source` HEAD 그대로 — 지난 세션과 동일 증상). 이번엔 **수동으로 재배포해 반영**(절차·접속정보는 공개 저장소 노출 방지 위해 여기 미기재 — 로컬 비공개 메모리에 보관). **대시보드 배포 큐/트리거 자체가 고장 난 것으로 의심** → 추후 `cloud5-mvp`(로컬 소스 존재) 진단 필요.
- **배포 구조 확인**: Cloud5 = **Docker**(앱별 컨테이너, deploy-engine.js). 이미지 빌드는 `npm install`+코드복사만(빠름)이고, 실제 `next build`는 **컨테이너 startup(`npm start`=`next build && next start`)에 실행** → 그때 nginx "Starting..." 표시. 컨테이너 메모리 제한 256m(스왑 여유로 빌드 통과). *(기존 CLAUDE.md의 nixpacks/npm start 서술과 실제 동작은 Docker 방식.)*
- **서버 자원(EC2)**: 루트 29G 중 17G 사용·**12G 여유**, RAM 1.8G. 오디오 총 ~34MB로 디스크 무영향. 진짜 소비는 앱별 Docker 이미지·node_modules, 메모리가 더 빠듯.
- **스터디 문서**: `몸풀기_기초편_영한대조.md`(프로젝트 루트, git 포함, 커밋 `9d9c08a`) — 3권 300문장 **영한 대조**(공부용, 앱 미연동).
- **다음 후보**: 대시보드 배포 트리거 고장 진단(`cloud5-mvp`) / 기초편 난이도 사용자 피드백 반영 / 다른 목소리(성별·영국식) 옵션 / 오디오북 배속 / (장기) 오디오 S3+CloudFront 이관.

### 세션 로그 — 2026-07-02 (4차: 몸풀기 「전자책」 모드 추가 + 모바일 최적화) ✅ 완료·배포됨
- 사용자 요청: 책 원문+번역을 **한 화면에 이어서 보는 전자책(e-book) 뷰**를 몸풀기에 **메뉴화**. 전부 모바일 최적화.
- **신규 모드 「전자책」(4번째 탭)**: 기존 읽기/암기/순서에 📚전자책 추가. 라우트 `/warmup/[book]/book` → `EbookReader.tsx`(client). 기초/기본은 슬러그(deck.id)로 결정.
- **EbookReader**: 섹션(챕터)별로 문장을 **영문 + 번역(한글 보임/숨김 토글)** 이어서 렌더. 문장마다 전역번호 + **🔊 원어민 발음**(`new Audio()` 기반 `playNo`, 매니페스트 게이트), 🐢느리게(0.75x), 상단 **🎧 오디오북 전체듣기**(HEAD 게이트). 진도 추적 없음(수동 읽기).
- **모바일 최적화**: `container-narrow`·`pb-safe`·반응형 폰트, 모드 토글을 **모바일 꽉찬 균등 4탭 / 데스크탑 자동폭**(`ModeTab` flex-1 sm:flex-none). WarmupHome에 `EbookCardBody`(총문장·챕터수 + 「📚 전자책 열기」).
- **검증**: `tsc --noEmit` + 프로덕션 `npm run build` 통과(`/warmup/[book]/book` 라우트 포함). puppeteer 모바일(390px) 스크린샷 육안: 홈 4탭·전자책 카드·리더(챕터/번호/영한/문장별 🔊 100개·오디오북) 정상.
- **배포**: 커밋 `37c0528` push → EC2 수동 재배포(대시보드 트리거 여전히 불발, [[cloud5-manual-redeploy]] 절차). 실서버 `/warmup/{wmc,wmc-basic,present-basic}/book` 전부 200·쉬운문장 렌더 확인.
- **다음 후보**: 전자책 폰트크기 조절 / 챕터 목차·앵커 점프 / 읽기진도 연동(옵션) / 위 3차 후보들.

### 세션 로그 — 2026-07-02 (5차: 전자책 챕터 삽화 + 리스닝 Part 2·3·4 슬라이스) ⏸️ 리스닝은 슬라이스까지·확장 대기
- **(완료·배포됨) 전자책 챕터 SVG 삽화**: 사용자가 "각 장마다 스토리 맞춤 이미지" 요청. **Claude Code는 이미지 생성 불가** → 외부 이미지/API 없이 **코드로 그린 플랫 SVG**로 해결(무료·[[no-claude-api]] 준수).
  - 신규 `src/components/warmup/ChapterArt.tsx`: 책별 팔레트(1권 치즈 앰버/2권 미로 에메랄드/3권 선물 스카이) + **챕터 30개 제목에 맞춘 21종 모티프**(등장인물·치즈·물음표·미로·시계·선물·저울 등) 매핑. `<ChapterArt bookNo chapterIndex />`. 기초/기본 난이도는 같은 이야기라 같은 삽화(bookNo 기준).
  - `EbookReader.tsx` 챕터 헤더 위 삽화 배너 렌더. **커밋 `9274eac` → push → EC2 수동 재배포 완료**(실서버 `/warmup/wmc/book`에 `aria-label="등장인물"` 등 삽화 라이브 확인).
- **(⏸️ 진행중·커밋 안 함) 리스닝 Part 2·3·4 — 슬라이스 완성, 100개 확장 대기**: 사용자가 "리스닝 2·3·4 실전처럼 100문제" 요청. 무작정 100개 전에 **슬라이스 먼저**(사용자 미응답 시 권장안대로 진행) + **혼합 액센트**로 각 파트 1세트씩 구축·검증.
  - **동작 흐름(요청대로)**: 오디오 재생 → 객관식 선택 → 정답+해설+스크립트 공개. Part1(사진)은 이미지 필요해 제외.
  - **음성**: `msedge-tts` 무료·다중화자. `scripts/tts-listening.mjs`가 대사별 voice 키(M/W/Mgb/Wgb/Mau/Wau/Mca/Wca = 미/영/호/캐 8목소리)를 합성 후 mp3 concat. Part2=item별 클립(질문+응답3), Part3/4=set별 클립(대화/담화). 출력 `public/audio/listening/<id>.mp3` + manifest. **슬라이스 7클립 생성됨**.
  - **콘텐츠(신규, AI·데이터 비즈니스 테마)**: `content/listening/{lc-p2-01(5문항),lc-p3-01(대화3문항),lc-p4-01(담화3문항)}.md`. **RC 문제은행과 완전 분리**.
  - **신규 파일**: 타입 `src/game/listening.ts` / 로더 `src/lib/listening-loader.ts` / API `src/app/api/listening/route.ts` / 라우트 `src/app/listening/page.tsx`·`[id]/page.tsx` / UI `src/components/listening/{ListeningHome,ListeningPlayer}.tsx`(시안 톤). 로비 `app/page.tsx` CtaButtons에 「🎧 리스닝」 진입 추가(`onListening`).
  - **Part2 UX**: A/B/C 버튼 **텍스트 숨김(실전과 동일)**, 답 고른 뒤 질문·응답3개(영/한)·해설 공개+점수. **Part3/4 UX**: 문항·보기 표시→정답확인→초록/로즈 채점·문항별 해설·**스크립트(여/남 라벨+번역토글)**.
  - **검증**: `tsc --noEmit` 통과, `/api/listening`·`/listening`·`/listening/{lc-p2-01,lc-p3-01,lc-p4-01}` 200·`/listening/bogus` 404·오디오 mp3 200. puppeteer로 홈/Part2 공개/Part3 공개 육안 확인(전부 의도대로).
  - **⏭️ 다음(재개 시)**: 사용자에게 ① 이 UX로 **100개 확장 여부**(권장 분배 P2 25 / P3 39(13대화×3) / P4 36(12담화×3)=100) ② **테마 범위**(비즈니스 전반 vs AI·데이터 집중) 확인 후 진행. 확장 = 스크립트 대량 생성 + `node scripts/tts-listening.mjs`(음성 대량, 시간 소요) + 통합검증. **아직 git 커밋/배포 안 함** — git status에 리스닝 신규 파일들 + `app/page.tsx` 변경만 있어야 정상.
- **운영**: dev 서버 실행 중(백그라운드). 편집 누적 시 `.next` errno -4094 → [[toeicnet-dev-server]](node 전체 kill+rm .next+단일 재기동).

### 세션 로그 — 2026-07-02 (6차: 리스닝 Part 2·3·4 실전 100문제 확장 + 음원) ✅ 완료·검증됨
- 5차 슬라이스(각 파트 1세트)를 사용자 확정대로 **총 100문항 풀세트로 확장**. 사용자 선택: ① 100문제 풀세트 ② **비즈니스 전반** 테마 ③ **4개국 혼합 액센트**(실전 동일).
- **콘텐츠(신규 27세트 → 총 30세트·100문항)**: Part 2 `lc-p2-02~05`(각 5문항, +20) → 25 · Part 3 `lc-p3-02~13`(2인 대화 각 3문항, +36) → 39 · Part 4 `lc-p4-02~12`(1인 담화 각 3문항, +33) → 36. 테마 다양화(예산·회의·주문·출장·채용·시설·고객응대·이전·교육·제품출시·케이터링 / 담화유형: 전화메시지·매장공지·라디오광고·뉴스·견학안내·회의발췌·업무지침·교통방송·연설소개·녹음응답·웨비나). **RC 문제은행과 완전 분리**(로더도 분리).
- **정답 분포 균형화**: 초안이 D 미사용·C 편중이라 보기 스왑으로 재배치 → **Part2 A9/B8/C8**, **Part3·4 A24/B20/C19/D12**. 마커(X)=N 동기화.
- **음원**: `node scripts/tts-listening.mjs`로 신규 50 mp3 합성(P2 25 item클립 + P3 13 + P4 12 set클립, 기존 3세트 자동 건너뜀). 실패 0·중복 0, manifest 갱신. 4개국 8목소리 대사별 교차.
- **코드 변경 없음**: 플레이어(`ListeningPlayer`)·로더·API·라우트가 전부 데이터 구동형이라 신규 `.md` 자동 반영. 로비 진입(🎧 리스닝)은 5차에서 이미 연결됨.
- **신규 검증 스크립트 `scripts/validate-listening.mjs`**: JSON 파싱·스키마·id중복·voice키·answerIndex 범위·정답마커 일치·분포 리포트. **30세트·100문항·id중복0·오류0·마커100%일치**.
- **검증**: `tsc --noEmit` + 프로덕션 `npm run build` 통과. dev에서 30세트 전부 `/listening/<id>` 200·`/listening/bogus` 404·오디오 mp3 200·`/api/listening`=30세트 확인. (중간에 `.next` 워커 크래시 "Jest worker exceeding retry limit"=500 → node kill+rm .next+단일 재기동으로 정상화 [[toeicnet-dev-server]].)
- **배포**: 커밋 `87509d0` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 또 불발). 컨테이너 startup 빌드 ~170초 후 Ready. 실서버 `/api/listening`=30세트·`/listening/{lc-p2-05,lc-p3-13,lc-p4-12}` 200·`/listening/bogus` 404·오디오 mp3 200 확인. rollback `:prev` 태깅 후 교체, 임시키 삭제.
- **다음 후보**: 리스닝 홈 UX 보강(파트별 진행/점수 저장) / Part 5·6·7처럼 난이도 세트 / Part 1(사진) 도입 여부 / 리스닝 진도 로비 노출.

### 세션 로그 — 2026-07-03 (7차: LC/RC 통합 IA 재정비 + 리스닝·리딩 각 +100 보충) ✅ 완료·검증됨
- 사용자 지적: "유형별 학습(RC)과 리스닝이 왜 분리? 리딩·리스닝을 유형별로 카테고리화해야". → 원인은 **점진적 개발 부채**(RC가 원래 코어, 리스닝은 완전 분리 사일로, "유형별 학습"이 사실상 RC Part7 전용). 사용자 확정: **LC/RC 2섹션 통일 + 리스닝에도 유형 필터 추가**. 이어서 "UI 세련되게 + 리스닝 100 / 리딩 100 보충" 요청.
- **로비 IA 재정비**(`app/page.tsx` 대폭 재작성): 좌 히어로(카피+메트릭 690 RC/200 LC/6파트)만, **우측에 단일 「학습」 카드 + 도메인 토글(🎧 리스닝 / 📖 리딩)**. RC=시안→인디고 pill, LC=시안. RC는 기존 `PartSelector`+`TypeSelector`(Part7 6유형)+「리딩 학습 시작」→/game. LC는 파트(전체/2/3/4)+유형칩(의문사/일반·부가/선택/평서·요청/주제·목적/세부/추론/의도)+「리스닝 시작」→`/listening?part=&type=`. 하단 **「모드」 섹션**(AI대결·몸풀기·TTS 3카드). 시작 버튼을 카드 안으로 넣어 기존 히어로 CTA 분리 해소.
- **리스닝 유형 체계 신규**(`src/game/listeningTypes.ts`, questionTypes.ts의 리스닝판): category→표준 8유형(WH/YESNO/CHOICE/STATEMENT + MAIN/DETAIL/INFERENCE/INTENT) 정규화 + `typesInSet()`. 세트 단위 재생이라 "세트가 포함한 유형"으로 필터·뱃지.
- **리스닝 홈 필터**(`ListeningHome`): 파트 탭(전체/2/3/4) + 유형 칩(현재 파트범위 카운트) + 세트카드 유형 뱃지 + URL `?part&type` 초기필터. `listening/page.tsx`가 searchParams·`typesInSet` 전달. `ListeningCard.types` 추가.
- **콘텐츠 리스닝 +100 (100→200)**: 인라인 직접 작성 — P2 `lc-p2-06~10`(+25) · P3 `lc-p3-14~26`(+39) · P4 `lc-p4-13~24`(+36). **총 60세트·200문항**. `validate-listening.mjs`: 오류0·id중복0·마커100%, 분포 P2 A19/B17/C14·P3·4 A44/B37/C33/D36. 음원 신규 50클립(총 100클립·실패0).
- **콘텐츠 리딩 +100**: **병렬 에이전트 3개**(파일소유권 분리, 사용자 요청). P5 `p5-07~10`(4세트40문항, A11/B11/C10/D8) · P6 `p6-15~20`(6세트24문항, 6/6/6/6) · P7 `p7-g-13~19`(7세트36문항, 9/9/9/9). 신규 `validate-sets.mjs`로 전 은행 검증: 로더서빙 **93세트·690문항**(레거시 `/^\d/` 100파일 제외는 기존 `sets-loader.ts` 동작 — 파일직접검증은 193/1080), id중복0·마커일치·오류0. Part5 500·6 88·7 102.
- **검증**: `tsc --noEmit` + 프로덕션 build 통과. dev 라우트 전부 200·`/listening?part=3&type=MAIN` 필터 200·`/api/sets`에 신규 6세트 반영 확인. **puppeteer 스크린샷 육안**(로비 RC/LC·모바일·리스닝홈·필터) — LC/RC 토글·유형칩·뱃지·모드섹션 의도대로 렌더.
- **배포**: 커밋 `c9b6059` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 또 불발). 컨테이너 startup 빌드 ~190초 후 Ready. 실서버 `/api/listening`=60세트·`/api/sets`=93세트690문항(신규 p5-07/p6-15/p7-g-19 반영)·로비/리스닝/필터/`/game` 200·오디오 mp3 200 확인. rollback `:prev` 태깅 후 교체, 임시키 삭제.
- **다음 후보**: 리스닝 홈 파트별 진행/점수 저장 / 리스닝 난이도 세트(EASY/HARD) / Part 1 도입 / RC 신규 유입분 정답분포 미세조정.

### 세션 로그 — 2026-07-03 (8차: 리스닝·리딩 각 +100 추가 보충, 병렬 6에이전트) ✅ 완료·검증됨
- 사용자 요청: "실제 토익과 최대한 유사하게 리스닝 100 / 리딩 100 추가, 다 되면 push·배포". → 검증된 워크플로로 **병렬 에이전트 6개**(리스닝 P2/P3/P4 + 리딩 P5/P6/P7, 파일소유권 무겹침) 동시 실행 → 음원·검증·배포는 직접.
- **리스닝 +100 (200→300)**: P2 `lc-p2-11~15`(+25) · P3 `lc-p3-27~39`(+39) · P4 `lc-p4-25~36`(+36). 4개국 8목소리 교차, 정답마커 영문 `(A)~(D)`. `validate-listening.mjs`: **90세트·300문항·오류0·id중복0·마커100%**, 분포 P2 27/26/22 · P3·4 63/57/50/55. 음원 신규 50클립(총 **150클립**·실패0·중복0).
- **리딩 +100**: P5 `p5-11~14`(40, A10/B10/C10/D10) · P6 `p6-21~26`(24, 6/6/6/6) · P7 `p7-g-20~26`(36, 9/9/9/9). 정답마커 한글 `(가)~(라)`. `validate-sets.mjs`: 파일 210·문항1180(레거시 포함), **로더서빙 110세트·790문항**(Part5 540·6 112·7 138), id중복0·마커일치·오류0. (690→790, +100.)
- **품질**: 각 에이전트가 실전형 오답(발음/연상 함정)·유형 분산·정답위치 균등을 준수(자체 검증 후 보고). Part7 Double/TextChain 의도·화법 포함. 테마 비즈니스 전반 + AI·데이터.
- **검증**: `tsc` + 프로덕션 build 통과(중간 `.next` EPERM 잠금 → node kill+rm .next 후 재빌드). dev에서 `/api/listening`=90세트·`/api/sets`=110세트790문항·신규 세트 반영·신규 라우트/필터/오디오 200 확인.
- **배포**: 커밋 `9a704d9` push → EC2 수동 재배포([[cloud5-manual-redeploy]]). startup 빌드 ~190초. 실서버 `/api/listening`=90세트300문항·`/api/sets`=110세트790문항(신규 p5-14/p6-26/p7-g-26 반영)·신규 라우트/필터/오디오 200 확인. rollback `:prev` 태깅 후 교체, 임시키 삭제.
- **다음 후보**: 리스닝 진행/점수 저장 / 난이도 세트 / Part 1 / 콘텐츠 추가 확장.

### 세션 로그 — 2026-07-04 (9차: 레벨 진단 미니테스트 신규 + 문제풀 +70, 인라인) ✅ 완료·배포됨
- 시작 시 미커밋이던 **리스닝 Part 3/4 데스크탑 2단 레이아웃**(`ListeningPlayer.tsx`, 좌 오디오+진행 sticky/우 문항) 먼저 커밋(`3e9bf91`).
- 사용자 요청: 실전형 100문항 추가하되 **30문항=레벨 진단 메뉴 / 70문항=문제풀 확장**. 진단 구성은 사용자 확정 **LC+RC 혼합**. 병렬 에이전트 없이 **인라인**으로 진행(진단은 콘텐츠→로더→API→채점→UI 의존성 사슬이라 하나로 이어 작성).
- **신규 「레벨 진단」 기능**(30문항 고정 미니 모의고사, LC 12 + RC 18):
  - 콘텐츠 `content/diagnostic/*.md` 6세트(LC diag-lc-p2/3/4 = 6+3+3, RC diag-rc-p5/6/7 = 8+4+6). **문제풀과 완전 분리**(전용 로더/디렉터리 → `/api/sets`·`/api/listening`에 안 섞임).
  - 신규 파일: `src/game/diagnostic.ts`(평탄화+토익 환산점수 scoreDiagnostic: LC/RC 각 5~495·총 10~990, 파트별 정답률, 레벨 라벨, localStorage `toeic-diagnostic-v1`) / `src/lib/diagnostic-loader.ts` / `src/app/api/diagnostic/route.ts` / `src/app/diagnostic/page.tsx`(서버) / `src/components/diagnostic/DiagnosticRunner.tsx`(client, **프리미엄 UI**: intro→블록 스테퍼(Part2 A/B/C 오디오만·LC세트/RC세트 지문+문항)→결과(점수 카운트업·LC/RC 카드·파트별 바·취약파트 추천 CTA·문항해설 리뷰). 바이올렛→푸시아 아이덴티티).
  - 진단 오디오 8클립: `tts-listening.mjs --dir content/diagnostic`로 생성. **스크립트 확장**: `--dir` 옵션 + 파트 2/3/4만 처리 가드 + **매니페스트 병합 저장**(다른 소스 실행 시 목록 유실 방지).
  - 로비(`app/page.tsx`): 우측 상단 **진단 배너**(다크+바이올렛 글로우, 지난 점수 표시, `loadDiagnosticResult`), 취약파트 추천은 LC=`/listening?part=N`·RC=practice store 구동 후 `/game`.
- **문제풀 +70**(인라인 직접 작성): RC +40 `p5-15/16`·`p6-27/28`·`p7-g-27/28`(로더서빙 **830문항**), LC +30 `lc-p2-16~18`·`lc-p3-40/41`·`lc-p4-37~39`(**330문항**) + 신규 음원 20클립(매니페스트 총 178). 테마 비즈니스+AI·데이터.
- **검증**: `validate-listening`(98세트·330·오류0·마커100%)·`validate-sets`(오류0·마커일치)·`tsc`·프로덕션 build 통과. headless Chrome로 진단 인트로·로비 배너 육안 확인(프리미엄 톤).
- **배포**: 커밋 `a3613ce` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 여전). startup 빌드 ~190초. 실서버 `/diagnostic`·`/api/diagnostic`(lc3+rc3)·`/api/sets`=116세트830문항·`/api/listening`=98세트330문항·신규 오디오 200 확인. rollback `:prev` 태깅, 임시키 삭제, node 정리.
- **다음 후보**: 진단 결과 히스토리/추이 / 진단에 Part 1(사진) 편입 / 리스닝 진행·점수 저장 / 난이도별 진단(EASY/HARD) / 문제풀 정답분포 미세조정.

### 세션 로그 — 2026-07-04 (10차: 퍼펙토익 프리미엄 랜딩 + 문제풀 +250, 병렬 5에이전트) ✅ 완료·배포됨
- 사용자 요청: ① 서비스 UI 프리미엄화 + **「퍼펙토익」 브랜딩 랜딩 페이지** 신설, 랜딩에서 직관적으로 바로 문제 풀이 진입 + 세련된 색상·그라디언트·동적 반응형 ② 실전 최신경향 문제 **200개** 추가(이후 +50 추가로 총 250) ③ 전체 품질 점검(990 달성) ④ IT 편중 완화.
- **랜딩(신규 `/`)**: 기존 학습 로비를 `src/app/learn/page.tsx`로 이동, 새 `src/app/page.tsx` = 프리미엄 랜딩(퍼펙토익 워드마크+PerfecTOEIC, 히어로, **빠른시작 6타일**(리딩/리스닝/진단/AI대결/몸풀기/발음 → 원탭 진입), framer-motion 앰비언트 블롭·카운트업·whileInView·hover, 반응형). 내부 "홈" 네비 6곳(result·diagnostic·warmup·tts·listening) `/`→`/learn` 재연결. `layout.tsx` 메타데이터 퍼펙토익으로 갱신.
- **문제풀 +250**(RC 125 + LC 125): 1차 200개는 **병렬 에이전트가 세션한도(2:30pm 리셋)에 막혀 각 1파일만** 생성 → 나머지 인라인 직접 작성. 이후 +50은 세션 리셋 후 **병렬 5에이전트 정상 완료**. 신규 ID: RC `p5-17~21`·`p6-29~36`·`p7-g-29~36` / LC `lc-p2-19~25`·`lc-p3-42~57`·`lc-p4-40~53`. 4개국 혼합 액센트 원어민 음원(`tts-listening.mjs`, 매니페스트 총 243).
- **실전 다양성(사용자 피드백 "IT 편중 금지")**: 웹검색으로 실전 주제 분포 확인 후, LC P4·추가50 전부 비IT(여행·식당·호텔·쇼핑·부동산·병원·박물관·교통·행사)로 작성. IT 편중이던 LC P3 5세트(45·48·51·53·54)를 호텔연회·가전수리·카페개업·복사기·청소계약으로 **교체+음원 재생성**.
- **품질/정답 audit**: 정답키 모호성 1건 수정(`p6-32-q2` while/in addition to 중복정답 → 보기 교체). 신규 LC 정답위치 균등화 스크립트 2종(`rebalance-new-lc.mjs`·`rebalance-5.mjs`, 해설 단일 마커라 안전 스왑). P7 표본 육안 검증(키 정확·무결). `validate-sets`(오류0·마커일치)·`validate-listening`(오류0·마커100%) 통과, 정답분포 균등(RC 340/339/336/330 · LC P3·4 84/86/80/80).
- **검증**: `tsc`·프로덕션 build 통과. dev 클린 재기동(편집 누적으로 `.next` errno -4094 재발 → node kill+rm .next+단일 재기동 [[toeicnet-dev-server]]) 후 전 라우트 200·신규 콘텐츠/오디오 확인. puppeteer로 랜딩 데스크탑/모바일/스크롤 육안(프리미엄 그라디언트·빠른시작·WHY 카드).
- **배포**: 커밋 `bca5a5f` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 여전). startup 빌드 ~180초. 실서버 `/`(퍼펙토익 브랜딩)·`/learn`·`/api/sets`(신규 p5-21/p6-36/p7-g-36)·`/api/listening`(lc-p2-25/lc-p3-57/lc-p4-53)·신규 오디오 200 확인. rollback `:prev` 태깅, 임시키 삭제.
- **후속(완료·배포됨) — 1차 RC P6/P7 IT 편중 다양화**: IT 키워드 스캔으로 1차 배치 IT 편중 9세트(p6-29·32·34, p7-g-29·30·31·32·34·35) 식별 → 각 문항 `answerIndex`·category를 **그대로 보존**한 채 테마만 비IT로 교체(여행패키지·호텔웰니스·서점뉴스레터·식품기부·피트니스회원·케이터링채팅·요리학교·코워킹리뷰·고객서비스워크숍). 정답분포 340/339/336/330 불변, validate-sets 오류0, build 통과. 커밋 `cbdb54b` push → EC2 재배포([[cloud5-manual-redeploy]], ~180s) → 실서버 다양화 콘텐츠 라이브 확인.
- **다음 후보**: 리스닝 진행·점수 저장 / 난이도 세트 / 랜딩 카피·SEO 보강.

### 세션 로그 — 2026-07-04 (11차: 게임화 전환 — 랭크 대결 + 라이벌 "제니" 스토리) ⏸️ 로컬 완성·검증·미커밋
- **전략 전환**(사용자 확정): 메인 콘텐츠(토익 문제풀이)를 **완전 게임화** — 기존 AI 대결을 **확장판 "랭크 대결"**로 키워 *문제 풀수록 랭크(RP)가 오르는 경쟁 게임*을 서비스 엣지로. 몸풀기·리스닝·진단은 별개 보조 콘텐츠로 유지. 기획서 `퍼펙토익_게임화_기획서.md`(루트).
- **게임화 코어(신규, 동결계약 스타일)**: `src/game/progression/{types,store}.ts` — XP·레벨(곡선 `100×1.18^(n-1)`)·티어(브론즈~마스터)·**레벨업 보상 루프**(never-empty, 5레벨마다 보물상자) + 스트릭. 크레딧은 기존 `match/persist` 재사용(단일 소스). localStorage `toeic-progress-v1`.
- **스피드 스네이크(엔드리스 Part 5)**: `src/app/snake/page.tsx` + `components/snake/SnakeGame.tsx` — 콤보=뱀 성장, 하트 3, 타이머 단축, 힌트(50:50), 런 종료 시 `grantXp` 1회. XP 엔진.
- **프로필 대시보드**: `src/app/profile/page.tsx` + `components/progression/ProgressDashboard.tsx` — 티어 사다리·다음 보물상자 미리보기·스네이크 기록·인벤토리/해금.
- **랭크 래더(확장판 대결)**: `src/game/rank/{types,store}.ts` — RP 래더(티어×4디비전, 마스터 무한), `botDifficultyForRp`(랭크→EASY/MEDIUM/HARD 매핑, **동결계약 무손상**), `applyRankedOutcome`(pending 토큰으로 결과 1회 반영·중복방지), 진단 점수→배치 RP, 오프라인 리더보드 시뮬. `/rank`(RankHome/RankLadder/Leaderboard) + `RankResultOverlay`·`LevelUpOverlay`.
- **배선(동결계약 밖 확장)**: `match/page.tsx`가 `?ranked=1` 진입 시 `armRankedMatch()`로 pending 장전+랭크 난이도 자동 시작. `match/result/page.tsx`가 결과 진입 1회 `applyRankedOutcome`+`grantXp` → 랭크연출→레벨업연출. 랜딩(`app/page.tsx`) IA 재편: 히어로/플래그십 = 랭크 대결(`/rank`), 나머지 콘텐츠 타일화.
- **라이벌 캐릭터 "제니"**: `src/game/match/jenny.ts`(페르소나+**6챕터 스토리라인**=랭크 티어 매핑, 매치별 인사/승패 대사) + `components/match/JennyAvatar.tsx`(이미지 우선 `/jeny.png`·승리표정 `/jeny2.png`, 없으면 이모지 폴백 + **모션 프리셋** 호흡/승리/패배 + 오라). matchStore AI명 "AI CHALLENGER"→제니, 매치메이킹 공개·HUD·결과 대사·랭크홈 스토리 배너에 제니.
- **검증**: `tsc`+프로덕션 build 통과(20라우트). puppeteer로 랜딩(랭크 히어로)·`/rank`(골드 III·RP·티어래더·리더보드·**제니 스토리 배너**)·`/profile`·`/snake`·**랭크 대결 완주→결과 −18 RP 오버레이+제니 승리표정** 육안 확인.
- **⚠️ 초상권 경고(중요)**: 사용자가 넣은 `public/jeny.png`·`jeny2.png`는 **실존 유명인(가수) 사진**으로 보임 → 상업 서비스 공개 배포 시 **초상권·퍼블리시티권+사진 저작권 리스크**. 배포 전 **라이선스 이미지/오리지널(비실존) 캐릭터로 교체 권고**. 코드는 이미지 독립적(파일만 교체 가능)이라 폴백은 이모지. [[jenny-likeness-caution]]
- **⏸️ 미커밋·미배포**: git status에 신규 게임화 모듈들 + 매치 3파일 수정 + 기획서 + `public/jeny*.png`. **커밋/배포는 초상권 정리 후 사용자 승인 하에.**
- **다음 후보**: 매치메이킹 제니 공개 순간 캡처/연출 강화 / 제니 표정 이미지 추가(패배/도발) / 시즌 리셋·주간 리그 / 일일 미션·상점 / 오리지널 캐릭터 교체.

### 세션 로그 — 2026-07-05 (12차: 게임화 확장 4종 — 병렬 에이전트+인라인 마감) ⏸️ 로컬 완성·검증·미커밋
- 사용자 "미착수 4종 전부 병렬 에이전트로": ① 애니메이션 강화 ② 제니 스토리 심화 ③ 시즌/일일미션/상점 ④ 배포용 오리지널 캐릭터. 파일 소유권 분리로 4에이전트 실행 → **세션 한도로 중도 종료**(컴포넌트 파일은 대부분 생성됨, 배선 일부 미완). **나머지 배선을 인라인으로 마감.**
- **신규 파일(에이전트 생성)**: `components/match/JennyFx.tsx`(Confetti+JennyCutin) · `components/snake/ComboFx.tsx`(CorrectBurst/ComboPopup/ScreenFlash/SpeedLines) · `game/progression/missions.ts`+`components/progression/DailyMissions.tsx` · `game/shop.ts`+`components/shop/Shop.tsx`+`app/shop/page.tsx` · `components/match/JennyOriginalArt.tsx`(배포용 **오리지널 SVG 마스코트**, 실존인물 아님).
- **인라인 마감(내가)**: `app/missions/page.tsx` 신규(누락분) · **스네이크 FX 배선**(handleAnswer에 correct/combo/flash 트리거 + `shakeControls` 오답 흔들림, sheet를 motion.div+FX레이어化, 콘텐츠 `z-[15]`) · **결과 FX 배선**(Confetti on win + JennyCutin 승/패 표정 컷인 + **승급 시 제니 스토리 컷신** `jennyCutsceneForRp`) · RankHome에 **미션·상점 진입 버튼** 추가. jenny.ts는 앞서 컷신/도발 데이터(cutscene/jennyTaunt) 추가됨.
- **크레딧 뮤테이터**(상점용): `progression/store.ts`에 `spendCredits/addHints/addFreezes/unlockSkin` 추가(내가 사전 추가).
- **검증**: `tsc`+프로덕션 build 통과. puppeteer 육안: `/shop`(보유크레딧·힌트팩·프리즈·스킨4 구매), `/missions`(시즌 N·3일차/7일·일일 3미션 진행바/보상 — **dev 첫 컴파일 타이밍상 4초 대기 필요**, 스켈레톤 0 확인), `/rank`(미션·상점 버튼), `/snake` 인게임 FX 레이어 후 레이아웃 무결·에러0. 콤보 팝업/버스트·결과 컨페티/컷인은 순간 연출이라 정적캡처 미포착이나 배선·빌드 무결.
- **⚠️ 여전히 미커밋·미배포**: 초상권(제니 실사) 이슈 [[jenny-likeness-caution]] 정리 후 커밋/배포. `JennyOriginalArt`(오리지널 SVG)를 JennyAvatar 폴백으로 스왑하면 배포 안전.
- **다음 후보**: JennyOriginalArt를 실사 대체로 스왑(배포 안전화) / 미션 진행 실시간 반영 훅 / 주간 리그(봇) / 상점 구매 연출 강화 / 랜딩에 미션·상점 노출.

### 세션 로그 — 2026-07-05 (13차: 게임화 확장 5종 — 병렬 4에이전트 완주) ✅ 로컬 완성·검증 · ⏸️ 미커밋
- 12차 "다음 후보" 5종을 병렬 4에이전트로 완주(이번엔 세션한도 안 걸림, 각 tsc 클린):
  - **A 주간 리그(봇)**: `game/rank/league.ts`(주 단위 20인 리그·승급5/강등5 존·주간보상 claim, seed RNG로 주중 안정) + `components/rank/WeeklyLeague.tsx` + `app/league/page.tsx`. `simulateLeaderboard`/`loadRank` 재활용, 보상은 addCredits+grantXp.
  - **B 상점 구매 연출**: `components/shop/Shop.tsx` — 성공 시 코인 버스트+아이콘 팝+글로우+토스트("-{price}🪙")+크레딧 펄스+Confetti(JennyFx 재활용), 실패 시 흔들림. reduced-motion 존중. 로직 불변.
  - **C 랜딩 노출 + 제니 폴백 스왑**: `app/page.tsx`에 🎯미션(/missions)·🛒상점(/shop)·🏆리그(/league) 타일 추가(기존 보존). **`JennyAvatar` 이미지 실패 폴백을 이모지→`JennyOriginalArt`(오리지널 SVG)로 교체 → 실사 없이도 배포 안전**.
  - **D 미션 실시간+다양화**: `missions.ts`에 `bestChain` 지표 추가 + 풀 확장(정답20/30/40·랭크1/2승·스네이크1/3판·콤보6/10) 날짜 시드 로테이션(하루 3개 안정) + 올클리어 보너스. `DailyMissions.tsx` 2초 폴링+visibilitychange+신규달성 토스트/하이라이트. 스키마 하위호환.
- **인라인 마감(내가)**: RankHome에 **🎯미션·🏆리그·🛒상점 3버튼 행** 추가(리그 링크 연결).
- **검증**: 전체 `tsc`+프로덕션 build 통과. puppeteer 육안: `/league`(TOP20·승급/유지/강등 존·나 14위·주간보상), `/rank`(3버튼행), **PNG 차단 상태에서 `/rank` 제니 배너가 오리지널 SVG로 렌더**(=배포 안전 입증), 랜딩 타일. **주의**: 빌드 후 dev 재기동 시 `.next` errno -4094 재발 → node 전체 kill+rm .next+단일 재기동으로 해결([[toeicnet-dev-server]]).
- **⚠️ 미커밋·미배포 유지**. 배포 안전화 경로 확보됨: JennyAvatar가 실사(`/jeny.png`) 없으면 자동으로 오리지널 SVG 폴백 → **실사 파일만 빼고 배포하면 초상권 리스크 없이 게임화 전체 출시 가능**. [[jenny-likeness-caution]]
- **현재 게임화 전체 맵**: 랭크 대결(제니 라이벌+6챕터 스토리+컷신+컨페티) · 스피드 스네이크(콤보 FX) · XP/레벨/티어/보상(보물상자) · 프로필 · 일일 미션 · 주간 리그 · 크레딧 상점. 라우트: /rank ·/match ·/snake ·/profile ·/missions ·/league ·/shop.
- **다음 후보**: 커밋·배포(실사 제외 or 라이선스 결정) / 미션·리그 보상 밸런스 / 랭크 시즌 리셋 연동 / 상점 아이템 확장 / 튜토리얼·온보딩.

### 세션 로그 — 2026-07-05 (14차: 게임화 전체 커밋·배포) ✅ 완료·배포됨
- 11~13차의 로컬 완성·검증된 게임화 전체를 마침내 **커밋+실서버 배포**. **초상권 결정**: 사용자가 "개인 서비스용·본인 전용 URL로 나만 열람, 초상권 걱정 없음"으로 확정 → **제니 실사(`jeny.png`/`jeny2.png`) 포함 그대로 커밋·배포**(SVG 폴백 경로는 유지되나 이번엔 실사 사용). [[jenny-likeness-caution]]는 "개인용은 무관, 공개 배포 시에만 리스크"로 이해.
- **커밋 `4fd196a`**: 게임화 신규 모듈 전부(랭크/스네이크/프로필/미션/리그/상점 + 제니) + 매치 3파일 수정 + 랜딩 IA 재편 + 기획서 + 실사 2장. `tsc`+프로덕션 build(23라우트) 통과 후 커밋.
- **배포**: `git push origin main` → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거는 시도 안 하고 바로 SSH). 순서: source `git pull`(→4fd196a) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` ~2분 후 **Ready in 1141ms**. 임시키 삭제.
- **실서버 검증**: `/`·`/rank`·`/snake`·`/profile`·`/missions`·`/league`·`/shop`·`/match`·`/learn` 전부 **200**, `/rank`에 랭크 콘텐츠 서빙, `jeny.png`·`jeny2.png` **200**(실사 라이브). rollback `:prev` 확보.
- **다음 후보**: 미션·리그 보상 밸런스 / 랭크 시즌 리셋 연동 / 상점 아이템 확장 / 튜토리얼·온보딩 / (13차의 여타 후보들).

### 세션 로그 — 2026-07-05 (15차: Part6/7 순서 버그 수정 + 리스닝 랭크 대결 + UI 프리미엄 결함 수정) ✅ 완료·검증
- 사용자 4연속 요청: ① UI 프리미엄+모바일 ② 랭크 대결에 리스닝 추가 ③ LC+RC 통합 레벨업 스토리 ④ **(중대 버그)** Part 6/7 대결에서 지문 딸린 문항이 순서 안 맞고 뒤죽박죽. 사용자 확정: **별도 대결(리딩/리스닝) + 제니 단일 라이벌 확장**.
- **⭐ Part 6/7 순서 버그 수정(`match/pool.ts`)**: 원인 = `flatMap`으로 **모든 개별 문항을 flat 셔플** → 지문형(6/7) 문항 순서·그룹 깨짐. 수정 = Part 5(단문)만 개별 셔플, **Part 6/7은 지문(세트) 단위로만 셔플 + 지문 내 문항은 배열 순서 그대로 이어붙임**(MATCH_LENGTH 채우고 마지막 지문은 잘릴 수 있음). **실제 자동 플레이 검증**: P6 `p6-34 q0→q3`·`jobposting q0→q3`·`p6-28 q0→q1`, P7 `p7-g-21 q0→q4`·`p7-g-32 q0→q4` — GROUPED·ORDERED 둘 다 PASS. **연습(/game)은 원래 정상**(세트 순환+qIndex 순회), 대결만의 버그였음.
- **UI 전역 "싸구려" 결함 3종 수정**: ① **🪙 이모지가 두부(□)로 렌더** → 신규 `components/ui/CoinIcon.tsx`(금색 SVG)로 전역 교체(LevelHud·Shop·DailyMissions·ProgressDashboard·LevelUpOverlay). ② **티어/스킨 그라데이션 purge**(데이터 파일 런타임 문자열이라 JIT 미포착) → **`tailwind.config.ts` safelist**로 강제 생성 → 레벨 배지 빈칸·동일 스킨 해결. ③ Shop 스킨 아이콘 타일에 실제 스킨 그라데이션 적용. (globals.css 미수정, tailwind.config는 safelist만 추가.)
- **통합 제니 스토리(`match/jenny.ts`)**: `MATCH_DOMAINS`(rc/lc 메타·라우트·제니 도발), `synopsis`("듣기·읽기 모두 정복해야 제니를 이긴다"), `jennyGreetingForDomain`·`jennyConquestLine` 추가. 기존 6챕터·export 무손상.
- **🎧 리스닝 랭크 대결 신규(별도 엔진)**: 동결 계약(`match/types.ts`) 무손상 — RC 대결과 별개의 **경량 자체 플로우**. 신규 `game/lcmatch/build.ts`(배틀 문항 빌더=Part2 아이템/Part3·4 세트그룹+순서유지, 봇 시뮬 `planBot`, 점수 `scoreFor`) + `app/lc-match/page.tsx`(매치메이킹→카운트다운→오디오+타이머+봇→결과). **랭크/XP/오버레이/제니는 RC와 동일 재사용**(`armRankedMatch`/`applyRankedOutcome`/`grantXp`/RankResultOverlay/LevelUpOverlay/JennyCutin/Confetti). `RankHome`에 리딩/리스닝 **도메인 토글**(Part 5·6·7 ↔ 2·3·4, CTA·서브카피 분기). **엔드투엔드 검증**: /lc-match?ranked=1&part=3 완주 → 결과 LOSE·정답2/10·**−18 RP 오버레이**·제니 반응.
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 0(신규 `/lc-match` 포함 전 라우트). puppeteer로 rank 도메인 토글·리스닝 인게임/결과·코인/배지 수정 육안 확인. (중간 `.next` UNKNOWN 캐시손상 1회 → node kill+rm .next+재기동 [[toeicnet-dev-server]].)
- **배포**: 커밋 `4be1857` push → EC2 수동 재배포([[cloud5-manual-redeploy]], ~2분) → 실서버 `/`·`/rank`·`/lc-match`·`/match`·`/shop`·`/missions` 전부 200, `/api/listening` 라이브 확인. rollback `:prev` 태깅, 임시키 삭제.
- **후속(제니 랜딩 전면 노출) ✅ 배포됨**: 사용자 "제니 이미지를 메인 전면에 크게(5배)". 랜딩 플래그십 우측(기존 데스크탑 전용 티어 목업)을 **대형 제니 포트레이트(≈340px·모든 화면 노출·모바일 최상단)**로 교체 — 이름표(👑 라이벌 제니)+소개+"챔피언 MASTER" 칩+글로우/회전링, 실사 실패 시 `JennyOriginalArt` SVG 폴백. 커밋 `e75e605` push → EC2 재배포(Ready 1200ms) → 실서버 랜딩에 "라이벌 제니"·`jeny.png` 200 확인.
- **후속(리스닝 음원 전수 점검) ✅**: 사용자 "음원 생성 보강" 요청 → 전수 검사 결과 **결손 0**(콘텐츠 235 + 진단 8 = 243 클립 전부 존재·HEAD 200·손상 0). 생성할 게 없어 상태만 보고. (지난 세션 404는 헤드리스 무관 요청이었음.)
- **후속(배경음악 기능) ✅ 배포됨**: 사용자가 루트에 넣은 두 영상(제니 `Like Jennie`·록키 `Gonna Fly Now`, mp4)을 **ffmpeg로 오디오만 추출**(`public/music/{jennie,rocky}.mp3` 각 ~3MB, 128k). 원본 mp4(68MB)는 `.gitignore /*.mp4`로 제외. 신규 `components/ui/BackgroundMusic.tsx`(전역, `layout.tsx`에 마운트 → 라우트 전환에도 유지): **제니 곡 기본 자동재생**(차단 시 첫 제스처에 시작)·**록키 전환 토글**·on/off·localStorage(`toeic-bgm`) 저장·loop·볼륨0.32·좌하단 플로팅 컨트롤(이퀄라이저). **리스닝/몸풀기/진단/발음/리스닝대결 경로에선 자동 음소거**(TTS 충돌 방지, `MUTE_PREFIXES`). 검증: 랜딩 자동재생·록키 전환(src 변경)·/listening 자동정지 확인. 커밋·배포 예정.
- **다음 후보**: 배경음악 볼륨 슬라이더 / 대결 승리 시 음악 연출 / 리스닝 대결 매치메이킹·HUD 연출 강화 / 프리미엄 폴리시 추가 라운드.

### 세션 로그 — 2026-07-05 (16차: 제니 브랜드화 + 가짜 시뮬 제거 + 음악 배너 제어 + 모바일) ✅ 완료·배포됨
- 사용자 방향 확정: **"나 vs 제니, 마스터까지 가는 모험" 스토리라인** 중심. 제니 이미지·음악은 **개인용이라 그대로 사용 OK**(초상권 무관, 나를 위한 서비스).
- **BGM을 context provider로 리팩터**(`components/ui/BgmProvider.tsx`, 기존 BackgroundMusic 삭제): 랜딩 제니 히어로 ↔ 플로팅 컨트롤이 **같은 음악 상태 공유**. `layout.tsx`에서 `<BgmProvider>{children}</BgmProvider>`. **명확한 재생/정지 버튼** + **배너 × 닫기(작은 아이콘으로 접힘·localStorage 저장·음악은 계속)**.
- **제니 브랜드 히어로 최상단 이동**(`app/page.tsx` `JennyBrandHero`): 대형 제니 이미지 + 통합 음악 컨트롤(재생/정지·재생 중 이퀄라이저)을 랜딩 히어로 맨 위로. 플래그십 우측은 가짜 리더보드 목업 → **`RoadToMaster`(브론즈→마스터 여정, 제니=정상 챔피언, 가상 랭커 없음)**로 교체.
- **가짜 시뮬레이션 전면 제거**(사용자: "나와 제니 대결이라 지어낸 랭커·점수는 무의미"): 삭제 = `app/league/`·`components/rank/{WeeklyLeague,Leaderboard}.tsx`·`game/rank/league.ts`. RankHome에서 `<Leaderboard>`·`simulateLeaderboard` 제거, 3버튼행→미션·상점 2버튼(리그 제거). 랜딩 주간리그 타일 제거. 나 vs 제니 전적(승/패/승률/연승)은 랭크홈에 유지(그건 의미 있음). progression 티어보상 "리그 입장권"→"제니 특별전 해금"으로 리라벨.
- **스토리 리프레이밍**: 히어로 배지 "나 vs 제니 · 마스터까지 가는 토익 모험", 서브카피·플래그십 카피를 제니 도전 서사로. **`.매일` 붙는 오타 등 모바일 텍스트 정리**(문장 자연 줄바꿈·`px-2`).
- **동영상 아님 확인**: 배경음악은 ffmpeg로 **오디오만 추출한 mp3**(제니 2.8MB·록키 2.6MB, 128k). 원본 mp4 68MB는 `.gitignore /*.mp4`로 git·서버 제외(추적 0).
- **검증**: `tsc` 0(삭제 라우트 스테일 `.next` 타입 제외) + 프로덕션 build 0(`/league` 사라짐 확인). 프로덕션 서버(3011)로 모바일 스크린샷 육안: 랜딩 최상단 제니+음악·서브카피 3줄 정돈, 랭크홈(리더보드 제거·티어래더), 플래그십 제니 카피, **× 닫기→접힘(음악 지속)** 전부 확인. (dev `.next` -4094 파일락 지속 → 검증은 프로덕션 빌드로.)
- **⚠️ 유료화 관점 조언(사용자 질문)**: 브랜딩·UX는 유료급이나 상용화 관문 = ① 저작권(캐릭터·음악·문항, 단 현재는 개인용이라 무관) ② 백엔드·계정·결제(진도·랭크가 localStorage뿐) ③ 진짜 성적 데이터. TTS 상업 라이선스도 확인 필요.
- **다음 후보**: 배경음악 볼륨 슬라이더 / 승리 시 음악 연출 / (유료화 시)백엔드·계정 / 리스닝 대결 연출 강화.

### 세션 로그 — 2026-07-07 (17차: RC 문제풀 대량 확장 +350 + 배경음악 「플레이리스트」) ✅ 완료·배포됨
- **배경음악 3번째 트랙 「플레이리스트」 추가**: 사용자가 루트에 넣은 `Playlist.mp4`(29분)를 ffmpeg로 **오디오만 추출** → `public/music/playlist.mp3`(128k, 27MB). `BgmProvider.tsx` `TRACKS`에 `🎶 플레이리스트`(violet/indigo) 추가 — 좌하단 플로팅 컨트롤 팝오버·랜딩 히어로 컨트롤에 자동 노출(둘 다 `TRACKS`/`bgm.track` 구동이라 하드코딩 없음). **버그 수정**: localStorage 로드가 `rocky`/`jennie`만 인식해 새 트랙 저장 후 리셋되던 것 → `TRACKS`에 존재하는 id면 모두 복원. 원본 mp4는 `.gitignore /*.mp4`로 커밋 제외.
- **1차 배치(커밋 `ed4ecd9`): 실전형 RC +150 → 배치1(46, 이전 세션)+`p7-g-37`(4)+150 = 목표 200 달성.**
  - Part 5 +50: `p5-25~29`(시제·수일치 / 전치사·접속사 / 관계사·명사절 / 준동사 / 어휘·태·비교·가정법 — 유형별 테마).
  - Part 6 +24: `p6-41~46`(이메일·메모·공지·기사·편지·안내문, 4빈칸+문장삽입).
  - Part 7 +76: `p7-g-37~54` — 단일(문자대화·광고·공지·온라인챗·기사·편지·이메일·후기·메모·청구서·보도자료·안내·설문) + **이중**(장소예약·강좌·채용) + **삼중**(출장). 6유형 골고루, `[Passage N — Type]` 구분선 포맷.
- **2차 배치(커밋 `ed4ecd9` 이후): Part 5 +200 → `p5-30~49`(20세트).** 사용자 요청("Part 5가 문항당 토큰 작으니 200개"). **실전 ETS처럼 한 세트에 어형·시제·수일치·태·전치사·접속사·대명사/관계사·준동사·어휘·비교를 고루 섞은 혼합형** + 가정법·도치·병치·관계부사·사역/지각동사·복합관계사 등 포함. 비즈니스 소재 다양화(재무·인사·물류·마케팅·유통·여행·제조·부동산 등).
- **품질 보증**: 정답위치를 세트별로 의도 배치 → **신규 200문항 정답분포 A50/B50/C50/D50 완전 균등**. 모든 해설에 `(가~라)=N` 마커. `validate-sets.mjs` **오류 0·마커 100%·id중복 0**(전체 293세트·1745문항, 로더 Part5 890). `tsc`+프로덕션 build 통과.
- **배포**: 1차는 커밋 `ed4ecd9` push→EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 건너뛰고 SSH) → 실서버 `/api/sets`=173세트·신규 id 반영·`/music/playlist.mp3` 200 확인. 2차(Part5 +200)는 이 로그와 함께 커밋·push·재배포 예정.
- **다음 후보**: Part 6·7도 유사 대량 확장 / 리스닝 대량 확장 / 배경음악 볼륨 슬라이더 / 신규 문항 난이도(EASY/HARD) 세트.

### 세션 로그 — 2026-07-07 (18차: 실전형 200문제 리딩·리스닝 균등 추가 + 원어민 음원) ✅ 완료·배포됨
- 사용자 요청: "웹검색+추론으로 최신 토익 유사 문제 200개, 리스닝·리딩 고루, 이것만 풀면 만점". 웹검색으로 최신 파트별 출제 스펙 확인 후 **인라인 직접 작성**(병렬 에이전트 미사용 — 사용자 미요청). 실전 토익 비율대로 **리딩 100 + 리스닝 100** 분배.
- **리딩 +100(`content/sets/`)**: Part 5 `p5-50~54`(50, 어형·시제·수일치·태·전치사·접속사·대명사/관계사·준동사·비교·어휘 혼합형) · Part 6 `p6-47~52`(24, 이메일·공지·메모·기사·편지·광고 + 각 세트 문장삽입 1문항) · Part 7 `p7-g-55~60`(26, 이메일·기사·문자대화·온라인챗 단일 + **이중지문 2세트**(교차참조·계산)). 6유형(주제·세부·추론·동의어·**사실확인**·**의도·화법**) 골고루.
- **리스닝 +100(`content/listening/`)**: Part 2 `lc-p2-26~30`(25) · Part 3 `lc-p3-58~70`(39) · Part 4 `lc-p4-54~65`(36). 4개국 8목소리 혼합 액센트, 비즈니스 전반 테마(호텔·물류·채용·부동산·박물관·교통·웨비나 등, IT 편중 회피), 의도파악·추론 포함. **신규 음원 50클립**(`tts-listening.mjs`, 0바이트 0).
- **품질/검증**: 정답키 A/B/C/D 균등 배분, 모든 해설 `(가~라)=N`/`(X)=N` 마커. `validate-sets`(오류 0) · `validate-listening`(165세트/555문항, 오류 0) · `tsc --noEmit` · 프로덕션 `npm run build` 전부 통과. 작성 중 p5-52 D=0 쏠림 발견 → 보기 순서 교정.
- **배포**: 커밋 `74d0a5f` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 트리거 건너뛰고 SSH). `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` → **Ready in 1251ms**. 실서버 `/api/sets`(신규 p5-54·p7-g-60)·`/api/listening`(신규 lc-p3-70·lc-p4-65)·라우트/오디오(`lc-p4-65.mp3`·`lc-p2-26-q1.mp3`) 전부 200 확인. 임시 키 삭제.
- **다음 후보**: 리스닝 진행·점수 저장 / 난이도(EASY/HARD) 세트 / Part 6·7 추가 확장 / 정답분포 미세조정.

### 세션 로그 — 2026-07-08 (19차: 끊긴 HARD 보강 이어받기 + 약점 보완 고퀄 100문항, 병렬 3에이전트) ✅ 완료·배포됨
- **맥락**: 직전에 토큰 한계로 중단된 **"HARD 보강 WIP"** 커밋들(`3c38260`→`0e27722`: p5-hard-03~06·p6-hard-03,04·p7-hard-02~06·LC 함정 lc-p2-39~41/lc-p3-78,79/lc-p4-73~75)이 GitHub엔 푸시됐으나 **세션 로그 미기록·실서버 미배포** 상태였음. 이어받아 콘텐츠 더 보강 후 배포하기로 확정.
- **사용자 지시(순차)**: ① "콘텐츠 더 보강 후 배포"(AskUserQuestion) → ② "약점 보완 고퀄 토익 100문항 보충" → ③ "병렬 에이전트로" → ④ "다 되면 git push·배포". 약점 진단: 신규 HARD 파트별 얇기 순 **Part 6(16) ≪ Part 7(27) < LC(30) < Part 5(60)** → 약점 집중 배분.
- **신규 +100문항 (RC 70 + LC 30)**:
  - **Part 6 HARD +32** (`p6-hard-05~12`, 8세트, 인라인 직접 작성): 이메일·공지·메모·기사·편지·광고·안내문, 각 세트 문장삽입 1문항. 시제·태·관계사·준동사·수일치·접속부사·전치사·어휘 분산. **정답분포 A/B/C/D 각 8 완전균등.** (작성 중 p6-hard-07 B쏠림·p6-hard-11 문장삽입 위치/answerIndex 불일치 self-감사로 잡아 교정.)
  - **Part 7 HARD +28** (`p7-hard-07~12`, 6세트, **에이전트 A**): 단일 3(Article·Online Chat·Notice) + 이중 2(Email+Schedule·Ad+Review) + 삼중 1, 6유형 골고루·교차참조 포함. 비IT 테마(물류·이벤트·부동산·교육·호텔·제조).
  - **Part 5 HARD +10** (`p5-hard-07`, **에이전트 B**): 가정법(도치)·부정부사 도치·복합관계사·병치·분사구문·근접수일치·양보 However·유사어휘 고난도 혼합.
  - **LC HARD +30** (`lc-p2-42~44`·`lc-p3-80,81`·`lc-p4-76~78`, **에이전트 C**, 콘텐츠만): 간접응답·부정/부가의문문·반복어휘/유사발음 함정·추론·의도파악. 4개국 8목소리 교차, 비IT 테마.
- **병렬 3에이전트**(파일 소유권 무겹침: content/sets/p7-hard-*·p5-hard-07·content/listening/lc-*) 동시 실행 → 각자 자체 validate 통과 후 보고. **음원·검증·빌드·배포는 직접**(직렬 의존).
- **음원**: `node scripts/tts-listening.mjs`(기본 실행=기존 mp3 자동 건너뜀) → 신규 **20클립**(Part2 15 item + Part3/4 5 set) 생성, 매니페스트 병합.
- **검증**: `validate-sets` **348세트·2054문항**(Part5 1020·6 272·7 762) · `validate-listening` **203세트·697문항** — 오류 0·마커 100%·id중복 0. `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과.
- **배포**: 커밋 `31ad39d` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→31ad39d, 앞선 WIP 커밋들도 함께 실서버 최초 반영) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` **~230초** 후 Ready. 실서버 신규 세트(p6-hard-12·p7-hard-12·p5-hard-07·lc-p2-44·lc-p3-81·lc-p4-78)·신규 음원(`lc-p2-44-q1.mp3`·`lc-p3-81.mp3`·`lc-p4-78.mp3`) 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: LC HARD 추가(현재도 상대적으로 얇음) / Part 6 HARD 계속 확장 / 리스닝 진행·점수 저장 / EASY 난이도 세트 보강 / 정답분포 미세조정.

### 세션 로그 — 2026-07-08 (20차: 19차 "다음 후보" 3종 병렬 소화 — LC HARD·Part6 HARD·EASY +114) ✅ 완료·배포됨
- 사용자 요청: "중단됐던 작업 이어서" → git 클린(19차 배포 완료)이라 미커밋 잔여는 없었고, **19차 "다음 후보"를 이어감**. 사용자 "모든 작업을 병렬 에이전트로" → 콘텐츠 후보 3종을 파일 소유권 무겹침으로 **병렬 3에이전트** 실행, 음원·검증·빌드·배포는 직접(직렬).
- **신규 +114문항 (RC 84 + LC 30)**:
  - **에이전트 A · LC HARD +30** (`lc-p2-45~47`·`lc-p3-82,83`·`lc-p4-79~81`, 8세트): 간접응답·부정/부가·선택의문문·유사발음(keys/keynote 등)·반복어휘·의도 함정. 4개국 8목소리 교차, 비IT(호텔·리테일·교통·케이터링·박물관·부동산·병원·물류). 분포 P2 5/5/5·P3·4 4/4/4/3.
  - **에이전트 B · Part 6 HARD +32** (`p6-hard-13~20`, 8세트): 빈칸4+세트당 문장삽입1(위치·answerIndex 검증), 시제·태·관계사·준동사·수일치·접속부사·전치사·어휘 분산. **정답분포 A8/B8/C8/D8 완전균등**. 비IT 테마.
  - **에이전트 C · EASY +52** (`p5-easy-02~04`(30)·`p6-easy-02~04`(12)·`p7-easy-02,03`(10)): 초급 5~12단어 능동태 단문·상용어휘, 일상 비즈니스. 분포 A13/B14/C13/D12.
- **음원**: `node scripts/tts-listening.mjs`(기존 자동 건너뜀) → 신규 **20클립**(P2 15 item + P3/4 5 set), 0바이트 0, 매니페스트 총 407.
- **검증**: `validate-sets` **364세트·2138문항**(Part5 1050·6 316·7 772, 분포 540/552/536/510) · `validate-listening` **211세트·727문항**(P2 86/84/65·P3·4 124/131/118/119) — 오류 0·마커 100%·id중복 0. `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과.
- **배포**: 커밋 `caa0471` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→caa0471) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` **~210초** 후 Ready. 실서버 신규 세트(`p6-hard-20`·`p5-easy-04`·`p7-easy-03`·`lc-p4-81`)·라우트(`/listening/lc-p2-47`·`/game`)·신규 음원(`lc-p2-45-q1.mp3`·`lc-p3-82.mp3`·`lc-p4-81.mp3`) 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 리스닝 진행·점수 저장(코드 기능) / Part 5·7 HARD 추가 / EASY 리스닝 세트 / 정답분포 미세조정(Part7 D=510으로 상대적 얇음).

### 세션 로그 — 2026-07-08 (21차: 라이벌 캐릭터 「빌류킹」 리브랜딩 + 파트별 정복 모니터링 대시보드) ✅ 완료·배포됨
- 사용자 요청: ① 대결 상대 캐릭터 이미지를 넣고(루트에 `JP.png` 투입) 제니 자리에 그 이미지를 연결 ② **캐릭터 ID를 "제니"→"빌류킹"으로 변경** ③ 인공지능 대결의 긴박감에 더해, **각 파트별 현재 레벨(성공률)을 모니터링** + "각 파트를 모두 풀어 다 맞히는 기록으로 만점에 달려가는 스토리라인" 신설.
- **캐릭터 리브랜딩(제니 → 빌류킹)**: `public/jp.png` 추가 → `JENNY.images`(idle/win/lose)를 `/jp.png`로(이미지 1장이라 표정 3종 공용, 로드 실패 시 `JennyOriginalArt` SVG 폴백 유지). 화면 노출 "제니" 전부 "빌류킹"으로 교체(랜딩 히어로·RoadToMaster·랭크홈·매치메이킹·대결 HUD·결과 컷신·BGM `by` 라벨), **한글 조사까지 교정**(빌류킹을/이/은/과). **코드 심볼·파일명(`jenny.ts`·`JENNY`·`JennyAvatar`)·주석은 유지**(리스크 회피, 비노출). `JENNY.name="빌류킹"`·`en="BILLYUKING"`. 루트 원본 `JP.png`는 커밋 제외(`public/jp.png`만 커밋).
- **파트별 정복(Mastery) 모니터링 신규**(사용자 확정: **정복도+정답률 둘 다 · 6파트 전부**):
  - **`src/game/mastery.ts`**(신규): 6파트(LC 2·3·4 + RC 5·6·7)별 `masteredIds`(한 번이라도 맞힌 **고유** 문항 = 정복도 분자) + `solved`/`correct`(정답률) localStorage `toeic-mastery-v1`. `recordAnswers()`·`buildMasteryView(state, totals)`(파트별 정복도%/정답률%/conquered + 전체 정복도·만점까지 남은 문항).
  - **`GET /api/part-totals`**(신규): 정복도 **분모** = 파트별 총 문항 수(`loadAllSets`+`loadListeningSets` 집계). 실서버 응답 `{2:235,3:249,4:243,5:1050,6:316,7:382}`(총 2,475).
  - **기록 훅**: RC 연습 `store.ts end()`(세션 history 배치) · LC 리스닝 `ListeningPlayer`(Part2=답 고른 순간/Part3·4=제출 시). **매치·스네이크 속도전은 미반영**(차분히 푸는 흐름에만 기록 — 후속 여지).
  - **`MasteryBoard.tsx`**(신규, 랜딩 랭크 플래그십 아래 배치): 전체 정복도 도넛 링 + 파트별 진행바(LC 시안/RC 바이올렛, 100%=앰버+👑)·정답률·`N/총계` + 요약칩(정복 문항/정복 파트/만점까지). 하이드레이션 안전(마운트 후 fetch+localStorage). "6파트 전부 다 맞혀 빌류킹 넘어 만점 정복" 카피.
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 0(`/api/part-totals` 라우트 생성 확인). 중간 dev `.next` UNKNOWN 캐시손상 → node kill+rm .next+프로덕션 빌드로 우회([[toeicnet-dev-server]]). puppeteer로 정복 시드 데이터 렌더 육안: 전체 33%(806/2,475)·Part6 100%👑·만점까지 1,669문항·계산 정확.
- **배포**: 커밋 `73eefd1` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→73eefd1) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` **~180초** 후 Ready. 실서버 `/`·`/rank`·`/listening`·`/game`·`/jp.png`·`/api/part-totals`(실 totals) 전부 **200**, 랜딩 "빌류킹" 노출·"제니" 잔존 **0** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 정복도에 매치·스네이크(속도전) 반영 옵션 / 파트별 정복 상세 페이지 / 리스닝 진행·점수 저장 / 빌류킹 표정 이미지 추가.

### 세션 로그 — 2026-07-08 (22차: 게임화를 단일 「정복(Conquest)」 축으로 통합 + 정복 판정 강화) ✅ 완료·배포됨
- **맥락**: 21차 이후 토큰 한계로 중단된 대규모 리팩터가 미커밋 상태로 남아 있었음(게임화 모듈 대량 삭제 + `conquest.ts` 신설). 이어받아 완결·검증·배포.
- **① 게임화 → 단일 정복 축 통합**(커밋 `3c486c6`): RP/XP·스네이크·상점·일일미션·랭크 래더/리더보드/리그를 전부 제거하고 **정복도(고유 정답 문항 비율) → 6단계 정복 등급(루키→그랜드마스터)** 단일 진행축(`src/game/conquest.ts`)으로 통합. 빌류킹 봇 난이도는 정복 문항수 비례(`botDifficultyFromMastered`), 대결 pending 토큰으로 등급업 1회 감지(`armConquest`/`takePendingConquest`).
  - 삭제: `game/{progression,rank,shop}` 모듈 + `/profile·/shop·/snake·/missions` 라우트 + 관련 컴포넌트(DailyMissions·LevelHud·LevelUpOverlay·ProgressDashboard·RankLadder·RankResultOverlay·ComboFx·SnakeGame). match/lc-match/result·Matchmaking·RankHome을 conquest로 배선, jenny 반응·컷신을 RP→정복 등급 기반(`jennyReactionForGrade`/`jennyCutsceneForGrade`).
  - 랜딩(`app/page.tsx`) 카피를 정복 모델로 정리(RP·티어·XP 레벨업·스피드 스네이크 문구 제거 → 정복도·정복 등급). 매치 고유 크레딧·"전 문항 정답" 미션(동결계약 `match/types.ts`)은 원래 메커닉이라 유지. 루트 `JP.png`는 `.gitignore`(공개배포 방지, `public/jp.png`만 커밋).
- **② 정복 판정 강화**(커밋 `3801e46`, 사용자 목적 "틀린 횟수를 줄여 만점 정복, 마라톤처럼"에 맞춤): **한 문항을 연속 2회 맞혀야(MASTER_STREAK=2) 정복 확정**.
  - `mastery.ts`: `masteredIds[]` → 문항별 `streaks{}` 재설계. 차분한 모드(연습·리스닝)=정답 +1·오답 시 streak 0(정복 **해제**, 다시 풀어야 함)+정답률 기록. **대결 속도전(coverageOnly)=정답만 +1, 오답 미차감**(시간압박 실수로 정복 안 날아감)·정답률 미집계. 추측 1회로는 절대 정복 안 됨. 구버전 `masteredIds[]`는 정복 완료로 안전 마이그레이션. `buildMasteryView`에 **pending(복습 대기=봤지만 미정복)** 추가.
  - `store.ts`: `practiceConquest(part)` — 이 파트 **미정복 문항만 반복 드릴**(전부 정복 시 전체 복습 폴백)+`conquest` 플래그. `RankHome`·`MasteryBoard`에 "복습 N" 표시 + RC 정복 복습 진입 CTA + 전체 "복습 대기" 요약칩. `PracticeHeader`에 "🎯 정복 복습" 배지.
- **검증**: mastery 순수 로직 **단위테스트 14/14**(연속 2회=정복·오답 해제·대결 오답 미차감·마이그레이션·pending 계산) + `tsc`·프로덕션 build 통과 + puppeteer로 랜딩/`/rank`(복습 N·정답률·드릴 CTA)/`/game`(정복 복습 배지+미정복 문항) 실제 플레이 육안 확인.
- **배포**: `3c486c6`·`3801e46` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→3801e46) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` **~200초** 후 Ready in 1273ms. 실서버 `/`·`/rank`·`/game`·`/api/part-totals`(totals 2·235/3·249/4·243/5·1050/6·316/7·382=2,475)·`/learn`·`/listening` 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제. ※ startup 빌드 ~3분은 Cloud5 정상 소요(매 배포 동일) — 지연 아님.
- **다음 후보**: 파트별 정복 상세 페이지 / 오답 우선 재출제(현재 미정복 균등) / 리스닝 정복 복습(현재 세트 단위) / 리스닝 진행·점수 저장.

### 세션 로그 — 2026-07-08 (23차: 독해 오답노트 지문 전체 번역 + 정복 드릴 오답 우선) ✅ 완료·배포됨
- 사용자 지적: **리딩 Part 6·7 오답노트에 지문이 없어** 문제만 덩그러니 보임(맥락 없어 "해설이 없다"고 느껴짐) → **전체 지문을 번역해 달라**. + 계획했던 후보도 함께 추진·배포.
- **오답노트 지문 전체 번역**(`ReviewReport.tsx` + `store.ts`): `PracticeRecord`에 `passageLines`(풀이 시점 세트 지문) 저장 → 오답노트 각 Part 6·7 항목에 **「📖 지문 전체 · 번역」 접이식 패널**(지문 전문 영문+한글 한 줄씩, 이중지문 `[Passage N]` 구분). 해설 라벨 명시 + 해설 빈 경우 블록 숨김. (Part 5는 지문 없어 미노출.) 대결 결과 REVIEW는 별도 `MatchRecord`(동결계약)라 이번 범위 밖 — 후속 여지.
- **정복 드릴 오답 우선 재출제**(`store.ts` `practiceConquest`): 미정복 문항 중 **pending(봤지만 미정복=오답 포함) 문항이 든 세트를 앞으로**(`priorityFill`, 그룹 내 셔플 유지·이후 전체 순환) → 틀린 것부터 다시 풀어 복습 대기를 빠르게 0으로. (지문형 세트 그룹 순서 보존.)
- **검증**: `tsc`·프로덕션 build 통과. puppeteer로 **Part 7 정복 드릴→오답 5개→/result 오답노트에 지문 전체 EN+한글 번역·해설** 실제 플레이 육안 확인(이중지문 포함).
- **배포**: 커밋 `2273387` push → EC2 수동 재배포([[cloud5-manual-redeploy]]) → startup `next build` ~220초 후 Ready in 1196ms. 실서버 `/`·`/rank`·`/game`·`/result`·`/learn` 전부 200. rollback `:prev` 확보, 임시 키 삭제. (startup 빌드 ~3분은 Cloud5 정상 소요 — 매 배포 동일, 지연/오류 아님.)
- **다음 후보**: 대결 결과 REVIEW에도 지문 번역(MatchRecord 확장) / 파트별 정복 상세 페이지 / 리스닝 정복 복습·진행 저장.

### 세션 로그 — 2026-07-08 (24차: 대결 결과 REVIEW에도 지문 전체 번역) ✅ 완료·배포됨
- 23차의 지문 번역을 **대결 결과 「틀린문제 REVIEW」에도** 확장(사용자 "이어가자").
- **공용 컴포넌트화**: 인라인이던 지문 번역 패널을 `components/result/PassageTranslation.tsx`로 추출(`tone` prop: indigo=연습 / teal=대결). `ReviewReport`는 이를 import.
- **대결 데이터 배선**: `MatchRecord`에 `passageLines?`(옵셔널·동결계약 비파괴) 추가 + `matchStore` 두 기록 지점(정답·시간초과)에서 `item.passageLines` 채움. `match/result` 틀린문제 REVIEW에 Part 6·7 「📖 지문 전체 · 번역」 패널 + 해설 라벨.
- **검증**: `tsc`·프로덕션 build 통과. puppeteer로 **랭크 RC 대결 완주(10문항 자동응답)→결과 REVIEW에서 지문 전체 EN+한글 번역 7개(이중지문 포함)·해설** 실제 플레이 육안 확인.
- **배포**: 커밋 `c3a9f97` push → EC2 수동 재배포([[cloud5-manual-redeploy]]) → startup 빌드 ~200초 후 Ready in 1217ms. 실서버 `/`·`/rank`·`/match`·`/match/result`·`/result`·`/game` 전부 200. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 파트별 정복 상세 페이지 / 리스닝 정복 복습·진행 저장 / 리스닝 결과에도 스크립트 번역 강화.

### 세션 로그 — 2026-07-08 (25차: 파트별 정복 상세 페이지 /conquest/[part]) ✅ 완료·배포됨
- 24차 후보 "파트별 정복 상세 페이지" 구현(사용자 "yes"). 마라톤 "틀린 횟수를 줄여" 서사의 드릴다운.
- **신규 `app/conquest/[part]/page.tsx`**(client, `useParams`): 정복도 도넛 링 + **정복/복습 대기/미착수/총 문항** 타일 + 정복 복습 CTA. **RC(5·6·7)**는 「복습 대기 문항」 목록 — `/api/sets` 로드→해당 파트에서 streak<2(정복 미완) 문항을 streak 0 우선 정렬, 각 카드에 `다시 풀어야 함`(streak0·rose)/`정복까지 N회`(streak1·amber) 배지 + 문제 영/한(최대 40개, 초과분 카운트). **LC(2·3·4)**는 요약 + "🎧 리스닝으로 정복 복습" CTA. 드릴 CTA는 RC=`practiceConquest`(로드한 sets 전달)→/game, LC=/listening?part.
- **IA 변경(드릴다운)**: `RankHome`·`MasteryBoard` 파트 행 클릭 → **상세 페이지로**(기존 직접 드릴 대신 "먼저 보고 → 드릴"). RankHome의 선택 파트 즉시-드릴 CTA(`🎯 Part N 정복 복습`)는 유지. MasteryBoard 미사용 드릴 코드 정리.
- **검증**: `tsc`·프로덕션 build 통과(`/conquest/[part]` 라우트). puppeteer로 실제 Part5 문항ID 시드(정복3/streak1×3/streak0×2)→`/conquest/5`(정복3·복습대기5·미착수1042·리스트 배지·문제 영한)·`/conquest/3` LC CTA 육안 확인.
- **배포**: 커밋 `cbd5fa0` push → EC2 수동 재배포([[cloud5-manual-redeploy]]) → startup 빌드 ~200초 후 Ready in 1212ms. 실서버 `/`·`/rank`·`/conquest/{5,3,7}`·`/game` 전부 200. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 리스닝 정복 복습(세트 우선순위)·진행 저장 / 상세 페이지 난이도별 분해 / 리스닝 결과 스크립트 번역 강화.

### 세션 로그 — 2026-07-09 (26차: 배경음악 트랙 2종 추가 마무리·배포) ✅ 완료·배포됨
- 직전 세션에서 **미커밋 상태로 중단된 BGM 트랙 추가 작업**을 이어받아 마감. `BgmProvider.tsx` `TRACKS`에 **Her(2013) OST**(`her`, 🌆 teal/emerald)·**한강 노벨상 수상 연설**(`hankang`, 🕯️ rose/red) 2종이 추가돼 있었고 mp3(her 16MB·hankang 3.3MB, 둘 다 유효 MPEG)도 `public/music/`에 있었음. 플로팅 컨트롤 팝오버·랜딩 히어로가 `TRACKS`/`bgm.track` 구동이라 **코드 배선 없이 선택기에 자동 노출**(랜딩은 `bgm.track` 표시 + 토글만, 트랙 선택은 FloatingControl `TRACKS.map`).
- **정리**: 오디오 받으려고 저장했던 루트 찌꺼기 `scratch_hankang.html`·`scratch_ko.html`(다운로드 웹페이지) 삭제.
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과(데이터 배열 2줄 추가라 구조 변화 없음).
- **배포**: 커밋 `9edc47e` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→9edc47e, 세션25 로그 커밋 `4f09a10`도 함께 반영) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` ~210초 후 Ready. 실서버 `/`·`/rank`·`/music/{her,hankang,jennie}.mp3` 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 배경음악 볼륨 슬라이더 / 승리 시 음악 연출 / 리스닝 정복 복습·진행 저장 / 상세 페이지 난이도별 분해.

### 세션 로그 — 2026-07-09 (27차: 리스닝 정복 복습·세트별 진행/점수 저장) ✅ 완료·배포됨
- 사용자 "다음 작업 진행" → AskUserQuestion으로 **「리스닝 정복 복습·진행 저장」** 선택. 그동안 리스닝은 **문항 단위 mastery(streak)만** 기록하고 **세트 단위 진행/점수 저장이 없었고**, `/conquest/[part]`의 LC는 단순 CTA뿐, 홈엔 정복 상태 표시·복습 우선 정렬이 없었음.
- **신규 `src/game/listeningProgress.ts`**(localStorage `toeic-listening-progress-v1`, mastery와 분리): 세트별 `{attempts,bestCorrect,total,lastAt}` — `recordSetResult(setId,correct,total)`(시도+1·최고점 갱신). + `setConquestStatus(questionIds,part,mastery)` — mastery streaks로 세트 정복 상태 파생(untouched/pending/mastered). **정복 판정은 mastery.ts 단일 소스 유지**, 여기선 부가 진행지표(시도·최고점)만.
- **기록 배선**(`ListeningPlayer.tsx`): Part2=완료(done) 시 useEffect 1회, Part3/4=제출(reveal) 시 `recordSetResult` 호출(기존 `recordAnswers` 옆).
- **리스닝 홈**(`ListeningHome.tsx` + `listening/page.tsx`): 카드에 `questionIds` 추가(로더). 마운트 후 mastery+progress 로드(하이드레이션 안전) → 카드별 **정복👑/복습 대기/미착수 배지 + 최고 N/T 점수**, 파트범위 **정복 요약 바**(👑정복·🔁복습 대기·○미착수), **「복습 대기 우선」 토글**(켜면 미정복만 필터 + 복습 대기→미착수→정복 순 정렬), URL `?review=1` 초기 진입. `initialReview` prop.
- **`/conquest/[part]` LC 섹션**(page.tsx): 기존 CTA만 → **복습 대기(pending) 세트 목록**(RC 문항목록과 동일 의미: 시도했지만 미정복만, 미착수·정복 제외) — 각 세트 정복 N/T·최고점, 탭하면 세트로. CTA는 pending>0이면 `/listening?part=N&review=1`(복습 모드) 진입. `/api/listening` 로드(part<5).
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과. 프로덕션 서버(3311) + puppeteer로 **① 실제 풀이 → localStorage 기록 확인**(`toeic-listening-progress-v1` = `{attempts,bestCorrect:2/5,total}` + mastery streaks 동시 기록) **② 홈 시드 렌더**(👑1정복·🔁1복습대기·○45미착수, 복습 카드 앰버 배지+최고 3/5, 복습 토글→46세트 필터) **③ conquest/2**(8정복·2복습대기·225미착수·복습대기 세트 1개 집중목록) 육안 확인.
- **배포**: 커밋 `1015a2a` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→1015a2a) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` ~220초 후 Ready. 실서버 `/`·`/rank`·`/listening`·`/listening?part=2&review=1`·`/conquest/{2,3,5}` 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 배경음악 볼륨 슬라이더 / 승리 시 음악 연출 / 상세 페이지 난이도별 분해 / 리스닝 세트 진행 로비 대시보드 노출.

### 세션 로그 — 2026-07-09 (28차: 정복 상세 페이지 난이도별 분해) ✅ 완료·배포됨
- 27차 후보 「상세 페이지 난이도별 분해」 진행(사용자 "다음 스텝 진행"). 마라톤 "틀린 횟수 줄이기" 서사에서 *어느 난이도가 약한지* 가시화 + 그 난이도만 집중 드릴.
- **`/conquest/[part]` 확장**(단일 파일 `page.tsx`, 신규 저장 없음 — 로드된 세트+mastery로 파생): ① **난이도별 정복 분해 블록**(EASY 초록/MEDIUM 앰버/HARD 로즈 진행바 + 정복 M/T·복습 N·%) — RC는 `/api/sets`, LC는 `/api/listening`의 세트 `difficulty`로 문항 집계. ② **난이도 필터**(분해 행 클릭 → 그 난이도만, 활성 링+"전체 보기 ✕"+"N 난이도만 표시 중") → 복습 대기 문항(RC)·세트(LC) 목록을 난이도로 필터, 목록 항목에 난이도 배지. ③ **난이도 타깃 드릴**(RC): 난이도 선택 시 히어로 CTA가 "🎯 {DIFF} 정복 드릴"로 바뀌고 `practiceConquest`에 그 난이도 세트만 전달(스토어 무수정, 기존 mastered 제외 로직 재사용). LC는 목록 필터만.
- **검증**: `tsc --noEmit` 0 + 프로덕션 build 통과. 프로덕션(3311)+puppeteer로 Part6 시드(EASY 완전정복·MEDIUM/HARD 일부 복습대기) → 분해 바 수치 정확(EASY 4/16·MEDIUM 2/220·복습2·HARD 0/80·복습3), HARD 필터 시 목록 3문항+CTA "HARD 정복 드릴", **드릴 진입 시 실제 HARD 세트(p6-hard-01)만 로드** 육안+데이터 확인.
- **배포**: 커밋 `7019dbe` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→7019dbe) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` ~220초 후 Ready. 실서버 `/conquest/{2,5,6}`·`/rank`·`/game` 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 배경음악 볼륨 슬라이더 / 승리 시 음악 연출 / 리스닝 세트 진행 로비 대시보드 노출 / LC도 난이도 타깃 드릴(현재 목록 필터만).

### 세션 로그 — 2026-07-09 (29차: 남은 후보 4종 병렬 3에이전트 마감) ✅ 완료·배포됨
- 28차 "다음 후보" 4종을 사용자 요청대로 **병렬 3에이전트**(파일 소유권 무겹침)로 동시 구현. 빌드·통합검증·배포는 직접(병렬 `.next` 충돌 방지 위해 에이전트엔 tsc만 허용, build/dev/git 금지).
- **A(BGM) — 볼륨 슬라이더 + 승리 시 음악 연출**(`BgmProvider.tsx`·`match/result/page.tsx`): ① `volume` 상태(0~1, 기본 0.32) + localStorage KEY에 `volume` 추가, 오디오 요소 실시간 반영, context에 `volume`/`setVolume`, 좌하단 플로팅 팝오버에 슬라이더(🔇/🔈/🔊 아이콘+%). ② `celebrate()` — **enabled일 때만** 트랙을 `rocky`(Gonna Fly Now 승리 테마)로 전환·재생. `match/result`가 승리(`user.rank===1`) 시 1회 호출(그 경로는 음소거 아님).
- **B(리스닝 진행 로비) — 신규 `ListeningProgressCard.tsx` + `app/page.tsx`**: `loadListeningProgress()`로 세트 단위 요약(학습 세트 N/총·완주(만점) 세트·최고 정답 합·평균 최고 정답률) + "리스닝 이어서 →" CTA. 랜딩 MasteryBoard 바로 아래 배치. 진행 0건이면 null(하이드레이션 안전). cyan/teal.
- **C(LC 난이도 타깃 드릴) — `ListeningHome.tsx`·`listening/page.tsx`·`conquest/[part]/page.tsx`**: ① ListeningHome에 난이도 칩 행(전체/EASY/MEDIUM/HARD, 파트범위 카운트) + `initialDiff` prop + 카드 필터. ② listening/page가 `?diff=` 파싱. ③ conquest LC `startDrill`이 `diff!=="ALL"`이면 `/listening?part=N&review=1&diff=X`로 진입(RC는 기존 `practiceConquest` 난이도 세트 전달 유지).
- **검증**: 통합 `tsc --noEmit` 0 + 프로덕션 build 통과. 프로덕션(3311)+puppeteer 시드 육안: ① BGM 팝오버 볼륨 슬라이더(0.6 저장·트랙5종) ② 리스닝 카드(학습 4/211·완주 2·최고합 13·평균 81%, 계산 정확) ③ `/listening?part=3&diff=HARD` → HARD 9세트만(칩 전체/E0/M74/H9 활성) ④ conquest LC 드릴 링크 `&diff` 부착·celebrate→rocky 코드 확인.
- **배포**: 커밋 `26f99ee` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→26f99ee) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` ~220초 후 Ready. 실서버 `/`·`/rank`·`/listening`·`/listening?part=3&diff=HARD`·`/conquest/3`·`/match`·`/game` 전부 **200** 확인. rollback `:prev` 확보, 임시 키 삭제.
- **다음 후보**: 승리 음악 후 원래 트랙 복귀 옵션 / 볼륨 슬라이더 랜딩 히어로에도 / 리스닝 카드에 파트별 분해 / 오디오북 배속.

### 세션 로그 — 2026-07-10 (30차: 기기 내 백업/복원 + 리딩 6·7 "한 지문=한 세션" + RC 문제풀 +102) ✅ 완료·배포됨
- **① 기기 내 저장 백업/복원(커밋 `14327f1`, 선행 배포됨)**: 사용자 태블릿 단일 기기 사용 → 서버·계정 대신 브라우저 localStorage 내구성만 보강. `src/game/backup.ts`(`toeic-*` 전체 스냅샷 내보내기/불러오기·`navigator.storage.persist()`·마지막 백업 시각·`peekBackup` 미리보기), `PersistStorage.tsx`(layout 마운트 시 영구저장 1회 요청), `BackupCard.tsx`(랜딩 정복도 아래 — 마지막 백업 노출·오래되면 넛지·불러오기 확인 모달로 실수 덮어쓰기 방지). 헤드리스로 내보내기→복원→잘못된 파일 거부 전 과정 검증. **EC2 수동 재배포 완료**([[cloud5-manual-redeploy]]).
- **② 리딩 Part 6·7 "한 지문 = 한 세션"**: 사용자 확정 — 지문 하나(3~4문항)를 다 풀면 세션 종료→결과. `store.ts`에 `singlePassage` 추가(start에서 `part===6||7`이면 true, 큐 1세트만), `next()`가 세트 끝나면 `end()` 호출. `FeedbackPanel`은 단일지문 마지막 문항에서 버튼 "결과 보기 →". **Part 5(단문)·AI 대결 10문제·리스닝은 불변**. (리스닝 Part 3·4는 이미 `/listening/[id]`가 세트 하나만 재생하고 종료하는 구조라 변경 불필요 — 확인함.) 헤드리스로 Part 7 지문(5문항) 완주→/result 종료 검증.
- **③ RC 문제풀 +102**: Part 6 `p6-56~68`(13세트·52문항, 이메일·공지·기사·편지·메모·광고·뉴스레터 등, 각 세트 문장삽입 1문항) + Part 7 `p7-g-65~75`(11세트·50문항, 단일 7 + 이중 2 + 삼중 1, 6유형 골고루·의도/동의어/사실확인 포함). 초안 정답분포 A34/B50/C14/D4 쏠림 → 신규 24세트 전용 `scripts/rebalance-new-rc.mjs`(안전 스왑+마커 동기화)로 **A26/B26/C25/D25** 균등화. `validate-sets` **408세트·2440문항**(Part5 1250·6 368·7 822)·오류0·마커100%.
- **검증**: `tsc`·프로덕션 build 통과. (이 로그와 함께 커밋·push·EC2 재배포 예정.)
- **다음 후보**: 리스닝도 세트 완료 후 다음 세트 자동 이어보기 옵션 / 정답분포 전역 미세조정 / EASY·HARD 세트 추가.

### 세션 로그 — 2026-07-10 (31차: 미배포 캐릭터 선택 마감 + 미디어 정리 + AI 대결 리딩 문항수 축소) ✅ 완료·배포됨
- 사용자 "이전에 수행한 거 다 반영됐는지 확인" → 점검 결과 세션30 콘텐츠(5f3e684)는 실서버 정상 반영(로컬 로더 308세트/2050문항 = 실서버 일치, 408−레거시100=308)이나, **아침에 만든 「라이벌 캐릭터 선택」 기능이 커밋·배포 안 된 로컬 WIP**로 남아있던 것 발견(랜딩에 빌류킹만 노출, 토글 없음).
- **① 캐릭터 선택 기능 마감·배포(커밋 `e77e8a7`)**: 신규 `src/game/match/characters.ts`(빌류킹↔제니 선택, localStorage `toeic-character-v1`·`useCharacter` 훅·즉시 리렌더·조사 헬퍼 `josa`/`hasBatchim`) + 랜딩 히어로 토글 UI + match/lc-match/result·Matchmaking·RankHome·MasteryBoard·JennyAvatar·JennyFx·matchStore를 선택 캐릭터 구동으로 배선. (`JENNY` 하드참조 → `character` 구독으로 교체.) tsc0·build0 후 push→EC2 수동 재배포([[cloud5-manual-redeploy]]). 실서버 랜딩 "제니" 노출 확인.
- **② 미디어 정리**: 입력창 지연 원인 = 루트에 흩어진 **원본 영상 5개(227MB, mp4)**. mp3 추출본(jennie/rocky/playlist/her/hankang) 전부 존재 확인 후 **삭제**(추출 후 잉여). `public/music/*.mp3`(서빙본)·목업 png는 보존. (처음엔 `media/`로 이동+gitignore 했다가, 사용자가 "영상 삭제" 지시 → 삭제하고 gitignore 원복, 커밋엔 미포함.)
- **③ AI 대결 리딩 문항수 축소(커밋 `6e2b3cb`)**: 사용자가 "대결도 지문 단위 3~4문항 + Part5는 5문항" 확정(AskUserQuestion). 대결 엔진을 **고정 10 → 가변 길이**로:
  - `pool.ts`: Part5=정확히 5(`PART5_MATCH_LENGTH`), **Part6·7=셔플한 지문 중 하나의 문항만**(지문 하나=한 판, 3~5문항). MATCH_LENGTH(10) 미사용.
  - `matchStore`: 종료판정·전문항정답 미션을 `items.length` 기준으로(10 상수·import 제거). 봇은 원래 문항별 굴림이라 가변 자동 호환.
  - `MatchHud`/`ProgressGrid`: 총수를 `items.length`/결과 길이에서 도출. 로비 카피도 수정.
  - **리스닝 대결(lc-match)은 별도 경량 엔진이라 10문항 유지**(MatchHud/ProgressGrid/matchStore 미공유 — 확인함). 세션30의 연습 `/game` "한 지문=한 세션"과는 별개 작업이었음(대결은 그때 불변으로 남겼던 것).
  - 검증: tsc0·build0 + **실콘텐츠 로직 시뮬**(Part5=5·Part6/7=전부 같은 지문 4~5) + 실서버 로비 카피 반영 확인.
- **운영**: 3건 모두 push→EC2 수동 재배포(대시보드 트리거 건너뛰고 SSH, startup 빌드 ~3분). rollback `:prev` 태깅, 임시 키 삭제. 병렬 에이전트 미사용(순차 의존 작업).
- **다음 후보**: 대결 문항수 밸런스(Part6·7 지문 하나면 매우 짧음) 사용자 피드백 반영 / 리스닝 대결도 축소 여부 / 세션30 후보(리스닝 자동 이어보기·정답분포 미세조정·EASY/HARD).

### 세션 로그 — 2026-07-10 (32차: 정복 판정 문항 단위 단순화 마감 + 랜딩 대결 CTA → /rank 허브 통일) ✅ 완료·배포됨
- **맥락**: 세션 31 이후 정복(Conquest) 로직을 재설계한 커밋 2개가 origin엔 push됐으나 **세션 로그 미기록·실서버 미배포**로 남아있었고, 랜딩 `page.tsx`에 미커밋 변경 1건이 있었음. 이어받아 마감·배포.
- **① 정복 판정 재설계(선행 커밋 2개, 이번 세션에 실서버 최초 반영)**:
  - `cc02a72` 정복 판정을 "만점 세트 = 즉시 정복"으로: `recordAnswers`를 세트(part+setId) 단위로 그룹핑 → 그 세션에서 답한 세트 문항이 전부 정답이면 즉시 정복(streak=MASTER_STREAK). `AnswerEntry.setId` 추가. 대결(coverageOnly)은 문항 단위 유지.
  - `09580fe` 정복을 문항 단위로 단순화 + 맞힌 문제 제외: **모든 파트 문항 단위 정복**(setId=q.id, 맞히면 즉시 정복→다시 안 나옴). `dropSolved`로 start·practiceFocus·practiceConquest에서 정복 문항 제외 → **안 푼·틀린 문제만 총량에서 계속 출제**(Part6·7은 지문 보존, 정복 문항만 미출제). "복습 대기"·"미착수" 버킷 제거 → **정복/남은/총량 2상태로 통일**(MasteryBoard·RankHome·정복 상세·리스닝 홈). 리딩 6·7 다 맞혀도 지문 전체 번역+문항별 해설을 리뷰에 노출.
- **② 랜딩 대결 CTA → /rank 허브로 통일(커밋 `267956c`, 이번 세션 신규)**: 기존 랜딩 "⚔️ 랭크 대결 시작"이 파트 랜덤으로 `/match` 직행 → **`/rank` 허브로 이동**(정복 현황 확인 → RC/LC 도메인·파트 선택 → 대결 시작). 허브(`RankHome`)에 이미 도메인 토글·파트 선택·대결 CTA 완비돼 있어 배선 불필요. `startRankMatch` 2개 호출부 모두 `/rank`로 일관, 잔여 참조 0.
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과. 프로덕션 서버(3411) + puppeteer로 랜딩 "⚔️ 랭크 대결 시작" 클릭 → **URL `/rank` 이동 확인**, 전 라우트(`/`·`/rank`·`/game`·`/match`·`/result`·`/conquest/5`·`/conquest/3`·`/listening`) 200.
- **배포**: `267956c` push → EC2 수동 재배포([[cloud5-manual-redeploy]], 대시보드 건너뛰고 SSH). source `git pull`(→267956c) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` 후 **Ready in 1225ms**. 실서버 `/`·`/rank`·`/game`·`/match`·`/conquest/5`·`/api/part-totals` 전부 **200**, 랜딩 CTA 노출 확인. rollback `:prev` 확보, 임시 키 삭제. (세션 32 정복 로직도 이번 배포로 실서버 최초 반영.)
- **후속(정복 문구 잔재 정리) ✅ 배포됨**: 실서버에서 정복 흐름을 직접 눌러 검증하다 옛 2연속 모델 잔재 발견·수정.
  - **`FeedbackPanel`(커밋 `9f45a0a`)**: 정답 시 "한 번 더 맞히면 정복! 복습에 다시 나와요"가 뜨는데 실제론 이미 정복돼 안 나옴(반대 안내) → **정답 "👑 정복 성공! 이 문항을 정복했어요 · 다시 안 나와요" / 오답 "복습에 다시 나와요 · 맞히면 정복돼요"**. 이미 정복한 문항(전체 복습 폴백 재출제) 유지/풀림 구분만 `MASTER_STREAK` 기준 보존.
  - **`QuestionPanel`(커밋 `9438675`)**: streak===1 "✓ 정복까지 1번!" 칩은 RC·리스닝 Part2가 문항 단위 즉시 정복(streak 0 또는 MASTER_STREAK)이라 **절대 안 뜨는 죽은 분기** → 제거, 정복 문항만 "👑 정복 완료". store.ts 주석 "연속 2회"도 정정.
  - **점검 결과 나머지 화면은 정상**: 리스닝 Part3·4는 세트 단위(`setId=set.id`)라 "미착수/다시 풀기" 유효 · `ScoreBoard` "최고 연속 정답"은 세션 카운터(정복 무관) · 정답률 "미응시" 정상. 각 커밋 tsc·build 통과 후 EC2 재배포([[cloud5-manual-redeploy]]), 실서버 정답/오답 문구 직접 플레이로 확인.
- **다음 후보**: 정복 문항 단위 전환 후 UX 사용자 피드백(정복도 체감·복습 흐름) / 대결 문항수 밸런스 / 리스닝 대결 축소 여부 / 정답분포 미세조정·EASY/HARD.

### 세션 로그 — 2026-07-11 (33차: 대결·풀기 진입 전수 검증 + 랜딩 폴백 수정 + 리스닝 +248, 병렬 3에이전트 2회) ✅ 완료·배포됨
- **실서버 정복 흐름 전수 검증(실플레이)**: 랜딩 대결 CTA→/rank·정복 복습→/game·정복 완료 칩(Part6 전문항 시드로 폴백 재현)·**RC 대결/LC 대결 결과·REVIEW**·랜딩 풀기 진입(리딩 타일→/learn→리딩 학습 시작→/game / 리스닝 타일→/listening)까지 puppeteer로 실제 눌러 확인. 대결 REVIEW엔 정복 문구가 배지("🎯 정복 진행 +N문항 정복", coverageOnly 충전과 일치)뿐이고 옛 모델 잔재 없음 확인.
- **랜딩 문항수 폴백 수정(`app/page.tsx`)**: 풀기 진입 검증 중 리스닝 타일 문항수가 순간 옛값으로 깜빡이는 것 발견 → 원인 = `FALLBACK`(라이브 집계 fetch 전/실패 시 표시)이 낡음(rc 830·lc 330) → **rc 2050 / lc 975**로 갱신(리스닝 2배치 추가 후 최종 975).
- **리스닝 실전 +248 (2배치 × 124, 각 배치 병렬 3에이전트·파일 소유권 무겹침)**: 사용자 "각 파트 40개씩(총 120)" 확정 → 토익 3문항/세트 구조상 P3·4는 14세트=42로 → 배치당 P2 40·P3 42·P4 42 = 124.
  - **1차** `e5df766`: P2 `lc-p2-48~55` · P3 `lc-p3-84~97` · P4 `lc-p4-82~95`. (851문항)
  - **2차** `b2e1912`: P2 `lc-p2-56~63` · P3 `lc-p3-98~111` · P4 `lc-p4-96~109`. (975문항)
  - 4개국 8목소리 혼합, 비IT 테마 다양화, 의도·화법/추론 포함, category는 인식 라벨(When/Where/…의문문·부정·부가·선택·평서·요청 / 주제·목적·세부사항·추론·의도·화법). 정답위치 균등.
- **음원**: `tts-listening.mjs`(기존 자동 건너뜀) → 배치당 신규 **68클립**(P2 40 item + P3 14 + P4 14 set), 0바이트 0. 매니페스트 총 **543**. (2차 실행은 완료 후 msedge 소켓 잔류로 exit 1 뜨나 파일은 정상 생성 — 디스크·매니페스트로 확인.)
- **검증**: `validate-listening` **283세트·975문항**(727→851→975)·오류0·마커100%·id중복0. `tsc`+프로덕션 build 통과.
- **⚠️ push 권한 이슈**: 세션 중 `git push`가 갑자기 403(`denied to banhojin`)·자격증명 GUI 대기로 멈춤 → git 프로세스 정리 후 재시도하면 정상 push됨(짧은 타임아웃으로 재시도 권장). mp3 대량이라 push가 느려 1~2회 재시도 필요할 수 있음.
- **배포**: 두 배치 합쳐 커밋 `b2e1912`까지 EC2 수동 재배포([[cloud5-manual-redeploy]]) → startup 빌드 후 Ready in 1212ms. 실서버 `/api/listening` **283세트**·신규 라우트(lc-p2-63·lc-p3-111·lc-p4-109)·신규 음원 mp3·`/`·`/listening` 전부 200 확인. rollback `:prev` 확보, 임시 키 삭제. (이전 턴 정복 문구 수정 `9f45a0a`·`9438675`·`267956c`도 포함.)
- **다음 후보**: 리스닝 정답분포 전역 미세조정(P2 C 상대적 얇음 92/315) / 리스닝 EASY/HARD 밸런스 / 대결 문항수 밸런스.

### 세션 로그 — 2026-07-11 (34차: 리딩 Part 7 실전 +100, 병렬 3에이전트) ✅ 완료·배포됨
- 사용자 "파트 7 100개 보충" → 리스닝과 동일하게 **병렬 3에이전트**(지문유형별 분담·파일 소유권 무겹침). 실전 토익 Part 7 비율에 맞춰 **단일 60 + 이중 20 + 삼중 20 = 100문항**.
  - 단일 `p7-g-76~90`(15세트×4=60) · 이중 `p7-g-91~94`(4세트×5=20) · 삼중 `p7-g-95~98`(4세트×5=20).
  - 6유형(주제·목적/세부사항/추론/동의어/사실확인/의도·화법) 골고루, 이중·삼중은 **교차참조 문항**(계산·정보종합) 20+개 포함, 지문유형 다양(Email·Notice·Article·Ad·Letter·Memo·Text Chain·Online Chat·Review·Press Release·Web·Schedule·Invoice·Announcement·Form 등), 비IT 테마 다양화. **정답위치 완전균등 A/B/C/D 각 25**. 마커는 한글 `(가~라)=N`(validate-sets가 한글 마커 검사).
- **검증**: `validate-sets` 오류0·마커100%·id중복0. 로더서빙 **Part7 432→532**·RC 2050→2150(레거시 제외 기준). `tsc`+프로덕션 build 통과.
- **랜딩 폴백**: `FALLBACK.rc` 2050→2150 갱신.
- **배포**: 커밋 `b9558e7` push(자격증명 GUI 대기로 1회 타임아웃 → git 프로세스 정리 후 재시도 성공) → EC2 수동 재배포([[cloud5-manual-redeploy]]) → 실서버 `/api/sets` **Part7 114세트·532문항**·신규 p7-g-76/90/94/98 라이브·`/`·`/learn`·`/game`·`/api/part-totals` 200 확인. rollback `:prev` 확보, 임시 키 삭제. (리딩은 음원 불필요.)
- **다음 후보**: Part 5·6 추가 확장 / Part 7 난이도 세트(EASY/HARD) 보강 / 정답분포 전역 미세조정.

### 세션 로그 — 2026-07-15 (35차: 끊긴 「패턴학습」 콘텐츠 이어받아 마무리·배포) ✅ 완료·배포됨
- **맥락**: 직전 세션(7/15 18:07)이 **세션 한도로 중단**된 채 커밋도 안 된 대규모 WIP가 남아 있었음(git status에 `content/patterns/`·`src/{game/patterns,lib/pattern-loader}.ts`·`app/patterns`·`app/api/patterns`·`components/patterns`·`page.tsx` 등). 중단 세션 트랜스크립트(`~/.claude/projects/.../8aa6239a-*.jsonl`) 확인 결과, **원본 자료(`content/sets/toeic_*.md`)를 패턴 JSON으로 병렬 에이전트 변환** 중이었고 **P6는 완료·P7 에이전트는 파일만 쓰고 본 세션이 검증 전 사망**해 P7 챕터 정리가 어긋난 상태였음.
- **신규 「패턴학습(Pattern Study)」 기능**(문제은행·리스닝·대결과 **완전 분리된 별도 사일로**): 파트별 **25패턴(총 75·260문항)**을 "공식 → 3초컷 팁 → 예제 3~5문항 → 정오+해설" 교재형으로 학습. **정복도/진단 통계엔 무영향**(학습 전용).
  - 콘텐츠 `content/patterns/{p5,p6,p7}-ch1~5.md`(파트별 5챕터×5패턴). P5=문법 자리/연어/특수구문, P6=지문 유형별 상황 예측 맵+빈칸, P7=지문 유형별 정답 매칭(단일·이중·삼중).
  - 신규 파일: `src/game/patterns.ts`(도메인+진도 localStorage `toeic-pattern-v1`) · `src/lib/pattern-loader.ts`(`content/patterns/*.md`의 ```json``` 블록 파싱, part 미기재=5) · `src/app/api/patterns/route.ts`(**force-dynamic**) · `src/app/patterns/page.tsx`·`[id]/page.tsx`(서버) · `src/components/patterns/{PatternHome,PatternStudy}.tsx`(client, 인디고 톤). 랜딩(`app/page.tsx`)에 📐 패턴학습 진입 타일 추가.
- **이번 세션 복구·마감**: ① **P7 챕터 재정리** — ch1~3 제목이 전부 "이메일 및 서신"으로 중복되고 ch5에 17-25(9개)가 몰려 있던 걸, 스크립트로 **P5·P6처럼 5챕터×5패턴 + 고유 제목**(이메일·서신 / 서신·공지 / 광고·공지·안내문 / 기사·양식·서식 / 이중·삼중)으로 재배치. **문항·해설·id·번호는 100% 보존**, 챕터 메타만 교정. ② **PatternHome 헤더** P5 하드코딩 → 활성 파트 반응형(파트별 소개문). ③ `/api/patterns` 정적 프리렌더 → **force-dynamic**(콘텐츠 변경 반영).
- **검증**: 독립 재파싱 **P5·P6·P7 각 25패턴(no 1-25 완전)·총 75·260문항·id중복0·스키마0** · `tsc` 0 · 프로덕션 build 통과 · 프로덕션 서버로 `/patterns`·`/patterns/[id]`·`/api/patterns` 200·없는 id 404·**P7 5챕터 재정리 실렌더 확인**.
- **배포**: patterns 관련 파일만 스테이징(mock WIP 3종 제외) → 커밋 `bc33aa1` → push(`eead709..bc33aa1`) → EC2 수동 재배포([[cloud5-manual-redeploy]]). **배포 함정**: source `.git`이 root 소유라 `git pull`이 조용히 실패(HEAD 구버전 그대로 → 구버전으로 빌드됨)해서 첫 빌드 헛돎 → `sudo chown -R ubuntu:ubuntu .git` 후 재pull(→bc33aa1)·재빌드로 해결(메모에 반영). 컨테이너 교체(포트 10011) → startup 빌드 ~210초 후 Ready → 실서버 `/`·`/patterns`·`/patterns/p7-pat-21`·`/api/patterns`(15챕터·75패턴·P7 재정리) 200 확인. rollback `:prev` 확보, 임시 키 삭제.
- **⏸️ 보류(사용자 확정)**: 모의고사(mock) WIP — `content/mock`(전용 RC) 배선 변경(`mock.ts`·`mock-loader.ts` + `content/mock` 10세트)은 **미커밋 working tree에 그대로 유지**. 현재 RC 10세트뿐(P5 3·P6 4·P7 3)이라 풀렝스 1회분엔 미달(동작은 함) → 나중에 RC 보강 후 마감 예정.
- **다음 후보**: 모의고사 RC 보강·커밋(P5 30·P6 16·P7 54 목표) / 패턴학습 진도 로비 노출 / 패턴 콘텐츠 파트별 확장·난이도 / PatternStudy UX 폴리시.

### 세션 로그 — 2026-07-16 (36차: 패턴학습 P6·P7 지문↔문제 2단 레이아웃 + 디스크 정리) ✅ 완료·배포됨
- 사용자 피드백("패턴학습 잘했다") 후 요청: **P6·P7에서 지문이 위에서 스크롤로 펼쳐지는 것보다 대결(match)처럼 한 화면에 지문 담고 문제는 사이드로** 빼자.
- **`PatternStudy.tsx` 2단 재구성**(단일 파일, P6·P7=`pattern.passage` 있을 때만): 기존 = `max-w-2xl` 단일 컬럼에 지문이 `max-h-[46vh]` 접혀 위에 오고 문제는 아래 → 위아래 왕복. 수정 = **`container-exam`(max-w-6xl)** + `grid grid-cols-1 lg:grid-cols-[1fr_1fr]`로 **왼쪽 지문(lg:sticky top-6·한 화면 고정)·오른쪽 예제/문제**. 교육 블록(🧭 지문 프레임워크/상황 예측 맵)은 전폭 상단 유지. 지문 패널 높이 반응형 = 데스크탑 `lg:max-h-[calc(100dvh-9rem)]`·모바일 `max-h-[46vh]`(모바일 단일 컬럼에서 문제 빨리 보이게). **P5(단문·지문 없음)는 기존 단일 컬럼 그대로**(match/game의 지문 유무 분기와 동일 패턴).
- **검증**: `tsc --noEmit` 0 + 프로덕션 `npm run build` 통과. puppeteer 육안: **P7 데스크탑**(프레임워크 상단+지문 좌·문제 우 2단)·**P6 데스크탑**(빈칸 `(1)` 강조 지문 좌·"빈칸 (1)" 문제 우)·**P6 모바일**(단일 컬럼 정상). 중간 `.next` errno -4094 재발 → node kill+rm .next+단일 재기동([[toeicnet-dev-server]]).
- **⚠️ 디스크 풀(중요)**: 배포용 `npm run build`가 **`ENOSPC: no space left on device`**로 실패 → 원인 = **C: 여유 60MB**. 범인 = **npm 캐시 11GB**. `npm cache clean --force`로 9.4GB 확보 후 빌드 정상. (TEMP 1.5GB·claude temp 822MB는 미정리, npm 캐시만으로 충분.) 앞으로 배포 전 빌드 실패 시 디스크부터 확인.
- **배포 방향 점검(사용자 요청)**: git remote `JessyLimitless/perfecttoeic` ✅·branch main ✅. 올바른 순서 재확인 = 로컬 build 통과 → **PatternStudy.tsx만** 스테이징(mock WIP 3종 제외) → push → **대시보드 「배포」 의존 금지, EC2 SSH 수동** → 서버 `sudo chown -R ubuntu:ubuntu .git` 후 pull·**HEAD 대조 필수**(안 하면 구버전 빌드).
- **배포**: 커밋 `dbabf77` push(`3c39db6..dbabf77`) → EC2 수동 재배포([[cloud5-manual-redeploy]]). 서버 pull 시 세션35 로그 커밋(3c39db6)도 함께 최초 반영(HEAD=dbabf77 대조) → `:prev` 태깅 → 이미지 빌드 → 컨테이너 교체(포트 10011) → startup `next build` 후 **Ready in 1205ms**. 실서버 `/`·`/patterns`·`/patterns/{p6-pat-01,p7-pat-21}`·`/api/patterns`(15챕터·75패턴) 200, 상세에 **`container-exam` 실서빙**(2단 라이브) 확인. rollback `:prev` 확보, 임시 키 삭제.
- **⏸️ 보류 유지**: 모의고사(mock) WIP는 여전히 미커밋 working tree(`mock.ts`·`mock-loader.ts`·`content/mock/`).
- **다음 후보**: 모의고사 RC 보강·커밋 / 패턴학습 진도 로비 노출 / 대결 결과에도 패턴 연계 / PatternStudy UX 폴리시.
