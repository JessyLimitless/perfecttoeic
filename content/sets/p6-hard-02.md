# p6-hard-02 — Part 6 Memo: Warehouse Consolidation (HARD)

```json
{
  "id": "p6-hard-02",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Memo",
  "passageLines": [
    {
      "en": "MEMO: Warehouse Consolidation Project",
      "ko": "메모: 창고 통합 프로젝트"
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "Beginning in October, all inventory from our three regional warehouses will be relocated to a single automated hub in Memphis, where daily operations ------(1) by a central logistics team.",
      "ko": "10월부터 세 곳의 지역 창고에 있는 모든 재고가 멤피스의 단일 자동화 허브로 이전되며, 그곳에서 일일 운영이 중앙 물류팀에 의해 ------(1)."
    },
    {
      "en": "This new system will ultimately speed up deliveries nationwide. ------(2), staff should expect minor delays in shipping during the two-week transition.",
      "ko": "이 새 시스템은 궁극적으로 전국 배송 속도를 높일 것입니다. ------(2), 직원들은 2주간의 전환 기간 동안 배송에 약간의 지연을 예상해야 합니다."
    },
    {
      "en": "------(3)",
      "ko": "------(3)"
    },
    {
      "en": "Once the transition ------(4), the company anticipates annual savings of nearly $2 million in operating costs.",
      "ko": "전환이 ------(4) 회사는 운영비에서 연간 거의 200만 달러의 절감을 예상합니다."
    }
  ],
  "questions": [
    {
      "id": "p6-hard-02-q1",
      "prompt": "------(1)",
      "promptKo": "------(1)",
      "choices": [
        "will manage",
        "will be managed",
        "manages",
        "managing"
      ],
      "choicesKo": [
        "관리할 것이다",
        "관리될 것이다",
        "관리한다",
        "관리하는"
      ],
      "answerIndex": 1,
      "explanation": "일일 운영(operations)은 물류팀에 '의해 관리되는' 대상이므로 미래 수동태 will be managed가 필요합니다. will manage(능동)는 주어와 맞지 않습니다. 따라서 (나)=1입니다.",
      "category": "태"
    },
    {
      "id": "p6-hard-02-q2",
      "prompt": "------(2)",
      "promptKo": "------(2)",
      "choices": [
        "Therefore",
        "For example",
        "Likewise",
        "Nevertheless"
      ],
      "choicesKo": [
        "따라서",
        "예를 들어",
        "마찬가지로",
        "그럼에도 불구하고"
      ],
      "answerIndex": 3,
      "explanation": "앞 문장은 장기적으로 배송이 빨라진다는 이점을, 뒤 문장은 전환 기간의 단기 지연을 말하므로 역접의 연결어 Nevertheless가 맞습니다. Therefore(인과)·Likewise(유사)는 부적합합니다. 따라서 (라)=3입니다.",
      "category": "접속부사"
    },
    {
      "id": "p6-hard-02-q3",
      "prompt": "------(3)",
      "promptKo": "------(3)",
      "choices": [
        "The Memphis facility will also serve as our new corporate headquarters.",
        "Employees must renew their parking permits by the end of the month.",
        "These interruptions will affect only outbound shipments and should not delay internal transfers.",
        "The regional warehouses were originally constructed in the 1980s."
      ],
      "choicesKo": [
        "멤피스 시설은 또한 우리의 새 본사 역할도 하게 됩니다.",
        "직원들은 이달 말까지 주차 허가증을 갱신해야 합니다.",
        "이러한 중단은 출고 배송에만 영향을 미치며 내부 이송을 지연시키지 않을 것입니다.",
        "지역 창고들은 원래 1980년대에 건설되었습니다."
      ],
      "answerIndex": 2,
      "explanation": "앞 문장이 전환 기간의 배송 지연을 언급했으므로, 그 지연의 범위를 한정해 안심시키는 문장이 자연스럽게 이어집니다. 나머지는 문맥과 무관합니다. 따라서 (다)=2입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-02-q4",
      "prompt": "------(4)",
      "promptKo": "------(4)",
      "choices": [
        "is completed",
        "will be completed",
        "was completed",
        "completes"
      ],
      "choicesKo": [
        "완료되면(현재 수동)",
        "완료될 것이다",
        "완료되었다",
        "완료하다(능동)"
      ],
      "answerIndex": 0,
      "explanation": "시간 부사절 Once에서는 미래의 일이라도 현재시제를 쓰며, transition은 '완료되는' 대상이므로 현재 수동 is completed가 맞습니다. 따라서 (가)=0입니다.",
      "category": "시제"
    }
  ]
}
```
