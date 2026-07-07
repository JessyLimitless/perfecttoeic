# p6-hard-11 — Part 6 Notice: Data Center Maintenance (HARD, 관계사·어휘·문장삽입·태)

```json
{
  "id": "p6-hard-11",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    { "en": "Scheduled Maintenance Notice", "ko": "예정 유지보수 안내" },
    { "en": "Our primary data center, ------(1) hosts most customer-facing applications, will undergo cooling-system upgrades this Saturday.", "ko": "대부분의 고객 대면 애플리케이션을 호스팅하는 저희 주요 데이터 센터가 ______(1) 이번 토요일에 냉각 시스템 업그레이드를 진행합니다." },
    { "en": "During the work, services may experience brief ------(2) rather than a full outage.", "ko": "작업 중에는 서비스가 완전 중단이 아니라 짧은 ______(2)을 겪을 수 있습니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "A summary of the results ------(4) to all account managers by Monday morning.", "ko": "결과 요약이 월요일 오전까지 모든 어카운트 매니저에게 ______(4)." }
  ],
  "questions": [
    {
      "id": "p6-hard-11-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["that", "which", "what", "it"],
      "choicesKo": ["~하는(that)", "~하는(which, 계속적)", "~하는 것", "그것"],
      "answerIndex": 1,
      "explanation": "콤마로 삽입된 계속적 용법의 관계절이므로 which가 정답입니다. that은 계속적 용법에 쓸 수 없습니다. 따라서 (나)=1입니다.",
      "category": "관계사"
    },
    {
      "id": "p6-hard-11-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["expansions", "promotions", "slowdowns", "openings"],
      "choicesKo": ["확장", "승진", "속도 저하", "개장"],
      "answerIndex": 2,
      "explanation": "'완전 중단이 아니라 짧은 무엇'이라는 대비 구조에서 성능 저하를 뜻하는 slowdowns(속도 저하)가 정답입니다. 따라서 (다)=2입니다.",
      "category": "어휘"
    },
    {
      "id": "p6-hard-11-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "The new coffee machine on the third floor is now operational.",
        "Employee parking will be repainted over the same weekend.",
        "The company newsletter is published on the first of each month.",
        "We recommend scheduling any large data exports before Friday evening."
      ],
      "choicesKo": [
        "3층의 새 커피 머신이 이제 작동합니다.",
        "직원 주차장이 같은 주말에 재도색됩니다.",
        "회사 소식지는 매월 1일에 발행됩니다.",
        "대용량 데이터 내보내기는 금요일 저녁 이전에 예약하시길 권장합니다."
      ],
      "answerIndex": 3,
      "explanation": "토요일 유지보수로 서비스 속도 저하가 예상된다는 흐름에서, 사용자에게 '대용량 데이터 작업은 금요일 저녁 전에 하라'고 실질 조언을 주는 문장이 문맥상 정답입니다. 나머지는 유지보수와 무관합니다. 따라서 (라)=3입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-11-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["distributes", "will be distributed", "has distributed", "distributing"],
      "choicesKo": ["배포한다", "배포될 것이다", "배포해 왔다", "배포하는"],
      "answerIndex": 1,
      "explanation": "주어 summary는 배포를 '받는' 대상이고 월요일 오전까지라는 미래 시점이므로 미래 수동태 will be distributed가 정답입니다. 따라서 (나)=1입니다.",
      "category": "태"
    }
  ]
}
```
