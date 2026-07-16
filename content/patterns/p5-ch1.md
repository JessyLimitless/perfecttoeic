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
          "explanation": "타동사 obtain의 목적어이면서 형용사 written의 수식을 받는 자리라, 대상을 가리키는 '명사'가 와야 한다.\n(A) approve — 동사원형이라 명사 자리에 올 수 없다(이미 문장의 동사는 obtain).\n(B) approved — 과거분사(형용사·수동)라 '승인'이라는 대상 명사가 되지 못한다.\n(C) approval — 명사 어미 -al의 '승인'. 자리·의미 모두 부합해 정답.\n(D) approvingly — 부사(-ly)라 목적어가 아니라 동사·형용사를 수식하는 말이다.",
          "translation": "모든 정비 직원은 조립 라인 수리를 시작하기 전에 서면 승인을 받아야 한다."
        },
        {
          "prompt": "Under the updated policy, the ______ of a new inventory system is required at every branch.",
          "choices": ["implement", "implementation", "implementer", "implemented"],
          "answerIndex": 1,
          "explanation": "정관사 the와 전치사 of 사이의 주어 명사 자리다(문장의 진짜 동사는 is required).\n(A) implement — 동사라 'the ~ of' 사이의 주어 명사 자리에 못 온다.\n(B) implementation — 행위 명사 '도입'. 시스템의 도입이 의무화된다는 의미로 정답.\n(C) implementer — '시행하는 사람'이라는 사람 명사여서, 뒤의 of a new inventory system(시스템의 ~)과 의미가 어울리지 않는다.\n(D) implemented — 과거분사라 관사 the 뒤의 주어 명사가 될 수 없다.",
          "translation": "개정된 방침에 따라, 모든 지점에서 새 재고 관리 시스템의 도입이 의무화된다."
        },
        {
          "prompt": "Regional managers expressed considerable ______ about the sudden decline in weekend sales.",
          "choices": ["concern", "concerned", "concerning", "concernment"],
          "answerIndex": 0,
          "explanation": "형용사 considerable의 수식을 받는, 타동사 expressed의 목적어 명사 자리다.\n(A) concern — 표준 명사 '우려'. 자리·의미 모두 맞아 정답.\n(B) concerned — 과거분사(형용사)라 '걱정하는' 상태를 뜻할 뿐 목적어 명사가 못 된다.\n(C) concerning — 현재분사이자 전치사('~에 관하여')라 목적어 명사 자리에 부적합하다.\n(D) concernment — 거의 쓰이지 않는 고어체 명사라 실무 표준인 concern에 밀린다.",
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
          "explanation": "관사 a와 명사 notice 사이라, 명사를 꾸미는 형용사 자리다.\n(A) caution — 명사('주의')라 'a ~ notice' 사이의 수식어 자리에 못 온다.\n(B) cautious — '(사람이) 조심스러운'이라, 사물인 notice를 꾸미기엔 의미가 어긋난다.\n(C) cautiously — 부사라 명사 notice를 수식할 수 없다.\n(D) cautionary — '경고성의'라는 뜻으로 notice를 자연스럽게 수식해 정답.",
          "translation": "안전 부서는 새로 설치된 포장 장비와 관련하여 경고성 공지를 발표했다."
        },
        {
          "prompt": "Because of the rapid store expansion, supervisors must ensure that ______ hygiene standards are maintained.",
          "choices": ["strictness", "strict", "strictly", "stricter"],
          "answerIndex": 1,
          "explanation": "복수 명사 hygiene standards를 앞에서 수식하는 형용사 자리다.\n(A) strictness — 명사('엄격함')라 명사 앞 수식어 자리에 못 온다.\n(B) strict — '엄격한'. 원급 형용사로 기준을 수식해 정답.\n(C) strictly — 부사라 명사를 수식하지 못한다.\n(D) stricter — 비교급인데 than 등 비교 대상 단서가 없어 원급이 맞다.",
          "translation": "빠른 매장 확장으로 인해, 관리자들은 엄격한 위생 기준이 유지되도록 보장해야 한다."
        },
        {
          "prompt": "The partnership with Hillcrest Retail produced ______ results during the third-quarter review.",
          "choices": ["impressive", "impression", "impressively", "impress"],
          "answerIndex": 0,
          "explanation": "타동사 produced의 목적어 명사 results를 앞에서 수식하는 형용사 자리다.\n(A) impressive — 형용사 어미 -ive의 '인상적인'. results를 꾸며 정답.\n(B) impression — 명사('인상')라 명사 results를 수식하지 못한다.\n(C) impressively — 부사라 명사 results를 꾸밀 수 없다.\n(D) impress — 동사라 명사 앞 수식어가 못 된다.",
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
          "explanation": "were와 implemented(p.p.) 사이의 수동태 동사구를 수식하는 부사 자리다(문장은 이미 완전).\n(A) success — 명사라 be동사와 분사 사이를 채우지 못한다.\n(B) successful — 형용사인데, 뒤의 implemented(분사)를 꾸미려면 부사여야 한다.\n(C) successfully — 부사 '성공적으로'. 동사구를 수식해 정답.\n(D) succeed — 동사원형이라 이미 동사(implemented)가 있는 자리에 들어갈 수 없다.",
          "translation": "개정된 안전 수칙은 지난달 모든 물류센터에 성공적으로 도입되었다."
        },
        {
          "prompt": "The logistics team ______ tested the delivery tracking software to eliminate scheduling delays.",
          "choices": ["repeat", "repeated", "repeatedly", "repetition"],
          "answerIndex": 2,
          "explanation": "주어와 진짜 동사 tested 사이에서 동사를 수식하는 부사 자리다.\n(A) repeat — 동사원형이라 이미 tested가 있어 동사 자리에 못 온다.\n(B) repeated — 과거동사/과거분사라 tested와 동사가 겹친다.\n(C) repeatedly — 부사 '반복적으로'. 동사 tested를 수식해 정답.\n(D) repetition — 명사라 주어와 동사 사이의 수식 자리에 부적합하다.",
          "translation": "물류팀은 일정 지연을 없애기 위해 배송 추적 소프트웨어를 반복적으로 테스트했다."
        },
        {
          "prompt": "Ms. Aldridge ______ submitted the quarterly budget report before the finance committee's deadline.",
          "choices": ["prompt", "promptly", "promptness", "prompted"],
          "answerIndex": 1,
          "explanation": "주어와 과거 동사 submitted 사이에서 동사를 수식하는 부사 자리다.\n(A) prompt — 형용사/명사라 동사 submitted를 수식하지 못한다.\n(B) promptly — 부사 '신속하게'. 동사를 수식해 정답.\n(C) promptness — 명사라 수식 자리에 못 온다.\n(D) prompted — 과거동사/과거분사라 submitted와 동사가 중복된다.",
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
          "explanation": "주어의 핵은 단수 cabinet(for ~ files는 수식어), 시제는 last week로 과거, 뒤에 목적어 없이 relocated(p.p.)라 수동태다.\n(A) was — 단수+과거+수동(was relocated)을 모두 충족해 정답.\n(B) were — 복수 동사라 단수 주어 cabinet과 수 일치가 안 된다.\n(C) is — 현재라 last week(과거)와 시제가 맞지 않는다.\n(D) has — 'has relocated'는 능동 현재완료라, 목적어 없는 수동 맥락·과거 시점 모두와 어긋난다.",
          "translation": "보관된 인사 파일용 중앙 수납장은 지난주 2층으로 옮겨졌다."
        },
        {
          "prompt": "The account managers at Brightway Consulting ______ several revised proposals to the client yesterday.",
          "choices": ["uploading", "submitted", "will submit", "submits"],
          "answerIndex": 1,
          "explanation": "빈칸은 진짜 동사 자리. 준동사를 먼저 소거하고 시제 힌트 yesterday로 과거를 고른다.\n(A) uploading — 준동사(-ing)라 동사 자리에 올 수 없다(0순위 소거).\n(B) submitted — 과거동사. yesterday와 일치해 정답.\n(C) will submit — 미래라 yesterday(과거)와 모순된다.\n(D) submits — 현재단수라 과거 시점과 안 맞고 복수 주어(managers)와도 어긋난다.",
          "translation": "브라이트웨이 컨설팅의 고객 담당자들은 어제 여러 수정 제안서를 고객에게 제출했다."
        },
        {
          "prompt": "All billing discrepancies on the new payment platform ______ by the finance team during the audit.",
          "choices": ["resolve", "resolving", "were resolved", "has resolved"],
          "answerIndex": 2,
          "explanation": "준동사를 소거한 뒤, 빈칸 뒤에 목적어 없이 by the finance team이 붙으므로 수동태이고 복수 주어에 맞춰야 한다.\n(A) resolve — 능동 동사원형이라, 목적어 없이 행위자 by만 있는 수동 맥락과 안 맞는다.\n(B) resolving — 준동사라 동사 자리에 올 수 없다(즉시 소거).\n(C) were resolved — 복수 수동태. 주어 discrepancies·by절과 부합해 정답.\n(D) has resolved — 능동 현재완료인 데다 단수라 복수 주어·수동 맥락 모두 어긋난다.",
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
          "explanation": "관사 an과 형용사 experienced의 수식을 받는 명사 자리이자, hire(고용)의 대상이므로 '사람'이어야 한다.\n(A) analyze — 동사라 명사 자리에 못 온다.\n(B) analyst — 사람 명사 '분석가'. 채용 대상으로 정답.\n(C) analysis — '분석'이라는 사물/개념 명사라 hire(사람 고용)의 대상과 맞지 않는다.\n(D) analytical — 형용사라 '관사+형용사' 뒤의 명사 자리를 채우지 못한다.",
          "translation": "브라이트웨이 컨설팅은 새 지역 사무소의 배치를 설계할 경험 많은 분석가를 채용하려 한다."
        },
        {
          "prompt": "The newly appointed operations director presented ______ comprehensive report on warehouse efficiency.",
          "choices": ["he", "him", "his", "himself"],
          "answerIndex": 2,
          "explanation": "명사구 comprehensive report 바로 앞의 한정 자리라 소유격이 필요하다.\n(A) he — 주격이라 명사 앞 한정 자리에 못 온다.\n(B) him — 목적격이라 명사를 소유·한정하지 못한다.\n(C) his — 소유격 '그의'. report를 한정해 정답.\n(D) himself — 재귀대명사라 명사 앞 수식 자리에 부적합하다.",
          "translation": "새로 임명된 운영 이사는 창고 효율성에 관한 자신의 종합 보고서를 제출했다."
        },
        {
          "prompt": "Employees at the downtown branch must submit ______ expense reports to the accounting office by Friday.",
          "choices": ["they", "them", "their", "themselves"],
          "answerIndex": 2,
          "explanation": "명사구 expense reports 앞의 소유격 자리이며, 복수 주어 Employees를 한정한다.\n(A) they — 주격이라 명사 앞 소유 자리에 못 온다.\n(B) them — 목적격이라 명사를 한정하지 못한다.\n(C) their — 소유격 '그들의'. 복수 주어와 호응해 정답.\n(D) themselves — 재귀대명사라 명사 앞 한정 자리에 올 수 없다.",
          "translation": "시내 지점 직원들은 금요일까지 자신의 경비 보고서를 회계 부서에 제출해야 한다."
        }
      ]
    }
  ]
}
```
