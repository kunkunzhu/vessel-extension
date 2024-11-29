/**
 * @format
 * @type {import('tailwindcss').Config}
 */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--off-white)",
        primary: "var(--off-black)",
        secondary: "var(--pale-purple)",
        accent: "var(--purple)",
      },
      fontFamily: {
        text: ['"Instrument Sans"', ...defaultTheme.fontFamily.sans],
        title: ['"Instrument Serif"', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        bullet: "0px 0px 5px rgba(69, 12, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
