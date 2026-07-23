# Part 7 — Triple Passage: Itinerary + Hotel Confirmation + Expense Memo (출장, 교차참조)

```json
{
  "id": "m1-p7-3-triple-03",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Triple Passage (Itinerary + Confirmation + Memo)",
  "passageLines": [
    { "en": "[Passage 1 — Itinerary]", "ko": "[지문 1 — 일정표]" },
    { "en": "Business Trip Itinerary — Alicia Ferrand, Sales Director", "ko": "출장 일정표 — 앨리샤 페랑, 영업 이사" },
    { "en": "Mon, June 2 — Flight to Denver, 8:10 A.M.; client dinner, 7:00 P.M.", "ko": "6월 2일 월 — 덴버행 항공편, 오전 8:10; 고객 만찬, 오후 7:00" },
    { "en": "Tue, June 3 — Regional office visit, 9:00 A.M.–4:00 P.M.", "ko": "6월 3일 화 — 지역 사무소 방문, 오전 9:00–오후 4:00" },
    { "en": "Wed, June 4 — Trade show, all day; presentation at 2:00 P.M.", "ko": "6월 4일 수 — 무역 박람회, 종일; 발표 오후 2:00" },
    { "en": "Thu, June 5 — Return flight to Boston, 6:30 P.M.", "ko": "6월 5일 목 — 보스턴행 귀국 항공편, 오후 6:30" },
    { "en": "Note: Hotel to be booked near the convention center for June 2–5 (three nights).", "ko": "참고: 6월 2~5일(3박) 컨벤션 센터 인근 호텔 예약 필요." },
    { "en": "[Passage 2 — Hotel Confirmation]", "ko": "[지문 2 — 호텔 예약 확인서]" },
    { "en": "Summit Plaza Hotel — Reservation Confirmation", "ko": "서밋 플라자 호텔 — 예약 확인서" },
    { "en": "Guest: Alicia Ferrand / Check-in: June 2 / Check-out: June 5 / Room: Standard King, $145 per night", "ko": "투숙객: 앨리샤 페랑 / 체크인: 6월 2일 / 체크아웃: 6월 5일 / 객실: 스탠더드 킹, 1박 145달러" },
    { "en": "Rate includes complimentary breakfast and shuttle service to the convention center.", "ko": "요금에는 무료 조식과 컨벤션 센터행 셔틀 서비스가 포함됩니다." },
    { "en": "A late checkout until 3:00 P.M. is available on request for $30. Parking is $20 per night.", "ko": "요청 시 오후 3시까지 늦은 체크아웃을 30달러에 이용할 수 있습니다. 주차는 1박당 20달러입니다." },
    { "en": "[Passage 3 — Expense Memo]", "ko": "[지문 3 — 경비 메모]" },
    { "en": "To: Accounting / From: A. Ferrand / Re: Denver trip expenses", "ko": "받는 사람: 회계팀 / 보낸 사람: A. 페랑 / 제목: 덴버 출장 경비" },
    { "en": "Please process reimbursement for three nights at the Summit Plaza. I did not use parking, as I relied on the hotel shuttle.", "ko": "서밋 플라자 3박에 대한 환급을 처리해 주세요. 호텔 셔틀을 이용해 주차는 하지 않았습니다." },
    { "en": "Since my return flight was in the evening, I requested the late checkout so I could work from the room after the trade show ended.", "ko": "귀국 항공편이 저녁이었기에, 박람회가 끝난 뒤 객실에서 업무를 볼 수 있도록 늦은 체크아웃을 요청했습니다." },
    { "en": "The client dinner receipt is attached separately. — Alicia", "ko": "고객 만찬 영수증은 별도로 첨부했습니다. — 앨리샤" }
  ],
  "questions": [
    {
      "id": "m1-p7-3-triple-03-q1",
      "prompt": "What is scheduled for the afternoon of June 4?",
      "promptKo": "6월 4일 오후에 예정된 것은 무엇인가?",
      "choices": ["A flight to Denver", "A presentation at the trade show", "A regional office visit", "A client dinner"],
      "choicesKo": ["덴버행 항공편", "무역 박람회에서의 발표", "지역 사무소 방문", "고객 만찬"],
      "answerIndex": 1,
      "explanation": "일정표에서 6월 4일에 무역 박람회가 종일 있고 오후 2시에 발표가 있습니다. 항공편·사무소 방문·만찬은 다른 날입니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-03-q2",
      "prompt": "What is included in the hotel rate?",
      "promptKo": "호텔 요금에 포함되는 것은 무엇인가?",
      "choices": ["Parking and late checkout", "Dinner and parking", "Breakfast and shuttle service", "A room upgrade"],
      "choicesKo": ["주차와 늦은 체크아웃", "저녁 식사와 주차", "조식과 셔틀 서비스", "객실 업그레이드"],
      "answerIndex": 2,
      "explanation": "확인서에서 요금에 무료 조식과 컨벤션 센터행 셔틀이 포함된다고 했습니다. 주차·늦은 체크아웃은 추가 요금이고 저녁·업그레이드는 언급되지 않습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-03-q3",
      "prompt": "How much will Ms. Ferrand be reimbursed for the room, excluding extras?",
      "promptKo": "부가 항목을 제외한 객실 요금으로 페랑 씨가 환급받을 금액은 얼마인가?",
      "choices": ["$435", "$465", "$145", "$495"],
      "choicesKo": ["435달러", "465달러", "145달러", "495달러"],
      "answerIndex": 0,
      "explanation": "1박 145달러의 3박이므로 145×3=435달러입니다(확인서 단가+메모의 3박 교차참조). 145달러는 1박, 465·495달러는 부가 요금을 잘못 더한 값입니다. 따라서 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-3-triple-03-q4",
      "prompt": "Why did Ms. Ferrand not incur a parking charge?",
      "promptKo": "페랑 씨가 주차 요금이 발생하지 않은 이유는 무엇인가?",
      "choices": ["The hotel waived the fee.", "She parked at the office.", "Parking was included in the rate.", "She used the hotel shuttle instead."],
      "choicesKo": ["호텔이 요금을 면제해 주었다.", "사무소에 주차했다.", "주차가 요금에 포함되어 있었다.", "대신 호텔 셔틀을 이용했다."],
      "answerIndex": 3,
      "explanation": "메모에서 호텔 셔틀을 이용해 주차를 하지 않았다고 밝혔습니다(확인서상 주차는 유료). 면제·사무소 주차·요금 포함은 사실과 다릅니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-03-q5",
      "prompt": "Why did Ms. Ferrand request a late checkout?",
      "promptKo": "페랑 씨가 늦은 체크아웃을 요청한 이유는 무엇인가?",
      "choices": ["Her flight was delayed overnight.", "She wanted to sightsee in Denver.", "She needed a workspace before her evening flight.", "The office visit was rescheduled."],
      "choicesKo": ["항공편이 하룻밤 지연되었다.", "덴버에서 관광하고 싶었다.", "저녁 항공편 전에 업무 공간이 필요했다.", "사무소 방문 일정이 변경되었다."],
      "answerIndex": 2,
      "explanation": "메모에서 귀국 항공편이 저녁이라 박람회 후 객실에서 업무를 보려고 늦은 체크아웃을 요청했다고 했습니다(일정표의 저녁 항공편+메모 교차참조). 지연·관광·일정 변경은 근거가 없습니다. 따라서 (다)=2입니다.",
      "category": "추론"
    }
  ]
}
```
