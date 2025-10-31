/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#29ABE2',
        secondary: '#000000',
        accent: '#FFFFFF',
        neutral: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['RB', 'sans-serif'],
        rb: ['RB', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em',
        wider: '0.03em',
        widest: '0.05em',
      },
      fontSize: {
        'display-xl': ['5.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

