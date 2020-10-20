import About from '@/components/About/About'
import Hero from '@/components/Hero/Hero'
import Layout from '@/components/shared/Layout/Layout'
import Slider from '@/components/shared/Slider/Slider'

const sliderContent = ['VideoNote', 'JoshMu.Com', 'PaperlessEvents', 'Iris']

export default function Home() {
  return (
    <Layout>
      <div className='font-sans'>
        <Hero />

        {/* <About /> */}

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
