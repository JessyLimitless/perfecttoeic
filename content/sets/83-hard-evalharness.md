# Set 83 — HARD — Building an Evaluation Harness (Email)

```json
{
  "id": "set-hard-evalharness",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Standing up an evaluation harness before we ship the summarization feature",
      "ko": "제목: 요약 기능을 출시하기 전에 평가 하니스를 구축하기"
    },
    {
      "en": "Hi team, as we approach the launch of the document-summarization feature, I want to make sure we are not flying blind on quality.",
      "ko": "안녕하세요 팀, 문서 요약 기능의 출시가 다가오는 만큼, 우리가 품질에 관해 깜깜이로 가지 않도록 확실히 하고 싶습니다."
    },
    {
      "en": "Right now we judge changes by reading a handful of outputs and trusting our gut, which simply will not scale as the model is updated.",
      "ko": "지금 우리는 출력물 몇 개를 읽고 직감을 믿는 방식으로 변경을 판단하는데, 이는 모델이 업데이트됨에 따라 결코 확장되지 않을 것입니다."
    },
    {
      "en": "I am proposing that we build a proper evaluation harness before, not after, the feature goes live.",
      "ko": "저는 기능이 가동되기 전에, 나중이 아니라, 제대로 된 평가 하니스를 구축하자고 제안합니다."
    },
    {
      "en": "The first piece is a fixed, version-controlled dataset of representative documents paired with reference summaries that we agree are good.",
      "ko": "첫 번째 요소는 우리가 좋다고 동의한 참조 요약과 짝지어진, 대표적인 문서들의 고정되고 버전 관리되는 데이터셋입니다."
    },
    {
      "en": "Because summary quality is subjective, no single automatic score captures it, so the harness should combine several complementary signals.",
      "ko": "요약 품질은 주관적이어서 어떤 단일 자동 점수도 그것을 포착하지 못하므로, 하니스는 여러 보완적 신호를 결합해야 합니다."
    },
    {
      "en": "Alongside conventional overlap metrics, I want to add a model-graded check that flags summaries which introduce facts absent from the source.",
      "ko": "기존의 중첩 지표와 더불어, 저는 원문에 없는 사실을 도입하는 요약을 표시하는 모델 채점 검사를 추가하고 싶습니다."
    },
    {
      "en": "Crucially, the whole suite must run automatically on every pull request, so a regression is caught the moment it is introduced rather than weeks later in production.",
      "ko": "결정적으로, 전체 모음은 모든 풀 리퀘스트에서 자동으로 실행되어야 하며, 그래야 회귀가 몇 주 뒤 운영 환경에서가 아니라 도입되는 순간 포착됩니다."
    },
    {
      "en": "I do want to be candid that an imperfect harness can mislead us if we treat its numbers as gospel.",
      "ko": "다만 솔직히 말하자면, 우리가 그 수치를 절대적 진리로 취급한다면 불완전한 하니스가 우리를 오도할 수 있습니다."
    },
    {
      "en": "For that reason I suggest we keep a small slice of human review on every release, even once the automated scores look healthy.",
      "ko": "그런 이유로 저는 자동화된 점수가 건강해 보이더라도 모든 릴리스에 대해 인간 검토의 작은 부분을 유지하자고 제안합니다."
    },
    {
      "en": "Could each of you reply with the document types your customers care about most, so the evaluation set reflects real usage rather than our assumptions?",
      "ko": "여러분 각자가 고객이 가장 신경 쓰는 문서 유형으로 회신해 주실 수 있을까요? 그래야 평가 셋이 우리의 가정이 아니라 실제 사용을 반영하게 됩니다."
    },
    {
      "en": "I would like to lock the dataset by Friday so engineering has a clear target to build against next sprint.",
      "ko": "엔지니어링이 다음 스프린트에 맞춰 구축할 명확한 목표를 갖도록, 저는 금요일까지 데이터셋을 확정하고 싶습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-evalharness-q1",
      "prompt": "What is the main purpose of the email?",
      "promptKo": "이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that the summarization feature has already launched.",
        "To propose building an evaluation harness for the summarization feature before it ships.",
        "To cancel the summarization feature due to poor quality.",
        "To request approval for hiring additional reviewers."
      ],
      "choicesKo": [
        "요약 기능이 이미 출시되었음을 알리기 위해",
        "요약 기능이 출시되기 전에 평가 하니스를 구축하자고 제안하기 위해",
        "품질 저하로 인해 요약 기능을 취소하기 위해",
        "추가 검토자 채용 승인을 요청하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "발신자는 기능이 가동되기 전에 평가 하니스를 구축하자고 제안하는데('build a proper evaluation harness before ... the feature goes live'), 이것이 글 전체의 목적이므로 (나)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-evalharness-q2",
      "prompt": "According to the email, what should the model-graded check flag?",
      "promptKo": "이메일에 따르면 모델 채점 검사는 무엇을 표시해야 하는가?",
      "choices": [
        "Summaries that are shorter than the reference summaries.",
        "Summaries written in the wrong language.",
        "Summaries submitted after the Friday deadline.",
        "Summaries that introduce facts absent from the source document."
      ],
      "choicesKo": [
        "참조 요약보다 짧은 요약",
        "잘못된 언어로 작성된 요약",
        "금요일 마감 이후에 제출된 요약",
        "원문에 없는 사실을 도입하는 요약"
      ],
      "answerIndex": 3,
      "explanation": "본문 'a model-graded check that flags summaries which introduce facts absent from the source'에서 원문에 없는 사실을 표시한다고 명시되므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-evalharness-q3",
      "prompt": "Why does the writer recommend keeping some human review on every release?",
      "promptKo": "글쓴이가 모든 릴리스에 인간 검토를 일부 유지하자고 권하는 이유는 무엇인가?",
      "choices": [
        "Because an imperfect harness can mislead the team if its numbers are trusted blindly.",
        "Because the automated harness has already been proven flawless.",
        "Because customers explicitly requested manual review.",
        "Because human reviewers are cheaper than automated metrics."
      ],
      "choicesKo": [
        "불완전한 하니스의 수치를 맹목적으로 신뢰하면 팀을 오도할 수 있기 때문에",
        "자동화 하니스가 이미 완벽하다고 입증되었기 때문에",
        "고객이 명시적으로 수동 검토를 요청했기 때문에",
        "인간 검토자가 자동화 지표보다 더 저렴하기 때문에"
      ],
      "answerIndex": 0,
      "explanation": "본문은 'an imperfect harness can mislead us if we treat its numbers as gospel'라며 인간 검토 유지를 제안하므로, 맹신의 위험을 이유로 든 (가)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-evalharness-q4",
      "prompt": "In the email, the word \"candid\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"candid\"와 의미가 가장 가까운 것은",
      "choices": [
        "cheerful",
        "evasive",
        "frank",
        "uncertain"
      ],
      "choicesKo": [
        "쾌활한",
        "회피하는",
        "솔직한",
        "불확실한"
      ],
      "answerIndex": 2,
      "explanation": "'I do want to be candid that an imperfect harness can mislead us'에서 'candid'는 솔직하게 인정한다는 뜻이므로 'frank'가 가장 가깝습니다. 반대 의미인 'evasive'(회피하는)는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
