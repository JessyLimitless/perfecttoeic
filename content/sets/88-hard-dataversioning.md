# Set 88 — HARD — Dataset Versioning (Email)

```json
{
  "id": "set-hard-dataversioning",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Why our fraud model's numbers won't reconcile — and what we're changing",
      "ko": "제목: 우리 사기 탐지 모델의 수치가 일치하지 않는 이유와 우리가 바꾸려는 것"
    },
    {
      "en": "Hi everyone, I want to walk through what went wrong with last week's model review before we repeat it.",
      "ko": "안녕하세요 여러분, 지난주 모델 검토에서 무엇이 잘못되었는지를 우리가 그것을 반복하기 전에 함께 짚어 보고 싶습니다."
    },
    {
      "en": "Two analysts ran what they believed was the same evaluation and reported accuracy figures that differed by almost four points.",
      "ko": "두 분석가가 그들이 동일하다고 믿었던 평가를 실행했고, 거의 4포인트 차이가 나는 정확도 수치를 보고했습니다."
    },
    {
      "en": "After half a day of confusion, the cause turned out to be embarrassingly simple: they were not testing against the same data.",
      "ko": "반나절의 혼란 끝에, 그 원인은 당혹스러울 만큼 단순한 것으로 드러났습니다. 그들은 동일한 데이터를 상대로 테스트하고 있지 않았던 것입니다."
    },
    {
      "en": "One had pulled the dataset on Monday; the other pulled it on Thursday, after an upstream pipeline had silently appended three days of new transactions.",
      "ko": "한 명은 월요일에 데이터셋을 받았고, 다른 한 명은 상류 파이프라인이 사흘 치 새 거래를 조용히 덧붙인 뒤인 목요일에 그것을 받았습니다."
    },
    {
      "en": "Neither analyst did anything wrong; the data simply has no fixed identity that we can point to and agree on.",
      "ko": "어느 분석가도 잘못한 것은 없습니다. 데이터에는 그저 우리가 가리키며 합의할 수 있는 고정된 정체성이 없을 뿐입니다."
    },
    {
      "en": "This is exactly the problem that dataset versioning is meant to solve.",
      "ko": "이것이 바로 데이터셋 버전 관리가 풀려는 문제입니다."
    },
    {
      "en": "Starting next sprint, every dataset we evaluate against will be assigned an immutable version tag, so that 'v3' always refers to precisely the same rows no matter when it is read.",
      "ko": "다음 스프린트부터, 우리가 평가에 사용하는 모든 데이터셋에는 변경 불가능한 버전 태그가 부여되어, 'v3'은 언제 읽히든 정확히 동일한 행들을 항상 가리키게 됩니다."
    },
    {
      "en": "Model results will then cite the exact data version alongside the metric, the way a scientific paper cites its sources.",
      "ko": "그러면 모델 결과는 마치 과학 논문이 출처를 인용하듯 지표와 함께 정확한 데이터 버전을 명시하게 됩니다."
    },
    {
      "en": "Yes, this adds a step, and I know storage of old versions is not free.",
      "ko": "그렇습니다, 이것은 한 단계를 더하며, 옛 버전의 저장이 공짜가 아님을 저도 압니다."
    },
    {
      "en": "But a number we cannot trace back to a specific dataset is a number we cannot defend in an audit, and our fraud work is exactly the kind that gets audited.",
      "ko": "그러나 특정 데이터셋으로 거슬러 추적할 수 없는 수치는 감사에서 방어할 수 없는 수치이며, 우리의 사기 탐지 작업은 바로 감사를 받게 되는 종류입니다."
    },
    {
      "en": "I'll demo the new tagging workflow at Thursday's stand-up; please bring any datasets you're mid-evaluation on so we can tag them together.",
      "ko": "목요일 스탠드업에서 새로운 태깅 작업 흐름을 시연하겠습니다. 함께 태그를 붙일 수 있도록 평가 중인 데이터셋이 있으면 가져와 주세요."
    }
  ],
  "questions": [
    {
      "id": "set-hard-dataversioning-q1",
      "prompt": "What is the main reason the writer sent this email?",
      "promptKo": "글쓴이가 이 이메일을 보낸 주된 이유는 무엇인가?",
      "choices": [
        "To blame two analysts for making careless mistakes during the review.",
        "To explain a data-discrepancy problem and introduce dataset versioning as the fix.",
        "To announce that the fraud model has been retired from production.",
        "To request a larger storage budget for the analytics team."
      ],
      "choicesKo": [
        "두 분석가가 검토 중 부주의한 실수를 했다고 비난하기 위해",
        "데이터 불일치 문제를 설명하고 그 해결책으로 데이터셋 버전 관리를 도입하기 위해",
        "사기 탐지 모델이 운영 환경에서 폐기되었음을 알리기 위해",
        "분석 팀을 위한 더 큰 저장 예산을 요청하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "이메일은 수치 불일치의 원인을 설명하고 다음 스프린트부터 버전 태그를 도입한다는 해결책을 제시하므로 (나)가 정답입니다. 분석가를 비난하지 않는다고 명시하므로 (가)는 오답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-dataversioning-q2",
      "prompt": "According to the email, why did the two accuracy figures differ?",
      "promptKo": "이메일에 따르면, 두 정확도 수치가 달랐던 이유는 무엇인가?",
      "choices": [
        "The dataset gained three days of new transactions between Monday and Thursday.",
        "The model's code was changed between the two runs.",
        "One analyst used the wrong evaluation metric.",
        "One analyst tested on a competitor's data by mistake."
      ],
      "choicesKo": [
        "데이터셋이 월요일과 목요일 사이에 사흘 치 새 거래를 얻었다.",
        "두 실행 사이에 모델의 코드가 변경되었다.",
        "한 분석가가 잘못된 평가 지표를 사용했다.",
        "한 분석가가 실수로 경쟁사의 데이터로 테스트했다."
      ],
      "answerIndex": 0,
      "explanation": "본문 'after an upstream pipeline had silently appended three days of new transactions'에서 근거가 명시되므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-dataversioning-q3",
      "prompt": "What can be inferred about why the writer emphasizes auditing?",
      "promptKo": "글쓴이가 감사를 강조하는 이유에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "The team plans to stop evaluating the fraud model.",
        "Audits make dataset versioning unnecessary.",
        "Storing old dataset versions is free for audited teams.",
        "Fraud-detection results may need to be defended later, so each number must be traceable to a specific dataset."
      ],
      "choicesKo": [
        "팀은 사기 탐지 모델 평가를 중단할 계획이다.",
        "감사는 데이터셋 버전 관리를 불필요하게 만든다.",
        "옛 데이터셋 버전 저장은 감사받는 팀에게는 무료다.",
        "사기 탐지 결과는 나중에 방어해야 할 수 있으므로, 각 수치가 특정 데이터셋으로 추적 가능해야 한다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 추적 불가능한 수치는 감사에서 방어할 수 없고 사기 작업이 감사를 받는다고 했으므로, 추적 가능성이 필요하다는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-dataversioning-q4",
      "prompt": "In the email, the word \"immutable\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"immutable\"과 의미가 가장 가까운 것은",
      "choices": [
        "changeable",
        "temporary",
        "unchangeable",
        "optional"
      ],
      "choicesKo": [
        "변경 가능한",
        "일시적인",
        "변경 불가능한",
        "선택적인"
      ],
      "answerIndex": 2,
      "explanation": "'immutable version tag'는 'v3'이 항상 동일한 행을 가리키도록 변하지 않는 태그를 뜻하므로 'unchangeable'이 가장 가깝습니다. 반대 의미인 'changeable'(변경 가능한)은 오답입니다. 정답은 (다)입니다.",
      "category": "동의어"
    }
  ]
}
```
