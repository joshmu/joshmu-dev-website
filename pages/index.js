import About from '@/components/About/About'
import Hero from '@/components/Hero/Hero'
import Projects from '@/components/Projects/Projects'
import Layout from '@/components/shared/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <div className='font-sans'>
        <Hero />

        <About />

        <Projects />

        {/* companies */}
        {/* <div className='w-full py-12'>
          <h2 className='text-3xl text-center uppercase'>
            some <span className='font-semibold'>companies</span> I have worked
            with
          </h2>
          <Slider content={sliderContent} />
        </div> */}
      </div>
    </Layout>
  )
}
