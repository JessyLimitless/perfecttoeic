# Set 77 — HARD — Idempotency (Report)

```json
{
  "id": "set-hard-idempotency",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This quarterly reliability report examines a recurring source of corrupted analytics at our company: pipelines that quietly process the same record more than once.",
      "ko": "이번 분기 신뢰성 보고서는 우리 회사에서 손상된 분석의 반복적 원인, 즉 동일한 레코드를 조용히 두 번 이상 처리하는 파이프라인을 검토합니다."
    },
    {
      "en": "In a distributed system, a worker that crashes after doing its work but before acknowledging it will simply be handed the same message again, and the work runs a second time.",
      "ko": "분산 시스템에서, 작업을 마쳤지만 그것을 확인 응답하기 전에 중단된 워커는 그저 동일한 메시지를 다시 받게 되고, 그 작업은 두 번째로 실행됩니다."
    },
    {
      "en": "Because such retries are not rare accidents but a designed feature of reliable messaging, the pipeline must be built to tolerate them rather than to wish them away.",
      "ko": "그러한 재시도는 드문 사고가 아니라 신뢰성 있는 메시징의 설계된 특징이므로, 파이프라인은 그것을 없기를 바라기보다 견디도록 구축되어야 합니다."
    },
    {
      "en": "The property that makes this safe is idempotency: applying an operation twice leaves the system in exactly the same state as applying it once.",
      "ko": "이것을 안전하게 만드는 속성이 멱등성입니다. 즉 어떤 연산을 두 번 적용해도 시스템이 한 번 적용한 것과 정확히 동일한 상태에 놓이는 것입니다."
    },
    {
      "en": "Crediting a customer's balance is not naturally idempotent, since running it twice doubles the credit; recording an absolute balance, by contrast, is.",
      "ko": "고객의 잔액에 금액을 더하는 것은 본래 멱등하지 않은데, 두 번 실행하면 적립액이 두 배가 되기 때문입니다. 반면 절대 잔액을 기록하는 것은 멱등합니다."
    },
    {
      "en": "Our most reliable teams achieve idempotency by assigning every event a stable, unique key derived from the source data rather than from the moment of processing.",
      "ko": "우리의 가장 신뢰성 높은 팀들은, 처리 시점이 아니라 원본 데이터에서 도출된 안정적이고 고유한 키를 모든 이벤트에 부여함으로써 멱등성을 달성합니다."
    },
    {
      "en": "When a record arrives, the system checks whether that key has already been committed, and if so it discards the duplicate before any downstream table is touched.",
      "ko": "레코드가 도착하면 시스템은 그 키가 이미 커밋되었는지 확인하고, 그렇다면 어떤 하류 테이블도 건드리기 전에 그 중복을 폐기합니다."
    },
    {
      "en": "This pattern is what vendors loosely market as 'exactly-once processing,' though strictly the guarantee is exactly-once effect layered on top of at-least-once delivery.",
      "ko": "이 패턴이 바로 벤더들이 느슨하게 '정확히 한 번 처리'라고 마케팅하는 것이지만, 엄밀히 말하면 그 보장은 적어도 한 번 전달 위에 얹힌 정확히 한 번의 효과입니다."
    },
    {
      "en": "The audit found that three of our seven ingestion pipelines lacked any deduplication key and instead trusted that messages would never be redelivered.",
      "ko": "감사 결과 우리의 일곱 개 수집 파이프라인 중 셋은 어떤 중복 제거 키도 갖추지 않고, 대신 메시지가 결코 재전달되지 않으리라 믿고 있었습니다."
    },
    {
      "en": "During a single network disruption in April, those three pipelines overstated daily active users by an average of eleven percent before anyone noticed.",
      "ko": "4월의 한 차례 네트워크 장애 동안, 그 세 파이프라인은 누군가 알아차리기 전에 일일 활성 사용자 수를 평균 11퍼센트 과다하게 집계했습니다."
    },
    {
      "en": "We therefore recommend that every pipeline adopt a source-derived idempotency key before the next release, and that load tests deliberately replay duplicate batches to confirm the guarantee holds.",
      "ko": "따라서 우리는 모든 파이프라인이 다음 릴리스 전에 원본 도출 멱등성 키를 채택하고, 부하 테스트가 의도적으로 중복 배치를 재생하여 그 보장이 유지되는지 확인할 것을 권고합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-idempotency-q1",
      "prompt": "What is the main purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To argue that idempotency keys derived from source data prevent duplicate processing from corrupting analytics, and to recommend adopting them.",
        "To announce that the messaging system will stop redelivering messages entirely.",
        "To explain why crediting a customer's balance is the safest pipeline operation.",
        "To propose hiring more engineers for the ingestion teams."
      ],
      "choicesKo": [
        "원본 데이터에서 도출된 멱등성 키가 중복 처리로 인한 분석 손상을 막음을 주장하고, 그것의 채택을 권고하기 위해",
        "메시징 시스템이 메시지 재전달을 완전히 중단할 것임을 알리기 위해",
        "고객 잔액에 금액을 더하는 것이 가장 안전한 파이프라인 연산인 이유를 설명하기 위해",
        "수집 팀을 위해 더 많은 엔지니어를 채용할 것을 제안하기 위해"
      ],
      "answerIndex": 0,
      "explanation": "보고서는 중복 처리 문제를 진단하고 원본 도출 멱등성 키 채택을 권고하므로 (가)가 정답입니다. 재전달 중단(나)은 본문이 재시도를 설계된 특징이라 본 것과 모순됩니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-idempotency-q2",
      "prompt": "According to the report, what did the three deficient pipelines do during the April disruption?",
      "promptKo": "보고서에 따르면, 세 개의 결함 있는 파이프라인은 4월 장애 동안 무엇을 했는가?",
      "choices": [
        "They shut down to avoid corrupting data.",
        "They correctly discarded all duplicate messages.",
        "They reassigned unique keys to every event automatically.",
        "They overstated daily active users by about eleven percent."
      ],
      "choicesKo": [
        "데이터 손상을 피하기 위해 작동을 멈췄다.",
        "모든 중복 메시지를 올바르게 폐기했다.",
        "모든 이벤트에 고유 키를 자동으로 재할당했다.",
        "일일 활성 사용자 수를 약 11퍼센트 과다 집계했다."
      ],
      "answerIndex": 3,
      "explanation": "본문 'those three pipelines overstated daily active users by an average of eleven percent'에서 명시되므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-idempotency-q3",
      "prompt": "What can be inferred about the phrase 'exactly-once processing' as used by vendors?",
      "promptKo": "벤더들이 사용하는 '정확히 한 번 처리'라는 표현에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It means messages are physically delivered only one time.",
        "It is a marketing label for an exactly-once effect built on top of at-least-once delivery.",
        "It eliminates the need for any deduplication key.",
        "It guarantees that workers never crash mid-task."
      ],
      "choicesKo": [
        "메시지가 물리적으로 단 한 번만 전달됨을 의미한다.",
        "적어도 한 번 전달 위에 구축된 정확히 한 번의 효과에 대한 마케팅 명칭이다.",
        "어떤 중복 제거 키의 필요성도 없앤다.",
        "워커가 작업 도중 결코 중단되지 않음을 보장한다."
      ],
      "answerIndex": 1,
      "explanation": "본문은 그 보장이 '정확히 한 번 전달'이 아니라 '적어도 한 번 전달 위에 얹힌 정확히 한 번의 효과'라고 명시하므로 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-idempotency-q4",
      "prompt": "In the report, the word \"tolerate\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"tolerate\"와 의미가 가장 가까운 것은",
      "choices": [
        "forbid",
        "advertise",
        "withstand",
        "measure"
      ],
      "choicesKo": [
        "금지하다",
        "광고하다",
        "견디다",
        "측정하다"
      ],
      "answerIndex": 2,
      "explanation": "'built to tolerate them rather than to wish them away'에서 'tolerate'는 재시도를 견뎌 내는 것을 뜻하므로 'withstand'가 가장 가깝습니다. 정반대 의미인 'forbid'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
