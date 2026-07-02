# p7-g-24 — MEDIUM — Data Analytics Service Request Form (Form)

```json
{
  "id": "p7-g-24",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Form",
  "passageLines": [
    {
      "en": "NORTHSTAR ANALYTICS — Internal Service Request Form",
      "ko": "노스스타 애널리틱스 — 내부 서비스 요청서"
    },
    {
      "en": "Submitted by: Elena Vasquez, Marketing Department",
      "ko": "제출자: 엘레나 바스케스, 마케팅 부서"
    },
    {
      "en": "Date submitted: September 3",
      "ko": "제출일: 9월 3일"
    },
    {
      "en": "Type of request: Custom sales report (select one: Dashboard / Custom report / Data export)",
      "ko": "요청 유형: 맞춤 매출 보고서 (택일: 대시보드 / 맞춤 보고서 / 데이터 내보내기)"
    },
    {
      "en": "Description: I need a report comparing product sales across our four regions for the third quarter, broken down by month.",
      "ko": "설명: 3분기 동안 네 개 지역 전체의 제품 매출을 월별로 나누어 비교하는 보고서가 필요합니다."
    },
    {
      "en": "Reason for request: The results will be presented to senior management at the quarterly review on September 18.",
      "ko": "요청 사유: 결과는 9월 18일 분기 검토 회의에서 고위 경영진에게 발표될 것입니다."
    },
    {
      "en": "Priority level: High",
      "ko": "우선순위: 높음"
    },
    {
      "en": "Note: Please include a chart showing which region grew the fastest.",
      "ko": "비고: 어느 지역이 가장 빠르게 성장했는지 보여주는 차트를 포함해 주십시오."
    },
    {
      "en": "--- For Analytics Team Use Only ---",
      "ko": "--- 분석팀 전용 ---"
    },
    {
      "en": "Assigned to: Rahul Mehta",
      "ko": "담당자: 라훌 메타"
    },
    {
      "en": "Status: In progress. A draft has been shared with the requester for review; final delivery is expected by September 12.",
      "ko": "상태: 진행 중. 검토를 위해 초안이 요청자에게 공유되었으며, 최종 전달은 9월 12일까지로 예상됩니다."
    },
    {
      "en": "Team comment: Data for the northern region was incomplete, so figures for July in that region are estimates.",
      "ko": "팀 의견: 북부 지역의 데이터가 불완전하여 해당 지역의 7월 수치는 추정치입니다."
    }
  ],
  "questions": [
    {
      "id": "p7-g-24-q1",
      "prompt": "Why did Ms. Vasquez submit the form?",
      "promptKo": "바스케스 씨는 왜 이 양식을 제출했는가?",
      "choices": [
        "To request a report comparing regional sales",
        "To report a broken dashboard",
        "To apply for a transfer to the analytics team",
        "To schedule the quarterly review meeting"
      ],
      "choicesKo": [
        "지역별 매출을 비교하는 보고서를 요청하려고",
        "고장 난 대시보드를 신고하려고",
        "분석팀으로의 전근을 신청하려고",
        "분기 검토 회의 일정을 잡으려고"
      ],
      "answerIndex": 0,
      "explanation": "요청 유형이 맞춤 매출 보고서이며 네 지역의 3분기 매출을 월별로 비교하는 보고서가 필요하다고 했습니다. 따라서 정답은 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "p7-g-24-q2",
      "prompt": "What does Ms. Vasquez specifically ask to be included?",
      "promptKo": "바스케스 씨가 특별히 포함해 달라고 요청한 것은 무엇인가?",
      "choices": [
        "A summary of customer complaints",
        "A list of employee names",
        "A chart of the fastest-growing region",
        "A forecast for the next quarter"
      ],
      "choicesKo": [
        "고객 불만 요약",
        "직원 이름 목록",
        "가장 빠르게 성장한 지역의 차트",
        "다음 분기 예측"
      ],
      "answerIndex": 2,
      "explanation": "비고란에 'a chart showing which region grew the fastest'를 포함해 달라고 했습니다. 따라서 정답은 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "p7-g-24-q3",
      "prompt": "What is suggested about the report's timing?",
      "promptKo": "보고서의 시기에 대해 무엇이 암시되는가?",
      "choices": [
        "It will be delivered after the review meeting",
        "It will be ready before the September 18 meeting",
        "It has been canceled by management",
        "It will be presented by Mr. Mehta"
      ],
      "choicesKo": [
        "검토 회의 이후에 전달될 것이다",
        "9월 18일 회의 전에 준비될 것이다",
        "경영진에 의해 취소되었다",
        "메타 씨가 발표할 것이다"
      ],
      "answerIndex": 1,
      "explanation": "최종 전달이 9월 12일까지로 예상되고 발표는 9월 18일이므로 회의 전에 준비될 것임을 알 수 있습니다. 따라서 정답은 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "p7-g-24-q4",
      "prompt": "According to the team comment, what is true about the northern region's data?",
      "promptKo": "팀 의견에 따르면 북부 지역 데이터에 대해 사실인 것은 무엇인가?",
      "choices": [
        "It was the fastest-growing region",
        "It was excluded from the report entirely",
        "It was collected by a different team",
        "Some July figures are estimates"
      ],
      "choicesKo": [
        "가장 빠르게 성장한 지역이었다",
        "보고서에서 완전히 제외되었다",
        "다른 팀이 수집했다",
        "일부 7월 수치는 추정치이다"
      ],
      "answerIndex": 3,
      "explanation": "북부 지역 데이터가 불완전하여 7월 수치가 추정치라고 했습니다. 따라서 정답은 (라)=3입니다.",
      "category": "사실확인"
    },
    {
      "id": "p7-g-24-q5",
      "prompt": "The phrase \"broken down\" in the description is closest in meaning to",
      "promptKo": "설명란의 어구 \"broken down\"과 의미가 가장 가까운 것은?",
      "choices": [
        "separated",
        "damaged",
        "reduced",
        "delayed"
      ],
      "choicesKo": [
        "나누어진",
        "손상된",
        "줄어든",
        "지연된"
      ],
      "answerIndex": 0,
      "explanation": "'broken down by month'는 월별로 나누어진다는 의미이므로 'separated(나누어진)'와 가장 가깝습니다. 따라서 정답은 (가)=0입니다.",
      "category": "동의어"
    }
  ]
}
```
