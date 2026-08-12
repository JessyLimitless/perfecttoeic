# IELTS Listening Part 1 — Set 01 (Form Completion)

> 렌터카 예약 통화. **자기수정 덫**(5일→7일, 세단→에스테이트)과 **할인 요금 덫**(£52→£46)이 핵심.
> 씨앗 자료: 루트 `DATA1.md` 발췌 → 10문항 정식 세트로 확장.

```json
{
  "id": "ielts-lis-01",
  "skill": "LISTENING",
  "part": 1,
  "band": 6.5,
  "title": "Bayside Car Hire — Booking Enquiry",
  "titleKo": "베이사이드 렌터카 — 예약 문의",
  "taskType": "Form Completion",
  "script": [
    { "speaker": "Wgb", "role": "Agent", "en": "Good morning, Bayside Car Hire. How can I help you?", "ko": "안녕하세요, 베이사이드 렌터카입니다. 무엇을 도와드릴까요?" },
    { "speaker": "M", "role": "Customer", "en": "Hello. I'd like to rent a car for next week, starting on Monday, August the seventeenth.", "ko": "안녕하세요. 다음 주에 차를 한 대 빌리고 싶은데요, 8월 17일 월요일부터요." },
    { "speaker": "Wgb", "role": "Agent", "en": "Certainly. And how many days will you be needing it?", "ko": "네, 알겠습니다. 며칠 동안 필요하신가요?" },
    { "speaker": "M", "role": "Customer", "en": "Well, initially I thought about five days, but let's make it seven, so I can return it on the Sunday.", "ko": "음, 처음엔 5일 정도 생각했는데, 7일로 하죠. 그래야 일요일에 반납할 수 있으니까요." },
    { "speaker": "Wgb", "role": "Agent", "en": "Seven days, lovely. Could I take your surname, please?", "ko": "7일이요, 좋습니다. 성을 알려주시겠어요?" },
    { "speaker": "M", "role": "Customer", "en": "It's Whitfield. That's W-H-I-T-F-I-E-L-D.", "ko": "휘트필드입니다. W-H-I-T-F-I-E-L-D요." },
    { "speaker": "Wgb", "role": "Agent", "en": "Thank you. And what sort of vehicle were you after? We have compact, saloon and estate.", "ko": "감사합니다. 어떤 종류의 차량을 원하시나요? 소형, 세단, 에스테이트가 있습니다." },
    { "speaker": "M", "role": "Customer", "en": "I was going to say a saloon, but we're taking a lot of luggage, so an estate would be better.", "ko": "세단이라고 말하려던 참이었는데, 짐이 많아서 에스테이트가 낫겠네요." },
    { "speaker": "Wgb", "role": "Agent", "en": "An estate is fifty-two pounds a day. However, if you book seven days or more, that drops to forty-six.", "ko": "에스테이트는 하루 52파운드입니다. 다만 7일 이상 예약하시면 46파운드로 내려갑니다." },
    { "speaker": "M", "role": "Customer", "en": "Forty-six a day — that works for me.", "ko": "하루 46파운드, 괜찮네요." },
    { "speaker": "Wgb", "role": "Agent", "en": "Insurance is included in that price, but the GPS unit is an extra five pounds a day.", "ko": "그 가격에 보험은 포함되어 있고, GPS 장치는 하루 5파운드 추가입니다." },
    { "speaker": "M", "role": "Customer", "en": "I'll just use my phone for directions, so I won't bother with the GPS.", "ko": "길 안내는 그냥 휴대폰을 쓸 거라서 GPS는 됐습니다." },
    { "speaker": "Wgb", "role": "Agent", "en": "No problem. You'll collect the car from the North Terminal desk — not the city centre branch, I'm afraid, as that one closes at weekends.", "ko": "알겠습니다. 차량은 노스 터미널 데스크에서 수령하시게 됩니다. 죄송하지만 시내 지점은 주말에 문을 닫아서요." },
    { "speaker": "M", "role": "Customer", "en": "North Terminal, right. And do I need to bring anything with me?", "ko": "노스 터미널이군요. 그리고 뭘 가져가야 하나요?" },
    { "speaker": "Wgb", "role": "Agent", "en": "Just your driving licence and a credit card. We take a deposit of two hundred pounds, which is refunded when you return the vehicle.", "ko": "운전면허증과 신용카드만 있으면 됩니다. 보증금 200파운드를 받고, 차량 반납 시 환불해 드립니다." },
    { "speaker": "M", "role": "Customer", "en": "I'd rather not put the whole balance on the card, though. Could I settle that by moving the money straight from my bank account?", "ko": "그런데 잔액 전부를 카드로 결제하고 싶지는 않아요. 제 은행 계좌에서 바로 이체해서 정산해도 될까요?" },
    { "speaker": "Wgb", "role": "Agent", "en": "That's absolutely fine — a bank transfer for the balance. The deposit still has to go on the card, though.", "ko": "전혀 문제없습니다. 잔액은 계좌이체로 하시면 됩니다. 다만 보증금은 카드로 하셔야 해요." }
  ],
  "questions": [
    {
      "id": "ielts-lis-01-q1",
      "kind": "gap",
      "promptEn": "Length of rental period: ______ days",
      "promptKo": "대여 기간: ______ 일",
      "answer": "7",
      "accept": ["seven"],
      "wordLimit": "ONE NUMBER",
      "trap": "먼저 말한 'five days'가 미끼다. 'let's make it seven'으로 정정한 값이 정답.",
      "explanation": "초반에 five days를 언급하지만 곧바로 'but let's make it seven'으로 정정합니다. IELTS는 항상 **마지막에 확정된 값**을 답으로 합니다. 정답: **7**",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-01-q2",
      "kind": "gap",
      "promptEn": "Pick-up date: August ______",
      "promptKo": "차량 수령일: 8월 ______일",
      "answer": "17",
      "accept": ["17th", "seventeenth"],
      "wordLimit": "ONE NUMBER",
      "trap": "'seventeenth'를 7로 잘못 받아쓰기 쉽다. -teen과 -ty의 강세 차이에 주의.",
      "explanation": "'starting on Monday, August the seventeenth'라고 말합니다. seventeen(뒤 강세)과 seventy(앞 강세)를 구분하세요. 정답: **17**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-01-q3",
      "kind": "gap",
      "promptEn": "Customer's surname: ______",
      "promptKo": "고객 성(姓): ______",
      "answer": "Whitfield",
      "wordLimit": "ONE WORD",
      "trap": "철자를 불러주는 구간. 한 글자만 틀려도 0점이며 첫 글자는 대문자.",
      "explanation": "'W-H-I-T-F-I-E-L-D'로 철자를 불러줍니다. 고유명사는 **대문자로 시작**해야 감점되지 않습니다. 정답: **Whitfield**",
      "category": "스펠링"
    },
    {
      "id": "ielts-lis-01-q4",
      "kind": "gap",
      "promptEn": "Type of vehicle: ______",
      "promptKo": "차량 종류: ______",
      "answer": "estate",
      "accept": ["estate car", "an estate"],
      "wordLimit": "ONE WORD",
      "trap": "compact·saloon·estate 세 개를 나열한 뒤 saloon을 말하려다 뒤집는다.",
      "explanation": "'I was going to say a saloon, but ... an estate would be better'로 뒤집습니다. 나열된 보기 중 **최종 선택**만 답입니다. 정답: **estate**",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-01-q5",
      "kind": "gap",
      "promptEn": "Daily rate actually charged: £______",
      "promptKo": "실제 청구되는 1일 요금: £______",
      "answer": "46",
      "accept": ["forty-six", "46 pounds"],
      "wordLimit": "ONE NUMBER",
      "trap": "£52는 7일 미만일 때의 정가. 7일 예약이므로 할인가가 적용된다.",
      "explanation": "'fifty-two pounds a day. However, if you book seven days or more, that drops to forty-six.' 이 고객은 7일을 예약했으므로 적용 요금은 46파운드입니다. 정답: **46**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-01-q6",
      "kind": "gap",
      "promptEn": "Already included in the price: ______",
      "promptKo": "요금에 이미 포함된 것: ______",
      "answer": "insurance",
      "wordLimit": "ONE WORD",
      "trap": "바로 뒤에 나오는 GPS는 '추가 요금' 항목이다. 포함/추가를 뒤집어 듣지 말 것.",
      "explanation": "'Insurance is included in that price, but the GPS unit is an extra five pounds a day.' 포함은 보험, 추가는 GPS입니다. 정답: **insurance**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-01-q7",
      "kind": "gap",
      "promptEn": "Collection point: ______ Terminal",
      "promptKo": "수령 장소: ______ 터미널",
      "answer": "North",
      "wordLimit": "ONE WORD",
      "trap": "'city centre branch'가 함께 언급되지만 주말 휴무라 제외된다.",
      "explanation": "'You'll collect the car from the North Terminal desk — not the city centre branch'로 명시적으로 배제합니다. 정답: **North**",
      "category": "위치·방향"
    },
    {
      "id": "ielts-lis-01-q8",
      "kind": "gap",
      "promptEn": "Documents to bring: a driving licence and a ______",
      "promptKo": "지참할 것: 운전면허증과 ______",
      "answer": "credit card",
      "wordLimit": "TWO WORDS",
      "trap": "뒤에 나오는 'bank transfer'에 끌리지 말 것. 지참물은 카드다.",
      "explanation": "'Just your driving licence and a credit card.' 계좌이체는 잔액 결제 수단이지 지참물이 아닙니다. 정답: **credit card**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-01-q9",
      "kind": "choice",
      "promptEn": "What does the man decide about the GPS unit?",
      "promptKo": "남자는 GPS 장치에 대해 어떻게 결정하는가?",
      "choices": [
        "He will hire it for an extra daily fee.",
        "He will not hire it at all.",
        "He will hire it only for the weekend."
      ],
      "choicesKo": [
        "하루 추가 요금을 내고 대여한다.",
        "아예 대여하지 않는다.",
        "주말에만 대여한다."
      ],
      "answerIndex": 1,
      "trap": "'five pounds a day'라는 가격이 또렷하게 들려서 대여한다고 착각하기 쉽다.",
      "explanation": "가격 안내가 나온 직후 'I'll just use my phone for directions, so I won't bother with the GPS'로 거절합니다. **언급되었다 ≠ 선택했다**. 정답: (B)=1",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-01-q10",
      "kind": "choice",
      "promptEn": "How will the man pay the balance?",
      "promptKo": "남자는 잔액을 어떻게 지불할 것인가?",
      "choices": [
        "By credit card",
        "In cash at the desk",
        "By bank transfer"
      ],
      "choicesKo": [
        "신용카드로",
        "데스크에서 현금으로",
        "계좌이체로"
      ],
      "answerIndex": 2,
      "trap": "남자는 'bank transfer'라는 말을 쓰지 않고 'moving the money straight from my bank account'로 돌려 말한다.",
      "explanation": "남자의 표현은 'moving the money straight from my bank account'이고, 직원이 이를 'a bank transfer for the balance'로 받아 확인합니다. 카드는 보증금 전용입니다. 정답: (C)=2",
      "category": "패러프레이즈"
    }
  ]
}
```
