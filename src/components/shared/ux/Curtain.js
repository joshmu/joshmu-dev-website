import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Curtain = ({ children }) => {
  const chars = children.split('')
  return (
    <div>
      {chars.map((char, idx) => (
        <Char key={char + idx} char={char} />
      ))}
    </div>
  )
}

const Char = ({ char, key }) => {
  const charRef = useRef(null)
  const [state, setState] = useState({ width: null, height: null })

  useEffect(() => {
    const charRect = charRef.current.getBoundingClientRect()
    setState({ width: charRect.width, height: charRect.height })
  }, [])

  return (
    <div
      className='relative inline-block overflow-hidden'
      style={{ width: state.width + 'px', height: state.height + 'px' }}
    >
      <motion.span
        key={key}
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

const charVariants = {
  initial: { x: '-100%' },
  animate: {
    x: 0,
    transition: {
      delay: 0.4,
      duration: 0.6,
    },
  },
  exit: { x: '100%' },
}

export default Curtain
