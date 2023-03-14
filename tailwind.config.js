/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      mukta: ["Mukta"],
      poppins: ["'Poppins'", "sans-serif"],
      sans: ["'Open Sans'", "sans-serif"],
    },
    fontSize: {
      'xs': ['12px', {
        lineHeight: '16px',
      }],
      'sm': ['14px', {
        lineHeight: '20px',
      }],
      'base': ['16px', {
        lineHeight: '24px',
      }],
      'lg': ['18px', {
        lineHeight: '28px',
      }],
      'xl': ['20px', {
        lineHeight: '28px',
      }],
      '2xl': ['24px', {
        lineHeight: '32px',
      }],
      '3xl': ['30px', {
        lineHeight: '36px',
      }],   
    }
  },
  plugins: [],
};
