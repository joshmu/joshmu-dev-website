import RevealInView from '../shared/ux/RevealInView'
import Project from './Project/Project'

const Projects = ({ ...props }) => {
  const projects = [
    {
      title: 'VideoNote',
      type: 'Full Stack Web App',
      description:
        'A slick video review app, with the ability to share projects with guests.',
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
      website: 'https://videonote.app',
      github: 'github.com/joshmu/videonote',
    },
    {
      title: 'joshmu.com',
      type: 'NextJS React Static Website',
      description:
        'The official website of professional dancer and yoga practitioner Josh Mu.',
      stack: ['React', 'NextJS', 'Tailwind', 'Serverless', 'Nodejs'],
      website: 'https://joshmu.com',
      github: 'github.com/joshmu/joshmu-dance-website',
    },
    {
      title: 'AID Online',
      type: 'Full Stack Web App',
      description:
        ' A web application which delivers auto generated choreographic scores in both text and audio for live performance outcomes and as a teaching tool.',
      stack: [
        'React',
        'Parcel',
        'Socket.io',
        'Nodejs',
        'Google TTS Api',
        'Tracery',
        'Compromise',
      ],
      website: 'http://aid.alisdairmacindoe.com',
      github: 'github.com/tebgeronimo/aid-online',
    },
  ]

  return (
    <div className='container py-12 mx-auto' {...props}>
      <div className='flex flex-wrap items-center justify-center gap-4'>
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
