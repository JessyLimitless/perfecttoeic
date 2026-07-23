import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 티어/스킨/제니 그라데이션은 데이터 파일(types.ts)의 런타임 문자열로만 쓰여
  // JIT가 못 잡고 purge된다 → 여기서 명시 생성(빈 배지·동일 스킨 방지).
  safelist: [
    // 정복 등급 6단계 램프 (conquest.ts 런타임 문자열)
    "from-amber-300", "to-amber-500", "from-teal-400", "to-emerald-500", "to-cyan-500", "from-indigo-400",
    // 티어 (progression + rank 공용)
    "from-amber-700", "to-orange-800",
    "from-neutral-400", "to-neutral-500",
    "from-amber-400", "to-amber-600",
    "from-cyan-400", "to-teal-500",
    "from-sky-400", "to-indigo-500",
    "from-fuchsia-500", "to-violet-600",
    // 스네이크 스킨
    "from-indigo-500", "to-violet-500",
    "from-emerald-400",
    "to-orange-500",
    "to-purple-600",
    "to-blue-600",
    // 제니 라이벌
    "from-rose-400", "to-fuchsia-500",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
      },
      maxWidth: {
        app: "64rem",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "60%": { transform: "scale(1.01)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "180% 0" },
          "100%": { backgroundPosition: "-80% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        scan: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        pop: "pop 0.28s ease-out both",
        "fade-up": "fade-up 0.32s ease-out both",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 1.8s ease-in-out infinite",
        scan: "scan 1.5s ease-in-out infinite",
        "ping-slow": "ping-slow 1.6s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
