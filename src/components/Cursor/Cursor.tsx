/**
 * @path /src/components/Cursor/Cursor.tsx
 *
 * @project joshmu-dev-website
 * @file Cursor.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Saturday, 25th September 2021
 * @modified Sunday, 10th October 2021 4:23:25 pm
 * @copyright © 2020 - 2021 MU
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { isDesktop } from 'react-device-detect'
import cn from 'classnames'

/**
 * @see https://github.com/nicubarbaros/custom-mouse-change/tree/master/src/components/CustomCursor
 */

// state
type CURSOR_TYPE = 'default' | 'pointer'
type CURSOR_STATE = {
  type: CURSOR_TYPE
  setType: (type: CURSOR_TYPE) => void
}
const CursorContext = createContext<CURSOR_STATE>({
  type: 'default',
  setType: () => {},
})
export const CursorProvider = ({ children }) => {
  const [type, setType] = useState<CURSOR_TYPE>('default')

  return (
    <CursorContext.Provider value={{ type, setType }}>
      {children}
    </CursorContext.Provider>
  )
}
export const useCursorContext = () => {
  return useContext(CursorContext)
}
export const useCursorPointer = () => {
  const {setType} = useContext(CursorContext)
  return {
    onMouseEnter: () => setType('pointer'),
    onMouseLeave: () => setType('default')
  }
}

// component
export const Cursor = () => {
  const { type } = useCursorContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const mainCursor = useRef(null)

  useEffect(() => {
    const cursorMove = event => {
      if (!isLoaded) setIsLoaded(true)
      const { clientX, clientY } = event

      const mouseX = clientX
      const mouseY = clientY

      const posX = mouseX - mainCursor.current.clientWidth / 2
      const posY = mouseY - mainCursor.current.clientHeight / 2

      mainCursor.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
    }

    window.addEventListener('mousemove', cursorMove)

    return () => window.removeEventListener('mousemove', cursorMove)
  }, [])

  return (
    <div
      ref={mainCursor}
      className={cn('main-cursor', `main-cursor--${type}`)}
      style={{ display: isDesktop && isLoaded ? 'initial' : 'none' }}
    >
      <div className='main-cursor-background'></div>
    </div>
  )
}
