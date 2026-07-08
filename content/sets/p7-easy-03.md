# p7-easy-03 — Part 7 Text Message Chain (EASY)

```json
{
  "id": "p7-easy-03",
  "part": 7,
  "difficulty": "EASY",
  "passageType": "Text Message Chain",
  "passageLines": [
    {
      "en": "Sarah (9:00 A.M.): Hi Tom, are you coming to the team lunch today?",
      "ko": "사라 (오전 9:00): 안녕 톰, 오늘 팀 점심에 올 거예요?"
    },
    {
      "en": "Tom (9:02 A.M.): Yes, I will be there. What time does it start?",
      "ko": "톰 (오전 9:02): 네, 갈게요. 몇 시에 시작하나요?"
    },
    {
      "en": "Sarah (9:03 A.M.): It starts at 12:30 at the Italian restaurant near the office.",
      "ko": "사라 (오전 9:03): 사무실 근처 이탈리안 레스토랑에서 12시 30분에 시작해요."
    },
    {
      "en": "Tom (9:05 A.M.): Great. Should I book a table for us?",
      "ko": "톰 (오전 9:05): 좋아요. 제가 자리를 예약할까요?"
    },
    {
      "en": "Sarah (9:06 A.M.): No need. I already reserved a table for six people.",
      "ko": "사라 (오전 9:06): 그럴 필요 없어요. 제가 이미 6인용 자리를 예약했어요."
    },
    {
      "en": "Tom (9:07 A.M.): Perfect. See you there!",
      "ko": "톰 (오전 9:07): 완벽해요. 거기서 봐요!"
    }
  ],
  "questions": [
    {
      "id": "p7-easy-03-q1",
      "prompt": "Why does Sarah write to Tom?",
      "promptKo": "사라는 왜 톰에게 문자를 보내는가?",
      "choices": [
        "To cancel a meeting",
        "To order food",
        "To change an address",
        "To ask about lunch"
      ],
      "choicesKo": [
        "회의를 취소하기 위해",
        "음식을 주문하기 위해",
        "주소를 변경하기 위해",
        "점심에 대해 물어보기 위해"
      ],
      "answerIndex": 3,
      "explanation": "사라는 첫 메시지에서 톰이 팀 점심에 오는지 묻고 있으므로 점심에 대해 물어보는 것입니다. 따라서 (라)=3입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-easy-03-q2",
      "prompt": "Where will the lunch take place?",
      "promptKo": "점심 식사는 어디에서 열리는가?",
      "choices": [
        "At the office",
        "At an Italian restaurant",
        "At Tom's house",
        "At a hotel"
      ],
      "choicesKo": [
        "사무실에서",
        "이탈리안 레스토랑에서",
        "톰의 집에서",
        "호텔에서"
      ],
      "answerIndex": 1,
      "explanation": "사라가 사무실 근처 이탈리안 레스토랑에서 열린다고 했습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-easy-03-q3",
      "prompt": "What time does the lunch start?",
      "promptKo": "점심 식사는 몇 시에 시작하는가?",
      "choices": [
        "At 9:00 A.M.",
        "At 12:00 P.M.",
        "At 12:30 P.M.",
        "At 1:00 P.M."
      ],
      "choicesKo": [
        "오전 9시",
        "오후 12시",
        "오후 12시 30분",
        "오후 1시"
      ],
      "answerIndex": 2,
      "explanation": "사라가 12시 30분에 시작한다고 했습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-easy-03-q4",
      "prompt": "At 9:06 A.M., what does Sarah most likely mean when she writes, \"No need\"?",
      "promptKo": "오전 9시 6분에 사라가 \"그럴 필요 없어요\"라고 쓴 것은 무슨 의미인가?",
      "choices": [
        "A table is already booked.",
        "She will not attend the lunch.",
        "The lunch has been canceled.",
        "Tom should pay for lunch."
      ],
      "choicesKo": [
        "자리가 이미 예약되어 있다.",
        "그녀는 점심에 참석하지 않을 것이다.",
        "점심이 취소되었다.",
        "톰이 점심값을 내야 한다."
      ],
      "answerIndex": 0,
      "explanation": "톰이 자리를 예약할지 묻자 사라가 이미 6인용 자리를 예약했다고 답했으므로 예약이 필요 없다는 의미입니다. 따라서 (가)=0입니다.",
      "category": "의도·화법"
    },
    {
      "id": "p7-easy-03-q5",
      "prompt": "How many people will attend the lunch?",
      "promptKo": "몇 명이 점심 식사에 참석하는가?",
      "choices": [
        "Four",
        "Six",
        "Two",
        "Eight"
      ],
      "choicesKo": [
        "네 명",
        "여섯 명",
        "두 명",
        "여덟 명"
      ],
      "answerIndex": 1,
      "explanation": "사라가 6인용 자리를 예약했다고 했으므로 여섯 명이 참석합니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    }
  ]
}
```
