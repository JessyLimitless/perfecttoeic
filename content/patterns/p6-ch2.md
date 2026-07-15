# Part 6 패턴학습 · CHAPTER 2 — 사내 공지/메모: 조직 내부 운영 (패턴 06~10)

```json
{
  "part": 6,
  "chapter": 2,
  "chapterTitle": "사내 공지/메모: 조직 내부 운영",
  "patterns": [
    {
      "id": "p6-pat-06",
      "no": 6,
      "title": "인사 이동 및 승진/은퇴 공지",
      "category": "공지",
      "contextMap": "공지 제목이 'Promotion', 'Staff Announcement', 'Retirement'라면 흐름을 예측하세요.\n· **[발표]** 중추적 역할을 해온 인물의 승진(또는 은퇴)을 발표하게 되어 기쁩니다\n· **[성과 기술]** 핵심 프로젝트 성공·매출 증대로 큰 기여 — 성과 어휘·동사구 저격\n· **[정답 구역·파티/행사]** 축하 리셉션이 언제·어디서 열릴 예정 — 날짜·장소 부사·전치사 저격\n· **[마무리]** 향후 행보에 성원 부탁 — 축하 문장 삽입 저격",
      "passage": "To: All Staff\nFrom: Management Office\nDate: July 11, 2026\nSubject: Promotion Announcement: Ms. Elena Rossi\n\nWe are thrilled to announce that Ms. Elena Rossi, our current Director of Operations, has been promoted to the position of Vice President of Global Strategy, effective August 1.\n\nDuring her tenure, Ms. Rossi has been (1) __________ in transforming our production workflow, which led to a 20% increase in manufacturing efficiency. Her dedication to operational excellence has set a standard for all departments.\n\nShe will officially transition into her new role next month, and we are confident that her leadership will (2) __________ our expansion into European markets.\n\nTo celebrate her remarkable achievement, we will be hosting a congratulatory reception in the main lobby (3) __________. We invite all staff members to join us for refreshments and to express their appreciation for her work.\n\n(4) __________. Please note that an RSVP is required by July 20 to ensure that sufficient food and drinks are provided.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["instrumental", "instrument", "instrumentally", "instrumentation"],
          "answerIndex": 0,
          "explanation": "have been [형용사] in ~ing(~하는 데 결정적 역할을 하다) 패턴 자리. 승진·성공 지문 단골로 '핵심 기여'를 뜻하는 형용사 (A) instrumental. 명사(B·D)·부사(C)는 보어 자리에 부적합."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["accelerate", "decelerate", "compensate", "fluctuate"],
          "answerIndex": 0,
          "explanation": "부사장 승진 인물에게 기대하는 것은 성장·속도. 유럽 시장 확장을 '가속화하다' (A) accelerate. 감속(B)·보상(C)·변동(D)은 문맥상 부적합."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": [
            "at the conclusion of the fiscal year.",
            "on the afternoon of July 28.",
            "within the designated office hours.",
            "before the renovation begins."
          ],
          "answerIndex": 1,
          "explanation": "리셉션 개최를 선언했으니 '언제' 열리는지 구체적 시점이 와야 한다. 발령일(8월 1일) 직전이 자연스러워 (B) 7월 28일 오후."
        },
        {
          "prompt": "빈칸 (4) · 문장 삽입",
          "choices": [
            "We hope you can make time to attend this special event.",
            "We are seeking applicants for the vacant Director of Operations position.",
            "The new strategy will be implemented throughout all branch offices.",
            "Please submit your monthly reports to your direct supervisor."
          ],
          "answerIndex": 0,
          "explanation": "빈칸 뒤에서 참석 여부(RSVP)를 7월 20일까지 요청하므로, '이 특별 행사에 시간 내어 참석해 달라'는 초대의 말인 (A)가 징검다리로 자연스럽다."
        }
      ]
    },
    {
      "id": "p6-pat-07",
      "no": 7,
      "title": "사내 규정 및 시스템 변경 공지",
      "category": "메모",
      "contextMap": "공지 제목이 'New Policy', 'System Update', 'Revised Guidelines'라면 흐름을 예측하세요.\n· **[도입]** 효율성·보안 강화를 위해 새 시스템(규정)을 도입합니다\n· **[정답 구역·시점]** 특정 날짜부터 효력을 발휘 — 시행일 전치사·분사 패턴 저격\n· **[의무 조치]** 모든 임직원은 기한 전까지 반드시 특정 행동을 완료 — 의무 조동사·어휘 저격\n· **[마무리]** 문의는 인사과·IT 부서로 — 문장 삽입·담당 부서 매칭 저격",
      "passage": "To: All Personnel\nFrom: Human Resources Department\nDate: July 11, 2026\nSubject: Revision of Remote Work Policy and Core Hours\n\nPlease be advised that the management team has recently finalized revisions to our corporate remote work policy. These updates are intended to foster better collaboration across departmental lines while maintaining our commitment to flexible scheduling.\n\nThe revised guidelines will become (1) __________ beginning August 1.\n\nUnder the new framework, all employees, regardless of their physical location, are required to be online during our core hours of 10:00 A.M. to 3:00 P.M. (2) __________, staff members must log their daily project updates into the centralized project management portal before the end of each shift.\n\nWe understand that adjusting to new protocols requires transition time. (3) __________. A comprehensive PDF manual detailing the clock-in system has been uploaded to the company intranet for your reference.\n\nWe (4) __________ your cooperation in implementing these updates smoothly. Should you have any immediate concerns regarding how these changes affect your current schedule, please consult your direct supervisor.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["effect", "effective", "effectively", "effectiveness"],
          "answerIndex": 1,
          "explanation": "become effective(~부로 효력을 발휘하다)는 고정 짝꿍. become은 2형식이라 주격 보어에 형용사 (B) effective. 명사(A·D)·부사(C)는 불가."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["Additionally", "Conversely", "Alternatively", "Nevertheless"],
          "answerIndex": 0,
          "explanation": "앞 문장은 코어타임 온라인 유지 의무, 뒤 문장은 일일 업데이트 기록 의무. 대등한 규정을 누적하는 첨가의 접속부사 (A) Additionally."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "Budget constraints will prevent us from hiring temporary staff.",
            "Therefore, we will be hosting an informational Q&A session next Tuesday.",
            "Most employees have already expressed dissatisfaction with the workspace.",
            "The office renovation will be completed ahead of schedule."
          ],
          "answerIndex": 1,
          "explanation": "앞 문장에서 '새 프로토콜 적응에 전환 기간이 필요함을 이해한다'고 공감했으므로, 후속 조치로 'Q&A 세션을 개최하겠다'는 (B)가 자연스럽다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["appreciate", "are appreciating", "appreciated", "will appreciate"],
          "answerIndex": 0,
          "explanation": "We appreciate your cooperation(협조에 감사드립니다)는 현재 시제 고정 템플릿. appreciate는 지속적 태도를 고마워하는 동사라 진행형·미래형이 아닌 현재형 (A)."
        }
      ]
    },
    {
      "id": "p6-pat-08",
      "no": 8,
      "title": "시설 보수 및 이용 제한 공지",
      "category": "공지",
      "contextMap": "공지 키워드가 'Renovation', 'Maintenance', 'Closure', 'Repairs'라면 흐름을 예측하세요.\n· **[공지]** 특정 시설의 보수 공사 일정을 안내합니다\n· **[영향/제한]** 공사 중 해당 구역은 폐쇄·이용 제한 — 수동태·일시적 상태 어휘 저격\n· **[정답 구역·대안]** 대신 다른 시설을 이용해 주십시오 — 대안 접속부사(Alternately) 저격\n· **[양해/마무리]** 소음·불편 양해와 협조 감사 — 문장 삽입·양해 관용구 저격",
      "passage": "To: All Tenants of the Muze Professional Building\nFrom: Building Management Office\nDate: July 11, 2026\nSubject: Scheduled Elevator Maintenance and Temporary Closure\n\nPlease be informed that the main elevator bank in the West Wing is scheduled to undergo necessary mechanical upgrades. This project is part of our ongoing efforts to ensure the safety and reliability of our facility's infrastructure.\n\nTo complete these upgrades safely, the three primary elevators in that section (1) __________ out of service from July 18 through July 20.\n\nDuring this three-day maintenance window, passengers will not be able to access the upper floors via the West Wing elevator lobby. (2) __________, everyone is advised to use the secondary elevator bank located in the East Wing.\n\nSigns will be posted throughout the corridors to guide you to the appropriate detour pathways. (3) __________. We expect a higher volume of traffic near the East Wing elevators, so please plan your morning commute accordingly.\n\nWe appreciate your (4) __________ and cooperation as we work to improve our building systems. Should you need assistance moving large items during this period, please contact the facilities office in advance.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["placed", "will be placed", "placing", "are placing"],
          "answerIndex": 1,
          "explanation": "날짜 단서 from July 18 through July 20은 미래. 엘리베이터는 관리자에 의해 운행 정지되는 대상이라 미래 수동태 (B) will be placed. be placed out of service는 '운행 중단되다' 고정 표현."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["Alternately", "On the contrary", "In short", "For instance"],
          "answerIndex": 0,
          "explanation": "앞은 서쪽 동 엘리베이터 이용 불가, 뒤는 동쪽 동 보조 엘리베이터 이용 권고. 다른 방안을 제시하는 대안의 접속부사 (A) Alternately."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "The security team will be conducting a fire drill tomorrow morning.",
            "Building management has decided to lower the monthly leasing rates.",
            "We apologize for any inconvenience this temporary disruption may cause.",
            "All staff members must submit their identification badge renewals."
          ],
          "answerIndex": 2,
          "explanation": "공사·시설 제한 안내문 단골인 '불편에 대한 정중한 사과 템플릿' (C)가 가장 매끄럽게 삽입된다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["patience", "precision", "indifference", "reluctance"],
          "answerIndex": 0,
          "explanation": "시설 제한으로 불편을 겪는 대상에게 cooperation과 함께 요구하는 단골 어휘는 (A) patience(인내, 양해). We appreciate your patience and cooperation 세트 구문."
        }
      ]
    },
    {
      "id": "p6-pat-09",
      "no": 9,
      "title": "사내 교육 및 세미나 참석 안내",
      "category": "메모",
      "contextMap": "공지 주제가 'Mandatory Training', 'Compliance Seminar', 'Staff Workshop'라면 흐름을 예측하세요.\n· **[목적]** 역량 강화·규정 준수를 위해 새 교육(세미나)을 개최합니다\n· **[정답 구역·당위성]** 전 직원(또는 특정 대상)이 의무적으로 이수해야 함 — 필수 형용사(Mandatory) 저격\n· **[사전 준비]** 기한 전까지 반드시 사전 등록·설문 제출 — 마감 전치사(by)·문장 삽입 저격\n· **[문의/행동]** 세션 일정은 첨부 확인, 문의는 담당자에게 — 동사 시제·짝꿍 명사 저격",
      "passage": "To: All Department Heads and Project Managers\nFrom: Talent Development Division\nDate: July 11, 2026\nSubject: Mandatory Seminar on Generative AI Tools and Workflow Compliance\n\nAs part of our continuous efforts to enhance digital competency across all operational sectors, the company will be hosting a professional development seminar focused on generative AI system integrations.\n\nAttendance at this training session is (1) __________ for all management-level personnel.\n\nThe session will cover the practical applications of large language models in corporate document generation, as well as crucial protocols for data privacy. To accommodate everyone's schedule, identical sessions (2) __________ twice next week.\n\n(3) __________. You must log into the employee development portal and select either the Tuesday morning session or the Thursday afternoon slot no later than July 15.\n\nWe believe this training will significantly improve our administrative efficiency. If you encounter any technical difficulties during the registration process, please notify the IT support desk (4) __________ so the issue can be resolved.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["voluntary", "mandatory", "optional", "accidental"],
          "answerIndex": 1,
          "explanation": "제목의 'Mandatory Seminar'와 all management-level personnel 맥락. '의무적인, 필수적인' (B) mandatory. 자발적(A)·선택적(C)은 반대 의미."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["were offered", "would have offered", "will be offered", "are offering"],
          "answerIndex": 2,
          "explanation": "미래 단서 next week + 주어 identical sessions는 제공되는 대상이므로 미래 수동태 (C) will be offered. 과거(A)·가정법(B)·현재진행 능동(D) 제외."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "The seminar has been canceled due to budget constraints.",
            "All participants are required to register for their preferred slot in advance.",
            "Free software upgrades will be distributed to all external clients.",
            "The management team has recently finalized the office renovation plans."
          ],
          "answerIndex": 1,
          "explanation": "뒤 문장에서 '포털 로그인 후 원하는 시간대를 7월 15일까지 선택하라'는 지침이 나오므로, '모든 참가자는 선호 시간대를 사전 등록해야 한다'는 총론 (B)가 자석 역할."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["promptly", "reluctantly", "mutually", "marginally"],
          "answerIndex": 0,
          "explanation": "등록 마감(7월 15일) 전에 기술 문제를 신속히 해결해야 하므로 '지체 없이, 즉각' (A) promptly가 자연스럽다."
        }
      ]
    },
    {
      "id": "p6-pat-10",
      "no": 10,
      "title": "예산 감축 및 비용 절감 캠페인",
      "category": "메모",
      "contextMap": "공지 키워드가 'Cost-Reduction', 'Budget Constraints', 'Expense Control'라면 흐름을 예측하세요.\n· **[상황 공유]** 시장 불확실성·원가 상승으로 경영 환경이 엄격해졌습니다\n· **[당위성]** 재무 건전성 유지 위해 운영 비용을 축소·통제해야 함 — 축소 동사·명사구 저격\n· **[정답 구역·실천]** 불필요한 지출을 억제하고 출장·소모품 예산 절감 — 동사원형·절제 어휘(Refrain) 저격\n· **[임직원 독려]** 목표 달성에 전 임직원의 적극적 참여가 필수 — 문장 삽입·협조 형용사 저격",
      "passage": "To: All Corporate Departments\nFrom: Chief Financial Officer\nDate: July 11, 2026\nSubject: Implementation of Corporate Expense Control Measures\n\nAs we navigate the current economic uncertainties affecting the global technology sector, it has become necessary for Muze AI to evaluate its operational expenses. To safeguard our long-term financial stability, we must implement strategic measures to reduce waste.\n\nEffective immediately, all departmental managers are required to cut discretionary spending (1) __________ fifteen percent for the remainder of the fiscal year.\n\nWe must focus our resources entirely on core development projects. Consequently, we strictly request that all personnel (2) __________ from approving non-essential business travel until further notice.\n\n(3) __________. Instead, teams should utilize our advanced video conferencing platforms to conduct meetings with overseas clients whenever possible.\n\nAchieving these budget targets requires a collective effort across the entire organization. Your proactive participation in these cost-saving initiatives is (4) __________ to our success.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["by", "to", "for", "with"],
          "answerIndex": 0,
          "explanation": "cut/reduce/increase 류 동사 + 비율(15%) 앞에서 '~만큼(차이·폭)'을 나타내는 전치사는 (A) by. 목표치 '~로'라면 to지만, 15% '만큼' 삭감 맥락이라 by가 정답."
        },
        {
          "prompt": "빈칸 (2)",
          "choices": ["refrain", "refraining", "to refrain", "refrained"],
          "answerIndex": 0,
          "explanation": "request that + 주어 + (should) 동사원형 구조라 빈칸은 동사원형. 뒤 전치사 from과 결합해 '~를 자제하다'가 되는 자동사 (A) refrain."
        },
        {
          "prompt": "빈칸 (3) · 문장 삽입",
          "choices": [
            "International travel insurance will be provided to all executives.",
            "Local client visits should be scheduled during evening hours.",
            "Expense reports for last month have already been fully reimbursed.",
            "Virtual communication should serve as the primary alternative for collaboration."
          ],
          "answerIndex": 3,
          "explanation": "앞은 비필수 출장 자제 요청, 뒤는 'Instead, 화상 회의를 활용하라'는 대안. 그 사이에 '가상 소통이 협업의 기본 대안이 되어야 한다'는 (D)가 징검다리."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["detrimental", "vital", "incidental", "redundant"],
          "answerIndex": 1,
          "explanation": "목표 달성에 임직원 참여가 얼마나 중요한지 강조하므로 '필수적인, 극히 중요한' (B) vital. 해로운(A)·부수적인(C)·불필요한(D)은 독려 문맥에 부적합."
        }
      ]
    }
  ]
}
```
