# p7-g-23 — MEDIUM — Fixing the Dashboard Before the Demo (Text Message Chain)

```json
{
  "id": "p7-g-23",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Text Message Chain",
  "passageLines": [
    {
      "en": "Rachel Kim (9:02 A.M.): Hi Tom, the client demo of the sales dashboard is at 2 P.M. today. Is the revenue chart pulling live data yet?",
      "ko": "레이첼 킴 (오전 9시 2분): 안녕하세요 톰, 매출 대시보드 고객 시연이 오늘 오후 2시예요. 매출 차트가 이제 실시간 데이터를 불러오나요?"
    },
    {
      "en": "Tom Alvarez (9:05 A.M.): Almost. It updates every hour, but the numbers for this morning still look off.",
      "ko": "톰 알바레즈 (오전 9시 5분): 거의요. 매시간 갱신되는데, 오늘 아침 수치가 여전히 이상해 보여요."
    },
    {
      "en": "Rachel Kim (9:06 A.M.): Off how?",
      "ko": "레이첼 킴 (오전 9시 6분): 어떻게 이상한데요?"
    },
    {
      "en": "Tom Alvarez (9:08 A.M.): The totals are doubled. I think the data feed is being counted twice.",
      "ko": "톰 알바레즈 (오전 9시 8분): 합계가 두 배로 나와요. 데이터 피드가 두 번 집계되고 있는 것 같아요."
    },
    {
      "en": "Rachel Kim (9:10 A.M.): We can't show doubled revenue to the client. Can you trace where the second feed is coming from?",
      "ko": "레이첼 킴 (오전 9시 10분): 두 배로 늘어난 매출을 고객에게 보여줄 수는 없어요. 두 번째 피드가 어디서 오는지 추적해 줄 수 있어요?"
    },
    {
      "en": "Tom Alvarez (9:12 A.M.): On it. I'll compare the two connections and disable the duplicate.",
      "ko": "톰 알바레즈 (오전 9시 12분): 바로 할게요. 두 연결을 비교해서 중복된 것을 비활성화할게요."
    },
    {
      "en": "Rachel Kim (9:13 A.M.): Great. Let me know by noon so I have time to test it before we present.",
      "ko": "레이첼 킴 (오전 9시 13분): 좋아요. 발표 전에 테스트할 시간이 있도록 정오까지 알려주세요."
    },
    {
      "en": "Tom Alvarez (9:14 A.M.): Will do. I'll send you a screenshot once the totals match the finance report.",
      "ko": "톰 알바레즈 (오전 9시 14분): 그럴게요. 합계가 재무 보고서와 일치하면 스크린샷을 보내드릴게요."
    }
  ],
  "questions": [
    {
      "id": "p7-g-23-q1",
      "prompt": "What is the main topic of the conversation?",
      "promptKo": "이 대화의 주요 주제는 무엇인가?",
      "choices": [
        "Rescheduling a client meeting",
        "Hiring a new data analyst",
        "Choosing colors for a chart",
        "A problem with a dashboard before a demo"
      ],
      "choicesKo": [
        "고객 회의 일정 변경",
        "새 데이터 분석가 채용",
        "차트 색상 선택",
        "시연 전 대시보드 문제"
      ],
      "answerIndex": 3,
      "explanation": "두 사람은 오후 2시 고객 시연 전에 매출 차트의 데이터 오류를 해결하는 문제를 논의하고 있습니다. 따라서 정답은 (라)=3입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-23-q2",
      "prompt": "What problem does Mr. Alvarez identify?",
      "promptKo": "알바레즈 씨는 어떤 문제를 파악하는가?",
      "choices": [
        "The dashboard loads too slowly",
        "The revenue totals are doubled",
        "The client changed the meeting time",
        "The finance report is missing"
      ],
      "choicesKo": [
        "대시보드가 너무 느리게 로드된다",
        "매출 합계가 두 배로 나온다",
        "고객이 회의 시간을 변경했다",
        "재무 보고서가 없다"
      ],
      "answerIndex": 1,
      "explanation": "알바레즈 씨는 'The totals are doubled'라며 데이터 피드가 두 번 집계되는 문제를 지적합니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-23-q3",
      "prompt": "At 9:12 A.M., what does Mr. Alvarez most likely mean when he writes, \"On it\"?",
      "promptKo": "오전 9시 12분에 알바레즈 씨가 \"On it\"이라고 쓴 것은 무엇을 의미할 가능성이 가장 큰가?",
      "choices": [
        "He is standing on the dashboard screen",
        "He disagrees with Ms. Kim's request",
        "He will start working on the problem right away",
        "He has already finished the presentation"
      ],
      "choicesKo": [
        "그는 대시보드 화면 위에 서 있다",
        "그는 킴 씨의 요청에 동의하지 않는다",
        "그는 즉시 그 문제 해결에 착수할 것이다",
        "그는 이미 발표를 끝냈다"
      ],
      "answerIndex": 2,
      "explanation": "중복 피드를 추적해 달라는 요청에 'On it'이라고 답한 것은 즉시 그 문제 해결에 착수하겠다는 의미입니다. 따라서 정답은 (다)=2입니다.",
      "category": "의도·화법"
    },
    {
      "id": "p7-g-23-q4",
      "prompt": "What does Ms. Kim ask Mr. Alvarez to do by noon?",
      "promptKo": "킴 씨는 알바레즈 씨에게 정오까지 무엇을 하라고 요청하는가?",
      "choices": [
        "Update her on the fix",
        "Cancel the client demo",
        "Print the finance report",
        "Add a new chart to the dashboard"
      ],
      "choicesKo": [
        "수정 상황을 그녀에게 알린다",
        "고객 시연을 취소한다",
        "재무 보고서를 인쇄한다",
        "대시보드에 새 차트를 추가한다"
      ],
      "answerIndex": 0,
      "explanation": "킴 씨는 'Let me know by noon'이라며 테스트할 시간을 위해 정오까지 수정 상황을 알려달라고 요청합니다. 따라서 정답은 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-23-q5",
      "prompt": "The word \"trace\" in the message at 9:10 A.M. is closest in meaning to",
      "promptKo": "오전 9시 10분 메시지의 단어 \"trace\"와 의미가 가장 가까운 것은?",
      "choices": [
        "copy",
        "draw",
        "delete",
        "track down"
      ],
      "choicesKo": [
        "복사하다",
        "그리다",
        "삭제하다",
        "찾아내다"
      ],
      "answerIndex": 3,
      "explanation": "'trace where the second feed is coming from'은 두 번째 피드의 출처를 찾아낸다는 의미이므로 'track down(찾아내다)'과 가장 가깝습니다. 따라서 정답은 (라)=3입니다.",
      "category": "동의어"
    }
  ]
}
```
