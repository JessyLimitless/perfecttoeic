# Personalization Experiment Report

```json
{
  "id": "set-hard-personalization",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "Our recent personalization experiment replaced the static homepage feed with one ranked by each user's past interactions.",
      "ko": "최근 개인화 실험에서는 정적인 홈페이지 피드를 각 사용자의 과거 상호작용을 기준으로 정렬한 피드로 교체했습니다."
    },
    {
      "en": "Among active users with rich behavioral histories, the new model lifted click-through rates by roughly fourteen percent.",
      "ko": "풍부한 행동 이력을 가진 활성 사용자들 사이에서 새 모델은 클릭률을 약 14퍼센트 끌어올렸습니다."
    },
    {
      "en": "For newly registered users, however, the effect was negligible, since the system had almost no signals on which to base its recommendations.",
      "ko": "그러나 신규 가입 사용자의 경우, 시스템이 추천의 근거로 삼을 신호가 거의 없었기 때문에 그 효과는 미미했습니다."
    },
    {
      "en": "This so-called cold-start problem currently limits the gains we can realize across our entire audience.",
      "ko": "이른바 콜드 스타트 문제는 현재 우리가 전체 사용자층에서 실현할 수 있는 이익을 제한하고 있습니다."
    },
    {
      "en": "We therefore recommend supplementing the behavioral model with content-based signals, such as article topics and product attributes, so that even users without a history can receive relevant suggestions.",
      "ko": "따라서 우리는 행동 기반 모델을 기사 주제나 제품 속성과 같은 콘텐츠 기반 신호로 보완하여, 이력이 없는 사용자조차 관련성 있는 추천을 받을 수 있도록 할 것을 권장합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-personalization-q1",
      "prompt": "What was the main finding of the experiment?",
      "promptKo": "실험의 주요 결과는 무엇이었습니까?",
      "choices": [
        "The new feed helped active users but barely affected new users.",
        "The new feed reduced click-through rates for all users.",
        "Active and new users responded almost identically.",
        "The static feed outperformed the personalized feed overall."
      ],
      "choicesKo": [
        "새 피드는 활성 사용자에게 도움이 되었지만 신규 사용자에게는 거의 영향을 주지 못했다.",
        "새 피드는 모든 사용자의 클릭률을 떨어뜨렸다.",
        "활성 사용자와 신규 사용자가 거의 동일하게 반응했다.",
        "정적 피드가 전반적으로 개인화 피드를 능가했다."
      ],
      "answerIndex": 0,
      "explanation": "본문은 활성 사용자에게서 클릭률이 약 14퍼센트 상승했으나(lifted click-through rates by roughly fourteen percent) 신규 사용자에게는 효과가 미미했다고(the effect was negligible) 명시하므로 정답은 0번입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-personalization-q2",
      "prompt": "Why did the model perform poorly for newly registered users?",
      "promptKo": "그 모델이 신규 가입 사용자에게 성과가 저조했던 이유는 무엇입니까?",
      "choices": [
        "Their accounts were not yet verified.",
        "They preferred the older static homepage.",
        "The system had almost no data about their behavior.",
        "Their devices could not load the new feed."
      ],
      "choicesKo": [
        "그들의 계정이 아직 인증되지 않았다.",
        "그들은 이전의 정적 홈페이지를 선호했다.",
        "시스템에 그들의 행동에 관한 데이터가 거의 없었다.",
        "그들의 기기가 새 피드를 불러올 수 없었다."
      ],
      "answerIndex": 2,
      "explanation": "본문은 시스템이 추천의 근거로 삼을 신호가 거의 없었다고(almost no signals on which to base its recommendations) 설명하므로 정답은 1번입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-personalization-q3",
      "prompt": "What can be inferred about content-based signals?",
      "promptKo": "콘텐츠 기반 신호에 관해 무엇을 추론할 수 있습니까?",
      "choices": [
        "They require each user to have a long interaction history.",
        "They are expected to be removed in the next release.",
        "They are less accurate than behavioral signals for active users.",
        "They can produce relevant recommendations without prior user behavior."
      ],
      "choicesKo": [
        "각 사용자가 긴 상호작용 이력을 가져야 한다.",
        "다음 릴리스에서 제거될 예정이다.",
        "활성 사용자에게는 행동 신호보다 덜 정확하다.",
        "사전 사용자 행동 없이도 관련성 있는 추천을 생성할 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 콘텐츠 기반 신호를 추가하면 이력이 없는 사용자조차 관련성 있는 추천을 받을 수 있다고(even users without a history can receive relevant suggestions) 했으므로, 사전 행동 없이도 추천이 가능하다는 2번이 정답입니다.",
      "category": "추론"
    }
  ]
}
```
