# p6-hard-07 — Part 6 Memo: Model Deployment Freeze (HARD, 준동사·접속부사·어휘·문장삽입)

```json
{
  "id": "p6-hard-07",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Memo",
  "passageLines": [
    { "en": "MEMO — To: Machine Learning Engineers", "ko": "메모 — 받는 사람: 머신러닝 엔지니어" },
    { "en": "Management has decided ------(1) all production model deployments until the new review checklist is finalized.", "ko": "경영진은 새 검토 체크리스트가 확정될 때까지 모든 프로덕션 모델 배포를 ______(1) 결정했습니다." },
    { "en": "The freeze is precautionary; ------(2), no current models are believed to be at risk.", "ko": "이번 중단은 예방적 조치이며, ______(2) 현재 어떤 모델도 위험하다고 보지 않습니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "Any deployment considered urgent must receive written ------(4) from the director before proceeding.", "ko": "긴급하다고 판단되는 배포는 진행 전 반드시 이사의 서면 ______(4)을 받아야 합니다." }
  ],
  "questions": [
    {
      "id": "p6-hard-07-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["pausing", "paused", "pause", "to pause"],
      "choicesKo": ["멈추는 것(동명사)", "멈춰진", "멈추다", "멈추는 것(부정사)"],
      "answerIndex": 3,
      "explanation": "동사 decide는 to부정사를 목적어로 취하므로 to pause가 정답입니다. 따라서 (라)=3입니다.",
      "category": "준동사"
    },
    {
      "id": "p6-hard-07-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["therefore", "in fact", "otherwise", "instead"],
      "choicesKo": ["그러므로", "실제로", "그렇지 않으면", "대신에"],
      "answerIndex": 1,
      "explanation": "'예방적 조치'라는 앞 내용을 부연·강조해 '실제로 위험한 모델은 없다'로 이어지므로 in fact가 정답입니다. therefore는 인과가 아니어서 어색합니다. 따라서 (나)=1입니다.",
      "category": "접속부사"
    },
    {
      "id": "p6-hard-07-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "The annual company picnic has been moved to the second Saturday of June.",
        "Sales in the eastern region declined slightly last month.",
        "We expect the checklist to be ready within two weeks.",
        "The cafeteria now accepts contactless payment only."
      ],
      "choicesKo": [
        "연례 회사 야유회가 6월 둘째 주 토요일로 옮겨졌습니다.",
        "동부 지역 매출이 지난달 소폭 감소했습니다.",
        "체크리스트는 2주 이내에 준비될 것으로 예상됩니다.",
        "구내식당은 이제 비접촉 결제만 받습니다."
      ],
      "answerIndex": 2,
      "explanation": "'체크리스트가 확정될 때까지 배포 중단'이라는 흐름에서 '체크리스트가 2주 내 준비될 것'이라는 (다)가 기간 정보를 자연스럽게 보충하며, 뒤의 긴급 배포 예외 안내로 이어집니다. 따라서 (다)=2입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-07-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["approval", "refusal", "reminder", "estimate"],
      "choicesKo": ["승인", "거절", "알림", "견적"],
      "answerIndex": 0,
      "explanation": "긴급 배포는 진행 전 이사의 서면 무엇을 받아야 한다는 맥락이므로 approval(승인)이 정답입니다. 따라서 (가)=0입니다.",
      "category": "어휘"
    }
  ]
}
```
