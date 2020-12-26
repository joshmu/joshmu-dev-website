/**
 * @path /src/components/Layout/Layout.tsx
 *
 * @project joshmu-dev-website
 * @file Layout.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Saturday, 26th December 2020 3:04:35 pm
 * @copyright © 2020 - 2020 MU
 */

import { Variants, motion } from 'framer-motion'
import Head from 'next/head'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { setupGAService } from '@/services/googleAnalytics'

type LayoutProps = {
  children: React.ReactNode
}

const metaData: {[key: string]: string} = {
  title: 'Josh Mu - Developer Portfolio Website',
  description: 'The official portfolio website for web developer Josh Mu',
  keywords:
    'josh mu, web dev, developer, coding, code, javascript, tech, dance, yoga, art, official',
  origin: 'https://joshmu.dev',
  imgUrl: 'https://joshmu.dev/assets/avatar.jpg',
}

export const Layout = ({ children }: LayoutProps) => {
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
      <Head>
        <title>{metaData.title}</title>

        {/* // * meta needs to be direct child of <Head> otherwise nextjs breaks... */}

        {/* // * make sure to add this to html tag
        itemscope itemtype="http://schema.org/WebPage" */}

        {/* HTML Meta Tags */}
        {/* Meta Tags Generated via http://heymeta.com</meta> */}
        <meta name='description' content={metaData.description} />
        <meta name='keywords' content={metaData.keywords} />

        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content={metaData.title} />
        <meta itemProp='description' content={metaData.description} />
        <meta itemProp='image' content={metaData.imgUrl} />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content={metaData.origin} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={metaData.title} />
        <meta property='og:description' content={metaData.description} />
        <meta property='og:image' content={metaData.imgUrl} />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaData.title} />
        <meta name='twitter:description' content={metaData.description} />
        <meta name='twitter:image' content={metaData.imgUrl} />

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

      <div className='w-screen overflow-x-hidden font-sans antialiased transition-colors duration-200 ease-in-out text-themeText bg-themeBg debug-screens'>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}
