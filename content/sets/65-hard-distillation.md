# Set 65 — HARD — Knowledge Distillation (Article)

```json
{
  "id": "set-hard-distillation",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "When a research lab unveils a record-breaking language model, the headline number is usually its size — hundreds of billions of parameters that demand a rack of specialized chips just to run.",
      "ko": "한 연구소가 기록을 깬 언어 모델을 공개할 때, 헤드라인 숫자는 대개 그 크기, 즉 그것을 돌리는 데만도 특수 칩 한 랙을 요구하는 수천억 개의 파라미터입니다."
    },
    {
      "en": "Impressive as that is, very few companies can afford to serve such a model to millions of users, and this is where a technique called knowledge distillation enters the picture.",
      "ko": "그것이 아무리 인상적이라 해도, 그런 모델을 수백만 사용자에게 제공할 여력이 있는 기업은 극소수이며, 바로 이 지점에서 지식 증류라 불리는 기법이 등장합니다."
    },
    {
      "en": "The idea is to train a small 'student' model not on raw labels alone but on the rich output of the large 'teacher' model it is meant to imitate.",
      "ko": "그 발상은, 작은 '학생' 모델을 원시 라벨만이 아니라 그것이 모방하려는 큰 '교사' 모델의 풍부한 출력으로 훈련하는 것입니다."
    },
    {
      "en": "Crucially, the teacher does not just hand the student a single right answer; it passes along the full distribution of probabilities it assigned across every option.",
      "ko": "결정적으로, 교사는 학생에게 단 하나의 정답만 건네는 것이 아니라, 모든 선택지에 걸쳐 부여한 확률의 전체 분포를 전달합니다."
    },
    {
      "en": "Those probabilities carry a kind of nuance a bare label cannot: they reveal that the teacher considered two answers nearly equally plausible, or that it dismissed a third with near-total confidence.",
      "ko": "그 확률들은 단순한 라벨이 담을 수 없는 일종의 미묘함을 지닙니다. 즉 교사가 두 답을 거의 동등하게 그럴듯하다고 보았다거나, 세 번째 답은 거의 완전한 확신으로 일축했다는 것을 드러냅니다."
    },
    {
      "en": "Learning from this 'soft' signal, the student often reaches accuracy a model of its modest size could never attain by training on the labels by itself.",
      "ko": "이 '부드러운' 신호로부터 배움으로써, 학생은 흔히 그 정도의 작은 크기의 모델이 라벨만으로 훈련해서는 결코 도달할 수 없는 정확도에 이릅니다."
    },
    {
      "en": "The payoff is practical: a distilled model can be an order of magnitude smaller, cheaper to run, and fast enough to respond on a phone rather than in a distant data center.",
      "ko": "그 보상은 실용적입니다. 증류된 모델은 한 자릿수 배 더 작고, 운영 비용이 더 싸며, 멀리 떨어진 데이터센터가 아니라 휴대폰에서 응답할 만큼 충분히 빠를 수 있습니다."
    },
    {
      "en": "Yet distillation is not free magic, and its limits are widely misunderstood.",
      "ko": "그러나 증류는 공짜 마법이 아니며, 그 한계는 널리 오해되고 있습니다."
    },
    {
      "en": "A student can only inherit what the teacher actually knows; where the teacher is wrong or biased, the student faithfully reproduces that flaw, sometimes amplifying it.",
      "ko": "학생은 교사가 실제로 아는 것만 물려받을 수 있습니다. 교사가 틀렸거나 편향된 곳에서는 학생이 그 결함을 충실히 재현하며, 때로는 그것을 증폭시킵니다."
    },
    {
      "en": "And because the smaller network has less capacity, distillation tends to preserve a teacher's most common behaviors while quietly shedding its rare, specialized capabilities.",
      "ko": "또한 더 작은 신경망은 용량이 적기 때문에, 증류는 교사의 가장 흔한 행동은 보존하는 반면 그것의 드물고 특화된 능력은 조용히 떨어내는 경향이 있습니다."
    },
    {
      "en": "For everyday queries that loss is invisible, but for the unusual edge cases that often matter most, a distilled model may fall silent precisely where its teacher would have excelled.",
      "ko": "일상적인 질의에서는 그 손실이 보이지 않지만, 흔히 가장 중요한 비정상적 예외 사례에서는 증류된 모델이 바로 그 교사가 빛났을 지점에서 입을 다물어 버릴 수 있습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-distillation-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "Why large language models keep growing in parameter count every year.",
        "A step-by-step guide to buying specialized chips for a data center.",
        "How knowledge distillation works and where its benefits and limits lie.",
        "The history of probability theory in early machine learning."
      ],
      "choicesKo": [
        "왜 대형 언어 모델의 파라미터 수가 매년 계속 늘어나는가",
        "데이터센터용 특수 칩을 구매하는 단계별 안내",
        "지식 증류가 어떻게 작동하며 그 이점과 한계가 어디에 있는가",
        "초기 머신러닝에서의 확률 이론의 역사"
      ],
      "answerIndex": 2,
      "explanation": "기사는 증류의 원리(소프트 확률 학습)와 이점(소형·저비용·빠름) 및 한계(결함 상속, 희귀 능력 상실)를 다루므로 (다)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-distillation-q2",
      "prompt": "According to the article, what does the teacher model pass to the student beyond a single answer?",
      "promptKo": "기사에 따르면 교사 모델은 단 하나의 답 외에 무엇을 학생에게 전달하는가?",
      "choices": [
        "A list of the chips required to run it.",
        "A complete copy of its own parameters.",
        "The raw training data it was originally built from.",
        "The full distribution of probabilities across all options."
      ],
      "choicesKo": [
        "그것을 돌리는 데 필요한 칩 목록",
        "자신의 파라미터 전체 사본",
        "그것이 원래 만들어진 원시 훈련 데이터",
        "모든 선택지에 걸친 확률의 전체 분포"
      ],
      "answerIndex": 3,
      "explanation": "본문 'it passes along the full distribution of probabilities it assigned across every option'에서 명시되므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-distillation-q3",
      "prompt": "What can be inferred about a distilled model facing unusual edge cases?",
      "promptKo": "비정상적 예외 사례에 직면한 증류된 모델에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "It typically outperforms its teacher on those cases.",
        "It may handle them poorly because rare, specialized capabilities are often lost.",
        "It automatically retrains itself whenever it sees a new case.",
        "It refers every edge case back to the data center for processing."
      ],
      "choicesKo": [
        "그런 사례에서 보통 교사를 능가한다.",
        "드물고 특화된 능력이 흔히 상실되기에 그런 사례를 서툴게 처리할 수 있다.",
        "새로운 사례를 볼 때마다 스스로 자동으로 재훈련한다.",
        "모든 예외 사례를 처리를 위해 데이터센터로 되돌려 보낸다."
      ],
      "answerIndex": 1,
      "explanation": "본문은 증류가 희귀·특화 능력을 떨어내며 예외 사례에서 '입을 다물 수 있다'고 했으므로, 그런 사례를 잘 처리하지 못할 수 있다는 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-distillation-q4",
      "prompt": "In the article, the word \"shedding\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"shedding\"과 의미가 가장 가까운 것은",
      "choices": [
        "discarding",
        "duplicating",
        "storing",
        "strengthening"
      ],
      "choicesKo": [
        "버리는",
        "복제하는",
        "저장하는",
        "강화하는"
      ],
      "answerIndex": 0,
      "explanation": "'quietly shedding its rare, specialized capabilities'에서 'shedding'은 능력을 떨어내 잃는다는 뜻이므로 'discarding'(가)이 가장 가깝습니다. 'strengthening'은 반대 의미의 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
