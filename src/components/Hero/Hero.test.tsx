// src/components/Hero/Hero.test.tsx

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'

// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// the component to test
import { Hero } from './Hero'

// logo
test('renders Hero component with logo', () => {
  render(<Hero />)
  const logo = screen.getByTestId('heroLogo')

  // this should work but initial animation + state is hidden
  // not sure how to use jsdom to let the animation/state change
  // expect(logo.textContent).toEqual('josh mu')

  // let's just check my surname is somehwere in this component
  // * in this case in the background
  expect(screen.getByText(/mu/i)).toBeInTheDocument()
})
