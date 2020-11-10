import { motion } from 'framer-motion'

import { useGlobalContext } from '@/context/globalContext'
import { useThemeContext } from '@/context/themeContext'
import Compressor from '@/shared/ux/Compressor'

// todo: clean up nav
// todo: fun drop down for contact instead
const menuItems = ['projects', 'contact']

// animation
const navVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
}
const navItemVariants = {
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

export default function Header() {
  const { scrollTo } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const handleNavItemClick = section => {
    scrollTo(section)
  }

  const handleLogoClick = () => {
    toggleTheme()
    scrollTo('hero')
  }

  return (
    <div className='fixed z-30 w-full mt-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          {/* logo */}
          <div
            onClick={handleLogoClick}
            className='h-full ml-2 text-2xl font-normal uppercase transition-colors duration-200 ease-in-out cursor-pointer hover:text-themeAccent'
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>

          {/* nav menu */}
          <div className='relative flex uppercase'>
            {/* extra length for menu container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute top-0 right-0 w-full h-full transition-all duration-200 -mr-full bg-themeText'
            ></motion.div>

            {/* nav */}
            <motion.ul
              initial='hidden'
              animate='show'
              variants={navVariants}
              className='flex items-center justify-center h-full py-1 pl-4 overflow-hidden text-sm transition-all duration-200 rounded-l-sm bg-themeText text-themeBg'
            >
              {menuItems.map(item => (
                <li key={item}>
                  <motion.button
                    onClick={() => {
                      handleNavItemClick(item)
                    }}
                    variants={navItemVariants}
                    className='px-2 uppercase transition-colors duration-200 ease-in-out hover:text-themeAccent focus:outline-none'
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
