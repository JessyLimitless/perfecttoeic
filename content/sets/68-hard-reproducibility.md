# Set 68 — HARD — Reproducibility (Article)

```json
{
  "id": "set-hard-reproducibility",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "A data science team can spend weeks building a model that beats every benchmark, only to find that no one — sometimes not even its own authors — can rebuild it months later.",
      "ko": "데이터 과학 팀은 모든 벤치마크를 능가하는 모델을 만드는 데 몇 주를 쓸 수 있지만, 결국 몇 달 뒤에는 누구도 — 때로는 그 작성자조차도 — 그것을 다시 만들 수 없음을 발견하게 됩니다."
    },
    {
      "en": "This quiet failure has a name borrowed from science at large: the reproducibility problem.",
      "ko": "이 조용한 실패에는 과학 전반에서 빌려온 이름이 있습니다. 바로 재현성 문제입니다."
    },
    {
      "en": "A result is reproducible only if someone else, starting from the same data and code, can arrive at the same numbers — and in practice that bar is cleared far less often than outsiders assume.",
      "ko": "어떤 결과는 다른 누군가가 동일한 데이터와 코드에서 출발해 동일한 수치에 도달할 수 있을 때에만 재현 가능하며, 실제로 그 기준은 외부인이 추정하는 것보다 훨씬 덜 충족됩니다."
    },
    {
      "en": "The culprits are mundane rather than dramatic.",
      "ko": "그 원인은 극적이기보다는 평범합니다."
    },
    {
      "en": "A model is trained against one snapshot of a database, but the database keeps changing, so a rerun a month later quietly learns from different rows.",
      "ko": "모델은 데이터베이스의 한 스냅샷을 상대로 훈련되지만, 데이터베이스는 계속 바뀌므로, 한 달 뒤의 재실행은 조용히 다른 행들로부터 학습합니다."
    },
    {
      "en": "A library is upgraded between runs and changes a default deep in its code, nudging the result without anyone editing a single line of the project.",
      "ko": "라이브러리는 실행들 사이에 업그레이드되어 그 코드 깊숙한 곳의 기본값을 바꾸며, 프로젝트의 단 한 줄도 편집하지 않았는데 결과를 슬쩍 움직입니다."
    },
    {
      "en": "Even the random seed that shuffles the data may be left unset, so two runs of identical code diverge purely by chance.",
      "ko": "데이터를 섞는 무작위 시드조차 설정되지 않은 채 남겨질 수 있어, 동일한 코드의 두 실행이 순전히 우연에 의해 갈라집니다."
    },
    {
      "en": "None of these is a bug in the ordinary sense; each is simply an undocumented dependency that the original author happened to satisfy without noticing.",
      "ko": "이들 중 어느 것도 통상적 의미의 버그는 아닙니다. 각각은 단지 원작자가 알아차리지 못한 채 우연히 충족시켰던, 문서화되지 않은 의존성일 뿐입니다."
    },
    {
      "en": "The remedy is less about clever algorithms than about disciplined bookkeeping: pin the exact data version, freeze library versions, fix every random seed, and record the whole environment alongside the result.",
      "ko": "그 해법은 영리한 알고리즘보다는 절도 있는 기록 관리에 더 가깝습니다. 즉 정확한 데이터 버전을 고정하고, 라이브러리 버전을 동결하며, 모든 무작위 시드를 정하고, 환경 전체를 결과와 함께 기록하는 것입니다."
    },
    {
      "en": "Teams sometimes resist this discipline as bureaucratic overhead that slows the exciting work of modeling.",
      "ko": "팀들은 때때로 이 절도를, 모델링이라는 흥미로운 작업을 늦추는 관료적 부담으로 여겨 거부합니다."
    },
    {
      "en": "But a result that cannot be reproduced cannot really be trusted, and a model that cannot be rebuilt cannot be safely improved — which makes reproducibility not a tax on the work but a precondition for it to compound.",
      "ko": "그러나 재현될 수 없는 결과는 진정으로 신뢰될 수 없고, 다시 만들어질 수 없는 모델은 안전하게 개선될 수 없습니다. 이는 재현성을 작업에 대한 세금이 아니라 그 작업이 누적되기 위한 전제 조건으로 만듭니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-reproducibility-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Reproducibility failures stem from mundane undocumented dependencies and require disciplined bookkeeping to prevent.",
        "Reproducibility is a minor concern that only affects academic research.",
        "Building a model that beats benchmarks guarantees it can be rebuilt later.",
        "Random seeds are the only cause of irreproducible results."
      ],
      "choicesKo": [
        "재현성 실패는 평범한 문서화되지 않은 의존성에서 비롯되며, 막으려면 절도 있는 기록 관리가 필요하다.",
        "재현성은 학술 연구에만 영향을 주는 사소한 문제다.",
        "벤치마크를 능가하는 모델을 만들면 나중에 다시 만들 수 있음이 보장된다.",
        "무작위 시드가 재현 불가능한 결과의 유일한 원인이다."
      ],
      "answerIndex": 0,
      "explanation": "기사는 재현성 실패의 평범한 원인들(데이터 변화, 라이브러리 업그레이드, 미설정 시드)과 기록 관리라는 해법을 제시하므로 (가)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-reproducibility-q2",
      "prompt": "According to the article, when is a result considered reproducible?",
      "promptKo": "기사에 따르면 어떤 결과는 언제 재현 가능하다고 여겨지는가?",
      "choices": [
        "When the original author can describe it from memory.",
        "When it beats every published benchmark.",
        "When someone else, using the same data and code, reaches the same numbers.",
        "When it is approved by a manager."
      ],
      "choicesKo": [
        "원작자가 기억으로 그것을 설명할 수 있을 때",
        "그것이 발표된 모든 벤치마크를 능가할 때",
        "다른 누군가가 동일한 데이터와 코드를 사용해 동일한 수치에 도달할 때",
        "관리자가 그것을 승인할 때"
      ],
      "answerIndex": 2,
      "explanation": "본문 'reproducible only if someone else, starting from the same data and code, can arrive at the same numbers'에서 정의가 명시되므로 (다)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-reproducibility-q3",
      "prompt": "Why does the author argue reproducibility is not merely 'a tax on the work'?",
      "promptKo": "글쓴이가 재현성이 단지 '작업에 대한 세금'이 아니라고 주장하는 이유는 무엇인가?",
      "choices": [
        "Because it makes the modeling work more exciting.",
        "Because a result that cannot be reproduced cannot be trusted or safely improved upon.",
        "Because it allows teams to skip freezing library versions.",
        "Because it eliminates the need to document any dependencies."
      ],
      "choicesKo": [
        "그것이 모델링 작업을 더 흥미롭게 만들기 때문에",
        "재현될 수 없는 결과는 신뢰될 수 없고 안전하게 개선될 수도 없기 때문에",
        "그것이 팀들이 라이브러리 버전 동결을 건너뛰게 해 주기 때문에",
        "그것이 어떤 의존성도 문서화할 필요를 없애기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "본문은 재현될 수 없는 결과는 신뢰·개선될 수 없어 재현성이 작업 누적의 전제 조건이라 했으므로 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-reproducibility-q4",
      "prompt": "In the article, the word \"mundane\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"mundane\"과 의미가 가장 가까운 것은",
      "choices": [
        "expensive",
        "alarming",
        "intentional",
        "ordinary"
      ],
      "choicesKo": [
        "비싼",
        "놀라운",
        "의도적인",
        "평범한"
      ],
      "answerIndex": 3,
      "explanation": "'The culprits are mundane rather than dramatic'에서 'mundane'은 극적이지 않은 평범함을 뜻하므로 'ordinary'가 가장 가깝습니다. 'dramatic'과 대비되는 점에서 'alarming'은 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
