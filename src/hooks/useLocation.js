import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGlobalContext } from '../context/globalContext'

export default function useLocation(location) {
  const { currentView, setCurrentView } = useGlobalContext()

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && currentView !== location) {
      console.log({ inView, location })
      setCurrentView(location)
    }
  }, [inView, currentView])

  return { ref }
}
