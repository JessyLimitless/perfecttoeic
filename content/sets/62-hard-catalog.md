# Set 62 — HARD — Data Catalog Rollout (Internal Report)

```json
{
  "id": "set-hard-catalog",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "When the Data Platform team launched our internal data catalog last quarter, the immediate goal was modest: to give analysts a single place to locate the datasets scattered across our cloud warehouses.",
      "ko": "데이터 플랫폼 팀이 지난 분기에 내부 데이터 카탈로그를 출시했을 때, 당장의 목표는 소박했습니다. 즉, 여러 클라우드 웨어하우스에 흩어져 있는 데이터셋을 분석가들이 한곳에서 찾을 수 있도록 하는 것이었습니다."
    },
    {
      "en": "Discoverability improved almost overnight, and within weeks the number of duplicated tables created by teams unaware of existing sources fell sharply.",
      "ko": "발견 가능성은 거의 하룻밤 사이에 개선되었고, 몇 주 만에 기존 출처를 알지 못한 팀들이 만든 중복 테이블의 수가 급격히 줄었습니다."
    },
    {
      "en": "Yet early enthusiasm masked a more stubborn problem that only surfaced once usage grew.",
      "ko": "그러나 초기의 열기는 사용량이 늘어난 뒤에야 비로소 드러난, 더 끈질긴 문제를 가리고 있었습니다."
    },
    {
      "en": "Many entries were accurate on the day they were registered but quietly drifted out of date as schemas changed, owners moved teams, and pipelines were retired.",
      "ko": "많은 항목들이 등록된 날에는 정확했지만, 스키마가 바뀌고 담당자가 팀을 옮기고 파이프라인이 폐기되면서 조용히 시대에 뒤떨어지게 되었습니다."
    },
    {
      "en": "An impressively complete catalog is worthless, even harmful, if analysts cannot trust that what it describes still reflects reality.",
      "ko": "인상적일 만큼 완벽한 카탈로그라도 분석가들이 그것이 설명하는 내용이 여전히 현실을 반영한다고 신뢰할 수 없다면 무가치하며, 심지어 해롭기까지 합니다."
    },
    {
      "en": "Our first instinct was to ask data owners to review their entries manually each month, but that approach predictably collapsed under competing priorities.",
      "ko": "우리의 첫 본능은 데이터 담당자들에게 매달 수동으로 항목을 검토하도록 요청하는 것이었지만, 그 방식은 예상대로 다른 우선순위에 밀려 무너졌습니다."
    },
    {
      "en": "What ultimately made the catalog reliable was not more discipline but better automation: connectors now harvest technical metadata directly from the warehouses on a nightly schedule, so column changes and freshness statistics update themselves.",
      "ko": "궁극적으로 카탈로그를 신뢰할 수 있게 만든 것은 더 강한 규율이 아니라 더 나은 자동화였습니다. 즉, 커넥터들이 이제 매일 밤 정해진 일정에 따라 웨어하우스에서 기술 메타데이터를 직접 수집하므로, 컬럼 변경과 최신성 통계가 스스로 갱신됩니다."
    },
    {
      "en": "Automation alone, however, cannot decide who is accountable for a dataset or what business meaning a cryptic field carries.",
      "ko": "하지만 자동화만으로는 누가 어떤 데이터셋에 책임이 있는지, 혹은 알기 어려운 필드가 어떤 비즈니스적 의미를 지니는지를 결정할 수는 없습니다."
    },
    {
      "en": "For that reason we paired the automated layer with a lightweight ownership policy that assigns every registered dataset to a named steward and flags any entry left without one.",
      "ko": "그런 이유로 우리는 자동화 계층에, 등록된 모든 데이터셋을 지정된 책임자에게 배정하고 책임자가 없는 항목을 표시하는 가벼운 소유권 정책을 결합했습니다."
    },
    {
      "en": "The combination proved decisive, because automated signals keep the facts current while clear stewardship keeps the context meaningful.",
      "ko": "이 조합은 결정적인 것으로 판명되었는데, 자동화된 신호가 사실을 최신으로 유지하는 한편 명확한 책임 관리가 맥락을 의미 있게 유지해 주기 때문입니다."
    },
    {
      "en": "Three months on, trust scores reported by surveyed analysts have risen from forty to eighty-one percent, and the catalog is now treated as a source of record rather than a directory to be double-checked.",
      "ko": "3개월이 지난 지금, 설문에 응한 분석가들이 보고한 신뢰 점수는 40퍼센트에서 81퍼센트로 상승했으며, 카탈로그는 이제 재확인이 필요한 목록이 아니라 공식 기록의 출처로 취급됩니다."
    },
    {
      "en": "The lesson we will carry into the next phase is that cataloging data is the easy half; sustaining its accuracy is the work that actually earns adoption.",
      "ko": "우리가 다음 단계로 가져갈 교훈은, 데이터를 목록화하는 것은 쉬운 절반이며 그 정확성을 유지하는 것이야말로 실제로 도입을 이끌어 내는 작업이라는 점입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-catalog-q1",
      "prompt": "What is the main point of the report?",
      "promptKo": "보고서의 요점은 무엇인가?",
      "choices": [
        "Keeping catalog entries accurate, not merely creating them, is what made the tool trustworthy.",
        "The cloud warehouses should be consolidated into a single physical database.",
        "Manual monthly reviews are the most effective way to maintain metadata.",
        "Discoverability is unimportant compared with the number of datasets stored."
      ],
      "choicesKo": [
        "단순히 항목을 만드는 것이 아니라 카탈로그 항목을 정확하게 유지하는 것이 도구를 신뢰할 수 있게 만들었다.",
        "클라우드 웨어하우스들을 하나의 물리적 데이터베이스로 통합해야 한다.",
        "수동 월간 검토가 메타데이터를 유지하는 가장 효과적인 방법이다.",
        "저장된 데이터셋의 수에 비해 발견 가능성은 중요하지 않다."
      ],
      "answerIndex": 0,
      "explanation": "마지막 문장 'cataloging data is the easy half; sustaining its accuracy is the work that actually earns adoption'와 본문 전반이 정확성 유지가 핵심임을 강조합니다. 따라서 항목을 만드는 것보다 정확하게 유지하는 것이 신뢰를 만들었다는 (가)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-catalog-q2",
      "prompt": "According to the report, how is technical metadata now kept current?",
      "promptKo": "보고서에 따르면 기술 메타데이터는 이제 어떻게 최신으로 유지되는가?",
      "choices": [
        "Owners email updates to the platform team each week.",
        "The catalog is rebuilt from scratch every quarter.",
        "Analysts manually re-register each dataset before use.",
        "Connectors harvest it directly from the warehouses on a nightly schedule."
      ],
      "choicesKo": [
        "담당자들이 매주 플랫폼 팀에 업데이트를 이메일로 보낸다.",
        "카탈로그는 분기마다 처음부터 다시 구축된다.",
        "분석가들이 사용 전에 각 데이터셋을 수동으로 다시 등록한다.",
        "커넥터들이 매일 밤 정해진 일정에 따라 웨어하우스에서 직접 수집한다."
      ],
      "answerIndex": 3,
      "explanation": "본문 'connectors now harvest technical metadata directly from the warehouses on a nightly schedule, so column changes and freshness statistics update themselves'에서 커넥터가 매일 밤 직접 수집한다고 명시되어 있으므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-catalog-q3",
      "prompt": "What can be inferred about why automation alone was not sufficient?",
      "promptKo": "자동화만으로는 충분하지 않았던 이유에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "Automated connectors were too expensive for the team's budget.",
        "Warehouses do not store any technical metadata at all.",
        "Some information, such as accountability and business meaning, requires human judgment that tools cannot supply.",
        "Analysts refused to use any system that involved automation."
      ],
      "choicesKo": [
        "자동화 커넥터는 팀 예산에 비해 너무 비쌌다.",
        "웨어하우스는 기술 메타데이터를 전혀 저장하지 않는다.",
        "책임 소재나 비즈니스적 의미 같은 일부 정보는 도구가 제공할 수 없는 인간의 판단을 필요로 한다.",
        "분석가들은 자동화가 포함된 어떤 시스템도 사용하기를 거부했다."
      ],
      "answerIndex": 2,
      "explanation": "본문 'Automation alone, however, cannot decide who is accountable for a dataset or what business meaning a cryptic field carries'에서 자동화가 책임 소재와 비즈니스 의미를 결정할 수 없다고 했으므로, 인간의 판단이 필요하다는 (다)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-catalog-q4",
      "prompt": "In the report, the word \"drifted\" in paragraph two is closest in meaning to",
      "promptKo": "보고서에서 둘째 단락의 단어 \"drifted\"와 의미가 가장 가까운 것은",
      "choices": [
        "remained fixed",
        "gradually became",
        "was deleted",
        "was duplicated"
      ],
      "choicesKo": [
        "고정된 채 있었다",
        "점차 ~하게 되었다",
        "삭제되었다",
        "복제되었다"
      ],
      "answerIndex": 1,
      "explanation": "'quietly drifted out of date as schemas changed'에서 'drifted out of date'는 시간이 지나며 점차 시대에 뒤떨어지게 되었다는 의미이므로 'gradually became'(점차 ~하게 되었다)가 가장 가깝습니다. 'remained fixed'(고정된 채 있었다)는 반대 의미의 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
