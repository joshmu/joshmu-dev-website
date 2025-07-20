'use client'

import { Activity } from '@/components/Activity/Activity'
import { Contact } from '@/components/Contact/Contact'
import { Projects } from '@/components/Projects/Projects'
import { PageLayout } from './page-layout'
import dynamic from 'next/dynamic'

// Galaxy and Hero need to be client-side due to 3D/complex interactions
const GalaxyWithNoSSR = dynamic<any>(
  () => import('@/components/Galaxy/Galaxy').then(mod => mod.Galaxy),
  {
    ssr: false,
  }
)

// Hero with proper loading placeholder to prevent content flash
const HeroWithNoSSR = dynamic<any>(
  () => import('@/components/Hero/Hero').then(mod => mod.Hero),
  {
    ssr: false,
    loading: () => (
      <div 
        className="relative w-full"
        style={{ height: '100vh', minHeight: '100vh' }}
      >
        {/* Placeholder that matches Hero's dimensions */}
        <div className="absolute inset-0 bg-themeBg" />
      </div>
    )
  }
)

const BannerWithNoSSR = dynamic<any>(
  () => import('@/components/Banner/Banner').then(mod => mod.Banner),
  {
    ssr: false,
    loading: () => (
      <div 
        className="relative w-full"
        style={{ height: '50vh', minHeight: '400px' }}
      >
        <div className="absolute inset-0 bg-themeBg" />
      </div>
    )
  }
)

export default function LandingPage() {
  return (
    <PageLayout>
      <GalaxyWithNoSSR />
      <HeroWithNoSSR />
      <BannerWithNoSSR />
      <Projects />
      <Activity />
      <Contact />
    </PageLayout>
  )
}