/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0F4415',
          cream: { DEFAULT: '#E2D7AB', light: '#F1EFC8' },
        },
        ink: '#0F172A',
        muted: '#6B7280',
        surface: { light: '#F5F5F5', dark: '#0B1A10' },
      },
      borderRadius: { lg: '1rem', '2xl': '1.25rem' },
      boxShadow: { soft: '0 8px 24px rgba(0,0,0,0.08)' },
    },
  },
  plugins: [],
};
