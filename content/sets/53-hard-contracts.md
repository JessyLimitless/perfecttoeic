# Introducing Data Contracts Between Producer and Consumer Teams

```json
{
  "id": "set-hard-contracts",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This report evaluates our six-month pilot of data contracts across the platform and recommendation engineering groups.",
      "ko": "이 보고서는 플랫폼 그룹과 추천 엔지니어링 그룹 전반에 걸친 데이터 계약의 6개월 시범 운영을 평가합니다."
    },
    {
      "en": "A data contract is a formal, version-controlled agreement that specifies the schema, semantics, and quality guarantees a producing team promises to its consumers.",
      "ko": "데이터 계약이란 생산 팀이 소비자에게 약속하는 스키마, 의미론, 그리고 품질 보증을 명시하는 공식적이고 버전 관리되는 합의입니다."
    },
    {
      "en": "Before the pilot, schema changes were often deployed without warning, and consumers discovered them only when their pipelines broke in production.",
      "ko": "시범 운영 이전에는 스키마 변경이 경고 없이 배포되는 경우가 많았고, 소비자들은 운영 환경에서 파이프라인이 중단되었을 때에야 비로소 그 변경을 발견했습니다."
    },
    {
      "en": "By requiring producers to declare any breaking change in advance, the contract shifts the cost of coordination earlier, before code is shipped.",
      "ko": "생산자가 모든 중대한 변경을 사전에 선언하도록 요구함으로써, 계약은 코드가 출시되기 전인 더 이른 시점으로 조정 비용을 옮깁니다."
    },
    {
      "en": "Across the pilot, incidents attributable to unannounced schema changes fell by roughly seventy percent compared with the preceding two quarters.",
      "ko": "시범 운영 기간 동안, 예고되지 않은 스키마 변경에 기인한 사고는 직전 두 분기와 비교하여 약 70퍼센트 감소했습니다."
    },
    {
      "en": "That improvement, however, did not come without cost.",
      "ko": "그러나 그 개선이 비용 없이 이루어진 것은 아닙니다."
    },
    {
      "en": "Producing teams reported that drafting and negotiating contracts added a meaningful overhead to their release cycle, occasionally delaying otherwise routine updates.",
      "ko": "생산 팀들은 계약을 작성하고 협상하는 것이 출시 주기에 상당한 오버헤드를 더했으며, 때로는 평소 같으면 일상적이었을 업데이트를 지연시켰다고 보고했습니다."
    },
    {
      "en": "Some engineers initially perceived the process as bureaucratic, though that sentiment softened once the early-warning benefit became apparent.",
      "ko": "일부 엔지니어들은 처음에 그 과정을 관료적이라고 인식했지만, 사전 경고의 이점이 분명해지자 그러한 정서는 누그러졌습니다."
    },
    {
      "en": "We also observed that contracts are most valuable for interfaces with many consumers, where a single careless change can cascade widely.",
      "ko": "우리는 또한 계약이 소비자가 많은 인터페이스에서 가장 가치 있다는 점을 관찰했는데, 그곳에서는 단 하나의 부주의한 변경이 광범위하게 연쇄적으로 파급될 수 있기 때문입니다."
    },
    {
      "en": "For low-traffic internal datasets with a single consumer, the coordination overhead may outweigh the protection the contract provides.",
      "ko": "단일 소비자를 가진 트래픽이 적은 내부 데이터셋의 경우, 조정 오버헤드가 계약이 제공하는 보호를 능가할 수 있습니다."
    },
    {
      "en": "Accordingly, we propose mandating contracts only for datasets that cross team boundaries or serve external partners.",
      "ko": "따라서 우리는 팀 경계를 넘나들거나 외부 파트너에게 서비스를 제공하는 데이터셋에 한해서만 계약을 의무화할 것을 제안합니다."
    },
    {
      "en": "On balance, the pilot demonstrates that data contracts are a prudent investment when applied selectively rather than imposed uniformly.",
      "ko": "종합적으로, 이 시범 운영은 데이터 계약이 일률적으로 부과되기보다는 선별적으로 적용될 때 신중한 투자임을 입증합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-contracts-q1",
      "prompt": "What is the main idea of the report?",
      "promptKo": "이 보고서의 요지는 무엇입니까?",
      "choices": [
        "Data contracts should be abolished because they slow releases",
        "Data contracts reduce incidents but add overhead, and should be applied selectively",
        "Schema changes can never be coordinated effectively between teams",
        "External partners should manage all data contracts themselves"
      ],
      "choicesKo": [
        "데이터 계약은 출시를 늦추므로 폐지되어야 한다",
        "데이터 계약은 사고를 줄이지만 오버헤드를 더하므로 선별적으로 적용되어야 한다",
        "스키마 변경은 팀 간에 결코 효과적으로 조정될 수 없다",
        "외부 파트너가 모든 데이터 계약을 직접 관리해야 한다"
      ],
      "answerIndex": 1,
      "explanation": "마지막 문장 'data contracts are a prudent investment when applied selectively rather than imposed uniformly'와 사고 70퍼센트 감소(이점) 및 오버헤드 보고(비용)를 종합하면, 사고를 줄이되 오버헤드가 있어 선별 적용해야 한다는 2번이 요지입니다. 폐지 주장(1번)이나 조정 불가능(3번)은 본문과 배치됩니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-contracts-q2",
      "prompt": "What does the report state about incidents during the pilot?",
      "promptKo": "보고서는 시범 운영 기간의 사고에 대해 무엇이라고 말합니까?",
      "choices": [
        "They were eliminated entirely",
        "They increased because of the new process",
        "They remained unchanged from previous quarters",
        "They fell by roughly seventy percent compared with the preceding two quarters"
      ],
      "choicesKo": [
        "완전히 제거되었다",
        "새로운 과정 때문에 증가했다",
        "이전 분기들과 변동이 없었다",
        "직전 두 분기와 비교하여 약 70퍼센트 감소했다"
      ],
      "answerIndex": 3,
      "explanation": "'incidents attributable to unannounced schema changes fell by roughly seventy percent compared with the preceding two quarters'에서 약 70퍼센트 감소했다고 명시하므로 정답은 2번입니다. 완전히 제거(4번)가 아니라 감소한 것입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-contracts-q3",
      "prompt": "What can be inferred about applying contracts to a low-traffic dataset with a single consumer?",
      "promptKo": "단일 소비자를 가진 트래픽이 적은 데이터셋에 계약을 적용하는 것에 대해 무엇을 추론할 수 있습니까?",
      "choices": [
        "It is always the highest priority for the team",
        "It must be reviewed by an external partner",
        "Its benefit may not justify the coordination effort required",
        "It causes more incidents than high-traffic interfaces"
      ],
      "choicesKo": [
        "그것은 항상 팀의 최우선 과제이다",
        "그것은 외부 파트너의 검토를 받아야 한다",
        "그 이점이 요구되는 조정 노력을 정당화하지 못할 수 있다",
        "그것은 트래픽이 많은 인터페이스보다 더 많은 사고를 일으킨다"
      ],
      "answerIndex": 2,
      "explanation": "'For low-traffic internal datasets with a single consumer, the coordination overhead may outweigh the protection the contract provides'에서 오버헤드가 보호를 능가할 수 있다고 했으므로, 이점이 노력을 정당화하지 못할 수 있다는 2번을 추론할 수 있습니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-contracts-q4",
      "prompt": "The word \"cascade\" in the ninth sentence is closest in meaning to",
      "promptKo": "아홉 번째 문장의 단어 \"cascade\"와 의미가 가장 가까운 것은?",
      "choices": [
        "spread through many systems",
        "remain contained",
        "be documented",
        "improve quality"
      ],
      "choicesKo": [
        "여러 시스템으로 퍼지다",
        "억제된 채로 남다",
        "문서화되다",
        "품질을 개선하다"
      ],
      "answerIndex": 0,
      "explanation": "'a single careless change can cascade widely'에서 cascade는 변경이 광범위하게 연쇄적으로 퍼진다는 의미이므로 'spread through many systems'가 정답(2번)입니다. 'remain contained(억제된 채로 남다)'는 정반대 의미의 오답 함정입니다.",
      "category": "동의어"
    }
  ]
}
```
