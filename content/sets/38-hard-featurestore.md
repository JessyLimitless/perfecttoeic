# Internal Report: Shared Feature Store Adoption

```json
{
  "id": "set-hard-featurestore",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This report summarizes the outcomes of adopting a shared feature store across our data-science teams over the past two quarters.",
      "ko": "이 보고서는 지난 두 분기 동안 데이터 과학 팀 전반에 공유 피처 스토어를 도입한 결과를 요약한다."
    },
    {
      "en": "Previously, each team independently engineered the same customer and transaction features, duplicating effort and occasionally producing inconsistent definitions.",
      "ko": "이전에는 각 팀이 동일한 고객 및 거래 피처를 독립적으로 엔지니어링하여 작업을 중복하고 때때로 일관되지 않은 정의를 만들어 냈다."
    },
    {
      "en": "After centralizing these features in a single repository, teams now draw from identical, version-controlled inputs, and model results have become noticeably more consistent across projects.",
      "ko": "이러한 피처들을 단일 저장소에 중앙화한 후, 팀들은 이제 동일하고 버전 관리되는 입력값을 사용하며, 모델 결과는 프로젝트 전반에 걸쳐 눈에 띄게 더 일관되어졌다."
    },
    {
      "en": "The initial setup, however, demanded considerable effort, including migrating legacy pipelines and training staff on the new tooling.",
      "ko": "다만 초기 구축에는 레거시 파이프라인 마이그레이션과 새 도구에 대한 직원 교육을 포함하여 상당한 노력이 요구되었다."
    },
    {
      "en": "On balance, the leadership team concludes that the long-term gains in efficiency and reliability outweigh those one-time costs.",
      "ko": "종합적으로 경영진은 효율성과 신뢰성 측면의 장기적 이점이 그러한 일회성 비용을 능가한다고 결론짓는다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-featurestore-q1",
      "prompt": "According to the report, what was a problem before the shared feature store was adopted?",
      "promptKo": "보고서에 따르면, 공유 피처 스토어가 도입되기 전에 어떤 문제가 있었는가?",
      "choices": [
        "Different teams built the same features separately, sometimes with inconsistent definitions",
        "Teams could not access any customer data at all",
        "The company had no data-science teams",
        "Models were too small to handle transaction data"
      ],
      "choicesKo": [
        "서로 다른 팀들이 같은 피처를 따로 만들었고, 때로는 정의가 일관되지 않았다",
        "팀들이 고객 데이터에 전혀 접근할 수 없었다",
        "회사에 데이터 과학 팀이 없었다",
        "모델이 너무 작아서 거래 데이터를 처리할 수 없었다"
      ],
      "answerIndex": 0,
      "explanation": "두 번째 문장에서 각 팀이 동일한 피처를 독립적으로 만들어 작업이 중복되고 정의가 일관되지 않았다고 명시합니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-featurestore-q2",
      "prompt": "What does the report indicate about the setup of the feature store?",
      "promptKo": "보고서는 피처 스토어 구축에 대해 무엇을 나타내는가?",
      "choices": [
        "It was completed instantly with no preparation",
        "It was abandoned partway through",
        "It required substantial effort, such as migrating pipelines and training staff",
        "It was handled entirely by an outside vendor"
      ],
      "choicesKo": [
        "아무런 준비 없이 즉시 완료되었다",
        "도중에 중단되었다",
        "파이프라인 마이그레이션과 직원 교육 등 상당한 노력이 필요했다",
        "전적으로 외부 업체가 처리했다"
      ],
      "answerIndex": 2,
      "explanation": "네 번째 문장에서 초기 구축에 레거시 파이프라인 마이그레이션과 직원 교육 등 상당한 노력이 필요했다고 했습니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-featurestore-q3",
      "prompt": "What can be inferred about leadership's view of the feature store project?",
      "promptKo": "피처 스토어 프로젝트에 대한 경영진의 견해에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "They regret the decision and plan to reverse it",
        "They believe the costs will recur every quarter indefinitely",
        "They think the project had no measurable impact on model results",
        "They consider the ongoing benefits worth the initial difficulties"
      ],
      "choicesKo": [
        "그 결정을 후회하며 되돌릴 계획이다",
        "비용이 매 분기마다 무한히 반복될 것이라고 믿는다",
        "프로젝트가 모델 결과에 측정 가능한 영향을 주지 못했다고 생각한다",
        "지속적인 이점이 초기의 어려움을 감수할 만하다고 본다"
      ],
      "answerIndex": 3,
      "explanation": "마지막 문장에서 효율성과 신뢰성의 장기적 이점이 일회성 비용을 능가한다고 결론지었으므로, 경영진은 지속적 이점이 초기의 어려움을 감수할 만하다고 본다고 추론할 수 있습니다. 비용은 '일회성'이라 했으므로 비용이 매 분기 반복된다는 선택지는 틀립니다.",
      "category": "추론"
    }
  ]
}
```
