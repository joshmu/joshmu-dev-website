import React from 'react'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

import { useThemeContext } from '@/context/themeContext'
import useLocation from '@/hooks/useLocation'

export default function Hero() {
  const { toggleTheme } = useThemeContext()
  const { ref } = useLocation('home')

  return (
    <div ref={ref} className='relative w-full h-screen'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1
          onClick={toggleTheme}
          className='font-semibold text-indigo-700 uppercase cursor-pointer text-8xl'
        >
          josh mu
        </h1>
        <p>
          <span>code + ☕️</span>
        </p>
      </div>
      <div className='absolute bottom-0 flex items-center justify-center w-full mb-8 text-4xl'>
        <ArrowDownIcon className='fill-current animate-bounce' />
      </div>
    </div>
  )
}
