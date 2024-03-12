/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class', // Adds dark mode configuration
  theme: {
    extend: {
      width: {
        110: '27.5rem',
        120: '30rem',
        130: '32.5rem',
        150: '37.5rem',
        160: '40rem',
      },
      colors: {
        // Adds primary color configuration
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        // Adds fontFamily configuration
        body: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      // Shadow for the bottom of the nav bar during dark mode
      boxShadow: {
        'dark-custom':
          '0 1px 2px -1px rgba(255, 255, 255, 0.05), 0 1px 2px -2px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Ensure you have installed this plugin
    // require('@tailwindcss/aspect-ratio'), // Ensure you have installed this plugin
    // require('@tailwindcss/typography'), // Ensure you have installed this plugin
    require('flowbite/plugin'), // Your existing plugin
  ],
};
