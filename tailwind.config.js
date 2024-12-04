/** @type {import('tailwindcss').Config} */
/** @type {import('rippleui').Config} */
import rippleui from 'rippleui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-line-green': 'repeating-linear-gradient( 45deg, #417040, #6ec17f 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
        'gradient-line-red': 'repeating-linear-gradient( 45deg, #704040, #c16e6e 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
        'gradient-line-blue': 'repeating-linear-gradient( 45deg, #404d70, #6e93c1 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
        'gradient-line-yellow': 'repeating-linear-gradient( 45deg, #6b7040, #adc16e 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
        'gradient-line-purple': 'repeating-linear-gradient( 45deg, #454070, #866ec1 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
        'gradient-line-gray': 'repeating-linear-gradient( 45deg, #484848, #3a3a3a 1px, rgba(245, 245, 245, 0) 3px, rgba(245, 245, 245, 0) 10px )',
      },
      animation: {
        fadeInCard: 'fadeInCard 0.5s ease-in-out forwards ',
        fadeInDocument: 'fadeInDocument 0.5s ease-in-out forwards ',
      },
      keyframes: {
        fadeInCard: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeInDocument: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [rippleui],
}

