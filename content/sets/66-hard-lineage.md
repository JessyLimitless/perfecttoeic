# Set 66 — HARD — Data Lineage (Email)

```json
{
  "id": "set-hard-lineage",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Why the revenue dashboard and the finance report disagreed last week",
      "ko": "제목: 지난주 매출 대시보드와 재무 리포트가 어긋났던 이유"
    },
    {
      "en": "Hi all, I want to close the loop on the discrepancy several of you flagged between the executive revenue dashboard and the numbers Finance reported to the board.",
      "ko": "안녕하세요 여러분, 임원용 매출 대시보드와 재무팀이 이사회에 보고한 수치 사이의 불일치에 대해 여러분 중 몇 분이 제기한 문제를 매듭짓고자 합니다."
    },
    {
      "en": "After two days of tracing, the cause was not a calculation error in either report but a difference far upstream in how each one was fed.",
      "ko": "이틀간 추적한 끝에, 원인은 어느 리포트의 계산 오류도 아니었고 각각이 어떻게 데이터를 공급받았는지에 관한 훨씬 상류의 차이였습니다."
    },
    {
      "en": "The dashboard pulls from a table that was silently repointed to a new source system during last month's migration, while the finance report still reads from the legacy pipeline.",
      "ko": "대시보드는 지난달 마이그레이션 중에 소리 없이 새로운 소스 시스템으로 재연결된 테이블에서 데이터를 가져오는 반면, 재무 리포트는 여전히 레거시 파이프라인에서 읽어 들입니다."
    },
    {
      "en": "Neither team did anything wrong; the problem is that nobody could see, at a glance, that these two reports no longer shared a common origin.",
      "ko": "어느 팀도 잘못한 것은 없습니다. 문제는 이 두 리포트가 더 이상 공통의 출처를 공유하지 않는다는 것을 누구도 한눈에 알 수 없었다는 점입니다."
    },
    {
      "en": "This is exactly the gap that data lineage is meant to close — a record of where each field originates and every transformation it passes through before it reaches a chart.",
      "ko": "이것이 바로 데이터 계보가 메우려는 공백입니다. 즉 각 필드가 어디에서 비롯되며 차트에 도달하기까지 거치는 모든 변환의 기록 말입니다."
    },
    {
      "en": "Had lineage been in place, an analyst could have clicked the revenue figure and immediately seen the two reports diverging at the migrated table, instead of spending two days reconstructing it by hand.",
      "ko": "계보가 갖춰져 있었다면, 분석가는 매출 수치를 클릭해 두 리포트가 마이그레이션된 테이블에서 갈라지는 것을 즉시 볼 수 있었을 것이고, 이틀을 손으로 재구성하는 데 쓰지 않았을 것입니다."
    },
    {
      "en": "I am therefore asking the data platform team to prioritize automated lineage capture in next quarter's roadmap.",
      "ko": "따라서 저는 데이터 플랫폼 팀에 다음 분기 로드맵에서 자동 계보 수집을 우선순위로 둘 것을 요청합니다."
    },
    {
      "en": "I want to be candid that this is not a quick win; instrumenting every pipeline to emit lineage is real engineering work and will compete with feature requests.",
      "ko": "솔직히 말씀드리면 이것은 빠르게 얻을 수 있는 성과가 아닙니다. 모든 파이프라인이 계보를 내보내도록 계측하는 일은 실질적인 엔지니어링 작업이며 기능 요청들과 경쟁할 것입니다."
    },
    {
      "en": "But the cost of not having it is precisely the kind of fire drill we just lived through, repeated every time a source quietly changes beneath us.",
      "ko": "하지만 그것이 없을 때의 비용은 바로 우리가 방금 겪은 종류의 소동이며, 출처가 우리 아래에서 조용히 바뀔 때마다 반복됩니다."
    },
    {
      "en": "For now, please treat the dashboard as the source of truth and hold the finance pipeline until both are repointed to the same system, which I expect by Friday.",
      "ko": "당장은 대시보드를 진실의 원천으로 취급해 주시고, 두 가지가 같은 시스템으로 재연결될 때까지 재무 파이프라인을 보류해 주십시오. 금요일까지 완료될 것으로 예상합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-lineage-q1",
      "prompt": "What was the actual cause of the discrepancy between the two reports?",
      "promptKo": "두 리포트 사이 불일치의 실제 원인은 무엇이었는가?",
      "choices": [
        "A calculation error in the finance report.",
        "An analyst deliberately altered the revenue figure.",
        "The dashboard software had a display bug.",
        "The two reports were fed from different source systems after a migration."
      ],
      "choicesKo": [
        "재무 리포트의 계산 오류",
        "한 분석가가 매출 수치를 고의로 변경했다",
        "대시보드 소프트웨어에 표시 버그가 있었다",
        "마이그레이션 이후 두 리포트가 서로 다른 소스 시스템에서 공급받았다는 점"
      ],
      "answerIndex": 3,
      "explanation": "본문은 원인이 계산 오류가 아니라, 대시보드는 재연결된 새 소스에서, 재무 리포트는 레거시 파이프라인에서 읽는 상류의 차이였다고 밝히므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-lineage-q2",
      "prompt": "According to the email, what does data lineage provide?",
      "promptKo": "이메일에 따르면 데이터 계보는 무엇을 제공하는가?",
      "choices": [
        "A faster way to render charts on the dashboard.",
        "A record of where each field originates and every transformation it undergoes.",
        "An automatic correction of all calculation errors.",
        "A backup copy of the entire legacy pipeline."
      ],
      "choicesKo": [
        "대시보드에서 차트를 더 빨리 렌더링하는 방법",
        "각 필드가 어디서 비롯되며 거치는 모든 변환의 기록",
        "모든 계산 오류의 자동 수정",
        "레거시 파이프라인 전체의 백업 사본"
      ],
      "answerIndex": 1,
      "explanation": "본문 'a record of where each field originates and every transformation it passes through'에서 계보의 정의가 명시되므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-lineage-q3",
      "prompt": "What does the writer imply about implementing lineage?",
      "promptKo": "글쓴이가 계보 구현에 관해 암시하는 바는 무엇인가?",
      "choices": [
        "It can be finished by Friday with no extra effort.",
        "It is unnecessary now that the dashboard is the source of truth.",
        "It is substantial engineering work, but avoiding it costs more in repeated fire drills.",
        "It should replace all of the team's feature work permanently."
      ],
      "choicesKo": [
        "추가 노력 없이 금요일까지 끝낼 수 있다.",
        "이제 대시보드가 진실의 원천이므로 불필요하다.",
        "상당한 엔지니어링 작업이지만, 그것을 피하면 반복되는 소동으로 더 큰 비용이 든다.",
        "팀의 모든 기능 작업을 영구히 대체해야 한다."
      ],
      "answerIndex": 2,
      "explanation": "글쓴이는 계보 구현이 'real engineering work'이며 기능 요청과 경쟁하지만, 없을 때의 비용이 방금 겪은 소동의 반복이라고 했으므로 (다)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-lineage-q4",
      "prompt": "In the email, the phrase \"close the loop\" is closest in meaning to",
      "promptKo": "이메일에서 \"close the loop\"라는 표현과 의미가 가장 가까운 것은",
      "choices": [
        "provide a final resolution",
        "open a new investigation",
        "cancel the project entirely",
        "shorten the deadline"
      ],
      "choicesKo": [
        "최종적인 결론을 제공하다",
        "새로운 조사를 시작하다",
        "프로젝트를 완전히 취소하다",
        "마감일을 앞당기다"
      ],
      "answerIndex": 0,
      "explanation": "'close the loop on the discrepancy'는 제기된 문제에 대해 결론을 내려 마무리한다는 뜻이므로 'provide a final resolution'이 가장 가깝습니다.",
      "category": "동의어"
    }
  ]
}
```
