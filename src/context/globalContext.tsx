import { MotionValue, useViewportScroll } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'

interface GlobalContextInterface {
  scrollYProgress: MotionValue
  scrollProgress: number
}

const globalContext = createContext<GlobalContextInterface | null>(null)

type GlobalProviderProps = {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
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

  const value: GlobalContextInterface = {
    scrollYProgress,
    scrollProgress,
  }

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(globalContext)
}
