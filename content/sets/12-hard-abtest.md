# Set 12 — HARD — A/B Test Results (Report)

```json
{
  "id": "set-hard-abtest",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Over a four-week period, our team ran an A/B test comparing the original checkout page with a simplified version that removed several optional steps.",
      "ko": "4주 동안 우리 팀은 몇 가지 선택적 단계를 제거한 간소화된 버전과 기존 결제 페이지를 비교하는 A/B 테스트를 진행했습니다."
    },
    {
      "en": "Visitors were randomly assigned to one of the two versions, and the two groups were comparable in size and in past purchasing behavior.",
      "ko": "방문자들은 두 버전 중 하나에 무작위로 배정되었으며, 두 그룹은 규모와 과거 구매 행동 면에서 서로 비슷했습니다."
    },
    {
      "en": "The simplified page increased completed purchases by 8 percent, a result that was statistically significant across both desktop and mobile users.",
      "ko": "간소화된 페이지는 완료된 구매를 8퍼센트 증가시켰으며, 이 결과는 데스크톱과 모바일 사용자 모두에서 통계적으로 유의미했습니다."
    },
    {
      "en": "The improvement was largest among first-time visitors, who appear to have been discouraged by the extra steps on the original page.",
      "ko": "이 개선은 처음 방문한 사용자들 사이에서 가장 컸는데, 이들은 기존 페이지의 추가 단계로 인해 구매를 단념했던 것으로 보입니다."
    },
    {
      "en": "Interestingly, the average order value dropped slightly, because fewer customers added optional items when those upsell prompts were removed from the flow.",
      "ko": "흥미롭게도 평균 주문 금액은 소폭 하락했는데, 이는 추가 판매 안내가 흐름에서 제거되면서 선택 품목을 추가하는 고객이 줄었기 때문입니다."
    },
    {
      "en": "We modeled the net effect by multiplying the higher conversion rate by the slightly lower average value, and total revenue still rose by roughly 5 percent.",
      "ko": "더 높은 전환율에 소폭 낮아진 평균 금액을 곱하여 순효과를 모델링한 결과, 총수익은 여전히 약 5퍼센트 증가했습니다."
    },
    {
      "en": "It is worth noting that the test ran during a period with no major promotions, so seasonal effects are unlikely to explain the gain.",
      "ko": "이 테스트가 주요 프로모션이 없는 기간에 진행되었다는 점에 주목할 필요가 있으며, 따라서 계절적 요인이 이 증가를 설명할 가능성은 낮습니다."
    },
    {
      "en": "One limitation is that we did not track whether customers who skipped the upsell prompts returned later to buy those items separately.",
      "ko": "한 가지 한계는 추가 판매 안내를 건너뛴 고객들이 나중에 그 품목들을 따로 구매하러 돌아왔는지를 추적하지 않았다는 점입니다."
    },
    {
      "en": "If they did, the true decline in order value would be even smaller than our figures suggest.",
      "ko": "만약 그랬다면, 주문 금액의 실제 감소폭은 우리 수치가 보여주는 것보다 훨씬 더 작을 것입니다."
    },
    {
      "en": "Because the gain in completed purchases clearly outweighed the smaller decline in order value, the team recommends adopting the simplified page for all customers.",
      "ko": "완료된 구매에서의 증가가 주문 금액의 더 작은 감소를 분명히 능가했기 때문에, 팀은 모든 고객에게 간소화된 페이지를 도입할 것을 권장합니다."
    },
    {
      "en": "As a follow-up, we propose testing whether a single, well-placed upsell prompt can recover some order value without harming the conversion gains.",
      "ko": "후속 조치로, 우리는 잘 배치된 단일 추가 판매 안내가 전환율 향상을 해치지 않으면서 일부 주문 금액을 회복할 수 있는지 시험해 볼 것을 제안합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-abtest-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "이 보고서의 주된 목적은 무엇입니까?",
      "choices": [
        "To request additional staff for the checkout team",
        "To present A/B test results and recommend adopting the simplified page",
        "To apologize for errors found on the original checkout page",
        "To announce a seasonal promotion for new customers"
      ],
      "choicesKo": [
        "결제 팀에 추가 인력을 요청하기 위해",
        "A/B 테스트 결과를 제시하고 간소화된 페이지 도입을 권장하기 위해",
        "기존 결제 페이지에서 발견된 오류에 대해 사과하기 위해",
        "신규 고객을 위한 계절 프로모션을 발표하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "보고서는 A/B 테스트의 결과(전환율 8퍼센트 증가 등)를 제시하고 마지막 부분에서 간소화된 페이지 도입을 권장하므로 정답은 (나)입니다. 인력 요청, 사과, 프로모션 발표는 본문의 목적이 아닙니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-abtest-q2",
      "prompt": "According to the report, why did the average order value decline?",
      "promptKo": "보고서에 따르면, 평균 주문 금액이 하락한 이유는 무엇입니까?",
      "choices": [
        "Prices on several products were lowered.",
        "Shipping fees were removed from the total.",
        "Fewer customers added optional items.",
        "Many orders were cancelled before payment."
      ],
      "choicesKo": [
        "여러 제품의 가격이 인하되었다.",
        "배송비가 총액에서 제외되었다.",
        "선택 품목을 추가하는 고객이 줄었다.",
        "많은 주문이 결제 전에 취소되었다."
      ],
      "answerIndex": 2,
      "explanation": "다섯 번째 문장에서 추가 판매 안내가 제거되면서 선택 품목을 추가하는 고객이 줄어 평균 주문 금액이 소폭 하락했다고 설명하므로 정답은 (다)입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-abtest-q3",
      "prompt": "What can be inferred about the reported decline in average order value?",
      "promptKo": "보고된 평균 주문 금액 하락에 관해 추론할 수 있는 것은 무엇입니까?",
      "choices": [
        "It may overstate the real loss, since later separate purchases were not tracked.",
        "It was larger among first-time visitors than returning ones.",
        "It made total revenue fall despite the higher conversion rate.",
        "It was caused mainly by seasonal promotions during the test."
      ],
      "choicesKo": [
        "이후의 별도 구매가 추적되지 않아 실제 손실을 과장했을 수 있다.",
        "재방문 고객보다 처음 방문한 고객에게서 더 컸다.",
        "더 높은 전환율에도 불구하고 총수익을 감소시켰다.",
        "주로 테스트 기간의 계절 프로모션 때문에 발생했다."
      ],
      "answerIndex": 0,
      "explanation": "보고서는 추가 판매 안내를 건너뛴 고객이 나중에 따로 구매했는지 추적하지 않았으며, 만약 그랬다면 실제 감소폭이 수치보다 더 작을 것이라고 했습니다. 즉 보고된 하락이 실제 손실을 과장했을 수 있으므로 정답은 (가)입니다. 총수익은 오히려 5퍼센트 증가했습니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-abtest-q4",
      "prompt": "In the report, the word \"outweighed\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"outweighed\"와 의미가 가장 가까운 것은",
      "choices": [
        "delayed",
        "matched",
        "fell short of",
        "exceeded"
      ],
      "choicesKo": [
        "지연시켰다",
        "맞먹었다",
        "미치지 못했다",
        "능가했다"
      ],
      "answerIndex": 3,
      "explanation": "마지막 권장 문장에서 구매 증가가 주문 금액 감소를 'outweighed'했다는 것은 그 이익이 손실보다 더 컸다는 뜻이므로 'exceeded(능가했다)'가 가장 가깝습니다. 따라서 정답은 (라)입니다. 'fell short of(미치지 못했다)'는 반대 의미입니다.",
      "category": "동의어"
    }
  ]
}
```
