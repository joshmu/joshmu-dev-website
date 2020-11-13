import Banner from '@/components/Banner/Banner'
import Contact from '@/components/Contact/Contact'
import Hero from '@/components/Hero/Hero'
import Projects from '@/components/Projects/Projects'
import Layout from '@/components/shared/Layout/Layout'

const Home = () => {
  return (
    <Layout>
      <Hero id='hero' />

      <Banner id='banner' />

      <Projects id='projects' />

      <Contact id='contact' />
    </Layout>
  )
}

export default Home
