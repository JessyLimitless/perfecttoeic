import type { PassageSet } from "@/game/types";

/**
 * 샘플 문제 은행 (시드) — 실제 토익 RC Part 7 형식
 * - 한 지문 + 여러 문항(목적/세부/추론/동의어/의도 파악)
 * - 영어 원문 + 한글 번역 문장별 병기 (통독)
 * - 컨셉: 글로벌 IT 기업 실무 (AI & 데이터 분석)
 * - 정식 문제는 .bridge 로 라이브 공급.
 */
export const SAMPLE_SETS: PassageSet[] = [
  // ════════════════ EASY ════════════════
  {
    id: "set-easy-wifi",
    difficulty: "EASY",
    passageType: "Email",
    passageLines: [
      { en: "Subject: Office Wi-Fi Upgrade", ko: "제목: 사무실 와이파이 업그레이드" },
      {
        en: "Our office Wi-Fi network will be upgraded this Thursday, June 5, from 7:00 P.M. to 10:00 P.M.",
        ko: "사무실 와이파이 네트워크가 6월 5일 목요일 오후 7시부터 10시까지 업그레이드됩니다.",
      },
      {
        en: "During this time, internet access will be unavailable on all floors.",
        ko: "이 시간 동안에는 전 층에서 인터넷을 사용할 수 없습니다.",
      },
      {
        en: "We recommend saving your work and logging off before you leave for the day.",
        ko: "퇴근 전에 작업을 저장하고 로그오프해 두시길 권장합니다.",
      },
      {
        en: "If you need internet during the upgrade, please use the first-floor meeting rooms, which are on a separate network.",
        ko: "업그레이드 중 인터넷이 필요하면, 별도 네트워크를 쓰는 1층 회의실을 이용해 주세요.",
      },
    ],
    questions: [
      {
        id: "q-wifi-1",
        prompt: "When will the Wi-Fi upgrade take place?",
        promptKo: "와이파이 업그레이드는 언제 진행되는가?",
        choices: [
          "On Thursday evening",
          "On Friday morning",
          "Over the weekend",
          "On Monday afternoon",
        ],
        choicesKo: ["목요일 저녁", "금요일 아침", "주말 동안", "월요일 오후"],
        answerIndex: 0,
        explanation:
          "둘째 문장에서 '6월 5일 목요일 오후 7시~10시'에 업그레이드한다고 했으므로 목요일 저녁입니다.",
        category: "세부사항",
      },
      {
        id: "q-wifi-2",
        prompt: "What are employees advised to do?",
        promptKo: "직원들은 무엇을 하도록 권고받는가?",
        choices: [
          "Work from home that day",
          "Save their work and log off before leaving",
          "Reset their passwords",
          "Move to the first floor permanently",
        ],
        choicesKo: [
          "그날 재택근무한다",
          "퇴근 전에 작업을 저장하고 로그오프한다",
          "비밀번호를 재설정한다",
          "영구히 1층으로 옮긴다",
        ],
        answerIndex: 1,
        explanation:
          "'퇴근 전에 작업을 저장하고 로그오프하라'고 권장했습니다.",
        category: "세부사항",
      },
    ],
  },
  {
    id: "set-easy-chat",
    difficulty: "EASY",
    passageType: "Text Message Chain",
    passageLines: [
      {
        en: "Daniel (2:14 P.M.): Hi Sora, are the survey results ready? The client just asked for them.",
        ko: "Daniel (오후 2:14): 소라 님, 설문 결과 준비됐나요? 방금 고객사가 요청했어요.",
      },
      {
        en: "Sora (2:16 P.M.): Almost. I'm just cleaning up the last chart now.",
        ko: "Sora (오후 2:16): 거의요. 지금 마지막 차트만 정리하고 있어요.",
      },
      {
        en: "Daniel (2:17 P.M.): Great. Can you send them by 3:00?",
        ko: "Daniel (오후 2:17): 좋아요. 3시까지 보내줄 수 있어요?",
      },
      {
        en: "Sora (2:18 P.M.): No problem. I'll email the file to you and the client together.",
        ko: "Sora (오후 2:18): 문제없어요. 파일을 당신과 고객사에 함께 이메일로 보낼게요.",
      },
    ],
    questions: [
      {
        id: "q-chat-1",
        prompt:
          'At 2:18 P.M., what does Sora most likely mean when she writes, "No problem"?',
        promptKo: '오후 2:18에 Sora가 "문제없어요"라고 쓴 의미로 가장 적절한 것은?',
        choices: [
          "She cannot find the file.",
          "She can send the results by 3:00.",
          "She needs more survey responses.",
          "She will fix the client's computer.",
        ],
        choicesKo: [
          "파일을 찾지 못한다.",
          "3시까지 결과를 보낼 수 있다.",
          "설문 응답이 더 필요하다.",
          "고객의 컴퓨터를 고칠 것이다.",
        ],
        answerIndex: 1,
        explanation:
          "Daniel이 '3시까지 보내줄 수 있냐'고 묻자 Sora가 '문제없어요'라고 답했으므로, 3시까지 보낼 수 있다는 뜻입니다.",
        category: "의도 파악",
      },
      {
        id: "q-chat-2",
        prompt: "Who will receive the file?",
        promptKo: "파일을 받는 사람은 누구인가?",
        choices: [
          "Only Daniel",
          "Only the client",
          "Daniel and the client",
          "The entire survey team",
        ],
        choicesKo: ["Daniel만", "고객사만", "Daniel과 고객사", "설문팀 전체"],
        answerIndex: 2,
        explanation:
          "Sora가 '당신과 고객사에 함께' 이메일로 보내겠다고 했습니다.",
        category: "세부사항",
      },
    ],
  },

  // ════════════════ MEDIUM ════════════════
  {
    id: "set-medium-migration",
    difficulty: "MEDIUM",
    passageType: "Email",
    passageLines: [
      { en: "To: All Data Science Staff", ko: "수신: 데이터 사이언스 전 직원" },
      {
        en: "From: Rebecca Lin, Director of Analytics",
        ko: "발신: 분석 부문 책임자 Rebecca Lin",
      },
      {
        en: "Subject: Migration to the New Reporting Platform",
        ko: "제목: 새 리포팅 플랫폼으로의 이전",
      },
      {
        en: "Over the past quarter, our team has prepared to move all internal dashboards to Helix, our new cloud-based reporting platform.",
        ko: "지난 분기 동안 우리 팀은 모든 내부 대시보드를 새 클라우드 기반 리포팅 플랫폼인 Helix로 옮길 준비를 해왔습니다.",
      },
      {
        en: "The migration will take place over the weekend of March 22, and starting Monday, March 24, all reports must be accessed through Helix.",
        ko: "이전은 3월 22일 주말에 진행되며, 3월 24일 월요일부터 모든 리포트는 Helix를 통해 접근해야 합니다.",
      },
      {
        en: "The old system will remain available in read-only mode until April 7 so that you can verify your saved queries.",
        ko: "기존 시스템은 4월 7일까지 읽기 전용 모드로 유지되어, 저장된 쿼리를 확인할 수 있습니다.",
      },
      {
        en: "If your dashboards contain custom scripts, please contact the IT team before the migration, as these may need manual updates.",
        ko: "대시보드에 사용자 지정 스크립트가 있다면, 수동 업데이트가 필요할 수 있으니 이전 전에 IT팀에 연락해 주세요.",
      },
    ],
    questions: [
      {
        id: "q-mig-1",
        prompt: "What is the main purpose of the email?",
        promptKo: "이메일의 주된 목적은 무엇인가?",
        choices: [
          "To announce a change to the reporting system",
          "To request feedback on a new dashboard",
          "To schedule performance reviews",
          "To introduce a new team member",
        ],
        choicesKo: [
          "리포팅 시스템 변경을 알리기 위해",
          "새 대시보드에 대한 의견을 요청하기 위해",
          "인사 평가 일정을 잡기 위해",
          "새 팀원을 소개하기 위해",
        ],
        answerIndex: 0,
        explanation:
          "이메일 전체가 내부 대시보드를 Helix로 이전한다는 변경 사항을 공지하고 있습니다.",
        category: "주제/목적",
      },
      {
        id: "q-mig-2",
        prompt: "Until when can the old system be used?",
        promptKo: "기존 시스템은 언제까지 사용할 수 있는가?",
        choices: ["Until March 22", "Until March 24", "Until April 7", "Indefinitely"],
        choicesKo: ["3월 22일까지", "3월 24일까지", "4월 7일까지", "무기한"],
        answerIndex: 2,
        explanation:
          "기존 시스템은 4월 7일까지 읽기 전용 모드로 유지된다고 했습니다.",
        category: "세부사항",
      },
      {
        id: "q-mig-3",
        prompt: "What should employees with custom scripts do?",
        promptKo: "사용자 지정 스크립트가 있는 직원은 무엇을 해야 하는가?",
        choices: [
          "Delete the scripts",
          "Contact the IT team before the migration",
          "Attend a training session",
          "Rebuild their dashboards in Helix",
        ],
        choicesKo: [
          "스크립트를 삭제한다",
          "이전 전에 IT팀에 연락한다",
          "교육 세션에 참석한다",
          "Helix에서 대시보드를 다시 만든다",
        ],
        answerIndex: 1,
        explanation:
          "스크립트가 있으면 수동 업데이트가 필요할 수 있으니 이전 전에 IT팀에 연락하라고 했습니다.",
        category: "세부사항",
      },
    ],
  },
  {
    id: "set-medium-dataquality",
    difficulty: "MEDIUM",
    passageType: "Article",
    passageLines: [
      {
        en: "A recent survey of mid-sized companies found that nearly 70 percent now use some form of data analytics to guide business decisions.",
        ko: "중견기업을 대상으로 한 최근 설문에서, 약 70%가 이제 사업 결정을 위해 어떤 형태로든 데이터 분석을 활용하는 것으로 나타났다.",
      },
      {
        en: "However, the same survey revealed that only a third of these companies feel confident in the quality of their data.",
        ko: "그러나 같은 설문에서, 이들 기업 중 데이터 품질에 자신 있다고 느끼는 곳은 3분의 1에 불과한 것으로 드러났다.",
      },
      {
        en: "Experts say poor data quality often leads to misleading conclusions, which can be more harmful than having no data at all.",
        ko: "전문가들은 낮은 데이터 품질이 종종 잘못된 결론으로 이어지며, 이는 아예 데이터가 없는 것보다 해로울 수 있다고 말한다.",
      },
      {
        en: "To address this, many firms are now investing in data-governance programs that set clear standards for how data is collected and stored.",
        ko: "이를 해결하기 위해 많은 기업이 데이터 수집·저장 방식에 명확한 기준을 세우는 데이터 거버넌스 프로그램에 투자하고 있다.",
      },
    ],
    questions: [
      {
        id: "q-dq-1",
        prompt: "What is the article mainly about?",
        promptKo: "이 기사는 주로 무엇에 관한 것인가?",
        choices: [
          "The high cost of analytics software",
          "The gap between using data and trusting its quality",
          "A new law on data privacy",
          "The decline of traditional surveys",
        ],
        choicesKo: [
          "분석 소프트웨어의 높은 비용",
          "데이터 활용과 품질 신뢰 사이의 격차",
          "데이터 프라이버시에 관한 새 법률",
          "전통적 설문조사의 쇠퇴",
        ],
        answerIndex: 1,
        explanation:
          "많은 기업이 데이터를 쓰지만 품질엔 자신이 없다는 격차와 그 해결책을 다룹니다.",
        category: "주제/대의",
      },
      {
        id: "q-dq-2",
        prompt: "According to experts, why is poor data quality dangerous?",
        promptKo: "전문가에 따르면, 낮은 데이터 품질이 위험한 이유는?",
        choices: [
          "It can lead to misleading conclusions.",
          "It increases software costs.",
          "It slows down computers.",
          "It violates privacy laws.",
        ],
        choicesKo: [
          "잘못된 결론으로 이어질 수 있어서",
          "소프트웨어 비용을 늘려서",
          "컴퓨터를 느리게 해서",
          "프라이버시 법을 위반해서",
        ],
        answerIndex: 0,
        explanation:
          "전문가들은 낮은 품질이 잘못된 결론을 낳아 데이터가 없는 것보다 해로울 수 있다고 했습니다.",
        category: "세부사항",
      },
      {
        id: "q-dq-3",
        prompt:
          "What does the article say companies are doing to improve data quality?",
        promptKo:
          "기사에 따르면 기업들은 데이터 품질을 높이기 위해 무엇을 하고 있는가?",
        choices: [
          "Hiring more survey staff",
          "Investing in data-governance programs",
          "Collecting far less data",
          "Avoiding analytics altogether",
        ],
        choicesKo: [
          "설문 인력을 더 고용한다",
          "데이터 거버넌스 프로그램에 투자한다",
          "데이터를 훨씬 적게 수집한다",
          "분석을 아예 피한다",
        ],
        answerIndex: 1,
        explanation:
          "마지막 문장에서 데이터 수집·저장 기준을 세우는 거버넌스 프로그램에 투자한다고 했습니다.",
        category: "추론",
      },
    ],
  },

  // ════════════════ HARD ════════════════
  {
    id: "set-hard-chatbot",
    difficulty: "HARD",
    passageType: "Internal Report",
    passageLines: [
      {
        en: "Following the launch of our AI-powered customer-support chatbot, average response time fell from twelve minutes to under one minute.",
        ko: "AI 기반 고객 지원 챗봇 출시 이후, 평균 응답 시간이 12분에서 1분 미만으로 줄었다.",
      },
      {
        en: "Customer satisfaction scores, however, rose only marginally, suggesting that speed alone does not guarantee a better experience.",
        ko: "그러나 고객 만족도 점수는 미미하게만 올라, 속도만으로는 더 나은 경험이 보장되지 않음을 시사한다.",
      },
      {
        en: "A closer look at the transcripts revealed that the chatbot frequently failed to resolve complex billing issues, forcing customers to repeat themselves to a human agent.",
        ko: "대화 기록을 자세히 살펴본 결과, 챗봇이 복잡한 청구 문제를 해결하지 못해 고객이 상담원에게 같은 내용을 반복해야 하는 경우가 잦았다.",
      },
      {
        en: "We therefore recommend routing billing-related questions directly to human agents while continuing to use the chatbot for simpler, routine inquiries.",
        ko: "따라서 청구 관련 문의는 상담원에게 바로 연결하고, 단순·일상적 문의에는 챗봇을 계속 활용할 것을 권고한다.",
      },
    ],
    questions: [
      {
        id: "q-bot-1",
        prompt: "What does the report suggest about the chatbot?",
        promptKo: "보고서가 챗봇에 대해 시사하는 바는 무엇인가?",
        choices: [
          "It increased response time.",
          "It handles simple questions better than complex ones.",
          "It fully replaced human agents.",
          "It sharply lowered customer satisfaction.",
        ],
        choicesKo: [
          "응답 시간을 늘렸다.",
          "복잡한 문의보다 단순한 문의를 더 잘 처리한다.",
          "상담원을 완전히 대체했다.",
          "고객 만족도를 급격히 낮췄다.",
        ],
        answerIndex: 1,
        explanation:
          "챗봇이 복잡한 청구 문제는 해결 못 했지만 단순 문의엔 계속 쓰자고 권고하므로, 단순 문의를 더 잘 처리함을 시사합니다.",
        category: "추론",
      },
      {
        id: "q-bot-2",
        prompt:
          'In the second sentence, the word "marginally" is closest in meaning to',
        promptKo: '둘째 문장에서 "marginally"와 의미가 가장 가까운 것은?',
        choices: ["slightly", "rapidly", "doubtfully", "permanently"],
        choicesKo: ["약간", "빠르게", "의심스럽게", "영구히"],
        answerIndex: 0,
        explanation:
          "marginally는 '미미하게, 약간'의 뜻으로 slightly와 가장 가깝습니다.",
        category: "동의어",
      },
      {
        id: "q-bot-3",
        prompt: "What does the report recommend for billing-related questions?",
        promptKo: "보고서는 청구 관련 문의에 대해 무엇을 권고하는가?",
        choices: [
          "Routing them directly to human agents",
          "Handling them only with the chatbot",
          "Delaying every response by one minute",
          "Removing them from the system",
        ],
        choicesKo: [
          "상담원에게 바로 연결하기",
          "챗봇으로만 처리하기",
          "모든 응답을 1분씩 늦추기",
          "시스템에서 제거하기",
        ],
        answerIndex: 0,
        explanation: "청구 문의는 상담원에게 바로 연결하라고 권고했습니다.",
        category: "세부사항",
      },
    ],
  },
  {
    id: "set-hard-interpretability",
    difficulty: "HARD",
    passageType: "Article",
    passageLines: [
      {
        en: "As machine-learning models grow more complex, a troubling trade-off has emerged: the most accurate models are often the hardest to interpret.",
        ko: "머신러닝 모델이 복잡해질수록 곤란한 절충이 나타났다. 가장 정확한 모델이 흔히 가장 해석하기 어렵다는 점이다.",
      },
      {
        en: "When a model's reasoning cannot be explained, organizations may hesitate to rely on it for high-stakes decisions such as approving loans.",
        ko: "모델의 판단 근거를 설명할 수 없으면, 조직은 대출 승인처럼 중대한 결정에 그 모델을 의존하기를 주저할 수 있다.",
      },
      {
        en: "In response, researchers have built tools that highlight which factors most influenced a given prediction, offering a partial window into otherwise opaque systems.",
        ko: "이에 대응해 연구자들은 특정 예측에 가장 큰 영향을 준 요인을 보여주는 도구를 만들어, 불투명한 시스템을 부분적으로나마 들여다볼 창을 제공한다.",
      },
      {
        en: "Still, experts caution that such explanations are approximations and should not be mistaken for a complete account of how a model works.",
        ko: "그럼에도 전문가들은 이러한 설명이 근사치일 뿐이며, 모델 작동 방식에 대한 완전한 설명으로 오해해서는 안 된다고 경고한다.",
      },
    ],
    questions: [
      {
        id: "q-int-1",
        prompt: "What trade-off does the article describe?",
        promptKo: "기사가 설명하는 절충은 무엇인가?",
        choices: [
          "Faster models use more energy.",
          "More accurate models are often harder to interpret.",
          "Cheaper models are less secure.",
          "Larger datasets reduce accuracy.",
        ],
        choicesKo: [
          "더 빠른 모델이 에너지를 더 쓴다.",
          "더 정확한 모델이 흔히 해석하기 더 어렵다.",
          "더 저렴한 모델이 덜 안전하다.",
          "더 큰 데이터셋이 정확도를 낮춘다.",
        ],
        answerIndex: 1,
        explanation:
          "첫 문장에서 가장 정확한 모델이 가장 해석하기 어렵다는 절충을 제시합니다.",
        category: "주제/세부",
      },
      {
        id: "q-int-2",
        prompt:
          'In the third sentence, the word "opaque" is closest in meaning to',
        promptKo: '셋째 문장에서 "opaque"와 의미가 가장 가까운 것은?',
        choices: [
          "transparent",
          "difficult to understand",
          "inexpensive",
          "outdated",
        ],
        choicesKo: ["투명한", "이해하기 어려운", "저렴한", "구식의"],
        answerIndex: 1,
        explanation:
          "opaque는 '불투명한 → 이해하기 어려운'의 의미로 difficult to understand와 가깝습니다. transparent(투명한)는 반대입니다.",
        category: "동의어",
      },
      {
        id: "q-int-3",
        prompt: "What do experts caution about the new tools?",
        promptKo: "전문가들은 새 도구에 대해 무엇을 경고하는가?",
        choices: [
          "They are too expensive for most firms.",
          "Their explanations are only approximations.",
          "They make models less accurate.",
          "They will soon be banned.",
        ],
        choicesKo: [
          "대부분 기업엔 너무 비싸다.",
          "그 설명은 근사치에 불과하다.",
          "모델을 덜 정확하게 만든다.",
          "곧 금지될 것이다.",
        ],
        answerIndex: 1,
        explanation:
          "전문가들은 이런 설명이 근사치일 뿐 완전한 설명으로 오해하면 안 된다고 경고합니다.",
        category: "추론",
      },
    ],
  },
];
