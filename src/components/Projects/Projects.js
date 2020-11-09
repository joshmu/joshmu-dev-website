import RevealInView from '../shared/ux/RevealInView'
import Project from './Project/Project'

const Projects = ({ ...props }) => {
  const projects = [
    {
      title: 'VideoNote',
      type: 'Full Stack Web App',
      description: 'here is something descibing the application',
      stack: [
        'React',
        'NextJS',
        'Tailwind',
        'Serverless',
        'Nodejs',
        'MongoDB',
        'Mongoose',
        'JWT',
      ],
      website: 'videonote.app',
      github: 'github.com/joshmu/videonote',
    },
    {
      title: 'joshmu.com',
      type: 'NextJS React Static Website',
      description: 'here is something descibing the application',
      stack: ['React', 'NextJS', 'Tailwind', 'Serverless', 'Nodejs'],
      website: 'joshmu.com',
      github: 'github.com/joshmu/joshmu-dance-website',
    },
    {
      title: 'AID Online',
      type: 'Full Stack Web App',
      description: 'here is something descibing the application',
      stack: [
        'React',
        'Parcel',
        'Socket.io',
        'Nodejs',
        'Google TTS Api',
        'Tracery',
        'Compromise',
      ],
      website: 'aid.alisdairmacindoe.com',
      github: 'github.com/tebgeronimo/aid-online',
    },
  ]

  return (
    <div className='container py-12 mx-auto' {...props}>
      <div className='flex flex-wrap items-start justify-center gap-4'>
        {projects.map((project, idx) => (
          <RevealInView key={idx} custom={idx}>
            <Project data={project} />
          </RevealInView>
        ))}
      </div>
    </div>
  )
}

export default Projects
