# Set 45 — HARD — Data Observability and Lineage Tracking

```json
{
  "id": "set-hard-observability",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "Over the past two quarters, the analytics platform team has repeatedly been alerted to dashboard anomalies only after business stakeholders noticed implausible figures.",
      "ko": "지난 두 분기 동안, 분석 플랫폼 팀은 사업 부서 이해관계자들이 믿기 어려운 수치를 알아챈 후에야 비로소 대시보드 이상에 대해 통보받는 일이 반복되었다."
    },
    {
      "en": "In each case the underlying data pipeline had failed silently—no job errored, no alert fired, and the tables continued to populate with values that looked superficially normal.",
      "ko": "각 사례에서 기저의 데이터 파이프라인은 조용히 실패했다—어떤 작업도 오류를 내지 않았고, 어떤 경보도 울리지 않았으며, 테이블은 표면적으로 정상으로 보이는 값으로 계속 채워졌다."
    },
    {
      "en": "This report recommends adopting data observability, a discipline that continuously monitors the freshness, volume, distribution, and schema of datasets to surface problems before they reach end users.",
      "ko": "본 보고서는 데이터 관측성을 도입할 것을 권고하는데, 이는 데이터셋의 신선도, 양, 분포, 스키마를 지속적으로 모니터링하여 문제가 최종 사용자에게 도달하기 전에 드러내는 분야이다."
    },
    {
      "en": "Complementing observability, lineage tracking maps how each field is derived from upstream sources, so that when a metric drifts, engineers can trace the fault to its origin instead of guessing.",
      "ko": "관측성을 보완하는 계보 추적은 각 필드가 상류 출처로부터 어떻게 도출되는지를 지도화하여, 지표가 어긋날 때 엔지니어가 추측 대신 결함을 그 근원까지 추적할 수 있게 한다."
    },
    {
      "en": "Together these capabilities convert vague suspicions into concrete, actionable signals.",
      "ko": "이 두 역량은 함께 막연한 의심을 구체적이고 실행 가능한 신호로 전환한다."
    },
    {
      "en": "The principal cost is instrumentation: every critical table must be annotated with expectations, and the monitoring layer must be integrated into existing orchestration tools.",
      "ko": "주된 비용은 계측이다. 모든 중요한 테이블에는 기대치가 주석으로 달려야 하며, 모니터링 계층은 기존 오케스트레이션 도구에 통합되어야 한다."
    },
    {
      "en": "This effort is not trivial, and during the initial rollout teams should expect a temporary increase in false alarms as thresholds are calibrated.",
      "ko": "이 작업은 사소하지 않으며, 초기 도입 기간 동안 임계값이 보정되는 과정에서 팀은 거짓 경보의 일시적 증가를 예상해야 한다."
    },
    {
      "en": "We argue, however, that the payoff decisively outweighs the upfront investment.",
      "ko": "그러나 우리는 그 보상이 초기 투자를 결정적으로 능가한다고 주장한다."
    },
    {
      "en": "A single corrupted revenue dashboard that informs an executive decision can cost far more than the engineering hours required to instrument the pipelines feeding it.",
      "ko": "임원의 의사 결정에 정보를 제공하는 단 하나의 손상된 매출 대시보드는, 그것에 데이터를 공급하는 파이프라인을 계측하는 데 드는 엔지니어링 시간보다 훨씬 더 큰 비용을 초래할 수 있다."
    },
    {
      "en": "Equally important, catching defects early shortens the time engineers spend on reactive firefighting, freeing them to deliver new capabilities.",
      "ko": "마찬가지로 중요한 것은, 결함을 일찍 잡아내면 엔지니어가 사후 대응식 긴급 처리에 쓰는 시간이 줄어들어, 새로운 기능을 제공하는 데 전념할 수 있게 된다는 점이다."
    },
    {
      "en": "We therefore propose a phased pilot beginning with the three most business-critical pipelines, followed by a review after sixty days to quantify detected incidents and refine alert thresholds before any wider rollout.",
      "ko": "따라서 우리는 가장 사업적으로 중요한 세 개의 파이프라인부터 시작하는 단계적 시범 운영을 제안하며, 더 광범위한 도입에 앞서 60일 후 검토를 통해 탐지된 사건을 정량화하고 경보 임계값을 정교화할 것을 제안한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-observability-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To assign blame for past dashboard failures to specific engineers.",
        "To request additional staff for manual data checking.",
        "To announce the permanent shutdown of the analytics platform.",
        "To recommend adopting data observability and lineage tracking through a phased pilot."
      ],
      "choicesKo": [
        "과거 대시보드 실패의 책임을 특정 엔지니어에게 돌리기 위해서.",
        "수동 데이터 점검을 위한 추가 인력을 요청하기 위해서.",
        "분석 플랫폼의 영구 폐쇄를 발표하기 위해서.",
        "단계적 시범 운영을 통해 데이터 관측성과 계보 추적 도입을 권고하기 위해서."
      ],
      "answerIndex": 3,
      "explanation": "\"This report recommends adopting data observability...\"와 마지막 문장의 단계적 시범 운영 제안이 보고서의 목적을 보여 주므로 정답은 2번이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-observability-q2",
      "prompt": "According to the report, what made the past pipeline failures difficult to detect?",
      "promptKo": "보고서에 따르면, 과거 파이프라인 실패를 탐지하기 어렵게 만든 것은 무엇인가?",
      "choices": [
        "The pipelines failed silently with no errors or alerts while tables looked normal.",
        "Stakeholders refused to report any anomalies.",
        "The dashboards were taken offline entirely.",
        "The monitoring layer produced too many accurate alerts."
      ],
      "choicesKo": [
        "파이프라인이 오류나 경보 없이 조용히 실패했고 테이블은 정상으로 보였다.",
        "이해관계자들이 어떤 이상도 보고하기를 거부했다.",
        "대시보드가 완전히 오프라인 처리되었다.",
        "모니터링 계층이 정확한 경보를 너무 많이 생성했다."
      ],
      "answerIndex": 0,
      "explanation": "\"the underlying data pipeline had failed silently—no job errored, no alert fired, and the tables continued to populate with values that looked superficially normal.\"가 근거이므로 정답은 3번이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-observability-q3",
      "prompt": "What can be inferred about the period immediately after the initial rollout?",
      "promptKo": "초기 도입 직후 기간에 대해 추론할 수 있는 것은?",
      "choices": [
        "Engineers will not need to adjust any settings.",
        "The system will be fully reliable from day one.",
        "Teams may need to tolerate some imperfect alerting while thresholds are tuned.",
        "All false alarms will disappear immediately."
      ],
      "choicesKo": [
        "엔지니어가 어떤 설정도 조정할 필요가 없을 것이다.",
        "시스템이 첫날부터 완전히 신뢰할 수 있을 것이다.",
        "임계값이 조정되는 동안 팀이 다소 불완전한 경보를 감내해야 할 수 있다.",
        "모든 거짓 경보가 즉시 사라질 것이다."
      ],
      "answerIndex": 2,
      "explanation": "\"during the initial rollout teams should expect a temporary increase in false alarms as thresholds are calibrated.\"는 초기에 경보가 완벽하지 않으며 보정이 필요함을 시사하므로 정답은 3번이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-observability-q4",
      "prompt": "In the report, the word \"trivial\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"trivial\"과 의미상 가장 가까운 것은?",
      "choices": [
        "demanding",
        "insignificant",
        "expensive",
        "permanent"
      ],
      "choicesKo": [
        "부담이 큰",
        "사소한",
        "비싼",
        "영구적인"
      ],
      "answerIndex": 1,
      "explanation": "\"This effort is not trivial\"에서 \"trivial\"은 사소하고 대수롭지 않다는 뜻이므로 \"insignificant\"(사소한)가 정답이며, \"demanding\"(부담이 큰)은 문맥상 의미가 반대인 오답이다.",
      "category": "동의어"
    }
  ]
}
```
