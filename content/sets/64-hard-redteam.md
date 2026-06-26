# Set 64 — HARD — LLM Red-Teaming (Report)

```json
{
  "id": "set-hard-redteam",
  "difficulty": "HARD",
  "passageType": "Report",
  "passageLines": [
    {
      "en": "This quarter the Trust & Safety group ran its first structured red-teaming exercise against our customer-facing assistant before the public launch.",
      "ko": "이번 분기에 신뢰·안전 그룹은 공개 출시에 앞서 고객 대면 어시스턴트를 상대로 첫 구조화된 레드티밍 훈련을 실시했습니다."
    },
    {
      "en": "Unlike a standard quality check, red-teaming deliberately recruits people to behave like adversaries, probing the model for ways it can be coaxed into harmful or off-policy responses.",
      "ko": "표준 품질 점검과 달리, 레드티밍은 사람들을 의도적으로 공격자처럼 행동하도록 모집하여, 모델이 유해하거나 정책에 어긋나는 응답을 하도록 유도될 수 있는 경로를 탐색합니다."
    },
    {
      "en": "Twelve testers spent two weeks submitting prompts designed to bypass the assistant's guardrails rather than to use it as intended.",
      "ko": "열두 명의 테스터가 2주 동안 어시스턴트를 의도대로 사용하기보다는 그 안전장치를 우회하도록 설계된 프롬프트를 제출하며 시간을 보냈습니다."
    },
    {
      "en": "The most productive attacks were rarely blunt; testers found that wrapping a forbidden request inside a fictional role-play or a step-by-step 'hypothetical' often slipped past filters that a direct request would have triggered.",
      "ko": "가장 효과적인 공격은 좀처럼 노골적이지 않았습니다. 테스터들은 금지된 요청을 가상의 역할극이나 단계별 '가정' 안에 감싸면, 직접적인 요청이라면 작동시켰을 필터를 흔히 빠져나간다는 것을 발견했습니다."
    },
    {
      "en": "In total the team logged 47 successful bypasses, which we have grouped into four failure patterns rather than treating each as an isolated bug.",
      "ko": "팀은 총 47건의 성공적 우회를 기록했으며, 우리는 각각을 별개의 버그로 취급하기보다 네 가지 실패 패턴으로 묶었습니다."
    },
    {
      "en": "Grouping matters because patching individual prompts is a losing game: an attacker can rephrase indefinitely, so a fix that addresses only the exact wording we observed will not hold.",
      "ko": "묶음으로 보는 것이 중요한 이유는, 개별 프롬프트를 땜질하는 것은 지는 게임이기 때문입니다. 공격자는 무한히 표현을 바꿀 수 있으므로, 우리가 관찰한 정확한 문구만 다루는 수정은 버티지 못합니다."
    },
    {
      "en": "The single largest cluster, accounting for nearly half of the bypasses, exploited the model's tendency to comply once it had agreed to a benign framing earlier in the conversation.",
      "ko": "우회의 거의 절반을 차지한 가장 큰 단일 군집은, 모델이 대화 초반에 일단 무해한 설정에 동의하고 나면 순응하려는 경향을 악용했습니다."
    },
    {
      "en": "We recommend that the modeling team treat these clusters as training signal, fine-tuning on the adversarial transcripts so the assistant learns the underlying pattern, not the surface phrasing.",
      "ko": "우리는 모델링 팀이 이 군집들을 학습 신호로 취급하여, 어시스턴트가 표면적 문구가 아니라 그 기저의 패턴을 학습하도록 적대적 대화 기록으로 미세 조정할 것을 권고합니다."
    },
    {
      "en": "It would be a mistake, however, to read a low post-fix failure rate as proof of safety.",
      "ko": "그러나 수정 이후의 낮은 실패율을 안전성의 증거로 읽는 것은 실수일 것입니다."
    },
    {
      "en": "Red-teaming can demonstrate that vulnerabilities exist, but it can never demonstrate their absence; the next exercise will almost certainly surface patterns this one did not imagine.",
      "ko": "레드티밍은 취약점이 존재함을 보여줄 수는 있지만, 그것의 부재를 보여줄 수는 결코 없습니다. 다음 훈련은 이번 훈련이 상상하지 못한 패턴을 거의 틀림없이 드러낼 것입니다."
    },
    {
      "en": "For that reason we are proposing that red-teaming become a recurring gate before every major model update rather than a one-time pre-launch milestone.",
      "ko": "그러한 이유로 우리는 레드티밍을 일회성 출시 전 이정표가 아니라 모든 주요 모델 업데이트 이전의 반복적 관문으로 삼을 것을 제안합니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-redteam-q1",
      "prompt": "What is the main purpose of the report?",
      "promptKo": "이 리포트의 주된 목적은 무엇인가?",
      "choices": [
        "To announce that the assistant is now fully secure and ready to launch.",
        "To summarize a red-teaming exercise and recommend how to act on its findings.",
        "To compare the assistant's performance against a competitor's product.",
        "To request additional budget for hiring more customer-support staff."
      ],
      "choicesKo": [
        "어시스턴트가 이제 완전히 안전하며 출시 준비가 되었음을 알리려고",
        "레드티밍 훈련을 요약하고 그 결과에 어떻게 대응할지 권고하려고",
        "어시스턴트의 성능을 경쟁사 제품과 비교하려고",
        "고객 지원 인력을 더 채용하기 위한 추가 예산을 요청하려고"
      ],
      "answerIndex": 1,
      "explanation": "리포트는 레드티밍 훈련의 진행·결과(47건 우회, 네 패턴)를 요약하고 미세 조정·반복 관문 등 대응을 권고하므로 (나)가 정답입니다. (가)는 본문이 명시적으로 부정하는 내용입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-redteam-q2",
      "prompt": "Why does the team group the bypasses into patterns instead of fixing them individually?",
      "promptKo": "팀이 우회를 개별적으로 고치는 대신 패턴으로 묶는 이유는 무엇인가?",
      "choices": [
        "Because each prompt is too short to analyze on its own.",
        "Because the testing tool can only display results in groups.",
        "Because management requires exactly four categories in every report.",
        "Because attackers can rephrase endlessly, so wording-specific fixes will not hold."
      ],
      "choicesKo": [
        "각 프롬프트가 단독으로 분석하기에 너무 짧기 때문에",
        "테스트 도구가 결과를 묶음으로만 표시할 수 있기 때문에",
        "경영진이 모든 리포트에 정확히 네 개의 범주를 요구하기 때문에",
        "공격자가 표현을 끝없이 바꿀 수 있어, 문구에 한정된 수정은 버티지 못하기 때문에"
      ],
      "answerIndex": 3,
      "explanation": "본문 'an attacker can rephrase indefinitely, so a fix that addresses only the exact wording we observed will not hold'에서 문구 한정 수정이 무용하다는 이유로 패턴화한다고 밝히므로 (라)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-redteam-q3",
      "prompt": "What can be inferred about a low failure rate measured right after the fixes?",
      "promptKo": "수정 직후 측정된 낮은 실패율에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "It proves the assistant can no longer be exploited.",
        "It means red-teaming is no longer necessary for future updates.",
        "It should not be taken as evidence that the assistant is safe.",
        "It guarantees that all four failure patterns have disappeared."
      ],
      "choicesKo": [
        "어시스턴트가 더 이상 악용될 수 없음을 증명한다.",
        "향후 업데이트에 레드티밍이 더 이상 필요 없음을 의미한다.",
        "어시스턴트가 안전하다는 증거로 받아들여서는 안 된다.",
        "네 가지 실패 패턴이 모두 사라졌음을 보장한다."
      ],
      "answerIndex": 2,
      "explanation": "본문은 'a low post-fix failure rate'를 안전의 증거로 읽는 것은 실수이며 레드티밍은 취약점의 부재를 증명할 수 없다고 했으므로 (다)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-redteam-q4",
      "prompt": "In the report, the word \"coaxed\" is closest in meaning to",
      "promptKo": "리포트에서 단어 \"coaxed\"와 의미가 가장 가까운 것은",
      "choices": [
        "gently persuaded",
        "abruptly forbidden",
        "fully rebooted",
        "carefully measured"
      ],
      "choicesKo": [
        "부드럽게 설득된",
        "갑자기 금지된",
        "완전히 재부팅된",
        "신중하게 측정된"
      ],
      "answerIndex": 0,
      "explanation": "'ways it can be coaxed into harmful ... responses'에서 'coaxed'는 모델을 살살 구슬려 유도한다는 뜻이므로 'gently persuaded'가 가장 가깝습니다.",
      "category": "동의어"
    }
  ]
}
```
