# Set 100 — HARD — Postmortem of an ML Production Incident (Report)

```json
{
  "id": "set-hard-postmortem",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Incident Postmortem: Degraded Recommendation Quality on the Storefront Platform",
      "ko": "사고 사후 분석: 스토어프론트 플랫폼의 추천 품질 저하"
    },
    {
      "en": "This report documents the root cause, timeline, and corrective actions for the incident that affected our product recommendation model between the eighth and the tenth of last month.",
      "ko": "이 보고서는 지난달 8일에서 10일 사이 우리 상품 추천 모델에 영향을 준 사고의 근본 원인, 경과, 그리고 시정 조치를 기록한다."
    },
    {
      "en": "Beginning on the morning of the eighth, customers reported that recommended items had become noticeably less relevant, and click-through rates fell by 22 percent within hours.",
      "ko": "8일 아침부터 고객들은 추천 상품이 눈에 띄게 덜 관련성 있게 되었다고 보고했고, 클릭률은 몇 시간 만에 22퍼센트 하락했다."
    },
    {
      "en": "On investigation, the on-call engineer discovered that an upstream data pipeline had silently begun delivering prices in cents rather than dollars.",
      "ko": "조사 결과, 당직 엔지니어는 상위 데이터 파이프라인이 가격을 달러가 아닌 센트 단위로 조용히 전달하기 시작했음을 발견했다."
    },
    {
      "en": "Because the model treats price as a key feature, this hundredfold shift in scale skewed its predictions toward inexpensive and largely irrelevant products.",
      "ko": "모델이 가격을 핵심 특징으로 취급하기 때문에, 이 백 배의 척도 변화는 예측을 값싸고 대체로 무관한 상품 쪽으로 왜곡시켰다."
    },
    {
      "en": "The flawed data passed undetected because our validation checks confirmed that the price field was present and numeric but never verified that its values fell within an expected range.",
      "ko": "우리의 검증 검사가 가격 필드가 존재하고 숫자임은 확인했지만 그 값이 예상 범위 안에 드는지는 결코 확인하지 않았기 때문에, 결함 있는 데이터가 탐지되지 않고 통과했다."
    },
    {
      "en": "Restoring the correct pipeline configuration resolved the immediate problem, and recommendation quality returned to baseline within forty minutes of the fix.",
      "ko": "올바른 파이프라인 구성을 복원하자 즉각적인 문제가 해결되었고, 수정 후 40분 이내에 추천 품질이 기준선으로 돌아왔다."
    },
    {
      "en": "We have concluded that the underlying weakness was not the pipeline change itself but the absence of range-based validation that would have caught the anomaly.",
      "ko": "우리는 근본적인 약점이 파이프라인 변경 자체가 아니라, 그 이상을 잡아냈을 범위 기반 검증의 부재였다고 결론지었다."
    },
    {
      "en": "As a corrective measure, the team will add distribution monitoring that alerts when a feature's statistics drift sharply from their historical norms.",
      "ko": "시정 조치로서 팀은 특징의 통계가 과거 표준에서 급격히 벗어날 때 경보를 울리는 분포 모니터링을 추가할 것이다."
    },
    {
      "en": "We will also introduce a staged rollout for pipeline changes so that any future regression is contained to a small fraction of traffic before reaching all users.",
      "ko": "또한 파이프라인 변경에 단계적 출시를 도입하여, 향후 어떤 퇴행이든 모든 사용자에게 도달하기 전에 트래픽의 작은 일부로 국한되도록 할 것이다."
    },
    {
      "en": "No customer data was exposed during the incident, and no permanent harm to the model occurred, since retraining was not triggered on the corrupted inputs.",
      "ko": "사고 동안 어떤 고객 데이터도 노출되지 않았으며, 손상된 입력으로 재학습이 촉발되지 않았기에 모델에 영구적인 피해도 발생하지 않았다."
    },
    {
      "en": "A list of follow-up tasks with assigned owners and target dates appears at the end of this document.",
      "ko": "담당자와 목표 일자가 지정된 후속 작업 목록은 이 문서 끝에 제시되어 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-postmortem-q1",
      "prompt": "What is the main topic of the report?",
      "promptKo": "이 보고서의 주된 주제는 무엇인가?",
      "choices": [
        "A planned upgrade to the storefront's payment system",
        "An analysis of an incident that degraded recommendation quality",
        "A marketing campaign to boost click-through rates",
        "A proposal to retrain the model on new customer data"
      ],
      "choicesKo": [
        "스토어프론트 결제 시스템의 예정된 업그레이드",
        "추천 품질을 저하시킨 사고에 대한 분석",
        "클릭률을 높이기 위한 마케팅 캠페인",
        "새 고객 데이터로 모델을 재학습시키자는 제안"
      ],
      "answerIndex": 1,
      "explanation": "제목과 첫 문장에서 추천 모델에 영향을 준 사고의 근본 원인, 경과, 시정 조치를 기록한다고 했으므로 (나)가 정답이다. 결제 업그레이드, 마케팅, 재학습 제안이 주제가 아니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-postmortem-q2",
      "prompt": "What was the immediate cause of the degraded recommendations?",
      "promptKo": "추천 품질 저하의 직접적인 원인은 무엇이었는가?",
      "choices": [
        "Prices were delivered in cents instead of dollars",
        "The recommendation model was accidentally deleted",
        "Customer click data was lost during a backup",
        "A new model version was deployed without testing"
      ],
      "choicesKo": [
        "가격이 달러 대신 센트 단위로 전달되었다",
        "추천 모델이 실수로 삭제되었다",
        "백업 중 고객 클릭 데이터가 손실되었다",
        "새 모델 버전이 테스트 없이 배포되었다"
      ],
      "answerIndex": 0,
      "explanation": "당직 엔지니어가 상위 파이프라인이 가격을 달러가 아닌 센트 단위로 전달하기 시작했음을 발견했고, 이 척도 변화가 예측을 왜곡했다고 했으므로 (가)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-postmortem-q3",
      "prompt": "What can be inferred about the existing validation checks?",
      "promptKo": "기존 검증 검사에 대해 추론할 수 있는 것은?",
      "choices": [
        "They were thorough enough to catch the anomaly",
        "They had been disabled by the on-call engineer",
        "They triggered an unnecessary retraining of the model",
        "They were too incomplete to detect out-of-range values"
      ],
      "choicesKo": [
        "이상을 잡아낼 만큼 충분히 철저했다",
        "당직 엔지니어에 의해 비활성화되어 있었다",
        "모델의 불필요한 재학습을 촉발했다",
        "범위를 벗어난 값을 탐지하기에는 너무 불완전했다"
      ],
      "answerIndex": 3,
      "explanation": "검증 검사가 값의 존재와 숫자 여부만 확인하고 예상 범위 내인지는 확인하지 않아 결함 데이터가 통과했다고 했으므로, 검사가 불완전했다고 추론할 수 있어 (라)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-postmortem-q4",
      "prompt": "The word \"skewed\" in the report is closest in meaning to",
      "promptKo": "보고서에서 단어 \"skewed\"와 의미가 가장 가까운 것은?",
      "choices": [
        "balanced",
        "recorded",
        "distorted",
        "accelerated"
      ],
      "choicesKo": [
        "균형 잡힌",
        "기록된",
        "왜곡된",
        "가속된"
      ],
      "answerIndex": 2,
      "explanation": "'skewed'는 척도 변화가 모델의 예측을 한쪽으로 치우치게 왜곡했다는 뜻이므로 '왜곡된(distorted)'인 (다)가 가장 가깝다. (가) '균형 잡힌'은 반대 의미의 함정이다.",
      "category": "동의어"
    }
  ]
}
```
