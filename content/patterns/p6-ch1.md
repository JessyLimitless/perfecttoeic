# Part 6 패턴학습 · CHAPTER 1 — 이메일/서신: 비즈니스 소통 (패턴 01~05)

```json
{
  "part": 6,
  "chapter": 1,
  "chapterTitle": "이메일/서신: 비즈니스 소통",
  "patterns": [
    {
      "id": "p6-pat-01",
      "no": 1,
      "title": "주문 및 배송 지연 안내",
      "category": "이메일",
      "contextMap": "이메일 첫머리에 주문 감사·주문 번호가 보이면 흐름을 예측하세요.\n· **[도입]** 주문이 잘 접수되었습니다\n· **[갈등]** 재고 부족·물류 차질 발생\n· **[정답 구역·시제]** 배송이 지연될 것(미래)·지연되어 옴(현재완료) 저격\n· **[문장 삽입]** 불편을 사과하며 배송비 면제·사은품 등 보상 제안",
      "passage": "To: Jonathan Vance <j.vance@mail.com>\nFrom: Customer Support <support@apex-electronics.co.kr>\nDate: July 11, 2026\nSubject: Update regarding Order #88201\n\nDear Mr. Vance,\n\nThank you for your recent purchase of the Apex Pro Soundbar from our online store. We appreciate your business and are eager to get your new audio system to you.\n\nHowever, we regret to inform you that due to an unprecedented surge in demand, the item you selected is currently out of stock. As a result, the processing of your shipment (1) __________.\n\nOur logistics team is working tirelessly to replenish our inventory. We expect a new batch of soundbars to arrive at our warehouse by next Tuesday, and your order will be prioritized immediately. (2) __________.\n\nWe sincerely apologize for this (3) __________ inconvenience. To demonstrate our commitment to your satisfaction, we have automatically waived the standard shipping fee for your order. Additionally, a 15% discount voucher for your next purchase (4) __________ to your account.\n\nWarm regards,\nElena Rostova\nCustomer Support Manager, Apex Electronics",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["delays", "has been delayed", "to delay", "will delay"],
          "answerIndex": 1,
          "explanation": "빈칸 뒤에 목적어 없이 마침표로 끝나므로 수동태가 필요하고, 재고 부족으로 '지금까지 지연되어 온' 상태라 현재완료가 어울린다.\n(A) delays — 능동 현재라 목적어가 없는 자리·'지연되는 대상'인 shipment 처리와 태가 맞지 않는다.\n(B) has been delayed — 현재완료 수동. '처리가 지연되어 왔다'로 정답.\n(C) to delay — 준동사라 문장의 본동사 자리에 올 수 없다.\n(D) will delay — 능동 미래라 목적어가 필요하고 '지연시키다'가 되어 태가 어긋난다.",
          "translation": "그 결과, 귀하의 배송 처리가 지연되어 왔습니다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "Your account has been suspended due to inactivity.",
            "This item is eligible for a full refund within thirty days.",
            "We anticipate that your package will ship out by next Thursday.",
            "Thank you for submitting your product review on our website."
          ],
          "answerIndex": 2,
          "explanation": "앞 문장에서 '화요일 재고 입고 후 주문을 즉시 우선 처리한다'고 했으므로, 구체적 발송 일정 안내가 자연스럽다.\n(A) 계정이 정지되었습니다 — 주문 처리 흐름과 무관하고 부정적이라 사과·보상 톤과 충돌한다.\n(B) 30일 내 전액 환불 대상입니다 — 지연 안내이지 환불 맥락이 아니라 어긋난다.\n(C) 목요일쯤 발송 예상 — 우선 처리 약속에 이어지는 구체 일정이라 정답.\n(D) 후기 작성에 감사드립니다 — 아직 배송 전이라 후기 감사 맥락이 성립하지 않는다.",
          "translation": "귀하의 물품이 다음 주 목요일까지 발송될 것으로 예상합니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["temporary", "initial", "deliberate", "redundant"],
          "answerIndex": 0,
          "explanation": "재고가 채워지면 해결될 불편이므로 '일시적인'이 알맞다.\n(A) temporary — '일시적인'. 곧 해결될 지연 불편에 맞아 정답.\n(B) initial — '초기의'라 이번 지연의 성격(일시성)을 정확히 담지 못한다.\n(C) deliberate — '의도적인'이라 사과 문맥과 정면으로 충돌한다.\n(D) redundant — '불필요한/중복된'이라 inconvenience 수식으로 의미가 어색하다.",
          "translation": "이 일시적인 불편에 대해 진심으로 사과드립니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["has credited", "is crediting", "will be credited", "credits"],
          "answerIndex": 2,
          "explanation": "쿠폰(voucher)은 스스로 적립하는 주체가 아니라 시스템에 의해 '적립되는' 대상(수동)이고, 앞으로 있을 보상(미래)이다.\n(A) has credited — 능동 현재완료라 voucher가 스스로 적립하는 주체가 되어 태가 어긋난다.\n(B) is crediting — 능동 진행이라 마찬가지로 태가 맞지 않는다.\n(C) will be credited — 미래 수동. '적립될 것'으로 정답.\n(D) credits — 능동 현재라 태·시제 모두 맞지 않는다.",
          "translation": "또한 다음 구매에 쓰실 15% 할인 쿠폰이 귀하의 계정에 적립될 것입니다."
        }
      ]
    },
    {
      "id": "p6-pat-02",
      "no": 2,
      "title": "계약 및 협력 제안",
      "category": "이메일",
      "contextMap": "발신자가 타사 임원, 수신자가 특정 분야 전문가·유망 기업이라면 협력 제안입니다.\n· **[도입·칭찬]** 귀하의 최근 성과를 인상 깊게 보았습니다\n· **[제안]** 새 프로젝트에 귀하와 협력하고 싶습니다\n· **[정답 구역·어휘]** 귀하의 전문성이 '귀중한 자산'이 될 것 — 가치·기여 격식 어휘 저격\n· **[행동 유도]** 미팅·제안서 검토를 정중히 요청 — 조동사 공손 구문 저격",
      "passage": "To: Hana Tanaka <h.tanaka@tanaka-consulting.com>\nFrom: Marcus Vance <m.vance@socialbrain.ai>\nDate: July 12, 2026\nSubject: Partnership Proposal\n\nDear Ms. Tanaka,\n\nI am writing on behalf of Social Brain AI to express our deep admiration for your firm's recent keynote address at the Pan-Asian Tech Summit. Your insights into integrating legal logic with automation systems were truly (1) __________.\n\nAs a leading developer of large language models for specialized industries, Social Brain AI is currently expanding its operations into B2G consulting. Given your ten years of professional expertise in public sector IT projects, we believe your guidance would be a (2) __________ asset to our upcoming venture.\n\n(3) __________. Specifically, we would love to explore a joint bidding opportunity for the municipal data framework project opening next month.\n\nWe (4) __________ it if you could spare 15 minutes for a brief introductory video call sometime next week to discuss this potential synergy.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["illuminated", "illuminating", "illuminate", "illumination"],
          "answerIndex": 1,
          "explanation": "were truly [형용사/분사] 보어 자리이며, 통찰(insights)이 이해를 '주는' 능동 의미라 현재분사가 맞다.\n(A) illuminated — 과거분사(수동)라 '이해를 받은'이 되어, insights가 주는 주체라는 의미와 어긋난다.\n(B) illuminating — 현재분사(능동) '명쾌한, 이해를 돕는'. 정답.\n(C) illuminate — 동사원형이라 be동사 뒤 보어 자리에 올 수 없다.\n(D) illumination — 명사라 '통찰=조명'이 되어 보어 의미가 어색하다.",
          "translation": "법률 논리와 자동화 시스템을 통합하는 것에 대한 귀하의 통찰은 정말로 명쾌했습니다."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["nominal", "volatile", "invaluable", "precarious"],
          "answerIndex": 2,
          "explanation": "파트너십 제안은 상대의 가치를 극찬하므로 '매우 귀중한'이 알맞다.\n(A) nominal — '명목상의'라 극찬 맥락과 반대다.\n(B) volatile — '변덕스러운'이라 자산을 부정적으로 만들어 부적합하다.\n(C) invaluable — '매우 귀중한'. 정답.\n(D) precarious — '위태로운'이라 협력 제안의 칭찬 톤과 충돌한다.",
          "translation": "귀하의 10년 전문성을 고려할 때, 귀하의 조언은 저희의 새 사업에 매우 귀중한 자산이 될 것입니다."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "We have decided to downsize our regional consulting division.",
            "Therefore, we are formally requesting a refund for the summit tickets.",
            "We are eager to collaborate with your team on custom document generation.",
            "Our technicians have successfully resolved the software glitch."
          ],
          "answerIndex": 2,
          "explanation": "앞에서 협력의 필요성을 제시했고 뒤에서 '구체적으로 공동 입찰 기회를 모색하고 싶다'고 이어진다.\n(A) 지역 컨설팅 부문을 축소하기로 했습니다 — 협력 확대 제안과 정반대라 어긋난다.\n(B) 서밋 티켓 환불을 요청합니다 — 제안 맥락과 무관하다.\n(C) 귀 팀과 맞춤 문서 생성에 협력하기를 열망합니다 — 뒤의 구체 제안으로 자연스럽게 이어져 정답.\n(D) 기술진이 소프트웨어 결함을 해결했습니다 — 제안서 흐름과 무관하다.",
          "translation": "저희는 귀 팀과 맞춤 문서 생성 분야에서 협력하기를 간절히 바랍니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["will appreciate", "would appreciate", "appreciated", "are appreciating"],
          "answerIndex": 1,
          "explanation": "'would appreciate it if you could + 동사원형'은 정중한 요청의 고정 표현(가정법 공손)이다.\n(A) will appreciate — 단순 미래라 if you could 가정법 공손 구문과 호응이 약하다.\n(B) would appreciate — would appreciate it if ~ could. 정답.\n(C) appreciated — 과거라 요청 시점(현재/미래)과 맞지 않는다.\n(D) are appreciating — 진행형이라 상태동사 appreciate의 용법·공손 구문과 맞지 않는다.",
          "translation": "다음 주 중 15분만 짧은 소개용 화상 통화에 내주실 수 있다면 감사하겠습니다."
        }
      ]
    },
    {
      "id": "p6-pat-03",
      "no": 3,
      "title": "고객 불만(Claim) 및 대응",
      "category": "이메일",
      "contextMap": "발신이 고객 서비스 팀이고 첫 줄부터 사과가 나오면 불만 대응 이메일입니다.\n· **[인정]** 겪으신 불편(배송 오류·청구 오류)을 접수했습니다\n· **[사과]** 저희 실수이며 진심으로 사과드립니다\n· **[정답 구역·해결]** 전액 환불·다음 청구서 차감 — 태(자/타동사) 공식 저격\n· **[재발 방지]** 시스템 점검·업데이트 완료 — 문장 삽입·확약 어휘 저격",
      "passage": "Dear Ms. Sterling,\n\nThank you for contacting the Muze Services Group regarding the billing error on your June statement. We understand your frustration upon discovering that you were charged twice for your monthly software subscription.\n\nAfter reviewing our transaction logs, we confirmed that a technical glitch in our system (1) __________ the duplicate payment.\n\nPlease accept our sincerest apologies for this oversight. We pride ourselves on providing reliable digital solutions, and it is clear we failed to meet our own high standards in this instance.\n\nTo rectify this situation, the erroneous charge of $45.00 has already been reversed. A full credit (2) __________ to your registered credit card within three business days, depending on your bank's processing times.\n\n(3) __________. Furthermore, as a gesture of goodwill, we have extended your premium access for an additional month at no extra cost.\n\nOur technical team has already applied a permanent patch to the billing software to ensure that this specific error (4) __________. We deeply value your continued partnership.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["caused", "to cause", "was caused", "causing"],
          "answerIndex": 0,
          "explanation": "`a technical glitch(주어) + [동사] + the duplicate payment(목적어)` 구조라, 뒤에 목적어가 있으므로 능동이고 이미 확인된 과거 사실이다.\n(A) caused — 능동 과거. 목적어를 취해 정답.\n(B) to cause — 준동사라 본동사 자리에 올 수 없다.\n(C) was caused — 수동이라 뒤의 목적어 the duplicate payment와 충돌한다.\n(D) causing — 분사라 본동사 자리에 올 수 없다.",
          "translation": "거래 기록을 검토한 후, 시스템의 기술적 결함이 이 중복 결제를 일으켰음을 확인했습니다."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["is appearing", "will appear", "appeared", "appears"],
          "answerIndex": 1,
          "explanation": "뒤의 시간 단서 within three business days(3영업일 이내)는 미래이며, appear는 자동사라 수동태 함정에 넘어가지 말아야 한다.\n(A) is appearing — 현재진행이라 미래 시점 단서와 맞지 않는다.\n(B) will appear — 미래. '3영업일 내 나타날 것'으로 정답.\n(C) appeared — 과거라 앞으로의 일과 시제가 어긋난다.\n(D) appears — 현재라 within three business days(미래)와 맞지 않는다.",
          "translation": "전액 환불금이 3영업일 이내에 귀하의 등록 카드에 나타날 것입니다."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "We have successfully updated our security protocols to prevent future glitches.",
            "Please return the defective product to our nearest service center.",
            "Consequently, your subscription has been canceled effective immediately.",
            "Several customers have expressed interest in upgrading their current plans."
          ],
          "answerIndex": 0,
          "explanation": "앞은 사과·환불 조치, 뒤는 '게다가 1개월 무료 연장'이라는 추가 보상이라, 그 사이엔 재발 방지 약속이 자연스럽다.\n(A) 향후 결함 방지를 위해 보안 프로토콜을 성공적으로 업데이트했습니다 — 재발 방지 약속으로 흐름에 맞아 정답.\n(B) 불량품을 가까운 서비스 센터로 반품하세요 — 청구 오류(디지털 구독) 맥락에 물건 반품은 무관하다.\n(C) 따라서 구독이 즉시 해지되었습니다 — 사과·관계 유지 의도와 정반대라 어긋난다.\n(D) 여러 고객이 요금제 업그레이드에 관심을 보였습니다 — 개인 사과 이메일 흐름과 무관하다.",
          "translation": "저희는 향후 결함을 막기 위해 보안 프로토콜을 성공적으로 업데이트했습니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["repeats", "is repeating", "does not recur", "has recurred"],
          "answerIndex": 2,
          "explanation": "패치를 적용한 목적은 이 오류가 '재발하지 않도록' 하기 위함이며, recur는 자동사다.\n(A) repeats — 능동 현재라 '오류가 반복한다'가 되어 방지 목적과 반대 의미다.\n(B) is repeating — 진행형이라 방지 목적·문맥과 맞지 않는다.\n(C) does not recur — '재발하지 않는다'. 방지 목적에 맞아 정답.\n(D) has recurred — 현재완료라 '이미 재발했다'가 되어 방지 취지와 정반대다.",
          "translation": "저희 기술팀은 이 특정 오류가 재발하지 않도록 청구 소프트웨어에 영구 패치를 적용했습니다."
        }
      ]
    },
    {
      "id": "p6-pat-04",
      "no": 4,
      "title": "서비스·제품 문의 답변",
      "category": "이메일",
      "contextMap": "상대가 제품·단가를 문의했고 영업/마케팅 팀이 답장하는 상황입니다.\n· **[감사]** 문의해 주셔서 감사합니다\n· **[정보 제공]** 상세 스펙·가격표를 첨부/동봉 — 보어 도치·분사 패턴 저격\n· **[정답 구역·혜택]** 이달 말까지 계약 시 추가 할인 — 조건절·한정사 저격\n· **[행동 유도]** 언제든 담당자에게 연락 — 문장 삽입·관용구 저격",
      "passage": "To: Robert Chen <r.chen@chen-logistics.com>\nFrom: Sales Department <sales@muze-ai.com>\nDate: July 13, 2026\nSubject: Inquiry regarding Customized Document Generation Systems\n\nDear Mr. Chen,\n\nThank you for contacting Muze AI regarding our corporate automation services. We were pleased to receive your inquiry about how our technology can streamline your logistics documentation process.\n\n(1) __________ is our comprehensive digital brochure, which outlines the full specifications of our AI-driven software, along with a customized pricing index tailored to your company's projected volume.\n\nOur platform is highly customizable, meaning we can adjust the variables to fit your existing workflow seamlessly. We believe this system will reduce your administrative turnaround times by (2) __________ forty percent.\n\n(3) __________. Should you choose to proceed with a trial installation before the end of this month, our technical team will handle the entire setup at no extra cost.\n\nIf you have any further questions or would like to schedule a live demonstration with one of our senior engineers, please do not (4) __________ to reach out to us.\n\nSincerely,\nJi-min Park\nHead of Corporate Sales, Muze AI",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["Attached", "Attachment", "Attaching", "Attach"],
          "answerIndex": 0,
          "explanation": "`[Attached/Enclosed] + be동사 + 진짜 주어`의 보어 도치 구조이며, 뒤에 is + brochure가 온다.\n(A) Attached — 주격 보어 분사형용사. 도치 구조로 정답.\n(B) Attachment — 명사라 '첨부물 is brochure'로 두 명사가 충돌한다.\n(C) Attaching — 현재분사(능동)라 '첨부하는 것'이 되어 '첨부된' 수동 상태 의미와 어긋난다.\n(D) Attach — 동사원형이라 문두 도치 보어 자리에 올 수 없다.",
          "translation": "첨부된 것은 저희의 종합 디지털 브로슈어입니다."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["standard", "approximate", "approximately", "approximation"],
          "answerIndex": 2,
          "explanation": "뒤에 숫자 forty percent가 있으므로 수량을 수식하는 부사 자리다.\n(A) standard — 형용사/명사라 숫자를 수식하는 부사 역할을 못 한다.\n(B) approximate — 형용사라 뒤의 수량 표현을 수식하지 못한다.\n(C) approximately — 부사 '약, 대략'. 숫자를 수식해 정답.\n(D) approximation — 명사라 수식 자리에 부적합하다.",
          "translation": "이 시스템은 귀사의 행정 처리 시간을 약 40퍼센트 줄여 줄 것입니다."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "The system requires an immediate software license renewal fee.",
            "We are also offering an exclusive incentive for new corporate clients.",
            "We regret to inform you that the promotion has already expired.",
            "Your request to cancel the subscription has been processed successfully."
          ],
          "answerIndex": 1,
          "explanation": "뒤 문장에서 '이달 말 전 시범 설치 시 무료 세팅'이라는 구체 혜택을 제시하므로, 앞에서 '새 기업 고객 대상 독점 혜택'으로 운을 떼는 것이 자연스럽다.\n(A) 즉시 라이선스 갱신비가 필요합니다 — 혜택 제공 흐름과 반대(비용 부과)라 어긋난다.\n(B) 새 기업 고객을 위한 독점 혜택도 제공합니다 — 뒤 구체 혜택으로 이어져 정답.\n(C) 프로모션이 이미 만료되었습니다 — 뒤의 혜택 제안과 모순된다.\n(D) 구독 취소 요청이 처리되었습니다 — 신규 영업 답변 맥락과 무관하다.",
          "translation": "저희는 또한 새 기업 고객을 위한 독점 혜택을 제공하고 있습니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["hesitate", "postpone", "anticipate", "fluctuate"],
          "answerIndex": 0,
          "explanation": "'do not hesitate to + 동사원형(주저 말고 연락 주세요)'은 비즈니스 서신 마무리의 관용구다.\n(A) hesitate — do not hesitate to reach out. 정답.\n(B) postpone — '연기하다'라 뒤 to부정사와의 결합도 어색하고 의미도 맞지 않는다.\n(C) anticipate — '예상하다'라 관용구·의미 모두 맞지 않는다.\n(D) fluctuate — '변동하다'라 문맥과 전혀 맞지 않는다.",
          "translation": "추가 질문이 있으시거나 실시간 시연을 원하시면 주저 말고 연락 주십시오."
        }
      ]
    },
    {
      "id": "p6-pat-05",
      "no": 5,
      "title": "추천서 및 고용 확인",
      "category": "이메일",
      "contextMap": "서신 목적이 특정 인물 추천이고 수신자가 채용 담당자라면 추천서입니다.\n· **[도입]** 아무개 씨를 기쁜 마음으로 추천합니다\n· **[역량]** 재직 중 뛰어난 성과·성실한 태도 — 인성·역량 형용사 짝꿍 저격\n· **[정답 구역·기여도]** 귀사에 귀중한 자산·기여가 될 것 — 기여·자산 어휘 저격\n· **[확약]** 추가 확인이 필요하면 연락 — 문장 삽입·조건절 도치(Should) 저격",
      "passage": "To: Hiring Committee, Muze AI\nFrom: David Miller, Senior Project Director at Social Brain\nDate: July 14, 2026\nSubject: Letter of Recommendation for Ms. Sora Kim\n\nDear Members of the Hiring Committee,\n\nI am writing this letter to enthusiastically recommend Ms. Sora Kim for the Senior Data Analyst position at Muze AI. As her direct supervisor at Social Brain for the past four years, I have watched her develop into an exceptionally (1) __________ professional.\n\nDuring her tenure with us, Ms. Kim spearheaded the architecture of our financial predictive modeling system. Her technical proficiency was matched only by her outstanding leadership. She regularly motivated her team to deliver complex consulting solutions (2) __________ tight deadlines.\n\n(3) __________. I am entirely confident that she will bring the same level of dedication and analytical rigor to your organization. Her unique ability to translate complex data into actionable business strategies will make her an immediate asset to your development team.\n\n(4) __________ you require any further information regarding Ms. Kim's qualifications, please do not hesitate to contact me directly at d.miller@socialbrain.ai.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["talent", "talented", "talents", "talenting"],
          "answerIndex": 1,
          "explanation": "`an + exceptionally(부사) + [형용사] + professional(명사)` 구조라, 명사를 꾸미는 형용사 자리다.\n(A) talent — 명사라 명사 professional 앞의 수식 형용사 자리에 올 수 없다.\n(B) talented — 분사형 형용사 '재능 있는'. professional을 수식해 정답.\n(C) talents — 복수 명사라 형용사 자리에 부적합하다.\n(D) talenting — 존재하지 않는 비표준 형태다.",
          "translation": "저는 그녀가 대단히 재능 있는 전문가로 성장하는 것을 지켜보았습니다."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["among", "throughout", "into", "under"],
          "answerIndex": 3,
          "explanation": "'under tight deadlines(촉박한 마감 하에서)'는 압박을 나타내는 고정 표현이다(under pressure·under budget과 세트).\n(A) among — '~사이에'라 deadlines와 연어·의미가 맞지 않는다.\n(B) throughout — '~내내'라 '마감 하에서'라는 압박 의미를 담지 못한다.\n(C) into — 방향 전치사라 deadlines와의 결합이 어색하다.\n(D) under — under tight deadlines(압박 하에서). 정답.",
          "translation": "그녀는 촉박한 마감 속에서도 팀이 복잡한 컨설팅 솔루션을 내도록 이끌었습니다."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "She was frequently penalized for missing critical project milestones.",
            "We regret that she has decided to renew her contract with our firm.",
            "Her contributions were instrumental in our securing two major B2G contracts.",
            "The recruitment process has been extended due to a high volume of applicants."
          ],
          "answerIndex": 2,
          "explanation": "앞은 기술 전문성·리더십 칭찬, 뒤는 '헌신·분석력이 귀사에도 기여할 것을 확신'이라, 사이에 과거의 구체적 성과가 자연스럽다.\n(A) 핵심 마일스톤을 놓쳐 자주 징계받았습니다 — 추천서 극찬 톤과 정반대라 어긋난다.\n(B) 그녀가 우리 회사와 계약을 갱신하기로 해 유감입니다 — 추천(이직) 맥락과 모순된다.\n(C) 그녀의 기여는 두 건의 대형 B2G 계약 확보에 결정적이었습니다 — 구체 성과로 칭찬을 뒷받침해 정답.\n(D) 지원자 급증으로 채용 절차가 연장되었습니다 — 추천서 흐름과 무관하다.",
          "translation": "그녀의 기여는 저희가 두 건의 대형 B2G 계약을 확보하는 데 결정적이었습니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["Should", "Unless", "Provided", "Although"],
          "answerIndex": 0,
          "explanation": "'If you should require~'에서 If가 생략되며 조동사 Should가 문두로 도치된 형태로, 뒤에 동사원형 require가 온다.\n(A) Should — 가정법 If 생략 도치. '혹시 필요하시면'으로 정답.\n(B) Unless — '~하지 않는 한'이라 '필요하면 연락'이라는 의도와 정반대다.\n(C) Provided — '~라는 조건이면'이라 도치 없이 주어가 바로 와야 해 이 어순과 맞지 않는다.\n(D) Although — '비록 ~지만'이라 조건 의미가 아니고 도치 구조와도 맞지 않는다.",
          "translation": "김 씨의 자격에 관해 추가 정보가 필요하시면, 주저 말고 저에게 직접 연락 주십시오."
        }
      ]
    }
  ]
}
```
