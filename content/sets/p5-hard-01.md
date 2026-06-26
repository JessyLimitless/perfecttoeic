# p5-hard-01 — Part 5 고난도 문법 (HARD)

```json
{
  "id": "p5-hard-01",
  "part": 5,
  "difficulty": "HARD",
  "passageType": "Incomplete Sentences",
  "passageLines": [],
  "questions": [
    {
      "id": "p5-hard-01-q1",
      "prompt": "Had the algorithm been validated earlier, the forecasting errors ------ much sooner.",
      "promptKo": "알고리즘이 더 일찍 검증되었더라면, 예측 오류가 훨씬 빨리 ------.",
      "choices": [
        "would have been detected",
        "will be detected",
        "are detected",
        "had detected"
      ],
      "choicesKo": [
        "감지되었을 것이다",
        "감지될 것이다",
        "감지된다",
        "감지했었다"
      ],
      "answerIndex": 0,
      "explanation": "Had + 주어 + p.p.는 가정법 과거완료(If had been의 도치)로, 주절은 'would have p.p.' 형태가 와야 합니다. 또한 오류는 감지'되는' 대상이므로 수동태 would have been detected가 맞습니다. 따라서 (가)=0입니다.",
      "category": "가정법"
    },
    {
      "id": "p5-hard-01-q2",
      "prompt": "Not until the audit was complete ------ the discrepancies in the quarterly figures.",
      "promptKo": "감사가 완료되고 나서야 비로소 분기 수치의 불일치가 ------.",
      "choices": [
        "noticed management",
        "management noticed",
        "management did notice",
        "did management notice"
      ],
      "choicesKo": [
        "(틀린 어순)",
        "경영진이 알아챘다(평서)",
        "경영진이 정말 알아챘다",
        "경영진이 알아챘다(도치)"
      ],
      "answerIndex": 3,
      "explanation": "부정어구 Not until이 문두에 오면 주어와 동사가 도치되어 'did + 주어 + 동사원형' 형태가 됩니다. 따라서 did management notice (라)=3입니다.",
      "category": "도치"
    },
    {
      "id": "p5-hard-01-q3",
      "prompt": "The consultant recommended ------ adopts the new data-governance framework receives additional training.",
      "promptKo": "컨설턴트는 새 데이터 거버넌스 체계를 채택하는 ------ 추가 교육을 받을 것을 권고했다.",
      "choices": [
        "that whoever",
        "whoever that",
        "that whom",
        "which whoever"
      ],
      "choicesKo": [
        "~하는 누구든지(that+복합관계사)",
        "(틀린 어순)",
        "(틀린 형태)",
        "(틀린 형태)"
      ],
      "answerIndex": 0,
      "explanation": "recommended 뒤 that절이 필요하고, that절 안의 주어 자리에는 '~하는 누구든지'를 뜻하는 복합관계대명사 whoever가 옵니다. 따라서 that whoever (가)=0입니다.",
      "category": "관계사"
    },
    {
      "id": "p5-hard-01-q4",
      "prompt": "The new model is praised not only for its accuracy but also ------.",
      "promptKo": "새 모델은 정확성뿐만 아니라 ------ 칭찬받는다.",
      "choices": [
        "its scalability",
        "for its scalability",
        "scalable",
        "to scale"
      ],
      "choicesKo": [
        "그것의 확장성",
        "확장성으로(전치사구)",
        "확장 가능한",
        "확장하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "'not only A but also B' 병치 구문에서 A가 'for its accuracy'(전치사구)이므로 B도 동일하게 'for its scalability'여야 병치가 맞습니다. 따라서 (나)=1입니다.",
      "category": "병치"
    },
    {
      "id": "p5-hard-01-q5",
      "prompt": "------ the dataset is incomplete, the analysts proceeded with a preliminary estimate.",
      "promptKo": "데이터셋이 불완전 ------, 분석가들은 예비 추정치로 진행했다.",
      "choices": [
        "Whereas",
        "Although",
        "Even",
        "Despite"
      ],
      "choicesKo": [
        "~인 반면",
        "~임에도(접속사)",
        "심지어",
        "~에도 불구하고(전치사)"
      ],
      "answerIndex": 1,
      "explanation": "뒤에 '주어+동사' 절이 오므로 접속사가 필요합니다. Despite는 전치사라 절을 이끌 수 없고, 양보의 의미로 Although가 적합합니다. 따라서 (나)=1입니다.",
      "category": "접속사"
    },
    {
      "id": "p5-hard-01-q6",
      "prompt": "Were the company ------ expand its analytics division, it would need to hire more data engineers.",
      "promptKo": "만약 회사가 분석 부서를 ------, 더 많은 데이터 엔지니어를 고용해야 할 것이다.",
      "choices": [
        "would",
        "to",
        "having",
        "for"
      ],
      "choicesKo": [
        "~할 것이다",
        "~한다면(to부정사)",
        "가지면서",
        "~을 위해"
      ],
      "answerIndex": 1,
      "explanation": "'Were 주어 to 동사원형'은 가정법 미래(If the company were to expand의 도치)입니다. 따라서 to (나)=1입니다.",
      "category": "가정법"
    },
    {
      "id": "p5-hard-01-q7",
      "prompt": "------ in the report were several key metrics that the board had requested.",
      "promptKo": "이사회가 요청했던 여러 핵심 지표가 보고서에 ------.",
      "choices": [
        "Inclusion",
        "Including",
        "To include",
        "Included"
      ],
      "choicesKo": [
        "포함(명사)",
        "포함하는",
        "포함하기 위해",
        "포함된(과거분사 도치)"
      ],
      "answerIndex": 3,
      "explanation": "보어가 문두로 나간 도치 구문(Included ... were ~)으로, 지표는 '포함되는' 대상이므로 과거분사 Included가 옵니다. 따라서 (라)=3입니다.",
      "category": "분사"
    },
    {
      "id": "p5-hard-01-q8",
      "prompt": "The findings were significant ------ to warrant an immediate revision of the policy.",
      "promptKo": "그 결과는 정책의 즉각적인 수정을 정당화할 ------ 중대했다.",
      "choices": [
        "too",
        "such",
        "enough",
        "so"
      ],
      "choicesKo": [
        "너무",
        "그러한",
        "충분히(후치)",
        "그렇게"
      ],
      "answerIndex": 2,
      "explanation": "'형용사 + enough + to부정사'(~할 만큼 충분히 …한) 구문이며 enough는 형용사 뒤에 옵니다. 따라서 (다)=2입니다.",
      "category": "어휘"
    },
    {
      "id": "p5-hard-01-q9",
      "prompt": "------ thoroughly the model is tested, some edge cases may still be overlooked.",
      "promptKo": "모델이 ------ 철저하게 테스트되더라도, 일부 예외 사례는 간과될 수 있다.",
      "choices": [
        "Whenever",
        "Whatever",
        "However",
        "Wherever"
      ],
      "choicesKo": [
        "언제든지",
        "무엇이든",
        "아무리 ~해도(부사 수식)",
        "어디든지"
      ],
      "answerIndex": 2,
      "explanation": "'However + 부사(thoroughly) + 주어 + 동사'는 '아무리 ~하게 …해도'라는 양보를 나타냅니다. 부사 thoroughly를 수식하므로 However가 맞습니다. 따라서 (다)=2입니다.",
      "category": "관계사"
    },
    {
      "id": "p5-hard-01-q10",
      "prompt": "The director insisted that the deployment ------ postponed until the security review concluded.",
      "promptKo": "이사는 보안 검토가 끝날 때까지 배포가 ------ 것을 강력히 주장했다.",
      "choices": [
        "is",
        "will be",
        "was",
        "be"
      ],
      "choicesKo": [
        "연기된다",
        "연기될 것이다",
        "연기되었다",
        "연기되어야(동사원형)"
      ],
      "answerIndex": 3,
      "explanation": "insist(주장하다)와 같은 요구·제안 동사의 that절은 '(should) + 동사원형'을 쓰므로 수동태도 be postponed가 됩니다. 따라서 be (라)=3입니다.",
      "category": "가정법"
    }
  ]
}
```
