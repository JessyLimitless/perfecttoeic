# Diagnostic — Listening Part 2 (Question–Response)

> 레벨 진단용 Part 2. 풀(content/listening)과 분리. 오디오 clipId = 각 item id.

```json
{
  "id": "diag-lc-p2",
  "part": 2,
  "difficulty": "MEDIUM",
  "passageType": "Question-Response",
  "items": [
    {
      "id": "diag-lc-p2-q1",
      "promptEn": "Where can I find the latest budget spreadsheet?",
      "promptKo": "최신 예산 스프레드시트는 어디서 찾을 수 있나요?",
      "promptSpeaker": "M",
      "responseSpeaker": "Wgb",
      "responses": [
        { "en": "It's in the shared finance folder.", "ko": "공용 재무 폴더 안에 있어요." },
        { "en": "Every Friday afternoon.", "ko": "매주 금요일 오후요." },
        { "en": "Because the deadline moved.", "ko": "마감일이 옮겨졌기 때문이에요." }
      ],
      "answerIndex": 0,
      "explanation": "위치를 묻는 Where 의문문에는 장소로 답합니다. (A)가 '공용 재무 폴더'라는 위치를 제시하므로 정답. (B)는 시점, (C)는 이유 응답이라 어긋납니다. 따라서 (A)=0입니다.",
      "category": "Where의문문"
    },
    {
      "id": "diag-lc-p2-q2",
      "promptEn": "When is the training session scheduled to begin?",
      "promptKo": "교육 세션은 언제 시작될 예정인가요?",
      "promptSpeaker": "Wau",
      "responseSpeaker": "M",
      "responses": [
        { "en": "In the main conference room.", "ko": "본관 회의실에서요." },
        { "en": "It starts at nine tomorrow morning.", "ko": "내일 오전 아홉 시에 시작해요." },
        { "en": "About forty employees.", "ko": "약 마흔 명 정도요." }
      ],
      "answerIndex": 1,
      "explanation": "시점을 묻는 When 의문문에는 시간으로 답합니다. (B)가 '내일 오전 아홉 시'라는 시점이므로 정답. (A)는 장소, (C)는 인원수 응답입니다. 따라서 (B)=1입니다.",
      "category": "When의문문"
    },
    {
      "id": "diag-lc-p2-q3",
      "promptEn": "Who is leading the new client project?",
      "promptKo": "새 고객 프로젝트는 누가 이끌고 있나요?",
      "promptSpeaker": "Mgb",
      "responseSpeaker": "W",
      "responses": [
        { "en": "Sometime next quarter.", "ko": "다음 분기쯤에요." },
        { "en": "In the downtown office.", "ko": "시내 사무실에서요." },
        { "en": "Ms. Alvarez from the strategy team.", "ko": "전략팀의 알바레즈 씨요." }
      ],
      "answerIndex": 2,
      "explanation": "책임자를 묻는 Who 의문문에는 사람으로 답합니다. (C)가 담당자 이름을 제시하므로 정답. (A)는 시점, (B)는 장소 응답입니다. 따라서 (C)=2입니다.",
      "category": "Who의문문"
    },
    {
      "id": "diag-lc-p2-q4",
      "promptEn": "You've already submitted the expense report, haven't you?",
      "promptKo": "경비 보고서는 이미 제출하셨죠, 그렇지 않나요?",
      "promptSpeaker": "W",
      "responseSpeaker": "Mca",
      "responses": [
        { "en": "Yes, I sent it this morning.", "ko": "네, 오늘 아침에 보냈어요." },
        { "en": "The printer on the third floor.", "ko": "3층에 있는 프린터요." },
        { "en": "A quarterly summary.", "ko": "분기 요약본이요." }
      ],
      "answerIndex": 0,
      "explanation": "부가의문문에는 Yes/No로 답할 수 있습니다. (A)가 '네, 아침에 보냈다'로 자연스럽게 이어지므로 정답. (B)는 장소, (C)는 문서 종류 응답입니다. 따라서 (A)=0입니다.",
      "category": "부가의문문"
    },
    {
      "id": "diag-lc-p2-q5",
      "promptEn": "Would you like the summary as a PDF or a printed copy?",
      "promptKo": "요약본을 PDF로 드릴까요, 아니면 인쇄본으로 드릴까요?",
      "promptSpeaker": "Mau",
      "responseSpeaker": "Wca",
      "responses": [
        { "en": "It was very informative.", "ko": "매우 유익했어요." },
        { "en": "A printed copy would be easier to review.", "ko": "인쇄본이 검토하기 더 편할 것 같아요." },
        { "en": "Around three o'clock.", "ko": "세 시쯤에요." }
      ],
      "answerIndex": 1,
      "explanation": "선택의문문에는 둘 중 하나를 고릅니다. (B)가 '인쇄본'을 선택하므로 정답. (A)는 감상, (C)는 시각 응답입니다. 따라서 (B)=1입니다.",
      "category": "선택의문문"
    },
    {
      "id": "diag-lc-p2-q6",
      "promptEn": "The projector in Room B isn't working again.",
      "promptKo": "B 회의실 프로젝터가 또 작동하지 않아요.",
      "promptSpeaker": "Wgb",
      "responseSpeaker": "M",
      "responses": [
        { "en": "Yes, the presentation was excellent.", "ko": "네, 발표가 훌륭했어요." },
        { "en": "On the second floor.", "ko": "2층에요." },
        { "en": "I'll call the maintenance team right away.", "ko": "제가 바로 시설팀에 전화할게요." }
      ],
      "answerIndex": 2,
      "explanation": "문제 상황을 알리는 평서문에는 해결책을 제안하는 응답이 자연스럽습니다. (C)가 '시설팀에 전화하겠다'는 조치라 정답. (A)는 감상, (B)는 위치 응답입니다. 따라서 (C)=2입니다.",
      "category": "평서문"
    }
  ]
}
```
