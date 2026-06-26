# Set 57 — HARD — FinOps Cloud Analytics Review

```json
{
  "id": "set-hard-finops",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This quarter's FinOps review was commissioned after cloud analytics spending exceeded its approved budget by thirty-eight percent, a deviation steep enough to warrant a line-by-line examination of where the money is actually going.",
      "ko": "이번 분기 FinOps 검토는 클라우드 분석 지출이 승인된 예산을 38퍼센트 초과한 후 의뢰되었으며, 이는 자금이 실제로 어디로 가고 있는지에 대한 항목별 조사를 정당화할 만큼 가파른 편차였다."
    },
    {
      "en": "Our first finding is that idle compute clusters account for a surprisingly large share of the overage, since several teams provision dedicated environments for ad-hoc analysis and then leave them running long after the work is complete.",
      "ko": "첫 번째 발견 사항은 유휴 컴퓨팅 클러스터가 초과 비용의 놀라울 만큼 큰 비중을 차지한다는 것인데, 이는 여러 팀이 임시 분석을 위해 전용 환경을 프로비저닝한 뒤 작업이 끝난 한참 후까지 그것을 계속 가동 상태로 두기 때문이다."
    },
    {
      "en": "A second driver is oversized queries: analysts routinely scan entire tables when a partitioned or filtered request would return the same answer at a fraction of the cost.",
      "ko": "두 번째 요인은 과도하게 큰 쿼리이다. 분석가들은 분할되거나 필터링된 요청이 동일한 답을 훨씬 적은 비용으로 반환할 수 있음에도 일상적으로 테이블 전체를 스캔한다."
    },
    {
      "en": "Together, these two patterns represent the bulk of the recoverable spend, and both can be curtailed without retiring a single analytical capability.",
      "ko": "이 두 가지 패턴은 함께 회수 가능한 지출의 대부분을 차지하며, 둘 다 어떠한 분석 기능도 폐기하지 않고 억제될 수 있다."
    },
    {
      "en": "We therefore recommend automated policies that suspend clusters after a defined period of inactivity and that warn analysts before a query is estimated to read more than a configurable volume of data.",
      "ko": "따라서 우리는 정의된 비활성 기간 이후 클러스터를 일시 중단하고, 쿼리가 설정 가능한 데이터 용량 이상을 읽을 것으로 추정될 때 분석가에게 경고하는 자동화된 정책을 권고한다."
    },
    {
      "en": "It would be tempting to go further and impose hard caps on every workload, but the review team cautions against optimizing for cost in isolation from productivity.",
      "ko": "더 나아가 모든 워크로드에 엄격한 상한을 부과하고 싶은 유혹이 들 수 있으나, 검토 팀은 생산성과 분리하여 비용만을 최적화하는 것에 대해 경계할 것을 당부한다."
    },
    {
      "en": "An overly aggressive cap can stall a time-sensitive investigation, push analysts toward slower manual workarounds, or quietly erode trust in the very platform we are trying to make sustainable.",
      "ko": "지나치게 공격적인 상한은 시간에 민감한 조사를 멈추게 하거나, 분석가들을 더 느린 수작업 우회책으로 내몰거나, 우리가 지속 가능하게 만들고자 하는 바로 그 플랫폼에 대한 신뢰를 조용히 약화시킬 수 있다."
    },
    {
      "en": "Accordingly, the proposed controls are designed to be advisory by default and enforced only on clearly wasteful patterns, so that routine work proceeds unobstructed.",
      "ko": "따라서 제안된 통제 장치는 기본적으로 권고 형태로 설계되며 명백히 낭비적인 패턴에 대해서만 강제되도록 하여, 일상적인 업무가 방해받지 않고 진행되도록 한다."
    },
    {
      "en": "We estimate that the combined measures could reclaim roughly twenty-five percent of current monthly spend within two billing cycles, with negligible impact on legitimate analysis.",
      "ko": "우리는 이러한 결합된 조치들이 두 번의 청구 주기 이내에 현재 월간 지출의 대략 25퍼센트를 회수할 수 있으며, 정당한 분석에 미치는 영향은 무시할 만한 수준일 것으로 추정한다."
    },
    {
      "en": "Finally, we ask that finance and engineering jointly review these thresholds each quarter, treating the figures as a living agreement rather than a one-time mandate.",
      "ko": "끝으로 우리는 재무팀과 엔지니어링팀이 매 분기 이 임계값들을 공동으로 검토하여, 그 수치를 일회성 지시가 아니라 살아있는 합의로 다루어 줄 것을 요청한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-finops-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce the permanent shutdown of the analytics platform.",
        "To reassign the analytics budget to a different department.",
        "To diagnose the causes of cloud cost overruns and propose savings that protect analyst productivity.",
        "To document why the budget overage cannot be reduced."
      ],
      "choicesKo": [
        "분석 플랫폼의 영구적 폐쇄를 발표하기 위해.",
        "분석 예산을 다른 부서로 재배정하기 위해.",
        "클라우드 비용 초과의 원인을 진단하고 분석가 생산성을 보호하는 절감안을 제안하기 위해.",
        "예산 초과를 줄일 수 없는 이유를 기록하기 위해."
      ],
      "answerIndex": 2,
      "explanation": "보고서는 예산 38퍼센트 초과의 원인(유휴 클러스터, 과도한 쿼리)을 진단하고, '생산성과 분리하여 비용만을 최적화하는 것에 대해 경계'하며 절감안을 권고하므로 (다)가 목적이다. 나머지는 본문에 근거가 없다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-finops-q2",
      "prompt": "According to the report, why do idle compute clusters drive up costs?",
      "promptKo": "보고서에 따르면, 유휴 컴퓨팅 클러스터가 비용을 끌어올리는 이유는 무엇인가?",
      "choices": [
        "The cloud provider charges extra fees for partitioned queries.",
        "Teams leave dedicated ad-hoc environments running long after the work is finished.",
        "Analysts intentionally scan small filtered tables.",
        "Hard caps automatically restart clusters every night."
      ],
      "choicesKo": [
        "클라우드 제공업체가 분할 쿼리에 추가 요금을 부과한다.",
        "팀들이 전용 임시 환경을 작업이 끝난 한참 후까지 계속 가동 상태로 둔다.",
        "분석가들이 의도적으로 작고 필터링된 테이블을 스캔한다.",
        "엄격한 상한이 매일 밤 자동으로 클러스터를 재시작한다."
      ],
      "answerIndex": 1,
      "explanation": "두 번째 문장에서 여러 팀이 '임시 분석을 위해 전용 환경을 프로비저닝한 뒤 작업이 끝난 한참 후까지 그것을 계속 가동 상태로 두기 때문'이라고 했으므로 (나)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-finops-q3",
      "prompt": "What can be inferred about the team's stance on strict spending caps?",
      "promptKo": "엄격한 지출 상한에 대한 팀의 입장에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They believe aggressive caps are the safest and most effective option.",
        "They favor caps because manual workarounds are faster than queries.",
        "They recommend removing all controls to maximize analyst freedom.",
        "They are wary of caps that could harm productivity and prefer mostly advisory controls."
      ],
      "choicesKo": [
        "공격적인 상한이 가장 안전하고 효과적인 선택지라고 믿는다.",
        "수작업 우회책이 쿼리보다 빠르기 때문에 상한을 선호한다.",
        "분석가의 자유를 극대화하기 위해 모든 통제를 없앨 것을 권고한다.",
        "생산성을 해칠 수 있는 상한을 경계하며 대체로 권고 형태의 통제를 선호한다."
      ],
      "answerIndex": 3,
      "explanation": "여섯 번째와 여덟 번째 문장에서 '비용만을 최적화하는 것에 대해 경계'하고 통제 장치를 '기본적으로 권고 형태로 설계'한다고 했으므로, 팀이 생산성을 해칠 상한을 경계하며 권고형 통제를 선호한다는 (라)를 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-finops-q4",
      "prompt": "In the report, the word \"curtailed\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"curtailed\"와 의미가 가장 가까운 것은?",
      "choices": [
        "reduced",
        "expanded",
        "audited",
        "delayed"
      ],
      "choicesKo": [
        "줄여진",
        "확대된",
        "감사된",
        "지연된"
      ],
      "answerIndex": 0,
      "explanation": "네 번째 문장에서 'curtailed'는 낭비적 지출 패턴을 '억제/축소되다'라는 의미로 쓰였으므로 (가) reduced가 정답이다. (나) expanded(확대된)는 반대 의미의 함정 선택지이다.",
      "category": "동의어"
    }
  ]
}
```
