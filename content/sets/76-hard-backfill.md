# Set 76 — HARD — Data Backfill (Notice)

```json
{
  "id": "set-hard-backfill",
  "difficulty": "HARD",
  "passageType": "Notice",
  "passageLines": [
    {
      "en": "NOTICE: Scheduled backfill of the analytics warehouse, June 24–26",
      "ko": "공지: 분석 웨어하우스 백필 예정, 6월 24일–26일"
    },
    {
      "en": "The data platform team will reprocess roughly eighteen months of historical event data starting Tuesday at 22:00 and continuing through Thursday morning.",
      "ko": "데이터 플랫폼 팀이 화요일 22시부터 시작해 목요일 오전까지 약 18개월 분량의 과거 이벤트 데이터를 재처리할 예정입니다."
    },
    {
      "en": "A backfill, for those unfamiliar with the term, is the act of rerunning a pipeline over data that already exists in order to correct or enrich it after the fact.",
      "ko": "이 용어에 익숙하지 않은 분들을 위해 설명하면, 백필이란 이미 존재하는 데이터에 대해 파이프라인을 다시 실행하여 사후적으로 그것을 바로잡거나 보강하는 작업을 말합니다."
    },
    {
      "en": "We are undertaking it because a bug in the currency-conversion step, now fixed, had been quietly misstating revenue in several non-domestic markets since last December.",
      "ko": "우리가 이를 진행하는 이유는 현재 수정된 통화 환산 단계의 버그가 지난 12월부터 여러 해외 시장의 매출을 조용히 잘못 산출해 왔기 때문입니다."
    },
    {
      "en": "The fix corrects new data going forward, but only a backfill can bring the historical records into agreement with the corrected logic.",
      "ko": "이 수정은 앞으로의 신규 데이터를 바로잡지만, 백필만이 과거 기록을 수정된 로직과 일치시킬 수 있습니다."
    },
    {
      "en": "During the run, affected tables will be rebuilt partition by partition rather than all at once, so most dashboards will remain queryable throughout.",
      "ko": "작업 중 영향을 받는 테이블은 한꺼번에가 아니라 파티션 단위로 재구축되므로, 대부분의 대시보드는 작업 내내 조회 가능한 상태로 유지됩니다."
    },
    {
      "en": "However, any partition currently being rewritten will briefly show partial data, and we therefore advise against pulling figures for executive review while the backfill is in progress.",
      "ko": "다만 현재 다시 작성 중인 파티션은 잠시 부분적인 데이터를 보여 줄 것이므로, 백필이 진행되는 동안에는 임원 검토용 수치를 추출하지 않기를 권고합니다."
    },
    {
      "en": "To keep the operation reversible, the original tables are being snapshotted beforehand and retained for thirty days.",
      "ko": "작업을 되돌릴 수 있도록, 원본 테이블은 사전에 스냅숏으로 저장되어 30일간 보관됩니다."
    },
    {
      "en": "If the reprocessed numbers turn out to diverge from expectations in any market, we can roll back to the snapshot while we investigate, with no permanent loss.",
      "ko": "재처리된 수치가 어느 시장에서든 예상과 어긋나는 것으로 드러나면, 영구적인 손실 없이 조사를 진행하는 동안 스냅숏으로 되돌릴 수 있습니다."
    },
    {
      "en": "Once the backfill completes, finance and regional leads should expect restated revenue figures for the affected period, and a reconciliation summary will follow by the end of the week.",
      "ko": "백필이 완료되면 재무팀과 지역 책임자들은 해당 기간에 대한 재산출된 매출 수치를 받게 될 것이며, 조정 요약본이 주말까지 뒤따를 것입니다."
    },
    {
      "en": "Questions about the timeline or about a specific market's exposure should be directed to the data platform channel rather than to individual analysts.",
      "ko": "일정이나 특정 시장의 영향 범위에 관한 문의는 개별 분석가가 아니라 데이터 플랫폼 채널로 보내 주시기 바랍니다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-backfill-q1",
      "prompt": "What is the main purpose of this notice?",
      "promptKo": "이 공지의 주된 목적은 무엇인가?",
      "choices": [
        "To request volunteers to manually re-enter eighteen months of data.",
        "To inform staff that the analytics warehouse is being permanently decommissioned.",
        "To advertise a new dashboard product to regional leads.",
        "To announce a scheduled backfill that will reprocess historical data to correct misstated revenue."
      ],
      "choicesKo": [
        "18개월 분량의 데이터를 수동으로 다시 입력할 자원자를 모집하기 위해",
        "분석 웨어하우스가 영구히 폐기된다고 직원들에게 알리기 위해",
        "지역 책임자들에게 새 대시보드 제품을 광고하기 위해",
        "잘못 산출된 매출을 바로잡기 위해 과거 데이터를 재처리할 예정된 백필을 알리기 위해"
      ],
      "answerIndex": 3,
      "explanation": "공지 제목과 본문은 통화 환산 버그로 잘못 산출된 매출을 바로잡기 위해 과거 데이터를 재처리하는 백필을 알리고 있으므로 (라)가 목적입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-backfill-q2",
      "prompt": "According to the notice, why is a backfill necessary in addition to the bug fix?",
      "promptKo": "공지에 따르면 버그 수정 외에 백필이 필요한 이유는 무엇인가?",
      "choices": [
        "Because the bug fix erased all historical data.",
        "Because dashboards must be taken offline regardless of the fix.",
        "Because the fix only corrects new data, while a backfill aligns historical records with the corrected logic.",
        "Because regional leads requested entirely new metrics."
      ],
      "choicesKo": [
        "버그 수정이 모든 과거 데이터를 지웠기 때문에",
        "수정과 무관하게 대시보드를 오프라인으로 내려야 하기 때문에",
        "수정은 신규 데이터만 바로잡으며, 백필이 과거 기록을 수정된 로직과 일치시키기 때문에",
        "지역 책임자들이 완전히 새로운 지표를 요청했기 때문에"
      ],
      "answerIndex": 2,
      "explanation": "본문은 수정이 앞으로의 신규 데이터를 바로잡지만 '백필만이 과거 기록을 수정된 로직과 일치시킬 수 있다'고 했으므로 (다)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-backfill-q3",
      "prompt": "What can be inferred about why the original tables are snapshotted beforehand?",
      "promptKo": "원본 테이블을 사전에 스냅숏으로 저장하는 이유에 관해 무엇을 추론할 수 있는가?",
      "choices": [
        "To permanently replace the reprocessed data with older numbers.",
        "To allow a rollback if the reprocessed numbers diverge from expectations.",
        "To free up storage space during the run.",
        "To prevent any dashboard from being queried during the backfill."
      ],
      "choicesKo": [
        "재처리된 데이터를 더 오래된 수치로 영구히 대체하기 위해",
        "재처리된 수치가 예상과 어긋날 경우 롤백할 수 있도록 하기 위해",
        "작업 중 저장 공간을 확보하기 위해",
        "백필 동안 어떤 대시보드도 조회되지 못하게 막기 위해"
      ],
      "answerIndex": 1,
      "explanation": "본문은 작업을 되돌릴 수 있도록 스냅숏을 저장하며, 수치가 어긋나면 손실 없이 스냅숏으로 롤백할 수 있다고 했으므로 (나)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-backfill-q4",
      "prompt": "In the notice, the word \"diverge\" is closest in meaning to",
      "promptKo": "공지에서 \"diverge\"라는 단어와 의미가 가장 가까운 것은",
      "choices": [
        "differ noticeably",
        "be permanently archived",
        "be automatically approved",
        "exactly match"
      ],
      "choicesKo": [
        "눈에 띄게 다르다",
        "영구히 보관되다",
        "자동으로 승인되다",
        "정확히 일치하다"
      ],
      "answerIndex": 0,
      "explanation": "'diverge from expectations'는 예상과 어긋나 달라진다는 뜻이므로 'differ noticeably'가 가장 가깝고, 'exactly match'는 반대 의미의 함정입니다. 따라서 (가)가 정답입니다.",
      "category": "동의어"
    }
  ]
}
```
