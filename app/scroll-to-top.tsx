'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  // Handle initial page load
  useEffect(() => {
    // Ensure we start at top on initial load
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return null
}