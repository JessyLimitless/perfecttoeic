# Set 61 — HARD — Guardrail Metrics in Experimentation (Internal Report)

```json
{
  "id": "set-hard-guardrail",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "As our experimentation program has scaled from a handful of tests each quarter to several hundred, the volume alone has exposed a weakness in how we evaluate success.",
      "ko": "우리의 실험 프로그램이 분기당 소수의 테스트에서 수백 건으로 확장되면서, 그 규모만으로도 우리가 성공을 평가하는 방식의 약점이 드러났다."
    },
    {
      "en": "For years, each test was judged almost entirely on its primary metric—usually conversion rate—and a statistically significant lift was treated as sufficient grounds for a full rollout.",
      "ko": "수년 동안 각 테스트는 거의 전적으로 그 주요 지표, 보통 전환율로 평가되었고, 통계적으로 유의미한 상승은 전면 출시를 위한 충분한 근거로 간주되었다."
    },
    {
      "en": "That practice, however efficient, quietly assumed that a gain on one dimension could not be offset by a loss somewhere we were not measuring.",
      "ko": "그 관행은 효율적이긴 했지만, 한 차원에서의 이익이 우리가 측정하지 않는 어딘가에서의 손실로 상쇄될 수 없다고 은연중에 가정했다."
    },
    {
      "en": "To close that gap, we introduced a small set of guardrail metrics—indicators such as page-load time, error rate, and customer-support contacts—that every experiment must monitor regardless of its goal.",
      "ko": "그 간극을 메우기 위해, 우리는 목표와 무관하게 모든 실험이 반드시 모니터링해야 하는 페이지 로딩 시간, 오류율, 고객 지원 문의 건수 같은 소수의 가드레일 지표를 도입했다."
    },
    {
      "en": "A guardrail does not need to improve; it simply must not deteriorate beyond an agreed threshold.",
      "ko": "가드레일 지표는 개선될 필요는 없으며, 단지 합의된 임계치를 넘어 악화되지만 않으면 된다."
    },
    {
      "en": "The value of this framework became vivid in last month's checkout redesign, which lifted the conversion rate by a striking 4.2 percent.",
      "ko": "이 체계의 가치는 전환율을 무려 4.2퍼센트나 끌어올린 지난달의 결제 페이지 재설계에서 분명하게 드러났다."
    },
    {
      "en": "Under our former rules, that result would have shipped to all users within days.",
      "ko": "이전 규칙 하에서라면 그 결과는 며칠 안에 모든 사용자에게 출시되었을 것이다."
    },
    {
      "en": "The guardrails, however, revealed that the new design had increased median page-load time by nearly half a second, a regression concentrated among shoppers on older mobile devices.",
      "ko": "그러나 가드레일 지표는 새 디자인이 중앙값 페이지 로딩 시간을 거의 0.5초 늘렸으며, 그 악화가 구형 모바일 기기를 사용하는 쇼핑객들에게 집중되어 있음을 드러냈다."
    },
    {
      "en": "Left unaddressed, that slowdown would likely have eroded the very conversions the redesign was celebrated for winning, only on a delay long enough to escape the original test window.",
      "ko": "방치되었다면 그 속도 저하는 재설계가 얻어 냈다고 칭송받던 바로 그 전환을 잠식했을 가능성이 크며, 다만 원래 테스트 기간을 벗어날 만큼 충분히 지연된 형태로 나타났을 것이다."
    },
    {
      "en": "We therefore held the launch, asked the team to optimize the new assets, and re-ran the experiment, at which point the conversion gain survived without the latency penalty.",
      "ko": "이에 우리는 출시를 보류하고, 팀에 새 자산을 최적화하도록 요청한 뒤 실험을 재실행했으며, 그 시점에서 전환 이익은 지연 페널티 없이 유지되었다."
    },
    {
      "en": "The lesson is not that the redesign was a failure, but that a single headline number can disguise a trade-off serious enough to undo it.",
      "ko": "교훈은 재설계가 실패였다는 것이 아니라, 하나의 대표 수치가 그것을 무효로 만들 만큼 심각한 절충을 가릴 수 있다는 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-guardrail-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주요 목적은 무엇인가?",
      "choices": [
        "To explain how guardrail metrics prevented a harmful rollout.",
        "To recommend abandoning conversion rate as a metric.",
        "To announce that the checkout redesign was permanently canceled.",
        "To request additional staff for the experimentation team."
      ],
      "choicesKo": [
        "가드레일 지표가 어떻게 해로운 출시를 막았는지 설명하기 위해.",
        "전환율을 지표로 사용하는 것을 폐기하도록 권고하기 위해.",
        "결제 페이지 재설계가 영구적으로 취소되었음을 알리기 위해.",
        "실험 팀을 위한 추가 인력을 요청하기 위해."
      ],
      "answerIndex": 0,
      "explanation": "보고서는 가드레일 지표를 도입한 이유와, 그것이 결제 재설계 사례에서 로딩 시간 악화를 잡아내 출시를 보류하게 한 과정을 설명한다(\"The guardrails ... revealed ...\", \"we therefore held the launch\"). 따라서 목적은 (가)이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-guardrail-q2",
      "prompt": "What did the guardrail metrics reveal about the checkout redesign?",
      "promptKo": "가드레일 지표는 결제 페이지 재설계에 대해 무엇을 드러냈는가?",
      "choices": [
        "It reduced the conversion rate by 4.2 percent.",
        "It raised customer-support contacts among new users.",
        "It increased median page-load time by nearly half a second.",
        "It improved performance most on older mobile devices."
      ],
      "choicesKo": [
        "전환율을 4.2퍼센트 낮췄다.",
        "신규 사용자들 사이에서 고객 지원 문의를 늘렸다.",
        "중앙값 페이지 로딩 시간을 거의 0.5초 늘렸다.",
        "구형 모바일 기기에서 성능을 가장 많이 개선했다."
      ],
      "answerIndex": 2,
      "explanation": "여덟 번째 문장 \"the new design had increased median page-load time by nearly half a second\"에서 가드레일이 드러낸 문제를 명시한다. 따라서 정답은 (다)이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-guardrail-q3",
      "prompt": "What can be inferred about why the slowdown was dangerous under the former rules?",
      "promptKo": "이전 규칙 하에서 속도 저하가 왜 위험했는지에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It would have immediately crashed the checkout system.",
        "Its harm would have appeared too late to be caught by the original test.",
        "It only affected users who had disabled mobile data.",
        "It would have been detected automatically by the primary metric."
      ],
      "choicesKo": [
        "그것은 즉시 결제 시스템을 다운시켰을 것이다.",
        "그 피해가 원래 테스트로 포착하기에는 너무 늦게 나타났을 것이다.",
        "모바일 데이터를 비활성화한 사용자에게만 영향을 미쳤다.",
        "그것은 주요 지표에 의해 자동으로 감지되었을 것이다."
      ],
      "answerIndex": 1,
      "explanation": "아홉 번째 문장 \"only on a delay long enough to escape the original test window\"에서 피해가 원래 테스트 기간을 벗어날 만큼 지연되어 나타났을 것임을 알 수 있다. 즉 주요 지표만으로는 늦게까지 포착되지 못했을 것이라는 (나)가 타당한 추론이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-guardrail-q4",
      "prompt": "In the report, the word \"disguise\" (\"a single headline number can disguise a trade-off\") is closest in meaning to",
      "promptKo": "보고서에서 \"disguise\"(a single headline number can disguise a trade-off)와 의미상 가장 가까운 것은?",
      "choices": [
        "reveal",
        "measure",
        "accelerate",
        "mask"
      ],
      "choicesKo": [
        "드러내다",
        "측정하다",
        "가속하다",
        "감추다"
      ],
      "answerIndex": 3,
      "explanation": "\"a single headline number can disguise a trade-off\"에서 disguise는 절충을 보이지 않게 가린다는 의미이므로 mask(감추다)가 문맥상 동의어다. reveal(드러내다)은 정반대 의미의 함정이다. 따라서 정답은 (라)이다.",
      "category": "동의어"
    }
  ]
}
```
