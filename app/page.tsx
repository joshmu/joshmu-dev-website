'use client'

import { Activity } from '@/components/Activity/Activity'
import { Contact } from '@/components/Contact/Contact'
import { Projects } from '@/components/Projects/Projects'
import { PageLayout } from './page-layout'
import dynamic from 'next/dynamic'

const GalaxyWithNoSSR = dynamic<any>(
  () => import('@/components/Galaxy/Galaxy').then(mod => mod.Galaxy),
  {
    ssr: false,
  }
)
const HeroWithNoSSR = dynamic<any>(
  () => import('@/components/Hero/Hero').then(mod => mod.Hero),
  {
    ssr: false,
  }
)
const BannerWithNoSSR = dynamic<any>(
  () => import('@/components/Banner/Banner').then(mod => mod.Banner),
  {
    ssr: false,
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