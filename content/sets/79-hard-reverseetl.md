# Set 79 — HARD — Reverse ETL (Email)

```json
{
  "id": "set-hard-reverseetl",
  "difficulty": "HARD",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "Subject: Proposal to pilot reverse ETL for the customer success team",
      "ko": "제목: 고객 성공 팀을 위한 리버스 ETL 시범 운영 제안"
    },
    {
      "en": "Hi Priya, following our conversation on Tuesday, I want to put the reverse ETL idea in writing so the wider team can weigh in.",
      "ko": "안녕하세요 Priya, 화요일 대화에 이어, 더 넓은 팀이 의견을 낼 수 있도록 리버스 ETL 아이디어를 글로 정리해 두고자 합니다."
    },
    {
      "en": "As you know, our warehouse already holds the richest view of each account: product usage, support history, and the churn-risk score the data science team computes nightly.",
      "ko": "아시다시피 우리 웨어하우스는 이미 각 계정에 대한 가장 풍부한 관점을 보유하고 있습니다. 즉 제품 사용량, 지원 이력, 그리고 데이터 과학 팀이 매일 밤 계산하는 이탈 위험 점수입니다."
    },
    {
      "en": "The problem is that none of this reaches the people who could act on it, because the customer success reps live inside our CRM, not inside the warehouse.",
      "ko": "문제는 이 가운데 어느 것도 그것을 활용해 행동할 수 있는 사람들에게 닿지 않는다는 점인데, 고객 성공 담당자들은 웨어하우스가 아니라 우리 CRM 안에서 일하기 때문입니다."
    },
    {
      "en": "Reverse ETL flips the usual flow: instead of pulling data into the warehouse for analysis, it syncs computed results back out to the operational tools where work actually happens.",
      "ko": "리버스 ETL은 통상적인 흐름을 뒤집습니다. 즉 분석을 위해 데이터를 웨어하우스로 끌어오는 대신, 계산된 결과를 실제로 작업이 이루어지는 운영 도구로 다시 내보내 동기화합니다."
    },
    {
      "en": "Concretely, the nightly churn score would appear as a field on each account in the CRM, so a rep sees it without ever opening a dashboard.",
      "ko": "구체적으로, 매일 밤의 이탈 점수가 CRM의 각 계정에 하나의 필드로 나타나, 담당자가 대시보드를 한 번도 열지 않고도 그것을 보게 됩니다."
    },
    {
      "en": "I want to be candid about the risk, however: once the warehouse drives a customer-facing tool, a bad sync no longer just produces a wrong chart — it can email the wrong people or flag healthy accounts as at-risk.",
      "ko": "다만 위험에 대해 솔직히 말씀드리고 싶습니다. 일단 웨어하우스가 고객 대면 도구를 구동하게 되면, 잘못된 동기화는 더 이상 단지 틀린 차트를 만드는 데 그치지 않고, 엉뚱한 사람들에게 이메일을 보내거나 건강한 계정을 위험으로 표시할 수 있습니다."
    },
    {
      "en": "For that reason I would not sync every field at once; I propose we start with the single churn-risk score and watch it for a full month.",
      "ko": "그 이유로 저는 모든 필드를 한꺼번에 동기화하지는 않겠습니다. 단일 이탈 위험 점수 하나로 시작해 꼬박 한 달간 지켜볼 것을 제안합니다."
    },
    {
      "en": "During the pilot, every sync would write to a staging field that reps can see but that does not trigger any automated outreach.",
      "ko": "시범 운영 동안 모든 동기화는 담당자가 볼 수는 있지만 어떤 자동 연락도 촉발하지 않는 스테이징 필드에 기록될 것입니다."
    },
    {
      "en": "If the score proves accurate and stable there, we promote it to the live field and only then connect it to workflows.",
      "ko": "그 점수가 거기서 정확하고 안정적임이 입증되면, 우리는 그것을 실제 필드로 승격하고, 오직 그때에만 워크플로에 연결합니다."
    },
    {
      "en": "Could you let me know by Friday whether the customer success team is willing to host this pilot? I am happy to walk the leads through it beforehand.",
      "ko": "금요일까지 고객 성공 팀이 이 시범 운영을 맡을 의향이 있는지 알려 주시겠어요? 사전에 리드들에게 기꺼이 설명해 드리겠습니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-reverseetl-q1",
      "prompt": "What is the main purpose of this email?",
      "promptKo": "이 이메일의 주된 목적은 무엇인가?",
      "choices": [
        "To report that the churn-risk score has already been removed from the warehouse.",
        "To complain that the customer success team refuses to use the CRM.",
        "To propose a cautious pilot that syncs the churn-risk score from the warehouse into the CRM.",
        "To announce that all warehouse fields have been synced to the CRM overnight."
      ],
      "choicesKo": [
        "이탈 위험 점수가 이미 웨어하우스에서 제거되었음을 보고하기 위해",
        "고객 성공 팀이 CRM 사용을 거부한다고 불평하기 위해",
        "웨어하우스의 이탈 위험 점수를 CRM으로 동기화하는 신중한 시범 운영을 제안하기 위해",
        "모든 웨어하우스 필드가 밤사이 CRM에 동기화되었음을 알리기 위해"
      ],
      "answerIndex": 2,
      "explanation": "이메일 전체가 리버스 ETL로 이탈 점수를 CRM에 단계적으로 동기화하는 시범 운영을 제안하므로 (다)가 정답입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-reverseetl-q2",
      "prompt": "During the pilot, where will each sync initially write the churn score?",
      "promptKo": "시범 운영 동안 각 동기화는 이탈 점수를 처음에 어디에 기록하는가?",
      "choices": [
        "To a staging field that reps can see but that triggers no automated outreach.",
        "Directly to the live field connected to email workflows.",
        "To a private file on the data science team's laptops.",
        "To the warehouse only, never to the CRM."
      ],
      "choicesKo": [
        "담당자가 볼 수는 있지만 어떤 자동 연락도 촉발하지 않는 스테이징 필드에",
        "이메일 워크플로에 연결된 실제 필드에 직접",
        "데이터 과학 팀 노트북의 비공개 파일에",
        "웨어하우스에만, 결코 CRM에는 아니다"
      ],
      "answerIndex": 0,
      "explanation": "본문 'every sync would write to a staging field that reps can see but that does not trigger any automated outreach'에서 명시되므로 (가)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-reverseetl-q3",
      "prompt": "Why does the sender propose starting with only one field?",
      "promptKo": "발신자가 단 하나의 필드로 시작할 것을 제안하는 이유는 무엇인가?",
      "choices": [
        "Because the warehouse can only export one field at a time.",
        "Because a faulty sync to a customer-facing tool can cause real harm, so the risk should be contained and observed first.",
        "Because the CRM cannot display more than one custom field.",
        "Because the customer success team asked to see fewer numbers."
      ],
      "choicesKo": [
        "웨어하우스가 한 번에 한 필드만 내보낼 수 있기 때문에",
        "고객 대면 도구로의 잘못된 동기화가 실제 피해를 줄 수 있어, 위험을 먼저 가두고 관찰해야 하기 때문에",
        "CRM이 사용자 지정 필드를 하나밖에 표시할 수 없기 때문에",
        "고객 성공 팀이 더 적은 수치를 보기를 요청했기 때문에"
      ],
      "answerIndex": 1,
      "explanation": "발신자는 잘못된 동기화가 엉뚱한 이메일·오표시 등 실제 피해를 줄 수 있다며 단계적 접근을 제안하므로 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-reverseetl-q4",
      "prompt": "In the email, the word \"candid\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"candid\"와 의미가 가장 가까운 것은",
      "choices": [
        "automated",
        "evasive",
        "cheerful",
        "frank"
      ],
      "choicesKo": [
        "자동화된",
        "회피하는",
        "쾌활한",
        "솔직한"
      ],
      "answerIndex": 3,
      "explanation": "'I want to be candid about the risk'에서 'candid'는 위험을 숨기지 않고 솔직히 말하는 것을 뜻하므로 'frank'가 가장 가깝습니다. 정반대인 'evasive'는 오답입니다.",
      "category": "동의어"
    }
  ]
}
```
