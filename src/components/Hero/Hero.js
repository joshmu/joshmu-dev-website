import React from 'react'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

import { useThemeContext } from '@/context/themeContext'
import useLocation from '@/hooks/useLocation'

import Curtain from '../shared/ux/Curtain'
import Reveal from '../shared/ux/Reveal'

export default function Hero() {
  const { toggleTheme } = useThemeContext()
  const { ref } = useLocation('home')

  return (
    <div ref={ref} className='relative w-full h-screen'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1
          onClick={toggleTheme}
          className='font-semibold tracking-wide uppercase cursor-pointer text-8xl'
        >
          <Curtain>josh mu</Curtain>
        </h1>
        <p>
          <Reveal delay={1}>
            <span>code + ☕️</span>
          </Reveal>
        </p>
      </div>
      <div className='absolute bottom-0 flex items-center justify-center w-full mb-8 text-4xl'>
        <ArrowDownIcon className='fill-current animate-bounce' />
      </div>
    </div>
  )
}
