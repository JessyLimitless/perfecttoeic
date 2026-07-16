# Part 7 패턴학습 · CHAPTER 5 — 이중·삼중 지문 (Double·Triple) (패턴 21~25)

```json
{
  "part": 7,
  "chapter": 5,
  "chapterTitle": "이중·삼중 지문 (Double·Triple)",
  "patterns": [
    {
      "id": "p7-pat-21",
      "no": 21,
      "title": "구인 공고문 및 지원자의 커버레터/이력서 연계 (이중 지문)",
      "category": "이중지문",
      "contextMap": "[지문 1: 구인 공고] + [지문 2: 지원 서신] 이중 지문 구조입니다.\n· **[지문 1 = 모집 직무·우대 요건]** 직책명과 필수 경력·학위·보유 기술을 나열합니다.\n· **[지문 2 = 지원자 역량 증명]** 지원자가 과거 회사·재직 기간·핵심 성과를 어필합니다.\n· **[★연계 저격★]** 지문 1의 우대 조건을 지문 2의 지원자가 어떻게 충족하는지 크로스 매칭합니다.\n· **[마무리 = 후속 절차]** 서류 마감·연락처·추천서 첨부 여부를 파악합니다.",
      "passage": "[Passage 1 — Job Posting]\nJOB POSTING: SENIOR SYSTEMS ARCHITECT & QUANT DEVELOPER\nCompany: Social Brain AI\nLocation: Gangnam Headquarters, Seoul\nClassification: Full-Time / On-Site\n\nSocial Brain AI is an agile technology pioneer specializing in predictive data modeling, centralized server optimization, and the expansion of our next-generation LinkMD knowledge engine. As we aggressively prepare for major multi-year B2G consulting frameworks and regional disaster safety R&D projects, we are seeking a highly skilled Senior Systems Architect.\n\nKey Responsibilities:\n• Lead the structural integration and optimization of complex metadata architectures.\n• Supervise data engineering teams during automated database rollback simulations.\n• Develop high-performance algorithmic endpoints linking standard Supabase structures with the Korea Investment & Securities (KIS) API framework.\n\nMandatory & Preferred Qualifications:\n• A graduate degree in Computer Science, Data Science, or Public Administration is required.\n• Minimum of five years of documented professional experience in enterprise financial data or cloud server management.\n• (Preferred) Prior hands-on experience developing quantitative trading bot systems or managing automated corporate disclosure analysis workflows is highly advantageous.\n\nHow to Apply:\nInterested technology pioneers must submit a comprehensive resume and professional cover letter directly to Min-seok Kang, HR Operations Director, at recruiting@socialbrain-ai.com no later than July 20.\n\n───\n\n[Passage 2 — Email]\nFrom: s.ji@q-nexus-research.com\nTo: recruiting@socialbrain-ai.com\nDate: July 13, 2026\nSubject: Application for Senior Systems Architect Position\n\nDear Mr. Kang,\n\nI am writing to formally submit my credentials for the Senior Systems Architect position advertised on your corporate portal. Having monitored Social Brain AI's extraordinary contributions to the agentic economy, I am eager to align my technical expertise with your upcoming LinkMD platform modernization initiatives.\n\nI recently completed a successful six-year tenure as the Technical Deployment lead for the Q-Nexus qualitative research platform. In this capacity, I entirely managed the structural synchronization of localized database ontology architectures for various provincial institutions, ensuring zero processing latency under heavy operational loads.\n\nFurthermore, during my early career at an asset management firm, I personally engineered and verified three automated quantitative trading bot algorithms utilizing the Kiwoom and KIS API frameworks. I also possess a master's degree in Public Administration, which equips me with a distinct structural logic for managing B2G legal compliance workflows.\n\nI have attached my complete professional resume and two technical reference letters for your legal and administrative review. I welcome the opportunity to discuss how my data science background can help Social Brain AI build an exceptional future.\n\nSincerely,\nSang-wook Ji",
      "questions": [
        {
          "prompt": "What is a stated responsibility of the position advertised in the job posting?",
          "choices": [
            "Designing commercial retail storefront layouts",
            "Managing human resources payroll tax credits",
            "Renewing external software licensing packages",
            "Supervising team members during database rollback simulations"
          ],
          "answerIndex": 3,
          "explanation": "지문 1 Key Responsibilities에 'Supervise data engineering teams during automated database rollback simulations'가 있다.\n(A) 상업용 소매 매장 레이아웃 설계 — 직무 요건에 없다.\n(B) 인사 급여 세액공제 관리 — 언급되지 않는다.\n(C) 외부 소프트웨어 라이선스 패키지 갱신 — 직무 요건이 아니다.\n(D) DB 롤백 시뮬레이션 중 팀원 감독 — data engineering teams를 team members로 받은 정답.",
          "translation": null
        },
        {
          "prompt": "In the job posting, what is indicated about the application process?",
          "choices": [
            "Candidates must undergo a mandatory 14-day training trial.",
            "Applications must be submitted to Min-seok Kang by July 20.",
            "Material submissions are accepted exclusively via corporate fax.",
            "Applicants must clear their digital browser cache files before applying."
          ],
          "answerIndex": 1,
          "explanation": "지문 1 How to Apply에 'submit ... directly to Min-seok Kang ... no later than July 20'이라 나온다.\n(A) 필수 14일 교육 체험 이수 — 그런 요건은 없다.\n(B) 7월 20일까지 Min-seok Kang에게 제출 — 수령인·마감일이 일치해 정답.\n(C) 오직 회사 팩스로만 제출 — 이메일 제출이라 팩스가 아니다.\n(D) 지원 전 브라우저 캐시 정리 — 무관한 소재다.",
          "translation": null
        },
        {
          "prompt": "What is the main purpose of the email?",
          "choices": [
            "To request a price quote for high-performance terminal equipment",
            "To apply for an available technological executive role",
            "To announce a budget reallocation for a disaster safety project",
            "To complain about a system downtime on the Supabase servers"
          ],
          "answerIndex": 1,
          "explanation": "지문 2 첫 문장에 'formally submit my credentials for the Senior Systems Architect position'이라 나온다.\n(A) 고성능 터미널 장비 견적 요청 — 견적 요청 메일이 아니다.\n(B) 공석인 기술 임원직에 지원 — 지원서라 정답.\n(C) 재난 안전 프로젝트 예산 재배정 발표 — 발표 메일이 아니다.\n(D) Supabase 서버 다운타임 항의 — 항의 메일이 아니다.",
          "translation": null
        },
        {
          "prompt": "What qualification preferred by Social Brain AI does Mr. Ji possess?",
          "choices": [
            "Experience creating automated quantitative trading systems",
            "Prior employment as a legal compliance consultant in Seoul",
            "A doctorate degree in structural database ontology architecture",
            "Certification in multi-factor authentication network security"
          ],
          "answerIndex": 0,
          "explanation": "지문 1 우대 조건 'developing quantitative trading bot systems'와 지문 2 지원자의 'three automated quantitative trading bot algorithms 구축'이 연계된다.\n(A) 자동 퀀트 트레이딩 시스템 구축 경험 — 두 지문을 잇는 정답.\n(B) 서울에서 법률 준수 컨설턴트로 근무 — 그런 경력은 없다.\n(C) 구조적 DB 온톨로지 박사 학위 — 지원자는 석사(공공행정)다.\n(D) MFA 네트워크 보안 자격증 — 언급되지 않는다.",
          "translation": null
        },
        {
          "prompt": "What has Mr. Ji provided along with his email?",
          "choices": [
            "An invoice for a premium enterprise subscription",
            "A signed acknowledgment form for a remote work policy",
            "Letters of recommendation from professional references",
            "A manual budget ledger for the Jeonbuk research facility"
          ],
          "answerIndex": 2,
          "explanation": "지문 2 마지막 단락에서 'two technical reference letters 첨부'를 언급한다.\n(A) 프리미엄 기업 구독 송장 — 첨부물이 아니다.\n(B) 재택근무 방침 서명 확인서 — 첨부되지 않았다.\n(C) 전문 추천인의 추천서 — reference letters를 재진술한 정답.\n(D) 전북 연구시설 수기 예산 원장 — 무관하다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-22",
      "no": 22,
      "title": "물품 주문서 및 공급업체의 배송/재고 변경 안내 (이중 지문)",
      "category": "이중지문",
      "contextMap": "[지문 1: 주문서/송장] + [지문 2: 배송 변경 안내 이메일] 이중 지문 구조입니다.\n· **[지문 1 = 최초 주문 데이터]** 품목 코드·수량·단가·총액을 표로 파악합니다.\n· **[지문 2 = 공급업체 변동 고지]** 특정 품목의 재고 부족·배송 지연과 대안을 안내합니다.\n· **[★연계 저격★]** 지문 2의 품절 품목·대체품 제안을 지문 1 가격표와 연계해 최종 청구액을 계산합니다.\n· **[마무리 = 고객 확인 요구]** 변경 동의 여부를 특정 날짜까지 회신하도록 당부합니다.",
      "passage": "[Passage 1 — Purchase Order]\nMUZE AI PROCUREMENT ORDER\n75 Sejong-daero, Jongno-gu, Seoul | purchase@muze-ai.com\n\nORDER NUMBER: #MZ-2026-0711\nDATE OF ORDER: July 11, 2026\nSHIPPING METHOD: Express Overnight\n\n-----------------------------------------------------------\nITEM CODE   | DESCRIPTION               | QTY | UNIT PRICE | TOTAL\n-----------------------------------------------------------\nTERM-HD-01  | High-Performance Terminal | 5   | $1,200     | $6,000\nMTR-LG-4K   | 32-Inch UltraWide Monitor | 3   | $500       | $1,500\nSRV-SB-SSD  | Supabase Storage Drive    | 2   | $2,000     | $4,000\nCAB-FO-10   | Fiber-Optic Cable (10m)   | 10  | $50        | $500\n-----------------------------------------------------------\nSUBTOTAL:                                              $12,000\nSHIPPING:                                                 $150\nTOTAL DUE:                                             $12,150\n\nNOTES: All hardware terminal inputs must be pre-configured with customized multi-factor authentication (MFA) protocols prior to dispatch.\n\n───\n\n[Passage 2 — Email]\nFrom: customer-support@apex-logistics.com\nTo: purchase@muze-ai.com\nDate: July 12, 2026\nSubject: Preparation Status for Order #MZ-2026-0711\n\nDear Procurement Team at Muze AI,\n\nThank you for submitting purchase order #MZ-2026-0711 on July 11. We are currently preparing your hardware components for overnight dispatch to ensure they reach your headquarters on schedule.\n\nHowever, during our centralized inventory verification this morning, our logistics team discovered an unexpected stock deficiency. The 'SRV-SB-SSD' drives are currently backordered due to a temporary supply chain halt at our manufacturing division. We do not anticipate receiving our next production allocation until August 5.\n\nTo prevent an administrative bottleneck in your database ontology project, we would like to offer two immediate alternatives:\n1. We can cancel the backordered items entirely and ship the remainder of your order immediately, adjusting your total billed balance accordingly.\n2. We can substitute the unavailable items with our upgraded model, 'SRV-SB-PLUS' (4TB capacity), which is fully in stock. Although it normally retails for $2,500 per unit, we will waive the $500 price difference for each item as a courtesy for this inconvenience.\n\nPlease note that to maintain your overnight express delivery timeline, your tech support manager must confirm your choice by replying to this email by July 14 at 5:00 P.M.\n\nSincerely,\nJi-hoon Lee\nLogistics Operations Manager, Apex Hardware Logistics",
      "questions": [
        {
          "prompt": "According to the purchase order, what must be done to the hardware before it is shipped?",
          "choices": [
            "It must be updated with standard quantitative trading algorithms.",
            "It must be pre-configured with multi-factor authentication protocols.",
            "It must be inspected by external legal consultants from Seoul.",
            "It must be wrapped in specialized anti-static storage sheets."
          ],
          "answerIndex": 1,
          "explanation": "지문 1 NOTES에 'must be pre-configured with customized multi-factor authentication (MFA) protocols prior to dispatch'라 나온다.\n(A) 표준 퀀트 트레이딩 알고리즘으로 업데이트 — 그런 요건은 없다.\n(B) MFA 프로토콜로 사전 구성 — 지문과 일치해 정답.\n(C) 서울 외부 법률 자문의 검수 — 검수 조항은 없다.\n(D) 정전기 방지 시트로 포장 — 언급되지 않는다.",
          "translation": null
        },
        {
          "prompt": "Why was the email sent to Muze AI?",
          "choices": [
            "To request an extension for a regional public sector project deadline",
            "To inform the client that a specific ordered item is currently unavailable",
            "To complain about a pricing discrepancy found in an automatic payroll ledger",
            "To announce the permanent relocation of a central manufacturing facility"
          ],
          "answerIndex": 1,
          "explanation": "지문 2에서 'SRV-SB-SSD' 드라이브가 backordered(재고 부족)임을 안내한다.\n(A) 공공 프로젝트 마감 연장 요청 — 연장 요청이 아니다.\n(B) 주문 품목 하나가 현재 품절임을 고지 — 재고 부족 안내라 정답.\n(C) 급여 원장 가격 불일치 항의 — 항의 메일이 아니다.\n(D) 중앙 제조 시설 영구 이전 발표 — 이전 발표가 아니다.",
          "translation": null
        },
        {
          "prompt": "When is Apex Hardware Logistics expecting to receive its next supply of SRV-SB-SSD drives?",
          "choices": [
            "On July 12",
            "On July 14",
            "On August 5",
            "On August 20"
          ],
          "answerIndex": 2,
          "explanation": "지문 2에 'We do not anticipate receiving our next production allocation until August 5'라 나온다.\n(A) 7월 12일 — 이메일 발송일이지 입고일이 아니다.\n(B) 7월 14일 — 고객 회신 마감일이다.\n(C) 8월 5일 — 다음 생산분 입고 예정일이라 정답.\n(D) 8월 20일 — 지문에 없는 날짜다.",
          "translation": null
        },
        {
          "prompt": "If Muze AI selects the second alternative, how much will they be charged for the storage drives?",
          "choices": [
            "$1,500",
            "$4,000",
            "$5,000",
            "$12,150"
          ],
          "answerIndex": 1,
          "explanation": "지문 1에서 원래 $2,000×2=$4,000이고, 지문 2 대체품은 개당 $2,500이지만 $500 차액을 면제한다.\n(A) $1,500 — 모니터 품목 금액이다.\n(B) $4,000 — 차액 면제로 $2,000×2가 되어 최초 주문액과 같아 정답.\n(C) $5,000 — 차액을 면제하지 않았을 때($2,500×2) 금액이다.\n(D) $12,150 — 주문서 총액(TOTAL DUE)이다.",
          "translation": null
        },
        {
          "prompt": "What is the deadline for Muze AI to respond to the email?",
          "choices": [
            "July 11, 5:00 P.M.",
            "July 12, 11:30 A.M.",
            "July 14, 5:00 P.M.",
            "August 5, 9:00 A.M."
          ],
          "answerIndex": 2,
          "explanation": "지문 2 마지막 단락에 'must confirm your choice by replying to this email by July 14 at 5:00 P.M.'라 나온다.\n(A) 7월 11일 오후 5시 — 주문일이지 회신 마감이 아니다.\n(B) 7월 12일 오전 11:30 — 지문에 없는 시각이다.\n(C) 7월 14일 오후 5시 — 회신 마감이라 정답.\n(D) 8월 5일 오전 9시 — 입고 예정일이다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-23",
      "no": 23,
      "title": "비즈니스 임대 계약서 및 중개업자의 조항 변경 안내 (이중 지문)",
      "category": "이중지문",
      "contextMap": "[지문 1: 임대 계약서 발췌] + [지문 2: 조건 변경 안내 서신] 이중 지문 구조입니다.\n· **[지문 1 = 계약 핵심 조항]** 임대인·임차인 정보, 월 임대료, 갱신 규정을 파악합니다.\n· **[지문 2 = 조건 변경·갱신 독촉]** 만료 전 인플레이션·리모델링을 이유로 임대료 인상을 통보합니다.\n· **[★연계 저격★]** 지문 1의 기존 금액과 지문 2의 인상률을 연계해 갱신 월세를 계산합니다.\n· **[마무리 = 거부 시 조치]** 미동의 시 언제까지 서면 통보해야 하는지 파악합니다.",
      "passage": "[Passage 1 — Lease Agreement Excerpt]\nCOMMERCIAL LEASE AGREEMENT (EXCERPT)\n\nThis non-residential lease agreement is executed on August 1, 2024, by and between APEX ASSET MANAGEMENT (Landlord) and SOCIAL BRAIN AI (Tenant).\n\n1. PREMISES:\nThe Landlord hereby leases to the Tenant the commercial office suite situated at 150 Teheran-ro, Gangnam-gu, Seoul, comprising exactly 4,500 square feet.\n\n2. TERM & BASE RENT:\nThe initial term shall be for a duration of two (2) years, commencing on September 1, 2024, and terminating on August 31, 2026. The Tenant agrees to remit a Base Monthly Rent of $10,000, payable on the first day of each calendar month.\n\n3. RENEWAL OPTION (SECTION 4A):\nThe Tenant maintains the exclusive option to renew this lease for an additional two-year duration. To exercise this option, the Tenant must provide written notice to the Landlord no later than forty-five (45) days prior to the initial termination date.\n\n4. UTILITIES & COMPLIANCE:\nThe Tenant is solely responsible for dedicated server room climate control operations and network infrastructure compliance fees. Underground reserved parking spaces are fixed at an auxiliary rate of $500 per month.\n\n───\n\n[Passage 2 — Letter]\nAPEX ASSET MANAGEMENT\n160 Teheran-ro, Gangnam-gu, Seoul | leasing@apex-asset.com\n\nJuly 11, 2026\n\nTo: Dae-hyun Soun, Facilities Operations Manager\nSocial Brain AI\n150 Teheran-ro, Gangnam-gu, Seoul\n\nDear Mr. Soun,\n\nAs we approach the scheduled termination date of your initial commercial lease agreement on August 31, 2026, we value Social Brain AI's tenure at our Teheran-ro property. In accordance with Section 4A of our executed contract, your window to formally exercise the two-year renewal option expires on July 18, 2026.\n\nTo support your ongoing LinkMD platform deployment and expansion into the agentic economy, we have recently finalized a comprehensive digital infrastructure upgrade throughout the building. This optimization includes the installation of centralized data cooling frameworks and synchronized multi-factor authentication (MFA) entry portals.\n\nIn light of these property modernizations and current market rates in Gangnam, the revised Base Monthly Rent for the renewal term (September 1, 2026 – August 31, 2028) will be adjusted to reflect a 5% increase over your current rate. All auxiliary parking fees and compliance provisions will remain completely locked in.\n\nPlease review the attached renewal addendum ledger. If you wish to secure this premier workspace, please return a signed copy to our leasing operations team before the July 18 deadline to avoid an administrative bottleneck or immediate lease termination.\n\nSincerely,\nJi-won Eom\nLeasing Director, Apex Asset Management",
      "questions": [
        {
          "prompt": "Who is the tenant named in the lease agreement excerpt?",
          "choices": [
            "Apex Asset Management",
            "Regional Commerce Institute",
            "Social Brain AI",
            "Muze AI"
          ],
          "answerIndex": 2,
          "explanation": "지문 1 서두에 'by and between APEX ASSET MANAGEMENT (Landlord) and SOCIAL BRAIN AI (Tenant)'라 나온다.\n(A) Apex Asset Management — 임대인(Landlord)이다.\n(B) Regional Commerce Institute — 계약 당사자가 아니다.\n(C) Social Brain AI — 임차인(Tenant)이라 정답.\n(D) Muze AI — 이 계약에 등장하지 않는다.",
          "translation": null
        },
        {
          "prompt": "According to the lease agreement, what is the size of the leased office space?",
          "choices": [
            "2,000 square feet",
            "4,500 square feet",
            "10,000 square feet",
            "12,500 square feet"
          ],
          "answerIndex": 1,
          "explanation": "지문 1 PREMISES에 'comprising exactly 4,500 square feet'라 나온다.\n(A) 2,000 sq ft — 지문에 없는 수치다.\n(B) 4,500 sq ft — 명시된 면적이라 정답.\n(C) 10,000 sq ft — 월 임대료($10,000)와 혼동한 함정이다.\n(D) 12,500 sq ft — 지문에 없는 수치다.",
          "translation": null
        },
        {
          "prompt": "Why did Mr. Eom send the letter to Mr. Soun?",
          "choices": [
            "To complain about a severe system downtime on the Supabase database",
            "To outline the parameters for renewing an upcoming commercial lease",
            "To authorize an automatic bank transfer for a server configuration fee",
            "To request an investment proposal for a disaster safety R&D project"
          ],
          "answerIndex": 1,
          "explanation": "지문 2 첫 단락에서 만료일이 다가와 갱신 옵션 조건을 안내한다.\n(A) Supabase DB 다운타임 항의 — 항의 서신이 아니다.\n(B) 다가오는 임대 갱신 조건 안내 — 서신 목적이라 정답.\n(C) 서버 구성비 자동이체 승인 — 이체 승인이 아니다.\n(D) 재난 안전 R&D 투자 제안 요청 — 무관하다.",
          "translation": null
        },
        {
          "prompt": "What will the new Base Monthly Rent be for Social Brain AI if they renew the lease?",
          "choices": [
            "$10,000",
            "$10,500",
            "$11,000",
            "$15,000"
          ],
          "answerIndex": 1,
          "explanation": "지문 1 기본 월세 $10,000에 지문 2 '5% increase over your current rate'를 적용한다.\n(A) $10,000 — 인상 전 현재 월세다.\n(B) $10,500 — $10,000×1.05로 5% 인상액이라 정답.\n(C) $11,000 — 10% 인상으로 오산한 함정이다.\n(D) $15,000 — 지문에 없는 금액이다.",
          "translation": null
        },
        {
          "prompt": "According to the letter, by what date must Social Brain AI formally submit their renewal decision?",
          "choices": [
            "August 1, 2024",
            "July 11, 2026",
            "July 18, 2026",
            "August 31, 2026"
          ],
          "answerIndex": 2,
          "explanation": "지문 2에서 'renewal option expires on July 18, 2026'이라 명시하고 마지막 단락에서 재차 강조한다.\n(A) 2024-08-01 — 계약 체결일이다.\n(B) 2026-07-11 — 서신 발송일이다.\n(C) 2026-07-18 — 갱신 결정 제출 마감이라 정답.\n(D) 2026-08-31 — 계약 만료일이다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-24",
      "no": 24,
      "title": "용역 입찰 제안 공고, 공급업체의 제안서, 최종 선정 결과 이메일 연계 (삼중 지문)",
      "category": "삼중지문",
      "contextMap": "[지문 1: 입찰 공고 RFP] + [지문 2: 입찰 제안서] + [지문 3: 선정 결과 이메일] 삼중 지문 구조입니다.\n· **[지문 1 = 발주처 요구 조건]** 필수 기술 스펙·예산 한도·마감 기한을 명시합니다.\n· **[지문 2 = 공급업체 응찰 내역]** 모듈별 기능·견적 비용·투입 인력을 표로 제시합니다.\n· **[지문 3 = 최종 조율·피드백]** 선정 이유와 옵션 수정 후 최종 계약 조치를 취합니다.\n· **[★삼중 크로스 매칭★]** 지문 2 단가표와 지문 3의 최종 선택을 결합해 실제 계약 금액을 도출합니다.",
      "passage": "[Passage 1 — Request for Proposals (RFP)]\nREQUEST FOR PROPOSALS: REGIONAL DISASTER SAFETY ONTOLOGY PROJECT\nIssued By: Jeonbuk Regional Innovation Committee\nRelease Date: July 1, 2026\n\nThe Jeonbuk Regional Innovation Committee is officially soliciting structured proposals from certified technology pioneers to construct a centralized Regional Disaster Safety R&D Platform. This multi-year public sector initiative focuses on synthesizing disparate environmental metadata into a singular dashboard with zero processing latency.\n\nStrict Administrative Controls:\n• Mandatory Compliance: All prospective platforms must integrate standard Supabase database architectures pre-configured with secure multi-factor authentication (MFA).\n• Financial Constraint: The absolute budget ceiling for the initial implementation phase is strictly capped at $50,000. Under no circumstances will higher bids be reviewed.\n• Delivery Deadline: Fully functional algorithmic beta endpoints must be deployed and ready for test simulations no later than August 1.\n\n───\n\n[Passage 2 — Bid Summary Excerpt]\nPROJECT BID SUMMARY: PROPOSAL #26-B\nSUBMITTED BY: Social Brain AI | Attn: James Albright, COO\nDATE OF SUBMISSION: July 8, 2026\n\nDEVELOPMENT MODULES & IMPLEMENTATION FEES\n-------------------------------------------------------------------\nMODULE CODE | FUNCTIONAL SCOPE                           | BASE LINE COST\n-------------------------------------------------------------------\nMOD-ONT-01  | Database Ontology Structural Setup         | $25,000\nMOD-API-KIS | KIS API Framework Synchronization          | $12,000\nMOD-SEC-MFA | Mandatory MFA Portal Implementation       | $8,000\nMOD-ANL-PRE | Next-Gen Predictive Analytics (Opt.)       | $10,000\n-------------------------------------------------------------------\nAuxiliary Add-on: Standard 1-year data cooling server storage warranty: $3,000.\n\nTechnical Lead: Sang-wook Ji (Master of Public Administration / 6-year tech lead).\n\n───\n\n[Passage 3 — Email]\nFrom: evaluation-team@jeonbuk-gov.org\nTo: j.albright@socialbrain-ai.com\nDate: July 11, 2026\nSubject: Final Selection Result: Proposal #26-B\n\nDear Mr. Albright,\n\nWe are pleased to inform you that the Jeonbuk Regional Innovation Committee has officially selected Social Brain AI as the primary technology vendor for our upcoming Regional Disaster Safety R&D Project based on Proposal #26-B.\n\nOur evaluation panel noted that your team leader, Mr. Ji, possesses an exceptional understanding of B2G administrative structures. Furthermore, your architecture completely satisfies our strict multi-factor authentication mandates with zero processing latency.\n\nTo remain perfectly aligned with our financial constraints, please be advised that our committee has approved your proposal excluding the optional predictive analytics module and the auxiliary warranty add-on. We will accept all other foundational modules as originally quoted.\n\nOur procurement team will dispatch the formal binding agreement ledger on Monday. Please ensure your engineering team is fully prepared to commence development immediately so that we can meet our unalterable August 1 deployment deadline.\n\nSincerely,\nMin-ah Song\nProject Director, Jeonbuk Regional Innovation Committee",
      "questions": [
        {
          "prompt": "According to the RFP, what is the maximum budget allowed for the initial phase?",
          "choices": [
            "$8,000",
            "$12,000",
            "$25,000",
            "$50,000"
          ],
          "answerIndex": 3,
          "explanation": "지문 1 Financial Constraint에 'budget ceiling ... strictly capped at $50,000'이라 나온다.\n(A) $8,000 — MFA 모듈 단가다.\n(B) $12,000 — KIS API 모듈 단가다.\n(C) $25,000 — 온톨로지 모듈 단가다.\n(D) $50,000 — 예산 상한이라 정답.",
          "translation": null
        },
        {
          "prompt": "What qualification of Social Brain AI's team leader is specifically praised in the email?",
          "choices": [
            "His extensive certification in commercial retail storefront design",
            "His exceptional understanding of government administrative structures",
            "His rapid implementation of automated quantitative trading bots",
            "His background in managing international software licensing disputes"
          ],
          "answerIndex": 1,
          "explanation": "지문 3에 'Mr. Ji possesses an exceptional understanding of B2G administrative structures'라 나온다.\n(A) 상업 소매 매장 설계 자격증 — 칭찬 대상이 아니다.\n(B) 정부 행정 구조에 대한 탁월한 이해 — B2G를 치환한 정답.\n(C) 자동 퀀트 트레이딩 봇의 신속한 구현 — 칭찬 포인트가 아니다.\n(D) 국제 소프트웨어 라이선스 분쟁 관리 경력 — 언급되지 않는다.",
          "translation": null
        },
        {
          "prompt": "What was the primary reason Social Brain AI's proposal was eligible for review over other potential over-budget bids?",
          "choices": [
            "Their total baseline cost for all four available modules was exactly $40,000.",
            "Their maximum possible combination fee including all options was beneath the $50,000 cap.",
            "They offered a complimentary 1-year data cooling server storage warranty.",
            "They completed the physical installation of Supabase servers in Seoul."
          ],
          "answerIndex": 1,
          "explanation": "지문 1은 상한 $50,000 초과 시 심사에서 제외한다. Social Brain AI의 핵심 이행 모듈(온톨로지 $25,000+KIS API $12,000+MFA $8,000=$45,000)이 상한 아래라 심사 대상이 됐다.\n(A) 네 모듈 기본 합이 정확히 $40,000 — 필수 3개 모듈 합은 $45,000이라 수치가 틀렸다.\n(B) 예산 상한 $50,000을 넘지 않아 검토 자격 — 상한 이내라 심사된 정답.\n(C) 무상 1년 데이터 냉각 워런티 제공 — 워런티는 유상 $3,000이다.\n(D) 서울에 Supabase 서버 물리 설치 완료 — 그런 언급은 없다.",
          "translation": null
        },
        {
          "prompt": "What will the final total contract price be for the approved project?",
          "choices": [
            "$37,000",
            "$45,000",
            "$48,000",
            "$55,000"
          ],
          "answerIndex": 1,
          "explanation": "지문 3에서 옵션 모듈($10,000)과 워런티($3,000)를 제외 승인한다. 지문 2의 남은 모듈 $25,000+$12,000+$8,000=$45,000이다.\n(A) $37,000 — 모듈 하나를 더 뺀 오산이다.\n(B) $45,000 — 승인된 세 모듈 합이라 정답.\n(C) $48,000 — 워런티만 빼고 옵션을 남긴 오산이다.\n(D) $55,000 — 옵션까지 포함해 승인 범위를 벗어난 금액이다.",
          "translation": null
        },
        {
          "prompt": "What is Social Brain AI expected to do by August 1?",
          "choices": [
            "Submit a revised written proposal with 15% pricing incentives",
            "Deploy fully functional algorithmic beta endpoints for testing",
            "Complete a mandatory 14-day training seminar for local staff",
            "Renew an existing corporate technology consulting agreement"
          ],
          "answerIndex": 1,
          "explanation": "지문 1·3 공통으로 '8월 1일까지 fully functional algorithmic beta endpoints를 배치'해야 한다.\n(A) 15% 가격 인센티브 담은 수정 제안서 제출 — 그런 요구는 없다.\n(B) 테스트용 알고리즘 베타 엔드포인트 배치 — 마감 과업이라 정답.\n(C) 지역 직원 대상 14일 교육 세미나 이수 — 언급되지 않는다.\n(D) 기존 기술 컨설팅 계약 갱신 — 무관하다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-25",
      "no": 25,
      "title": "제품 결함 불만 접수, 기술 리포트, 최종 보상 안내 (삼중 지문)",
      "category": "삼중지문",
      "contextMap": "[지문 1: 고객 불만 접수] + [지문 2: 기술 진단 리포트] + [지문 3: 보상 안내 서신] 삼중 지문 구조입니다.\n· **[지문 1 = 문제 현상 고지]** 장비 운영 중 발생한 장애 증상과 구매 날짜를 밝히며 항의합니다.\n· **[지문 2 = 전문 분석 데이터]** 엔지니어가 장애 핵심 원인과 결함 부품 코드를 표로 나열합니다.\n· **[지문 3 = 최종 솔루션·보상]** 진단 결과를 바탕으로 무상 교환·크레딧 등 합의안을 제시합니다.\n· **[★삼중 크로스 매칭★]** 지문 2의 결함 등급과 지문 3의 보상 규정을 엮어 최종 보상을 도출합니다.",
      "passage": "[Passage 1 — Email]\nFrom: d.soun@socialbrain-ai.com\nTo: support@apex-hardware.com\nDate: July 2, 2026\nSubject: Urgent Performance Failure: Data Storage Servers (Invoice #AP-2026-0711)\n\nDear Customer Support,\n\nI am writing to report a critical hardware anomaly regarding the two Data Storage Servers (Item Code: 'NX-DSS-01') procured from your facility on July 11.\n\nOver the past forty-eight hours, our engineering teams at the Gangnam campus have experienced severe data infrastructure disruptions during our localized Supabase database architecture synchronization trials. Specifically, the secondary server suffered an abrupt, permanent system shutdown during a manual database rollback simulation, resulting in unexpected processing latency and potential ledger corruption.\n\nGiven our tight operational timelines for the Jeonbuk Disaster Safety R&D project, we require an immediate diagnostic evaluation and equipment replacement under our early-bird enterprise procurement partnership contract terms.\n\nSincerely,\nDae-hyun Soun\nFacilities Operations Manager, Social Brain AI\n\n───\n\n[Passage 2 — Technical Diagnostic Report]\nAPEX HARDWARE DIAGNOSTIC LOG\nTICKET NUMBER: #TK-9942\nCLIENT: Social Brain AI\nDATE OF LOG: July 6, 2026\nINSPECTING ENGINEER: Min-seok Kang\nEQUIPMENT EVALUATED: Data Storage Server ('NX-DSS-01') Unit B\n\nHARDWARE COMPONENT DIAGNOSIS & FAULT ANALYSIS\n-------------------------------------------------------------------\nCOMPONENT   | FUNCTIONAL SCOPE                           | INSPECTION STATUS\n-------------------------------------------------------------------\nCP-CORE-90  | Central Processing Unit (CPU)              | Operational (Pass)\nBD-MAIN-X5  | Motherboard Power Utility Grid             | Critical Failure\nSD-SSD-4TB  | Supabase Storage Directory Core            | Operational (Pass)\nFN-COOL-02  | Data Cooling Circulation Fan               | Operational (Pass)\n-------------------------------------------------------------------\n\nRoot Cause Evaluation: Sudden thermal overloading triggered a massive utility grid disruption on the primary motherboard ('BD-MAIN-X5'), causing the automatic shutdown mechanism.\n\nClassification: Category A Structural Defect (Covered under full asset warranty protection).\n\n───\n\n[Passage 3 — Formal Letter]\nAPEX HARDWARE LOGISTICS\n75 Sejong-daero, Jongno-gu, Seoul\n\nJuly 11, 2026\n\nTo: Dae-hyun Soun, Facilities Operations Manager\nSocial Brain AI\n\nDear Mr. Soun,\n\nFollowing up on our engineering department's recent diagnostic evaluation (Ticket #TK-9942) completed on July 6, I am formally extending Apex Hardware Logistics' sincere apologies for the disruption to your Supabase synchronization trials.\n\nAccording to our corporate warranty ledger, hardware classified with a Structural Category A Defect qualifies for immediate, complimentary overnight express product replacement. We have already dispatched a brand-new, pre-configured 'NX-DSS-01' server to your Gangnam headquarters today, featuring an upgraded power grid architecture to build an exceptional future.\n\nFurthermore, to eliminate administrative bottlenecks and offset the processing latency your developers experienced, we have credited a financial incentive of $500 to your corporate procurement account. This credit can be applied directly to any future hardware token keys or terminal purchases.\n\nWe appreciate your collective patience as we modernize our client support frameworks.\n\nSincerely,\nJi-hoon Lee\nOperations Director, Apex Hardware Logistics",
      "questions": [
        {
          "prompt": "What specific problem did Mr. Soun report in his email?",
          "choices": [
            "An unexpected price adjustment for software licensing packages",
            "A server shutdown during a database rollback simulation",
            "A loss of multi-factor authentication hardware keys",
            "An error in the automated corporate payroll ledger"
          ],
          "answerIndex": 1,
          "explanation": "지문 1 둘째 단락에 'the secondary server suffered an abrupt, permanent system shutdown during a manual database rollback simulation'이라 나온다.\n(A) 소프트웨어 라이선스 가격 조정 — 불만 내용이 아니다.\n(B) DB 롤백 시뮬레이션 중 서버 셧다운 — 신고된 문제라 정답.\n(C) MFA 하드웨어 키 분실 — 언급되지 않는다.\n(D) 자동 급여 원장 오류 — 무관하다.",
          "translation": null
        },
        {
          "prompt": "Who performed the technical inspection on the failed hardware equipment?",
          "choices": [
            "Dae-hyun Soun",
            "Min-seok Kang",
            "Ji-hoon Lee",
            "James Albright"
          ],
          "answerIndex": 1,
          "explanation": "지문 2 상단에 'INSPECTING ENGINEER: Min-seok Kang'이라 나온다.\n(A) Dae-hyun Soun — 불만을 접수한 고객이다.\n(B) Min-seok Kang — 점검 엔지니어라 정답.\n(C) Ji-hoon Lee — 보상 서신을 보낸 운영 이사다.\n(D) James Albright — 이 지문에 점검자로 등장하지 않는다.",
          "translation": null
        },
        {
          "prompt": "Which specific hardware component caused the failure of the server at the Gangnam campus?",
          "choices": [
            "CP-CORE-90",
            "BD-MAIN-X5",
            "SD-SSD-4TB",
            "FN-COOL-02"
          ],
          "answerIndex": 1,
          "explanation": "지문 2 표에서 BD-MAIN-X5(Motherboard)만 Critical Failure이고, 원인 평가도 메인보드 전력 격자 붕괴를 지목한다.\n(A) CP-CORE-90 — CPU로 Operational(정상)이다.\n(B) BD-MAIN-X5 — 유일한 Critical Failure라 정답.\n(C) SD-SSD-4TB — 저장 코어로 정상이다.\n(D) FN-COOL-02 — 냉각 팬으로 정상이다.",
          "translation": null
        },
        {
          "prompt": "What remedy will Social Brain AI receive immediately at no extra cost because of the defect classification?",
          "choices": [
            "A full cash refund of $12,400 remitted to their account",
            "Free professional training seminars for their senior developers",
            "A complimentary replacement data storage server shipped overnight",
            "An extension on their B2G public sector project deadline"
          ],
          "answerIndex": 2,
          "explanation": "지문 2의 결함 등급 Category A와 지문 3의 'Category A Defect는 complimentary overnight express product replacement 자격'이 연계된다.\n(A) $12,400 전액 현금 환불 — 환불이 아니라 교체다.\n(B) 선임 개발자 무료 교육 세미나 — 제공 항목이 아니다.\n(C) 익일 배송 무상 대체 서버 — 무상 교체라 정답.\n(D) B2G 프로젝트 마감 연장 — 보상 항목이 아니다.",
          "translation": null
        },
        {
          "prompt": "How much credit did Apex Hardware Logistics add to Social Brain AI's corporate account?",
          "choices": [
            "$150",
            "$500",
            "$1,200",
            "$4,000"
          ],
          "answerIndex": 1,
          "explanation": "지문 3에 'credited a financial incentive of $500 to your corporate procurement account'라 나온다.\n(A) $150 — 배송비 항목 금액이다.\n(B) $500 — 계정에 적립된 크레딧이라 정답.\n(C) $1,200 — 터미널 단가로 무관하다.\n(D) $4,000 — 저장 서버 소계로 무관하다.",
          "translation": null
        }
      ]
    }
  ]
}
```
