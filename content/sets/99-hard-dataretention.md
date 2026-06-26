# Set 99 — HARD — Data Retention & Deletion Policy (Email)

```json
{
  "id": "set-hard-dataretention",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "To: All Data Platform Engineers",
      "ko": "수신: 전체 데이터 플랫폼 엔지니어"
    },
    {
      "en": "From: Naomi Okafor, Head of Data Governance",
      "ko": "발신: 데이터 거버넌스 책임자 나오미 오카포"
    },
    {
      "en": "Subject: Rollout of the Revised Data Retention and Deletion Policy",
      "ko": "제목: 개정된 데이터 보존 및 삭제 정책의 시행"
    },
    {
      "en": "I am writing to inform you that the updated data retention and deletion policy will take effect on the fifteenth of this month, replacing the guidelines issued two years ago.",
      "ko": "이번 달 15일부터 개정된 데이터 보존 및 삭제 정책이 시행되어 2년 전 발행된 지침을 대체함을 알려드리고자 합니다."
    },
    {
      "en": "The central change is that raw event logs will now be retained for ninety days rather than the full year permitted under the previous standard.",
      "ko": "핵심 변경 사항은 원시 이벤트 로그가 이전 기준에서 허용된 1년이 아니라 이제 90일 동안 보존된다는 점입니다."
    },
    {
      "en": "After that window, the logs will be irreversibly purged unless a specific dataset has been placed under a legal hold by the compliance office.",
      "ko": "그 기간이 지나면 컴플라이언스 사무국이 특정 데이터셋에 법적 보존 조치를 적용하지 않는 한 로그는 되돌릴 수 없게 영구 삭제됩니다."
    },
    {
      "en": "Aggregated metrics, which contain no personally identifiable information, may continue to be stored indefinitely for trend analysis.",
      "ko": "개인 식별 정보가 포함되지 않은 집계 지표는 추세 분석을 위해 무기한 계속 저장될 수 있습니다."
    },
    {
      "en": "When a customer submits a deletion request, your pipelines must remove the relevant records within thirty days and confirm completion through the governance tracking tool.",
      "ko": "고객이 삭제 요청을 제출하면, 여러분의 파이프라인은 관련 레코드를 30일 이내에 제거하고 거버넌스 추적 도구를 통해 완료를 확인해야 합니다."
    },
    {
      "en": "Please be aware that simply deleting a row from the primary database is no longer sufficient; copies residing in backups and downstream caches must also be accounted for.",
      "ko": "기본 데이터베이스에서 행을 삭제하는 것만으로는 더 이상 충분하지 않으며, 백업과 다운스트림 캐시에 남아 있는 사본도 반드시 처리되어야 함에 유의하십시오."
    },
    {
      "en": "To support this, the platform team has built an automated job that scans secondary stores and flags any lingering copies for review.",
      "ko": "이를 지원하기 위해 플랫폼 팀은 보조 저장소를 검사하여 남아 있는 사본을 검토 대상으로 표시하는 자동화 작업을 구축했습니다."
    },
    {
      "en": "I will host a walkthrough session next Thursday, and attendance is mandatory for anyone who owns a data pipeline.",
      "ko": "저는 다음 주 목요일에 설명 세션을 진행할 예정이며, 데이터 파이프라인을 담당하는 사람은 누구나 반드시 참석해야 합니다."
    },
    {
      "en": "Please direct any clarifying questions to the governance channel before the session so that I can address them in advance.",
      "ko": "세션 전에 거버넌스 채널로 궁금한 점을 보내주시면 미리 답변드리겠습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-dataretention-q1",
      "prompt": "Why did Naomi Okafor send this email?",
      "promptKo": "나오미 오카포는 왜 이 이메일을 보냈는가?",
      "choices": [
        "To announce the rollout of a revised data retention and deletion policy",
        "To recruit new engineers for the data governance team",
        "To report a security breach in the event-logging system",
        "To cancel an upcoming walkthrough session"
      ],
      "choicesKo": [
        "개정된 데이터 보존 및 삭제 정책의 시행을 알리기 위해",
        "데이터 거버넌스 팀의 신규 엔지니어를 채용하기 위해",
        "이벤트 로깅 시스템의 보안 침해를 보고하기 위해",
        "예정된 설명 세션을 취소하기 위해"
      ],
      "answerIndex": 0,
      "explanation": "제목과 첫 문장에서 개정된 데이터 보존 및 삭제 정책의 시행을 알리고 있으므로 (가)가 정답이다. 채용, 보안 침해, 세션 취소는 언급되지 않았다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-dataretention-q2",
      "prompt": "How long must pipelines take to remove records after a customer deletion request?",
      "promptKo": "고객 삭제 요청 후 파이프라인은 레코드를 얼마 이내에 제거해야 하는가?",
      "choices": [
        "Within ninety days",
        "Within one year",
        "Within thirty days",
        "Within fifteen days"
      ],
      "choicesKo": [
        "90일 이내",
        "1년 이내",
        "30일 이내",
        "15일 이내"
      ],
      "answerIndex": 2,
      "explanation": "본문에서 고객이 삭제 요청을 제출하면 관련 레코드를 '30일 이내에' 제거해야 한다고 명시하므로 (다)가 정답이다. 90일은 로그 보존 기간이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-dataretention-q3",
      "prompt": "What can be inferred about aggregated metrics under the new policy?",
      "promptKo": "새 정책에서 집계 지표에 대해 추론할 수 있는 것은?",
      "choices": [
        "They must be deleted within ninety days like raw logs",
        "They are treated more leniently because they lack personal data",
        "They are subject to the same legal hold as event logs",
        "They can no longer be used for trend analysis"
      ],
      "choicesKo": [
        "원시 로그처럼 90일 이내에 삭제되어야 한다",
        "개인 정보가 없어 더 관대하게 취급된다",
        "이벤트 로그와 동일한 법적 보존 조치의 적용을 받는다",
        "더 이상 추세 분석에 사용될 수 없다"
      ],
      "answerIndex": 1,
      "explanation": "집계 지표는 개인 식별 정보가 없어 무기한 저장될 수 있다고 했으므로, 원시 로그보다 관대하게 취급된다고 추론할 수 있어 (나)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-dataretention-q4",
      "prompt": "The word \"lingering\" in the email is closest in meaning to",
      "promptKo": "이메일에서 단어 \"lingering\"과 의미가 가장 가까운 것은?",
      "choices": [
        "vanished",
        "encrypted",
        "duplicated",
        "remaining"
      ],
      "choicesKo": [
        "사라진",
        "암호화된",
        "복제된",
        "남아 있는"
      ],
      "answerIndex": 3,
      "explanation": "'lingering copies'는 삭제 후에도 보조 저장소에 여전히 남아 있는 사본을 뜻하므로 '남아 있는(remaining)'인 (라)가 가장 가깝다. (가) '사라진'은 반대 의미의 함정이다.",
      "category": "동의어"
    }
  ]
}
```
