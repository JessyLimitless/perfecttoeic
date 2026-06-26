# HARD — Vector Databases for Semantic Search

```json
{
  "id": "set-hard-vectordb",
  "difficulty": "HARD",
  "passageType": "Technical Brief",
  "passageLines": [
    {
      "en": "This brief evaluates the growing adoption of vector databases, which store text and images as high-dimensional embeddings and retrieve results by mathematical similarity rather than literal word matching.",
      "ko": "본 브리프는 텍스트와 이미지를 고차원 임베딩으로 저장하고 문자 그대로의 단어 일치가 아니라 수학적 유사성으로 결과를 검색하는 벡터 데이터베이스의 확산되는 도입을 평가한다."
    },
    {
      "en": "Their principal advantage is semantic recall: a query for \"affordable laptop\" can surface a listing that reads \"budget notebook\" even though the two share no keywords.",
      "ko": "그것들의 주된 장점은 의미적 재현이다. \"affordable laptop\"이라는 질의는 두 표현이 어떤 키워드도 공유하지 않더라도 \"budget notebook\"이라고 적힌 항목을 찾아낼 수 있다."
    },
    {
      "en": "For applications such as document retrieval, recommendation, and chatbot grounding, this capacity to capture meaning rather than surface form is genuinely transformative.",
      "ko": "문서 검색, 추천, 챗봇 근거 제공과 같은 응용에서 표면 형태가 아니라 의미를 포착하는 이 능력은 진정으로 혁신적이다."
    },
    {
      "en": "Nevertheless, the technology is not a free lunch, and several costs deserve sober consideration before any migration.",
      "ko": "그럼에도 불구하고 그 기술은 공짜가 아니며, 어떠한 전환에 앞서 몇 가지 비용은 냉철한 고려를 받을 만하다."
    },
    {
      "en": "Generating embeddings for a large corpus is computationally expensive, and the resulting indexes must be rebuilt or updated whenever the underlying model changes, a process that can consume substantial GPU time.",
      "ko": "대규모 말뭉치에 대한 임베딩을 생성하는 것은 계산적으로 비싸며, 그 결과물인 인덱스는 기반 모델이 바뀔 때마다 재구축되거나 갱신되어야 하는데, 이는 상당한 GPU 시간을 소모할 수 있는 과정이다."
    },
    {
      "en": "Furthermore, most production systems rely on approximate nearest-neighbor search, which trades a measure of recall for speed, so teams must carefully tune the precision-recall balance to avoid silently dropping relevant results.",
      "ko": "더욱이 대부분의 운영 시스템은 속도를 위해 일정한 재현율을 희생하는 근사 최근접 이웃 검색에 의존하므로, 팀은 관련 결과를 조용히 누락시키는 것을 피하기 위해 정밀도-재현율 균형을 신중하게 조정해야 한다."
    },
    {
      "en": "It is tempting to assume that semantic search renders keyword search obsolete, but that conclusion is premature.",
      "ko": "의미 검색이 키워드 검색을 쓸모없게 만든다고 가정하고 싶은 유혹이 있지만, 그 결론은 시기상조이다."
    },
    {
      "en": "When users search for an exact product code, a legal citation, or a precise error string, traditional keyword indexes remain faster, cheaper, and more reliably exact than any embedding model.",
      "ko": "사용자가 정확한 제품 코드, 법률 인용, 또는 정밀한 오류 문자열을 검색할 때, 전통적인 키워드 인덱스는 어떤 임베딩 모델보다 더 빠르고, 더 저렴하며, 더 안정적으로 정확하게 남아 있다."
    },
    {
      "en": "For this reason, the strongest deployments increasingly adopt a hybrid retrieval strategy, blending keyword matching with vector similarity and reranking the merged results.",
      "ko": "이러한 이유로 가장 강력한 배포는 점점 더 키워드 일치와 벡터 유사성을 결합하고 병합된 결과를 재순위화하는 혼합 검색 전략을 채택한다."
    },
    {
      "en": "The recommendation, accordingly, is not to chase the newest paradigm wholesale, but to match the retrieval method to the query patterns the application actually receives.",
      "ko": "따라서 권고 사항은 가장 새로운 패러다임을 통째로 좇는 것이 아니라, 애플리케이션이 실제로 받는 질의 패턴에 검색 방식을 맞추는 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-vectordb-q1",
      "prompt": "What is the primary purpose of this technical brief?",
      "promptKo": "이 기술 브리프의 주된 목적은 무엇인가?",
      "choices": [
        "To argue that keyword search should be abandoned immediately.",
        "To provide a balanced assessment of when vector databases help and when keyword search still suffices.",
        "To explain how to reduce GPU costs to zero.",
        "To promote a single vendor's vector database product."
      ],
      "choicesKo": [
        "키워드 검색을 즉시 폐기해야 한다고 주장하기 위해.",
        "벡터 데이터베이스가 언제 유용하고 언제 키워드 검색이 여전히 충분한지에 대한 균형 잡힌 평가를 제공하기 위해.",
        "GPU 비용을 0으로 줄이는 방법을 설명하기 위해.",
        "특정 공급업체의 벡터 데이터베이스 제품을 홍보하기 위해."
      ],
      "answerIndex": 1,
      "explanation": "첫 문장에서 벡터 데이터베이스 도입을 \"evaluates\"한다고 밝히고, 장점과 비용을 모두 다룬 뒤 마지막 문장에서 \"match the retrieval method to the query patterns\"를 권고하므로, 균형 잡힌 평가가 목적이다. 따라서 정답은 2번이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-vectordb-q2",
      "prompt": "According to the brief, why must teams tune the precision-recall balance?",
      "promptKo": "브리프에 따르면, 팀이 정밀도-재현율 균형을 조정해야 하는 이유는 무엇인가?",
      "choices": [
        "Because approximate nearest-neighbor search can silently drop relevant results.",
        "Because keyword search is incapable of exact matching.",
        "Because embeddings never need to be rebuilt.",
        "Because GPUs are always idle during indexing."
      ],
      "choicesKo": [
        "근사 최근접 이웃 검색이 관련 결과를 조용히 누락시킬 수 있기 때문에.",
        "키워드 검색이 정확한 일치를 할 수 없기 때문에.",
        "임베딩은 결코 재구축될 필요가 없기 때문에.",
        "인덱싱 중 GPU는 항상 유휴 상태이기 때문에."
      ],
      "answerIndex": 0,
      "explanation": "여섯 번째 문장에서 근사 최근접 이웃 검색이 속도를 위해 재현율을 희생하므로 팀이 \"to avoid silently dropping relevant results\" 균형을 조정해야 한다고 명시한다. 따라서 정답은 1번이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-vectordb-q3",
      "prompt": "What can be inferred about an application that mostly handles searches for exact product codes?",
      "promptKo": "주로 정확한 제품 코드 검색을 처리하는 애플리케이션에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "It will always return irrelevant results.",
        "It must abandon keyword indexes to remain competitive.",
        "It cannot function without high-dimensional embeddings.",
        "It would gain little from switching fully to vector search and may favor keyword indexes."
      ],
      "choicesKo": [
        "항상 무관한 결과를 반환할 것이다.",
        "경쟁력을 유지하려면 키워드 인덱스를 폐기해야 한다.",
        "고차원 임베딩 없이는 작동할 수 없다.",
        "벡터 검색으로 완전히 전환해도 거의 이득이 없으며 키워드 인덱스를 선호할 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장에서 정확한 제품 코드 등을 검색할 때 \"traditional keyword indexes remain faster, cheaper, and more reliably exact\"라고 하므로, 그런 애플리케이션은 키워드 인덱스를 선호하는 것이 합리적임을 추론할 수 있다. 따라서 정답은 1번이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-vectordb-q4",
      "prompt": "The word \"sober\" in the fourth sentence is closest in meaning to",
      "promptKo": "네 번째 문장의 단어 \"sober\"와 의미가 가장 가까운 것은?",
      "choices": [
        "reckless",
        "cheerful",
        "clear-eyed",
        "hasty"
      ],
      "choicesKo": [
        "무모한",
        "쾌활한",
        "냉철한",
        "성급한"
      ],
      "answerIndex": 2,
      "explanation": "\"several costs deserve sober consideration\"에서 sober는 감정에 휘둘리지 않는 냉철하고 신중한 고려를 뜻하므로 clear-eyed(냉철한)가 가장 가깝다. reckless(무모한)는 반대 의미의 함정이다. 따라서 정답은 2번이다.",
      "category": "동의어"
    }
  ]
}
```
