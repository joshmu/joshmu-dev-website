import { motion } from 'framer-motion'
import React from 'react'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

import { useGlobalContext } from '@/context/globalContext'
import { useThemeContext } from '@/context/themeContext'
import { Curtain } from '@/shared/ux/Curtain'
import { RevealInView } from '@/shared/ux/RevealInView'

type HeroProps = { props?: any; id: string }

export const Hero = ({ ...props }: HeroProps) => {
  const { scrollTo } = useGlobalContext()
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
        className='absolute z-0 font-bold uppercase transform pointer-events-none top-20 -left-20 rotate-12 opacity-10'
        style={{ fontSize: '50rem', lineHeight: 1 }}
      >
        MU
      </motion.span>
    </div>
  )
}
