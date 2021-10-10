/**
 * @path /src/components/Header/Header.tsx
 *
 * @project joshmu-dev-website
 * @file Header.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Sunday, 10th October 2021 4:27:38 pm
 * @copyright © 2020 - 2020 MU
 */

import { Variants, motion } from 'framer-motion'

import { useScrollTo } from '@/hooks/useScrollTo'
import { Compressor } from '@/shared/ux/Compressor'

import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useCursorPointer } from '../Cursor/Cursor'

const menuItems = ['projects', 'contact']

export const Header = () => {
  const scrollTo = useScrollTo()
  const cursorActions = useCursorPointer()

  const handleNavItemClick = (section: string): void => {
    scrollTo(section)
  }

  const handleLogoClick = (): void => {
    scrollTo('hero')
  }

  return (
    <div className='fixed z-30 w-full mt-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          {/* logo */}
          <div
            data-testid='logoTitle'
            onClick={handleLogoClick}
            {...cursorActions}
            className='h-full pl-2 text-2xl font-normal uppercase cursor-pointer'
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>
          {/* nav menu */}
          <div className='relative flex uppercase'>
            {/* nav */}
            <motion.ul
              initial='hidden'
              animate='show'
              variants={navVariants}
              className='flex items-center justify-center h-full px-8 py-1 overflow-hidden text-sm transition-all duration-200 rounded-sm bg-themeText text-themeBg'
            >
              {menuItems.map(item => (
                <li key={item}>
                  <motion.button
                    onClick={() => {
                      handleNavItemClick(item)
                    }}
                    {...cursorActions}
                    variants={navItemVariants}
                    className='px-2 uppercase transition-colors duration-200 ease-in-out hover:text-themeAccent focus:outline-none'
                  >
                    {item}
                  </motion.button>
                </li>
              ))}
              <li className='ml-4'>
                {/* theme toggle */}
                <ThemeToggle />
              </li>
            </motion.ul>
          </div>
        </div>
      </div>

      {/* theme toggle */}
    </div>
  )
}

// animation
const navVariants: Variants = {
  hidden: {
    opacity: 0,
    paddingLeft: '0rem',
    paddingRight: '0rem',
    width: '0%',
  },
  show: {
    opacity: 1,
    paddingLeft: '2rem',
    paddingRight: '2rem',
    width: '100%',
    transition: {
      duration: 0.6,
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
}
const navItemVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      // yoyo: Infinity,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
}
