# Set 1 — EASY — Office Wi-Fi Upgrade Notice (Email)

```json
{
  "id": "set-easy-wifi",
  "difficulty": "EASY",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Office Wi-Fi Upgrade This Thursday",
      "ko": "제목: 이번 주 목요일 사무실 와이파이 업그레이드"
    },
    {
      "en": "Dear all, this is a quick note from the IT team about our office network.",
      "ko": "안녕하세요, IT팀에서 사무실 네트워크에 관해 간단히 안내드립니다."
    },
    {
      "en": "Our office Wi-Fi network will be upgraded this Thursday, June 5, from 7:00 P.M. to 10:00 P.M.",
      "ko": "사무실 와이파이 네트워크가 6월 5일 목요일 오후 7시부터 10시까지 업그레이드됩니다."
    },
    {
      "en": "We are doing this upgrade to make the internet faster and more reliable for everyone.",
      "ko": "이번 업그레이드는 모두를 위해 인터넷을 더 빠르고 안정적으로 만들기 위한 것입니다."
    },
    {
      "en": "During this time, internet access will be unavailable on all floors.",
      "ko": "이 시간 동안에는 전 층에서 인터넷을 사용할 수 없습니다."
    },
    {
      "en": "Email, video calls, and our online data tools will not work while the work is being done.",
      "ko": "작업이 진행되는 동안 이메일, 화상 통화, 온라인 데이터 도구는 작동하지 않습니다."
    },
    {
      "en": "We recommend saving your work and logging off before you leave for the day.",
      "ko": "퇴근 전에 작업을 저장하고 로그오프해 두시길 권장합니다."
    },
    {
      "en": "If you need internet during the upgrade, please use the first-floor meeting rooms, which are on a separate network.",
      "ko": "업그레이드 중 인터넷이 필요하면, 별도 네트워크를 쓰는 1층 회의실을 이용해 주세요."
    },
    {
      "en": "We expect the new system to be ready by Friday morning when you arrive at work.",
      "ko": "새 시스템은 금요일 아침 출근 시간까지 준비될 것으로 예상됩니다."
    },
    {
      "en": "After the upgrade, you may need to connect to the Wi-Fi again with your usual password.",
      "ko": "업그레이드 후에는 평소 비밀번호로 와이파이에 다시 연결해야 할 수 있습니다."
    },
    {
      "en": "If your connection still does not work on Friday, please contact the IT help desk at extension 200.",
      "ko": "금요일에도 연결이 되지 않으면 내선 200번으로 IT 헬프데스크에 연락해 주세요."
    },
    {
      "en": "Thank you for your patience while we improve the network.",
      "ko": "네트워크를 개선하는 동안 양해해 주셔서 감사합니다."
    }
  ],
  "questions": [
    {
      "id": "set-easy-wifi-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이 이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To introduce a new IT manager",
        "To announce a Wi-Fi upgrade",
        "To ask staff to change their passwords",
        "To report a broken computer"
      ],
      "choicesKo": [
        "새 IT 매니저를 소개하려고",
        "와이파이 업그레이드를 알리려고",
        "직원에게 비밀번호 변경을 요청하려고",
        "고장 난 컴퓨터를 신고하려고"
      ],
      "answerIndex": 1,
      "explanation": "제목과 셋째 문장에서 '사무실 와이파이 네트워크가 업그레이드된다'고 알리고 있으므로, 이메일의 목적은 와이파이 업그레이드를 알리는 것입니다. 따라서 정답은 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-easy-wifi-q2",
      "prompt": "What can employees use if they need internet during the upgrade?",
      "promptKo": "업그레이드 중 인터넷이 필요하면 직원들은 무엇을 이용할 수 있는가?",
      "choices": [
        "Their home internet",
        "A mobile hotspot from IT",
        "The first-floor meeting rooms",
        "The cafeteria computers"
      ],
      "choicesKo": [
        "집 인터넷",
        "IT팀의 모바일 핫스팟",
        "1층 회의실",
        "구내식당 컴퓨터"
      ],
      "answerIndex": 2,
      "explanation": "본문에서 '인터넷이 필요하면 별도 네트워크를 쓰는 1층 회의실을 이용하라'고 했으므로 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-wifi-q3",
      "prompt": "When will the new system most likely be ready?",
      "promptKo": "새 시스템은 언제 준비될 가능성이 가장 큰가?",
      "choices": [
        "By Friday morning",
        "By Saturday evening",
        "By Thursday noon",
        "By Monday afternoon"
      ],
      "choicesKo": [
        "금요일 아침까지",
        "토요일 저녁까지",
        "목요일 정오까지",
        "월요일 오후까지"
      ],
      "answerIndex": 0,
      "explanation": "본문에서 '새 시스템은 금요일 아침 출근 시간까지 준비될 것으로 예상된다'고 했으므로, 금요일 아침까지 준비될 것임을 알 수 있습니다. 따라서 정답은 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "set-easy-wifi-q4",
      "prompt": "In the email, the word \"reliable\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"reliable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "expensive",
        "colorful",
        "unstable",
        "dependable"
      ],
      "choicesKo": [
        "비싼",
        "다채로운",
        "불안정한",
        "믿을 수 있는"
      ],
      "answerIndex": 3,
      "explanation": "'reliable'은 '안정적이고 믿을 수 있는'이라는 뜻으로 'dependable(믿을 수 있는)'과 의미가 가장 가깝습니다. 'unstable(불안정한)'은 반대 의미이므로 오답입니다. 따라서 정답은 (라)=3입니다.",
      "category": "동의어"
    }
  ]
}
```
