# p7-g-31 — MEDIUM — Team Online Chat: Dashboard Bug (Online Chat)

```json
{
  "id": "p7-g-31",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Online Chat",
  "passageLines": [
    { "en": "Devon Park [9:02 A.M.]: Morning, everyone. Several clients reported that the sales dashboard isn't loading this morning.", "ko": "데본 박 [오전 9:02]: 안녕하세요, 여러분. 여러 고객이 오늘 아침 매출 대시보드가 로드되지 않는다고 알려 왔어요." },
    { "en": "Mia Torres [9:04 A.M.]: I can confirm it. The main chart just spins and never appears.", "ko": "미아 토레스 [오전 9:04]: 확인됐어요. 메인 차트가 계속 도는데 나타나질 않네요." },
    { "en": "Devon Park [9:05 A.M.]: Did anything change overnight?", "ko": "데본 박 [오전 9:05]: 밤사이 뭔가 바뀐 게 있나요?" },
    { "en": "Raj Patel [9:07 A.M.]: We pushed a database update at 2 A.M. It might be related.", "ko": "라지 파텔 [오전 9:07]: 새벽 2시에 데이터베이스 업데이트를 배포했어요. 그것과 관련 있을 수 있어요." },
    { "en": "Mia Torres [9:08 A.M.]: That would explain it.", "ko": "미아 토레스 [오전 9:08]: 그러면 설명이 되네요." },
    { "en": "Devon Park [9:09 A.M.]: Raj, can you roll it back while we investigate?", "ko": "데본 박 [오전 9:09]: 라지, 조사하는 동안 되돌려 줄 수 있어요?" },
    { "en": "Raj Patel [9:10 A.M.]: On it. Give me ten minutes.", "ko": "라지 파텔 [오전 9:10]: 바로 할게요. 10분만 주세요." },
    { "en": "Devon Park [9:11 A.M.]: Thanks. Mia, could you let the clients know we're already on it?", "ko": "데본 박 [오전 9:11]: 고마워요. 미아, 고객들에게 이미 처리 중이라고 알려 줄 수 있어요?" },
    { "en": "Mia Torres [9:12 A.M.]: Will do.", "ko": "미아 토레스 [오전 9:12]: 그렇게 할게요." }
  ],
  "questions": [
    {
      "id": "p7-g-31-q1",
      "prompt": "What problem is being discussed?",
      "promptKo": "어떤 문제가 논의되고 있는가?",
      "choices": ["A dashboard is not loading", "A client cancelled a contract", "A payment was declined", "An office is closed"],
      "choicesKo": ["대시보드가 로드되지 않는다", "고객이 계약을 취소했다", "결제가 거부되었다", "사무실이 닫혔다"],
      "answerIndex": 0,
      "explanation": "여러 고객이 매출 대시보드가 로드되지 않는다고 알려 온 것이 논의의 핵심입니다. 따라서 정답은 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-31-q2",
      "prompt": "What most likely caused the problem?",
      "promptKo": "무엇이 문제를 일으켰을 가능성이 가장 큰가?",
      "choices": ["A power outage", "An overnight database update", "A client's browser", "A new employee"],
      "choicesKo": ["정전", "밤사이 데이터베이스 업데이트", "고객의 브라우저", "신입 직원"],
      "answerIndex": 1,
      "explanation": "라지가 새벽 2시에 데이터베이스 업데이트를 배포했고 그것과 관련 있을 수 있다고 했으며 미아도 동의합니다. 따라서 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-31-q3",
      "prompt": "At 9:10 A.M., what does Mr. Patel most likely mean when he writes, \"On it\"?",
      "promptKo": "오전 9:10에 파텔 씨가 \"On it\"이라고 쓴 것은 무슨 의미일 가능성이 가장 큰가?",
      "choices": ["He will start rolling back the update", "He is standing on a device", "He disagrees with Devon", "He has finished the task"],
      "choicesKo": ["업데이트 되돌리기를 시작하겠다", "기기 위에 서 있다", "데본과 의견이 다르다", "작업을 이미 끝냈다"],
      "answerIndex": 0,
      "explanation": "롤백을 요청받은 직후 'On it'이라고 답하며 10분을 달라고 했으므로, 지금 그 작업을 시작하겠다는 뜻입니다. 따라서 정답은 (가)=0입니다.",
      "category": "의도·화법"
    },
    {
      "id": "p7-g-31-q4",
      "prompt": "What will Ms. Torres do next?",
      "promptKo": "토레스 씨는 다음에 무엇을 할 것인가?",
      "choices": ["Restart the server", "Contact the clients", "Write a new report", "Approve a budget"],
      "choicesKo": ["서버를 재시작한다", "고객들에게 연락한다", "새 보고서를 작성한다", "예산을 승인한다"],
      "answerIndex": 1,
      "explanation": "데본이 고객들에게 이미 처리 중이라고 알려 달라고 했고 미아가 그렇게 하겠다고 답했습니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-31-q5",
      "prompt": "The phrase \"roll it back\" is closest in meaning to",
      "promptKo": "표현 \"roll it back\"과 의미가 가장 가까운 것은?",
      "choices": ["reverse it", "speed it up", "print it", "sell it"],
      "choicesKo": ["되돌리다", "속도를 높이다", "인쇄하다", "판매하다"],
      "answerIndex": 0,
      "explanation": "'roll it back'은 업데이트를 이전 상태로 '되돌리다'라는 의미이므로 'reverse it'과 가장 가깝습니다. 따라서 정답은 (가)=0입니다.",
      "category": "동의어"
    }
  ]
}
```
