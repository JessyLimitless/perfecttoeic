# Set 44 — HARD — Retrieval-Augmented Generation (RAG)

```json
{
  "id": "set-hard-rag",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Large language models have become remarkably fluent, yet their tendency to produce confident but factually incorrect statements—commonly called \"hallucinations\"—has limited their adoption in domains where accuracy is non-negotiable.",
      "ko": "대규모 언어 모델은 놀라울 정도로 유창해졌지만, 자신감 있게 사실과 다른 진술을 만들어 내는 경향—흔히 \"환각\"이라 불리는 현상—때문에 정확성이 타협 불가능한 영역에서의 도입이 제한되어 왔다."
    },
    {
      "en": "Retrieval-augmented generation, or RAG, has emerged as one of the most practical responses to this problem.",
      "ko": "검색 증강 생성, 즉 RAG는 이 문제에 대한 가장 실용적인 대응책 중 하나로 떠올랐다."
    },
    {
      "en": "Rather than relying solely on the static knowledge encoded in a model's parameters, a RAG system first searches an external corpus of documents and then conditions its answer on the passages it retrieves.",
      "ko": "RAG 시스템은 모델의 매개변수에 인코딩된 고정된 지식에만 의존하는 대신, 먼저 외부 문서 집합을 검색한 다음 검색해 온 구절을 바탕으로 답변을 구성한다."
    },
    {
      "en": "Because the response is grounded in concrete source material, RAG can keep answers current without expensive retraining and can cite the evidence on which a claim rests.",
      "ko": "응답이 구체적인 출처 자료에 근거하기 때문에, RAG는 값비싼 재훈련 없이도 답변을 최신 상태로 유지할 수 있고 주장이 기반하는 근거를 인용할 수도 있다."
    },
    {
      "en": "This transparency is especially valuable in regulated settings, where auditors expect every assertion to be traceable.",
      "ko": "이러한 투명성은 감사관이 모든 주장이 추적 가능하기를 기대하는 규제 환경에서 특히 가치가 있다."
    },
    {
      "en": "Nevertheless, grounding the model is not the same as guaranteeing the truth.",
      "ko": "그럼에도 불구하고, 모델을 근거에 기반하게 만드는 것이 진실을 보장하는 것과 같지는 않다."
    },
    {
      "en": "If the retriever surfaces irrelevant or outdated passages, the generator may faithfully summarize the wrong material, and a polished answer can still be misleading.",
      "ko": "검색기가 무관하거나 시대에 뒤떨어진 구절을 끌어올리면, 생성기는 잘못된 자료를 충실히 요약할 수 있으며, 매끄러운 답변이라도 여전히 오해를 불러일으킬 수 있다."
    },
    {
      "en": "Moreover, even when the retrieved evidence is sound, the model can subtly distort it, blending the source with plausible-sounding details that appear nowhere in the documents.",
      "ko": "더욱이, 검색된 근거가 타당할 때조차 모델은 그것을 미묘하게 왜곡하여, 문서 어디에도 등장하지 않는 그럴듯하게 들리는 세부 정보와 출처를 뒤섞을 수 있다."
    },
    {
      "en": "The quality of a RAG system is therefore bounded by the quality of its underlying knowledge base, which must be curated, indexed, and refreshed on a continual basis.",
      "ko": "따라서 RAG 시스템의 품질은 그 바탕이 되는 지식 베이스의 품질에 의해 제약되며, 이 지식 베이스는 지속적으로 선별되고 색인되며 갱신되어야 한다."
    },
    {
      "en": "Teams that treat RAG as a turnkey cure often discover that retrieval failures simply replace the failures they hoped to eliminate.",
      "ko": "RAG를 즉시 작동하는 만능 해결책으로 취급하는 팀은 검색 실패가 자신들이 없애고자 했던 실패를 그저 대체할 뿐임을 종종 깨닫게 된다."
    },
    {
      "en": "Used judiciously—paired with rigorous evaluation, citation checking, and human review for high-stakes outputs—RAG meaningfully reduces hallucinations and broadens where these systems can responsibly be deployed.",
      "ko": "엄격한 평가, 인용 검증, 그리고 중대한 산출물에 대한 인간 검토와 결합하여 신중하게 사용된다면, RAG는 환각을 의미 있게 줄이고 이러한 시스템을 책임감 있게 배치할 수 있는 범위를 넓혀 준다."
    },
    {
      "en": "But it is best understood as a powerful mitigation, not a definitive solution.",
      "ko": "그러나 RAG는 결정적인 해결책이 아니라 강력한 완화책으로 이해하는 것이 가장 적절하다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-rag-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 글의 요점은 무엇인가?",
      "choices": [
        "RAG eliminates the need for language models to be trained at all.",
        "Hallucinations are no longer a concern for modern language models.",
        "Regulated industries should avoid language models entirely.",
        "RAG substantially reduces hallucinations but is a mitigation rather than a complete cure."
      ],
      "choicesKo": [
        "RAG는 언어 모델을 훈련할 필요성을 완전히 없앤다.",
        "환각은 더 이상 현대 언어 모델에서 우려 사항이 아니다.",
        "규제 산업은 언어 모델을 전적으로 피해야 한다.",
        "RAG는 환각을 상당히 줄여 주지만 완전한 치료책이 아니라 완화책이다."
      ],
      "answerIndex": 3,
      "explanation": "마지막 문장 \"But it is best understood as a powerful mitigation, not a definitive solution.\"와 본문 전반의 장단점 서술이 RAG가 환각을 줄이되 완전한 해결책은 아님을 분명히 하므로 정답은 2번이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-rag-q2",
      "prompt": "According to the article, why is RAG's transparency particularly useful in regulated settings?",
      "promptKo": "글에 따르면, RAG의 투명성이 규제 환경에서 특히 유용한 이유는 무엇인가?",
      "choices": [
        "It allows models to be retrained more cheaply.",
        "It removes the need for any human oversight.",
        "Auditors expect every assertion to be traceable to evidence.",
        "It guarantees that every retrieved passage is correct."
      ],
      "choicesKo": [
        "모델을 더 저렴하게 재훈련할 수 있게 해 준다.",
        "어떠한 인간 감독도 필요 없게 만든다.",
        "감사관이 모든 주장이 근거까지 추적 가능하기를 기대하기 때문이다.",
        "검색된 모든 구절이 정확함을 보장하기 때문이다."
      ],
      "answerIndex": 2,
      "explanation": "\"This transparency is especially valuable in regulated settings, where auditors expect every assertion to be traceable.\"에서 감사관이 주장의 추적 가능성을 기대한다고 직접 언급하므로 정답은 3번이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-rag-q3",
      "prompt": "What can be inferred about a team that deploys RAG without curating its knowledge base?",
      "promptKo": "지식 베이스를 선별하지 않고 RAG를 배치하는 팀에 대해 추론할 수 있는 것은?",
      "choices": [
        "It will completely avoid all factual mistakes.",
        "It will likely trade hallucinations for retrieval-driven errors.",
        "It will no longer need to evaluate its system.",
        "It will reduce its overall maintenance burden to zero."
      ],
      "choicesKo": [
        "모든 사실 오류를 완전히 피하게 된다.",
        "환각을 검색에서 비롯된 오류와 맞바꾸게 될 가능성이 크다.",
        "더 이상 시스템을 평가할 필요가 없게 된다.",
        "전체 유지보수 부담을 0으로 줄이게 된다."
      ],
      "answerIndex": 1,
      "explanation": "\"Teams that treat RAG as a turnkey cure often discover that retrieval failures simply replace the failures they hoped to eliminate.\"는 지식 베이스를 관리하지 않으면 환각 대신 검색 실패가 나타남을 시사하므로 정답은 1번이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-rag-q4",
      "prompt": "In the passage, the word \"sound\" is closest in meaning to",
      "promptKo": "지문에서 단어 \"sound\"와 의미상 가장 가까운 것은?",
      "choices": [
        "reliable",
        "audible",
        "flawed",
        "loud"
      ],
      "choicesKo": [
        "신뢰할 수 있는",
        "들리는",
        "결함이 있는",
        "시끄러운"
      ],
      "answerIndex": 0,
      "explanation": "\"even when the retrieved evidence is sound, the model can subtly distort it\"에서 \"sound\"는 근거가 타당하고 믿을 만하다는 뜻이므로 \"reliable\"(신뢰할 수 있는)이 정답이며, \"flawed\"(결함 있는)는 반의어 오답이다.",
      "category": "동의어"
    }
  ]
}
```
