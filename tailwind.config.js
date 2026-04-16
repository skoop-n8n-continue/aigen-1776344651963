/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00b7af',
        dark: '#10181f',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
