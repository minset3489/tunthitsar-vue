/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif']
    },
    extend: {
      animation: {
        'spinonce': 'spin .4s linear',
      },
      keyframes: {
        spinonce: {
          to: {
            transform: 'rotate(360deg)',
          }
        }
      }
    },
  },

   variants: {
     extend: {},
   },
  plugins: [],
}

