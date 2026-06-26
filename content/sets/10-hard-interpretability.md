# Set: Hard — Machine Learning Interpretability

```json
{
  "id": "set-hard-interpretability",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "In machine learning, organizations frequently confront an uncomfortable trade-off: the models that deliver the most accurate predictions are often the hardest for humans to interpret.",
      "ko": "머신러닝에서 기업들은 종종 불편한 절충에 직면한다. 가장 정확한 예측을 내놓는 모델이 흔히 인간이 해석하기에 가장 어렵다는 점이다."
    },
    {
      "en": "When a system cannot explain the reasoning behind its conclusions, many companies hesitate to rely on it for high-stakes decisions, such as approving a customer's loan application.",
      "ko": "어떤 시스템이 자신의 결론에 깔린 추론을 설명하지 못하면, 많은 기업은 고객의 대출 신청 승인과 같은 중대한 결정에 그것을 의존하기를 주저한다."
    },
    {
      "en": "To address this concern, researchers have built tools that highlight which factors most influenced a given prediction, offering a partial window into otherwise opaque systems.",
      "ko": "이러한 우려를 해소하기 위해, 연구자들은 특정 예측에 어떤 요인이 가장 큰 영향을 미쳤는지 강조해 주는 도구를 개발했으며, 이는 그렇지 않았다면 불투명했을 시스템을 들여다보는 부분적인 창을 제공한다."
    },
    {
      "en": "Even so, experts caution that these explanations are only approximations and should not be mistaken for a complete account of how the model actually arrives at its answers.",
      "ko": "그럼에도 전문가들은 이러한 설명이 근사치에 불과하며, 모델이 실제로 답에 이르는 방식에 대한 완전한 설명으로 오해해서는 안 된다고 경고한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-interpretability-q1",
      "prompt": "According to the article, what trade-off do organizations face in machine learning?",
      "promptKo": "기사에 따르면, 기업들은 머신러닝에서 어떤 절충에 직면하는가?",
      "choices": [
        "The fastest models tend to be the least secure.",
        "The cheapest models tend to require the most data.",
        "The most accurate models tend to be the most difficult to interpret.",
        "The newest models tend to be the most expensive to deploy."
      ],
      "choicesKo": [
        "가장 빠른 모델이 가장 보안이 취약한 경향이 있다.",
        "가장 저렴한 모델이 가장 많은 데이터를 필요로 하는 경향이 있다.",
        "가장 정확한 모델이 해석하기 가장 어려운 경향이 있다.",
        "가장 최신 모델이 배포 비용이 가장 비싼 경향이 있다."
      ],
      "answerIndex": 2,
      "explanation": "첫 문장에서 '가장 정확한 예측을 내놓는 모델이 흔히 인간이 해석하기에 가장 어렵다(the most accurate predictions are often the hardest for humans to interpret)'고 직접 명시하므로 정답은 (다)이다. 데이터, 보안, 비용은 본문에서 절충 대상으로 언급되지 않았다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-interpretability-q2",
      "prompt": "The word \"opaque\" in the third sentence is closest in meaning to",
      "promptKo": "셋째 문장의 단어 \"opaque\"와 의미가 가장 가까운 것은",
      "choices": [
        "difficult to understand",
        "transparent",
        "inexpensive",
        "outdated"
      ],
      "choicesKo": [
        "이해하기 어려운",
        "투명한",
        "저렴한",
        "구식의"
      ],
      "answerIndex": 0,
      "explanation": "본문은 도구가 '그렇지 않았다면 opaque했을 시스템을 들여다보는 부분적인 창'을 제공한다고 설명한다. 시스템의 추론을 설명하기 어렵다는 맥락이므로 opaque는 '이해하기 어려운(difficult to understand)'에 가깝다. 따라서 정답은 (가)이며, '투명한(transparent)'은 반대 의미이다.",
      "category": "동의어"
    },
    {
      "id": "set-hard-interpretability-q3",
      "prompt": "What do experts caution about the explanation tools?",
      "promptKo": "전문가들은 그 설명 도구에 대해 무엇을 경고하는가?",
      "choices": [
        "They are too costly for most companies to adopt.",
        "They make models slower and less accurate over time.",
        "They are required by law for all loan decisions.",
        "They provide only approximate, incomplete accounts of the model's reasoning."
      ],
      "choicesKo": [
        "대부분의 기업이 도입하기에 너무 비용이 많이 든다.",
        "시간이 지나면서 모델을 더 느리고 덜 정확하게 만든다.",
        "모든 대출 결정에 대해 법으로 의무화되어 있다.",
        "모델의 추론에 대해 근사적이고 불완전한 설명만을 제공한다."
      ],
      "answerIndex": 3,
      "explanation": "마지막 문장에서 전문가들은 이러한 설명이 '근사치에 불과하며(only approximations)' 모델이 실제로 답에 이르는 방식에 대한 '완전한 설명으로 오해해서는 안 된다'고 경고한다. 따라서 정답은 (라)이다. 비용, 속도 저하, 법적 의무는 본문에 근거가 없다.",
      "category": "추론"
    }
  ]
}
```
