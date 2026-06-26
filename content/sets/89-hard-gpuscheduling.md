# Set 89 — HARD — GPU Scheduling (Report)

```json
{
  "id": "set-hard-gpuscheduling",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Quarterly Infrastructure Review: GPU Scheduling and Sharing for Machine Learning Training",
      "ko": "분기별 인프라 검토: 머신러닝 학습을 위한 GPU 스케줄링 및 공유"
    },
    {
      "en": "This report summarizes the findings of the Platform Engineering team's three-month assessment of how training clusters are allocated across the organization.",
      "ko": "본 보고서는 학습 클러스터가 조직 전반에 어떻게 할당되는지에 대한 플랫폼 엔지니어링 팀의 3개월 평가 결과를 요약한 것이다."
    },
    {
      "en": "At the outset of the period, average GPU utilization across our two primary data centers stood at a disappointing 41 percent, despite frequent complaints that hardware was unavailable.",
      "ko": "평가 기간 초기에 두 주요 데이터센터의 평균 GPU 활용률은 하드웨어가 부족하다는 잦은 불만에도 불구하고 실망스러운 41퍼센트에 머물렀다."
    },
    {
      "en": "Our analysis traced this paradox to a scheduling policy that reserved entire eight-GPU nodes for single jobs, even when those jobs required only a fraction of the available memory.",
      "ko": "우리의 분석은 이 역설의 원인을, 해당 작업이 가용 메모리의 일부만 필요로 할 때조차 단일 작업을 위해 8개 GPU 노드 전체를 예약하던 스케줄링 정책으로 추적했다."
    },
    {
      "en": "To remedy this, we piloted a fractional sharing mechanism that partitions a physical accelerator into several logical slices, allowing multiple lightweight experiments to run concurrently on one card.",
      "ko": "이를 해결하기 위해 우리는 물리적 가속기를 여러 논리적 조각으로 분할하여 여러 경량 실험이 하나의 카드에서 동시에 실행되도록 하는 분할 공유 메커니즘을 시범 운영했다."
    },
    {
      "en": "Concurrently, we introduced a preemption tier so that long-running, low-priority batch jobs could be paused and checkpointed whenever an urgent production retraining task entered the queue.",
      "ko": "이와 동시에, 긴급한 프로덕션 재학습 작업이 대기열에 들어올 때마다 장시간 실행되는 저우선순위 배치 작업을 일시 중지하고 체크포인트를 저장할 수 있도록 선점 계층을 도입했다."
    },
    {
      "en": "After eight weeks under the revised scheme, utilization climbed to 73 percent, while the median time researchers waited for a free slot fell by more than half.",
      "ko": "수정된 방식 하에 8주가 지난 후 활용률은 73퍼센트로 상승했으며, 연구원들이 빈 슬롯을 기다리는 중앙값 시간은 절반 이상 줄어들었다."
    },
    {
      "en": "Not all outcomes were favorable, however; a handful of memory-intensive training runs suffered contention when co-located with other tenants, producing intermittent slowdowns that were difficult to diagnose.",
      "ko": "그러나 모든 결과가 긍정적이었던 것은 아니다. 메모리 집약적인 일부 학습 작업은 다른 사용자와 같은 장소에 배치될 때 경합을 겪었고, 진단하기 어려운 간헐적 속도 저하를 일으켰다."
    },
    {
      "en": "We therefore recommend that jobs exceeding a defined memory threshold be flagged and granted exclusive access to a full accelerator rather than a shared slice.",
      "ko": "따라서 우리는 정의된 메모리 임계값을 초과하는 작업은 표시되어 공유 조각이 아닌 전체 가속기에 대한 독점 접근 권한을 부여받도록 권장한다."
    },
    {
      "en": "Finally, the team proposes establishing a chargeback model in which departments are billed according to the GPU-hours they actually consume.",
      "ko": "마지막으로 본 팀은 부서들이 실제로 소비한 GPU 시간에 따라 비용을 청구받는 차지백 모델 수립을 제안한다."
    },
    {
      "en": "Early modeling suggests such accountability would discourage the practice of holding idle reservations as insurance against future demand.",
      "ko": "초기 모델링은 그러한 책임 부과가 향후 수요에 대비한 보험으로 유휴 예약을 보유하는 관행을 억제할 것임을 시사한다."
    },
    {
      "en": "Pending leadership approval, full rollout is targeted for the beginning of the next fiscal quarter.",
      "ko": "경영진 승인을 조건으로, 전면 배포는 다음 회계 분기 초를 목표로 한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-gpuscheduling-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To request the purchase of additional accelerator hardware for both data centers",
        "To present the results of an effort to improve GPU allocation and recommend further changes",
        "To announce the hiring plan for the Platform Engineering team",
        "To compare the performance of two competing machine learning frameworks"
      ],
      "choicesKo": [
        "두 데이터센터 모두를 위한 추가 가속기 하드웨어 구매를 요청하기 위해",
        "GPU 할당 개선 노력의 결과를 제시하고 추가 변경을 권장하기 위해",
        "플랫폼 엔지니어링 팀의 채용 계획을 발표하기 위해",
        "경쟁하는 두 머신러닝 프레임워크의 성능을 비교하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "보고서는 GPU 스케줄링 평가 결과를 요약하고(활용률 41%→73%) 추가 권장 사항(메모리 임계값 표시, 차지백 모델)을 제시한다. 따라서 (나)가 정답이다. 하드웨어 구매, 채용, 프레임워크 비교는 언급되지 않았다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-gpuscheduling-q2",
      "prompt": "According to the report, what happened to GPU utilization after the revised scheme was applied?",
      "promptKo": "보고서에 따르면, 수정된 방식이 적용된 후 GPU 활용률은 어떻게 되었는가?",
      "choices": [
        "It remained roughly the same as before.",
        "It declined slightly because of contention.",
        "It rose from 41 percent to 73 percent.",
        "It could not be measured reliably."
      ],
      "choicesKo": [
        "이전과 거의 동일하게 유지되었다.",
        "경합 때문에 약간 감소했다.",
        "41퍼센트에서 73퍼센트로 상승했다.",
        "신뢰할 수 있게 측정될 수 없었다."
      ],
      "answerIndex": 2,
      "explanation": "초기 활용률은 41퍼센트였고, 수정 방식 8주 후 73퍼센트로 상승했다고 명시되어 있다. 따라서 (다)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-gpuscheduling-q3",
      "prompt": "What can be inferred about the proposed chargeback model?",
      "promptKo": "제안된 차지백 모델에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It is intended to make teams less likely to hoard unused GPU reservations.",
        "It has already been fully rolled out across all departments.",
        "It is expected to reduce the number of frameworks in use.",
        "It will eliminate the need for any preemption of jobs."
      ],
      "choicesKo": [
        "팀들이 사용하지 않는 GPU 예약을 비축할 가능성을 낮추려는 의도이다.",
        "이미 모든 부서에 전면 배포되었다.",
        "사용 중인 프레임워크의 수를 줄일 것으로 예상된다.",
        "작업 선점의 필요성을 완전히 없앨 것이다."
      ],
      "answerIndex": 0,
      "explanation": "보고서는 차지백 모델이 '향후 수요에 대비한 보험으로 유휴 예약을 보유하는 관행을 억제할 것'이라고 했으므로, 팀들이 미사용 예약을 비축하지 않게 하려는 의도임을 추론할 수 있다. 따라서 (가)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-gpuscheduling-q4",
      "prompt": "The word \"contention\" in the report is closest in meaning to",
      "promptKo": "보고서에서 단어 \"contention\"과 의미가 가장 가까운 것은",
      "choices": [
        "smooth cooperation",
        "permanent storage",
        "formal agreement",
        "competition for shared resources"
      ],
      "choicesKo": [
        "원활한 협력",
        "영구적인 저장",
        "공식적인 합의",
        "공유 자원을 둘러싼 경쟁"
      ],
      "answerIndex": 3,
      "explanation": "여기서 'contention'은 여러 작업이 같은 카드에 배치될 때 자원을 두고 경쟁하며 속도 저하를 일으키는 상황을 가리키므로 '공유 자원을 둘러싼 경쟁'이 가장 가깝다. 따라서 (라)가 정답이다. '원활한 협력'은 거의 반의어다.",
      "category": "동의어"
    }
  ]
}
```
