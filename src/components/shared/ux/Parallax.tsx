import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

const calculateMinHeight = (height: number, range: number): number => {
  return height + height * range
}
const rand = (min: number = 0, max: number = 100): number => {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

type ParallaxProps = {
  rate?: number
  children: React.ReactNode
  props: { [key: string]: any }
}

export const Parallax = ({ rate = 0, children, ...props }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollY } = useViewportScroll()
  const [offsetTop, setOffsetTop] = useState(0)
  const [minHeight, setMinHeight] = useState<number | string>('auto')

  // randomize the rate if we do not specify (0.01-0.4)
  rate = rate === 0 ? rand(1, 40) / 100 : rate

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
    <div ref={ref} style={{ minHeight, margin: 'auto', width: '100%' }}>
      <motion.div style={{ y }} {...props}>
        {children}
      </motion.div>
    </div>
  )
}
