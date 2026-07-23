# Part 7 — Single Passage: Online Chat (팀 대시보드 일정·의도 파악)

```json
{
  "id": "m1-p7-1-single-08",
  "part": 7,
  "difficulty": "HARD",
  "passageType": "Online Chat Discussion",
  "passageLines": [
    { "en": "Dana Cho (2:40 P.M.): The client wants the sales dashboard ready for their Friday board meeting. Where do we stand?", "ko": "다나 조 (오후 2:40): 고객이 금요일 이사회 회의에 맞춰 매출 대시보드를 준비해 달라고 해요. 지금 어디까지 됐죠?" },
    { "en": "Ravi Menon (2:42 P.M.): The data pipeline is done. I'm still cleaning up the regional figures—some stores reported twice.", "ko": "라비 메논 (오후 2:42): 데이터 파이프라인은 끝났어요. 지역별 수치를 아직 정리 중인데, 일부 매장이 이중으로 보고됐더라고요." },
    { "en": "Dana Cho (2:43 P.M.): How long to fix the duplicates?", "ko": "다나 조 (오후 2:43): 중복 수정하는 데 얼마나 걸릴까요?" },
    { "en": "Ravi Menon (2:45 P.M.): A couple of hours. But the charts still need to be built after that.", "ko": "라비 메논 (오후 2:45): 두어 시간이요. 그런데 그 뒤에 차트도 만들어야 해요." },
    { "en": "Sofia Reyes (2:47 P.M.): I can take the charts. Send me the cleaned data whenever it's ready and I'll have them done by tomorrow morning.", "ko": "소피아 레예스 (오후 2:47): 차트는 제가 맡을게요. 정리된 데이터가 준비되는 대로 보내 주시면 내일 아침까지 끝내 놓을게요." },
    { "en": "Dana Cho (2:48 P.M.): Sofia, that would take a load off. Ravi, focus on the numbers and hand them over as soon as they're clean.", "ko": "다나 조 (오후 2:48): 소피아, 그러면 한시름 놓겠네요. 라비, 수치에 집중하고 정리되는 대로 넘겨주세요." }
  ],
  "questions": [
    {
      "id": "m1-p7-1-single-08-q1",
      "prompt": "What is the discussion mainly about?",
      "promptKo": "이 대화는 주로 무엇에 관한 것인가?",
      "choices": ["Preparing a dashboard for a client meeting", "Hiring a new data analyst", "Choosing a venue for a board meeting", "Reviewing a store's opening hours"],
      "choicesKo": ["고객 회의를 위한 대시보드 준비", "새 데이터 분석가 채용", "이사회 회의 장소 선정", "매장 영업시간 검토"],
      "answerIndex": 0,
      "explanation": "금요일 이사회에 맞춰 매출 대시보드를 완성하는 작업 진행 상황을 논의하고 있습니다. 채용·장소·영업시간이 아닙니다. 따라서 (가)=0입니다.",
      "category": "주제·목적"
    },
    {
      "id": "m1-p7-1-single-08-q2",
      "prompt": "At 2:48 P.M., what does Ms. Cho most likely mean when she writes, \"that would take a load off\"?",
      "promptKo": "오후 2:48에 조 씨가 \"그러면 한시름 놓겠네요\"라고 쓴 것은 무엇을 의미할 가능성이 큰가?",
      "choices": ["She wants Ms. Reyes to postpone the charts.", "She is relieved that Ms. Reyes offered to handle the charts.", "She thinks the data is too heavy to send.", "She plans to cancel the Friday meeting."],
      "choicesKo": ["레예스 씨가 차트를 미뤄 주기를 바란다.", "레예스 씨가 차트를 맡겠다고 해서 안심한다.", "데이터가 너무 무거워 보낼 수 없다고 생각한다.", "금요일 회의를 취소할 계획이다."],
      "answerIndex": 1,
      "explanation": "레예스 씨가 차트를 맡겠다고 하자 조 씨가 부담이 줄었다며 안도한 것입니다. 연기·전송 불가·취소가 아닙니다. 따라서 (나)=1입니다.",
      "category": "의도·화법"
    },
    {
      "id": "m1-p7-1-single-08-q3",
      "prompt": "What will Mr. Menon most likely do next?",
      "promptKo": "메논 씨가 다음에 할 일로 가장 알맞은 것은 무엇인가?",
      "choices": ["Build the charts himself", "Present the dashboard to the board", "Finish removing the duplicate figures", "Schedule a new team meeting"],
      "choicesKo": ["직접 차트를 만든다", "이사회에 대시보드를 발표한다", "중복 수치 제거를 마무리한다", "새 팀 회의를 잡는다"],
      "answerIndex": 2,
      "explanation": "조 씨가 라비에게 수치에 집중해 정리되는 대로 넘기라고 했으므로 그는 중복 수치 정리를 마칠 것입니다. 차트는 소피아가, 발표는 언급되지 않습니다. 따라서 (다)=2입니다.",
      "category": "추론"
    }
  ]
}
```
