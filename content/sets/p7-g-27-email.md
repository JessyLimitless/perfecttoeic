# p7-g-27 — MEDIUM — Software Onboarding Email (Email)

```json
{
  "id": "p7-g-27",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    { "en": "From: Rachel Ortiz, Onboarding Team, BrightMetrics", "ko": "보낸 사람: 레이철 오르티스, 온보딩팀, 브라이트메트릭스" },
    { "en": "To: Kevin Lau", "ko": "받는 사람: 케빈 라우 님" },
    { "en": "Subject: Welcome — Setting Up Your BrightMetrics Account", "ko": "제목: 환영합니다 — 브라이트메트릭스 계정 설정하기" },
    { "en": "Dear Mr. Lau, welcome to BrightMetrics. Your company has added you as a user on our reporting platform, and this email will help you get started.", "ko": "라우 님께, 브라이트메트릭스에 오신 것을 환영합니다. 귀사에서 저희 보고 플랫폼의 사용자로 귀하를 등록하셨으며, 이 이메일이 시작을 도와드릴 것입니다." },
    { "en": "To activate your account, please click the button below within seven days. After that period, the invitation link will expire and your administrator will need to resend it.", "ko": "계정을 활성화하려면 7일 이내에 아래 버튼을 클릭해 주십시오. 그 기간이 지나면 초대 링크가 만료되어 관리자가 다시 보내야 합니다." },
    { "en": "Once you log in, we recommend completing the short setup guide, which walks you through connecting your first data source.", "ko": "로그인하시면, 첫 데이터 소스를 연결하는 과정을 안내하는 짧은 설정 가이드를 완료하시길 권장합니다." },
    { "en": "If you run into any trouble, our support team is available by live chat on weekdays from 9 A.M. to 6 P.M.", "ko": "문제가 생기면, 저희 지원팀이 평일 오전 9시부터 오후 6시까지 실시간 채팅으로 도와드립니다." },
    { "en": "We look forward to helping your team turn data into better decisions. Best regards, Rachel Ortiz", "ko": "귀 팀이 데이터를 더 나은 의사결정으로 바꾸도록 돕게 되기를 기대합니다. 레이철 오르티스 드림." }
  ],
  "questions": [
    {
      "id": "p7-g-27-q1",
      "prompt": "Why did Mr. Lau receive this email?",
      "promptKo": "라우 씨는 왜 이 이메일을 받았는가?",
      "choices": [
        "He was added as a user on a platform",
        "He requested a refund",
        "He applied for a job at BrightMetrics",
        "He reported a technical problem"
      ],
      "choicesKo": [
        "플랫폼의 사용자로 등록되어서",
        "환불을 요청해서",
        "브라이트메트릭스에 입사 지원해서",
        "기술적 문제를 신고해서"
      ],
      "answerIndex": 0,
      "explanation": "'Your company has added you as a user'라고 하며 시작을 돕는 안내이므로 사용자로 등록되어 받은 이메일입니다. 따라서 정답은 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-27-q2",
      "prompt": "What happens if the account is not activated within seven days?",
      "promptKo": "7일 이내에 계정을 활성화하지 않으면 어떻게 되는가?",
      "choices": [
        "The account is charged a fee",
        "The support team calls the user",
        "The invitation link expires",
        "The data source is deleted"
      ],
      "choicesKo": [
        "계정에 요금이 청구된다",
        "지원팀이 사용자에게 전화한다",
        "초대 링크가 만료된다",
        "데이터 소스가 삭제된다"
      ],
      "answerIndex": 2,
      "explanation": "7일이 지나면 초대 링크가 만료되어 관리자가 다시 보내야 한다고 했습니다. 따라서 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-27-q3",
      "prompt": "What does the setup guide help users do?",
      "promptKo": "설정 가이드는 사용자가 무엇을 하도록 돕는가?",
      "choices": [
        "Reset their password",
        "Connect a data source",
        "Invite new team members",
        "Cancel their subscription"
      ],
      "choicesKo": [
        "비밀번호를 재설정한다",
        "데이터 소스를 연결한다",
        "새 팀원을 초대한다",
        "구독을 취소한다"
      ],
      "answerIndex": 1,
      "explanation": "설정 가이드는 '첫 데이터 소스를 연결하는 과정'을 안내한다고 했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-27-q4",
      "prompt": "When is the support team available?",
      "promptKo": "지원팀은 언제 이용할 수 있는가?",
      "choices": [
        "At all hours every day",
        "Only on weekends",
        "By email only",
        "On weekdays during business hours"
      ],
      "choicesKo": [
        "매일 24시간",
        "주말에만",
        "이메일로만",
        "평일 업무 시간에"
      ],
      "answerIndex": 3,
      "explanation": "지원팀은 평일 오전 9시부터 오후 6시까지 실시간 채팅으로 이용 가능하다고 했습니다. 따라서 정답은 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-27-q5",
      "prompt": "The word \"activate\" in the email is closest in meaning to",
      "promptKo": "이메일의 단어 \"activate\"와 의미가 가장 가까운 것은?",
      "choices": ["turn on", "postpone", "return", "measure"],
      "choicesKo": ["작동시키다", "연기하다", "반납하다", "측정하다"],
      "answerIndex": 0,
      "explanation": "'activate your account'는 계정을 '작동시키다·개시하다'라는 뜻이므로 'turn on'과 가장 가깝습니다. 따라서 정답은 (가)=0입니다.",
      "category": "동의어"
    },
    {
      "id": "p7-g-27-q6",
      "prompt": "What is suggested about BrightMetrics?",
      "promptKo": "브라이트메트릭스에 대해 무엇이 암시되는가?",
      "choices": [
        "It only serves large corporations",
        "It helps customers use data for decisions",
        "It is closing its support department",
        "It requires software to be mailed on a disc"
      ],
      "choicesKo": [
        "대기업만 상대한다",
        "고객이 데이터를 의사결정에 활용하도록 돕는다",
        "지원 부서를 폐쇄하고 있다",
        "소프트웨어를 디스크로 우편 발송해야 한다"
      ],
      "answerIndex": 1,
      "explanation": "마지막에 '데이터를 더 나은 의사결정으로 바꾸도록 돕겠다'고 했으므로 데이터 활용을 돕는 서비스임을 알 수 있습니다. 따라서 정답은 (나)=1입니다.",
      "category": "추론"
    }
  ]
}
```
