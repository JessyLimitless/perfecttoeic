/** @type {import('next').NextConfig} */
const nextConfig = {
  // 배포 파이프라인이 깨지지 않도록 lint 에러로 빌드를 막지 않는다.
  // (코드 품질 lint는 로컬 `npm run lint`로 별도 확인)
  eslint: { ignoreDuringBuilds: true },
  // TTS: msedge-tts가 쓰는 ws(웹소켓)를 웹팩이 번들하면 bufferUtil.mask 오류가 나므로
  // 서버 external 로 두어 런타임에 node_modules에서 그대로 require 하게 한다.
  experimental: {
    serverComponentsExternalPackages: ["msedge-tts", "ws"],
  },
};

export default nextConfig;
