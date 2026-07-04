# Diagnostic — Reading Part 7 (Single Passage: Email)

```json
{
  "id": "diag-rc-p7",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    { "en": "From: Nadia Kwon, Customer Success, DataLens", "ko": "보낸 사람: 나디아 권, 고객 성공팀, 데이터렌즈" },
    { "en": "To: Mr. Harold Chen", "ko": "받는 사람: 해럴드 첸 님" },
    { "en": "Subject: Getting Started with Your DataLens Free Trial", "ko": "제목: 데이터렌즈 무료 체험 시작하기" },
    { "en": "Dear Mr. Chen, thank you for signing up for a 30-day free trial of DataLens, our sales-forecasting platform. This message explains how to get the most out of your trial before it ends on June 30.", "ko": "첸 님께, 저희 매출 예측 플랫폼 데이터렌즈의 30일 무료 체험에 가입해 주셔서 감사합니다. 이 안내는 6월 30일 체험 종료 전에 체험을 최대한 활용하는 방법을 설명합니다." },
    { "en": "First, we recommend connecting your existing spreadsheet so the system can begin learning from your past sales within minutes.", "ko": "먼저, 기존 스프레드시트를 연결하시면 시스템이 몇 분 안에 과거 매출을 학습하기 시작하므로 이를 권장합니다." },
    { "en": "Once your data is uploaded, DataLens will generate a weekly forecast every Monday morning and highlight any products likely to sell out.", "ko": "데이터가 업로드되면, 데이터렌즈는 매주 월요일 아침에 주간 예측을 생성하고 품절될 가능성이 있는 상품을 표시해 줍니다." },
    { "en": "Please note that the trial includes full access to all reporting features, but automated email alerts are available only on paid plans.", "ko": "체험판은 모든 보고 기능에 대한 전체 접근을 포함하지만, 자동 이메일 알림은 유료 요금제에서만 이용할 수 있는 점을 유의해 주십시오." },
    { "en": "If you would like a guided walkthrough, our team offers a free 20-minute video call. You can reserve a time using the link at the bottom of this email.", "ko": "안내가 필요하시면, 저희 팀이 무료 20분 화상 통화를 제공합니다. 이 이메일 하단의 링크로 시간을 예약하실 수 있습니다." },
    { "en": "We're confident you'll find DataLens a valuable addition to your planning process. Best regards, Nadia Kwon", "ko": "데이터렌즈가 귀하의 기획 과정에 가치 있는 도구가 되리라 확신합니다. 나디아 권 드림." }
  ],
  "questions": [
    {
      "id": "diag-rc-p7-q1",
      "prompt": "Why was the email written?",
      "promptKo": "이 이메일은 왜 작성되었는가?",
      "choices": [
        "To explain how to use a free trial",
        "To request payment for a subscription",
        "To announce a price increase",
        "To apologize for a service outage"
      ],
      "choicesKo": [
        "무료 체험 사용법을 설명하려고",
        "구독 요금 납부를 요청하려고",
        "가격 인상을 알리려고",
        "서비스 중단을 사과하려고"
      ],
      "answerIndex": 0,
      "explanation": "이메일은 무료 체험을 최대한 활용하는 방법을 설명한다고 밝히고 사용 단계를 안내합니다. 따라서 정답은 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "diag-rc-p7-q2",
      "prompt": "When does the free trial end?",
      "promptKo": "무료 체험은 언제 종료되는가?",
      "choices": [
        "On Monday morning",
        "Within a few minutes",
        "On June 30",
        "After 20 minutes"
      ],
      "choicesKo": [
        "월요일 아침에",
        "몇 분 이내에",
        "6월 30일에",
        "20분 후에"
      ],
      "answerIndex": 2,
      "explanation": "'before it ends on June 30'이라고 명시되어 체험은 6월 30일에 종료됩니다. 따라서 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "diag-rc-p7-q3",
      "prompt": "What is suggested about DataLens?",
      "promptKo": "데이터렌즈에 대해 무엇이 암시되는가?",
      "choices": [
        "It requires special hardware to run",
        "It can start working soon after data is connected",
        "It is available in only one country",
        "It removes the need for a sales team"
      ],
      "choicesKo": [
        "실행하려면 특수 하드웨어가 필요하다",
        "데이터를 연결한 직후 작동을 시작할 수 있다",
        "한 나라에서만 이용할 수 있다",
        "영업팀의 필요성을 없앤다"
      ],
      "answerIndex": 1,
      "explanation": "스프레드시트를 연결하면 시스템이 '몇 분 안에' 과거 매출을 학습하기 시작한다고 했으므로, 연결 직후 곧 작동함을 알 수 있습니다. 따라서 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "diag-rc-p7-q4",
      "prompt": "What is NOT included in the free trial?",
      "promptKo": "무료 체험에 포함되지 않는 것은 무엇인가?",
      "choices": [
        "Access to all reporting features",
        "A weekly forecast",
        "A free video walkthrough",
        "Automated email alerts"
      ],
      "choicesKo": [
        "모든 보고 기능 이용",
        "주간 예측",
        "무료 화상 안내",
        "자동 이메일 알림"
      ],
      "answerIndex": 3,
      "explanation": "자동 이메일 알림은 유료 요금제에서만 이용할 수 있다고 했으므로 체험판에는 포함되지 않습니다. 나머지는 모두 체험에 포함됩니다. 따라서 정답은 (라)=3입니다.",
      "category": "사실확인"
    },
    {
      "id": "diag-rc-p7-q5",
      "prompt": "The word \"reserve\" in the email is closest in meaning to",
      "promptKo": "이메일의 단어 \"reserve\"와 의미가 가장 가까운 것은?",
      "choices": ["book", "keep silent", "return", "cancel"],
      "choicesKo": ["예약하다", "침묵을 지키다", "반납하다", "취소하다"],
      "answerIndex": 0,
      "explanation": "'reserve a time'은 시간을 '예약하다'라는 뜻이므로 'book'과 가장 가깝습니다. 따라서 정답은 (가)=0입니다.",
      "category": "동의어"
    },
    {
      "id": "diag-rc-p7-q6",
      "prompt": "How can Mr. Chen arrange a walkthrough?",
      "promptKo": "첸 씨는 어떻게 안내(walkthrough)를 잡을 수 있는가?",
      "choices": [
        "By calling the sales office",
        "By replying to the email",
        "By using a link in the email",
        "By visiting the DataLens headquarters"
      ],
      "choicesKo": [
        "영업 사무실에 전화해서",
        "이메일에 답장해서",
        "이메일의 링크를 이용해서",
        "데이터렌즈 본사를 방문해서"
      ],
      "answerIndex": 2,
      "explanation": "'reserve a time using the link at the bottom of this email'이라고 안내하므로 이메일 하단의 링크로 예약합니다. 따라서 정답은 (다)=2입니다.",
      "category": "세부사항"
    }
  ]
}
```
