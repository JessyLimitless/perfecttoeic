# IELTS Listening Part 1 — Set 03 (Registration Form)

> 컨퍼런스 등록 통화. **철자 받아쓰기 덫**(하이픈·점이 섞인 이메일)과 **할인 계산 덫**($150−$30)이 핵심.
> 씨앗 자료: 루트 `DATA2.md` 발췌 → 10문항 정식 세트로 확장.

```json
{
  "id": "ielts-lis-03",
  "skill": "LISTENING",
  "part": 1,
  "band": 7.0,
  "title": "Global AI Transformation Summit — Registration",
  "titleKo": "글로벌 AI 전환 서밋 — 등록",
  "taskType": "Form Completion",
  "script": [
    { "speaker": "Wgb", "role": "Officer", "en": "Thank you for calling the Global AI Transformation Summit registration desk. How may I help?", "ko": "글로벌 AI 전환 서밋 등록 데스크입니다. 무엇을 도와드릴까요?" },
    { "speaker": "Mca", "role": "Attendee", "en": "Hi, I registered online last week but I never received the confirmation, so I'd like to check my details.", "ko": "안녕하세요, 지난주에 온라인으로 등록했는데 확인 메일을 못 받아서 정보를 확인하고 싶습니다." },
    { "speaker": "Wgb", "role": "Officer", "en": "Of course. Could I take the email address you registered with?", "ko": "물론입니다. 등록하실 때 사용한 이메일 주소를 알려주시겠어요?" },
    { "speaker": "Mca", "role": "Attendee", "en": "Yes, it's k-min dot tech at analytics dot org. That's K, hyphen, M-I-N, then dot, T-E-C-H.", "ko": "네, k-min.tech@analytics.org입니다. K, 하이픈, M-I-N, 그다음 점, T-E-C-H요." },
    { "speaker": "Wgb", "role": "Officer", "en": "K hyphen M-I-N dot tech at analytics dot org. Got it. And I have your role down as a data engineer — is that right?", "ko": "K 하이픈 M-I-N 점 tech, at analytics 점 org요. 확인했습니다. 직무는 데이터 엔지니어로 되어 있는데, 맞나요?" },
    { "speaker": "Mca", "role": "Attendee", "en": "Not quite — I moved teams in June. I'm a data analyst now, so could you update that on my badge?", "ko": "정확하진 않아요. 6월에 팀을 옮겼거든요. 지금은 데이터 분석가라서, 명찰에 그렇게 수정해 주시겠어요?" },
    { "speaker": "Wgb", "role": "Officer", "en": "Done. Now, for the hands-on workshop on Tuesday, August the twenty-fifth, the standard fee is one hundred and fifty dollars.", "ko": "수정했습니다. 8월 25일 화요일 실습 워크숍의 정가는 150달러입니다." },
    { "speaker": "Mca", "role": "Attendee", "en": "I thought there was an early-bird rate?", "ko": "얼리버드 요금이 있다고 들었는데요?" },
    { "speaker": "Wgb", "role": "Officer", "en": "There is — you qualify for a thirty-dollar discount, so the amount payable is one hundred and twenty.", "ko": "있습니다. 30달러 할인 대상이시라 결제하실 금액은 120달러입니다." },
    { "speaker": "Mca", "role": "Attendee", "en": "Great. And which track am I in? I put down machine learning, but I'd honestly get more out of the data governance one.", "ko": "좋네요. 제가 어느 트랙인가요? 머신러닝으로 적어냈는데, 솔직히 데이터 거버넌스 쪽이 더 도움이 될 것 같아요." },
    { "speaker": "Wgb", "role": "Officer", "en": "That's no trouble at all — I'll switch you to data governance. There are still places.", "ko": "전혀 문제없습니다. 데이터 거버넌스로 변경해 드릴게요. 자리가 아직 있습니다." },
    { "speaker": "Mca", "role": "Attendee", "en": "Thanks. There's a gala dinner on the Wednesday, isn't there? I'd love to come, but my flight home leaves that afternoon, so I'll have to give it a miss.", "ko": "감사합니다. 수요일에 갈라 디너가 있죠? 가고 싶은데 그날 오후에 귀국 비행기가 있어서 참석하지 못할 것 같아요." },
    { "speaker": "Wgb", "role": "Officer", "en": "That's a shame. I'll mark you as not attending. Do you have any dietary requirements for the workshop lunches?", "ko": "아쉽네요. 불참으로 표시하겠습니다. 워크숍 점심 식사에 식이 요구 사항이 있으신가요?" },
    { "speaker": "Mca", "role": "Attendee", "en": "I'm vegetarian — no fish either, if that's possible.", "ko": "채식주의자입니다. 가능하다면 생선도 빼주세요." },
    { "speaker": "Wgb", "role": "Officer", "en": "Noted. And one last thing — the venue has changed. It's no longer at the Kingsway Hotel; we've moved to the Ellerton Conference Centre, which is two stops further on the metro.", "ko": "기록했습니다. 마지막으로 한 가지, 행사장이 변경되었습니다. 킹스웨이 호텔이 아니라 엘러튼 컨퍼런스 센터로 옮겼고, 지하철로 두 정거장 더 가셔야 합니다." },
    { "speaker": "Mca", "role": "Attendee", "en": "Good to know. Do I need to print anything out?", "ko": "알려주셔서 감사합니다. 뭔가 출력해 가야 하나요?" },
    { "speaker": "Wgb", "role": "Officer", "en": "No need to print the ticket — but you must bring photo identification to collect your badge.", "ko": "티켓을 출력하실 필요는 없지만, 명찰을 수령하시려면 사진이 있는 신분증을 반드시 가져오셔야 합니다." },
    { "speaker": "Mca", "role": "Attendee", "en": "Will do. A colleague who came last year said the sessions were excellent, so I'm looking forward to it.", "ko": "그렇게 할게요. 작년에 참석한 동료가 세션이 훌륭했다고 해서 기대하고 있습니다." }
  ],
  "questions": [
    {
      "id": "ielts-lis-03-q1",
      "kind": "gap",
      "promptEn": "Registered email address: ______",
      "promptKo": "등록된 이메일 주소: ______",
      "answer": "k-min.tech@analytics.org",
      "wordLimit": "AN EMAIL ADDRESS",
      "trap": "hyphen(-)과 dot(.)을 말로 불러준다. 기호를 문자로 잘못 적으면 0점.",
      "explanation": "'K, hyphen, M-I-N, then dot, T-E-C-H' → k-min.tech, 'at analytics dot org' → @analytics.org. hyphen은 -, dot은 . 로 옮겨 적습니다. 정답: **k-min.tech@analytics.org**",
      "category": "스펠링"
    },
    {
      "id": "ielts-lis-03-q2",
      "kind": "gap",
      "promptEn": "Current job role: ______",
      "promptKo": "현재 직무: ______",
      "answer": "data analyst",
      "wordLimit": "TWO WORDS",
      "trap": "직원이 먼저 'data engineer'라고 읽어준다. 'Not quite'가 정정 신호.",
      "explanation": "'I have your role down as a data engineer — is that right?' / 'Not quite ... I'm a data analyst now.' 기록된 정보가 아니라 **정정된 정보**가 답입니다. 정답: **data analyst**",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-03-q3",
      "kind": "gap",
      "promptEn": "Workshop date: August ______",
      "promptKo": "워크숍 날짜: 8월 ______일",
      "answer": "25",
      "accept": ["25th", "twenty-fifth"],
      "wordLimit": "ONE NUMBER",
      "trap": "바로 뒤에 150·30·120 등 숫자가 쏟아진다. 날짜 칸에 금액을 적지 않도록 주의.",
      "explanation": "'the hands-on workshop on Tuesday, August the twenty-fifth'. 정답: **25**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-03-q4",
      "kind": "gap",
      "promptEn": "Amount payable for the workshop: $______",
      "promptKo": "워크숍 결제 금액: $______",
      "answer": "120",
      "accept": ["one hundred and twenty", "120 dollars"],
      "wordLimit": "ONE NUMBER",
      "trap": "$150(정가)과 $30(할인액)이 모두 또렷하게 들린다. 답은 계산된 최종 금액.",
      "explanation": "'the standard fee is one hundred and fifty dollars' → 'a thirty-dollar discount, so the amount payable is one hundred and twenty.' 정가도 할인액도 아닌 **실제 결제액**을 적습니다. 정답: **120**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-03-q5",
      "kind": "gap",
      "promptEn": "Track the attendee will now join: ______",
      "promptKo": "참가자가 최종적으로 참여할 트랙: ______",
      "answer": "data governance",
      "wordLimit": "TWO WORDS",
      "trap": "신청서에 적은 것은 machine learning. 통화 중에 바뀐다.",
      "explanation": "'I put down machine learning, but I'd honestly get more out of the data governance one.' → 'I'll switch you to data governance.' 정답: **data governance**",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-03-q6",
      "kind": "choice",
      "promptEn": "What does the man decide about the gala dinner?",
      "promptKo": "남자는 갈라 디너에 대해 어떻게 결정하는가?",
      "choices": [
        "He will attend on Wednesday.",
        "He will not attend because he is flying home.",
        "He will decide after the workshop."
      ],
      "choicesKo": [
        "수요일에 참석한다.",
        "귀국 비행기 때문에 참석하지 않는다.",
        "워크숍이 끝난 뒤에 결정한다."
      ],
      "answerIndex": 1,
      "trap": "'I'd love to come'이 먼저 들린다. 그러나 뒤집는 것은 but 이후.",
      "explanation": "'I'd love to come, but my flight home leaves that afternoon, so I'll have to give it a miss.' give it a miss = 가지 않다. 직원도 'not attending'으로 확인합니다. 정답: (B)=1",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-03-q7",
      "kind": "gap",
      "promptEn": "Dietary requirement: ______",
      "promptKo": "식이 요구 사항: ______",
      "answer": "vegetarian",
      "wordLimit": "ONE WORD",
      "trap": "'no fish either'가 뒤따라 vegan 등으로 바꿔 적기 쉽다. 화자가 쓴 단어를 그대로.",
      "explanation": "'I'm vegetarian — no fish either'. 생선 제외는 부가 요청일 뿐 답 단어를 바꾸지 않습니다. 정답: **vegetarian**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-03-q8",
      "kind": "gap",
      "promptEn": "New venue: the ______ Conference Centre",
      "promptKo": "변경된 행사장: ______ 컨퍼런스 센터",
      "answer": "Ellerton",
      "wordLimit": "ONE WORD",
      "trap": "Kingsway Hotel이 먼저 들리지만 'no longer'로 배제된다.",
      "explanation": "'It's no longer at the Kingsway Hotel; we've moved to the Ellerton Conference Centre.' 고유명사이므로 대문자로 시작합니다. 정답: **Ellerton**",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-03-q9",
      "kind": "choice",
      "promptEn": "What must the man bring to collect his badge?",
      "promptKo": "남자가 명찰을 받으려면 무엇을 가져와야 하는가?",
      "choices": [
        "A printed ticket",
        "A form of photo ID",
        "A copy of the confirmation email"
      ],
      "choicesKo": [
        "출력한 티켓",
        "사진이 있는 신분증",
        "확인 메일 사본"
      ],
      "answerIndex": 1,
      "trap": "print라는 단어가 두 번 나오지만 결론은 '출력할 필요 없다'이다.",
      "explanation": "'No need to print the ticket — but you must bring photo identification.' must가 붙은 쪽이 답입니다. 정답: (B)=1",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-03-q10",
      "kind": "choice",
      "promptEn": "How does the man know about the quality of the summit?",
      "promptKo": "남자는 서밋의 수준을 어떻게 알고 있는가?",
      "choices": [
        "He attended it himself last year.",
        "He read online reviews of the sessions.",
        "A co-worker who went recommended it."
      ],
      "choicesKo": [
        "작년에 직접 참석했다.",
        "세션 후기를 온라인으로 읽었다.",
        "참석했던 동료가 추천했다."
      ],
      "answerIndex": 2,
      "trap": "'came last year'가 들려서 남자 본인이 참석했다고 착각하기 쉽다. 주어는 colleague.",
      "explanation": "'A colleague who came last year said the sessions were excellent.' 작년에 온 사람은 남자가 아니라 동료이고, 보기에서는 co-worker로 바꿔 말했습니다. 정답: (C)=2",
      "category": "패러프레이즈"
    }
  ]
}
```
