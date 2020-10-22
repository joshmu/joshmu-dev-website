import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

const calculateMinHeight = (height, range) => {
  return height + height * range
}
const rand = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

const Parallax = ({ rate = 0.2, children, ...props }) => {
  const ref = useRef(null)
  const { scrollY } = useViewportScroll()
  const [offsetTop, setOffsetTop] = useState(0)
  const [minHeight, setMinHeight] = useState('auto')

  useLayoutEffect(() => {
    if (!ref.current) return null
    const onResize = () => {
      // also add half window height, so true position is centre of screen
      setOffsetTop(ref.current.offsetTop - globalThis.window.innerHeight / 2)
      setMinHeight(calculateMinHeight(ref.current.offsetHeight, rate))
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  const springConfig = {
    damping: 100,
    stiffness: 500,
    mass: rand(1, 3),
  }

  // transforming per px thats why we +1
  const y = useSpring(
    useTransform(scrollY, [offsetTop, offsetTop + 1], [0, rate], {
      clamp: false,
    }),
    springConfig
  )

  return (
    <div ref={ref} style={{ minHeight }}>
      <motion.div style={{ y }} {...props}>
        {children}
      </motion.div>
    </div>
  )
}

export default Parallax
