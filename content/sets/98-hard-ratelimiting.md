# Set 98 — HARD — API Rate Limiting & Quotas (Notice)

```json
{
  "id": "set-hard-ratelimiting",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Updated Rate Limits and Usage Quotas for the Insight Analytics API",
      "ko": "공지: 인사이트 애널리틱스 API의 변경된 속도 제한 및 사용 할당량"
    },
    {
      "en": "Effective the first of next month, all customers of the Insight Analytics API will be subject to a revised set of rate limits designed to ensure fair access during periods of heavy demand.",
      "ko": "다음 달 1일부터 인사이트 애널리틱스 API의 모든 고객은 수요가 몰리는 기간 동안 공정한 접근을 보장하기 위해 마련된 개정된 속도 제한의 적용을 받게 됩니다."
    },
    {
      "en": "Under the new policy, requests are capped at 600 per minute on the Standard plan and 3,000 per minute on the Enterprise plan.",
      "ko": "새 정책에 따라 요청은 스탠더드 요금제에서 분당 600건, 엔터프라이즈 요금제에서 분당 3,000건으로 제한됩니다."
    },
    {
      "en": "In addition to these per-minute ceilings, each account carries a monthly token quota that resets at the start of every billing cycle.",
      "ko": "이러한 분당 상한 외에도 각 계정에는 매 청구 주기 시작 시 초기화되는 월간 토큰 할당량이 부여됩니다."
    },
    {
      "en": "When an application exceeds the per-minute limit, the API will return a 429 response, and clients are expected to pause and retry after the interval indicated in the response header.",
      "ko": "애플리케이션이 분당 제한을 초과하면 API는 429 응답을 반환하며, 클라이언트는 응답 헤더에 표시된 간격만큼 멈춘 뒤 재시도해야 합니다."
    },
    {
      "en": "We strongly advise implementing exponential backoff, in which the waiting time grows after each unsuccessful attempt, rather than retrying immediately in a tight loop.",
      "ko": "우리는 즉시 좁은 반복문으로 재시도하기보다, 실패할 때마다 대기 시간이 늘어나는 지수적 백오프를 구현할 것을 강력히 권장합니다."
    },
    {
      "en": "Accounts that repeatedly ignore the retry guidance and hammer the endpoint may be temporarily throttled to a lower limit as a protective measure.",
      "ko": "재시도 지침을 반복적으로 무시하고 엔드포인트를 무리하게 두드리는 계정은 보호 조치로서 일시적으로 더 낮은 제한으로 조절될 수 있습니다."
    },
    {
      "en": "Customers who anticipate sustained traffic above their allotted ceiling should contact their account manager to discuss a custom quota before the change takes effect.",
      "ko": "할당된 상한을 초과하는 지속적인 트래픽을 예상하는 고객은 변경이 시행되기 전에 계정 관리자에게 연락하여 맞춤형 할당량을 논의하시기 바랍니다."
    },
    {
      "en": "Please note that the monthly token quota is distinct from the per-minute rate limit; staying under one does not guarantee compliance with the other.",
      "ko": "월간 토큰 할당량은 분당 속도 제한과 별개임에 유의하십시오. 한쪽을 지킨다고 해서 다른 쪽의 준수가 보장되는 것은 아닙니다."
    },
    {
      "en": "A new usage dashboard will display real-time consumption against both limits, allowing teams to forecast when they are likely to approach a threshold.",
      "ko": "새로운 사용량 대시보드는 두 제한 대비 실시간 소비량을 표시하여, 팀이 언제 임계치에 근접할 가능성이 있는지 예측할 수 있게 합니다."
    },
    {
      "en": "Questions about the transition may be directed to the developer support portal, where a detailed migration guide has been published.",
      "ko": "이번 전환에 관한 문의는 상세한 마이그레이션 안내서가 게시된 개발자 지원 포털로 보내주시기 바랍니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-ratelimiting-q1",
      "prompt": "What is the main subject of this notice?",
      "promptKo": "이 공지의 주된 주제는 무엇인가?",
      "choices": [
        "A scheduled maintenance outage of the API",
        "The launch of a brand-new analytics product",
        "A change to the rate limits and quotas of an API",
        "A reduction in subscription prices for all plans"
      ],
      "choicesKo": [
        "API의 예정된 유지보수 중단",
        "완전히 새로운 분석 제품의 출시",
        "API의 속도 제한 및 할당량 변경",
        "모든 요금제의 구독 가격 인하"
      ],
      "answerIndex": 2,
      "explanation": "제목과 첫 문장에서 인사이트 애널리틱스 API의 개정된 속도 제한과 사용 할당량을 안내하고 있으므로 (다)가 정답이다. 신제품 출시, 유지보수, 가격 인하는 다루지 않는다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-ratelimiting-q2",
      "prompt": "What is the per-minute request limit on the Enterprise plan?",
      "promptKo": "엔터프라이즈 요금제의 분당 요청 제한은 얼마인가?",
      "choices": [
        "3,000 requests",
        "429 requests",
        "600 requests",
        "An unlimited number of requests"
      ],
      "choicesKo": [
        "3,000건",
        "429건",
        "600건",
        "무제한"
      ],
      "answerIndex": 0,
      "explanation": "본문에서 요청이 '엔터프라이즈 요금제에서 분당 3,000건'으로 제한된다고 명시하므로 (가)가 정답이다. 600건은 스탠더드 요금제, 429는 응답 코드이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-ratelimiting-q3",
      "prompt": "What can be inferred about an account that keeps retrying immediately after a 429 response?",
      "promptKo": "429 응답 직후에 계속 즉시 재시도하는 계정에 대해 추론할 수 있는 것은?",
      "choices": [
        "It will automatically receive a higher monthly quota",
        "It risks having its rate limit temporarily lowered",
        "It will be billed at a discounted token rate",
        "It is fully exempt from the per-minute ceiling"
      ],
      "choicesKo": [
        "월간 할당량이 자동으로 상향된다",
        "속도 제한이 일시적으로 낮아질 위험이 있다",
        "할인된 토큰 요율로 청구된다",
        "분당 상한에서 완전히 면제된다"
      ],
      "answerIndex": 1,
      "explanation": "재시도 지침을 무시하고 엔드포인트를 무리하게 두드리는 계정은 보호 조치로 더 낮은 제한으로 조절될 수 있다고 했으므로 (나)가 정답으로 추론된다.",
      "category": "추론"
    },
    {
      "id": "set-hard-ratelimiting-q4",
      "prompt": "The word \"distinct\" in the notice is closest in meaning to",
      "promptKo": "공지에서 단어 \"distinct\"와 의미가 가장 가까운 것은?",
      "choices": [
        "identical",
        "uncertain",
        "outdated",
        "separate"
      ],
      "choicesKo": [
        "동일한",
        "불확실한",
        "구식인",
        "별개의"
      ],
      "answerIndex": 3,
      "explanation": "'distinct'는 월간 할당량이 분당 제한과 서로 다르고 구별된다는 뜻이므로 '별개의(separate)'인 (라)가 가장 가깝다. (가) '동일한'은 반대 의미의 함정이다.",
      "category": "동의어"
    }
  ]
}
```
