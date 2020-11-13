import { useEffect, useState } from 'react'

type ParallaxVanillaProps = {
  rate?: number
  children: React.ReactNode
}

export const ParallaxVanilla = ({
  rate = 0.5,
  children,
}: ParallaxVanillaProps) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const scrollHandler = (): void => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      setScrollY(scrollTop)
    }
    globalThis.window.addEventListener('scroll', scrollHandler)

    return () => globalThis.window.removeEventListener('scroll', scrollHandler)
  }, [])

  const style = {
    transform: `translateY(${scrollY * rate}px)`,
  }

  return (<div style={style}>{children}</div>) as JSX.Element
}
