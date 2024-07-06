/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "MAIN_BG": "#ffffff",
        "PRIMARY_BG":"#1f7ae0"
      },
      textColor:{
        "MAIN_CL":"#70777d",
        "PRIMARY_CL":"#1f7ae0",
        "NEUTRAL_CL":"#000000"
      }
    },
  },
  plugins: [],
}