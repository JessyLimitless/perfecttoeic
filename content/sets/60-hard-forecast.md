# Set 60 — HARD — Demand Forecasting Limits (Article)

```json
{
  "id": "set-hard-forecast",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Time-series demand forecasting has become a cornerstone of modern supply-chain planning, yet its reliability rests on an assumption that practitioners too often leave unspoken: that the future will broadly resemble the past.",
      "ko": "시계열 수요 예측은 현대 공급망 계획의 핵심이 되었지만, 그 신뢰성은 실무자들이 너무 자주 말하지 않고 넘어가는 하나의 가정, 즉 미래가 대체로 과거와 비슷할 것이라는 가정에 의존한다."
    },
    {
      "en": "Models such as exponential smoothing and ARIMA learn the rhythms of historical sales—seasonal peaks, weekly cycles, and gradual trends—and project them forward with impressive precision.",
      "ko": "지수평활법과 ARIMA 같은 모델은 계절적 정점, 주간 주기, 점진적 추세 등 과거 판매의 리듬을 학습하여 인상적인 정밀도로 그것을 미래에 투영한다."
    },
    {
      "en": "When conditions are stable, these methods routinely outperform human intuition and free planners to focus on exceptions rather than arithmetic.",
      "ko": "상황이 안정적일 때, 이러한 방법들은 일상적으로 인간의 직관을 능가하며 계획자들이 계산보다는 예외 사항에 집중할 수 있게 해 준다."
    },
    {
      "en": "The trouble begins precisely when stability breaks down.",
      "ko": "문제는 바로 안정성이 무너지는 순간에 시작된다."
    },
    {
      "en": "A sudden regulatory change, a viral product, or a regional disruption can shift demand into a regime the model has never observed, and a system that extrapolates from a vanished past will confidently produce numbers that are not merely wrong but dangerously precise.",
      "ko": "갑작스러운 규제 변화, 입소문을 탄 제품, 또는 지역적 혼란은 수요를 모델이 한 번도 관찰한 적 없는 국면으로 옮길 수 있으며, 사라져 버린 과거로부터 외삽하는 시스템은 단지 틀린 것이 아니라 위험할 정도로 정밀한 수치를 자신 있게 산출한다."
    },
    {
      "en": "Because the forecast still arrives as a single, tidy figure, downstream teams tend to treat it as fact, ordering inventory and committing capacity as though the estimate carried no doubt at all.",
      "ko": "예측이 여전히 하나의 깔끔한 수치로 도착하기 때문에, 후속 팀들은 그것을 사실로 받아들이는 경향이 있으며, 마치 그 추정치에 아무런 의심도 담겨 있지 않은 것처럼 재고를 주문하고 생산능력을 확정한다."
    },
    {
      "en": "This is why a growing number of analysts argue that the central deliverable of a forecast should not be a point estimate but an honest expression of uncertainty.",
      "ko": "이것이 점점 더 많은 분석가들이 예측의 핵심 산출물은 점 추정치가 아니라 불확실성에 대한 정직한 표현이어야 한다고 주장하는 이유다."
    },
    {
      "en": "Reporting a plausible range—say, a low, expected, and high scenario—signals to decision-makers that the underlying model is, at bottom, a probabilistic statement rather than a promise.",
      "ko": "타당한 범위, 예컨대 낮음, 예상, 높음 시나리오를 보고하는 것은 그 바탕에 깔린 모델이 근본적으로 약속이 아니라 확률적 진술임을 의사결정자들에게 알려 준다."
    },
    {
      "en": "Critics counter that ranges are harder to act on than a single number, and that wide intervals can be dismissed as evasions rather than insights.",
      "ko": "비평가들은 범위가 단일 숫자보다 행동에 옮기기 더 어렵고, 넓은 구간은 통찰이 아니라 회피로 치부될 수 있다고 반박한다."
    },
    {
      "en": "The response is not to abandon ranges but to pair them with explicit guidance on when the forecast can be trusted and when judgment must take over.",
      "ko": "이에 대한 대응은 범위를 포기하는 것이 아니라, 예측을 언제 신뢰할 수 있고 언제 판단이 개입해야 하는지에 관한 명시적 지침과 범위를 결합하는 것이다."
    },
    {
      "en": "In the end, the most valuable forecasting systems are not those that claim the greatest accuracy, but those that know—and clearly communicate—the boundaries of their own competence.",
      "ko": "결국 가장 가치 있는 예측 시스템은 가장 높은 정확도를 주장하는 시스템이 아니라, 자기 능력의 한계를 알고 그것을 명확히 전달하는 시스템이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-forecast-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Forecasting models should be replaced entirely by human judgment.",
        "ARIMA models always outperform exponential smoothing in unstable markets.",
        "Forecasts are most useful when they communicate their own uncertainty and limits.",
        "Supply-chain teams should stop relying on historical sales data."
      ],
      "choicesKo": [
        "예측 모델은 전적으로 인간의 판단으로 대체되어야 한다.",
        "ARIMA 모델은 불안정한 시장에서 항상 지수평활법을 능가한다.",
        "예측은 자신의 불확실성과 한계를 전달할 때 가장 유용하다.",
        "공급망 팀은 과거 판매 데이터에 의존하는 것을 멈춰야 한다."
      ],
      "answerIndex": 2,
      "explanation": "마지막 문장 \"the most valuable forecasting systems ... are those that know—and clearly communicate—the boundaries of their own competence\"와 \"the central deliverable of a forecast should not be a point estimate but an honest expression of uncertainty\"가 글 전체의 요지를 압축한다. 따라서 정답은 불확실성과 한계를 전달하는 예측이 가장 유용하다는 (다)이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-forecast-q2",
      "prompt": "According to the article, what happens when demand shifts into a regime the model has never observed?",
      "promptKo": "기사에 따르면, 수요가 모델이 한 번도 관찰한 적 없는 국면으로 이동하면 어떤 일이 일어나는가?",
      "choices": [
        "The model automatically widens its reported range.",
        "The model stops producing any output until retrained.",
        "Downstream teams immediately reduce their inventory orders.",
        "The model confidently produces numbers that are precise yet wrong."
      ],
      "choicesKo": [
        "모델은 보고하는 범위를 자동으로 넓힌다.",
        "모델은 재학습될 때까지 어떤 출력도 산출하지 않는다.",
        "후속 팀들은 즉시 재고 주문을 줄인다.",
        "모델은 정밀하지만 틀린 수치를 자신 있게 산출한다."
      ],
      "answerIndex": 3,
      "explanation": "다섯 번째 문장에서 사라진 과거로부터 외삽하는 시스템은 \"numbers that are not merely wrong but dangerously precise\"를 자신 있게 산출한다고 명시한다. 따라서 정답은 (라)이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-forecast-q3",
      "prompt": "What can be inferred about why downstream teams treat forecasts as fact?",
      "promptKo": "후속 팀들이 예측을 사실로 받아들이는 이유에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "A single tidy number conceals the uncertainty behind the estimate.",
        "They have been formally trained to ignore probabilistic ranges.",
        "The forecasts are accompanied by detailed risk warnings.",
        "Regulatory rules require them to follow the point estimate."
      ],
      "choicesKo": [
        "하나의 깔끔한 숫자가 추정치 뒤에 숨은 불확실성을 가린다.",
        "그들은 확률적 범위를 무시하도록 공식적으로 교육받았다.",
        "예측에는 상세한 위험 경고가 함께 제공된다.",
        "규제 규칙이 그들에게 점 추정치를 따르도록 요구한다."
      ],
      "answerIndex": 0,
      "explanation": "여섯 번째 문장 \"Because the forecast still arrives as a single, tidy figure, downstream teams tend to treat it as fact\"에서 단일 수치 형태가 의심 없이 받아들여지게 만든다는 점을 알 수 있다. 즉 깔끔한 숫자가 불확실성을 가린다는 (가)가 합리적 추론이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-forecast-q4",
      "prompt": "The word \"sound\"-like term \"honest\" in paragraph context (\"an honest expression of uncertainty\") is closest in meaning to",
      "promptKo": "본문에서 \"honest\"(an honest expression of uncertainty)와 의미상 가장 가까운 것은?",
      "choices": [
        "concealing",
        "candid",
        "profitable",
        "automated"
      ],
      "choicesKo": [
        "숨기는",
        "솔직한",
        "수익성 있는",
        "자동화된"
      ],
      "answerIndex": 1,
      "explanation": "\"an honest expression of uncertainty\"에서 honest는 불확실성을 숨기지 않고 솔직하게 드러낸다는 의미이므로 candid(솔직한)가 문맥상 동의어다. concealing(숨기는)은 반의어 함정이다. 따라서 정답은 (나)이다.",
      "category": "동의어"
    }
  ]
}
```
