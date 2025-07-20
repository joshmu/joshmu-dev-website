'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirect any 404 to the landing page
export default function NotFound() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/')
  }, [router])

  return <></>
}