# Set 50 — HARD — Recommender Systems (Article)

```json
{
  "id": "set-hard-recsys",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For nearly a decade, the engineering culture surrounding recommender systems treated predictive accuracy as the sole metric worth optimizing.",
      "ko": "거의 10년 동안, 추천 시스템을 둘러싼 엔지니어링 문화는 예측 정확도를 최적화할 가치가 있는 유일한 지표로 취급했다."
    },
    {
      "en": "If a model could forecast with high confidence which item a user would click next, it was deemed successful, and few questioned whether that narrow objective served the broader experience.",
      "ko": "어떤 모델이 사용자가 다음에 무엇을 클릭할지 높은 신뢰도로 예측할 수 있으면 그것은 성공으로 간주되었고, 그 좁은 목표가 더 넓은 경험에 부합하는지 의문을 제기하는 사람은 거의 없었다."
    },
    {
      "en": "Yet practitioners gradually observed a troubling pattern: systems tuned exclusively for accuracy tended to recommend items that closely resembled what a person had already consumed.",
      "ko": "그러나 실무자들은 점차 우려스러운 패턴을 관찰했다. 즉, 오로지 정확도만을 위해 조정된 시스템은 사람이 이미 소비한 것과 매우 유사한 항목을 추천하는 경향이 있었다."
    },
    {
      "en": "Over time this reinforcing loop narrowed each user's exposure, producing the so-called filter bubble in which novel or challenging content rarely surfaced.",
      "ko": "시간이 지나면서 이 강화 루프는 각 사용자의 노출 범위를 좁혀, 새롭거나 도전적인 콘텐츠가 좀처럼 나타나지 않는 이른바 필터 버블을 만들어냈다."
    },
    {
      "en": "Engagement figures might still appear healthy in the short term, but repetitive suggestions quietly eroded the sense of discovery that had originally drawn audiences to the platform.",
      "ko": "참여 수치는 단기적으로는 여전히 건강해 보일 수 있었지만, 반복적인 제안은 애초에 사용자를 플랫폼으로 끌어들였던 발견의 감각을 조용히 침식시켰다."
    },
    {
      "en": "Recognizing this, several leading teams have begun to supplement the accuracy objective with explicit goals for diversity and serendipity.",
      "ko": "이를 인식하여, 몇몇 선도적인 팀들은 정확도 목표를 다양성과 뜻밖의 발견(세렌디피티)에 대한 명시적인 목표로 보완하기 시작했다."
    },
    {
      "en": "Diversity rewards a slate of recommendations that spans varied categories or styles, while serendipity favors items a user would likely enjoy yet would never have sought out on their own.",
      "ko": "다양성은 다양한 카테고리나 스타일을 아우르는 추천 목록에 보상을 주는 반면, 세렌디피티는 사용자가 즐길 가능성은 높지만 스스로는 결코 찾아보지 않았을 항목을 선호한다."
    },
    {
      "en": "Crucially, the aim is not to abandon accuracy but to balance it against these complementary signals, since a recommendation that is diverse but irrelevant helps no one.",
      "ko": "결정적으로, 그 목표는 정확도를 포기하는 것이 아니라 이를 이러한 보완적 신호들과 균형 맞추는 것인데, 다양하지만 관련 없는 추천은 누구에게도 도움이 되지 않기 때문이다."
    },
    {
      "en": "Measuring such qualities is inherently more difficult than measuring clicks, so teams often rely on a blend of offline metrics and carefully controlled live experiments.",
      "ko": "이러한 속성을 측정하는 것은 본질적으로 클릭을 측정하는 것보다 더 어렵기 때문에, 팀들은 종종 오프라인 지표와 신중하게 통제된 실시간 실험의 조합에 의존한다."
    },
    {
      "en": "Early results suggest that modest reductions in raw accuracy can be more than offset by gains in long-term retention and user satisfaction.",
      "ko": "초기 결과는 원시 정확도의 소폭 감소가 장기적 유지율과 사용자 만족도의 향상으로 충분히 상쇄될 수 있음을 시사한다."
    },
    {
      "en": "The lesson, increasingly accepted across the field, is that optimizing a single number can be a deceptively costly form of success.",
      "ko": "이 분야 전반에서 점점 더 받아들여지는 교훈은, 단일 수치를 최적화하는 것이 기만적으로 값비싼 형태의 성공일 수 있다는 점이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-recsys-q1",
      "prompt": "What is the main purpose of the article?",
      "promptKo": "이 기사의 주된 목적은 무엇인가?",
      "choices": [
        "To explain why accuracy-only optimization harms experience and how teams now add diversity and serendipity",
        "To argue that recommender systems should abandon accuracy as a metric",
        "To compare the click-through rates of competing streaming platforms",
        "To promote a specific commercial recommendation product"
      ],
      "choicesKo": [
        "정확도만을 위한 최적화가 경험을 해치는 이유와 팀들이 이제 다양성과 세렌디피티를 추가하는 방법을 설명하기 위해",
        "추천 시스템이 정확도를 지표로서 버려야 한다고 주장하기 위해",
        "경쟁하는 스트리밍 플랫폼들의 클릭률을 비교하기 위해",
        "특정 상업용 추천 제품을 홍보하기 위해"
      ],
      "answerIndex": 0,
      "explanation": "글 전체가 정확도만 최적화할 때의 문제(필터 버블, 반복적 추천)와 이를 보완하는 다양성·세렌디피티 도입을 다룬다. 'Recognizing this, several leading teams have begun to supplement the accuracy objective with explicit goals for diversity and serendipity.' 문장이 핵심 목적을 보여준다. 정확도를 '포기'하는 것이 아니라 '균형'을 맞춘다고 명시하므로 (1)은 오답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-recsys-q2",
      "prompt": "According to the passage, why is measuring diversity and serendipity challenging?",
      "promptKo": "지문에 따르면, 다양성과 세렌디피티를 측정하는 것이 어려운 이유는 무엇인가?",
      "choices": [
        "There is no reliable data available about user behavior",
        "These qualities are inherently harder to measure than clicks, requiring offline metrics plus controlled live experiments",
        "Live experiments are prohibited on most platforms",
        "Accuracy must be ignored before they can be measured"
      ],
      "choicesKo": [
        "사용자 행동에 관한 신뢰할 만한 데이터가 전혀 없기 때문에",
        "이러한 속성은 본질적으로 클릭보다 측정하기 어려워, 오프라인 지표와 통제된 실시간 실험이 함께 필요하기 때문에",
        "대부분의 플랫폼에서 실시간 실험이 금지되어 있기 때문에",
        "측정하기 전에 정확도를 무시해야 하기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "'Measuring such qualities is inherently more difficult than measuring clicks, so teams often rely on a blend of offline metrics and carefully controlled live experiments.' 문장이 측정의 어려움과 그에 따른 오프라인 지표·실시간 실험 조합 사용을 직접 진술한다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-recsys-q3",
      "prompt": "What can be inferred about optimizing solely for short-term engagement?",
      "promptKo": "단기 참여만을 위해 최적화하는 것에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It guarantees the highest possible long-term retention",
        "It is the only metric experts now recommend",
        "It may mask a gradual decline in the user's sense of discovery and long-term satisfaction",
        "It eliminates the need for live experiments entirely"
      ],
      "choicesKo": [
        "그것은 가능한 가장 높은 장기 유지율을 보장한다",
        "그것은 전문가들이 이제 권장하는 유일한 지표이다",
        "그것은 사용자의 발견 감각과 장기적 만족도의 점진적 저하를 가릴 수 있다",
        "그것은 실시간 실험의 필요성을 완전히 없앤다"
      ],
      "answerIndex": 2,
      "explanation": "'Engagement figures might still appear healthy in the short term, but repetitive suggestions quietly eroded the sense of discovery...' 그리고 'modest reductions in raw accuracy can be more than offset by gains in long-term retention' 문장들을 종합하면, 단기 지표가 건강해 보여도 장기적 발견·만족의 저하를 숨길 수 있음을 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-recsys-q4",
      "prompt": "In the passage, the word \"offset\" is closest in meaning to",
      "promptKo": "지문에서 단어 \"offset\"과 의미가 가장 가까운 것은?",
      "choices": [
        "postponed",
        "intensified",
        "recorded",
        "compensated for"
      ],
      "choicesKo": [
        "연기되다",
        "심화되다",
        "기록되다",
        "상쇄되다 / 보완되다"
      ],
      "answerIndex": 3,
      "explanation": "'modest reductions in raw accuracy can be more than offset by gains in long-term retention and user satisfaction'에서 offset은 손실이 이익으로 '상쇄·보완'됨을 뜻하므로 'compensated for'가 정답이다. 반대로 'intensified(심화시키다)'는 손실을 키운다는 정반대 의미의 오답 함정이다.",
      "category": "동의어"
    }
  ]
}
```
