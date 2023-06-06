/* eslint-disable comma-dangle */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blueGray: '#E0E5ED',
        lightBlue: '#325184',
        lightBrown: '#cb8075',
        lightGray: '#E0E5ED',
        lightGray1: '#BABABA',
        lightGray2: '#d7d6d6',
        lightGray3: '#333333',
        lightGreen: '#86bb9a',
        black1: '#212529',
        gray1: '#F7F7F7',
        gray2: '#17282680',
        red: '#FF0000',
        lightRed: '#F2E2DF',
        textGray: '#2F302C',
        borderBottomColor: 'neutral/700',
        green: '#86BB9A',
        dark: '#2F302C',
        disabled: '#A7AEAD',
        white: '#FFFFFF',
        blue: '#3B8CD7',
        success: '#86BB9A',
        base: '#FF0000',
        danger: '#B21D1D',
        checkbox: '#373737',
        primary: {
          900: '#311D1D',
          800: '#7D473F',
          700: '#B35547',
          600: '#C46E61',
          500: '#DAA8A0',
          400: '#F2E2DF',
          50: '#FCFAFA',
        },
        neutral: {
          900: '#333333',
          700: '#635E5E',
          500: '#969494',
          300: '#B0ACAC',
          200: '#D7D6D6',
          100: '#E9E9E9',
          50: '#F7F7F7',
        },
      },
      borderRadius: {
        md: '5px',
      },
    },
  },
  plugins: [],
};
