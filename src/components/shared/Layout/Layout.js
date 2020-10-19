import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'

import Header from '@/components/Header/Header'

export default function Layout({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='antialiased transition-colors duration-300 ease-in-out'>
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
