import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Reveal({
  children,
  delay = 0,
  variants = null,
  transition = null,
  ...props
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    // triggerOnce: true,
    // rootMargin: '300px',
  })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <>
      <motion.div
        ref={ref}
        animate={controls}
        initial='hidden'
        variants={
          variants || {
            visible: { opacity: 1, y: 0 },
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
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}
