import TtsStudio from "@/components/tts/TtsStudio";

export const metadata = {
  title: "영어 발음 듣기 · TTS 스튜디오",
  description: "원문을 입력하면 영어 화자 목소리로 읽어주고, 재생·다운로드할 수 있습니다.",
};

export default function TtsPage() {
  return <TtsStudio />;
}
