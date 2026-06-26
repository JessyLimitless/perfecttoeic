# Set 9 — HARD — AI Customer-Support Chatbot (Internal Report)

```json
{
  "id": "set-hard-chatbot",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Since the launch of our AI customer-support chatbot in March, the average response time for incoming inquiries has fallen sharply, from roughly 12 minutes to under one minute.",
      "ko": "3월에 AI 고객 지원 챗봇을 도입한 이후, 접수되는 문의에 대한 평균 응답 시간이 약 12분에서 1분 미만으로 급격히 줄었습니다."
    },
    {
      "en": "On paper, this represents a tenfold improvement in the speed with which customers receive a first reply.",
      "ko": "서류상으로 이는 고객이 첫 응답을 받는 속도에서 열 배의 개선을 나타냅니다."
    },
    {
      "en": "Despite this dramatic gain in speed, however, overall customer satisfaction scores have risen only marginally over the same period.",
      "ko": "그러나 이러한 속도의 극적인 향상에도 불구하고, 같은 기간 동안 전체 고객 만족도 점수는 아주 미미하게만 상승했습니다."
    },
    {
      "en": "At first glance, the two figures appear contradictory, since faster service is usually expected to please customers.",
      "ko": "언뜻 보기에 이 두 수치는 모순되어 보이는데, 더 빠른 서비스는 보통 고객을 만족시킬 것으로 기대되기 때문입니다."
    },
    {
      "en": "A closer review of the chat transcripts, however, reveals why the speed gains did not translate into higher satisfaction.",
      "ko": "그러나 채팅 기록을 더 면밀히 검토해 보면 왜 그 속도 향상이 더 높은 만족으로 이어지지 않았는지가 드러납니다."
    },
    {
      "en": "The bot consistently struggled with complex billing issues that required judgment rather than a scripted answer.",
      "ko": "챗봇은 정해진 답변보다 판단이 필요한 복잡한 청구 문제에서 일관되게 어려움을 겪었습니다."
    },
    {
      "en": "In these cases, customers were frequently forced to repeat their entire problem to a human agent after the bot failed to resolve it.",
      "ko": "이러한 경우 챗봇이 문제를 해결하지 못한 후 고객은 자신의 문제 전체를 상담원에게 다시 설명해야 하는 경우가 잦았습니다."
    },
    {
      "en": "This duplication of effort appears to have offset much of the goodwill created by the faster initial response.",
      "ko": "이러한 노력의 중복은 더 빠른 초기 응답으로 생긴 호의의 상당 부분을 상쇄한 것으로 보입니다."
    },
    {
      "en": "By contrast, the bot handled simple, routine inquiries such as store hours and order tracking smoothly and accurately.",
      "ko": "이와 대조적으로, 챗봇은 매장 운영 시간이나 주문 추적과 같은 간단하고 일상적인 문의는 매끄럽고 정확하게 처리했습니다."
    },
    {
      "en": "We therefore recommend routing all billing-related questions directly to human agents from the outset.",
      "ko": "따라서 저희는 청구 관련 모든 문의를 처음부터 상담원에게 직접 연결할 것을 권장합니다."
    },
    {
      "en": "Meanwhile, the bot should continue to manage the high volume of straightforward requests where it clearly excels.",
      "ko": "한편, 챗봇은 그것이 분명히 뛰어난 성과를 보이는 간단한 요청의 많은 물량을 계속 처리해야 합니다."
    },
    {
      "en": "Adopting this division of labor should preserve the speed gains while removing the frustration that has held satisfaction down.",
      "ko": "이러한 업무 분담을 채택하면 만족도를 끌어내려 온 좌절감을 없애면서도 속도 향상을 보존할 수 있을 것입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-chatbot-q1",
      "prompt": "What is the main point of the report?",
      "promptKo": "이 보고서의 요점은 무엇인가?",
      "choices": [
        "The chatbot should be removed because it slowed response times.",
        "The chatbot should handle billing while agents handle simple tasks.",
        "Faster responses alone did not raise satisfaction, so work should be divided by task type.",
        "Customer satisfaction has already reached its highest possible level."
      ],
      "choicesKo": [
        "챗봇이 응답 시간을 늦췄으므로 제거되어야 한다.",
        "챗봇이 청구 문제를 처리하고 상담원이 간단한 업무를 처리해야 한다.",
        "더 빠른 응답만으로는 만족도가 오르지 않았으므로 업무를 유형별로 나누어야 한다.",
        "고객 만족도는 이미 가능한 최고 수준에 도달했다."
      ],
      "answerIndex": 2,
      "explanation": "보고서는 속도가 급격히 개선되었으나 만족도는 미미하게만 올랐고(셋째 문장), 그 원인이 복잡한 청구 문제 처리 실패임을 밝힌 뒤(여섯·일곱 문장), 청구는 상담원에게 챗봇은 간단한 요청에 배분하라고 권고한다(열·열한 문장). 이 업무 분담이 핵심이므로 (다)가 정답이다. (나)는 역할이 뒤바뀐 오답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-chatbot-q2",
      "prompt": "According to the report, why did satisfaction scores rise only slightly?",
      "promptKo": "보고서에 따르면, 만족도 점수가 약간만 상승한 이유는 무엇인가?",
      "choices": [
        "Store hours and tracking requests were answered incorrectly.",
        "The chatbot increased the average response time.",
        "The survey reached too few customers to be reliable.",
        "Customers often had to repeat their problem to a human agent."
      ],
      "choicesKo": [
        "매장 운영 시간과 추적 요청이 잘못 답변되었다.",
        "챗봇이 평균 응답 시간을 늘렸다.",
        "설문이 신뢰하기에는 너무 적은 고객에게 도달했다.",
        "고객이 흔히 자신의 문제를 상담원에게 다시 설명해야 했다."
      ],
      "answerIndex": 3,
      "explanation": "일곱·여덟 번째 문장에서 챗봇이 복잡한 청구 문제를 해결하지 못해 고객이 문제 전체를 상담원에게 다시 설명해야 했고, 이 중복이 빠른 응답으로 생긴 호의를 상쇄했다고 설명한다. 따라서 (라)가 정답이다. 응답 시간은 오히려 줄었고, 설문 규모나 간단한 요청 오류는 언급되지 않았다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-chatbot-q3",
      "prompt": "What is implied about the kinds of tasks the chatbot performs well?",
      "promptKo": "챗봇이 잘 수행하는 업무의 종류에 관해 무엇이 암시되는가?",
      "choices": [
        "It performs best on tasks that require independent judgment.",
        "It performs equally well on all categories of inquiry.",
        "It performs best on straightforward, routine requests.",
        "It performs poorly on every type of customer inquiry."
      ],
      "choicesKo": [
        "독립적인 판단이 필요한 업무에서 가장 잘 수행한다.",
        "모든 범주의 문의에서 똑같이 잘 수행한다.",
        "간단하고 일상적인 요청에서 가장 잘 수행한다.",
        "모든 종류의 고객 문의를 형편없이 처리한다."
      ],
      "answerIndex": 2,
      "explanation": "아홉 번째 문장에서 챗봇이 매장 운영 시간이나 주문 추적 같은 간단하고 일상적인 문의를 매끄럽고 정확하게 처리했고, 열한 번째 문장에서 그러한 요청에 '분명히 뛰어나다(clearly excels)'고 했으므로 (다)를 추론할 수 있다. 판단이 필요한 업무는 어려워했으므로 (가)는 반대이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-chatbot-q4",
      "prompt": "The word \"offset\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"offset\"과 의미가 가장 가까운 것은",
      "choices": [
        "counterbalanced",
        "reinforced",
        "recorded",
        "postponed"
      ],
      "choicesKo": [
        "상쇄했다",
        "강화했다",
        "기록했다",
        "연기했다"
      ],
      "answerIndex": 0,
      "explanation": "여덟 번째 문장에서 노력의 중복이 더 빠른 초기 응답으로 생긴 호의를 'offset' 했다는 것은 그 이점을 상쇄해 무효화했다는 뜻이므로 '상쇄했다(counterbalanced)'가 가장 가깝다. 따라서 (가)가 정답이며, 반대 의미인 '강화했다(reinforced)'는 오답이다.",
      "category": "동의어"
    }
  ]
}
```
