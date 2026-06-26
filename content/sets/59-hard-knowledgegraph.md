# Enterprise Knowledge Graphs (HARD)

```json
{
  "id": "set-hard-knowledgegraph",
  "difficulty": "HARD",
  "passageType": "Technical Brief",
  "passageLines": [
    {
      "en": "Most large enterprises do not suffer from a shortage of data so much as from its fragmentation: customer records sit in one system, support tickets in another, and product specifications in a third, each speaking its own dialect.",
      "ko": "대부분의 대기업은 데이터의 부족보다는 그 파편화로 고통받는다. 고객 기록은 한 시스템에, 지원 티켓은 다른 시스템에, 제품 사양은 또 다른 시스템에 흩어져 있으며, 각각이 자기만의 방언을 구사한다."
    },
    {
      "en": "A knowledge graph addresses this by representing entities—people, products, orders—as nodes and the relationships between them as labeled edges, so that information once locked inside isolated tables becomes navigable as a connected web.",
      "ko": "지식 그래프는 사람, 제품, 주문 같은 개체(entity)를 노드로, 그들 사이의 관계를 라벨이 붙은 엣지로 표현함으로써 이 문제를 해결하며, 그리하여 한때 고립된 테이블 안에 갇혀 있던 정보가 서로 연결된 망으로서 탐색 가능해진다."
    },
    {
      "en": "Because relationships are stored explicitly rather than inferred at query time through repeated joins, a graph can answer questions that traverse many hops—\"which suppliers are linked, even indirectly, to a recalled component?\"—with a directness conventional databases struggle to match.",
      "ko": "관계가 질의 시점에 반복적인 조인을 통해 추론되는 것이 아니라 명시적으로 저장되기 때문에, 그래프는 여러 단계를 거쳐야 하는 질문, 가령 \"리콜된 부품과 간접적으로라도 연결된 공급업체는 어디인가?\" 같은 질문에 기존 데이터베이스가 따라잡기 힘든 직접성으로 답할 수 있다."
    },
    {
      "en": "This same connective structure also enriches enterprise search, allowing a query to return not just documents that contain a keyword but the people, projects, and decisions related to it.",
      "ko": "바로 이 연결 구조는 기업 검색 또한 풍부하게 하여, 질의가 단지 키워드를 포함하는 문서뿐 아니라 그와 관련된 사람, 프로젝트, 의사결정까지 반환하도록 해 준다."
    },
    {
      "en": "None of this comes for free, however.",
      "ko": "그러나 이 중 어느 것도 공짜로 얻어지지는 않는다."
    },
    {
      "en": "Before a single query can run, domain experts and engineers must agree on a schema, or ontology, that specifies which entity types exist and how they may legitimately connect—an exercise that can take months and provoke uncomfortable debates about what the business actually means by terms it had long used loosely.",
      "ko": "단 하나의 질의가 실행되기도 전에, 도메인 전문가와 엔지니어는 어떤 개체 유형이 존재하며 그것들이 어떻게 정당하게 연결될 수 있는지를 규정하는 스키마, 즉 온톨로지에 합의해야 한다. 이는 몇 달이 걸릴 수 있고, 기업이 오랫동안 느슨하게 사용해 온 용어로 실제 의미하는 바가 무엇인지에 관한 불편한 논쟁을 불러일으키는 작업이다."
    },
    {
      "en": "Skeptics reasonably point out that this upfront modeling cost is precisely what makes many teams abandon graph initiatives before they yield value.",
      "ko": "회의론자들은 바로 이 선행 모델링 비용이야말로 많은 팀이 가치를 내기도 전에 그래프 시도를 포기하게 만드는 원인이라고 일리 있게 지적한다."
    },
    {
      "en": "The counterargument is that the effort is front-loaded rather than wasted: once the ontology is in place, adding a new data source typically means mapping it onto existing concepts rather than redesigning the model from scratch.",
      "ko": "이에 대한 반론은 그 노력이 낭비되는 것이 아니라 앞쪽에 몰려 있을 뿐이라는 것이다. 일단 온톨로지가 마련되면, 새로운 데이터 소스를 추가하는 일은 대개 모델을 처음부터 다시 설계하는 것이 아니라 기존 개념에 그것을 매핑하는 것을 의미한다."
    },
    {
      "en": "In that sense, a knowledge graph trades a higher initial investment for a structure that bends to accommodate new questions instead of breaking under them.",
      "ko": "그런 의미에서 지식 그래프는 더 높은 초기 투자를, 새로운 질문 아래 무너지는 대신 그것을 수용하도록 휘어지는 구조와 맞바꾸는 셈이다."
    },
    {
      "en": "Whether that trade is worthwhile depends less on the technology itself than on how often an organization expects its questions to change.",
      "ko": "그 맞바꿈이 가치가 있는지는 기술 그 자체보다는 조직이 자신의 질문이 얼마나 자주 바뀔 것으로 예상하는지에 더 크게 달려 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-knowledgegraph-q1",
      "prompt": "What is the primary purpose of the technical brief?",
      "promptKo": "이 기술 브리프의 주된 목적은 무엇인가?",
      "choices": [
        "To argue that conventional databases should never be used again.",
        "To report that most enterprises already use knowledge graphs successfully.",
        "To explain how to write graph queries that traverse many hops.",
        "To weigh a knowledge graph's upfront modeling cost against its long-term flexibility."
      ],
      "choicesKo": [
        "기존 데이터베이스를 다시는 사용하지 말아야 한다고 주장하기 위해.",
        "대부분의 기업이 이미 지식 그래프를 성공적으로 사용 중이라고 보고하기 위해.",
        "여러 단계를 거치는 그래프 질의를 작성하는 방법을 설명하기 위해.",
        "지식 그래프의 선행 모델링 비용을 그 장기적 유연성과 견주어 평가하기 위해."
      ],
      "answerIndex": 3,
      "explanation": "브리프는 지식 그래프의 이점(연결성, 검색 강화)을 설명한 뒤, 'None of this comes for free'를 기점으로 선행 모델링 비용과 장기 유연성의 맞바꿈을 논한다. 아홉 번째 문장(... trades a higher initial investment for a structure that bends ...)과 마지막 문장이 이 균형 평가를 요약하므로 정답은 (라)이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-knowledgegraph-q2",
      "prompt": "According to the brief, why can a knowledge graph answer multi-hop questions more directly than conventional databases?",
      "promptKo": "브리프에 따르면 지식 그래프가 기존 데이터베이스보다 여러 단계의 질문에 더 직접적으로 답할 수 있는 이유는 무엇인가?",
      "choices": [
        "It stores relationships explicitly rather than inferring them through repeated joins.",
        "It requires no schema before queries can run.",
        "It eliminates the need for domain experts entirely.",
        "It stores data in fewer isolated tables than other systems."
      ],
      "choicesKo": [
        "관계를 반복적인 조인을 통해 추론하지 않고 명시적으로 저장하기 때문이다.",
        "질의를 실행하기 전에 어떤 스키마도 필요로 하지 않기 때문이다.",
        "도메인 전문가의 필요성을 완전히 없애기 때문이다.",
        "다른 시스템보다 고립된 테이블에 데이터를 더 적게 저장하기 때문이다."
      ],
      "answerIndex": 0,
      "explanation": "세 번째 문장은 'Because relationships are stored explicitly rather than inferred at query time through repeated joins, a graph can answer questions that traverse many hops ... with a directness'라고 직접 이유를 밝힌다. 따라서 정답은 (가)이다. (나)는 여섯 번째 문장(스키마 합의 필요)과 모순된다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-knowledgegraph-q3",
      "prompt": "What can be inferred about an organization whose analytical questions rarely change?",
      "promptKo": "분석적 질문이 거의 바뀌지 않는 조직에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It would benefit most from a knowledge graph's flexibility.",
        "The upfront modeling cost may be harder to justify for it.",
        "It cannot build a knowledge graph at all.",
        "It will inevitably abandon the project before completion."
      ],
      "choicesKo": [
        "지식 그래프의 유연성으로부터 가장 큰 이익을 얻을 것이다.",
        "선행 모델링 비용을 정당화하기가 그 조직에게는 더 어려울 수 있다.",
        "지식 그래프를 아예 구축할 수 없다.",
        "완성 전에 반드시 프로젝트를 포기하게 될 것이다."
      ],
      "answerIndex": 1,
      "explanation": "마지막 문장은 맞바꿈의 가치가 'how often an organization expects its questions to change'에 달려 있다고 한다. 유연성의 이점은 질문이 자주 바뀔 때 커지므로, 질문이 거의 바뀌지 않는다면 높은 선행 비용을 정당화하기 어렵다는 추론이 타당하다. 따라서 정답은 (나)이다.",
      "category": "추론"
    },
    {
      "id": "set-hard-knowledgegraph-q4",
      "prompt": "In the brief, the word \"fragmentation\" is closest in meaning to",
      "promptKo": "브리프에서 단어 \"fragmentation\"과 의미가 가장 가까운 것은?",
      "choices": [
        "consolidation",
        "scarcity",
        "scattering",
        "encryption"
      ],
      "choicesKo": [
        "통합",
        "희소성",
        "흩어짐",
        "암호화"
      ],
      "answerIndex": 2,
      "explanation": "첫 문장에서 fragmentation은 고객 기록, 지원 티켓, 제품 사양이 서로 다른 시스템에 흩어져 있는 상태를 가리키므로 'scattering'(흩어짐)이 가장 가깝다. (가) consolidation(통합)은 정반대 의미의 함정 선택지이다. 정답은 (다).",
      "category": "동의어"
    }
  ]
}
```
