# Part 7 — Single Passage: Text Message Chain (배송 지연·의도 파악)

```json
{
  "id": "m1-p7-1-single-06",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Text Message Chain",
  "passageLines": [
    { "en": "Marcus Bell (10:02 A.M.): Hi Priya, the flowers for the Kimura reception haven't arrived yet. The event starts at noon.", "ko": "마커스 벨 (오전 10:02): 안녕하세요 프리야, 키무라 연회에 쓸 꽃이 아직 도착하지 않았어요. 행사가 정오에 시작해요." },
    { "en": "Priya Nandi (10:05 A.M.): Let me check with the driver. He left the shop at 9:15, so he should be close.", "ko": "프리야 난디 (오전 10:05): 기사에게 확인해 볼게요. 9시 15분에 가게를 출발했으니 거의 다 왔을 거예요." },
    { "en": "Priya Nandi (10:11 A.M.): He's stuck behind an accident on Route 9. Traffic is barely moving.", "ko": "프리야 난디 (오전 10:11): 9번 도로 사고 때문에 발이 묶였대요. 차가 거의 안 움직인다네요." },
    { "en": "Marcus Bell (10:13 A.M.): That's cutting it close. Is there any way to reroute him?", "ko": "마커스 벨 (오전 10:13): 시간이 빠듯하네요. 다른 길로 우회시킬 방법이 있을까요?" },
    { "en": "Priya Nandi (10:15 A.M.): I'll have him take the Willow Street exit and come in from the east. That should save fifteen minutes.", "ko": "프리야 난디 (오전 10:15): 윌로 스트리트 출구로 빠져 동쪽에서 들어오라고 할게요. 그러면 15분은 절약될 거예요." },
    { "en": "Marcus Bell (10:16 A.M.): You're a lifesaver. I'll let the client know the arrangements are on the way.", "ko": "마커스 벨 (오전 10:16): 정말 다행이에요. 고객에게 꽃 장식이 오는 중이라고 알려 둘게요." }
  ],
  "questions": [
    {
      "id": "m1-p7-1-single-06-q1",
      "prompt": "What problem does Mr. Bell report?",
      "promptKo": "벨 씨가 알리는 문제는 무엇인가?",
      "choices": ["A client canceled an event.", "An invoice was incorrect.", "A delivery has not arrived on time.", "A driver quit unexpectedly."],
      "choicesKo": ["고객이 행사를 취소했다.", "청구서가 잘못되었다.", "배송이 제때 도착하지 않았다.", "기사가 갑자기 그만두었다."],
      "answerIndex": 2,
      "explanation": "정오 행사에 쓸 꽃이 아직 도착하지 않았다는 것이 벨 씨가 알리는 문제입니다. 취소·청구서·퇴사는 언급되지 않습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-1-single-06-q2",
      "prompt": "At 10:16 A.M., what does Mr. Bell most likely mean when he writes, \"You're a lifesaver\"?",
      "promptKo": "오전 10:16에 벨 씨가 \"정말 다행이에요\"라고 쓴 것은 무엇을 의미할 가능성이 큰가?",
      "choices": ["He is grateful that Ms. Nandi found a faster route.", "He wants Ms. Nandi to deliver the flowers herself.", "He is asking Ms. Nandi to call the client.", "He thinks the event should be postponed."],
      "choicesKo": ["난디 씨가 더 빠른 길을 찾아 준 것에 고마워한다.", "난디 씨가 직접 꽃을 배달해 주기를 바란다.", "난디 씨에게 고객에게 전화하라고 요청한다.", "행사를 미뤄야 한다고 생각한다."],
      "answerIndex": 0,
      "explanation": "난디 씨가 우회로로 15분을 절약할 방법을 제시하자 벨 씨가 감사를 표한 것입니다. 직접 배달·전화 요청·연기 제안이 아닙니다. 따라서 (가)=0입니다.",
      "category": "의도·화법"
    },
    {
      "id": "m1-p7-1-single-06-q3",
      "prompt": "What does Ms. Nandi say she will do?",
      "promptKo": "난디 씨가 하겠다고 말한 것은 무엇인가?",
      "choices": ["Send a second driver", "Refund the delivery fee", "Cancel the order", "Direct the driver to a different exit"],
      "choicesKo": ["두 번째 기사를 보낸다", "배송비를 환불한다", "주문을 취소한다", "기사를 다른 출구로 안내한다"],
      "answerIndex": 3,
      "explanation": "난디 씨는 기사에게 윌로 스트리트 출구로 빠져 동쪽에서 들어오게 하겠다고 했습니다. 추가 기사·환불·취소는 언급되지 않습니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    }
  ]
}
```
