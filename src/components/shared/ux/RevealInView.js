import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const RevealInView = ({
  children,
  delay = 0,
  variants = null,
  transition = null,
  custom = 1,
  ...props
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <motion.span
      ref={ref}
      animate={controls}
      initial='hidden'
      custom={custom}
      variants={
        variants || {
          visible: custom => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.2 },
          }),
          hidden: { opacity: 0, y: 25 },
        }
      }
      transition={
        transition || {
          delay,
          duration: 0.8,
          ease: [0.6, 0.05, -0.01, 0.9],
        }
      }
      style={{ display: 'block' }}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default RevealInView
