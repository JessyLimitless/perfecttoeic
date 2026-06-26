# Set 32 — HARD — Declining Model Performance (Report)

```json
{
  "id": "set-hard-drift",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This quarter, the recommendation engine that powers our checkout page has shown a marked decline in predictive accuracy.",
      "ko": "이번 분기에 우리 결제 페이지를 구동하는 추천 엔진의 예측 정확도가 뚜렷하게 하락했다."
    },
    {
      "en": "Diagnostic analysis indicates that the model's performance has fallen substantially since deployment, with click-through accuracy dropping from 84 percent to 61 percent over eight months.",
      "ko": "진단 분석에 따르면 모델의 성능은 배포 이후 상당히 떨어졌으며, 클릭률 정확도가 8개월에 걸쳐 84퍼센트에서 61퍼센트로 하락했다."
    },
    {
      "en": "Crucially, the decline was not abrupt; it accumulated gradually, which is why routine dashboards failed to flag it until the cumulative loss became conspicuous.",
      "ko": "중요한 점은, 이 하락이 갑작스럽지 않았다는 것이다. 점진적으로 누적되었기에, 누적 손실이 두드러질 때까지 일상적인 대시보드가 이를 포착하지 못했다."
    },
    {
      "en": "The root cause appears to be model drift: customer purchasing behavior has shifted toward mobile and subscription products that were underrepresented in the original training data.",
      "ko": "근본 원인은 모델 드리프트로 보인다. 즉, 고객의 구매 행동이 원래 학습 데이터에서 과소 대표되었던 모바일 및 구독 상품 쪽으로 이동한 것이다."
    },
    {
      "en": "When we segmented the traffic, the engine remained reliable for legacy desktop catalog orders but performed poorly precisely where demand is now concentrated.",
      "ko": "트래픽을 세분화해 보니, 추천 엔진은 기존 데스크톱 카탈로그 주문에서는 여전히 신뢰할 만했으나, 정작 현재 수요가 집중된 영역에서는 성능이 저조했다."
    },
    {
      "en": "Because the underlying distribution of inputs no longer matches what the model learned, retraining on data from the most recent two quarters is strongly advised.",
      "ko": "입력의 기저 분포가 더 이상 모델이 학습한 내용과 일치하지 않으므로, 가장 최근 두 분기의 데이터로 재학습할 것을 강력히 권고한다."
    },
    {
      "en": "A one-time retraining, however, would only restore accuracy momentarily before the same gradual erosion resumed.",
      "ko": "그러나 일회성 재학습은 동일한 점진적 침식이 다시 시작되기 전까지 정확도를 잠시 회복시키는 데 그칠 것이다."
    },
    {
      "en": "We therefore propose scheduling periodic retraining so that future shifts are detected and corrected before they affect revenue.",
      "ko": "따라서 우리는 향후의 변화가 매출에 영향을 미치기 전에 감지되고 교정되도록 주기적인 재학습 일정을 수립할 것을 제안한다."
    },
    {
      "en": "To support this, the analytics team should deploy a drift monitor that compares live input distributions against the training baseline each week.",
      "ko": "이를 뒷받침하기 위해, 분석 팀은 매주 실시간 입력 분포를 학습 기준선과 비교하는 드리프트 모니터를 도입해야 한다."
    },
    {
      "en": "An automated alert would then trigger a refresh whenever the divergence crosses a predefined threshold, removing reliance on manual inspection.",
      "ko": "그렇게 하면 분기(divergence)가 사전에 정해 둔 임계값을 넘을 때마다 자동 경보가 갱신을 촉발하여, 수동 점검에 대한 의존을 없앨 것이다."
    },
    {
      "en": "We estimate that the engineering effort required is modest relative to the revenue currently being forfeited each month.",
      "ko": "필요한 엔지니어링 노력은 현재 매월 잃고 있는 매출에 비하면 미미한 수준으로 추정된다."
    },
    {
      "en": "Left unaddressed, the engine will continue to drift, and the gap between its recommendations and customer intent will only widen.",
      "ko": "방치할 경우 추천 엔진은 계속 표류할 것이며, 추천과 고객 의도 사이의 간극은 더욱 벌어지기만 할 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-drift-q1",
      "prompt": "What problem does the report primarily address?",
      "promptKo": "이 보고서가 주로 다루는 문제는 무엇인가?",
      "choices": [
        "The checkout page has become technically inaccessible to customers.",
        "A deployed model's accuracy has declined as customer behavior shifted away from its training data.",
        "Training data from recent quarters was accidentally deleted by the analytics team.",
        "Customers have stopped using mobile devices to make purchases."
      ],
      "choicesKo": [
        "결제 페이지가 고객에게 기술적으로 접근 불가능해졌다.",
        "배포된 모델의 정확도가, 고객 행동이 학습 데이터에서 벗어나며 하락했다.",
        "최근 분기의 학습 데이터가 분석 팀에 의해 실수로 삭제되었다.",
        "고객들이 모바일 기기로 구매하는 것을 중단했다."
      ],
      "answerIndex": 1,
      "explanation": "보고서는 추천 엔진의 정확도가 하락(1~2문장)했고 그 원인이 고객 행동 변화에 따른 모델 드리프트(4문장)임을 설명하므로 정답은 (나)=1이다. (라)는 본문과 반대로 모바일 구매가 늘었다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-drift-q2",
      "prompt": "According to the report, why did routine dashboards fail to catch the decline early?",
      "promptKo": "보고서에 따르면, 일상적인 대시보드가 하락을 일찍 포착하지 못한 이유는 무엇인가?",
      "choices": [
        "The drop was gradual and accumulated over time rather than appearing suddenly.",
        "The dashboards had been disabled for the entire quarter.",
        "The engine performed poorly on desktop catalog orders.",
        "The training baseline was updated every week automatically."
      ],
      "choicesKo": [
        "하락이 갑작스럽게 나타나지 않고 시간에 걸쳐 점진적으로 누적되었기 때문이다.",
        "대시보드가 분기 내내 비활성화되어 있었기 때문이다.",
        "엔진이 데스크톱 카탈로그 주문에서 성능이 저조했기 때문이다.",
        "학습 기준선이 매주 자동으로 갱신되었기 때문이다."
      ],
      "answerIndex": 0,
      "explanation": "3문장에서 하락이 갑작스럽지 않고 점진적으로 누적되어 누적 손실이 두드러질 때까지 대시보드가 포착하지 못했다고 설명하므로 정답은 (가)=0이다. (다)는 본문상 데스크톱은 오히려 신뢰할 만했다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-drift-q3",
      "prompt": "What can be inferred about a one-time retraining of the model?",
      "promptKo": "모델을 일회성으로 재학습하는 것에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It would permanently solve the drift problem on its own.",
        "It would make the drift monitor unnecessary.",
        "It would improve accuracy only temporarily, because drift would resume.",
        "It would increase revenue beyond the original 84 percent accuracy."
      ],
      "choicesKo": [
        "그것만으로 드리프트 문제를 영구적으로 해결할 것이다.",
        "드리프트 모니터를 불필요하게 만들 것이다.",
        "드리프트가 다시 시작되므로 정확도를 일시적으로만 개선할 것이다.",
        "원래의 84퍼센트 정확도를 넘어 매출을 늘릴 것이다."
      ],
      "answerIndex": 2,
      "explanation": "7문장은 일회성 재학습이 동일한 점진적 침식이 다시 시작되기 전까지 정확도를 잠시 회복시키는 데 그친다고 했으므로, 일시적 개선에 불과하다는 (다)=2가 정답이다. 그래서 8~10문장에서 주기적 재학습과 모니터를 제안한다.",
      "category": "추론"
    },
    {
      "id": "set-hard-drift-q4",
      "prompt": "In the report, the word \"substantially\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"substantially\"와 의미가 가장 가까운 것은?",
      "choices": [
        "slightly",
        "temporarily",
        "unexpectedly",
        "significantly"
      ],
      "choicesKo": [
        "약간",
        "일시적으로",
        "예기치 않게",
        "상당히"
      ],
      "answerIndex": 3,
      "explanation": "\"substantially\"는 정도가 크다는 의미로, 정확도가 84퍼센트에서 61퍼센트로 크게 떨어진 맥락에 비추어 'significantly(상당히, 크게)'가 가장 가깝다. 정답은 (라)=3이며, 'slightly(약간)'는 정반대 의미의 함정이다.",
      "category": "동의어"
    }
  ]
}
```
