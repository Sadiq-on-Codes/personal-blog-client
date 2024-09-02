/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-corner':
          'linear-gradient(50deg, rgba(24, 24, 24, 1) 89%, rgba(230, 62, 33, 0.5) 100%)'
      }
    }
  },
  plugins: []
}
