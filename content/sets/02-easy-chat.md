# Set 2 — EASY — Survey Results Handoff (Text Message Chain)

```json
{
  "id": "set-easy-chat",
  "difficulty": "EASY",
  "passageType": "Text Message Chain",
  "passageLines": [
    {
      "en": "Daniel (2:14 P.M.): Hi Sora, are the survey results ready? The client just asked for them.",
      "ko": "Daniel (오후 2:14): 소라 님, 설문 결과 준비됐나요? 방금 고객사가 요청했어요."
    },
    {
      "en": "Sora (2:16 P.M.): Almost. I'm just cleaning up the last chart now.",
      "ko": "Sora (오후 2:16): 거의요. 지금 마지막 차트만 정리하고 있어요."
    },
    {
      "en": "Daniel (2:17 P.M.): Great. Can you send them by 3:00?",
      "ko": "Daniel (오후 2:17): 좋아요. 3시까지 보내줄 수 있어요?"
    },
    {
      "en": "Sora (2:18 P.M.): No problem. I'll email the file to you and the client together.",
      "ko": "Sora (오후 2:18): 문제없어요. 파일을 당신과 고객사에 함께 이메일로 보낼게요."
    },
    {
      "en": "Daniel (2:19 P.M.): Perfect. How many people answered the survey in the end?",
      "ko": "Daniel (오후 2:19): 완벽해요. 결국 설문에 몇 명이 응답했나요?"
    },
    {
      "en": "Sora (2:20 P.M.): We got 250 responses, which is higher than we expected.",
      "ko": "Sora (오후 2:20): 250건의 응답을 받았는데, 예상보다 많아요."
    },
    {
      "en": "Daniel (2:21 P.M.): That's great news. The client will be happy with that number.",
      "ko": "Daniel (오후 2:21): 정말 좋은 소식이네요. 고객사가 그 수치를 보고 기뻐할 거예요."
    },
    {
      "en": "Sora (2:22 P.M.): I also added a short summary at the top so the results are easy to read.",
      "ko": "Sora (오후 2:22): 결과를 보기 쉽게 맨 위에 짧은 요약도 추가했어요."
    },
    {
      "en": "Daniel (2:23 P.M.): Good idea. Could you highlight the main trend in the summary?",
      "ko": "Daniel (오후 2:23): 좋은 생각이에요. 요약에서 주요 추세를 강조해 줄 수 있어요?"
    },
    {
      "en": "Sora (2:24 P.M.): Sure, I'll point out that most customers prefer the mobile app.",
      "ko": "Sora (오후 2:24): 물론이죠. 대부분의 고객이 모바일 앱을 선호한다는 점을 짚어 둘게요."
    },
    {
      "en": "Daniel (2:25 P.M.): Thanks, Sora. Let me know once the email is sent.",
      "ko": "Daniel (오후 2:25): 고마워요, 소라 님. 이메일을 보내면 알려 주세요."
    },
    {
      "en": "Sora (2:26 P.M.): Will do. It should be in your inbox before 3:00.",
      "ko": "Sora (오후 2:26): 그럴게요. 3시 전에 받은 편지함에 도착할 거예요."
    }
  ],
  "questions": [
    {
      "id": "set-easy-chat-q1",
      "prompt": "What are the two people mainly discussing?",
      "promptKo": "두 사람은 주로 무엇에 대해 이야기하고 있는가?",
      "choices": [
        "Fixing a broken computer",
        "Planning a new survey",
        "Sending the survey results to a client",
        "Booking a meeting room"
      ],
      "choicesKo": [
        "고장 난 컴퓨터를 고치는 일",
        "새 설문을 계획하는 일",
        "설문 결과를 고객사에 보내는 일",
        "회의실을 예약하는 일"
      ],
      "answerIndex": 2,
      "explanation": "Daniel이 설문 결과가 준비됐는지 묻고, Sora가 고객사에 파일을 보내겠다고 답하는 등 대화 전체가 설문 결과를 고객사에 보내는 일에 관한 것입니다. 따라서 정답은 (다)=2입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-easy-chat-q2",
      "prompt": "How many people answered the survey?",
      "promptKo": "설문에 응답한 사람은 몇 명인가?",
      "choices": [
        "250 people",
        "150 people",
        "300 people",
        "500 people"
      ],
      "choicesKo": [
        "250명",
        "150명",
        "300명",
        "500명"
      ],
      "answerIndex": 0,
      "explanation": "오후 2:20에 Sora가 '250건의 응답을 받았다'고 했으므로 정답은 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-chat-q3",
      "prompt": "What will the summary most likely point out?",
      "promptKo": "요약은 무엇을 강조할 가능성이 가장 큰가?",
      "choices": [
        "That the survey took too long",
        "That the client paid late",
        "That the team needs more staff",
        "That most customers prefer the mobile app"
      ],
      "choicesKo": [
        "설문이 너무 오래 걸렸다는 점",
        "고객사가 늦게 지불했다는 점",
        "팀에 직원이 더 필요하다는 점",
        "대부분의 고객이 모바일 앱을 선호한다는 점"
      ],
      "answerIndex": 3,
      "explanation": "오후 2:24에 Sora가 '대부분의 고객이 모바일 앱을 선호한다는 점을 짚어 두겠다'고 했으므로, 요약은 그 점을 강조할 것입니다. 따라서 정답은 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "set-easy-chat-q4",
      "prompt": "At 2:18 P.M., the phrase \"No problem\" is closest in meaning to",
      "promptKo": "오후 2:18에 \"No problem\"과 의미가 가장 가까운 것은?",
      "choices": [
        "I am very busy",
        "That is fine",
        "I am not sure",
        "I cannot do that"
      ],
      "choicesKo": [
        "나는 매우 바쁘다",
        "괜찮다",
        "나는 잘 모르겠다",
        "나는 그것을 할 수 없다"
      ],
      "answerIndex": 1,
      "explanation": "'No problem'은 요청에 흔쾌히 동의하는 표현으로 'That is fine(괜찮다)'과 의미가 가장 가깝습니다. 'I cannot do that(할 수 없다)'은 반대 의미이므로 오답입니다. 따라서 정답은 (나)=1입니다.",
      "category": "동의어"
    }
  ]
}
```
