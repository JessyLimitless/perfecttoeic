# Set 94 — HARD — Class Imbalance (Article)

```json
{
  "id": "set-hard-imbalance",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Taming Class Imbalance: A Practical Guide for Data Teams",
      "ko": "클래스 불균형 길들이기: 데이터 팀을 위한 실용 가이드"
    },
    {
      "en": "In many real-world classification problems, the category an organization most wants to detect is also the rarest.",
      "ko": "많은 실제 분류 문제에서, 조직이 가장 탐지하고 싶어 하는 범주가 동시에 가장 드물기도 하다."
    },
    {
      "en": "Fraudulent transactions, equipment failures, and rare diseases may each account for well under one percent of all recorded cases.",
      "ko": "사기 거래, 장비 고장, 그리고 희귀 질환은 각각 전체 기록 사례의 1퍼센트에도 한참 못 미칠 수 있다."
    },
    {
      "en": "When one class vastly outnumbers another, a model can reach high overall accuracy simply by predicting the majority class every time.",
      "ko": "한 클래스가 다른 클래스를 압도적으로 능가할 때, 모델은 단지 매번 다수 클래스를 예측하는 것만으로 높은 전체 정확도에 도달할 수 있다."
    },
    {
      "en": "Such a model looks impressive on paper yet fails at the very task it was built for.",
      "ko": "그러한 모델은 서류상으로는 인상적으로 보이지만 정작 만들어진 목적인 그 과업에서는 실패한다."
    },
    {
      "en": "For this reason, experienced practitioners distrust accuracy as a sole metric and turn instead to precision, recall, and the F1 score.",
      "ko": "이러한 이유로, 숙련된 실무자들은 정확도를 유일한 지표로 신뢰하지 않으며 대신 정밀도, 재현율, 그리고 F1 점수에 의존한다."
    },
    {
      "en": "On the data side, two families of techniques are common: resampling the dataset and reweighting the loss function.",
      "ko": "데이터 측면에서는 두 가지 기법 계열이 일반적이다: 데이터셋을 리샘플링하는 것과 손실 함수에 가중치를 다시 부여하는 것이다."
    },
    {
      "en": "Oversampling duplicates or synthesizes additional minority examples, while undersampling discards a portion of the majority class.",
      "ko": "오버샘플링은 소수 클래스 예시를 복제하거나 합성하는 반면, 언더샘플링은 다수 클래스의 일부를 버린다."
    },
    {
      "en": "A popular synthesis method, SMOTE, generates new minority points by interpolating between existing neighbors rather than copying them outright.",
      "ko": "널리 쓰이는 합성 기법인 SMOTE는 기존 이웃들을 그대로 복사하는 대신 그들 사이를 보간하여 새로운 소수 클래스 점을 생성한다."
    },
    {
      "en": "Reweighting, by contrast, leaves the data untouched and instead penalizes mistakes on the minority class more heavily during training.",
      "ko": "이와 대조적으로, 가중치 재조정은 데이터를 그대로 두고 대신 훈련 중에 소수 클래스에 대한 실수에 더 무거운 벌점을 부과한다."
    },
    {
      "en": "No single remedy fits every dataset, and aggressive oversampling can cause a model to memorize noise instead of learning a general pattern.",
      "ko": "어떤 단일 해결책도 모든 데이터셋에 들어맞지는 않으며, 공격적인 오버샘플링은 모델이 일반적인 패턴을 학습하는 대신 노이즈를 암기하게 만들 수 있다."
    },
    {
      "en": "The prudent approach is to test several strategies and judge them on a metric that reflects the true business cost of each error.",
      "ko": "신중한 접근법은 여러 전략을 시험하고 각 오류의 실제 비즈니스 비용을 반영하는 지표로 그것들을 평가하는 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-imbalance-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "Strategies for handling imbalanced classification datasets",
        "How to collect more data for every project",
        "Why accuracy is always the best evaluation metric",
        "A history of fraud detection software vendors"
      ],
      "choicesKo": [
        "불균형한 분류 데이터셋을 다루는 전략",
        "모든 프로젝트를 위해 더 많은 데이터를 수집하는 방법",
        "정확도가 항상 최고의 평가 지표인 이유",
        "사기 탐지 소프트웨어 업체의 역사"
      ],
      "answerIndex": 0,
      "explanation": "기사는 클래스 불균형 문제와 이를 다루는 지표 및 리샘플링·가중치 재조정 같은 전략을 설명한다. 따라서 (가)가 정답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-imbalance-q2",
      "prompt": "According to the article, how does SMOTE create new minority examples?",
      "promptKo": "기사에 따르면, SMOTE는 어떻게 새로운 소수 클래스 예시를 만드는가?",
      "choices": [
        "By deleting majority-class records",
        "By collecting more raw data from users",
        "By interpolating between existing neighboring points",
        "By increasing the model's learning rate"
      ],
      "choicesKo": [
        "다수 클래스 레코드를 삭제함으로써",
        "사용자로부터 더 많은 원시 데이터를 수집함으로써",
        "기존의 이웃하는 점들 사이를 보간함으로써",
        "모델의 학습률을 높임으로써"
      ],
      "answerIndex": 2,
      "explanation": "본문은 SMOTE가 '기존 이웃들 사이를 보간하여 새로운 소수 클래스 점을 생성한다'고 설명하므로 (다)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-imbalance-q3",
      "prompt": "What can be inferred about a model that always predicts the majority class?",
      "promptKo": "항상 다수 클래스를 예측하는 모델에 대해 추론할 수 있는 것은?",
      "choices": [
        "It is guaranteed to detect every rare event",
        "Its high accuracy can be misleading about its real usefulness",
        "It requires no training data at all",
        "It always outperforms reweighted models"
      ],
      "choicesKo": [
        "그것은 모든 희귀 사건을 탐지하는 것이 보장된다",
        "그것의 높은 정확도는 실제 유용성에 대해 오해를 불러일으킬 수 있다",
        "그것은 훈련 데이터가 전혀 필요 없다",
        "그것은 항상 가중치가 재조정된 모델을 능가한다"
      ],
      "answerIndex": 1,
      "explanation": "본문은 다수 클래스만 예측해도 높은 정확도가 나오지만 정작 목적인 과업에서 실패한다고 했다. 즉 높은 정확도가 실제 유용성에 대해 오해를 줄 수 있음을 추론할 수 있으므로 (나)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-imbalance-q4",
      "prompt": "The word \"discards\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"discards\"와 의미가 가장 가까운 것은?",
      "choices": [
        "retains",
        "analyzes",
        "encrypts",
        "throws away"
      ],
      "choicesKo": [
        "보유하다",
        "분석하다",
        "암호화하다",
        "버리다"
      ],
      "answerIndex": 3,
      "explanation": "'discards'는 '버리다'라는 뜻으로 'throws away'와 가장 가깝다. 'retains(보유하다)'는 반대 의미의 함정 보기이므로 (라)가 정답이다.",
      "category": "동의어"
    }
  ]
}
```
