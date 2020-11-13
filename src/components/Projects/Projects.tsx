import { RevealInView } from '@/shared/ux/RevealInView'
import { Project } from './Project/Project'

type ProjectsProps = { props?: { [key: string]: any }; id: string }

export const Projects = ({ ...props }: ProjectsProps) => {
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
      img: {
        src: '/assets/videonote-hero.png',
        width: 3186,
        height: 2138,
      },
      video: {
        src:
          'https://joshmu.s3-ap-southeast-2.amazonaws.com/dev-portfolio-videos/videonote.mp4',
        width: 1199,
        height: 610,
      },
    },
    {
      title: 'joshmu.com',
      type: 'NextJS React Website',
      description:
        'The official website of professional dancer and yoga practitioner Josh Mu.',
      stack: ['React', 'NextJS', 'Nodejs', 'Serverless', 'Tailwind'],
      website: 'https://joshmu.com',
      github: 'github.com/joshmu/joshmu-dance-website',
      img: {
        src: '/assets/joshmu-hero.png',
        width: 3166,
        height: 2138,
      },
      video: {
        src:
          'https://joshmu.s3-ap-southeast-2.amazonaws.com/dev-portfolio-videos/joshmu-dance-website.mp4',
        width: 1200,
        height: 616,
      },
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
        'Express',
        'Google TTS Api',
        'Heroku',
        'Tracery',
        'Compromise',
        'Tailwind',
      ],
      website: 'http://aid.alisdairmacindoe.com',
      github: 'github.com/tebgeronimo/aid-online',
      img: {
        src: '/assets/aidOnline-hero.png',
        width: 3186,
        height: 2138,
      },
      video: {
        src:
          'https://joshmu.s3-ap-southeast-2.amazonaws.com/dev-portfolio-videos/aid-online.mp4',
        width: 1200,
        height: 616,
      },
    },
  ]

  return (
    <div className='container py-12 mx-auto' {...props}>
      <div className='flex flex-wrap items-center justify-center'>
        {projects.map((project, idx) => (
          <RevealInView key={idx} custom={idx}>
            <Project data={project} />
          </RevealInView>
        ))}
      </div>
    </div>
  )
}
