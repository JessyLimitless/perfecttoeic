# p5-hard-04 — Part 5 고난도 문법 (HARD, 도치·가정법·병치·복합관계사)

```json
{
  "id": "p5-hard-04",
  "part": 5,
  "difficulty": "HARD",
  "passageType": "Incomplete Sentences",
  "passageLines": [],
  "questions": [
    {
      "id": "p5-hard-04-q1",
      "prompt": "Not only ------ the deadline, but the team also exceeded the client's quality expectations.",
      "promptKo": "그 팀은 마감일을 지켰을 뿐만 아니라 고객의 품질 기대치도 뛰어넘었다.",
      "choices": ["the team met", "met the team", "the team did meet", "did the team meet"],
      "choicesKo": ["그 팀이 지켰다(정치)", "지켰다 그 팀이(어순오류)", "그 팀이 정말 지켰다", "그 팀이 지켰다(도치)"],
      "answerIndex": 3,
      "explanation": "부정어구 Not only가 문두에 오면 주어와 조동사가 도치되므로 'did the team meet'이 정답입니다. 따라서 (라)=3입니다.",
      "category": "도치"
    },
    {
      "id": "p5-hard-04-q2",
      "prompt": "Had the supplier notified us earlier, we ------ alternative arrangements in time.",
      "promptKo": "공급업체가 더 일찍 통보했더라면, 우리는 제때 대체 방안을 마련할 수 있었을 것이다.",
      "choices": ["will make", "would make", "could have made", "have made"],
      "choicesKo": ["만들 것이다", "만들 텐데", "만들 수 있었을 텐데", "만들었다"],
      "answerIndex": 2,
      "explanation": "'Had + 주어 + p.p.'는 가정법 과거완료의 if 생략 도치이므로 주절에 'would/could have p.p.'가 옵니다. 따라서 (다)=2입니다.",
      "category": "가정법"
    },
    {
      "id": "p5-hard-04-q3",
      "prompt": "The training program aims to improve employees' communication, leadership, and ------ skills.",
      "promptKo": "그 교육 프로그램은 직원들의 의사소통, 리더십, 그리고 분석 능력을 향상시키는 것을 목표로 한다.",
      "choices": ["analyze", "analysis", "analytically", "analytical"],
      "choicesKo": ["분석하다", "분석(명사)", "분석적으로", "분석적인"],
      "answerIndex": 3,
      "explanation": "communication, leadership와 병치되어 명사 skills를 함께 수식하는 형용사가 필요하므로 analytical이 정답입니다. 따라서 (라)=3입니다.",
      "category": "병치"
    },
    {
      "id": "p5-hard-04-q4",
      "prompt": "The grant will be awarded to ------ demonstrates the most innovative approach to the problem.",
      "promptKo": "그 보조금은 문제에 대해 가장 혁신적인 접근을 보여주는 사람에게 수여될 것이다.",
      "choices": ["those who", "whom", "whoever", "whomever"],
      "choicesKo": ["~하는 사람들", "~를(목적격)", "~하는 누구든(주격)", "~를 누구든(목적격)"],
      "answerIndex": 2,
      "explanation": "전치사 to의 목적어이면서 뒤 동사 demonstrates의 주어 역할을 겸하는 복합관계대명사가 필요하므로 주격 whoever가 정답입니다. those who는 복수 동사를 요구합니다. 따라서 (다)=2입니다.",
      "category": "관계사"
    },
    {
      "id": "p5-hard-04-q5",
      "prompt": "Rarely ------ a candidate with such a strong combination of technical and managerial experience.",
      "promptKo": "그토록 강력한 기술적·관리적 경험을 겸비한 지원자를 우리는 좀처럼 만나기 어렵다.",
      "choices": ["we encounter", "we do encounter", "encounter we", "do we encounter"],
      "choicesKo": ["우리가 만난다(정치)", "우리가 정말 만난다", "만난다 우리가(오류)", "우리가 만난다(도치)"],
      "answerIndex": 3,
      "explanation": "부정 빈도부사 Rarely가 문두에 오면 도치되어 'do we encounter'가 되어야 합니다. 따라서 (라)=3입니다.",
      "category": "도치"
    },
    {
      "id": "p5-hard-04-q6",
      "prompt": "The proposal calls for hiring more staff ------ investing in automation, not one or the other.",
      "promptKo": "그 제안은 둘 중 하나가 아니라 인력 충원과 자동화 투자를 병행할 것을 요구한다.",
      "choices": ["either", "as well as", "rather than", "instead of"],
      "choicesKo": ["둘 중 하나", "~뿐만 아니라", "~보다는", "~ 대신에"],
      "answerIndex": 1,
      "explanation": "'not one or the other(둘 중 하나가 아니라)'라는 단서로 두 가지를 모두 포함함을 알 수 있으므로 'A as well as B'가 정답입니다. rather than/instead of는 배타적 선택입니다. 따라서 (나)=1입니다.",
      "category": "접속사"
    },
    {
      "id": "p5-hard-04-q7",
      "prompt": "------ of the two proposals offers a viable solution, so the committee will request revisions.",
      "promptKo": "두 제안 중 어느 것도 실행 가능한 해결책을 제시하지 못하므로 위원회는 수정을 요청할 것이다.",
      "choices": ["Neither", "None", "Any", "Both"],
      "choicesKo": ["둘 다 아니다", "아무도 아니다(셋 이상)", "어떤 것이든", "둘 다"],
      "answerIndex": 0,
      "explanation": "'of the two(둘 중)'와 호응하며 단수 동사 offers를 취하는 부정 표현은 Neither입니다. None은 셋 이상에 씁니다. 따라서 (가)=0입니다.",
      "category": "수량표현"
    },
    {
      "id": "p5-hard-04-q8",
      "prompt": "The manager insisted that every proposal ------ reviewed by legal before being submitted.",
      "promptKo": "관리자는 모든 제안이 제출되기 전에 법무팀의 검토를 받아야 한다고 주장했다.",
      "choices": ["is", "was", "being", "be"],
      "choicesKo": ["~이다", "~였다", "~인 것", "받아야 한다(원형)"],
      "answerIndex": 3,
      "explanation": "'insist that' 뒤 that절에는 '(should) + 동사원형'이 오므로 수동태 be reviewed의 be가 정답입니다. 따라서 (라)=3입니다.",
      "category": "동사"
    },
    {
      "id": "p5-hard-04-q9",
      "prompt": "So convincing ------ that the investors approved the funding on the spot.",
      "promptKo": "그 발표가 매우 설득력 있어서 투자자들은 그 자리에서 자금 지원을 승인했다.",
      "choices": ["the presentation was", "was the presentation", "the presentation had", "had the presentation"],
      "choicesKo": ["그 발표는 ~였다(정치)", "~였다 그 발표는(도치)", "그 발표는 가졌다", "가졌다 그 발표는"],
      "answerIndex": 1,
      "explanation": "'So + 형용사'가 문두에 오면 주어와 동사가 도치되므로 'was the presentation'이 정답입니다. 따라서 (나)=1입니다.",
      "category": "도치"
    },
    {
      "id": "p5-hard-04-q10",
      "prompt": "The consultant recommended ------ the workflow entirely rather than making minor adjustments.",
      "promptKo": "컨설턴트는 사소한 조정을 하기보다는 업무 흐름을 전면적으로 재설계할 것을 권했다.",
      "choices": ["to redesign", "redesign", "redesigning", "redesigned"],
      "choicesKo": ["재설계하는 것(to부정사)", "재설계하다", "재설계하는 것(동명사)", "재설계된"],
      "answerIndex": 2,
      "explanation": "recommend는 목적어로 동명사를 취하며, 뒤의 'rather than making'과 병치를 이루므로 redesigning이 정답입니다. 따라서 (다)=2입니다.",
      "category": "준동사"
    }
  ]
}
```
