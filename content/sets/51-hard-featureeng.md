# Set 51 — HARD — Feature Engineering vs. Deep Learning (Internal Report)

```json
{
  "id": "set-hard-featureeng",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This report summarizes a six-week benchmarking study commissioned by the Analytics Platform group to determine whether our churn-prediction pipeline would benefit from migrating to a deep neural network.",
      "ko": "이 보고서는 우리의 이탈 예측 파이프라인이 심층 신경망으로 이전함으로써 이득을 볼 수 있을지 판단하기 위해 분석 플랫폼 그룹이 의뢰한 6주간의 벤치마킹 연구를 요약한다."
    },
    {
      "en": "The incumbent system is a gradient-boosted tree model trained on roughly two hundred hand-crafted features derived from billing, usage, and support-ticket records.",
      "ko": "기존 시스템은 청구, 사용량, 그리고 지원 티켓 기록에서 도출된 약 200개의 수작업 특징(피처)으로 학습된 그래디언트 부스팅 트리 모델이다."
    },
    {
      "en": "The challenger was a multi-layer deep-learning model intended to learn representations directly from raw tabular inputs, reducing reliance on manual feature design.",
      "ko": "도전자는 원시 표 형식 입력으로부터 직접 표현을 학습하여 수작업 특징 설계에 대한 의존을 줄이려는 목적의 다층 딥러닝 모델이었다."
    },
    {
      "en": "On the held-out test set, the deep model achieved an AUC of 0.871, while the refined tree model reached 0.869, a difference well within the margin of statistical noise.",
      "ko": "보류된 테스트 세트에서 딥러닝 모델은 0.871의 AUC를 달성한 반면, 정교하게 다듬어진 트리 모델은 0.869에 도달했는데, 이는 통계적 잡음의 범위 내에 충분히 들어가는 차이였다."
    },
    {
      "en": "When we invested an additional week in engineering interaction features for the tree model, its AUC edged ahead to 0.876.",
      "ko": "우리가 트리 모델을 위한 상호작용 특징을 설계하는 데 추가로 일주일을 투자했을 때, 그 AUC는 0.876으로 근소하게 앞섰다."
    },
    {
      "en": "The cost profiles, however, diverged sharply: training the deep model required eleven hours on a dedicated GPU cluster, whereas the tree model trained in under forty minutes on a single commodity server.",
      "ko": "그러나 비용 프로필은 뚜렷하게 갈렸다. 딥러닝 모델 학습은 전용 GPU 클러스터에서 11시간이 필요했던 반면, 트리 모델은 단일 범용 서버에서 40분 이내에 학습되었다."
    },
    {
      "en": "Equally important for our regulated environment, the tree model offered transparent feature-importance scores that compliance reviewers could readily interpret and audit.",
      "ko": "규제를 받는 우리 환경에서 똑같이 중요한 점으로, 트리 모델은 컴플라이언스 검토자들이 손쉽게 해석하고 감사할 수 있는 투명한 특징 중요도 점수를 제공했다."
    },
    {
      "en": "The deep model, by contrast, behaved as a near-opaque function, and the explanations we generated for it were neither stable nor convincing to auditors.",
      "ko": "이와 대조적으로 딥러닝 모델은 거의 불투명한 함수처럼 작동했으며, 우리가 그에 대해 생성한 설명들은 안정적이지도 않았고 감사자들에게 설득력이 있지도 않았다."
    },
    {
      "en": "We do not claim that deep learning is inferior in general; on high-dimensional unstructured data such as text or images its advantages are well documented.",
      "ko": "우리는 딥러닝이 일반적으로 열등하다고 주장하지 않는다. 텍스트나 이미지 같은 고차원 비정형 데이터에서는 그 장점이 잘 입증되어 있다."
    },
    {
      "en": "For our moderate-sized tabular problem, however, the evidence indicates that disciplined feature engineering remains the more prudent choice.",
      "ko": "그러나 우리의 중간 규모 표 형식 문제에 대해서는, 체계적인 특징 공학이 여전히 더 신중한 선택임을 증거가 가리킨다."
    },
    {
      "en": "We therefore recommend retaining the tree-based pipeline and reallocating the proposed GPU budget toward improving data quality and feature coverage.",
      "ko": "따라서 우리는 트리 기반 파이프라인을 유지하고 제안된 GPU 예산을 데이터 품질과 특징 적용 범위 개선 쪽으로 재배분할 것을 권고한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-featureeng-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that the deep-learning model will replace the existing pipeline",
        "To request additional GPU hardware for the analytics team",
        "To present a benchmark and recommend whether to migrate the churn pipeline to deep learning",
        "To document a data breach in the support-ticket system"
      ],
      "choicesKo": [
        "딥러닝 모델이 기존 파이프라인을 대체할 것임을 발표하기 위해",
        "분석 팀을 위한 추가 GPU 하드웨어를 요청하기 위해",
        "벤치마크를 제시하고 이탈 예측 파이프라인을 딥러닝으로 이전할지 권고하기 위해",
        "지원 티켓 시스템의 데이터 유출을 문서화하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "첫 문장 'to determine whether our churn-prediction pipeline would benefit from migrating to a deep neural network'와 마지막 권고('we therefore recommend retaining the tree-based pipeline')가 보고서의 목적이 벤치마크 제시와 이전 여부 권고임을 보여준다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-featureeng-q2",
      "prompt": "What was the difference in training cost between the two models?",
      "promptKo": "두 모델 간 학습 비용의 차이는 무엇이었는가?",
      "choices": [
        "The deep model needed eleven hours on a GPU cluster, while the tree model trained in under forty minutes on a single commodity server",
        "Both trained in under forty minutes on the same server",
        "The tree model required a dedicated GPU cluster for eleven hours",
        "Neither model's training time was measured in the study"
      ],
      "choicesKo": [
        "딥러닝 모델은 GPU 클러스터에서 11시간이 필요했고, 트리 모델은 단일 범용 서버에서 40분 이내에 학습되었다",
        "둘 다 같은 서버에서 40분 이내에 학습되었다",
        "트리 모델은 11시간 동안 전용 GPU 클러스터가 필요했다",
        "연구에서 어느 모델의 학습 시간도 측정되지 않았다"
      ],
      "answerIndex": 0,
      "explanation": "'training the deep model required eleven hours on a dedicated GPU cluster, whereas the tree model trained in under forty minutes on a single commodity server.' 문장이 비용 차이를 직접 진술한다. (3)은 클러스터 사용 주체를 뒤바꾼 함정이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-featureeng-q3",
      "prompt": "What can be inferred about the authors' view of deep learning?",
      "promptKo": "딥러닝에 대한 저자들의 견해에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They consider deep learning useless for all business problems",
        "They view deep learning as context-dependent, advantageous for unstructured data but not justified for this tabular task",
        "They believe accuracy is the only factor that should drive the decision",
        "They recommend deep learning despite its higher cost"
      ],
      "choicesKo": [
        "그들은 딥러닝이 모든 비즈니스 문제에 쓸모없다고 여긴다",
        "그들은 딥러닝을 맥락 의존적인 것으로 보며, 비정형 데이터에는 유리하지만 이 표 형식 과제에는 정당화되지 않는다고 본다",
        "그들은 정확도가 결정을 좌우해야 할 유일한 요소라고 믿는다",
        "그들은 더 높은 비용에도 불구하고 딥러닝을 권고한다"
      ],
      "answerIndex": 1,
      "explanation": "'We do not claim that deep learning is inferior in general; on high-dimensional unstructured data such as text or images its advantages are well documented.'와 'For our moderate-sized tabular problem... feature engineering remains the more prudent choice.'를 종합하면, 저자들은 딥러닝의 가치가 맥락에 따라 달라진다고 본다는 것을 추론할 수 있다. (1)은 'inferior in general'을 부정한 부분과 모순된다.",
      "category": "추론"
    },
    {
      "id": "set-hard-featureeng-q4",
      "prompt": "In the report, the word \"transparent\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"transparent\"와 의미가 가장 가까운 것은?",
      "choices": [
        "temporary",
        "obscure",
        "expensive",
        "interpretable"
      ],
      "choicesKo": [
        "일시적인",
        "불분명한",
        "비싼",
        "해석 가능한"
      ],
      "answerIndex": 3,
      "explanation": "'the tree model offered transparent feature-importance scores that compliance reviewers could readily interpret and audit'에서 transparent는 쉽게 해석·감사할 수 있다는 맥락이므로 'interpretable'이 정답이다. 'obscure(불분명한)'는 정반대 의미이며, 다음 문장의 'near-opaque(거의 불투명한)' 딥러닝 모델 묘사와 대비되는 오답 함정이다.",
      "category": "동의어"
    }
  ]
}
```
