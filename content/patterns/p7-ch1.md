# Part 7 패턴학습 · CHAPTER 1 — 단일 지문 ① 이메일·서신 (패턴 01~05)

```json
{
  "part": 7,
  "chapter": 1,
  "chapterTitle": "단일 지문 ① 이메일·서신",
  "patterns": [
    {
      "id": "p7-pat-01",
      "no": 1,
      "title": "고객 문의·서비스 불편 접수 답변",
      "category": "이메일",
      "contextMap": "고객이 제기한 불편(오류·지연·결제)에 담당자가 답장하는 지문입니다.\n· **[도입 = 주제/목적 문제]** 불편에 대한 사과 + 이메일 발송 목적 명시\n· **[본론 = 세부/팩트 문제]** 문제 발생 원인(서버 다운·재고 부족 등) 규명\n· **[해결 = 제안/조치 문제]** 환불·교환·보상 쿠폰 제공\n· **[마무리 = 향후 행동 문제]** 링크 클릭·서류 회신 등 당부",
      "passage": "From: support@muze-ai.com\nTo: h.albright@socialbrain.com\nDate: July 12, 2026\nSubject: Inquiry Regarding Account Access and API Latency\n\nDear Mr. Albright,\n\nThank you for contacting the Muze AI technical support desk yesterday regarding the persistent access issues you encountered with your premium enterprise subscription. We sincerely apologize for the inconvenience this disruption caused to your technical teams during their morning data analytics operations.\n\nUpon receiving your report, our database engineering team immediately initiated a comprehensive system diagnostic. We discovered that the automated structural update applied to our Supabase servers at midnight had inadvertently revoked several temporary access tokens for our B2G consulting clients. This configuration error was the sole cause of the \"ERR_403_ACCESS\" notification flashing on your corporate dashboard.\n\nWe are pleased to inform you that our technical team successfully deployed a manual database rollback at 10:00 A.M. today, and all core API endpoints are now fully operational. To compensate your firm for the three-hour system downtime, we have automatically credited a 15% discount to your account, which will be applied to next month's licensing terms.\n\nTo ensure that your network integration updates sync accurately with our newly generated tokens, we highly recommend that your developers clear their browser caches before attempting to log in again. Should your team experience any ongoing technical difficulties, please do not hesitate to notify us.\n\nSincerely,\nMin-seok Kang\nTechnical Support Director, Muze AI",
      "questions": [
        {
          "prompt": "What is the main purpose of the email?",
          "choices": [
            "To request additional funding for a collaborative research project",
            "To notify an enterprise client that a technical issue has been resolved",
            "To announce structural changes to a corporate subscription policy",
            "To complain about a delayed software delivery from an external vendor"
          ],
          "answerIndex": 1,
          "explanation": "전반부에서 API 접속 오류를 사과한 뒤, 세 번째 단락에서 '오늘 오전 10시 롤백을 배포해 모든 API가 완전히 가동 중'이라고 밝힌다. 기술 문제 해결을 기업 고객에게 알리는 것이 핵심이다.\n(A) 공동 연구 자금 추가 요청 — 자금 요청 내용은 지문에 없다.\n(B) 기술 문제가 해결됐음을 기업 고객에게 알림 — 롤백·정상화 통지라 정답.\n(C) 구독 정책의 구조적 변경 발표 — 정책 변경이 아니라 일시 오류·복구 안내다.\n(D) 외부 업체의 배송 지연에 항의 — 발신자는 지원팀이며 항의가 아니라 사과·해결 안내다.",
          "translation": null
        },
        {
          "prompt": "According to the email, what caused the dashboard error?",
          "choices": [
            "A sudden structural price adjustment by the finance department",
            "An automated database upgrade executed at midnight",
            "A hardware malfunction within the client's internal network",
            "An invalid login attempt by unauthorized system users"
          ],
          "answerIndex": 1,
          "explanation": "두 번째 단락에 '자정에 Supabase 서버에 적용된 자동 구조 업데이트가 접근 토큰을 무효화했다'고 나온다. 지문의 structural update를 database upgrade로 패러프레이징한 선지가 정답이다.\n(A) 재무부의 갑작스러운 가격 조정 — 가격 조정이 아니라 서버 업데이트가 원인이다.\n(B) 자정에 실행된 자동 데이터베이스 업그레이드 — structural update의 패러프레이징이라 정답.\n(C) 고객 내부 네트워크의 하드웨어 고장 — 원인은 벤더 서버 업데이트지 고객 하드웨어가 아니다.\n(D) 무단 사용자의 잘못된 로그인 시도 — 침입이 아니라 '설정 오류(configuration error)'라고 명시됐다.",
          "translation": null
        },
        {
          "prompt": "What is Mr. Albright's team advised to do before logging in?",
          "choices": [
            "Renew their corporate licensing agreement in writing",
            "Submit a formal reimbursement request to the accounting team",
            "Clear the cache files on their internet browsers",
            "Update their personal mobile contact information"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락에 '다시 로그인하기 전에 개발자들이 브라우저 캐시를 지울 것을 강력히 권장한다'고 나온다.\n(A) 서면으로 라이선스 계약 갱신 — 갱신이 아니라 캐시 삭제를 권한다.\n(B) 회계팀에 공식 환급 요청 제출 — 환급 요청 지침은 없다(할인은 자동 적용됨).\n(C) 인터넷 브라우저 캐시 파일 삭제 — 지문 clear their browser caches 그대로라 정답.\n(D) 개인 휴대폰 연락처 갱신 — 언급 없는 내용이다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-02",
      "no": 2,
      "title": "계약·비즈니스 제안 서신",
      "category": "편지",
      "contextMap": "임원·담당자가 타사에 계약 조율·제안 서신을 보내는 지문입니다.\n· **[도입 = 목적 문제]** 이전 논의를 언급하며 공식 제안 목적 명시\n· **[본론 = NOT True 문제]** 서비스 범위·라이선스·수수료 등 조항 나열 → 언급 안 된 것 고르기 단골\n· **[정답 구역]** 양사 시너지·독점 혜택 강조\n· **[마무리 = 향후 일정]** 특정 마감일까지 수정 제안·서명본 회신 요청",
      "passage": "SOCIAL BRAIN AI\n150 Teheran-ro, Gangnam-gu, Seoul\n\nJuly 11, 2026\n\nMs. Hana Tanaka, CEO — Muze AI\n\nDear Ms. Tanaka,\n\nI am writing to follow up on our productive discussion at last week's AI Architecture Summit regarding a potential strategic collaboration between our organizations. As the representative for Social Brain AI, I am pleased to formally extend a proposal to integrate your proprietary automated document generation software into our upcoming LinkMD knowledge base engine.\n\nWe believe that combining your specialized B2G document generation models with our predictive data frameworks will deliver unparalleled efficiency to our public sector clients. Under the tentative terms of our partnership, Social Brain AI would secure a non-exclusive corporate license for your software tools for an initial duration of two years. In exchange, we propose a fixed quarterly licensing fee of $45,000, which includes comprehensive technical support and database ontology synchronization from your engineering teams.\n\nPlease note that we are prepared to grant your senior developers priority access to our Supabase server infrastructure to ensure a seamless technical deployment. However, to protect our shared research assets, a comprehensive non-disclosure agreement (NDA) must be executed prior to any system integrations.\n\nAttached to this letter is a complete draft of the proposed licensing agreement for your legal team's review. We kindly request that you provide your feedback or any requested modifications by July 25.\n\nSincerely,\nJames Albright\nChief Operating Officer, Social Brain AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the letter?",
          "choices": [
            "To demand financial compensation for a data privacy breach",
            "To formally propose a business partnership and licensing agreement",
            "To invite a technology expert to speak at an upcoming summit",
            "To request an extension on a public sector project deadline"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락 후반부에 '독점 소프트웨어를 LinkMD 엔진에 통합하는 전략적 협업 제안을 공식적으로 전달한다'고 나온다.\n(A) 데이터 유출에 대한 재정 보상 요구 — 보상 요구가 아니라 협업 제안이다.\n(B) 사업 파트너십·라이선스 계약을 공식 제안 — formally extend a proposal이라 정답.\n(C) 기술 전문가를 서밋 연사로 초청 — 초청이 아니며, 서밋은 지난주 논의의 배경일 뿐이다.\n(D) 공공 프로젝트 마감 연장 요청 — 마감 연장 요청 내용은 없다.",
          "translation": null
        },
        {
          "prompt": "What is NOT mentioned as a term of the proposed agreement?",
          "choices": [
            "A licensing duration lasting for an initial period of two years",
            "A fixed quarterly fee paid by Social Brain AI to Muze AI",
            "The permanent relocation of Muze AI's engineering staff",
            "Priority access to Social Brain AI's server infrastructure"
          ],
          "answerIndex": 2,
          "explanation": "NOT 문제이므로 '언급된 것 3개'를 지우고 남는 것을 고른다.\n(A) 초기 2년 라이선스 기간 — 2단락에 initial duration of two years로 명시되어 언급됨(오답).\n(B) Social Brain이 Muze에 내는 분기 고정 요금 — fixed quarterly licensing fee of $45,000로 언급됨(오답).\n(C) Muze 엔지니어의 영구 인력 재배치 — 지문에 전혀 없어 정답(NOT mentioned).\n(D) Social Brain 서버 인프라 우선 접근 — priority access to our Supabase server로 언급됨(오답).",
          "translation": null
        },
        {
          "prompt": "What is Ms. Tanaka requested to do by July 25?",
          "choices": [
            "Submit an invoice for the initial software installation",
            "Renew her company's identification badge access",
            "Respond with feedback regarding the contract terms",
            "Attend a physical signing ceremony at the Gangnam office"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락에 '7월 25일까지 피드백이나 수정 요청을 제공해 달라'고 나온다.\n(A) 초기 설치 송장 제출 — 송장 제출 요청은 없다.\n(B) 회사 신분증 접근 갱신 — 언급 없는 내용이다.\n(C) 계약 조건에 대한 피드백으로 회신 — provide your feedback by July 25의 패러프레이징이라 정답.\n(D) 강남 사무실 서명식 참석 — 서명식 참석 요청은 없고 초안 검토만 요청한다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-03",
      "no": 3,
      "title": "사내 인사 이동·임원 임명 공지",
      "category": "이메일",
      "contextMap": "경영진·인사팀이 전 직원에게 임명 공지를 보내는 지문입니다.\n· **[도입 = 목적/주제 문제]** 특정 인물의 임명·승진 소식 알림\n· **[본론 = 추론 문제]** 과거 경력·성과 서술 → 이력 기반 추론 단골\n· **[정답 구역 = 역할]** 새 직책에서 담당할 목표·부서 명시\n· **[마무리]** 환영 리셉션 안내·축하 독려",
      "passage": "From: corporate-office@muze-ai.com\nTo: all-staff@muze-ai.com\nDate: July 12, 2026\nSubject: Welcome Our New Chief Financial Officer, Min-seok Kang\n\nDear Colleagues,\n\nThe Executive Board is pleased to formally announce the appointment of Min-seok Kang as the new Chief Financial Officer (CFO) of Muze AI, effective August 1. Mr. Kang will succeed our current financial director, who is transitioning into an advisory role after five years of exceptional service.\n\nMr. Kang brings more than fifteen years of comprehensive corporate finance experience to our organization. For the past six years, he served as the Senior Vice President of Financial Operations at Apex Technology Group, where he successfully managed large-scale capital allocations and oversaw the structural budget integration for two major international mergers. His deep expertise in public sector accounting frameworks makes him uniquely qualified to guide Muze AI through our upcoming expansion into regional B2G markets.\n\nIn his new capacity as CFO, Mr. Kang will be entirely responsible for overseeing our global treasury, long-term financial modeling, and the implementation of our strategic corporate expense control measures.\n\nPlease join us in welcoming Mr. Kang to the Muze AI family. We will host a casual welcome reception in the main showroom on Friday, July 17, at 4:00 P.M., giving everyone an opportunity to greet him personally.\n\nSincerely,\nHana Tanaka\nChief Executive Officer, Muze AI",
      "questions": [
        {
          "prompt": "What is the main purpose of the email?",
          "choices": [
            "To introduce a newly appointed executive to the company",
            "To outline the details of an upcoming corporate merger",
            "To announce the retirement of the founding CEO",
            "To explain a revised policy on employee expense reports"
          ],
          "answerIndex": 0,
          "explanation": "첫 단락에서 '강민석 씨를 새 CFO로 임명했음을 공식 발표한다'고 밝힌다.\n(A) 새로 임명된 임원을 회사에 소개 — appointment 발표라 정답.\n(B) 다가오는 합병의 세부 사항 설명 — 합병은 강 씨의 과거 이력일 뿐 이메일 주제가 아니다.\n(C) 창업 CEO의 은퇴 발표 — 전임 재무이사가 자문역으로 이동할 뿐 CEO 은퇴가 아니다.\n(D) 경비 보고 정책 개정 설명 — 경비 통제는 그의 담당 업무일 뿐 이메일 주제가 아니다.",
          "translation": null
        },
        {
          "prompt": "What is indicated about Mr. Kang's professional background?",
          "choices": [
            "He worked as a software developer for a public sector firm.",
            "He spent the last six years employed at Apex Technology Group.",
            "He previously established his own quantitative trading startup.",
            "He managed a database ontology project for five years."
          ],
          "answerIndex": 1,
          "explanation": "두 번째 단락에 '지난 6년 동안 Apex Technology Group에서 재무 운영 수석 부사장으로 근무했다'고 나온다.\n(A) 공공 기업에서 소프트웨어 개발자로 근무 — 그는 재무 담당이지 개발자가 아니다.\n(B) 지난 6년간 Apex Technology Group에 재직 — 지문 사실과 일치해 정답.\n(C) 본인의 퀀트 트레이딩 스타트업 창업 — 창업 이력은 언급이 없다.\n(D) 5년간 데이터 온톨로지 프로젝트 관리 — '5년'은 전임 재무이사의 근속 기간이고 온톨로지도 그의 이력이 아니다.",
          "translation": null
        },
        {
          "prompt": "What will take place on Friday, July 17?",
          "choices": [
            "A mandatory financial compliance training session",
            "A performance review for the predictive data division",
            "A social gathering to welcome a new staff member",
            "A virtual press conference with regional B2G clients"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락에 '7월 17일 금요일 오후 4시 메인 쇼룸에서 가벼운 환영 리셉션을 연다'고 나온다.\n(A) 의무 재무 준법 교육 — 교육 세션이 아니라 환영 리셉션이다.\n(B) 예측 데이터 부서 성과 평가 — 성과 평가 언급은 없다.\n(C) 신규 직원을 환영하는 친목 모임 — welcome reception의 패러프레이징이라 정답.\n(D) B2G 고객과의 화상 기자회견 — 기자회견은 언급이 없다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-04",
      "no": 4,
      "title": "송장 분쟁·결제 금액 조정 요청",
      "category": "이메일",
      "contextMap": "구매·회계 담당자가 거래처에 송장 오류 조정을 요청하는 지문입니다.\n· **[도입 = 목적 문제]** 특정 송장 번호를 명시하며 금액·내역 오류 알림\n· **[본론 = 계산 문제]** 계약 금액 vs 잘못 청구된 금액 대조 → 차액·정답 금액 계산 단골\n· **[정답 구역 = 대안]** 이미 결제면 차감(Credit), 미결제면 수정 송장 재발행 요청\n· **[마무리]** 증빙 첨부·확인 후 연락 당부",
      "passage": "From: accounting@socialbrain.com\nTo: billing@apex-tech.com\nDate: July 11, 2026\nSubject: Discrepancy in Invoice #AP-2026-0705\n\nDear Billing Department,\n\nI am writing on behalf of the accounts payable team at Social Brain AI regarding invoice #AP-2026-0705, which we received on July 5 for our premium network analytics and database infrastructure services. Upon a thorough review of the line items, we discovered a significant pricing discrepancy that requires immediate adjustment.\n\nAccording to the corporate licensing agreement executed by both parties earlier this year, Social Brain AI is entitled to a locked-in quarterly rate of $45,000. This amount is supposed to cover all standard technical deployment and server optimization fees. However, the received invoice reflects an additional \"Emergency Support Charge\" of $7,500, bringing the total billed amount to $52,500.\n\nPlease note that according to Section 4B of our contract, any auxiliary fees are to be completely waived if the system downtime is caused by the vendor's internal maintenance. The database optimization performed on our Supabase servers last month was an automated system upgrade initiated entirely from your end, meaning this extra charge is invalid.\n\nWe request that your team verify this configuration history and issue a revised invoice reflecting the correct balance of $45,000. Since our automated payment portal is scheduled to process this transaction on July 15, we would appreciate it if you could send the updated document before that date.\n\nSincerely,\nJi-won Eom\nAccounts Payable Manager, Social Brain AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the email?",
          "choices": [
            "To cancel a premium software subscription agreement",
            "To request a correction to a recently received invoice",
            "To authorize an automatic bank transfer for a service fee",
            "To complain about a lack of technical support during an upgrade"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락에서 송장 번호를 명시하며 '즉각적인 조정이 필요한 상당한 금액 불일치를 발견했다'고 밝힌다.\n(A) 프리미엄 구독 계약 취소 — 취소가 아니라 송장 정정 요청이다.\n(B) 최근 받은 송장의 정정 요청 — pricing discrepancy 조정 요청이라 정답.\n(C) 서비스료 자동 이체 승인 — 승인이 아니라 금액이 틀려 정정을 요청한다.\n(D) 업그레이드 중 기술 지원 부족에 항의 — 지원 부족 항의가 아니라 부당 청구 정정이다.",
          "translation": null
        },
        {
          "prompt": "What is indicated about the contract between Social Brain AI and Apex Tech?",
          "choices": [
            "It requires a monthly licensing payment of $45,000.",
            "It was originally drafted by an external legal consulting firm.",
            "It waives extra fees under certain system maintenance conditions.",
            "It is scheduled to be permanently terminated on July 15."
          ],
          "answerIndex": 2,
          "explanation": "세 번째 단락 제4B조에 '공급업체 내부 정비로 다운타임이 발생하면 부수 비용은 전액 면제된다'고 나온다.\n(A) 월 4.5만 달러 라이선스 지불 요구 — $45,000은 '분기(quarterly)' 요금이라 '월(monthly)'은 틀렸다.\n(B) 외부 법률 컨설팅이 초안 작성 — 초안 작성 주체는 언급이 없다.\n(C) 특정 정비 조건에서 추가 요금을 면제 — 4B조 waived의 패러프레이징이라 정답.\n(D) 7월 15일 영구 해지 예정 — 7월 15일은 결제 처리일이지 계약 해지일이 아니다.",
          "translation": null
        },
        {
          "prompt": "According to Mr. Eom, what should the total balance be on the revised invoice?",
          "choices": [
            "$7,500",
            "$12,000",
            "$45,000",
            "$52,500"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락에서 '올바른 잔액인 $45,000이 반영된 수정 송장을 발행해 달라'고 요청한다.\n(A) $7,500 — 부당 청구된 Emergency Support Charge 금액이지 정정 잔액이 아니다.\n(B) $12,000 — 지문에 근거 없는 임의 금액이다.\n(C) $45,000 — 계약상 고정 분기 요금(부당 요금 제외)이라 정답.\n(D) $52,500 — 부당 요금이 포함된 총 청구액이라 오히려 정정 대상 금액이다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-05",
      "no": 5,
      "title": "공급업체 물품 배송 지연 항의",
      "category": "이메일",
      "contextMap": "한 회사의 물류/운영 담당자가 물품 공급업체(Supplier/Vendor)에 항의 서신을 보낸다면?\n· **[도입: 목적 문제]** 특정 주문 번호와 원래 약속된 납품 기일을 명시하며, 물품이 도달하지 않아 심각한 지연이 발생했음을 알립니다.\n· **[본론: 구체적 피해/추론 문제]** 이 배송 지연으로 우리 회사의 프로젝트나 생산 일정에 어떤 정체(Bottleneck)가 생겼는지 상세히 서술합니다. 운영 차질 기반 피해 규모 추론 문제 단골.\n· **[정답 구역 - 대책 요구]** 추가 요금 없이 익일 급송 배송(Expedited Shipping)으로 보내거나, 지연에 따른 재정적 보상/할인을 적용해 달라고 요구합니다.\n· **[마무리: 최종 경고]** 특정 날짜까지 확답이나 물품이 도착하지 않으면 주문을 취소하거나 계약을 전면 해지할 것임을 경고합니다.",
      "passage": "From: s.ji@q-nexus-research.com\nTo: logistics@apex-hardware.com\nDate: July 11, 2026\nSubject: Urgent: Delivery Delay for Order #NX-2026-0615\n\nDear Customer Operations Team,\n\nI am writing to express our deep dissatisfaction regarding a severe delivery delay associated with Order #NX-2026-0615. This order, which consists of twenty high-performance data-processing terminals intended for our Q-Nexus qualitative research platform, was formally confirmed on June 15.\n\nAccording to our procurement agreement, the hardware was scheduled to arrive at our Jeonbuk research facility no later than July 5. As of today, July 11, the shipment has not been delivered, and our automated tracking dashboard reflects no status updates.\n\nThis unexpected delay has caused a critical bottleneck in our operations. Our engineering teams are currently unable to test the newly developed database ontology architecture, thereby threatening our strict multi-year timeline with the provincial government. We cannot afford any further structural latency that might jeopardize our public funding package.\n\nWe demand that your logistics department investigate this matter immediately and arrange for the hardware to be shipped via complimentary expedited overnight delivery. Furthermore, we expect a formal written explanation from your operations director. If the tracking information and a confirmed delivery date are not provided by July 15, we will be forced to cancel the order entirely and seek an alternative technology vendor.\n\nSincerely,\nSang-wook Ji\nOperations Director, Q-Nexus Research",
      "questions": [
        {
          "prompt": "Why is Mr. Ji writing the email?",
          "choices": [
            "To request a price quote for high-performance terminals",
            "To complain about a failure to meet a delivery deadline",
            "To renew a long-term technology consulting contract",
            "To update the shipping address for an existing order"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락에서 '주문 #NX-2026-0615와 관련된 심각한 배송 지연에 깊은 불만을 표한다'며 7월 5일까지 오기로 한 물품이 오지 않은 사실을 짚는다.\n(A) 고성능 단말기 견적 요청 — 견적 요청이 아니라 지연 항의다.\n(B) 납품 마감 기한 미준수에 항의 — delivery delay 불만이라 정답.\n(C) 장기 기술 컨설팅 계약 갱신 — 계약 갱신이 아니라 오히려 해지를 경고한다.\n(D) 기존 주문의 배송 주소 갱신 — 주소 변경 내용은 없다.",
          "translation": null
        },
        {
          "prompt": "What is a stated consequence of the delay?",
          "choices": [
            "The marketing budget for the project has been reduced.",
            "External developers have canceled their system access.",
            "Testing of a new database architecture has been interrupted.",
            "Staff members were permanently reassigned to another facility."
          ],
          "answerIndex": 2,
          "explanation": "세 번째 단락에 '엔지니어링 팀이 새로 개발한 데이터 온톨로지 아키텍처를 테스트하지 못하고 있다'고 나온다.\n(A) 프로젝트 마케팅 예산이 삭감됨 — 예산 삭감 언급은 없다.\n(B) 외부 개발자가 시스템 접근을 취소함 — 접근 취소 내용은 없다.\n(C) 새 데이터베이스 아키텍처 테스트가 중단됨 — unable to test의 패러프레이징이라 정답.\n(D) 직원이 다른 시설로 영구 재배치됨 — 재배치 언급은 없다.",
          "translation": null
        },
        {
          "prompt": "What does Mr. Ji threaten to do if the issue is not addressed by July 15?",
          "choices": [
            "Terminate the transaction with Apex Hardware",
            "Deduct a 15% penalty fee from the next invoice",
            "Submit a formal complaint to the local government",
            "Request a manual database rollback from his team"
          ],
          "answerIndex": 0,
          "explanation": "마지막 단락에서 7월 15일까지 확답이 없으면 '주문을 완전히 취소하고 다른 업체를 찾겠다'고 경고한다.\n(A) Apex Hardware와의 거래를 종료 — cancel the order entirely의 패러프레이징이라 정답.\n(B) 다음 송장에서 15% 위약금 차감 — 위약금 차감 위협은 없다.\n(C) 지방 정부에 공식 민원 제출 — 정부는 자사 프로젝트의 이해관계자일 뿐 민원 대상이 아니다.\n(D) 팀에 수동 DB 롤백 요청 — 롤백은 다른 지문의 소재이지 이 위협이 아니다.",
          "translation": null
        }
      ]
    }
  ]
}
```
