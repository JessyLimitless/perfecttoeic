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
          "explanation": "지문 1 Key Responsibilities: 'Supervise data engineering teams during automated database rollback simulations'. data engineering teams를 team members로 받은 (D)."
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
          "explanation": "지문 1 How to Apply: 'submit ... directly to Min-seok Kang ... no later than July 20' → 날짜·수령인을 매칭한 (B)."
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
          "explanation": "지문 2 첫 문장: 'formally submit my credentials for the Senior Systems Architect position' → 채용 중인 기술직에 지원하는 (B)."
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
          "explanation": "지문 1 우대 조건 'developing quantitative trading bot systems' ↔ 지문 2 지원자가 'three automated quantitative trading bot algorithms 구축'. 두 지문을 연계한 (A)."
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
          "explanation": "지문 2 마지막 단락: 'two technical reference letters 첨부'. reference letters를 Letters of recommendation으로 재진술한 (C)."
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
          "explanation": "지문 1 NOTES: 'must be pre-configured with customized multi-factor authentication (MFA) protocols prior to dispatch' → (B)."
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
          "explanation": "지문 2에서 'SRV-SB-SSD' 드라이브가 backordered(재고 부족)임을 안내 → 특정 품목 품절을 알리는 (B)."
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
          "explanation": "지문 2: 'We do not anticipate receiving our next production allocation until August 5' → (C)."
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
          "explanation": "지문 1 원래 $2,000×2=$4,000. 지문 2 대체품은 개당 $2,500이지만 $500 차액을 면제 → 실질 $2,000×2로 최초 주문액과 동일한 (B)."
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
          "explanation": "지문 2 마지막 단락: 'must confirm your choice by replying to this email by July 14 at 5:00 P.M.' → (C)."
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
          "explanation": "지문 1 서두: 'by and between APEX ASSET MANAGEMENT (Landlord) and SOCIAL BRAIN AI (Tenant)'. 임차인은 (C)."
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
          "explanation": "지문 1 PREMISES: 'comprising exactly 4,500 square feet' → (B)."
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
          "explanation": "지문 2 첫 단락: 만료일이 다가와 갱신 옵션 조건을 안내한다 → 임대 갱신 조건을 설명하는 (B)."
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
          "explanation": "지문 1 기본 월세 $10,000 + 지문 2 '5% increase over your current rate' → $10,000×1.05=$10,500인 (B)."
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
          "explanation": "지문 2: 'renewal option expires on July 18, 2026'이라 명시하고 마지막 단락에서 재차 강조 → (C)."
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
          "explanation": "지문 1 Financial Constraint: 'budget ceiling ... strictly capped at $50,000' → (D)."
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
          "explanation": "지문 3: 'Mr. Ji possesses an exceptional understanding of B2G administrative structures'. B2G를 government administrative structures로 치환한 (B)."
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
          "explanation": "지문 1은 $50,000 초과 시 심사 제외인데, 지문 2 모듈을 모두 합한 최대 견적도 상한 아래여서 심사 대상이 된 (B)."
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
          "explanation": "지문 3에서 옵션 모듈($10,000)·워런티($3,000)를 제외 승인. 지문 2의 남은 모듈 $25,000+$12,000+$8,000=$45,000인 (B)."
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
          "explanation": "지문 1·3 공통: '8월 1일까지 fully functional algorithmic beta endpoints를 배치'해야 한다 → (B)."
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
          "explanation": "지문 1 둘째 단락: 'the secondary server suffered an abrupt, permanent system shutdown during a manual database rollback simulation' → (B)."
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
          "explanation": "지문 2 상단 'INSPECTING ENGINEER: Min-seok Kang' → (B)."
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
          "explanation": "지문 2 표에서 BD-MAIN-X5(Motherboard)만 Critical Failure, 원인 평가도 메인보드 전력 격자 붕괴를 지목 → (B)."
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
          "explanation": "지문 2 결함 등급 Category A ↔ 지문 3 'Category A Defect는 complimentary overnight express product replacement 자격'. 무상 대체 서버인 (C)."
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
          "explanation": "지문 3: 'credited a financial incentive of $500 to your corporate procurement account' → (B)."
        }
      ]
    }
  ]
}
```
