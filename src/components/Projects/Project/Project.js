const Project = ({
  data: { title, type, description, stack, website, github },
  ...props
}) => {
  return (
    <div className='p-4 bg-gray-100 rounded-sm shadow w-96' {...props}>
      <a href={`https://${website}`}>
        <h1 className='mb-2 text-3xl font-bold tracking-tighter uppercase transform -translate-y-1 cursor-pointer text-themeBg2 -rotate-3'>
          {title}
        </h1>
      </a>
      <h2 className='mb-4 italic'>{type}</h2>
      <p className='mb-4 text-lg'>{description}</p>
      <div className='flex flex-wrap gap-1 mb-8'>
        {stack.map((tech, idx) => (
          <span
            key={idx}
            className='px-2 py-1 uppercase rounded-sm bg-themeBg2 text-themeBg'
          >
            {tech}
          </span>
        ))}
      </div>
      <ul className='text-sm'>
        <li className='flex items-center gap-2'>
          {/* website icon */}
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
            />
          </svg>
          <a
            className='font-bold cursor-pointer hover:underline'
            href={`https://${website}`}
          >
            {website}
          </a>
        </li>
        <li className='flex items-center gap-2'>
          {/* github icon */}
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            />
          </svg>
          <a
            className='font-bold cursor-pointer hover:underline'
            href={`https://${github}`}
          >
            {github.replace('github.com/', '')}
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Project
