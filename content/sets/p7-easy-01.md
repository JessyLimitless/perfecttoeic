# p7-easy-01 — Part 7 Notice (EASY)

```json
{
  "id": "p7-easy-01",
  "part": 7,
  "difficulty": "EASY",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: System Maintenance",
      "ko": "공지: 시스템 점검"
    },
    {
      "en": "",
      "ko": ""
    },
    {
      "en": "The data analytics dashboard will be unavailable on Saturday, July 12, from 8:00 A.M. to 12:00 P.M.",
      "ko": "데이터 분석 대시보드는 7월 12일 토요일 오전 8시부터 정오 12시까지 사용할 수 없습니다."
    },
    {
      "en": "During this time, our IT team will install a software update to improve loading speed.",
      "ko": "이 시간 동안 IT팀이 로딩 속도 개선을 위한 소프트웨어 업데이트를 설치합니다."
    },
    {
      "en": "Please save all your work before 8:00 A.M.",
      "ko": "오전 8시 전에 모든 작업을 저장해 주십시오."
    },
    {
      "en": "If you have questions, contact the help desk at extension 4500.",
      "ko": "문의 사항은 내선 4500번 헬프데스크로 연락 주십시오."
    }
  ],
  "questions": [
    {
      "id": "p7-easy-01-q1",
      "prompt": "What is the purpose of the notice?",
      "promptKo": "이 공지의 목적은 무엇인가?",
      "choices": [
        "To report a sales increase",
        "To advertise a new product",
        "To announce scheduled maintenance",
        "To request job applications"
      ],
      "choicesKo": [
        "매출 증가를 보고하기 위해",
        "신제품을 광고하기 위해",
        "예정된 점검을 알리기 위해",
        "입사 지원을 요청하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "공지 제목과 본문이 대시보드 점검 일정을 안내하므로 목적은 예정된 점검 공지입니다. 따라서 (다)=2입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-easy-01-q2",
      "prompt": "When will the dashboard be unavailable?",
      "promptKo": "대시보드는 언제 사용할 수 없는가?",
      "choices": [
        "On Monday afternoon",
        "On Saturday morning",
        "On Sunday evening",
        "On Friday night"
      ],
      "choicesKo": [
        "월요일 오후",
        "토요일 오전",
        "일요일 저녁",
        "금요일 밤"
      ],
      "answerIndex": 1,
      "explanation": "7월 12일 토요일 오전 8시부터 정오까지라고 명시되어 있으므로 토요일 오전입니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-easy-01-q3",
      "prompt": "Why is the update being installed?",
      "promptKo": "업데이트는 왜 설치되는가?",
      "choices": [
        "To change passwords",
        "To add new colors",
        "To reduce staff",
        "To improve loading speed"
      ],
      "choicesKo": [
        "비밀번호를 변경하기 위해",
        "새 색상을 추가하기 위해",
        "직원을 줄이기 위해",
        "로딩 속도를 개선하기 위해"
      ],
      "answerIndex": 3,
      "explanation": "본문에 'to improve loading speed'(로딩 속도 개선)라고 직접 명시되어 있습니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-easy-01-q4",
      "prompt": "What are readers asked to do before 8:00 A.M.?",
      "promptKo": "독자들은 오전 8시 전에 무엇을 하도록 요청받는가?",
      "choices": [
        "Save their work",
        "Call the manager",
        "Turn off the lights",
        "Submit a report"
      ],
      "choicesKo": [
        "작업을 저장한다",
        "매니저에게 전화한다",
        "전등을 끈다",
        "보고서를 제출한다"
      ],
      "answerIndex": 0,
      "explanation": "'Please save all your work before 8:00 A.M.'라고 했으므로 작업 저장이 요청됩니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    }
  ]
}
```
