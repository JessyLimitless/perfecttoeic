# Part 5 패턴학습 · CHAPTER 5 — 실전 필수 어휘 및 특수 구문 (패턴 21~25)

```json
{
  "chapter": 5,
  "chapterTitle": "특수 구문 · 어휘 연어 · 수 일치",
  "patterns": [
    {
      "id": "p5-pat-21",
      "no": 21,
      "title": "복합관계부사·특수 부사절 접속사",
      "category": "접속사",
      "formula": "콤마로 분리된 부사절을 이끌며 양보·시간 논리를 부여하는 **복합관계부사** 및 특수 접속사.\n\n· `However + 형용사/부사 + 주어 + 동사` = '아무리 ~할지라도' (출제율 최상위)\n· `Whenever + 완전한 절` = '~할 때마다'\n· `Wherever + 완전한 절` = '~하는 곳은 어디든'",
      "tip": "빈칸 뒤에 **형용사/부사가 먼저 나오고 그 뒤 `주어+동사`**가 이어지면, 해석 없이 **However**. 이 자리에 Although·Because는 못 온다(뒤에 명사 주어가 바로 와야 하므로).",
      "questions": [
        {
          "prompt": "______ strict the new workplace safety regulations may seem, they are essential for protecting warehouse staff.",
          "choices": ["Although", "However", "Subject to", "Whichever"],
          "answerIndex": 1,
          "explanation": "빈칸 뒤에 형용사 strict가 먼저 나오고 `the regulations(주어) + may seem(동사)`이 이어진다. 형용사를 앞으로 끌어 '아무리 ~할지라도'를 만드는 복합관계부사는 (B) However. Although 뒤에는 형용사가 아니라 명사 주어가 와야 한다.",
          "translation": "새 작업장 안전 규정이 아무리 엄격해 보일지라도, 그것은 창고 직원을 보호하는 데 필수적이다."
        },
        {
          "prompt": "Sales associates are required to log customer complaints ______ they arise during a shift.",
          "choices": ["whenever", "wherever", "whereas", "whatever"],
          "answerIndex": 0,
          "explanation": "뒤에 `they(주어) + arise(동사)`로 완전한 절이므로 명사 성분을 대신하는 whatever (D) 제외. '불만이 생길 때마다' 기록한다는 문맥 → (A) whenever.",
          "translation": "판매 직원들은 근무 중 고객 불만이 생길 때마다 그것을 기록하도록 요구된다."
        },
        {
          "prompt": "______ thoroughly the merchandise is inspected, every shipment must still pass a final quality check.",
          "choices": ["Even though", "However", "As if", "Furthermore"],
          "answerIndex": 1,
          "explanation": "빈칸 뒤에 부사 thoroughly가 먼저 나오고 `the merchandise(주어) + is inspected(동사)`가 이어진다. 부사를 앞으로 끄는 (B) However. Even though 뒤에는 부사가 바로 못 온다.",
          "translation": "상품이 아무리 철저히 검수되더라도, 모든 배송분은 여전히 최종 품질 검사를 통과해야 한다."
        }
      ]
    },
    {
      "id": "p5-pat-22",
      "no": 22,
      "title": "형용사·명사 + 전치사 연어",
      "category": "어휘",
      "formula": "고급 어휘 문제는 사전적 의미보다 **뒤에 붙는 전치사와의 궁합(연어, Collocation)**으로 푼다.\n\n· `be eligible for + 명사` / `be eligible to + 동사원형` (자격이 있다)\n· `be subject to + 명사` (~의 대상이 되다/영향을 받다)\n· `availability of + 명사` (~의 가용성)\n· `advancements in + 분야` (~ 분야의 발전)",
      "tip": "빈칸 뒤 전치사를 먼저 본다 — 자격 뉘앙스에 **for**면 eligible, 명사를 취하는 **to**면 subject, `the ___ of`면 availability 같은 명사 연어.",
      "questions": [
        {
          "prompt": "Employees who complete the leadership certification are ______ for the annual performance bonus.",
          "choices": ["eligible", "subject", "alternative", "provisional"],
          "answerIndex": 0,
          "explanation": "be동사 뒤 형용사 보어이고 뒤에 전치사 for가 있다. 'for와 결합해 자격이 있다'는 (A) eligible. (B) subject는 전치사 to를 데려와야 하므로 탈락.",
          "translation": "리더십 인증을 이수한 직원들은 연간 성과급을 받을 자격이 있다."
        },
        {
          "prompt": "All items purchased during the clearance sale are ______ to the store's strict final-sale policy.",
          "choices": ["eligible", "subject", "content", "secure"],
          "answerIndex": 1,
          "explanation": "뒤에 명사구를 취하는 전치사 to가 보인다. 'be subject to + 명사(~의 대상이 되다)' 연어 → (B) subject.",
          "translation": "정리 세일 기간에 구매한 모든 상품은 매장의 엄격한 최종 판매 정책의 적용을 받는다."
        },
        {
          "prompt": "The rapid rollout of the new delivery service was made possible by the ______ of additional warehouse staff.",
          "choices": ["alignment", "compliance", "availability", "dimension"],
          "answerIndex": 2,
          "explanation": "정관사 the와 전치사 of 사이 명사 어휘. '추가 인력의 가용성(확보) 덕분'이라는 문맥에서 of와 호응하는 (C) availability.",
          "translation": "새 배송 서비스의 빠른 도입은 추가 창고 인력의 확보 덕분에 가능했다."
        }
      ]
    },
    {
      "id": "p5-pat-23",
      "no": 23,
      "title": "도치 구문 (부정어·보어 문두)",
      "category": "도치",
      "formula": "특정 요소를 문두로 보내면서 어순이 **의문문 어순(조동사/be + 주어 + 동사)**으로 뒤집히는 도치.\n\n· **부정어 도치**: `Rarely / Seldom / Scarcely + 조동사(does/did/had) + 주어 + 동사`\n· **보어 도치**: `형용사/p.p.(보어) + be동사 + 진짜 주어` (주어가 길 때)",
      "tip": "문두에 Rarely가 오고 뒤에 주어+동사원형이면 빈칸은 조동사(does/did). 문두에 `Included in ~` 같은 분사 보어가 오면 빈칸은 진짜 주어에 수 일치한 be동사.",
      "questions": [
        {
          "prompt": "Rarely ______ the maintenance team encounter such severe equipment failures during routine inspections.",
          "choices": ["does", "is", "has", "operating"],
          "answerIndex": 0,
          "explanation": "문두 부정부사 Rarely 도치. 뒤에 `the team(주어) + encounter(동사원형)`가 있고 team은 3인칭 단수이므로 일반동사 도치 조동사 (A) does. (B)(C)는 뒤에 p.p.가 와야 한다.",
          "translation": "정비팀이 정기 점검 중에 그렇게 심각한 장비 고장을 겪는 경우는 거의 없다."
        },
        {
          "prompt": "Included in the new-employee orientation packet ______ a detailed map of the entire facility.",
          "choices": ["are", "is", "were", "has"],
          "answerIndex": 1,
          "explanation": "문두에 분사 보어 Included in ~이 도치되었고, 진짜 주어는 뒤의 a detailed map(단수). 현재 상태를 진술하는 단수 be동사 (B) is.",
          "translation": "신입 직원 오리엔테이션 자료에는 시설 전체의 상세 지도가 포함되어 있다."
        },
        {
          "prompt": "Scarcely ______ the delivery team left the warehouse when the client requested a change to the order.",
          "choices": ["did", "had", "was", "have"],
          "answerIndex": 1,
          "explanation": "`Scarcely + had + 주어 + p.p. + when ~ (~하자마자 ~하다)` 과거완료 부정어 도치. 뒤의 p.p. left와 결합하는 (B) had.",
          "translation": "배송팀이 창고를 떠나자마자 고객이 주문 변경을 요청했다."
        }
      ]
    },
    {
      "id": "p5-pat-24",
      "no": 24,
      "title": "당위성 동사·형용사 뒤 should 생략",
      "category": "가정법",
      "formula": "주절에 **당위(요구·제안·주장)**를 뜻하는 동사·형용사가 오면, that절 안의 주어 뒤에서 **should가 생략**되어 주어의 수·시제와 무관하게 **동사원형**만 남는다.\n\n· **당위 동사**: insist, suggest, recommend, request, require, ask, mandate\n· **당위 형용사**: imperative, essential, critical, necessary\n· `주어 + 당위어 + that + 주어 + (should) + 동사원형`",
      "tip": "주절에 requested·imperative 등이 있고 that절 동사가 뚫려 있으면, 3인칭 단수 동사·과거형은 함정. 무조건 **동사원형**.",
      "questions": [
        {
          "prompt": "The project director requested that all contractors ______ their safety certificates before the site visit.",
          "choices": ["submit", "submits", "submitted", "submitting"],
          "answerIndex": 0,
          "explanation": "당위 동사 requested + that절. 주절 과거형에 현혹되지 말 것 — should 생략으로 동사원형 (A) submit.",
          "translation": "프로젝트 책임자는 모든 협력업체가 현장 방문 전에 안전 인증서를 제출할 것을 요구했다."
        },
        {
          "prompt": "It is imperative that every branch office ______ the updated privacy policy on its central server.",
          "choices": ["enforces", "enforce", "enforced", "enforcing"],
          "answerIndex": 1,
          "explanation": "당위 형용사 imperative + that절. 주어 every ~ office가 단수라도 should 생략으로 동사원형 (B) enforce.",
          "translation": "모든 지점 사무소가 중앙 서버에 갱신된 개인정보 방침을 시행하는 것은 필수적이다."
        },
        {
          "prompt": "Management strongly recommended that the logistics lead ______ the delivery schedule by Friday.",
          "choices": ["finalize", "finalizes", "finalized", "finalization"],
          "answerIndex": 0,
          "explanation": "당위 동사 recommended + that절. 주어가 3인칭 단수여도 should 생략 동사원형 (A) finalize. 수·시제 함정 (B)(C) 제거.",
          "translation": "경영진은 물류 책임자가 금요일까지 배송 일정을 확정할 것을 강력히 권고했다."
        }
      ]
    },
    {
      "id": "p5-pat-25",
      "no": 25,
      "title": "특수 주어의 수 일치",
      "category": "수일치",
      "formula": "of 이하의 복수명사에 속지 않고 **진짜 주어의 핵**에 동사를 맞춘다.\n\n· `One of the + 복수명사 + 단수동사`\n· `Each of the + 복수명사 + 단수동사`\n· `The number of + 복수명사 + 단수동사` (반면 `A number of + 복수명사 + 복수동사`)",
      "tip": "주어가 One of the / Each of the / The number of로 시작하면, 뒤의 복수명사 거품을 무시하고 **단수동사(is/has/-s)**.",
      "questions": [
        {
          "prompt": "Each of the delivery vehicles assigned to the downtown route ______ inspected twice a month.",
          "choices": ["are", "is", "have", "inspecting"],
          "answerIndex": 1,
          "explanation": "주어 핵은 Each(단수), vehicles ~ route는 수식어 거품. 준동사 (D) 제외, 복수동사 (A)(C) 제외 → 단수 be동사 (B) is.",
          "translation": "시내 노선에 배정된 배송 차량 각각은 한 달에 두 번 점검을 받는다."
        },
        {
          "prompt": "One of the main reasons for the recent shipping delays ______ to be a seasonal staffing shortage.",
          "choices": ["appear", "appears", "appearing", "appearance"],
          "answerIndex": 1,
          "explanation": "주어 핵은 One(단수), of the ~ delays는 거품. 준동사 (C)·명사 (D) 제외, 단수 주어이므로 복수동사 (A) 제외 → 단수동사 (B) appears.",
          "translation": "최근 배송 지연의 주된 이유 중 하나는 계절적 인력 부족인 것으로 보인다."
        },
        {
          "prompt": "The number of returned items ______ been increasing steadily since the new return policy took effect.",
          "choices": ["is", "are", "have", "were"],
          "answerIndex": 0,
          "explanation": "`The number of + 복수명사`의 핵은 The number(단수)이므로 단수동사. 뒤의 been increasing과 연결되는 단수 (A) is. (A number of ~라면 복수동사였을 것.)",
          "translation": "새 반품 정책이 시행된 이후로 반품된 품목의 수가 꾸준히 증가하고 있다."
        }
      ]
    }
  ]
}
```
