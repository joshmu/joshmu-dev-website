// src/components/Activity/Activity.tsx

import { Variants, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { CalendarDayInterface } from '@/pages/api/github'

import { CurrentDayLabel } from './CurrentDayLabel/CurrentDayLabel'

const staggerDelay = 0.015

export const Activity = () => {
  const [calendar, setCalendar] = useState<CalendarDayInterface[]>(null!)
  const [state, setState] = useState<'loading' | 'ready' | 'done'>('loading')
  const [lastDayVisible, setLastDayVisible] = useState<boolean>(false)
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
        setState('ready')
      })
  }, [])

  // stagger animation when container is in view
  useEffect(() => {
    if (inView && state === 'ready') {
      controls.start('animate')
      setState('done')
    }
  }, [controls, inView, state])

  const handleLastDay = () => {
    setLastDayVisible(true)
  }

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
          variants={calendarDayVariants}
          onAnimationComplete={
            idx === calendar.length - 1 ? handleLastDay : null
          }
          className='relative flex items-center justify-center h-4 m-px md:h-6'
        >
          {/* background */}
          <div
            style={{
              opacity: grade * 0.12,
            }}
            className='w-full h-full bg-themeText'
          ></div>

          {/* current day */}
          {idx === calendar.length - 1 && (
            <CurrentDayLabel
              date={date}
              staggerDelay={staggerDelay}
              idx={idx}
              ready={lastDayVisible}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

const calendarDayVariants: Variants = {
  initial: { opacity: 0, y: 20, x: 20 },
  animate: custom => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      delay: custom * staggerDelay,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  }),
}
