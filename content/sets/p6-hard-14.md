# p6-hard-14 — Part 6 Notice: Warehouse Scanners (HARD, 태·어휘·접속사·문장삽입)

```json
{
  "id": "p6-hard-14",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    { "en": "Notice: New Handheld Scanners in the Distribution Center", "ko": "안내: 물류센터 신규 휴대용 스캐너" },
    { "en": "Starting Monday, all outgoing shipments ------(1) with the new handheld scanners before they leave the loading dock.", "ko": "월요일부터 모든 출고 화물은 하역장을 떠나기 전 신형 휴대용 스캐너로 ______(1)." },
    { "en": "The devices sync automatically, so staff no longer need to enter tracking numbers ------(2).", "ko": "이 기기는 자동으로 동기화되므로 직원은 더 이상 추적 번호를 ______(2) 입력할 필요가 없습니다." },
    { "en": "------(3) the system flags an item as damaged, set it aside for inspection.", "ko": "시스템이 물품을 손상으로 표시할 ______(3), 검사를 위해 따로 두십시오." },
    { "en": "------(4)", "ko": "______(4)" }
  ],
  "questions": [
    {
      "id": "p6-hard-14-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["will scan", "will be scanned", "scanning", "have scanned"],
      "choicesKo": ["스캔할 것이다", "스캔될 것이다", "스캔하는", "스캔해 왔다"],
      "answerIndex": 1,
      "explanation": "주어 shipments는 스캔을 '당하는' 대상이고 월요일부터 시행되는 미래 규정이므로 미래 수동태 will be scanned가 정답입니다. 따라서 (나)=1입니다.",
      "category": "태"
    },
    {
      "id": "p6-hard-14-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["briefly", "rarely", "manually", "openly"],
      "choicesKo": ["잠깐", "드물게", "수동으로", "공개적으로"],
      "answerIndex": 2,
      "explanation": "기기가 자동 동기화되므로 더 이상 '손으로' 번호를 입력할 필요가 없다는 대비 구조에서 manually(수동으로)가 정답입니다. 따라서 (다)=2입니다.",
      "category": "어휘"
    },
    {
      "id": "p6-hard-14-q3",
      "prompt": "Blank (3): choose the best word.",
      "promptKo": "(3)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["Despite", "Therefore", "In case of", "Whenever"],
      "choicesKo": ["~에도 불구하고", "그러므로", "~의 경우에(+명사)", "~할 때마다"],
      "answerIndex": 3,
      "explanation": "뒤에 절(the system flags ...)이 이어지므로 절을 이끄는 접속사가 필요하고, '표시할 때마다 따로 두라'는 반복 상황을 나타내므로 Whenever가 정답입니다. In case of는 명사를 취해 부적합합니다. 따라서 (라)=3입니다.",
      "category": "접속사"
    },
    {
      "id": "p6-hard-14-q4",
      "prompt": "Blank (4): choose the sentence that best fits the blank.",
      "promptKo": "(4)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "A short training video is available on the warehouse intranet.",
        "The break room vending machines will now accept mobile payments.",
        "Annual performance reviews will begin in December.",
        "Visitors must sign in at the security desk before entering."
      ],
      "choicesKo": [
        "짧은 교육 영상을 창고 인트라넷에서 볼 수 있습니다.",
        "휴게실 자판기가 이제 모바일 결제를 받습니다.",
        "연례 인사 평가가 12월에 시작됩니다.",
        "방문객은 입장 전 보안 데스크에서 서명해야 합니다."
      ],
      "answerIndex": 0,
      "explanation": "새 스캐너 사용법을 설명한 공지의 마무리로, 사용법을 익힐 수 있는 교육 영상을 안내하는 문장이 자연스럽게 이어집니다. 나머지는 스캐너 도입과 무관합니다. 따라서 (가)=0입니다.",
      "category": "문장삽입"
    }
  ]
}
```
