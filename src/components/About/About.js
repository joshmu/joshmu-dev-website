import React from 'react'

import { useGlobalContext } from '@/context/globalContext'
import Location from '@/hooks/useLocation'
import useLocation from '@/hooks/useLocation'

export default function About() {
  const { ref } = useLocation('about')

  return (
    <div ref={ref} className='container py-12 mx-auto bg-red-400'>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            iusto, minima similique neque exercitationem culpa? Excepturi
            officiis inventore, culpa, voluptatibus eius molestiae perspiciatis
            eaque rem nemo pariatur aperiam blanditiis eligendi! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Assumenda iusto,
            minima similique neque exercitationem culpa? Excepturi officiis
            inventore, culpa, voluptatibus eius molestiae perspiciatis eaque rem
            nemo pariatur aperiam blanditiis eligendi!
          </p>
          <p className='mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            iusto, minima similique neque exercitationem culpa? Excepturi
            officiis inventore, culpa, voluptatibus eius molestiae perspiciatis
            eaque rem nemo pariatur aperiam blanditiis eligendi!
          </p>
          <p className='mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            iusto, minima similique neque exercitationem culpa? Excepturi
            officiis inventore, culpa, voluptatibus eius molestiae perspiciatis
            eaque rem nemo pariatur aperiam blanditiis eligendi! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Assumenda iusto,
            minima similique neque exercitationem culpa? Excepturi officiis
            inventore, culpa, voluptatibus eius molestiae perspiciatis eaque rem
            nemo pariatur aperiam blanditiis eligendi!
          </p>
        </div>
      </div>
    </div>
  )
}
