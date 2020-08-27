import { createContext, useContext, useState, useEffect } from 'react'
import { useViewportScroll } from 'framer-motion'

const globalContext = createContext({})

export function GlobalProvider({ children }) {
  const { scrollYProgress } = useViewportScroll()

  const [scrollProgress, setScrollProgress] = useState(0)
  const [theme, setTheme] = useState(null)

  // initial theme
  useEffect(() => {
    // get locally stored theme
    let savedTheme = window.localStorage.getItem('theme')
    // if nothing is stored lets initially default to 'dark' and store for user
    if (!savedTheme) {
      savedTheme = 'dark'
      window.localStorage.setItem('theme', savedTheme)
    }
    // set theme
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    window.localStorage.setItem('theme', theme)
  }

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
        theme,
        toggleTheme,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
