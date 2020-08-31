import Head from 'next/head'
import Header from './Header'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeContext } from '../context/themeContext'

export default function Layout({ children }) {
  const { theme } = useThemeContext()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={`${
            theme === 'dark' ? 'theme-dark' : 'theme-light'
          } text-themeText bg-themeBackground transition-colors duration-300 ease-in-out`}
        >
          <Head>
            <title>Josh Mu</title>
          </Head>
          <Header />
          <main>{children}</main>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
