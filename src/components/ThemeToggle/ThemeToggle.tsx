/**
 * @path /src/components/ThemeToggle/ThemeToggle.tsx
 *
 * @project joshmu-dev-website
 * @file ThemeToggle.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 20th November 2020 2:25:43 pm
 * @modified Friday, 20th November 2020 4:57:03 pm
 * @copyright © 2020 - 2020 MU
 */

import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { BsLightningFill as Alt2Icon, BsMoon as MoonIcon } from 'react-icons/bs'
import { HiSun as SunIcon } from 'react-icons/hi'
import { IoIosWater as AltIcon } from 'react-icons/io'

import { useThemeContext } from '@/context/themeContext'

export const ThemeToggle = (props: { [key: string]: any }) => {
  // todo: integrate theme_types enum
  const { toggleTheme, theme, THEME_TYPES } = useThemeContext()

  const handleClick = () => {
    toggleTheme()
  }

  const motionStyle = {
    initial: { opacity: 0, rotate: -180, scale: 0 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 180, scale: 0 },
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      key='themeToggle'
      {...motionStyle}
      onClick={handleClick}
      className='relative flex items-center cursor-pointer'
      {...props}
    >
      <AnimatePresence exitBeforeEnter>
        {theme === 'dark' && (
          <motion.button
            key='dark'
            {...motionStyle}
            className='relative focus:outline-none'
          >
            <MoonIcon className='fill-current' />
          </motion.button>
        )}

        {theme === 'light' && (
          <motion.button
            key='light'
            {...motionStyle}
            className='relative focus:outline-none'
          >
            <SunIcon className='fill-current' />
          </motion.button>
        )}

        {theme === 'alt' && (
          <motion.button
            key='alt'
            {...motionStyle}
            className='relative focus:outline-none'
          >
            <AltIcon className='fill-current' />
          </motion.button>
        )}

        {theme === 'alt2' && (
          <motion.button
            key='alt2'
            {...motionStyle}
            className='relative focus:outline-none'
          >
            <Alt2Icon className='fill-current' />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
