import { motion } from 'framer-motion'
import Head from 'next/head'

import Header from '@/components/Header/Header'

export default function Layout({ children }) {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={layoutVariants}
    >
      <div className='antialiased transition-colors duration-200 ease-in-out'>
        <Head>
          <title>Josh Mu</title>
        </Head>
        <Header />
        <main>{children}</main>
      </div>
    </motion.div>
  )
}

const layoutVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}
