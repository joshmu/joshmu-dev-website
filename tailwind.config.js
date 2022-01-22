/**
 * @path /tailwind.config.js
 * @project joshmu-dev-website
 * @file tailwind.config.js
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Wednesday, 26th August 2020 2:14:35 pm
 * @modified Saturday, 22nd January 2022 8:21:30 pm
 * @copyright © 2020 - 2020 MU
 */

const defaultTheme = require('tailwindcss/defaultTheme')

const plugins = []
const devOnlyPlugins = [require('tailwindcss-debug-screens')]

module.exports = {
  content: [
    './pages/**/*.{ts,tsx, js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  media: false,
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
        90: '0.90',
      },
      rotate: {
        '-22': '-22deg',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  variants: {},
  plugins:
    process.env.NODE_ENV === 'production'
      ? plugins
      : [...plugins, ...devOnlyPlugins],
}
