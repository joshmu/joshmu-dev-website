import '@/styles/globals.scss'

import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
