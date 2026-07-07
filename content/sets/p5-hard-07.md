# p5-hard-07 — Part 5 고난도 혼합 (HARD, 가정법·도치·병치·복합관계사·분사구문·수일치·유사어휘)

```json
{
  "id": "p5-hard-07",
  "part": 5,
  "difficulty": "HARD",
  "passageType": "Incomplete Sentences",
  "passageLines": [],
  "questions": [
    {
      "id": "p5-hard-07-q1",
      "prompt": "------ the logistics team anticipated the port closure, they would have rerouted the shipment through an alternative terminal.",
      "promptKo": "물류팀이 항구 폐쇄를 예상했었더라면, 그들은 대체 터미널로 배송을 우회시켰을 것이다.",
      "choices": [
        "Had",
        "Should",
        "Were",
        "Did"
      ],
      "choicesKo": [
        "~했었더라면(과거완료 도치)",
        "~한다면",
        "~라면",
        "(틀린 형태)"
      ],
      "answerIndex": 0,
      "explanation": "주절이 'would have rerouted'(가정법 과거완료)이므로 if절도 과거완료라야 합니다. If they had anticipated에서 if를 생략하고 도치하면 Had the logistics team anticipated가 됩니다. Should/Were는 각각 미래·현재 가정에 쓰여 시제가 맞지 않습니다. 따라서 (가)=0입니다.",
      "category": "가정법"
    },
    {
      "id": "p5-hard-07-q2",
      "prompt": "Rarely ------ delivered components ahead of the contractual deadline as consistently as this vendor has.",
      "promptKo": "이 공급업체만큼 꾸준히 계약 마감일보다 앞서 부품을 납품한 공급사는 좀처럼 없었다.",
      "choices": [
        "a supplier has",
        "a supplier had",
        "has a supplier",
        "does a supplier"
      ],
      "choicesKo": [
        "(도치 아님)",
        "(도치 아님)",
        "공급사가(현재완료 도치)",
        "공급사가(단순현재 도치)"
      ],
      "answerIndex": 2,
      "explanation": "부정 부사 Rarely가 문두에 오면 주어·동사가 도치됩니다. 뒤에 'as ... has'로 현재완료 시제가 이어지고 delivered(과거분사)와 호응해야 하므로 조동사 has를 앞세운 'has a supplier delivered'가 맞습니다. 따라서 (다)=2입니다.",
      "category": "도치"
    },
    {
      "id": "p5-hard-07-q3",
      "prompt": "The compliance officer will forward the revised guidelines to ------ is responsible for onboarding new contractors.",
      "promptKo": "준법감시인은 신규 협력업체 온보딩을 담당하는 사람 누구에게든 개정된 지침을 전달할 것이다.",
      "choices": [
        "whom",
        "whoever",
        "them",
        "whomever"
      ],
      "choicesKo": [
        "~하는 사람을(목적격)",
        "~하는 누구든지(주격)",
        "그들",
        "~하는 누구든지(목적격)"
      ],
      "answerIndex": 1,
      "explanation": "전치사 to의 목적어 자리이지만, 명사절 안에서는 동사 is의 주어가 필요하므로 주격 복합관계대명사 whoever가 옵니다. 절 전체가 to의 목적어가 되며 whoever는 절 내부의 주어 역할을 합니다. whomever는 목적격이라 주어 자리에 올 수 없습니다. 따라서 (나)=1입니다.",
      "category": "관계사"
    },
    {
      "id": "p5-hard-07-q4",
      "prompt": "The negotiation succeeded not because the terms were generous but ------ both parties valued a long-term partnership.",
      "promptKo": "협상이 성공한 것은 조건이 관대해서가 아니라 양측 모두 장기적 협력관계를 중시했기 때문이다.",
      "choices": [
        "so that",
        "in spite of",
        "owing to",
        "because"
      ],
      "choicesKo": [
        "~하도록",
        "~에도 불구하고",
        "~때문에(전치사)",
        "~때문에(접속사)"
      ],
      "answerIndex": 3,
      "explanation": "'not because A but ___ B' 병치 구문으로, A가 'because + 절'이므로 B도 동일하게 'because + 절'이어야 병치가 성립합니다. owing to는 전치사라 뒤의 절(both parties valued)을 이끌 수 없습니다. 따라서 (라)=3입니다.",
      "category": "병치"
    },
    {
      "id": "p5-hard-07-q5",
      "prompt": "------ by the sudden surge in overseas orders, the manufacturer expanded its production line within a month.",
      "promptKo": "해외 주문의 갑작스러운 급증에 고무되어, 제조사는 한 달 안에 생산 라인을 확장했다.",
      "choices": [
        "Encouraged",
        "Encouraging",
        "To encourage",
        "Encouragement"
      ],
      "choicesKo": [
        "고무되어(과거분사)",
        "고무하면서(현재분사)",
        "고무하기 위해",
        "격려(명사)"
      ],
      "answerIndex": 0,
      "explanation": "분사구문의 의미상 주어는 the manufacturer이고, 제조사는 급증에 의해 '고무되는' 대상이므로 수동의 과거분사 Encouraged가 옵니다. 뒤에 'by ...'가 이어지는 것도 수동태의 단서입니다. 따라서 (가)=0입니다.",
      "category": "분사"
    },
    {
      "id": "p5-hard-07-q6",
      "prompt": "The auditor found that neither the invoices nor the shipping log ------ the discrepancy reported by the warehouse.",
      "promptKo": "감사관은 송장도 배송 기록도 창고에서 보고된 불일치를 설명하지 못한다는 것을 발견했다.",
      "choices": [
        "explain",
        "have explained",
        "explains",
        "were explaining"
      ],
      "choicesKo": [
        "설명한다(복수)",
        "설명해 왔다(복수)",
        "설명한다(단수)",
        "설명하고 있었다(복수)"
      ],
      "answerIndex": 2,
      "explanation": "'neither A nor B' 구문에서 동사는 가장 가까운 주어 B(the shipping log, 단수)에 수일치합니다. 따라서 3인칭 단수 현재형 explains가 맞습니다. 따라서 (다)=2입니다.",
      "category": "수일치"
    },
    {
      "id": "p5-hard-07-q7",
      "prompt": "------ complex the regulatory requirements become, the legal department is committed to ensuring full compliance.",
      "promptKo": "규제 요건이 아무리 복잡해지더라도, 법무팀은 완전한 준수를 보장하는 데 전념한다.",
      "choices": [
        "Whatever",
        "However",
        "Whenever",
        "Whichever"
      ],
      "choicesKo": [
        "무엇이든",
        "아무리 ~해도(형용사 수식)",
        "언제든지",
        "어느 것이든"
      ],
      "answerIndex": 1,
      "explanation": "'However + 형용사(complex) + 주어 + 동사'는 '아무리 ~하더라도'라는 양보를 나타냅니다. However가 형용사 complex를 수식하며 문두로 함께 이동한 구조입니다. Whatever는 명사를 수식하거나 대신하므로 형용사 앞에 올 수 없습니다. 따라서 (나)=1입니다.",
      "category": "관계사"
    },
    {
      "id": "p5-hard-07-q8",
      "prompt": "The marketing director's proposal was so ------ that even the most skeptical board members endorsed it without reservation.",
      "promptKo": "마케팅 이사의 제안은 매우 설득력이 있어서 가장 회의적인 이사진조차 주저 없이 지지했다.",
      "choices": [
        "compelled",
        "compel",
        "compulsion",
        "compelling"
      ],
      "choicesKo": [
        "강요된",
        "강요하다(동사)",
        "강박(명사)",
        "설득력 있는(형용사)"
      ],
      "answerIndex": 3,
      "explanation": "'so + 형용사 + that절'(너무 ~해서 …하다) 구문으로, be동사 was의 보어 자리에 형용사가 필요합니다. compelling(설득력 있는)이 제안을 능동적으로 묘사하며, compelled(강요된)는 의미가 어색합니다. 따라서 형용사 compelling (라)=3입니다.",
      "category": "어휘"
    },
    {
      "id": "p5-hard-07-q9",
      "prompt": "The relocation plan calls for the finance and IT teams to coordinate their schedules, ------ minimizing downtime during the transition.",
      "promptKo": "이전 계획은 재무팀과 IT팀이 일정을 조율하여 전환 기간 동안 가동 중단을 최소화할 것을 요구한다.",
      "choices": [
        "whereas",
        "moreover",
        "thereby",
        "nonetheless"
      ],
      "choicesKo": [
        "~인 반면",
        "게다가",
        "그렇게 함으로써",
        "그럼에도 불구하고"
      ],
      "answerIndex": 2,
      "explanation": "앞 절의 행위(일정 조율)가 뒤의 결과(가동 중단 최소화)로 이어지므로 'thereby + 분사(minimizing)' 구조가 적합합니다. thereby는 분사와 결합해 '그렇게 함으로써 ~하는' 결과를 나타냅니다. whereas/nonetheless는 대조·양보라 결과의 흐름과 맞지 않습니다. 따라서 (다)=2입니다.",
      "category": "부사"
    },
    {
      "id": "p5-hard-07-q10",
      "prompt": "Only after the merger had been finalized ------ that the two firms shared several overlapping suppliers.",
      "promptKo": "합병이 마무리되고 나서야 비로소 두 회사가 여러 중복된 공급업체를 공유하고 있다는 사실이 드러났다.",
      "choices": [
        "did it become apparent",
        "it became apparent",
        "it had become apparent",
        "became it apparent"
      ],
      "choicesKo": [
        "비로소 분명해졌다(도치)",
        "분명해졌다(평서)",
        "분명해졌었다(평서)",
        "(틀린 어순)"
      ],
      "answerIndex": 0,
      "explanation": "'Only after ...'가 문두에 오면 주절의 주어·동사가 도치되어 'did + 주어 + 동사원형' 형태가 됩니다. 가주어 it을 써서 did it become apparent가 맞고, became it apparent는 조동사 없는 잘못된 도치입니다. 따라서 (가)=0입니다.",
      "category": "도치"
    }
  ]
}
```
