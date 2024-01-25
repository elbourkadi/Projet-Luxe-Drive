/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens:{
        sm:'480px',
        md:'768px',
        lg:'976px',
        xl:'1440px'
      },
      colors:{
        customColor: '#42121F',
      }
    },
  },
  plugins: [],
}
