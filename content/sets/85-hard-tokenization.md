# Set 85 — HARD — Tokenization (Article)

```json
{
  "id": "set-hard-tokenization",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "When teams first move a large language model into production, the line item that surprises them most is rarely the hardware — it is the bill measured in tokens.",
      "ko": "팀들이 대규모 언어 모델을 처음 운영 환경으로 옮길 때 가장 놀라게 되는 비용 항목은 좀처럼 하드웨어가 아니라, 토큰 단위로 측정되는 청구서입니다."
    },
    {
      "en": "A token is not a word but a fragment of text — sometimes a whole word, often a syllable, occasionally a single character — that the model treats as its smallest unit of meaning.",
      "ko": "토큰은 단어가 아니라 텍스트의 조각으로서, 때로는 단어 전체이고 흔히는 음절이며 가끔은 한 글자인데, 모델은 이를 의미의 가장 작은 단위로 취급합니다."
    },
    {
      "en": "Because providers charge for both the text sent in and the text generated back, every prompt and every reply quietly accumulates cost in proportion to its token count.",
      "ko": "제공업체는 보내는 텍스트와 되돌려 생성되는 텍스트 양쪽 모두에 요금을 부과하므로, 모든 프롬프트와 모든 응답은 그 토큰 수에 비례하여 조용히 비용을 누적합니다."
    },
    {
      "en": "The trap is that token counts do not map neatly onto the word counts that humans intuitively estimate.",
      "ko": "함정은 토큰 수가 사람이 직관적으로 추정하는 단어 수와 깔끔하게 대응하지 않는다는 점입니다."
    },
    {
      "en": "A common rule of thumb holds that one hundred tokens cover roughly seventy-five English words, but that ratio collapses for code, for rare technical terms, and especially for languages whose scripts the underlying vocabulary was never optimized for.",
      "ko": "흔한 경험 법칙은 토큰 100개가 대략 영어 단어 75개를 감당한다고 보지만, 그 비율은 코드, 드문 기술 용어, 그리고 특히 그 어휘 사전이 애초에 최적화되지 않은 문자 체계를 쓰는 언어들에서는 무너집니다."
    },
    {
      "en": "A sentence in such a language can fragment into two or three times as many tokens as its English equivalent, so the same request silently costs more depending on who is asking and in what tongue.",
      "ko": "그런 언어의 한 문장은 영어 대응 문장보다 두세 배 많은 토큰으로 쪼개질 수 있어, 동일한 요청도 누가 어떤 언어로 묻는가에 따라 조용히 더 비싸집니다."
    },
    {
      "en": "This matters beyond accounting, because every model also has a fixed context window — a ceiling on how many tokens it can consider at once.",
      "ko": "이는 회계 차원을 넘어 중요한데, 모든 모델에는 또한 고정된 컨텍스트 창, 즉 한 번에 고려할 수 있는 토큰 수의 상한이 있기 때문입니다."
    },
    {
      "en": "Pad a prompt with redundant instructions or paste an entire document when a summary would do, and useful content may be pushed past that ceiling and forgotten.",
      "ko": "프롬프트를 중복된 지시로 채우거나 요약이면 충분할 때 문서 전체를 붙여 넣으면, 유용한 내용이 그 상한을 넘어 밀려나 잊힐 수 있습니다."
    },
    {
      "en": "The practical levers are therefore unglamorous: trim boilerplate, retrieve only the passages a query truly needs, and cap the length of generated answers.",
      "ko": "따라서 실질적인 조정 수단들은 화려하지 않습니다. 즉 상용구를 다듬고, 질의가 진정으로 필요로 하는 구절만 가져오며, 생성되는 답변의 길이에 상한을 두는 것입니다."
    },
    {
      "en": "Some teams go further and pre-compute token estimates before a feature ships, treating the count as a budget to design against rather than a number to discover on the invoice.",
      "ko": "어떤 팀들은 한발 더 나아가 기능을 출시하기 전에 토큰 추정치를 미리 계산하여, 그 수치를 청구서에서 발견할 숫자가 아니라 설계의 기준으로 삼을 예산으로 다룹니다."
    },
    {
      "en": "None of this requires deep mathematics, yet teams that ignore tokenization tend to learn its arithmetic the expensive way.",
      "ko": "이 가운데 어느 것도 깊은 수학을 요구하지 않지만, 토큰화를 무시하는 팀들은 그 산수를 값비싼 방식으로 배우는 경향이 있습니다."
    },
    {
      "en": "Treated early as a design constraint, the token becomes less a hidden tax and more a unit teams can plan around with confidence.",
      "ko": "초기에 설계 제약으로 다뤄지면, 토큰은 숨은 세금이라기보다 팀들이 자신 있게 계획을 세울 수 있는 단위가 됩니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-tokenization-q1",
      "prompt": "What is the main idea of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Hardware is the largest and most surprising expense when deploying language models.",
        "Token counts are unpredictable and best handled by switching providers frequently.",
        "Understanding and planning around tokenization is essential to controlling both cost and context limits.",
        "Language models should never be used for languages other than English."
      ],
      "choicesKo": [
        "언어 모델을 배포할 때 하드웨어가 가장 크고 놀라운 비용이다.",
        "토큰 수는 예측 불가능하므로 제공업체를 자주 바꾸어 대응하는 것이 최선이다.",
        "토큰화를 이해하고 그것을 중심으로 계획하는 일은 비용과 컨텍스트 한계를 모두 통제하는 데 필수적이다.",
        "언어 모델은 영어 이외의 언어에는 절대 사용해서는 안 된다."
      ],
      "answerIndex": 2,
      "explanation": "기사는 토큰이 비용과 컨텍스트 창 한계를 좌우하며 이를 설계 제약으로 미리 다뤄야 한다고 일관되게 주장하므로 (다)가 정답입니다. 하드웨어가 가장 큰 비용이라는 (가)는 첫 문장과 정반대입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-tokenization-q2",
      "prompt": "According to the article, why can the same request cost more for one user than another?",
      "promptKo": "기사에 따르면, 왜 동일한 요청이 어떤 사용자에게는 다른 사용자보다 더 비쌀 수 있는가?",
      "choices": [
        "Because providers charge only for the text that is generated, never for the prompt.",
        "Because text in some languages fragments into far more tokens than its English equivalent.",
        "Because the hardware assigned to each user varies by region.",
        "Because longer words always count as fewer tokens than short ones."
      ],
      "choicesKo": [
        "제공업체는 생성된 텍스트에만 요금을 부과하고 프롬프트에는 결코 부과하지 않기 때문이다.",
        "어떤 언어의 텍스트는 영어 대응 문장보다 훨씬 많은 토큰으로 쪼개지기 때문이다.",
        "각 사용자에게 배정되는 하드웨어가 지역마다 다르기 때문이다.",
        "긴 단어는 항상 짧은 단어보다 더 적은 토큰으로 계산되기 때문이다."
      ],
      "answerIndex": 1,
      "explanation": "본문 'A sentence in such a language can fragment into two or three times as many tokens ... the same request silently costs more'에서 근거가 명시되므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-tokenization-q3",
      "prompt": "What can be inferred about teams that ignore tokenization?",
      "promptKo": "토큰화를 무시하는 팀들에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "They consistently produce higher-quality model outputs.",
        "They reduce expenses by sending longer prompts.",
        "They never reach the limits of the context window.",
        "They are likely to face avoidable costs and dropped content that planning would have prevented."
      ],
      "choicesKo": [
        "그들은 일관되게 더 높은 품질의 모델 출력을 만들어 낸다.",
        "그들은 더 긴 프롬프트를 보냄으로써 비용을 줄인다.",
        "그들은 컨텍스트 창의 한계에 결코 도달하지 않는다.",
        "그들은 계획을 세웠다면 막을 수 있었을 불필요한 비용과 누락된 내용에 직면하기 쉽다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 토큰화를 무시하면 비용을 '값비싼 방식으로' 배우고 내용이 상한을 넘어 잊힌다고 했으므로, 막을 수 있던 비용과 누락을 겪는다는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-tokenization-q4",
      "prompt": "In the article, the word \"trim\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"trim\"과 의미가 가장 가까운 것은",
      "choices": [
        "reduce",
        "ignore",
        "translate",
        "expand"
      ],
      "choicesKo": [
        "줄이다",
        "무시하다",
        "번역하다",
        "확장하다"
      ],
      "answerIndex": 0,
      "explanation": "'trim boilerplate'는 상용구를 덜어내 줄인다는 뜻이므로 'reduce'가 가장 가깝습니다. 반대 의미인 'expand'(확장하다)는 오답입니다. 정답은 (가)입니다.",
      "category": "동의어"
    }
  ]
}
```
