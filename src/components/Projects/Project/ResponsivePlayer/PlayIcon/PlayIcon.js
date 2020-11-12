import { motion } from 'framer-motion'
import { IoMdPlay as Icon } from 'react-icons/io'

// const iconVariants = {
//   initial: {
//     opacity: 0,
//     scale: 0,
//   },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       delay: 2.5,
//     },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0,
//   },
// }

const PlayIcon = motionKey => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <motion.span
        whileHover={{ scale: 0.9 }}
        key={motionKey}
        // initial='initial'
        // animate='animate'
        // exit='exit'
        // variants={iconVariants}
      >
        <Icon className='w-16 h-16 opacity-75 stroke-current' />
      </motion.span>
    </div>
  )
}

export default PlayIcon
