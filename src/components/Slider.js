import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Slider({ content, duration = 5000 }) {
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState([content[pos]])
  let timer

  useEffect(() => {
    console.log('fire')
    // change content when position is updated
    setShown([content[pos]])

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
    <AnimatePresence>
      <div className='w-full h-full min-h-screen pt-16'>
        <div className='flex items-center justify-center'>
          {shown.map((c, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='p-8 bg-gray-400'
            >
              {c}
            </motion.p>
          ))}
        </div>
      </div>
    </AnimatePresence>
  )
}
