# Set 87 — HARD — Model Cards (Notice)

```json
{
  "id": "set-hard-modelcards",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE TO ALL MACHINE LEARNING TEAMS: Effective the first of next month, no model may be promoted to production without an approved model card on file.",
      "ko": "모든 머신러닝 팀에 알립니다. 다음 달 1일부터, 승인된 모델 카드가 등록되어 있지 않은 어떤 모델도 운영 환경으로 승격될 수 없습니다."
    },
    {
      "en": "A model card is a short, standardized document that travels with a model and explains, in plain language, what it does and where it should not be trusted.",
      "ko": "모델 카드는 모델과 함께 따라다니며, 그 모델이 무엇을 하는지 그리고 어디서 신뢰되어서는 안 되는지를 평이한 언어로 설명하는 짧고 표준화된 문서입니다."
    },
    {
      "en": "This requirement is part of the company's broader commitment to responsible AI, and it applies equally to models built in-house and to those adapted from external providers.",
      "ko": "이 요건은 회사의 책임 있는 AI에 대한 폭넓은 약속의 일부이며, 사내에서 구축된 모델과 외부 제공업체로부터 적응된 모델에 동등하게 적용됩니다."
    },
    {
      "en": "Each card must state the model's intended use, the data it was trained on, the metrics by which its performance was judged, and any populations or conditions under which that performance is known to degrade.",
      "ko": "각 카드는 모델의 의도된 용도, 훈련에 사용된 데이터, 성능을 판단한 지표, 그리고 그 성능이 저하되는 것으로 알려진 모든 집단이나 조건을 명시해야 합니다."
    },
    {
      "en": "Crucially, the card must also name the limitations the team is aware of, even when disclosing them is uncomfortable.",
      "ko": "결정적으로, 카드는 또한 그것을 밝히는 일이 불편하더라도 팀이 인지하고 있는 한계들을 명시해야 합니다."
    },
    {
      "en": "A card that lists only strengths defeats its own purpose and will be returned for revision.",
      "ko": "강점만 나열하는 카드는 그 자체의 목적을 무너뜨리며 수정을 위해 반려될 것입니다."
    },
    {
      "en": "The intent is not to create paperwork but to ensure that whoever later deploys, audits, or retires a model can understand it without tracking down its original authors.",
      "ko": "그 의도는 서류 작업을 만들어 내려는 것이 아니라, 나중에 모델을 배포·감사·폐기하는 누구든 그 원작자를 수소문하지 않고도 모델을 이해할 수 있도록 보장하려는 것입니다."
    },
    {
      "en": "Teams frequently underestimate how quickly the knowledge in a contributor's head evaporates once that person changes roles or leaves.",
      "ko": "팀들은 기여자가 역할을 바꾸거나 떠나면 그 사람의 머릿속 지식이 얼마나 빠르게 증발하는지를 자주 과소평가합니다."
    },
    {
      "en": "A template, along with two fully worked examples, is available on the internal governance portal under the heading Documentation Standards.",
      "ko": "템플릿은 두 개의 완전히 작성된 예시와 함께 사내 거버넌스 포털의 '문서화 표준' 항목에서 이용할 수 있습니다."
    },
    {
      "en": "Cards must be reviewed and signed off by a second engineer who did not build the model, so that blind spots have a chance of being caught.",
      "ko": "카드는 사각지대가 발견될 기회를 갖도록, 그 모델을 구축하지 않은 두 번째 엔지니어가 검토하고 승인해야 합니다."
    },
    {
      "en": "Questions about scope or exemptions should be directed to the Responsible AI Office before, not after, a model's planned release date.",
      "ko": "범위나 예외에 관한 문의는 모델의 예정된 출시일 이후가 아니라 이전에 책임 있는 AI 사무국으로 보내야 합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-modelcards-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇인가?",
      "choices": [
        "To report that several models have been removed from production.",
        "To advertise a training course on building machine learning models.",
        "To announce a new mandatory documentation requirement for models entering production.",
        "To request volunteers to redesign the internal governance portal."
      ],
      "choicesKo": [
        "여러 모델이 운영 환경에서 제거되었음을 보고하기 위해",
        "머신러닝 모델 구축에 관한 교육 과정을 홍보하기 위해",
        "운영 환경에 들어가는 모델에 대한 새로운 필수 문서화 요건을 알리기 위해",
        "사내 거버넌스 포털을 재설계할 자원자를 모집하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "공지는 다음 달 1일부터 승인된 모델 카드 없이는 운영 승격이 불가하다는 새 요건을 알리므로 (다)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-modelcards-q2",
      "prompt": "According to the notice, what will happen to a card that lists only a model's strengths?",
      "promptKo": "공지에 따르면, 모델의 강점만 나열한 카드는 어떻게 되는가?",
      "choices": [
        "It will be returned for revision.",
        "It will be approved automatically without review.",
        "It will be published on the governance portal as an example.",
        "It will exempt the model from a second engineer's sign-off."
      ],
      "choicesKo": [
        "그것은 수정을 위해 반려될 것이다.",
        "그것은 검토 없이 자동으로 승인될 것이다.",
        "그것은 예시로서 거버넌스 포털에 게시될 것이다.",
        "그것은 그 모델을 두 번째 엔지니어의 승인에서 면제해 줄 것이다."
      ],
      "answerIndex": 0,
      "explanation": "본문 'A card that lists only strengths defeats its own purpose and will be returned for revision'에서 근거가 명시되므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-modelcards-q3",
      "prompt": "Why does the notice mention how quickly a contributor's knowledge 'evaporates'?",
      "promptKo": "공지가 기여자의 지식이 얼마나 빨리 '증발'하는지를 언급하는 이유는 무엇인가?",
      "choices": [
        "To suggest that teams should hire more contributors.",
        "To explain why external models are exempt from the requirement.",
        "To warn that model cards become invalid after one month.",
        "To justify documenting models so they remain understandable after their authors are gone."
      ],
      "choicesKo": [
        "팀들이 더 많은 기여자를 채용해야 한다고 제안하기 위해",
        "외부 모델이 요건에서 면제되는 이유를 설명하기 위해",
        "모델 카드가 한 달 뒤 무효가 된다고 경고하기 위해",
        "모델을 문서화하여 그 작성자가 떠난 뒤에도 이해 가능하게 유지하는 일을 정당화하기 위해"
      ],
      "answerIndex": 3,
      "explanation": "본문은 원작자를 수소문하지 않고도 모델을 이해할 수 있어야 한다는 의도 직후 지식의 증발을 언급하므로, 문서화의 정당화라는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-modelcards-q4",
      "prompt": "In the notice, the word \"degrade\" is closest in meaning to",
      "promptKo": "공지에서 단어 \"degrade\"와 의미가 가장 가까운 것은",
      "choices": [
        "improve",
        "worsen",
        "document",
        "stabilize"
      ],
      "choicesKo": [
        "향상되다",
        "악화되다",
        "문서화하다",
        "안정되다"
      ],
      "answerIndex": 1,
      "explanation": "성능이 'degrade'한다는 것은 저하·악화된다는 뜻이므로 'worsen'이 가장 가깝습니다. 반대 의미인 'improve'(향상되다)는 오답입니다. 정답은 (나)입니다.",
      "category": "동의어"
    }
  ]
}
```
