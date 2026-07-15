# Part 6 패턴학습 · CHAPTER 5 — 대화문/채팅: 실시간 소통 상황 (패턴 21~25)

```json
{
  "part": 6,
  "chapter": 5,
  "chapterTitle": "대화문/채팅: 실시간 소통 상황",
  "patterns": [
    {
      "id": "p6-pat-21",
      "no": 21,
      "title": "업무 협조 및 자료 공유 요청",
      "category": "메신저",
      "contextMap": "메신저에서 팀원이 다른 팀원·유관 부서를 급하게 부른다면 흐름을 예측하세요.\n· **[용건]** 진행 중인 프로젝트 관련 특정 파일(견적서·리포트·데이터셋)을 확인해 달라 요청\n· **[정답 구역·위치]** 요청 자료는 공유 폴더·메일로 이미 전송·첨부해 둠 — 완료 시제·전달 동사 저격\n· **[추가 요청]** 확인하는 김에 피드백·수정본을 언제까지 회신 요청 — 기한 전치사(by)·문장 삽입 저격\n· **[감사·확인]** 바로 확인하겠다는 즉각 답변으로 마무리 — 메신저 구어 표현 저격",
      "passage": "Min-ji Seo (Project Manager) [10:15 A.M.]\nHi team, I am currently reviewing the final draft of the municipal data ontology architecture for the Jeonbuk disaster safety project.\n\nMin-ji Seo (Project Manager) [10:16 A.M.]\nJi-hoon, did you manage to finish updating the statistical validation model (1) __________ we discussed in yesterday's sync meeting?\n\nJi-hoon Lee (Data Scientist) [10:18 A.M.]\nYes, Min-ji. I finalized the script extensions earlier this morning. (2) __________. You can find it under the \"Phase 1_Validation\" directory.\n\nMin-ji Seo (Project Manager) [10:20 A.M.]\nPerfect, thanks for the quick turnaround. Could you please double-check if the API endpoint coordinates are (3) __________ aligned with the KIS framework? We cannot afford any latency during the live demonstration.\n\nJi-hoon Lee (Data Scientist) [10:22 A.M.]\nI ran a diagnostic test thirty minutes ago and everything matched perfectly. However, I will run one more simulation just to be absolutely (4) __________. Give me ten minutes.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["what", "that", "whose", "whom"],
          "answerIndex": 1,
          "explanation": "선행사 the statistical validation model(사물)을 수식하고 뒤에 주어+동사(we discussed)가 이어지는 목적격 관계대명사 자리. 사물이므로 (B) that. 선행사를 포함하는 what은 부적합."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "I have already uploaded the updated file to the shared repository.",
            "The client has requested a complete refund for the project software.",
            "We need to postpone the scheduling of yesterday's meeting indefinitely.",
            "Technical support services will be permanently migrated to an external vendor."
          ],
          "answerIndex": 0,
          "explanation": "뒤 문장에서 'Phase 1_Validation 디렉토리 아래에서 그것을 찾을 수 있다'며 파일 저장 위치를 지목. '업데이트된 파일을 공유 저장소에 이미 업로드해 뒀다'는 (A)가 유일한 징검다리."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["accurately", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "뒤 문장에서 '라이브 시연 중 어떤 지연도 감당할 수 없다'고 강조. 좌표가 '정확하게' 일치해야 한다는 흐름 (A) accurately."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["certain", "certainty", "certainly", "certify"],
          "answerIndex": 0,
          "explanation": "be동사와 부사 absolutely 뒤에서 주어를 보충하는 형용사 보어 자리. to be absolutely certain(완전히 확신하기 위해)을 완성하는 형용사 (A) certain."
        }
      ]
    },
    {
      "id": "p6-pat-22",
      "no": 22,
      "title": "일정 변경 및 회의 소집 안내",
      "category": "메신저",
      "contextMap": "단톡방에서 팀장·직원이 갑자기 회의 일정을 언급하며 다급하게 말을 건다면 흐름을 예측하세요.\n· **[문제 발생]** 예정된 회의가 클라이언트의 갑작스러운 일정 변경으로 조정되어야 함\n· **[변경 안 제시]** 대신 다른 시간으로 회의를 이동하려는데 괜찮은지 확인 — 연기·당김 동사구·부사 저격\n· **[정답 구역·피드백]** 변경 시간에 불참할 사람은 미리 개별 메시지·대안을 공유 — 조건절 시제·문장 삽입 저격\n· **[준비 지침]** 회의 전 공유 폴더의 기획서 초안을 반드시 검토 — 당위성·확인 관용구 저격",
      "passage": "Yoon-ah Choi (Marketing Director) [1:15 P.M.]\nHi everyone, please note that we need to adjust our schedule for this afternoon's strategic alignment meeting with the LinkMD development team.\n\nYoon-ah Choi (Marketing Director) [1:16 P.M.]\nThe client just notified me that their quarterly executive review is running over the allotted time. Consequently, our session (1) __________ until 10:00 A.M. tomorrow.\n\nMin-woo Park (UX Designer) [1:18 P.M.]\nThanks for the heads-up, Yoon-ah. Tomorrow at 10:00 A.M. works perfectly for me. I can present the updated wireframes for the Markdown-based knowledge base then.\n\nJi-seong Kim (Lead Developer) [1:19 P.M.]\n(2) __________. I have a technical integration deployment with the Supabase server that cannot be rescheduled.\n\nYoon-ah Choi (Marketing Director) [1:21 P.M.]\nI see, Ji-seong. In that case, we will record the session via our corporate portal so you can review the technical discussions later. However, please make sure to leave your system feedback (3) __________ before the end of the day.\n\nJi-seong Kim (Lead Developer) [1:22 P.M.]\nUnderstood. I will upload a comprehensive text summary of the API endpoints to our shared directory by 5:00 P.M. today so the team can (4) __________ it during the conversation.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["postpones", "will be postponed", "has postponed", "postponing"],
          "answerIndex": 1,
          "explanation": "주어 our session은 연기되는 대상이므로 수동태 필수, 문장 끝 tomorrow가 명확한 미래 단서. 미래 수동태 (B) will be postponed."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "I will definitely be able to make it on time.",
            "Unfortunately, I have a prior commitment at that hour.",
            "The budget for the software license has been approved.",
            "I am looking forward to meeting the new client representative."
          ],
          "answerIndex": 1,
          "explanation": "뒤 문장에서 '그 시간에 일정 변경 불가한 Supabase 통합 배포 작업이 있다'며 불참 사유를 댄다. '불행히도 그 시간에 선약이 있다'는 거절 총론 (B)가 자석 문장."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["writing", "in writing", "written", "write"],
          "answerIndex": 1,
          "explanation": "'서면으로, 문서 형태로'를 뜻하는 고정 전치사구 관용 표현. leave your feedback in writing. (B) in writing."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["reference", "defer", "validate", "duplicate"],
          "answerIndex": 0,
          "explanation": "API 요약본을 공유 폴더에 올려 회의 중 팀원들이 그것을 '참고·참조'할 수 있게 한다는 흐름. 타동사 (A) reference."
        }
      ]
    },
    {
      "id": "p6-pat-23",
      "no": 23,
      "title": "기기 고장 및 IT 기술 지원 요청",
      "category": "메신저",
      "contextMap": "메신저에서 직원이 다급하게 IT 지원 부서·담당자를 태그한다면 흐름을 예측하세요.\n· **[장애 보고]** 특정 시스템(서버·포털·프린터)에 문제가 생겨 업무가 중단됨\n· **[진단·대책]** IT 담당자가 로그를 확인해 특정 오류가 원인임을 밝히고 조치 — 인과 연결어·현재완료 저격\n· **[정답 구역·임시 조치]** 완전 복구 전까지 새 데이터 입력·새로고침 금지 — 부사·문장 삽입 저격\n· **[완료 예고]** 몇 분 내 정상화 예정이니 대기 요청 — 시간 전치사(within)·인내 관용구 저격",
      "passage": "Hyun-woo Kim (Financial Analyst) [9:45 A.M.]\nHi IT Help Desk, I need immediate assistance. I am currently trying to pull the real-time transaction feeds via the Korea Investment & Securities (KIS) API, but the connection keeps dropping.\n\nHyun-woo Kim (Financial Analyst) [9:46 A.M.]\nAn error code \"ERR_403_ACCESS\" keeps flashing on my dashboard. This issue is (1) __________ preventing me from completing the morning market evaluation report.\n\nSoo-jin Park (IT Support Technician) [9:48 A.M.]\nHi Hyun-woo, I see the error log on our centralized network monitor. The security protocols on the Supabase server were updated automatically at midnight, which abruptly revoked your temporary access tokens.\n\nSoo-jin Park (IT Support Technician) [9:50 A.M.]\n(2) __________. Please refrain from attempting any further manual logins for the next five minutes while I reset your authentication parameters from our end.\n\nHyun-woo Kim (Financial Analyst) [9:52 A.M.]\nGot it, Soo-jin. I will leave the terminal alone. Should I (3) __________ my entire browser cache once you give me the green light to try again?\n\nSoo-jin Park (IT Support Technician) [9:54 A.M.]\nYes, please do. That will ensure the system requests the newly generated tokens rather than using the expired ones. The patch should take effect (4) __________ the next three minutes. I will ping you here the moment it is finished.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["total", "totally", "totality", "totalize"],
          "answerIndex": 1,
          "explanation": "is + [부사] + preventing(현재분사) 구조. 진행형 동사구 사이에서 동사를 수식하는 부사 자리. (B) totally(완전히)."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "I have already initiated a manual database rollback to resolve this.",
            "Budget cuts will unfortunately delay our hardware acquisition plans.",
            "Your request to cancel the software subscription has been approved.",
            "The office layout plans have been uploaded to the shared directory."
          ],
          "answerIndex": 0,
          "explanation": "뒤 문장에서 '인증 파라미터를 초기화하는 동안 5분간 수동 로그인을 시도하지 말라'는 구체 지침. '문제 해결을 위해 수동 롤백을 이미 시작했다'는 대책 총론 (A)가 연결고리."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["clear", "clear-cut", "clearance", "clearly"],
          "answerIndex": 0,
          "explanation": "Should + 주어(I) + [동사원형] 구조. If I should clear~에서 If 생략 후 Should 도치된 가정법. 조동사 뒤 동사원형이자 캐시를 '지우다'라는 타동사 (A) clear."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["within", "throughout", "during", "along"],
          "answerIndex": 0,
          "explanation": "뒤에 the next three minutes라는 '시간의 양·한계'가 온다. '향후 3분 이내에' 패치가 적용된다는 맥락으로 기간 한계 전치사 (A) within."
        }
      ]
    },
    {
      "id": "p6-pat-24",
      "no": 24,
      "title": "업무 마감 기한 및 진행 상황 체크",
      "category": "메신저",
      "contextMap": "단톡방에서 PM이 마감일·결과물을 언급하며 팀원을 소집한다면 흐름을 예측하세요.\n· **[진행 체크]** 제안서 최종 제출이 며칠 앞으로 다가옴, 현재 진행 상황 확인\n· **[보고·문제]** 담당자가 진행 상황을 공유하며 예상치 못한 지연·추가 협조 필요를 언급 — 진행률·문제 제기 어휘 저격\n· **[정답 구역·해결]** 마감을 맞추려 다른 팀원이 특정 업무를 분담·지원하겠다고 나섬 — 미래 시제·문장 삽입 저격\n· **[독려]** 늦지 않게 완료하도록 당부 — 전치사(by/until)·완수 동사 저격",
      "passage": "Sang-wook Ji (Operations Director) [2:30 P.M.]\nHi team, I want to do a quick progress check on the final deliverables for the Q-Nexus qualitative research platform. The deadline to submit our project ledger to the government evaluation committee is fast approaching.\n\nSang-wook Ji (Operations Director) [2:31 P.M.]\nMin-ah, how close are we to (1) __________ the budgetary allocation report and expenditures summary?\n\nMin-ah Song (Accountant) [2:33 P.M.]\nI am almost there, Sang-wook. I have categorized ninety percent of the hardware procurement receipts from last quarter. However, I am experiencing a bit of a bottleneck with the consulting invoice verifications.\n\nMin-ah Song (Accountant) [2:34 P.M.]\n(2) __________. Without those, I cannot generate the final PDF summary.\n\nDae-hyun Soun (Financial Analyst) [2:36 P.M.]\nMin-ah, I finished my equity valuation models early, so my schedule is relatively clear right now. I can contact the vendor directly and request those outstanding documents so you can get them (3) __________.\n\nSang-wook Ji (Operations Director) [2:38 P.M.]\nThat would be a huge help, Dae-hyun. Thanks for stepping in. Once we have those logs, let's make sure the entire ledger is thoroughly reviewed. We must submit everything (4) __________ Friday afternoon at 5:00 P.M. sharp. No extensions are allowed.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["finalize", "finalizing", "finalized", "finalization"],
          "answerIndex": 1,
          "explanation": "숙어 how close are we to + [명사·동명사] 구조에서 to는 전치사. 뒤에 목적어(the budgetary allocation report)를 거느리므로 명사가 아닌 동명사 자리. (B) finalizing."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "I am still waiting for the audited financial logs from the external vendor.",
            "The marketing budget was substantially increased by the executive board.",
            "All employees have already completed their mandatory training modules.",
            "The physical inventory audit has been successfully executed ahead of time."
          ],
          "answerIndex": 0,
          "explanation": "뒤 문장에서 'Without those(그것들이 없으면) 최종 PDF를 만들 수 없다'며 복수 명사 those를 지칭. those가 가리킬 복수 대상(외부 업체의 감사 로그들)을 명시하는 (A)가 결합하는 자석 문장."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["promptly", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "마감이 닥쳐 병목이 생긴 상황에서 다른 팀원이 서류를 '신속하게, 지체 없이' 받아주겠다는 맥락. (A) promptly."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["until", "by", "through", "during"],
          "answerIndex": 1,
          "explanation": "뒤에 Friday afternoon at 5:00 P.M. sharp라는 제출 마감 시점, 동사도 일회성 완료 동사 submit. '늦어도 금요일 5시까지 제출 완료'라는 완료 기한 전치사 (B) by."
        }
      ]
    },
    {
      "id": "p6-pat-25",
      "no": 25,
      "title": "업무 인수인계 및 부재 대행 안내",
      "category": "메신저",
      "contextMap": "단톡방에서 직원이 자리를 비우는 기간을 언급한다면 흐름을 예측하세요.\n· **[부재 예고]** 다음 주 특정 기간 출장·휴가로 자리를 비울 예정\n· **[정답 구역·대행자]** 부재 중 긴급 업무·요청은 백업 담당자가 처리 — 대행·처리 동사·명사구 저격\n· **[자료 안내]** 진행 중 프로젝트 인수인계 파일을 공유 저장소에 업로드해 둠 — 과거·현재완료 시제·문장 삽입 저격\n· **[마무리]** 급한 용건은 메신저로 남기면 확인하는 대로 회신 다짐 — 조건절 접속사·신속성 부사 저격",
      "passage": "Do-yun Vance (Senior Consultant) [4:15 P.M.]\nHi team, I want to briefly remind everyone that I will be out of the office starting next Monday, July 13, through July 17. I will be attending the International Disaster Safety R&D Symposium to finalize our data sharing parameters.\n\nDo-yun Vance (Senior Consultant) [4:16 P.M.]\nDuring my week-long absence, I will have (1) __________ access to my corporate email framework, so my response times may be significantly delayed.\n\nJi-won Eom (Solutions Architect) [4:18 P.M.]\nThanks for the reminder, Do-yun. If any critical database ontology errors or client integration requests arise while you are away, who should we contact?\n\nDo-yun Vance (Senior Consultant) [4:20 P.M.]\n(2) __________. She has been fully briefed on the live API endpoint coordinates and is authorized to approve emergency server modifications from her end.\n\nJi-won Eom (Solutions Architect) [4:21 P.M.]\nExcellent. That ensures our operations will run smoothly. Have you already (3) __________ the latest client communication history to the centralized project folder for her reference?\n\nDo-yun Vance (Senior Consultant) [4:23 P.M.]\nYes, I did that right before lunch today. Everything is fully organized. (4) __________ any unexpected system emergencies occur that Hye-jin cannot resolve alone, she knows how to reach me via my personal mobile number.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["limited", "limiting", "limitation", "limitlessly"],
          "answerIndex": 0,
          "explanation": "have + [형용사(분사)] + access(명사) 구조. 명사 access를 수식하며 '이메일 접속이 제한될 것'이라는 문맥. have limited access to는 부재 공지 고정 표현 (A) limited."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "The system infrastructure updates have been completely suspended.",
            "Hye-jin has kindly agreed to handle all immediate technical cover for me.",
            "We are currently looking for external applicants to fill the vacant position.",
            "Yesterday's financial reports have already been submitted to management."
          ],
          "answerIndex": 1,
          "explanation": "앞은 '부재 중 누구에게 연락하나' 질문, 뒤는 'She(그녀)가 브리핑을 받았다'며 특정 여성을 지칭. 질문의 답이자 뒤 She로 이어질 여성 이름(Hye-jin)과 대행 사실을 명시한 (B)."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["transfer", "transferred", "transferring", "transfers"],
          "answerIndex": 1,
          "explanation": "Have + you + already + [과거분사]? 현재완료 의문문 구조. 빈칸은 p.p. 자리이므로 (B) transferred."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["Should", "Unless", "Although", "Because"],
          "answerIndex": 0,
          "explanation": "뒤에 any unexpected system emergencies(주어) + occur(동사원형)가 온다. If ~ should occur에서 If 생략 후 조동사 Should가 문두로 도치된 가정법 (A) Should."
        }
      ]
    }
  ]
}
```
