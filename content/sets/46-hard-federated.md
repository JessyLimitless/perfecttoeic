# Set 46 — HARD — Privacy-Preserving Machine Learning (Federated Learning & Differential Privacy)

```json
{
  "id": "set-hard-federated",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For years, the prevailing assumption in machine learning was that more centralized data invariably produced better models, yet that assumption is now being challenged by privacy regulations and rising public distrust.",
      "ko": "수년간 머신러닝 분야의 지배적인 가정은 중앙에 더 많은 데이터를 모을수록 항상 더 나은 모델이 만들어진다는 것이었지만, 그 가정은 이제 개인정보 보호 규제와 높아지는 대중의 불신으로 인해 도전받고 있다."
    },
    {
      "en": "Federated learning offers an alternative: instead of transferring sensitive records to a central server, the model is sent to where the data lives, and only the resulting parameter updates are returned.",
      "ko": "연합 학습은 대안을 제시한다. 민감한 기록을 중앙 서버로 전송하는 대신, 모델을 데이터가 있는 곳으로 보내고 그 결과로 생성된 파라미터 업데이트만을 회수하는 것이다."
    },
    {
      "en": "Because the raw data never leaves the device or the hospital, organizations can collaborate on a shared model without ever exposing the underlying records to one another.",
      "ko": "원시 데이터가 기기나 병원을 결코 떠나지 않기 때문에, 조직들은 기저 기록을 서로에게 노출하지 않고도 공유 모델을 함께 학습시킬 수 있다."
    },
    {
      "en": "However, the parameter updates themselves can inadvertently leak information, since a sufficiently clever adversary may reconstruct fragments of the training data from the gradients alone.",
      "ko": "그러나 파라미터 업데이트 자체가 의도치 않게 정보를 누설할 수 있는데, 충분히 영리한 공격자라면 기울기(gradient)만으로도 학습 데이터의 일부를 복원해 낼 수 있기 때문이다."
    },
    {
      "en": "To close this gap, engineers often layer differential privacy on top, deliberately injecting calibrated statistical noise so that the contribution of any single individual becomes mathematically indistinguishable.",
      "ko": "이 허점을 메우기 위해 엔지니어들은 종종 차등 프라이버시를 그 위에 결합하여, 보정된 통계적 잡음을 의도적으로 주입함으로써 어떤 한 개인의 기여도 수학적으로 구별할 수 없게 만든다."
    },
    {
      "en": "This added protection is not free, however; the very noise that safeguards privacy also blunts the precision of the model, and tightening the privacy guarantee typically degrades accuracy.",
      "ko": "그러나 이렇게 추가된 보호가 공짜는 아니다. 프라이버시를 지켜 주는 바로 그 잡음이 모델의 정밀도 또한 무디게 만들며, 프라이버시 보장을 더 엄격하게 할수록 대개 정확도가 떨어진다."
    },
    {
      "en": "The engineering burden is equally real, as coordinating thousands of intermittently connected devices introduces communication overhead and stragglers that can slow each training round to a crawl.",
      "ko": "엔지니어링 부담 또한 그에 못지않게 현실적인데, 간헐적으로 연결되는 수천 대의 기기를 조율하는 일은 통신 부하와 지연 단말기를 발생시켜 매 학습 라운드를 굼뜨게 만들 수 있기 때문이다."
    },
    {
      "en": "Proponents counter that these costs are justified in domains such as healthcare and personal finance, where a marginally less accurate model that preserves trust is preferable to a precise one that invites litigation.",
      "ko": "지지자들은 의료나 개인 금융처럼, 신뢰를 지키면서 약간 덜 정확한 모델이 소송을 부르는 정밀한 모델보다 낫다고 여겨지는 영역에서는 이러한 비용이 정당화된다고 반박한다."
    },
    {
      "en": "Skeptics, on the other hand, warn that the field's vocabulary can be misleading, because a system labeled \"private\" still demands rigorous auditing to confirm that its guarantees hold under real-world conditions.",
      "ko": "반면 회의론자들은 이 분야의 용어가 오해를 부를 수 있다고 경고하는데, \"프라이빗\"이라고 이름 붙은 시스템조차 그 보장이 실제 환경에서 유지되는지 확인하려면 엄격한 감사가 여전히 요구되기 때문이다."
    },
    {
      "en": "Ultimately, the technology reframes a question once treated as binary—share data or do not—into a spectrum of calibrated trade-offs that each organization must navigate deliberately.",
      "ko": "궁극적으로 이 기술은 한때 이분법적으로 다뤄지던 질문, 즉 데이터를 공유하느냐 마느냐를, 각 조직이 신중하게 헤쳐 나가야 할 보정된 절충안의 스펙트럼으로 재구성한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-federated-q1",
      "prompt": "What is the main purpose of the article?",
      "promptKo": "이 기사의 주된 목적은 무엇인가?",
      "choices": [
        "To announce a new regulation that bans centralized data storage",
        "To examine how privacy-preserving methods reframe a data-sharing decision as a set of trade-offs",
        "To prove that federated learning is always more accurate than centralized training",
        "To advertise a specific software product for hospitals"
      ],
      "choicesKo": [
        "중앙 집중식 데이터 저장을 금지하는 새 규제를 발표하기 위해",
        "프라이버시 보존 기법이 데이터 공유 결정을 일련의 절충안으로 재구성하는 방식을 검토하기 위해",
        "연합 학습이 중앙 집중식 학습보다 항상 더 정확함을 증명하기 위해",
        "병원을 위한 특정 소프트웨어 제품을 광고하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "마지막 문장에서 이 기술이 '데이터를 공유하느냐 마느냐'라는 이분법적 질문을 '보정된 절충안의 스펙트럼'으로 재구성한다고 명시하며, 글 전체가 프라이버시 보호 기법의 이점과 비용을 균형 있게 다룬다. 따라서 정답은 (나)이다. (다)는 본문이 정확도 저하를 인정하므로 오답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-federated-q2",
      "prompt": "According to the article, why can parameter updates pose a privacy risk?",
      "promptKo": "기사에 따르면 파라미터 업데이트가 프라이버시 위험을 일으킬 수 있는 이유는 무엇인가?",
      "choices": [
        "They are stored permanently on the central server in plain text",
        "They must be shared publicly with regulators before training begins",
        "A capable adversary may reconstruct parts of the training data from the gradients",
        "They double the amount of raw data transmitted across the network"
      ],
      "choicesKo": [
        "중앙 서버에 평문으로 영구 저장되기 때문에",
        "학습 시작 전에 규제 당국에 공개적으로 공유되어야 하기 때문에",
        "유능한 공격자가 기울기로부터 학습 데이터의 일부를 복원할 수 있기 때문에",
        "네트워크를 통해 전송되는 원시 데이터의 양을 두 배로 늘리기 때문에"
      ],
      "answerIndex": 2,
      "explanation": "네 번째 문장에서 '충분히 영리한 공격자라면 기울기만으로도 학습 데이터의 일부를 복원해 낼 수 있다'고 직접 설명하므로 정답은 (다)이다. 본문은 오히려 원시 데이터가 기기를 떠나지 않는다고 했으므로 (가)와 (라)는 모순된다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-federated-q3",
      "prompt": "What can be inferred about applying a stricter differential-privacy guarantee?",
      "promptKo": "더 엄격한 차등 프라이버시 보장을 적용하는 것에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "It eliminates the need for any further security auditing",
        "It tends to come at the expense of the model's predictive accuracy",
        "It removes all communication overhead from each training round",
        "It guarantees that the model will outperform a centralized one"
      ],
      "choicesKo": [
        "추가적인 보안 감사의 필요성을 없애 준다",
        "모델의 예측 정확도를 희생하는 경향이 있다",
        "각 학습 라운드의 모든 통신 부하를 제거한다",
        "모델이 중앙 집중식 모델을 능가하도록 보장한다"
      ],
      "answerIndex": 1,
      "explanation": "여섯 번째 문장에서 '프라이버시 보장을 더 엄격하게 할수록 대개 정확도가 떨어진다'고 했으므로, 더 엄격한 보장은 정확도를 희생한다는 (나)를 추론할 수 있다. 회의론자들이 감사가 여전히 필요하다고 했으므로 (가)는 틀리다.",
      "category": "추론"
    },
    {
      "id": "set-hard-federated-q4",
      "prompt": "In the article, the word \"blunts\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"blunts\"와 의미가 가장 가까운 것은?",
      "choices": [
        "encrypts",
        "sharpens",
        "publishes",
        "reduces"
      ],
      "choicesKo": [
        "암호화하다",
        "더 날카롭게 하다",
        "공표하다",
        "감소시키다"
      ],
      "answerIndex": 3,
      "explanation": "여섯 번째 문장에서 잡음이 모델의 정밀도를 'blunts' 한다는 것은 정밀도를 무디게/감소시킨다는 의미이므로 'reduces'(라)가 정답이다. 'sharpens'(나, 더 날카롭게 하다)는 정반대 의미의 함정 선택지이다.",
      "category": "동의어"
    }
  ]
}
```
