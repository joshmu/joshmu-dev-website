import { motion, useAnimation, Variants } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { RevealInView } from '@/shared/ux/RevealInView'

const svgVariants: Variants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const pathVariants: Variants = {
  initial: {
    // opacity: 0,
    pathLength: 0,
  },
  visible: {
    // opacity: 1,
    pathLength: 1,
    transition: {
      duration: 3,
      ease: 'easeInOut',
    },
  },
}

type ContactProps = {
  id: string
  props?: { [key: string]: any }
}

export const Contact = ({ ...props }: ContactProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
  })

  useEffect(() => {
    inView ? controls.start('visible') : controls.start('initial')
  }, [controls, inView])

  return (
    <div ref={ref} className='pt-12 pb-24 text-center' {...props}>
      <div className='relative inline-block px-8 py-4'>
        <RevealInView triggerOnce={false}>
          <a className='hover:underline' href='mailto:hello@joshmu.dev'>
            hello@joshmu.dev
          </a>
        </RevealInView>
        <motion.svg
          initial='initial'
          animate={controls}
          variants={svgVariants}
          className='absolute top-0 right-0 w-6 h-6 text-themeAccent'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            variants={pathVariants}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          />
        </motion.svg>
      </div>
    </div>
  )
}
