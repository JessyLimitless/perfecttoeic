# syntax=docker/dockerfile:1
#
# Cloud5 배포용 이미지.
# 핵심: next build를 "이미지 빌드 때 한 번" 돌린다.
#  - 기존: 이미지엔 코드만 담고, 컨테이너가 뜰 때마다 256MB 제한 안에서 next build
#    → 배포마다 3분 + 그동안 서비스 대기("Starting...")
#  - 지금: 호스트 자원으로 미리 빌드해 이미지에 담고, 컨테이너는 next start만
#    → 컨테이너 교체가 수 초, 빌드 실패는 교체 전에 드러남
FROM node:20-alpine
WORKDIR /app

# 의존성 레이어 — package*.json이 그대로면 캐시 재사용(설치 생략)
COPY package*.json ./
RUN npm install --production

COPY . .

# .next/cache를 빌드 캐시로 유지 → 두 번째 배포부터 next build가 크게 빨라진다
ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,target=/app/.next/cache npm run build

ENV PORT=3000
EXPOSE 3000
# start는 .next가 이미 있으면 빌드를 건너뛴다(scripts/start.mjs)
CMD ["npm", "start"]
