# Part 7 — Double Passage: Workshop Ad + Email

```json
{
  "id": "p7-g-59",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    { "en": "[Passage 1 — Advertisement]", "ko": "[지문 1 — 광고]" },
    { "en": "Summit Skills Center: Fall Professional Workshops", "ko": "서밋 스킬스 센터: 가을 전문 워크숍" },
    { "en": "Advance your career with our hands-on evening workshops, held on Tuesdays at our downtown campus.", "ko": "시내 캠퍼스에서 매주 화요일 저녁에 열리는 실습 중심 워크숍으로 경력을 발전시키세요." },
    { "en": "• Data Visualization — September 9, $120", "ko": "• 데이터 시각화 — 9월 9일, 120달러" },
    { "en": "• Public Speaking — September 16, $90", "ko": "• 대중 연설 — 9월 16일, 90달러" },
    { "en": "• Project Management — September 23, $150", "ko": "• 프로젝트 관리 — 9월 23일, 150달러" },
    { "en": "• Negotiation Skills — September 30, $110", "ko": "• 협상 기술 — 9월 30일, 110달러" },
    { "en": "Register for two or more workshops and receive a 15% discount on the total. Space is limited to 20 participants per session.", "ko": "두 개 이상의 워크숍에 등록하면 총액에서 15% 할인을 받습니다. 각 세션은 참가자 20명으로 제한됩니다." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: register@summitskills.com", "ko": "받는 사람: register@summitskills.com" },
    { "en": "From: kwame.mensah@zentech.com", "ko": "보낸 사람: kwame.mensah@zentech.com" },
    { "en": "Subject: Fall Workshop Registration", "ko": "제목: 가을 워크숍 등록" },
    { "en": "Hello, I would like to register for the Data Visualization and Project Management workshops.", "ko": "안녕하세요, 데이터 시각화와 프로젝트 관리 워크숍에 등록하고 싶습니다." },
    { "en": "I work with analytics daily, so these two topics are the most relevant to my role.", "ko": "저는 매일 분석 업무를 하기 때문에 이 두 주제가 제 업무와 가장 관련이 깊습니다." },
    { "en": "Could you confirm whether the 15% discount applies to my registration? Also, is there parking available near the campus?", "ko": "제 등록에 15% 할인이 적용되는지 확인해 주시겠어요? 그리고 캠퍼스 근처에 주차가 가능한가요?" },
    { "en": "Thank you, Kwame Mensah", "ko": "감사합니다, 콰메 멘사 드림" }
  ],
  "questions": [
    {
      "id": "p7-g-59-q1",
      "prompt": "What is the purpose of the advertisement?",
      "promptKo": "광고의 목적은 무엇인가?",
      "choices": ["To promote a series of professional workshops", "To announce a change in tuition fees", "To recruit new instructors", "To describe a university degree program"],
      "choicesKo": ["일련의 전문 워크숍을 홍보하려고", "수업료 변경을 알리려고", "새 강사를 모집하려고", "대학 학위 과정을 설명하려고"],
      "answerIndex": 0,
      "explanation": "광고는 서밋 스킬스 센터의 가을 전문 워크숍들을 소개하며 등록을 유도합니다. 따라서 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-59-q2",
      "prompt": "According to the advertisement, what is limited?",
      "promptKo": "광고에 따르면, 무엇이 제한되는가?",
      "choices": ["The number of workshops offered", "The discount period", "The number of participants per session", "The length of each class"],
      "choicesKo": ["제공되는 워크숍 수", "할인 기간", "세션당 참가자 수", "각 수업의 길이"],
      "answerIndex": 2,
      "explanation": "각 세션은 참가자 20명으로 제한된다고 명시했습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-59-q3",
      "prompt": "What discount will Mr. Mensah most likely receive?",
      "promptKo": "멘사 씨는 어떤 할인을 받을 가능성이 큰가?",
      "choices": ["No discount", "A 5% discount", "A 10% discount", "A 15% discount"],
      "choicesKo": ["할인 없음", "5% 할인", "10% 할인", "15% 할인"],
      "answerIndex": 3,
      "explanation": "멘사 씨는 두 개의 워크숍에 등록하므로 두 개 이상 등록 시 주어지는 15% 할인을 받습니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-59-q4",
      "prompt": "How much will Mr. Mensah's two chosen workshops cost before the discount?",
      "promptKo": "멘사 씨가 선택한 두 워크숍의 할인 전 금액은 얼마인가?",
      "choices": ["$210", "$270", "$230", "$260"],
      "choicesKo": ["210달러", "270달러", "230달러", "260달러"],
      "answerIndex": 1,
      "explanation": "데이터 시각화 120달러와 프로젝트 관리 150달러를 합하면 270달러입니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-59-q5",
      "prompt": "What does Mr. Mensah ask about besides the discount?",
      "promptKo": "멘사 씨는 할인 외에 무엇에 대해 문의하는가?",
      "choices": ["The instructor's name", "The class schedule", "Parking availability", "A refund policy"],
      "choicesKo": ["강사 이름", "수업 일정", "주차 가능 여부", "환불 정책"],
      "answerIndex": 2,
      "explanation": "멘사 씨는 할인 적용 여부와 함께 캠퍼스 근처 주차 가능 여부를 물었습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    }
  ]
}
```
