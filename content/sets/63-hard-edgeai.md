# Set 63 — HARD — Edge AI Inference (Article)

```json
{
  "id": "set-hard-edgeai",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For years the default assumption in machine learning was that serious AI inference belonged in the cloud, where abundant compute could be summoned on demand.",
      "ko": "수년 동안 머신러닝 분야의 기본 가정은, 진지한 AI 추론은 풍부한 연산 능력을 필요할 때 불러올 수 있는 클라우드에 속한다는 것이었습니다."
    },
    {
      "en": "That assumption is now being quietly overturned as companies push inference onto the edge — the phones, cameras, and sensors where data is actually generated.",
      "ko": "그 가정은 기업들이 데이터가 실제로 생성되는 곳인 휴대폰, 카메라, 센서 같은 엣지로 추론을 밀어내면서 이제 조용히 뒤집히고 있습니다."
    },
    {
      "en": "The appeal is easy to understand: running a model locally eliminates the round trip to a distant server, so responses arrive in milliseconds rather than after a perceptible delay.",
      "ko": "그 매력은 이해하기 쉽습니다. 즉, 모델을 로컬에서 실행하면 멀리 떨어진 서버를 왕복할 필요가 없어져, 응답이 감지할 수 있는 지연 후가 아니라 밀리초 단위로 도착합니다."
    },
    {
      "en": "Just as importantly, sensitive data such as faces or medical readings can be processed on the device and never transmitted, which sidesteps a category of privacy risk entirely.",
      "ko": "그에 못지않게 중요한 점은, 얼굴이나 의료 측정값 같은 민감한 데이터가 기기 내에서 처리되어 전송되지 않을 수 있어, 한 부류의 프라이버시 위험을 완전히 피할 수 있다는 것입니다."
    },
    {
      "en": "These advantages, however, come wrapped in a hard constraint that cloud engineers rarely confront.",
      "ko": "그러나 이러한 이점들은 클라우드 엔지니어들이 좀처럼 마주치지 않는 까다로운 제약에 둘러싸여 있습니다."
    },
    {
      "en": "Edge hardware offers only a fraction of the memory and processing power of a data center, so the large models that thrive in the cloud simply will not fit.",
      "ko": "엣지 하드웨어는 데이터센터의 메모리와 처리 능력 중 극히 일부만을 제공하므로, 클라우드에서 잘 작동하는 대형 모델은 그냥 들어맞지 않습니다."
    },
    {
      "en": "To bridge that gap, teams lean on compression techniques such as quantization and pruning, which shrink a model's footprint by trading away a measured amount of accuracy.",
      "ko": "그 격차를 메우기 위해 팀들은 양자화와 가지치기 같은 압축 기법에 의존하는데, 이는 측정된 만큼의 정확도를 내주는 대가로 모델의 용량을 줄여 줍니다."
    },
    {
      "en": "When that trade is managed carefully, the loss is often imperceptible to users, but pushed too far it can hollow out the very capability the model was deployed to provide.",
      "ko": "그 거래가 신중하게 관리되면 손실은 흔히 사용자가 알아차리지 못할 정도지만, 지나치게 밀어붙이면 모델이 제공하도록 배치된 바로 그 능력을 텅 비게 만들 수 있습니다."
    },
    {
      "en": "The thornier problem, many practitioners argue, arrives only after deployment.",
      "ko": "더 까다로운 문제는, 많은 실무자들이 주장하기를, 배치 이후에야 비로소 찾아옵니다."
    },
    {
      "en": "A cloud model can be updated in one place, but a fleet of edge devices may number in the tens of thousands, scattered across locations with intermittent connectivity and varying hardware.",
      "ko": "클라우드 모델은 한곳에서 업데이트할 수 있지만, 엣지 기기의 집합체는 수만 대에 이를 수 있으며, 간헐적인 연결성과 제각각인 하드웨어를 지닌 여러 장소에 흩어져 있습니다."
    },
    {
      "en": "Rolling out a corrected model to all of them without bricking devices or letting versions diverge demands an update pipeline as carefully engineered as the model itself.",
      "ko": "기기를 먹통으로 만들거나 버전이 제각각으로 갈라지게 하지 않으면서 수정된 모델을 그 모든 기기에 배포하는 일은, 모델 자체만큼이나 정교하게 설계된 업데이트 파이프라인을 요구합니다."
    },
    {
      "en": "Edge AI, in short, does not so much remove the difficulties of machine learning as relocate them closer to the user, where the stakes of getting it right are arguably higher.",
      "ko": "요컨대 엣지 AI는 머신러닝의 어려움을 없앤다기보다는, 그것을 제대로 해내는 것의 위험 부담이 거의 틀림없이 더 큰 사용자 가까이로 옮겨 놓는 것에 가깝습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-edgeai-q1",
      "prompt": "What is the article's main argument?",
      "promptKo": "이 기사의 주된 논지는 무엇인가?",
      "choices": [
        "Cloud inference will soon be abandoned in favor of edge devices everywhere.",
        "Edge AI brings real benefits but relocates rather than removes machine learning's hard challenges.",
        "Model compression has no measurable effect on accuracy.",
        "Privacy concerns are the only reason companies move inference to the edge."
      ],
      "choicesKo": [
        "클라우드 추론은 곧 어디서나 엣지 기기로 대체되어 폐기될 것이다.",
        "엣지 AI는 실질적인 이점을 가져오지만 머신러닝의 어려운 과제를 없애기보다는 옮겨 놓는다.",
        "모델 압축은 정확도에 측정 가능한 영향을 미치지 않는다.",
        "프라이버시 우려가 기업들이 추론을 엣지로 옮기는 유일한 이유다."
      ],
      "answerIndex": 1,
      "explanation": "마지막 문장 'Edge AI ... does not so much remove the difficulties of machine learning as relocate them closer to the user'가 핵심 논지로, 어려움을 없애는 것이 아니라 옮긴다는 (나)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-edgeai-q2",
      "prompt": "According to the article, why is sensitive data safer on an edge device?",
      "promptKo": "기사에 따르면 민감한 데이터가 엣지 기기에서 더 안전한 이유는 무엇인가?",
      "choices": [
        "It is encrypted by the distant server before processing.",
        "Edge hardware has more memory than data centers.",
        "Quantization automatically removes all personal information.",
        "It can be processed on the device and never transmitted."
      ],
      "choicesKo": [
        "처리 전에 멀리 떨어진 서버가 그것을 암호화한다.",
        "엣지 하드웨어가 데이터센터보다 메모리가 더 많다.",
        "양자화가 모든 개인 정보를 자동으로 제거한다.",
        "그것이 기기 내에서 처리되어 전혀 전송되지 않을 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "본문 'sensitive data such as faces or medical readings can be processed on the device and never transmitted'에서 기기 내 처리 및 비전송이 이유로 제시되므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-edgeai-q3",
      "prompt": "What can be inferred about applying model compression too aggressively?",
      "promptKo": "모델 압축을 지나치게 공격적으로 적용하는 것에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "It can degrade the model so much that it no longer serves its intended purpose.",
        "It guarantees faster updates across the entire device fleet.",
        "It permanently eliminates the need for an update pipeline.",
        "It increases the memory available on the edge device."
      ],
      "choicesKo": [
        "그것은 모델을 너무 심하게 저하시켜 의도된 목적을 더 이상 수행하지 못하게 할 수 있다.",
        "그것은 전체 기기 집합체에 걸친 더 빠른 업데이트를 보장한다.",
        "그것은 업데이트 파이프라인의 필요성을 영구적으로 없앤다.",
        "그것은 엣지 기기에서 사용 가능한 메모리를 늘린다."
      ],
      "answerIndex": 0,
      "explanation": "본문 'pushed too far it can hollow out the very capability the model was deployed to provide'에서 지나친 압축이 모델의 본래 능력을 텅 비게 만든다고 했으므로, 의도된 목적을 수행하지 못하게 한다는 (가)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-edgeai-q4",
      "prompt": "In the article, the word \"thornier\" near the end is closest in meaning to",
      "promptKo": "기사에서 끝부분의 단어 \"thornier\"와 의미가 가장 가까운 것은",
      "choices": [
        "more affordable",
        "more straightforward",
        "more troublesome",
        "more popular"
      ],
      "choicesKo": [
        "더 저렴한",
        "더 간단한",
        "더 골치 아픈",
        "더 인기 있는"
      ],
      "answerIndex": 2,
      "explanation": "'The thornier problem ... arrives only after deployment'에서 'thornier'는 더 어렵고 까다로운 문제를 가리키므로 'more troublesome'(더 골치 아픈)이 가장 가깝습니다. 'more straightforward'(더 간단한)는 반대 의미의 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
