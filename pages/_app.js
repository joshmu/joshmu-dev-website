import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobalProvider } from '../src/context/globalContext'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </GlobalProvider>
  )
}

export default MyApp
