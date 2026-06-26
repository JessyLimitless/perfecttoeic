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

### 세션 로그 — 2026-06-27 (정답분포 전체 균등화)
- **문제**: 전역 정답 분포 A28.4/B31.6/C24.3/D**15.7** 쏠림. 특히 **Part 6 A48/B27/C13/D13**, `p5-gD-01~08` 전부 D=0, Part 7 레거시 다수 D=0.
- **신규 스크립트 `scripts/rebalance-all.mjs`**(기존 `rebalance-answers.mjs`는 쏠린 16세트 전용 → 이번엔 **전 176세트**): 세트별 균등 + 전역결손 우선 그리디로 보기 스왑(`choices`/`choicesKo`)·`answerIndex`·해설 마커 갱신.
  - **안전장치 3중**: ① 해설에 한글 마커 `(가)` 참조 >1개면 제외(multiref). ② 영문 `(A)`/`option B`/서수 "첫 번째 선택지" 등 위치참조 패턴 제외(RISKY 정규식). ③ 단일 괄호참조가 **현재 정답 글자와 불일치(오답 참조)면 제외**.
  - **마커 2형식 모두 처리**: 신규세트 `(가)=N` 형 + **레거시 산문형 "(가)가 정답이다"**(176문항!) — 후자는 기존 스크립트가 못 잡아 조용히 어긋날 뻔함. 단일 괄호글자를 새 정답글자로 치환.
  - **고정인지 균형(핵심)**: ineligible(고정) 답을 `fixedCounts`로 잡아 **세트 전체 합이 균등**해지도록 eligible에 목표 배정. → Part 6의 4번(문장삽입, multiref 고정) 때문에 안 풀리던 쏠림 해결.
- **결과**: 680문항 스왑·66문항 제외(multiref/risky). 전역 **A23.8/B23.6/C25.9/D26.7**. 파트별 **P6 25/25/25/25(완전균등)** · P7 26/23/25/25 · P5 21/23/27/29.
- **검증**: 독립 재파싱으로 176세트·980문항·parseErr0·id중복0·스키마0·**마커불일치0·정답텍스트손실0**. 스왑 산문해설 육안확인(정답글자↔명시정답 일치). 적용 전 `content/sets` 백업(scratchpad).
- **다음 후보**: Part 5 미세쏠림(D29%) 추가 평탄화 여지 / Part 6 EASY·HARD 보강 / 아바타 실이미지 / 대결 밸런스·연출.
