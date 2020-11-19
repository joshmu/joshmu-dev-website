// src/components/Activity/Activity.tsx

import { useEffect, useState } from 'react'

import { CalendarDayInterface } from '@/pages/api/github'
import { Variants } from 'framer-motion'
import { RevealInView } from '../shared/ux/RevealInView'

export const Activity = () => {
  const [calendar, setCalendar] = useState<CalendarDayInterface[]>(null!)

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        setCalendar(data)
      })
  }, [])

  if (!calendar) return null

  return (
    <div className='container flex flex-col flex-wrap justify-start h-64 gap-1 mx-auto my-24 github'>
      {calendar.map(({ date, grade }, idx) => (
        <RevealInView key={date} custom={idx} variants={calendarDayVariants}>
          <div
            key={date}
            className='relative flex items-center justify-center h-8'
          >
            {/* background */}
            <div
              style={{
                opacity: grade * 0.1,
              }}
              className='w-full h-full bg-themeText'
            ></div>

            {/* current day */}
            {idx === calendar.length - 1 && (
              <span className='absolute right-0 flex items-center justify-center pl-2 transform translate-x-full text-themeText'>
                {/* arrow left */}
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16l-4-4m0 0l4-4m-4 4h18'
                  />
                </svg>
                <span>me.</span>
              </span>
            )}
          </div>
        </RevealInView>
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
      delay: custom * 0.02,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  }),
}
