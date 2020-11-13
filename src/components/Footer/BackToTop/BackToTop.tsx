import { motion } from 'framer-motion'

import { useGlobalContext } from '@/context/globalContext'

export const BackToTop = () => {
  const { scrollTo } = useGlobalContext()
  const handleBackToTopClick = () => scrollTo('hero')

  return (
    <div>
      {/* back to top */}
      <motion.svg
        whileHover={{ scale: 1.3 }}
        onClick={handleBackToTopClick}
        className='w-4 h-4 mx-auto cursor-pointer'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 15l7-7 7 7'
        />
      </motion.svg>
    </div>
  )
}
