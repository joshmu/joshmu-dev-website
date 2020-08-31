import { useTransform } from 'framer-motion'
import { useGlobalContext } from '../context/globalContext'

import { motion } from 'framer-motion'
import Compressor from './Compressor'

// animation
const parent = {
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

const child = {
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
  const { scrollYProgress } = useGlobalContext()

  const widthProgress = useTransform(scrollYProgress, [0, 0.3, 1], [8, 0, 0])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0])

  return (
    <div className='fixed w-full'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-semibold uppercase'>
          <Compressor text='josh mu' hide='osh ' />
        </div>
        <div className='uppercase'>
          <motion.ul
            initial='hidden'
            animate='show'
            variants={parent}
            className='flex items-center text-sm'
          >
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              home
            </motion.li>
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              about
            </motion.li>
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              news
            </motion.li>
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              portfolio
            </motion.li>
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              critics
            </motion.li>
            <motion.li
              variants={child}
              style={{ padding: '3px ' + widthProgress.get() + 'px' }}
            >
              contact
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </div>
  )
}
