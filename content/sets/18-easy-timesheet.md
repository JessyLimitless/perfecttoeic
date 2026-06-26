# Set 18 — EASY — Monthly Timesheet Reminder (Notice)

```json
{
  "id": "set-easy-timesheet",
  "difficulty": "EASY",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Monthly timesheets and expense reports are due soon.",
      "ko": "공지: 월간 근무시간표와 비용 보고서 제출 기한이 곧 다가옵니다."
    },
    {
      "en": "This reminder is for all members of the Analytics Department.",
      "ko": "이 안내는 분석 부서의 모든 구성원을 위한 것입니다."
    },
    {
      "en": "Both documents must be submitted by 5:00 P.M. on the last business day of the month.",
      "ko": "두 문서 모두 월 마지막 영업일 오후 5시까지 제출해야 합니다."
    },
    {
      "en": "Please upload your files through the HR portal rather than sending them by email.",
      "ko": "파일은 이메일로 보내지 말고 인사 포털을 통해 업로드해 주시기 바랍니다."
    },
    {
      "en": "Log in to the portal with your usual employee account.",
      "ko": "평소 사용하는 직원 계정으로 포털에 로그인하시면 됩니다."
    },
    {
      "en": "Be sure to attach a receipt for every expense you list.",
      "ko": "기재하는 모든 비용에 대해 영수증을 반드시 첨부해 주시기 바랍니다."
    },
    {
      "en": "Reports without receipts may be sent back for correction.",
      "ko": "영수증이 없는 보고서는 수정을 위해 반려될 수 있습니다."
    },
    {
      "en": "Late submissions will delay the processing of your expense reimbursement.",
      "ko": "제출이 늦어지면 비용 환급 처리가 지연됩니다."
    },
    {
      "en": "Approved payments are usually added to the next monthly paycheck.",
      "ko": "승인된 지급액은 보통 다음 달 급여에 포함됩니다."
    },
    {
      "en": "Setting a calendar reminder a few days early can help you avoid delays.",
      "ko": "며칠 일찍 캘린더 알림을 설정해 두면 지연을 피하는 데 도움이 됩니다."
    },
    {
      "en": "If you have any questions, please contact the finance team.",
      "ko": "문의 사항이 있으시면 재무팀에 연락해 주시기 바랍니다."
    },
    {
      "en": "Thank you for submitting your documents on time.",
      "ko": "문서를 제때 제출해 주셔서 감사합니다."
    }
  ],
  "questions": [
    {
      "id": "set-easy-timesheet-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇입니까?",
      "choices": [
        "To cancel this month's expense reimbursements",
        "To announce a change in office hours",
        "To introduce a new finance team member",
        "To remind staff to submit timesheets and expense reports"
      ],
      "choicesKo": [
        "이번 달 비용 환급을 취소하기 위해",
        "근무 시간 변경을 알리기 위해",
        "새 재무팀원을 소개하기 위해",
        "직원에게 근무시간표와 비용 보고서 제출을 상기시키기 위해"
      ],
      "answerIndex": 3,
      "explanation": "공지 전체가 월간 근무시간표와 비용 보고서를 기한 내에 제출하라는 안내에 초점을 맞추고 있으므로 정답은 (라)=3입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-easy-timesheet-q2",
      "prompt": "How should employees submit their documents?",
      "promptKo": "직원들은 문서를 어떻게 제출해야 합니까?",
      "choices": [
        "By email to the finance team",
        "In person at the front desk",
        "Through the HR portal",
        "By mail to the Analytics Department"
      ],
      "choicesKo": [
        "재무팀에 이메일로",
        "안내 데스크에 직접 방문하여",
        "인사 포털을 통해",
        "분석 부서로 우편으로"
      ],
      "answerIndex": 2,
      "explanation": "지문에서 'Please upload your files through the HR portal rather than sending them by email.'라고 했으므로 직원들은 인사 포털을 통해 제출해야 합니다. 따라서 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-timesheet-q3",
      "prompt": "What can be inferred about a report that has no receipts?",
      "promptKo": "영수증이 없는 보고서에 대해 무엇을 추론할 수 있습니까?",
      "choices": [
        "It may not be accepted as is",
        "It is paid faster than others",
        "It is approved automatically",
        "It does not need to be submitted"
      ],
      "choicesKo": [
        "그대로는 받아들여지지 않을 수 있다",
        "다른 것보다 더 빨리 지급된다",
        "자동으로 승인된다",
        "제출할 필요가 없다"
      ],
      "answerIndex": 0,
      "explanation": "지문에서 'Reports without receipts may be sent back for correction.'라고 했으므로 영수증이 없는 보고서는 그대로 처리되지 않고 반려될 수 있음을 추론할 수 있습니다. 따라서 정답은 (가)=0입니다.",
      "category": "추론"
    },
    {
      "id": "set-easy-timesheet-q4",
      "prompt": "The word \"delay\" in the notice is closest in meaning to",
      "promptKo": "공지에서 단어 \"delay\"와 의미가 가장 가까운 것은?",
      "choices": [
        "complete",
        "slow down",
        "speed up",
        "approve"
      ],
      "choicesKo": [
        "완료하다",
        "늦추다",
        "앞당기다",
        "승인하다"
      ],
      "answerIndex": 1,
      "explanation": "'delay'는 처리를 '늦추다, 지연시키다'라는 뜻이므로 'slow down'과 의미가 가장 가깝습니다. 'speed up(앞당기다)'은 반대 의미의 오답입니다. 따라서 정답은 (나)=1입니다.",
      "category": "동의어"
    }
  ]
}
```
