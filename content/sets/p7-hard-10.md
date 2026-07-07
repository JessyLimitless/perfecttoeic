# p7-hard-10 — Part 7 Double Passage · Email + Schedule (HARD)

```json
{
  "id": "p7-hard-10",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Double Passage",
  "passageLines": [
    {
      "en": "[Passage 1 — Email]",
      "ko": "[지문 1 — 이메일]"
    },
    {
      "en": "To: Autumn Skills Series registrants",
      "ko": "수신: 가을 역량 시리즈 등록자"
    },
    {
      "en": "From: Elena Park, Learning & Development",
      "ko": "발신: 학습·개발팀 엘레나 박"
    },
    {
      "en": "Subject: Your Enrollment — Please Read",
      "ko": "제목: 귀하의 등록 안내 — 반드시 읽어 주세요"
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "Thank you for enrolling in the Autumn Skills Series. Each participant may attend up to two sessions.",
      "ko": "가을 역량 시리즈에 등록해 주셔서 감사합니다. 참가자는 최대 두 개의 세션에 참석할 수 있습니다."
    },
    {
      "en": "Please note that the Negotiation Skills workshop has been moved from Room B to the larger Room D owing to strong demand.",
      "ko": "협상 기술 워크숍은 수요가 많아 B실에서 더 큰 D실로 옮겨졌음을 알려 드립니다."
    },
    {
      "en": "Any session marked \"Advanced\" requires prior completion of the matching introductory course; if you have not taken it, please select a different session.",
      "ko": "\"고급\"으로 표시된 세션은 해당 입문 과정의 사전 이수가 필요합니다. 이수하지 않았다면 다른 세션을 선택해 주십시오."
    },
    {
      "en": "Lunch is provided only for full-day tracks; half-day sessions include a coffee break only.",
      "ko": "점심은 종일 과정에만 제공되며, 반일 세션은 커피 브레이크만 포함합니다."
    },
    {
      "en": "To change your selections, reply to this message by October 5.",
      "ko": "선택을 변경하시려면 10월 5일까지 이 메시지에 회신해 주십시오."
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "[Passage 2 — Schedule]",
      "ko": "[지문 2 — 일정표]"
    },
    {
      "en": "Autumn Skills Series — Innovation Wing",
      "ko": "가을 역량 시리즈 — 이노베이션 윙"
    },
    {
      "en": "Data Storytelling | Oct 12 | 9:00 A.M.–12:00 P.M. | Room A | Intro",
      "ko": "데이터 스토리텔링 | 10월 12일 | 오전 9:00–오후 12:00 | A실 | 입문"
    },
    {
      "en": "Negotiation Skills | Oct 12 | 1:00 P.M.–4:00 P.M. | Room D | Intro",
      "ko": "협상 기술 | 10월 12일 | 오후 1:00–4:00 | D실 | 입문"
    },
    {
      "en": "Project Leadership | Oct 13 | 9:00 A.M.–4:00 P.M. | Room C | Advanced",
      "ko": "프로젝트 리더십 | 10월 13일 | 오전 9:00–오후 4:00 | C실 | 고급"
    },
    {
      "en": "Public Speaking | Oct 13 | 1:00 P.M.–4:00 P.M. | Room B | Intro",
      "ko": "대중 연설 | 10월 13일 | 오후 1:00–4:00 | B실 | 입문"
    }
  ],
  "questions": [
    {
      "id": "p7-hard-10-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To cancel the workshop series",
        "To confirm enrollment and explain session details",
        "To request payment for the sessions",
        "To announce a change of instructor"
      ],
      "choicesKo": [
        "워크숍 시리즈를 취소하기 위해",
        "등록을 확인하고 세션 세부사항을 설명하기 위해",
        "세션 비용 결제를 요청하기 위해",
        "강사 변경을 알리기 위해"
      ],
      "answerIndex": 1,
      "explanation": "이메일은 등록에 감사하며 참석 한도, 장소 변경, 고급 과정 요건, 점심 제공, 변경 마감 등 세션 세부사항을 안내합니다. 취소·결제·강사 변경이 아닙니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-hard-10-q2",
      "prompt": "In the schedule, which session reflects the room change mentioned in the email?",
      "promptKo": "일정표에서 이메일에 언급된 장소 변경이 반영된 세션은 무엇인가?",
      "choices": [
        "Data Storytelling",
        "Project Leadership",
        "Negotiation Skills",
        "Public Speaking"
      ],
      "choicesKo": [
        "데이터 스토리텔링",
        "프로젝트 리더십",
        "협상 기술",
        "대중 연설"
      ],
      "answerIndex": 2,
      "explanation": "이메일은 협상 기술 워크숍이 D실로 옮겨졌다고 했고, 일정표에서 협상 기술이 D실에 배정되어 있습니다. 두 지문을 연결하면 협상 기술이 답입니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-10-q3",
      "prompt": "Which session could a participant who has taken no introductory course NOT attend?",
      "promptKo": "입문 과정을 전혀 이수하지 않은 참가자가 참석할 수 없는 세션은 무엇인가?",
      "choices": [
        "Data Storytelling",
        "Negotiation Skills",
        "Public Speaking",
        "Project Leadership"
      ],
      "choicesKo": [
        "데이터 스토리텔링",
        "협상 기술",
        "대중 연설",
        "프로젝트 리더십"
      ],
      "answerIndex": 3,
      "explanation": "이메일에 따르면 '고급' 세션은 입문 과정 이수가 필요하고, 일정표에서 프로젝트 리더십이 유일한 고급 세션입니다. 따라서 입문 미이수자는 프로젝트 리더십에 참석할 수 없습니다. (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-10-q4",
      "prompt": "What can be inferred about the Project Leadership session?",
      "promptKo": "프로젝트 리더십 세션에 대해 추론할 수 있는 것은?",
      "choices": [
        "It includes a provided lunch.",
        "It is limited to ten participants.",
        "It was moved to a smaller room.",
        "It has been rescheduled to October 12."
      ],
      "choicesKo": [
        "제공되는 점심이 포함된다.",
        "참가자가 10명으로 제한된다.",
        "더 작은 방으로 옮겨졌다.",
        "10월 12일로 일정이 변경되었다."
      ],
      "answerIndex": 0,
      "explanation": "점심은 종일 과정에만 제공되며, 일정표에서 프로젝트 리더십만 오전 9시–오후 4시의 종일 세션입니다. 두 지문을 결합하면 이 세션은 점심이 제공된다고 추론됩니다. 따라서 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "p7-hard-10-q5",
      "prompt": "By when must registrants reply to change their selections?",
      "promptKo": "등록자는 선택을 변경하려면 언제까지 회신해야 하는가?",
      "choices": [
        "October 12",
        "October 5",
        "October 13",
        "The first day of the series"
      ],
      "choicesKo": [
        "10월 12일",
        "10월 5일",
        "10월 13일",
        "시리즈 첫날"
      ],
      "answerIndex": 1,
      "explanation": "이메일 마지막에 선택 변경은 10월 5일까지 회신하라고 명시되어 있습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    }
  ]
}
```
