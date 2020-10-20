import '@/styles/globals.scss'

import { AnimatePresence } from 'framer-motion'

import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
