/**
 * @path /src/components/Activity/Activity.tsx
 *
 * @project joshmu-dev-website
 * @file Activity.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Thursday, 19th November 2020 4:37:19 pm
 * @modified Saturday, 22nd January 2022 9:09:11 pm
 * @copyright © 2020 - 2020 MU
 */

// src/components/Activity/Activity.tsx

import {
  Variants,
  motion,
  useAnimation,
  TargetAndTransition,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ActivityDayInterface } from '@/app/api/github/route'

import { CurrentDayLabel } from './CurrentDayLabel/CurrentDayLabel'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

export const Activity = () => {
  const [calendar, setCalendar] = useState<ActivityDayInterface[]>(null!)
  const [status, setStatus] = useState<'loading' | 'ready' | 'done'>('loading')
  const [finalAnimation, setFinalAnimation] = useState<boolean>(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false, // keep checking in case data has not loaded yet
    threshold: 0.15,
  })

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        setCalendar(data)
        setStatus('ready')
      })
  }, [])

  // stagger animation when container is in view
  useEffect(() => {
    if (inView && status === 'ready') {
      controls.start(activityStaggerAnimation).finally(() => {
        setFinalAnimation(true)
      })
    }
  }, [controls, inView, status])

  // mark animations complete
  useEffect(() => {
    if (!finalAnimation) return
    setStatus('done')
  }, [finalAnimation])

  if (!calendar) return null

  return (
    <div
      ref={ref}
      className='container flex flex-col flex-wrap justify-start h-32 pr-16 mx-auto my-24 md:h-48 md:px-8'
    >
      {calendar.map(({ date, grade }, idx) => (
        <motion.div
          key={date}
          custom={idx}
          animate={controls}
          initial={{ opacity: 0, y: 20, x: 20 }}
          className='relative flex items-center justify-center h-4 m-px md:h-6'
        >
          {/* background */}
          <div
            style={{ opacity: grade * 0.12 }}
            className='w-full h-full bg-themeText'
          ></div>

          {/* current day */}
          {idx === calendar.length - 1 && (
            <CurrentDayLabel date={date} ready={finalAnimation} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function activityStaggerAnimation(custom: number): TargetAndTransition {
  return {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      delay: custom * 0.01,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  }
}
