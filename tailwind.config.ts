import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: {
          DEFAULT: "#8EE0E5",
          dark: "#6FCBD1",
          light: "#D9F5F6",
        },
        navy: {
          DEFAULT: "#22242D",
          light: "#2C2F3A",
        },
        ice: "#F3F8F8",
        cream: "#F7F6F2",
        slate: {
          ink: "#22242D",
          body: "#5B6068",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
