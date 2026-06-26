import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#298DFF",
          50: "#eaf3ff",
          100: "#d4e7ff",
          400: "#5aa6ff",
          500: "#298DFF",
          600: "#1f73d6",
          700: "#175aa8",
        },
        ink: {
          950: "#000000",
          900: "#050608",
          850: "#0a0b0e",
          800: "#0e1014",
          700: "#15181e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderColor: {
        hair: "rgba(255,255,255,0.08)",
        hairlit: "rgba(255,255,255,0.14)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(120% 90% at 50% 120%, #298DFF 0%, #1b5fb0 28%, #08152b 55%, #000000 80%)",
        "card-sheen":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulse-ring 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
