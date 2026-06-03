/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      colors: {
        parchment: '#f0ebe0',
        forest: '#0d1a14',
        'forest-mid': '#1a2f22',
        gold: '#c4a96d',
        'gold-dark': '#8a7a5e',
        cream: '#e8e0d4',
      },
    },
  },
  plugins: [],
};
