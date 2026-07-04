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
