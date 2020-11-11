import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useRef } from 'react'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function Layout({ children }) {
  // todo: analytics
  // initialise google analytics on load
  /*
  useEffect(() => {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA()
      // @ts-ignore
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])
  */

  const metaRef = useRef({
    title: 'Josh Mu - Official Developer Website',
    description: 'The official website for web developer Josh Mu.',
    keywords:
      'josh mu, web dev, developer, coding, code, javascript, tech, dance, yoga, art, official',
    origin: null,
    imgUrl: '/assets/avatar.jpg',
  })
  useEffect(() => {
    const origin = window.location.origin
    metaRef.current.origin = origin
    metaRef.current.imgUrl = origin + metaRef.current.imgUrl
    console.log('todo: meta -', metaRef.current)
  }, [])

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
      </Head>

      <div className='font-sans antialiased transition-colors duration-200 ease-in-out debug-screens'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}

const layoutVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}
