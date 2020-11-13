import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

import useRefScrollProgress from '@/hooks/useRefScrollProgress'

type BannerProps = { props?: any; id: string }

export const Banner = ({ ...props }: BannerProps) => {
  const { ref, start, end } = useRefScrollProgress()
  const { scrollYProgress } = useViewportScroll()

  return (
    <div ref={ref} className='container z-0 mx-auto py-96' {...props}>
      <p className='ml-2'>
        My adventures in web{' '}
        <CharSplit
          scrollStart={start}
          scrollEnd={end}
          scrollYProgress={scrollYProgress}
        >
          development...
        </CharSplit>
      </p>
    </div>
  )
}

type CharSplitProps = {
  children: string
  scrollStart: number
  scrollEnd: number
  scrollYProgress: any
}

const CharSplit = ({
  children,
  scrollStart,
  scrollEnd,
  scrollYProgress,
}: CharSplitProps) => {
  return (
    <>
      {children.split('').map((char, idx) => (
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
      ))}
    </>
  )
}

type SprayProps = {
  char: string
  idx: number
  scrollStart?: number
  scrollEnd?: number
  scrollYProgress: MotionValue
}

const Spray = ({
  char,
  idx,
  scrollStart = 0,
  scrollEnd = 1,
  scrollYProgress,
}: SprayProps) => {
  const randomVelocityX = useRef((idx + 1) / (idx + randomNum(1, 4)))
  const randomVelocityY = useRef(randomNum(1, 10))
  const randomRotateEnd = useRef(randomNum(25, 180))

  const springConfig = { mass: 1, stiffness: 180, damping: 100 }

  // calc max initial distance of elem to right edge of screen
  const ref = useRef(null)
  const maxDistance = useRef(null)
  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    maxDistance.current = window.innerWidth - (rect.x + rect.width)
  }, [])

  // if not using 'scrollEnd'
  // make scatter infinite instead of defining end therefor '100%' = 1
  // const scrollToEndOfPage = 1 (exchange scrollEnd)

  // initial transform based on scroll
  const scale = useTransform(scrollYProgress, [scrollStart, scrollEnd], [1, 2])
  const rotate = useTransform(
    scrollYProgress,
    [scrollStart, scrollEnd],
    [0, randomRotateEnd.current]
  )
  const x = useTransform(
    scrollYProgress,
    [scrollStart, scrollEnd],
    [0, maxDistance.current]
  )
  const y = useTransform(
    scrollYProgress,
    [scrollStart, scrollEnd],
    [0, maxDistance.current]
  )
  // spring motion to be used
  // * we make sure velocity will always be a reduction of distance or '1' so we don't pass our desired distance limit
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
      ref={ref}
      className='absolute left-0 z-0'
      style={{ x: xVel, y: yVel, scale, rotate }}
    >
      {char}
    </motion.span>
  )
}

// helper
const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * max) + min
