import About from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import Hero from '@/components/Hero/Hero'
import Projects from '@/components/Projects/Projects'
import Layout from '@/components/shared/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <Hero id='hero' />

      <About id='about' />

      <Projects id='projects' />

      <Contact id='contact' />
    </Layout>
  )
}
