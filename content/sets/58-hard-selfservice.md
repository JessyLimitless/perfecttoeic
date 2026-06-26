# Self-Service BI Governance (HARD)

```json
{
  "id": "set-hard-selfservice",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For much of the past decade, analytics leaders have championed self-service business intelligence as a way to free decision-making from the bottleneck of centralized reporting teams.",
      "ko": "지난 10년의 상당 기간 동안 분석 책임자들은 의사결정을 중앙집중식 보고 팀이라는 병목에서 해방시키는 방법으로 셀프서비스 비즈니스 인텔리전스(BI)를 옹호해 왔다."
    },
    {
      "en": "The appeal is straightforward: when a marketing manager can assemble her own dashboard in an afternoon, she no longer waits weeks for an overburdened data team to deliver a report that may already be obsolete.",
      "ko": "그 매력은 명확하다. 마케팅 관리자가 오후 한나절 만에 자신의 대시보드를 직접 구성할 수 있다면, 이미 한물갔을 수도 있는 보고서를 과부하에 시달리는 데이터 팀이 전달해 주기를 몇 주씩 기다릴 필요가 없어진다."
    },
    {
      "en": "Yet this very autonomy, prized for the speed it confers, has quietly introduced a problem that surfaces only at scale.",
      "ko": "그러나 속도를 제공한다는 이유로 높이 평가되는 바로 이 자율성이, 규모가 커져야 비로소 드러나는 문제를 조용히 들여왔다."
    },
    {
      "en": "When dozens of teams each define core measures such as \"active customer\" or \"monthly revenue\" according to their own assumptions, an organization can end up with a dozen mutually incompatible versions of what ought to be a single number.",
      "ko": "수십 개의 팀이 각자 자신만의 가정에 따라 \"활성 고객\"이나 \"월 매출\" 같은 핵심 지표를 정의하면, 조직은 하나의 숫자여야 마땅한 것에 대해 서로 양립 불가능한 십수 개의 버전을 갖게 될 수 있다."
    },
    {
      "en": "Executives then find themselves arbitrating between conflicting figures in meetings, eroding trust in the data rather than building it.",
      "ko": "그 결과 임원들은 회의에서 상충하는 수치들 사이를 중재하는 처지에 놓이게 되고, 이는 데이터에 대한 신뢰를 쌓기는커녕 오히려 갉아먹는다."
    },
    {
      "en": "The instinctive remedy—reasserting central control over every report—would, however, merely reinstate the very bottleneck that self-service was meant to dissolve.",
      "ko": "본능적인 해결책, 즉 모든 보고서에 대해 중앙 통제를 다시 강화하는 것은 그러나 셀프서비스가 없애려 했던 바로 그 병목을 되살릴 뿐이다."
    },
    {
      "en": "A more durable compromise has emerged in the form of a \"certified metrics\" layer, a curated set of definitions that the central team vets and publishes once, after which any team may reuse them freely.",
      "ko": "보다 지속 가능한 절충안이 \"인증 지표\" 계층의 형태로 등장했는데, 이는 중앙 팀이 한 번 검증하여 게시하는 엄선된 정의들의 집합으로, 이후 어떤 팀이든 이를 자유롭게 재사용할 수 있다."
    },
    {
      "en": "Under this model, governance shifts from policing every chart to maintaining a trusted vocabulary of measures, while teams retain the freedom to combine and visualize those measures however their questions demand.",
      "ko": "이 모델 하에서 거버넌스는 모든 차트를 단속하는 일에서 신뢰할 수 있는 지표 어휘를 유지하는 일로 옮겨가며, 팀들은 자신의 질문이 요구하는 방식대로 그 지표들을 결합하고 시각화할 자유를 그대로 유지한다."
    },
    {
      "en": "Crucially, the certified layer is not meant to cover every conceivable metric; it concentrates on the relatively small number that recur across executive decisions, leaving niche or experimental measures to local discretion.",
      "ko": "결정적으로, 인증 계층은 상상 가능한 모든 지표를 포괄하려는 것이 아니다. 그것은 임원 의사결정 전반에 걸쳐 반복적으로 등장하는 비교적 적은 수의 지표에 집중하고, 틈새의 혹은 실험적인 지표는 현장의 재량에 맡긴다."
    },
    {
      "en": "Done well, the approach does not so much restrict analysts as relieve them of the thankless task of relitigating settled definitions, allowing their energy to flow toward the questions that actually distinguish one quarter from the next.",
      "ko": "잘만 운영되면 이 접근법은 분석가들을 제약한다기보다는, 이미 합의된 정의를 다시 따지는 보람 없는 작업에서 그들을 덜어주어, 그들의 에너지가 실제로 한 분기를 다음 분기와 구별 짓는 질문들로 흐르도록 해 준다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-selfservice-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "A certified-metrics layer can preserve self-service speed while curbing conflicting definitions.",
        "Self-service BI should be abandoned in favor of centralized reporting.",
        "Marketing managers build better dashboards than central data teams.",
        "Executives should personally define every core business measure."
      ],
      "choicesKo": [
        "인증 지표 계층은 상충하는 정의를 억제하면서도 셀프서비스의 속도를 보존할 수 있다.",
        "셀프서비스 BI는 폐기하고 중앙집중식 보고로 돌아가야 한다.",
        "마케팅 관리자가 중앙 데이터 팀보다 더 나은 대시보드를 만든다.",
        "임원들이 모든 핵심 비즈니스 지표를 직접 정의해야 한다."
      ],
      "answerIndex": 0,
      "explanation": "글은 셀프서비스의 속도와 상충하는 정의 문제를 대비시킨 뒤, '인증 지표' 계층을 'a more durable compromise'로 제시한다. 일곱 번째 문장(A more durable compromise has emerged in the form of a \"certified metrics\" layer ...)과 마지막 문장이 이 절충안이 자유를 유지하면서 문제를 해결한다는 점을 뒷받침하므로 정답은 (가)이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-selfservice-q2",
      "prompt": "According to the article, what does the certified-metrics layer deliberately NOT attempt to do?",
      "promptKo": "기사에 따르면 인증 지표 계층이 의도적으로 시도하지 않는 것은 무엇인가?",
      "choices": [
        "Publish definitions that teams can reuse.",
        "Let teams visualize measures as their questions require.",
        "Concentrate on measures that recur across executive decisions.",
        "Cover every conceivable metric an organization might use."
      ],
      "choicesKo": [
        "팀들이 재사용할 수 있는 정의를 게시하는 것.",
        "팀들이 질문에 맞춰 지표를 시각화하도록 허용하는 것.",
        "임원 의사결정 전반에 반복 등장하는 지표에 집중하는 것.",
        "조직이 사용할 수 있는 상상 가능한 모든 지표를 포괄하는 것."
      ],
      "answerIndex": 3,
      "explanation": "아홉 번째 문장에 'the certified layer is not meant to cover every conceivable metric'라고 명시되어 있으므로, 의도적으로 하지 않는 것은 '모든 지표를 포괄하는 것'인 (라)이다. 나머지 선택지는 모두 이 계층이 실제로 수행하는 일이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-selfservice-q3",
      "prompt": "What can be inferred about simply reasserting central control over all reports?",
      "promptKo": "모든 보고서에 대해 단순히 중앙 통제를 다시 강화하는 것에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It would eliminate conflicting metric definitions at no cost.",
        "It is the author's recommended long-term solution.",
        "It would recreate the delays self-service was designed to remove.",
        "It is already the dominant practice among analytics leaders."
      ],
      "choicesKo": [
        "그것은 아무런 대가 없이 상충하는 지표 정의를 제거할 것이다.",
        "그것은 저자가 권장하는 장기적 해결책이다.",
        "그것은 셀프서비스가 제거하려 설계되었던 지연을 다시 만들어낼 것이다.",
        "그것은 이미 분석 책임자들 사이에서 지배적인 관행이다."
      ],
      "answerIndex": 2,
      "explanation": "여섯 번째 문장은 중앙 통제 재강화가 'merely reinstate the very bottleneck that self-service was meant to dissolve'라고 하여 병목(지연)을 되살릴 뿐이라고 밝힌다. 따라서 이는 저자가 권장하지 않는 부정적 결과이며 정답은 (다)이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-selfservice-q4",
      "prompt": "In the article, the word \"durable\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"durable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "fragile",
        "long-lasting",
        "expensive",
        "temporary"
      ],
      "choicesKo": [
        "깨지기 쉬운",
        "오래 지속되는",
        "값비싼",
        "일시적인"
      ],
      "answerIndex": 1,
      "explanation": "'A more durable compromise has emerged ...'에서 durable은 그 절충안이 오래 견디며 지속 가능하다는 의미로 쓰였으므로 'long-lasting'(오래 지속되는)이 적절하다. (라) temporary(일시적인)는 정반대 의미의 함정 선택지이다. 정답은 (나).",
      "category": "동의어"
    }
  ]
}
```
