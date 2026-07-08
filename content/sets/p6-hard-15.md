# p6-hard-15 — Part 6 Memo: Quarterly Budget Review (HARD, 관계사·전치사·문장삽입·태)

```json
{
  "id": "p6-hard-15",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Memo",
  "passageLines": [
    { "en": "To: Department Managers", "ko": "받는 사람: 부서장" },
    { "en": "From: Finance Office", "ko": "보내는 사람: 재무팀" },
    { "en": "Subject: Third-Quarter Budget Review", "ko": "제목: 3분기 예산 검토" },
    { "en": "Please review the attached spreadsheet, ------(1) lists every expense charged to your department this quarter.", "ko": "이번 분기에 귀 부서로 청구된 모든 지출이 나열된 첨부 스프레드시트를 검토해 주십시오. ______(1) 목록입니다." },
    { "en": "Any figure that appears inconsistent with your records should be reported ------(2) Friday.", "ko": "귀 부서 기록과 맞지 않아 보이는 수치는 금요일______(2) 보고되어야 합니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "Corrected reports ------(4) to the finance portal, not emailed to individual staff.", "ko": "수정된 보고서는 개별 직원에게 이메일로 보내지 말고 재무 포털에 ______(4)." }
  ],
  "questions": [
    {
      "id": "p6-hard-15-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["whose", "where", "which", "what"],
      "choicesKo": ["~의(소유격)", "~하는 곳(관계부사)", "~하는(which, 계속적)", "~하는 것"],
      "answerIndex": 2,
      "explanation": "콤마 뒤에서 사물 선행사 spreadsheet를 부연 설명하는 계속적 용법의 주격 관계대명사가 필요하므로 which가 정답입니다. what은 선행사를 취하지 못합니다. 따라서 (다)=2입니다.",
      "category": "관계사"
    },
    {
      "id": "p6-hard-15-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["until", "within", "across", "by"],
      "choicesKo": ["~까지(계속)", "~이내에(+기간)", "~을 가로질러", "~까지(완료)"],
      "answerIndex": 3,
      "explanation": "보고를 금요일까지 '완료'해야 하는 일회성 동작이므로 완료 기한을 나타내는 by가 정답입니다. within은 기간 명사를 요구하고 until은 지속을 뜻해 부적합합니다. 따라서 (라)=3입니다.",
      "category": "전치사"
    },
    {
      "id": "p6-hard-15-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "Accurate reporting now will prevent delays when the annual budget is finalized.",
        "The office holiday party has been moved to the main hall.",
        "New ergonomic chairs have arrived for the design team.",
        "Our social media following has doubled since spring."
      ],
      "choicesKo": [
        "지금 정확히 보고하면 연간 예산 확정 시 지연을 막을 수 있습니다.",
        "사무실 연말 파티가 대강당으로 옮겨졌습니다.",
        "디자인팀을 위한 새 인체공학 의자가 도착했습니다.",
        "우리 소셜 미디어 팔로워가 봄 이후 두 배가 되었습니다."
      ],
      "answerIndex": 0,
      "explanation": "불일치 수치를 기한 내 보고하라는 지시 뒤에, 정확한 보고가 연간 예산 확정 지연을 막는다는 이유·당위를 덧붙이는 문장이 자연스럽게 이어집니다. 나머지는 예산 검토와 무관합니다. 따라서 (가)=0입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-15-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["uploading", "should be uploaded", "upload", "has uploaded"],
      "choicesKo": ["업로드하는 중", "업로드되어야 한다", "업로드하다", "업로드해 왔다"],
      "answerIndex": 1,
      "explanation": "주어 reports는 업로드를 '당하는' 대상이므로 수동태가 필요하고, 지시·의무를 나타내는 맥락이므로 should be uploaded가 정답입니다. 따라서 (나)=1입니다.",
      "category": "태"
    }
  ]
}
```
