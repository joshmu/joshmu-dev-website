import { Activity } from '@/components/Activity/Activity'
import { Banner } from '@/components/Banner/Banner.tsx'
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
