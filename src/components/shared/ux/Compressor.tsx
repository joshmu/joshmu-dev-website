import { Variants, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useGlobalContext } from '@/context/globalContext'

const animationVariants: Variants = {
  hide: {
    width: 0,
    opacity: 0,
  },
  show: {
    width: 'auto',
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
}

type CompressorProps = {
  text: string
  hide: string
  props?: { [key: string]: any }
}

export const Compressor = ({ text, hide, ...props }: CompressorProps) => {
  const [output, setOutput] = useState<[string, string, string]>(['', '', ''])
  const [toggle, setToggle] = useState(false)

  const { scrollProgress } = useGlobalContext()
  const controls = useAnimation()

  useEffect(() => {
    // split text in to 3 parts
    const textArray = Array(3) as [string, string, string]
    textArray[0] = text.slice(0, text.indexOf(hide))
    textArray[1] = hide
    textArray[2] = text.slice(text.indexOf(hide) + hide.length)
    setOutput(textArray)
  }, [])

  useEffect(() => {
    controls.start(toggle ? 'hide' : 'show')
  }, [toggle])

  useEffect(() => {
    if (!toggle && scrollProgress > 0) {
      setToggle(true)
    } else if (toggle && scrollProgress === 0) {
      setToggle(false)
    }
  }, [scrollProgress])

  return (
    <p className='flex items-center justify-center whitespace-pre' {...props}>
      <span>{output[0]}</span>
      <motion.span
        // @ts-ignore
        variants={animationVariants}
        animate={controls}
        className='overflow-hidden'
      >
        <span>{output[1]}</span>
      </motion.span>
      <span>{output[2]}</span>
    </p>
  )
}
