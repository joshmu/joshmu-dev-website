import { useEffect, useRef, useState } from 'react'

type DimensionType = {
  height: number
  width: number
}

export const useScreenDimension = () => {
  const initial = useRef<DimensionType>({ height: 0, width: 0 })
  const [dimension, setDimension] = useState<DimensionType>({
    height: 0,
    width: 0,
  })

  useEffect(() => {
    const getScreenDimension = (): DimensionType => {
      const height = window.innerHeight
      const width = window.outerWidth
      return { height, width }
    }

    const handler = (): void => setDimension(getScreenDimension())

    // set initial values (this avoids screen resize event on mobile when url bar hides from view)
    if (!initial.current.width && !initial.current.height)
      initial.current = getScreenDimension()

    getScreenDimension()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return { initial: initial.current, dimension } as const
}
