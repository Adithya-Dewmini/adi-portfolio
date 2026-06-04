import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#080A0F",
        panel: "#101522",
        line: "rgba(255,255,255,0.12)",
        skybrand: "#38BDF8",
        violetbrand: "#8B5CF6"
      },
      boxShadow: {
        glow: "0 0 80px rgba(56,189,248,0.18)",
        card: "0 24px 80px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
