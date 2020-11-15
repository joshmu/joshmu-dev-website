import { scroller } from 'react-scroll'

type ScrollToType = (elemId: string, config?: object) => void

const scrollTo: ScrollToType = (elemId, config = {}) => {
  scroller.scrollTo(elemId, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -40,
    ...config,
  })
}

export const useScrollTo = () => scrollTo
