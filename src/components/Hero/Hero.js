import { motion } from 'framer-motion'
import React from 'react'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

import { useGlobalContext } from '@/context/globalContext'
import { useThemeContext } from '@/context/themeContext'
import Curtain from '@/shared/ux/Curtain'
import RevealInView from '@/shared/ux/RevealInView'

const Hero = ({ ...props }) => {
  const { scrollTo } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const handleScrollDown = () => {
    scrollTo('about')
  }

  return (
    <div className='relative w-full h-screen' {...props}>
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
            <span>code + ☕️</span>
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
        transition={{ duration: 3 }}
        className='absolute z-0 font-bold uppercase transform top-20 -left-20 rotate-12 opacity-10'
        style={{ fontSize: '50rem', lineHeight: 1 }}
      >
        MU
      </motion.span>
    </div>
  )
}

export default Hero
