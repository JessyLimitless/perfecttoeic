# Set 36 — HARD — Anomaly Detection (Report)

```json
{
  "id": "set-hard-anomaly",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "The fraud-detection model we deployed last month was designed to catch suspicious transactions before they could be completed.",
      "ko": "지난달 배포한 사기 탐지 모델은 의심스러운 거래가 완료되기 전에 이를 잡아내도록 설계되었습니다."
    },
    {
      "en": "While it did identify several genuine fraud attempts, it also flagged a large number of perfectly legitimate purchases as risky.",
      "ko": "이 모델은 실제 사기 시도 몇 건을 식별하기도 했지만, 동시에 완전히 정상적인 구매 다수를 위험한 것으로 표시했습니다."
    },
    {
      "en": "These false positives forced many customers to verify their identity repeatedly, and some abandoned their carts in frustration.",
      "ko": "이러한 오탐은 많은 고객이 신원을 반복적으로 확인하도록 만들었고, 일부는 좌절감에 장바구니를 포기했습니다."
    },
    {
      "en": "Our analysis indicates that the model's sensitivity threshold was set too aggressively, treating minor deviations from normal behavior as fraud.",
      "ko": "분석 결과, 모델의 민감도 임계값이 지나치게 공격적으로 설정되어 정상 행동에서의 사소한 편차까지 사기로 취급한 것으로 나타났습니다."
    },
    {
      "en": "For instance, a customer who simply traveled to a new city or bought an unusually large gift was often treated as a likely fraudster.",
      "ko": "예를 들어, 단지 새로운 도시로 여행했거나 평소보다 비싼 선물을 구매한 고객이 종종 사기 가능성이 높은 사람으로 취급되었습니다."
    },
    {
      "en": "The support team subsequently reported a sharp rise in complaints, and the volume of manual review requests nearly doubled.",
      "ko": "이후 지원팀은 불만이 급증했다고 보고했으며, 수동 검토 요청 건수는 거의 두 배로 늘었습니다."
    },
    {
      "en": "Because every blocked checkout must be reviewed by a human agent, the misfires also drove up our operating costs considerably.",
      "ko": "차단된 모든 결제는 사람이 검토해야 하기 때문에, 이러한 오작동은 운영 비용 또한 상당히 끌어올렸습니다."
    },
    {
      "en": "Crucially, the financial loss from these abandoned purchases appears to exceed the value of the fraud the model successfully prevented.",
      "ko": "결정적으로, 이렇게 포기된 구매로 인한 금전적 손실은 모델이 성공적으로 막아낸 사기의 가치를 넘어서는 것으로 보입니다."
    },
    {
      "en": "We therefore recommend recalibrating this threshold so that the system blocks fewer honest customers while still intercepting clearly fraudulent activity.",
      "ko": "따라서 우리는 이 임계값을 재조정하여 시스템이 명백한 사기 활동은 여전히 차단하면서도 정직한 고객은 더 적게 막도록 할 것을 권장합니다."
    },
    {
      "en": "In addition, we propose adding a secondary scoring step that weighs a customer's long-term history before any purchase is declined.",
      "ko": "또한 우리는 어떤 구매가 거절되기 전에 고객의 장기 이력을 가중치로 반영하는 2차 점수 산정 단계를 추가할 것을 제안합니다."
    },
    {
      "en": "A two-week pilot of the revised settings should let us measure the new balance before any change is rolled out company-wide.",
      "ko": "수정된 설정에 대한 2주간의 시범 운영을 통해 전사적으로 변경 사항을 적용하기 전에 새로운 균형을 측정할 수 있을 것입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-anomaly-q1",
      "prompt": "What is the main purpose of this report?",
      "promptKo": "이 보고서의 주된 목적은 무엇입니까?",
      "choices": [
        "To announce that the fraud-detection model has been permanently shut down",
        "To recruit additional staff for the manual review team",
        "To describe a problem with the deployed model and propose corrective changes",
        "To celebrate the model's success at stopping all fraud"
      ],
      "choicesKo": [
        "사기 탐지 모델이 영구적으로 폐쇄되었음을 알리려고",
        "수동 검토 팀에 추가 인력을 채용하려고",
        "배포된 모델의 문제점을 설명하고 시정 조치를 제안하려고",
        "모델이 모든 사기를 막아낸 성공을 축하하려고"
      ],
      "answerIndex": 2,
      "explanation": "본문은 모델이 정상 거래를 과도하게 차단한 문제(false positives)를 설명한 뒤 임계값 재조정과 2차 점수 단계 추가 등 시정안을 제안합니다. 따라서 문제 설명과 개선안 제안이 목적이므로 정답은 (다)=2입니다. 모델은 폐쇄되지 않았고(가), 인력 채용이나 성공 축하가 주제가 아니므로 (나),(라)는 오답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-anomaly-q2",
      "prompt": "According to the report, why were so many legitimate transactions flagged?",
      "promptKo": "보고서에 따르면, 왜 그렇게 많은 정상 거래가 표시되었습니까?",
      "choices": [
        "The sensitivity threshold was set too aggressively.",
        "Customers entered incorrect payment details.",
        "The server experienced repeated outages.",
        "Fraud attempts increased dramatically last month."
      ],
      "choicesKo": [
        "민감도 임계값이 지나치게 공격적으로 설정되었다.",
        "고객들이 잘못된 결제 정보를 입력했다.",
        "서버에 반복적인 장애가 발생했다.",
        "지난달 사기 시도가 급격히 증가했다."
      ],
      "answerIndex": 0,
      "explanation": "네 번째 문장에서 모델의 민감도 임계값이 지나치게 공격적으로 설정되어 사소한 편차까지 사기로 취급했다고(threshold was set too aggressively) 명시하므로 정답은 (가)=0입니다. 결제 정보 오류, 서버 장애, 사기 급증은 본문에 근거가 없으므로 (나),(다),(라)는 오답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-anomaly-q3",
      "prompt": "What can be inferred about the model's overall effect on the business so far?",
      "promptKo": "지금까지 이 모델이 비즈니스에 미친 전반적 영향에 관해 무엇을 추론할 수 있습니까?",
      "choices": [
        "It has been profitable because it eliminated all manual reviews.",
        "It has had no measurable impact on costs or revenue.",
        "Its downside has likely outweighed the fraud it prevented.",
        "It increased sales by speeding up the checkout process."
      ],
      "choicesKo": [
        "수동 검토를 모두 없앴기 때문에 수익성이 있었다.",
        "비용이나 매출에 측정 가능한 영향을 주지 않았다.",
        "그 단점이 막아낸 사기보다 더 컸을 가능성이 높다.",
        "결제 과정을 빠르게 하여 매출을 늘렸다."
      ],
      "answerIndex": 2,
      "explanation": "여덟 번째 문장에서 포기된 구매로 인한 손실이 막아낸 사기의 가치를 넘어선다고(loss ... appears to exceed the value of the fraud ... prevented) 했고, 수동 검토 요청이 두 배로 늘어 비용이 올랐다고 했으므로, 단점이 이점을 능가했다는 (다)=2가 정답입니다. 수동 검토는 오히려 늘었고(가), 비용 증가가 명시되며(나), 결제는 차단으로 지연되었으므로(라) 모두 오답입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-anomaly-q4",
      "prompt": "In the report, the word \"intercepting\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"intercepting\"과 의미가 가장 가까운 것은?",
      "choices": [
        "permitting",
        "delaying",
        "recording",
        "stopping"
      ],
      "choicesKo": [
        "허용하는",
        "지연시키는",
        "기록하는",
        "차단하는"
      ],
      "answerIndex": 3,
      "explanation": "아홉 번째 문장에서 'intercepting clearly fraudulent activity'는 명백한 사기 활동을 가로채 막는다는 뜻이므로 '차단하는(stopping)' (라)=3이 가장 가깝습니다. 정반대 의미인 '허용하는(permitting)' (가)는 함정 선택지이며, 지연·기록은 의미가 다릅니다.",
      "category": "동의어"
    }
  ]
}
```
