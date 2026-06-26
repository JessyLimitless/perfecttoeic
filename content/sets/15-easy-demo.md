# Arranging a Product Demo

```json
{
  "id": "set-easy-demo",
  "difficulty": "EASY",
  "passageType": "Text Message Chain",
  "passageLines": [
    {
      "en": "Maya (9:02 A.M.): Hi Daniel, the client wants to see our new analytics platform. Can we schedule the demo for this Thursday?",
      "ko": "마야 (오전 9:02): 안녕하세요 다니엘, 고객이 우리 새 분석 플랫폼을 보고 싶어 해요. 이번 주 목요일에 시연 일정을 잡을 수 있을까요?"
    },
    {
      "en": "Daniel (9:05 A.M.): Thursday morning is fully booked for me. Would 2:00 P.M. work instead?",
      "ko": "다니엘 (오전 9:05): 목요일 오전은 제 일정이 꽉 차 있어요. 대신 오후 2시는 어떨까요?"
    },
    {
      "en": "Maya (9:07 A.M.): That works. I'll send the client a calendar invite for 2:00 P.M.",
      "ko": "마야 (오전 9:07): 좋아요. 제가 고객에게 오후 2시로 캘린더 초대를 보낼게요."
    },
    {
      "en": "Daniel (9:08 A.M.): Could you also prepare the sample dataset before then?",
      "ko": "다니엘 (오전 9:08): 그 전에 샘플 데이터셋도 준비해 주실 수 있나요?"
    },
    {
      "en": "Maya (9:09 A.M.): Already on it.",
      "ko": "마야 (오전 9:09): 이미 하고 있어요."
    }
  ],
  "questions": [
    {
      "id": "set-easy-demo-q1",
      "prompt": "What time is the product demo scheduled for?",
      "promptKo": "제품 시연은 몇 시로 예정되어 있습니까?",
      "choices": [
        "Thursday morning",
        "Friday at 9:00 A.M.",
        "Wednesday afternoon",
        "Thursday at 2:00 P.M."
      ],
      "choicesKo": [
        "목요일 오전",
        "금요일 오전 9시",
        "수요일 오후",
        "목요일 오후 2시"
      ],
      "answerIndex": 3,
      "explanation": "다니엘이 오후 2시를 제안하자 마야가 \"That works. I'll send the client a calendar invite for 2:00 P.M.\"라고 답했으므로 시연은 목요일 오후 2시로 정해졌습니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-demo-q2",
      "prompt": "At 9:09 A.M., what does Maya most likely mean when she writes, \"Already on it\"?",
      "promptKo": "오전 9:09에 마야가 \"Already on it\"이라고 쓴 것은 무엇을 의미할 가능성이 가장 높습니까?",
      "choices": [
        "She has already left the office",
        "She is already attending the demo",
        "She has already started preparing the sample dataset",
        "She has already canceled the meeting"
      ],
      "choicesKo": [
        "이미 사무실을 떠났다",
        "이미 시연에 참석하고 있다",
        "이미 샘플 데이터셋 준비를 시작했다",
        "이미 회의를 취소했다"
      ],
      "answerIndex": 2,
      "explanation": "다니엘이 \"prepare the sample dataset\"을 요청한 직후 마야가 \"Already on it\"이라고 답한 것은, 이미 그 데이터셋 준비를 시작했다는 의미입니다.",
      "category": "의도·화법"
    }
  ]
}
```
