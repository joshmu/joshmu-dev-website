/**
 * @path /src/components/Cursor/Cursor.tsx
 *
 * @project joshmu-dev-website
 * @file Cursor.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Saturday, 25th September 2021
 * @modified Saturday, 9th October 2021 10:11:28 pm
 * @copyright © 2020 - 2021 MU
 */

import React, { useEffect, useRef } from 'react'
import { isDesktop } from 'react-device-detect'

/**
 * @see https://github.com/nicubarbaros/custom-mouse-change/tree/master/src/components/CustomCursor
 */
export const Cursor = () => {
  const mainCursor = useRef(null)

  useEffect(() => {
    const cursorMove = event => {
      const { clientX, clientY } = event

      const mouseX = clientX
      const mouseY = clientY

      mainCursor.current.style.transform = `translate3d(${
        mouseX - mainCursor.current.clientWidth / 2
      }px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`
    }

    window.addEventListener('mousemove', cursorMove)

    return () => window.removeEventListener('mousemove', cursorMove)
  }, [])

  return (
    <div
      ref={mainCursor}
      className='main-cursor'
      style={{ display: isDesktop ? 'initial' : 'none' }}
    >
      <div className='main-cursor-background'></div>
    </div>
  )
}
