import { useEffect, useRef, useState } from 'react'

/*
  The scroll `start` and `end` percentages of the ref container
  that are relative to the total document progress.
*/
export const useRefScrollProgress = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  /**
   * null! is a non-null assertion operator (the !).
   * It asserts that any expression before it is not null or undefined,
   * so if you have useRef<HTMLElement>(null!) it means that you're instantiating the ref
   * with a current value of null but lying to TypeScript that it's not null.
   *
   */
  const [start, setStart] = useState<number>(null!)
  const [end, setEnd] = useState<number>(null!)

  // useLayoutEffect(() => {
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const offsetTop = rect.top + scrollTop
    setStart(offsetTop / document.body.clientHeight)
    setEnd((offsetTop + rect.height) / document.body.clientHeight)
  })

  return { ref, start, end } as const
}
