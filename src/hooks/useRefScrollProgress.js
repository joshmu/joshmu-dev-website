const { useRef, useState, useLayoutEffect, useEffect } = require('react')

/*
  Takes an optional component ref (or returns a new one)
  and returns the ref, the scroll `start` and `end` percentages
  that are relative to the total document progress.
*/
const useRefScrollProgress = inputRef => {
  const ref = inputRef || useRef()

  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

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

  return { ref, start, end }
}

export default useRefScrollProgress
