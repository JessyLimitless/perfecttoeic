# Set 67 — HARD — Retrieval Evaluation (Report)

```json
{
  "id": "set-hard-retrievaleval",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "Our support assistant answers customer questions by first retrieving relevant passages from the help center, then composing a reply grounded in what it found.",
      "ko": "우리의 지원 어시스턴트는 먼저 헬프 센터에서 관련 단락을 검색한 뒤, 찾은 내용에 근거한 답변을 작성하는 방식으로 고객 질문에 답합니다."
    },
    {
      "en": "For months we evaluated only the final answer, asking reviewers whether the reply was helpful, and we were puzzled by a stubborn rate of confidently wrong responses.",
      "ko": "수개월 동안 우리는 최종 답변만 평가하며 검토자에게 그 답변이 유용했는지를 물었는데, 자신 있게 틀린 응답의 끈질긴 비율에 당혹스러웠습니다."
    },
    {
      "en": "This quarter we separated the system into its two stages and measured each on its own, a change that immediately clarified where the failures were born.",
      "ko": "이번 분기에 우리는 시스템을 두 단계로 분리하여 각각을 따로 측정했으며, 이 변화는 실패가 어디에서 생겨나는지를 즉시 명확히 해 주었습니다."
    },
    {
      "en": "The retrieval stage was scored on whether the passages it surfaced actually contained the answer, independent of what the model later wrote.",
      "ko": "검색 단계는 모델이 나중에 무엇을 썼는지와 무관하게, 그것이 끌어올린 단락이 실제로 답을 담고 있었는지로 채점되었습니다."
    },
    {
      "en": "The generation stage was scored on a narrower question: given the passages it was handed, did the model's answer stay faithful to them?",
      "ko": "생성 단계는 더 좁은 질문으로 채점되었습니다. 즉 건네받은 단락이 주어졌을 때, 모델의 답변이 그것에 충실했는가입니다."
    },
    {
      "en": "The results were lopsided in a revealing way.",
      "ko": "결과는 시사하는 바가 큰 방식으로 한쪽으로 치우쳐 있었습니다."
    },
    {
      "en": "Generation faithfulness was strong: when the right passage was in front of it, the model summarized it accurately roughly nine times out of ten.",
      "ko": "생성 충실도는 우수했습니다. 올바른 단락이 앞에 있을 때, 모델은 대략 열 번 중 아홉 번 그것을 정확히 요약했습니다."
    },
    {
      "en": "Retrieval, by contrast, fetched a passage that actually contained the answer only about two-thirds of the time.",
      "ko": "반면 검색은 답을 실제로 담은 단락을 약 3분의 2의 경우에만 가져왔습니다."
    },
    {
      "en": "The lesson is uncomfortable but actionable: most of our confidently wrong answers were not the model inventing facts, but the model faithfully summarizing the wrong document.",
      "ko": "그 교훈은 불편하지만 실행 가능합니다. 우리의 자신 있게 틀린 답변 대부분은 모델이 사실을 지어낸 것이 아니라, 모델이 잘못된 문서를 충실히 요약한 것이었습니다."
    },
    {
      "en": "That distinction matters because the two failures call for opposite fixes, and a team measuring only the final answer would likely have spent its effort on the stage that was already working.",
      "ko": "그 구분이 중요한 이유는, 두 실패가 정반대의 해법을 요구하기 때문이며, 최종 답변만 측정하는 팀은 이미 잘 작동하던 단계에 노력을 쏟았을 가능성이 큽니다."
    },
    {
      "en": "We therefore recommend redirecting this quarter's investment toward the retrieval index — better chunking and embeddings — rather than further tuning a generation step that is not where the problem lives.",
      "ko": "따라서 우리는 이번 분기의 투자를 문제가 있는 곳이 아닌 생성 단계를 더 조정하는 대신, 검색 인덱스 — 더 나은 청킹과 임베딩 — 쪽으로 돌릴 것을 권고합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-retrievaleval-q1",
      "prompt": "What change did the team make this quarter?",
      "promptKo": "팀은 이번 분기에 어떤 변화를 주었는가?",
      "choices": [
        "They measured the retrieval and generation stages separately instead of judging only the final answer.",
        "They replaced the help center with a new product manual.",
        "They stopped evaluating the assistant altogether.",
        "They asked customers to rate every reply themselves."
      ],
      "choicesKo": [
        "최종 답변만 판단하는 대신 검색 단계와 생성 단계를 따로 측정했다.",
        "헬프 센터를 새로운 제품 설명서로 교체했다.",
        "어시스턴트 평가를 아예 중단했다.",
        "고객에게 모든 답변을 직접 평가하도록 요청했다."
      ],
      "answerIndex": 0,
      "explanation": "본문 'we separated the system into its two stages and measured each on its own'에서 두 단계를 분리 측정했다고 했으므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-retrievaleval-q2",
      "prompt": "What did the measurements reveal about the source of most wrong answers?",
      "promptKo": "측정 결과는 틀린 답변 대부분의 원인에 관해 무엇을 드러냈는가?",
      "choices": [
        "The model was inventing facts that appeared in no document.",
        "The model was faithfully summarizing the wrong document that retrieval had fetched.",
        "Customers were misreading correct answers.",
        "The generation stage failed about a third of the time."
      ],
      "choicesKo": [
        "모델이 어떤 문서에도 없는 사실을 지어내고 있었다.",
        "모델이 검색이 가져온 잘못된 문서를 충실히 요약하고 있었다.",
        "고객이 옳은 답변을 잘못 읽고 있었다.",
        "생성 단계가 약 3분의 1의 경우에 실패했다."
      ],
      "answerIndex": 1,
      "explanation": "본문은 자신 있게 틀린 답변 대부분이 사실 날조가 아니라 '모델이 잘못된 문서를 충실히 요약한 것'이라 했으므로 (나)가 정답입니다. 충실도는 약 90%였으므로 (라)는 틀립니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-retrievaleval-q3",
      "prompt": "Why does the report warn against teams that measure only the final answer?",
      "promptKo": "리포트가 최종 답변만 측정하는 팀에 대해 경고하는 이유는 무엇인가?",
      "choices": [
        "The final answer is the only thing customers care about.",
        "Such teams always retrieve the correct passage on the first try.",
        "Measuring the final answer is technically impossible.",
        "Such teams might invest effort in the generation stage, which was already working well."
      ],
      "choicesKo": [
        "고객은 최종 답변만 신경 쓰기 때문에",
        "그런 팀은 항상 첫 시도에 올바른 단락을 검색하기 때문에",
        "최종 답변을 측정하는 것은 기술적으로 불가능하기 때문에",
        "그런 팀은 이미 잘 작동하던 생성 단계에 노력을 투자할 수 있기 때문에"
      ],
      "answerIndex": 3,
      "explanation": "본문은 최종 답변만 보는 팀이 '이미 잘 작동하던 단계'(생성)에 노력을 쏟았을 가능성이 크다고 했으므로 (라)가 정답입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-retrievaleval-q4",
      "prompt": "In the report, the word \"lopsided\" is closest in meaning to",
      "promptKo": "리포트에서 단어 \"lopsided\"와 의미가 가장 가까운 것은",
      "choices": [
        "perfectly balanced",
        "entirely random",
        "unevenly weighted toward one side",
        "carefully hidden"
      ],
      "choicesKo": [
        "완벽하게 균형 잡힌",
        "전적으로 무작위인",
        "한쪽으로 고르지 않게 치우친",
        "신중하게 숨겨진"
      ],
      "answerIndex": 2,
      "explanation": "'The results were lopsided'는 결과가 한쪽(생성 우수, 검색 부진)으로 치우쳤다는 뜻이므로 'unevenly weighted toward one side'(다)가 가장 가깝습니다. 'perfectly balanced'는 반대입니다.",
      "category": "동의어"
    }
  ]
}
```
