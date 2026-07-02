# p7-g-15 — MEDIUM — Data Center Maintenance Notice (Notice)

```json
{
  "id": "p7-g-15",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Scheduled Maintenance of the Analytics Servers",
      "ko": "공지: 분석 서버 정기 점검"
    },
    {
      "en": "The Information Technology team will perform major maintenance on our analytics servers this coming weekend.",
      "ko": "정보기술팀이 이번 주말에 분석 서버에 대한 대규모 점검을 실시할 예정입니다."
    },
    {
      "en": "The work will begin at 10:00 P.M. on Saturday and is expected to finish by 6:00 A.M. on Sunday.",
      "ko": "작업은 토요일 오후 10시에 시작하여 일요일 오전 6시까지 완료될 예정입니다."
    },
    {
      "en": "During this period, all dashboards, automated reports, and data uploads will be unavailable.",
      "ko": "이 기간 동안 모든 대시보드, 자동 보고서, 데이터 업로드를 이용할 수 없습니다."
    },
    {
      "en": "The purpose of the maintenance is to install additional storage so that the servers can handle larger data sets in the future.",
      "ko": "이번 점검의 목적은 서버가 향후 더 큰 데이터 세트를 처리할 수 있도록 추가 저장 공간을 설치하는 것입니다."
    },
    {
      "en": "Employees who need to run urgent reports should do so before Saturday evening and save a copy to their own computers.",
      "ko": "긴급 보고서를 실행해야 하는 직원은 토요일 저녁 이전에 이를 처리하고 자신의 컴퓨터에 사본을 저장해야 합니다."
    },
    {
      "en": "Please note that any report scheduled to run automatically during the maintenance window will not be produced.",
      "ko": "점검 시간대에 자동으로 실행되도록 예약된 보고서는 생성되지 않는다는 점에 유의하십시오."
    },
    {
      "en": "These reports will need to be started again manually once service is restored on Sunday morning.",
      "ko": "이러한 보고서는 일요일 아침에 서비스가 복구되면 수동으로 다시 시작해야 합니다."
    },
    {
      "en": "If the servers are not fully operational by 8:00 A.M. on Sunday, an update will be posted on the company message board.",
      "ko": "일요일 오전 8시까지 서버가 완전히 작동하지 않으면 회사 게시판에 업데이트가 게시될 것입니다."
    },
    {
      "en": "We appreciate your patience and apologize for any inconvenience this may cause.",
      "ko": "여러분의 양해에 감사드리며 이로 인한 불편에 대해 사과드립니다."
    }
  ],
  "questions": [
    {
      "id": "p7-g-15-q1",
      "prompt": "When is the maintenance scheduled to finish?",
      "promptKo": "점검은 언제 완료될 예정인가?",
      "choices": [
        "At 10:00 P.M. on Saturday",
        "At 8:00 A.M. on Sunday",
        "At noon on Sunday",
        "At 6:00 A.M. on Sunday"
      ],
      "choicesKo": [
        "토요일 오후 10시",
        "일요일 오전 8시",
        "일요일 정오",
        "일요일 오전 6시"
      ],
      "answerIndex": 3,
      "explanation": "작업은 토요일 오후 10시에 시작해 'finish by 6:00 A.M. on Sunday'라고 했습니다. 따라서 정답은 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-15-q2",
      "prompt": "Why is the maintenance being performed?",
      "promptKo": "점검은 왜 실시되는가?",
      "choices": [
        "To repair damaged customer records",
        "To move the servers to a new building",
        "To add storage for larger data sets",
        "To replace outdated dashboards with new ones"
      ],
      "choicesKo": [
        "손상된 고객 기록을 복구하기 위해",
        "서버를 새 건물로 옮기기 위해",
        "더 큰 데이터 세트를 위한 저장 공간을 추가하기 위해",
        "구식 대시보드를 새것으로 교체하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "점검 목적은 'to install additional storage so that the servers can handle larger data sets'라고 명시되어 있습니다. 따라서 정답은 (다)=2입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-15-q3",
      "prompt": "What are employees advised to do before Saturday evening?",
      "promptKo": "직원들은 토요일 저녁 이전에 무엇을 하도록 권고받는가?",
      "choices": [
        "Run urgent reports and save a local copy",
        "Turn off their office computers",
        "Submit a request to the IT team",
        "Attend a training on the new storage"
      ],
      "choicesKo": [
        "긴급 보고서를 실행하고 로컬 사본을 저장한다",
        "사무실 컴퓨터를 끈다",
        "IT팀에 요청서를 제출한다",
        "새 저장 장치에 대한 교육에 참석한다"
      ],
      "answerIndex": 0,
      "explanation": "긴급 보고서가 필요한 직원은 'do so before Saturday evening and save a copy to their own computers'라고 안내합니다. 따라서 정답은 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-15-q4",
      "prompt": "What is implied about reports scheduled to run automatically during the maintenance?",
      "promptKo": "점검 중 자동 실행되도록 예약된 보고서에 대해 무엇이 암시되는가?",
      "choices": [
        "They will be emailed to managers instead",
        "They will have to be run again by hand later",
        "They will be produced twice as fast",
        "They will be deleted permanently"
      ],
      "choicesKo": [
        "대신 관리자에게 이메일로 전송된다",
        "나중에 수동으로 다시 실행해야 한다",
        "두 배 빠르게 생성된다",
        "영구적으로 삭제된다"
      ],
      "answerIndex": 1,
      "explanation": "자동 예약 보고서는 생성되지 않으며 'need to be started again manually once service is restored'라고 했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-15-q5",
      "prompt": "The word \"restored\" in the eighth paragraph is closest in meaning to",
      "promptKo": "여덟 번째 단락의 단어 \"restored\"와 의미가 가장 가까운 것은?",
      "choices": [
        "canceled",
        "delayed",
        "brought back",
        "expanded"
      ],
      "choicesKo": [
        "취소된",
        "지연된",
        "복구된",
        "확장된"
      ],
      "answerIndex": 2,
      "explanation": "'service is restored'는 서비스가 다시 정상화된다는 뜻이므로 'brought back(복구된)'과 가장 가깝습니다. 따라서 정답은 (다)=2입니다.",
      "category": "동의어"
    }
  ]
}
```
