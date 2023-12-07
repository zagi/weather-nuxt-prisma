/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "aqua"],
  },
}