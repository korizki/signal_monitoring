
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}', , './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultRed: "#D80032",
        defaultBlue: "#387ADF",
        defaultBlack: '#454545',
        defaultGreena: '#0D9276',
      }
    },
  },
  plugins: [],
}

