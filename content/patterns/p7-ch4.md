# Part 7 패턴학습 · CHAPTER 4 — 단일 지문 ④ 기사·양식·서식 (패턴 16~20)

```json
{
  "part": 7,
  "chapter": 4,
  "chapterTitle": "단일 지문 ④ 기사·양식·서식",
  "patterns": [
    {
      "id": "p7-pat-16",
      "no": 16,
      "title": "기업 인수합병 및 사업 확장 관련 언론 보도",
      "category": "기사",
      "contextMap": "비즈니스 경제 신문이 기업의 인수합병·확장 기사를 보도한다면?\n· **[도입: 기사 주제]** 헤드라인·첫 단락에서 어떤 기업이 다른 기업을 얼마에 인수했거나 특정 지역으로 확장했다는 핵심 팩트를 던집니다.\n· **[본론: 배경/시장 영향]** 인수 주도 기업의 주력 분야와 피인수 기업의 독점 기술·특허·공공 부문 네트워크 등 자산을 나열합니다. 인수 목적·기대 효과 추론 문제 단골.\n· **[정답 구역 - 업계 평가]** 시장 분석가·전문가의 향후 전망·업계 판도 변화 코멘트를 인용구와 함께 배치합니다.\n· **[마무리: 향후 절차]** 주총 최종 승인 일정이나 양사 시스템 통합·브랜드 명칭 변경 계획을 언급하며 마칩니다.",
      "passage": "SEOUL — In a definitive move that is set to reshape the landscape of the regional agentic economy, tech pioneer Social Brain AI announced on Friday that it has finalized a binding agreement to acquire Muze AI, a highly specialized automated document generation firm, for an estimated cash transaction valued at $12.5 million.\n\nThe strategic acquisition is expected to streamline operational workflows for both organizations. Social Brain AI, recognized for its advanced predictive data modeling and LinkMD knowledge base engine, intends to directly embed Muze AI's proprietary document generation software into its existing enterprise platforms. This infrastructure synthesis will allow the combined entity to aggressively penetrate the lucrative B2G (business-to-government) consulting markets, specifically in the Jeonbuk region where Muze AI already maintains strong institutional ties.\n\nIndustry analysts have responded favorably to the announcement. \"This transaction is a masterclass in architectural synergy,\" noted Min-ah Song, a senior technology analyst at the Regional Commerce Institute. \"By combining Muze AI's structured database ontology with Social Brain AI's expansive Supabase server resources, they effectively eliminate processing latency and create a powerhouse capable of securing major public sector contracts.\"\n\nUnder the terms of the agreement, Muze AI will operate as a wholly owned subsidiary of Social Brain AI. Hana Tanaka, the founding CEO of Muze AI, will transition into the role of Chief Innovation Officer for the parent company, while Social Brain AI's current Chief Operating Officer, James Albright, will oversee the structural budget and asset integration. The transaction is subject to standard regulatory approvals and is anticipated to close by the end of next month.",
      "questions": [
        {
          "prompt": "What is the main topic of the article?",
          "choices": [
            "A drop in the stock price of a major server infrastructure company",
            "The acquisition of a specialized software firm by a technology pioneer",
            "A licensing dispute between Social Brain AI and external legal consultants",
            "The opening of a new regional data analytics facility in Jeonbuk"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락: 'Social Brain AI가 자동 문서 생성 전문 기업 Muze AI를 1,250만 달러에 인수하는 구속력 있는 계약을 완료했다'. 기업 인수 소식 (B)."
        },
        {
          "prompt": "Why does Social Brain AI intend to purchase Muze AI?",
          "choices": [
            "To permanently relocate its core developers to a retail storefront network",
            "To integrate automated document generation tools into its platforms",
            "To avoid a compliance penalty regarding multi-factor authentication",
            "To clear outdated browser cache files from its centralized network"
          ],
          "answerIndex": 1,
          "explanation": "두 번째 단락: 'Muze AI의 독점 문서 생성 소프트웨어를 자사 기업 플랫폼에 직접 내장할 계획(embed)'. (B) integrate automated document generation tools."
        },
        {
          "prompt": "What is indicated about Ms. Tanaka?",
          "choices": [
            "She will manage the financial auditing logs for the regional government.",
            "She is scheduled to speak at an international AI ethics symposium next month.",
            "She will become the Chief Innovation Officer at Social Brain AI.",
            "She rejected the initial cash transaction value proposed by James Albright."
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락: 'Muze AI 설립자 타나카 하나는 모회사(Social Brain AI)의 최고혁신책임자(CIO)로 전환 예정'. (C) become the Chief Innovation Officer at Social Brain AI."
        }
      ]
    },
    {
      "id": "p7-pat-17",
      "no": 17,
      "title": "시장 동향 보고서 및 거점 지역 산업 분석 리포트",
      "category": "기사",
      "contextMap": "국책 연구소나 민간 경제 연구소에서 발행한 산업 동향 리포트를 읽는 지문입니다.\n· **[도입 = 리포트 주제]** 어느 지역·기술 분과에 혁신이나 자본 유입이 집중되는지 리포트 범위를 제시합니다.\n· **[본론 = 수치·트렌드 팩트]** 성장률·스타트업 유치 개수·정부 예산 등 통계 수치를 나열 → 증감·인프라 특징 팩트 체크.\n· **[정답 구역 = 당면 과제]** 성장을 촉진한 요인 또는 해결해야 할 병목(전문 인력 부족·규제)을 짚습니다.\n· **[마무리 = 향후 전망·제언]** 시장의 단기·장기 진화 전망과 정책 제언으로 마무리합니다.",
      "passage": "EXECUTIVE SUMMARY: THE ASCENT OF TECH HUBS IN THE JEONBUK REGION\n\nA comprehensive evaluation of southern industrial corridors indicates that the Jeonbuk region is rapidly transitioning into a primary hub for specialized B2G (business-to-government) technology consulting and database ontology development. Over the past twenty-four months, the regional government has aggressively reallocated approximately $45 million of its annual infrastructure budget to foster collaborative research projects and digital compliance initiatives.\n\nThis deliberate capital infusion has already yielded measurable results. The institute's predictive data models show that seventy-five new technology startups have established their headquarters within the region since early 2025. This localized cluster effect is heavily supported by the proximity of major cloud service directories and integrated Supabase server installations, which effectively mitigate system latency for high-performance operations.\n\nHowever, the report highlights a critical bottleneck that could potentially hinder long-term scalability: an acute deficit of senior solutions architects and compliance data scientists. While early-stage funding remains abundant, local technology pioneers are increasingly forced to secure external technology vendors from Seoul to maintain their technical deployment timelines.\n\nTo build an exceptional future and sustain this economic momentum, the regional commerce committee highly recommends implementing targeted payroll tax credits. These financial incentives should be specifically designed to attract top-tier data architects who can manage complex metadata structures and eliminate administrative latency for regional public sector operations.",
      "questions": [
        {
          "prompt": "What is the primary focus of the report?",
          "choices": [
            "A price adjustment for premium enterprise software subscriptions",
            "The economic and technological growth of a specific regional area",
            "A structural dispute regarding internal network security protocols",
            "The upcoming retirement of a senior technology consulting director"
          ],
          "answerIndex": 1,
          "explanation": "헤드라인 'THE ASCENT OF TECH HUBS IN THE JEONBUK REGION'과 첫 문장에서 전북 지역이 B2G 기술 중심지로 전환 중이라 분석한다. 특정 지역의 경제·기술적 성장을 다룬 (B)."
        },
        {
          "prompt": "According to the report, what asset helps reduce system latency in the region?",
          "choices": [
            "Personalized multi-factor authentication tools",
            "Integrated Supabase server installations",
            "Manual database rollback software templates",
            "Standardized client communication logs"
          ],
          "answerIndex": 1,
          "explanation": "둘째 단락 마지막 문장: 'integrated Supabase server installations가 system latency를 효과적으로 완화한다'. 기술 명칭을 그대로 매칭한 (B)."
        },
        {
          "prompt": "What problem does the report identify as a barrier to long-term scalability?",
          "choices": [
            "A lack of available commercial office space for immediate lease",
            "A shortage of highly skilled senior technology professionals",
            "An abrupt revocation of automated access tokens",
            "Inadequate funding allocations from public sector bodies"
          ],
          "answerIndex": 1,
          "explanation": "셋째 단락 However 뒤 병목으로 'an acute deficit of senior solutions architects'를 지목. acute deficit을 shortage로 패러프레이징한 (B)."
        }
      ]
    },
    {
      "id": "p7-pat-18",
      "no": 18,
      "title": "주문서, 송장 및 구매 대금 청구서",
      "category": "양식",
      "contextMap": "송장(Invoice)·청구서 양식 지문입니다.\n· **[도입 = 상단 정보 팩트]** 거래 당사자, 송장 번호, 결제·발행 날짜를 먼저 확인합니다.\n· **[본론 = 표 데이터·계산]** 품목·단가·수량을 매칭하고 할인율을 대조해 실제 청구액을 계산합니다.\n· **[정답 구역 = 비고란 조건]** 표 하단의 연체료·환불·배송 특이 조항을 스캔합니다.\n· **[마무리 = 후속 조치]** 금액 정정·결제 확인을 위해 어느 부서로 연락하는지 확인합니다.",
      "passage": "INVOICE TO:\nSocial Brain AI\nAttn: Dae-hyun Soun\n150 Teheran-ro, Gangnam-gu, Seoul\n\nFROM:\nAPEX HARDWARE LOGISTICS\n75 Sejong-daero, Jongno-gu, Seoul\n\nINVOICE DETAILS:\nInvoice Number: #AP-2026-0711\nDate of Issue: July 11, 2026\nPayment Due Date: July 25, 2026\n\n-----------------------------------------------------------\nITEM CODE   | DESCRIPTION               | QTY | UNIT PRICE | TOTAL\n-----------------------------------------------------------\nNX-DSS-01   | Data Storage Server       | 2   | $4,000     | $8,000\nNX-TERM-05  | High-Performance Terminal | 5   | $1,200     | $6,000\nAPI-MFA-99  | MFA Hardware Token Keys   | 10  | $150       | $1,500\n-----------------------------------------------------------\nSUBTOTAL:                                              $15,500\n20% DISCOUNT:                                         -$3,100\nSHIPPING:                                         COMPLIMENTARY\nTOTAL DUE:                                             $12,400\n\nNOTES:\nThe 20% discount reflected above has been automatically locked in under the terms of our early-bird enterprise procurement partnership contract. Payment must be remitted in full via our secure client portal by 5:00 P.M. on the due date. A late compliance penalty fee of 5% will be applied weekly to any outstanding balance remaining after July 25, 2026.\n\nFor hardware configuration inquiries or database ontology synchronization guidelines, please contact our technical support division at support@apex.com.",
      "questions": [
        {
          "prompt": "For which company does Dae-hyun Soun most likely work?",
          "choices": [
            "Apex Hardware Logistics",
            "Regional Commerce Institute",
            "Social Brain AI",
            "Muze AI"
          ],
          "answerIndex": 2,
          "explanation": "송장 상단 'INVOICE TO: Social Brain AI'와 그 아래 'Attn: Dae-hyun Soun' → 수령처에 근무하는 (C)."
        },
        {
          "prompt": "How much did Social Brain AI save through the early-bird contract discount?",
          "choices": [
            "$1,500",
            "$3,100",
            "$12,400",
            "$15,500"
          ],
          "answerIndex": 1,
          "explanation": "청구 요약의 '20% DISCOUNT: -$3,100'이 얼리버드 계약으로 차감된 절약액임을 NOTES에서도 확인 → (B)."
        },
        {
          "prompt": "What will happen if the invoice balance is not settled by July 25, 2026?",
          "choices": [
            "The multi-factor authentication tokens will be revoked.",
            "An additional late penalty fee will be charged weekly.",
            "The data storage servers will be shipped back to the vendor.",
            "A comprehensive manual database rollback will be executed."
          ],
          "answerIndex": 1,
          "explanation": "NOTES: '7월 25일 이후 남은 잔액에 주당 5% 연체료 부과' → 매주 연체료가 추가된다는 (B)."
        }
      ]
    },
    {
      "id": "p7-pat-19",
      "no": 19,
      "title": "출장, 여행 및 사내 연수 세부 일정표",
      "category": "일정표",
      "contextMap": "출장 스케줄러·연수 일정표(Itinerary) 양식 지문입니다.\n· **[도입 = 상단 개요]** 행사 명칭·참가(출장)자·기간·거점 장소를 확인합니다.\n· **[본론 = 타임라인 크로스체크]** 날짜·시간대별 활동을 스캔해 특정 시각의 장소·활동을 연결합니다.\n· **[정답 구역 = 예외 조건·주석]** 하단 주석의 식사·교통·필수 지참물 조항을 정밀 타격합니다.\n· **[마무리 = 변경 시 연락처]** 일정 변동·비상 시 연락할 담당자를 파악합니다.",
      "passage": "OFFICIAL ITINERARY: JEONBUK DISASTER SAFETY R&D PROJECT\nField Inspection & Ontology Workshop\n\nTraveler: James Albright (Chief Operating Officer, Social Brain AI)\nDuration: July 16 – July 17, 2026\nLocation: Jeonbuk Regional Innovation Campus & Public Data Center\n\n----------------------------------------------------------------------\nDATE              | TIME       | ACTIVITY / SESSION           | LOCATION\n----------------------------------------------------------------------\nThursday, July 16 | 09:00 A.M. | Express Train Departure (KTX) | Seoul Station\n                  | 11:30 A.M. | Welcome Briefing & Review    | Seminar Room A\n                  | 01:00 P.M. | Group Networking Luncheon   | Campus Cafeteria\n                  | 02:30 P.M. | Infrastructure Tech Tour     | Server Facility\n----------------------------------------------------------------------\nFriday, July 17   | 09:30 A.M. | Database Ontology Session    | Lab Block 4\n                  | 01:00 P.M. | Specialized B2G Forum        | Main Auditorium\n                  | 04:30 P.M. | Final Evaluation & Wrap-up   | Boardroom 201\n                  | 07:00 P.M. | Return Train Departure (KTX) | Jeonju Station\n----------------------------------------------------------------------\n\nADDITIONAL NOTES & COMPLIANCE RULES:\n• The Group Networking Luncheon on Thursday is complimentary and fully sponsored by the Regional Technology Commerce Institute.\n• All personnel must wear their active corporate identification badges visibly at all times to secure entry into the public server facility due to enhanced multi-factor authentication (MFA) restrictions.\n• Standard travel reimbursement requests, including train receipts and lodging ledgers, must be submitted digitally through our secure client portal no later than July 24.",
      "questions": [
        {
          "prompt": "Who is the primary traveler for this scheduled trip?",
          "choices": [
            "Min-seok Kang",
            "James Albright",
            "Hana Tanaka",
            "Dae-hyun Soun"
          ],
          "answerIndex": 1,
          "explanation": "일정표 상단 'Traveler: James Albright (Chief Operating Officer, Social Brain AI)' 명시 → (B)."
        },
        {
          "prompt": "According to the itinerary, what will take place at 2:30 P.M. on Thursday, July 16?",
          "choices": [
            "A database ontology synchronization session",
            "A tour of the server infrastructure facility",
            "A strategic virtual signing ceremony",
            "An evaluation meeting in Boardroom 201"
          ],
          "answerIndex": 1,
          "explanation": "7월 16일 02:30 P.M. 행이 'Infrastructure Tech Tour / Server Facility' → 서버 인프라 시설 투어인 (B)."
        },
        {
          "prompt": "What is a requirement for attending the tour at the server facility?",
          "choices": [
            "Downloading a 14-day free trial code via personal mobile numbers",
            "Presenting a signed hard copy of the revised remote work policy",
            "Wearing a valid company identification badge visibly",
            "Clearing internet browser cache files prior to arrival"
          ],
          "answerIndex": 2,
          "explanation": "주석 둘째 항목: 서버 시설 진입 시 'All personnel must wear their corporate identification badges visibly'. company identification badge로 패러프레이징한 (C)."
        }
      ]
    },
    {
      "id": "p7-pat-20",
      "no": 20,
      "title": "사내 설문조사 결과 보고 및 피드백 요약 서식",
      "category": "양식",
      "contextMap": "인사·운영팀이 공지하는 사내 설문조사 결과 요약 서식 지문입니다.\n· **[도입 = 조사 개요]** 목적·대상 부서·총 참여자 수·조사 기간을 상단에서 파악합니다.\n· **[본론 = 수치·만족도 대조]** 문항별 평균 점수·찬성률을 비교해 최고·최저 항목을 찾습니다.\n· **[정답 구역 = 서술형 피드백]** 수치 표 아래 직원 건의·불만 요인 요약을 정밀 타격합니다.\n· **[마무리 = 향후 액션 플랜]** 결과에 따른 경영진의 구체적 보완 조치를 확인합니다.",
      "passage": "INTERNAL SURVEY SUMMARY: NEW SUPABASE API INTEGRATION\nOperations & Employee Feedback Report\n\nTarget Audience: Senior Developers & Data Science Personnel\nTotal Respondents: 120 Staff Members | Survey Duration: July 1 – July 8, 2026\nIssued By: HR Operations & IT Infrastructure Department\n\nSURVEY EVALUATION METRICS (Scale: 1 to 5, 5 being Highly Satisfied)\n-------------------------------------------------------------------\nASSESSMENT CATEGORY                             | AVERAGE SCORE | APPROVAL %\n-------------------------------------------------------------------\n1. Processing Speed & Latency Reduction         | 4.7           | 94%\n2. Multi-Factor Authentication Security         | 4.2           | 84%\n3. Database Ontology Synchronization            | 3.1           | 62%\n4. User Interface Navigation Dashboard          | 4.5           | 90%\n-------------------------------------------------------------------\n\nKEY EMPLOYEE COMMENTS & QUALITATIVE FEEDBACK:\n• Staff members expressed exceptional satisfaction with the complete elimination of system latency during enterprise data modeling operations.\n• However, Category 3 received the lowest rating because developers encountered repeated configuration tracking errors during manual database rollback simulations.\n• Many respondents highly recommended creating a comprehensive Markdown-based knowledge base directory to standardize metadata structures across different teams.\n\nNEXT ACTION PLAN BY MANAGEMENT:\nTo address the synchronization bottlenecks, the tech support division will deploy a dedicated database architecture consultant on July 20 to host an intensive troubleshooting seminar.",
      "questions": [
        {
          "prompt": "What was the main purpose of the survey?",
          "choices": [
            "To evaluate a new software licensing agreement with an external vendor",
            "To gather staff feedback on a recently integrated database system",
            "To determine employee preference for a revised remote work policy",
            "To select a location for the upcoming public sector research facility"
          ],
          "answerIndex": 1,
          "explanation": "제목 'INTERNAL SURVEY SUMMARY: NEW SUPABASE API INTEGRATION' → 연동된 데이터베이스 시스템에 대한 직원 피드백을 모은 (B)."
        },
        {
          "prompt": "Which evaluation category received the lowest satisfaction score?",
          "choices": [
            "Processing Speed & Latency Reduction",
            "Multi-Factor Authentication Security",
            "Database Ontology Synchronization",
            "User Interface Navigation Dashboard"
          ],
          "answerIndex": 2,
          "explanation": "표에서 'Database Ontology Synchronization'이 평점 3.1·찬성률 62%로 최저이고 피드백에서도 Category 3 최저라 명시 → (C)."
        },
        {
          "prompt": "What does management plan to do on July 20?",
          "choices": [
            "Execute a binding agreement to permanently acquire a technology partner",
            "Cancel all active terminal accounts to implement password modernization",
            "Provide a highly specialized technical training session to resolve an issue",
            "Relocate the central data cooling frameworks to the Gangnam campus"
          ],
          "answerIndex": 2,
          "explanation": "NEXT ACTION PLAN: '7월 20일 전담 컨설턴트를 투입해 집중 troubleshooting seminar 개최'. 전문 기술 교육 세션 제공으로 패러프레이징한 (C)."
        }
      ]
    }
  ]
}
```
