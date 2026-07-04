# Diagnostic — Reading Part 6 (Text Completion)

```json
{
  "id": "diag-rc-p6",
  "part": 6,
  "difficulty": "MEDIUM",
  "passageType": "Notice",
  "passageLines": [
    { "en": "NOTICE: Upcoming Maintenance of the Employee Portal", "ko": "공지: 직원 포털 예정 점검 안내" },
    { "en": "Please be aware that the employee portal will be temporarily ------(1) this Saturday from 10 P.M. to 2 A.M.", "ko": "이번 주 토요일 오후 10시부터 오전 2시까지 직원 포털이 일시적으로 ______(1) 점을 유의해 주시기 바랍니다." },
    { "en": "During this window, our technical team will install several updates that will improve the site's ------(2).", "ko": "이 시간 동안 기술팀이 사이트의 ______(2)을 개선할 여러 업데이트를 설치할 예정입니다." },
    { "en": "------(3)", "ko": "______(3)" },
    { "en": "If you have any urgent requests during the maintenance, please contact the help desk ------(4) phone.", "ko": "점검 중 긴급한 요청이 있으시면, 헬프데스크에 ______(4) 전화로 연락해 주십시오." }
  ],
  "questions": [
    {
      "id": "diag-rc-p6-q1",
      "prompt": "Blank (1): choose the best word.",
      "promptKo": "(1)번 빈칸에 가장 알맞은 것을 고르세요.",
      "choices": ["available", "unavailable", "avoidable", "favorable"],
      "choicesKo": ["이용 가능한", "이용할 수 없는", "피할 수 있는", "우호적인"],
      "answerIndex": 1,
      "explanation": "점검(maintenance) 중에는 포털을 쓸 수 없다는 문맥이므로 'unavailable(이용할 수 없는)'이 정답입니다. 따라서 (나)=1입니다.",
      "category": "어휘"
    },
    {
      "id": "diag-rc-p6-q2",
      "prompt": "Blank (2): choose the best word.",
      "promptKo": "(2)번 빈칸에 가장 알맞은 것을 고르세요.",
      "choices": ["performs", "performing", "performed", "performance"],
      "choicesKo": ["수행하다", "수행하는", "수행된", "성능"],
      "answerIndex": 3,
      "explanation": "소유격 'site's' 뒤 목적어 자리에는 명사가 필요하고, 'improve the site's performance(사이트 성능을 개선하다)'가 자연스러우므로 'performance'가 정답입니다. 따라서 (라)=3입니다.",
      "category": "어형"
    },
    {
      "id": "diag-rc-p6-q3",
      "prompt": "Blank (3): choose the sentence that best fits.",
      "promptKo": "(3)번 빈칸에 들어갈 가장 알맞은 문장을 고르세요.",
      "choices": [
        "The portal should load noticeably faster once the work is complete.",
        "The cafeteria will be closed for renovations next month.",
        "Employees may park in the visitor lot on weekends.",
        "The annual company picnic has been rescheduled."
      ],
      "choicesKo": [
        "작업이 완료되면 포털이 눈에 띄게 더 빠르게 로드될 것입니다.",
        "구내식당은 다음 달 보수 공사로 문을 닫습니다.",
        "직원들은 주말에 방문객 주차장을 이용할 수 있습니다.",
        "연례 회사 야유회 일정이 변경되었습니다."
      ],
      "answerIndex": 0,
      "explanation": "앞 문장이 사이트 성능 개선 업데이트를 설명하므로, 그 결과(더 빠른 로딩)를 이어 말하는 문장이 흐름에 맞습니다. 따라서 (가)=0입니다.",
      "category": "문장삽입"
    },
    {
      "id": "diag-rc-p6-q4",
      "prompt": "Blank (4): choose the best preposition.",
      "promptKo": "(4)번 빈칸에 가장 알맞은 전치사를 고르세요.",
      "choices": ["in", "on", "by", "at"],
      "choicesKo": ["~안에", "~위에", "~로(수단)", "~에"],
      "answerIndex": 2,
      "explanation": "'by phone(전화로)'은 연락 수단을 나타내는 굳어진 표현이므로 'by'가 정답입니다. 따라서 (다)=2입니다.",
      "category": "전치사"
    }
  ]
}
```
