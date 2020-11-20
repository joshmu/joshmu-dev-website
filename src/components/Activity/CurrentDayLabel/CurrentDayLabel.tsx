import { motion } from 'framer-motion'

export const CurrentDayLabel = ({
  date,
  staggerDelay,
  idx,
}: {
  date: string
  staggerDelay: number
  idx: number
}) => {
  return (
    <motion.div
      key='currentDayLabel'
      custom={idx}
      initial='initial'
      animate='animate'
      variants={{
        initial: { opacity: 0, scale: 0 },
        animate: custom => ({
          opacity: 1,
          scale: 1,
          transition: {
            delay: custom * staggerDelay + 0.3, // slight additional delay for label to come in after stagger animation
            duration: 0.4,
          },
        }),
      }}
    >
      <div className='absolute right-0 flex flex-col items-start justify-center pl-2 leading-3 transform translate-x-full opacity-75 text-themeText'>
        {/* arrow left */}
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16l-4-4m0 0l4-4m-4 4h18'
          />
        </svg>
        <span className='absolute transform -rotate-22 top-1/2 left-1/2 text-themeText'>
          {formatDate(date)}
        </span>
      </div>
    </motion.div>
  )
}

const formatDate = (dateStr: string): string =>
  dateStr.split('-').slice(1).reverse().join('/')
