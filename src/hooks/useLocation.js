import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext'
import { useInView } from 'react-intersection-observer'

export default function useLocation(location) {
  const { currentView, setCurrentView } = useGlobalContext()

  const [ref, inView] = useInView({
    threshold: 0.7,
  })

  useEffect(() => {
    if (inView && currentView !== location) {
      console.log({ inView, location })
      setCurrentView(location)
    }
  }, [inView, currentView])

  return { ref }
}
