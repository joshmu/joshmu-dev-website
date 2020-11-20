import { Variants, motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export const CurrentDayLabel = ({
  date,
  ready,
}: {
  date: string
  ready: boolean
}) => {
  const controls = useAnimation()

  // initial load will fire 'initial' animation setup
  // then we will wait for 'ready' to trigger label animation
  useEffect(() => {
    ready ? controls.start('animate') : controls.start('initial')
  }, [ready])

  return (
    <motion.div
      key='currentDayLabel'
      initial='initial'
      animate={controls}
      variants={labelVariants}
    >
      <div className='absolute top-0 right-0 flex flex-col items-start justify-center h-full pl-2 leading-3 transform translate-x-full opacity-75 text-themeText'>
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

const labelVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.6,
    },
  },
}

const formatDate = (dateStr: string): string =>
  dateStr.split('-').slice(1).reverse().join('/')
