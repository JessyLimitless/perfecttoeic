# p6-hard-13 — Part 6 Email: Benefits Enrollment (HARD, 수일치·전치사·문장삽입·태)

```json
{
  "id": "p6-hard-13",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    { "en": "To: All Employees", "ko": "받는 사람: 전 직원" },
    { "en": "Subject: Annual Benefits Enrollment Now Open", "ko": "제목: 연례 복리후생 등록 시작" },
    { "en": "The enrollment window for next year's health and retirement plans ------(1) on November 1 and closes on November 15.", "ko": "내년도 건강보험 및 퇴직연금 등록 기간이 11월 1일에 ______(1) 11월 15일에 마감됩니다." },
    { "en": "Employees who wish to change their coverage must submit the updated form ------(2) the deadline.", "ko": "보장 내용을 변경하려는 직원은 마감일______(2) 갱신된 양식을 제출해야 합니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "Questions about the plans ------(4) by the Human Resources team during weekly walk-in sessions.", "ko": "제도에 관한 질문은 매주 방문 상담 시간에 인사팀에 의해 ______(4)." }
  ],
  "questions": [
    {
      "id": "p6-hard-13-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["opens", "open", "opening", "to open"],
      "choicesKo": ["열린다", "열다(복수)", "여는", "열기 위해"],
      "answerIndex": 0,
      "explanation": "주어 window는 단수이고 뒤의 closes와 병렬을 이루는 현재시제이므로 opens가 정답입니다. 따라서 (가)=0입니다.",
      "category": "수일치"
    },
    {
      "id": "p6-hard-13-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["until", "by", "during", "among"],
      "choicesKo": ["~까지(계속)", "~까지(완료)", "~동안", "~사이에"],
      "answerIndex": 1,
      "explanation": "제출을 마감일까지 '완료'해야 하는 일회성 동작이므로 완료 시점을 나타내는 by가 정답입니다. until은 지속을 뜻해 부적합합니다. 따라서 (나)=1입니다.",
      "category": "전치사"
    },
    {
      "id": "p6-hard-13-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "The company cafeteria will be renovated next spring.",
        "Our quarterly sales figures exceeded expectations.",
        "Those who take no action will keep their current selections by default.",
        "Parking permits must be renewed at the front desk."
      ],
      "choicesKo": [
        "회사 구내식당이 내년 봄에 개조됩니다.",
        "우리 분기 매출 수치가 예상을 초과했습니다.",
        "아무 조치도 하지 않는 직원은 기본적으로 현재 선택 사항이 유지됩니다.",
        "주차 허가증은 안내 데스크에서 갱신해야 합니다."
      ],
      "answerIndex": 2,
      "explanation": "양식을 제출하는 직원과 대비하여, 조치하지 않으면 현재 설정이 그대로 유지된다는 안내가 등록 절차 흐름에 자연스럽게 이어집니다. 나머지는 복리후생 등록과 무관합니다. 따라서 (다)=2입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-13-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["answer", "is answering", "have answered", "will be answered"],
      "choicesKo": ["답한다", "답하는 중이다", "답해 왔다", "답변될 것이다"],
      "answerIndex": 3,
      "explanation": "주어 Questions는 답변을 '받는' 대상이고 by the Human Resources team이라는 행위자가 있으므로 수동태가 필요하며, 앞으로 있을 상담을 가리키므로 미래 수동태 will be answered가 정답입니다. 따라서 (라)=3입니다.",
      "category": "태"
    }
  ]
}
```
