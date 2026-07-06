# Part 7 — Double Passage: Online Course (Advertisement + Email)

```json
{
  "id": "p7-g-52",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    { "en": "[Passage 1 — Advertisement]", "ko": "[지문 1 — 광고]" },
    { "en": "Skillbridge Online — Master Data Visualization in Six Weeks", "ko": "스킬브리지 온라인 — 6주 만에 데이터 시각화 마스터하기" },
    { "en": "Our new online course teaches you to turn raw data into clear, compelling charts.", "ko": "저희의 새 온라인 강좌는 원시 데이터를 명확하고 설득력 있는 차트로 바꾸는 법을 가르칩니다." },
    { "en": "The course includes twelve video lessons, weekly live Q&A sessions, and a certificate upon completion.", "ko": "강좌에는 열두 개의 동영상 강의, 매주 실시간 질의응답 세션, 그리고 수료 시 발급되는 수료증이 포함됩니다." },
    { "en": "Early-bird price: $150 (regular $220) if you enroll before August 15.", "ko": "얼리버드 가격: 8월 15일 전에 등록하시면 150달러(정가 220달러)입니다." },
    { "en": "All students get lifetime access to course materials and future updates.", "ko": "모든 수강생은 강좌 자료와 향후 업데이트에 평생 접근할 수 있습니다." },
    { "en": "Visit skillbridge.com/dataviz to enroll today.", "ko": "오늘 skillbridge.com/dataviz를 방문해 등록하세요." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: support@skillbridge.com", "ko": "받는 사람: support@skillbridge.com" },
    { "en": "From: l.romano@webmail.com", "ko": "보낸 사람: l.romano@webmail.com" },
    { "en": "Subject: Question about the Data Visualization course", "ko": "제목: 데이터 시각화 강좌 관련 질문" },
    { "en": "Hello, I'm interested in enrolling in your Data Visualization course at the early-bird price.", "ko": "안녕하세요, 저는 얼리버드 가격으로 데이터 시각화 강좌에 등록하는 데 관심이 있습니다." },
    { "en": "Before I sign up, I have two questions. First, are the live Q&A sessions recorded for those who cannot attend?", "ko": "등록하기 전에 두 가지 질문이 있습니다. 첫째, 실시간 질의응답 세션은 참석하지 못하는 사람을 위해 녹화되나요?" },
    { "en": "Second, is the certificate recognized by employers, or is it just for personal reference?", "ko": "둘째, 수료증은 고용주에게 인정받나요, 아니면 개인적인 참고용일 뿐인가요?" },
    { "en": "I plan to enroll this week, so a quick reply would be appreciated. Thank you, Lucia Romano", "ko": "이번 주에 등록할 계획이라 빠른 답변을 주시면 감사하겠습니다. 감사합니다, 루시아 로마노" }
  ],
  "questions": [
    {
      "id": "p7-g-52-q1",
      "prompt": "What is being advertised?",
      "promptKo": "무엇이 광고되고 있는가?",
      "choices": ["A software product", "An online course", "A design conference", "A job opening"],
      "choicesKo": ["소프트웨어 제품", "온라인 강좌", "디자인 콘퍼런스", "채용 공고"],
      "answerIndex": 1,
      "explanation": "광고는 6주 과정의 데이터 시각화 온라인 강좌를 홍보합니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-52-q2",
      "prompt": "According to the advertisement, what do students receive upon completion?",
      "promptKo": "광고에 따르면, 수강생은 수료 시 무엇을 받는가?",
      "choices": ["A cash refund", "A physical textbook", "A free upgrade", "A certificate"],
      "choicesKo": ["현금 환불", "실물 교재", "무료 업그레이드", "수료증"],
      "answerIndex": 3,
      "explanation": "광고는 수료 시 수료증이 발급된다고 명시합니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-52-q3",
      "prompt": "Why did Ms. Romano write the email?",
      "promptKo": "로마노 씨가 이메일을 보낸 이유는 무엇인가?",
      "choices": ["To ask questions before enrolling", "To request a refund", "To report a technical problem", "To cancel her enrollment"],
      "choicesKo": ["등록 전에 질문하려고", "환불을 요청하려고", "기술적 문제를 신고하려고", "등록을 취소하려고"],
      "answerIndex": 0,
      "explanation": "로마노 씨는 등록하기 전에 세션 녹화와 수료증 인정 여부를 묻고 있습니다. 따라서 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-52-q4",
      "prompt": "How much does Ms. Romano most likely expect to pay?",
      "promptKo": "로마노 씨는 얼마를 지불할 것으로 예상하겠는가?",
      "choices": ["$220", "$200", "$150", "It will be free."],
      "choicesKo": ["220달러", "200달러", "150달러", "무료일 것이다."],
      "answerIndex": 2,
      "explanation": "로마노 씨는 얼리버드 가격으로 등록하려 하고, 광고상 얼리버드 가격은 150달러이므로 150달러를 낼 것입니다. 따라서 (다)=2입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-52-q5",
      "prompt": "What is suggested about Ms. Romano?",
      "promptKo": "로마노 씨에 관해 암시된 것은 무엇인가?",
      "choices": ["She has taken the course before.", "She intends to enroll soon.", "She works as a course instructor.", "She missed the enrollment deadline."],
      "choicesKo": ["전에 이 강좌를 수강한 적이 있다.", "곧 등록할 생각이다.", "강좌 강사로 일한다.", "등록 마감을 놓쳤다."],
      "answerIndex": 1,
      "explanation": "로마노 씨는 이번 주에 등록할 계획이라고 했으므로 곧 등록할 의사가 있습니다. 따라서 (나)=1입니다.",
      "category": "추론"
    }
  ]
}
```
