# Part 6 패턴학습 · CHAPTER 4 — 기사/보고서: 객관적 서술 상황 (패턴 16~20)

```json
{
  "part": 6,
  "chapter": 4,
  "chapterTitle": "기사/보고서: 객관적 서술 상황",
  "patterns": [
    {
      "id": "p6-pat-16",
      "no": 16,
      "title": "기업 인수합병 및 투자 유치 기사",
      "category": "기사",
      "contextMap": "지문 첫머리에 'Acquisition', 'Merger', 'Secures Funding', 'Press Release'가 보이면 흐름을 예측하세요.\n· **[팩트 전달]** A사가 시장 확장·기술 확보를 위해 B사를 인수·합병했습니다\n· **[정답 구역·시제]** 이 거래는 이사회 승인을 거쳐 성공적으로 완료됨 — 완료의 과거·현재완료 수동태 저격\n· **[CEO 소감·전망]** 두 회사의 결합이 향후 엄청난 시너지·성장 동력을 창출 — 전망 어휘·문장 삽입 저격\n· **[향후 계획]** 구체적 통합 작업은 특정 시점부터 순차 진행 예정 — 향후 계획·부사구 저격",
      "passage": "SEOUL—The Apex Technology Group announced yesterday that it has finalized a definitive agreement to acquire Social Brain AI, a leading developer of predictive data frameworks, in an all-cash transaction valued at $45 million.\n\nThe strategic acquisition, which received unanimous approval from the boards of directors of both companies, (1) __________ to accelerate Apex's expansion into specialized B2G consulting markets.\n\nUnder the terms of the agreement, Social Brain AI will operate as a wholly owned subsidiary of Apex, retaining its current research personnel and engineering assets. (2) __________. Industry experts predict that the combined entity will now control nearly thirty percent of the regional automation software market.\n\n\"Joining forces with Apex allows us to scale our automated document generation tools at an (3) __________ pace,\" said Hana Tanaka, CEO of Social Brain AI. \"Our engineering teams are eager to integrate our predictive models into Apex's massive infrastructure.\"\n\nThe transaction is subject to customary closing conditions and regulatory approvals, and it is anticipated to close officially (4) __________ the end of the third quarter. A joint committee will be formed next month to oversee the transition process.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["expected", "is expected", "expects", "is expecting"],
          "answerIndex": 1,
          "explanation": "주어 The strategic acquisition은 스스로 기대하는 주체가 아니라 '~할 것으로 기대되는' 대상이므로 수동태가 필요하다(be expected to + 동사원형은 기사문 전망의 고정 구문).\n(A) expected — 과거분사 단독이라 정형 본동사가 되지 못한다.\n(B) is expected — 수동태. be expected to로 정답.\n(C) expects — 능동이라 acquisition이 '기대하는' 주체가 되어 태가 어긋난다.\n(D) is expecting — 능동 진행이라 마찬가지로 태가 맞지 않는다.",
          "translation": "양사 이사회의 만장일치 승인을 받은 이 전략적 인수는 아펙스의 전문 B2G 컨설팅 시장 확장을 가속할 것으로 기대된다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "The financial details of the merger will remain permanently confidential.",
            "This consolidation creates an immediate powerhouse in enterprise analytics.",
            "Several older software versions were abruptly discontinued last week.",
            "Internal employees are encouraged to apply for the vacant leadership roles."
          ],
          "answerIndex": 1,
          "explanation": "뒤 문장에서 합병 법인이 시장의 30%를 지배할 것으로 예측하며 지배력 상승을 뒷받침하므로, 앞에 '이 통합이 즉각적 강자를 창출한다'는 총론이 와야 한다.\n(A) 합병의 재무 세부 사항은 영구 기밀로 유지됩니다 — 지배력 상승 흐름과 무관하다.\n(B) 이 통합은 기업 분석 분야에서 즉각적인 강자를 만들어 냅니다 — 뒤 30% 지배 예측의 총론이라 정답.\n(C) 여러 구형 소프트웨어가 지난주 갑자기 단종되었습니다 — 합병 긍정 톤과 충돌한다.\n(D) 내부 직원은 공석 리더직에 지원하도록 권장됩니다 — 시장 지배 흐름과 무관하다.",
          "translation": "이 통합은 기업 분석 분야에서 즉각적인 강자를 만들어 냅니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["unprecedented", "incidental", "reluctant", "obsolete"],
          "answerIndex": 0,
          "explanation": "일류 기업 합병으로 개발 속도가 엄청나게 빨라진다는 CEO 인터뷰 맥락이라 '전례 없는'이 알맞다.\n(A) unprecedented — '전례 없는'. 속도 강조로 정답.\n(B) incidental — '부수적인'이라 속도 강조와 맞지 않는다.\n(C) reluctant — '마지못한'이라 pace 수식으로 어색하다.\n(D) obsolete — '구식의'라 성장 맥락과 반대다.",
          "translation": "\"아펙스와 힘을 합치면 우리의 자동 문서 생성 도구를 전례 없는 속도로 확장할 수 있습니다.\""
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["during", "by", "throughout", "inside"],
          "answerIndex": 1,
          "explanation": "뒤에 the end of the third quarter라는 완료 마감 시점이 오므로, '늦어도 그때까지는' 거래가 완료된다는 완료 기한 전치사가 필요하다.\n(A) during — '~동안'이라 완료 기한 시점과 맞지 않는다.\n(B) by — '~까지(완료 기한)'. 정답.\n(C) throughout — '~내내'라 완료 시점과 맞지 않는다.\n(D) inside — 공간·범위 '이내'라 특정 마감 시점 표현에는 by가 표준이다.",
          "translation": "이 거래는 통상적인 종결 조건과 규제 승인을 조건으로 하며, 3분기 말까지 공식 완료될 것으로 예상된다."
        }
      ]
    },
    {
      "id": "p6-pat-17",
      "no": 17,
      "title": "지역 경제 발전 및 건설 프로젝트 기사",
      "category": "기사",
      "contextMap": "헤드라인·도입부에 'Development', 'Construction', 'Infrastructure', 'New Facility'가 보이면 흐름을 예측하세요.\n· **[팩트 발표]** 정부·기업이 지역 경제 활성화를 위해 새 시설 건설을 확정\n· **[수치·일정]** 수백억 예산이 할당되고 공사 착공·완공 일정 안내 — 예산 할당 수동태 동사 저격\n· **[정답 구역·경제 효과]** 완공 시 수천 개 일자리 창출로 지역 경제를 상당히·극적으로 자극 — 강조 부사·문장 삽입 저격\n· **[주민 의견]** 인근 상인·주민이 개발을 열렬히 환영 — 감정·반응 어휘 저격",
      "passage": "JEONBUK—The provincial government confirmed on Friday that a state-of-the-art disaster safety research and development complex will be constructed in the region, with groundbreaking scheduled for early next month.\n\nThe multi-year project, which runs from 2026 through 2028, is backed by a substantial joint investment from public funds and private tech firms. A total budget of $35 million (1) __________ to fund the initial infrastructure setup and database ontology architecture.\n\nThe state-of-the-art facility will house over 200 senior data scientists and structural engineers specializing in regional hazard prevention frameworks. (2) __________. Economic analysts predict that the influx of highly skilled professionals will revitalize the local commercial sector and boost housing demand.\n\n\"This infrastructure project will not only enhance public safety but will also (3) __________ accelerate our regional economic growth,\" said Governor Min-woo Choi during a press conference. \"We are transforming Jeonbuk into a central hub for advanced safety technology.\"\n\nLocal business owners have expressed immense (4) __________ regarding the announcement, anticipating a steady stream of new customers once the complex officially opens its doors in 2028.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["allocates", "has been allocated", "to allocate", "is allocating"],
          "answerIndex": 1,
          "explanation": "주어 A total budget of $35 million은 스스로 할당하는 주체가 아니라 '할당되는' 대상이므로 수동태가 필요하다.\n(A) allocates — 능동이라 예산이 '할당하는' 주체가 되어 태가 어긋난다.\n(B) has been allocated — 현재완료 수동. 정답.\n(C) to allocate — 준동사라 본동사 자리에 올 수 없다.\n(D) is allocating — 능동 진행이라 태가 맞지 않는다.",
          "translation": "총 3,500만 달러의 예산이 초기 인프라 구축과 데이터베이스 온톨로지 설계 자금으로 배정되었다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "Environmental concerns will likely delay the final regulatory approval.",
            "Consequently, several residential areas will experience temporary power outages.",
            "The complex is expected to generate hundreds of auxiliary jobs in the area.",
            "Funding for municipal road repairs was completely suspended last week."
          ],
          "answerIndex": 2,
          "explanation": "뒤 문장에서 전문 인력 유입이 지역 상권 활성화·주택 수요 증가로 이어진다고 예측하므로, 앞에 '이 단지가 수백 개 부수 일자리를 창출한다'는 총론이 와야 한다.\n(A) 환경 우려로 최종 규제 승인이 지연될 것입니다 — 긍정적 경제 효과 흐름과 어긋난다.\n(B) 따라서 여러 주거지에 일시 정전이 발생합니다 — 문맥과 무관하다.\n(C) 이 단지는 지역에 수백 개의 부수 일자리를 창출할 것으로 기대됩니다 — 뒤 경제 파급의 총론이라 정답.\n(D) 시 도로 보수 예산이 지난주 전면 중단되었습니다 — 개발 기사 흐름과 무관하다.",
          "translation": "이 단지는 해당 지역에 수백 개의 부수적인 일자리를 창출할 것으로 기대된다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["directly", "reluctantly", "mutually", "marginally"],
          "answerIndex": 0,
          "explanation": "건설 프로젝트가 지역 경제 성장을 '직접적으로' 가속한다는 도지사의 확신 맥락이다.\n(A) directly — '직접적으로'. 정답.\n(B) reluctantly — '마지못해'라 긍정적 발표와 맞지 않는다.\n(C) mutually — '상호간에'라 가속 부사로 어색하다.\n(D) marginally — '미미하게'라 성장 강조와 반대다.",
          "translation": "\"이 인프라 사업은 공공 안전을 강화할 뿐 아니라 지역 경제 성장을 직접적으로 가속할 것입니다.\""
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["enthusiasm", "apprehension", "indifference", "resentment"],
          "answerIndex": 0,
          "explanation": "뒤 분사구문 anticipating a steady stream of new customers(고객 유입 기대)가 단서이므로, 상인들의 반응은 열렬한 환호다.\n(A) enthusiasm — '열정, 환호'. 고객 기대와 부합해 정답.\n(B) apprehension — '불안'이라 고객 유입 기대와 반대다.\n(C) indifference — '무관심'이라 immense와 결합·문맥이 어긋난다.\n(D) resentment — '분노'라 긍정 반응과 정반대다.",
          "translation": "지역 상인들은 2028년 단지가 정식 개장하면 새 고객이 꾸준히 유입되리라 기대하며 이번 발표에 큰 환호를 표했다."
        }
      ]
    },
    {
      "id": "p6-pat-18",
      "no": 18,
      "title": "분기 실적 및 연간 재무 보고 기사",
      "category": "기사",
      "contextMap": "헤드라인에 'Quarterly Earnings', 'Financial Results', 'Fiscal Performance'가 보이면 흐름을 예측하세요.\n· **[팩트 발표]** 기업이 이번 분기·연간 매출 실적을 발표\n· **[수치 묘사]** 총매출이 전년 동기 대비 증가·감소 — 증감 자동사·전치사 짝꿍 저격\n· **[정답 구역·원인]** 견고한 성장은 신제품 흥행·비용 절감에 기인 — 원인 분석 전치사구·문장 삽입 저격\n· **[향후 전망]** 경영진은 다음 분기 성장세 지속을 낙관 — 전망·태도 어휘 저격",
      "passage": "SEOUL—Muze AI released its second-quarter financial results on Thursday, reporting a substantial increase in net profit that outpaced most market expectations. The data reveals that the company's strategic shift toward B2G consulting has begun to pay off significantly.\n\nAccording to the report, overall revenue for the quarter (1) __________ by 18 percent compared to the same period last year, reaching a record high of $12 million.\n\nThe firm's automated document generation software division showed the most dramatic expansion, capturing several major public sector contracts. (2) __________. Chief Financial Officer Min-seok Kang stated that the corporate expense control measures implemented earlier this year also helped maximize profit margins.\n\n\"Our financial stability allows us to invest (3) __________ in next-generation predictive data models,\" said Mr. Kang. \"We are keeping our focus on maintaining long-term scalability.\"\n\nThe company's board of directors expressed confidence regarding the upcoming quarters, issuing an upbeat (4) __________ for the remainder of the fiscal year as new regional projects are scheduled to launch.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["rose", "raised", "was risen", "is raising"],
          "answerIndex": 0,
          "explanation": "주어 overall revenue 뒤에 목적어 없이 by 18 percent가 오므로 자동사가 필요하고, 실적 발표라 과거 시제다.\n(A) rose — 자동사 rise의 과거 '올랐다'. by 18%와 부합해 정답.\n(B) raised — 타동사 raise의 과거라 목적어가 필요한데 by만 있어 맞지 않는다.\n(C) was risen — rise는 자동사라 수동태 자체가 성립하지 않는다.\n(D) is raising — 타동사 진행형이라 목적어 필요·시제 모두 어긋난다.",
          "translation": "보고서에 따르면, 이번 분기 총매출은 전년 동기 대비 18퍼센트 올라 1,200만 달러의 사상 최고치를 기록했다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "This robust growth is largely attributed to the expansion of our technical support team.",
            "Consequently, the company plans to downsize its regional software research facility.",
            "This impressive performance is primarily driven by strong demand from municipal clients.",
            "Several subscription tiers will be permanently discontinued by next Monday."
          ],
          "answerIndex": 2,
          "explanation": "앞 문장에서 소프트웨어 부문이 대형 공공 부문 계약을 따내며 확장했다고 배경을 제시하므로, 그 성과가 '지자체 고객 수요에 견인됐다'고 재진술하는 문장이 맞다.\n(A) 이 견고한 성장은 대체로 기술 지원팀 확장에 기인합니다 — 앞의 '공공 계약'과 다른 요인이라 어긋난다.\n(B) 따라서 회사는 지역 소프트웨어 연구소를 축소할 계획입니다 — 성장 호실적과 모순된다.\n(C) 이 인상적 실적은 주로 지자체 고객의 강한 수요에 견인되었습니다 — 앞 '공공 부문 계약'을 재진술해 정답.\n(D) 여러 구독 등급이 다음 주 월요일까지 영구 단종됩니다 — 실적 흐름과 무관하다.",
          "translation": "이 인상적인 실적은 주로 지자체 고객의 강한 수요에 힘입은 것이다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["heavily", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "동사 invest를 수식해 '대규모로 과감히 투자하다'를 뜻하는 부사가 필요하다(invest heavily in 짝꿍).\n(A) heavily — invest heavily in. '대규모로'로 정답.\n(B) reluctantly — '마지못해'라 투자 확대 의지와 반대다.\n(C) marginally — '미미하게'라 투자 강조와 어긋난다.\n(D) obsolete — 형용사라 동사 invest를 수식하는 부사 자리에 올 수 없다.",
          "translation": "\"탄탄한 재무 안정성 덕분에 우리는 차세대 예측 데이터 모델에 대규모로 투자할 수 있습니다.\""
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["outcome", "outlook", "oversight", "obligation"],
          "answerIndex": 1,
          "explanation": "이사회가 다가오는 분기에 자신감을 표하며 남은 회계연도에 대한 긍정적 '전망'을 내놓았다는 맥락이다(재무 기사 단골).\n(A) outcome — '결과'라 앞으로에 대한 '전망'과 다르다.\n(B) outlook — '전망'. upbeat outlook으로 정답.\n(C) oversight — '감독/간과'라 전망 의미와 맞지 않는다.\n(D) obligation — '의무'라 문맥과 무관하다.",
          "translation": "이사회는 새 지역 프로젝트 출범을 앞두고 남은 회계연도에 대해 낙관적인 전망을 내놓으며 다가오는 분기에 자신감을 표했다."
        }
      ]
    },
    {
      "id": "p6-pat-19",
      "no": 19,
      "title": "업계 트렌드 및 시장 조사 보고서",
      "category": "기사",
      "contextMap": "타이틀·도입부에 'Market Trend', 'Survey Results', 'Consumer Behavior Analysis'가 보이면 흐름을 예측하세요.\n· **[트렌드 제시]** 디지털 전환 등으로 소비자의 특정 선호 경향이 뚜렷해짐\n· **[통계 인용]** 조사 결과 응답자의 몇 퍼센트가 이 기술을 사용 — 수치 수식 형용사·분사 저격\n· **[정답 구역·대책]** 도태되지 않으려면 기업은 반드시 프로세스를 조정·혁신해야 함 — 당위성 조동사·부사·문장 삽입 저격\n· **[향후 전망]** 이 트렌드가 향후 지속적 대세로 자리 잡을 것 — 지속성 어휘·전치사 저격",
      "passage": "The Regional Commerce Institute has released its annual executive summary on evolving consumer behaviors in the retail sector. The data strongly suggests that the rapid adoption of mobile-first payment frameworks is fundamentally altering traditional purchasing pathways.\n\nAccording to a comprehensive survey conducted last month, a (1) __________ majority of consumers—over sixty percent—now prefer digital transactions over conventional methods.\n\nThis shift is heavily driven by enhanced security features and the seamless nature of automated document generation for digital receipts. (2) __________. Retailers who fail to implement these systems risk losing market share to more technically agile competitors.\n\nThe report emphasizes that updating point-of-sale frameworks will allow businesses to process client data more (3) __________, directly leading to improvements in customer retention rates.\n\nAs automated infrastructure continues to evolve, this consumer preference for convenience is highly likely to (4) __________ for the foreseeable future, making early technological adoption a critical strategic move.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["clear", "clearly", "clearness", "cleared"],
          "answerIndex": 0,
          "explanation": "'a + [형용사] + majority(명사)' 구조라 명사를 앞에서 수식하는 형용사 자리다(a clear majority 단골).\n(A) clear — 형용사. majority를 수식해 정답.\n(B) clearly — 부사라 명사 majority를 수식하지 못한다.\n(C) clearness — 명사라 'a clearness majority'로 두 명사가 충돌한다.\n(D) cleared — 과거분사라 '제거된 다수'로 의미가 어색하다.",
          "translation": "지난달 실시된 종합 설문에 따르면, 소비자의 명백한 다수(60퍼센트 이상)가 이제 기존 방식보다 디지털 결제를 선호한다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "Consequently, many storefronts have chosen to increase their cash reserves.",
            "Therefore, businesses must modernize their digital infrastructure to remain viable.",
            "In contrast, consumer interest in electronic payment methods has steadily declined.",
            "Funding for external marketing research was completely suspended by management."
          ],
          "answerIndex": 1,
          "explanation": "앞은 디지털 결제 선호 변화의 원인, 뒤는 '시스템 미도입 소매업체는 시장 점유율을 잃을 위험'이라는 경고이므로, 사이에 '그러므로 인프라를 현대화해야 한다'는 당위가 와야 한다.\n(A) 따라서 많은 매장이 현금 보유를 늘리기로 했습니다 — 디지털 전환 흐름과 반대다.\n(B) 따라서 기업은 생존하려면 디지털 인프라를 현대화해야 합니다 — 뒤 경고의 당위 총론이라 정답.\n(C) 반대로 전자결제에 대한 소비자 관심이 꾸준히 감소했습니다 — 앞의 선호 증가와 모순된다.\n(D) 외부 마케팅 조사 예산이 경영진에 의해 전면 중단되었습니다 — 문맥과 무관하다.",
          "translation": "따라서 기업은 생존을 유지하려면 디지털 인프라를 현대화해야 합니다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["efficiently", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "'process client data' 뒤에서 완성된 문장을 수식하는 부사 자리이자, 시스템 업데이트로 데이터를 더 '효율적으로' 처리한다는 긍정 맥락이다.\n(A) efficiently — '효율적으로'. 긍정 개선으로 정답.\n(B) reluctantly — '마지못해'라 개선 맥락과 반대다.\n(C) marginally — '미미하게'라 개선 강조와 어긋난다.\n(D) obsolete — 형용사라 동사를 수식하는 부사 자리에 올 수 없다.",
          "translation": "보고서는 판매 시점 시스템을 갱신하면 기업이 고객 데이터를 더 효율적으로 처리할 수 있어 고객 유지율 향상으로 직결된다고 강조한다."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["persist", "terminate", "reverse", "bounce"],
          "answerIndex": 0,
          "explanation": "편리성 선호 경향이 예측 가능한 미래에도 계속 '지속될' 가능성이 높다는 맥락이다(트렌드 보고서 단골 자동사).\n(A) persist — '지속되다'. 정답.\n(B) terminate — '종료되다'라 '지속' 의도와 반대다.\n(C) reverse — '뒤집히다'라 선호 지속과 반대다.\n(D) bounce — '튀다'라 문맥과 맞지 않는다.",
          "translation": "자동화 인프라가 계속 진화함에 따라, 편리성에 대한 이 소비자 선호는 예측 가능한 미래에도 지속될 가능성이 매우 높다."
        }
      ]
    },
    {
      "id": "p6-pat-20",
      "no": 20,
      "title": "인물 인터뷰 및 성공 스토리 기사",
      "category": "기사",
      "contextMap": "헤드라인에 'Executive Profile', 'Success Story', 'Pioneer in Technology'가 보이면 흐름을 예측하세요.\n· **[인물 소개]** 특정 분야에서 혁신·수상한 인물의 스토리 조명\n· **[과거의 노력]** 처음부터 성공한 것은 아니며 수많은 시행착오를 겪으며 헌신 — 과거·현재완료 시제·역경 어휘 저격\n· **[정답 구역·성공 요인]** 성공의 비결은 철저한 준비와 팀원의 아낌없는 협력 — 감사·공헌 어휘·문장 삽입 저격\n· **[미래 비전]** 현재에 안주하지 않고 후학 양성·기술 기부에 힘쓸 계획 — 지속 성장 동사구 저격",
      "passage": "SEOUL—When Hana Tanaka founded Muze AI a decade ago, few industry analysts predicted that a small startup specializing in legal automation would eventually redefine the B2G consulting landscape. Today, Ms. Tanaka is recognized as one of the most (1) __________ figures in the regional technology sector.\n\nHer journey was marked by persistent challenges, particularly during the early years when corporate funding for large language models was scarce. (2) __________. She worked closely with public sector innovators, gradually building the data ontology architecture that now powers regional safety systems.\n\nIn a recent interview, Ms. Tanaka attributed much of her company's current market dominance to the collective dedication of her engineering teams. \"No single individual can build a comprehensive predictive platform,\" she remarked. \"Our success is entirely a result of our (3) __________ efforts.\"\n\nMs. Tanaka intends to (4) __________ a portion of the firm's annual profits to funding technology scholarships for underprivileged students, ensuring the next generation of developers has the resources to innovate.",
      "questions": [
        {
          "prompt": "빈칸 (1)",
          "choices": ["influence", "influential", "influentially", "influenced"],
          "answerIndex": 1,
          "explanation": "'the most + [형용사] + figures(명사)' 구조라 복수 명사 figures를 수식하는 형용사 자리다.\n(A) influence — 명사/동사라 figures를 수식하는 형용사 자리에 올 수 없다.\n(B) influential — 형용사 '영향력 있는'. 정답.\n(C) influentially — 부사라 명사 figures를 수식하지 못한다.\n(D) influenced — 과거분사라 '영향받은 인물'이 되어 최상급 극찬 맥락과 어색하다.",
          "translation": "오늘날 다나카 씨는 지역 기술 분야에서 가장 영향력 있는 인물 중 한 명으로 인정받는다."
        },
        {
          "prompt": "빈칸 (2) · 문장 삽입",
          "choices": [
            "Consequently, she decided to dissolve the company's research division.",
            "Nevertheless, her unwavering commitment to digital compliance never wavered.",
            "In contrast, major tech conglomerates completely dominated the software market.",
            "Therefore, the product launch was indefinitely postponed by the board."
          ],
          "answerIndex": 1,
          "explanation": "앞은 초창기 투자 부족의 역경, 뒤는 공공 부문 혁신가들과 협력해 시스템을 구축한 극복 성과이므로, 역경과 극복을 잇는 역접이 필요하다.\n(A) 따라서 그녀는 회사 연구 부문을 해체하기로 했습니다 — 극복 성과와 정반대다.\n(B) 그럼에도 디지털 준법에 대한 그녀의 흔들림 없는 헌신은 결코 꺾이지 않았습니다 — 역경→극복을 잇는 역접이라 정답.\n(C) 반대로 대형 기술 대기업이 소프트웨어 시장을 완전히 지배했습니다 — 그녀의 극복 서사와 어긋난다.\n(D) 따라서 제품 출시가 이사회에 의해 무기한 연기되었습니다 — 성공 스토리 흐름과 충돌한다.",
          "translation": "그럼에도 불구하고, 디지털 준법에 대한 그녀의 흔들림 없는 헌신은 결코 꺾이지 않았다."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["collaborative", "reluctant", "marginal", "obsolete"],
          "answerIndex": 0,
          "explanation": "앞 인용구에서 '어떤 개인도 혼자서 플랫폼을 만들 수 없다'며 팀의 집단적 헌신을 강조하므로, 성공은 '협력적인' 노력의 결과다.\n(A) collaborative — '협력적인'. 팀워크 강조로 정답.\n(B) reluctant — '마지못한'이라 헌신 강조와 반대다.\n(C) marginal — '미미한'이라 성공 요인과 어긋난다.\n(D) obsolete — '구식의'라 문맥과 무관하다.",
          "translation": "\"우리의 성공은 전적으로 협력적인 노력의 결과입니다.\""
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["allocate", "terminate", "reverse", "bounce"],
          "answerIndex": 0,
          "explanation": "'intends to + [타동사] + a portion of the firm's annual profits' 구조라, 연간 수익 일부를 장학금으로 '할당·배분하다'가 알맞다(allocate A to B).\n(A) allocate — 'allocate A to B(~에 배분하다)'. 정답.\n(B) terminate — '종료하다'라 수익을 장학금에 쓰는 의미와 반대다.\n(C) reverse — '뒤집다'라 문맥과 맞지 않는다.\n(D) bounce — '튀다'라 의미가 전혀 맞지 않는다.",
          "translation": "다나카 씨는 회사 연간 수익의 일부를 저소득층 학생을 위한 기술 장학금 자금으로 배정할 계획이다."
        }
      ]
    }
  ]
}
```
