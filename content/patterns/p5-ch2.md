# Part 5 패턴학습 · CHAPTER 2 — 준동사 (패턴 06~10)

```json
{
  "chapter": 2,
  "chapterTitle": "준동사 I",
  "patterns": [
    {
      "id": "p5-pat-06",
      "no": 6,
      "title": "명사를 수식하는 분사의 능동·수동",
      "category": "준동사",
      "formula": "명사 뒤에서 그 명사를 수식하는 분사(Participle)의 형태를 정하는 문제.\n\n· **현재분사 V-ing** = 능동·진행\n· **과거분사 V-ed(p.p.)** = 수동·완료\n\n· `[ 명사 + V-ing + 목적어(명사구) ]`\n· `[ 명사 + V-ed + (전치사구/부사) ]`",
      "tip": "명사 뒤 분사 자리 뒤에 **목적어(명사)가 살아 있으면 능동 -ing**, 목적어 없이 **전치사구·부사·마침표로 끝나면 수동 -ed**.",
      "questions": [
        {
          "prompt": "The consulting firm ______ the merchandising strategy for Hillcrest Retail reported strong quarterly gains.",
          "choices": ["manage", "management", "managing", "managed"],
          "answerIndex": 2,
          "explanation": "주어 firm을 뒤에서 꾸미는 분사 자리다(진짜 동사는 뒤의 reported). 빈칸 뒤에 목적어 the merchandising strategy가 살아 있으므로 능동이 필요하다.\n(A) manage — 동사원형/현재복수라 이미 본동사 reported가 있어 수식 자리에 못 온다.\n(B) management — 명사라 firm 뒤에서 목적어를 거느리며 수식하지 못한다.\n(C) managing — 현재분사(능동). 뒤 목적어를 지배하며 firm을 수식해 정답.\n(D) managed — 과거분사(수동)라 뒤에 목적어가 남은 구조와 맞지 않는다.",
          "translation": "힐크레스트 리테일의 상품화 전략을 관리하는 그 컨설팅 회사는 분기별로 큰 수익을 보고했다."
        },
        {
          "prompt": "The proposal ______ to the regional planning committee received outstanding evaluations.",
          "choices": ["submit", "submitting", "submitted", "submission"],
          "answerIndex": 2,
          "explanation": "주어 proposal과 진짜 동사 received 사이의 수식 분사 자리다. 뒤에 목적어 없이 전치사구 to the committee만 붙고, 제안서는 '제출되는' 대상이라 수동이 필요하다.\n(A) submit — 동사원형이라 본동사 received가 이미 있어 수식 자리에 못 온다.\n(B) submitting — 현재분사(능동)인데 뒤에 목적어가 없어 능동으로 볼 수 없다.\n(C) submitted — 과거분사(수동) '제출된'. 정답.\n(D) submission — 명사라 명사 proposal 뒤의 수식 분사 자리에 부적합하다.",
          "translation": "지역 기획 위원회에 제출된 그 제안서는 우수한 평가를 받았다."
        },
        {
          "prompt": "Companies ______ the new accounting software require additional staff training.",
          "choices": ["utilize", "utilizing", "utilized", "utilization"],
          "answerIndex": 1,
          "explanation": "주어 Companies를 뒤에서 꾸미는 자리다(진짜 동사는 require). 빈칸 뒤에 목적어 the new accounting software가 있으므로 능동이 필요하다.\n(A) utilize — 동사원형/현재복수라 본동사 require와 동사가 겹친다.\n(B) utilizing — 현재분사(능동). 목적어를 지배해 정답.\n(C) utilized — 과거분사(수동)라 뒤에 목적어가 남은 구조와 맞지 않는다.\n(D) utilization — 명사라 수식 분사 자리에 못 온다.",
          "translation": "새 회계 소프트웨어를 사용하는 회사들은 추가 직원 교육이 필요하다."
        }
      ]
    },
    {
      "id": "p5-pat-07",
      "no": 7,
      "title": "to부정사를 목적어로 취하는 동사",
      "category": "준동사",
      "formula": "특정 타동사는 목적어로 **to부정사(to + V)**만 취합니다. 주로 미래지향적 의지·동의·실패.\n\n· `decide to do` (결정하다)\n· `agree to do` (동의하다)\n· `fail to do` (~하지 못하다)\n· `refuse to do` (거부하다)\n· `plan / intend to do` (계획/의도하다)",
      "tip": "빈칸 앞에 decide·agree·fail·intend·plan 등이 있으면, 보기의 -ing·명사를 제치고 무조건 **to + 동사원형**.",
      "questions": [
        {
          "prompt": "Management at Brightway Consulting decided ______ the security procedures to prevent data loss.",
          "choices": ["update", "to update", "updating", "updated"],
          "answerIndex": 1,
          "explanation": "타동사 decided는 목적어로 to부정사를 취한다(decide to do).\n(A) update — 동사원형이라 decided의 목적어가 될 수 없다.\n(B) to update — to부정사. decide의 목적어로 정답.\n(C) updating — 동명사인데 decide는 동명사를 목적어로 취하지 않는다(대표 함정).\n(D) updated — 과거형/분사라 목적어 자리에 부적합하다.",
          "translation": "브라이트웨이 컨설팅 경영진은 데이터 손실을 막기 위해 보안 절차를 업데이트하기로 결정했다."
        },
        {
          "prompt": "Delivery teams must not fail ______ the shipment logs before dispatching each order.",
          "choices": ["verify", "to verify", "verifying", "verification"],
          "answerIndex": 1,
          "explanation": "fail은 대상을 취할 때 to부정사와 결합한다(fail to do).\n(A) verify — 동사원형이라 fail 뒤의 목적어가 못 된다.\n(B) to verify — fail to do. 정답.\n(C) verifying — fail은 동명사를 취하지 않는다.\n(D) verification — 명사라 뒤 목적어 the shipment logs를 지배하지 못한다.",
          "translation": "배송팀은 각 주문을 발송하기 전에 반드시 배송 기록을 확인해야 한다."
        },
        {
          "prompt": "Northgate Manufacturing intends ______ its packaging line before the holiday season.",
          "choices": ["enhance", "to enhance", "enhancing", "enhancement"],
          "answerIndex": 1,
          "explanation": "intend는 미래지향적 의도를 나타내며 to부정사와 짝을 이룬다(intend to do).\n(A) enhance — 동사원형이라 intends 뒤의 목적어가 될 수 없다.\n(B) to enhance — intend to do. 정답.\n(C) enhancing — intend는 동명사를 목적어로 취하지 않는다.\n(D) enhancement — 명사라 뒤 목적어 its packaging line을 지배하지 못한다.",
          "translation": "노스게이트 제조사는 연휴 시즌 전에 자사 포장 라인을 개선할 계획이다."
        }
      ]
    },
    {
      "id": "p5-pat-08",
      "no": 8,
      "title": "동명사를 목적어로 취하는 동사",
      "category": "준동사",
      "formula": "패턴 07과 반대로, 목적어로 **동명사(V-ing)**만 취하는 동사들. 회피·중단·연기·제안의 성격.\n\n· `recommend / suggest -ing` (추천/제안)\n· `avoid -ing` (피하다)\n· `postpone / delay -ing` (연기하다)\n· `consider -ing` (고려하다)\n· `discontinue / stop -ing` (중단하다)",
      "tip": "빈칸 앞에 avoid·recommend·postpone·consider 등이 있으면, 함정인 to부정사를 버리고 **-ing 동명사**를 고른다.",
      "questions": [
        {
          "prompt": "Senior consultants strongly recommend ______ the workflow to remove unnecessary delays.",
          "choices": ["to streamline", "streamlining", "streamline", "streamlined"],
          "answerIndex": 1,
          "explanation": "recommend는 목적어로 동명사를 취한다.\n(A) to streamline — recommend는 to부정사를 목적어로 취하지 않는다(대표 함정).\n(B) streamlining — 동명사. recommend의 목적어로 정답.\n(C) streamline — 동사원형이라 목적어가 될 수 없다.\n(D) streamlined — 과거형/분사라 목적어 자리에 부적합하다.",
          "translation": "선임 컨설턴트들은 불필요한 지연을 없애기 위해 업무 흐름을 간소화할 것을 강력히 권장한다."
        },
        {
          "prompt": "To avoid ______ any scheduling conflicts, staff must confirm all bookings a day in advance.",
          "choices": ["to cause", "causing", "cause", "causation"],
          "answerIndex": 1,
          "explanation": "avoid는 목적어로 동명사를 취한다.\n(A) to cause — avoid는 to부정사와 결합하지 않는다.\n(B) causing — 동명사. avoid의 목적어로 정답.\n(C) cause — 동사원형이라 avoid의 목적어가 못 된다.\n(D) causation — 명사라 뒤 목적어 any scheduling conflicts를 지배하지 못한다.",
          "translation": "일정 충돌을 피하기 위해, 직원들은 모든 예약을 하루 전에 확정해야 한다."
        },
        {
          "prompt": "The board decided to postpone ______ the new downtown branch until the market survey is complete.",
          "choices": ["opening", "to open", "open", "openable"],
          "answerIndex": 0,
          "explanation": "postpone(연기하다)은 목적어로 동명사와 결합한다.\n(A) opening — 동명사. postpone의 목적어로 정답.\n(B) to open — postpone은 to부정사를 목적어로 취하지 않는다.\n(C) open — 동사원형/형용사라 목적어가 될 수 없다.\n(D) openable — 형용사라 목적어 자리에 부적합하다.",
          "translation": "이사회는 시장 조사가 완료될 때까지 새 시내 지점 개점을 연기하기로 결정했다."
        }
      ]
    },
    {
      "id": "p5-pat-09",
      "no": 9,
      "title": "목적격 보어로 to부정사를 취하는 5형식 동사",
      "category": "준동사",
      "formula": "`[ 주어 + 동사 + 목적어 + 목적격보어 ]` 5형식에서, 목적격 보어에 **to부정사**를 강제하는 동사들.\n\n· `allow / permit + 목적어 + to do`\n· `require / ask / request + 목적어 + to do`\n· `encourage + 목적어 + to do`\n· `enable + 목적어 + to do`\n· `advise + 목적어 + to do`",
      "tip": "수동태 `be required/encouraged/allowed + to do`도 목적격 보어가 남은 형태. 이 동사들이 보이면 빈칸은 무조건 **to부정사**.",
      "questions": [
        {
          "prompt": "The new scheduling system will enable branch managers ______ staff shifts in real time.",
          "choices": ["adjust", "to adjust", "adjusting", "adjustment"],
          "answerIndex": 1,
          "explanation": "enable + 목적어(branch managers) + 목적격 보어(to부정사) 구조다.\n(A) adjust — 동사원형이라 목적격 보어 자리에 to 없이 올 수 없다.\n(B) to adjust — enable의 목적격 보어로 정답.\n(C) adjusting — enable은 목적격 보어로 to부정사를 요구하므로 -ing는 불가하다.\n(D) adjustment — 명사라 뒤 목적어 staff shifts를 지배하지 못한다.",
          "translation": "새 일정 관리 시스템은 지점 관리자들이 실시간으로 근무조를 조정할 수 있게 해 줄 것이다."
        },
        {
          "prompt": "Employees are strictly required ______ their identification badges before entering the facility.",
          "choices": ["present", "to present", "presenting", "presented"],
          "answerIndex": 1,
          "explanation": "require + 목적어 + to do의 수동태(be required to do)다. 목적어가 주어로 나가고 목적격 보어인 to부정사가 남았다.\n(A) present — 동사원형이라 be required 뒤에 바로 올 수 없다.\n(B) to present — 남은 목적격 보어 to부정사. 정답.\n(C) presenting — require 수동태 뒤에 -ing 형태는 오지 않는다.\n(D) presented — 과거분사라 여기서는 목적격 보어 to부정사 자리와 맞지 않는다.",
          "translation": "직원들은 시설에 들어가기 전에 반드시 신분증을 제시해야 한다."
        },
        {
          "prompt": "The training coordinator encouraged the sales team ______ their client presentations.",
          "choices": ["revise", "to revise", "revising", "revision"],
          "answerIndex": 1,
          "explanation": "encourage + 목적어(the sales team) + to부정사 구조다.\n(A) revise — 동사원형이라 목적격 보어 자리에 to 없이 올 수 없다.\n(B) to revise — encourage의 목적격 보어로 정답.\n(C) revising — encourage는 목적격 보어로 to부정사를 요구한다(-ing 불가).\n(D) revision — 명사라 뒤 목적어 their client presentations를 지배하지 못한다.",
          "translation": "교육 담당자는 영업팀이 고객 발표 자료를 수정하도록 독려했다."
        }
      ]
    },
    {
      "id": "p5-pat-10",
      "no": 10,
      "title": "완전한 문장에 붙는 to부정사의 부사적 용법",
      "category": "준동사",
      "formula": "문장이 이미 완전할 때, 그 앞뒤에 '~하기 위해서'라는 목적을 더하는 **to부정사의 부사적 용법**.\n\n· `[ To + V + 목적어 ], [ 주어 + 동사 ]`\n· `[ 주어 + 동사 + 목적어 ] + [ to + V ]`\n· 강조형: `in order to + V` · `so as to + V`",
      "tip": "콤마 앞이나 완전한 문장 뒤 빈칸이 '~하기 위하여'로 풀리고 보기에 to부정사가 있으면 그것이 정답. 동사원형·명사·단순 시제 동사는 문장의 완전성을 깬다.",
      "questions": [
        {
          "prompt": "______ compliance with the new safety guidelines, Northgate Manufacturing inspects its equipment every week.",
          "choices": ["Ensure", "To ensure", "Ensuring", "Ensured"],
          "answerIndex": 1,
          "explanation": "콤마 뒤에 완전한 절이 있으므로 앞자리는 목적을 나타내는 수식어 거품이다. '준수를 보장하기 위해'가 자연스럽다.\n(A) Ensure — 명령문 동사원형이라 뒤에 콤마+또 다른 완전한 절이 이어질 수 없다.\n(B) To ensure — 목적의 to부정사. 정답.\n(C) Ensuring — 분사구문 형태이나, '~하기 위해'라는 목적을 명확히 나타내는 데는 to부정사가 정답으로 우선한다.\n(D) Ensured — 과거분사라 능동으로 목적어 compliance를 지배하지 못한다.",
          "translation": "새 안전 지침의 준수를 보장하기 위해, 노스게이트 제조사는 매주 장비를 점검한다."
        },
        {
          "prompt": "The records staff relocated all files to the central archive ______ storage costs across the department.",
          "choices": ["reduce", "to reduce", "reduction", "reduced"],
          "answerIndex": 1,
          "explanation": "앞에 완전한 문장이 끝났고 뒷자리는 목적의 수식어 거품이다. '보관 비용을 줄이기 위해'가 자연스럽다.\n(A) reduce — 동사원형이라 이미 본동사 relocated가 있어 들어갈 수 없다.\n(B) to reduce — 목적의 to부정사. 정답.\n(C) reduction — 명사라 뒤 목적어 storage costs를 지배하지 못한다.\n(D) reduced — 과거형/분사라 '~하기 위해'라는 목적 의미를 만들지 못한다.",
          "translation": "기록 관리 직원들은 부서 전반의 보관 비용을 줄이기 위해 모든 파일을 중앙 자료실로 옮겼다."
        },
        {
          "prompt": "Mr. Halloran revised the training manual in order ______ onboarding time for new hires.",
          "choices": ["shorten", "to shorten", "shortening", "shortened"],
          "answerIndex": 1,
          "explanation": "in order to + 동사원형은 하나의 관용적 목적 표현이다.\n(A) shorten — in order 뒤에는 반드시 to가 와야 한다.\n(B) to shorten — in order to do. 정답.\n(C) shortening — in order 뒤에 -ing는 올 수 없다.\n(D) shortened — 과거형이라 in order to 관용구를 깬다.",
          "translation": "핼러런 씨는 신입 직원의 적응 기간을 단축하기 위해 교육 매뉴얼을 개정했다."
        }
      ]
    }
  ]
}
```
