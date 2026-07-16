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
          "explanation": "사물 선행사 the statistical validation model 뒤에 '주어+동사(we discussed)'가 오고 목적어가 비었으므로 사물 목적격 관계대명사 자리다.\n(A) what — 선행사를 포함하는 관계사라, 이미 선행사 model이 있어 쓸 수 없다.\n(B) that — 사물 목적격. 정답.\n(C) whose — 소유격이라 뒤에 명사가 와야 하는데 절이 온다.\n(D) whom — 사람 목적격이라 사물 model에 맞지 않는다.",
          "translation": "지훈, 어제 동기화 회의에서 논의한 통계 검증 모델 업데이트는 마쳤나요?"
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
          "explanation": "뒤 문장에서 'Phase 1_Validation 디렉토리 아래에서 그것을 찾을 수 있다'며 파일 저장 위치를 지목하므로, 앞에 '파일을 공유 저장소에 업로드해 뒀다'가 와야 한다.\n(A) 업데이트된 파일을 공유 저장소에 이미 업로드해 뒀습니다 — 뒤 위치 안내로 이어져 정답.\n(B) 고객이 프로젝트 소프트웨어 전액 환불을 요청했습니다 — 파일 전달 흐름과 무관하다.\n(C) 어제 회의 일정을 무기한 연기해야 합니다 — 문맥과 무관하다.\n(D) 기술 지원 서비스가 외부 업체로 영구 이관됩니다 — 대화 흐름과 무관하다.",
          "translation": "업데이트된 파일을 공유 저장소에 이미 올려 두었습니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["accurately", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "뒤 문장에서 '라이브 시연 중 어떤 지연도 감당할 수 없다'고 강조하므로, 좌표가 '정확하게' 일치해야 한다는 흐름이다.\n(A) accurately — '정확하게'. 정답.\n(B) reluctantly — '마지못해'라 정렬 상태 수식으로 맞지 않는다.\n(C) marginally — '미미하게'라 완벽 정렬 요구와 반대다.\n(D) obsolete — 형용사라 aligned를 수식하는 부사 자리에 올 수 없다.",
          "translation": "API 엔드포인트 좌표가 KIS 프레임워크와 정확히 정렬되어 있는지 한 번 더 확인해 줄 수 있나요?"
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["certain", "certainty", "certainly", "certify"],
          "answerIndex": 0,
          "explanation": "be동사와 부사 absolutely 뒤에서 주어를 보충하는 형용사 보어 자리다(to be absolutely certain).\n(A) certain — 형용사 '확신하는'. be certain으로 정답.\n(B) certainty — 명사라 be동사 뒤 형용사 보어 자리에 부적합하다.\n(C) certainly — 부사라 보어 자리에 올 수 없다.\n(D) certify — 동사라 be동사 뒤 보어 자리에 올 수 없다.",
          "translation": "다만 완전히 확실히 하기 위해 시뮬레이션을 한 번 더 돌려 보겠습니다."
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
          "explanation": "주어 our session은 연기되는 대상이므로 수동태가 필요하고, 문장 끝 tomorrow가 명확한 미래 단서다.\n(A) postpones — 능동이라 session이 '연기하는' 주체가 되어 태가 어긋난다.\n(B) will be postponed — 미래 수동태. 정답.\n(C) has postponed — 능동 현재완료라 태·시제 모두 맞지 않는다.\n(D) postponing — 분사라 본동사 자리에 올 수 없다.",
          "translation": "따라서 우리 회의는 내일 오전 10시로 연기됩니다."
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
          "explanation": "뒤 문장에서 '그 시간에 일정 변경 불가한 Supabase 통합 배포 작업이 있다'며 불참 사유를 대므로, 앞에 '유감스럽게도 선약이 있다'는 거절이 와야 한다.\n(A) 저는 분명히 제시간에 갈 수 있습니다 — 뒤 불참 사유와 모순된다.\n(B) 유감스럽게도 그 시간에 선약이 있습니다 — 뒤 사유 설명의 총론이라 정답.\n(C) 소프트웨어 라이선스 예산이 승인되었습니다 — 일정 대화와 무관하다.\n(D) 새 고객 담당자를 만나기를 고대합니다 — 불참 맥락과 어긋난다.",
          "translation": "유감스럽게도 그 시간에 선약이 있습니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["writing", "in writing", "written", "write"],
          "answerIndex": 1,
          "explanation": "'서면으로'를 뜻하는 고정 전치사구가 필요하다(leave your feedback in writing).\n(A) writing — 단독으로는 '서면으로'라는 방식 표현이 되지 못한다.\n(B) in writing — '서면으로'. 고정 표현으로 정답.\n(C) written — 과거분사라 leave your feedback written의 어순·의미가 어색하다.\n(D) write — 동사원형이라 목적어 뒤 방식 자리에 올 수 없다.",
          "translation": "다만 오늘 업무 종료 전에 시스템 피드백을 반드시 서면으로 남겨 주세요."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["reference", "defer", "validate", "duplicate"],
          "answerIndex": 0,
          "explanation": "API 요약본을 공유 폴더에 올려 회의 중 팀원들이 그것을 '참고·참조'할 수 있게 한다는 흐름이다.\n(A) reference — '참조하다'. 정답.\n(B) defer — '미루다/따르다'라 자료 활용 의미와 맞지 않는다.\n(C) validate — '검증하다'라 회의 중 참고 맥락과 다르다.\n(D) duplicate — '복제하다'라 문맥과 맞지 않는다.",
          "translation": "오늘 오후 5시까지 API 엔드포인트 요약본을 공유 폴더에 올려, 팀이 대화 중 참고할 수 있게 하겠습니다."
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
          "explanation": "'is + [부사] + preventing(현재분사)' 진행형 동사구 사이에서 동사를 수식하는 부사 자리다.\n(A) total — 형용사라 진행형 동사를 수식하지 못한다.\n(B) totally — 부사 '완전히'. preventing을 수식해 정답.\n(C) totality — 명사라 수식 자리에 올 수 없다.\n(D) totalize — 동사라 부사 자리에 부적합하다.",
          "translation": "이 문제 때문에 오전 시장 평가 보고서를 전혀 완성하지 못하고 있습니다."
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
          "explanation": "뒤 문장에서 '인증 파라미터를 초기화하는 동안 5분간 수동 로그인을 시도하지 말라'는 구체 지침이 오므로, 앞에 '문제 해결을 위해 수동 롤백을 이미 시작했다'는 대책이 와야 한다.\n(A) 이 문제 해결을 위해 이미 수동 데이터베이스 롤백을 시작했습니다 — 뒤 지침의 대책 총론이라 정답.\n(B) 예산 삭감으로 하드웨어 구매 계획이 지연됩니다 — 장애 대응 흐름과 무관하다.\n(C) 소프트웨어 구독 취소 요청이 승인되었습니다 — 문맥과 무관하다.\n(D) 사무실 배치도가 공유 폴더에 업로드되었습니다 — 대화와 무관하다.",
          "translation": "이 문제를 해결하려고 이미 수동 데이터베이스 롤백을 시작했습니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["clear", "clear-cut", "clearance", "clearly"],
          "answerIndex": 0,
          "explanation": "'If I should clear~'에서 If가 생략되고 Should가 도치된 형태라, 조동사 뒤 동사원형이자 캐시를 '지우다'라는 타동사가 필요하다.\n(A) clear — 동사원형 '지우다'. Should I clear로 정답.\n(B) clear-cut — 형용사('명확한')라 조동사 뒤 동사 자리에 올 수 없다.\n(C) clearance — 명사라 동사 자리에 올 수 없다.\n(D) clearly — 부사라 조동사 뒤 본동사가 될 수 없다.",
          "translation": "다시 시도해도 된다고 하시면 브라우저 캐시를 전부 지울까요?"
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["within", "throughout", "during", "along"],
          "answerIndex": 0,
          "explanation": "뒤에 the next three minutes라는 '시간의 양·한계'가 오므로, '향후 3분 이내에' 패치가 적용된다는 기간 한계 전치사가 필요하다.\n(A) within — '~이내에'. 정답.\n(B) throughout — '~내내'라 '적용된다'는 완료성과 맞지 않는다.\n(C) during — '~동안'이라 완료 시점 한계 의미가 약하다.\n(D) along — '~을 따라'라 시간 표현과 맞지 않는다.",
          "translation": "패치는 향후 3분 이내에 적용될 것입니다."
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
          "explanation": "'how close are we to + [명사/동명사]'에서 to는 전치사이며, 뒤에 목적어(the report)를 거느리므로 동명사가 필요하다.\n(A) finalize — 동사원형이라 전치사 to 뒤에 올 수 없다.\n(B) finalizing — 동명사. 뒤 목적어를 지배해 정답.\n(C) finalized — 과거형/분사라 전치사 뒤 목적어 자리에 부적합하다.\n(D) finalization — 명사라 뒤에 목적어 the report를 직접 지배하지 못한다.",
          "translation": "민아, 예산 배정 보고서와 지출 요약본은 마무리에 얼마나 가까워졌나요?"
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
          "explanation": "뒤 문장에서 'Without those(그것들이 없으면) 최종 PDF를 만들 수 없다'며 복수 명사 those를 지칭하므로, those가 가리킬 복수 대상을 명시하는 문장이 와야 한다.\n(A) 외부 업체의 감사받은 재무 로그를 아직 기다리고 있습니다 — 뒤 those의 지시 대상이라 정답.\n(B) 마케팅 예산이 이사회에 의해 크게 증액되었습니다 — 병목 설명과 무관하다.\n(C) 전 직원이 의무 교육을 이미 마쳤습니다 — 문맥과 무관하다.\n(D) 실물 재고 실사가 예정보다 일찍 성공적으로 실행되었습니다 — 병목(미완료) 맥락과 모순된다.",
          "translation": "외부 업체로부터 감사받은 재무 기록을 아직 기다리고 있습니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["promptly", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "마감이 닥쳐 병목이 생긴 상황에서 다른 팀원이 서류를 '신속하게, 지체 없이' 받아주겠다는 맥락이다.\n(A) promptly — '신속하게'. 정답.\n(B) reluctantly — '마지못해'라 지원 취지와 반대다.\n(C) marginally — '미미하게'라 문맥과 어긋난다.\n(D) obsolete — 형용사라 동사 get을 수식하는 부사 자리에 올 수 없다.",
          "translation": "제가 업체에 직접 연락해 미비 서류를 요청할 테니, 당신이 그것을 신속히 받을 수 있게 하겠습니다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["until", "by", "through", "during"],
          "answerIndex": 1,
          "explanation": "뒤에 Friday afternoon at 5:00 P.M. sharp라는 제출 마감 시점이 오고 동사도 일회성 완료 동사 submit이므로, 완료 기한 전치사가 필요하다.\n(A) until — '~까지 계속'이라 일회성 완료 동사 submit과 맞지 않는다.\n(B) by — '~까지(완료 기한)'. 정답.\n(C) through — '~내내/통해'라 마감 시점 표현과 맞지 않는다.\n(D) during — '~동안'이라 특정 마감 시점과 어긋난다.",
          "translation": "우리는 늦어도 금요일 오후 5시 정각까지 모든 것을 제출해야 합니다."
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
          "explanation": "'have + [형용사(분사)] + access(명사)' 구조로 명사 access를 수식하며, '이메일 접속이 제한될 것'이라는 문맥이다(have limited access to는 부재 공지 고정 표현).\n(A) limited — 과거분사형 형용사 '제한된'. access를 수식해 정답.\n(B) limiting — 현재분사(능동)라 '제한하는 접속'이 되어 의미가 어긋난다.\n(C) limitation — 명사라 명사 access 앞의 수식 형용사 자리에 올 수 없다.\n(D) limitlessly — 부사라 명사를 수식하지 못하고 의미(무제한)도 반대다.",
          "translation": "일주일간 자리를 비우는 동안 회사 이메일 접속이 제한되어 회신이 크게 늦어질 수 있습니다."
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
          "explanation": "앞은 '부재 중 누구에게 연락하나'라는 질문, 뒤는 'She(그녀)가 브리핑을 받았다'며 특정 여성을 지칭하므로, 질문의 답이자 뒤 She로 이어질 대행자를 명시해야 한다.\n(A) 시스템 인프라 업데이트가 완전히 중단되었습니다 — 질문의 답이 아니다.\n(B) 혜진이 제 긴급 기술 대행을 맡아 주기로 했습니다 — 질문의 답이자 뒤 She로 이어져 정답.\n(C) 현재 공석을 채울 외부 지원자를 찾고 있습니다 — 임시 대행 질문과 맞지 않는다.\n(D) 어제 재무 보고서가 이미 경영진에 제출되었습니다 — 문맥과 무관하다.",
          "translation": "혜진이 제 긴급 기술 대행을 흔쾌히 맡아 주기로 했습니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["transfer", "transferred", "transferring", "transfers"],
          "answerIndex": 1,
          "explanation": "'Have + you + already + [과거분사]?'의 현재완료 의문문 구조라 빈칸은 과거분사 자리다.\n(A) transfer — 동사원형이라 현재완료의 p.p. 자리에 올 수 없다.\n(B) transferred — 과거분사. have transferred로 정답.\n(C) transferring — 현재분사라 완료 시제를 만들지 못한다.\n(D) transfers — 현재단수라 have 뒤 p.p. 자리에 부적합하다.",
          "translation": "혜진이 참고할 수 있도록 최신 고객 커뮤니케이션 이력을 중앙 프로젝트 폴더에 이미 옮겨 두었나요?"
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["Should", "Unless", "Although", "Because"],
          "answerIndex": 0,
          "explanation": "뒤에 'any unexpected system emergencies(주어) + occur(동사원형)'가 오므로, 'If ~ should occur'에서 If가 생략되고 Should가 도치된 가정법이다.\n(A) Should — 가정법 If 생략 도치. '혹시 발생하면'으로 정답.\n(B) Unless — '~하지 않는 한'이라 도치 없이 주어+정형동사가 와야 하고 의미도 어긋난다.\n(C) Although — '비록 ~지만'이라 조건 의미가 아니고 도치 구조와도 맞지 않는다.\n(D) Because — '~때문에'라 조건·도치와 맞지 않는다.",
          "translation": "혜진이 혼자 해결할 수 없는 예상치 못한 시스템 비상 상황이 생기면, 그녀는 제 개인 휴대폰으로 연락하는 법을 알고 있습니다."
        }
      ]
    }
  ]
}
```
