# Part 7 — Double Passage: Job Posting + Application Email (채용공고 + 지원 이메일, 교차참조)

```json
{
  "id": "m1-p7-2-double-01",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage (Job Posting + Email)",
  "passageLines": [
    { "en": "[Passage 1 — Job Posting]", "ko": "[지문 1 — 채용공고]" },
    { "en": "Harborview Analytics — Junior Data Analyst", "ko": "하버뷰 애널리틱스 — 주니어 데이터 분석가" },
    { "en": "Harborview Analytics, a consulting firm serving retail clients, seeks a junior data analyst for its downtown office.", "ko": "소매 고객을 대상으로 하는 컨설팅 회사 하버뷰 애널리틱스가 시내 사무소에서 근무할 주니어 데이터 분석가를 찾습니다." },
    { "en": "Responsibilities include preparing weekly sales reports, maintaining client dashboards, and presenting findings to project teams.", "ko": "업무에는 주간 매출 보고서 작성, 고객 대시보드 관리, 프로젝트팀 대상 결과 발표가 포함됩니다." },
    { "en": "Required qualifications: a bachelor's degree in statistics, economics, or a related field, and at least one year of experience working with spreadsheets and databases.", "ko": "필수 자격: 통계학, 경제학 또는 관련 분야 학사 학위, 그리고 스프레드시트와 데이터베이스 사용 경력 최소 1년." },
    { "en": "Candidates who are also comfortable with data-visualization tools will be given preference.", "ko": "데이터 시각화 도구까지 능숙하게 다루는 지원자는 우대합니다." },
    { "en": "To apply, e-mail a résumé and a brief cover letter to careers@harborview.com by March 15. Interviews will begin the following week.", "ko": "지원하려면 3월 15일까지 careers@harborview.com으로 이력서와 간단한 자기소개서를 이메일로 보내십시오. 면접은 그다음 주에 시작됩니다." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: careers@harborview.com / From: n.walsh@mailbox.com / Date: March 10 / Subject: Junior Data Analyst Position", "ko": "받는 사람: careers@harborview.com / 보낸 사람: n.walsh@mailbox.com / 날짜: 3월 10일 / 제목: 주니어 데이터 분석가 지원" },
    { "en": "Dear Hiring Manager, I am writing to apply for the junior data analyst role posted on your website.", "ko": "채용 담당자님께, 귀사 웹사이트에 게시된 주니어 데이터 분석가 직무에 지원하고자 이 글을 씁니다." },
    { "en": "I graduated last spring with a degree in economics and have spent the past eighteen months as a reporting assistant at a regional grocery chain, where I built and maintained sales spreadsheets.", "ko": "저는 지난봄 경제학 학위를 받고 졸업했으며, 지난 18개월 동안 지역 식료품 체인에서 보고 담당 보조로 근무하며 매출 스프레드시트를 만들고 관리해 왔습니다." },
    { "en": "While I have not yet used specialized visualization software, I am a quick learner and completed an online course in charting fundamentals last month.", "ko": "전문 시각화 소프트웨어는 아직 사용해 본 적이 없지만, 저는 습득이 빠르며 지난달 차트 작성 기초 온라인 강좌를 수료했습니다." },
    { "en": "My résumé is attached, and I am available to interview any afternoon. Thank you for your consideration. — Nadia Walsh", "ko": "이력서를 첨부했으며, 어느 오후든 면접이 가능합니다. 검토해 주셔서 감사합니다. — 나디아 월시" }
  ],
  "questions": [
    {
      "id": "m1-p7-2-double-01-q1",
      "prompt": "According to the job posting, what is one responsibility of the position?",
      "promptKo": "채용공고에 따르면, 이 직무의 업무 중 하나는 무엇인가?",
      "choices": ["Recruiting new clients", "Presenting findings to project teams", "Managing the company's budget", "Designing the company website"],
      "choicesKo": ["신규 고객 유치", "프로젝트팀에 결과 발표", "회사 예산 관리", "회사 웹사이트 디자인"],
      "answerIndex": 1,
      "explanation": "공고의 업무에 프로젝트팀 대상 결과 발표가 포함된다고 했습니다. 고객 유치·예산 관리·웹사이트 디자인은 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-2-double-01-q2",
      "prompt": "When did Ms. Walsh send her application?",
      "promptKo": "월시 씨는 언제 지원서를 보냈는가?",
      "choices": ["On March 3", "On March 8", "On the interview date", "Before the March 15 deadline"],
      "choicesKo": ["3월 3일에", "3월 8일에", "면접일에", "3월 15일 마감 전에"],
      "answerIndex": 3,
      "explanation": "이메일 날짜는 3월 10일이고 공고 마감은 3월 15일이므로, 그녀는 마감 전에 지원했습니다. 구체적 날짜 3·8일이나 면접일은 맞지 않습니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-2-double-01-q3",
      "prompt": "What requirement does Ms. Walsh appear to meet?",
      "promptKo": "월시 씨가 충족하는 것으로 보이는 자격 요건은 무엇인가?",
      "choices": ["At least one year of spreadsheet and database experience", "A graduate degree in statistics", "Five years of consulting experience", "Fluency in a second language"],
      "choicesKo": ["스프레드시트·데이터베이스 경력 최소 1년", "통계학 석사 학위", "컨설팅 경력 5년", "제2외국어 유창성"],
      "answerIndex": 0,
      "explanation": "공고는 스프레드시트·데이터베이스 경력 1년 이상을 요구하고, 월시 씨는 18개월간 매출 스프레드시트를 다뤘으므로 이 요건을 충족합니다(교차참조). 석사·5년 경력·외국어는 요건도 사실도 아닙니다. 따라서 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-2-double-01-q4",
      "prompt": "What is suggested about Ms. Walsh regarding the preferred qualification?",
      "promptKo": "우대 자격과 관련하여 월시 씨에 관해 암시되는 것은 무엇인가?",
      "choices": ["She has years of experience with visualization tools.", "She meets every preferred qualification fully.", "She is not eligible to apply.", "She is still developing her visualization skills."],
      "choicesKo": ["시각화 도구를 여러 해 다뤄 왔다.", "우대 자격을 모두 완벽히 갖췄다.", "지원 자격이 없다.", "시각화 역량을 아직 키워 가는 중이다."],
      "answerIndex": 3,
      "explanation": "공고의 우대 사항은 시각화 도구 능숙이고, 월시 씨는 전문 소프트웨어 경험은 없으나 기초 강좌를 수료했다고 했으므로 아직 역량을 키우는 중임을 알 수 있습니다(교차참조). 여러 해 경력·완벽 충족·지원 불가는 틀립니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-2-double-01-q5",
      "prompt": "What does Ms. Walsh indicate about her availability?",
      "promptKo": "월시 씨가 자신의 가능 시간에 관해 밝힌 것은 무엇인가?",
      "choices": ["She can start work immediately.", "She can interview on any afternoon.", "She is available only on weekends.", "She needs two weeks' notice."],
      "choicesKo": ["즉시 근무를 시작할 수 있다.", "어느 오후든 면접이 가능하다.", "주말에만 시간이 된다.", "2주 전 통보가 필요하다."],
      "answerIndex": 1,
      "explanation": "이메일 끝에서 어느 오후든 면접이 가능하다고 밝혔습니다. 즉시 근무·주말 한정·2주 통보는 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    }
  ]
}
```
