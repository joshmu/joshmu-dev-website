// src/components/Footer/Footer.test.js

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Footer } from './Footer'

test('renders Footer component with 2020 date', () => {
  //render is from @testing-library/react
  render(<Footer />)
  //expect assertion is from Jest
  expect(screen.getByText(/2020/)).toBeInTheDocument()
  // const linkDom = screen.getByText(/hello@joshmu.dev/)
  // expect(linkDom).toHaveAttribute('href', 'mailto:hello@joshmu.dev')
})

test('Footer contains button', () => {
  render(<Footer />)
  expect(screen.getByRole('button')).toBeDefined()
})
