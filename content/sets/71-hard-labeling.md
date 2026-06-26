# Set 71 — HARD — Data Labeling / Annotation Quality (Email)

```json
{
  "id": "set-hard-labeling",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "To: Annotation Operations Team",
      "ko": "수신: 주석 작업 운영 팀"
    },
    {
      "en": "From: Priya Nandakumar, Head of Data Quality",
      "ko": "발신: 데이터 품질 책임자 프리야 난다쿠마르"
    },
    {
      "en": "Subject: Why our last labeling batch must be redone",
      "ko": "제목: 지난 라벨링 배치를 다시 작업해야 하는 이유"
    },
    {
      "en": "I want to be candid about the audit we completed on the sentiment dataset your team delivered last Friday.",
      "ko": "여러분 팀이 지난 금요일에 전달한 감성 데이터셋에 대해 우리가 완료한 감사에 관해 솔직하게 말씀드리고자 합니다."
    },
    {
      "en": "When two independent annotators reviewed the same five hundred records, they agreed on a label only sixty-one percent of the time, which falls well below the eighty-five percent threshold our customers contractually expect.",
      "ko": "두 명의 독립적인 주석자가 동일한 500건의 레코드를 검토했을 때, 그들은 단지 61퍼센트의 경우에만 라벨에 동의했으며, 이는 우리 고객이 계약상 기대하는 85퍼센트 기준선에 한참 못 미칩니다."
    },
    {
      "en": "Low agreement of this kind is rarely a sign that annotators are careless; far more often it reveals that the instructions themselves are ambiguous.",
      "ko": "이런 종류의 낮은 일치도는 주석자들이 부주의하다는 신호인 경우는 드물며, 훨씬 더 흔하게는 지침 자체가 모호하다는 점을 드러냅니다."
    },
    {
      "en": "In this batch, the root cause was a single underspecified rule: our guidelines never said whether a sarcastic complaint should be tagged as negative sentiment or as neutral, so each annotator quietly invented a convention of their own.",
      "ko": "이번 배치에서 근본 원인은 충분히 명시되지 않은 단일 규칙이었습니다. 우리 가이드라인은 빈정대는 불평을 부정 감성으로 태그할지 중립으로 태그할지 결코 말하지 않았고, 그래서 각 주석자는 조용히 자기만의 관례를 만들어냈습니다."
    },
    {
      "en": "Rather than simply scolding the team, I am asking us to fix the process that produced the disagreement.",
      "ko": "팀을 그저 꾸짖기보다는, 저는 그 불일치를 낳은 프로세스를 고치자고 요청하는 것입니다."
    },
    {
      "en": "Effective next week, every guideline change will ship with at least three worked examples, and we will add a short calibration round in which all annotators label the same warm-up set and discuss any splits before production begins.",
      "ko": "다음 주부터 모든 가이드라인 변경은 최소 세 개의 작업 예시와 함께 배포될 것이며, 모든 주석자가 동일한 워밍업 세트를 라벨링하고 본 작업이 시작되기 전에 어떤 갈림이든 논의하는 짧은 보정 라운드를 추가할 것입니다."
    },
    {
      "en": "Please do not interpret the redo as a reflection on anyone's diligence; the metric we failed measures the clarity of our rules, not the effort of our people.",
      "ko": "재작업을 누군가의 성실함에 대한 평가로 해석하지 말아 주십시오. 우리가 충족하지 못한 지표는 우리 사람들의 노력이 아니라 우리 규칙의 명확성을 측정하는 것입니다."
    },
    {
      "en": "I will hold a thirty-minute briefing on Monday at ten to walk through the revised guidelines, and I would appreciate your candid feedback on any rule that still feels open to interpretation.",
      "ko": "저는 월요일 10시에 개정된 가이드라인을 함께 살펴보기 위해 30분짜리 브리핑을 열 것이며, 여전히 해석의 여지가 있다고 느껴지는 어떤 규칙에 대해서든 여러분의 솔직한 피드백을 받을 수 있다면 감사하겠습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-labeling-q1",
      "prompt": "What is the main purpose of this email?",
      "promptKo": "이 이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To reprimand annotators for being careless and unprofessional.",
        "To announce that the company has lost the customer contract.",
        "To explain why a labeling batch must be redone and describe process fixes.",
        "To request that the team work overtime through the weekend."
      ],
      "choicesKo": [
        "주석자들이 부주의하고 비전문적이라며 질책하기 위해",
        "회사가 고객 계약을 잃었음을 알리기 위해",
        "라벨링 배치를 다시 작업해야 하는 이유를 설명하고 프로세스 개선을 기술하기 위해",
        "팀에게 주말 내내 초과 근무를 하도록 요청하기 위해"
      ],
      "answerIndex": 2,
      "explanation": "제목과 본문 전반이 재작업 사유(낮은 일치도와 모호한 지침)와 보정 라운드 등 프로세스 개선을 설명하므로 (다)가 정답입니다. 발신자는 질책이 아니라고 명시했으므로 (가)는 오답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-labeling-q2",
      "prompt": "According to the email, what was the root cause of the low agreement in this batch?",
      "promptKo": "이메일에 따르면 이번 배치에서 낮은 일치도의 근본 원인은 무엇이었는가?",
      "choices": [
        "Annotators working too quickly to meet a deadline.",
        "An underspecified rule about how to label a sarcastic complaint.",
        "A software bug that corrupted the labels after submission.",
        "The customer changing the contract requirements midway."
      ],
      "choicesKo": [
        "마감을 맞추려고 너무 빨리 작업한 주석자들",
        "빈정대는 불평을 어떻게 라벨링할지에 관한 충분히 명시되지 않은 규칙",
        "제출 후 라벨을 손상시킨 소프트웨어 버그",
        "도중에 계약 요건을 바꾼 고객"
      ],
      "answerIndex": 1,
      "explanation": "본문은 근본 원인이 빈정대는 불평을 부정/중립 중 무엇으로 태그할지 명시하지 않은 단일 규칙이라고 밝히므로 (나)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-labeling-q3",
      "prompt": "What can be inferred about how Priya views the failed metric?",
      "promptKo": "프리야가 충족하지 못한 지표를 어떻게 보는지에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "She treats it as a measure of the clarity of the rules rather than the team's effort.",
        "She thinks the metric should be abandoned entirely.",
        "She wants to keep the cause of the failure hidden from customers.",
        "She believes it proves the annotators lacked diligence."
      ],
      "choicesKo": [
        "그것을 팀의 노력이 아니라 규칙의 명확성에 대한 척도로 여긴다.",
        "그 지표를 완전히 폐기해야 한다고 생각한다.",
        "실패의 원인을 고객에게 숨기고 싶어 한다.",
        "그것이 주석자들의 성실함 부족을 입증한다고 믿는다."
      ],
      "answerIndex": 0,
      "explanation": "본문 'the metric we failed measures the clarity of our rules, not the effort of our people'에서 그녀의 견해가 드러나므로 (가)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-labeling-q4",
      "prompt": "In the email, the word \"candid\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"candid\"와 의미가 가장 가까운 것은",
      "choices": [
        "evasive",
        "formal",
        "hesitant",
        "frank"
      ],
      "choicesKo": [
        "회피하는",
        "격식 있는",
        "주저하는",
        "솔직한"
      ],
      "answerIndex": 3,
      "explanation": "'I want to be candid about the audit'에서 'candid'는 숨김 없이 솔직하다는 뜻이므로 'frank'가 가장 가깝습니다. 반대 의미인 'evasive(회피하는)'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
