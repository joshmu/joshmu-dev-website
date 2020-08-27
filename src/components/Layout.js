import Head from 'next/head'
import Header from './Header'
import { useGlobalContext } from '../context/globalContext'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}
 * {
   text-decoration: none;
 }

 html {
   box-sizing: border-box;
   --webkit-font-smoothing: antialiased;
   font-size: 16px;
 }

 body {
   font-family: 'Roboto', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   background: 'white';
   overscroll-behavior: none;
   overflow-x: hidden;
 }

`

const darkTheme = {
  background: 'black',
  text: 'white',
}
const lightTheme = {
  background: 'white',
  text: 'black',
}

export default function Layout({ children }) {
  const { theme } = useGlobalContext()

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Head>
        <title>Josh Mu</title>
      </Head>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  )
}
