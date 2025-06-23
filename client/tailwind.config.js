/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        animation: {
            'border': 'border 4s linear infinite',
        },
        keyframes: {
            'border': {
                to: { '--border-angle': '360deg' },
            }
        }                      
    },
},
  plugins: [],
}

