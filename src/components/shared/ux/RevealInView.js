import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const RevealInView = ({
  children,
  delay = 0,
  variants = null,
  transition = null,
  custom = 1,
  triggerOnce = true,
  ...props
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce,
    threshold: 0.15,
  })

  useEffect(() => {
    inView ? controls.start('animate') : controls.start('initial')
  }, [controls, inView])

  variants = variants || {
    animate: custom => ({
      opacity: 1,
      y: 0,
      transition: transition || {
        delay: custom * 0.2,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
    initial: { opacity: 0, y: 25 },
  }

  return (
    <motion.span
      ref={ref}
      animate={controls}
      initial='initial'
      custom={custom}
      variants={variants}
      style={{ display: 'block' }}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default RevealInView
