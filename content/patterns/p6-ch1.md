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
          "explanation": "빈칸 뒤에 목적어 없이 마침표로 끝나므로 수동태가 필요. 능동 (A)(D)·동사 자리가 아닌 (C) 제외. 재고 부족으로 '지금까지 지연되어 온' 상태이므로 현재완료 수동태 (B) has been delayed."
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
          "explanation": "앞 문장에서 '화요일에 재고 입고 후 주문을 즉시 우선 처리'라고 했으므로, 이어질 자연스러운 흐름은 구체적 발송 일정 안내. (C) '목요일쯤 발송 예상'이 맥락에 맞다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["temporary", "initial", "deliberate", "redundant"],
          "answerIndex": 0,
          "explanation": "배송 지연은 재고가 채워지면 해결될 일이므로 '일시적인' (A) temporary. (C) 의도적인·(D) 불필요한은 사과 문맥에 부적합."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["has credited", "is crediting", "will be credited", "credits"],
          "answerIndex": 2,
          "explanation": "쿠폰(voucher)은 스스로 적립하는 주체가 아니라 시스템에 의해 '적립되는' 대상이므로 수동태, 앞으로 있을 보상이므로 미래. (C) will be credited."
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
          "explanation": "were truly [형용사/분사] 자리. 통찰(insights)이 깨달음을 '주는' 능동 의미이므로 현재분사 (B) illuminating(명쾌한, 이해를 돕는)."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["nominal", "volatile", "invaluable", "precarious"],
          "answerIndex": 2,
          "explanation": "파트너십 제안은 상대의 가치를 극찬한다. '매우 귀중한' (C) invaluable. (A) 명목상의·(B) 변덕스러운·(D) 위태로운은 제안서에 부적합."
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
          "explanation": "앞에서 협력의 필요성을 제시했고 뒤에서 '구체적으로 공동 입찰 기회를 모색하고 싶다'고 이어진다. 협력 제안을 잇는 (C)."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["will appreciate", "would appreciate", "appreciated", "are appreciating"],
          "answerIndex": 1,
          "explanation": "정중한 요청의 고정 표현 would appreciate it if you could + 동사원형(가정법 공손). (B) would appreciate."
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
          "explanation": "a technical glitch(주어) + [동사] + the duplicate payment(목적어) 구조. 뒤에 목적어가 있으므로 능동, 이미 확인된 과거 사실이므로 과거시제 (A) caused."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["is appearing", "will appear", "appeared", "appears"],
          "answerIndex": 1,
          "explanation": "뒤의 시간 단서 within three business days(3영업일 이내)는 미래. appear는 자동사라 수동태 함정에 넘어가지 말 것. (B) will appear."
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
          "explanation": "앞은 사과·환불 조치, 뒤는 '게다가 1개월 무료 연장' 추가 보상. 그 사이 재발 방지 약속인 (A) '보안 프로토콜을 성공적으로 업데이트했다'가 자연스럽다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["repeats", "is repeating", "does not recur", "has recurred"],
          "answerIndex": 2,
          "explanation": "패치를 적용한 목적은 이 오류가 '재발하지 않도록' 하기 위함. 자동사 recur(재발하다). (C) does not recur."
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
          "explanation": "보어 도치 [Attached/Enclosed] + be동사 + 진짜 주어. 뒤에 is + brochure가 있으므로 주격 보어 형용사(분사) (A) Attached. 명사·동사원형에 낚이지 말 것."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["standard", "approximate", "approximately", "approximation"],
          "answerIndex": 2,
          "explanation": "뒤에 숫자 forty percent가 있으므로 수량을 수식하는 부사 자리. '대략, 약' (C) approximately."
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
          "explanation": "뒤 문장에서 '이달 말 전 시범 설치 시 무료 세팅'이라는 구체 혜택을 던진다. 앞에서 '새 기업 고객 독점 혜택도 제공한다'고 운을 떼는 (B)가 징검다리."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["hesitate", "postpone", "anticipate", "fluctuate"],
          "answerIndex": 0,
          "explanation": "비즈니스 서신 마무리 관용구 do not hesitate to + 동사원형(망설이지 말고 연락 주세요). (A) hesitate."
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
          "explanation": "an + exceptionally(부사) + [형용사] + professional(명사) 구조. 명사를 꾸미는 형용사 자리이므로 분사형 형용사 (B) talented."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["among", "throughout", "into", "under"],
          "answerIndex": 3,
          "explanation": "'촉박한 마감 하에서'를 뜻하는 고정 표현 under tight deadlines. under pressure·under budget과 세트로 암기. (D) under."
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
          "explanation": "앞은 기술 전문성·리더십 칭찬, 뒤는 '헌신·분석력이 귀사에도 기여할 것 확신'. 과거의 구체적 성과를 제시하는 (C) '두 건의 대형 B2G 계약 확보에 결정적 기여'가 자연스럽다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["Should", "Unless", "Provided", "Although"],
          "answerIndex": 0,
          "explanation": "If you should require~에서 접속사 If가 생략되며 조동사 Should가 문두로 도치된 형태. 문두 빈칸 + 뒤에 동사원형 require. 가정법 도치 (A) Should."
        }
      ]
    }
  ]
}
```
