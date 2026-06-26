# Set 81 — HARD — Differential Privacy (Article)

```json
{
  "id": "set-hard-diffprivacy",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "When a company publishes statistics drawn from millions of customers, it is easy to assume that no single person can be picked out of so large a crowd.",
      "ko": "어떤 회사가 수백만 명의 고객으로부터 끌어낸 통계를 발표할 때, 그렇게 큰 군중 속에서 어떤 한 사람도 골라낼 수 없다고 가정하기 쉽습니다."
    },
    {
      "en": "Yet a long line of attacks has shown that aggregate figures can leak surprising amounts about the individuals behind them.",
      "ko": "그러나 일련의 긴 공격들은 집계된 수치가 그 배후의 개인들에 관해 놀라울 만큼 많은 정보를 흘릴 수 있음을 보여 주었습니다."
    },
    {
      "en": "Differential privacy was designed to put a mathematical fence around exactly this risk.",
      "ko": "차등 프라이버시는 바로 이 위험 주위에 수학적 울타리를 두르기 위해 설계되었습니다."
    },
    {
      "en": "Its central promise is deceptively simple: the published result should look almost the same whether or not any one person's record is included in the data.",
      "ko": "그 핵심 약속은 보기보다 단순합니다. 즉 발표된 결과는 어떤 한 사람의 기록이 데이터에 포함되든 아니든 거의 동일하게 보여야 한다는 것입니다."
    },
    {
      "en": "If that condition holds, then an observer who sees the output learns essentially nothing new about whether you, specifically, were ever in the database.",
      "ko": "그 조건이 성립한다면, 출력을 보는 관찰자는 당신이 구체적으로 그 데이터베이스에 있었는지에 관해 본질적으로 아무런 새로운 것도 알아내지 못합니다."
    },
    {
      "en": "The mechanism that delivers this guarantee is, at heart, the deliberate addition of carefully calibrated noise.",
      "ko": "이 보장을 제공하는 메커니즘은 본질적으로 신중하게 조정된 잡음을 의도적으로 추가하는 것입니다."
    },
    {
      "en": "Before a count or an average is released, a small random quantity is added, just large enough to obscure any single contribution but small enough to keep the figure useful.",
      "ko": "어떤 집계나 평균이 공개되기 전에, 작은 무작위 양이 더해지는데, 이는 어떤 단일 기여를 가릴 만큼은 크지만 그 수치를 유용하게 유지할 만큼은 작습니다."
    },
    {
      "en": "The amount of protection is tuned by a single knob, conventionally written as epsilon, which quantifies the worst-case privacy loss the system will permit.",
      "ko": "보호의 정도는 관례적으로 엡실론으로 표기되는 단일 손잡이로 조정되며, 이는 시스템이 허용할 최악의 경우 프라이버시 손실을 정량화합니다."
    },
    {
      "en": "A smaller epsilon means stronger privacy but noisier, less precise answers, so practitioners must constantly negotiate this trade-off.",
      "ko": "더 작은 엡실론은 더 강한 프라이버시를 의미하지만 더 잡음이 많고 덜 정밀한 답을 뜻하므로, 실무자들은 끊임없이 이 절충을 협상해야 합니다."
    },
    {
      "en": "Crucially, the privacy cost accumulates as more queries are answered, so a fixed budget must be spent wisely across an entire analysis.",
      "ko": "결정적으로, 프라이버시 비용은 더 많은 질의에 답할수록 누적되므로, 고정된 예산은 분석 전반에 걸쳐 현명하게 지출되어야 합니다."
    },
    {
      "en": "Adopted by census bureaus and technology firms alike, the approach is no longer a laboratory curiosity but a working standard.",
      "ko": "인구조사국과 기술 기업 모두에 채택되면서, 이 접근법은 더 이상 실험실의 호기심거리가 아니라 작동하는 표준입니다."
    },
    {
      "en": "Its appeal is that privacy stops being a vague promise and becomes a quantity that can be measured, budgeted, and defended.",
      "ko": "그 매력은 프라이버시가 막연한 약속이기를 멈추고 측정되고 예산화되고 옹호될 수 있는 양이 된다는 데 있습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-diffprivacy-q1",
      "prompt": "What is the main idea of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Differential privacy protects individuals by adding calibrated noise so that aggregate results reveal little about any one person.",
        "Aggregate statistics are always safe because no individual can be identified in a large crowd.",
        "Census bureaus should stop publishing statistics to protect privacy.",
        "The only way to protect data is to delete it entirely."
      ],
      "choicesKo": [
        "차등 프라이버시는 조정된 잡음을 추가하여 집계 결과가 어느 한 사람에 관해 거의 드러내지 않도록 개인을 보호한다.",
        "집계 통계는 큰 군중 속에서 어떤 개인도 식별될 수 없으므로 항상 안전하다.",
        "인구조사국은 프라이버시를 보호하기 위해 통계 발표를 중단해야 한다.",
        "데이터를 보호하는 유일한 방법은 그것을 완전히 삭제하는 것이다."
      ],
      "answerIndex": 0,
      "explanation": "기사는 차등 프라이버시가 조정된 잡음을 더해 집계 결과가 개인에 관해 거의 드러내지 않게 한다는 점을 핵심으로 설명하므로 (가)가 정답입니다. 집계가 항상 안전하다는 (나)는 본문이 반박하는 내용입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-diffprivacy-q2",
      "prompt": "According to the article, what does the parameter epsilon quantify?",
      "promptKo": "기사에 따르면 매개변수 엡실론은 무엇을 정량화하는가?",
      "choices": [
        "The total number of records stored in the database.",
        "The worst-case privacy loss the system will permit.",
        "The processing speed of the privacy mechanism.",
        "The number of analysts allowed to query the data."
      ],
      "choicesKo": [
        "데이터베이스에 저장된 기록의 총수",
        "시스템이 허용할 최악의 경우 프라이버시 손실",
        "프라이버시 메커니즘의 처리 속도",
        "데이터를 질의하도록 허용된 분석가의 수"
      ],
      "answerIndex": 1,
      "explanation": "본문 'epsilon, which quantifies the worst-case privacy loss the system will permit'에서 엡실론이 최악의 프라이버시 손실을 정량화한다고 명시되므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-diffprivacy-q3",
      "prompt": "What can be inferred about answering many queries on the same dataset?",
      "promptKo": "동일한 데이터셋에 대해 많은 질의에 답하는 것에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "It improves privacy because the noise averages out over time.",
        "It has no effect on privacy as long as epsilon is fixed.",
        "It makes each answer more precise without any cost.",
        "It gradually uses up a limited privacy budget, so queries must be chosen carefully."
      ],
      "choicesKo": [
        "잡음이 시간이 지나며 평균화되므로 프라이버시를 향상시킨다.",
        "엡실론이 고정되어 있는 한 프라이버시에 영향을 주지 않는다.",
        "어떤 비용도 없이 각 답을 더 정밀하게 만든다.",
        "제한된 프라이버시 예산을 점차 소진시키므로 질의를 신중히 골라야 한다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 'the privacy cost accumulates as more queries are answered, so a fixed budget must be spent wisely'라고 했으므로, 질의가 예산을 소진시키며 신중히 골라야 한다는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-diffprivacy-q4",
      "prompt": "In the article, the word \"obscure\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"obscure\"와 의미가 가장 가까운 것은",
      "choices": [
        "reveal",
        "measure",
        "conceal",
        "publish"
      ],
      "choicesKo": [
        "드러내다",
        "측정하다",
        "감추다",
        "발표하다"
      ],
      "answerIndex": 2,
      "explanation": "'just large enough to obscure any single contribution'에서 'obscure'는 단일 기여를 가린다는 뜻이므로 'conceal'(감추다)이 가장 가깝습니다. 반대 의미인 'reveal'(드러내다)은 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
