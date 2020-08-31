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
  const { scrollYProgress, currentView } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const widthProgress = useTransform(scrollYProgress, [0, 0.3, 1], [8, 0, 0])

  return (
    <div className='fixed z-10 w-full mt-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div
            onClick={toggleTheme}
            className='h-full text-2xl font-semibold uppercase cursor-pointer '
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>
          <div className='relative flex uppercase'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute top-0 right-0 w-24 h-full -mr-24 transition-all duration-300 bg-themeText'
            ></motion.div>
            <motion.ul
              initial='hidden'
              animate='show'
              variants={parentAnimation}
              className='flex items-center justify-center h-full py-1 pl-4 text-sm transition-all duration-300 rounded-l-sm bg-themeText text-themeBackground'
            >
              {menuItems.map(item => (
                <li key={item}>
                  <motion.button
                    variants={childAnimation}
                    style={{
                      padding: '3px ' + (widthProgress.get() + 6) + 'px',
                      scale: currentView === item ? 1.5 : 1,
                    }}
                    className={`${
                      currentView === item
                        ? 'active font-semibold'
                        : 'font-normal'
                    } uppercase relative transition-colors duration-300 ease-in-out focus:outline-none`}
                    whileHover={{ scale: 1.5 }}
                  >
                    {item}
                  </motion.button>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  )
}
