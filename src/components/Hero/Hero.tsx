import { motion } from 'framer-motion'
import React from 'react'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'
import dynamic from 'next/dynamic'

import { useThemeContext } from '@/context/themeContext'

// because we are dynamically calc dimension based on client we need to load this component on the client side, therefor disable server side rendering
const Curtain = dynamic(
  () => import('@/shared/ux/Curtain').then(mod => mod.Curtain),
  { ssr: false }
)

import { RevealInView } from '@/shared/ux/RevealInView'
import { useScrollTo } from '@/hooks/useScrollTo'

type HeroProps = { props?: { [key: string]: any }; id: string }

export const Hero = ({ ...props }: HeroProps) => {
  const scrollTo = useScrollTo()
  const { toggleTheme } = useThemeContext()

  const handleScrollDown = () => {
    scrollTo('banner')
  }

  return (
    <div className='relative w-full' style={{ height: '50rem' }} {...props}>
      {/* center content */}
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
        <h1
          onClick={toggleTheme}
          className='text-6xl font-semibold tracking-wide uppercase cursor-pointer md:text-8xl'
        >
          <Curtain>josh mu</Curtain>
        </h1>
        <p>
          <RevealInView delay={1}>
            <span>I ♡ movement, coffee & code.</span>
          </RevealInView>
        </p>
      </div>

      {/* down arrow */}
      <div className='absolute bottom-0 z-10 flex items-center justify-center w-full mb-8 text-4xl'>
        <ArrowDownIcon
          onClick={handleScrollDown}
          className='cursor-pointer fill-current animate-bounce'
        />
      </div>

      {/* background */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className='absolute z-0 font-bold uppercase transition-colors duration-1000 ease-in-out transform pointer-events-none top-20 -left-20 rotate-12 opacity-10'
        style={{ fontSize: '50rem', lineHeight: 1 }}
      >
        MU
      </motion.span>
    </div>
  )
}
