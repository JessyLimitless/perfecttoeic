# p7-g-16 — MEDIUM — Dashboard Bug Before the Client Meeting (Text Message Chain)

```json
{
  "id": "p7-g-16",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Text Message Chain",
  "passageLines": [
    {
      "en": "Priya Nair (9:02 A.M.): Hi Tom, are the sales figures on the client dashboard updated for this morning's presentation?",
      "ko": "프리야 나이르 (오전 9시 2분): 안녕하세요 톰, 오늘 아침 발표를 위해 고객 대시보드의 판매 수치가 업데이트되었나요?"
    },
    {
      "en": "Tom Becker (9:04 A.M.): I just checked. The chart still shows last week's numbers, not yesterday's.",
      "ko": "톰 베커 (오전 9시 4분): 방금 확인했어요. 차트가 어제 수치가 아니라 여전히 지난주 수치를 보여주고 있어요."
    },
    {
      "en": "Priya Nair (9:05 A.M.): That's a problem. The meeting with Vertex Retail starts at 10:30.",
      "ko": "프리야 나이르 (오전 9시 5분): 그건 문제네요. 버텍스 리테일과의 회의가 10시 30분에 시작해요."
    },
    {
      "en": "Tom Becker (9:07 A.M.): I think the overnight data import failed. I can run it again by hand, but it takes about forty minutes.",
      "ko": "톰 베커 (오전 9시 7분): 야간 데이터 가져오기가 실패한 것 같아요. 수동으로 다시 실행할 수 있는데, 약 40분 걸려요."
    },
    {
      "en": "Priya Nair (9:08 A.M.): Can you have it ready before ten?",
      "ko": "프리야 나이르 (오전 9시 8분): 10시 전에 준비할 수 있나요?"
    },
    {
      "en": "Tom Becker (9:09 A.M.): If I start now, yes. Should I also refresh the regional breakdown, or just the totals?",
      "ko": "톰 베커 (오전 9시 9분): 지금 시작하면 가능해요. 지역별 세부 내역도 새로 고칠까요, 아니면 합계만 할까요?"
    },
    {
      "en": "Priya Nair (9:10 A.M.): Just the totals for now. Vertex mainly cares about overall growth.",
      "ko": "프리야 나이르 (오전 9시 10분): 지금은 합계만요. 버텍스는 주로 전체 성장에 관심이 있어요."
    },
    {
      "en": "Tom Becker (9:11 A.M.): Understood. I'll message you the moment the numbers are live.",
      "ko": "톰 베커 (오전 9시 11분): 알겠어요. 수치가 반영되는 즉시 메시지 보낼게요."
    },
    {
      "en": "Priya Nair (9:12 A.M.): You're a lifesaver. I'll print the handouts once you confirm.",
      "ko": "프리야 나이르 (오전 9시 12분): 정말 큰 도움이 됐어요. 확인해 주시면 유인물을 인쇄할게요."
    }
  ],
  "questions": [
    {
      "id": "p7-g-16-q1",
      "prompt": "What problem does Mr. Becker identify?",
      "promptKo": "베커 씨는 어떤 문제를 발견하는가?",
      "choices": [
        "The dashboard is showing outdated sales numbers",
        "The client meeting has been canceled",
        "The presentation slides are missing",
        "The regional data is more important than the totals"
      ],
      "choicesKo": [
        "대시보드가 오래된 판매 수치를 보여주고 있다",
        "고객 회의가 취소되었다",
        "발표 슬라이드가 없어졌다",
        "지역별 데이터가 합계보다 더 중요하다"
      ],
      "answerIndex": 0,
      "explanation": "베커 씨는 차트가 'last week's numbers, not yesterday's'를 보여주며 야간 데이터 가져오기가 실패한 것 같다고 합니다. 따라서 정답은 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-16-q2",
      "prompt": "At 9:07 A.M., what does Mr. Becker suggest is the cause of the issue?",
      "promptKo": "오전 9시 7분에 베커 씨는 문제의 원인이 무엇이라고 시사하는가?",
      "choices": [
        "A power outage in the office",
        "An error made by the client",
        "A printer that stopped working",
        "A failed overnight data import"
      ],
      "choicesKo": [
        "사무실의 정전",
        "고객이 저지른 실수",
        "작동을 멈춘 프린터",
        "실패한 야간 데이터 가져오기"
      ],
      "answerIndex": 3,
      "explanation": "베커 씨는 'I think the overnight data import failed'라고 하며 문제의 원인을 야간 데이터 가져오기 실패로 봅니다. 따라서 정답은 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-16-q3",
      "prompt": "At 9:10 A.M., what does Ms. Nair most likely mean when she writes, \"Just the totals for now\"?",
      "promptKo": "오전 9시 10분에 나이르 씨가 \"지금은 합계만요\"라고 쓴 것은 무슨 의미이겠는가?",
      "choices": [
        "She wants Mr. Becker to cancel the import",
        "She thinks the totals are incorrect",
        "She wants him to skip the regional breakdown to save time",
        "She prefers to hold the meeting later"
      ],
      "choicesKo": [
        "그녀는 베커 씨가 가져오기를 취소하기를 원한다",
        "그녀는 합계가 부정확하다고 생각한다",
        "그녀는 시간을 아끼기 위해 지역별 세부 내역을 생략하기를 원한다",
        "그녀는 회의를 나중에 열기를 선호한다"
      ],
      "answerIndex": 2,
      "explanation": "베커 씨가 지역별 세부 내역도 새로 고칠지 묻자 나이르 씨는 합계만 하라고 답합니다. 시간이 촉박하므로 지역별 작업을 생략해 시간을 아끼려는 의도입니다. 따라서 정답은 (다)=2입니다.",
      "category": "의도·화법"
    },
    {
      "id": "p7-g-16-q4",
      "prompt": "What will Ms. Nair do after Mr. Becker confirms the numbers?",
      "promptKo": "베커 씨가 수치를 확인해 준 후 나이르 씨는 무엇을 할 것인가?",
      "choices": [
        "Postpone the meeting",
        "Print the handouts",
        "Contact Vertex Retail",
        "Run the import herself"
      ],
      "choicesKo": [
        "회의를 연기한다",
        "유인물을 인쇄한다",
        "버텍스 리테일에 연락한다",
        "직접 가져오기를 실행한다"
      ],
      "answerIndex": 1,
      "explanation": "나이르 씨는 'I'll print the handouts once you confirm'이라고 했으므로 확인 후 유인물을 인쇄할 것입니다. 따라서 정답은 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-16-q5",
      "prompt": "The word \"live\" in the message sent at 9:11 A.M. is closest in meaning to",
      "promptKo": "오전 9시 11분에 보낸 메시지의 단어 \"live\"와 의미가 가장 가까운 것은?",
      "choices": [
        "in person",
        "recorded",
        "alive",
        "active"
      ],
      "choicesKo": [
        "직접 만나서",
        "녹화된",
        "살아 있는",
        "활성화된"
      ],
      "answerIndex": 3,
      "explanation": "'the numbers are live'는 수치가 대시보드에 반영되어 사용 가능한 상태라는 뜻이므로 'active(활성화된)'와 가장 가깝습니다. 따라서 정답은 (라)=3입니다.",
      "category": "동의어"
    }
  ]
}
```
