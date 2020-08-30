import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function Compress() {
  const [toggle, setToggle] = useState(false)
  const controls = useAnimation()

  function handleClick() {
    setToggle(!toggle)
  }

  useEffect(() => {
    controls.start(toggle ? 'hide' : 'show')
  }, [toggle])

  const animationVariants = {
    hide: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: 'auto',
      opacity: 1,
    },
    transition: {
      duration: 1,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  }

  return (
    <div onClick={handleClick} className='cursor-pointer'>
      <p className='text-4xl font-semibold uppercase'>
        j
        <motion.div
          variants={animationVariants}
          animate={controls}
          style={{
            transform: 'translateY(15px)',
          }}
          className='inline-block overflow-hidden'
        >
          <span>osh </span>
        </motion.div>
        mu
      </p>
    </div>
  )
}
