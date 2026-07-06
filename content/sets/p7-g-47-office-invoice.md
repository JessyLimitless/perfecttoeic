# Part 7 — Invoice: Office Supplies (single passage)

```json
{
  "id": "p7-g-47",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Form",
  "passageLines": [
    { "en": "SUNRISE OFFICE SUPPLIES — Invoice #4471   Bill To: Meridian Design Studio   Date: April 12", "ko": "선라이즈 오피스 서플라이 — 청구서 #4471   청구 대상: 메리디안 디자인 스튜디오   날짜: 4월 12일" },
    { "en": "Ergonomic office chairs (x6) — $180 each — $1,080", "ko": "인체공학 사무용 의자 (6개) — 개당 180달러 — 1,080달러" },
    { "en": "Adjustable standing desks (x3) — $320 each — $960", "ko": "높이 조절 스탠딩 데스크 (3개) — 개당 320달러 — 960달러" },
    { "en": "Desk lamps (x6) — $25 each — $150", "ko": "책상 조명 (6개) — 개당 25달러 — 150달러" },
    { "en": "Subtotal: $2,190   Delivery: Free for orders over $2,000   Tax (8%): $175.20   Total Due: $2,365.20", "ko": "소계: 2,190달러   배송: 2,000달러 초과 주문 무료   세금(8%): 175.20달러   총 청구액: 2,365.20달러" },
    { "en": "Payment is due within 30 days. A 2% discount applies to payments made within 10 days.", "ko": "결제는 30일 이내에 하셔야 합니다. 10일 이내 결제 시 2% 할인이 적용됩니다." },
    { "en": "Please reference the invoice number when submitting payment.", "ko": "결제 시 청구서 번호를 기재해 주십시오." }
  ],
  "questions": [
    {
      "id": "p7-g-47-q1",
      "prompt": "What is the purpose of the document?",
      "promptKo": "이 문서의 목적은 무엇인가?",
      "choices": ["To advertise a sale", "To request a product catalog", "To confirm a delivery date", "To bill a customer for a purchase"],
      "choicesKo": ["할인 행사를 광고하려고", "제품 카탈로그를 요청하려고", "배송 날짜를 확인하려고", "구매에 대해 고객에게 청구하려고"],
      "answerIndex": 3,
      "explanation": "이 문서는 메리디안 디자인 스튜디오의 구매 내역과 청구액을 담은 청구서입니다. 따라서 (라)=3입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-47-q2",
      "prompt": "Why was delivery free of charge?",
      "promptKo": "배송이 무료였던 이유는 무엇인가?",
      "choices": ["It was a promotional week.", "The order exceeded $2,000.", "The customer is a member.", "The items were on clearance."],
      "choicesKo": ["판촉 주간이었다.", "주문액이 2,000달러를 초과했다.", "고객이 회원이다.", "상품이 재고 정리 중이었다."],
      "answerIndex": 1,
      "explanation": "배송은 2,000달러 초과 주문에 무료이고 소계가 2,190달러이므로 무료 배송 대상입니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-47-q3",
      "prompt": "How can Meridian Design Studio receive a discount?",
      "promptKo": "메리디안 디자인 스튜디오는 어떻게 할인을 받을 수 있는가?",
      "choices": ["By ordering more items", "By joining a loyalty program", "By paying within 10 days", "By picking up the order in person"],
      "choicesKo": ["더 많은 품목을 주문해서", "멤버십 프로그램에 가입해서", "10일 이내에 결제해서", "주문품을 직접 수령해서"],
      "answerIndex": 2,
      "explanation": "10일 이내에 결제하면 2% 할인이 적용된다고 했습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-47-q4",
      "prompt": "Which item had the highest price per unit?",
      "promptKo": "단위당 가격이 가장 높은 품목은 무엇인가?",
      "choices": ["The standing desks", "The office chairs", "The desk lamps", "The delivery service"],
      "choicesKo": ["스탠딩 데스크", "사무용 의자", "책상 조명", "배송 서비스"],
      "answerIndex": 0,
      "explanation": "스탠딩 데스크는 개당 320달러로, 의자(180달러)나 조명(25달러)보다 단가가 높습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    }
  ]
}
```
