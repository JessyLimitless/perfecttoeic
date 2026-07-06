# Part 7 — Double Passage: Venue Booking (Email + Email)

```json
{
  "id": "p7-g-51",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    { "en": "[Passage 1 — Email]", "ko": "[지문 1 — 이메일]" },
    { "en": "To: bookings@lakeviewhall.com", "ko": "받는 사람: bookings@lakeviewhall.com" },
    { "en": "From: m.patterson@corpmail.com", "ko": "보낸 사람: m.patterson@corpmail.com" },
    { "en": "Subject: Availability for Company Anniversary", "ko": "제목: 회사 기념일 행사 가능 여부" },
    { "en": "Dear Lakeview Hall, Our company is planning a 100-person anniversary dinner on Saturday, November 8.", "ko": "레이크뷰 홀께, 저희 회사는 11월 8일 토요일에 100명 규모의 기념 만찬을 계획하고 있습니다." },
    { "en": "We would need the venue from 6:00 P.M. to 10:00 P.M., along with catering and audiovisual equipment for a short presentation.", "ko": "오후 6시부터 10시까지 장소가 필요하며, 짧은 발표를 위한 케이터링과 시청각 장비도 필요합니다." },
    { "en": "Could you let us know your availability and provide a quote? Our budget is approximately $4,000.", "ko": "가능 여부를 알려 주시고 견적을 주실 수 있나요? 저희 예산은 약 4,000달러입니다." },
    { "en": "Best regards, Michael Patterson", "ko": "마이클 패터슨 드림" },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: m.patterson@corpmail.com", "ko": "받는 사람: m.patterson@corpmail.com" },
    { "en": "From: bookings@lakeviewhall.com", "ko": "보낸 사람: bookings@lakeviewhall.com" },
    { "en": "Subject: RE: Availability for Company Anniversary", "ko": "제목: RE: 회사 기념일 행사 가능 여부" },
    { "en": "Dear Mr. Patterson, Thank you for your inquiry. I'm pleased to confirm that the Grand Room is available on November 8.", "ko": "패터슨 님께, 문의해 주셔서 감사합니다. 11월 8일에 그랜드 룸을 이용하실 수 있음을 기쁘게 확인해 드립니다." },
    { "en": "The room rental for those hours is $2,500, and our catering package for 100 guests is $1,400.", "ko": "해당 시간대의 객실 대여료는 2,500달러이고, 100명 케이터링 패키지는 1,400달러입니다." },
    { "en": "Audiovisual equipment can be added for $200, bringing the total to $4,100.", "ko": "시청각 장비는 200달러에 추가할 수 있으며, 그러면 총액이 4,100달러가 됩니다." },
    { "en": "Since this slightly exceeds your budget, we can offer a 5% discount if you confirm by October 1.", "ko": "이 금액이 예산을 조금 초과하므로, 10월 1일까지 확정하시면 5% 할인을 제공해 드릴 수 있습니다." },
    { "en": "Please let me know how you would like to proceed. — Sarah Kim, Events Coordinator", "ko": "어떻게 진행하고 싶으신지 알려 주십시오. — 사라 김, 행사 코디네이터" }
  ],
  "questions": [
    {
      "id": "p7-g-51-q1",
      "prompt": "Why did Mr. Patterson send the first email?",
      "promptKo": "패터슨 씨가 첫 번째 이메일을 보낸 이유는 무엇인가?",
      "choices": ["To inquire about booking a venue", "To complain about a past event", "To cancel a reservation", "To apply for a job"],
      "choicesKo": ["장소 예약을 문의하려고", "지난 행사에 항의하려고", "예약을 취소하려고", "일자리에 지원하려고"],
      "answerIndex": 0,
      "explanation": "패터슨 씨는 기념 만찬을 위한 장소의 가능 여부와 견적을 문의하고 있습니다. 따라서 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-51-q2",
      "prompt": "What does the company need in addition to the venue?",
      "promptKo": "회사는 장소 외에 무엇이 필요한가?",
      "choices": ["Overnight accommodation", "Transportation", "Catering and audiovisual equipment", "A photographer"],
      "choicesKo": ["숙박", "교통편", "케이터링과 시청각 장비", "사진작가"],
      "answerIndex": 2,
      "explanation": "패터슨 씨는 장소와 더불어 케이터링과 발표용 시청각 장비가 필요하다고 했습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-51-q3",
      "prompt": "How much does the catering package cost?",
      "promptKo": "케이터링 패키지의 비용은 얼마인가?",
      "choices": ["$2,500", "$1,400", "$200", "$4,100"],
      "choicesKo": ["2,500달러", "1,400달러", "200달러", "4,100달러"],
      "answerIndex": 1,
      "explanation": "사라 김의 답장에서 100명 케이터링 패키지는 1,400달러라고 했습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-51-q4",
      "prompt": "How can Mr. Patterson reduce the total cost?",
      "promptKo": "패터슨 씨는 어떻게 총비용을 줄일 수 있는가?",
      "choices": ["By removing the catering", "By choosing a smaller room", "By reducing the guest count", "By confirming the booking by October 1"],
      "choicesKo": ["케이터링을 제외해서", "더 작은 방을 골라서", "손님 수를 줄여서", "10월 1일까지 예약을 확정해서"],
      "answerIndex": 3,
      "explanation": "10월 1일까지 확정하면 5% 할인을 받을 수 있으므로 총비용을 줄일 수 있습니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-51-q5",
      "prompt": "The word \"proceed\" in the second email is closest in meaning to",
      "promptKo": "두 번째 이메일에서 \"proceed\"와 의미가 가장 가까운 것은?",
      "choices": ["pay", "cancel", "move forward", "reply"],
      "choicesKo": ["지불하다", "취소하다", "진행하다", "답장하다"],
      "answerIndex": 2,
      "explanation": "여기서 proceed는 예약을 '진행하다'라는 뜻이므로 'move forward'가 가장 가깝습니다. 따라서 (다)=2입니다.",
      "category": "동의어"
    }
  ]
}
```
