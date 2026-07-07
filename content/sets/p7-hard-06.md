# Part 7 — Single Passage: Email (HARD, 추론)

```json
{
  "id": "p7-hard-06",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    { "en": "To: procurement@harborsupplies.com", "ko": "받는 사람: procurement@harborsupplies.com" },
    { "en": "From: j.okonkwo@meridianpackaging.com", "ko": "보낸 사람: j.okonkwo@meridianpackaging.com" },
    { "en": "Subject: Proposal to Address Recent Delivery Delays", "ko": "제목: 최근 배송 지연 해결을 위한 제안" },
    { "en": "Dear Mr. Alvarez,", "ko": "알바레즈 님께," },
    { "en": "Thank you for your patience over the past two months. We recognize that three of your recent shipments arrived later than promised.", "ko": "지난 두 달간 인내해 주셔서 감사합니다. 최근 세 건의 배송이 약속보다 늦게 도착했음을 인지하고 있습니다." },
    { "en": "After reviewing our operations, we traced the delays to a bottleneck at our older loading facility, which handles the northern routes.", "ko": "저희 운영을 검토한 결과, 지연의 원인이 북부 노선을 담당하는 노후 적재 시설의 병목 현상임을 확인했습니다." },
    { "en": "Beginning next month, all of your orders will be routed through our newly automated southern facility instead.", "ko": "다음 달부터 귀사의 모든 주문은 대신 새로 자동화된 남부 시설을 통해 처리될 것입니다." },
    { "en": "We are confident this will restore the two-day delivery window specified in our contract.", "ko": "이로써 계약에 명시된 이틀 배송 기한이 회복될 것이라 확신합니다." },
    { "en": "As a gesture of goodwill, we will also waive the shipping charges on your next order.", "ko": "선의의 표시로 다음 주문의 배송비도 면제해 드리겠습니다." },
    { "en": "Please let me know if you would like to discuss this further. Sincerely, Joy Okonkwo", "ko": "더 논의하고 싶으시면 알려 주십시오. 조이 오콘크워 드림" }
  ],
  "questions": [
    {
      "id": "p7-hard-06-q1",
      "prompt": "Why did Ms. Okonkwo write the email?",
      "promptKo": "오콘크워 씨가 이메일을 쓴 이유는 무엇인가?",
      "choices": ["To request a new contract", "To explain and resolve a delivery problem", "To announce a price increase", "To apologize for a billing error"],
      "choicesKo": ["새 계약을 요청하려고", "배송 문제를 설명하고 해결하려고", "가격 인상을 알리려고", "청구 오류를 사과하려고"],
      "answerIndex": 1,
      "explanation": "이메일은 최근 배송 지연의 원인을 설명하고 해결책을 제시합니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-hard-06-q2",
      "prompt": "What was the cause of the delays?",
      "promptKo": "지연의 원인은 무엇이었는가?",
      "choices": ["A staff shortage", "Bad weather", "A bottleneck at an older facility", "An incorrect address"],
      "choicesKo": ["인력 부족", "악천후", "노후 시설의 병목 현상", "잘못된 주소"],
      "answerIndex": 2,
      "explanation": "지연 원인은 북부 노선을 담당하는 노후 적재 시설의 병목 현상으로 확인되었습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-06-q3",
      "prompt": "What can be inferred about the southern facility?",
      "promptKo": "남부 시설에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": ["It is expected to be faster than the older one", "It is smaller than the northern one", "It will be closed next month", "It handles only international orders"],
      "choicesKo": ["기존 시설보다 더 빠를 것으로 예상된다", "북부 시설보다 작다", "다음 달에 문을 닫는다", "국제 주문만 처리한다"],
      "answerIndex": 0,
      "explanation": "새로 자동화된 남부 시설로 처리하면 이틀 배송 기한이 회복된다고 하므로, 노후 시설보다 더 빠를 것으로 추론됩니다. 따라서 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-06-q4",
      "prompt": "What does Ms. Okonkwo offer Mr. Alvarez?",
      "promptKo": "오콘크워 씨는 알바레즈 씨에게 무엇을 제안하는가?",
      "choices": ["A partial refund", "A discount on all future orders", "A free product sample", "Waived shipping charges on the next order"],
      "choicesKo": ["부분 환불", "향후 모든 주문 할인", "무료 제품 샘플", "다음 주문 배송비 면제"],
      "answerIndex": 3,
      "explanation": "선의의 표시로 다음 주문의 배송비를 면제해 주겠다고 했습니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    }
  ]
}
```
