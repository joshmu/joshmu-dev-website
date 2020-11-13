const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './pages/**/*.{ts,tsx, js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        themeText: 'var(--text)',
        themeText2: 'var(--text2)',
        themeBg: 'var(--background)',
        themeBg2: 'var(--background2)',
        themeAccent: 'var(--accent)',
      },
      opacity: {
        1: '0.01',
        2: '0.02',
        3: '0.03',
        4: '0.04',
        5: '0.05',
        10: '0.10',
      },
    },
  },
  variants: {},
  plugins:
    process.env.NODE_ENV === 'production'
      ? // production
        []
      : // development
        [require('tailwindcss-debug-screens')],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true, // color shades are similar brightness
    extendedSpacingScale: true, // 72, 80, 96
    extendedFontSizeScale: true, // 7xl, 8xl, 9xl
  },
}
