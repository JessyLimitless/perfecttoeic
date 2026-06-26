# Set 55 — HARD — Governing Synthetic Data (Article)

```json
{
  "id": "set-hard-synthgov",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "As organizations accumulate ever more sensitive records, synthetic data has emerged as one of the most discussed instruments for unlocking that information without exposing the individuals behind it.",
      "ko": "조직들이 점점 더 많은 민감한 기록을 축적함에 따라, 합성 데이터는 그 정보 뒤에 있는 개인을 노출하지 않으면서 정보를 활용하기 위한 가장 많이 논의되는 수단 중 하나로 부상했습니다."
    },
    {
      "en": "The basic idea is appealing: rather than sharing a real customer or patient table, a generative model learns the statistical structure of the original and produces artificial records that resemble it but correspond to no actual person.",
      "ko": "기본 발상은 매력적입니다. 즉, 실제 고객이나 환자 표를 공유하는 대신, 생성 모델이 원본의 통계적 구조를 학습하여 그것과 유사하지만 실제 어떤 사람과도 대응하지 않는 인공 기록을 생성하는 것입니다."
    },
    {
      "en": "Proponents argue that such datasets can be circulated more freely across teams, partners, and even regulators, accelerating analysis that privacy constraints would otherwise stall.",
      "ko": "지지자들은 그러한 데이터셋이 팀, 파트너, 심지어 규제 기관 사이에서 더 자유롭게 유통될 수 있어, 그렇지 않았다면 개인정보 제약으로 지체되었을 분석을 가속화한다고 주장합니다."
    },
    {
      "en": "Yet the technology is far from a panacea, and a growing body of evidence cautions against treating \"synthetic\" as a synonym for \"safe.\"",
      "ko": "그러나 이 기술은 결코 만병통치약이 아니며, 점점 늘어나는 증거들은 '합성'을 '안전'의 동의어로 취급하는 것에 대해 경고합니다."
    },
    {
      "en": "If a generative model is overfit, it can memorize and effectively reproduce fragments of the very records it was meant to protect, allowing a determined adversary to re-identify real individuals.",
      "ko": "만약 생성 모델이 과적합되면, 보호하려던 바로 그 기록의 일부를 암기하여 사실상 재현할 수 있으며, 이는 작정한 공격자가 실제 개인을 재식별하도록 허용합니다."
    },
    {
      "en": "A subtler failure runs in the opposite direction: in smoothing the data to obscure individuals, the model may erase rare but critical cases—an unusual fraud pattern or an uncommon medical condition—that occur too infrequently to be faithfully captured.",
      "ko": "더 미묘한 실패는 반대 방향으로 나타납니다. 즉, 개인을 가리기 위해 데이터를 매끄럽게 다듬는 과정에서, 모델은 드물지만 중대한 사례—이례적인 사기 패턴이나 흔치 않은 의학적 상태—를 지워버릴 수 있는데, 이런 사례는 너무 드물게 발생하여 충실히 포착되지 못합니다."
    },
    {
      "en": "The consequence is a dataset that looks statistically convincing in aggregate yet quietly omits the very edge cases on which many high-stakes decisions depend.",
      "ko": "그 결과는 집계 수준에서는 통계적으로 설득력 있어 보이지만, 많은 중대한 의사결정이 의존하는 바로 그 예외적 사례들을 조용히 누락하는 데이터셋입니다."
    },
    {
      "en": "For this reason, analysts increasingly insist that synthetic data be governed rather than merely generated, with validation treated as a mandatory step rather than an afterthought.",
      "ko": "이러한 이유로, 분석가들은 합성 데이터가 단순히 생성되는 것이 아니라 관리되어야 하며, 검증이 사후 고려가 아닌 필수 단계로 취급되어야 한다고 점점 더 강력히 주장합니다."
    },
    {
      "en": "Robust governance pairs a privacy audit, which probes how easily real records can be reconstructed, with a utility audit, which checks whether the rare patterns essential to the task survive the synthesis.",
      "ko": "견고한 거버넌스는 실제 기록이 얼마나 쉽게 재구성될 수 있는지를 조사하는 개인정보 감사와, 작업에 필수적인 드문 패턴이 합성 과정에서 살아남는지를 확인하는 효용 감사를 결합합니다."
    },
    {
      "en": "Neither audit is sufficient on its own, because a dataset can be perfectly private and useless, or richly informative and dangerously leaky.",
      "ko": "어느 감사도 그것만으로는 충분하지 않은데, 데이터셋이 완벽히 비공개이면서 무용할 수도 있고, 풍부하게 유용하면서도 위험하게 유출될 수도 있기 때문입니다."
    },
    {
      "en": "Used judiciously and audited rigorously, synthetic data remains a genuinely valuable tool; used as a checkbox, it can manufacture a false sense of security that is worse than no protection at all.",
      "ko": "신중하게 사용되고 엄격하게 감사된다면 합성 데이터는 여전히 진정으로 가치 있는 도구이지만, 형식적인 체크박스로 사용된다면 아무런 보호가 없는 것보다 더 나쁜 거짓 안도감을 만들어낼 수 있습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-synthgov-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "How to train generative models to run faster on limited hardware",
        "A regulation that bans the sharing of all customer and patient data",
        "Both the promise of synthetic data and the risks that make governance and validation necessary",
        "A comparison of pricing among commercial synthetic-data vendors"
      ],
      "choicesKo": [
        "제한된 하드웨어에서 생성 모델을 더 빠르게 학습시키는 방법",
        "모든 고객 및 환자 데이터 공유를 금지하는 규제",
        "합성 데이터의 가능성과, 거버넌스 및 검증을 필요하게 만드는 위험 양쪽",
        "상업용 합성 데이터 공급업체 간의 가격 비교"
      ],
      "answerIndex": 2,
      "explanation": "기사는 합성 데이터의 매력(2~3번 문장)과 재식별·희귀 사례 누락이라는 위험(5~7번 문장), 그리고 검증을 포함한 거버넌스의 필요성(8~9번 문장)을 함께 다루므로 정답은 (다)입니다. 속도, 금지 규제, 가격 비교는 본문에 없습니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-synthgov-q2",
      "prompt": "According to the article, what can happen when a generative model is overfit?",
      "promptKo": "기사에 따르면, 생성 모델이 과적합되면 무슨 일이 일어날 수 있는가?",
      "choices": [
        "It runs out of memory and stops producing records",
        "It becomes impossible for regulators to review",
        "It automatically deletes all rare cases from the output",
        "It can memorize and reproduce fragments of real records, enabling re-identification"
      ],
      "choicesKo": [
        "메모리가 부족해져 기록 생성을 중단한다",
        "규제 기관이 검토하는 것이 불가능해진다",
        "출력에서 모든 드문 사례를 자동으로 삭제한다",
        "실제 기록의 일부를 암기하고 재현하여 재식별을 가능하게 한다"
      ],
      "answerIndex": 3,
      "explanation": "다섯 번째 문장 'If a generative model is overfit, it can memorize and effectively reproduce fragments of the very records it was meant to protect, allowing a determined adversary to re-identify real individuals'에서 과적합 시 실제 기록 일부를 재현해 재식별이 가능하다고 했으므로 정답은 (라)입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-synthgov-q3",
      "prompt": "What can be inferred about why both a privacy audit and a utility audit are recommended?",
      "promptKo": "개인정보 감사와 효용 감사가 모두 권장되는 이유에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "Because regulators legally require exactly two audits for every dataset",
        "Because a dataset can be safe yet useless, or useful yet leaky, so one audit cannot guarantee both",
        "Because utility audits are always cheaper than privacy audits",
        "Because privacy and utility are the same property measured twice"
      ],
      "choicesKo": [
        "규제 기관이 모든 데이터셋에 정확히 두 번의 감사를 법으로 요구하기 때문에",
        "데이터셋이 안전하지만 무용할 수도, 유용하지만 유출될 수도 있어서 한 가지 감사로는 둘 다 보장할 수 없기 때문에",
        "효용 감사가 항상 개인정보 감사보다 저렴하기 때문에",
        "개인정보와 효용은 두 번 측정된 동일한 속성이기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "열 번째 문장 'Neither audit is sufficient on its own, because a dataset can be perfectly private and useless, or richly informative and dangerously leaky'에서 한 종류의 감사로는 안전성과 유용성을 동시에 보장할 수 없음을 알 수 있으므로 정답은 (나)입니다. 법적 요구나 비용은 근거가 없습니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-synthgov-q4",
      "prompt": "In the article, the word \"panacea\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"panacea\"와 의미가 가장 가까운 것은?",
      "choices": [
        "a cure-all that solves every problem",
        "a partial measure with known limits",
        "a confidential record",
        "a pricing model"
      ],
      "choicesKo": [
        "모든 문제를 해결하는 만능 해결책",
        "한계가 알려진 부분적 조치",
        "기밀 기록",
        "가격 책정 모델"
      ],
      "answerIndex": 0,
      "explanation": "네 번째 문장 'the technology is far from a panacea'에서 panacea는 모든 것을 해결하는 만능 해결책을 뜻하므로 정답은 (가)입니다. 'a partial measure with known limits(한계가 알려진 부분적 조치)'는 거의 반대되는 개념의 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
