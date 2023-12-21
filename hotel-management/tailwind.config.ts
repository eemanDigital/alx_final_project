import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0766AD",
        secondary: "#F3F3F3",
        tertiary: {
          dark: "#F27405",
          light: "#C5E898",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
