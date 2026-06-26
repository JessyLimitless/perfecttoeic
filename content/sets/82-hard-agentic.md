# Set 82 — HARD — Agentic AI Workflows (Report)

```json
{
  "id": "set-hard-agentic",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This quarter's internal review examined the shift from single-shot language model calls toward agentic workflows, in which a model plans, acts, and revises across many steps.",
      "ko": "이번 분기의 내부 검토는 단발성 언어 모델 호출에서 모델이 여러 단계에 걸쳐 계획하고 행동하고 수정하는 에이전트 워크플로로의 전환을 살펴보았습니다."
    },
    {
      "en": "The defining feature of these systems is that the model is granted access to external tools, such as search interfaces, code execution, and internal databases.",
      "ko": "이러한 시스템의 결정적 특징은 모델에 검색 인터페이스, 코드 실행, 내부 데이터베이스 같은 외부 도구에 대한 접근 권한이 부여된다는 점입니다."
    },
    {
      "en": "Rather than answering from memory alone, the agent decides which tool to invoke, reads the result, and uses it to decide its next move.",
      "ko": "기억만으로 답하는 대신, 에이전트는 어떤 도구를 호출할지 결정하고, 결과를 읽고, 그것을 사용해 다음 행동을 결정합니다."
    },
    {
      "en": "Our pilots found that this pattern markedly improved performance on multi-step tasks that a single response could not have completed.",
      "ko": "우리의 파일럿들은 이 패턴이 단일 응답으로는 완수할 수 없었던 다단계 작업의 성능을 현저히 향상시켰음을 발견했습니다."
    },
    {
      "en": "A support agent, for example, was able to look up an order, check a refund policy, and draft a reply in one continuous loop.",
      "ko": "예를 들어 한 고객지원 에이전트는 주문을 조회하고, 환불 정책을 확인하고, 답변을 초안하는 일을 하나의 연속적인 루프에서 해낼 수 있었습니다."
    },
    {
      "en": "These gains, however, came with costs that a naive single-call model never incurs.",
      "ko": "그러나 이러한 이득은 순진한 단일 호출 모델이 결코 부담하지 않는 비용을 동반했습니다."
    },
    {
      "en": "Each additional step multiplies latency and token consumption, and a single faulty tool call early in the chain can derail everything that follows.",
      "ko": "각 추가 단계는 지연 시간과 토큰 소비를 배가시키며, 사슬 초반의 단 한 번의 잘못된 도구 호출이 그 이후의 모든 것을 탈선시킬 수 있습니다."
    },
    {
      "en": "We also observed agents looping indefinitely, repeatedly calling the same tool without converging on an answer.",
      "ko": "또한 우리는 에이전트가 무한정 반복하면서 답에 수렴하지 못한 채 같은 도구를 거듭 호출하는 것을 관찰했습니다."
    },
    {
      "en": "To contain these failure modes, the team recommends hard limits on the number of steps and explicit timeouts on every tool.",
      "ko": "이러한 실패 양상을 억제하기 위해, 팀은 단계 수에 대한 엄격한 제한과 모든 도구에 대한 명시적 시간 제한을 권장합니다."
    },
    {
      "en": "Equally important is comprehensive logging, so that when a run goes wrong, engineers can trace precisely which decision sent it astray.",
      "ko": "똑같이 중요한 것은 포괄적인 로깅으로, 실행이 잘못될 때 엔지니어가 어떤 결정이 그것을 빗나가게 했는지 정확히 추적할 수 있도록 하는 것입니다."
    },
    {
      "en": "On balance, the review concludes that agentic designs are warranted for genuinely complex tasks but are wasteful overkill for simple ones.",
      "ko": "종합하면, 검토는 에이전트 설계가 진정으로 복잡한 작업에는 정당화되지만 단순한 작업에는 낭비적인 과잉이라고 결론짓습니다."
    },
    {
      "en": "The recommended posture is to reserve the added machinery for problems that clearly demand it, and to default to simpler calls everywhere else.",
      "ko": "권장되는 태도는 추가된 장치를 명백히 그것을 요구하는 문제에만 남겨 두고, 그 외 모든 곳에서는 더 단순한 호출을 기본값으로 삼는 것입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-agentic-q1",
      "prompt": "What is the report mainly about?",
      "promptKo": "이 보고서는 주로 무엇에 관한 것인가?",
      "choices": [
        "A plan to replace all human support staff with language models.",
        "A comparison of database vendors used by the support team.",
        "The benefits and costs of agentic AI workflows and when their added complexity is justified.",
        "Why single-call models should never be used for any task."
      ],
      "choicesKo": [
        "모든 인간 지원 인력을 언어 모델로 대체하려는 계획",
        "지원 팀이 사용하는 데이터베이스 공급업체 비교",
        "에이전트 AI 워크플로의 이점과 비용, 그리고 그 추가 복잡성이 정당화되는 시점",
        "단일 호출 모델을 어떤 작업에도 결코 사용해서는 안 되는 이유"
      ],
      "answerIndex": 2,
      "explanation": "보고서는 에이전트 워크플로의 성능 이득과 지연·토큰·실패 같은 비용, 그리고 복잡한 작업에만 정당화된다는 결론을 다루므로 (다)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-agentic-q2",
      "prompt": "According to the report, what failure mode did the team observe during the pilots?",
      "promptKo": "보고서에 따르면 팀은 파일럿 동안 어떤 실패 양상을 관찰했는가?",
      "choices": [
        "Agents looping indefinitely, repeatedly calling the same tool without reaching an answer.",
        "Agents refusing to use any external tools at all.",
        "Agents producing answers faster than single-call models in every case.",
        "Agents permanently deleting the internal databases."
      ],
      "choicesKo": [
        "에이전트가 답에 도달하지 못한 채 같은 도구를 거듭 호출하며 무한정 반복함",
        "에이전트가 외부 도구를 전혀 사용하기를 거부함",
        "에이전트가 모든 경우에 단일 호출 모델보다 빠르게 답을 생성함",
        "에이전트가 내부 데이터베이스를 영구적으로 삭제함"
      ],
      "answerIndex": 0,
      "explanation": "본문 'agents looping indefinitely, repeatedly calling the same tool without converging on an answer'에서 무한 루프 실패가 명시되므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-agentic-q3",
      "prompt": "What can be inferred about when agentic designs should be used?",
      "promptKo": "에이전트 설계를 언제 사용해야 하는지에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They should be used for every task to maximize consistency.",
        "They should be avoided entirely because the costs always outweigh the benefits.",
        "They should be applied only to simple, repetitive tasks.",
        "They should be reserved for genuinely complex tasks and avoided for simple ones."
      ],
      "choicesKo": [
        "일관성을 극대화하기 위해 모든 작업에 사용해야 한다.",
        "비용이 항상 이점을 능가하므로 완전히 피해야 한다.",
        "단순하고 반복적인 작업에만 적용해야 한다.",
        "진정으로 복잡한 작업에만 남겨 두고 단순한 작업에는 피해야 한다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 에이전트 설계가 복잡한 작업에는 정당화되지만 단순한 작업에는 과잉이라고 결론지었으므로 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-agentic-q4",
      "prompt": "In the report, the word \"derail\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"derail\"과 의미가 가장 가까운 것은",
      "choices": [
        "stabilize",
        "disrupt",
        "accelerate",
        "record"
      ],
      "choicesKo": [
        "안정시키다",
        "망쳐 놓다",
        "가속하다",
        "기록하다"
      ],
      "answerIndex": 1,
      "explanation": "'a single faulty tool call ... can derail everything that follows'에서 'derail'은 이후 과정을 망가뜨린다는 뜻이므로 'disrupt'가 가장 가깝습니다. 반대 의미인 'stabilize'(안정시키다)는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
