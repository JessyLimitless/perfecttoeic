# Set 92 — HARD — Shadow Deployment (Email)

```json
{
  "id": "set-hard-shadowdeploy",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Proposal to Run the New Pricing Model in Shadow Before Launch",
      "ko": "제목: 출시 전 새 가격 책정 모델을 섀도우로 실행하자는 제안"
    },
    {
      "en": "Hi Priya, following yesterday's review, I want to formalize my recommendation that we put the revised pricing model into a shadow deployment for at least two weeks before it touches any real customer.",
      "ko": "안녕하세요 Priya, 어제 검토에 이어 저는 개정된 가격 책정 모델이 실제 고객에 닿기 전에 최소 2주 동안 섀도우 배포에 두자는 제 권고를 공식화하고자 합니다."
    },
    {
      "en": "In a shadow setup, the new model receives a copy of every live request and produces a prediction, but its output is logged rather than shown to users.",
      "ko": "섀도우 구성에서 새 모델은 모든 실시간 요청의 사본을 받아 예측을 생성하지만, 그 출력은 사용자에게 표시되지 않고 기록됩니다."
    },
    {
      "en": "This lets us compare its behavior against the current model under genuine production load without exposing customers to any risk.",
      "ko": "이는 고객을 어떤 위험에도 노출시키지 않으면서 실제 프로덕션 부하 하에서 새 모델의 동작을 현재 모델과 비교할 수 있게 해줍니다."
    },
    {
      "en": "You may recall that our last release looked flawless in offline tests yet behaved erratically once it met the messy distribution of real traffic.",
      "ko": "지난 출시가 오프라인 테스트에서는 완벽해 보였지만 실제 트래픽의 지저분한 분포를 만나자 불규칙하게 작동했던 것을 기억하실 겁니다."
    },
    {
      "en": "A shadow run would have surfaced that discrepancy days earlier and spared us the emergency rollback.",
      "ko": "섀도우 실행이었다면 그 불일치를 며칠 더 일찍 드러내어 우리가 긴급 롤백을 면하게 해주었을 것입니다."
    },
    {
      "en": "The main cost is infrastructure, since we must provision enough capacity to score every request twice for the duration of the trial.",
      "ko": "주된 비용은 인프라인데, 시험 기간 동안 모든 요청을 두 번 채점할 수 있는 충분한 용량을 확보해야 하기 때문입니다."
    },
    {
      "en": "Even so, I believe the expense is modest compared with the reputational damage of a faulty price reaching the storefront.",
      "ko": "그렇더라도 잘못된 가격이 매장에 도달했을 때의 평판 손상에 비하면 그 비용은 미미하다고 생각합니다."
    },
    {
      "en": "To be clear, a shadow deployment does not validate the customer-facing experience, so we will still need a brief canary phase afterward before a full launch.",
      "ko": "분명히 말씀드리면, 섀도우 배포는 고객 대면 경험을 검증하지는 못하므로, 전면 출시 전에 이후 짧은 카나리 단계가 여전히 필요할 것입니다."
    },
    {
      "en": "Could we secure your sign-off by Thursday so the platform team can reserve the additional compute in time?",
      "ko": "플랫폼 팀이 제때 추가 컴퓨팅 자원을 예약할 수 있도록 목요일까지 승인을 받을 수 있을까요?"
    },
    {
      "en": "I'm happy to walk through the logging design in person whenever it suits your schedule.",
      "ko": "일정이 맞으실 때 언제든 직접 로깅 설계를 함께 살펴보면 기쁘겠습니다."
    },
    {
      "en": "Best regards,\nDaniel",
      "ko": "감사합니다,\nDaniel 드림"
    }
  ],
  "questions": [
    {
      "id": "set-hard-shadowdeploy-q1",
      "prompt": "Why did Daniel write this email?",
      "promptKo": "Daniel은 왜 이 이메일을 썼는가?",
      "choices": [
        "To report that the new pricing model has already launched",
        "To recommend testing the new pricing model in shadow before launch and seek approval",
        "To cancel a planned canary phase for the pricing model",
        "To request the hiring of an additional platform engineer"
      ],
      "choicesKo": [
        "새 가격 책정 모델이 이미 출시되었음을 보고하기 위해",
        "출시 전에 새 가격 책정 모델을 섀도우로 테스트할 것을 권고하고 승인을 구하기 위해",
        "가격 책정 모델의 예정된 카나리 단계를 취소하기 위해",
        "추가 플랫폼 엔지니어 채용을 요청하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "Daniel은 개정된 가격 책정 모델을 출시 전 섀도우 배포에 두자고 공식 권고하며 목요일까지 승인을 요청한다. 따라서 (나)가 정답이다. 그는 이후 카나리 단계가 여전히 필요하다고 했으므로 (다)는 틀리다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-shadowdeploy-q2",
      "prompt": "According to the email, what happens to the new model's output in a shadow deployment?",
      "promptKo": "이메일에 따르면, 섀도우 배포에서 새 모델의 출력은 어떻게 되는가?",
      "choices": [
        "It is shown directly to a small share of customers.",
        "It replaces the current model's output entirely.",
        "It is recorded but not displayed to users.",
        "It is discarded without being stored."
      ],
      "choicesKo": [
        "소수 고객에게 직접 표시된다.",
        "현재 모델의 출력을 완전히 대체한다.",
        "기록되지만 사용자에게 표시되지 않는다.",
        "저장되지 않고 폐기된다."
      ],
      "answerIndex": 2,
      "explanation": "이메일은 섀도우 구성에서 새 모델이 모든 요청의 사본을 받아 예측을 생성하되 '그 출력은 사용자에게 표시되지 않고 기록된다'고 했다. 따라서 (다)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-shadowdeploy-q3",
      "prompt": "What can be inferred about the company's most recent model release?",
      "promptKo": "회사의 가장 최근 모델 출시에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It had to be rolled back because of unexpected problems in production.",
        "It was tested in shadow for two weeks beforehand.",
        "It performed poorly in offline tests from the start.",
        "It never reached real customer traffic."
      ],
      "choicesKo": [
        "프로덕션에서의 예기치 못한 문제로 롤백되어야 했다.",
        "사전에 2주 동안 섀도우로 테스트되었다.",
        "처음부터 오프라인 테스트에서 성능이 나빴다.",
        "실제 고객 트래픽에 결코 도달하지 못했다."
      ],
      "answerIndex": 0,
      "explanation": "이메일은 지난 출시가 오프라인 테스트에서는 완벽했지만 실제 트래픽에서 불규칙하게 작동했고, 섀도우 실행이었다면 '긴급 롤백을 면하게' 해주었을 것이라고 했다. 즉 실제로 긴급 롤백이 있었음을 추론할 수 있으므로 (가)가 정답이다. 오프라인에서는 완벽해 보였으므로 (다)는 틀리다.",
      "category": "추론"
    },
    {
      "id": "set-hard-shadowdeploy-q4",
      "prompt": "The word \"surfaced\" in the email is closest in meaning to",
      "promptKo": "이메일에서 단어 \"surfaced\"와 의미가 가장 가까운 것은",
      "choices": [
        "concealed",
        "delayed",
        "approved",
        "revealed"
      ],
      "choicesKo": [
        "감추었다",
        "지연시켰다",
        "승인했다",
        "드러냈다"
      ],
      "answerIndex": 3,
      "explanation": "'would have surfaced that discrepancy'는 그 불일치를 '드러냈을' 것이라는 뜻이므로 'revealed(드러냈다)'가 가장 가깝다. 따라서 (라)가 정답이다. (가) 'concealed(감추었다)'는 반의어다.",
      "category": "동의어"
    }
  ]
}
```
