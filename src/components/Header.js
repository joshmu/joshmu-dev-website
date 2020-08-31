import { useTransform, AnimatePresence } from 'framer-motion'
import { useGlobalContext } from '../context/globalContext'

import { motion } from 'framer-motion'
import Compressor from './Compressor'
import { useThemeContext } from '../context/themeContext'

// animation
const parentAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const childAnimation = {
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

const menuItems = ['home', 'about', 'news', 'portfolio', 'critics', 'contact']

export default function Header() {
  const { scrollYProgress } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const widthProgress = useTransform(scrollYProgress, [0, 0.3, 1], [8, 0, 0])

  return (
    <div className='fixed w-full'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='text-2xl font-semibold uppercase cursor-pointer'>
            <Compressor text='josh mu' hide='osh ' />
          </div>
          <div className='uppercase'>
            <motion.ul
              initial='hidden'
              animate='show'
              variants={parentAnimation}
              className='flex items-center text-sm'
            >
              {menuItems.map(item => (
                <motion.li
                  key={item}
                  variants={childAnimation}
                  style={{ padding: '3px ' + widthProgress.get() + 'px' }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  )
}
