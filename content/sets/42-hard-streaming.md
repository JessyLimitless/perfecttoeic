# HARD — Real-Time Streaming vs Nightly Batch Processing

```json
{
  "id": "set-hard-streaming",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For years, the nightly batch job was the unglamorous backbone of corporate analytics, dutifully aggregating the day's transactions while the office slept.",
      "ko": "수년 동안 야간 배치 작업은 사무실이 잠든 사이 그날의 거래를 충실히 집계하는, 화려하지 않은 기업 분석의 중추였다."
    },
    {
      "en": "Recently, however, a growing chorus of engineers has argued that batch is a relic, and that every organization should migrate to real-time streaming pipelines that process events the instant they occur.",
      "ko": "그러나 최근 들어 점점 더 많은 엔지니어들이 배치는 유물이며, 모든 조직은 이벤트가 발생하는 즉시 처리하는 실시간 스트리밍 파이프라인으로 전환해야 한다고 주장해 왔다."
    },
    {
      "en": "The appeal is undeniable: when a fraud-detection model can flag a suspicious payment in milliseconds rather than hours, the difference is not merely cosmetic but financially material.",
      "ko": "그 매력은 부정할 수 없다. 사기 탐지 모델이 의심스러운 결제를 몇 시간이 아니라 밀리초 단위로 표시할 수 있을 때, 그 차이는 단순히 표면적인 것이 아니라 재무적으로 실질적인 것이다."
    },
    {
      "en": "Yet the enthusiasm often glosses over the formidable operational burden that streaming imposes.",
      "ko": "그러나 그러한 열의는 스트리밍이 부과하는 만만치 않은 운영 부담을 종종 얼버무리고 넘어간다."
    },
    {
      "en": "A streaming architecture must contend with out-of-order events, late-arriving data, and the perennial challenge of exactly-once processing, none of which trouble a batch job that simply reads a complete, static file once a day.",
      "ko": "스트리밍 아키텍처는 순서가 뒤바뀐 이벤트, 늦게 도착하는 데이터, 그리고 정확히 한 번 처리라는 고질적인 난제와 씨름해야 하는데, 이 중 어느 것도 하루에 한 번 완전하고 정적인 파일을 단순히 읽는 배치 작업을 괴롭히지 않는다."
    },
    {
      "en": "Moreover, the infrastructure rarely sleeps, demanding round-the-clock monitoring and on-call rotations that can quietly inflate both staffing costs and engineer burnout.",
      "ko": "게다가 그 인프라는 좀처럼 쉬지 않으며, 인력 비용과 엔지니어 번아웃을 조용히 부풀릴 수 있는 24시간 모니터링과 온콜 교대 근무를 요구한다."
    },
    {
      "en": "The pragmatic question, then, is not whether streaming is technically superior, but whether the latency it eliminates actually changes a business decision.",
      "ko": "따라서 실용적인 질문은 스트리밍이 기술적으로 우월한가가 아니라, 그것이 제거하는 지연 시간이 실제로 비즈니스 의사결정을 바꾸는가이다."
    },
    {
      "en": "A monthly executive dashboard, for instance, gains nothing from sub-second freshness, and forcing it onto a streaming stack merely trades stability for novelty.",
      "ko": "예를 들어 월간 임원 대시보드는 1초 미만의 신선도로부터 아무것도 얻지 못하며, 그것을 스트리밍 스택에 억지로 올리는 것은 단지 안정성을 새로움과 맞바꾸는 것일 뿐이다."
    },
    {
      "en": "Conversely, dynamic pricing, real-time recommendations, and anomaly detection live or die by immediacy, and for these workloads the operational tax is a price worth paying.",
      "ko": "반대로 동적 가격 책정, 실시간 추천, 이상 탐지는 즉시성에 따라 흥하거나 망하며, 이러한 워크로드의 경우 운영상의 부담은 치를 만한 가치가 있는 대가이다."
    },
    {
      "en": "The most mature data teams, tellingly, resist the all-or-nothing framing altogether, running batch for reporting and streaming for the narrow slice of use cases that genuinely warrant it.",
      "ko": "흥미롭게도 가장 성숙한 데이터 팀들은 양자택일의 구도를 아예 거부하며, 보고에는 배치를 사용하고 진정으로 그것을 정당화하는 좁은 범위의 사용 사례에는 스트리밍을 사용한다."
    },
    {
      "en": "In the end, the choice is less a question of engineering fashion than of disciplined cost-benefit reasoning applied case by case.",
      "ko": "결국 그 선택은 엔지니어링 유행의 문제라기보다는 사례별로 적용되는 절제된 비용-편익 추론의 문제이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-streaming-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 글의 요지는 무엇인가?",
      "choices": [
        "Streaming pipelines are now obsolete and should be replaced by batch jobs.",
        "The choice between streaming and batch should rest on case-by-case cost-benefit reasoning rather than fashion.",
        "Every organization should migrate all of its analytics to real-time streaming.",
        "Nightly batch processing eliminates the need for any engineering staff."
      ],
      "choicesKo": [
        "스트리밍 파이프라인은 이제 구식이므로 배치 작업으로 대체되어야 한다.",
        "스트리밍과 배치 사이의 선택은 유행이 아니라 사례별 비용-편익 추론에 근거해야 한다.",
        "모든 조직은 자사의 모든 분석을 실시간 스트리밍으로 전환해야 한다.",
        "야간 배치 처리는 엔지니어링 인력의 필요성을 완전히 없앤다."
      ],
      "answerIndex": 1,
      "explanation": "마지막 문장에서 \"the choice is less a question of engineering fashion than of disciplined cost-benefit reasoning applied case by case\"라고 하여, 유행이 아닌 사례별 비용-편익 추론에 근거한 선택임을 결론으로 제시한다. 따라서 정답은 2번이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-streaming-q2",
      "prompt": "According to the article, which challenge does a streaming architecture face that a batch job does not?",
      "promptKo": "이 글에 따르면, 배치 작업은 겪지 않지만 스트리밍 아키텍처는 직면하는 과제는 무엇인가?",
      "choices": [
        "Reading a complete, static file once a day.",
        "Producing a monthly executive dashboard.",
        "Handling out-of-order and late-arriving events.",
        "Avoiding any need for monitoring."
      ],
      "choicesKo": [
        "하루에 한 번 완전하고 정적인 파일을 읽는 것.",
        "월간 임원 대시보드를 생성하는 것.",
        "순서가 뒤바뀌고 늦게 도착하는 이벤트를 처리하는 것.",
        "어떠한 모니터링도 필요로 하지 않는 것."
      ],
      "answerIndex": 2,
      "explanation": "다섯 번째 문장에서 스트리밍 아키텍처는 \"out-of-order events, late-arriving data, and the perennial challenge of exactly-once processing\"와 씨름해야 하며, 이는 정적 파일을 읽는 배치 작업을 괴롭히지 않는다고 명시한다. 따라서 정답은 3번이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-streaming-q3",
      "prompt": "What can be inferred about the most mature data teams?",
      "promptKo": "가장 성숙한 데이터 팀들에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "They prefer novelty over stability in all cases.",
        "They have abandoned batch processing entirely.",
        "They believe latency never affects business decisions.",
        "They adopt a hybrid approach, choosing each technology where it fits best."
      ],
      "choicesKo": [
        "그들은 모든 경우에 안정성보다 새로움을 선호한다.",
        "그들은 배치 처리를 완전히 포기했다.",
        "그들은 지연 시간이 비즈니스 의사결정에 결코 영향을 주지 않는다고 믿는다.",
        "그들은 각 기술을 가장 적합한 곳에 선택하는 혼합적 접근법을 취한다."
      ],
      "answerIndex": 3,
      "explanation": "열 번째 문장에서 가장 성숙한 팀들은 양자택일 구도를 거부하고 \"running batch for reporting and streaming for the narrow slice of use cases that genuinely warrant it\"이라고 하므로, 상황에 맞게 두 기술을 병행하는 혼합 접근을 추론할 수 있다. 따라서 정답은 1번이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-streaming-q4",
      "prompt": "The word \"formidable\" in the fourth sentence is closest in meaning to",
      "promptKo": "네 번째 문장의 단어 \"formidable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "daunting",
        "trivial",
        "temporary",
        "optional"
      ],
      "choicesKo": [
        "벅찬",
        "사소한",
        "일시적인",
        "선택적인"
      ],
      "answerIndex": 0,
      "explanation": "\"the formidable operational burden that streaming imposes\"에서 formidable은 만만치 않고 벅찬 부담을 뜻하므로 daunting(벅찬)이 가장 가깝다. trivial(사소한)은 반대 의미의 함정이다. 따라서 정답은 1번이다.",
      "category": "동의어"
    }
  ]
}
```
