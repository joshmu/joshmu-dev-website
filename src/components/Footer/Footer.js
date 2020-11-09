import RevealInView from '../shared/ux/RevealInView'

const Footer = () => {
  return (
    <div className='pb-12 text-center pt-36'>
      <RevealInView>
        <span>{new Date().getFullYear()} ✌️</span>
      </RevealInView>
    </div>
  )
}

export default Footer
