import '@/styles/globals.scss'
import '@/styles/cursor.scss'

import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'

import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'
import { Cursor } from '@/components/Cursor/Cursor'
import { isDesktop } from 'react-device-detect'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  console.log({ isDesktop })
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AnimatePresence exitBeforeEnter>
          <>
            {isDesktop && <Cursor />}
            <Component {...pageProps} key={router.route} />
          </>
        </AnimatePresence>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
