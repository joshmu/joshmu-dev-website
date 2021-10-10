/**
 * @path /src/components/ThemeToggle/ThemeToggle.tsx
 *
 * @project joshmu-dev-website
 * @file ThemeToggle.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 20th November 2020 2:25:43 pm
 * @modified Sunday, 10th October 2021 3:37:48 pm
 * @copyright © 2020 - 2020 MU
 */

import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { BsLightningFill as Alt2Icon, BsMoon as MoonIcon } from 'react-icons/bs'
import { HiSun as SunIcon } from 'react-icons/hi'
import { IoIosWater as AltIcon } from 'react-icons/io'

import { useThemeContext } from '@/context/themeContext'

export const ThemeToggle = (props: { [key: string]: any }) => {
  // todo: integrate THEME enum
  const { toggleTheme, theme, THEME_TYPE } = useThemeContext()

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
        {theme === THEME_TYPE.dark && (
          <motion.button
            key={THEME_TYPE.dark}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            role='presentation'
          >
            <MoonIcon className='fill-current' />
          </motion.button>
        )}

        {theme === THEME_TYPE.light && (
          <motion.button
            key={THEME_TYPE.light}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            role='presentation'
          >
            <SunIcon className='fill-current' />
          </motion.button>
        )}

        {theme === THEME_TYPE.alt && (
          <motion.button
            key={THEME_TYPE.alt}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            role='presentation'
          >
            <AltIcon className='fill-current' />
          </motion.button>
        )}

        {theme === THEME_TYPE.alt2 && (
          <motion.button
            key={THEME_TYPE.alt2}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            role='presentation'
          >
            <Alt2Icon className='fill-current' />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
