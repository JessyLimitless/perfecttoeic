# Set 41 — HARD — MLOps Maturity Internal Report

```json
{
  "id": "set-hard-mlops",
  "difficulty": "HARD",
  "passageType": "Internal Report",
  "passageLines": [
    {
      "en": "This report summarizes the findings of the platform engineering group's six-month review of how our data science teams build, deploy, and maintain machine learning models.",
      "ko": "본 보고서는 우리 데이터 과학 팀들이 머신러닝 모델을 구축, 배포, 유지하는 방식에 대해 플랫폼 엔지니어링 그룹이 수행한 6개월간의 검토 결과를 요약한다."
    },
    {
      "en": "At the outset of the review, the prevailing practice was distinctly ad-hoc: models were trained inside personal notebooks, copied manually to production servers, and rarely accompanied by automated tests or documentation.",
      "ko": "검토 초기에, 지배적인 관행은 명백히 임시방편적이었다. 모델은 개인 노트북 안에서 학습되었고, 운영 서버로 수동 복사되었으며, 자동화된 테스트나 문서를 거의 동반하지 않았다."
    },
    {
      "en": "This approach allowed individual researchers to move quickly in isolation, but it produced results that were difficult to reproduce and nearly impossible to audit.",
      "ko": "이 접근법은 개별 연구자가 고립된 상태에서 빠르게 움직일 수 있게 했지만, 재현하기 어렵고 감사가 거의 불가능한 결과를 만들어냈다."
    },
    {
      "en": "Over the review period, the group piloted a more mature MLOps workflow that introduced version-controlled pipelines, automated retraining triggered by data drift, and continuous monitoring of model performance in production.",
      "ko": "검토 기간 동안, 그룹은 버전 관리되는 파이프라인, 데이터 드리프트에 의해 촉발되는 자동 재학습, 그리고 운영 환경에서의 지속적인 모델 성능 모니터링을 도입한 보다 성숙한 MLOps 워크플로를 시범 운영했다."
    },
    {
      "en": "The quantitative gains were considerable: the median time to deploy a model fell from eleven days to under two, and incidents caused by silent model degradation declined by roughly seventy percent.",
      "ko": "정량적 성과는 상당했다. 모델을 배포하는 데 걸리는 중앙값 시간이 11일에서 2일 미만으로 줄었고, 조용한 모델 성능 저하로 인한 사고는 약 70퍼센트 감소했다."
    },
    {
      "en": "Crucially, automated testing caught several flawed candidate models before release, defects that under the old process would likely have reached customers undetected.",
      "ko": "결정적으로, 자동화된 테스트는 출시 전에 여러 결함 있는 후보 모델을 잡아냈는데, 이는 기존 절차였다면 감지되지 않은 채 고객에게 도달했을 결함들이었다."
    },
    {
      "en": "These benefits, however, did not arrive without friction.",
      "ko": "그러나 이러한 이점들이 마찰 없이 찾아온 것은 아니었다."
    },
    {
      "en": "Several teams initially resisted the new workflow, perceiving the added pipeline configuration and review steps as bureaucratic overhead that slowed their experimentation.",
      "ko": "여러 팀이 처음에는 새 워크플로에 저항했는데, 추가된 파이프라인 구성과 검토 단계를 자신들의 실험을 늦추는 관료적 부담으로 인식했기 때문이다."
    },
    {
      "en": "Sustaining the gains therefore required not only new tooling but a measurable shift in discipline, including a shared commitment to writing tests and documenting assumptions.",
      "ko": "따라서 그 성과를 지속하려면 새로운 도구뿐만 아니라, 테스트를 작성하고 가정을 문서화하려는 공동의 의지를 포함한 측정 가능한 규율의 변화가 필요했다."
    },
    {
      "en": "We recommend a phased rollout across the remaining divisions, paired with hands-on training and clearly assigned ownership, so that the cultural change keeps pace with the technical one.",
      "ko": "우리는 문화적 변화가 기술적 변화와 보조를 맞추도록, 실습 교육과 명확하게 배정된 소유권을 동반한 단계적 확산을 나머지 부서들에 걸쳐 시행할 것을 권고한다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-mlops-q1",
      "prompt": "What is the main idea of the report?",
      "promptKo": "이 보고서의 요지는 무엇인가?",
      "choices": [
        "Adopting a more mature MLOps workflow delivered measurable benefits but required overcoming organizational friction and new discipline",
        "Personal notebooks should remain the primary tool for all model development",
        "Automated retraining is too risky to deploy in any production environment",
        "The data science teams should be disbanded and replaced with external vendors"
      ],
      "choicesKo": [
        "보다 성숙한 MLOps 워크플로 도입은 측정 가능한 이점을 가져왔으나 조직적 마찰 극복과 새로운 규율이 필요했다",
        "개인 노트북이 모든 모델 개발의 주요 도구로 유지되어야 한다",
        "자동 재학습은 어떤 운영 환경에 배포하기에도 너무 위험하다",
        "데이터 과학 팀을 해체하고 외부 업체로 교체해야 한다"
      ],
      "answerIndex": 0,
      "explanation": "보고서는 성숙한 MLOps 워크플로의 정량적 이점(배포 시간 단축, 사고 70% 감소)을 제시하면서도 일곱 번째와 여덟 번째 문장에서 \"did not arrive without friction\"과 팀들의 저항을 언급하고, 아홉 번째 문장에서 규율의 변화가 필요했다고 말한다. 따라서 이점과 마찰·규율을 함께 다룬 것이 요지이다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-mlops-q2",
      "prompt": "According to the report, what quantitative result did the new workflow produce?",
      "promptKo": "보고서에 따르면, 새 워크플로가 만들어낸 정량적 결과는 무엇인가?",
      "choices": [
        "The median deployment time rose from two days to eleven",
        "Incidents from silent model degradation fell by roughly seventy percent",
        "The number of data science teams doubled within six months",
        "Automated tests were removed to speed up releases"
      ],
      "choicesKo": [
        "중앙값 배포 시간이 2일에서 11일로 늘었다",
        "조용한 모델 성능 저하로 인한 사고가 약 70퍼센트 감소했다",
        "데이터 과학 팀의 수가 6개월 만에 두 배가 되었다",
        "출시 속도를 높이기 위해 자동화된 테스트가 제거되었다"
      ],
      "answerIndex": 1,
      "explanation": "다섯 번째 문장에서 \"incidents caused by silent model degradation declined by roughly seventy percent\"라고 명시한다. 배포 시간은 11일에서 2일 미만으로 줄어든 것이므로 첫 번째 선택지는 방향이 반대인 오답이다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-mlops-q3",
      "prompt": "What can be inferred about why some teams resisted the new workflow?",
      "promptKo": "일부 팀이 새 워크플로에 저항한 이유에 대해 무엇을 추론할 수 있는가?",
      "choices": [
        "They believed the new workflow produced no measurable benefits at all",
        "They had already adopted an even more advanced system",
        "They were never informed that any change was occurring",
        "They valued the speed of unconstrained experimentation and saw the added steps as slowing them down"
      ],
      "choicesKo": [
        "새 워크플로가 측정 가능한 이점을 전혀 만들지 못한다고 믿었다",
        "이미 훨씬 더 발전된 시스템을 도입한 상태였다",
        "어떤 변화가 일어나고 있다는 사실을 전혀 통보받지 못했다",
        "제약 없는 실험의 속도를 중시했고 추가된 단계가 자신들을 늦춘다고 보았다"
      ],
      "answerIndex": 3,
      "explanation": "여덟 번째 문장에서 팀들이 추가된 구성·검토 단계를 \"bureaucratic overhead that slowed their experimentation\"으로 인식해 저항했다고 한다. 또한 세 번째 문장은 기존 방식이 연구자들이 빠르게 움직이게 해주었다고 밝히므로, 실험 속도를 중시해 추가 단계를 저항했다고 추론할 수 있다.",
      "category": "추론"
    },
    {
      "id": "set-hard-mlops-q4",
      "prompt": "The word \"considerable\" in the passage is closest in meaning to",
      "promptKo": "지문에서 단어 \"considerable\"과 의미가 가장 가까운 것은?",
      "choices": [
        "temporary",
        "negligible",
        "substantial",
        "confidential"
      ],
      "choicesKo": [
        "일시적인",
        "미미한",
        "상당한",
        "기밀의"
      ],
      "answerIndex": 2,
      "explanation": "다섯 번째 문장에서 \"The quantitative gains were considerable\"는 뒤이어 제시되는 큰 성과(배포 시간 단축, 사고 70% 감소)를 가리키므로 \"considerable\"은 'substantial(상당한)'과 가장 가깝다. 'negligible(미미한)'은 반대 의미의 오답이다.",
      "category": "동의어"
    }
  ]
}
```
