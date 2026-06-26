# Set 84 — HARD — Hallucination & Grounding (Article)

```json
{
  "id": "set-hard-hallucination",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Anyone who has used a large language model for long has met the unsettling moment when it answers a question with total confidence and is simply wrong.",
      "ko": "대형 언어 모델을 오래 사용해 본 사람이라면, 그것이 완전한 확신을 가지고 질문에 답하지만 그저 틀린, 불안한 순간을 마주한 적이 있습니다."
    },
    {
      "en": "These fabrications are commonly called hallucinations, and they are not occasional glitches so much as a predictable side effect of how the models work.",
      "ko": "이러한 날조는 흔히 환각이라 불리며, 가끔 일어나는 결함이라기보다는 그 모델들이 작동하는 방식의 예측 가능한 부작용입니다."
    },
    {
      "en": "A model is trained to produce text that is plausible, fluent, and statistically likely, not text that is verified against any source of truth.",
      "ko": "모델은 어떤 진실의 원천에 비추어 검증된 텍스트가 아니라, 그럴듯하고 유창하며 통계적으로 가능성 높은 텍스트를 만들어 내도록 훈련됩니다."
    },
    {
      "en": "When the answer happens to be correct, that is largely because correct statements were common in the training data, not because the model consulted a fact.",
      "ko": "답이 마침 옳을 때, 그것은 대체로 옳은 진술이 훈련 데이터에 흔했기 때문이지 모델이 어떤 사실을 참조했기 때문이 아닙니다."
    },
    {
      "en": "Trouble arises precisely when a question wanders into territory the training data covered thinly or not at all.",
      "ko": "문제는 질문이 훈련 데이터가 빈약하게 다루었거나 전혀 다루지 않은 영역으로 들어설 때 바로 발생합니다."
    },
    {
      "en": "Lacking the information, the model does not fall silent; it confidently invents something that fits the shape of a good answer.",
      "ko": "정보가 없을 때 모델은 침묵하지 않습니다. 좋은 답의 형태에 들어맞는 무언가를 자신 있게 지어냅니다."
    },
    {
      "en": "The most effective remedy in practice is grounding, which means supplying the model with relevant source documents at the moment it answers.",
      "ko": "실제로 가장 효과적인 해결책은 그라운딩으로, 이는 모델이 답하는 바로 그 순간에 관련 원본 문서를 제공하는 것을 의미합니다."
    },
    {
      "en": "Instead of drawing solely on its parameters, the model is asked to read the supplied passages and base its reply on them, with citations pointing back to the text.",
      "ko": "오직 자신의 매개변수에만 의존하는 대신, 모델은 제공된 구절을 읽고 그것에 근거해 답하되, 본문을 가리키는 인용을 함께 달도록 요청받습니다."
    },
    {
      "en": "Grounding does not abolish the problem, since a model can still misread a document or stitch together passages that do not belong together.",
      "ko": "그라운딩이 문제를 없애지는 못하는데, 모델이 여전히 문서를 잘못 읽거나 서로 어울리지 않는 구절들을 꿰맞출 수 있기 때문입니다."
    },
    {
      "en": "But citations at least give a human reader a fighting chance to check the claim against the cited passage rather than taking it on faith.",
      "ko": "그러나 적어도 인용은 인간 독자에게 주장을 믿음으로 받아들이는 대신 인용된 구절에 비추어 확인할 싸울 기회를 줍니다."
    },
    {
      "en": "The deeper lesson is that fluency should never be mistaken for reliability.",
      "ko": "더 깊은 교훈은 유창함이 결코 신뢰성으로 오인되어서는 안 된다는 것입니다."
    },
    {
      "en": "A sentence that reads smoothly carries no guarantee that it is true, and any serious deployment must be engineered around that uncomfortable fact.",
      "ko": "매끄럽게 읽히는 문장이 그것이 참이라는 어떤 보장도 담고 있지 않으며, 진지한 어떤 배포도 그 불편한 사실을 중심으로 설계되어야 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-hallucination-q1",
      "prompt": "What is the main idea of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Hallucinations are a predictable side effect of how models work, and grounding helps but does not fully solve them.",
        "Language models always verify their answers against trusted sources.",
        "Hallucinations are rare bugs that newer models have already eliminated.",
        "Fluent writing is a reliable sign that a statement is true."
      ],
      "choicesKo": [
        "환각은 모델 작동 방식의 예측 가능한 부작용이며, 그라운딩은 도움이 되지만 완전히 해결하지는 못한다.",
        "언어 모델은 항상 신뢰할 수 있는 출처에 비추어 답을 검증한다.",
        "환각은 더 새로운 모델들이 이미 제거한 드문 버그다.",
        "유창한 글쓰기는 진술이 참이라는 믿을 만한 신호다."
      ],
      "answerIndex": 0,
      "explanation": "기사는 환각이 예측 가능한 부작용이며 그라운딩이 도움은 되지만 문제를 없애지는 못한다고 설명하므로 (가)가 정답입니다. 유창함을 신뢰성으로 오인하지 말라는 결론과도 일치합니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-hallucination-q2",
      "prompt": "According to the article, what does grounding mean?",
      "promptKo": "기사에 따르면 그라운딩은 무엇을 의미하는가?",
      "choices": [
        "Retraining the model from scratch on a larger dataset.",
        "Supplying the model with relevant source documents at the moment it answers.",
        "Forcing the model to stay silent when it is uncertain.",
        "Deleting any statements that appear too confident."
      ],
      "choicesKo": [
        "더 큰 데이터셋으로 모델을 처음부터 다시 훈련하는 것",
        "모델이 답하는 순간에 관련 원본 문서를 제공하는 것",
        "모델이 불확실할 때 침묵하도록 강제하는 것",
        "지나치게 확신에 차 보이는 진술을 모두 삭제하는 것"
      ],
      "answerIndex": 1,
      "explanation": "본문 'grounding, which means supplying the model with relevant source documents at the moment it answers'에서 정의가 명시되므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-hallucination-q3",
      "prompt": "What can be inferred about why citations are valuable even though grounding is imperfect?",
      "promptKo": "그라운딩이 불완전함에도 인용이 가치 있는 이유에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They guarantee that the model never misreads a document.",
        "They remove the need for any human review of the output.",
        "They make the model's writing more fluent and persuasive.",
        "They let a human reader verify a claim against the cited passage instead of trusting it blindly."
      ],
      "choicesKo": [
        "모델이 문서를 결코 잘못 읽지 않음을 보장한다.",
        "출력에 대한 어떤 인간 검토의 필요성도 없앤다.",
        "모델의 글을 더 유창하고 설득력 있게 만든다.",
        "인간 독자가 주장을 맹목적으로 믿는 대신 인용된 구절에 비추어 검증하게 해 준다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 인용이 'a fighting chance to check the claim against the cited passage rather than taking it on faith'를 준다고 했으므로, 검증 기회를 제공한다는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-hallucination-q4",
      "prompt": "In the article, the word \"plausible\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"plausible\"과 의미가 가장 가까운 것은",
      "choices": [
        "implausible",
        "verified",
        "believable",
        "tedious"
      ],
      "choicesKo": [
        "믿기 어려운",
        "검증된",
        "그럴듯한",
        "지루한"
      ],
      "answerIndex": 2,
      "explanation": "'text that is plausible, fluent, and statistically likely'에서 'plausible'은 그럴듯하다는 뜻이므로 'believable'이 가장 가깝습니다. 반대 의미인 'implausible'(믿기 어려운)은 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
