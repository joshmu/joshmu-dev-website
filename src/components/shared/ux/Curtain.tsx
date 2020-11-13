import { motion, Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
    <div>
      {chars.map((char, idx) => (
        <Char
          key={char + idx}
          motionKey={char + idx}
          char={char}
          padding={padding}
          delay={stagger * idx}
        />
      ))}
    </div>
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
    <div
      className='relative inline-block overflow-hidden'
      style={{
        width: state.width + padding + 'px',
        height: state.height + 'px',
      }}
    >
      <motion.span
        key={motionKey}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={charVariants}
        ref={charRef}
        className='absolute whitespace-pre'
      >
        {char}
      </motion.span>
    </div>
  )
}
