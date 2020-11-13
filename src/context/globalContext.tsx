import { MotionValue, useViewportScroll } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'
import { scroller } from 'react-scroll'

type ScrollToType = (elemId: string, config?: object) => void

interface GlobalContextInterface {
  scrollYProgress: MotionValue
  scrollProgress: number
  scrollTo: ScrollToType
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

  const scrollTo: ScrollToType = (elemId, config = {}) => {
    scroller.scrollTo(elemId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -40,
      ...config,
    })
  }

  const value: GlobalContextInterface = {
    scrollYProgress,
    scrollProgress,
    scrollTo,
  }

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(globalContext)
}
