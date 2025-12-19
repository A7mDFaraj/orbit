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
        // ORBIT Brand Colors (Verified from PDF)
        primary: '#7A1E2E', // Burgundy - Main brand color
        secondary: '#E8DCCB', // Beige - Complementary color
        neutral: '#A7A9AC', // Cool Gray - Balance color
        // Standard colors
        black: '#161616', // ORBIT Black
        white: '#FFFFFF',
      },
      fontFamily: {
        // ORBIT Brand Fonts
        sans: ['Gotham', 'sans-serif'], // Default - English text (body, headings, UI)
        heading: ['Gotham', 'sans-serif'], // Headings (h1-h6) - English
        gotham: ['Gotham', 'sans-serif'], // Gotham font utility - English
        somar: ['Somar', 'sans-serif'], // Somar font utility - Arabic/RTL
        'ibm-plex': ['IBM Plex Sans', 'Gotham', 'sans-serif'], // IBM Plex for enterprise/professional pages
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

