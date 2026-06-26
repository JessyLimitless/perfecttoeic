# Setting Latency Budgets for a Real-Time Analytics Service

```json
{
  "id": "set-hard-latency",
  "difficulty": "HARD",
  "passageType": "Technical Brief",
  "passageLines": [
    {
      "en": "This brief outlines the proposed latency budget for Helix, our real-time analytics service, ahead of the upcoming feature freeze.",
      "ko": "이 브리프는 곧 있을 기능 동결에 앞서 당사의 실시간 분석 서비스인 Helix에 대해 제안된 지연 시간 예산을 개략적으로 설명합니다."
    },
    {
      "en": "A latency budget allocates a fixed amount of time to each stage of request processing, from ingestion through scoring to response rendering.",
      "ko": "지연 시간 예산은 데이터 수집부터 점수 산출, 응답 렌더링에 이르기까지 요청 처리의 각 단계에 고정된 시간을 할당합니다."
    },
    {
      "en": "Our headline commitment is that the ninety-fifth percentile response must remain under two hundred milliseconds, even under peak load.",
      "ko": "당사의 핵심 약속은 최대 부하 상태에서도 95번째 백분위수 응답이 200밀리초 미만으로 유지되어야 한다는 것입니다."
    },
    {
      "en": "The central tension we must manage is that every additional analytical feature, however valuable, consumes part of that fixed budget.",
      "ko": "우리가 관리해야 하는 핵심적인 긴장은 모든 추가 분석 기능이 아무리 가치 있더라도 그 고정된 예산의 일부를 소모한다는 점입니다."
    },
    {
      "en": "Richer models that incorporate more signals tend to produce more accurate predictions, yet they also lengthen the scoring stage considerably.",
      "ko": "더 많은 신호를 통합하는 정교한 모델은 더 정확한 예측을 생성하는 경향이 있지만, 동시에 점수 산출 단계를 상당히 길게 만듭니다."
    },
    {
      "en": "We therefore recommend tiering features so that the most expensive computations run only when the remaining budget permits.",
      "ko": "따라서 우리는 가장 비용이 많이 드는 연산이 남은 예산이 허용할 때만 실행되도록 기능을 계층화할 것을 권장합니다."
    },
    {
      "en": "A further complication arises when downstream systems, such as the feature store or the geolocation lookup, respond more slowly than expected.",
      "ko": "추가적인 복잡성은 피처 스토어나 지오로케이션 조회와 같은 다운스트림 시스템이 예상보다 느리게 응답할 때 발생합니다."
    },
    {
      "en": "Rather than allowing a single slow dependency to breach the overall budget, Helix should degrade gracefully by serving a simpler, cached estimate.",
      "ko": "단일 느린 의존성이 전체 예산을 초과하도록 허용하기보다는, Helix는 더 단순한 캐시된 추정치를 제공함으로써 우아하게 성능을 저하시켜야 합니다."
    },
    {
      "en": "This approach sacrifices a small measure of precision in exchange for predictable timing, which most customers value more highly.",
      "ko": "이 접근법은 예측 가능한 타이밍을 대가로 약간의 정밀도를 희생하는데, 대부분의 고객은 이를 더 높이 평가합니다."
    },
    {
      "en": "Crucially, any degraded response should be flagged in the payload so that consuming applications can adjust their confidence accordingly.",
      "ko": "결정적으로, 성능이 저하된 모든 응답은 페이로드에 표시되어야 하며, 그래야 소비 애플리케이션이 그에 따라 신뢰도를 조정할 수 있습니다."
    },
    {
      "en": "We acknowledge that enforcing strict budgets will occasionally frustrate teams whose pet features cannot be accommodated within the limit.",
      "ko": "우리는 엄격한 예산을 시행하는 것이 한도 내에 수용될 수 없는 선호 기능을 가진 팀들을 때때로 좌절시킬 것임을 인정합니다."
    },
    {
      "en": "Nevertheless, the alternative—unbounded latency that erodes user trust—is, in our judgment, far costlier in the long run.",
      "ko": "그럼에도 불구하고, 그 대안인 사용자 신뢰를 갉아먹는 무제한적인 지연 시간은 우리 판단으로는 장기적으로 훨씬 더 큰 대가를 치르게 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-latency-q1",
      "prompt": "What is the main purpose of the brief?",
      "promptKo": "이 브리프의 주된 목적은 무엇입니까?",
      "choices": [
        "To announce the cancellation of the Helix service",
        "To propose and justify a latency budget for a real-time analytics service",
        "To compare Helix with competing analytics products",
        "To request additional engineers for the scoring team"
      ],
      "choicesKo": [
        "Helix 서비스의 취소를 발표하기 위해",
        "실시간 분석 서비스에 대한 지연 시간 예산을 제안하고 정당화하기 위해",
        "Helix를 경쟁 분석 제품과 비교하기 위해",
        "점수 산출 팀에 추가 엔지니어를 요청하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "첫 문장에서 'This brief outlines the proposed latency budget for Helix'라고 목적을 밝히고, 이후 문단 전체가 예산의 필요성과 근거(우아한 성능 저하, 엄격한 예산 시행의 정당성)를 설명하므로 정답은 2번입니다. 취소, 경쟁 비교, 인력 요청은 언급되지 않았습니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-latency-q2",
      "prompt": "According to the brief, what should Helix do when a downstream system responds slowly?",
      "promptKo": "브리프에 따르면, 다운스트림 시스템이 느리게 응답할 때 Helix는 무엇을 해야 합니까?",
      "choices": [
        "Retry the slow dependency until it succeeds",
        "Exceed the overall latency budget to preserve accuracy",
        "Serve a simpler, cached estimate and flag the response",
        "Shut down the affected feature permanently"
      ],
      "choicesKo": [
        "느린 의존성이 성공할 때까지 재시도한다",
        "정확도를 보존하기 위해 전체 지연 시간 예산을 초과한다",
        "더 단순한 캐시된 추정치를 제공하고 응답에 표시한다",
        "영향을 받은 기능을 영구적으로 종료한다"
      ],
      "answerIndex": 2,
      "explanation": "'Helix should degrade gracefully by serving a simpler, cached estimate'와 'any degraded response should be flagged in the payload'에서 캐시된 추정치를 제공하고 이를 표시해야 한다고 명시하므로 정답은 3번입니다. 본문은 오히려 예산 초과를 피하라고 권고합니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-latency-q3",
      "prompt": "What can be inferred about the trade-off the brief endorses?",
      "promptKo": "브리프가 지지하는 절충안에 대해 무엇을 추론할 수 있습니까?",
      "choices": [
        "Maximum accuracy should always take priority over speed",
        "All features should run regardless of the remaining budget",
        "Customers cannot tell the difference between degraded and full responses",
        "Predictable response timing is generally more valuable to customers than marginal precision"
      ],
      "choicesKo": [
        "최대 정확도가 항상 속도보다 우선되어야 한다",
        "모든 기능은 남은 예산과 무관하게 실행되어야 한다",
        "고객은 성능 저하 응답과 완전한 응답의 차이를 구분할 수 없다",
        "예측 가능한 응답 타이밍이 일반적으로 미미한 정밀도보다 고객에게 더 가치 있다"
      ],
      "answerIndex": 3,
      "explanation": "'This approach sacrifices a small measure of precision in exchange for predictable timing, which most customers value more highly'에서 대부분의 고객이 예측 가능한 타이밍을 더 높이 평가한다고 했으므로 2번을 추론할 수 있습니다. 정밀도보다 타이밍을 우선하는 입장이므로 1번과 4번은 본문과 배치됩니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-latency-q4",
      "prompt": "The word \"erodes\" in the final sentence is closest in meaning to",
      "promptKo": "마지막 문장의 단어 \"erodes\"와 의미가 가장 가까운 것은?",
      "choices": [
        "gradually weakens",
        "strengthens",
        "measures",
        "publishes"
      ],
      "choicesKo": [
        "점차 약화시키다",
        "강화하다",
        "측정하다",
        "발표하다"
      ],
      "answerIndex": 0,
      "explanation": "마지막 문장 'unbounded latency that erodes user trust'에서 erode는 신뢰를 점차 갉아먹어 약화시킨다는 의미이므로 'gradually weakens'가 정답(2번)입니다. 'strengthens(강화하다)'는 정반대 의미의 오답 함정입니다.",
      "category": "동의어"
    }
  ]
}
```
