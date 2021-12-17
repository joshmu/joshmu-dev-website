/**
 * @path /pages/index.tsx
 *
 * @project joshmu-dev-website
 * @file index.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Friday, 17th December 2021 1:33:59 pm
 * @copyright © 2020 - 2020 MU
 */

import { Activity } from '@/components/Activity/Activity'
import { Contact } from '@/components/Contact/Contact'
import { Projects } from '@/components/Projects/Projects'
import { Layout } from '@/layout/Layout'
import dynamic from 'next/dynamic'

const HeroWithNoSSR = dynamic<any>(
  () => import('../src/components/Hero/Hero').then(mod => mod.Hero),
  {
    ssr: false,
  }
)
const BannerWithNoSSR = dynamic<any>(
  () => import('../src/components/Banner/Banner').then(mod => mod.Banner),
  {
    ssr: false,
  }
)

const LandingPage = () => {
  return (
    <Layout>
      <HeroWithNoSSR />

      <BannerWithNoSSR />

      <Projects />

      <Activity />
      <Contact />
    </Layout>
  )
}

export default LandingPage
