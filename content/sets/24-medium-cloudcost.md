# Set 24 — MEDIUM — Cutting Cloud Data-Warehouse Costs (Article)

```json
{
  "id": "set-medium-cloudcost",
  "difficulty": "MEDIUM",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "As data volumes grow, many companies find that their cloud data-warehouse bills rise faster than the value they get from the stored information.",
      "ko": "데이터 양이 증가하면서 많은 기업이 클라우드 데이터 웨어하우스 청구액이 저장된 정보에서 얻는 가치보다 더 빠르게 상승한다는 것을 깨닫게 됩니다."
    },
    {
      "en": "Often the spending grows quietly, because each new pipeline and dashboard adds a little more cost that no single team notices.",
      "ko": "지출은 흔히 조용히 증가하는데, 새로운 파이프라인과 대시보드 각각이 어떤 단일 팀도 알아채지 못하는 약간의 비용을 더하기 때문입니다."
    },
    {
      "en": "The first step toward control is simply to make those costs visible, breaking the monthly bill down by team and by project.",
      "ko": "비용을 통제하기 위한 첫 단계는 그저 그 비용을 가시화하여 월간 청구액을 팀별 및 프로젝트별로 나누는 것입니다."
    },
    {
      "en": "One of the simplest savings comes from automatically pausing compute clusters that sit idle outside of business hours.",
      "ko": "가장 간단한 절감 방안 중 하나는 업무 시간 외에 유휴 상태로 있는 컴퓨팅 클러스터를 자동으로 일시 중지하는 것에서 나옵니다."
    },
    {
      "en": "Many warehouses are billed by the second of compute, so even a few idle hours each night quietly add up over a month.",
      "ko": "많은 웨어하우스가 컴퓨팅을 초 단위로 과금하므로, 매일 밤 몇 시간의 유휴 시간만으로도 한 달에 걸쳐 조용히 누적됩니다."
    },
    {
      "en": "Another effective tactic is to archive \"cold\" data, which is rarely queried, into cheaper long-term storage instead of keeping it on premium tiers.",
      "ko": "또 다른 효과적인 전략은 거의 조회되지 않는 \"콜드\" 데이터를 프리미엄 등급에 보관하는 대신 더 저렴한 장기 저장소로 아카이빙하는 것입니다."
    },
    {
      "en": "Archived data can still be retrieved when needed, though it may take slightly longer to load than data on a premium tier.",
      "ko": "아카이빙된 데이터는 필요할 때 여전히 검색할 수 있지만, 프리미엄 등급의 데이터보다 불러오는 데 약간 더 오래 걸릴 수 있습니다."
    },
    {
      "en": "Because these measures target unused capacity rather than active workloads, teams can lower spending without slowing down the queries people rely on.",
      "ko": "이러한 조치는 활성 작업이 아닌 미사용 용량을 대상으로 하기 때문에, 팀은 사람들이 의존하는 쿼리의 속도를 늦추지 않고도 지출을 줄일 수 있습니다."
    },
    {
      "en": "A third habit is to review unused tables and stale data copies regularly, deleting what no longer serves any reporting need.",
      "ko": "세 번째 습관은 사용되지 않는 테이블과 오래된 데이터 사본을 정기적으로 검토하여 더 이상 어떤 보고 목적에도 쓰이지 않는 것을 삭제하는 것입니다."
    },
    {
      "en": "Companies that adopt these practices commonly report cutting monthly warehouse costs by twenty to forty percent within a single quarter.",
      "ko": "이러한 방안을 채택한 기업들은 흔히 한 분기 이내에 월간 웨어하우스 비용을 20에서 40퍼센트까지 절감했다고 보고합니다."
    },
    {
      "en": "Crucially, none of these tactics requires switching providers or rewriting existing analyses, which makes them easy to start this week.",
      "ko": "결정적으로, 이러한 전략 중 어느 것도 공급업체를 바꾸거나 기존 분석을 다시 작성할 필요가 없으므로, 이번 주에 시작하기 쉽습니다."
    }
  ],
  "questions": [
    {
      "id": "set-medium-cloudcost-q1",
      "prompt": "What is the article mainly about?",
      "promptKo": "이 기사는 주로 무엇에 관한 것인가?",
      "choices": [
        "How to migrate data to a new warehouse provider.",
        "Practical ways to reduce cloud data-warehouse costs.",
        "Why data volumes keep growing every year.",
        "How to write faster database queries."
      ],
      "choicesKo": [
        "새 웨어하우스 공급업체로 데이터를 이전하는 방법.",
        "클라우드 데이터 웨어하우스 비용을 줄이는 실용적인 방안.",
        "데이터 양이 매년 계속 증가하는 이유.",
        "더 빠른 데이터베이스 쿼리를 작성하는 방법."
      ],
      "answerIndex": 1,
      "explanation": "기사는 비용 가시화, 유휴 클러스터 일시 중지, 콜드 데이터 아카이빙, 미사용 테이블 삭제 등 웨어하우스 비용 절감 방안을 설명한다. 따라서 정답은 (나)=1이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-medium-cloudcost-q2",
      "prompt": "What does the article suggest doing with rarely queried data?",
      "promptKo": "기사는 거의 조회되지 않는 데이터를 어떻게 하라고 제안하는가?",
      "choices": [
        "Move it to cheaper long-term storage.",
        "Keep it on premium storage tiers.",
        "Delete it permanently to save space.",
        "Query it more often to justify the cost."
      ],
      "choicesKo": [
        "더 저렴한 장기 저장소로 옮긴다.",
        "프리미엄 저장 등급에 유지한다.",
        "공간 절약을 위해 영구적으로 삭제한다.",
        "비용을 정당화하기 위해 더 자주 조회한다."
      ],
      "answerIndex": 0,
      "explanation": "여섯 번째 문장에서 거의 조회되지 않는 콜드 데이터를 더 저렴한 장기 저장소로 아카이빙하라고 했다. 따라서 정답은 (가)=0이다.",
      "category": "세부사항"
    },
    {
      "id": "set-medium-cloudcost-q3",
      "prompt": "What can be inferred about the recommended measures?",
      "promptKo": "권장된 조치에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": [
        "They require shutting down active workloads during the day.",
        "They guarantee exactly forty percent savings every month.",
        "They only work for very small companies.",
        "They reduce costs while keeping query performance intact."
      ],
      "choicesKo": [
        "낮 동안 활성 작업을 종료해야 한다.",
        "매월 정확히 40퍼센트의 절감을 보장한다.",
        "아주 작은 회사에서만 효과가 있다.",
        "쿼리 성능을 그대로 유지하면서 비용을 줄인다."
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장에서 이 조치들이 활성 작업이 아닌 미사용 용량을 대상으로 해 쿼리 속도를 늦추지 않고 지출을 줄인다고 했으므로 성능 유지와 비용 절감을 추론할 수 있다. 따라서 정답은 (라)=3이다.",
      "category": "추론"
    },
    {
      "id": "set-medium-cloudcost-q4",
      "prompt": "In the article, the word \"idle\" is closest in meaning to",
      "promptKo": "기사에서 단어 \"idle\"과 의미가 가장 가까운 것은?",
      "choices": [
        "busy",
        "expensive",
        "inactive",
        "secure"
      ],
      "choicesKo": [
        "바쁜",
        "비싼",
        "활동하지 않는",
        "안전한"
      ],
      "answerIndex": 2,
      "explanation": "네 번째 문장에서 업무 시간 외에 \"idle\" 상태로 있는 클러스터는 작동하지 않는 상태이므로 inactive(활동하지 않는)가 가장 가깝다. 반의어인 busy(바쁜)는 오답이다. 따라서 정답은 (다)=2이다.",
      "category": "동의어"
    }
  ]
}
```
