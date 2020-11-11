import RevealInView from '../shared/ux/RevealInView'
import BackToTop from './BackToTop/BackToTop'

const Footer = () => {
  return (
    <div className='pb-4 text-center'>
      <div className='pb-12 pt-36'>
        <RevealInView>
          <span>{new Date().getFullYear()}</span>
        </RevealInView>
        <RevealInView>
          <span>✌️</span>
        </RevealInView>
      </div>

      <RevealInView>
        <BackToTop />
      </RevealInView>
    </div>
  )
}

export default Footer
