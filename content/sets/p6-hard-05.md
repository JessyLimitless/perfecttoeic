# p6-hard-05 — Part 6 Email: Data Platform Migration (HARD, 시제·태·문장삽입·어휘)

```json
{
  "id": "p6-hard-05",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    { "en": "To: Analytics Team", "ko": "받는 사람: 분석팀" },
    { "en": "Subject: Scheduled Migration of the Reporting Database", "ko": "제목: 리포팅 데이터베이스 예정 이관" },
    { "en": "Over the past quarter, the volume of queries our dashboards generate ------(1) far beyond what the current server can handle efficiently.", "ko": "지난 분기 동안 우리 대시보드가 생성하는 쿼리 양이 현재 서버가 효율적으로 처리할 수 있는 수준을 훨씬 ______(1)." },
    { "en": "To address this, the reporting database ------(2) to a cloud warehouse during the weekend of the fourteenth.", "ko": "이를 해결하기 위해 리포팅 데이터베이스가 14일 주말 동안 클라우드 웨어하우스로 ______(2)." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "We appreciate your patience and expect the new platform to deliver noticeably faster ------(4) once the transfer is complete.", "ko": "여러분의 양해에 감사드리며, 이관이 완료되면 새 플랫폼이 눈에 띄게 빠른 ______(4)을 제공할 것으로 기대합니다." }
  ],
  "questions": [
    {
      "id": "p6-hard-05-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["will grow", "has grown", "is growing", "grew"],
      "choicesKo": ["증가할 것이다", "증가해 왔다", "증가하고 있다", "증가했다"],
      "answerIndex": 1,
      "explanation": "'Over the past quarter'라는 기간 표현은 과거부터 현재까지 이어진 변화를 나타내므로 현재완료 has grown이 정답입니다. 따라서 (나)=1입니다.",
      "category": "시제"
    },
    {
      "id": "p6-hard-05-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["will migrate", "has migrated", "migrates", "will be migrated"],
      "choicesKo": ["이관할 것이다", "이관해 왔다", "이관한다", "이관될 것이다"],
      "answerIndex": 3,
      "explanation": "주어 database는 이관을 '당하는' 대상이고 예정된 미래 일이므로 미래 수동태 will be migrated가 정답입니다. 따라서 (라)=3입니다.",
      "category": "태"
    },
    {
      "id": "p6-hard-05-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "During that window, all dashboards will be temporarily unavailable.",
        "The old server was purchased at a considerable discount last year.",
        "Please remember to submit your travel receipts by the end of the month.",
        "Our marketing figures exceeded the quarterly target for the first time."
      ],
      "choicesKo": [
        "그 시간대 동안 모든 대시보드가 일시적으로 이용 불가합니다.",
        "기존 서버는 작년에 상당한 할인가로 구매했습니다.",
        "이달 말까지 출장 영수증 제출을 잊지 마세요.",
        "우리 마케팅 수치가 처음으로 분기 목표를 초과했습니다."
      ],
      "answerIndex": 0,
      "explanation": "14일 주말 이관이라는 앞 문장을 이어받아 '그 시간대(window) 동안 대시보드 이용 불가'라는 (가)가 자연스럽게 연결되며, 뒤의 '양해에 감사' 문장과도 호응합니다. 따라서 (가)=0입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-05-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["expenses", "vacancies", "load times", "complaints"],
      "choicesKo": ["비용", "공석", "로딩 속도", "불만"],
      "answerIndex": 2,
      "explanation": "새 플랫폼이 '더 빠른' 무엇을 제공한다는 맥락이므로 성능과 관련된 load times(로딩 속도)가 정답입니다. 따라서 (다)=2입니다.",
      "category": "어휘"
    }
  ]
}
```
