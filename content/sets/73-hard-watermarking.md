# Set 73 — HARD — AI Content Watermarking (Article)

```json
{
  "id": "set-hard-watermarking",
  "difficulty": "HARD",
  "passageType": "Article",
  "passageLines": [
    {
      "en": "As generative models flood the internet with synthetic text, images, and audio, distinguishing machine-made content from human work has become a pressing concern for newsrooms, platforms, and regulators alike.",
      "ko": "생성형 모델이 합성 텍스트, 이미지, 오디오로 인터넷을 뒤덮으면서, 기계가 만든 콘텐츠를 사람의 작업물과 구별하는 일은 언론사, 플랫폼, 규제 기관 모두에게 절박한 관심사가 되었다."
    },
    {
      "en": "One increasingly favored response is watermarking: embedding a signal into generated content that machines can later detect but that humans rarely notice.",
      "ko": "점점 더 선호되는 대응책 하나는 워터마킹, 즉 생성된 콘텐츠에 기계가 나중에 탐지할 수 있되 사람은 거의 알아채지 못하는 신호를 심는 것이다."
    },
    {
      "en": "For images, this might mean subtly perturbing pixel values; for text, it can mean biasing the model toward a statistically detectable pattern of word choices.",
      "ko": "이미지의 경우 이는 픽셀 값을 미묘하게 교란하는 것을 의미할 수 있고, 텍스트의 경우 모델을 통계적으로 탐지 가능한 단어 선택 패턴 쪽으로 편향시키는 것을 뜻할 수 있다."
    },
    {
      "en": "Closely related is provenance, a broader idea that attaches verifiable metadata recording where a piece of content came from and how it was edited along the way.",
      "ko": "이와 밀접한 것이 출처 증명으로, 이는 어떤 콘텐츠가 어디서 비롯되었고 그 과정에서 어떻게 편집되었는지를 기록하는 검증 가능한 메타데이터를 부착하는 더 폭넓은 개념이다."
    },
    {
      "en": "Whereas a watermark lives inside the content itself, provenance metadata typically travels alongside it in a signed manifest.",
      "ko": "워터마크가 콘텐츠 자체의 내부에 존재하는 반면, 출처 증명 메타데이터는 일반적으로 서명된 명세서 형태로 콘텐츠와 함께 이동한다."
    },
    {
      "en": "The appeal of both approaches is obvious, yet neither is a cure-all, and overstating their reliability may do more harm than good.",
      "ko": "두 접근법의 매력은 명백하지만 어느 것도 만병통치약은 아니며, 그 신뢰성을 과장하는 것은 득보다 실이 클 수 있다."
    },
    {
      "en": "Watermarks can be weakened or stripped entirely by cropping an image, paraphrasing a paragraph, or re-encoding a file, all of which an adversary can do deliberately.",
      "ko": "워터마크는 이미지를 자르거나, 문단을 다르게 바꿔 쓰거나, 파일을 재인코딩함으로써 약화되거나 완전히 제거될 수 있는데, 이 모두는 악의적 행위자가 의도적으로 할 수 있는 일이다."
    },
    {
      "en": "Provenance manifests, for their part, are only as trustworthy as the chain of tools that honored and preserved them; a single uncooperative application can break the trail.",
      "ko": "출처 증명 명세서는 그것을 존중하고 보존한 도구들의 사슬만큼만 신뢰할 수 있으며, 협조하지 않는 애플리케이션 하나만으로도 그 추적 경로가 끊길 수 있다."
    },
    {
      "en": "Critics also warn of a subtler risk: if audiences come to assume that any unwatermarked file is therefore authentic, bad actors gain a convenient shield for forgeries that simply lack a mark.",
      "ko": "비평가들은 또한 더 미묘한 위험을 경고한다. 만약 청중이 워터마크가 없는 파일은 곧 진짜라고 가정하게 된다면, 악의적 행위자들은 단지 표식이 없을 뿐인 위조물에 대한 편리한 방패를 얻게 된다."
    },
    {
      "en": "For these reasons, most researchers now frame watermarking and provenance not as proof but as one layer in a defense that still depends on human judgment and institutional accountability.",
      "ko": "이러한 이유로 오늘날 대부분의 연구자는 워터마킹과 출처 증명을 증거가 아니라, 여전히 인간의 판단과 기관의 책임에 의존하는 방어 체계의 한 겹으로 규정한다."
    },
    {
      "en": "Regulators appear to share this caution, increasingly mandating disclosure of synthetic media while stopping short of treating any single technical mark as conclusive.",
      "ko": "규제 기관들도 이러한 신중함을 공유하는 듯하며, 합성 미디어의 공개를 점점 더 의무화하면서도 어떤 단일 기술적 표식도 결정적인 것으로 취급하지는 않고 있다."
    }
  ],
  "questions": [
    {
      "id": "set-hard-watermarking-q1",
      "prompt": "What is the main point of the article?",
      "promptKo": "이 기사의 요지는 무엇인가?",
      "choices": [
        "Watermarking has already solved the problem of synthetic media.",
        "Watermarking and provenance are useful but limited tools that cannot stand alone as proof.",
        "Provenance metadata should completely replace watermarking.",
        "Regulators have banned all generative models from public platforms."
      ],
      "choicesKo": [
        "워터마킹은 이미 합성 미디어 문제를 해결했다.",
        "워터마킹과 출처 증명은 유용하지만 한계가 있는 도구로서 그 자체만으로 증거가 될 수 없다.",
        "출처 증명 메타데이터가 워터마킹을 완전히 대체해야 한다.",
        "규제 기관들은 모든 생성형 모델을 공개 플랫폼에서 금지했다."
      ],
      "answerIndex": 1,
      "explanation": "기사는 두 접근법의 매력을 인정하면서도 'neither is a cure-all'이라 했고, 마지막에 이들을 증거가 아닌 방어의 한 겹으로 규정한다고 정리하므로 (나)가 요지입니다.",
      "category": "주제·목적"
    },
    {
      "id": "set-hard-watermarking-q2",
      "prompt": "According to the article, how does provenance differ from a watermark?",
      "promptKo": "기사에 따르면 출처 증명은 워터마크와 어떻게 다른가?",
      "choices": [
        "Provenance can never be removed, while a watermark always can.",
        "Provenance is embedded in pixels, while a watermark is stored on a server.",
        "Provenance travels alongside the content as signed metadata, while a watermark lives inside the content.",
        "Provenance applies only to text, while a watermark applies only to images."
      ],
      "choicesKo": [
        "출처 증명은 결코 제거될 수 없고, 워터마크는 항상 제거될 수 있다.",
        "출처 증명은 픽셀에 삽입되고, 워터마크는 서버에 저장된다.",
        "출처 증명은 서명된 메타데이터로 콘텐츠와 함께 이동하는 반면, 워터마크는 콘텐츠 내부에 존재한다.",
        "출처 증명은 텍스트에만, 워터마크는 이미지에만 적용된다."
      ],
      "answerIndex": 2,
      "explanation": "본문은 'a watermark lives inside the content itself, provenance metadata typically travels alongside it in a signed manifest'라고 둘의 차이를 명시하므로 (다)가 정답입니다.",
      "category": "세부사항"
    },
    {
      "id": "set-hard-watermarking-q3",
      "prompt": "What does the article imply could happen if people assume unwatermarked files are authentic?",
      "promptKo": "사람들이 워터마크 없는 파일을 진짜라고 가정하면 어떤 일이 일어날 수 있다고 기사는 암시하는가?",
      "choices": [
        "Forgers could exploit the absence of a mark to pass off fakes as genuine.",
        "Provenance manifests would automatically repair themselves.",
        "Regulators would stop requiring disclosure of synthetic media.",
        "Watermarking would become impossible to implement."
      ],
      "choicesKo": [
        "위조자들이 표식의 부재를 악용해 가짜를 진짜로 통과시킬 수 있다.",
        "출처 증명 명세서가 자동으로 스스로 복구될 것이다.",
        "규제 기관이 합성 미디어 공개 요구를 중단할 것이다.",
        "워터마킹 구현이 불가능해질 것이다."
      ],
      "answerIndex": 0,
      "explanation": "본문은 표식이 없으면 진짜라고 가정될 경우 악의적 행위자가 '표식이 없을 뿐인 위조물에 대한 편리한 방패'를 얻는다고 경고하므로 (가)가 옳은 추론입니다.",
      "category": "추론"
    },
    {
      "id": "set-hard-watermarking-q4",
      "prompt": "In the article, the word \"perturbing\" is closest in meaning to",
      "promptKo": "기사에서 \"perturbing\"이라는 단어와 의미가 가장 가까운 것은",
      "choices": [
        "fully preserving",
        "publicly announcing",
        "permanently deleting",
        "slightly altering"
      ],
      "choicesKo": [
        "완전히 보존하는",
        "공개적으로 발표하는",
        "영구적으로 삭제하는",
        "약간 변경하는"
      ],
      "answerIndex": 3,
      "explanation": "'subtly perturbing pixel values'는 픽셀 값을 미묘하게 바꾼다는 의미이므로 'slightly altering'이 가장 가깝고, 'fully preserving'은 반대 의미의 함정입니다. 따라서 (라)가 정답입니다.",
      "category": "동의어"
    }
  ]
}
```
