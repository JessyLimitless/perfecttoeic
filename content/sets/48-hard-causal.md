# Set 48 — HARD — Causal Inference in Analytics

```json
{
  "id": "set-hard-causal",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "When teams open their analytics dashboards each morning, the charts can feel reassuringly objective, as though the numbers were speaking for themselves.",
      "ko": "팀들이 매일 아침 분석 대시보드를 열면, 마치 숫자들이 스스로 말하고 있는 것처럼 그 차트들이 안심이 될 만큼 객관적으로 느껴질 수 있다."
    },
    {
      "en": "Yet a dashboard, however polished, can only display correlations, and correlations are notoriously easy to misread as causes.",
      "ko": "그러나 대시보드는 아무리 정교해도 상관관계만을 보여줄 수 있을 뿐이며, 상관관계는 악명 높을 정도로 원인으로 잘못 읽히기 쉽다."
    },
    {
      "en": "Suppose a marketing team notices that customers who receive the company newsletter spend twice as much as those who do not.",
      "ko": "어떤 마케팅 팀이, 회사 뉴스레터를 받는 고객들이 받지 않는 고객들보다 두 배를 더 지출한다는 점을 발견했다고 가정해 보자."
    },
    {
      "en": "It is tempting to conclude that the newsletter drives spending, but the more loyal customers may simply have chosen to subscribe in the first place.",
      "ko": "그 뉴스레터가 지출을 유발한다고 결론짓고 싶은 마음이 들지만, 애초에 더 충성도 높은 고객들이 단지 구독하기로 선택했을 수도 있다."
    },
    {
      "en": "In that case the subscription is a symptom of loyalty rather than its source, and any campaign built on the wrong assumption is likely to disappoint.",
      "ko": "그 경우 구독은 충성도의 원천이라기보다는 충성도의 증상이며, 잘못된 가정 위에 세워진 어떤 캠페인이든 실망스러운 결과를 낳기 쉽다."
    },
    {
      "en": "To separate genuine cause from mere coincidence, analysts increasingly turn to causal-inference methods rather than relying on dashboards alone.",
      "ko": "진짜 원인을 단순한 우연으로부터 가려내기 위해, 분석가들은 대시보드에만 의존하기보다 점점 더 인과 추론 기법으로 눈을 돌리고 있다."
    },
    {
      "en": "The cleanest of these is the controlled experiment, in which users are randomly assigned to a treatment group or a control group so that the only systematic difference between them is the intervention being tested.",
      "ko": "이 기법들 중 가장 깔끔한 것은 통제 실험으로, 사용자들이 처치 집단 또는 통제 집단에 무작위로 배정되어 두 집단 사이의 유일한 체계적 차이가 검증 대상인 개입뿐이 되도록 하는 방식이다."
    },
    {
      "en": "Because randomization balances both the factors analysts know about and those they do not, a difference in outcomes can be attributed to the intervention with real confidence.",
      "ko": "무작위 배정은 분석가들이 알고 있는 요인들과 모르는 요인들을 모두 균형 있게 맞추기 때문에, 결과의 차이는 진정한 확신을 가지고 그 개입에 귀속될 수 있다."
    },
    {
      "en": "When a deliberate experiment is impractical, costly, or even unethical, a natural experiment can serve as a substitute by exploiting an external event that splits people into comparable groups for reasons unrelated to the outcome.",
      "ko": "의도적인 실험이 비현실적이거나 비용이 많이 들거나 심지어 비윤리적일 때는, 결과와 무관한 이유로 사람들을 비교 가능한 집단들로 나누는 외부 사건을 활용함으로써 자연 실험이 대체 수단이 될 수 있다."
    },
    {
      "en": "A sudden regional price change or an unplanned service outage, for instance, may approximate the random assignment that a laboratory would otherwise have to engineer.",
      "ko": "예컨대 갑작스러운 지역별 가격 변동이나 계획되지 않은 서비스 중단은, 실험실이라면 인위적으로 설계해야 했을 무작위 배정을 근사적으로 구현해 줄 수 있다."
    },
    {
      "en": "Neither approach is a cure-all, and both demand careful attention to how groups are formed and to whether the comparison is truly fair.",
      "ko": "어느 접근법도 만병통치약은 아니며, 둘 다 집단이 어떻게 구성되는지와 그 비교가 정말로 공정한지에 대한 세심한 주의를 요구한다."
    },
    {
      "en": "Still, the discipline they impose is precisely what a raw dashboard cannot provide: a principled basis for deciding when a striking pattern deserves to be acted upon.",
      "ko": "그럼에도 이 기법들이 부과하는 엄격함은 바로 가공되지 않은 대시보드가 제공할 수 없는 것, 즉 두드러진 패턴이 언제 실행에 옮길 가치가 있는지를 판단하는 원칙 있는 근거이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-causal-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 기사의 요점은 무엇인가?",
      "choices": [
        "Because dashboards show only correlation, causal-inference methods are needed to identify true causes.",
        "Analytics dashboards should be redesigned to display data more attractively.",
        "Marketing newsletters are the most reliable way to increase customer spending.",
        "Controlled experiments are always cheaper than relying on existing dashboards."
      ],
      "choicesKo": [
        "대시보드는 상관관계만 보여주기 때문에, 진짜 원인을 식별하려면 인과 추론 기법이 필요하다.",
        "분석 대시보드는 데이터를 더 매력적으로 표시하도록 재설계되어야 한다.",
        "마케팅 뉴스레터는 고객 지출을 늘리는 가장 신뢰할 수 있는 방법이다.",
        "통제 실험은 기존 대시보드에 의존하는 것보다 항상 더 저렴하다."
      ],
      "answerIndex": 0,
      "explanation": "글은 'a dashboard ... can only display correlations'라고 한 뒤 'analysts increasingly turn to causal-inference methods'로 이어지며, 마지막 문장에서 대시보드가 줄 수 없는 '원칙 있는 근거'를 강조한다. 따라서 상관관계만 보여주는 대시보드의 한계와 인과 추론 기법의 필요성이 요점이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-causal-q2",
      "prompt": "In the newsletter example, what does the article suggest may actually explain the higher spending?",
      "promptKo": "뉴스레터 사례에서, 더 높은 지출을 실제로 설명할 수 있는 것은 무엇이라고 기사는 시사하는가?",
      "choices": [
        "The newsletter contained exclusive discount codes.",
        "The control group received a competing newsletter.",
        "Already-loyal customers were the ones who chose to subscribe.",
        "Spending was measured incorrectly on the dashboard."
      ],
      "choicesKo": [
        "뉴스레터에 독점 할인 코드가 들어 있었다.",
        "통제 집단이 경쟁사 뉴스레터를 받았다.",
        "이미 충성도가 높은 고객들이 구독을 선택한 사람들이었다.",
        "지출이 대시보드에서 잘못 측정되었다."
      ],
      "answerIndex": 2,
      "explanation": "'the more loyal customers may simply have chosen to subscribe in the first place'와 'the subscription is a symptom of loyalty rather than its source'라는 문장이, 높은 지출의 진짜 원인이 뉴스레터가 아니라 기존의 충성도일 수 있음을 설명한다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-causal-q3",
      "prompt": "What can be inferred about why randomization is valuable in a controlled experiment?",
      "promptKo": "통제 실험에서 무작위 배정이 가치 있는 이유에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It guarantees that the treatment group will always outperform the control group.",
        "It removes the need to measure any outcomes at all.",
        "It allows analysts to skip forming a control group entirely.",
        "It balances even unknown factors, so outcome differences can be credited to the intervention."
      ],
      "choicesKo": [
        "처치 집단이 항상 통제 집단을 능가하도록 보장한다.",
        "어떤 결과도 측정할 필요를 없애 준다.",
        "분석가들이 통제 집단 구성을 완전히 건너뛸 수 있게 해 준다.",
        "알려지지 않은 요인들까지 균형을 맞춰 주므로, 결과 차이를 개입의 공으로 돌릴 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "'randomization balances both the factors analysts know about and those they do not, a difference in outcomes can be attributed to the intervention with real confidence'라는 문장에서, 알려지지 않은 요인까지 균형을 맞추기 때문에 결과 차이를 개입에 귀속시킬 수 있다고 추론된다.",
      "category": "추론"
    },
    {
      "id": "set-hard-causal-q4",
      "prompt": "The word \"approximate\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"approximate\"와 의미가 가장 가까운 것은?",
      "choices": [
        "completely contradict",
        "come close to reproducing",
        "officially certify",
        "permanently replace"
      ],
      "choicesKo": [
        "완전히 모순되다",
        "거의 재현하다",
        "공식적으로 인증하다",
        "영구적으로 대체하다"
      ],
      "answerIndex": 1,
      "explanation": "해당 문장 'may approximate the random assignment that a laboratory would otherwise have to engineer'에서 approximate는 무작위 배정을 '거의 비슷하게 구현하다(근사하다)'라는 뜻이다. 따라서 'come close to reproducing'이 정답이며, 반대 의미인 'completely contradict(완전히 모순되다)'는 오답 함정이다.",
      "category": "동의어"
    }
  ]
}
```
