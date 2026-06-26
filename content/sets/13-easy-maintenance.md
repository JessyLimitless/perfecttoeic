# Set 13 — EASY — Scheduled Maintenance (Notice)

```json
{
  "id": "set-easy-maintenance",
  "difficulty": "EASY",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Scheduled Analytics Server Maintenance",
      "ko": "공지: 분석 서버 정기 점검"
    },
    {
      "en": "Please be advised that our internal analytics servers will undergo scheduled maintenance on Saturday, June 27.",
      "ko": "내부 분석 서버가 6월 27일 토요일에 정기 점검을 진행할 예정임을 안내드립니다."
    },
    {
      "en": "The work will run from 10:00 P.M. to 2:00 A.M.",
      "ko": "작업은 오후 10시부터 새벽 2시까지 진행됩니다."
    },
    {
      "en": "During this four-hour window, all data dashboards and reporting tools will be unavailable.",
      "ko": "이 4시간 동안에는 모든 데이터 대시보드와 보고 도구를 사용할 수 없습니다."
    },
    {
      "en": "Email and the company chat tool will continue to work as usual.",
      "ko": "이메일과 회사 채팅 도구는 평소처럼 계속 사용할 수 있습니다."
    },
    {
      "en": "The purpose of the maintenance is to install a faster database and improve loading speed.",
      "ko": "이번 점검의 목적은 더 빠른 데이터베이스를 설치하고 로딩 속도를 개선하기 위함입니다."
    },
    {
      "en": "If you require any data for urgent tasks, please export it before the maintenance period begins.",
      "ko": "긴급한 업무에 필요한 데이터가 있다면 점검 시작 전에 미리 내보내시기 바랍니다."
    },
    {
      "en": "Any reports you save during the window may not be stored correctly.",
      "ko": "점검 시간 동안 저장하는 보고서는 올바르게 저장되지 않을 수 있습니다."
    },
    {
      "en": "The servers should be fully available again by 2:00 A.M. on Sunday.",
      "ko": "서버는 일요일 새벽 2시까지 다시 완전히 사용 가능해질 예정입니다."
    },
    {
      "en": "If the tools are still down after that time, please contact the IT team.",
      "ko": "그 시간 이후에도 도구를 사용할 수 없다면 IT 팀에 연락해 주십시오."
    },
    {
      "en": "We apologize for any inconvenience and thank you for your cooperation.",
      "ko": "불편을 끼쳐 드려 죄송하며 협조해 주셔서 감사합니다."
    }
  ],
  "questions": [
    {
      "id": "set-easy-maintenance-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇입니까?",
      "choices": [
        "To introduce a new member of the IT team",
        "To announce scheduled server maintenance",
        "To invite staff to a training session",
        "To report a problem with the office building"
      ],
      "choicesKo": [
        "IT 팀의 새 직원을 소개하기 위해",
        "예정된 서버 점검을 알리기 위해",
        "직원들을 교육 세션에 초대하기 위해",
        "사무실 건물 문제를 보고하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "공지의 제목과 본문이 분석 서버의 정기 점검 일정을 안내하므로 정답은 (나)입니다. 새 직원 소개, 교육 초대, 건물 문제는 언급되지 않았습니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-easy-maintenance-q2",
      "prompt": "What will be unavailable during the maintenance window?",
      "promptKo": "점검 시간 동안 무엇을 사용할 수 없습니까?",
      "choices": [
        "Data dashboards and reporting tools",
        "The company chat tool",
        "The company email system",
        "The employee payroll portal"
      ],
      "choicesKo": [
        "데이터 대시보드와 보고 도구",
        "회사 채팅 도구",
        "회사 이메일 시스템",
        "직원 급여 포털"
      ],
      "answerIndex": 0,
      "explanation": "공지에 \"all data dashboards and reporting tools will be unavailable\"라고 명시되어 있으므로 정답은 (가)입니다. 이메일과 채팅 도구는 평소처럼 사용할 수 있다고 했습니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-maintenance-q3",
      "prompt": "What can be inferred about saving a report during the maintenance window?",
      "promptKo": "점검 시간 동안 보고서를 저장하는 것에 관해 무엇을 추론할 수 있습니까?",
      "choices": [
        "The report will load faster than usual.",
        "The report will be emailed to the IT team.",
        "The report will be deleted after the maintenance.",
        "The report might not be stored correctly."
      ],
      "choicesKo": [
        "보고서가 평소보다 빠르게 로딩될 것이다.",
        "보고서가 IT 팀에 이메일로 전송될 것이다.",
        "보고서가 점검 후 삭제될 것이다.",
        "보고서가 올바르게 저장되지 않을 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "공지에 점검 시간 동안 저장하는 보고서가 올바르게 저장되지 않을 수 있다(may not be stored correctly)고 했으므로 정답은 (라)입니다. 따라서 그 시간에 저장을 피하는 것이 좋습니다.",
      "category": "추론"
    },
    {
      "id": "set-easy-maintenance-q4",
      "prompt": "In the notice, the word \"unavailable\" is closest in meaning to",
      "promptKo": "공지에서 단어 \"unavailable\"과 의미가 가장 가까운 것은",
      "choices": [
        "ready to use",
        "free of charge",
        "not able to be used",
        "easy to find"
      ],
      "choicesKo": [
        "사용할 준비가 된",
        "무료인",
        "사용할 수 없는",
        "찾기 쉬운"
      ],
      "answerIndex": 2,
      "explanation": "점검 동안 대시보드와 도구를 쓸 수 없다는 맥락이므로 'unavailable'은 '사용할 수 없는(not able to be used)'과 가장 가깝습니다. 따라서 정답은 (다)입니다. 'ready to use(사용할 준비가 된)'는 반대 의미입니다.",
      "category": "동의어"
    }
  ]
}
```
