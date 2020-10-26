import { motion } from 'framer-motion'
import Head from 'next/head'

import Header from '@/components/Header/Header'

import MetaTags from './MetaTags/MetaTags'

export default function Layout({ children }) {
  const meta = {
    title: 'Josh Mu - Official Developer Website',
    description: 'The official website for web developer Josh Mu.',
    imgUrl: 'https://joshmu.dev/assets/avatar.jpg',
  }

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={layoutVariants}
    >
      <div className='font-sans antialiased transition-colors duration-200 ease-in-out debug-screens'>
        <Head>
          <MetaTags
            title={meta.title}
            description={meta.description}
            imgUrl={meta.imgUrl}
          />
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
