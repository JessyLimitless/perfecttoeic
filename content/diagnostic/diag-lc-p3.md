# Diagnostic — Listening Part 3 (Conversation)

```json
{
  "id": "diag-lc-p3",
  "part": 3,
  "difficulty": "MEDIUM",
  "passageType": "Conversation",
  "script": [
    { "speaker": "W", "en": "Hi, Tom. I wanted to check in about the office relocation next month. Have the new desks been ordered yet?", "ko": "안녕하세요, 톰. 다음 달 사무실 이전 건으로 확인하고 싶었어요. 새 책상은 벌써 주문했나요?" },
    { "speaker": "M", "en": "Not yet. The supplier told me their delivery is delayed until the third week of the month, which is cutting it close.", "ko": "아직이요. 공급업체가 배송이 그 달 셋째 주까지 미뤄진다고 했는데, 시간이 빠듯하네요." },
    { "speaker": "W", "en": "That is a problem. We move in on the twenty-fifth. Could you look for another supplier who can deliver sooner?", "ko": "그건 문제네요. 우리는 25일에 이사하잖아요. 더 빨리 배송해 줄 다른 공급업체를 알아봐 주시겠어요?" },
    { "speaker": "M", "en": "Sure. I'll compare a few vendors this afternoon and send you the options by email before I leave today.", "ko": "물론이죠. 오늘 오후에 몇몇 업체를 비교해서 퇴근 전에 이메일로 선택지를 보내 드릴게요." }
  ],
  "questions": [
    {
      "id": "diag-lc-p3-q1",
      "promptEn": "What are the speakers mainly discussing?",
      "promptKo": "화자들은 주로 무엇에 대해 이야기하고 있는가?",
      "choices": [
        "Preparations for an office move",
        "A new marketing strategy",
        "A customer's refund request",
        "Hiring additional staff"
      ],
      "choicesKo": [
        "사무실 이전 준비",
        "새로운 마케팅 전략",
        "고객의 환불 요청",
        "추가 직원 채용"
      ],
      "answerIndex": 0,
      "explanation": "대화 전체가 다음 달 사무실 이전과 그에 필요한 책상 주문·배송을 다루므로 사무실 이전 준비가 주제입니다. 따라서 (A)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "diag-lc-p3-q2",
      "promptEn": "What problem does the man mention?",
      "promptKo": "남자는 어떤 문제를 언급하는가?",
      "choices": [
        "A budget has been reduced",
        "A delivery has been delayed",
        "An employee resigned",
        "A contract was canceled"
      ],
      "choicesKo": [
        "예산이 삭감되었다",
        "배송이 지연되었다",
        "직원이 사직했다",
        "계약이 취소되었다"
      ],
      "answerIndex": 1,
      "explanation": "남자는 공급업체의 배송이 셋째 주까지 미뤄졌다고 말합니다. 따라서 (B)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "diag-lc-p3-q3",
      "promptEn": "What does the man say he will do this afternoon?",
      "promptKo": "남자는 오늘 오후에 무엇을 하겠다고 말하는가?",
      "choices": [
        "Visit the new office",
        "Cancel the current order",
        "Compare other suppliers",
        "Reschedule the move"
      ],
      "choicesKo": [
        "새 사무실을 방문한다",
        "현재 주문을 취소한다",
        "다른 공급업체를 비교한다",
        "이전 일정을 변경한다"
      ],
      "answerIndex": 2,
      "explanation": "남자는 오늘 오후에 몇몇 업체를 비교해 이메일로 선택지를 보내겠다고 합니다. 따라서 (C)=2입니다.",
      "category": "세부사항"
    }
  ]
}
```
