import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fae6c9",
        secondary: "#ac3e23",
        tert: "#247860",
      },
      fontFamily: {
        rokit: ["Rokkitt", "serif"],
        poppin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
