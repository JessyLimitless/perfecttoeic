# Set 74 — HARD — Active Learning (Report)

```json
{
  "id": "set-hard-activelearning",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This report summarizes a three-month pilot in which our annotation team adopted active learning to decide which examples to label next for the customer-intent classifier.",
      "ko": "이 보고서는 주석 작업 팀이 고객 의도 분류기를 위해 다음에 어떤 예시에 라벨을 달지 결정하기 위해 능동 학습을 도입한 3개월 시범 사업을 요약한다."
    },
    {
      "en": "Under our previous workflow, annotators labeled incoming tickets in roughly the order they arrived, treating every example as equally worth their time.",
      "ko": "이전 작업 방식에서는 주석 작업자들이 들어오는 문의를 대체로 도착한 순서대로 라벨링했으며, 모든 예시가 똑같이 시간을 들일 가치가 있다고 여겼다."
    },
    {
      "en": "Active learning challenges that assumption by letting the model itself nominate the examples it finds most informative, typically the ones it is least certain about.",
      "ko": "능동 학습은 모델 스스로가 가장 유익하다고 판단하는 예시들, 즉 대개 가장 확신이 없는 예시들을 지명하게 함으로써 그 가정에 도전한다."
    },
    {
      "en": "In each cycle, the current model scored a large pool of unlabeled tickets, and the system routed the most uncertain cases to human annotators first.",
      "ko": "각 주기마다 현재 모델이 라벨이 없는 다수의 문의 풀에 점수를 매겼고, 시스템은 가장 불확실한 사례들을 인간 주석 작업자에게 먼저 보냈다."
    },
    {
      "en": "The intuition is that confidently classified examples teach the model little, whereas the borderline cases sharpen the decision boundary where it matters most.",
      "ko": "그 직관은 자신 있게 분류된 예시는 모델에게 거의 가르쳐 주는 것이 없는 반면, 경계선상의 사례들은 가장 중요한 지점에서 결정 경계를 날카롭게 다듬는다는 것이다."
    },
    {
      "en": "The results were encouraging: the classifier reached its previous accuracy target using forty percent fewer labeled examples than the sequential baseline required.",
      "ko": "결과는 고무적이었다. 분류기는 순차적 기준선이 요구했던 것보다 40퍼센트 적은 라벨링 예시로 이전의 정확도 목표에 도달했다."
    },
    {
      "en": "That reduction translated directly into annotation hours saved, which is significant given that labeling is our most expensive and slowest bottleneck.",
      "ko": "그 감소는 곧바로 절약된 주석 작업 시간으로 이어졌으며, 이는 라벨링이 우리의 가장 비싸고 가장 느린 병목이라는 점을 고려하면 중요하다."
    },
    {
      "en": "We did, however, observe an important caveat that tempers our enthusiasm.",
      "ko": "다만 우리는 우리의 열의를 누그러뜨리는 중요한 단서 하나를 관찰했다."
    },
    {
      "en": "Because the model repeatedly requested examples near its own uncertainty, rare but unambiguous intents were sampled far less often, leaving a few minority categories underrepresented.",
      "ko": "모델이 자신의 불확실성 부근의 예시를 반복적으로 요청했기 때문에, 드물지만 명확한 의도들은 훨씬 덜 추출되었고, 결과적으로 일부 소수 범주가 과소 대표되는 상태로 남았다."
    },
    {
      "en": "We mitigated this by reserving a fixed share of each cycle for randomly chosen tickets, ensuring broad coverage even as uncertainty sampling drove the rest.",
      "ko": "우리는 각 주기의 일정 비율을 무작위로 선택된 문의에 할당함으로써 이를 완화했고, 불확실성 표집이 나머지를 주도하더라도 폭넓은 범위를 보장했다."
    },
    {
      "en": "We recommend rolling active learning out to the two remaining classifiers next quarter, paired with this random reserve to guard against the blind spots we encountered.",
      "ko": "우리는 다음 분기에 남은 두 개의 분류기에도 능동 학습을 확대 적용할 것을 권장하며, 우리가 마주친 사각지대를 막기 위해 이 무작위 예비분과 짝을 이룰 것을 제안한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-activelearning-q1",
      "prompt": "What is the report mainly about?",
      "promptKo": "이 보고서는 주로 무엇에 관한 것인가?",
      "choices": [
        "A pilot evaluating active learning for choosing which examples to label, including its benefits and a caveat.",
        "A complaint that the annotation team is too slow to be useful.",
        "A proposal to stop labeling data altogether and rely on the model.",
        "A comparison of two competing customer-service software vendors."
      ],
      "choicesKo": [
        "어떤 예시에 라벨을 달지 고르기 위한 능동 학습을 평가한 시범 사업으로, 그 이점과 단서를 포함함",
        "주석 작업 팀이 쓸모없을 만큼 느리다는 불만",
        "데이터 라벨링을 완전히 중단하고 모델에 의존하자는 제안",
        "경쟁하는 두 고객 서비스 소프트웨어 공급업체의 비교"
      ],
      "answerIndex": 0,
      "explanation": "도입부에서 다음에 어떤 예시에 라벨을 달지 결정하기 위한 능동 학습 시범 사업을 요약한다고 밝히고, 본문이 이점과 단서를 함께 다루므로 (가)가 주제입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-activelearning-q2",
      "prompt": "According to the report, what kinds of examples does active learning prioritize for labeling?",
      "promptKo": "보고서에 따르면 능동 학습은 어떤 종류의 예시에 라벨링 우선순위를 두는가?",
      "choices": [
        "The longest tickets regardless of content.",
        "The examples that arrived earliest in the queue.",
        "The examples the model classifies most confidently.",
        "The examples the model is least certain about."
      ],
      "choicesKo": [
        "내용과 무관하게 가장 긴 문의",
        "대기열에 가장 먼저 도착한 예시",
        "모델이 가장 자신 있게 분류하는 예시",
        "모델이 가장 확신하지 못하는 예시"
      ],
      "answerIndex": 3,
      "explanation": "본문은 능동 학습이 '가장 유익하다고 판단하는 예시들, 즉 대개 가장 확신이 없는 예시들'을 지명한다고 했으므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-activelearning-q3",
      "prompt": "Why did the team reserve part of each cycle for randomly chosen tickets?",
      "promptKo": "팀은 왜 각 주기의 일부를 무작위로 선택된 문의에 할당했는가?",
      "choices": [
        "To make the labeling process slower on purpose.",
        "To prevent rare categories from being underrepresented by uncertainty sampling.",
        "To reduce the overall accuracy of the classifier.",
        "To eliminate the need for human annotators entirely."
      ],
      "choicesKo": [
        "라벨링 과정을 일부러 더 느리게 하기 위해",
        "불확실성 표집으로 인해 드문 범주가 과소 대표되는 것을 막기 위해",
        "분류기의 전반적 정확도를 낮추기 위해",
        "인간 주석 작업자의 필요성을 완전히 없애기 위해"
      ],
      "answerIndex": 1,
      "explanation": "본문은 불확실성 부근만 반복 요청하면 소수 범주가 과소 대표된다고 지적한 뒤, 이를 완화하려 무작위 예비분을 두어 폭넓은 범위를 보장했다고 했으므로 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-activelearning-q4",
      "prompt": "In the report, the word \"caveat\" is closest in meaning to",
      "promptKo": "보고서에서 \"caveat\"라는 단어와 의미가 가장 가까운 것은",
      "choices": [
        "an unconditional guarantee",
        "a financial reward",
        "a cautionary qualification",
        "a routine schedule"
      ],
      "choicesKo": [
        "무조건적인 보장",
        "금전적 보상",
        "주의를 요하는 단서",
        "일상적인 일정"
      ],
      "answerIndex": 2,
      "explanation": "'an important caveat that tempers our enthusiasm'에서 caveat은 열의를 누그러뜨리는 주의할 단서를 뜻하므로 'a cautionary qualification'이 가장 가깝고, 'an unconditional guarantee'는 반대 의미의 함정입니다. 따라서 (다)가 정답입니다.",
      "category": "동의어"
    }
  ]
}
```
