// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'custom-gradient': 'linear-gradient(90deg, rgba(10,74,79,1) 0%, rgba(7,140,127,0.5634628851540616) 35%, rgba(10,43,79,1) 100%)',
//       }
//     },
//   },
//   plugins: [],
// }

// tailwind.config.js
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(10,74,79,1) 0%, rgba(7,140,127,0.5634628851540616) 35%, rgba(10,43,79,1) 100%)',
      }
    },
  },
  plugins: [],
});
