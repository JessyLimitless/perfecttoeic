# Part 7 — Double Passage: Fee Schedule + Email (HARD, 교차참조·계산)

```json
{
  "id": "p7-hard-02",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    { "en": "[Passage 1 — Registration Notice]", "ko": "[지문 1 — 등록 안내]" },
    { "en": "Northgate Business Forum — Registration Fees", "ko": "노스게이트 비즈니스 포럼 — 등록비" },
    { "en": "Standard registration: $200. Early-bird registration (completed on or before March 1): $160.", "ko": "일반 등록: 200달러. 얼리버드 등록(3월 1일 이전 완료): 160달러." },
    { "en": "Optional pre-forum workshop: an additional $50, available with any registration.", "ko": "선택 사전 워크숍: 추가 50달러로, 모든 등록에 추가 가능." },
    { "en": "Forum Association members receive 25% off the registration fee (the workshop fee is not discounted).", "ko": "포럼 협회 회원은 등록비의 25% 할인을 받습니다(워크숍 비용은 할인되지 않음)." },
    { "en": "All fees must be paid at the time of registration. Refunds are available until March 10.", "ko": "모든 비용은 등록 시 결제해야 합니다. 환불은 3월 10일까지 가능합니다." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: registration@northgateforum.org", "ko": "받는 사람: registration@northgateforum.org" },
    { "en": "From: h.lin@brightmail.com", "ko": "보낸 사람: h.lin@brightmail.com" },
    { "en": "Subject: Registration Confirmation", "ko": "제목: 등록 확인" },
    { "en": "Hello, I completed my registration on February 20 as a current Forum Association member.", "ko": "안녕하세요, 저는 현재 포럼 협회 회원으로서 2월 20일에 등록을 완료했습니다." },
    { "en": "I also signed up for the pre-forum workshop on data-driven marketing.", "ko": "저는 데이터 기반 마케팅에 관한 사전 워크숍에도 신청했습니다." },
    { "en": "Could you please confirm that my payment was processed correctly and send me a receipt? Thank you, Hana Lin", "ko": "제 결제가 올바르게 처리되었는지 확인하고 영수증을 보내주시겠어요? 감사합니다, 하나 린" }
  ],
  "questions": [
    {
      "id": "p7-hard-02-q1",
      "prompt": "Why did Ms. Lin send the email?",
      "promptKo": "린 씨가 이메일을 보낸 이유는 무엇인가?",
      "choices": ["To cancel her registration", "To ask about the forum schedule", "To confirm her payment and request a receipt", "To apply for a membership"],
      "choicesKo": ["등록을 취소하려고", "포럼 일정을 문의하려고", "결제를 확인하고 영수증을 요청하려고", "회원 가입을 신청하려고"],
      "answerIndex": 2,
      "explanation": "린 씨는 결제가 올바르게 처리되었는지 확인하고 영수증을 보내달라고 요청합니다. 따라서 (다)=2입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-hard-02-q2",
      "prompt": "Based on both passages, how much should Ms. Lin have paid in total?",
      "promptKo": "두 지문에 근거할 때, 린 씨가 지불했어야 할 총액은 얼마인가?",
      "choices": ["$160", "$170", "$210", "$170 plus tax only"],
      "choicesKo": ["160달러", "170달러", "210달러", "세금만 더한 170달러"],
      "answerIndex": 1,
      "explanation": "2월 20일 등록은 얼리버드(160달러)이고 회원 25% 할인으로 등록비는 120달러, 워크숍 50달러는 할인 없이 더해져 총 170달러입니다. 따라서 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-02-q3",
      "prompt": "What discount is Ms. Lin entitled to?",
      "promptKo": "린 씨가 받을 수 있는 할인은 무엇인가?",
      "choices": ["A 25% discount on the workshop", "A 25% discount on the registration fee", "A full refund of the workshop fee", "No discount at all"],
      "choicesKo": ["워크숍 25% 할인", "등록비 25% 할인", "워크숍 비용 전액 환불", "할인 없음"],
      "answerIndex": 1,
      "explanation": "협회 회원은 등록비의 25% 할인을 받으며 워크숍 비용은 할인되지 않는다고 명시되어 있습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-02-q4",
      "prompt": "According to the notice, until when can attendees receive a refund?",
      "promptKo": "안내문에 따르면, 참석자는 언제까지 환불받을 수 있는가?",
      "choices": ["Until March 10", "Until March 1", "Until February 20", "Refunds are not available"],
      "choicesKo": ["3월 10일까지", "3월 1일까지", "2월 20일까지", "환불 불가"],
      "answerIndex": 0,
      "explanation": "안내문은 환불이 3월 10일까지 가능하다고 명시합니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-02-q5",
      "prompt": "What is suggested about the workshop Ms. Lin selected?",
      "promptKo": "린 씨가 선택한 워크숍에 관해 시사된 것은 무엇인가?",
      "choices": ["It is free for members", "It replaces the main forum", "It is held after the forum", "It focuses on data-driven marketing"],
      "choicesKo": ["회원에게 무료이다", "본 포럼을 대체한다", "포럼 이후에 열린다", "데이터 기반 마케팅에 초점을 둔다"],
      "answerIndex": 3,
      "explanation": "린 씨는 '데이터 기반 마케팅'에 관한 사전 워크숍에 신청했다고 밝혔습니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    }
  ]
}
```
