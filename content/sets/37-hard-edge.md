# Set 37 — HARD — Edge Inference vs. Cloud Inference (Article)

```json
{
  "id": "set-hard-edge",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "As AI workloads expand, companies increasingly weigh whether to run inference on the device itself or in the cloud.",
      "ko": "AI 작업 부하가 늘어나면서, 기업들은 추론을 기기 자체에서 실행할지 아니면 클라우드에서 실행할지를 점점 더 저울질하고 있다."
    },
    {
      "en": "Edge inference processes data locally, cutting latency to a level most users find negligible and keeping sensitive information from ever leaving the device.",
      "ko": "엣지 추론은 데이터를 로컬에서 처리하여 지연 시간을 대부분의 사용자가 미미하다고 느끼는 수준으로 줄이고, 민감한 정보가 기기를 떠나지 않도록 한다."
    },
    {
      "en": "Because nothing is transmitted to a remote server, edge processing also continues to function even when a device temporarily loses its network connection.",
      "ko": "원격 서버로 아무것도 전송되지 않기 때문에, 엣지 처리는 기기가 일시적으로 네트워크 연결을 잃어도 계속 작동한다."
    },
    {
      "en": "However, the limited memory and computing power of phones and sensors restrict the size of the models that can be deployed there.",
      "ko": "그러나 휴대폰과 센서의 제한된 메모리와 연산 능력은 그곳에 배포할 수 있는 모델의 크기를 제한한다."
    },
    {
      "en": "Engineers therefore compress models through techniques such as quantization, which can trim accuracy in exchange for a smaller footprint.",
      "ko": "그래서 엔지니어들은 양자화 같은 기법으로 모델을 압축하는데, 이는 더 작은 용량을 얻는 대가로 정확도를 깎을 수 있다."
    },
    {
      "en": "Cloud inference, by contrast, can host far larger models, but every request must travel across the network, adding delay and exposing data in transit.",
      "ko": "반면에 클라우드 추론은 훨씬 더 큰 모델을 호스팅할 수 있지만, 모든 요청이 네트워크를 거쳐야 하므로 지연이 추가되고 전송 중 데이터가 노출된다."
    },
    {
      "en": "The cloud also concentrates expensive hardware in one place, letting providers upgrade it for everyone at once rather than shipping new chips to millions of devices.",
      "ko": "또한 클라우드는 값비싼 하드웨어를 한 곳에 집중시켜, 수백만 대의 기기에 새 칩을 배송하는 대신 제공업체가 모두를 위해 한 번에 그것을 업그레이드할 수 있게 한다."
    },
    {
      "en": "Yet relying on a distant data center introduces a single point of failure: an outage there can disable the feature for every user simultaneously.",
      "ko": "그러나 멀리 떨어진 데이터 센터에 의존하는 것은 단일 장애 지점을 만든다. 그곳의 장애는 모든 사용자에게서 그 기능을 동시에 마비시킬 수 있다."
    },
    {
      "en": "Regulators in some regions further complicate the choice by requiring that certain personal data never be sent beyond national borders.",
      "ko": "일부 지역의 규제 당국은 특정 개인 데이터가 국경 밖으로 절대 전송되지 않도록 요구함으로써 이 선택을 한층 더 복잡하게 만든다."
    },
    {
      "en": "For these reasons, many firms now adopt a hybrid approach, handling routine tasks on the edge while routing only the most demanding queries to the cloud.",
      "ko": "이러한 이유로 많은 기업들이 이제 일상적인 작업은 엣지에서 처리하고 가장 까다로운 질의만 클라우드로 보내는 하이브리드 방식을 채택하고 있다."
    },
    {
      "en": "Such designs aim to deliver the speed and privacy of local processing while preserving access to the cloud's greater capacity when it is truly needed.",
      "ko": "이러한 설계는 로컬 처리의 속도와 프라이버시를 제공하면서도, 정말로 필요할 때는 클라우드의 더 큰 용량에 대한 접근성을 유지하는 것을 목표로 한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-edge-q1",
      "prompt": "What is the main purpose of the article?",
      "promptKo": "이 기사의 주된 목적은 무엇인가?",
      "choices": [
        "To announce a new device released by a technology firm",
        "To compare the trade-offs of running AI inference on the edge versus in the cloud",
        "To criticize companies for collecting too much user data",
        "To explain how to reduce the cost of cloud storage"
      ],
      "choicesKo": [
        "한 기술 회사가 출시한 새 기기를 발표하려고",
        "엣지에서 AI 추론을 실행하는 것과 클라우드에서 실행하는 것의 장단점을 비교하려고",
        "너무 많은 사용자 데이터를 수집하는 기업들을 비판하려고",
        "클라우드 저장 비용을 줄이는 방법을 설명하려고"
      ],
      "answerIndex": 1,
      "explanation": "지문 전반에 걸쳐 엣지 추론과 클라우드 추론의 장점과 단점(지연, 프라이버시, 모델 크기, 장애 지점)을 나란히 비교하고 마지막에 하이브리드로 절충한다고 정리하므로, 두 방식의 장단점 비교가 주제인 (나)=1이 정답이다. 신제품 발표·기업 비판·저장 비용 절감은 본문 주제가 아니므로 (가),(다),(라)는 오답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-edge-q2",
      "prompt": "According to the article, what is one drawback of relying on cloud inference?",
      "promptKo": "기사에 따르면, 클라우드 추론에 의존하는 것의 한 가지 단점은 무엇인가?",
      "choices": [
        "It can only run very small models.",
        "It works even without any network connection.",
        "It keeps all data permanently on the user's device.",
        "An outage at the data center can disable the feature for all users at once."
      ],
      "choicesKo": [
        "매우 작은 모델만 실행할 수 있다.",
        "네트워크 연결 없이도 작동한다.",
        "모든 데이터를 사용자의 기기에 영구적으로 보관한다.",
        "데이터 센터의 장애가 모든 사용자에게서 기능을 한꺼번에 마비시킬 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장에서 멀리 떨어진 데이터 센터 의존이 단일 장애 지점을 만들어 장애 시 모든 사용자의 기능이 동시에 마비될 수 있다고(an outage there can disable the feature for every user simultaneously) 했으므로 정답은 (라)=3이다. 큰 모델을 호스팅할 수 있고(가 오답), 네트워크 없이 작동하는 것은 엣지의 특성(나 오답), 기기 보관도 엣지의 특성(라 오답)이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-edge-q3",
      "prompt": "What can be inferred about why companies adopt a hybrid approach?",
      "promptKo": "기업들이 하이브리드 방식을 채택하는 이유에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "Edge devices can run any size of model without limitations.",
        "Cloud inference is always faster than edge inference.",
        "Neither approach alone satisfies all needs for speed, privacy, and model capacity.",
        "Hybrid systems eliminate the need for network connections entirely."
      ],
      "choicesKo": [
        "엣지 기기는 제한 없이 어떤 크기의 모델이든 실행할 수 있기 때문에",
        "클라우드 추론이 엣지 추론보다 항상 더 빠르기 때문에",
        "어느 한 방식만으로는 속도, 프라이버시, 모델 용량에 대한 모든 요구를 충족할 수 없기 때문에",
        "하이브리드 시스템이 네트워크 연결의 필요성을 완전히 없애기 때문에"
      ],
      "answerIndex": 2,
      "explanation": "엣지는 빠르고 프라이버시를 지키지만 모델 크기가 제한되고, 클라우드는 큰 모델을 쓸 수 있지만 지연·데이터 노출·단일 장애 지점이 있다고 했다. 하이브리드는 일상 작업은 엣지, 까다로운 질의는 클라우드로 처리한다고 하므로, 어느 한 방식도 단독으로 모든 요구를 충족하지 못한다는 (다)=2을 추론할 수 있다. 나머지는 본문과 모순되므로 오답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-edge-q4",
      "prompt": "The word \"negligible\" in the article is closest in meaning to",
      "promptKo": "기사에서 단어 \"negligible\"과 의미가 가장 가까운 것은?",
      "choices": [
        "insignificant",
        "noticeable",
        "unavoidable",
        "expensive"
      ],
      "choicesKo": [
        "사소한",
        "눈에 띄는",
        "피할 수 없는",
        "비싼"
      ],
      "answerIndex": 0,
      "explanation": "\"negligible\"은 무시해도 될 만큼 작다는 뜻으로, 엣지 추론이 지연 시간을 사용자가 거의 느끼지 못할 정도로 줄인다는 맥락에서 쓰였다. 따라서 '미미한, 사소한'을 뜻하는 insignificant인 (가)=0이 정답이다. 정반대 의미인 '눈에 띄는(noticeable)' (나)는 함정 선택지이다.",
      "category": "동의어"
    }
  ]
}
```
