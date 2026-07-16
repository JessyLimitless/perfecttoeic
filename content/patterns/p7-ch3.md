# Part 7 패턴학습 · CHAPTER 3 — 단일 지문 ③ 광고·공지·안내문 (패턴 11~15)

```json
{
  "part": 7,
  "chapter": 3,
  "chapterTitle": "단일 지문 ③ 광고·공지·안내문",
  "patterns": [
    {
      "id": "p7-pat-11",
      "no": 11,
      "title": "부동산 매물 및 오피스 공간 임대 광고",
      "category": "광고",
      "contextMap": "부동산 중개업체나 자산관리회사가 비즈니스 오피스 임대 광고를 올린다면?\n· **[도입: 매물 소개]** 중심 업무 지구(CBD)나 역세권에 위치한 최상급 사무실 공간이 임대로 나왔음을 헤드라인과 함께 강조합니다.\n· **[본론: 이점 나열/NOT True 문제]** 회의실 인프라·전용 주차장·보안 시스템 등 오피스가 갖춘 구체적 혜택을 나열합니다. 포함되지 않은 옵션을 고르는 NOT 문제 단골.\n· **[정답 구역 - 타깃층]** 이 공간이 IT 스타트업·벤처·소규모 연구소 등에 얼마나 최적화되어 있는지 명시합니다.\n· **[마무리: 행동 유도]** 즉시 입주 가능함을 알리며 현장 투어 예약·브로셔 다운로드 연락처를 제공합니다.",
      "passage": "PREMIUM OFFICE SPACE AVAILABLE FOR IMMEDIATE LEASE\nPrime Location in Gangnam's Business District\n\nAre you searching for the perfect environment to scale your enterprise operations? Apex Asset Management is proud to present a newly renovated, state-of-the-art office suite located at 150 Teheran-ro, Gangnam-gu—the absolute epicenter of Seoul's advanced technology and consulting sectors.\n\nThis exceptional space spanning 4,500 square feet is ideally configured for growing data science firms, legal compliance teams, or fast-growing IT startups. The layout features a flexible open-plan workflow workspace, three private executive offices, and a spacious boardroom fully equipped with integrated teleconferencing frameworks.\n\nKey Amenities Include:\n• Secured 24/7 access with customized multi-factor authentication (MFA) protocols.\n• Dedicated server room featuring standalone climate control and fiber-optic Internet connectivity.\n• Direct integration setup optimized for localized Supabase database architectures.\n• Underground reserved parking with electric vehicle charging terminals.\n• Complimentary daily maintenance and janitorial services.\n\nThe property is available for immediate occupancy under highly competitive, flexible leasing terms. Substantial pricing incentives are available for corporate clients who commit to an initial duration of two years or longer.\n\nTo schedule a private virtual or on-site tour of the facility, please contact our leasing operations team today at leasing@apex-asset.com or visit our secure client portal. Don't miss this opportunity to build an exceptional future for your business!",
      "questions": [
        {
          "prompt": "What is the main purpose of the advertisement?",
          "choices": [
            "To recruit experienced data scientists for an asset management firm",
            "To advertise available commercial office space for rent",
            "To announce the structural relocation of an IT startup's headquarters",
            "To promote a new multi-factor authentication network security software"
          ],
          "answerIndex": 1,
          "explanation": "헤드라인 'PREMIUM OFFICE SPACE AVAILABLE FOR IMMEDIATE LEASE'와 함께 강남 테헤란로 사무실 매물을 홍보한다.\n(A) 자산운용사가 데이터 과학자를 채용 — 채용 광고가 아니라 임대 광고다.\n(B) 임대 가능한 상업용 사무실 홍보 — for lease 광고라 정답.\n(C) IT 스타트업 본사 이전 발표 — 이전 발표가 아니라 임대 매물 소개다.\n(D) 새 MFA 보안 소프트웨어 홍보 — MFA는 사무실의 편의시설일 뿐 광고 대상이 아니다.",
          "translation": null
        },
        {
          "prompt": "What is NOT mentioned as an amenity included with the property?",
          "choices": [
            "Around-the-clock secured building access",
            "On-site dining facilities and corporate catering",
            "Fiber-optic Internet and dedicated server rooms",
            "Reserved parking zones with electric vehicle chargers"
          ],
          "answerIndex": 1,
          "explanation": "NOT 문제이므로 Key Amenities 목록에 있는 것을 지운다.\n(A) 24시간 보안 건물 출입 — Secured 24/7 access로 언급됨(오답).\n(B) 구내 식당·기업 케이터링 — 지문 어디에도 없어 정답(NOT mentioned).\n(C) 광인터넷·전용 서버실 — Dedicated server room ... fiber-optic으로 언급됨(오답).\n(D) 전기차 충전기 있는 지정 주차 — Underground reserved parking with EV charging으로 언급됨(오답).",
          "translation": null
        },
        {
          "prompt": "How can a prospective tenant arrange a viewing of the office suite?",
          "choices": [
            "By submitting an investment proposal via fax",
            "By attending a virtual signing ceremony on Monday",
            "By contacting the leasing team via email or the portal",
            "By visiting the Gangnam municipal government office"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락에서 투어 일정은 '임대 운영 팀에 이메일로 연락하거나 보안 포털을 방문하라'고 안내한다.\n(A) 팩스로 투자 제안서 제출 — 팩스 제출 안내는 없다.\n(B) 월요일 화상 서명식 참석 — 서명식 언급은 없다.\n(C) 이메일이나 포털로 임대팀에 연락 — 지문 안내와 일치해 정답.\n(D) 강남 시청 방문 — 시청 방문 안내는 없다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-12",
      "no": 12,
      "title": "업무용 기기 및 비즈니스 소프트웨어 할인 광고",
      "category": "광고",
      "contextMap": "기술 소프트웨어 벤더나 IT 솔루션 기업이 비즈니스 프로그램 할인 광고를 올린다면?\n· **[도입: 제품/혜택 소개]** 비용 절감과 데이터 효율성을 보장하는 최신 소프트웨어·업무 기기가 파격 할인가로 나왔음을 강조합니다.\n· **[본론: 가격 매칭 문제]** 패키지 등급별(Standard·Enterprise 등) 가격대와 각 등급 라이선스 권한을 나열합니다. 사용자 수·기능에 맞는 최적 요금제 매칭 빈출.\n· **[정답 구역 - 추가 혜택]** 프로모션 기간 가입 시 기술 지원 무료 제공·기존 데이터 무상 연동 혜택을 명시합니다.\n· **[마무리: 행동 유도]** 한정 기간 할인임을 강조하며 데모 다운로드·상담 신청 웹사이트 링크를 제공합니다.",
      "passage": "REVOLUTIONIZE YOUR ENTERPRISE WORKFLOWS\nGet 30% Off Muze AI's Automated Document Generation Suite!\n\nAre your consulting and legal teams still spending countless hours manually drafting B2G project ledgers and digital compliance frameworks? Upgrade your corporate infrastructure today with Muze AI's state-of-the-art automated predictive platform.\n\nTrusted by over 500 public sector contractors, our software utilizes advanced data ontology architecture to generate audit-ready business documentation with zero processing latency.\n\nUntil August 15, we are offering an exclusive 30% discount on all new annual subscription tiers!\n\nChoose the Perfect Plan for Your Firm:\n• Standard Tier ($2,500/year): Up to 10 active terminal accounts, standard cloud directory storage, and secure Supabase API framework synchronization.\n• Enterprise Tier ($5,500/year Before Discount): Unlimited user accounts, priority access to next-generation predictive data models, and automated compliance verification.\n\nExclusive Promotional Perks:\nCorporate clients who secure an Enterprise Tier subscription during this promotional window will receive complimentary, round-the-clock technical support and a dedicated solutions architect to oversee their initial network integration setup at no extra cost.\n\nDownload a 14-day free trial directly through our secure client portal at www.muze-ai.com/suite. Don't let administrative bottlenecks slow down your business growth—modernize your systems today!",
      "questions": [
        {
          "prompt": "What product is being advertised?",
          "choices": [
            "A financial consulting service for public sector mergers",
            "A software package for automated document generation",
            "A cloud-based network storage drive for retail businesses",
            "A quantitative trading bot algorithm using the KIS API"
          ],
          "answerIndex": 1,
          "explanation": "헤드라인 'Automated Document Generation Suite 30% 할인'과 문서 자동 생성 플랫폼 설명이 이어진다.\n(A) 공공 합병 재무 컨설팅 서비스 — 컨설팅 서비스가 아니라 소프트웨어다.\n(B) 자동 문서 생성 소프트웨어 패키지 — 정답.\n(C) 소매업용 클라우드 저장 드라이브 — 저장 드라이브가 아니라 문서 생성 스위트다.\n(D) KIS API 이용 퀀트 트레이딩 봇 — 트레이딩 봇이 아니다.",
          "translation": null
        },
        {
          "prompt": "What is indicated about the Enterprise Tier subscription?",
          "choices": [
            "It restricts active terminal accounts to a maximum of ten.",
            "It includes a 14-day mandatory training seminar for staff members.",
            "It provides unlimited user access and automated compliance tools.",
            "It is available for a locked-in duration of three full years."
          ],
          "answerIndex": 2,
          "explanation": "Enterprise Tier 항목에 '무제한 사용자 계정(Unlimited user accounts)'과 '자동 준수 검증(automated compliance verification)'이 나온다.\n(A) 활성 계정을 최대 10개로 제한 — 10개 제한은 Standard Tier의 조건이다.\n(B) 14일 의무 교육 세미나 포함 — 14일은 무료 체험 기간이지 교육 세미나가 아니다.\n(C) 무제한 사용자 접근과 자동 준수 도구 제공 — 지문과 일치해 정답.\n(D) 만 3년 고정 기간으로 제공 — 3년 기간 언급은 없다(연간 구독).",
          "translation": null
        },
        {
          "prompt": "What is offered as a special perk for clients purchasing the Enterprise Tier plan?",
          "choices": [
            "Free technical support and integration assistance",
            "An automated database rollback scheduled every midnight",
            "Complimentary legal consulting for regional B2G markets",
            "Cash bonuses for every new executive referral submitted"
          ],
          "answerIndex": 0,
          "explanation": "Exclusive Promotional Perks에 엔터프라이즈 구매 고객에게 '무료 24시간 기술 지원'과 연동 감독을 '추가 비용 없이' 제공한다고 나온다.\n(A) 무료 기술 지원과 연동 지원 — 지문과 일치해 정답.\n(B) 매 자정 자동 DB 롤백 — 롤백 혜택 언급은 없다.\n(C) 지역 B2G 무료 법률 컨설팅 — 법률 컨설팅 혜택은 없다.\n(D) 임원 추천마다 현금 보너스 — 추천 보너스는 다른 지문의 소재다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-13",
      "no": 13,
      "title": "비즈니스 워크숍 및 전문 직무 교육 세미나 안내",
      "category": "광고",
      "contextMap": "전문 교육 기관이나 컨설팅 펌이 직무 세미나 광고를 올린다면?\n· **[도입: 행사 개요]** 날짜·장소·주제를 제시하며 업계 최고 전문가가 이끄는 직무 역량 강화 워크숍 개최를 홍보합니다.\n· **[본론: 세부 정보 문제]** 세션별로 어떤 구체적 기술·실무 노하우(데이터 모델링·시스템 연동)를 다루는지 나열합니다. 특정 시간 진행 내용을 매칭하는 문제 단골.\n· **[정답 구역 - 참가 혜택]** 등록 시 제공되는 고급 교재·실습 스크립트 예제·수료증(Certification) 지급 혜택을 명시합니다.\n· **[마무리: 행동 유도]** 좌석이 한정됨을 강조하며 등록 마감 기한과 참가 신청 온라인 포털 주소를 제공합니다.",
      "passage": "UPGRADE YOUR TECH ARCHITECTURE\nAdvanced Enterprise Data Modeling Workshop\n\nIs your firm prepared to navigate the complexities of the evolving agentic economy? The Regional Technology Commerce Institute invites your senior developers and database engineers to participate in our quarterly intensive training seminar.\n\nDate: Friday, July 24\nLocation: Main Conference Hall, Social Brain AI HQ (150 Teheran-ro, Seoul)\nKeynote Speaker: Ms. Hana Tanaka, Lead Solutions Architect at Muze AI\n\nThis highly specialized, full-day workshop is intentionally designed to equip technology pioneers with actionable strategies for building scalable systems. Participants will get hands-on experience structuring advanced database ontology architectures and optimizing real-time predictive data models.\n\nWorkshop Schedule:\n• 09:00 A.M. - 12:00 P.M. Understanding Enterprise Metadata and System Synchronization\n• 12:00 P.M. - 01:30 P.M. Complimentary Networking Luncheon (Provided on-site)\n• 01:30 P.M. - 05:00 P.M. Live Simulation: Deploying Custom API Endpoints via Supabase\n\nRegistration Details:\nThe standard registration fee is $450 per person, which includes all digital course materials, pre-configured Python script extensions, and an official completion certificate. Corporate groups registering three or more employees from the same firm are eligible for a 15% group discount.\n\nDue to hands-on workstation limitations, seating is strictly restricted to 40 participants. Secure your reservation through our secure client portal at www.rt-institute.org/register no later than July 17 to ensure your seat.",
      "questions": [
        {
          "prompt": "What is the main objective of the advertised event?",
          "choices": [
            "To celebrate the opening of Social Brain AI's new corporate headquarters",
            "To provide advanced professional training on data systems and modeling",
            "To recruit full-time database engineering staff for the RT Institute",
            "To announce a price adjustment for automated document generation tools"
          ],
          "answerIndex": 1,
          "explanation": "헤드라인 'Advanced Enterprise Data Modeling Workshop'과 첫 단락의 intensive training seminar가 핵심이다.\n(A) 소셜브레인 신본사 개소 축하 — 개소 축하가 아니라 교육 워크숍이다(본사는 행사 장소일 뿐).\n(B) 데이터 시스템·모델링 전문 교육 제공 — training seminar라 정답.\n(C) RT Institute의 정규 엔지니어 채용 — 채용이 아니라 교육이다.\n(D) 문서 생성 도구 가격 조정 발표 — 가격 조정이 아니다.",
          "translation": null
        },
        {
          "prompt": "According to the schedule, what will participants do during the afternoon session?",
          "choices": [
            "Listen to a speech about public sector B2G compliance frameworks",
            "Practice implementing custom API connections using Supabase",
            "Review financial auditing logs with external consulting vendors",
            "Clear browser cache files on their active terminal accounts"
          ],
          "answerIndex": 1,
          "explanation": "오후 세션(01:30~05:00)은 'Live Simulation: Deploying Custom API Endpoints via Supabase'이다.\n(A) B2G 준수 프레임워크 강연 청취 — 지정 오후 실습 내용이 아니다.\n(B) Supabase로 맞춤 API 연결 실습 — 오후 실습과 일치해 정답.\n(C) 외부 컨설턴트와 재무 감사 로그 검토 — 일정에 없는 활동이다.\n(D) 활성 계정 브라우저 캐시 삭제 — 일정과 무관하다.",
          "translation": null
        },
        {
          "prompt": "What incentive is offered to companies sending a group of at least three attendees?",
          "choices": [
            "Free access to a premium enterprise subscription for a full year",
            "A reduction in the overall registration cost",
            "Complimentary underground reserved parking vouchers",
            "Priority access to a private consulting session with Ms. Tanaka"
          ],
          "answerIndex": 1,
          "explanation": "Registration Details에 '같은 회사에서 3명 이상 등록 시 15% 그룹 할인'이 명시돼 있다.\n(A) 프리미엄 구독 1년 무료 — 무료 구독 혜택은 없다.\n(B) 전체 등록 비용의 인하 — 15% 그룹 할인의 재진술이라 정답.\n(C) 지하 지정 주차권 무료 — 주차권 혜택은 없다.\n(D) 다나카 씨와의 사적 컨설팅 우선권 — 그런 혜택 언급은 없다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-14",
      "no": 14,
      "title": "사내 시설 리모델링 및 주차장 임시 폐쇄 공지 안내",
      "category": "공지",
      "contextMap": "시설 관리 팀(Facilities Management)이나 총무 부서가 시설 공사 및 통제 안내문을 공지한다면?\n· **[도입: 공지 목적]** 사내 환경 개선·인프라 현대화를 위해 특정 시설물의 리모델링·보수 공사가 시작됨을 공지합니다.\n· **[본론: 제한/구체적 일정]** 공사 날짜·시간과 이 기간 완전히 폐쇄·통제되는 구역을 명시합니다. 구역별 통제 시간을 대조하는 팩트 체크 문제 배정.\n· **[정답 구역 - 대안 제시]** 불편·혼선을 막기 위해 임시 대체 주차 공간·우회 경로·셔틀버스 운영 정보를 제공합니다.\n· **[마무리: 안전 준수/연락처]** 공사 구역 접근 금지를 경고하고 문의 시 연락할 시설 담당자 연락처를 안내합니다.",
      "passage": "NOTICE: UPCOMING FACILITY RENOVATION AND PARKING ZONE CLOSURE\nSocial Brain AI Headquarters – Gangnam Campus\n\nAs part of our ongoing infrastructure modernization program designed to support our expanding network operations, the Facilities Management Department will oversee a comprehensive structural renovation of our lower-level parking amenities and utility grids. This scheduled optimization project is essential to install advanced electric vehicle charging terminals and upgrade the building's centralized data cooling frameworks.\n\nPlease review the critical timeline and operational adjustments below:\n\n1. Duration of Project:\nThe renovation is scheduled to commence at 6:00 A.M. on Monday, July 20, and is anticipated to conclude by 11:00 P.M. on Friday, July 24.\n\n2. Complete Closure of Underground Parking (Levels B1 and B2):\nDuring this distinct five-day maintenance window, the entire subterranean parking structure will be completely inaccessible to all personnel. Active terminal access badges for these levels will be temporarily revoked.\n\n3. Alternative Parking Arrangements:\nTo mitigate administrative bottlenecks and minimize inconvenience to our developers, Social Brain AI has secured a complimentary daily parking arrangement at the Teheran Corporate Center, situated at 160 Teheran-ro—just a three-minute walk from our main lobby. Employees must display their valid corporate ID card to the security attendants at that facility.\n\n4. Safety Precautions:\nAll staff members are strictly required to avoid the designated construction zones. Heavy machinery and engineering teams will be operating continuously.\n\nWe sincerely appreciate your collective cooperation as we upgrade our facilities to build an exceptional future. Should you have any outstanding operational concerns, please contact data-driven facility specialist Dae-hyun Soun at facilities@socialbrain-ai.com.",
      "questions": [
        {
          "prompt": "What is the primary purpose of the notice?",
          "choices": [
            "To introduce a newly appointed director of the facilities department",
            "To inform employees about temporary site closures due to renovation",
            "To outline a revised corporate remote work and digital compliance policy",
            "To advertise available commercial office space for immediate lease"
          ],
          "answerIndex": 1,
          "explanation": "헤드라인 'FACILITY RENOVATION AND PARKING ZONE CLOSURE'와 함께 지하 주차 시설 리모델링을 공지한다.\n(A) 새 시설 부서장 소개 — 부서장 소개가 아니다.\n(B) 리모델링으로 인한 임시 폐쇄를 직원에게 알림 — 정답.\n(C) 개정 재택근무·디지털 준법 정책 안내 — 정책 안내가 아니다.\n(D) 임대 가능한 상업 사무실 광고 — 임대 광고가 아니다.",
          "translation": null
        },
        {
          "prompt": "According to the notice, what will happen from July 20 through July 24?",
          "choices": [
            "Employees will be required to work remotely from alternative locations.",
            "The company will host a virtual signing ceremony with public sector clients.",
            "Access to the underground parking garage will be entirely restricted.",
            "Senior developers will undergo mandatory data science integration training."
          ],
          "answerIndex": 2,
          "explanation": "두 번째 항목에 7월 20~24일 5일간 '지하 주차 구조 전체 접근이 완전히 불가능하다'고 나온다.\n(A) 직원이 대체 장소에서 재택 근무 — 재택 지시는 없다.\n(B) 회사가 공공 고객과 화상 서명식 개최 — 서명식 언급은 없다.\n(C) 지하 주차장 접근이 완전히 통제됨 — completely inaccessible의 패러프레이징이라 정답.\n(D) 시니어 개발자가 의무 데이터 과학 교육 이수 — 교육 언급은 없다.",
          "translation": null
        },
        {
          "prompt": "Where are Social Brain AI staff members advised to park their vehicles during the project?",
          "choices": [
            "At the regional municipal government office parking deck",
            "At a nearby corporate building located at 160 Teheran-ro",
            "On the street directly adjacent to the Gangnam headquarters",
            "At the Muze AI centralized research facility parking lot"
          ],
          "answerIndex": 1,
          "explanation": "세 번째 항목에 '160 테헤란로의 테헤란 코퍼레이트 센터에 무료 일일 주차를 확보했다'고 나온다.\n(A) 지역 시청 주차장 — 시청 주차 언급은 없다.\n(B) 160 테헤란로의 인근 기업 건물 — 지문과 일치해 정답.\n(C) 강남 본사 바로 옆 도로변 — 노상 주차 안내는 없다.\n(D) Muze AI 중앙 연구소 주차장 — 대체 주차지는 테헤란 코퍼레이트 센터다.",
          "translation": null
        }
      ]
    },
    {
      "id": "p7-pat-15",
      "no": 15,
      "title": "사내 보안 지침 강화 및 데이터 유출 방지 경고 공지",
      "category": "공지",
      "contextMap": "최고정보보안책임자(CISO)나 IT 보안 부서(Data Security Division)가 전사 공지를 띄운다면?\n· **[도입: 공지 목적]** 최근 디지털 위협 환경을 언급하며 기밀 정보·시스템 보호를 위해 보안 지침을 대폭 강화·발효함을 선포합니다.\n· **[본론: 필수 수칙/NOT True 문제]** 비밀번호 변경 주기·외부 기기 반입 제한·미승인 접속 금지 등 반드시 지킬 행동 규정을 나열합니다. 금지·요구가 아닌 것을 고르는 NOT 문제 단골.\n· **[정답 구역 - 핵심 조치]** 외부에서 사내 망 접속 시 거쳐야 하는 VPN·다중인증(MFA) 등 구체적 기술 절차를 명시합니다.\n· **[마무리: 경고/신고]** 미준수 시 인사상 불이익을 경고하고 의심스러운 활동 발견 즉시 보안팀 제보를 당부하며 마칩니다.",
      "passage": "URGENT SECURITY NOTICE: ENHANCED DIGITAL COMPLIANCE PROTOCOLS\nTo: All Personnel of Muze AI and Associated Firms\n\nThe Data Security Division is implementing an immediate, mandatory upgrade to our corporate network security frameworks. As an organization highly specialized in automated document generation for public institutions, protecting our proprietary research assets and B2G system integrity is our paramount responsibility.\n\nEffective immediately, all employees must strictly adhere to the updated data protection measures detailed below. Non-compliance will result in immediate revocation of your system access and potential disciplinary review.\n\n1. Multi-Factor Authentication (MFA) Enforcement\nThe structural synchronization applied to our core Supabase servers now requires mandatory multi-factor authentication for every login attempt. Your active terminal accounts will prompt a secondary validation code sent to your registered mobile device.\n\n2. Unsecured Network Prohibitions\nConnecting to the centralized Muze AI database architecture or reviewing internal project ledgers via unsecured public Wi-Fi networks (e.g., in coffee shops or transit hubs) is now explicitly prohibited. Remote work operations must be conducted solely through the official encrypted Virtual Private Network (VPN).\n\n3. Password Modernization Timeline\nTo mitigate the risk of automated credential exploitation, all staff members are required to update their primary network infrastructure passwords before Friday, July 17, at 5:00 P.M. New passwords must incorporate a minimum of twelve characters, including both specialized symbols and numeric inputs.\n\nPlease report any unauthorized access prompts or suspicious network latency directly to our centralized helpline at security@muze-ai.com. Thank you for your immediate cooperation in safeguarding our digital workplace.",
      "questions": [
        {
          "prompt": "What is the primary focus of the notice?",
          "choices": [
            "To introduce a new marketing strategy for public sector consulting",
            "To inform employees of stricter data protection and network rules",
            "To announce an extension for the database ontology project deadline",
            "To advertise a promotion on external software licensing packages"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락에 '데이터 보안 부서가 네트워크 보안 프레임워크의 즉각적·의무적 업그레이드를 실행한다'고 나온다.\n(A) 공공 컨설팅 신규 마케팅 전략 소개 — 마케팅 전략이 아니다.\n(B) 더 엄격한 데이터 보호·네트워크 규칙을 직원에게 알림 — 정답.\n(C) 온톨로지 프로젝트 마감 연장 발표 — 마감 연장이 아니다.\n(D) 외부 소프트웨어 라이선스 프로모션 광고 — 프로모션 광고가 아니다.",
          "translation": null
        },
        {
          "prompt": "According to the notice, what is explicitly banned for remote workers?",
          "choices": [
            "Updating network infrastructure passwords on Friday afternoons",
            "Sharing technical project ledgers with external legal consultants",
            "Accessing corporate databases through unsecured public Wi-Fi",
            "Registering multiple mobile devices on the active terminal account"
          ],
          "answerIndex": 2,
          "explanation": "두 번째 항목(Unsecured Network Prohibitions)에 '보안되지 않은 공용 와이파이로 DB 연결·장부 검토는 명시적으로 금지된다'고 나온다.\n(A) 금요일 오후 네트워크 비밀번호 갱신 — 금지가 아니라 오히려 요구되는 조치다.\n(B) 외부 법률 컨설턴트와 장부 공유 — 그런 금지 항목은 없다.\n(C) 보안 안 된 공용 와이파이로 기업 DB 접근 — explicitly prohibited라 정답.\n(D) 활성 계정에 여러 모바일 기기 등록 — 그런 금지는 없다.",
          "translation": null
        },
        {
          "prompt": "What action must employees complete before 5:00 P.M. on Friday, July 17?",
          "choices": [
            "Submit a signed acknowledgment form to the HR operations manager",
            "Clear the browser cache files on all administrative computer stations",
            "Change their main network access passwords according to new rules",
            "Request a manual database rollback from the IT infrastructure team"
          ],
          "answerIndex": 2,
          "explanation": "세 번째 항목에 '7월 17일 금요일 오후 5시 전까지 기본 네트워크 비밀번호를 반드시 업데이트해야 한다'고 나온다.\n(A) 인사 운영 관리자에 서명 확인서 제출 — 서명서 제출은 다른 지문의 소재다.\n(B) 모든 관리 컴퓨터의 브라우저 캐시 삭제 — 캐시 삭제 지시는 없다.\n(C) 새 규칙에 따라 기본 네트워크 비밀번호 변경 — 지문과 일치해 정답.\n(D) IT팀에 수동 DB 롤백 요청 — 롤백 요청 지시는 없다.",
          "translation": null
        }
      ]
    }
  ]
}
```
