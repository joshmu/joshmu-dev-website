import { motion } from 'framer-motion'
import { IoMdPlay as Icon } from 'react-icons/io'

type PlayIconProps = { motionKey: string }

export const PlayIcon = ({ motionKey }: PlayIconProps) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <motion.span whileHover={{ scale: 0.9 }} key={motionKey}>
        <Icon className='w-16 h-16 opacity-75 stroke-current' />
      </motion.span>
    </div>
  )
}
