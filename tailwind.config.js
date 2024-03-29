/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx, html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        caqui: {
          50: "#fdf8f6",
          100: "#dcd8cc",
          200: "#d4c9c0",
          300: "#c0b4aa",
          400: "#ad9f96",
          500: "#CDC5B7",
          600: "#B1AA9E",
          700: "#958F85",
          800: "#79746C",
          900: "#5d5953",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
