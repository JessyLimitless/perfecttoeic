# Part 5 패턴학습 · CHAPTER 3 — 준동사 II · 관계사 · 명사절 (패턴 11~15)

```json
{
  "chapter": 3,
  "chapterTitle": "준동사 II · 관계사 · 명사절",
  "patterns": [
    {
      "id": "p5-pat-11",
      "no": 11,
      "title": "가주어·가목적어 it",
      "category": "준동사",
      "formula": "주어·목적어 자리에 긴 to부정사절/that절이 오면, 그 자리에 껍데기 **it**을 두고 진짜 주어/목적어는 뒤로 보낸다.\n\n· **가주어**: `It is + 형용사 + to do / that절`\n· **가목적어**: `주어 + 5형식 동사 + it + 형용사(보어) + to do / that절`\n  (5형식 동사: make, believe, consider, find, think)",
      "tip": "find·make 등 5형식 동사 뒤가 뚫려 있고 그 뒤에 형용사 보어(necessary/possible/essential)+to부정사가 이어지면, 해석 없이 가목적어 **it**. 이 자리에 this·that·which는 못 온다.",
      "questions": [
        {
          "prompt": "For the launch of the new loyalty program, the marketing lead found ______ essential to maintain a consistent brand message.",
          "choices": ["this", "that", "it", "what"],
          "answerIndex": 2,
          "explanation": "5형식 found 뒤 공란 + 형용사 보어 essential + 진짜 목적어 to maintain... 구조. 가목적어는 오직 (C) it. 지시대명사 this/that은 이 역할을 못 한다.",
          "translation": "새 멤버십 프로그램 출시를 위해, 마케팅 책임자는 일관된 브랜드 메시지를 유지하는 것이 필수적임을 알게 되었다."
        },
        {
          "prompt": "______ is highly recommended to complete the online training modules before the annual compliance review.",
          "choices": ["It", "There", "This", "That"],
          "answerIndex": 0,
          "explanation": "문두 주어 자리, 진짜 주어는 뒤의 to complete... to부정사구. 이를 받는 가주어는 (A) It. There는 be+명사 구조를 유도하고, this/that은 가주어 역할을 못 한다.",
          "translation": "연례 규정 준수 검토 전에 온라인 교육 과정을 이수하는 것이 강력히 권장된다."
        },
        {
          "prompt": "The design team made ______ possible to update the entire store catalog with a single click.",
          "choices": ["itself", "it", "what", "those"],
          "answerIndex": 1,
          "explanation": "5형식 made 뒤 공란 + 형용사 보어 possible + 진짜 목적어 to update... 구조 → 가목적어 (B) it.",
          "translation": "디자인팀은 클릭 한 번으로 전체 매장 카탈로그를 업데이트하는 것을 가능하게 만들었다."
        }
      ]
    },
    {
      "id": "p5-pat-12",
      "no": 12,
      "title": "주격·목적격 관계대명사",
      "category": "관계사",
      "formula": "선행사(명사) 뒤에서 형용사절을 이끄는 **관계대명사**의 격을 정한다.\n\n· **주격**: `선행사 + who/which/that + 동사` (뒤에 주어 없음)\n· **목적격**: `선행사 + whom/which/that + 주어 + 동사` (뒤에 목적어 없음)",
      "tip": "빈칸 바로 뒤에 **동사가 곧장 오면 주격**, **`주어+동사`가 이어지고 목적어가 빠졌으면 목적격**. 선행사가 사람이면 who/whom, 사물이면 which.",
      "questions": [
        {
          "prompt": "Northgate is a manufacturing firm ______ specializes in eco-friendly packaging materials.",
          "choices": ["who", "which", "whom", "what"],
          "answerIndex": 1,
          "explanation": "사물 선행사 firm 뒤, 빈칸 바로 뒤에 동사 specializes → 주격 자리. 사람용 (A)(C) 제외, 선행사 포함 (D) what 제외 → (B) which.",
          "translation": "노스게이트는 친환경 포장재를 전문으로 하는 제조 회사이다."
        },
        {
          "prompt": "The quarterly figures ______ the accounting department prepared were presented to the board of directors.",
          "choices": ["who", "whom", "that", "whose"],
          "answerIndex": 2,
          "explanation": "사물 선행사 figures 뒤에 `the department(주어) + prepared(타동사)`가 오고 목적어가 비었다 → 목적격 자리. 사람용 (A)(B), 소유격 (D) 제외 → (C) that.",
          "translation": "회계 부서가 작성한 분기 실적 수치가 이사회에 제출되었다."
        },
        {
          "prompt": "Dr. Reyes, ______ the safety division hired as its lead consultant, has decades of field experience.",
          "choices": ["which", "whose", "whom", "what"],
          "answerIndex": 2,
          "explanation": "사람 선행사 Dr. Reyes 뒤에 `the division(주어) + hired(타동사)`가 오고 목적어가 비었다 → 사람 목적격 (C) whom.",
          "translation": "안전 부서가 수석 컨설턴트로 채용한 레예스 박사는 수십 년의 현장 경험이 있다."
        }
      ]
    },
    {
      "id": "p5-pat-13",
      "no": 13,
      "title": "소유격 관계대명사 whose",
      "category": "관계사",
      "formula": "선행사(사람·사물 모두)의 소유 관계를 잇는 **소유격 관계대명사 whose**.\n\n· `선행사 + whose + 무관사 명사 + 동사`\n· whose 뒤에는 관사·소유격 없는 순수 명사가 오고, 그 명사를 주어/목적어로 하는 완전한 절이 이어진다.",
      "tip": "관계대명사 빈칸 뒤에 **관사 없이 홀로 선 명사**가 오고 선행사와 '~의' 소유 관계가 자연스러우면 **whose**.",
      "questions": [
        {
          "prompt": "Brightway is consulting for a retailer ______ distribution network spans more than three countries.",
          "choices": ["who", "whose", "which", "whom"],
          "answerIndex": 1,
          "explanation": "선행사 a retailer 뒤에 무관사 명사 distribution network가 주어로 오고 `spans + 목적어`로 완전한 절. '소매업체의 유통망'이라는 소유 관계 → (B) whose.",
          "translation": "브라이트웨이는 유통망이 3개국 이상에 걸쳐 있는 한 소매업체를 위해 컨설팅하고 있다."
        },
        {
          "prompt": "Hillcrest is a grocery chain ______ private-label products have won several industry awards.",
          "choices": ["whose", "that", "which", "whom"],
          "answerIndex": 0,
          "explanation": "선행사 a grocery chain 뒤에 무관사 명사 private-label products가 주어로 오고 완전한 절. 주격/목적격 (B)(C)는 뒤에 빠진 성분이 있어야 하므로 탈락 → (A) whose.",
          "translation": "힐크레스트는 자체 브랜드 제품이 여러 업계 상을 받은 식료품 체인이다."
        },
        {
          "prompt": "The research partner ______ funding application was approved is ready to begin the joint project.",
          "choices": ["who", "whom", "whose", "which"],
          "answerIndex": 2,
          "explanation": "선행사 partner 뒤에 무관사 명사 funding application이 주어로 오고 `was approved`로 완전. '파트너의 자금 신청서'라는 소유 관계 → (C) whose.",
          "translation": "자금 신청서가 승인된 그 연구 파트너는 공동 프로젝트를 시작할 준비가 되어 있다."
        }
      ]
    },
    {
      "id": "p5-pat-14",
      "no": 14,
      "title": "명사절 접속사 what vs that",
      "category": "명사절",
      "formula": "명사절을 이끄는 **what**과 **that**의 구별. 둘 다 주어·목적어·보어 역할을 하지만 내부 구조가 다르다.\n\n· **what + 불완전한 절**: what은 선행사를 포함한 관계대명사라, 뒤에 **주어나 목적어가 하나 빠진** 불완전한 절.\n· **that + 완전한 절**: that은 순수 접속사라, 뒤에 **빠진 성분이 없는** 완전한 절.",
      "tip": "빈칸 뒤 절에서 **주어나 목적어가 빠졌으면 what**, `주어+동사+목적어`가 다 있으면 **that**. (핵심은 '뒤 절의 완전성' 하나뿐.)",
      "questions": [
        {
          "prompt": "The developer explained ______ the new mobile app can process customer refunds automatically.",
          "choices": ["what", "that", "which", "whose"],
          "answerIndex": 1,
          "explanation": "explained의 목적어 명사절. 뒤에 `the app(주어) + can process(동사) + refunds(목적어)`로 완전한 절이므로 (B) that. what은 불완전한 절을 이끌어야 해서 오답.",
          "translation": "개발자는 새 모바일 앱이 고객 환불을 자동으로 처리할 수 있다고 설명했다."
        },
        {
          "prompt": "The committee could not clearly determine ______ the customer survey had actually measured.",
          "choices": ["that", "what", "which", "whose"],
          "answerIndex": 1,
          "explanation": "determine의 목적어 명사절. 뒤에 `the survey(주어) + had measured(타동사)`가 오고 **목적어가 비어** 불완전 → 목적어를 대신하는 (B) what. that은 완전한 절을 이끌어야 해서 오답.",
          "translation": "위원회는 그 고객 설문이 실제로 무엇을 측정했는지 명확히 판단할 수 없었다."
        },
        {
          "prompt": "To secure the funding, the team must clearly state ______ the new service platform can achieve.",
          "choices": ["that", "what", "where", "how"],
          "answerIndex": 1,
          "explanation": "state의 목적어 명사절. 뒤에 `the platform(주어) + can achieve(타동사)`가 오고 **목적어가 비어** 불완전 → (B) what.",
          "translation": "자금을 확보하기 위해, 그 팀은 새 서비스 플랫폼이 무엇을 달성할 수 있는지 명확히 밝혀야 한다."
        }
      ]
    },
    {
      "id": "p5-pat-15",
      "no": 15,
      "title": "to부정사·동명사 관용 표현",
      "category": "준동사",
      "formula": "특정 표현이 to부정사나 동명사 한쪽만 편애하는 **관용 짝꿍**.\n\n· **to부정사 결합**: `be about to do`(막 ~하려 하다) · `be eager/anxious to do`(열망하다)\n· **동명사 결합**: `have difficulty/trouble -ing`(어려움을 겪다) · `be worth -ing`(가치가 있다) · `cannot help -ing`(~하지 않을 수 없다)",
      "tip": "difficulty·trouble 뒤가 뚫리면 **-ing**, be about·be eager 뒤가 뚫리면 **to + V**.",
      "questions": [
        {
          "prompt": "The relocation team had great difficulty ______ all of the office equipment before the deadline.",
          "choices": ["move", "movement", "moving", "to move"],
          "answerIndex": 2,
          "explanation": "have difficulty (in) -ing 관용 표현. 뒤 목적어 all of the office equipment를 거느리는 동명사 (C) moving.",
          "translation": "이전 담당팀은 마감 기한 전에 모든 사무 장비를 옮기는 데 큰 어려움을 겪었다."
        },
        {
          "prompt": "The event staff was about ______ the venue setup when the severe weather alert arrived.",
          "choices": ["complete", "to complete", "completing", "completion"],
          "answerIndex": 1,
          "explanation": "be about to do(막 ~하려던 참이다) 관용 표현 → (B) to complete.",
          "translation": "행사 진행 요원들이 행사장 설치를 막 마치려던 참에 강풍 경보가 발령되었다."
        },
        {
          "prompt": "The initial business proposal is well worth ______ because it satisfies every client requirement.",
          "choices": ["to review", "reviewing", "review", "reviewable"],
          "answerIndex": 1,
          "explanation": "be worth -ing(~할 가치가 있다) 관용 표현 → (B) reviewing.",
          "translation": "그 초기 사업 제안서는 모든 고객 요구사항을 충족하므로 충분히 검토할 가치가 있다."
        }
      ]
    }
  ]
}
```
