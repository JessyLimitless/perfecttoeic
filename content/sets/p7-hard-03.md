# Part 7 — Single Passage: Article (HARD, paraphrase·추론)

```json
{
  "id": "p7-hard-03",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    { "en": "A QUIET SHIFT IN COMMUTER HABITS", "ko": "통근 습관의 조용한 변화" },
    { "en": "When Fairview Transit introduced its flexible-fare program two years ago, few expected it to reshape how the city travels.", "ko": "페어뷰 트랜싯이 2년 전 유연 요금제를 도입했을 때, 그것이 도시의 이동 방식을 바꾸리라 예상한 사람은 거의 없었다." },
    { "en": "Rather than charging a flat monthly rate, the program lets riders pay only for the trips they actually take, with fares capped once a certain threshold is reached.", "ko": "월 정액을 부과하는 대신, 이 프로그램은 이용객이 실제로 이용한 만큼만 요금을 내되 일정 기준에 도달하면 요금이 상한선에서 멈추도록 한다." },
    { "en": "The result has been counterintuitive: instead of losing revenue, Fairview has seen ridership climb by nearly a third.", "ko": "그 결과는 예상과 달랐다. 수익을 잃기는커녕 페어뷰의 이용객 수가 거의 3분의 1 증가했다." },
    { "en": "Transit economist Dr. Ruiz attributes this to a psychological effect. \"When people feel they are not overpaying, they use the service more freely,\" she explains.", "ko": "교통 경제학자 루이스 박사는 이를 심리적 효과 덕분이라고 본다. \"사람들은 과도하게 낸다고 느끼지 않으면 서비스를 더 자유롭게 이용합니다.\"라고 그녀는 설명한다." },
    { "en": "Neighboring cities are now studying the model, though officials caution that results may vary in areas with different commuting patterns.", "ko": "인근 도시들은 이제 이 모델을 연구하고 있지만, 당국자들은 통근 패턴이 다른 지역에서는 결과가 다를 수 있다고 경고한다." }
  ],
  "questions": [
    {
      "id": "p7-hard-03-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": ["A rise in fuel prices", "The unexpected success of a new fare system", "A shortage of public transit vehicles", "A merger between transit companies"],
      "choicesKo": ["연료 가격 상승", "새 요금 체계의 예상 밖 성공", "대중교통 차량 부족", "교통 회사 간 합병"],
      "answerIndex": 1,
      "explanation": "기사는 페어뷰의 유연 요금제가 예상과 달리 이용객을 늘린 성공 사례를 다룹니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-hard-03-q2",
      "prompt": "The word \"counterintuitive\" in paragraph 3 is closest in meaning to",
      "promptKo": "셋째 단락의 'counterintuitive'와 의미가 가장 가까운 것은?",
      "choices": ["easily predicted", "widely accepted", "financially risky", "contrary to expectation"],
      "choicesKo": ["쉽게 예측되는", "널리 받아들여지는", "재정적으로 위험한", "예상과 반대되는"],
      "answerIndex": 3,
      "explanation": "counterintuitive는 '직관에 반하는, 예상과 반대되는'을 뜻하며, 이어지는 '수익을 잃기는커녕 늘었다'는 내용과 맞습니다. 따라서 (라)=3입니다.",
      "category": "동의어"
    },
    {
      "id": "p7-hard-03-q3",
      "prompt": "How does the flexible-fare program differ from a traditional pass?",
      "promptKo": "유연 요금제는 전통적인 정기권과 어떻게 다른가?",
      "choices": ["Riders pay only for trips they take, up to a cap", "It is available only to students", "It requires a two-year commitment", "It charges a higher flat rate"],
      "choicesKo": ["이용객은 상한선까지 이용한 만큼만 낸다", "학생에게만 제공된다", "2년 약정이 필요하다", "더 높은 정액을 부과한다"],
      "answerIndex": 0,
      "explanation": "월 정액 대신 실제 이용한 만큼만 내되 일정 기준에서 요금이 상한선에 멈춘다고 했습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-03-q4",
      "prompt": "According to Dr. Ruiz, why do people use the service more?",
      "promptKo": "루이스 박사에 따르면, 사람들이 서비스를 더 많이 이용하는 이유는 무엇인가?",
      "choices": ["The vehicles are newer", "Routes were expanded", "They feel they are not overpaying", "Advertising increased"],
      "choicesKo": ["차량이 더 새것이다", "노선이 확장되었다", "과도하게 낸다고 느끼지 않는다", "광고가 늘었다"],
      "answerIndex": 2,
      "explanation": "루이스 박사는 사람들이 과도하게 낸다고 느끼지 않으면 서비스를 더 자유롭게 이용한다고 설명합니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-hard-03-q5",
      "prompt": "What is implied about other cities adopting the model?",
      "promptKo": "다른 도시들이 이 모델을 도입하는 것에 관해 암시된 것은 무엇인가?",
      "choices": ["They have already rejected it", "It may not produce the same results everywhere", "It is prohibited by law", "It guarantees higher revenue"],
      "choicesKo": ["이미 거부했다", "모든 곳에서 같은 결과를 내지 않을 수 있다", "법으로 금지되어 있다", "더 높은 수익을 보장한다"],
      "answerIndex": 1,
      "explanation": "당국자들은 통근 패턴이 다른 지역에서는 결과가 다를 수 있다고 경고하므로, 동일한 결과가 보장되지 않음을 암시합니다. 따라서 (나)=1입니다.",
      "category": "추론"
    }
  ]
}
```
