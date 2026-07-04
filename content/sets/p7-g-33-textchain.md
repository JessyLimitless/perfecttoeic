# p7-g-33 — MEDIUM — Text Message Chain: Client Visit (Text Message Chain)

```json
{
  "id": "p7-g-33",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Text Message Chain",
  "passageLines": [
    { "en": "Grace Liu [1:15 P.M.]: Hi Tom, I'm heading to the client's office for the 3 P.M. demo. Do we have the latest slide deck?", "ko": "그레이스 리우 [오후 1:15]: 안녕하세요 톰, 오후 3시 시연을 위해 고객 사무실로 가는 중이에요. 최신 슬라이드 자료 있나요?" },
    { "en": "Tom Reyes [1:17 P.M.]: I updated it this morning. Sending it to your email now.", "ko": "톰 레예스 [오후 1:17]: 오늘 아침에 업데이트했어요. 지금 이메일로 보낼게요." },
    { "en": "Grace Liu [1:18 P.M.]: Great. Did you include the new pricing table?", "ko": "그레이스 리우 [오후 1:18]: 좋아요. 새 가격표도 넣었나요?" },
    { "en": "Tom Reyes [1:20 P.M.]: Yes, slide 8. I also added a chart showing last quarter's results.", "ko": "톰 레예스 [오후 1:20]: 네, 8번 슬라이드요. 지난 분기 실적을 보여 주는 차트도 추가했어요." },
    { "en": "Grace Liu [1:21 P.M.]: Perfect. One more thing — can you join the call in case they ask technical questions?", "ko": "그레이스 리우 [오후 1:21]: 완벽해요. 한 가지 더 — 그쪽에서 기술 질문을 할 경우에 대비해 통화에 참여해 줄 수 있어요?" },
    { "en": "Tom Reyes [1:23 P.M.]: Sure. Send me the meeting link and I'll be there.", "ko": "톰 레예스 [오후 1:23]: 물론이죠. 회의 링크를 보내 주시면 참여할게요." },
    { "en": "Grace Liu [1:24 P.M.]: You're a lifesaver. Sending it over.", "ko": "그레이스 리우 [오후 1:24]: 정말 큰 도움이에요. 지금 보낼게요." }
  ],
  "questions": [
    {
      "id": "p7-g-33-q1",
      "prompt": "Why is Ms. Liu going to the client's office?",
      "promptKo": "리우 씨는 왜 고객 사무실에 가는가?",
      "choices": ["To sign a contract", "To give a product demonstration", "To deliver a package", "To interview a candidate"],
      "choicesKo": ["계약서에 서명하려고", "제품 시연을 하려고", "소포를 배달하려고", "지원자를 면접하려고"],
      "answerIndex": 1,
      "explanation": "리우는 오후 3시 시연을 위해 고객 사무실로 가는 중이라고 했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-33-q2",
      "prompt": "What is included on slide 8?",
      "promptKo": "8번 슬라이드에는 무엇이 포함되어 있는가?",
      "choices": ["A company map", "The new pricing table", "A list of employees", "A safety notice"],
      "choicesKo": ["회사 지도", "새 가격표", "직원 명단", "안전 공지"],
      "answerIndex": 1,
      "explanation": "톰이 새 가격표가 8번 슬라이드에 있다고 했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-33-q3",
      "prompt": "At 1:24 P.M., what does Ms. Liu most likely mean when she writes, \"You're a lifesaver\"?",
      "promptKo": "오후 1:24에 리우 씨가 \"You're a lifesaver\"라고 쓴 것은 무슨 의미일 가능성이 가장 큰가?",
      "choices": ["She is thanking Tom for his help", "She wants Tom to call an ambulance", "She is correcting a mistake", "She is declining his offer"],
      "choicesKo": ["톰의 도움에 감사하고 있다", "톰이 구급차를 부르길 원한다", "실수를 바로잡고 있다", "그의 제안을 거절하고 있다"],
      "answerIndex": 0,
      "explanation": "톰이 통화 참여에 동의한 직후 나온 표현으로, 도움을 준 것에 대한 감사를 나타냅니다. 따라서 정답은 (가)=0입니다.",
      "category": "의도·화법"
    },
    {
      "id": "p7-g-33-q4",
      "prompt": "What does Ms. Liu ask Mr. Reyes to do?",
      "promptKo": "리우 씨는 레예스 씨에게 무엇을 해 달라고 요청하는가?",
      "choices": ["Reschedule the demo", "Join the call for technical questions", "Print the slides", "Cancel the meeting"],
      "choicesKo": ["시연 일정을 변경한다", "기술 질문에 대비해 통화에 참여한다", "슬라이드를 인쇄한다", "회의를 취소한다"],
      "answerIndex": 1,
      "explanation": "리우는 고객이 기술 질문을 할 경우에 대비해 통화에 참여해 달라고 요청했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-33-q5",
      "prompt": "What will Ms. Liu most likely do next?",
      "promptKo": "리우 씨는 다음에 무엇을 할 가능성이 가장 큰가?",
      "choices": ["Send the meeting link", "Rewrite the slides", "Book a flight", "Call the client to cancel"],
      "choicesKo": ["회의 링크를 보낸다", "슬라이드를 다시 작성한다", "항공편을 예약한다", "고객에게 전화해 취소한다"],
      "answerIndex": 0,
      "explanation": "리우가 '지금 보낼게요'라며 회의 링크를 보내겠다고 했습니다. 따라서 정답은 (가)=0입니다.",
      "category": "추론"
    }
  ]
}
```
