/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx, html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        caqui: {
          50: "#535552",
          100: "#dcd8cc",
          200: "#b5ae9b",
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
