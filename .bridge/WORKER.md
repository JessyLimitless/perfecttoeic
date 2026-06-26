# .bridge 워커 사양 (Claude Code 라이브 백엔드)

Claude Code가 켜져 있는 동안 이 사양에 따라 `.bridge/inbox` 요청을 처리해 `.bridge/outbox` 응답을 만든다.
(앱의 인게임 채점·타이머는 로컬에서 즉시 처리되며, 브리지는 **문제·해설 생성**만 담당.)

## 루프 1회 처리 절차

1. `.bridge/inbox/*.json` 중 **동일 id의 `.bridge/outbox/<id>.json`이 아직 없는** 요청을 모두 찾는다.
2. 각 요청에 대해 `type`에 맞게 처리한다.
3. 결과를 `.bridge/outbox/<id>.json`으로 기록한다. (앱이 폴링해서 가져감)
4. 처리할 요청이 없으면 아무것도 하지 않는다.

## type: "generate"

`payload = { difficulty, count, theme }`

- 토익 RC **Part 7 (독해)** 문제를 `count`개 생성한다. 각 문제 = **지문 1개 + 내용 이해 질문 1개**.
- **컨셉**: "해외 글로벌 IT 기업에 재직 중" 몰입형 시뮬레이션. 지문은 이메일·공지·기사·채팅·리포트 등
  실무 상황(스탠드업, PR 리뷰, 배포, DB 마이그레이션, 이탈률/대시보드, 프로덕션 장애 대응, 스프린트
  등)으로 쓰고, **주제는 AI & 데이터 분석**.
- 질문 유형을 다양화한다: 세부사항 / 주제·대의 / 의도 파악(채팅) / 추론 / 동의어 등.
- 난이도(`difficulty`)별: EASY=짧은 지문·직접 정보 찾기, MEDIUM=약간 긴 지문·대의/사실확인,
  HARD=추론·동의어·함의 등 까다로운 유형.
- 정답은 명확히 1개, 오답 3개는 그럴듯하되 분명히 틀리게. 정답 위치(answerIndex)는 0~3로 고루 분산.
- 해설은 한국어로, 지문의 어느 부분이 근거인지 짚는다.

### 각 항목은 `src/game/types.ts`의 `PassageSet` 형태를 따른다 (지문 1 + 문항 여러 개)

```jsonc
{
  "id": "live-set-<짧은-고유값>",
  "difficulty": "EASY" | "MEDIUM" | "HARD",
  "passageType": "Email" | "Article" | "Report" | "Notice" | "Text Message Chain" 등,
  "passageLines": [                       // 지문을 '문장' 단위로 쪼개 영/한 페어로
    { "en": "영어 한 문장", "ko": "그 문장의 자연스러운 한글 번역" }
  ],
  "questions": [                          // 이 지문에 대한 문항 2~3개
    {
      "id": "live-q-<고유값>",
      "prompt": "질문 (영어)",
      "promptKo": "질문 한글 번역",
      "choices": ["A","B","C","D"],
      "choicesKo": ["가","나","다","라"],
      "answerIndex": 0,                    // 0~3, 정답 위치 (고루 분산)
      "explanation": "한국어 해설 (근거 위치 포함)",
      "category": "세부사항/추론/주제/동의어/의도파악 등"
    }
  ]
}
```

- 실제 Part 7처럼 **지문 1개당 문항 2~3개**를 다양한 유형으로 출제한다.
- `passageLines`는 통독을 위해 **문장 단위로** 끊고, 각 문장의 자연스러운 한글 번역을 단다.
- 응답 `data`는 `{ "sets": PassageSet[] }` 형태로 outbox 에 기록한다.

### 응답 파일 형식 (`.bridge/outbox/<id>.json`)

```jsonc
{
  "id": "<요청과 동일한 id>",
  "type": "generate",
  "status": "ok",
  "data": { "questions": [ /* Question[] */ ] },
  "processedAt": 0            // 기록 시점(없으면 0)
}
```

오류 시:

```jsonc
{ "id": "<id>", "type": "generate", "status": "error", "error": "사유", "processedAt": 0 }
```

## 라이브 루프 켜는 법

`/loop` 로 이 워커를 주기 실행한다. 예:

```
/loop .bridge/inbox 의 미처리 요청을 WORKER.md 사양대로 처리해서 outbox 에 응답을 써줘
```

루프가 꺼져 있으면 앱은 응답 타임아웃 후 로컬 샘플 문제로 자동 fallback 한다.
