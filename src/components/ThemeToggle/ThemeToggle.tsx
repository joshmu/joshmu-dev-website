/**
 * @path /src/components/ThemeToggle/ThemeToggle.tsx
 *
 * @project joshmu-dev-website
 * @file ThemeToggle.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 20th November 2020 2:25:43 pm
 * @modified Sunday, 6th February 2022 9:11:10 am
 * @copyright © 2020 - 2020 MU
 */

import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import {
  BsLightningFill as Alt2Icon,
  BsMoonFill as MoonIcon,
  BsDropletFill as DropletIcon,
  BsSunFill as SunIcon,
} from 'react-icons/bs'

import { useThemeContext } from '@/context/themeContext'
import { useCursorPointer } from '../Cursor/Cursor'

const motionStyle = {
  initial: { opacity: 0, rotate: -180, scale: 0 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 180, scale: 0 },
}

export const ThemeToggle = (props: { [key: string]: any }) => {
  const { toggleTheme, theme, THEME_TYPE } = useThemeContext()
  const cursorActions = useCursorPointer()

  const handleClick = () => {
    toggleTheme()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      key='themeToggle'
      {...motionStyle}
      onClick={handleClick}
      className='relative flex items-center cursor-pointer'
      {...props}
      {...cursorActions}
    >
      <AnimatePresence exitBeforeEnter>
        {theme === THEME_TYPE.dark && (
          <motion.button
            key={THEME_TYPE.dark}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            aria-label={`${THEME_TYPE.dark} theme toggle`}
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
            aria-label={`${THEME_TYPE.light} theme toggle`}
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
            aria-label={`${THEME_TYPE.alt} theme toggle`}
          >
            <DropletIcon className='fill-current' />
          </motion.button>
        )}

        {theme === THEME_TYPE.alt2 && (
          <motion.button
            key={THEME_TYPE.alt2}
            {...motionStyle}
            className='relative focus:outline-none'
            type='button'
            aria-label={`${THEME_TYPE.alt2} theme toggle`}
          >
            <Alt2Icon className='fill-current' />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
