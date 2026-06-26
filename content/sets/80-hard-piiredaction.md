# Set 80 — HARD — PII Redaction (Notice)

```json
{
  "id": "set-hard-piiredaction",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE TO ALL ENGINEERING TEAMS: New mandatory controls for personal data in application logs",
      "ko": "전체 엔지니어링 팀에 대한 공지: 애플리케이션 로그 내 개인정보에 대한 새로운 필수 통제"
    },
    {
      "en": "Effective the first of next month, the platform team will enforce automatic redaction of personally identifiable information, or PII, across every centralized log stream.",
      "ko": "다음 달 1일부터, 플랫폼 팀은 모든 중앙화된 로그 스트림 전반에서 개인 식별 정보, 즉 PII의 자동 편집(가림) 처리를 시행합니다."
    },
    {
      "en": "An internal review found that email addresses, phone numbers, and full names routinely appear in debug logs that are retained for ninety days and readable by hundreds of staff.",
      "ko": "내부 검토 결과, 이메일 주소, 전화번호, 그리고 전체 이름이 90일간 보관되고 수백 명의 직원이 읽을 수 있는 디버그 로그에 일상적으로 나타남이 드러났습니다."
    },
    {
      "en": "This exposure is not a hypothetical risk; under several data-protection regulations, a log that quietly stores customer data is itself a reportable processing of that data.",
      "ko": "이러한 노출은 가상의 위험이 아닙니다. 여러 데이터 보호 규정 하에서, 고객 데이터를 조용히 저장하는 로그는 그 자체로 보고 대상이 되는 데이터 처리에 해당합니다."
    },
    {
      "en": "The new control intercepts each log line as it is written and replaces any value matching a sensitive pattern with a fixed placeholder before the line is ever stored.",
      "ko": "새로운 통제는 각 로그 라인이 기록될 때 그것을 가로채어, 민감한 패턴과 일치하는 모든 값을 그 라인이 저장되기 전에 고정된 자리표시자로 대체합니다."
    },
    {
      "en": "Crucially, redaction happens at write time rather than at read time, so the raw value never lands on disk and cannot be recovered by anyone, including administrators.",
      "ko": "결정적으로, 편집은 읽기 시점이 아니라 쓰기 시점에 일어나므로, 원본 값은 결코 디스크에 도달하지 않으며 관리자를 포함한 누구도 그것을 복구할 수 없습니다."
    },
    {
      "en": "To preserve the ability to trace one user's activity across many log lines, each redacted identifier is replaced with a consistent token derived from the original through a one-way hash.",
      "ko": "한 사용자의 활동을 여러 로그 라인에 걸쳐 추적하는 능력을 보존하기 위해, 편집된 각 식별자는 일방향 해시를 통해 원본에서 도출된 일관된 토큰으로 대체됩니다."
    },
    {
      "en": "The same email will therefore always map to the same token, letting engineers correlate events without ever seeing the address itself.",
      "ko": "따라서 동일한 이메일은 항상 동일한 토큰으로 대응되어, 엔지니어가 주소 자체를 결코 보지 않고도 사건들을 연관 지을 수 있게 합니다."
    },
    {
      "en": "Teams must not attempt to disable the filter for convenience during debugging; an exemption requires written approval from the privacy office and a documented time limit.",
      "ko": "팀들은 디버깅 중 편의를 위해 이 필터를 비활성화하려 시도해서는 안 됩니다. 면제는 개인정보 보호 사무국의 서면 승인과 문서화된 기한을 요구합니다."
    },
    {
      "en": "Because pattern matching cannot catch everything, engineers remain responsible for not deliberately logging sensitive fields in the first place.",
      "ko": "패턴 매칭이 모든 것을 잡아낼 수는 없으므로, 엔지니어들은 애초에 민감한 필드를 의도적으로 기록하지 않을 책임을 여전히 집니다."
    },
    {
      "en": "Questions and exemption requests should be directed to the privacy office before the enforcement date, not after the filter begins blocking output.",
      "ko": "질문과 면제 요청은 필터가 출력을 차단하기 시작한 후가 아니라 시행일 이전에 개인정보 보호 사무국으로 전달되어야 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-piiredaction-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that all application logs will be deleted next month.",
        "To inform engineering teams that mandatory automatic redaction of PII in logs will begin and to explain how it works.",
        "To invite teams to design their own custom logging filters.",
        "To report that no personal data has ever appeared in the company's logs."
      ],
      "choicesKo": [
        "다음 달에 모든 애플리케이션 로그가 삭제될 것임을 알리기 위해",
        "엔지니어링 팀에 로그 내 PII의 필수 자동 편집이 시작됨을 알리고 그 작동 방식을 설명하기 위해",
        "팀들에게 자체 맞춤형 로깅 필터를 설계하도록 권하기 위해",
        "회사 로그에 개인 데이터가 한 번도 나타난 적 없음을 보고하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "공지는 필수 자동 PII 편집 시행과 그 작동 방식을 안내하므로 (나)가 정답입니다. 로그 삭제(가)나 무발생(라)은 본문과 모순됩니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-piiredaction-q2",
      "prompt": "According to the notice, why is a redacted identifier replaced with a consistent token rather than a generic placeholder?",
      "promptKo": "공지에 따르면, 편집된 식별자가 일반 자리표시자가 아니라 일관된 토큰으로 대체되는 이유는 무엇인가?",
      "choices": [
        "To allow administrators to recover the original value later.",
        "To make the logs shorter and cheaper to store.",
        "To satisfy a requirement that all tokens be randomly different each time.",
        "To let engineers correlate one user's events across log lines without seeing the real value."
      ],
      "choicesKo": [
        "관리자가 나중에 원본 값을 복구할 수 있도록 하기 위해",
        "로그를 더 짧고 저장 비용이 싸게 만들기 위해",
        "모든 토큰이 매번 무작위로 달라야 한다는 요구를 충족하기 위해",
        "엔지니어가 실제 값을 보지 않고도 한 사용자의 사건들을 로그 라인에 걸쳐 연관 지을 수 있도록 하기 위해"
      ],
      "answerIndex": 3,
      "explanation": "본문은 일관된 토큰 덕에 동일 이메일이 같은 토큰으로 대응되어 주소를 보지 않고도 사건을 연관 지을 수 있다고 했으므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-piiredaction-q3",
      "prompt": "What can be inferred from the fact that redaction happens at write time?",
      "promptKo": "편집이 쓰기 시점에 일어난다는 사실에서 무엇을 추론할 수 있는가?",
      "choices": [
        "Even an administrator with full access cannot recover the original PII from stored logs.",
        "Administrators can still retrieve the original PII when needed.",
        "The raw values are stored encrypted and decrypted on read.",
        "Engineers no longer need to avoid logging sensitive fields at all."
      ],
      "choicesKo": [
        "전체 접근 권한을 가진 관리자조차 저장된 로그에서 원본 PII를 복구할 수 없다.",
        "관리자는 필요할 때 여전히 원본 PII를 가져올 수 있다.",
        "원본 값은 암호화되어 저장되고 읽을 때 복호화된다.",
        "엔지니어는 더 이상 민감한 필드 기록을 피할 필요가 전혀 없다."
      ],
      "answerIndex": 0,
      "explanation": "본문은 쓰기 시점 편집으로 원본 값이 디스크에 도달하지 않아 관리자를 포함한 누구도 복구할 수 없다고 했으므로 (가)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-piiredaction-q4",
      "prompt": "In the notice, the word \"exemption\" is closest in meaning to",
      "promptKo": "공지에서 단어 \"exemption\"과 의미가 가장 가까운 것은",
      "choices": [
        "obligation",
        "encryption",
        "exception",
        "deletion"
      ],
      "choicesKo": [
        "의무",
        "암호화",
        "예외",
        "삭제"
      ],
      "answerIndex": 2,
      "explanation": "'an exemption requires written approval'에서 'exemption'은 규칙에서 면제되는 예외를 뜻하므로 'exception'이 가장 가깝습니다. 정반대 성격인 'obligation'은 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
