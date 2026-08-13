# IELTS Listening Part 3 — Set 21 (Multiple Choice & Sentence Completion)

> 해상 풍력 블레이드 공력 시뮬레이션 검토. **피로 18퍼센트 감소와 출력 2퍼센트 감소가 한 문장에 붙어 나오고(숫자·계산)**, **블레이드의 '어느 부위'인지가 정답을 가른다(위치·방향)**.
> 숫자가 많은 세트일수록 값이 아니라 값이 붙은 대상을 적어야 산다.
> 씨앗 자료: 루트 `part3-4.md` → 10문항 정식 세트로 변환.

```json
{
  "id": "ielts-lis-21",
  "skill": "LISTENING",
  "part": 3,
  "band": 8.0,
  "title": "Engineering Review — Offshore Wind Turbine Blade Simulation",
  "titleKo": "공학 검토 — 해상 풍력 터빈 블레이드 시뮬레이션",
  "taskType": "Multiple Choice & Sentence Completion",
  "script": [
    { "speaker": "Mca", "role": "Professor Zhao", "en": "Good morning, Tom and Maya. Let me look at your progress on the offshore wind turbine blade aerodynamics simulation. Have you finished running the computational fluid dynamics model?", "ko": "안녕하세요, 톰, 마야. 해상 풍력 터빈 블레이드 공력 시뮬레이션 진행 상황을 봅시다. 전산 유체 역학 모델 실행은 끝냈나요?" },
    { "speaker": "Mgb", "role": "Tom", "en": "We completed the baseline runs last night, Professor Zhao. We modelled composite rotor blades measuring eighty-five metres in length under North Sea weather conditions.", "ko": "어젯밤에 기준 실행을 마쳤습니다, 자오 교수님. 북해 기상 조건에서 길이 85미터의 복합재 로터 블레이드를 모델링했습니다." },
    { "speaker": "Wau", "role": "Maya", "en": "Interestingly, our stress simulations showed unexpected structural fatigue near the blade root transition area when turbulence intensity exceeded twelve per cent.", "ko": "흥미롭게도 응력 시뮬레이션에서는 난류 강도가 12퍼센트를 넘을 때 블레이드 뿌리 전이 구간 부근에서 예상치 못한 구조 피로가 나타났습니다." },
    { "speaker": "Mca", "role": "Professor Zhao", "en": "That's a critical finding. Did you account for blade pitch angle adjustments in your algorithmic model?", "ko": "중요한 발견이군요. 알고리즘 모델에 블레이드 피치각 조정은 반영했나요?" },
    { "speaker": "Mgb", "role": "Tom", "en": "We initially held the pitch angle fixed at three degrees across all wind speeds. But after seeing the stress concentration at high turbulence, we incorporated a dynamic pitch control algorithm.", "ko": "처음에는 모든 풍속에서 피치각을 3도로 고정했습니다. 그런데 고난류에서 응력 집중을 확인한 뒤, 동적 피치 제어 알고리즘을 도입했습니다." },
    { "speaker": "Wau", "role": "Maya", "en": "That reduced peak mechanical fatigue by nearly eighteen per cent, although it resulted in a minor two per cent reduction in total electrical power yield.", "ko": "그 결과 최대 기계적 피로가 거의 18퍼센트 줄었습니다. 다만 총 전력 생산량이 2퍼센트가량 소폭 감소하는 결과를 낳았고요." },
    { "speaker": "Mca", "role": "Professor Zhao", "en": "In offshore engineering, structural longevity far outweighs a minor loss in instantaneous power generation. What is your next step before presenting at the student symposium?", "ko": "해상 공학에서는 구조적 내구성이 순간 발전량의 사소한 손실보다 훨씬 중요합니다. 학생 심포지엄 발표 전 다음 단계는 무엇인가요?" },
    { "speaker": "Mgb", "role": "Tom", "en": "We need to generate comparative 3D stress heatmap visualisations. Currently, our graphics rendering script takes over four hours per simulation run on our department workstation.", "ko": "비교용 3D 응력 히트맵 시각화를 만들어야 합니다. 현재 학과 워크스테이션에서는 그래픽 렌더링 스크립트가 시뮬레이션 1회당 4시간 넘게 걸립니다." },
    { "speaker": "Mca", "role": "Professor Zhao", "en": "You can request access to the university's high-performance computing cluster. That should cut your rendering time down to under twenty minutes. Contact Dr. Patel in the computing lab for access privileges.", "ko": "대학의 고성능 컴퓨팅 클러스터 사용을 신청할 수 있습니다. 그러면 렌더링 시간이 20분 이내로 줄어들 겁니다. 접근 권한은 컴퓨팅 실험실의 파텔 박사에게 연락하세요." }
  ],
  "questions": [
    {
      "id": "ielts-lis-21-q1",
      "kind": "choice",
      "promptEn": "What blade length did Tom and Maya model in their simulation?",
      "promptKo": "톰과 마야가 시뮬레이션에서 모델링한 블레이드 길이는 얼마인가?",
      "choices": ["65 metres", "75 metres", "85 metres", "95 metres"],
      "choicesKo": ["65미터", "75미터", "85미터", "95미터"],
      "answerIndex": 2,
      "trap": "영어 숫자에서 -teen과 -ty는 강세만 다르다. eighty-five를 흘려 들으면 seventy-five와 구별되지 않는다.",
      "explanation": "'We modelled composite rotor blades measuring eighty-five metres in length under North Sea weather conditions.' 나머지 세 값은 대화에 등장하지 않는 순수한 미끼입니다. 정답: (C)=2",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-21-q2",
      "kind": "choice",
      "promptEn": "Where did the stress simulation reveal unexpected fatigue?",
      "promptKo": "응력 시뮬레이션에서 예상치 못한 피로가 나타난 위치는 어디인가?",
      "choices": [
        "At the extreme tip of the blade",
        "Near the blade root transition zone",
        "Along the central trailing edge",
        "Around the interior pitch gear housing"
      ],
      "choicesKo": [
        "블레이드 끝단 최외곽",
        "블레이드 뿌리 전이 구간 부근",
        "중앙 뒷전을 따라",
        "내부 피치 기어 하우징 주변"
      ],
      "answerIndex": 1,
      "trap": "85미터짜리 블레이드라 하면 끝단이 가장 위험할 것 같지만, 실제로 지목된 곳은 정반대인 뿌리 쪽이다. 상식적 짐작이 (A)로 끌고 간다.",
      "explanation": "'unexpected structural fatigue near the blade root transition area when turbulence intensity exceeded twelve per cent.' 피치 기어(D)는 뒤에 나오는 피치각 이야기와 이름만 겹칩니다. 정답: (B)=1",
      "category": "위치·방향"
    },
    {
      "id": "ielts-lis-21-q3",
      "kind": "choice",
      "promptEn": "What change did the students make to improve blade longevity?",
      "promptKo": "학생들이 블레이드 내구성을 높이기 위해 가한 변경은 무엇인가?",
      "choices": [
        "They increased blade length by five metres.",
        "They added a dynamic pitch control algorithm.",
        "They switched to a carbon-fibre reinforced alloy.",
        "They reduced the maximum operational wind speed."
      ],
      "choicesKo": [
        "블레이드 길이를 5미터 늘렸다.",
        "동적 피치 제어 알고리즘을 추가했다.",
        "탄소섬유 강화 합금으로 교체했다.",
        "최대 운전 풍속을 낮췄다."
      ],
      "answerIndex": 1,
      "trap": "'fixed at three degrees'가 먼저 또렷하게 들린다. 그것은 폐기된 초기 설정이며, 채택된 것은 But 뒤에 온다.",
      "explanation": "'We initially held the pitch angle fixed at three degrees ... But after seeing the stress concentration at high turbulence, we incorporated a dynamic pitch control algorithm.' 복합재(composite)는 처음부터의 재질이지 교체가 아닙니다. 정답: (B)=1",
      "category": "자기수정"
    },
    {
      "id": "ielts-lis-21-q4",
      "kind": "choice",
      "promptEn": "What trade-off resulted from applying dynamic pitch control?",
      "promptKo": "동적 피치 제어를 적용한 결과 발생한 절충은 무엇인가?",
      "choices": [
        "Electrical power output fell by about 2%.",
        "Mechanical vibration increased by 18%.",
        "Rendering time increased to eight hours.",
        "Blade manufacturing costs rose sharply."
      ],
      "choicesKo": [
        "전력 생산량이 약 2퍼센트 감소했다.",
        "기계적 진동이 18퍼센트 증가했다.",
        "렌더링 시간이 8시간으로 늘었다.",
        "블레이드 제조 비용이 급등했다."
      ],
      "answerIndex": 0,
      "trap": "18퍼센트는 '피로가 줄어든' 이득이고 2퍼센트가 '출력이 준' 대가다. (B)는 그 18을 손해 쪽으로 옮겨 붙인 전형적 뒤집기다.",
      "explanation": "'That reduced peak mechanical fatigue by nearly eighteen per cent, although it resulted in a minor two per cent reduction in total electrical power yield.' although 뒤가 대가입니다. 정답: (A)=0",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-21-q5",
      "kind": "choice",
      "promptEn": "How does Professor Zhao suggest they speed up rendering?",
      "promptKo": "자오 교수는 렌더링 속도를 높이는 방법으로 무엇을 제안하는가?",
      "choices": [
        "Simplify the CFD mesh resolution",
        "Use the university's high-performance computing cluster",
        "Upgrade the graphics cards in the department workstations",
        "Render 2D vector diagrams instead of 3D heatmaps"
      ],
      "choicesKo": [
        "CFD 격자 해상도를 단순화한다",
        "대학의 고성능 컴퓨팅 클러스터를 사용한다",
        "학과 워크스테이션의 그래픽 카드를 교체한다",
        "3D 히트맵 대신 2D 벡터 도면을 렌더링한다"
      ],
      "answerIndex": 1,
      "trap": "workstation·graphics·3D가 모두 톰의 발화에 등장하므로 (C)·(D)가 귀에 익다. 그러나 교수는 장비 교체나 산출물 축소를 말한 적이 없다.",
      "explanation": "'You can request access to the university's high-performance computing cluster. That should cut your rendering time down to under twenty minutes.' 익숙한 단어를 재조합한 보기가 아니라 교수가 실제로 지시한 행동을 고릅니다. 정답: (B)=1",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-21-q6",
      "kind": "gap",
      "promptEn": "The simulation used weather data from the ______ Sea.",
      "promptKo": "시뮬레이션에 사용된 기상 데이터의 해역: ______ 해",
      "answer": "North",
      "wordLimit": "ONE WORD",
      "trap": "바다 이름의 일부이므로 대문자로 시작한다. 85미터라는 큰 숫자 뒤에 짧게 붙어 지나가 놓치기 쉽다.",
      "explanation": "'composite rotor blades measuring eighty-five metres in length under North Sea weather conditions.' 빈칸 뒤 Sea가 신호입니다. 정답: **North**",
      "category": "세부정보"
    },
    {
      "id": "ielts-lis-21-q7",
      "kind": "gap",
      "promptEn": "Blade root fatigue appeared when turbulence intensity exceeded ______ per cent.",
      "promptKo": "블레이드 뿌리 피로는 난류 강도가 ______ 퍼센트를 넘을 때 나타났다.",
      "answer": "12",
      "accept": ["twelve"],
      "wordLimit": "ONE NUMBER",
      "trap": "이 대화의 퍼센트 값은 12·18·2 세 개다. 각각 난류 강도·피로 감소·출력 감소로 붙는 대상이 전부 다르다.",
      "explanation": "'unexpected structural fatigue near the blade root transition area when turbulence intensity exceeded twelve per cent.' exceeded와 붙은 값만 답이 됩니다. 정답: **12**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-21-q8",
      "kind": "gap",
      "promptEn": "Dynamic pitch control cut peak mechanical fatigue by nearly ______ per cent.",
      "promptKo": "동적 피치 제어는 최대 기계적 피로를 거의 ______ 퍼센트 줄였다.",
      "answer": "18",
      "accept": ["eighteen"],
      "wordLimit": "ONE NUMBER",
      "trap": "바로 뒤따르는 2퍼센트와 자리를 바꿔 적기 쉽다. 이득의 크기와 대가의 크기를 각각 다른 칸에 적어야 한다.",
      "explanation": "'That reduced peak mechanical fatigue by nearly eighteen per cent.' 2퍼센트는 전력 생산량 감소분입니다. 정답: **18**",
      "category": "숫자·계산"
    },
    {
      "id": "ielts-lis-21-q9",
      "kind": "gap",
      "promptEn": "On the department workstation, rendering currently takes over ______ hours per run.",
      "promptKo": "학과 워크스테이션에서 렌더링은 현재 1회당 ______ 시간 넘게 걸린다.",
      "answer": "4",
      "accept": ["four"],
      "wordLimit": "ONE NUMBER",
      "trap": "'20분'이 곧이어 들리지만 그것은 클러스터를 쓴 뒤의 예상치다. 현재 값과 개선 후 값을 갈라야 한다.",
      "explanation": "'Currently, our graphics rendering script takes over four hours per simulation run on our department workstation.' under twenty minutes는 아직 실현되지 않은 미래 값입니다. 정답: **4**",
      "category": "오답 소거"
    },
    {
      "id": "ielts-lis-21-q10",
      "kind": "gap",
      "promptEn": "For cluster access privileges the students must contact ______ in the computing lab.",
      "promptKo": "클러스터 접근 권한을 얻으려면 컴퓨팅 실험실의 ______ 에게 연락해야 한다.",
      "answer": "Dr. Patel",
      "accept": ["Dr Patel", "Patel"],
      "wordLimit": "NO MORE THAN TWO WORDS",
      "trap": "지도교수 Zhao를 적으면 안 된다. 사람 이름은 대문자로 시작하고 Patell·Patel의 l 개수를 헷갈리기 쉽다.",
      "explanation": "'Contact Dr. Patel in the computing lab for access privileges.' 지시를 내린 사람과 연락해야 할 사람이 다릅니다. 정답: **Dr. Patel**",
      "category": "스펠링"
    }
  ]
}
```
