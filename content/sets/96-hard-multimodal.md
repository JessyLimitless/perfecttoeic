# Set 96 — HARD — Multimodal Models (Article)

```json
{
  "id": "set-hard-multimodal",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "When Models Learn to See and Read at Once",
      "ko": "모델이 보는 것과 읽는 것을 동시에 배울 때"
    },
    {
      "en": "For most of the past decade, machine-learning systems specialized narrowly in a single type of input.",
      "ko": "지난 10년의 대부분 동안, 머신러닝 시스템은 단일 유형의 입력에 좁게 특화되어 있었다."
    },
    {
      "en": "One model would parse text, another would classify photographs, and the two rarely shared a common representation.",
      "ko": "한 모델은 텍스트를 분석하고, 다른 모델은 사진을 분류했으며, 그 둘은 좀처럼 공통의 표현을 공유하지 않았다."
    },
    {
      "en": "Multimodal models break this separation by processing text and images together within a single architecture.",
      "ko": "멀티모달 모델은 텍스트와 이미지를 하나의 아키텍처 안에서 함께 처리함으로써 이 분리를 허문다."
    },
    {
      "en": "The central idea is to map both kinds of input into a shared embedding space where related concepts sit close together.",
      "ko": "핵심 아이디어는 두 종류의 입력을 모두, 관련된 개념들이 서로 가까이 위치하는 공유 임베딩 공간에 사상하는 것이다."
    },
    {
      "en": "In that space, the phrase \"a red bicycle\" and a photograph of one end up near each other despite their different formats.",
      "ko": "그 공간에서 \"빨간 자전거\"라는 구절과 그것의 사진은 형식이 다름에도 불구하고 서로 가까이 자리하게 된다."
    },
    {
      "en": "This alignment enables tasks that were previously awkward, such as searching a photo library with a plain-language description.",
      "ko": "이러한 정렬은 평이한 언어로 된 설명으로 사진 라이브러리를 검색하는 것처럼 이전에는 까다로웠던 작업들을 가능하게 한다."
    },
    {
      "en": "It also powers systems that generate a written caption for an unfamiliar image or answer questions about a chart.",
      "ko": "그것은 또한 낯선 이미지에 대한 글로 된 캡션을 생성하거나 차트에 관한 질문에 답하는 시스템을 구동한다."
    },
    {
      "en": "Training such models, however, demands enormous paired datasets in which each image is accompanied by descriptive text.",
      "ko": "그러나 그러한 모델을 훈련하려면 각 이미지가 설명적인 텍스트와 짝지어진 방대한 쌍 데이터셋이 필요하다."
    },
    {
      "en": "Because much of this text is scraped from the web, the models can absorb the biases and errors embedded in their sources.",
      "ko": "이 텍스트의 상당 부분이 웹에서 수집되기 때문에, 모델은 그 출처에 내재된 편향과 오류를 흡수할 수 있다."
    },
    {
      "en": "Practitioners therefore audit outputs carefully and curate cleaner training corpora wherever the budget allows.",
      "ko": "따라서 실무자들은 출력을 신중하게 감사하고 예산이 허락하는 한 더 깨끗한 훈련 말뭉치를 선별한다."
    },
    {
      "en": "Even with these caveats, the ability to reason across modalities marks one of the most significant shifts in recent applied research.",
      "ko": "이러한 주의 사항에도 불구하고, 여러 양식을 넘나들며 추론하는 능력은 최근 응용 연구에서 가장 중대한 변화 중 하나로 꼽힌다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-multimodal-q1",
      "prompt": "What is the main topic of the article?",
      "promptKo": "이 기사의 주된 주제는 무엇인가?",
      "choices": [
        "The decline of text-only search engines",
        "A new method for compressing photographs",
        "How multimodal models combine text and images",
        "Why image datasets should be kept secret"
      ],
      "choicesKo": [
        "텍스트 전용 검색 엔진의 쇠퇴",
        "사진을 압축하는 새로운 방법",
        "멀티모달 모델이 텍스트와 이미지를 결합하는 방식",
        "이미지 데이터셋을 비밀로 유지해야 하는 이유"
      ],
      "answerIndex": 2,
      "explanation": "기사는 멀티모달 모델이 텍스트와 이미지를 하나의 아키텍처에서 함께 처리하고 공유 임베딩 공간에 사상하는 방식을 설명한다. 따라서 (다)가 정답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-multimodal-q2",
      "prompt": "According to the article, what does training a multimodal model require?",
      "promptKo": "기사에 따르면, 멀티모달 모델을 훈련하는 데 무엇이 필요한가?",
      "choices": [
        "A single image with no accompanying text",
        "Only hand-drawn illustrations",
        "Exclusively audio recordings",
        "Large paired datasets of images and descriptive text"
      ],
      "choicesKo": [
        "동반 텍스트가 없는 단 하나의 이미지",
        "손으로 그린 삽화만",
        "오직 오디오 녹음만",
        "이미지와 설명 텍스트로 이루어진 방대한 쌍 데이터셋"
      ],
      "answerIndex": 3,
      "explanation": "본문은 '각 이미지가 설명적인 텍스트와 짝지어진 방대한 쌍 데이터셋이 필요하다'고 명시하므로 (라)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-multimodal-q3",
      "prompt": "What can be inferred about web-scraped training text?",
      "promptKo": "웹에서 수집된 훈련 텍스트에 대해 추론할 수 있는 것은?",
      "choices": [
        "It guarantees the model will be free of errors",
        "It can pass unwanted biases into the model",
        "It eliminates the need for any human review",
        "It is always more accurate than curated data"
      ],
      "choicesKo": [
        "그것은 모델에 오류가 없을 것임을 보장한다",
        "그것은 원치 않는 편향을 모델에 전달할 수 있다",
        "그것은 모든 인간 검토의 필요성을 없앤다",
        "그것은 선별된 데이터보다 항상 더 정확하다"
      ],
      "answerIndex": 1,
      "explanation": "본문은 웹에서 수집된 텍스트 때문에 모델이 출처에 내재된 편향과 오류를 흡수할 수 있다고 했다. 따라서 원치 않는 편향을 전달할 수 있다는 (나)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-multimodal-q4",
      "prompt": "The word \"enormous\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"enormous\"와 의미가 가장 가까운 것은?",
      "choices": [
        "huge",
        "outdated",
        "encrypted",
        "tiny"
      ],
      "choicesKo": [
        "거대한",
        "구식의",
        "암호화된",
        "아주 작은"
      ],
      "answerIndex": 0,
      "explanation": "'enormous'는 '거대한, 방대한'이라는 뜻으로 'huge'와 가장 가깝다. 'tiny(아주 작은)'는 반대 의미의 함정 보기이므로 (가)가 정답이다.",
      "category": "동의어"
    }
  ]
}
```
