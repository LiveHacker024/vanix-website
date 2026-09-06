import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          1: "#080808",
          2: "#111111",
          3: "#171717",
          card: "rgba(17, 17, 17, 0.75)",
          cardHover: "rgba(23, 23, 23, 0.9)",
        },
        gold: {
          DEFAULT: "#C8A45D",
          light: "#D4AF69",
          bright: "#E3C47A",
          muted: "rgba(200, 164, 93, 0.2)",
          border: "rgba(200, 164, 93, 0.3)",
          glow: "rgba(200, 164, 93, 0.15)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#D4D4D4",
          muted: "#8A8A8A",
          dark: "#5A5A5A",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E3C47A 0%, #C8A45D 50%, #A68037 100%)",
        "gold-gradient-subtle": "linear-gradient(135deg, rgba(227, 196, 122, 0.15) 0%, rgba(200, 164, 93, 0.05) 100%)",
        "dark-gradient": "linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, #050505 100%)",
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(200, 164, 93, 0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold-subtle": "0 0 25px rgba(200, 164, 93, 0.12)",
        "gold-hover": "0 0 35px rgba(200, 164, 93, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "marquee": "marquee 32s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "marquee-reverse-slow": "marquee-reverse 45s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
