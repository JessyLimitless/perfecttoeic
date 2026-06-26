# Set 22 — MEDIUM — Quarterly Dashboard Usage Report (Report)

```json
{
  "id": "set-medium-usage",
  "difficulty": "MEDIUM",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This quarter's analytics review shows that the Sales Performance dashboard remained our most-viewed resource, drawing more than 4,200 unique users across all regional teams.",
      "ko": "이번 분기 분석 검토에 따르면 영업 실적 대시보드가 모든 지역 팀에 걸쳐 4,200명이 넘는 고유 사용자를 끌어모으며 가장 많이 조회된 리소스로 유지되었습니다."
    },
    {
      "en": "Usage of the Sales Performance dashboard rose sharply in the final month, coinciding with the start of the regional planning cycle.",
      "ko": "영업 실적 대시보드의 사용량은 지역 계획 주기의 시작과 맞물려 마지막 달에 급격히 증가했습니다."
    },
    {
      "en": "The Customer Retention and Marketing Funnel dashboards followed, each attracting a steady audience of several hundred weekly viewers.",
      "ko": "고객 유지 대시보드와 마케팅 퍼널 대시보드가 그 뒤를 이었으며, 각각 매주 수백 명의 꾸준한 시청자를 끌어모았습니다."
    },
    {
      "en": "By contrast, the Legacy Inventory dashboard and the Vendor Risk dashboard each recorded fewer than 30 views over the same three-month period.",
      "ko": "이와 대조적으로 레거시 재고 대시보드와 공급업체 리스크 대시보드는 동일한 3개월 기간 동안 각각 30회 미만의 조회수를 기록했습니다."
    },
    {
      "en": "Most of those few views came from automated test accounts rather than from genuine business users.",
      "ko": "그 적은 조회수의 대부분은 실제 비즈니스 사용자가 아니라 자동화된 테스트 계정에서 발생했습니다."
    },
    {
      "en": "Maintaining these rarely used dashboards still consumes engineering time and adds to our monthly data-processing costs.",
      "ko": "이렇게 거의 사용되지 않는 대시보드를 유지하는 것은 여전히 엔지니어링 시간을 소모하고 월간 데이터 처리 비용을 증가시킵니다."
    },
    {
      "en": "Each dashboard must be refreshed nightly, and any data error in them still triggers an on-call alert for the engineering team.",
      "ko": "각 대시보드는 매일 밤 갱신되어야 하며, 그 안의 어떤 데이터 오류라도 여전히 엔지니어링 팀의 당직 경보를 발생시킵니다."
    },
    {
      "en": "We therefore recommend retiring both low-traffic dashboards by the end of next month, after notifying their few remaining owners.",
      "ko": "따라서 우리는 소수의 남아 있는 소유자에게 통지한 후 다음 달 말까지 두 저(低)트래픽 대시보드를 모두 폐기할 것을 권장합니다."
    },
    {
      "en": "Before removal, we will export a final snapshot of each dashboard so that any historical figures remain available on request.",
      "ko": "폐기 전에 우리는 각 대시보드의 최종 스냅샷을 내보내어 요청 시 과거 수치가 계속 제공될 수 있도록 할 것입니다."
    },
    {
      "en": "Doing so would let the analytics team redirect its efforts toward the high-demand reports that drive day-to-day decisions.",
      "ko": "그렇게 하면 분석 팀이 일상적인 의사 결정을 이끄는 수요가 높은 보고서로 노력을 재배치할 수 있을 것입니다."
    },
    {
      "en": "We will review the impact of these changes in next quarter's report to confirm that no critical workflow was disrupted.",
      "ko": "우리는 다음 분기 보고서에서 이러한 변경의 영향을 검토하여 어떤 중요한 업무 흐름도 중단되지 않았음을 확인할 것입니다."
    }
  ],
  "questions": [
    {
      "id": "set-medium-usage-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To summarize dashboard usage and recommend retiring unused ones.",
        "To announce the launch of a new sales dashboard.",
        "To request additional engineers for the analytics team.",
        "To compare the sales results of different regional teams."
      ],
      "choicesKo": [
        "대시보드 사용 현황을 요약하고 사용되지 않는 것의 폐기를 권장하기 위해.",
        "새로운 영업 대시보드의 출시를 알리기 위해.",
        "분석 팀에 추가 엔지니어를 요청하기 위해.",
        "여러 지역 팀의 영업 실적을 비교하기 위해."
      ],
      "answerIndex": 0,
      "explanation": "보고서는 대시보드 조회 현황을 요약하고(앞부분) 저트래픽 대시보드의 폐기를 권장한다(여덟 번째 문장). 따라서 정답은 (가)=0이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-usage-q2",
      "prompt": "Which dashboard was viewed the most this quarter?",
      "promptKo": "이번 분기에 가장 많이 조회된 대시보드는 무엇인가?",
      "choices": [
        "The Vendor Risk dashboard.",
        "The Sales Performance dashboard.",
        "The Legacy Inventory dashboard.",
        "The Marketing Funnel dashboard."
      ],
      "choicesKo": [
        "공급업체 리스크 대시보드.",
        "영업 실적 대시보드.",
        "레거시 재고 대시보드.",
        "마케팅 퍼널 대시보드."
      ],
      "answerIndex": 1,
      "explanation": "첫 문장에서 영업 실적(Sales Performance) 대시보드가 4,200명이 넘는 고유 사용자로 가장 많이 조회되었다고 명시한다. 따라서 정답은 (나)=1이다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-usage-q3",
      "prompt": "What can be inferred about retiring the low-traffic dashboards?",
      "promptKo": "저트래픽 대시보드를 폐기하는 것에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "It will require hiring new vendors.",
        "It will lower the number of users on the sales dashboard.",
        "It is expected to free up resources and reduce costs.",
        "It must be completed before any owners are notified."
      ],
      "choicesKo": [
        "새로운 공급업체 고용이 필요할 것이다.",
        "영업 대시보드의 사용자 수를 줄일 것이다.",
        "자원을 확보하고 비용을 절감할 것으로 예상된다.",
        "어떤 소유자에게도 통지하기 전에 완료되어야 한다."
      ],
      "answerIndex": 2,
      "explanation": "유지가 엔지니어링 시간과 비용을 소모한다고 했고(여섯 번째 문장) 폐기 후 노력을 수요가 높은 보고서로 재배치할 수 있다고 했으므로(열 번째 문장) 자원 확보와 비용 절감을 추론할 수 있다. 따라서 정답은 (다)=2이다.",
      "category": "추론"
    },
    {
      "id": "set-medium-usage-q4",
      "prompt": "In the report, the word \"retiring\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"retiring\"과 의미가 가장 가까운 것은?",
      "choices": [
        "promoting",
        "launching",
        "expanding",
        "removing"
      ],
      "choicesKo": [
        "홍보하는 것",
        "출시하는 것",
        "확장하는 것",
        "제거하는 것"
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장에서 저트래픽 대시보드를 \"retiring\"한다는 것은 사용을 중단하고 제거한다는 의미이므로 removing(제거하는 것)이 가장 가깝다. 반의어에 가까운 launching(출시하는 것)은 오답이다. 따라서 정답은 (라)=3이다.",
      "category": "동의어"
    }
  ]
}
```
