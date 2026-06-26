# Set 5 — MEDIUM — Dashboard Migration to BrightCloud (Email)

```json
{
  "id": "set-medium-migration",
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "To: Data Analytics Team <analytics-team@nordavia.com>",
      "ko": "받는 사람: 데이터 분석팀 <analytics-team@nordavia.com>"
    },
    {
      "en": "From: Helena Park, Director of Analytics <h.park@nordavia.com>",
      "ko": "보내는 사람: 헬레나 박, 분석 부문 디렉터 <h.park@nordavia.com>"
    },
    {
      "en": "Subject: Migration of All Internal Dashboards to BrightCloud Reporting",
      "ko": "제목: 모든 내부 대시보드의 BrightCloud 리포팅으로의 마이그레이션"
    },
    {
      "en": "I am writing to let everyone know that we will be moving all of our internal dashboards to a new cloud reporting platform, BrightCloud, over the weekend of July 11–12.",
      "ko": "우리의 모든 내부 대시보드를 7월 11~12일 주말 동안 새로운 클라우드 리포팅 플랫폼인 BrightCloud로 이전할 예정임을 알려드리고자 이 메일을 씁니다."
    },
    {
      "en": "We decided to make this change because BrightCloud loads reports faster and allows several people to view the same dashboard at once.",
      "ko": "BrightCloud는 보고서를 더 빠르게 불러오고 여러 사람이 같은 대시보드를 동시에 볼 수 있게 해 주기 때문에 이 변경을 결정했습니다."
    },
    {
      "en": "Beginning Monday, July 13, every team member is required to use BrightCloud for all reporting, and the old system will remain available in read-only mode only during a short transition period.",
      "ko": "7월 13일 월요일부터 모든 팀원은 모든 리포팅에 BrightCloud를 사용해야 하며, 기존 시스템은 짧은 전환 기간 동안 읽기 전용 모드로만 유지됩니다."
    },
    {
      "en": "During the first week, the IT team will hold two short training sessions so that everyone can get used to the new tools.",
      "ko": "첫 주 동안 IT팀은 모두가 새 도구에 익숙해질 수 있도록 짧은 교육 세션을 두 차례 진행할 것입니다."
    },
    {
      "en": "Please note that the old read-only system will be permanently shut down on July 31, so be sure to download any historical files you still need before that date.",
      "ko": "기존의 읽기 전용 시스템은 7월 31일에 영구적으로 종료되므로, 그 날짜 이전에 아직 필요한 과거 파일들을 반드시 내려받아 주시기 바랍니다."
    },
    {
      "en": "Any reports that are not saved by then will no longer be accessible, and we will not be able to recover them.",
      "ko": "그때까지 저장되지 않은 보고서는 더 이상 접근할 수 없으며, 우리도 복구할 수 없습니다."
    },
    {
      "en": "Finally, anyone who runs custom scripts against the current dashboards must contact the IT team before the migration so that those scripts can be reconnected to the new platform without data loss.",
      "ko": "마지막으로, 현재 대시보드에 대해 커스텀 스크립트를 실행하는 분은 마이그레이션 전에 IT팀에 연락하여 해당 스크립트가 데이터 손실 없이 새 플랫폼에 다시 연결될 수 있도록 해야 합니다."
    },
    {
      "en": "If you are unsure whether your work depends on such scripts, please reach out and we will check it for you.",
      "ko": "본인의 업무가 그러한 스크립트에 의존하는지 확실하지 않다면, 연락 주시면 저희가 확인해 드리겠습니다."
    },
    {
      "en": "Thank you for your cooperation as we make this important upgrade.",
      "ko": "이 중요한 업그레이드를 진행하는 동안 협조해 주셔서 감사합니다."
    }
  ],
  "questions": [
    {
      "id": "set-medium-migration-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To request feedback on a recently released report",
        "To announce a move of internal dashboards to a new platform",
        "To schedule interviews for new analytics staff",
        "To explain a change in the company's data privacy policy"
      ],
      "choicesKo": [
        "최근 발표된 보고서에 대한 의견을 요청하려고",
        "내부 대시보드를 새 플랫폼으로 이전함을 알리려고",
        "신규 분석 인력 면접 일정을 잡으려고",
        "회사 데이터 개인정보 정책 변경을 설명하려고"
      ],
      "answerIndex": 1,
      "explanation": "본문에서 'we will be moving all of our internal dashboards to a new cloud reporting platform, BrightCloud'라고 명시하므로, 새 플랫폼으로의 대시보드 이전을 알리는 것이 주된 목적입니다. 따라서 정답은 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-migration-q2",
      "prompt": "When will the old read-only system be permanently shut down?",
      "promptKo": "기존의 읽기 전용 시스템은 언제 영구적으로 종료되는가?",
      "choices": [
        "On July 11",
        "On August 1",
        "On July 13",
        "On July 31"
      ],
      "choicesKo": [
        "7월 11일",
        "8월 1일",
        "7월 13일",
        "7월 31일"
      ],
      "answerIndex": 3,
      "explanation": "본문에 'the old read-only system will be permanently shut down on July 31'이라고 나와 있으므로 정답은 (라)=3입니다. 7월 11일은 마이그레이션 주말, 7월 13일은 새 플랫폼 의무 사용 시작일이므로 오답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-migration-q3",
      "prompt": "What is implied about reports that are not downloaded before July 31?",
      "promptKo": "7월 31일 이전에 내려받지 않은 보고서에 대해 암시되는 것은 무엇인가?",
      "choices": [
        "They will be moved to BrightCloud automatically",
        "They will be printed and stored by IT",
        "They will be permanently lost",
        "They will be emailed to each team member"
      ],
      "choicesKo": [
        "BrightCloud로 자동으로 옮겨진다",
        "IT팀이 인쇄해 보관한다",
        "영구적으로 사라진다",
        "각 팀원에게 이메일로 발송된다"
      ],
      "answerIndex": 2,
      "explanation": "본문에서 '그때까지 저장되지 않은 보고서는 더 이상 접근할 수 없으며 복구할 수 없다'고 했으므로, 7월 31일 전에 내려받지 않은 보고서는 영구적으로 사라짐을 추론할 수 있습니다. 따라서 정답은 (다)=2입니다.",
      "category": "추론"
    },
    {
      "id": "set-medium-migration-q4",
      "prompt": "In the email, the word \"transition\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"transition\"과 의미가 가장 가까운 것은?",
      "choices": [
        "changeover",
        "failure",
        "ending",
        "delay"
      ],
      "choicesKo": [
        "전환",
        "실패",
        "종료",
        "지연"
      ],
      "answerIndex": 0,
      "explanation": "'transition period'는 한 시스템에서 다른 시스템으로 바뀌는 '전환' 기간을 뜻하므로 'changeover(전환)'와 의미가 가장 가깝습니다. 'ending(종료)'은 전환이 아니라 끝남을 의미하므로 오답입니다. 따라서 정답은 (가)=0입니다.",
      "category": "동의어"
    }
  ]
}
```
