'use client'

import { Variants, motion } from 'framer-motion'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { setupGAService } from '@/services/googleAnalytics'

type PageLayoutProps = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  // google analytics (placed in layout to include page/route data)
  setupGAService(process.env.NEXT_PUBLIC_GA_TRACKING_ID)

  const layoutVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={layoutVariants}
    >
      <div className='w-screen overflow-x-hidden font-sans antialiased transition-colors duration-200 ease-in-out text-themeText bg-themeBg debug-screens'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}