# Part 7 — Double Passage: Order Issue Email + Reply

```json
{
  "id": "p7-g-60",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    { "en": "[Passage 1 — Email]", "ko": "[지문 1 — 이메일]" },
    { "en": "To: support@brightsupplies.com", "ko": "받는 사람: support@brightsupplies.com" },
    { "en": "From: orders@maplecafe.com", "ko": "보낸 사람: orders@maplecafe.com" },
    { "en": "Subject: Order #4592 — Missing Items", "ko": "제목: 주문 #4592 — 누락된 물품" },
    { "en": "Hello, we received our monthly supply order today, but two boxes of paper cups listed on the invoice were missing.", "ko": "안녕하세요, 오늘 월간 물품 주문을 받았는데 송장에 기재된 종이컵 두 상자가 빠져 있었습니다." },
    { "en": "The rest of the order arrived in good condition. We need the cups before the weekend, as we expect a busy period.", "ko": "나머지 주문은 양호한 상태로 도착했습니다. 바쁜 시기가 예상되어 주말 전에 컵이 필요합니다." },
    { "en": "Please let us know how quickly the missing items can be sent. Thank you, Elena Ruiz, Maple Café", "ko": "누락된 물품을 얼마나 빨리 보내주실 수 있는지 알려 주세요. 감사합니다, 엘레나 루이스, 메이플 카페" },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: orders@maplecafe.com", "ko": "받는 사람: orders@maplecafe.com" },
    { "en": "From: support@brightsupplies.com", "ko": "보낸 사람: support@brightsupplies.com" },
    { "en": "Subject: RE: Order #4592 — Missing Items", "ko": "제목: RE: 주문 #4592 — 누락된 물품" },
    { "en": "Dear Ms. Ruiz, we sincerely apologize for the missing paper cups.", "ko": "루이스 님께, 종이컵이 누락된 점 진심으로 사과드립니다." },
    { "en": "Our records show the items were left out during packing. We have arranged for them to ship today via express delivery at no extra charge.", "ko": "저희 기록상 포장 과정에서 물품이 빠졌습니다. 추가 비용 없이 오늘 특급 배송으로 발송되도록 조치했습니다." },
    { "en": "You should receive them by Thursday afternoon, well before the weekend.", "ko": "목요일 오후까지, 주말보다 훨씬 전에 받으실 수 있을 것입니다." },
    { "en": "As an apology, we have also added a 10% credit to your account for your next order. Best regards, Brian Cole, Customer Support", "ko": "사과의 뜻으로 다음 주문에 사용하실 수 있는 10% 적립도 계정에 추가해 드렸습니다. 브라이언 콜, 고객 지원 드림" }
  ],
  "questions": [
    {
      "id": "p7-g-60-q1",
      "prompt": "Why did Ms. Ruiz write the email?",
      "promptKo": "루이스 씨가 이메일을 쓴 이유는 무엇인가?",
      "choices": ["To place a new order", "To report items missing from an order", "To cancel a subscription", "To request a price list"],
      "choicesKo": ["새 주문을 하려고", "주문에서 누락된 물품을 알리려고", "구독을 취소하려고", "가격표를 요청하려고"],
      "answerIndex": 1,
      "explanation": "루이스 씨는 종이컵 두 상자가 빠졌다며 누락 물품을 알리려고 이메일을 썼습니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-60-q2",
      "prompt": "What does Ms. Ruiz say about the rest of the order?",
      "promptKo": "루이스 씨는 나머지 주문에 관해 무엇을 말하는가?",
      "choices": ["It was delayed", "It was the wrong brand", "It was too expensive", "It arrived in good condition"],
      "choicesKo": ["지연되었다", "브랜드가 잘못되었다", "너무 비쌌다", "양호한 상태로 도착했다"],
      "answerIndex": 3,
      "explanation": "루이스 씨는 나머지 주문은 양호한 상태로 도착했다고 말합니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-60-q3",
      "prompt": "How will the missing items be sent?",
      "promptKo": "누락된 물품은 어떻게 발송되는가?",
      "choices": ["By express delivery at no charge", "By standard mail", "For an additional fee", "Through a local pickup"],
      "choicesKo": ["추가 비용 없이 특급 배송으로", "일반 우편으로", "추가 비용을 받고", "지역 직접 수령으로"],
      "answerIndex": 0,
      "explanation": "콜 씨는 추가 비용 없이 오늘 특급 배송으로 발송하도록 조치했다고 했습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-60-q4",
      "prompt": "What is suggested about the delivery timing?",
      "promptKo": "배송 시점에 관해 암시된 것은 무엇인가?",
      "choices": ["It will arrive after the weekend", "It has been canceled", "It will arrive in time for the busy period", "It requires a signature"],
      "choicesKo": ["주말 이후에 도착할 것이다", "취소되었다", "바쁜 시기에 맞춰 도착할 것이다", "서명이 필요하다"],
      "answerIndex": 2,
      "explanation": "카페는 주말 전에 컵이 필요하다고 했고, 물품은 목요일 오후 주말보다 훨씬 전에 도착하므로 바쁜 시기에 맞춰 도착합니다. 따라서 (다)=2입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-60-q5",
      "prompt": "What does Mr. Cole offer as an apology?",
      "promptKo": "콜 씨는 사과의 뜻으로 무엇을 제공하는가?",
      "choices": ["A 10% credit on the next order", "A full refund", "A free product sample", "A discount on shipping"],
      "choicesKo": ["다음 주문에 대한 10% 적립", "전액 환불", "무료 제품 샘플", "배송비 할인"],
      "answerIndex": 0,
      "explanation": "콜 씨는 사과의 뜻으로 다음 주문에 쓸 수 있는 10% 적립을 추가했다고 했습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    }
  ]
}
```
