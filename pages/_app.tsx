import '@/styles/globals.scss'

import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'

import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
