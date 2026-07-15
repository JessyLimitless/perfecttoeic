# Part 5 패턴학습 · CHAPTER 1 — 품사 및 주어/동사 구조 (패턴 01~05)

```json
{
  "chapter": 1,
  "chapterTitle": "품사 및 주어/동사 구조",
  "patterns": [
    {
      "id": "p5-pat-01",
      "no": 1,
      "title": "주어·목적어 자리를 채우는 순수 명사",
      "category": "명사 자리",
      "formula": "문장의 필수 뼈대인 **주어(Subject)** 자리와 **타동사·전치사의 목적어(Object)** 자리는 명사(Noun)의 영토입니다.\n\n· `[ 주어(명사) + 동사 ]`\n· `[ 타동사 / 전치사 + 목적어(명사) ]`\n· 관사(a/the)·소유격·형용사의 수식을 받는 맨 끝자리도 명사 자리.\n\n**명사 어미**: -tion · -ment · -ty · -ness · -ance/ence · -al",
      "tip": "빈칸 앞뒤에 관사(a/the)나 전치사가 있고 문장에 진짜 동사가 따로 살아 있으면, 고민 없이 **명사 어미**를 가진 단어를 고른다. 형용사·부사·시제 동사는 명사 자리에 못 들어간다.",
      "questions": [
        {
          "prompt": "All maintenance staff must obtain written ______ before beginning repairs on the assembly line.",
          "choices": ["approve", "approved", "approval", "approvingly"],
          "answerIndex": 2,
          "explanation": "타동사 obtain의 목적어이자 형용사 written의 수식을 받는 명사 자리. 동사 (A), 과거분사 (B), 부사 (D)를 지우면 명사 어미 -al의 (C) approval(승인)이 정답.",
          "translation": "모든 정비 직원은 조립 라인 수리를 시작하기 전에 서면 승인을 받아야 한다."
        },
        {
          "prompt": "Under the updated policy, the ______ of a new inventory system is required at every branch.",
          "choices": ["implement", "implementation", "implementer", "implemented"],
          "answerIndex": 1,
          "explanation": "정관사 the와 전치사 of 사이의 주어 명사 자리. 동사 (A)·분사 (D) 제외. (C) implementer는 '시행하는 사람'이라 문맥에 어색하고, 행위 명사 (B) implementation(도입)이 자연스럽다.",
          "translation": "개정된 방침에 따라, 모든 지점에서 새 재고 관리 시스템의 도입이 의무화된다."
        },
        {
          "prompt": "Regional managers expressed considerable ______ about the sudden decline in weekend sales.",
          "choices": ["concern", "concerned", "concerning", "concernment"],
          "answerIndex": 0,
          "explanation": "형용사 considerable의 수식을 받는 타동사 expressed의 목적어 명사 자리. 분사 (B)(C) 제외. (D) concernment는 거의 쓰이지 않는 고어체이고, 표준 명사는 (A) concern(우려).",
          "translation": "지역 관리자들은 주말 매출의 갑작스러운 감소에 대해 상당한 우려를 표명했다."
        }
      ]
    },
    {
      "id": "p5-pat-02",
      "no": 2,
      "title": "명사 앞에서 수식하는 한정사·형용사",
      "category": "형용사 자리",
      "formula": "명사 바로 앞에서 명사의 상태·성질을 수식하는 품사는 **형용사(Adjective)**입니다.\n\n· `[ 관사/소유격 + 형용사 + 명사 ]`\n· `[ 부사 + 형용사 + 명사 ]`\n\n**형용사 어미**: -ive · -al · -ful · -able/ible · -ous · -ic · -ary",
      "tip": "명사 바로 앞자리가 뚫려 있으면 **형용사 어미**를 먼저 고른다. 순수 형용사가 없으면 형용사 역할을 대행하는 **분사(-ing/-ed)**가 2순위.",
      "questions": [
        {
          "prompt": "The safety division issued a ______ notice regarding the newly installed packaging equipment.",
          "choices": ["caution", "cautious", "cautiously", "cautionary"],
          "answerIndex": 3,
          "explanation": "관사 a와 명사 notice 사이의 형용사 자리. 명사 (A)·부사 (C) 제외. '조심스러운' (B) cautious가 아니라 '경고성의'라는 뜻으로 notice를 꾸미는 (D) cautionary가 문맥에 맞다.",
          "translation": "안전 부서는 새로 설치된 포장 장비와 관련하여 경고성 공지를 발표했다."
        },
        {
          "prompt": "Because of the rapid store expansion, supervisors must ensure that ______ hygiene standards are maintained.",
          "choices": ["strictness", "strict", "strictly", "stricter"],
          "answerIndex": 1,
          "explanation": "복수 명사 hygiene standards를 앞에서 수식하는 형용사 자리. 명사 (A)·부사 (C) 제외. 비교 대상 단서가 없으므로 비교급 (D)보다 원급 형용사 (B) strict(엄격한)가 맞다.",
          "translation": "빠른 매장 확장으로 인해, 관리자들은 엄격한 위생 기준이 유지되도록 보장해야 한다."
        },
        {
          "prompt": "The partnership with Hillcrest Retail produced ______ results during the third-quarter review.",
          "choices": ["impressive", "impression", "impressively", "impress"],
          "answerIndex": 0,
          "explanation": "목적어 명사 results를 앞에서 수식하는 형용사 자리. 동사 (D)·명사 (B)·부사 (C)를 지우면 형용사 어미 -ive의 (A) impressive(인상적인)가 남는다.",
          "translation": "힐크레스트 리테일과의 제휴는 3분기 검토 기간 동안 인상적인 성과를 냈다."
        }
      ]
    },
    {
      "id": "p5-pat-03",
      "no": 3,
      "title": "동사·형용사·문장 전체를 수식하는 부사",
      "category": "부사 자리",
      "formula": "명사를 제외하고 동사·형용사·다른 부사·준동사·문장 전체를 수식하는 만능 품사는 **부사(Adverb)**입니다.\n\n· `[ 주어 + 부사 + 동사 ]`\n· `[ be동사 + 부사 + 형용사/p.p. ]`\n· `[ 조동사 + 부사 + 동사원형 ]`\n· `[ 부사, 주어 + 동사 ]`\n\n**부사 어미**: 대부분 `형용사 + -ly`",
      "tip": "이미 문법적으로 완전한 문장에 빈칸이 뚫려 있으면, 문장 성분에 영향을 주지 않는 **부사(-ly)**가 정답이다.",
      "questions": [
        {
          "prompt": "The revised safety protocols were ______ implemented across all distribution centers last month.",
          "choices": ["success", "successful", "successfully", "succeed"],
          "answerIndex": 2,
          "explanation": "were와 implemented(p.p.) 사이 수동태 동사구를 수식하는 부사 자리. 명사 (A)·형용사 (B)·동사 (D) 제외 → (C) successfully(성공적으로).",
          "translation": "개정된 안전 수칙은 지난달 모든 물류센터에 성공적으로 도입되었다."
        },
        {
          "prompt": "The logistics team ______ tested the delivery tracking software to eliminate scheduling delays.",
          "choices": ["repeat", "repeated", "repeatedly", "repetition"],
          "answerIndex": 2,
          "explanation": "주어와 진짜 동사 tested 사이에서 동사를 수식하는 부사 자리. 동사원형 (A)·과거동사/분사 (B)·명사 (D) 제외 → -ly 형태 (C) repeatedly(반복적으로).",
          "translation": "물류팀은 일정 지연을 없애기 위해 배송 추적 소프트웨어를 반복적으로 테스트했다."
        },
        {
          "prompt": "Ms. Aldridge ______ submitted the quarterly budget report before the finance committee's deadline.",
          "choices": ["prompt", "promptly", "promptness", "prompted"],
          "answerIndex": 1,
          "explanation": "주어와 과거 동사 submitted 사이에서 동사를 수식하는 부사 자리. 형용사 (A)·명사 (C)·과거동사/분사 (D) 제외 → (B) promptly(신속하게).",
          "translation": "올드리지 씨는 재무 위원회의 마감 기한 전에 분기 예산 보고서를 신속하게 제출했다."
        }
      ]
    },
    {
      "id": "p5-pat-04",
      "no": 4,
      "title": "동사의 수·태·시 일치",
      "category": "동사",
      "formula": "진짜 동사(본동사) 자리의 형태를 고르는 문제. **[수 → 태 → 시] 삼위일체**로 단계별 판별.\n\n1. **수 일치**: 주어가 단수면 단수동사(-s), 복수면 복수동사.\n2. **태 일치**: 빈칸 뒤 목적어(명사)가 있으면 능동, 없고 전치사구·부사만 있으면 수동(be+p.p.).\n3. **시제 일치**: 시제 힌트 부사(last week, next month 등)로 과거·현재·미래 결정.",
      "tip": "보기 중 동사가 아닌 것(-ing 동명사·to부정사)은 진짜 동사 자리에 못 오므로 **0순위로 즉시 소거**한 뒤, 남은 동사를 수→태→시 순으로 대조한다.",
      "questions": [
        {
          "prompt": "The central storage cabinet for the archived personnel files ______ relocated to the second floor last week.",
          "choices": ["was", "were", "is", "has"],
          "answerIndex": 0,
          "explanation": "주어 핵은 단수 cabinet(for ~ files는 수식어). 시제 힌트 last week로 과거, 뒤에 목적어 없이 relocated(p.p.)+전치사구이므로 수동태. 단수·과거·수동을 모두 충족하는 (A) was(relocated)가 정답.",
          "translation": "보관된 인사 파일용 중앙 수납장은 지난주 2층으로 옮겨졌다."
        },
        {
          "prompt": "The account managers at Brightway Consulting ______ several revised proposals to the client yesterday.",
          "choices": ["uploading", "submitted", "will submit", "submits"],
          "answerIndex": 1,
          "explanation": "준동사 (A) uploading은 동사 자리에 못 오므로 먼저 소거. 시제 힌트 yesterday로 미래 (C)·현재단수 (D) 제외 → 과거동사 (B) submitted.",
          "translation": "브라이트웨이 컨설팅의 고객 담당자들은 어제 여러 수정 제안서를 고객에게 제출했다."
        },
        {
          "prompt": "All billing discrepancies on the new payment platform ______ by the finance team during the audit.",
          "choices": ["resolve", "resolving", "were resolved", "has resolved"],
          "answerIndex": 2,
          "explanation": "준동사 (B)는 즉시 제외. 빈칸 뒤 목적어 없이 by the finance team이 붙으므로 수동태. 복수 주어(discrepancies)에 맞는 수동태는 (C) were resolved.",
          "translation": "새 결제 플랫폼의 모든 청구 오류는 감사 기간 동안 재무팀에 의해 해결되었다."
        }
      ]
    },
    {
      "id": "p5-pat-05",
      "no": 5,
      "title": "사람·사물 명사 구별과 대명사의 격",
      "category": "명사·대명사",
      "formula": "두 축을 함께 본다.\n\n1. **사람 명사 vs 사물 명사**: 문맥상 행위 주체인 '사람'인지, 대상인 '사물/개념'인지.\n2. **인칭대명사 격**: 명사 바로 앞은 **소유격**, 타동사·전치사 뒤는 **목적격**.",
      "tip": "명사 바로 앞자리가 빈칸이면 **소유격**을 최우선으로 본다. 고용(hire)·채용 대상이면 사람 명사(-er/-or/-ist)를 고른다.",
      "questions": [
        {
          "prompt": "Brightway Consulting is looking to hire an experienced ______ to design the layout for its new regional office.",
          "choices": ["analyze", "analyst", "analysis", "analytical"],
          "answerIndex": 1,
          "explanation": "관사 an과 형용사 experienced의 수식을 받는 명사 자리이자 hire(고용)의 대상. 사물 개념 (C) analysis가 아니라 사람 명사 (B) analyst(분석가)가 정답.",
          "translation": "브라이트웨이 컨설팅은 새 지역 사무소의 배치를 설계할 경험 많은 분석가를 채용하려 한다."
        },
        {
          "prompt": "The newly appointed operations director presented ______ comprehensive report on warehouse efficiency.",
          "choices": ["he", "him", "his", "himself"],
          "answerIndex": 2,
          "explanation": "명사구 comprehensive report 바로 앞의 소유격 자리. 주격 (A)·목적격 (B)·재귀 (D) 제외 → 소유격 (C) his.",
          "translation": "새로 임명된 운영 이사는 창고 효율성에 관한 자신의 종합 보고서를 제출했다."
        },
        {
          "prompt": "Employees at the downtown branch must submit ______ expense reports to the accounting office by Friday.",
          "choices": ["they", "them", "their", "themselves"],
          "answerIndex": 2,
          "explanation": "명사구 expense reports 앞의 소유격 자리. 주격 (A)·목적격 (B)·재귀 (D) 제외하고 복수 주어 Employees를 한정하는 (C) their.",
          "translation": "시내 지점 직원들은 금요일까지 자신의 경비 보고서를 회계 부서에 제출해야 한다."
        }
      ]
    }
  ]
}
```
