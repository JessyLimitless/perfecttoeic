# Set 40 — HARD — Data Mesh vs. Centralized Data Lake

```json
{
  "id": "set-hard-datamesh",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "For more than a decade, the centralized data lake has been the default architecture for enterprises seeking a single, authoritative repository in which raw and processed information could coexist.",
      "ko": "10년이 넘는 기간 동안, 중앙집중식 데이터 레이크는 원시 데이터와 가공 데이터가 공존할 수 있는 단일하고 권위 있는 저장소를 추구하는 기업들에게 기본 아키텍처였다."
    },
    {
      "en": "Its appeal is intuitive: by consolidating every source into one platform, organizations promised themselves consistency, economies of scale, and a unified layer for governance and security.",
      "ko": "그 매력은 직관적이다. 모든 소스를 하나의 플랫폼으로 통합함으로써, 조직들은 일관성, 규모의 경제, 그리고 거버넌스와 보안을 위한 통합 계층을 스스로 약속했다."
    },
    {
      "en": "In practice, however, the central data team that owns this lake frequently becomes a bottleneck, because it must understand the semantics of dozens of domains it did not create and cannot fully comprehend.",
      "ko": "그러나 실제로는, 이 레이크를 소유한 중앙 데이터 팀이 자주 병목이 되는데, 이는 그 팀이 자신이 만들지 않았고 완전히 이해할 수도 없는 수십 개 도메인의 의미 체계를 파악해야 하기 때문이다."
    },
    {
      "en": "The data mesh paradigm reframes this problem by treating data as a product and assigning ownership to the business domains that generate it, rather than to a single overburdened engineering group.",
      "ko": "데이터 메시 패러다임은 데이터를 하나의 제품으로 취급하고, 단일하게 과부하된 엔지니어링 그룹이 아니라 데이터를 생성하는 비즈니스 도메인에 소유권을 부여함으로써 이 문제를 재구성한다."
    },
    {
      "en": "Under this model, each domain team publishes well-documented, discoverable datasets and is held accountable for their quality, which can dramatically accelerate delivery and reduce the queue of requests waiting on a central team.",
      "ko": "이 모델에서는, 각 도메인 팀이 잘 문서화되고 검색 가능한 데이터셋을 게시하며 그 품질에 대해 책임을 지는데, 이는 전달 속도를 극적으로 높이고 중앙 팀을 기다리는 요청의 대기열을 줄일 수 있다."
    },
    {
      "en": "Yet decentralization is not a free lunch, and the trade-offs are substantial.",
      "ko": "하지만 분산화는 공짜가 아니며, 그 절충점은 상당하다."
    },
    {
      "en": "Without strong federated governance, the same customer entity may be defined inconsistently across teams, and duplicated effort can quietly erode the savings that prompted the migration in the first place.",
      "ko": "강력한 연합 거버넌스가 없으면, 동일한 고객 엔터티가 팀마다 일관성 없이 정의될 수 있고, 중복된 노력이 애초에 마이그레이션을 촉발했던 비용 절감 효과를 조용히 갉아먹을 수 있다."
    },
    {
      "en": "A mesh also presupposes a baseline of platform maturity, since domain teams need self-service tooling, automated quality checks, and clear interoperability standards before they can shoulder ownership responsibly.",
      "ko": "또한 메시는 일정 수준의 플랫폼 성숙도를 전제로 하는데, 도메인 팀이 책임감 있게 소유권을 감당하려면 셀프서비스 도구, 자동화된 품질 검사, 그리고 명확한 상호운용성 표준이 갖춰져 있어야 하기 때문이다."
    },
    {
      "en": "Consequently, the right choice is rarely absolute and depends heavily on organizational scale and capability.",
      "ko": "결과적으로, 올바른 선택은 거의 절대적이지 않으며 조직의 규모와 역량에 크게 좌우된다."
    },
    {
      "en": "Smaller firms with a handful of well-aligned teams often find a centralized lake perfectly adequate, whereas large enterprises with many autonomous divisions and conflicting priorities tend to benefit most from a mesh.",
      "ko": "잘 조율된 소수의 팀을 가진 소규모 기업은 중앙집중식 레이크가 충분히 적절하다고 종종 느끼는 반면, 자율적인 부서가 많고 우선순위가 충돌하는 대기업은 메시로부터 가장 큰 이점을 얻는 경향이 있다."
    },
    {
      "en": "The most pragmatic organizations therefore treat the two models not as rivals but as points on a spectrum, adopting domain ownership where complexity warrants it while retaining centralized control over the most sensitive or cross-cutting datasets.",
      "ko": "따라서 가장 실용적인 조직들은 두 모델을 경쟁자가 아니라 하나의 스펙트럼 위의 지점들로 취급하여, 복잡성이 정당화하는 영역에서는 도메인 소유권을 채택하면서도 가장 민감하거나 부서를 가로지르는 데이터셋에 대해서는 중앙집중식 통제를 유지한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-datamesh-q1",
      "prompt": "What is the main purpose of the article?",
      "promptKo": "이 기사의 주된 목적은 무엇인가?",
      "choices": [
        "To compare data mesh and centralized data lake approaches and explain when each is appropriate",
        "To recommend that all enterprises immediately abandon centralized data lakes",
        "To describe the technical steps required to build a data lake from scratch",
        "To argue that data governance is unnecessary in modern architectures"
      ],
      "choicesKo": [
        "데이터 메시와 중앙집중식 데이터 레이크 접근법을 비교하고 각각이 언제 적절한지 설명하기 위해",
        "모든 기업이 즉시 중앙집중식 데이터 레이크를 버려야 한다고 권하기 위해",
        "데이터 레이크를 처음부터 구축하는 데 필요한 기술적 단계를 설명하기 위해",
        "현대 아키텍처에서는 데이터 거버넌스가 불필요하다고 주장하기 위해"
      ],
      "answerIndex": 0,
      "explanation": "글은 중앙집중식 레이크의 장단점과 데이터 메시의 장단점을 대비한 뒤, 마지막 문장에서 \"the two models not as rivals but as points on a spectrum\"라며 각 방식이 어떤 상황에 맞는지 설명한다. 따라서 두 접근법을 비교하고 적합한 상황을 제시하는 것이 목적이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-datamesh-q2",
      "prompt": "According to the article, why does the central data team often become a bottleneck?",
      "promptKo": "기사에 따르면, 중앙 데이터 팀은 왜 종종 병목이 되는가?",
      "choices": [
        "Because it deliberately delays requests to protect its budget",
        "Because it lacks any automated tooling whatsoever",
        "Because it refuses to share data with business divisions",
        "Because it must understand the semantics of many domains it did not create"
      ],
      "choicesKo": [
        "예산을 지키기 위해 고의로 요청을 지연시키기 때문에",
        "어떠한 자동화 도구도 전혀 갖추고 있지 않기 때문에",
        "비즈니스 부서와 데이터를 공유하기를 거부하기 때문에",
        "자신이 만들지 않은 여러 도메인의 의미 체계를 파악해야 하기 때문에"
      ],
      "answerIndex": 3,
      "explanation": "세 번째 문장에서 중앙 팀이 병목이 되는 이유로 \"it must understand the semantics of dozens of domains it did not create and cannot fully comprehend\"를 든다. 따라서 자신이 만들지 않은 여러 도메인의 의미 체계를 이해해야 하기 때문이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-datamesh-q3",
      "prompt": "What can be inferred about adopting a data mesh in an organization with low platform maturity?",
      "promptKo": "플랫폼 성숙도가 낮은 조직에서 데이터 메시를 도입하는 것에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "It will always outperform a centralized lake regardless of conditions",
        "It is likely to be problematic because domain teams lack the self-service tooling and standards needed to own data responsibly",
        "It eliminates the need for any governance entirely",
        "It is the cheapest possible option for any company size"
      ],
      "choicesKo": [
        "조건과 무관하게 항상 중앙집중식 레이크보다 성능이 우수할 것이다",
        "도메인 팀이 데이터를 책임감 있게 소유하는 데 필요한 셀프서비스 도구와 표준을 갖추지 못했기 때문에 문제가 될 가능성이 높다",
        "어떠한 거버넌스의 필요성도 완전히 제거한다",
        "어떤 규모의 회사에든 가장 저렴한 선택지이다"
      ],
      "answerIndex": 1,
      "explanation": "여덟 번째 문장에서 메시는 플랫폼 성숙도를 전제로 하며, 도메인 팀이 \"self-service tooling, automated quality checks, and clear interoperability standards\"를 갖춰야 책임감 있게 소유할 수 있다고 한다. 따라서 성숙도가 낮으면 메시 도입이 문제가 될 가능성이 높다고 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-datamesh-q4",
      "prompt": "The word \"erode\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"erode\"와 의미가 가장 가까운 것은?",
      "choices": [
        "publish",
        "strengthen",
        "diminish",
        "duplicate"
      ],
      "choicesKo": [
        "게시하다",
        "강화하다",
        "감소시키다",
        "복제하다"
      ],
      "answerIndex": 2,
      "explanation": "일곱 번째 문장에서 \"duplicated effort can quietly erode the savings\"는 중복 노력이 비용 절감 효과를 조용히 줄여 없앤다는 의미이므로 \"erode\"는 'diminish(감소시키다)'와 가장 가깝다. 'strengthen(강화하다)'은 반대 의미의 오답이다.",
      "category": "동의어"
    }
  ]
}
```
