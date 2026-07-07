# Part 7 — Email: Wholesale Furniture Shipment (paraphrase focus)

```json
{
  "id": "p7-para-01",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    { "en": "To: Marcus Bell, Purchasing Manager, Hartwell Home Goods", "ko": "받는 사람: 마커스 벨, 구매 관리자, 하트웰 홈 굿즈" },
    { "en": "From: sales@nordictimber.com", "ko": "보낸 사람: sales@nordictimber.com" },
    { "en": "Subject: Update on Your Bulk Order", "ko": "제목: 대량 주문 관련 안내" },
    { "en": "Dear Mr. Bell,", "ko": "벨 님께," },
    { "en": "Thank you for your order of 120 oak dining chairs, placed on March 3.", "ko": "3월 3일에 주문하신 오크 식탁 의자 120개에 감사드립니다." },
    { "en": "We are writing to let you know that production is now complete and every chair has passed our quality inspection.", "ko": "생산이 이제 완료되었으며 모든 의자가 품질 검사를 통과했음을 알려 드립니다." },
    { "en": "However, a shortage of shipping containers at the port has delayed dispatch by roughly one week.", "ko": "다만 항구의 선적 컨테이너 부족으로 인해 발송이 약 일주일 지연되었습니다." },
    { "en": "Your consignment will now leave our warehouse on March 24 rather than the originally scheduled date.", "ko": "귀사의 화물은 원래 예정일 대신 3월 24일에 저희 창고에서 출발하게 됩니다." },
    { "en": "To make up for the inconvenience, we will waive the standard delivery charge on this shipment.", "ko": "불편을 보상해 드리고자 이번 배송에 대한 기본 배송료를 면제해 드리겠습니다." },
    { "en": "Please confirm that your receiving dock can accommodate a full truckload, as the entire order will arrive together.", "ko": "전체 주문이 한 번에 도착하므로, 귀사의 하역장이 트럭 한 대 분량을 수용할 수 있는지 확인해 주십시오." },
    { "en": "If you have any concerns, our logistics coordinator, Dana Reyes, is happy to assist.", "ko": "궁금한 점이 있으시면 물류 담당자 데이나 레예스가 기꺼이 도와드리겠습니다." }
  ],
  "questions": [
    {
      "id": "p7-para-01-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이메일의 주된 목적은 무엇인가?",
      "choices": ["To request payment for an order", "To notify a client of a delayed shipment", "To apologize for a damaged product", "To cancel a previous order"],
      "choicesKo": ["주문 대금 지불을 요청하려고", "고객에게 배송 지연을 알리려고", "손상된 제품에 대해 사과하려고", "이전 주문을 취소하려고"],
      "answerIndex": 1,
      "explanation": "발송이 약 일주일 지연되어 출고일이 미뤄졌음을 고객에게 알리는 이메일입니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-para-01-q2",
      "prompt": "What caused the change to the shipping schedule?",
      "promptKo": "배송 일정이 바뀐 원인은 무엇인가?",
      "choices": ["A failed quality inspection", "A shortage of raw timber", "A limited supply of containers at the port", "A strike by warehouse workers"],
      "choicesKo": ["품질 검사 불합격", "원목 부족", "항구의 컨테이너 공급 부족", "창고 직원들의 파업"],
      "answerIndex": 2,
      "explanation": "항구의 선적 컨테이너 부족으로 발송이 지연되었다고 했으므로, 이를 바꿔 말한 '항구의 컨테이너 공급 부족'이 정답입니다. 의자는 검사를 통과했으므로 (가)는 오답입니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-para-01-q3",
      "prompt": "What does Nordic Timber offer to do?",
      "promptKo": "노르딕 팀버는 무엇을 해 주겠다고 하는가?",
      "choices": ["Provide the shipment at no delivery cost", "Give a refund for the chairs", "Send a replacement order", "Extend the payment deadline"],
      "choicesKo": ["배송비 없이 배송을 제공한다", "의자에 대해 환불해 준다", "교체 주문품을 보낸다", "결제 기한을 연장해 준다"],
      "answerIndex": 0,
      "explanation": "기본 배송료를 면제해 주겠다고 했으므로 이를 바꿔 말한 '배송비 없이 배송 제공'이 정답입니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-para-01-q4",
      "prompt": "What is suggested about the dining chairs?",
      "promptKo": "식탁 의자에 관해 암시된 것은 무엇인가?",
      "choices": ["They were returned by another customer", "They will be shipped in several batches", "They require assembly by the buyer", "They have met the company's quality standards"],
      "choicesKo": ["다른 고객이 반품한 것이다", "여러 차례에 나누어 배송된다", "구매자가 직접 조립해야 한다", "회사의 품질 기준을 충족했다"],
      "answerIndex": 3,
      "explanation": "모든 의자가 품질 검사를 통과했다고 했으므로 품질 기준을 충족했음을 알 수 있습니다. 전체 주문이 한 번에 도착한다고 했으므로 (나)는 오답입니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "p7-para-01-q5",
      "prompt": "The word \"accommodate\" in the email is closest in meaning to",
      "promptKo": "이메일에서 \"accommodate\"와 의미가 가장 가까운 것은?",
      "choices": ["decline", "handle", "decorate", "reserve"],
      "choicesKo": ["거절하다", "감당하다(수용하다)", "장식하다", "예약하다"],
      "answerIndex": 1,
      "explanation": "하역장이 트럭 한 대 분량을 '수용할' 수 있는지를 묻는 문맥이므로 'handle(감당하다)'이 가장 가깝습니다. 따라서 (나)=1입니다.",
      "category": "동의어"
    }
  ]
}
```
