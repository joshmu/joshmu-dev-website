import { createContext, useContext, useState, useEffect } from 'react'
import { useViewportScroll } from 'framer-motion'

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

  return (
    <globalContext.Provider
      value={{
        scrollYProgress,
        scrollProgress,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
