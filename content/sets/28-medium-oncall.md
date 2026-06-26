# Set 28 — MEDIUM — On-Call Rotation Update (Email)

```json
{
  "id": "set-medium-oncall",
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Updated On-Call Rotation for the Data Pipeline Team",
      "ko": "제목: 데이터 파이프라인 팀 온콜 순번 변경 안내"
    },
    {
      "en": "Hello everyone, I am writing to walk you through an important change to how our team handles on-call duty starting next month.",
      "ko": "안녕하세요 여러분, 다음 달부터 우리 팀이 온콜 업무를 처리하는 방식에 생기는 중요한 변경 사항을 안내드리고자 메일을 씁니다."
    },
    {
      "en": "Beginning Monday, July 6, the data pipeline team will move from a weekly on-call rotation to a two-week cycle, with each engineer covering one full block per quarter.",
      "ko": "7월 6일 월요일부터 데이터 파이프라인 팀은 주간 온콜 순번에서 2주 주기로 전환하며, 각 엔지니어는 분기당 한 블록 전체를 담당하게 됩니다."
    },
    {
      "en": "We made this change after several of you noted that one-week shifts ended just as you had finished learning the current set of open issues.",
      "ko": "여러분 중 몇 분이 1주 교대가 현재 미해결 이슈들을 막 파악했을 무렵에 끝나 버린다고 지적해 주신 뒤 이 변경을 결정했습니다."
    },
    {
      "en": "The longer block should give each on-call engineer more continuity and reduce the time lost handing context to the next person.",
      "ko": "더 긴 블록은 각 온콜 엔지니어에게 더 많은 연속성을 제공하고, 다음 담당자에게 맥락을 인계하느라 잃는 시간을 줄여 줄 것입니다."
    },
    {
      "en": "The complete schedule has been published on the team wiki, and calendar invitations covering the rest of the year will be sent to each engineer by Friday.",
      "ko": "전체 일정은 팀 위키에 게시되었으며, 올해 남은 기간을 포괄하는 캘린더 초대는 금요일까지 각 엔지니어에게 발송될 예정입니다."
    },
    {
      "en": "Please review your assigned blocks as soon as the invitations arrive and let me know right away if you spot a conflict with an approved leave.",
      "ko": "초대가 도착하는 대로 배정된 블록을 검토하시고, 승인된 휴가와 충돌하는 부분을 발견하면 즉시 알려 주시기 바랍니다."
    },
    {
      "en": "If you need to swap a shift, find a teammate willing to trade, then log the exchange in the #pipeline-oncall channel and tag your manager for confirmation at least 48 hours in advance.",
      "ko": "교대를 바꿔야 할 경우, 교환에 동의하는 동료를 찾은 뒤 #pipeline-oncall 채널에 교환 내용을 기록하고 최소 48시간 전에 매니저를 태그하여 확인을 받으시기 바랍니다."
    },
    {
      "en": "Swaps requested with less notice will only be approved for genuine emergencies, so please plan time off around your assigned blocks whenever possible.",
      "ko": "그보다 촉박하게 요청된 교대 변경은 실제 긴급 상황에 한해서만 승인되므로, 가능한 한 배정된 블록을 고려하여 휴가 일정을 잡아 주시기 바랍니다."
    },
    {
      "en": "During your block, please keep your phone reachable overnight and confirm that your alerting app is installed and signed in before your shift begins.",
      "ko": "담당 기간 동안에는 야간에도 전화를 받을 수 있도록 하고, 교대 시작 전에 알림 앱이 설치되어 있고 로그인되어 있는지 확인해 주시기 바랍니다."
    },
    {
      "en": "As always, a senior engineer remains available as a secondary contact if an incident grows beyond what one person can manage alone.",
      "ko": "늘 그렇듯, 한 사람이 혼자 감당하기 어려운 수준으로 사고가 커질 경우를 대비해 선임 엔지니어가 2차 연락 담당자로 대기합니다."
    },
    {
      "en": "Thank you for your flexibility as we adopt this new cycle; please reply to this email with any questions before Friday's invitations go out.",
      "ko": "이 새로운 주기를 도입하는 동안 보여 주시는 유연함에 감사드리며, 금요일에 초대가 발송되기 전에 궁금한 점이 있으면 이 이메일에 회신해 주시기 바랍니다."
    }
  ],
  "questions": [
    {
      "id": "set-medium-oncall-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이 이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To cancel all on-call duties for the quarter",
        "To recruit new engineers for the pipeline team",
        "To report an outage in the data pipeline",
        "To announce a change to the on-call rotation schedule"
      ],
      "choicesKo": [
        "이번 분기의 모든 온콜 업무를 취소하기 위해",
        "파이프라인 팀에 신규 엔지니어를 채용하기 위해",
        "데이터 파이프라인의 장애를 보고하기 위해",
        "온콜 순번 일정의 변경을 알리기 위해"
      ],
      "answerIndex": 3,
      "explanation": "제목과 본문에서 주간 순번을 2주 주기로 전환한다고 명시하므로 온콜 일정 변경 안내가 목적입니다. 정답은 (라)=3입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-oncall-q2",
      "prompt": "How far in advance must a shift swap normally be logged?",
      "promptKo": "교대 변경은 보통 몇 시간 전에 기록해야 하는가?",
      "choices": [
        "At least 24 hours",
        "At least one week",
        "At least 48 hours",
        "By the end of the quarter"
      ],
      "choicesKo": [
        "최소 24시간 전",
        "최소 일주일 전",
        "최소 48시간 전",
        "분기 말까지"
      ],
      "answerIndex": 2,
      "explanation": "본문에서 최소 48시간 전에 채널에 기록하고 매니저의 확인을 받으라고 명시합니다. 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-oncall-q3",
      "prompt": "What can be inferred about engineers planning vacation?",
      "promptKo": "휴가를 계획하는 엔지니어에 대해 추론할 수 있는 것은?",
      "choices": [
        "They should schedule time off without checking their on-call blocks",
        "They should arrange time off around their assigned on-call blocks",
        "They can take vacation only during emergencies",
        "They are no longer allowed to take vacation this year"
      ],
      "choicesKo": [
        "온콜 블록을 확인하지 않고 휴가를 잡아도 된다",
        "배정된 온콜 블록을 고려하여 휴가를 잡아야 한다",
        "긴급 상황에만 휴가를 쓸 수 있다",
        "올해는 더 이상 휴가를 쓸 수 없다"
      ],
      "answerIndex": 1,
      "explanation": "촉박한 교대 변경은 긴급 상황에만 승인되니 배정 블록을 고려해 휴가를 잡으라는 문장에서 추론할 수 있습니다. 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "set-medium-oncall-q4",
      "prompt": "In the email, the word \"reachable\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"reachable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "able to be contacted",
        "turned off",
        "expensive",
        "fully charged"
      ],
      "choicesKo": [
        "연락이 닿을 수 있는",
        "꺼져 있는",
        "비싼",
        "완전히 충전된"
      ],
      "answerIndex": 0,
      "explanation": "\"keep your phone reachable overnight\"는 야간에도 전화로 연락이 닿게 두라는 뜻이므로 \"able to be contacted(연락이 닿을 수 있는)\"와 의미가 가장 가깝습니다. 반대 의미인 \"turned off(꺼져 있는)\"는 오답입니다. 정답은 (가)=0입니다.",
      "category": "동의어"
    }
  ]
}
```
