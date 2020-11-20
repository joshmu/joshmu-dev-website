/**
 * @path /src/context/themeContext.tsx
 *
 * @project joshmu-dev-website
 * @file themeContext.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Friday, 20th November 2020 4:54:19 pm
 * @copyright © 2020 - 2020 MU
 */

import { createContext, useContext, useEffect, useState } from 'react'

type ToggleThemeType = () => void

interface ThemeContextInterface {
  theme: string
  toggleTheme: ToggleThemeType
  THEME_TYPES: object
}

const themeContext = createContext<ThemeContextInterface | null>(null)

const LOCALSTORAGE_KEY = 'joshmu.dev:theme'
const THEME_TYPES = {
  dark: 'theme-dark',
  light: 'theme-light',
  alt: 'theme-alt',
  alt2: 'theme-alt2',
}

export const ThemeProvider = (props: { [key: string]: any }) => {
  const [theme, setTheme] = useState(Object.keys(THEME_TYPES)[0])

  // initial theme
  useEffect(() => {
    // get locally stored theme
    let savedTheme = window.localStorage.getItem(LOCALSTORAGE_KEY)

    // validation check
    if (!Object.keys(THEME_TYPES).includes(savedTheme)) savedTheme = null

    // if we have a saved theme then set it
    // otherwise update localStorage with default initial theme
    savedTheme
      ? setTheme(savedTheme)
      : window.localStorage.setItem(LOCALSTORAGE_KEY, theme)
  }, [])

  // when theme changes then assign to body tag
  useEffect(() => {
    Object.entries(THEME_TYPES).forEach(([, className]) =>
      globalThis.document.body.classList.remove(className)
    )
    globalThis.document.body.classList.add(THEME_TYPES[theme])
  }, [theme])

  const toggleTheme: ToggleThemeType = () => {
    // get list of themeIds
    const themeIdList = Object.keys(THEME_TYPES)
    const themeIndex = themeIdList.findIndex(themeId => themeId === theme)
    // logic to continuously cycle through array
    const nextThemeIndex =
      themeIndex === themeIdList.length - 1 ? 0 : themeIndex + 1
    let newThemeId = themeIdList[nextThemeIndex]

    // validation check & fallback
    if (!themeIdList.includes(newThemeId)) newThemeId = themeIdList[0]

    setTheme(newThemeId)
    window.localStorage.setItem(LOCALSTORAGE_KEY, newThemeId)
  }

  const value: ThemeContextInterface = {
    theme,
    toggleTheme,
    THEME_TYPES,
  }

  return <themeContext.Provider value={value} {...props} />
}

export const useThemeContext = () => {
  return useContext(themeContext)
}
