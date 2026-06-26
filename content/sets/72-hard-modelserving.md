# Set 72 — HARD — Model Serving & Autoscaling Inference (Notice)

```json
{
  "id": "set-hard-modelserving",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE TO ALL PRODUCT ENGINEERING TEAMS",
      "ko": "전 제품 엔지니어링 팀에 대한 공지"
    },
    {
      "en": "The Inference Platform team is changing how our shared model-serving cluster scales, effective the first of next month.",
      "ko": "추론 플랫폼 팀은 다음 달 1일부터 우리의 공유 모델 서빙 클러스터가 확장되는 방식을 변경합니다."
    },
    {
      "en": "Until now, the cluster has scaled on processor utilization alone, adding capacity whenever average CPU load crossed a fixed line.",
      "ko": "지금까지 클러스터는 프로세서 사용률만으로 확장되어, 평균 CPU 부하가 고정된 선을 넘을 때마다 용량을 추가해 왔습니다."
    },
    {
      "en": "That signal has proven a poor proxy for what users actually experience when traffic to large language models surges.",
      "ko": "그 신호는 대규모 언어 모델로의 트래픽이 급증할 때 사용자가 실제로 겪는 것에 대한 형편없는 대용 지표임이 드러났습니다."
    },
    {
      "en": "Because each request can hold a graphics processor for several seconds while it generates a response, a flood of requests can pile up in the queue long before processor load looks alarming.",
      "ko": "각 요청이 응답을 생성하는 동안 여러 초 동안 그래픽 프로세서를 점유할 수 있기 때문에, 요청의 홍수는 프로세서 부하가 우려스러워 보이기 한참 전에 대기열에 쌓일 수 있습니다."
    },
    {
      "en": "Starting next month, scaling decisions will instead be driven by the number of requests waiting in the queue and by the time the slowest five percent of requests take to complete.",
      "ko": "다음 달부터 확장 결정은 대신 대기열에서 기다리는 요청의 수와 가장 느린 5퍼센트의 요청이 완료되기까지 걸리는 시간에 의해 좌우될 것입니다."
    },
    {
      "en": "When either figure exceeds its target, the platform will add replicas automatically, and it will remove them once demand subsides.",
      "ko": "두 수치 중 하나가 목표치를 초과하면, 플랫폼은 자동으로 복제본을 추가하고, 수요가 가라앉으면 그것들을 제거할 것입니다."
    },
    {
      "en": "Teams should be aware of one unavoidable limitation: spinning up a new replica requires loading multi-gigabyte model weights onto a fresh accelerator, a step that can take ninety seconds or more.",
      "ko": "팀들은 한 가지 불가피한 한계를 알고 있어야 합니다. 새 복제본을 가동하려면 멀티 기가바이트 모델 가중치를 새 가속기에 적재해야 하는데, 이 단계는 90초 이상 걸릴 수 있습니다."
    },
    {
      "en": "During that warm-up window, a sudden spike may still cause brief slowdowns, so the new policy reduces rather than abolishes the risk of congestion.",
      "ko": "그 워밍업 시간 동안, 갑작스러운 급증은 여전히 짧은 지연을 유발할 수 있으므로, 새 정책은 혼잡 위험을 없애기보다는 줄이는 것입니다."
    },
    {
      "en": "To cushion that gap, the platform will keep a small pool of pre-warmed replicas idling in reserve, sized from each service's historical peak traffic.",
      "ko": "그 공백을 완충하기 위해, 플랫폼은 각 서비스의 과거 최대 트래픽을 바탕으로 크기를 정한, 미리 예열된 소수의 복제본 풀을 예비로 유휴 상태로 유지할 것입니다."
    },
    {
      "en": "No action is required from your team to adopt the new behavior, but services with unusual traffic patterns should contact the Inference Platform team before the rollout to have their reserve pool tuned.",
      "ko": "새 동작을 채택하기 위해 여러분 팀이 취해야 할 조치는 없으나, 비정상적인 트래픽 패턴을 가진 서비스는 예비 풀을 조정하기 위해 출시 전에 추론 플랫폼 팀에 연락해야 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-modelserving-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇인가?",
      "choices": [
        "To advertise a new graphics processor available for purchase.",
        "To inform teams that the serving cluster will be shut down permanently.",
        "To request that teams reduce the size of their machine learning models.",
        "To announce a change in how the shared model-serving cluster decides to scale."
      ],
      "choicesKo": [
        "구매 가능한 새 그래픽 프로세서를 광고하기 위해",
        "서빙 클러스터가 영구히 종료될 것임을 팀들에게 알리기 위해",
        "팀들에게 머신러닝 모델의 크기를 줄이도록 요청하기 위해",
        "공유 모델 서빙 클러스터가 확장을 결정하는 방식의 변경을 알리기 위해"
      ],
      "answerIndex": 3,
      "explanation": "공지는 클러스터의 확장(스케일링) 방식이 CPU 사용률에서 대기열·지연 기반으로 바뀐다는 변경을 알리므로 (라)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-modelserving-q2",
      "prompt": "According to the notice, what signals will drive scaling decisions starting next month?",
      "promptKo": "공지에 따르면 다음 달부터 확장 결정을 좌우할 신호는 무엇인가?",
      "choices": [
        "The number of queued requests and the completion time of the slowest five percent of requests.",
        "Average processor utilization alone, as before.",
        "The total electricity cost of the cluster.",
        "The number of engineers assigned to each service."
      ],
      "choicesKo": [
        "대기열에 있는 요청 수와 가장 느린 5퍼센트 요청의 완료 시간",
        "이전과 같이 평균 프로세서 사용률만",
        "클러스터의 총 전기 비용",
        "각 서비스에 배정된 엔지니어 수"
      ],
      "answerIndex": 0,
      "explanation": "본문은 확장 결정이 대기열 요청 수와 가장 느린 5퍼센트 요청의 완료 시간에 의해 좌우된다고 명시하므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-modelserving-q3",
      "prompt": "Why does the platform keep a pool of pre-warmed replicas idling in reserve?",
      "promptKo": "플랫폼이 미리 예열된 복제본 풀을 예비로 유휴 상태로 유지하는 이유는 무엇인가?",
      "choices": [
        "Because idle replicas consume no resources at all.",
        "To cushion the warm-up gap during which a new replica is still loading its weights.",
        "Because customers are billed extra for unused capacity.",
        "To permanently eliminate any possibility of congestion."
      ],
      "choicesKo": [
        "유휴 복제본은 자원을 전혀 소비하지 않기 때문에",
        "새 복제본이 아직 가중치를 적재 중인 워밍업 공백을 완충하기 위해",
        "고객이 미사용 용량에 대해 추가로 청구되기 때문에",
        "혼잡 가능성을 영구히 제거하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "본문은 가중치 적재에 90초 이상 걸리는 워밍업 공백 동안의 지연을 완충하기 위해 예비 풀을 둔다고 했으므로 (나)가 옳은 추론입니다. 정책은 혼잡을 없애지 않고 줄인다고 했으므로 (라)는 오답입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-modelserving-q4",
      "prompt": "In the notice, the word \"subsides\" is closest in meaning to",
      "promptKo": "공지에서 단어 \"subsides\"와 의미가 가장 가까운 것은",
      "choices": [
        "intensifies",
        "repeats",
        "diminishes",
        "stabilizes"
      ],
      "choicesKo": [
        "심해지다",
        "반복되다",
        "줄어들다",
        "안정되다"
      ],
      "answerIndex": 2,
      "explanation": "'it will remove them once demand subsides'에서 'subsides'는 수요가 가라앉아 줄어든다는 뜻이므로 (다) 'diminishes'가 가장 가깝습니다. 반대 의미인 'intensifies(심해지다)'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
