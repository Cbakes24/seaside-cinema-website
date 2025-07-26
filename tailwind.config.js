/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'peach': '#FFE4D6',
        'sand': '#F5F5DC',
        'offwhite': '#FAFAFA',
        'teal': '#38B2AC',
        'orange': '#FF6B35',
        'dark-teal': '#006B6B',
      },
    },
  },
  plugins: [],
} 
