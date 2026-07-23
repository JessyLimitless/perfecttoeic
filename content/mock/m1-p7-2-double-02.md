# Part 7 — Double Passage: Workshop Notice + Confirmation Email (워크숍 안내 + 등록 확인, 교차참조)

```json
{
  "id": "m1-p7-2-double-02",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage (Notice + Email)",
  "passageLines": [
    { "en": "[Passage 1 — Notice]", "ko": "[지문 1 — 안내문]" },
    { "en": "Summer Skills Series — Professional Development Workshops", "ko": "여름 스킬 시리즈 — 직무 역량 개발 워크숍" },
    { "en": "The Brookline Business Center is pleased to offer four half-day workshops this July.", "ko": "브루클라인 비즈니스 센터가 이번 7월 반나절 워크숍 네 가지를 마련했습니다." },
    { "en": "July 9 — Effective Business Writing ($60); July 16 — Data Presentation Basics ($75); July 23 — Negotiation Skills ($75); July 30 — Time Management ($60).", "ko": "7월 9일 — 효과적인 비즈니스 글쓰기(60달러); 7월 16일 — 데이터 발표 기초(75달러); 7월 23일 — 협상 기술(75달러); 7월 30일 — 시간 관리(60달러)." },
    { "en": "Each session runs from 9:00 A.M. to 12:30 P.M. and includes printed materials and refreshments.", "ko": "각 세션은 오전 9시부터 12시 30분까지 진행되며 인쇄 자료와 다과가 포함됩니다." },
    { "en": "Register for any two workshops and receive a 10 percent discount on the total; register for all four and save 20 percent.", "ko": "아무 워크숍 두 개를 등록하면 총액의 10퍼센트를, 네 개를 모두 등록하면 20퍼센트를 할인받습니다." },
    { "en": "Space is limited to twenty participants per session. Register online at brooklinebc.org.", "ko": "각 세션은 정원 20명으로 제한됩니다. brooklinebc.org에서 온라인으로 등록하세요." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: t.okafor@quickmail.com / From: registration@brooklinebc.org / Subject: Your Workshop Registration", "ko": "받는 사람: t.okafor@quickmail.com / 보낸 사람: registration@brooklinebc.org / 제목: 워크숍 등록 확인" },
    { "en": "Dear Mr. Okafor, thank you for registering for the Summer Skills Series. We have reserved your place in the following sessions:", "ko": "오카포 씨께, 여름 스킬 시리즈에 등록해 주셔서 감사합니다. 다음 세션에 자리를 예약해 드렸습니다:" },
    { "en": "Data Presentation Basics (July 16) and Negotiation Skills (July 23). Your 10 percent discount has been applied.", "ko": "데이터 발표 기초(7월 16일)와 협상 기술(7월 23일)입니다. 10퍼센트 할인이 적용되었습니다." },
    { "en": "Please note that Data Presentation Basics is nearly full; we recommend arriving by 8:45 A.M. to check in.", "ko": "데이터 발표 기초는 거의 마감되었으니 오전 8시 45분까지 도착해 등록 확인을 하시기를 권합니다." },
    { "en": "If you wish to add the Time Management workshop, reply to this e-mail and we will update your registration. — Brookline Business Center", "ko": "시간 관리 워크숍을 추가하고 싶으시면 이 이메일에 회신해 주시면 등록을 갱신해 드리겠습니다. — 브루클라인 비즈니스 센터" }
  ],
  "questions": [
    {
      "id": "m1-p7-2-double-02-q1",
      "prompt": "What is included with each workshop?",
      "promptKo": "각 워크숍에 포함되는 것은 무엇인가?",
      "choices": ["Printed materials and refreshments", "A one-year membership", "A follow-up online session", "Lunch at a nearby restaurant"],
      "choicesKo": ["인쇄 자료와 다과", "1년 회원권", "후속 온라인 세션", "인근 식당에서의 점심"],
      "answerIndex": 0,
      "explanation": "안내문에서 각 세션에 인쇄 자료와 다과가 포함된다고 했습니다. 회원권·온라인 후속·점심은 언급되지 않습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-2-double-02-q2",
      "prompt": "How much does the Negotiation Skills workshop cost before any discount?",
      "promptKo": "협상 기술 워크숍의 할인 전 가격은 얼마인가?",
      "choices": ["$60", "$70", "$75", "$90"],
      "choicesKo": ["60달러", "70달러", "75달러", "90달러"],
      "answerIndex": 2,
      "explanation": "안내문에 7월 23일 협상 기술은 75달러로 나와 있습니다. 60달러는 글쓰기·시간 관리 워크숍 가격입니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-2-double-02-q3",
      "prompt": "Why did Mr. Okafor receive a discount?",
      "promptKo": "오카포 씨가 할인을 받은 이유는 무엇인가?",
      "choices": ["He is a returning participant.", "He registered before a deadline.", "He is a center member.", "He registered for two workshops."],
      "choicesKo": ["재참가자여서", "마감 전에 등록해서", "센터 회원이어서", "워크숍 두 개를 등록해서"],
      "answerIndex": 3,
      "explanation": "안내문은 두 개 등록 시 10% 할인을 준다고 했고, 이메일에서 오카포 씨가 두 세션에 등록해 10% 할인이 적용됐다고 했습니다(교차참조). 재참가·마감·회원 여부는 근거가 없습니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-2-double-02-q4",
      "prompt": "What is Mr. Okafor advised to do for the July 16 session?",
      "promptKo": "오카포 씨는 7월 16일 세션을 위해 무엇을 하도록 권고받는가?",
      "choices": ["Bring his own materials", "Arrive early to check in", "Pay an additional fee", "Complete an online form"],
      "choicesKo": ["자기 자료를 가져온다", "일찍 도착해 등록 확인을 한다", "추가 요금을 낸다", "온라인 양식을 작성한다"],
      "answerIndex": 1,
      "explanation": "이메일에서 7월 16일 데이터 발표 기초가 거의 마감되어 8시 45분까지 도착해 등록 확인을 하라고 권했습니다. 자료 지참·추가 요금·양식 작성은 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-2-double-02-q5",
      "prompt": "What can Mr. Okafor do by replying to the e-mail?",
      "promptKo": "오카포 씨가 이메일에 회신함으로써 할 수 있는 일은 무엇인가?",
      "choices": ["Cancel his registration", "Request a full refund", "Add another workshop to his registration", "Change the session times"],
      "choicesKo": ["등록을 취소한다", "전액 환불을 요청한다", "등록에 다른 워크숍을 추가한다", "세션 시간을 변경한다"],
      "answerIndex": 2,
      "explanation": "이메일 끝에서 시간 관리 워크숍을 추가하려면 회신하라고 안내했습니다. 취소·환불·시간 변경은 언급되지 않습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    }
  ]
}
```
