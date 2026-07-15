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
          "explanation": "주어 The strategic acquisition은 스스로 기대하는 주체가 아니라 '~할 것으로 기대되는' 대상이므로 수동태. be expected to + 동사원형은 기사문 향후 전망의 고정 구문. 능동 (C)(D)·과거분사 단독 (A) 제외, (B) is expected."
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
          "explanation": "뒤 문장에서 합병 법인이 시장의 30%를 지배할 것으로 예측한다며 지배력 상승을 뒷받침. '이 통합이 즉각적인 강자를 창출한다'는 총론을 던지는 (B)가 자석 문장."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["unprecedented", "incidental", "reluctant", "obsolete"],
          "answerIndex": 0,
          "explanation": "일류 기업 합병으로 개발 속도가 엄청나게 빨라진다는 CEO 인터뷰 맥락. '전례 없는' (A) unprecedented. (B) 부수적인·(C) 마지못한·(D) 구식의는 부적합."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["during", "by", "throughout", "inside"],
          "answerIndex": 1,
          "explanation": "뒤에 the end of the third quarter라는 완료 마감 시점이 온다. '늦어도 그때까지는' 거래가 완료된다는 완료 기한 전치사 (B) by."
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
          "explanation": "주어 A total budget of $35 million은 스스로 할당하는 주체가 아니라 '할당되는' 대상이므로 수동태. 능동 (A)(D)·동사 아닌 (C) 소거, 현재완료 수동태 (B) has been allocated."
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
          "explanation": "뒤 문장에서 전문가들이 지역 상권 활성화·주택 수요 증가를 예측한다며 경제 파급 효과를 언급. '이 단지가 수백 개 부수 일자리를 창출할 것'이라는 (C)가 매끄러운 징검다리."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["directly", "reluctantly", "mutually", "marginally"],
          "answerIndex": 0,
          "explanation": "건설 프로젝트가 지역 경제 성장을 '직접적으로' 가속한다는 도지사의 확신 맥락. (A) directly. (B) 마지못해·(C) 상호간에·(D) 미미하게는 긍정적 발표에 부적합."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["enthusiasm", "apprehension", "indifference", "resentment"],
          "answerIndex": 0,
          "explanation": "뒤 분사구문 anticipating a steady stream of new customers(고객 유입 기대)가 단서. 상인들의 반응은 엄청난 (A) enthusiasm(열정, 환호)."
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
          "explanation": "주어 overall revenue 뒤에 목적어 없이 by 18 percent가 온다. 자동사가 필요. 타동사 raise의 과거 (B)·자동사인데 수동형인 불가능한 (C) 소거, 과거형 자동사 (A) rose."
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
          "explanation": "앞 문장에서 소프트웨어 부문이 대형 공공 부문 계약을 따내며 확장했다고 배경을 제시. 그 성과가 '지방 자치단체(=public sector) 고객의 수요에 견인됐다'고 재진술하는 (C)가 정답."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["heavily", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "동사 invest를 수식해 '대규모로 과감하게 투자하다'를 뜻하는 전용 부사. invest heavily in 짝꿍. (A) heavily."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["outcome", "outlook", "oversight", "obligation"],
          "answerIndex": 1,
          "explanation": "이사회가 다가오는 분기에 자신감을 표하며 남은 회계연도에 대한 긍정적 '전망'을 내놓았다는 맥락. 재무 기사 마지막 단골 어휘 (B) outlook."
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
          "explanation": "a + [형용사] + majority(명사) 구조. 명사를 앞에서 수식하는 형용사 자리. a clear/overwhelming majority(압도적 다수) 단골 표현. (A) clear."
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
          "explanation": "앞은 디지털 결제 선호 변화의 원인, 뒤는 '시스템 미도입 소매업체는 시장 점유율을 잃을 위험'이라는 경고. 그 사이 '그러므로 기업은 생존하려면 인프라를 현대화해야 한다'는 당위성 징검다리 (B)."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["efficiently", "reluctantly", "marginally", "obsolete"],
          "answerIndex": 0,
          "explanation": "process client data(동사+목적어) 뒤 완성된 문장을 수식하는 부사 자리이자, 시스템 업데이트로 데이터를 더 '효율적으로' 처리한다는 긍정 맥락. (A) efficiently."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["persist", "terminate", "reverse", "bounce"],
          "answerIndex": 0,
          "explanation": "편리성 선호 경향이 예측 가능한 미래에도 계속 '지속될' 가능성이 높다는 맥락. 트렌드 보고서 마지막 단골 자동사 (A) persist."
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
          "explanation": "the most + [형용사] + figures(명사) 구조. 복수 명사 figures를 수식하는 형용사 자리. (B) influential(영향력 있는)."
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
          "explanation": "앞은 초창기 투자 부족의 역경, 뒤는 공공 부문 혁신가들과 협력해 시스템을 구축한 극복 성과. 역경과 극복을 잇는 역접 접속부사 (B) Nevertheless."
        },
        {
          "prompt": "빈칸 (3)",
          "choices": ["collaborative", "reluctant", "marginal", "obsolete"],
          "answerIndex": 0,
          "explanation": "앞 인용구에서 '어떤 개인도 혼자서 플랫폼을 만들 수 없다'며 팀의 집단적 헌신을 강조. 성공은 '협력적인' 노력의 결과라는 맥락 (A) collaborative."
        },
        {
          "prompt": "빈칸 (4)",
          "choices": ["allocate", "terminate", "reverse", "bounce"],
          "answerIndex": 0,
          "explanation": "intends to + [타동사] + a portion of the firm's annual profits(목적어) 구조. 연간 수익 일부를 장학금으로 '할당·배분하다'가 유일한 정답 (A) allocate."
        }
      ]
    }
  ]
}
```
