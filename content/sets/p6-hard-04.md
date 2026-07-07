# p6-hard-04 — Part 6 Letter: Vendor Transition (HARD, 담화표지·태)

```json
{
  "id": "p6-hard-04",
  "part": 6,
  "difficulty": "HARD",
  "passageType": "Letter",
  "passageLines": [
    { "en": "Dear Valued Customer,", "ko": "고객님께," },
    { "en": "We are writing to inform you that, effective next month, our catering accounts ------(1) by a new regional office.", "ko": "다음 달부터 저희 케이터링 계정이 새로운 지역 사무소에 의해 ______(1) 됨을 알려드립니다." },
    { "en": "This change will not affect your existing contract terms. ------(2), you will continue to work with the same account representative.", "ko": "이 변경은 기존 계약 조건에 영향을 주지 않습니다. ______(2), 귀하는 동일한 담당자와 계속 협업하시게 됩니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "Should you have any questions during the ------(4), please do not hesitate to contact our support line.", "ko": "______(4) 기간 중 문의사항이 있으시면 언제든 저희 지원 창구로 연락 주시기 바랍니다." }
  ],
  "questions": [
    {
      "id": "p6-hard-04-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["will manage", "will be managed", "have managed", "are managing"],
      "choicesKo": ["관리할 것이다", "관리될 것이다", "관리해 왔다", "관리하고 있다"],
      "answerIndex": 1,
      "explanation": "주어 accounts가 관리를 '받는' 대상이고 'by a new regional office'라는 행위자가 있으므로 미래 수동태 will be managed가 정답입니다. 따라서 (나)=1입니다.",
      "category": "태"
    },
    {
      "id": "p6-hard-04-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["Otherwise", "Nonetheless", "In contrast", "In fact"],
      "choicesKo": ["그렇지 않으면", "그럼에도 불구하고", "대조적으로", "실제로"],
      "answerIndex": 3,
      "explanation": "'계약 조건에 영향이 없다'는 앞 문장을 부연·강조하며 '실제로 담당자도 동일하다'로 이어지므로 In fact가 정답입니다. 따라서 (라)=3입니다.",
      "category": "접속부사"
    },
    {
      "id": "p6-hard-04-q3",
      "prompt": "Blank (3): choose the sentence that best fits the blank.",
      "promptKo": "(3)번 빈칸에 문맥상 가장 알맞은 문장을 고르세요.",
      "choices": [
        "Updated contact details for the new office are enclosed with this letter.",
        "We regret that your account will be closed at the end of the year.",
        "Please submit your final payment before the deadline to avoid penalties.",
        "Our menu prices will increase by fifteen percent starting immediately."
      ],
      "choicesKo": [
        "새 사무소의 갱신된 연락처가 이 편지에 동봉되어 있습니다.",
        "귀하의 계정이 연말에 해지되는 점 유감입니다.",
        "위약금을 피하시려면 마감 전에 최종 결제를 완료해 주세요.",
        "저희 메뉴 가격이 즉시 15% 인상됩니다."
      ],
      "answerIndex": 0,
      "explanation": "새 지역 사무소로 이관된다는 흐름에서 '새 사무소 연락처를 동봉했다'는 (가)가 자연스럽게 이어지며, 뒤 문장의 '지원 창구 연락'과도 호응합니다. 나머지는 '계약에 영향 없음'이라는 앞 내용과 모순됩니다. 따라서 (가)=0입니다.",
      "category": "문장삽입"
    },
    {
      "id": "p6-hard-04-q4",
      "prompt": "Blank (4): choose the best word.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 단어를 고르세요.",
      "choices": ["celebration", "renovation", "transition", "inspection"],
      "choicesKo": ["축하 행사", "개조", "이관·전환", "점검"],
      "answerIndex": 2,
      "explanation": "계정 관리 주체가 새 사무소로 바뀌는 '이관·전환' 기간을 가리키므로 transition이 정답입니다. 따라서 (다)=2입니다.",
      "category": "어휘"
    }
  ]
}
```
