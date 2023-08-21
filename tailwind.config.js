import mainColors from './src/common/mainColors'
import journalsColors from './src/modules/journals/journals.color'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '1120px',
      lg: '1400px',
    },
    colors: {
      mainColors,
      journalsColors,
    },
  },
  plugins: [],
}
