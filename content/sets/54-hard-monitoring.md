# Set 54 — HARD — Model Monitoring Program (Internal Report)

```json
{
  "id": "set-hard-monitoring",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "Following last quarter's incident, in which our credit-scoring model silently degraded for nearly three weeks before anyone noticed, the Analytics Engineering team has formalized a model-monitoring program for all production systems.",
      "ko": "지난 분기에 우리의 신용 평가 모델이 거의 3주 동안 아무도 알아차리지 못한 채 조용히 성능이 저하된 사건 이후, 분석 엔지니어링팀은 모든 운영 시스템을 위한 모델 모니터링 프로그램을 공식화했습니다."
    },
    {
      "en": "The central premise is that a model which performed well at deployment is not guaranteed to remain accurate, because the real-world data feeding it continually shifts away from the distribution on which it was trained.",
      "ko": "핵심 전제는 배포 시점에 좋은 성능을 보인 모델이 계속 정확하게 유지된다는 보장이 없다는 것인데, 이는 모델에 입력되는 실제 데이터가 학습 당시의 분포로부터 지속적으로 멀어지기 때문입니다."
    },
    {
      "en": "We therefore distinguish between two phenomena that are often conflated: data drift, in which the statistical properties of incoming inputs change, and performance decay, in which the model's predictive accuracy actually declines.",
      "ko": "따라서 우리는 흔히 혼동되는 두 가지 현상을 구분합니다. 즉, 들어오는 입력의 통계적 특성이 변하는 데이터 드리프트와, 모델의 예측 정확도가 실제로 떨어지는 성능 저하입니다."
    },
    {
      "en": "The distinction matters because input drift does not always translate into worse predictions, and conversely, accuracy can erode even when the inputs appear superficially stable.",
      "ko": "이 구분이 중요한 이유는 입력 드리프트가 항상 더 나쁜 예측으로 이어지지는 않으며, 반대로 입력이 표면적으로 안정적으로 보일 때조차 정확도가 침식될 수 있기 때문입니다."
    },
    {
      "en": "Under the new program, every model emits a daily report comparing the current input distribution against a fixed reference window, using population-stability metrics to quantify how far the data has moved.",
      "ko": "새 프로그램에서는 모든 모델이 모집단 안정성 지표를 사용하여 데이터가 얼마나 이동했는지를 정량화하며, 현재 입력 분포를 고정된 기준 구간과 비교하는 일일 보고서를 생성합니다."
    },
    {
      "en": "Alerting thresholds are deliberately tiered: a moderate breach triggers an automated notice to the owning team, whereas a severe breach pages the on-call engineer and flags the model for immediate review.",
      "ko": "경보 임계값은 의도적으로 단계화되어 있습니다. 즉, 중간 수준의 위반은 담당 팀에 자동 통지를 발생시키는 반면, 심각한 위반은 당직 엔지니어를 호출하고 해당 모델을 즉시 검토 대상으로 표시합니다."
    },
    {
      "en": "Crucially, we resisted the temptation to set the thresholds aggressively, since an excess of false alarms quickly erodes the team's trust and conditions engineers to ignore the very alerts that matter.",
      "ko": "결정적으로, 우리는 임계값을 공격적으로 설정하려는 유혹에 저항했는데, 이는 과도한 거짓 경보가 팀의 신뢰를 빠르게 약화시키고 엔지니어들이 정작 중요한 경보를 무시하도록 길들이기 때문입니다."
    },
    {
      "en": "Because ground-truth labels often arrive with a delay—a loan's true outcome may not be known for months—the program supplements lagging accuracy measures with leading indicators such as prediction-confidence distributions.",
      "ko": "실측 라벨이 종종 지연되어 도착하기 때문에—대출의 실제 결과는 몇 달 동안 알 수 없을 수도 있습니다—이 프로그램은 후행적인 정확도 측정치를 예측 신뢰도 분포와 같은 선행 지표로 보완합니다."
    },
    {
      "en": "Retraining is governed by a scheduled policy rather than left to individual discretion: each model is refreshed on a fixed cadence, but that cadence can be accelerated whenever drift or decay metrics cross the defined limits.",
      "ko": "재학습은 개인의 재량에 맡겨지기보다 예정된 정책에 의해 관리됩니다. 즉, 각 모델은 고정된 주기로 갱신되지만, 드리프트나 저하 지표가 정해진 한계를 넘으면 그 주기는 앞당겨질 수 있습니다."
    },
    {
      "en": "We caution, however, that retraining is not a universal remedy; if the underlying shift reflects a genuine change in the world rather than noise, the feature set or even the modeling approach itself may need to be reconsidered.",
      "ko": "그러나 우리는 재학습이 만능 해결책이 아니라는 점을 경고합니다. 만약 근본적인 변화가 잡음이 아니라 세상의 진정한 변화를 반영하는 것이라면, 특성 집합이나 심지어 모델링 접근법 자체를 재고해야 할 수도 있습니다."
    },
    {
      "en": "The program will be piloted on our three highest-risk models this quarter, and we expect to extend it across the remaining portfolio once the alerting baselines have been validated.",
      "ko": "이 프로그램은 이번 분기에 가장 위험도가 높은 세 개의 모델을 대상으로 시범 운영될 예정이며, 경보 기준선이 검증되면 나머지 포트폴리오 전반으로 확대할 것으로 예상합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-monitoring-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce a discount on a new analytics product",
        "To introduce a formal program for monitoring production models and governing their retraining",
        "To assign blame for the credit-scoring incident to a specific engineer",
        "To request additional hiring for the Analytics Engineering team"
      ],
      "choicesKo": [
        "새로운 분석 제품에 대한 할인을 발표하기 위해",
        "운영 모델을 모니터링하고 그 재학습을 관리하는 공식 프로그램을 도입하기 위해",
        "신용 평가 사건의 책임을 특정 엔지니어에게 돌리기 위해",
        "분석 엔지니어링팀을 위한 추가 채용을 요청하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "첫 문장에서 'the Analytics Engineering team has formalized a model-monitoring program for all production systems'라고 했고, 이어지는 문단들이 모니터링 지표, 경보 임계값, 재학습 정책을 설명하므로 정답은 (나)입니다. 할인, 책임 전가, 채용은 본문에 근거가 없습니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-monitoring-q2",
      "prompt": "According to the report, why does the program use leading indicators such as prediction-confidence distributions?",
      "promptKo": "보고서에 따르면, 이 프로그램이 예측 신뢰도 분포와 같은 선행 지표를 사용하는 이유는 무엇인가?",
      "choices": [
        "Because confidence scores are cheaper to compute than input metrics",
        "Because regulators require confidence distributions to be reported daily",
        "Because the team decided to stop measuring accuracy entirely",
        "Because ground-truth labels often arrive with a delay, making accuracy measures lag"
      ],
      "choicesKo": [
        "신뢰도 점수가 입력 지표보다 계산 비용이 저렴하기 때문에",
        "규제 기관이 신뢰도 분포를 매일 보고하도록 요구하기 때문에",
        "팀이 정확도 측정을 완전히 중단하기로 결정했기 때문에",
        "실측 라벨이 종종 지연되어 도착하여 정확도 측정치가 후행하기 때문에"
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장 'Because ground-truth labels often arrive with a delay ... the program supplements lagging accuracy measures with leading indicators such as prediction-confidence distributions'에서 라벨 지연으로 정확도가 후행하기 때문에 선행 지표로 보완한다고 명시하므로 정답은 (라)입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-monitoring-q3",
      "prompt": "What can be inferred about why the thresholds were not set aggressively?",
      "promptKo": "임계값을 공격적으로 설정하지 않은 이유에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "Aggressive thresholds would have been too expensive to license",
        "The monitoring system is technically incapable of detecting severe breaches",
        "Frequent false alarms would lead engineers to distrust and ignore the alerts, including important ones",
        "Aggressive thresholds are prohibited by company policy across all teams"
      ],
      "choicesKo": [
        "공격적인 임계값은 라이선스 비용이 너무 비쌌을 것이다",
        "모니터링 시스템은 기술적으로 심각한 위반을 탐지할 수 없다",
        "잦은 거짓 경보가 엔지니어들로 하여금 중요한 경보를 포함해 경보를 불신하고 무시하게 만들 것이다",
        "공격적인 임계값은 모든 팀에 걸쳐 회사 정책으로 금지되어 있다"
      ],
      "answerIndex": 2,
      "explanation": "일곱 번째 문장 'an excess of false alarms quickly erodes the team's trust and conditions engineers to ignore the very alerts that matter'에서 거짓 경보가 신뢰를 약화시키고 중요한 경보까지 무시하게 만든다고 했으므로, 이를 피하려 임계값을 보수적으로 설정했음을 추론할 수 있습니다. 정답은 (다)입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-monitoring-q4",
      "prompt": "In the report, the word \"erodes\" (in the sentence about false alarms) is closest in meaning to",
      "promptKo": "보고서에서 (거짓 경보에 관한 문장의) 단어 \"erodes\"와 의미가 가장 가까운 것은?",
      "choices": [
        "gradually undermines",
        "strengthens",
        "publishes",
        "schedules"
      ],
      "choicesKo": [
        "점진적으로 약화시킨다",
        "강화한다",
        "공표한다",
        "일정을 잡는다"
      ],
      "answerIndex": 0,
      "explanation": "'an excess of false alarms quickly erodes the team's trust'에서 erodes는 신뢰를 점차 약화시킨다는 의미이므로 'gradually undermines'가 정답(가)입니다. 'strengthens(강화한다)'는 정반대 의미의 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
