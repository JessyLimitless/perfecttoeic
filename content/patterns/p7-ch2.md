# Part 7 패턴학습 · CHAPTER 2 — 단일 지문 ② 서신·공지 (패턴 06~10)

```json
{
  "part": 7,
  "chapter": 2,
  "chapterTitle": "단일 지문 ② 서신·공지",
  "patterns": [
    {
      "id": "p7-pat-06",
      "no": 6,
      "title": "사내 규정 변경 및 근무 지침 안내",
      "category": "이메일",
      "contextMap": "인사 부서(HR)나 경영진이 전 직원에게 정책 변경 이메일을 보낸다면?\n· **[도입: 목적/주제 문제]** 특정 날짜부터 회사의 운영 규정이나 근무 지침이 새롭게 수정·도입된다는 사실을 공표합니다.\n· **[본론: True/NOT True 문제]** 과거 규정과 비교해 무엇이 어떻게 바뀌는지 구체적 가이드라인을 나열합니다. 출퇴근 시간·증빙 기한·보안 준수 등 팩트 체크 저격.\n· **[정답 구역 - 취지/기대]** 이번 정책으로 회사가 달성하려는 생산성 향상·보안 강화·비용 절감 등 기대 효과를 강조합니다.\n· **[마무리: 후속 조치]** 문의 방법이나 관련 동의서/서류를 언제까지 제출하라고 지시합니다.",
      "passage": "From: hr-department@socialbrain.com\nTo: all-employees@socialbrain.com\nDate: July 11, 2026\nSubject: Notification of Revised Remote Work and Digital Compliance Policy\n\nDear Employees,\n\nAs part of our ongoing commitment to enhancing operational efficiency and data security at Social Brain AI, the Executive Board has approved a comprehensive revision to our corporate remote work and digital compliance guidelines. These updated regulations will officially take effect on August 1.\n\nThe primary modification concerns our weekly remote work allocation. Under the previous framework, team members were permitted to work from alternative locations up to three days per week. To optimize synchronized collaboration for our upcoming LinkMD platform deployment, the updated policy stipulates that employees must work on-site at our Gangnam headquarters a minimum of three days per week, leaving a maximum of two days for remote operations.\n\nFurthermore, stringency regarding network security has been substantially increased. When accessing our centralized Supabase database architecture from outside the office, all personnel are strictly required to utilize the newly implemented multi-factor authentication (MFA) protocols. Connecting to corporate servers via unsecured public Wi-Fi networks is now explicitly prohibited.\n\nWe believe these adjustments will directly accelerate our project development timelines while safeguarding our proprietary research assets. A digital acknowledgement form has been attached to this email; please review the complete policy document and submit your signed confirmation to the HR department by July 20.\n\nSincerely,\nYoon-ah Choi\nHuman Resources Director, Social Brain AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the email?",
          "choices": [
            "To introduce a newly hired software development team",
            "To inform staff about updates to company operational rules",
            "To announce the opening of a new office in Gangnam",
            "To request feedback on a proposed employee benefits package"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락: '이사회가 재택근무 및 디지털 준수 가이드라인의 종합 개정안을 승인했다'. 회사 운영 규칙 변경을 직원에게 알리는 (B)."
        },
        {
          "prompt": "What is indicated about the remote work policy change?",
          "choices": [
            "Employees can now work remotely for the entire week.",
            "It was requested by the public sector consulting clients.",
            "It reduces the maximum number of allowable remote work days.",
            "It completely eliminates the flexible hours benefit."
          ],
          "answerIndex": 2,
          "explanation": "두 번째 단락: 과거 주 최대 3일 재택에서 본사 최소 3일 근무·재택 최대 2일로 축소. 허용 재택 최대 일수를 줄인 (C)."
        },
        {
          "prompt": "What are employees required to do by July 20?",
          "choices": [
            "Complete a technical training session on multi-factor authentication",
            "Transfer their existing database files to the Supabase server",
            "Submit a signed form acknowledging the revised policy",
            "Update their emergency contact records with the HR department"
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락: '서명된 확인서를 7월 20일까지 인사부에 제출하라'. signed confirmation을 (C) signed form acknowledging the revised policy로 패러프레이징."
        }
      ]
    },
    {
      "id": "p7-pat-07",
      "no": 7,
      "title": "신임 대표 취임사 및 전사적 비전 선포 서신",
      "category": "편지",
      "contextMap": "새로 부임한 CEO가 전 임직원에게 취임 서신을 보낸다면?\n· **[도입: 목적 문제]** 대표 자리를 맡게 된 소회와 함께 직원들에게 첫 공식 인사를 건네고 조직의 방향성을 공유하려는 목적을 명시합니다.\n· **[본론: 당면 과제/추론 문제]** 시장 상황이나 당면 과제를 짚으며 어떤 분야에 자원을 집중하거나 조직을 개편할지 비전을 선포합니다.\n· **[정답 구역 - 메시지]** 장기 성장을 이끌 핵심 성장 동력(신제품·특정 시장 등)을 구체적으로 언급합니다.\n· **[마무리: 소통 약속]** 각 부서장·직원과 직접 만나는 타운홀 미팅·간담회 일정을 예고하며 마칩니다.",
      "passage": "MUZE AI\n75 Sejong-daero, Jongno-gu, Seoul\n\nJuly 11, 2026\n\nTo All Members of the Muze AI Family,\n\nIt is with a profound sense of responsibility and excitement that I address you today for the first time as the newly appointed Chief Executive Officer of Muze AI. I want to extend my deepest gratitude to the Executive Board for their trust, and to all of you for the warm welcome I have received since assuming this role on August 1.\n\nOur organization has built a magnificent reputation over the past decade as a pioneer in automated document generation. Thanks to your collective dedication, we have successfully redefined compliance workflows for numerous public institutions. However, to ensure our sustained scalability in an increasingly competitive environment, we must now transition into our next strategic growth phase.\n\nMy primary objective for the remainder of this fiscal year is to aggressively accelerate our expansion into specialized B2G consulting markets. To support this initiative, we will be reallocating a significant portion of our annual budget toward database ontology architecture modernization and expanding our predictive data analytics divisions.\n\nInnovation cannot be achieved in isolation; it requires deep cooperation across all tiers of our firm. Over the next two weeks, I plan to visit every department to hear your insights directly. Additionally, we will host an all-staff town hall meeting on July 24 to discuss our new organizational roadmaps in greater detail. I look forward to working alongside each of you to build an exceptional future for Muze AI.\n\nSincerely,\nHana Tanaka\nChief Executive Officer, Muze AI",
      "questions": [
        {
          "prompt": "Why did Ms. Tanaka write the letter to the staff?",
          "choices": [
            "To demand strict adherence to updated digital compliance policy",
            "To share her strategic vision upon becoming the new CEO",
            "To announce a budget adjustment for the marketing division",
            "To apologize for an unexpected system downtime on the server"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락에서 '새 CEO로서 처음 글을 쓴다'고 밝힌 뒤 회사의 다음 전략적 성장 단계·목표를 선포한다. 신임 대표의 비전 공유 (B)."
        },
        {
          "prompt": "What area does Ms. Tanaka identify as a priority for the company's growth?",
          "choices": [
            "Expanding the commercial retail storefront network",
            "Penetrating specialized government consulting markets",
            "Developing automated quantitative trading bot algorithms",
            "Recruiting external human resources legal consultants"
          ],
          "answerIndex": 1,
          "explanation": "세 번째 단락: '최우선 목표는 B2G 컨설팅 시장으로의 확장 가속화'. B2G를 (B) government로, expansion을 penetrating으로 패러프레이징."
        },
        {
          "prompt": "What is indicated about Ms. Tanaka's plans for the near future?",
          "choices": [
            "She will immediately dissolve the current executive board.",
            "She is scheduled to speak at an international AI ethics symposium.",
            "She intends to visit individual company departments.",
            "She will postpone the virtual contract signing ceremony."
          ],
          "answerIndex": 2,
          "explanation": "마지막 단락: '향후 2주간 모든 부서를 방문할 계획(visit every department)'. (C) visit individual company departments로 재진술."
        }
      ]
    },
    {
      "id": "p7-pat-08",
      "no": 8,
      "title": "사내 추천 포상 및 우수 사원 표창 안내",
      "category": "이메일",
      "contextMap": "인사 부서(HR)나 경영진이 임직원 보상 및 인재 추천에 관한 이메일을 보낸다면?\n· **[도입: 목적 문제]** 우수 사원 포상이나 인재 영입 추천 프로그램의 새로운 혜택을 공지하며 시작합니다.\n· **[본론: 포상 조건/NOT True 문제]** 보너스·상금 수령에 필요한 재직 기간·자격 요건·서류 마감일 등을 나열합니다. 일치하지 않는 것을 고르는 NOT 문제 빈출.\n· **[정답 구역 - 상세 수치]** 추천 인재가 정식 채용 후 얼마 동안 근무해야 포상금이 전액 지급되는지 수치 단서를 명시합니다.\n· **[마무리: 행동 유도]** 양식 다운로드 포털 링크나 후보자 이력서 제출처를 고지하며 마칩니다.",
      "passage": "From: rewards-team@muze-ai.com\nTo: all-employees@muze-ai.com\nDate: July 11, 2026\nSubject: Launch of Enhanced Employee Referral Reward Initiative\n\nDear Team Members,\n\nAt Muze AI, we consistently find that our greatest asset is the combined dedication of our personnel. As we aggressively accelerate our expansion into specialized B2G consulting markets, attracting top-tier engineering and data science talent has become our absolute priority. To support this growth, the HR department is proud to announce the launch of an Enhanced Employee Referral Reward Initiative, effective immediately.\n\nUnder this revised framework, if you refer a qualified candidate who is successfully hired for a full-time position within our predictive data analytics or database ontology architecture divisions, you will be eligible for a total cash bonus of $3,000.\n\nTo ensure the long-term scalability of our teams, this referral bonus will be distributed in two installments: the first $1,500 will be credited to your payroll automatically after the hired individual completes their initial three months of employment. The remaining $1,500 will be paid once the new hire successfully reaches their one-year anniversary with the firm.\n\nPlease note that candidate resumes must be submitted through our secure client portal prior to the formal interview scheduling. The candidate must explicitly list your name and employee ID on their initial digital application form to qualify for the incentive.\n\nWe encourage everyone to look within their professional networks for agile technology pioneers who can help Muze AI build an exceptional future.\n\nSincerely,\nMin-seok Kang\nTechnical Support & HR Operations Director, Muze AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the email?",
          "choices": [
            "To introduce a newly hired data science team member",
            "To outline a revised incentive program for employee referrals",
            "To announce the recipient of the quarterly employee award",
            "To explain a price adjustment for external licensing terms"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락 후반: '인사부가 강화된 직원 추천 보상 제도의 시작을 발표한다'. 수정된 추천 인센티브 프로그램을 안내하는 (B)."
        },
        {
          "prompt": "According to the email, when is the first half of the bonus paid?",
          "choices": [
            "Immediately after the candidate submits a resume",
            "Once the new hire completes three months of work",
            "On the date of the formal virtual signing ceremony",
            "After the newly hired employee works for a full year"
          ],
          "answerIndex": 1,
          "explanation": "세 번째 단락: '첫 1,500달러는 채용 인력이 초기 3개월 근무를 완료한 후 자동 지급'. (B) completes three months of work."
        },
        {
          "prompt": "What requirement must be met to qualify for the referral reward?",
          "choices": [
            "The referee must possess a degree in public administration.",
            "The employee must submit the candidate's resume through the client portal.",
            "The candidate must have prior experience in quantitative trading.",
            "The employee must attend a mandatory corporate finance seminar."
          ],
          "answerIndex": 1,
          "explanation": "네 번째 단락: '후보자 이력서는 반드시 보안 클라이언트 포털을 통해 제출해야 한다'. (B)로 거의 그대로 재진술."
        }
      ]
    },
    {
      "id": "p7-pat-09",
      "no": 9,
      "title": "신제품 출시 및 프리오더/사전 예약 마케팅 서신",
      "category": "편지",
      "contextMap": "기업의 마케팅/영업 이사(Marketing Director)가 우수 고객·잠재적 기업 파트너에게 홍보 서신을 보낸다면?\n· **[도입: 목적 문제]** 오랜 연구 끝에 시장 판도를 바꿀 신제품·혁신 플랫폼을 공식 출시하게 되었음을 알립니다.\n· **[본론: True/NOT True 문제]** 제품의 핵심 기능·기존 모델 대비 개선점·연동 시스템 등을 나열합니다. 스펙·강점을 묻는 팩트 체크 저격.\n· **[정답 구역 - 사전 예약 혜택]** 정식 출시 전 예약 고객에게만 제공되는 특별 할인율·무료 연동 서비스를 명시합니다.\n· **[마무리: 제한/행동 촉구]** 프로모션이 특정 날짜에 마감되므로 지금 온라인 포털 링크로 예약하라고 촉구합니다.",
      "passage": "SOCIAL BRAIN AI\n150 Teheran-ro, Gangnam-gu, Seoul\n\nDear Enterprise Partner,\n\nAt Social Brain AI, we count ourselves fortunate to have visionary corporate partners who share our passion for technological growth. Today, we are thrilled to formally announce the upcoming launch of our next-generation knowledge engine, the LinkMD Platform.\n\nDeveloped over the past eighteen months in deep cooperation with public sector innovators, LinkMD is a state-of-the-art, Markdown-based knowledge base designed to fundamentally alter traditional enterprise data workflows. The platform features an advanced database ontology architecture that processes massive predictive data models with zero latency. Additionally, it ensures seamless integration with standard Supabase and Korea Investment & Securities (KIS) API frameworks.\n\nThe official global release is scheduled for September 1, but as a preferred corporate client, you are invited to participate in our exclusive pre-order initiative. Enterprise partners who secure their licensing contract before August 15 will receive a 20% locked-in discount on the annual subscription rate. Furthermore, pre-order clients will be granted complimentary early access privileges starting August 20 to test their existing data structures prior to the general launch.\n\nTo secure this limited-time financial incentive, your technology deployment manager must register through our secure client portal. Please review the attached licensing terms, and do not hesitate to contact our customer operations team at support@socialbrain-ai.com if you have any questions.\n\nSincerely,\nYoon-ah Choi\nMarketing Director, Social Brain AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the letter?",
          "choices": [
            "To complain about a performance issue with an external API",
            "To introduce a new software platform and offer pre-order benefits",
            "To announce a structural budget reallocation for a research project",
            "To invite public sector clients to an AI ethics symposium"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락에서 '차세대 지식 엔진 LinkMD 플랫폼의 출시를 공식 발표'하고 이후 독점 사전 예약 프로그램과 특별 혜택을 안내한다. 신제품 소개+예약 혜택 (B)."
        },
        {
          "prompt": "According to the letter, what is a feature of the LinkMD Platform?",
          "choices": [
            "It requires a manual database rollback every midnight.",
            "It functions without any processing delays or latency.",
            "It is designed primarily for retail storefront personnel.",
            "It was developed entirely by an external technology vendor."
          ],
          "answerIndex": 1,
          "explanation": "두 번째 단락: 플랫폼이 '지연 시간 없이(with zero latency) 예측 데이터 모델을 처리'. (B) without any processing delays or latency로 패러프레이징."
        },
        {
          "prompt": "What advantage is offered to clients who order before August 15?",
          "choices": [
            "Free registration for an international technology conference",
            "An extended licensing duration lasting for three full years",
            "A reduced subscription rate for the annual contract",
            "Direct technical support from the Chief Executive Officer"
          ],
          "answerIndex": 2,
          "explanation": "세 번째 단락: '8월 15일 전 계약 체결 파트너는 연간 구독 요금 20% 고정 할인'. locked-in discount를 (C) reduced subscription rate로 패러프레이징."
        }
      ]
    },
    {
      "id": "p7-pat-10",
      "no": 10,
      "title": "사내 정기 시스템 점검 및 네트워크 서비스 중단 공지",
      "category": "이메일",
      "contextMap": "IT 기술 지원 센터(IT Help Desk)나 최고정보책임자(CIO)가 전 직원에게 시스템 점검 이메일을 보낸다면?\n· **[도입: 목적 문제]** 네트워크 안정성 확보와 데이터 백업을 위해 특정 시점에 대규모 시스템 점검이 예정되어 있음을 알립니다.\n· **[본론: 중단 범위/시간 매칭 문제]** 점검 시간 동안 어떤 서비스·서버(ERP·메신저·외부 API 연동 등)가 먹통이 되는지 상세 시간표와 함께 나열합니다.\n· **[정답 구역 - 예방 조치]** 데이터 누락을 막기 위해 점검 시작 전 취해야 할 행동 지침(로그아웃·저장)을 명시합니다.\n· **[마무리: 비상 연락망]** 점검 후 오류가 지속되면 어디로 연락·티켓 접수해야 하는지 안내하며 마칩니다.",
      "passage": "From: it-support@muze-ai.com\nTo: all-staff@muze-ai.com\nDate: July 11, 2026\nSubject: Notice of Scheduled Database Optimization and Server Downtime\n\nDear Colleagues,\n\nPlease be advised that the IT Infrastructure Department will be conducting a mandatory, comprehensive database optimization and system architecture upgrade this upcoming weekend. To safeguard our proprietary research assets and enhance operational profit margins, this maintenance is essential to support our upcoming B2G consulting frameworks.\n\nThe migration and maintenance window is scheduled to take place from 11:00 P.M. on Saturday, July 18, through 5:00 A.M. on Sunday, July 19. During this distinct six-hour period, all core internal network applications—including our automated document generation portal and the centralized Supabase server directory—will be completely inaccessible. Furthermore, all real-time transaction data synchronization with external partner portals, such as the Korea Investment & Securities (KIS) API framework, will be suspended temporarily.\n\nTo prevent any unexpected data loss or file corruption during the database rollback simulations, all personnel are strictly required to log out of their active terminal accounts and save all ongoing project ledgers before 10:30 P.M. on Saturday.\n\nWe appreciate your cooperation and patience as we modernize our network frameworks to build an exceptional future. Should you experience any lingering access anomalies after 6:00 A.M. on Sunday, please submit a formal technical request to our centralized helpline.\n\nSincerely,\nJi-hoon Lee\nIT Operations Director, Muze AI",
      "questions": [
        {
          "prompt": "What is the primary purpose of the email?",
          "choices": [
            "To introduce a newly hired database architecture consultant",
            "To announce a temporary suspension of internal server access for maintenance",
            "To outline a revised corporate remote work and digital compliance policy",
            "To request additional funding for a specialized public sector research project"
          ],
          "answerIndex": 1,
          "explanation": "첫 단락: 'IT 인프라 부서가 주말에 의무적 DB 최적화·시스템 업그레이드를 실시한다'. 정비 위한 서버 접근 일시 중단 공지 (B)."
        },
        {
          "prompt": "According to the email, what will happen between 11:00 P.M. on Saturday and 5:00 A.M. on Sunday?",
          "choices": [
            "The marketing team will execute a virtual signing ceremony.",
            "Core internal network applications will be entirely unavailable.",
            "Staff members will attend a mandatory data science seminar.",
            "The finance division will implement corporate expense control measures."
          ],
          "answerIndex": 1,
          "explanation": "두 번째 단락: 6시간 동안 '모든 핵심 사내 네트워크 앱이 완전히 접근 불가(completely inaccessible)'. (B) entirely unavailable로 패러프레이징."
        },
        {
          "prompt": "What are Muze AI employees instructed to do before 10:30 P.M. on Saturday?",
          "choices": [
            "Clear the cache files on their corporate mobile devices",
            "Renew their premium enterprise consulting subscription",
            "Save their current work and sign out of their accounts",
            "Contact external technical vendors via personal mobile numbers"
          ],
          "answerIndex": 2,
          "explanation": "세 번째 단락: 토요일 밤 10시 30분 전에 '계정 로그아웃하고 진행 중 장부를 저장하라'. (C) Save current work and sign out으로 재진술."
        }
      ]
    }
  ]
}
```
