# Set 97 — HARD — Prompt Caching (Report)

```json
{
  "id": "set-hard-promptcaching",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Internal Engineering Report: Reducing Latency and Cost Through Prompt Caching",
      "ko": "내부 엔지니어링 보고서: 프롬프트 캐싱을 통한 지연 시간 및 비용 절감"
    },
    {
      "en": "Over the past quarter, the Platform Reliability team investigated why response times for our customer-facing assistant had grown steadily despite no increase in user traffic.",
      "ko": "지난 분기 동안 플랫폼 안정성 팀은 사용자 트래픽이 증가하지 않았는데도 고객 대면 어시스턴트의 응답 시간이 꾸준히 늘어난 이유를 조사했다."
    },
    {
      "en": "We determined that the primary cause was the repeated processing of a large, static system prompt that prefaced every request to the language model.",
      "ko": "우리는 주된 원인이 언어 모델에 보내는 모든 요청 앞에 붙는 크고 고정된 시스템 프롬프트를 반복적으로 처리하는 데 있었음을 밝혀냈다."
    },
    {
      "en": "Because this prefix accounted for nearly 70 percent of the tokens in a typical call, the model was effectively re-reading the same instructions thousands of times per hour.",
      "ko": "이 접두부가 일반적인 호출에서 토큰의 거의 70퍼센트를 차지했기 때문에, 모델은 사실상 동일한 지시문을 시간당 수천 번씩 다시 읽고 있었다."
    },
    {
      "en": "To address this, the team enabled prompt caching, a feature that stores the processed representation of a stable prompt segment so that subsequent requests can reuse it.",
      "ko": "이를 해결하기 위해 팀은 프롬프트 캐싱을 활성화했는데, 이는 안정적인 프롬프트 구간의 처리된 표현을 저장해 이후 요청이 이를 재사용할 수 있게 하는 기능이다."
    },
    {
      "en": "During a two-week pilot, cached requests bypassed the redundant computation entirely, and the cached portion was billed at a substantially reduced rate.",
      "ko": "2주간의 시범 운영 동안 캐시된 요청은 불필요한 연산을 완전히 건너뛰었고, 캐시된 부분은 상당히 낮은 요율로 청구되었다."
    },
    {
      "en": "Median latency for affected endpoints fell from 1.9 seconds to 1.1 seconds, while the cost per thousand calls dropped by roughly 40 percent.",
      "ko": "영향을 받은 엔드포인트의 중앙값 지연 시간은 1.9초에서 1.1초로 떨어졌고, 천 회 호출당 비용은 약 40퍼센트 감소했다."
    },
    {
      "en": "It is worth noting that caching yields savings only when the same prefix is reused before the cache entry expires, which in our configuration occurs after five minutes of inactivity.",
      "ko": "캐싱은 캐시 항목이 만료되기 전에 동일한 접두부가 재사용될 때만 절감 효과를 낸다는 점에 유의해야 하며, 우리 설정에서는 5분간 비활성 상태가 지속되면 만료된다."
    },
    {
      "en": "Consequently, endpoints with sparse or highly variable traffic saw negligible benefit, since their cache entries frequently lapsed before a second request arrived.",
      "ko": "따라서 트래픽이 드물거나 변동이 심한 엔드포인트는 두 번째 요청이 도착하기 전에 캐시 항목이 자주 만료되어 효과가 미미했다."
    },
    {
      "en": "The team recommends extending caching to the document-summarization service next, where long, repeated context makes the technique especially advantageous.",
      "ko": "팀은 다음으로 캐싱을 문서 요약 서비스에 확대 적용할 것을 권고하며, 그곳은 길고 반복되는 컨텍스트 덕분에 이 기법이 특히 유리하다."
    },
    {
      "en": "However, we caution that any change to the cached prefix invalidates the stored entry, so prompt revisions should be batched rather than deployed piecemeal.",
      "ko": "다만 캐시된 접두부를 변경하면 저장된 항목이 무효화되므로, 프롬프트 수정은 조금씩 배포하기보다 일괄적으로 묶어 처리할 것을 당부한다."
    },
    {
      "en": "A full rollout plan, including monitoring dashboards for cache hit rates, is attached as Appendix B.",
      "ko": "캐시 적중률 모니터링 대시보드를 포함한 전체 출시 계획은 부록 B에 첨부되어 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-promptcaching-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that the customer assistant will be discontinued",
        "To request additional staff for the Platform Reliability team",
        "To explain how prompt caching improved performance and cost",
        "To compare two competing language model vendors"
      ],
      "choicesKo": [
        "고객 어시스턴트가 중단될 것임을 알리기 위해",
        "플랫폼 안정성 팀을 위한 추가 인력을 요청하기 위해",
        "프롬프트 캐싱이 성능과 비용을 어떻게 개선했는지 설명하기 위해",
        "경쟁하는 두 언어 모델 공급업체를 비교하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "보고서 제목과 도입부에서 지연 시간과 비용 절감을 위해 프롬프트 캐싱을 조사·적용한 과정과 결과를 설명하고 있으므로 (다)가 정답이다. 어시스턴트 중단, 인력 요청, 공급업체 비교는 언급되지 않았다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-promptcaching-q2",
      "prompt": "According to the report, how long after inactivity does a cache entry expire?",
      "promptKo": "보고서에 따르면 캐시 항목은 비활성 상태가 얼마나 지속되면 만료되는가?",
      "choices": [
        "After five minutes",
        "After two weeks",
        "After one hour",
        "After seventy minutes"
      ],
      "choicesKo": [
        "5분 후",
        "2주 후",
        "1시간 후",
        "70분 후"
      ],
      "answerIndex": 0,
      "explanation": "본문에서 '우리 설정에서는 5분간 비활성 상태가 지속되면 만료된다(after five minutes of inactivity)'고 명시하므로 (가)가 정답이다. 2주는 시범 운영 기간, 다른 수치는 무관하다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-promptcaching-q3",
      "prompt": "What can be inferred about endpoints with sparse traffic?",
      "promptKo": "트래픽이 드문 엔드포인트에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "They were the first to receive the caching upgrade",
        "They are likely poor candidates for prompt caching",
        "They generate the largest share of company revenue",
        "They never use a static system prompt at all"
      ],
      "choicesKo": [
        "그것들이 캐싱 업그레이드를 가장 먼저 받았다",
        "그것들은 프롬프트 캐싱에 적합하지 않은 후보일 가능성이 높다",
        "그것들이 회사 수익의 가장 큰 비중을 만들어낸다",
        "그것들은 고정된 시스템 프롬프트를 전혀 사용하지 않는다"
      ],
      "answerIndex": 1,
      "explanation": "트래픽이 드문 엔드포인트는 캐시 항목이 재사용되기 전에 자주 만료되어 효과가 미미했다고 했으므로, 캐싱에 적합하지 않다고 추론할 수 있어 (나)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-promptcaching-q4",
      "prompt": "The word \"invalidates\" in the report is closest in meaning to",
      "promptKo": "보고서에서 단어 \"invalidates\"와 의미가 가장 가까운 것은?",
      "choices": [
        "preserves",
        "publishes",
        "delays",
        "cancels"
      ],
      "choicesKo": [
        "보존하다",
        "발행하다",
        "지연시키다",
        "무효화하다"
      ],
      "answerIndex": 3,
      "explanation": "'invalidates'는 캐시된 항목을 더 이상 유효하지 않게 만든다는 뜻이므로 '무효화하다(cancels)'인 (라)가 가장 가깝다. (가) '보존하다'는 반대 의미의 함정 선택지다.",
      "category": "동의어"
    }
  ]
}
```
