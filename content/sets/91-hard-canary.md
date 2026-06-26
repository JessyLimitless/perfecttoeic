# Set 91 — HARD — Canary Deployments (Notice)

```json
{
  "id": "set-hard-canary",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Updated Procedure for Canary Deployments of Production Machine Learning Models",
      "ko": "공지: 프로덕션 머신러닝 모델의 카나리 배포에 대한 절차 변경"
    },
    {
      "en": "Effective the first of next month, all teams releasing a new model version to live traffic must follow the canary procedure described below.",
      "ko": "다음 달 1일부터, 새 모델 버전을 실시간 트래픽에 출시하는 모든 팀은 아래 설명된 카나리 절차를 따라야 한다."
    },
    {
      "en": "A canary deployment routes a small, controlled share of incoming requests to the new model while the established version continues to serve the remainder.",
      "ko": "카나리 배포는 들어오는 요청의 작고 통제된 비율을 새 모델로 보내고, 기존 버전이 나머지를 계속 처리하도록 한다."
    },
    {
      "en": "Under the revised policy, the initial canary share must not exceed five percent of total traffic for the first twenty-four hours.",
      "ko": "수정된 정책에 따라, 초기 카나리 비율은 첫 24시간 동안 전체 트래픽의 5퍼센트를 초과해서는 안 된다."
    },
    {
      "en": "During this window, the on-call engineer is required to monitor a fixed set of guardrail metrics, including prediction latency, error rate, and a business outcome of the team's choosing.",
      "ko": "이 기간 동안 당직 엔지니어는 예측 지연, 오류율, 그리고 팀이 선택한 비즈니스 성과를 포함한 고정된 가드레일 지표 집합을 모니터링해야 한다."
    },
    {
      "en": "If any guardrail metric degrades beyond its agreed threshold, traffic must be reverted to the previous version immediately and without waiting for managerial approval.",
      "ko": "어떤 가드레일 지표라도 합의된 임계값을 넘어 악화되면, 트래픽은 관리자 승인을 기다리지 않고 즉시 이전 버전으로 되돌려야 한다."
    },
    {
      "en": "Only after the canary has remained healthy for a full day may the share be increased in stages of twenty-five percent.",
      "ko": "카나리가 하루 종일 정상 상태를 유지한 후에야 비율을 25퍼센트 단위로 증가시킬 수 있다."
    },
    {
      "en": "Please note that this graduated rollout replaces the former practice of switching all traffic at once, which had caused two significant outages last quarter.",
      "ko": "이 단계적 출시가 지난 분기에 두 건의 중대한 장애를 일으켰던, 모든 트래픽을 한 번에 전환하던 기존 관행을 대체한다는 점에 유의하기 바란다."
    },
    {
      "en": "Teams are reminded that a canary tests real user behavior, so offline evaluation scores alone are not a substitute for this procedure.",
      "ko": "카나리는 실제 사용자 행동을 검증하므로 오프라인 평가 점수만으로는 이 절차를 대체할 수 없음을 팀들에게 상기시킨다."
    },
    {
      "en": "A standardized dashboard for tracking guardrail metrics will be made available through the internal platform portal by the end of this week.",
      "ko": "가드레일 지표를 추적하기 위한 표준화된 대시보드가 이번 주말까지 내부 플랫폼 포털을 통해 제공될 것이다."
    },
    {
      "en": "Questions regarding the new requirements should be directed to the Reliability Engineering group rather than to individual product managers.",
      "ko": "새 요구사항에 관한 질문은 개별 제품 관리자가 아닌 신뢰성 엔지니어링 그룹으로 문의해야 한다."
    },
    {
      "en": "Compliance with this notice will be reviewed during the monthly deployment audit.",
      "ko": "이 공지의 준수 여부는 월간 배포 감사 시 검토될 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-canary-q1",
      "prompt": "What is the primary purpose of the notice?",
      "promptKo": "이 공지의 주된 목적은 무엇인가?",
      "choices": [
        "To report the financial results of the previous quarter",
        "To advertise a training course on machine learning evaluation",
        "To announce a new mandatory procedure for releasing model versions gradually",
        "To request volunteers for the Reliability Engineering group"
      ],
      "choicesKo": [
        "이전 분기의 재무 실적을 보고하기 위해",
        "머신러닝 평가에 관한 교육 과정을 광고하기 위해",
        "모델 버전을 점진적으로 출시하기 위한 새로운 의무 절차를 알리기 위해",
        "신뢰성 엔지니어링 그룹의 지원자를 모집하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "공지는 새 모델 버전을 실시간 트래픽에 출시하는 모든 팀이 따라야 할 카나리 절차(단계적 출시)를 의무화한다. 따라서 (다)가 정답이다. 교육, 재무 실적, 지원자 모집은 다루지 않는다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-canary-q2",
      "prompt": "According to the notice, what must happen if a guardrail metric exceeds its threshold?",
      "promptKo": "공지에 따르면, 가드레일 지표가 임계값을 초과하면 무엇을 해야 하는가?",
      "choices": [
        "The canary share must be raised to twenty-five percent.",
        "Traffic must be reverted to the previous version at once.",
        "The team must wait for managerial approval before acting.",
        "The deployment audit must be postponed."
      ],
      "choicesKo": [
        "카나리 비율을 25퍼센트로 올려야 한다.",
        "트래픽을 즉시 이전 버전으로 되돌려야 한다.",
        "조치를 취하기 전에 관리자 승인을 기다려야 한다.",
        "배포 감사를 연기해야 한다."
      ],
      "answerIndex": 1,
      "explanation": "공지는 가드레일 지표가 합의된 임계값을 넘어 악화되면 '관리자 승인을 기다리지 않고 즉시 이전 버전으로 되돌려야 한다'고 명시한다. 따라서 (나)가 정답이며, 승인을 기다리라는 (다)는 명백히 틀리다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-canary-q3",
      "prompt": "What can be inferred about the company's previous deployment practice?",
      "promptKo": "회사의 이전 배포 관행에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It was riskier and contributed to service failures.",
        "It relied exclusively on a standardized dashboard.",
        "It limited the canary share to five percent.",
        "It required approval from the Reliability Engineering group."
      ],
      "choicesKo": [
        "더 위험했으며 서비스 장애의 원인이 되었다.",
        "표준화된 대시보드에만 의존했다.",
        "카나리 비율을 5퍼센트로 제한했다.",
        "신뢰성 엔지니어링 그룹의 승인이 필요했다."
      ],
      "answerIndex": 0,
      "explanation": "공지는 단계적 출시가 '모든 트래픽을 한 번에 전환하던 기존 관행을 대체하며, 그 관행이 지난 분기 두 건의 중대한 장애를 일으켰다'고 했다. 따라서 이전 관행이 더 위험하고 장애의 원인이었음을 추론할 수 있으므로 (가)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-canary-q4",
      "prompt": "The word \"degrades\" in the notice is closest in meaning to",
      "promptKo": "공지에서 단어 \"degrades\"와 의미가 가장 가까운 것은",
      "choices": [
        "improves",
        "is published",
        "is measured",
        "worsens"
      ],
      "choicesKo": [
        "개선되다",
        "게시되다",
        "측정되다",
        "악화되다"
      ],
      "answerIndex": 3,
      "explanation": "'degrades beyond its agreed threshold'는 지표가 합의된 임계값을 넘어 나빠진다는 뜻이므로 'worsens(악화되다)'가 가장 가깝다. 따라서 (라)가 정답이다. (가) 'improves(개선되다)'는 반의어다.",
      "category": "동의어"
    }
  ]
}
```
