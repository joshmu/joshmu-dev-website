import RevealInView from '../shared/ux/RevealInView'
import BackToTop from './BackToTop/BackToTop'

const Footer = () => {
  return (
    <div className='pb-4 text-center'>
      <div className='pb-12 pt-36'>
        <span>{new Date().getFullYear()}</span>
        <RevealInView>
          <span>✌️</span>
        </RevealInView>
      </div>

      <BackToTop />
    </div>
  )
}

export default Footer
