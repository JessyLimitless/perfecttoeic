# Set 56 — HARD — Fairness Auditing Framework

```json
{
  "id": "set-hard-fairness",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "As predictive models increasingly mediate consequential decisions in hiring and lending, organizations have begun adopting formal fairness-auditing frameworks intended to surface discriminatory patterns before a system is deployed at scale.",
      "ko": "예측 모델이 채용과 대출 같은 중대한 의사결정을 점점 더 매개하게 되면서, 기업들은 시스템이 대규모로 배포되기 전에 차별적 패턴을 드러내기 위한 공식적인 공정성 감사 프레임워크를 도입하기 시작했다."
    },
    {
      "en": "At the core of such an audit lies the measurement of disparate impact, a statistical comparison of how favorable outcomes are distributed across protected groups such as those defined by race, gender, or age.",
      "ko": "그러한 감사의 핵심에는 차별적 영향에 대한 측정이 있는데, 이는 인종, 성별, 연령 등으로 정의된 보호 집단들에 걸쳐 유리한 결과가 어떻게 분배되는지를 통계적으로 비교하는 것이다."
    },
    {
      "en": "When the selection rate for one group falls conspicuously below that of another, auditors flag the model for further scrutiny rather than assuming the gap reflects genuine differences in qualification.",
      "ko": "한 집단의 선발률이 다른 집단의 선발률보다 눈에 띄게 낮을 때, 감사자들은 그 격차가 자격의 실제 차이를 반영한다고 단정하기보다 해당 모델을 추가 검토 대상으로 표시한다."
    },
    {
      "en": "The deeper difficulty, however, is that fairness itself admits no single definition, and several plausible criteria can conflict in ways that no amount of engineering can fully reconcile.",
      "ko": "그러나 더 깊은 어려움은 공정성 자체가 단일한 정의를 허용하지 않으며, 여러 그럴듯한 기준들이 어떠한 공학적 노력으로도 완전히 조화시킬 수 없는 방식으로 충돌할 수 있다는 점이다."
    },
    {
      "en": "Requiring that a model's error rates be equal across groups, for instance, may be mathematically incompatible with requiring that a given risk score carry the same meaning regardless of group membership.",
      "ko": "예를 들어 모델의 오류율이 집단들 간에 동일하도록 요구하는 것은, 특정 위험 점수가 집단 소속과 무관하게 동일한 의미를 지니도록 요구하는 것과 수학적으로 양립 불가능할 수 있다."
    },
    {
      "en": "Because these objectives cannot be satisfied simultaneously except in trivial cases, choosing among them is ultimately a normative judgment rather than a purely technical one.",
      "ko": "이러한 목표들은 사소한 경우를 제외하고는 동시에 충족될 수 없기 때문에, 그것들 중에서 선택하는 일은 궁극적으로 순수하게 기술적인 판단이 아니라 규범적인 판단이다."
    },
    {
      "en": "Practitioners sometimes hope that a clever adjustment to the training data or the optimization objective will resolve the tension, yet such interventions merely relocate the trade-off rather than eliminating it.",
      "ko": "실무자들은 때때로 훈련 데이터나 최적화 목표에 대한 영리한 조정이 그 긴장을 해소해 주기를 바라지만, 그러한 개입은 절충점을 없애기보다 단지 그 위치를 옮길 뿐이다."
    },
    {
      "en": "Moreover, a model that appears equitable on aggregate metrics can still inflict harm on narrow subpopulations that the chosen categories fail to capture.",
      "ko": "더욱이 집계 지표상으로는 공평해 보이는 모델이라도, 선택된 범주가 포착하지 못하는 좁은 하위 집단에는 여전히 해를 끼칠 수 있다."
    },
    {
      "en": "For this reason, the most credible audits treat quantitative tests as a starting point to be paired with qualitative review, stakeholder consultation, and ongoing monitoring after deployment.",
      "ko": "이러한 이유로 가장 신뢰할 만한 감사는 정량적 검사를 정성적 검토, 이해관계자 협의, 그리고 배포 이후의 지속적인 모니터링과 결합되어야 할 출발점으로 취급한다."
    },
    {
      "en": "The goal, in short, is not to certify a model as definitively fair but to make its inevitable compromises explicit, contestable, and accountable to the people they affect.",
      "ko": "요컨대 그 목표는 모델을 결정적으로 공정하다고 인증하는 것이 아니라, 그 모델의 불가피한 타협을 명시적이고 이의를 제기할 수 있으며 영향을 받는 사람들에게 책임지는 것으로 만드는 데 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-fairness-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 글의 요지는 무엇인가?",
      "choices": [
        "Fairness auditing of consequential models is necessary but cannot be reduced to a single technical fix.",
        "Disparate-impact testing should be abandoned in favor of qualitative review.",
        "Hiring and lending models are inherently more accurate than human decision-makers.",
        "Equal error rates across groups can always be achieved with better training data."
      ],
      "choicesKo": [
        "중대한 모델에 대한 공정성 감사는 필요하지만 단일한 기술적 해결책으로 환원될 수 없다.",
        "차별적 영향 검사는 폐기되고 정성적 검토로 대체되어야 한다.",
        "채용 및 대출 모델은 본질적으로 인간 의사결정자보다 더 정확하다.",
        "집단 간 동일한 오류율은 더 나은 훈련 데이터로 언제나 달성될 수 있다."
      ],
      "answerIndex": 0,
      "explanation": "글 전체가 공정성 감사의 필요성을 인정하면서도 '여러 그럴듯한 기준들이 어떠한 공학적 노력으로도 완전히 조화시킬 수 없는 방식으로 충돌'하며 목표가 '결정적으로 공정하다고 인증하는 것이 아니라' 타협을 명시화하는 것이라고 밝히므로 (가)가 요지이다. (나),(다),(라)는 본문과 어긋난다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-fairness-q2",
      "prompt": "According to the article, what do auditors do when one group's selection rate is conspicuously below another's?",
      "promptKo": "글에 따르면, 한 집단의 선발률이 다른 집단보다 눈에 띄게 낮을 때 감사자들은 무엇을 하는가?",
      "choices": [
        "They immediately approve the model for large-scale deployment.",
        "They delete the protected-group categories from the dataset.",
        "They conclude that the lower-rate group is genuinely less qualified.",
        "They flag the model for further scrutiny instead of assuming the gap reflects real qualification differences."
      ],
      "choicesKo": [
        "모델을 즉시 대규모 배포용으로 승인한다.",
        "데이터셋에서 보호 집단 범주를 삭제한다.",
        "선발률이 낮은 집단이 실제로 자격이 부족하다고 결론짓는다.",
        "격차가 실제 자격 차이를 반영한다고 단정하는 대신 모델을 추가 검토 대상으로 표시한다."
      ],
      "answerIndex": 3,
      "explanation": "세 번째 문장에 '감사자들은 그 격차가 자격의 실제 차이를 반영한다고 단정하기보다 해당 모델을 추가 검토 대상으로 표시한다'라고 명시되어 있으므로 (라)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-fairness-q3",
      "prompt": "What can be inferred about purely technical adjustments to training data or optimization objectives?",
      "promptKo": "훈련 데이터나 최적화 목표에 대한 순수하게 기술적인 조정에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They permanently eliminate conflicts between fairness criteria.",
        "They are sufficient to certify a model as definitively fair.",
        "They shift where the trade-off appears without removing the underlying tension.",
        "They are never used by credible auditing teams."
      ],
      "choicesKo": [
        "공정성 기준들 사이의 충돌을 영구적으로 제거한다.",
        "모델을 결정적으로 공정하다고 인증하기에 충분하다.",
        "근본적인 긴장을 제거하지 않은 채 절충점이 나타나는 위치만 옮긴다.",
        "신뢰할 만한 감사 팀에서는 결코 사용되지 않는다."
      ],
      "answerIndex": 2,
      "explanation": "일곱 번째 문장에서 '그러한 개입은 절충점을 없애기보다 단지 그 위치를 옮길 뿐이다'라고 했으므로, 기술적 조정이 긴장을 제거하지 못한 채 위치만 옮긴다는 (다)를 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-fairness-q4",
      "prompt": "In the passage, the word \"reconcile\" is closest in meaning to",
      "promptKo": "지문에서 단어 \"reconcile\"과 의미가 가장 가까운 것은?",
      "choices": [
        "harmonize",
        "separate",
        "postpone",
        "exaggerate"
      ],
      "choicesKo": [
        "조화시키다",
        "분리하다",
        "연기하다",
        "과장하다"
      ],
      "answerIndex": 0,
      "explanation": "네 번째 문장에서 'reconcile'은 충돌하는 여러 공정성 기준을 서로 양립하도록 '조화시키다'라는 의미로 쓰였으므로 (가) harmonize가 정답이다. (나) separate(분리하다)는 반대 의미의 함정 선택지이다.",
      "category": "동의어"
    }
  ]
}
```
