import { motion } from 'framer-motion'

import { useGlobalContext } from '@/context/globalContext'
import { useThemeContext } from '@/context/themeContext'
import Compressor from '@/shared/ux/Compressor'

const menuItems = ['about', 'portfolio', 'contact']

export default function Header() {
  const { currentView } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  return (
    <div className='fixed z-10 w-full mt-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div
            onClick={toggleTheme}
            className='h-full text-2xl font-normal uppercase transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>
          <div className='relative flex uppercase'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute top-0 right-0 w-full h-full transition-all duration-300 -mr-full bg-themeText'
            ></motion.div>
            <motion.ul
              initial='hidden'
              animate='show'
              variants={navVariant}
              className='flex items-center justify-center h-full py-1 pl-4 text-sm transition-all duration-300 rounded-l-sm bg-themeText text-themeBg'
            >
              {menuItems.map(item => (
                <li key={item}>
                  <motion.button
                    variants={navItemVariant}
                    style={{
                      scale: currentView === item ? 1.5 : 1,
                    }}
                    className={`${
                      currentView === item
                        ? 'active font-semibold'
                        : 'font-normal'
                    } uppercase px-2 transition-colors hover:text-themeAccent duration-300 ease-in-out focus:outline-none`}
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

// animation
const navVariant = {
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
const navItemVariant = {
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
