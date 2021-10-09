import { useEffect, useRef, useState } from 'react'
import { Variants, motion } from 'framer-motion'

type CurtainProps = {
  children: string
  padding?: number
  stagger?: number
}

export const Curtain = ({
  children,
  padding = 1,
  stagger = 0.1,
}: CurtainProps) => {
  const chars = children.split('')
  return (
    <span className='inline-block'>
      {chars.map((char, idx) => (
        <Char
          key={char + idx}
          motionKey={char + idx}
          char={char}
          padding={padding}
          delay={stagger * idx}
        />
      ))}
    </span>
  )
}

type CharType = {
  char: string
  motionKey: string
  padding: number
  delay: number
}

const Char = ({ char, motionKey, padding, delay }: CharType) => {
  const charRef = useRef<HTMLElement | null>(null)
  const [state, setState] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handler = () => {
      const charRect = charRef.current.getBoundingClientRect()
      setState({ width: charRect.width, height: charRect.height })
    }
    window.addEventListener('resize', handler)
    handler()

    return () => window.removeEventListener('resize', handler)
  }, [])

  const charVariants: Variants = {
    initial: { x: '-100%' },
    animate: {
      x: 0,
      transition: {
        delay: 0.4 + delay,
        duration: 0.6,
      },
    },
    exit: { x: '100%' },
  }

  return (
    <span
      className='relative inline-block overflow-hidden'
      style={
        state.width !== 0 && state.height !== 0
          ? {
              width: state.width + padding + 'px',
              height: state.height + 'px',
            }
          : {}
      }
    >
      <motion.span
        key={motionKey}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={charVariants}
        className='absolute whitespace-pre'
      >
        <span ref={charRef}>{char}</span>
      </motion.span>
    </span>
  )
}
