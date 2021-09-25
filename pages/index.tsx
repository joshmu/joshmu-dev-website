/**
 * @path /pages/index.tsx
 *
 * @project joshmu-dev-website
 * @file index.tsx
 *
 * @author Josh Mu <hello@joshmu.dev>
 * @created Friday, 13th November 2020 3:44:50 pm
 * @modified Saturday, 25th September 2021 1:16:07 pm
 * @copyright © 2020 - 2020 MU
 */

import { Activity } from '@/components/Activity/Activity'
import { Banner } from '@/components/Banner/Banner'
import { Contact } from '@/components/Contact/Contact'
import { Hero } from '@/components/Hero/Hero'
import { Projects } from '@/components/Projects/Projects'
import { Layout } from '@/layout/Layout'

const LandingPage = () => {
  return (
    <Layout>
      <Hero />

      <Banner />

      <Projects />

      <Activity />
      <Contact />
    </Layout>
  )
}

export default LandingPage
