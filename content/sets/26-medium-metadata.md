# Set 26 — MEDIUM — The Value of Documenting Your Datasets (Article)

```json
{
  "id": "set-medium-metadata",
  "difficulty": "MEDIUM",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Many data teams treat documentation as an afterthought, but recording clear metadata and field definitions is one of the most effective ways to save time over the long run.",
      "ko": "많은 데이터 팀이 문서화를 부차적인 일로 여기지만, 명확한 메타데이터와 필드 정의를 기록하는 것은 장기적으로 시간을 절약하는 가장 효과적인 방법 중 하나입니다."
    },
    {
      "en": "Metadata is simply information about the data itself, such as where a dataset came from, when it was last refreshed, and what each column is intended to measure.",
      "ko": "메타데이터란 데이터셋이 어디서 왔는지, 마지막으로 언제 갱신되었는지, 각 열이 무엇을 측정하려는지와 같이 데이터 그 자체에 관한 정보를 의미합니다."
    },
    {
      "en": "When an analyst reuses a dataset months later, well-kept notes explaining where the data came from and what each column means can prevent hours of guesswork.",
      "ko": "분석가가 몇 달 뒤 데이터셋을 재사용할 때, 데이터의 출처와 각 열의 의미를 설명하는 잘 정리된 메모는 몇 시간에 걸친 추측을 방지할 수 있습니다."
    },
    {
      "en": "Without such records, teams often misinterpret figures, leading to errors that may not surface until a report has already been shared with clients.",
      "ko": "이러한 기록이 없으면 팀은 수치를 잘못 해석하는 경우가 많고, 이는 보고서가 이미 고객과 공유된 후에야 드러나는 오류로 이어질 수 있습니다."
    },
    {
      "en": "A single ambiguous label, such as a column called \"revenue\" that secretly excludes refunds, can quietly distort every chart built on top of it.",
      "ko": "예를 들어 환불을 몰래 제외하는 \"매출\"이라는 열처럼 모호한 라벨 하나가 그 위에 만들어진 모든 차트를 조용히 왜곡할 수 있습니다."
    },
    {
      "en": "Documenting datasets also makes it far easier for new hires to become productive, since they do not have to rely on a single colleague to explain how the data is structured.",
      "ko": "또한 데이터셋을 문서화하면 신입 직원이 데이터 구조를 설명해 줄 특정 동료 한 명에게 의존할 필요가 없어 훨씬 빠르게 업무에 기여할 수 있게 됩니다."
    },
    {
      "en": "It also protects the organization when an experienced employee leaves, because the knowledge that once lived only in that person's head is now written down.",
      "ko": "또한 한때 그 사람의 머릿속에만 있던 지식이 이제 기록되어 있으므로, 경험 많은 직원이 떠날 때에도 조직을 보호해 줍니다."
    },
    {
      "en": "Good documentation does not have to be elaborate; even a short README file stored alongside the data can answer most of the questions a teammate will ask.",
      "ko": "좋은 문서화가 거창할 필요는 없으며, 데이터와 함께 저장된 짧은 README 파일 하나만으로도 동료가 던질 대부분의 질문에 답할 수 있습니다."
    },
    {
      "en": "Teams that succeed usually make documentation part of their normal workflow rather than a task they postpone until the end of a project.",
      "ko": "성공하는 팀은 보통 문서화를 프로젝트가 끝날 때까지 미루는 작업이 아니라 평소 작업 흐름의 일부로 삼습니다."
    },
    {
      "en": "Some organizations now require a basic data dictionary before any new dataset can be published to a shared catalog.",
      "ko": "일부 조직은 이제 새 데이터셋을 공유 카탈로그에 게시하기 전에 기본적인 데이터 사전을 작성하도록 요구합니다."
    },
    {
      "en": "The upfront effort is modest, yet the payoff compounds every time someone reuses, audits, or builds upon the data.",
      "ko": "초기에 드는 노력은 크지 않지만, 누군가가 데이터를 재사용하거나 점검하거나 그 위에 무언가를 구축할 때마다 그 보상은 누적됩니다."
    },
    {
      "en": "In short, treating documentation as essential infrastructure—not a chore—is what separates teams that move quickly from those that constantly retrace their steps.",
      "ko": "요컨대, 문서화를 귀찮은 일이 아니라 필수 인프라로 취급하는 것이야말로 빠르게 나아가는 팀과 끊임없이 같은 길을 되짚는 팀을 갈라놓습니다."
    }
  ],
  "questions": [
    {
      "id": "set-medium-metadata-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "The cost of purchasing new analytics software",
        "How to recruit experienced data analysts",
        "The benefits of documenting datasets",
        "Methods for sharing reports with clients"
      ],
      "choicesKo": [
        "새 분석 소프트웨어 구매 비용",
        "경험 많은 데이터 분석가를 채용하는 방법",
        "데이터셋을 문서화하는 것의 이점",
        "고객과 보고서를 공유하는 방법"
      ],
      "answerIndex": 2,
      "explanation": "글 전체가 메타데이터와 필드 정의 문서화가 시간을 절약하고 오류를 막으며 신입과 조직을 돕는다는 이점을 다루므로 정답은 (다)=2입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-metadata-q2",
      "prompt": "According to the article, what can happen when datasets are not documented?",
      "promptKo": "기사에 따르면, 데이터셋이 문서화되지 않으면 무슨 일이 일어날 수 있는가?",
      "choices": [
        "Analysts misinterpret figures and produce errors",
        "Datasets are automatically deleted",
        "Clients are charged additional fees",
        "Software runs more slowly than usual"
      ],
      "choicesKo": [
        "분석가가 수치를 잘못 해석해 오류를 만든다",
        "데이터셋이 자동으로 삭제된다",
        "고객에게 추가 요금이 청구된다",
        "소프트웨어가 평소보다 느리게 실행된다"
      ],
      "answerIndex": 0,
      "explanation": "네 번째 문장에서 기록이 없으면 팀이 수치를 잘못 해석해 오류로 이어진다고 했으므로 정답은 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-metadata-q3",
      "prompt": "What can be inferred about new employees on a well-documented team?",
      "promptKo": "문서화가 잘 된 팀의 신입 직원에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "They are paid higher salaries than other staff",
        "They can contribute without depending heavily on one coworker",
        "They must complete a formal certification first",
        "They are not allowed to reuse older datasets"
      ],
      "choicesKo": [
        "다른 직원보다 더 높은 급여를 받는다",
        "한 동료에게 크게 의존하지 않고도 기여할 수 있다",
        "먼저 공식 자격증을 취득해야 한다",
        "이전 데이터셋을 재사용하는 것이 허용되지 않는다"
      ],
      "answerIndex": 1,
      "explanation": "여섯 번째 문장에서 문서화 덕분에 신입이 특정 동료 한 명에게 의존하지 않아도 된다고 했으므로 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "set-medium-metadata-q4",
      "prompt": "In the passage, the word \"modest\" is closest in meaning to",
      "promptKo": "지문에서 단어 \"modest\"와 의미가 가장 가까운 것은?",
      "choices": [
        "enormous",
        "uncertain",
        "permanent",
        "small"
      ],
      "choicesKo": [
        "막대한",
        "불확실한",
        "영구적인",
        "작은"
      ],
      "answerIndex": 3,
      "explanation": "\"The upfront effort is modest\"는 초기 노력이 크지 않고 적다는 뜻이므로 \"small(작은)\"과 의미가 가장 가깝습니다. 반대 의미인 \"enormous(막대한)\"는 오답입니다. 정답은 (라)=3입니다.",
      "category": "동의어"
    }
  ]
}
```
