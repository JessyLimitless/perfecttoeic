# Set 95 — HARD — Cold-Start Problem (Email)

```json
{
  "id": "set-hard-coldstart",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "To: Recommendations Working Group",
      "ko": "수신: 추천 시스템 작업 그룹"
    },
    {
      "en": "From: Priya Nandakumar, Lead Data Scientist",
      "ko": "발신: 프리야 난다쿠마르, 수석 데이터 과학자"
    },
    {
      "en": "Subject: Tackling the cold-start problem before the autumn launch",
      "ko": "제목: 가을 출시 전에 콜드 스타트 문제 해결하기"
    },
    {
      "en": "As you know, our recommender system performs well for established users whose viewing histories are rich and detailed.",
      "ko": "아시다시피, 우리 추천 시스템은 시청 이력이 풍부하고 상세한 기존 사용자들에게는 잘 작동한다."
    },
    {
      "en": "Its weakness appears at the moment a brand-new user signs up and we have almost no behavioral data to draw on.",
      "ko": "그 약점은 완전히 새로운 사용자가 가입하여 우리가 활용할 행동 데이터가 거의 없는 순간에 나타난다."
    },
    {
      "en": "This gap, commonly called the cold-start problem, also affects newly added items that no one has yet rated.",
      "ko": "흔히 콜드 스타트 문제라 불리는 이 공백은 아직 아무도 평가하지 않은 새로 추가된 항목에도 영향을 미친다."
    },
    {
      "en": "For the upcoming launch, I propose a hybrid approach that leans on content features until enough interaction data accumulates.",
      "ko": "다가오는 출시를 위해, 나는 충분한 상호작용 데이터가 쌓일 때까지 콘텐츠 특성에 의존하는 하이브리드 접근법을 제안한다."
    },
    {
      "en": "Concretely, when a profile is empty, the system will recommend items based on genre, language, and metadata rather than collaborative signals.",
      "ko": "구체적으로, 프로필이 비어 있을 때 시스템은 협업 신호 대신 장르, 언어, 그리고 메타데이터를 기반으로 항목을 추천할 것이다."
    },
    {
      "en": "A brief onboarding survey will also ask new users to pick three favorite topics, giving us an immediate starting signal.",
      "ko": "또한 간단한 온보딩 설문이 신규 사용자에게 좋아하는 주제 세 가지를 고르도록 요청하여, 우리에게 즉각적인 시작 신호를 제공할 것이다."
    },
    {
      "en": "Once a user has logged roughly twenty interactions, the model will gradually shift weight back toward collaborative filtering.",
      "ko": "사용자가 대략 스무 번의 상호작용을 기록하고 나면, 모델은 점차 협업 필터링 쪽으로 가중치를 다시 옮길 것이다."
    },
    {
      "en": "Please review the attached design note and send objections by Friday so engineering can begin the sprint on Monday.",
      "ko": "첨부된 설계 노트를 검토하고 금요일까지 반대 의견을 보내주어 엔지니어링 팀이 월요일에 스프린트를 시작할 수 있도록 해 달라."
    },
    {
      "en": "I am confident this plan will smooth the experience for first-time visitors without disrupting our loyal audience.",
      "ko": "나는 이 계획이 우리의 충성 고객층을 방해하지 않으면서 처음 방문하는 사용자들의 경험을 매끄럽게 만들 것이라 확신한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-coldstart-q1",
      "prompt": "Why did Priya write this email?",
      "promptKo": "프리야는 왜 이 이메일을 썼는가?",
      "choices": [
        "To propose a plan for handling the cold-start problem",
        "To report a server outage in the recommender system",
        "To cancel the autumn product launch",
        "To announce her resignation from the team"
      ],
      "choicesKo": [
        "콜드 스타트 문제를 처리하기 위한 계획을 제안하기 위해",
        "추천 시스템의 서버 장애를 보고하기 위해",
        "가을 제품 출시를 취소하기 위해",
        "팀에서의 사임을 알리기 위해"
      ],
      "answerIndex": 0,
      "explanation": "이메일은 신규 사용자에 대한 콜드 스타트 문제를 다루는 하이브리드 접근법을 제안하고 검토를 요청한다. 따라서 (가)가 정답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-coldstart-q2",
      "prompt": "What will the system use to recommend items when a user profile is empty?",
      "promptKo": "사용자 프로필이 비어 있을 때 시스템은 항목을 추천하기 위해 무엇을 사용할 것인가?",
      "choices": [
        "Randomly selected trending videos",
        "The user's payment history",
        "Other users' collaborative ratings",
        "Genre, language, and metadata"
      ],
      "choicesKo": [
        "무작위로 선택된 인기 동영상",
        "사용자의 결제 이력",
        "다른 사용자들의 협업 평점",
        "장르, 언어, 그리고 메타데이터"
      ],
      "answerIndex": 3,
      "explanation": "본문은 프로필이 비어 있을 때 '협업 신호 대신 장르, 언어, 메타데이터를 기반으로' 추천한다고 명시하므로 (라)가 정답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-coldstart-q3",
      "prompt": "What can be inferred about collaborative filtering in this system?",
      "promptKo": "이 시스템에서 협업 필터링에 대해 추론할 수 있는 것은?",
      "choices": [
        "It works best when there is little or no interaction data",
        "It will be completely removed before the launch",
        "It becomes more useful as a user accumulates interactions",
        "It only applies to newly added items"
      ],
      "choicesKo": [
        "그것은 상호작용 데이터가 거의 또는 전혀 없을 때 가장 잘 작동한다",
        "그것은 출시 전에 완전히 제거될 것이다",
        "그것은 사용자가 상호작용을 축적할수록 더 유용해진다",
        "그것은 새로 추가된 항목에만 적용된다"
      ],
      "answerIndex": 2,
      "explanation": "본문은 사용자가 약 스무 번의 상호작용을 기록하면 모델이 협업 필터링 쪽으로 가중치를 옮긴다고 했다. 즉 상호작용이 쌓일수록 협업 필터링이 더 유용해짐을 추론할 수 있으므로 (다)가 정답이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-coldstart-q4",
      "prompt": "The word \"accumulates\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"accumulates\"와 의미가 가장 가까운 것은?",
      "choices": [
        "disappears",
        "builds up",
        "encrypts",
        "delays"
      ],
      "choicesKo": [
        "사라지다",
        "축적되다",
        "암호화하다",
        "지연시키다"
      ],
      "answerIndex": 1,
      "explanation": "'accumulates'는 '축적되다, 쌓이다'라는 뜻으로 'builds up'과 가장 가깝다. 'disappears(사라지다)'는 반대 의미의 함정 보기이므로 (나)가 정답이다.",
      "category": "동의어"
    }
  ]
}
```
