# Set 47 — HARD — Balancing Model Accuracy Against Inference Cost and Latency

```json
{
  "id": "set-hard-costaccuracy",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This report evaluates three candidate models for the \"Smart Reply\" feature, which now handles roughly forty million inference requests each day and is projected to grow further next quarter.",
      "ko": "본 보고서는 현재 하루 약 4천만 건의 추론 요청을 처리하며 다음 분기에 더욱 성장할 것으로 예상되는 \"스마트 답장\" 기능을 위한 세 개의 후보 모델을 평가한다."
    },
    {
      "en": "On a held-out benchmark, the largest model, Model A, achieved the highest quality score of 94.1, but its size makes each call both slow and expensive to serve.",
      "ko": "별도로 보관된 벤치마크에서 가장 큰 모델인 모델 A는 94.1이라는 최고 품질 점수를 달성했지만, 그 크기 때문에 각 호출이 느리면서도 운영 비용이 비싸다."
    },
    {
      "en": "Model B, a distilled variant roughly one-fifth the size, scored 92.6—only about 1.5 points lower—yet returns a response in under half the time and at a fraction of the cost per request.",
      "ko": "약 5분의 1 크기의 증류 변형 모델인 모델 B는 92.6점을 기록해 약 1.5점밖에 낮지 않았지만, 응답을 절반도 안 되는 시간에, 요청당 비용의 극히 일부로 반환한다."
    },
    {
      "en": "Model C was the cheapest of all, but its quality score of 88.3 fell below the threshold our user-experience team considers acceptable for customer-facing text.",
      "ko": "모델 C는 셋 중 가장 저렴했지만, 88.3이라는 품질 점수는 우리 사용자 경험팀이 고객 대면 텍스트에 수용 가능하다고 보는 기준선에 미치지 못했다."
    },
    {
      "en": "At our current volume, the difference in serving cost between Model A and Model B amounts to an estimated savings of several hundred thousand dollars annually, a gap that widens as traffic increases.",
      "ko": "현재 처리량에서 모델 A와 모델 B 사이의 운영 비용 차이는 연간 수십만 달러의 절감액에 이르는 것으로 추정되며, 이 격차는 트래픽이 늘어날수록 더 벌어진다."
    },
    {
      "en": "Equally important, the lower latency of Model B directly improves the perceived responsiveness of the product, a factor that our usability studies repeatedly tie to user retention.",
      "ko": "그에 못지않게 중요한 것은, 모델 B의 더 낮은 지연 시간이 제품의 체감 응답성을 직접적으로 개선한다는 점이며, 이는 우리 사용성 연구가 반복적으로 사용자 유지율과 연결 짓는 요인이다."
    },
    {
      "en": "We acknowledge that for a small set of complex prompts, Model A's extra accuracy is genuinely noticeable, so we do not recommend retiring it entirely.",
      "ko": "우리는 소수의 복잡한 프롬프트에 대해서는 모델 A의 추가적인 정확도가 실제로 체감된다는 점을 인정하므로, 모델 A를 완전히 폐기할 것을 권고하지는 않는다."
    },
    {
      "en": "Instead, we propose deploying Model B as the default for the high-volume feature while routing only the small fraction of difficult requests to Model A.",
      "ko": "대신 우리는 모델 B를 이 대용량 기능의 기본값으로 배포하되, 어려운 요청의 작은 비율만을 모델 A로 라우팅할 것을 제안한다."
    },
    {
      "en": "This tiered approach captures most of the cost and latency benefits without sacrificing quality where it matters most, and it can be revisited once usage patterns stabilize.",
      "ko": "이 계층적 접근법은 가장 중요한 부분의 품질을 희생하지 않으면서도 비용 및 지연 시간 이점의 대부분을 확보하며, 사용 패턴이 안정되면 재검토할 수 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-costaccuracy-q1",
      "prompt": "What is the primary recommendation of the report?",
      "promptKo": "이 보고서의 주된 권고 사항은 무엇인가?",
      "choices": [
        "To use the most accurate model, Model A, for every request",
        "To adopt the cheapest model, Model C, despite its lower quality",
        "To make the cheaper Model B the default while routing difficult requests to Model A",
        "To delay any deployment until traffic stops growing"
      ],
      "choicesKo": [
        "모든 요청에 가장 정확한 모델 A를 사용한다",
        "품질이 낮음에도 가장 저렴한 모델 C를 채택한다",
        "더 저렴한 모델 B를 기본값으로 삼되 어려운 요청은 모델 A로 라우팅한다",
        "트래픽 증가가 멈출 때까지 모든 배포를 미룬다"
      ],
      "answerIndex": 2,
      "explanation": "여덟 번째 문장에서 '모델 B를 기본값으로 배포하되 어려운 요청의 작은 비율만을 모델 A로 라우팅할 것을 제안한다'고 명시하므로 정답은 (다)이다. 모델 C는 기준선에 미달했고(네 번째 문장) 모델 A 단독 사용은 비싸므로 (가), (나)는 오답이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-costaccuracy-q2",
      "prompt": "Why was Model C not recommended for the customer-facing feature?",
      "promptKo": "모델 C가 고객 대면 기능에 권고되지 않은 이유는 무엇인가?",
      "choices": [
        "It was the most expensive model to serve",
        "Its quality score fell below the threshold the UX team considers acceptable",
        "It had the highest latency of the three models",
        "It could not handle forty million requests per day"
      ],
      "choicesKo": [
        "운영하기에 가장 비싼 모델이었기 때문에",
        "품질 점수가 UX팀이 수용 가능하다고 보는 기준선에 미치지 못했기 때문에",
        "세 모델 중 지연 시간이 가장 길었기 때문에",
        "하루 4천만 건의 요청을 처리할 수 없었기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "네 번째 문장에서 모델 C는 가장 저렴했지만 88.3점이 'UX팀이 수용 가능하다고 보는 기준선에 미치지 못했다'고 했으므로 정답은 (나)이다. 본문은 모델 C가 가장 저렴하다고 했으므로 (가)는 모순된다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-costaccuracy-q3",
      "prompt": "What can be inferred about the cost advantage of choosing Model B?",
      "promptKo": "모델 B를 선택하는 것의 비용 이점에 대해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "It will shrink as the feature's traffic grows",
        "It is expected to become larger as request volume increases",
        "It applies only to complex prompts",
        "It disappears once usage patterns stabilize"
      ],
      "choicesKo": [
        "기능의 트래픽이 증가하면 줄어들 것이다",
        "요청량이 증가함에 따라 더 커질 것으로 예상된다",
        "복잡한 프롬프트에만 적용된다",
        "사용 패턴이 안정되면 사라진다"
      ],
      "answerIndex": 1,
      "explanation": "다섯 번째 문장에서 비용 차이가 '트래픽이 늘어날수록 더 벌어진다'고 했고 첫 문장에서 요청량이 더 성장할 것으로 예상되므로, 비용 이점이 더 커진다는 (나)를 추론할 수 있다. 따라서 격차가 줄어든다는 (가)는 정반대이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-costaccuracy-q4",
      "prompt": "In the report, the word \"captures\" is closest in meaning to",
      "promptKo": "보고서에서 단어 \"captures\"와 의미가 가장 가까운 것은?",
      "choices": [
        "measures",
        "forfeits",
        "delays",
        "secures"
      ],
      "choicesKo": [
        "측정하다",
        "상실하다",
        "지연시키다",
        "확보하다"
      ],
      "answerIndex": 3,
      "explanation": "마지막 문장에서 계층적 접근법이 비용 및 지연 시간 이점의 대부분을 'captures' 한다는 것은 그 이점을 확보/획득한다는 의미이므로 'secures'(라)가 정답이다. 'forfeits'(나, 상실하다)는 정반대 의미의 함정 선택지이다.",
      "category": "동의어"
    }
  ]
}
```
