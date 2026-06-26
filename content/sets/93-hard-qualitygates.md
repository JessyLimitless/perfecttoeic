# Set 93 — HARD — Data Quality Gates (Report)

```json
{
  "id": "set-hard-qualitygates",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Quarterly Data Reliability Report — Prepared by the Platform Data Engineering Team",
      "ko": "분기별 데이터 신뢰성 보고서 — 플랫폼 데이터 엔지니어링 팀 작성"
    },
    {
      "en": "Over the past three months, the team introduced a layer of automated validation tests, known internally as quality gates, into every production data pipeline.",
      "ko": "지난 3개월 동안, 팀은 사내에서 품질 게이트라고 불리는 자동화된 검증 테스트 계층을 모든 운영 데이터 파이프라인에 도입했다."
    },
    {
      "en": "Each gate inspects an incoming dataset against a set of predefined rules before that data is allowed to proceed to downstream analytics.",
      "ko": "각 게이트는 들어오는 데이터셋을 사전에 정의된 일련의 규칙에 따라 검사한 뒤에야 해당 데이터가 하위 분석 단계로 진행되도록 허용한다."
    },
    {
      "en": "When a dataset fails a gate, the pipeline halts automatically and notifies the owning team rather than passing flawed records onward.",
      "ko": "데이터셋이 게이트를 통과하지 못하면, 파이프라인은 결함이 있는 레코드를 다음 단계로 넘기는 대신 자동으로 멈추고 담당 팀에 알림을 보낸다."
    },
    {
      "en": "The rules fall into three broad classes: schema checks, range checks, and freshness checks.",
      "ko": "규칙은 크게 세 가지 범주로 나뉜다: 스키마 검사, 범위 검사, 그리고 신선도 검사이다."
    },
    {
      "en": "Schema checks confirm that columns, data types, and key constraints match what downstream models expect.",
      "ko": "스키마 검사는 컬럼, 데이터 타입, 그리고 키 제약 조건이 하위 모델이 기대하는 바와 일치하는지 확인한다."
    },
    {
      "en": "Range checks flag numeric values that fall outside historically plausible bounds, such as a negative transaction amount.",
      "ko": "범위 검사는 음수의 거래 금액처럼 역사적으로 타당한 범위를 벗어나는 수치 값을 표시한다."
    },
    {
      "en": "Freshness checks ensure that the most recent records arrived within the expected time window, catching stalled feeds early.",
      "ko": "신선도 검사는 가장 최근의 레코드가 예상된 시간 범위 안에 도착했는지 확인하여 멈춘 데이터 피드를 조기에 포착한다."
    },
    {
      "en": "Since the rollout, the proportion of analytics incidents traced to corrupt source data has declined by roughly forty percent.",
      "ko": "도입 이후, 손상된 원본 데이터로 인한 분석 사고의 비율이 대략 40퍼센트 감소했다."
    },
    {
      "en": "However, an unexpected side effect emerged: overly strict thresholds occasionally blocked legitimate data, producing false alarms that consumed engineering time.",
      "ko": "그러나 예상치 못한 부작용이 나타났다: 지나치게 엄격한 임계값이 때때로 정상적인 데이터를 차단하여 엔지니어링 시간을 소모하는 거짓 경보를 발생시켰다."
    },
    {
      "en": "To address this, the team now reviews gate thresholds monthly and tunes them based on observed data drift.",
      "ko": "이를 해결하기 위해, 팀은 이제 매월 게이트 임계값을 검토하고 관찰된 데이터 드리프트를 바탕으로 이를 조정한다."
    },
    {
      "en": "The team recommends extending quality gates to the experimental machine-learning feature store during the next quarter.",
      "ko": "팀은 다음 분기 동안 품질 게이트를 실험적인 머신러닝 피처 스토어로 확장할 것을 권장한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-qualitygates-q1",
      "prompt": "What is the main purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To compare two competing analytics vendors",
        "To announce the hiring of a new data engineering team",
        "To summarize the introduction and impact of automated data quality gates",
        "To request additional budget for server hardware"
      ],
      "choicesKo": [
        "경쟁하는 두 분석 업체를 비교하기 위해",
        "새로운 데이터 엔지니어링 팀의 채용을 알리기 위해",
        "자동화된 데이터 품질 게이트의 도입과 그 영향을 요약하기 위해",
        "서버 하드웨어를 위한 추가 예산을 요청하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "보고서는 품질 게이트라는 자동 검증 테스트를 파이프라인에 도입하고 그 효과(사고 40% 감소 등)를 설명한다. 따라서 도입과 영향을 요약하는 (다)가 정답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-qualitygates-q2",
      "prompt": "According to the report, what happens when a dataset fails a quality gate?",
      "promptKo": "보고서에 따르면, 데이터셋이 품질 게이트를 통과하지 못하면 무슨 일이 일어나는가?",
      "choices": [
        "The flawed records are automatically corrected and forwarded",
        "The pipeline stops and notifies the owning team",
        "The data is sent to a competing pipeline for review",
        "The gate is permanently disabled to avoid future delays"
      ],
      "choicesKo": [
        "결함 있는 레코드가 자동으로 수정되어 전달된다",
        "파이프라인이 멈추고 담당 팀에 알린다",
        "데이터가 검토를 위해 경쟁 파이프라인으로 보내진다",
        "향후 지연을 피하기 위해 게이트가 영구적으로 비활성화된다"
      ],
      "answerIndex": 1,
      "explanation": "본문에 '데이터셋이 게이트를 통과하지 못하면 파이프라인은 자동으로 멈추고 담당 팀에 알림을 보낸다'고 명시되어 있으므로 (나)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-qualitygates-q3",
      "prompt": "What can be inferred about overly strict thresholds?",
      "promptKo": "지나치게 엄격한 임계값에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "They eliminated the need for any human review",
        "They reduced the total number of pipelines to zero",
        "They were preferred because they never blocked valid data",
        "They can create a trade-off between data safety and wasted effort"
      ],
      "choicesKo": [
        "그것들은 모든 인간 검토의 필요성을 없앴다",
        "그것들은 파이프라인의 총 개수를 0으로 줄였다",
        "그것들은 정상 데이터를 결코 차단하지 않아 선호되었다",
        "그것들은 데이터 안전성과 낭비된 노력 사이의 절충을 만들 수 있다"
      ],
      "answerIndex": 3,
      "explanation": "엄격한 임계값이 정상 데이터를 차단해 거짓 경보로 엔지니어링 시간을 소모했고, 이에 임계값을 매월 조정한다고 했다. 즉 안전성과 낭비되는 노력 사이의 절충이 존재함을 추론할 수 있으므로 (라)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-qualitygates-q4",
      "prompt": "The word \"halts\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"halts\"와 의미가 가장 가까운 것은?",
      "choices": [
        "stops",
        "accelerates",
        "duplicates",
        "publishes"
      ],
      "choicesKo": [
        "멈추다",
        "가속하다",
        "복제하다",
        "게시하다"
      ],
      "answerIndex": 0,
      "explanation": "'halts'는 '멈추다'라는 뜻으로 'stops'와 가장 가깝다. 'accelerates(가속하다)'는 반대 의미의 함정 보기이므로 (가)가 정답이다.",
      "category": "동의어"
    }
  ]
}
```
