import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 원문(영어) → Microsoft Edge 신경망 TTS 음성 mp3. 미국식 발음 고정.
 * API 키 없이 무료로 사람에 가까운 자연스러운 발음을 생성한다.
 *
 * POST { text, slow? } → audio/mpeg (mp3 바이너리)
 */

const VOICE = "en-US-AriaNeural";
const MAX_CHARS = 3000;

async function synthesize(text: string, slow: boolean): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text, slow ? { rate: "-25%" } : {});

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const timer = setTimeout(() => reject(new Error("시간 초과")), 30_000);
    audioStream.on("data", (c: Buffer) => chunks.push(c));
    audioStream.on("end", () => {
      clearTimeout(timer);
      resolve(Buffer.concat(chunks));
    });
    audioStream.on("error", (e: Error) => {
      clearTimeout(timer);
      reject(e);
    });
  });
}

export async function POST(req: Request) {
  let body: { text?: string; slow?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "읽을 원문을 입력하세요." }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `원문이 너무 깁니다. 최대 ${MAX_CHARS}자까지 가능합니다.` },
      { status: 400 },
    );
  }

  try {
    const buffer = await synthesize(text, body.slow === true);
    if (buffer.length === 0) throw new Error("빈 오디오");
    const audio = new Uint8Array(buffer);

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audio.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "음성 생성에 실패했습니다.";
    return NextResponse.json({ error: `음성 생성 실패: ${msg}` }, { status: 502 });
  }
}
