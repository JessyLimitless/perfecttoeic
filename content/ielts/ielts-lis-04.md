# IELTS Listening Part 2 — Set 04 (Map Labelling & Completion)

> 스마트시티 이노베이션 센터 방문자 안내 독백. **위치·방향 덫**(glass elevator·opposite 기준점 이동)과
> **숫자 덫**(공사 완료 예정연도 vs 개관연도 / 정가 vs 할인가)이 축이고, 스펠링 정정·오답 소거까지 8종 덫을 전부 배치했다.
> 씨앗 자료: 루트 `DATA2.md` Part 2 발췌(Data Analytics Lab 위치) → 10문항 정식 세트로 확장.

```json
{
  "id": "ielts-lis-04",
  "skill": "LISTENING",
  "part": 2,
  "band": 7.0,
  "title": "Smart City Innovation Centre — Visitor Briefing",
  "titleKo": "스마트시티 이노베이션 센터 — 방문자 안내",
  "taskType": "Map Labelling & Completion",
  "script": [
    { "speaker": "Wgb", "role": "Presenter", "en": "Good morning everyone, and welcome to the Smart City Innovation Centre. Before you set off on the self-guided trail, I'll run through the layout and a few practical points.", "ko": "여러분 안녕하세요, 스마트시티 이노베이션 센터에 오신 것을 환영합니다. 자유 관람 코스를 시작하시기 전에 시설 배치와 몇 가지 실용적인 사항을 안내해 드리겠습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "The building started life as a textile warehouse, and the conversion was originally due to be finished in twenty nineteen. In the event the contractors overran, so we didn't actually open to the public until March twenty twenty-one.", "ko": "이 건물은 원래 섬유 창고였고, 개조 공사는 당초 2019년에 끝날 예정이었습니다. 그런데 시공사가 공기를 넘기는 바람에 실제로 일반에 개관한 것은 2021년 3월이었습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "Now, orientate yourselves in the main lobby facing north. Take the corridor past the glass elevator — you don't need to go up in it — and the Data Analytics Lab sits directly behind the main auditorium, on your left.", "ko": "자, 중앙 로비에서 북쪽을 바라보고 방향을 잡으세요. 유리 엘리베이터를 지나 복도로 가시면 되는데, 엘리베이터를 타고 올라가실 필요는 없습니다. 데이터 분석 랩은 대강당 바로 뒤, 왼편에 있습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "The Sensor Exhibition Hall is the one visitors always struggle to find. We did look at putting it upstairs beside the lab, but rather than that we've kept it on the ground floor, directly opposite the café.", "ko": "센서 전시관은 방문객들이 늘 찾기 어려워하는 곳입니다. 위층 랩 옆에 두는 것도 검토했지만, 그렇게 하지 않고 1층 카페 바로 맞은편에 두었습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "Our training suite is named after the centre's founder, Marina Whitcombe. That's spelt W-H-I-T-C-O-M-B — sorry, do add an E on the end: W-H-I-T-C-O-M-B-E.", "ko": "저희 교육실은 센터 설립자인 마리나 휘트콤의 이름을 땄습니다. 철자는 W-H-I-T-C-O-M-B — 죄송합니다, 끝에 E를 붙여 주세요. W-H-I-T-C-O-M-B-E입니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "We're open every day except Tuesday. Apologies, that's not right — Tuesday is when the schools' workshops run, so the building is at its busiest then. It's Wednesday that we close for maintenance.", "ko": "저희는 화요일을 제외하고 매일 문을 엽니다. 죄송합니다, 잘못 말씀드렸네요. 화요일은 학교 단체 워크숍이 진행되는 날이라 건물이 가장 붐빕니다. 유지보수로 문을 닫는 날은 수요일입니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "As for admission, a day pass is normally fifteen pounds. If you hold a city library card, though, you'll pay just nine pounds, and under-sixteens come in free.", "ko": "입장료는, 1일 이용권이 보통 15파운드입니다. 다만 시립 도서관 카드를 소지하고 계시면 9파운드만 내시면 되고, 16세 미만은 무료입니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "Floor by floor now: the Robotics Bay is on the first floor, and the Green Energy Zone is two floors above that, on the third — room double-four, if you're looking for the entrance. The rooftop garden, as you'd expect, is right at the top.", "ko": "층별로 말씀드리면, 로보틱스 베이는 1층에 있고, 그린 에너지 존은 그보다 두 층 위인 3층에 있습니다. 입구를 찾으신다면 44호실입니다. 옥상 정원은 예상하시는 대로 맨 위층에 있습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "If you've booked the three-D printing session, the filament and the safety goggles are all provided. What you do need to bring is a memory stick, otherwise you'll go home without your design files.", "ko": "3D 프린팅 세션을 예약하신 분들은, 필라멘트와 보안경은 모두 제공됩니다. 직접 가져오셔야 하는 것은 메모리 스틱인데, 없으면 설계 파일을 못 가져가십니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "A word about the drone demonstration. We did consider running it at weekends, but in the end we decided against it — the airspace permissions were simply too complicated. What we've done instead is add an extra evening session on Thursdays.", "ko": "드론 시연에 관해 한 말씀 드리자면, 주말에 운영하는 것을 고려했지만 결국 하지 않기로 했습니다. 공역 허가 절차가 너무 복잡했거든요. 대신 목요일 저녁 세션을 추가했습니다." },
    { "speaker": "Wgb", "role": "Presenter", "en": "Finally, at the end of your visit please don't bother with the paper questionnaire on the desk. We'd much rather you scanned the code on your badge and left your comments online — it reaches the exhibition team straight away.", "ko": "마지막으로, 관람을 마치실 때 데스크에 있는 종이 설문지는 신경 쓰지 않으셔도 됩니다. 그보다는 명찰에 있는 코드를 스캔해서 온라인으로 의견을 남겨 주시면 좋겠습니다. 그래야 전시팀에 바로 전달되거든요." },
    { "speaker": "Wgb", "role": "Presenter", "en": "Right — the trail takes about fifty minutes, and I'll be here in the lobby if you have any questions. Do enjoy your visit.", "ko": "자, 관람 코스는 50분 정도 걸리고, 질문이 있으시면 제가 로비에 있겠습니다. 즐거운 관람 되세요." }
  ],
  "questions": [
    {
      "id": "ielts-lis-04-q1",
      "kind": "gap",
      "promptEn": "The centre opened to the public in ______",
      "promptKo": "센터가 일반에 개관한 해: ______",
      "answer": "2021",
      "accept": ["twenty twenty-one", "2021년"],
      "wordLimit": "ONE NUMBER",
      "trap": "2019는 '공사가 끝날 예정이던' 해다. 문항이 묻는 것은 실제로 '개관한' 해.",
      "explanation": "'the conversion was originally due to be finished in twenty nineteen ... we didn't actually open to the public until March twenty twenty-one.' due to be finished(예정)와 actually open(실제)을 갈라 들어야 합니다. 정답: **2021**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-04-q2",
      "kind": "choice",
      "promptEn": "Where is the Data Analytics Lab?",
      "promptKo": "데이터 분석 랩은 어디에 있는가?",
      "choices": [
        "Beside the main lobby entrance",
        "Directly behind the main auditorium, on the left",
        "In the area around the glass elevator"
      ],
      "choicesKo": [
        "중앙 로비 입구 옆",
        "대강당 바로 뒤 왼편",
        "유리 엘리베이터 주변 구역"
      ],
      "answerIndex": 1,
      "trap": "glass elevator는 지나치는 지형지물일 뿐 목적지가 아니다. 'go up in it'까지 부정된다.",
      "explanation": "'Take the corridor past the glass elevator — you don't need to go up in it — and the Data Analytics Lab sits directly behind the main auditorium, on your left.' past(경유)와 behind(목적지)를 구분하는 것이 핵심입니다. 정답: (B)=1",
      "category": "위치·방향"
    },
    {
      "id": "ielts-lis-04-q3",
      "kind": "gap",
      "promptEn": "The Sensor Exhibition Hall is on the ground floor, ______ the café.",
      "promptKo": "센서 전시관은 1층 카페 ______에 있다.",
      "answer": "opposite",
      "accept": ["directly opposite"],
      "wordLimit": "ONE WORD",
      "trap": "'upstairs beside the lab'가 먼저 들리지만 'rather than that'으로 뒤집힌다. 기준점이 바뀌는 신호어를 놓치면 위층으로 표시하게 된다.",
      "explanation": "'We did look at putting it upstairs beside the lab, but rather than that we've kept it on the ground floor, directly opposite the café.' 검토했다가 채택하지 않은 배치가 앞에, 실제 위치가 뒤에 옵니다. 정답: **opposite**",
      "category": "위치·방향"
    },
    {
      "id": "ielts-lis-04-q4",
      "kind": "gap",
      "promptEn": "The training suite is named after the founder, Marina ______",
      "promptKo": "교육실 이름의 유래가 된 설립자: 마리나 ______",
      "answer": "Whitcombe",
      "accept": ["whitcombe"],
      "wordLimit": "ONE WORD",
      "trap": "철자를 불러주다가 끝의 E를 뒤늦게 덧붙인다. 처음 들린 대로 Whitcomb으로 적으면 실전 0점.",
      "explanation": "'W-H-I-T-C-O-M-B — sorry, do add an E on the end: W-H-I-T-C-O-M-B-E.' 철자 받아쓰기는 마지막에 정정된 형태가 정답이고, 고유명사이므로 첫 글자는 대문자로 씁니다. 정답: **Whitcombe**",
      "category": "스펠링"
    },
    {
      "id": "ielts-lis-04-q5",
      "kind": "gap",
      "promptEn": "The centre closes for maintenance on ______",
      "promptKo": "유지보수로 휴관하는 요일: ______",
      "answer": "Wednesday",
      "accept": ["Wednesdays", "wednesday"],
      "wordLimit": "ONE WORD",
      "trap": "먼저 나온 Tuesday는 미끼다. 'that's not right'로 정정되어 Tuesday는 오히려 가장 붐비는 날이 된다.",
      "explanation": "'We're open every day except Tuesday. Apologies, that's not right — Tuesday is when the schools' workshops run ... It's Wednesday that we close for maintenance.' 정정 신호(Apologies, that's not right) 뒤의 값만 적습니다. 정답: **Wednesday**",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-04-q6",
      "kind": "gap",
      "promptEn": "Day pass with a city library card: £______",
      "promptKo": "시립 도서관 카드 소지 시 1일 이용권 가격: £______",
      "answer": "9",
      "accept": ["nine", "9 pounds", "£9"],
      "wordLimit": "ONE NUMBER",
      "trap": "£15는 카드가 없을 때의 정가다. 조건절(If you hold a city library card)을 놓치면 정가를 적게 된다.",
      "explanation": "'a day pass is normally fifteen pounds. If you hold a city library card, though, you'll pay just nine pounds.' normally와 though가 조건 전환 신호입니다. 무료(free)는 16세 미만에만 해당합니다. 정답: **9**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-04-q7",
      "kind": "gap",
      "promptEn": "The Green Energy Zone is on the ______ floor.",
      "promptKo": "그린 에너지 존이 있는 층: ______층",
      "answer": "third",
      "accept": ["3rd", "3", "three"],
      "wordLimit": "ONE WORD OR A NUMBER",
      "trap": "'two floors above that'만 듣고 first + 2를 머릿속으로 계산하다 room double-four(44호실)의 숫자를 층수로 적기 쉽다.",
      "explanation": "'the Robotics Bay is on the first floor, and the Green Energy Zone is two floors above that, on the third — room double-four'. 화자가 계산 결과(on the third)를 직접 말해 주므로 그 값을 적으면 되고, double-four는 층수가 아니라 호실 번호입니다. 정답: **third**",
      "category": "매칭·분류"
    },
    {
      "id": "ielts-lis-04-q8",
      "kind": "gap",
      "promptEn": "For the 3-D printing session, bring your own ______",
      "promptKo": "3D 프린팅 세션에 직접 가져와야 할 것: ______",
      "answer": "memory stick",
      "accept": ["a memory stick", "memory-stick"],
      "wordLimit": "TWO WORDS",
      "trap": "filament와 safety goggles가 먼저 또렷하게 들리지만 그건 '제공되는' 것이다.",
      "explanation": "'the filament and the safety goggles are all provided. What you do need to bring is a memory stick'. provided와 need to bring을 갈라 들으면 끝입니다. 정답: **memory stick**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-04-q9",
      "kind": "choice",
      "promptEn": "What change has been made to the drone demonstration?",
      "promptKo": "드론 시연에는 어떤 변화가 있었는가?",
      "choices": [
        "It now runs at weekends.",
        "It has been cancelled altogether.",
        "An extra evening session has been added."
      ],
      "choicesKo": [
        "이제 주말에 운영된다.",
        "완전히 취소되었다.",
        "저녁 세션이 하나 추가되었다."
      ],
      "answerIndex": 2,
      "trap": "'running it at weekends'가 그대로 들리지만 곧바로 'decided against it'으로 부정된다. 시연 자체가 없어진 것도 아니다.",
      "explanation": "'We did consider running it at weekends, but in the end we decided against it ... What we've done instead is add an extra evening session on Thursdays.' consider ... decided against ... instead는 전형적인 오답 유도 3단 구성입니다. 정답: (C)=2",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-04-q10",
      "kind": "choice",
      "promptEn": "What does the speaker ask visitors to do at the end of their visit?",
      "promptKo": "화자는 관람을 마칠 때 방문객에게 무엇을 하라고 요청하는가?",
      "choices": [
        "Give their feedback electronically",
        "Complete the printed questionnaire at the desk",
        "Hand their badge back to reception"
      ],
      "choicesKo": [
        "의견을 전자적으로 남긴다",
        "데스크의 종이 설문지를 작성한다",
        "명찰을 안내 데스크에 반납한다"
      ],
      "answerIndex": 0,
      "trap": "정답 문장에 electronically라는 단어는 나오지 않는다. '명찰 코드를 스캔해 온라인으로 남겨 달라'가 그 말이다. badge와 questionnaire는 들리지만 각각 반납 요청·거절된 방법이다.",
      "explanation": "'please don't bother with the paper questionnaire ... We'd much rather you scanned the code on your badge and left your comments online.' 보기에서는 이를 give feedback electronically로 바꿔 말했습니다. 명찰은 스캔 대상일 뿐 반납 얘기는 없습니다. 정답: (A)=0",
      "category": "패러프레이즈"
    }
  ]
}
```
