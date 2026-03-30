import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FEFCF8",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#EDE4D6",
        },
        rose: {
          100: "#F5DDD5",
          200: "#EDCABA",
          300: "#E8C4B8",
          400: "#D4A090",
          500: "#B87E6E",
        },
        sage: {
          100: "#E0E9DF",
          200: "#C8D9C6",
          300: "#B5C4B1",
          400: "#8FAD8B",
          500: "#6B8F67",
        },
        mocha: {
          100: "#8C6B5A",
          200: "#6B4F3E",
          300: "#3D2B1F",
          400: "#2A1D14",
        },
        gold: {
          100: "#F0E4CA",
          200: "#DEC99A",
          300: "#C9A96E",
          400: "#A8833D",
        },
      },
    },
  },
  plugins: [],
};
export default config;
