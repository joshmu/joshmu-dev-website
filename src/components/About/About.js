import React from 'react'

import useLocation from '@/hooks/useLocation'

export default function About() {
  const { ref } = useLocation('about')

  return <div ref={ref} className='container py-12 mx-auto'></div>
}
