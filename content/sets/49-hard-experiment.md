# Set 49 — HARD — A/B Experiment Pitfalls (Internal Report)

```json
{
  "id": "set-hard-experiment",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "Over the past quarter, the Experimentation Platform team reviewed forty completed A/B tests and found that nearly a third of them rested on conclusions the data could not actually support.",
      "ko": "지난 분기 동안 실험 플랫폼 팀은 완료된 A/B 테스트 40건을 검토했고, 그 중 거의 3분의 1이 데이터가 실제로는 뒷받침할 수 없는 결론에 기대고 있었음을 발견했다."
    },
    {
      "en": "The single most common error was peeking: analysts watched the results accumulate in real time and declared a winner the moment the difference looked significant.",
      "ko": "가장 흔한 오류는 '엿보기'였는데, 분석가들이 결과가 실시간으로 쌓이는 것을 지켜보다가 차이가 유의미해 보이는 순간 곧바로 승자를 선언한 것이다."
    },
    {
      "en": "This practice is dangerous because, in any noisy stream of data, some apparent gap will cross the threshold by chance if one simply keeps looking long enough.",
      "ko": "이 관행이 위험한 이유는, 잡음이 많은 데이터 흐름에서는 충분히 오래 계속 지켜보기만 하면 어떤 겉보기 차이는 우연히 그 기준선을 넘게 되기 때문이다."
    },
    {
      "en": "A second pitfall, sample-ratio mismatch, is subtler: the two groups were meant to be split evenly, yet the actual counts arrived markedly lopsided.",
      "ko": "두 번째 함정인 표본 비율 불일치는 더 미묘한데, 두 집단이 균등하게 나뉘도록 설계되었음에도 실제 집계가 눈에 띄게 한쪽으로 치우친 채 들어온 것이다."
    },
    {
      "en": "Such an imbalance usually signals a hidden flaw in how users were assigned or logged, which means the comparison can no longer be trusted no matter how clean the rest of the analysis appears.",
      "ko": "그러한 불균형은 대개 사용자가 배정되거나 기록된 방식에 숨겨진 결함이 있음을 알리는 신호이며, 이는 나머지 분석이 아무리 깔끔해 보여도 그 비교를 더 이상 신뢰할 수 없음을 뜻한다."
    },
    {
      "en": "The third recurring problem was simply ending a test too early, before it had run through a full set of weekly cycles.",
      "ko": "세 번째로 반복된 문제는 단순히 테스트를 너무 일찍, 즉 주간 주기 전체를 한 차례 거치기도 전에 종료한 것이었다."
    },
    {
      "en": "Weekend users often behave differently from weekday users, so a result gathered over only three days may reflect a temporary quirk rather than a durable effect.",
      "ko": "주말 사용자는 흔히 평일 사용자와 다르게 행동하므로, 단 3일에 걸쳐 수집된 결과는 지속적인 효과라기보다 일시적인 특이 현상을 반영하는 것일 수 있다."
    },
    {
      "en": "To guard against these failures, the team is adopting three safeguards that will apply to every experiment going forward.",
      "ko": "이러한 실패를 막기 위해, 팀은 앞으로 모든 실험에 적용될 세 가지 안전장치를 도입하고 있다."
    },
    {
      "en": "First, the platform will fix each test's required sample size in advance and lock the results from view until that size is reached, removing the temptation to peek.",
      "ko": "첫째, 플랫폼은 각 테스트에 필요한 표본 크기를 사전에 확정하고 그 크기에 도달할 때까지 결과를 볼 수 없도록 잠가서, 엿보고 싶은 유혹을 제거할 것이다."
    },
    {
      "en": "Second, an automated check will flag any sample-ratio mismatch and quarantine the experiment for review before its numbers are reported.",
      "ko": "둘째, 자동화된 점검 장치가 표본 비율 불일치를 감지해 표시하고, 그 수치가 보고되기 전에 해당 실험을 검토 대상으로 격리할 것이다."
    },
    {
      "en": "Third, every test will run for a minimum of two full weeks unless a documented exception is approved by the analytics lead.",
      "ko": "셋째, 문서화된 예외가 분석 책임자의 승인을 받지 않는 한, 모든 테스트는 최소 2주 전체 기간 동안 실행될 것이다."
    },
    {
      "en": "None of these measures will make experimentation faster, but together they should make its conclusions far more deserving of the trust placed in them.",
      "ko": "이 조치들 중 어느 것도 실험을 더 빠르게 만들어 주지는 않겠지만, 함께 작동하면 그 결론들이 거기에 부여되는 신뢰를 훨씬 더 받을 만하게 만들어 줄 것이다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-experiment-q1",
      "prompt": "What is the primary purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that the experimentation platform will be shut down.",
        "To identify common pitfalls that invalidate A/B tests and present safeguards against them.",
        "To rank analysts according to how many tests they completed.",
        "To argue that A/B testing should be abandoned in favor of dashboards."
      ],
      "choicesKo": [
        "실험 플랫폼이 폐쇄될 것임을 발표하기 위해.",
        "A/B 테스트를 무효화하는 흔한 함정들을 식별하고 그에 대한 안전장치를 제시하기 위해.",
        "분석가들을 완료한 테스트 수에 따라 순위 매기기 위해.",
        "A/B 테스트를 버리고 대시보드를 택해야 한다고 주장하기 위해."
      ],
      "answerIndex": 1,
      "explanation": "보고서는 peeking, 표본 비율 불일치, 너무 이른 종료라는 함정들을 짚은 뒤 'the team is adopting three safeguards'로 대응책을 제시한다. 따라서 함정 식별과 안전장치 제시가 주된 목적이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-experiment-q2",
      "prompt": "According to the report, what will the new minimum run-time rule require?",
      "promptKo": "보고서에 따르면 새로운 최소 실행 기간 규칙은 무엇을 요구하는가?",
      "choices": [
        "Every test must run for at least two full weeks unless an approved exception is documented.",
        "Every test must end as soon as a significant difference appears.",
        "Every test must run for exactly three days.",
        "Every test must be approved by the marketing department."
      ],
      "choicesKo": [
        "승인된 예외가 문서화되지 않는 한, 모든 테스트는 최소 2주 전체 기간 동안 실행되어야 한다.",
        "모든 테스트는 유의미한 차이가 나타나는 즉시 종료되어야 한다.",
        "모든 테스트는 정확히 3일 동안 실행되어야 한다.",
        "모든 테스트는 마케팅 부서의 승인을 받아야 한다."
      ],
      "answerIndex": 0,
      "explanation": "'every test will run for a minimum of two full weeks unless a documented exception is approved by the analytics lead'라는 문장이 최소 2주 실행과 문서화된 예외 승인이라는 요건을 명시한다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-experiment-q3",
      "prompt": "What can be inferred about the team's view of speed versus reliability?",
      "promptKo": "속도 대 신뢰성에 대한 팀의 견해에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "They believe the new safeguards will make experiments both faster and more reliable.",
        "They expect the safeguards to have no effect on either speed or reliability.",
        "They consider speed more important than the validity of conclusions.",
        "They are willing to accept slower experiments in exchange for more trustworthy conclusions."
      ],
      "choicesKo": [
        "새 안전장치가 실험을 더 빠르고 더 신뢰할 수 있게 동시에 만들어 줄 것이라고 믿는다.",
        "안전장치가 속도와 신뢰성 어느 쪽에도 영향을 주지 않을 것으로 예상한다.",
        "결론의 타당성보다 속도를 더 중요하게 여긴다.",
        "더 신뢰할 만한 결론을 얻는 대가로 더 느린 실험을 기꺼이 감수한다."
      ],
      "answerIndex": 3,
      "explanation": "마지막 문장 'None of these measures will make experimentation faster, but together they should make its conclusions far more deserving of the trust'에서, 속도 향상은 포기하더라도 신뢰성을 우선시한다는 점을 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-experiment-q4",
      "prompt": "The word \"durable\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"durable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "expensive",
        "fleeting",
        "lasting",
        "accidental"
      ],
      "choicesKo": [
        "비싼",
        "순식간의",
        "지속적인",
        "우연한"
      ],
      "answerIndex": 2,
      "explanation": "'a temporary quirk rather than a durable effect'에서 durable은 temporary와 대비되어 '오래 지속되는'을 뜻하므로 'lasting'이 정답이다. 반대 의미인 'fleeting(순식간의)'은 오답 함정이다.",
      "category": "동의어"
    }
  ]
}
```
