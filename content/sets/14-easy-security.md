# Set 14 — EASY — Two-Factor Authentication (Email)

```json
{
  "id": "set-easy-security",
  "difficulty": "EASY",
  "passageType": "Email",
  "passageLines": [
    {
      "en": "From: IT Security Team",
      "ko": "보낸 사람: IT 보안팀"
    },
    {
      "en": "Subject: Action Required — Enable Two-Factor Authentication",
      "ko": "제목: 조치 필요 — 2단계 인증 활성화"
    },
    {
      "en": "Dear all,",
      "ko": "모든 분께,"
    },
    {
      "en": "To protect your account and company data, all employees must enable two-factor authentication (2FA) by Friday, July 3.",
      "ko": "계정과 회사 데이터를 보호하기 위해 모든 직원은 7월 3일 금요일까지 2단계 인증(2FA)을 활성화해야 합니다."
    },
    {
      "en": "Two-factor authentication adds a second step when you log in, so a password alone is not enough to access your account.",
      "ko": "2단계 인증은 로그인할 때 두 번째 단계를 추가하므로, 비밀번호만으로는 계정에 접근할 수 없습니다."
    },
    {
      "en": "This extra step helps keep your account safe even if your password is stolen.",
      "ko": "이 추가 단계는 비밀번호가 도난당하더라도 계정을 안전하게 지키는 데 도움이 됩니다."
    },
    {
      "en": "You can set it up in just a few minutes by visiting the security portal at security.company.com/2fa.",
      "ko": "security.company.com/2fa 보안 포털에 접속하시면 단 몇 분 만에 설정할 수 있습니다."
    },
    {
      "en": "You will need your work phone to receive the verification code during setup.",
      "ko": "설정 중 인증 코드를 받으려면 업무용 휴대폰이 필요합니다."
    },
    {
      "en": "Accounts that are not protected by Friday will be locked until 2FA is turned on.",
      "ko": "금요일까지 보호되지 않은 계정은 2단계 인증이 켜질 때까지 잠깁니다."
    },
    {
      "en": "If you have any trouble during setup, please contact the help desk at extension 4500.",
      "ko": "설정 중 문제가 발생하면 내선 4500번으로 헬프데스크에 연락해 주십시오."
    },
    {
      "en": "Thank you for helping us keep our systems secure.",
      "ko": "우리 시스템을 안전하게 지키는 데 협조해 주셔서 감사합니다."
    }
  ],
  "questions": [
    {
      "id": "set-easy-security-q1",
      "prompt": "Why was this email sent?",
      "promptKo": "이 이메일은 왜 발송되었습니까?",
      "choices": [
        "To announce a new company phone plan",
        "To ask employees to turn on two-factor authentication",
        "To invite staff to a security training class",
        "To report that an account was hacked"
      ],
      "choicesKo": [
        "새 회사 휴대폰 요금제를 알리기 위해",
        "직원들에게 2단계 인증을 켜도록 요청하기 위해",
        "직원들을 보안 교육 수업에 초대하기 위해",
        "한 계정이 해킹되었음을 보고하기 위해"
      ],
      "answerIndex": 1,
      "explanation": "이메일 제목과 본문은 모든 직원이 7월 3일까지 2단계 인증을 활성화하도록 요청하므로 정답은 (나)입니다. 요금제, 교육 초대, 해킹 보고는 주제가 아닙니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-easy-security-q2",
      "prompt": "What do employees need to receive the verification code during setup?",
      "promptKo": "직원들이 설정 중 인증 코드를 받으려면 무엇이 필요합니까?",
      "choices": [
        "Their work phone",
        "A manager's approval",
        "A new password",
        "A printed form"
      ],
      "choicesKo": [
        "업무용 휴대폰",
        "관리자의 승인",
        "새 비밀번호",
        "인쇄된 양식"
      ],
      "answerIndex": 0,
      "explanation": "이메일에 \"You will need your work phone to receive the verification code during setup\"라고 했으므로 정답은 (가)입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-easy-security-q3",
      "prompt": "What will most likely happen to an employee who does not enable 2FA by Friday?",
      "promptKo": "금요일까지 2단계 인증을 활성화하지 않은 직원에게 어떤 일이 일어날 가능성이 가장 높습니까?",
      "choices": [
        "They will receive a small bonus.",
        "Their password will be reset automatically.",
        "Their account will be locked until 2FA is turned on.",
        "Their work phone will be replaced."
      ],
      "choicesKo": [
        "소액의 보너스를 받는다.",
        "비밀번호가 자동으로 재설정된다.",
        "2단계 인증이 켜질 때까지 계정이 잠긴다.",
        "업무용 휴대폰이 교체된다."
      ],
      "answerIndex": 2,
      "explanation": "이메일에 금요일까지 보호되지 않은 계정은 2단계 인증이 켜질 때까지 잠긴다(will be locked)고 했으므로 정답은 (다)입니다.",
      "category": "추론"
    },
    {
      "id": "set-easy-security-q4",
      "prompt": "In the email, the word \"enable\" is closest in meaning to",
      "promptKo": "이메일에서 단어 \"enable\"과 의미가 가장 가까운 것은",
      "choices": [
        "delay",
        "delete",
        "explain",
        "turn on"
      ],
      "choicesKo": [
        "미루다",
        "삭제하다",
        "설명하다",
        "켜다"
      ],
      "answerIndex": 3,
      "explanation": "직원들이 2단계 인증을 'enable'해야 한다는 것은 그 기능을 켜야 한다는 뜻이므로 'turn on(켜다)'과 가장 가깝습니다. 따라서 정답은 (라)입니다. 'delete(삭제하다)'는 반대 방향의 의미입니다.",
      "category": "동의어"
    }
  ]
}
```
