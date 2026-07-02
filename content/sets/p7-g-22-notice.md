# p7-g-22 — MEDIUM — Data Center Maintenance Notice (Notice)

```json
{
  "id": "p7-g-22",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Scheduled Maintenance of Analytics Servers",
      "ko": "공지: 분석 서버 예정 정비"
    },
    {
      "en": "Posted by the IT Infrastructure Team",
      "ko": "IT 인프라팀 게시"
    },
    {
      "en": "Please be advised that our data analytics servers will undergo scheduled maintenance this weekend.",
      "ko": "이번 주말에 데이터 분석 서버가 예정된 정비를 받을 예정임을 알려드립니다."
    },
    {
      "en": "The work will begin on Saturday, August 9, at 8:00 P.M. and is expected to finish by Sunday, August 10, at 6:00 A.M.",
      "ko": "작업은 8월 9일 토요일 오후 8시에 시작해 8월 10일 일요일 오전 6시까지 완료될 것으로 예상됩니다."
    },
    {
      "en": "During this window, the reporting portal and all automated dashboards will be unavailable.",
      "ko": "이 시간 동안 보고 포털과 모든 자동 대시보드는 이용할 수 없습니다."
    },
    {
      "en": "The purpose of the maintenance is to upgrade our storage hardware so that queries run faster and larger datasets can be handled.",
      "ko": "이번 정비의 목적은 저장 하드웨어를 업그레이드하여 쿼리가 더 빠르게 실행되고 더 큰 데이터셋을 처리할 수 있도록 하기 위함입니다."
    },
    {
      "en": "Employees who need to access reports urgently during the outage should download the files they require before Friday, August 8.",
      "ko": "중단 중에 급히 보고서에 접근해야 하는 직원은 8월 8일 금요일 전에 필요한 파일을 내려받아야 합니다."
    },
    {
      "en": "Any reports generated after the maintenance may look slightly different, as the new system uses updated chart templates.",
      "ko": "정비 이후 생성되는 보고서는 새 시스템이 갱신된 차트 서식을 사용하므로 약간 다르게 보일 수 있습니다."
    },
    {
      "en": "We appreciate your patience and apologize for any inconvenience this may cause.",
      "ko": "여러분의 양해에 감사드리며 이로 인한 불편에 사과드립니다."
    }
  ],
  "questions": [
    {
      "id": "p7-g-22-q1",
      "prompt": "What is the purpose of the notice?",
      "promptKo": "이 공지의 목적은 무엇인가?",
      "choices": [
        "To announce the launch of a new product",
        "To inform staff about a temporary server outage",
        "To request applications for an IT position",
        "To explain a change in company holidays"
      ],
      "choicesKo": [
        "새 제품의 출시를 알리려고",
        "직원들에게 일시적인 서버 중단을 알리려고",
        "IT 직책 지원을 요청하려고",
        "회사 휴일의 변경을 설명하려고"
      ],
      "answerIndex": 1,
      "explanation": "공지는 주말 서버 정비로 인한 일시적 중단을 직원들에게 알리고 있습니다. 따라서 정답은 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-22-q2",
      "prompt": "What is the goal of the maintenance work?",
      "promptKo": "정비 작업의 목표는 무엇인가?",
      "choices": [
        "To reduce the number of servers",
        "To train new IT employees",
        "To change the office network password",
        "To upgrade storage for faster performance"
      ],
      "choicesKo": [
        "서버의 수를 줄이는 것",
        "신입 IT 직원을 교육하는 것",
        "사무실 네트워크 비밀번호를 변경하는 것",
        "더 빠른 성능을 위해 저장 장치를 업그레이드하는 것"
      ],
      "answerIndex": 3,
      "explanation": "'to upgrade our storage hardware so that queries run faster'라고 했으므로 더 빠른 성능을 위한 저장 장치 업그레이드가 목표입니다. 따라서 정답은 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-22-q3",
      "prompt": "What should employees do before Friday, August 8?",
      "promptKo": "직원들은 8월 8일 금요일 전에 무엇을 해야 하는가?",
      "choices": [
        "Download any reports they will need",
        "Reset their portal passwords",
        "Submit a request for new hardware",
        "Attend a training session"
      ],
      "choicesKo": [
        "필요한 보고서를 내려받는다",
        "포털 비밀번호를 재설정한다",
        "새 하드웨어 요청서를 제출한다",
        "교육 세션에 참석한다"
      ],
      "answerIndex": 0,
      "explanation": "중단 중 급히 보고서가 필요한 직원은 8월 8일 전에 필요한 파일을 내려받아야 한다고 했습니다. 따라서 정답은 (가)=0입니다.",
      "category": "사실확인"
    },
    {
      "id": "p7-g-22-q4",
      "prompt": "What is suggested about reports created after the maintenance?",
      "promptKo": "정비 이후 생성되는 보고서에 대해 무엇이 암시되는가?",
      "choices": [
        "They will no longer be available online",
        "They will be sent only to managers",
        "Their appearance may change",
        "They will take longer to load"
      ],
      "choicesKo": [
        "더 이상 온라인에서 이용할 수 없을 것이다",
        "관리자에게만 전송될 것이다",
        "그 외관이 바뀔 수 있다",
        "불러오는 데 더 오래 걸릴 것이다"
      ],
      "answerIndex": 2,
      "explanation": "정비 이후 보고서가 새 차트 서식을 사용해 약간 다르게 보일 수 있다고 했으므로 외관이 바뀔 수 있음을 알 수 있습니다. 따라서 정답은 (다)=2입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-22-q5",
      "prompt": "The word \"handled\" in the fifth paragraph is closest in meaning to",
      "promptKo": "다섯 번째 단락의 단어 \"handled\"와 의미가 가장 가까운 것은?",
      "choices": [
        "touched",
        "delivered",
        "processed",
        "purchased"
      ],
      "choicesKo": [
        "만져지는",
        "배달되는",
        "처리되는",
        "구매되는"
      ],
      "answerIndex": 2,
      "explanation": "'larger datasets can be handled'는 더 큰 데이터셋이 처리될 수 있다는 의미이므로 'processed(처리되는)'와 가장 가깝습니다. 따라서 정답은 (다)=2입니다.",
      "category": "동의어"
    }
  ]
}
```
