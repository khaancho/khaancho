/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}",
    "./src/**/**/**/*.{html,ts}",  
  ],
  theme: {
    extend: { },
  },
  daisyui: {
    themes: ["light", "dark", "choco"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}

