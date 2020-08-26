import { useTransform } from 'framer-motion'
import { useGlobalContext } from '../context/globalContext'

export default function Header() {
  const { scrollYProgress } = useGlobalContext()
  const widthProgress = useTransform(scrollYProgress, [0, 0.3, 1], [8, 0, 0])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0])

  return (
    <div className='fixed z-10 w-full'>
      <div className='container flex items-center justify-between py-2 mx-auto'>
        <div className='text-xl font-semibold uppercase'>
          <h1>
            <span
              style={{
                opacity: opacityProgress.get(),
              }}
            >
              Josh{' '}
            </span>
            Mu
          </h1>
        </div>
        <div className='uppercase'>
          <ul className='flex items-center text-sm'>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              home
            </li>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              about
            </li>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              news
            </li>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              portfolio
            </li>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              critics
            </li>
            <li style={{ padding: '3px ' + widthProgress.get() + 'px' }}>
              contact
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
