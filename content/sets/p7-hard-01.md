# p7-hard-01 — Part 7 Double Passage (HARD)

```json
{
  "id": "p7-hard-01",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    {
      "en": "[Passage 1 — Email]",
      "ko": "[지문 1 — 이메일]"
    },
    {
      "en": "To: Daniel Cho, Operations Director",
      "ko": "수신: 운영 이사 대니얼 조"
    },
    {
      "en": "From: Helena Voss, Data Strategy Lead",
      "ko": "발신: 데이터 전략 책임자 헬레나 보스"
    },
    {
      "en": "Subject: Vendor Recommendation for the Analytics Platform",
      "ko": "제목: 분석 플랫폼 공급업체 추천"
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "Daniel, following our evaluation of four vendors, I recommend we proceed with Northwind Analytics.",
      "ko": "대니얼, 네 곳의 공급업체를 평가한 결과, 저는 노스윈드 애널리틱스로 진행할 것을 추천합니다."
    },
    {
      "en": "Although their annual fee is the second highest, they were the only vendor to offer real-time dashboards and on-site training at no extra cost.",
      "ko": "그들의 연간 비용은 두 번째로 높지만, 추가 비용 없이 실시간 대시보드와 현장 교육을 제공한 유일한 공급업체였습니다."
    },
    {
      "en": "The cheaper alternative, Brightpath, lacks the integration features our forecasting team requires.",
      "ko": "더 저렴한 대안인 브라이트패스는 우리 예측팀이 요구하는 통합 기능이 부족합니다."
    },
    {
      "en": "I would like your approval before the July 15 budget deadline.",
      "ko": "7월 15일 예산 마감 전에 승인해 주시기를 바랍니다."
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "[Passage 2 — Reply]",
      "ko": "[지문 2 — 회신]"
    },
    {
      "en": "To: Helena Voss",
      "ko": "수신: 헬레나 보스"
    },
    {
      "en": "From: Daniel Cho",
      "ko": "발신: 대니얼 조"
    },
    {
      "en": "Subject: RE: Vendor Recommendation for the Analytics Platform",
      "ko": "제목: RE: 분석 플랫폼 공급업체 추천"
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "Helena, I agree that real-time dashboards are essential, so I approve your recommendation.",
      "ko": "헬레나, 실시간 대시보드가 필수적이라는 데 동의하므로 당신의 추천을 승인합니다."
    },
    {
      "en": "However, the budget committee has asked that we cap first-year spending at $90,000.",
      "ko": "다만, 예산 위원회는 첫해 지출을 9만 달러로 제한할 것을 요청했습니다."
    },
    {
      "en": "Since the vendor you selected charges $95,000 annually, please negotiate a discount or remove a non-essential module.",
      "ko": "당신이 선택한 공급업체가 연 9만 5천 달러를 청구하므로, 할인을 협상하거나 비필수 모듈을 제거해 주십시오."
    },
    {
      "en": "Send me the revised figure by July 13 so I can confirm before the deadline.",
      "ko": "마감 전에 확정할 수 있도록 7월 13일까지 수정된 금액을 보내 주십시오."
    }
  ],
  "questions": [
    {
      "id": "p7-hard-01-q1",
      "prompt": "Why did Ms. Voss recommend Northwind Analytics?",
      "promptKo": "보스 씨는 왜 노스윈드 애널리틱스를 추천했는가?",
      "choices": [
        "It was recommended by the budget committee.",
        "It uniquely offered real-time dashboards and free on-site training.",
        "It had the lowest annual fee of all vendors.",
        "It was the only vendor based locally."
      ],
      "choicesKo": [
        "예산 위원회가 추천했기 때문에",
        "실시간 대시보드와 무료 현장 교육을 유일하게 제공했기 때문에",
        "모든 공급업체 중 연간 비용이 가장 낮았기 때문에",
        "유일하게 지역에 기반을 둔 공급업체였기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "첫 이메일에서 노스윈드가 추가 비용 없이 실시간 대시보드와 현장 교육을 제공한 유일한 업체라고 했습니다. 비용은 두 번째로 높으므로 가장 저렴하지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-01-q2",
      "prompt": "What can be inferred about Northwind's annual fee?",
      "promptKo": "노스윈드의 연간 비용에 대해 추론할 수 있는 것은?",
      "choices": [
        "It includes a mandatory discount.",
        "It is lower than Brightpath's fee.",
        "It is exactly $90,000.",
        "It exceeds the budget committee's first-year cap."
      ],
      "choicesKo": [
        "의무 할인이 포함되어 있다.",
        "브라이트패스의 비용보다 낮다.",
        "정확히 9만 달러이다.",
        "예산 위원회의 첫해 상한을 초과한다."
      ],
      "answerIndex": 3,
      "explanation": "두 번째 지문에서 상한은 9만 달러이고 노스윈드는 연 9만 5천 달러를 청구한다고 했으므로, 비용이 상한을 초과한다고 추론됩니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-01-q3",
      "prompt": "What does Mr. Cho ask Ms. Voss to do?",
      "promptKo": "조 씨는 보스 씨에게 무엇을 하도록 요청하는가?",
      "choices": [
        "Select the cheaper vendor, Brightpath",
        "Cancel the on-site training",
        "Negotiate a discount or remove a non-essential module",
        "Postpone the budget deadline"
      ],
      "choicesKo": [
        "더 저렴한 공급업체인 브라이트패스를 선택한다",
        "현장 교육을 취소한다",
        "할인을 협상하거나 비필수 모듈을 제거한다",
        "예산 마감을 연기한다"
      ],
      "answerIndex": 2,
      "explanation": "조 씨는 상한 초과 금액에 대해 '할인 협상 또는 비필수 모듈 제거'를 요청했습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-01-q4",
      "prompt": "What is indicated about the two deadlines mentioned?",
      "promptKo": "언급된 두 마감일에 대해 알 수 있는 것은?",
      "choices": [
        "The revised figure is due before the budget deadline.",
        "Both deadlines fall on the same day.",
        "The budget deadline is earlier than July 13.",
        "Ms. Voss set both deadlines herself."
      ],
      "choicesKo": [
        "수정 금액 제출 기한이 예산 마감보다 앞선다.",
        "두 마감일은 같은 날이다.",
        "예산 마감은 7월 13일보다 빠르다.",
        "보스 씨가 두 마감일을 모두 정했다."
      ],
      "answerIndex": 0,
      "explanation": "예산 마감은 7월 15일, 조 씨가 요청한 수정 금액 제출 기한은 7월 13일이므로 수정 금액 기한이 예산 마감보다 앞섭니다. 따라서 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-01-q5",
      "prompt": "What is NOT true according to the passages?",
      "promptKo": "지문에 따르면 사실이 아닌 것은?",
      "choices": [
        "The budget committee set a spending cap.",
        "Brightpath offered free on-site training.",
        "Northwind provides real-time dashboards.",
        "Mr. Cho approved Ms. Voss's recommendation."
      ],
      "choicesKo": [
        "예산 위원회가 지출 상한을 정했다.",
        "브라이트패스는 무료 현장 교육을 제공했다.",
        "노스윈드는 실시간 대시보드를 제공한다.",
        "조 씨는 보스 씨의 추천을 승인했다."
      ],
      "answerIndex": 1,
      "explanation": "현장 교육과 실시간 대시보드를 무료로 제공한 곳은 노스윈드이며, 브라이트패스는 통합 기능이 부족하다고만 언급됩니다. 따라서 브라이트패스가 무료 현장 교육을 제공했다는 것은 사실이 아닙니다. (나)=1입니다.",
      "category": "사실확인"
    }
  ]
}
```
