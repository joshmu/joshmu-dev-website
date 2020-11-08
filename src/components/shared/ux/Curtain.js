import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Curtain = ({ children, padding = 0, stagger = 0.1 }) => {
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

const Char = ({ char, motionKey, padding, delay }) => {
  const charRef = useRef(null)
  const [state, setState] = useState({ width: null, height: null })

  useEffect(() => {
    const handler = () => {
      const charRect = charRef.current.getBoundingClientRect()
      setState({ width: charRect.width, height: charRect.height })
    }
    window.addEventListener('resize', handler)
    handler()

    return () => window.removeEventListener('resize', handler)
  }, [])

  const charVariants = {
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

export default Curtain
