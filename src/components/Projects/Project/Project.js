const Project = ({
  data: { title, type, description, stack, website, github },
  ...props
}) => {
  return (
    <div
      className='relative z-10 p-4 m-4 border rounded-sm shadow sm:m-2 border-themeText2 bg-themeBg'
      {...props}
    >
      <a href={`https://${website}`}>
        <h1 className='mb-2 text-3xl font-bold tracking-tighter uppercase transform -translate-y-1 cursor-pointer -rotate-3'>
          {title}
        </h1>
      </a>

      <h2 className='mb-4 italic'>{type}</h2>

      {/* content */}
      <div className='max-w-md'>
        <p className='mb-4 text-lg'>{description}</p>

        {/* badges */}
        <div className='flex flex-wrap mb-8 -ml-1'>
          {stack.map((tech, idx) => (
            <p
              key={idx}
              className='px-2 py-1 m-1 uppercase rounded-sm bg-themeText text-themeBg'
            >
              {tech}
            </p>
          ))}
        </div>
      </div>

      {/* links */}
      <ul className='text-sm'>
        <li className='flex items-center'>
          {/* website icon */}
          <svg
            className='w-4 h-4 mr-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <a
            className='font-bold cursor-pointer hover:underline'
            href={`${website}`}
          >
            {website.split('//')[1]}
          </a>
        </li>
        <li className='flex items-center'>
          {/* github icon */}
          <svg
            className='w-4 h-4 mr-1'
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
