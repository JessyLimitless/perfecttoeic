# Set 90 — HARD — Batch vs. Online Inference (Article)

```json
{
  "id": "set-hard-batchinference",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Choosing Between Batch and Online Inference: A Practical Guide for Data Teams",
      "ko": "배치 추론과 온라인 추론 사이의 선택: 데이터 팀을 위한 실용 가이드"
    },
    {
      "en": "When a machine learning model is moved from the laboratory into production, one of the first architectural decisions a team faces is how predictions will actually be served.",
      "ko": "머신러닝 모델이 실험실에서 프로덕션으로 옮겨질 때, 팀이 마주하는 첫 번째 아키텍처 결정 중 하나는 예측이 실제로 어떻게 제공될 것인가이다."
    },
    {
      "en": "In the batch approach, predictions are computed in large groups on a fixed schedule and stored in a database until they are needed.",
      "ko": "배치 방식에서는 예측이 정해진 일정에 따라 대규모 그룹으로 계산되어 필요할 때까지 데이터베이스에 저장된다."
    },
    {
      "en": "By contrast, online inference generates a prediction the moment a request arrives, typically through an interface that must respond within milliseconds.",
      "ko": "이와 대조적으로 온라인 추론은 요청이 도착하는 순간 예측을 생성하며, 보통 밀리초 안에 응답해야 하는 인터페이스를 통해 이루어진다."
    },
    {
      "en": "The appeal of the batch method lies in its efficiency: because computation is consolidated, expensive hardware can be used at full capacity and then released.",
      "ko": "배치 방식의 매력은 그 효율성에 있다. 연산이 통합되기 때문에 값비싼 하드웨어를 최대 용량으로 사용한 뒤 반환할 수 있다."
    },
    {
      "en": "Its weakness is freshness, since a customer may receive a recommendation that was calculated hours earlier and no longer reflects their latest behavior.",
      "ko": "그 약점은 신선도인데, 고객이 몇 시간 전에 계산되어 최신 행동을 더 이상 반영하지 못하는 추천을 받을 수 있기 때문이다."
    },
    {
      "en": "Online serving solves the freshness problem but introduces operational burdens, as the system must remain available around the clock and scale instantly when traffic spikes.",
      "ko": "온라인 서빙은 신선도 문제를 해결하지만, 시스템이 24시간 가용 상태를 유지하고 트래픽이 급증할 때 즉시 확장되어야 하므로 운영 부담을 초래한다."
    },
    {
      "en": "A common misconception is that one paradigm is universally superior; in reality, the right choice hinges on how quickly the underlying data changes and how tolerant the application is of delay.",
      "ko": "흔한 오해는 한 패러다임이 보편적으로 우월하다는 것이지만, 실제로는 기반 데이터가 얼마나 빠르게 변하는지와 애플리케이션이 지연을 얼마나 견딜 수 있는지에 따라 올바른 선택이 좌우된다."
    },
    {
      "en": "A fraud-detection service, for instance, cannot afford to wait until the nightly batch runs, whereas a weekly customer-churn report comfortably can.",
      "ko": "예를 들어 사기 탐지 서비스는 야간 배치가 실행될 때까지 기다릴 여유가 없는 반면, 주간 고객 이탈 보고서는 충분히 기다릴 수 있다."
    },
    {
      "en": "Increasingly, mature organizations adopt a hybrid strategy in which heavy feature computations are precomputed in batch while a lightweight model assembles the final answer on demand.",
      "ko": "점점 더 성숙한 조직들은 무거운 특성 연산은 배치로 미리 계산하고 경량 모델이 요청 시 최종 답을 조합하는 하이브리드 전략을 채택한다."
    },
    {
      "en": "Such a design captures much of the cost advantage of batch processing without sacrificing the responsiveness that users have come to expect.",
      "ko": "이러한 설계는 사용자가 기대하게 된 응답성을 희생하지 않으면서 배치 처리의 비용 이점 상당 부분을 취한다."
    },
    {
      "en": "Ultimately, teams should resist treating the decision as permanent and instead revisit it as latency requirements and data volumes evolve.",
      "ko": "궁극적으로 팀들은 이 결정을 영구적인 것으로 취급하지 말고, 지연 요구사항과 데이터 양이 변화함에 따라 재검토해야 한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-batchinference-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "How to reduce the cost of purchasing inference hardware",
        "The factors that should guide a choice between batch and online inference",
        "A step-by-step tutorial for training a fraud-detection model",
        "Why online inference should always replace batch processing"
      ],
      "choicesKo": [
        "추론 하드웨어 구매 비용을 줄이는 방법",
        "배치 추론과 온라인 추론 사이의 선택을 이끌어야 할 요소들",
        "사기 탐지 모델 학습을 위한 단계별 튜토리얼",
        "온라인 추론이 항상 배치 처리를 대체해야 하는 이유"
      ],
      "answerIndex": 1,
      "explanation": "기사는 배치와 온라인 추론의 장단점, 그리고 데이터 변화 속도와 지연 허용도에 따라 선택이 좌우된다는 점을 다룬다. 따라서 (나)가 정답이다. 기사는 한 방식이 보편적으로 우월하다는 것을 오해라고 밝히므로 (라)는 틀리다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-batchinference-q2",
      "prompt": "According to the article, what is the main weakness of the batch approach?",
      "promptKo": "기사에 따르면, 배치 방식의 주된 약점은 무엇인가?",
      "choices": [
        "It requires the system to be available at all hours.",
        "It cannot use hardware at full capacity.",
        "It is far more expensive than online serving.",
        "Its predictions may be out of date when used."
      ],
      "choicesKo": [
        "시스템이 항상 가용해야 한다는 점",
        "하드웨어를 최대 용량으로 사용할 수 없다는 점",
        "온라인 서빙보다 훨씬 비싸다는 점",
        "사용될 때 예측이 오래되었을 수 있다는 점"
      ],
      "answerIndex": 3,
      "explanation": "기사는 배치의 약점이 '신선도'이며 고객이 몇 시간 전 계산되어 최신 행동을 반영하지 못하는 추천을 받을 수 있다고 했다. 따라서 (라)가 정답이다. 24시간 가용성과 즉시 확장 부담은 온라인 서빙의 특성이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-batchinference-q3",
      "prompt": "What can be inferred about the hybrid strategy described in the article?",
      "promptKo": "기사에 설명된 하이브리드 전략에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It seeks to combine the cost benefits of batch with the speed of online serving.",
        "It is only suitable for weekly churn reports.",
        "It eliminates the need to precompute any features.",
        "It is recommended only for immature organizations."
      ],
      "choicesKo": [
        "배치의 비용 이점과 온라인 서빙의 속도를 결합하려 한다.",
        "주간 이탈 보고서에만 적합하다.",
        "어떤 특성도 미리 계산할 필요를 없앤다.",
        "미성숙한 조직에만 권장된다."
      ],
      "answerIndex": 0,
      "explanation": "기사는 하이브리드가 무거운 특성을 배치로 미리 계산하면서 응답성을 희생하지 않아 '배치 처리의 비용 이점 상당 부분을 취한다'고 했다. 즉 비용 이점과 속도를 결합하려는 것이므로 (가)가 정답이다. 성숙한 조직이 채택한다고 했으므로 (라)는 틀리다.",
      "category": "추론"
    },
    {
      "id": "set-hard-batchinference-q4",
      "prompt": "The word \"hinges\" in the article is closest in meaning to",
      "promptKo": "기사에서 단어 \"hinges\"와 의미가 가장 가까운 것은",
      "choices": [
        "is unrelated to",
        "objects to",
        "depends on",
        "delays"
      ],
      "choicesKo": [
        "~와 관련이 없다",
        "~에 반대하다",
        "~에 달려 있다",
        "지연시키다"
      ],
      "answerIndex": 2,
      "explanation": "'the right choice hinges on...'은 올바른 선택이 데이터 변화 속도와 지연 허용도에 '달려 있다'는 뜻이다. 따라서 (다)가 정답이다. (가) '관련이 없다'는 거의 반의어다.",
      "category": "동의어"
    }
  ]
}
```
