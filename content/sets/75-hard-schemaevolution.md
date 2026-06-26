# Set 75 — HARD — Schema Evolution (Email)

```json
{
  "id": "set-hard-schemaevolution",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Coordinating the upcoming change to the events schema before it breaks downstream jobs",
      "ko": "제목: 하류 작업을 망가뜨리기 전에 다가오는 이벤트 스키마 변경을 조율하기"
    },
    {
      "en": "Hi all, the product team plans to add two fields to the user-events stream next sprint, and I want us to handle the schema evolution deliberately rather than discover the consequences in production.",
      "ko": "안녕하세요 여러분, 제품 팀이 다음 스프린트에 사용자 이벤트 스트림에 두 개의 필드를 추가할 계획인데, 저는 우리가 그 결과를 운영 환경에서 발견하는 대신 스키마 진화를 신중하게 다루기를 바랍니다."
    },
    {
      "en": "For context, several of our pipelines consume this stream, and historically even a small change to its structure has caused jobs to fail without warning.",
      "ko": "배경을 말씀드리면, 우리 파이프라인 여럿이 이 스트림을 소비하며, 과거에는 그 구조의 작은 변경조차도 경고 없이 작업이 실패하게 만든 적이 있습니다."
    },
    {
      "en": "The good news is that the proposed change is purely additive: the two new fields are optional, and no existing field is being renamed or removed.",
      "ko": "좋은 소식은 제안된 변경이 순전히 추가적이라는 점입니다. 두 개의 새 필드는 선택 사항이며, 기존 필드 중 이름이 바뀌거나 제거되는 것은 없습니다."
    },
    {
      "en": "An additive change like this is backward compatible, meaning consumers written against the old schema will keep working and can simply ignore the fields they do not recognize.",
      "ko": "이와 같은 추가적 변경은 하위 호환되므로, 기존 스키마에 맞춰 작성된 소비자들은 계속 작동하며 인식하지 못하는 필드는 그냥 무시할 수 있습니다."
    },
    {
      "en": "That property is exactly why our schema registry is configured to reject any change that would drop or retype a field without an explicit migration.",
      "ko": "바로 그 속성 때문에 우리의 스키마 레지스트리는 명시적인 마이그레이션 없이 필드를 삭제하거나 자료형을 바꾸는 어떤 변경도 거부하도록 구성되어 있습니다."
    },
    {
      "en": "Still, I am asking each pipeline owner to do two things before the change ships rather than assume compatibility will hold.",
      "ko": "그래도 저는 호환성이 유지될 것이라고 가정하기보다는, 각 파이프라인 담당자가 변경이 배포되기 전에 두 가지를 해 주시기를 요청합니다."
    },
    {
      "en": "First, please confirm your consumer reads fields by name, not by position, since a positional reader can silently misalign once the record layout grows.",
      "ko": "첫째, 소비자가 위치가 아니라 이름으로 필드를 읽는지 확인해 주십시오. 위치 기반 판독기는 레코드 구조가 커지면 소리 없이 어긋날 수 있기 때문입니다."
    },
    {
      "en": "Second, run your job against the staging stream, where the new fields are already present, and verify your output is unchanged.",
      "ko": "둘째, 새 필드가 이미 존재하는 스테이징 스트림에 대해 작업을 실행하고, 출력이 변하지 않았는지 확인해 주십시오."
    },
    {
      "en": "If you have any consumer that genuinely cannot tolerate extra fields, tell me by Wednesday so we can stage the rollout behind a versioned topic instead.",
      "ko": "추가 필드를 정말로 감당할 수 없는 소비자가 있다면, 우리가 대신 버전이 매겨진 토픽 뒤에서 단계적으로 배포할 수 있도록 수요일까지 저에게 알려 주십시오."
    },
    {
      "en": "Handled this way, the migration should be a non-event for everyone, which is precisely the outcome a disciplined approach to schema evolution is meant to produce.",
      "ko": "이렇게 처리되면 이 마이그레이션은 모두에게 별일 아닌 일이 되어야 하며, 그것이 바로 스키마 진화에 대한 규율 있는 접근이 만들어 내려는 결과입니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-schemaevolution-q1",
      "prompt": "What is the primary purpose of this email?",
      "promptKo": "이 이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To coordinate an upcoming additive schema change so downstream pipelines are not broken.",
        "To announce that the events stream will be permanently shut down.",
        "To complain that the product team never communicates changes.",
        "To request budget approval for a new schema registry."
      ],
      "choicesKo": [
        "하류 파이프라인이 망가지지 않도록 다가오는 추가적 스키마 변경을 조율하기 위해",
        "이벤트 스트림이 영구히 종료될 것임을 알리기 위해",
        "제품 팀이 변경을 결코 알리지 않는다고 불평하기 위해",
        "새 스키마 레지스트리를 위한 예산 승인을 요청하기 위해"
      ],
      "answerIndex": 0,
      "explanation": "제목과 도입부에서 새 필드 추가에 따른 스키마 진화를 신중히 다뤄 하류 작업이 망가지지 않게 조율하려는 의도가 드러나므로 (가)가 목적입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-schemaevolution-q2",
      "prompt": "According to the email, why is the proposed change described as backward compatible?",
      "promptKo": "이메일에 따르면 제안된 변경이 하위 호환된다고 설명되는 이유는 무엇인가?",
      "choices": [
        "Because all existing fields are being renamed for clarity.",
        "Because the entire stream is being rebuilt from scratch.",
        "Because the new fields are optional and no existing field is renamed or removed.",
        "Because the schema registry has been disabled for this release."
      ],
      "choicesKo": [
        "명확성을 위해 모든 기존 필드의 이름이 바뀌고 있기 때문에",
        "전체 스트림이 처음부터 다시 구축되고 있기 때문에",
        "새 필드가 선택 사항이고 기존 필드는 이름이 바뀌거나 제거되지 않기 때문에",
        "이번 릴리스를 위해 스키마 레지스트리가 비활성화되었기 때문에"
      ],
      "answerIndex": 2,
      "explanation": "본문은 변경이 순전히 추가적이며 새 필드가 선택 사항이고 기존 필드가 바뀌지 않는다는 점이 하위 호환의 근거라고 했으므로 (다)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-schemaevolution-q3",
      "prompt": "What does the writer imply about a consumer that reads fields by position?",
      "promptKo": "글쓴이는 위치로 필드를 읽는 소비자에 관해 무엇을 암시하는가?",
      "choices": [
        "It is more reliable than one that reads by name.",
        "It is unaffected because positional readers ignore schema changes.",
        "It will automatically reject the new fields and stop running.",
        "It could misalign and produce wrong results once new fields are added."
      ],
      "choicesKo": [
        "이름으로 읽는 것보다 더 신뢰할 수 있다.",
        "위치 기반 판독기는 스키마 변경을 무시하므로 영향이 없다.",
        "새 필드를 자동으로 거부하고 실행을 멈출 것이다.",
        "새 필드가 추가되면 어긋나 잘못된 결과를 낼 수 있다."
      ],
      "answerIndex": 3,
      "explanation": "본문은 위치 기반 판독기가 레코드 구조가 커지면 'silently misalign'할 수 있다고 경고하므로, 잘못된 결과를 낼 수 있다는 (라)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-schemaevolution-q4",
      "prompt": "In the email, the word \"tolerate\" is closest in meaning to",
      "promptKo": "이메일에서 \"tolerate\"라는 단어와 의미가 가장 가까운 것은",
      "choices": [
        "reject outright",
        "accept without failing",
        "duplicate repeatedly",
        "permanently delete"
      ],
      "choicesKo": [
        "단호히 거부하다",
        "실패 없이 받아들이다",
        "반복적으로 복제하다",
        "영구히 삭제하다"
      ],
      "answerIndex": 1,
      "explanation": "'cannot tolerate extra fields'는 추가 필드를 (문제없이) 감당할 수 없다는 뜻이므로 'accept without failing'이 가장 가깝고, 'reject outright'는 반대 의미의 함정입니다. 따라서 (나)가 정답입니다.",
      "category": "동의어"
    }
  ]
}
```
