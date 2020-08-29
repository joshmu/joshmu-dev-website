import { createContext, useContext, useState, useEffect } from 'react'
import { useViewportScroll } from 'framer-motion'

const globalContext = createContext({})

export function GlobalProvider({ children }) {
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
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
