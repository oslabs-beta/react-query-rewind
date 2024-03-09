/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      width: {
        110: '27.5rem', // Adjust the value as needed
        120: '30rem', // Adjust the value as needed
        130: '32.5rem', // Adjust the value as needed
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
