/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xxs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
