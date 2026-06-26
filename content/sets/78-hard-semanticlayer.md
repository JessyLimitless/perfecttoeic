# Set 78 — HARD — Semantic Layer (Article)

```json
{
  "id": "set-hard-semanticlayer",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Ask three departments at a typical company what 'active user' means, and you will often get three different numbers that are all, in their own way, correct.",
      "ko": "일반적인 회사에서 세 부서에 '활성 사용자'가 무엇을 뜻하는지 물어보면, 흔히 저마다의 방식으로는 모두 옳은 세 가지 다른 수치를 얻게 됩니다."
    },
    {
      "en": "Sales counts anyone who logged in this month, product counts only those who completed a key action, and finance counts paying accounts — and each writes its own database query to do so.",
      "ko": "영업은 이번 달에 로그인한 모든 사람을 세고, 제품 팀은 핵심 행동을 완료한 사람만 세며, 재무는 유료 계정을 세는데, 각자가 그렇게 하기 위해 자기 자신의 데이터베이스 쿼리를 작성합니다."
    },
    {
      "en": "The result is a familiar kind of organizational friction: every meeting begins by arguing about whose figure is right instead of about what the figure implies.",
      "ko": "그 결과는 익숙한 종류의 조직적 마찰입니다. 즉 모든 회의가 그 수치가 무엇을 시사하는지가 아니라 누구의 수치가 옳은지를 두고 다투며 시작됩니다."
    },
    {
      "en": "A semantic layer, sometimes called a metrics layer, is the proposed cure: a single governed place where each business metric is defined exactly once.",
      "ko": "의미 계층, 때로는 지표 계층이라 불리는 것이 제안된 처방입니다. 즉 각 비즈니스 지표가 정확히 한 번만 정의되는, 단일하게 관리되는 장소입니다."
    },
    {
      "en": "Rather than embedding the logic for 'revenue' inside dozens of dashboards and spreadsheets, teams reference a central definition, and the layer translates that request into the correct query on demand.",
      "ko": "'매출'에 대한 로직을 수십 개의 대시보드와 스프레드시트 안에 박아 넣는 대신, 팀들은 중앙의 정의를 참조하고, 그 계층은 요청 시 그 요청을 올바른 쿼리로 번역합니다."
    },
    {
      "en": "The immediate payoff is consistency: because everyone draws from the same definition, the same metric returns the same value no matter which tool poses the question.",
      "ko": "즉각적인 보상은 일관성입니다. 모두가 동일한 정의에서 끌어오기 때문에, 어떤 도구가 질문을 던지든 같은 지표는 같은 값을 돌려줍니다."
    },
    {
      "en": "A subtler benefit is maintainability: when the definition of churn changes, it is updated in one location instead of hunted down across hundreds of scattered reports.",
      "ko": "더 미묘한 이점은 유지보수성입니다. 이탈의 정의가 바뀔 때, 그것은 수백 개의 흩어진 보고서에 걸쳐 추적되는 대신 한 곳에서 갱신됩니다."
    },
    {
      "en": "Critics counter that a semantic layer is yet another system to build, govern, and keep in sync with the warehouse beneath it.",
      "ko": "비판자들은 의미 계층이 그 아래의 웨어하우스와 동기화 상태로 구축하고 관리하며 유지해야 할 또 하나의 시스템일 뿐이라고 반박합니다."
    },
    {
      "en": "That objection has merit, but it understates how much hidden labor already goes into reconciling conflicting numbers after the fact.",
      "ko": "그 반론은 일리가 있지만, 사후에 상충하는 수치들을 조율하는 데 이미 얼마나 많은 숨은 노동이 들어가는지를 과소평가합니다."
    },
    {
      "en": "The deeper shift the layer encourages is cultural: it forces an organization to agree, in writing, on what its words actually mean before it argues about the data.",
      "ko": "그 계층이 촉진하는 더 깊은 변화는 문화적입니다. 즉 그것은 조직이 데이터를 두고 다투기 전에 자신의 용어가 실제로 무엇을 뜻하는지 문서로 합의하도록 강제합니다."
    },
    {
      "en": "Viewed that way, the technology is less the point than the discipline of definition it quietly imposes.",
      "ko": "그렇게 보면, 그 기술 자체보다는 그것이 조용히 부과하는 정의의 규율이 더 핵심입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-semanticlayer-q1",
      "prompt": "What is the central argument of the article?",
      "promptKo": "이 기사의 핵심 주장은 무엇인가?",
      "choices": [
        "A semantic layer centralizes metric definitions, delivering consistency and, more deeply, a discipline of shared definitions.",
        "A semantic layer mainly increases the cost of running dashboards without clear benefit.",
        "Each department should keep writing its own queries to preserve independence.",
        "Disagreements about metrics are best resolved by letting finance decide every number."
      ],
      "choicesKo": [
        "의미 계층은 지표 정의를 중앙화하여 일관성을, 그리고 더 깊게는 공유된 정의의 규율을 제공한다.",
        "의미 계층은 뚜렷한 이점 없이 대시보드 운영 비용만 주로 늘린다.",
        "각 부서는 독립성을 지키기 위해 자기 쿼리를 계속 작성해야 한다.",
        "지표에 대한 의견 차이는 재무가 모든 수치를 결정하게 함으로써 가장 잘 해결된다."
      ],
      "answerIndex": 0,
      "explanation": "기사는 의미 계층이 일관성과 유지보수성을 주고 마지막에 정의의 규율이라는 더 깊은 변화를 강조하므로 (가)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-semanticlayer-q2",
      "prompt": "According to the article, what is the 'subtler benefit' of a semantic layer?",
      "promptKo": "기사에 따르면, 의미 계층의 '더 미묘한 이점'은 무엇인가?",
      "choices": [
        "It guarantees that finance numbers always win disputes.",
        "It allows each team to define revenue differently.",
        "It removes the need to store data in a warehouse at all.",
        "When a metric's definition changes, it is updated in one location rather than across many reports."
      ],
      "choicesKo": [
        "재무 수치가 분쟁에서 항상 이기도록 보장한다.",
        "각 팀이 매출을 다르게 정의할 수 있게 해 준다.",
        "데이터를 웨어하우스에 저장할 필요를 아예 없앤다.",
        "지표의 정의가 바뀔 때, 여러 보고서에 걸쳐서가 아니라 한 곳에서 갱신된다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 더 미묘한 이점으로 유지보수성을 들며 정의가 한 곳에서 갱신된다고 했으므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-semanticlayer-q3",
      "prompt": "What can be inferred about the author's view of the critics' objection?",
      "promptKo": "비판자들의 반론에 대한 글쓴이의 견해에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "The author fully agrees that a semantic layer should be avoided.",
        "The author dismisses the objection as having no merit whatsoever.",
        "The author concedes the objection has merit but thinks it undervalues the hidden cost of reconciling conflicting numbers.",
        "The author believes the warehouse should be eliminated to satisfy critics."
      ],
      "choicesKo": [
        "글쓴이는 의미 계층을 피해야 한다는 데 전적으로 동의한다.",
        "글쓴이는 그 반론에 아무런 일리도 없다고 일축한다.",
        "글쓴이는 그 반론에 일리가 있음을 인정하지만, 그것이 상충하는 수치를 조율하는 숨은 비용을 과소평가한다고 본다.",
        "글쓴이는 비판자들을 만족시키기 위해 웨어하우스를 없애야 한다고 믿는다."
      ],
      "answerIndex": 2,
      "explanation": "본문 'That objection has merit, but it understates how much hidden labor...'에서 일리는 인정하되 숨은 비용을 과소평가한다고 했으므로 (다)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-semanticlayer-q4",
      "prompt": "In the article, the word \"friction\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"friction\"과 의미가 가장 가까운 것은",
      "choices": [
        "harmony",
        "conflict",
        "shortcut",
        "warehouse"
      ],
      "choicesKo": [
        "조화",
        "갈등",
        "지름길",
        "창고"
      ],
      "answerIndex": 1,
      "explanation": "'organizational friction: every meeting begins by arguing'에서 'friction'은 부서 간 다툼, 즉 'conflict'를 뜻합니다. 정반대인 'harmony'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
