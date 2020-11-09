import { useViewportScroll } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'
import { scroller } from 'react-scroll'

const globalContext = createContext({
  scrollProgress: 0,
  currentView: '',
})

export function GlobalProvider({ children }) {
  const [currentView, setCurrentView] = useState('hero')
  const { scrollYProgress } = useViewportScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  // initial scroll
  useEffect(() => {
    // handle motion
    function handleScroll() {
      setScrollProgress(scrollYProgress.get())
    }

    // subscribe
    const unsubscribeY = scrollYProgress.onChange(handleScroll)

    // destroy
    return () => {
      unsubscribeY()
    }
  }, [])

  const scrollTo = elemId => {
    scroller.scrollTo(elemId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -10,
    })
  }

  return (
    <globalContext.Provider
      value={{
        scrollYProgress,
        scrollProgress,
        currentView,
        setCurrentView,
        scrollTo
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
