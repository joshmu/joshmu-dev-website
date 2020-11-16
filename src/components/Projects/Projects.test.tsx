// src/components/Projects/Projects.test.tsx

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Projects } from './Projects'

// projects
// include as many test cases as you want here
const projects = [
  {
    title: 'videonote',
    href: 'https://videonote.app',
    github: 'https://github.com/joshmu/videonote',
  },
  {
    title: 'joshmu.com',
    href: 'https://joshmu.com',
    github: 'https://github.com/joshmu/joshmu-dance-website',
  },
  {
    title: 'aid-online',
    href: 'http://aid.alisdairmacindoe.com',
    github: 'https://github.com/tebgeronimo/aid-online',
  },
]

// check if each project title is present
test.each(projects)(
  'Check if Project title exists in "%s" project.',
  project => {
    render(<Projects />)
    expect(
      screen.getAllByText(new RegExp(project.title, 'i')).length
    ).toBeGreaterThan(0)
  }
)

// check among the links that we are linking to the correct places
test.each(projects)('Check if Project url exists in "%s" project.', project => {
  render(<Projects />)
  const elems = screen.getAllByRole('link')
  expect(
    elems.some(elem => elem.getAttribute('href') === project.href)
  ).toBeTruthy()
})

// check among the links that we are linking to the correct places
test.each(projects)(
  'Check if Project Github link exists in "%s" project.',
  project => {
    render(<Projects />)
    const elems = screen.getAllByRole('link')
    expect(
      elems.some(elem => elem.getAttribute('href') === project.github)
    ).toBeTruthy()
  }
)
