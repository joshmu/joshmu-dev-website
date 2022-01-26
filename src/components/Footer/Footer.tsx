import { BackToTop } from './BackToTop/BackToTop'

export const Footer = () => {
  return (
    <div className='relative pb-4 text-center'>
      <div className='pb-12 pt-36'>
        <p>{new Date().getFullYear()}</p>
        <p>✌️</p>
      </div>
      <BackToTop />
    </div>
  )
}
