import Reveal from '../src/components/Reveal'
import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Slider from '../src/components/Slider'

const sliderContent = [
  'Sydney Dance Company',
  'Marrugeku',
  'Force Majeure',
  'Chunky Move',
]

export default function Home() {
  return (
    <Layout>
      <div className='font-sans'>
        <Hero />
        <About />

        {/* companies */}
        <div className='w-full py-12'>
          <h2 className='text-3xl text-center uppercase'>
            some <span className='font-semibold'>companies</span> I have worked
            with
          </h2>
          <Slider content={sliderContent} />
        </div>

        <Reveal>
          <h1 className='p-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
            Next.js Tailwind CSS Starte
            <span className='text-blue-500 uppercase animate-pulse'>r</span>
          </h1>
        </Reveal>
      </div>
    </Layout>
  )
}
