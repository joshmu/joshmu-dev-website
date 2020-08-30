import Reveal from '../src/components/Reveal'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'
import Header from '../src/components/Header'
import Layout from '../src/components/Layout'
import { useThemeContext } from '../src/context/themeContext'
import Compress from '../src/components/Compress'

export default function Home() {
  const { toggleTheme } = useThemeContext()

  return (
    <Layout>
      <div className='font-sans'>
        {/* hero */}
        <div className='relative w-full h-screen'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='relative'>
              <div
                className='absolute top-0 z-0 w-64 h-4 bg-purple-200'
                style={{
                  top: '2.5rem',
                  mixBlendMode: 'overlay',
                }}
              ></div>
              <h1
                onClick={toggleTheme}
                className='font-semibold text-indigo-700 uppercase text-8xl'
              >
                josh mu
              </h1>
              <p>
                <span>performer</span> | <span>choreographer</span> |{' '}
                <span>teacher</span>
              </p>
              <Compress />
            </div>
          </div>
          <div className='absolute bottom-0 flex items-center justify-center w-full mb-8 text-4xl'>
            <ArrowDownIcon className='fill-current animate-bounce' />
          </div>
        </div>

        {/* about */}
        <div className='container py-12 mx-auto'>
          <div className='flex justify-center w-full'>
            <div className='flex-1 mr-4'>
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
                perspiciatis eaque rem nemo pariatur aperiam blanditiis
                eligendi! Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Assumenda iusto, minima similique neque exercitationem
                culpa? Excepturi officiis inventore, culpa, voluptatibus eius
                molestiae perspiciatis eaque rem nemo pariatur aperiam
                blanditiis eligendi!
              </p>
              <p className='mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Assumenda iusto, minima similique neque exercitationem culpa?
                Excepturi officiis inventore, culpa, voluptatibus eius molestiae
                perspiciatis eaque rem nemo pariatur aperiam blanditiis
                eligendi!
              </p>
              <p className='mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Assumenda iusto, minima similique neque exercitationem culpa?
                Excepturi officiis inventore, culpa, voluptatibus eius molestiae
                perspiciatis eaque rem nemo pariatur aperiam blanditiis
                eligendi! Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Assumenda iusto, minima similique neque exercitationem
                culpa? Excepturi officiis inventore, culpa, voluptatibus eius
                molestiae perspiciatis eaque rem nemo pariatur aperiam
                blanditiis eligendi!
              </p>
            </div>
          </div>
        </div>

        {/* companies */}
        <div className='w-full py-12'>
          <h2 className='text-3xl text-center uppercase'>
            some <span className='font-semibold'>companies</span> I have worked
            with
          </h2>
          <div className='h-32 text-center'>companies</div>
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
