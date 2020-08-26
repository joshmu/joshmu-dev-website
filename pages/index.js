import Head from 'next/head'
import Reveal from '../src/components/Reveal'
import Slider from '../src/components/Slider'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

export default function Home() {
  const companies = [
    'Sydney Dance Company',
    'Chunky Move',
    'Marrugeku',
    'Force Majeure',
  ]

  return (
    <div className='font-sans text-gray-900 bg-gray-50'>
      <Head>
        <title>Josh Mu</title>
      </Head>

      {/* header */}
      <div className='fixed z-10 w-full'>
        <div className='container flex items-center justify-between py-2 mx-auto'>
          <div className='text-xl font-semibold uppercase'>
            <h1>Josh Mu</h1>
          </div>
          <div className='uppercase'>
            <ul className='flex items-center text-sm'>
              <li className='px-2 py-1'>home</li>
              <li className='px-2 py-1'>about</li>
              <li className='px-2 py-1'>news</li>
              <li className='px-2 py-1'>portfolio</li>
              <li className='px-2 py-1'>critics</li>
              <li className='px-2 py-1'>contact</li>
            </ul>
          </div>
        </div>
      </div>

      <Slider content={companies} />

      {/* hero */}
      <div className='relative w-full h-screen bg-blue-300'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1 className='font-semibold uppercase text-8xl'>josh mu</h1>
          <p>
            <span>performer</span> | <span>choreographer</span> |{' '}
            <span>teacher</span>
          </p>
        </div>
        <div className='absolute bottom-0 flex items-center justify-center w-full mb-8 text-4xl'>
          <ArrowDownIcon className='fill-current animate-bounce' />
        </div>
      </div>

      {/* about */}
      <div className='container py-12 mx-auto bg-red-300'>
        <div className='flex justify-center w-full'>
          <div className='flex-1 mr-4 bg-blue-300'>
            <img
              style={{ height: '100%', width: '100%' }}
              src='https://via.placeholder.com/200'
              alt='placeholder'
            />
          </div>
          <div className='flex flex-col flex-1 ml-4'>
            <h2 className='text-3xl uppercase'>A bit about me</h2>
            <p className='mt-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda iusto, minima similique neque exercitationem culpa?
              Excepturi officiis inventore, culpa, voluptatibus eius molestiae
              perspiciatis eaque rem nemo pariatur aperiam blanditiis eligendi!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda iusto, minima similique neque exercitationem culpa?
              Excepturi officiis inventore, culpa, voluptatibus eius molestiae
              perspiciatis eaque rem nemo pariatur aperiam blanditiis eligendi!
            </p>
            <p className='mt-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda iusto, minima similique neque exercitationem culpa?
              Excepturi officiis inventore, culpa, voluptatibus eius molestiae
              perspiciatis eaque rem nemo pariatur aperiam blanditiis eligendi!
            </p>
            <p className='mt-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda iusto, minima similique neque exercitationem culpa?
              Excepturi officiis inventore, culpa, voluptatibus eius molestiae
              perspiciatis eaque rem nemo pariatur aperiam blanditiis eligendi!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda iusto, minima similique neque exercitationem culpa?
              Excepturi officiis inventore, culpa, voluptatibus eius molestiae
              perspiciatis eaque rem nemo pariatur aperiam blanditiis eligendi!
            </p>
          </div>
        </div>
      </div>

      {/* companies */}
      <div className='w-full py-12 bg-indigo-400'>
        <h2 className='text-3xl text-center uppercase'>
          some <span className='font-semibold'>companies</span> I have worked
          with
        </h2>
        <Slider content={companies} />
        <div className='h-32 text-center'>companies</div>
      </div>

      <Reveal>
        <h1 className='p-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
          Next.js Tailwind CSS Starte
          <span className='text-blue-500 uppercase animate-pulse'>r</span>
        </h1>
      </Reveal>
    </div>
  )
}
