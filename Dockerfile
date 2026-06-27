# Cloud5 자동생성 Dockerfile 대체본.
# 핵심: 빌드(next build)를 "소스 복사 이후"에 수행한다.
# (자동생성본은 COPY . . 전에 npm install 단계에서 빌드를 돌려 src/app 을 못 찾고 실패했음)
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# 1) 의존성 설치 — 빌드에 필요한 패키지(typescript/tailwind/postcss/@types 등)는
#    dependencies 에 있으므로 NODE_ENV=production 설치에서도 빠지지 않는다.
COPY package*.json ./
RUN npm install --no-audit --no-fund

# 2) 소스 전체 복사 후 프로덕션 빌드 → .next 생성
COPY . .
RUN npm run build

EXPOSE 3000
# 빌드 산출물을 그대로 서빙(재빌드 없이 기동). content/sets 는 런타임에 fs 로 읽음.
CMD ["node_modules/.bin/next", "start"]
