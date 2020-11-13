import { motion, Variants } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { setupGAService } from '@/services/googleAnalytics'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

type LayoutProps = {
  children: React.ReactNode
}

type MetaRefType = {
  title: string
  description: string
  keywords: string
  origin: string | null
  imgUrl: string
}

export const Layout = ({ children }: LayoutProps) => {
  // google analytics (placed in layout to include page/route data)
  setupGAService(process.env.NEXT_PUBLIC_GA_TRACKING_ID)

  const metaRef = useRef<MetaRefType>({
    title: 'Josh Mu - Developer Portfolio Website',
    description: 'The official portfolio website for web developer Josh Mu',
    keywords:
      'josh mu, web dev, developer, coding, code, javascript, tech, dance, yoga, art, official',
    origin: null,
    imgUrl: '/assets/avatar.jpg',
  })
  useEffect(() => {
    const origin = window.location.origin
    metaRef.current.origin = origin
    metaRef.current.imgUrl = origin + metaRef.current.imgUrl
  }, [])

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
      <Head>
        <title>{metaRef.current.title}</title>

        {/* // * meta needs to be direct child of <Head> otherwise nextjs breaks... */}
        {/* HTML Meta Tags */}
        {/* Meta Tags Generated via http://heymeta.com</meta> */}
        <meta name='description' content={metaRef.current.description} />
        <meta name='keywords' content={metaRef.current.keywords} />

        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content={metaRef.current.title} />
        <meta itemProp='description' content={metaRef.current.description} />
        <meta itemProp='image' content={metaRef.current.imgUrl} />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content={metaRef.current.origin} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={metaRef.current.title} />
        <meta property='og:description' content={metaRef.current.description} />
        <meta property='og:image' content={metaRef.current.imgUrl} />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaRef.current.title} />
        <meta
          name='twitter:description'
          content={metaRef.current.description}
        />
        <meta name='twitter:image' content={metaRef.current.imgUrl} />

        {/* favicon */}
        {/* https://realfavicongenerator.net/ */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <div className='w-screen overflow-x-hidden font-sans antialiased transition-colors duration-200 ease-in-out debug-screens'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}
