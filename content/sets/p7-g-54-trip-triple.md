# Part 7 — Triple Passage: Business Trip (Email + Itinerary + Email)

```json
{
  "id": "p7-g-54",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Triple Passage",
  "passageLines": [
    { "en": "[Passage 1 — Email]", "ko": "[지문 1 — 이메일]" },
    { "en": "To: r.tanaka@nexuscorp.com", "ko": "받는 사람: r.tanaka@nexuscorp.com" },
    { "en": "From: assistant@nexuscorp.com", "ko": "보낸 사람: assistant@nexuscorp.com" },
    { "en": "Subject: Your Business Trip to Chicago", "ko": "제목: 시카고 출장 안내" },
    { "en": "Dear Ms. Tanaka, I've finalized the arrangements for your trip to the Chicago trade show next week.", "ko": "다나카 님께, 다음 주 시카고 무역 박람회 출장 준비를 마무리했습니다." },
    { "en": "Your flight departs Tuesday at 8:00 A.M., and I've booked three nights at the Lakeside Hotel near the convention center.", "ko": "항공편은 화요일 오전 8시에 출발하며, 컨벤션 센터 근처 레이크사이드 호텔에 3박을 예약했습니다." },
    { "en": "Please review the attached itinerary and let me know if any changes are needed.", "ko": "첨부된 일정표를 검토하시고 변경이 필요하면 알려 주십시오." },
    { "en": "[Passage 2 — Itinerary]", "ko": "[지문 2 — 일정표]" },
    { "en": "Tuesday: Arrive Chicago 10:00 A.M.; hotel check-in; afternoon free", "ko": "화요일: 오전 10시 시카고 도착; 호텔 체크인; 오후 자유 시간" },
    { "en": "Wednesday: Trade show, 9:00 A.M.–5:00 P.M.; client dinner at 7:00 P.M.", "ko": "수요일: 무역 박람회 오전 9시~오후 5시; 오후 7시 고객 만찬" },
    { "en": "Thursday: Keynote presentation by Ms. Tanaka, 11:00 A.M.; booth meetings in the afternoon", "ko": "목요일: 다나카 씨의 기조 발표 오전 11시; 오후 부스 미팅" },
    { "en": "Friday: Depart Chicago 2:00 P.M.", "ko": "금요일: 오후 2시 시카고 출발" },
    { "en": "[Passage 3 — Email]", "ko": "[지문 3 — 이메일]" },
    { "en": "To: assistant@nexuscorp.com", "ko": "받는 사람: assistant@nexuscorp.com" },
    { "en": "From: r.tanaka@nexuscorp.com", "ko": "보낸 사람: r.tanaka@nexuscorp.com" },
    { "en": "Subject: RE: Your Business Trip to Chicago", "ko": "제목: RE: 시카고 출장 안내" },
    { "en": "Thank you, this looks great. However, I just learned that my keynote has been moved to 9:00 A.M. on Thursday.", "ko": "감사합니다, 아주 좋네요. 그런데 방금 제 기조 발표가 목요일 오전 9시로 옮겨졌다는 것을 알게 되었습니다." },
    { "en": "Could you arrange an earlier breakfast that day and confirm the presentation room is available at that time?", "ko": "그날 아침 식사를 더 이르게 잡아 주시고 발표장이 그 시간에 이용 가능한지 확인해 주실 수 있나요?" },
    { "en": "Also, please see if my Friday flight can be changed to the morning so I can return sooner.", "ko": "또한 더 일찍 돌아올 수 있도록 금요일 항공편을 오전으로 변경할 수 있는지 알아봐 주십시오." }
  ],
  "questions": [
    {
      "id": "p7-g-54-q1",
      "prompt": "Why did the assistant send the first email?",
      "promptKo": "비서가 첫 번째 이메일을 보낸 이유는 무엇인가?",
      "choices": ["To cancel a trip", "To confirm travel arrangements", "To request a budget approval", "To reschedule the trade show"],
      "choicesKo": ["출장을 취소하려고", "출장 준비를 확인해 주려고", "예산 승인을 요청하려고", "무역 박람회 일정을 변경하려고"],
      "answerIndex": 1,
      "explanation": "비서는 시카고 출장의 항공편·숙소 등 준비를 마무리하고 일정표를 확인해 달라고 합니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-54-q2",
      "prompt": "According to the itinerary, what is scheduled for Wednesday evening?",
      "promptKo": "일정표에 따르면, 수요일 저녁에 예정된 것은 무엇인가?",
      "choices": ["A client dinner", "A keynote presentation", "A flight departure", "Booth meetings"],
      "choicesKo": ["고객 만찬", "기조 발표", "항공편 출발", "부스 미팅"],
      "answerIndex": 0,
      "explanation": "일정표에서 수요일 오후 7시에 고객 만찬이 예정되어 있습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-54-q3",
      "prompt": "What change does Ms. Tanaka mention about her keynote?",
      "promptKo": "다나카 씨가 자신의 기조 발표에 관해 언급한 변경 사항은 무엇인가?",
      "choices": ["It was canceled.", "It was moved to Friday.", "It was moved to 9:00 A.M. on Thursday.", "It will be given by someone else."],
      "choicesKo": ["취소되었다.", "금요일로 옮겨졌다.", "목요일 오전 9시로 옮겨졌다.", "다른 사람이 발표한다."],
      "answerIndex": 2,
      "explanation": "다나카 씨는 기조 발표가 목요일 오전 9시로 옮겨졌다고 알립니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-54-q4",
      "prompt": "At what time was the keynote originally scheduled?",
      "promptKo": "기조 발표는 원래 몇 시로 예정되어 있었는가?",
      "choices": ["9:00 A.M.", "2:00 P.M.", "7:00 P.M.", "11:00 A.M."],
      "choicesKo": ["오전 9시", "오후 2시", "오후 7시", "오전 11시"],
      "answerIndex": 3,
      "explanation": "일정표에는 기조 발표가 목요일 오전 11시로 되어 있었으므로 원래 시간은 오전 11시입니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-54-q5",
      "prompt": "What does Ms. Tanaka request about her Friday flight?",
      "promptKo": "다나카 씨는 금요일 항공편에 관해 무엇을 요청하는가?",
      "choices": ["To upgrade to business class", "To change it to the morning", "To add an extra night", "To cancel it entirely"],
      "choicesKo": ["비즈니스석으로 업그레이드", "오전으로 변경", "하룻밤 추가", "완전히 취소"],
      "answerIndex": 1,
      "explanation": "다나카 씨는 더 일찍 돌아올 수 있도록 금요일 항공편을 오전으로 변경할 수 있는지 알아봐 달라고 요청합니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-54-q6",
      "prompt": "What will the assistant most likely do next?",
      "promptKo": "비서는 다음에 무엇을 할 것 같은가?",
      "choices": ["Book a new hotel", "Cancel the client dinner", "Make the requested adjustments", "Present the keynote instead"],
      "choicesKo": ["새 호텔을 예약한다", "고객 만찬을 취소한다", "요청받은 사항들을 조정한다", "대신 기조 발표를 한다"],
      "answerIndex": 2,
      "explanation": "다나카 씨가 아침 식사·발표장·항공편 변경을 요청했으므로 비서는 이 요청 사항들을 처리할 것입니다. 따라서 (다)=2입니다.",
      "category": "추론"
    }
  ]
}
```
