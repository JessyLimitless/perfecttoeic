# p6-hard-06 — Part 6 Notice: Office Access System (HARD, 관계사·태·문장삽입·전치사)

```json
{
  "id": "p6-hard-06",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    { "en": "Notice to All Building Occupants", "ko": "전 건물 입주자 안내" },
    { "en": "Starting Monday, the lobby turnstiles will be linked to a new badge system ------(1) verifies each employee's clearance level automatically.", "ko": "월요일부터 로비 개찰구가 각 직원의 출입 등급을 자동으로 확인하는 새 배지 시스템에 ______(1) 연결됩니다." },
    { "en": "Temporary passes ------(2) at the front desk for visitors who have registered in advance.", "ko": "사전에 등록한 방문객을 위한 임시 출입증이 안내 데스크에서 ______(2)." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "We ask for your cooperation ------(4) the first week while staff adjust to the updated procedure.", "ko": "직원들이 갱신된 절차에 적응하는 첫 주 ______(4) 협조를 부탁드립니다." }
  ],
  "questions": [
    {
      "id": "p6-hard-06-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["what", "whose", "that", "where"],
      "choicesKo": ["~하는 것", "~의", "~하는(관계대명사)", "~하는 곳"],
      "answerIndex": 2,
      "explanation": "선행사 system을 수식하고 뒤에 동사 verifies가 이어지는 주격 관계대명사 자리이므로 that이 정답입니다. what은 선행사를 취하지 못하고, whose·where는 뒤 구조와 맞지 않습니다. 따라서 (다)=2입니다.",
      "category": "관계사"
    },
    {
      "id": "p6-hard-06-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["will be issued", "will issue", "have issued", "are issuing"],
      "choicesKo": ["발급될 것이다", "발급할 것이다", "발급해 왔다", "발급하고 있다"],
      "answerIndex": 0,
      "explanation": "주어 passes는 발급을 '받는' 대상이고 아직 시행 전 미래 일이므로 미래 수동태 will be issued가 정답입니다. 따라서 (가)=0입니다.",
      "category": "태"
    },
    {
      "id": "p6-hard-06-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "The cafeteria will introduce a new seasonal menu next quarter.",
        "Parking permits are unrelated to this change and remain valid.",
        "Employees who forget their badges should report to security for a same-day pass.",
        "Last year's renovation added two additional meeting rooms."
      ],
      "choicesKo": [
        "구내식당이 다음 분기에 새 계절 메뉴를 선보입니다.",
        "주차 허가증은 이 변경과 무관하며 계속 유효합니다.",
        "배지를 잊은 직원은 보안팀에 문의해 당일 출입증을 받으세요.",
        "작년 개조로 회의실 두 개가 추가되었습니다."
      ],
      "answerIndex": 2,
      "explanation": "배지 시스템·임시 출입증이라는 출입 절차 흐름에서 '배지를 잊은 경우 보안팀에서 당일 출입증을 받으라'는 (다)가 자연스럽게 이어지고, 뒤의 '절차 적응' 문장과도 호응합니다. 따라서 (다)=2입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-06-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["among", "during", "along", "between"],
      "choicesKo": ["~중에(셋 이상)", "~동안", "~을 따라", "~사이에"],
      "answerIndex": 1,
      "explanation": "'the first week'라는 특정 기간을 나타내므로 기간 전치사 during이 정답입니다. 따라서 (나)=1입니다.",
      "category": "전치사"
    }
  ]
}
```
