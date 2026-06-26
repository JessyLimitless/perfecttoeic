# Data Pull Request Process Memo

```json
{
  "id": "set-medium-workflow",
  "difficulty": "MEDIUM",
  "passageType": "Memo",
  "passageLines": [
    {
      "en": "To: All Analytics Teams",
      "ko": "수신: 전체 분석팀"
    },
    {
      "en": "Subject: New Process for Requesting Data Pulls",
      "ko": "제목: 데이터 추출 요청을 위한 새 절차"
    },
    {
      "en": "Starting next Monday, all requests for data pulls must be submitted through the standardized intake form on our internal portal.",
      "ko": "다음 주 월요일부터 모든 데이터 추출 요청은 사내 포털의 표준 접수 양식을 통해 제출해야 합니다."
    },
    {
      "en": "This form replaces the ad-hoc requests that have been sent directly to engineers through Slack, which often lacked the details needed to process them correctly.",
      "ko": "이 양식은 그동안 Slack을 통해 엔지니어에게 직접 보내지던 임시 요청을 대체하며, 그러한 요청은 정확한 처리에 필요한 세부 정보가 부족한 경우가 많았습니다."
    },
    {
      "en": "Please allow two business days for each request to be completed, and contact the data engineering lead only if a pull is genuinely urgent.",
      "ko": "각 요청이 완료되기까지 영업일 기준 이틀의 여유를 두시고, 추출이 정말로 긴급한 경우에만 데이터 엔지니어링 책임자에게 연락해 주십시오."
    }
  ],
  "questions": [
    {
      "id": "set-medium-workflow-q1",
      "prompt": "What is the main purpose of the memo?",
      "promptKo": "이 메모의 주된 목적은 무엇인가?",
      "choices": [
        "To report the results of a recent data analysis",
        "To introduce a newly hired data engineering lead",
        "To announce a new procedure for requesting data pulls",
        "To schedule a training session on Slack usage"
      ],
      "choicesKo": [
        "최근 데이터 분석 결과를 보고하기 위해",
        "새로 채용된 데이터 엔지니어링 책임자를 소개하기 위해",
        "데이터 추출 요청을 위한 새 절차를 알리기 위해",
        "Slack 사용에 관한 교육 일정을 잡기 위해"
      ],
      "answerIndex": 2,
      "explanation": "제목과 본문에서 데이터 추출 요청을 표준 접수 양식으로 제출하는 새 절차를 도입한다고 명시하므로 정답은 0번입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-workflow-q2",
      "prompt": "How long should employees expect a data pull to take?",
      "promptKo": "직원들은 데이터 추출에 얼마의 시간이 걸릴 것으로 예상해야 하는가?",
      "choices": [
        "Two business days",
        "One business day",
        "One full week",
        "Until the next Monday"
      ],
      "choicesKo": [
        "영업일 2일",
        "영업일 1일",
        "꼬박 일주일",
        "다음 주 월요일까지"
      ],
      "answerIndex": 0,
      "explanation": "마지막 문장에서 각 요청 완료에 영업일 기준 이틀의 여유를 두라고 했으므로 정답은 1번입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-workflow-q3",
      "prompt": "What is implied about the previous way of requesting data?",
      "promptKo": "이전의 데이터 요청 방식에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It was faster than the new form-based process",
        "It was only available to senior analysts",
        "It required approval from the company president",
        "It sometimes caused requests to be incomplete or unclear"
      ],
      "choicesKo": [
        "새 양식 기반 절차보다 더 빨랐다",
        "선임 분석가에게만 허용되었다",
        "회사 사장의 승인이 필요했다",
        "때때로 요청이 불완전하거나 불명확하게 되는 원인이 되었다"
      ],
      "answerIndex": 3,
      "explanation": "Slack을 통한 임시 요청이 정확한 처리에 필요한 세부 정보가 부족한 경우가 많았다고 했으므로, 요청이 불완전했음을 추론할 수 있어 정답은 2번입니다.",
      "category": "추론"
    }
  ]
}
```
