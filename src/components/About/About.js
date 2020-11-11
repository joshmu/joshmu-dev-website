import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { useRef } from 'react'

import useRefScrollProgress from '@/hooks/useRefScrollProgress'

export default function About({ ...props }) {
  const { ref, start, end } = useRefScrollProgress()
  const { scrollYProgress } = useViewportScroll()

  return (
    <div ref={ref} className='container z-0 mx-auto py-96' {...props}>
      <p className='ml-2'>
        Isolation, Integration, Improvis
        <CharSplit
          scrollStart={start}
          scrollEnd={end}
          scrollYProgress={scrollYProgress}
        >
          ation
        </CharSplit>
      </p>
    </div>
  )
}

const CharSplit = ({ children, scrollStart, scrollEnd, scrollYProgress }) => {
  return children.split('').map((char, idx) => (
    <span key={idx} className='relative'>
      {/* create height and width with transparent duplicate */}
      <span className='opacity-0'>{char}</span>
      <Spray
        char={char}
        idx={idx}
        scrollStart={scrollStart}
        scrollEnd={scrollEnd}
        scrollYProgress={scrollYProgress}
      />
    </span>
  ))
}

const Spray = ({
  char,
  idx,
  scrollStart = 0,
  scrollEnd = 1,
  scrollYProgress,
}) => {
  const randomVelocityX = useRef((idx + 1) / randomNum(1, 10 / (idx + 1)))
  const randomVelocityY = useRef(randomNum(1, 10))
  const randomRotateEnd = useRef(randomNum(25, 180))

  const springConfig = { mass: 1, stiffness: 180, damping: 100 }

  // not using 'scrollEnd'
  // make scatter infinite instead of defining end therefor '100%' = 1
  const scrollToEndOfPage = 1

  // initial transform based on scroll
  const scale = useTransform(
    scrollYProgress,
    [scrollStart, scrollToEndOfPage],
    [1, 2]
  )
  const rotate = useTransform(
    scrollYProgress,
    [scrollStart, scrollToEndOfPage],
    [0, randomRotateEnd.current]
  )
  const x = useTransform(
    scrollYProgress,
    [scrollStart, scrollToEndOfPage],
    [0, 600]
  )
  const y = useTransform(
    scrollYProgress,
    [scrollStart, scrollToEndOfPage],
    [0, 600]
  )
  // spring motion to be used
  const xVel = useSpring(
    useTransform(x, value => value * randomVelocityX.current),
    springConfig
  )
  const yVel = useSpring(
    useTransform(y, value => value / randomVelocityY.current),
    springConfig
  )

  return (
    <motion.span
      className='absolute left-0 z-0'
      style={{ x: xVel, y: yVel, scale, rotate }}
    >
      {char}
    </motion.span>
  )
}

const randomNum = (min, max) => Math.floor(Math.random() * max) + min
