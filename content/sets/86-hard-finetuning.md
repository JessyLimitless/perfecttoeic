# Set 86 — HARD — Fine-tuning vs. Prompting (Report)

```json
{
  "id": "set-hard-finetuning",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This report summarizes the Applied AI team's three-month evaluation of two competing strategies for adapting a general-purpose language model to our customer-support domain: fine-tuning and prompting.",
      "ko": "본 보고서는 범용 언어 모델을 우리 고객 지원 영역에 맞추기 위한 두 가지 경쟁 전략, 즉 미세 조정과 프롬프팅에 대한 응용 AI 팀의 3개월 평가를 요약합니다."
    },
    {
      "en": "Prompting leaves the model's weights untouched and steers its behavior entirely through carefully written instructions and a handful of worked examples supplied at request time.",
      "ko": "프롬프팅은 모델의 가중치를 건드리지 않은 채로 두고, 요청 시점에 제공되는 신중히 작성된 지시와 소수의 풀이 예시만으로 그 동작을 전적으로 유도합니다."
    },
    {
      "en": "Fine-tuning, by contrast, continues training the model on a curated set of our own examples so that the desired behavior is baked into the weights themselves.",
      "ko": "이와 대조적으로 미세 조정은 우리가 선별한 자체 예시 집합으로 모델을 계속 훈련시켜, 원하는 동작이 가중치 자체에 새겨지도록 합니다."
    },
    {
      "en": "Our first finding was that prompting reached an acceptable quality bar within days, requiring no labeled training data and no specialized infrastructure.",
      "ko": "첫 번째 발견은 프롬프팅이 며칠 만에 수용 가능한 품질 기준에 도달했으며, 라벨링된 훈련 데이터도 전문 인프라도 필요로 하지 않았다는 점입니다."
    },
    {
      "en": "Fine-tuning, however, outperformed prompting on our most repetitive, narrowly scoped tickets, where its responses were both more consistent and noticeably shorter.",
      "ko": "그러나 미세 조정은 가장 반복적이고 범위가 좁은 티켓들에서 프롬프팅을 능가했으며, 그 응답은 더 일관되었을 뿐 아니라 눈에 띄게 더 짧았습니다."
    },
    {
      "en": "That brevity translated directly into lower per-request token costs once the feature was running at scale.",
      "ko": "그 간결함은 기능이 대규모로 운영되자 요청당 토큰 비용의 절감으로 곧장 이어졌습니다."
    },
    {
      "en": "The advantage came at a price: assembling and cleaning the training set consumed nearly six engineer-weeks, and every later change to policy required the model to be retrained and re-evaluated.",
      "ko": "그 이점에는 대가가 따랐습니다. 훈련 집합을 구성하고 정제하는 데 거의 6명-주의 엔지니어 시간이 소요되었고, 정책에 대한 이후의 모든 변경은 모델을 다시 훈련하고 재평가하도록 요구했습니다."
    },
    {
      "en": "Prompting, being editable in seconds, absorbed such policy shifts far more gracefully.",
      "ko": "프롬프팅은 몇 초 만에 편집 가능하여 그러한 정책 변화를 훨씬 더 우아하게 흡수했습니다."
    },
    {
      "en": "We also observed that a fine-tuned model can quietly drift out of date as the surrounding product evolves, since its knowledge is frozen at the moment of training.",
      "ko": "또한 우리는 미세 조정된 모델이 그 지식이 훈련 시점에 동결되어 있기에, 주변 제품이 진화함에 따라 조용히 시대에 뒤떨어질 수 있음을 관찰했습니다."
    },
    {
      "en": "On balance, the team recommends beginning every new use case with prompting and reserving fine-tuning for stable, high-volume tasks whose requirements have stopped changing.",
      "ko": "종합적으로 팀은 모든 새로운 사용 사례를 프롬프팅으로 시작하고, 요구 사항이 더 이상 변하지 않는 안정적이고 대량인 작업에 한해 미세 조정을 남겨 두기를 권고합니다."
    },
    {
      "en": "Treating the two as a sequence rather than a single up-front choice lets us capture quick wins early without forfeiting efficiency later.",
      "ko": "둘을 단일한 사전 선택이 아니라 하나의 순서로 다루면, 우리는 이른 시기에 빠른 성과를 거두면서도 나중의 효율을 포기하지 않을 수 있습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-finetuning-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that fine-tuning will replace prompting for all use cases.",
        "To compare prompting and fine-tuning and recommend how to choose between them.",
        "To document a security incident involving customer-support tickets.",
        "To argue that the team should stop using language models entirely."
      ],
      "choicesKo": [
        "미세 조정이 모든 사용 사례에서 프롬프팅을 대체할 것임을 발표하기 위해",
        "프롬프팅과 미세 조정을 비교하고 둘 사이에서 선택하는 방법을 권고하기 위해",
        "고객 지원 티켓과 관련된 보안 사고를 기록하기 위해",
        "팀이 언어 모델 사용을 완전히 중단해야 한다고 주장하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "보고서는 두 전략을 평가·비교하고 사용 순서를 권고하므로 (나)가 정답입니다. 미세 조정이 모든 경우를 대체한다는 (가)는 권고 내용과 어긋납니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-finetuning-q2",
      "prompt": "According to the report, what was one cost of fine-tuning?",
      "promptKo": "보고서에 따르면 미세 조정의 한 가지 비용은 무엇이었는가?",
      "choices": [
        "It required no labeled training data at all.",
        "It made every response noticeably longer.",
        "It could be edited in seconds whenever policy changed.",
        "Building and cleaning the training set took nearly six engineer-weeks, and policy changes forced retraining."
      ],
      "choicesKo": [
        "그것은 라벨링된 훈련 데이터를 전혀 필요로 하지 않았다.",
        "그것은 모든 응답을 눈에 띄게 더 길게 만들었다.",
        "그것은 정책이 바뀔 때마다 몇 초 만에 편집될 수 있었다.",
        "훈련 집합을 구성·정제하는 데 거의 6명-주가 들었고, 정책 변경은 재훈련을 강제했다."
      ],
      "answerIndex": 3,
      "explanation": "본문 'assembling and cleaning the training set consumed nearly six engineer-weeks, and every later change to policy required the model to be retrained'에서 근거가 명시되므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-finetuning-q3",
      "prompt": "What can be inferred about why the team recommends starting with prompting?",
      "promptKo": "팀이 프롬프팅으로 시작하기를 권고하는 이유에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "Prompting lets teams reach acceptable quality quickly and adapt cheaply before committing to costlier fine-tuning.",
        "Prompting always produces shorter responses than fine-tuning.",
        "Prompting permanently bakes the desired behavior into the model's weights.",
        "Prompting requires a large labeled dataset before it can be used."
      ],
      "choicesKo": [
        "프롬프팅은 더 비싼 미세 조정에 전념하기 전에 빠르게 수용 가능한 품질에 도달하고 저렴하게 적응하게 해 준다.",
        "프롬프팅은 항상 미세 조정보다 더 짧은 응답을 만들어 낸다.",
        "프롬프팅은 원하는 동작을 모델 가중치에 영구적으로 새겨 넣는다.",
        "프롬프팅은 사용되기 전에 대규모 라벨링 데이터셋을 필요로 한다."
      ],
      "answerIndex": 0,
      "explanation": "본문은 프롬프팅이 며칠 만에 품질에 도달하고 정책 변화를 우아하게 흡수한다고 했으므로, 빠르고 저렴하게 시작한다는 (가)가 옳은 추론입니다. 가중치에 새기는 것은 미세 조정의 특징이므로 (다)는 오답입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-finetuning-q4",
      "prompt": "In the report, the word \"brevity\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"brevity\"와 의미가 가장 가까운 것은",
      "choices": [
        "wordiness",
        "delay",
        "shortness",
        "accuracy"
      ],
      "choicesKo": [
        "장황함",
        "지연",
        "간결함",
        "정확성"
      ],
      "answerIndex": 2,
      "explanation": "응답이 'noticeably shorter'했다는 맥락에서 'brevity'는 간결함을 뜻하므로 'shortness'가 가장 가깝습니다. 반대 의미인 'wordiness'(장황함)는 오답입니다. 정답은 (다)입니다.",
      "category": "동의어"
    }
  ]
}
```
