# Part 7 — Triple Passage: Venue Listing + Inquiry Email + Reply (행사장 대여, 교차참조)

```json
{
  "id": "m1-p7-3-triple-02",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Triple Passage (Listing + Email + Email)",
  "passageLines": [
    { "en": "[Passage 1 — Venue Listing]", "ko": "[지문 1 — 대여 안내]" },
    { "en": "Lakeside Event Spaces — Rental Options", "ko": "레이크사이드 이벤트 스페이스 — 대여 안내" },
    { "en": "The Garden Room — up to 40 guests — $300 per half day; ideal for meetings and small receptions.", "ko": "가든 룸 — 최대 40명 — 반나절 300달러; 회의와 소규모 연회에 적합." },
    { "en": "The Lakeview Hall — up to 120 guests — $650 per half day; includes a stage and sound system.", "ko": "레이크뷰 홀 — 최대 120명 — 반나절 650달러; 무대와 음향 시스템 포함." },
    { "en": "The Terrace — up to 80 guests — $500 per half day; an outdoor space available May through September only.", "ko": "테라스 — 최대 80명 — 반나절 500달러; 5월부터 9월까지만 이용 가능한 야외 공간." },
    { "en": "All rentals include tables, chairs, and basic setup. Catering can be arranged for an additional fee.", "ko": "모든 대여에는 테이블, 의자, 기본 설치가 포함됩니다. 케이터링은 추가 요금으로 준비할 수 있습니다." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: bookings@lakesideevents.com / From: d.romano@brightstart.org / Subject: Space for October training day", "ko": "받는 사람: bookings@lakesideevents.com / 보낸 사람: d.romano@brightstart.org / 제목: 10월 교육일 공간 문의" },
    { "en": "Hello, our nonprofit is planning a staff training day for about 70 people on October 12.", "ko": "안녕하세요, 저희 비영리단체는 10월 12일에 약 70명 규모의 직원 교육일을 계획하고 있습니다." },
    { "en": "We'll need a stage for presentations and a microphone. Could you recommend a suitable space and let me know if catering for lunch is possible?", "ko": "발표를 위한 무대와 마이크가 필요합니다. 적합한 공간을 추천해 주시고 점심 케이터링이 가능한지 알려 주실 수 있을까요?" },
    { "en": "Our budget for the room is around $700. — Diego Romano", "ko": "공간 예산은 700달러 정도입니다. — 디에고 로마노" },
    { "en": "[Passage 3 — Reply]", "ko": "[지문 3 — 회신]" },
    { "en": "To: d.romano@brightstart.org / From: bookings@lakesideevents.com / Subject: RE: Space for October training day", "ko": "받는 사람: d.romano@brightstart.org / 보낸 사람: bookings@lakesideevents.com / 제목: RE: 10월 교육일 공간 문의" },
    { "en": "Dear Mr. Romano, thank you for your inquiry. Given your group size and need for a stage, the Lakeview Hall is the best fit and falls within your budget.", "ko": "로마노 씨께, 문의 감사합니다. 인원 규모와 무대 필요를 고려할 때 레이크뷰 홀이 가장 적합하며 예산 범위 안에 있습니다." },
    { "en": "October 12 is currently available. We can add a buffet lunch for $18 per person, billed separately from the room rental.", "ko": "10월 12일은 현재 예약이 가능합니다. 뷔페 점심은 1인당 18달러로 추가할 수 있으며, 공간 대여와 별도로 청구됩니다." },
    { "en": "To hold the date, we ask for a 25 percent deposit within one week. — Lakeside Event Spaces", "ko": "날짜를 확정하려면 일주일 이내에 25퍼센트 보증금을 부탁드립니다. — 레이크사이드 이벤트 스페이스" }
  ],
  "questions": [
    {
      "id": "m1-p7-3-triple-02-q1",
      "prompt": "What is included with every rental at Lakeside Event Spaces?",
      "promptKo": "레이크사이드 이벤트 스페이스의 모든 대여에 포함되는 것은 무엇인가?",
      "choices": ["Tables, chairs, and basic setup", "Free catering", "Overnight parking", "A photographer"],
      "choicesKo": ["테이블, 의자, 기본 설치", "무료 케이터링", "야간 주차", "사진사"],
      "answerIndex": 0,
      "explanation": "안내문에서 모든 대여에 테이블·의자·기본 설치가 포함된다고 했습니다. 케이터링은 추가 요금이고, 주차·사진사는 언급되지 않습니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-02-q2",
      "prompt": "Why does Mr. Romano need a stage?",
      "promptKo": "로마노 씨가 무대를 필요로 하는 이유는 무엇인가?",
      "choices": ["To hold an awards ceremony", "To set up a dance floor", "To give presentations", "To display artwork"],
      "choicesKo": ["시상식을 열기 위해", "댄스 플로어를 설치하기 위해", "발표를 하기 위해", "미술 작품을 전시하기 위해"],
      "answerIndex": 2,
      "explanation": "이메일에서 발표를 위한 무대와 마이크가 필요하다고 했습니다. 시상식·댄스·전시는 언급되지 않습니다. 따라서 (다)=2입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-02-q3",
      "prompt": "Why is the Terrace not suitable for Mr. Romano's event?",
      "promptKo": "테라스가 로마노 씨의 행사에 적합하지 않은 이유는 무엇인가?",
      "choices": ["It is too expensive for his budget.", "It is not available in October.", "It cannot hold 70 guests.", "It does not include chairs."],
      "choicesKo": ["예산에 비해 너무 비싸다.", "10월에는 이용할 수 없다.", "70명을 수용할 수 없다.", "의자가 포함되지 않는다."],
      "answerIndex": 1,
      "explanation": "테라스는 5월~9월만 이용 가능한데 행사는 10월 12일이므로 이용할 수 없습니다(안내문+이메일 교차참조). 가격(500달러)은 예산 내이고 정원 80명은 충분하며 의자는 포함됩니다. 따라서 (나)=1입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-3-triple-02-q4",
      "prompt": "How much would lunch cost in total for Mr. Romano's group?",
      "promptKo": "로마노 씨 일행의 점심 비용은 총 얼마인가?",
      "choices": ["$180", "$650", "$700", "About $1,260"],
      "choicesKo": ["180달러", "650달러", "700달러", "약 1,260달러"],
      "answerIndex": 3,
      "explanation": "약 70명에 1인당 18달러이므로 70×18=1,260달러가 됩니다(이메일 인원+회신 단가 교차참조). 650달러는 공간 대여료, 700달러는 예산입니다. 따라서 (라)=3입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-3-triple-02-q5",
      "prompt": "What is Mr. Romano asked to do to reserve the date?",
      "promptKo": "로마노 씨는 날짜를 예약하기 위해 무엇을 하도록 요청받는가?",
      "choices": ["Sign a one-year contract", "Pay a 25 percent deposit within a week", "Visit the venue in person", "Confirm the guest list"],
      "choicesKo": ["1년 계약서에 서명한다", "일주일 이내에 25퍼센트 보증금을 낸다", "직접 행사장을 방문한다", "참석자 명단을 확정한다"],
      "answerIndex": 1,
      "explanation": "회신에서 날짜 확정을 위해 일주일 이내 25% 보증금을 요청했습니다. 연간 계약·현장 방문·명단 확정은 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    }
  ]
}
```
