import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'

const rand = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

const Parallax = ({ rate = 0.5, children, ...props }) => {
  const { scrollY } = useViewportScroll()
  const springConfig = {
    damping: 100,
    stiffness: 500,
    mass: rand(1, 3),
  }

  // transforming per px thats why we +1
  const y = useSpring(
    useTransform(scrollY, [0, 1], [0, rate], {
      clamp: false,
    }),
    springConfig
  )

  return (
    <motion.div style={{ y }} {...props}>
      {children}
    </motion.div>
  )
}

export default Parallax
