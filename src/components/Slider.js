import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Slider({ content, duration = 5000 }) {
  const [pos, setPos] = useState(0)

  let timer
  useEffect(() => {
    console.log('fire')
    // initiate timer to change pos
    clearTimeout(timer)
    timer = setTimeout(() => changeContent(pos), duration)
    // remove timer if we unmount
    return () => clearTimeout(timer)
  }, [pos])

  function changeContent(index) {
    if (index === content.length - 1) {
      setPos(0)
    } else {
      setPos(index + 1)
    }
  }

  return (
    <div className='w-full h-full min-h-screen pt-16'>
      <div className='flex items-center justify-center'>
        {content.map((c, idx) => (
          <div key={idx}>
            <AnimatePresence>
              {idx === pos && (
                <motion.p
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                >
                  {c}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
