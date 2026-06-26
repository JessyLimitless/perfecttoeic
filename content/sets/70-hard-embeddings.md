# Set 70 — HARD — Embeddings & Semantic Search (Article)

```json
{
  "id": "set-hard-embeddings",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For decades, the search box on most corporate websites behaved like an unforgiving clerk who would only hand over a document if you guessed its exact wording.",
      "ko": "수십 년 동안, 대부분의 기업 웹사이트의 검색창은 정확한 표현을 맞혀야만 문서를 건네주는 융통성 없는 직원처럼 작동했습니다."
    },
    {
      "en": "Ask for 'help signing in' when the manual says 'authentication troubleshooting,' and the system would shrug and return nothing useful.",
      "ko": "매뉴얼에 '인증 문제 해결'이라고 적혀 있는데 '로그인 도움'을 요청하면, 시스템은 어깨를 으쓱하며 쓸모 있는 것을 아무것도 돌려주지 않곤 했습니다."
    },
    {
      "en": "Embeddings were the quiet breakthrough that loosened this rigidity.",
      "ko": "임베딩은 이 경직성을 풀어준 조용한 돌파구였습니다."
    },
    {
      "en": "An embedding is a list of numbers that a model assigns to a piece of text, positioning it as a single point in a vast multidimensional space.",
      "ko": "임베딩은 모델이 한 텍스트 조각에 부여하는 숫자들의 목록으로, 그것을 광대한 다차원 공간 속의 한 점으로 위치시킵니다."
    },
    {
      "en": "Crucially, the model is trained so that passages with similar meaning land near one another, even when they share not a single word.",
      "ko": "결정적으로, 모델은 의미가 비슷한 구절들이 단 하나의 단어도 공유하지 않더라도 서로 가까이 놓이도록 훈련됩니다."
    },
    {
      "en": "Semantic search exploits this geometry: a query is converted into its own point, and the engine simply returns the documents whose points sit closest to it.",
      "ko": "의미 기반 검색은 이 기하학을 활용합니다. 즉 질의가 그 자체의 점으로 변환되고, 엔진은 그 점에 가장 가까이 자리한 문서들을 단순히 반환합니다."
    },
    {
      "en": "Because proximity stands in for meaning, a search for 'help signing in' now surfaces the authentication guide without anyone having to anticipate every phrasing in advance.",
      "ko": "근접성이 의미를 대신하기 때문에, 이제 '로그인 도움' 검색은 누구도 모든 표현을 미리 예상할 필요 없이 인증 안내서를 떠오르게 합니다."
    },
    {
      "en": "The approach is not a cure-all, however, and its weaknesses are easy to underestimate.",
      "ko": "그러나 이 접근법이 만병통치약은 아니며, 그 약점은 과소평가하기 쉽습니다."
    },
    {
      "en": "An embedding inherits whatever blind spots and skews were present in the data the model learned from, so a query about an unfamiliar product line may be mapped to a misleadingly distant corner of the space.",
      "ko": "임베딩은 모델이 학습한 데이터에 존재했던 어떤 맹점과 편향이든 물려받으므로, 익숙하지 않은 제품군에 관한 질의는 오해를 부를 만큼 동떨어진 공간의 구석으로 매핑될 수 있습니다."
    },
    {
      "en": "And because results are ranked by similarity rather than literal matching, the system will confidently return its nearest neighbors even when none of them is actually relevant.",
      "ko": "그리고 결과가 문자 그대로의 일치가 아니라 유사도로 순위가 매겨지기 때문에, 시스템은 실제로 관련된 것이 하나도 없을 때조차 가장 가까운 이웃들을 자신 있게 반환할 것입니다."
    },
    {
      "en": "For that reason, mature deployments often pair semantic search with old-fashioned keyword matching, letting each method compensate for the other's blind spots.",
      "ko": "그런 이유로, 성숙한 배포는 흔히 의미 기반 검색을 구식의 키워드 매칭과 짝지어, 각 방법이 다른 방법의 맹점을 보완하게 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-embeddings-q1",
      "prompt": "What is the main idea of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Multidimensional space is too abstract to be useful in real products.",
        "Keyword search is always superior to semantic search for corporate websites.",
        "Embeddings make it unnecessary to write any documentation at all.",
        "Embeddings enable semantic search by mapping meaning to proximity, but the technique has limits and is best paired with keyword matching."
      ],
      "choicesKo": [
        "다차원 공간은 너무 추상적이어서 실제 제품에 쓸모가 없다.",
        "기업 웹사이트에서는 키워드 검색이 항상 의미 기반 검색보다 우월하다.",
        "임베딩은 어떤 문서도 작성할 필요가 없게 만든다.",
        "임베딩은 의미를 근접성으로 매핑하여 의미 기반 검색을 가능하게 하지만, 이 기법에는 한계가 있어 키워드 매칭과 짝짓는 것이 가장 좋다."
      ],
      "answerIndex": 3,
      "explanation": "기사는 임베딩이 의미를 근접성으로 바꿔 의미 기반 검색을 가능하게 하나 한계가 있어 키워드 매칭과 결합한다는 흐름이므로 (라)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-embeddings-q2",
      "prompt": "According to the article, how does semantic search return results for a query?",
      "promptKo": "기사에 따르면 의미 기반 검색은 질의에 대해 어떻게 결과를 반환하는가?",
      "choices": [
        "By requiring the user to guess the document's exact wording.",
        "By converting the query into a point and returning documents whose points sit closest to it.",
        "By alphabetizing all documents and returning the first match.",
        "By asking the user to choose from a fixed list of phrasings."
      ],
      "choicesKo": [
        "사용자가 문서의 정확한 표현을 맞히도록 요구함으로써",
        "질의를 한 점으로 변환하고 그 점에 가장 가까이 있는 문서들을 반환함으로써",
        "모든 문서를 알파벳순으로 정렬하고 첫 번째 일치를 반환함으로써",
        "사용자에게 고정된 표현 목록에서 선택하도록 요청함으로써"
      ],
      "answerIndex": 1,
      "explanation": "본문 'a query is converted into its own point, and the engine simply returns the documents whose points sit closest to it'에서 명시되므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-embeddings-q3",
      "prompt": "Why do mature deployments combine semantic search with keyword matching?",
      "promptKo": "성숙한 배포가 의미 기반 검색을 키워드 매칭과 결합하는 이유는 무엇인가?",
      "choices": [
        "Because keyword matching is faster to compute than embeddings.",
        "Because semantic search cannot handle queries written in English.",
        "Because each method can compensate for the blind spots of the other.",
        "Because regulators require both methods to be used together."
      ],
      "choicesKo": [
        "키워드 매칭이 임베딩보다 계산이 더 빠르기 때문에",
        "의미 기반 검색이 영어로 작성된 질의를 처리할 수 없기 때문에",
        "각 방법이 다른 방법의 맹점을 보완할 수 있기 때문에",
        "규제 기관이 두 방법을 함께 사용하도록 요구하기 때문에"
      ],
      "answerIndex": 2,
      "explanation": "마지막 문장에서 두 방법을 짝지어 서로의 맹점을 보완하게 한다고 했으므로 (다)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-embeddings-q4",
      "prompt": "In the article, the word \"rigidity\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"rigidity\"와 의미가 가장 가까운 것은",
      "choices": [
        "inflexibility",
        "secrecy",
        "flexibility",
        "speed"
      ],
      "choicesKo": [
        "경직성",
        "비밀성",
        "유연성",
        "속도"
      ],
      "answerIndex": 0,
      "explanation": "'Embeddings were the quiet breakthrough that loosened this rigidity'에서 'rigidity'는 정확한 표현만 받아들이던 융통성 없음을 가리키므로 'inflexibility(경직성)'가 가장 가깝습니다. 반대 의미인 'flexibility'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
