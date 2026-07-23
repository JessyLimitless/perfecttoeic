# Part 7 — Triple Passage: Conference Program + Email + Attendee Review (컨퍼런스, 교차참조)

```json
{
  "id": "m1-p7-3-triple-01",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Triple Passage (Program + Email + Review)",
  "passageLines": [
    { "en": "[Passage 1 — Program]", "ko": "[지문 1 — 프로그램]" },
    { "en": "Northeast Retail Analytics Summit — Saturday, May 17", "ko": "노스이스트 리테일 애널리틱스 서밋 — 5월 17일 토요일" },
    { "en": "9:00 A.M. Opening Keynote: \"Turning Store Data into Decisions\" — Dr. Helen Park", "ko": "오전 9:00 개회 기조연설: \"매장 데이터를 의사결정으로\" — 헬렌 박 박사" },
    { "en": "10:30 A.M. Session A: Forecasting Demand — Room 201 / Session B: Pricing Strategy — Room 205", "ko": "오전 10:30 세션 A: 수요 예측 — 201호 / 세션 B: 가격 전략 — 205호" },
    { "en": "1:00 P.M. Session C: Building Dashboards — Room 201 / Session D: Customer Loyalty — Room 205", "ko": "오후 1:00 세션 C: 대시보드 구축 — 201호 / 세션 D: 고객 충성도 — 205호" },
    { "en": "3:00 P.M. Closing Panel: The Future of Retail Data — Main Hall", "ko": "오후 3:00 폐막 패널: 리테일 데이터의 미래 — 메인홀" },
    { "en": "Note: Attendees may switch between concurrent sessions, but seating in Room 201 is limited to 40.", "ko": "참고: 참석자는 동시 진행 세션을 오갈 수 있으나 201호 좌석은 40석으로 제한됩니다." },
    { "en": "[Passage 2 — Email]", "ko": "[지문 2 — 이메일]" },
    { "en": "To: registrants@nera-summit.org / From: j.tanaka@retailco.com / Subject: Room change for afternoon session", "ko": "받는 사람: registrants@nera-summit.org / 보낸 사람: j.tanaka@retailco.com / 제목: 오후 세션 강의실 변경" },
    { "en": "Hello, I registered for the 1:00 P.M. dashboard session but noticed Room 201 has limited seating.", "ko": "안녕하세요, 저는 오후 1시 대시보드 세션에 등록했는데 201호 좌석이 제한적이라는 것을 알게 되었습니다." },
    { "en": "Because I am bringing four colleagues from our analytics team, could you confirm whether we should arrive early or if a larger room is available?", "ko": "저희 분석팀 동료 네 명을 데려오기 때문에, 저희가 일찍 도착해야 할지 아니면 더 큰 강의실이 있는지 확인해 주실 수 있을까요?" },
    { "en": "The dashboard topic is the main reason our team is attending. — Julia Tanaka", "ko": "대시보드 주제가 저희 팀이 참석하는 주된 이유입니다. — 줄리아 다나카" },
    { "en": "[Passage 3 — Review]", "ko": "[지문 3 — 후기]" },
    { "en": "Post-event review by Julia Tanaka, RetailCo — ★★★★★", "ko": "행사 후 후기, 리테일코 줄리아 다나카 — ★★★★★" },
    { "en": "The organizers moved our afternoon session to the Main Hall, so all five of us got in without arriving early—thank you!", "ko": "주최 측이 저희 오후 세션을 메인홀로 옮겨 주어, 저희 다섯 명 모두 일찍 도착하지 않고도 들어갈 수 있었습니다 — 감사합니다!" },
    { "en": "Dr. Park's opening talk set a great tone, and the hands-on dashboard walkthrough was exactly what my team needed.", "ko": "박 박사님의 개회 강연이 분위기를 훌륭하게 잡아 주었고, 실습형 대시보드 안내는 저희 팀에 꼭 필요한 것이었습니다." },
    { "en": "My only suggestion: the closing panel ran long and I had to leave before the final questions.", "ko": "한 가지 제안하자면, 폐막 패널이 예정보다 길어져 마지막 질의응답 전에 자리를 떠야 했습니다." }
  ],
  "questions": [
    {
      "id": "m1-p7-3-triple-01-q1",
      "prompt": "According to the program, where is the closing panel held?",
      "promptKo": "프로그램에 따르면, 폐막 패널은 어디에서 열리는가?",
      "choices": ["Room 201", "Room 205", "The lobby", "The Main Hall"],
      "choicesKo": ["201호", "205호", "로비", "메인홀"],
      "answerIndex": 3,
      "explanation": "프로그램에서 오후 3시 폐막 패널은 메인홀에서 열린다고 했습니다. 201·205호는 오전·오후 분과 세션 강의실입니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-01-q2",
      "prompt": "Which session did Ms. Tanaka register for in the afternoon?",
      "promptKo": "다나카 씨가 오후에 등록한 세션은 무엇인가?",
      "choices": ["Building Dashboards", "Customer Loyalty", "Pricing Strategy", "Forecasting Demand"],
      "choicesKo": ["대시보드 구축", "고객 충성도", "가격 전략", "수요 예측"],
      "answerIndex": 0,
      "explanation": "이메일에서 오후 1시 대시보드 세션에 등록했다고 했고, 프로그램상 이는 세션 C '대시보드 구축'입니다. 나머지는 다른 시간대이거나 오전 세션입니다. 따라서 (가)=0입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-01-q3",
      "prompt": "What can be inferred about the dashboard session's original room?",
      "promptKo": "대시보드 세션의 원래 강의실에 관해 추론할 수 있는 것은 무엇인가?",
      "choices": ["It was canceled due to low interest.", "It was moved to a smaller space.", "Its capacity would not have fit Ms. Tanaka's group easily.", "It was never listed in the program."],
      "choicesKo": ["관심 부족으로 취소되었다.", "더 작은 공간으로 옮겨졌다.", "정원상 다나카 씨 일행을 쉽게 수용하기 어려웠을 것이다.", "프로그램에 실린 적이 없다."],
      "answerIndex": 2,
      "explanation": "대시보드 세션은 201호(40석)였고 다나카 씨가 동료 4명과 함께 참석해 좌석을 걱정했으므로, 원래 강의실 정원이 일행을 여유롭게 수용하기 어려웠음을 알 수 있습니다(프로그램+이메일 교차참조). 취소·축소·미기재는 사실과 다릅니다. 따라서 (다)=2입니다.",
      "category": "추론"
    },
    {
      "id": "m1-p7-3-triple-01-q4",
      "prompt": "In her review, what does Ms. Tanaka indicate the organizers did?",
      "promptKo": "후기에서 다나카 씨는 주최 측이 무엇을 했다고 밝히는가?",
      "choices": ["Refunded part of her registration fee", "Relocated her afternoon session to the Main Hall", "Added an extra keynote speaker", "Extended the lunch break"],
      "choicesKo": ["등록비 일부를 환불했다", "오후 세션을 메인홀로 옮겨 주었다", "기조연설자를 추가했다", "점심시간을 연장했다"],
      "answerIndex": 1,
      "explanation": "후기에서 주최 측이 오후 세션을 메인홀로 옮겨 주어 다섯 명 모두 들어갔다고 했습니다. 환불·연설자 추가·점심 연장은 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "세부사항"
    },
    {
      "id": "m1-p7-3-triple-01-q5",
      "prompt": "What does Ms. Tanaka suggest could be improved?",
      "promptKo": "다나카 씨가 개선될 수 있다고 제안한 것은 무엇인가?",
      "choices": ["The quality of the printed materials", "The registration process", "The length of the closing panel", "The variety of morning sessions"],
      "choicesKo": ["인쇄 자료의 품질", "등록 절차", "폐막 패널의 길이", "오전 세션의 다양성"],
      "answerIndex": 2,
      "explanation": "후기 끝에서 폐막 패널이 예정보다 길어져 끝까지 있지 못했다며 그 점을 제안으로 언급했습니다. 자료·등록·오전 세션은 지적하지 않았습니다. 따라서 (다)=2입니다.",
      "category": "사실확인"
    }
  ]
}
```
