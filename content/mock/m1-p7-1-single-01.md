# Part 7 — Single Passage: Email (아파트 점검 일정 변경·주차 안내)

```json
{
  "id": "m1-p7-1-single-01",
  "part": 7,
  "difficulty": "MEDIUM",
  "passageType": "Email",
  "passageLines": [
    { "en": "To: Residents of Building C, Maple Ridge Apartments", "ko": "받는 사람: 메이플리지 아파트 C동 입주민" },
    { "en": "From: Danielle Osei, Property Manager", "ko": "보낸 사람: 대니엘 오세이, 건물 관리인" },
    { "en": "Subject: Rescheduled Annual Inspection and Parking Update", "ko": "제목: 연례 점검 일정 변경 및 주차 안내" },
    { "en": "Dear residents, I am writing to inform you that the annual safety inspection originally scheduled for Thursday, June 12, has been moved to the following Tuesday, June 17.", "ko": "입주민 여러분께, 원래 6월 12일 목요일로 예정되어 있던 연례 안전 점검이 그다음 주 화요일인 6월 17일로 변경되었음을 알려드립니다." },
    { "en": "The contractor who services our heating and ventilation systems had a scheduling conflict, and we felt it was better to wait a few days than to bring in an unfamiliar crew.", "ko": "저희 냉난방 및 환기 설비를 담당하는 업체의 일정이 겹쳐, 낯선 작업팀을 부르기보다 며칠 기다리는 편이 낫다고 판단했습니다." },
    { "en": "During the inspection, a technician will need brief access to each unit to check smoke detectors, water heaters, and window seals.", "ko": "점검 중 기술자가 각 세대에 잠시 들어가 화재감지기, 온수기, 창문 밀폐 상태를 확인해야 합니다." },
    { "en": "You do not need to be present; our staff will accompany the technician and lock up afterward.", "ko": "입주민이 반드시 계실 필요는 없으며, 저희 직원이 기술자와 동행하고 이후 문단속을 하겠습니다." },
    { "en": "If you would prefer to be home, please reply with a two-hour window that works for you, and we will do our best to accommodate it.", "ko": "댁에 계시기를 원하시면 가능한 두 시간대를 회신해 주시면 최대한 맞춰 드리겠습니다." },
    { "en": "Please also note that the visitor parking lot near the north entrance will be closed for resurfacing from June 16 to June 18.", "ko": "또한 북쪽 출입구 인근 방문객 주차장이 6월 16일부터 18일까지 노면 재포장 공사로 폐쇄됩니다." },
    { "en": "Residents expecting guests during those days should direct them to the overflow lot on Birch Street, a short walk away.", "ko": "그 기간에 손님을 맞는 입주민은 도보로 가까운 버치 스트리트의 여유 주차장으로 안내해 주십시오." },
    { "en": "Regular resident spaces will not be affected. Thank you for your patience.", "ko": "입주민 지정 주차 구역은 영향을 받지 않습니다. 양해에 감사드립니다." }
  ],
  "questions": [
    {
      "id": "m1-p7-1-single-01-q1",
      "prompt": "Why was the email sent to residents?",
      "promptKo": "이 이메일을 입주민에게 보낸 이유는 무엇인가?",
      "choices": ["To request overdue rent payments", "To inform them that a scheduled inspection has been delayed", "To advertise a newly renovated parking lot", "To introduce a new building manager"],
      "choicesKo": ["연체된 임대료 납부를 요청하려고", "예정된 점검이 미뤄졌음을 알리려고", "새로 단장한 주차장을 홍보하려고", "새 건물 관리인을 소개하려고"],
      "answerIndex": 1,
      "explanation": "원래 6월 12일이던 점검이 6월 17일로 옮겨졌다는 안내가 이메일의 핵심 목적입니다. 주차장 재포장·임대료·관리인은 부수적이거나 언급되지 않습니다. 따라서 (나)=1입니다.",
      "category": "주제·목적"
    },
    {
      "id": "m1-p7-1-single-01-q2",
      "prompt": "What are residents with guests told to do between June 16 and June 18?",
      "promptKo": "6월 16일부터 18일 사이에 손님이 있는 입주민은 무엇을 하라고 안내받는가?",
      "choices": ["Let guests use the residents' assigned spaces", "Have guests enter through the north entrance", "Reschedule their visitors for another week", "Send guests to the overflow lot on Birch Street"],
      "choicesKo": ["손님이 입주민 지정 구역을 쓰게 한다", "손님을 북쪽 출입구로 들어오게 한다", "손님 방문을 다른 주로 미룬다", "손님을 버치 스트리트 여유 주차장으로 보낸다"],
      "answerIndex": 3,
      "explanation": "방문객 주차장이 폐쇄되는 기간에는 손님을 버치 스트리트 여유 주차장으로 안내하라고 했습니다. 지정 구역은 입주민용이고, 북쪽 출입구 주차장은 오히려 폐쇄됩니다. 따라서 (라)=3입니다.",
      "category": "세부사항"
    }
  ]
}
```
