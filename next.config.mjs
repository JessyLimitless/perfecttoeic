/** @type {import('next').NextConfig} */
const nextConfig = {
  // 배포 파이프라인이 깨지지 않도록 lint 에러로 빌드를 막지 않는다.
  // (코드 품질 lint는 로컬 `npm run lint`로 별도 확인)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
