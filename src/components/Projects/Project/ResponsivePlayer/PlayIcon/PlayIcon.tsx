/**
 * @path /src/components/Projects/Project/ResponsivePlayer/PlayIcon/PlayIcon.tsx
 * 
 * @project joshmu-dev-website
 * @file PlayIcon.tsx
 * 
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020
 * @modified Tuesday, 24th November 2020 11:14:32 am
 * @copyright © 2020 - 2020 MU
 */

import { motion } from 'framer-motion'
import { IoMdPlay as Icon } from 'react-icons/io'

type PlayIconProps = { motionKey: string }

export const PlayIcon = ({ motionKey }: PlayIconProps) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <motion.span whileHover={{ scale: 0.9 }} key={motionKey}>
        <Icon className='w-16 h-16 opacity-90 stroke-current' />
      </motion.span>
    </div>
  )
}
