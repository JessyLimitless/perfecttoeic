# Set 31 — HARD — Model Bias (Article)

```json
{
  "id": "set-hard-bias",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "Machine learning systems are often praised for their objectivity, yet they are only as impartial as the data on which they are trained.",
      "ko": "머신러닝 시스템은 객관성으로 자주 칭찬받지만, 학습에 사용된 데이터만큼만 공정할 뿐이다."
    },
    {
      "en": "When historical records reflect past hiring or lending practices that disadvantaged certain groups, a model trained on those records will quietly absorb the same prejudices.",
      "ko": "과거 기록이 특정 집단에 불리했던 과거의 채용이나 대출 관행을 반영할 경우, 그 기록으로 학습한 모델은 동일한 편견을 조용히 흡수하게 된다."
    },
    {
      "en": "More troublingly, because such systems optimize for patterns that maximize accuracy on the training set, they can amplify these biases rather than merely reproduce them.",
      "ko": "더욱 우려스러운 점은, 그러한 시스템이 학습 데이터에서 정확도를 극대화하는 패턴에 최적화되기 때문에 이러한 편향을 단순히 재현하는 데 그치지 않고 증폭시킬 수 있다는 것이다."
    },
    {
      "en": "The danger is compounded by the fact that the resulting decisions arrive wrapped in the language of mathematics, lending them an unearned air of neutrality.",
      "ko": "그 결과로 나온 의사결정이 수학의 언어로 포장되어 부당하게 중립적인 인상을 풍긴다는 사실 때문에 위험은 더욱 가중된다."
    },
    {
      "en": "A loan officer who rejects an applicant can be questioned, but an algorithm that does the same is frequently treated as an unassailable verdict.",
      "ko": "지원자를 거절한 대출 담당자는 추궁받을 수 있지만, 동일한 일을 한 알고리즘은 흔히 반박할 수 없는 판정으로 취급된다."
    },
    {
      "en": "Compounding the problem, the features a model relies upon may serve as proxies for protected attributes, encoding discrimination even when sensitive fields are explicitly removed.",
      "ko": "문제를 더하는 것은, 모델이 의존하는 특성들이 보호 속성의 대리 변수 역할을 할 수 있어, 민감한 항목을 명시적으로 제거하더라도 차별이 그대로 부호화된다는 점이다."
    },
    {
      "en": "A postal code, for instance, can stand in for ethnicity, while a gap in employment history can quietly penalize those who took leave to raise children.",
      "ko": "예를 들어 우편번호는 인종을 대신할 수 있고, 경력 공백은 자녀 양육을 위해 휴직했던 사람들에게 조용히 불이익을 줄 수 있다."
    },
    {
      "en": "Researchers therefore recommend that organizations audit their datasets for skewed representation before any model is deployed to make real-world decisions.",
      "ko": "따라서 연구자들은 어떤 모델이든 실제 의사결정에 투입되기 전에 조직이 데이터셋의 왜곡된 대표성을 점검할 것을 권고한다."
    },
    {
      "en": "Such an audit involves examining how outcomes differ across subgroups and testing whether comparable individuals are treated comparably.",
      "ko": "그러한 점검에는 하위 집단별로 결과가 어떻게 달라지는지 살피고, 비슷한 처지의 개인들이 비슷하게 대우받는지를 검증하는 일이 포함된다."
    },
    {
      "en": "Doing so after deployment, they warn, is far costlier and rarely undoes the damage already inflicted on affected individuals.",
      "ko": "그들은 배포 후에 그렇게 하는 것은 훨씬 더 많은 비용이 들고 이미 영향을 받은 개인들에게 가해진 피해를 되돌리는 경우가 드물다고 경고한다."
    },
    {
      "en": "Ultimately, the authors contend, fairness cannot be bolted on as an afterthought; it must be designed into a system from its earliest stages.",
      "ko": "궁극적으로 저자들은 공정성이란 사후에 덧붙일 수 있는 것이 아니라, 시스템의 가장 초기 단계부터 설계에 녹여 넣어야 한다고 주장한다."
    },
    {
      "en": "Treating bias as an engineering constraint rather than a public-relations problem, they argue, is the only durable safeguard.",
      "ko": "편향을 홍보상의 문제가 아니라 공학적 제약으로 다루는 것만이 지속 가능한 유일한 안전장치라고 그들은 주장한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-bias-q1",
      "prompt": "What is the main idea of the article?",
      "promptKo": "이 글의 핵심 내용은 무엇인가?",
      "choices": [
        "Machine learning models can inherit and intensify the biases in their training data, so fairness must be built in from the start.",
        "Objective algorithms have largely eliminated discrimination in hiring and lending.",
        "Historical records are too incomplete to be useful for training any model.",
        "Most organizations already audit their datasets effectively before deployment."
      ],
      "choicesKo": [
        "머신러닝 모델은 학습 데이터의 편향을 물려받고 심화시킬 수 있으므로, 공정성을 처음부터 설계에 반영해야 한다.",
        "객관적인 알고리즘이 채용과 대출에서의 차별을 대체로 없앴다.",
        "과거 기록은 어떤 모델 학습에도 사용하기에 너무 불완전하다.",
        "대부분의 조직은 배포 전에 이미 데이터셋을 효과적으로 점검하고 있다."
      ],
      "answerIndex": 0,
      "explanation": "글은 모델이 학습 데이터의 편견을 '흡수'하고(2문장) '증폭'시킬 수 있으며(3문장), 공정성은 초기 단계부터 설계에 녹여야 한다(11문장)고 주장하므로 정답은 (가)=0이다. 나머지는 본문과 배치되거나 언급되지 않았다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-bias-q2",
      "prompt": "According to the article, how can discrimination persist even after sensitive fields are removed from the data?",
      "promptKo": "이 글에 따르면, 민감한 항목을 데이터에서 제거한 후에도 차별이 지속될 수 있는 이유는 무엇인가?",
      "choices": [
        "Loan officers secretly override the algorithm's decisions.",
        "The model intentionally restores the deleted fields during training.",
        "Other features act as proxies for protected attributes, such as a postal code standing in for ethnicity.",
        "Auditing the dataset introduces new errors into the records."
      ],
      "choicesKo": [
        "대출 담당자가 몰래 알고리즘의 결정을 뒤집기 때문이다.",
        "모델이 학습 중에 삭제된 항목을 의도적으로 복원하기 때문이다.",
        "우편번호가 인종을 대신하는 것처럼, 다른 특성들이 보호 속성의 대리 변수 역할을 하기 때문이다.",
        "데이터셋 점검이 기록에 새로운 오류를 도입하기 때문이다."
      ],
      "answerIndex": 2,
      "explanation": "6문장은 모델이 의존하는 특성들이 보호 속성의 대리 변수가 되어 민감 항목을 제거해도 차별이 부호화된다고 하고, 7문장은 우편번호가 인종을 대신한다는 예를 든다. 따라서 정답은 (다)=2이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-bias-q3",
      "prompt": "What can be inferred about auditing datasets after a model has been deployed?",
      "promptKo": "모델이 배포된 후 데이터셋을 점검하는 것에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It is the standard approach the researchers recommend.",
        "It fully reverses any harm caused to affected individuals.",
        "It removes the need to design fairness into the system at all.",
        "It is less effective and more costly than auditing beforehand."
      ],
      "choicesKo": [
        "그것은 연구자들이 권고하는 표준적인 접근법이다.",
        "영향을 받은 개인들에게 가해진 피해를 완전히 되돌린다.",
        "시스템에 공정성을 설계할 필요성을 아예 없앤다.",
        "사전에 점검하는 것보다 효과가 떨어지고 비용이 더 든다."
      ],
      "answerIndex": 3,
      "explanation": "10문장에서 배포 후 점검은 '훨씬 더 많은 비용이 들고 피해를 되돌리는 경우가 드물다'고 했으므로, 사전 점검보다 효과가 낮고 비용이 크다는 (라)=3이 옳다. 연구자들은 사전 점검(8문장)을 권하므로 (가)는 틀리고, (나)는 본문과 반대다.",
      "category": "추론"
    },
    {
      "id": "set-hard-bias-q4",
      "prompt": "The word \"amplify\" in the third sentence is closest in meaning to",
      "promptKo": "세 번째 문장에서 단어 \"amplify\"와 의미가 가장 가까운 것은?",
      "choices": [
        "diminish",
        "intensify",
        "conceal",
        "postpone"
      ],
      "choicesKo": [
        "약화시키다",
        "심화시키다",
        "감추다",
        "미루다"
      ],
      "answerIndex": 1,
      "explanation": "\"amplify\"는 정도를 키운다는 뜻으로, 편향을 단순히 재현하는 데 그치지 않고 키운다는 맥락에서 'intensify(심화시키다)'가 가장 가깝다. 정답은 (나)=1이며, 'diminish(약화시키다)'는 정반대 의미의 함정이다.",
      "category": "동의어"
    }
  ]
}
```
