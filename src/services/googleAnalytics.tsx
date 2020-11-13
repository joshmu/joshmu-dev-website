import { useEffect } from 'react'
import ReactGA from 'react-ga'

const initGA = (trackingId: string): void => {
  ReactGA.initialize(trackingId, { debug: false })
}

const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

export const setupGAService = (trackingId: string): void => {
  // initialise google analytics on load
  useEffect(() => {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA(trackingId)
      // @ts-ignore
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])
}
